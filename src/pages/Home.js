import React, { useCallback, useEffect, useRef, useState } from "react";
import Library from "../components/Library";
import Nav from "../components/Nav";
import Player from "../components/Player";
import Song from "../components/Song";
import SongBrowser from "../components/SongBrowser";
import data, { createLibrarySong, getSongById, songCatalog } from "../data";
import { useAuth } from "../contexts/AuthContext";

const STORAGE_PREFIX = "chill-vibes-library";

const serializeLibrary = (songs) =>
  songs.map((song) => ({
    id: song.id,
    favorite: Boolean(song.favorite),
  }));

const hydrateLibrary = (savedSongs) => {
  if (!Array.isArray(savedSongs)) {
    return data();
  }

  const library = savedSongs
    .map((savedSong) => {
      const catalogSong = getSongById(savedSong.id);
      if (!catalogSong) {
        return null;
      }
      return createLibrarySong(catalogSong, {
        favorite: Boolean(savedSong.favorite),
      });
    })
    .filter(Boolean);

  return library.length > 0 ? library : data();
};

const Home = () => {
  const audioRef = useRef(null);
  const { currentUser } = useAuth();
  const [songs, setSongs] = useState(() => data());
  const [currentSong, setCurrentSong] = useState(() => data()[0] || null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [libraryStatus, setLibraryStatus] = useState(false);
  const [browserStatus, setBrowserStatus] = useState(false);
  const [libraryLoaded, setLibraryLoaded] = useState(false);
  const [audioError, setAudioError] = useState("");
  const [songInfo, setSongInfo] = useState({
    currentTime: 0,
    duration: 0,
    animationPercentage: 0,
  });

  const resetSongInfo = useCallback(() => {
    setSongInfo({
      currentTime: 0,
      duration: 0,
      animationPercentage: 0,
    });
  }, []);

  const libraryStorageKey = currentUser?.uid
    ? `${STORAGE_PREFIX}:${currentUser.uid}`
    : null;

  useEffect(() => {
    if (!libraryStorageKey) {
      return;
    }

    let nextSongs = data();
    try {
      const savedSongs = JSON.parse(localStorage.getItem(libraryStorageKey));
      nextSongs = hydrateLibrary(savedSongs);
    } catch {
      nextSongs = data();
    }

    setSongs(nextSongs);
    setCurrentSong(nextSongs[0] || null);
    setIsPlaying(false);
    resetSongInfo();
    setLibraryLoaded(true);
  }, [libraryStorageKey, resetSongInfo]);

  useEffect(() => {
    if (!libraryLoaded || !libraryStorageKey) {
      return;
    }

    localStorage.setItem(libraryStorageKey, JSON.stringify(serializeLibrary(songs)));
  }, [libraryLoaded, libraryStorageKey, songs]);

  useEffect(() => {
    if (songs.length === 0) {
      setCurrentSong(null);
      setIsPlaying(false);
      resetSongInfo();
      return;
    }

    if (!currentSong || !songs.some((song) => song.id === currentSong.id)) {
      setCurrentSong(songs[0]);
      resetSongInfo();
    }
  }, [songs, currentSong, resetSongInfo]);

  useEffect(() => {
    setSongs((currentSongs) => {
      let hasChanged = false;
      const nextSongs = currentSongs.map((song) => {
        const active = currentSong?.id === song.id;
        if (song.active === active) {
          return song;
        }
        hasChanged = true;
        return { ...song, active };
      });
      return hasChanged ? nextSongs : currentSongs;
    });
    setAudioError("");
  }, [currentSong?.id]);

  const prepareAudioElement = useCallback((song) => {
    if (!audioRef.current || !song?.audio) {
      return null;
    }

    const nextSource = new URL(song.audio, window.location.origin).href;
    if (audioRef.current.src !== nextSource) {
      audioRef.current.src = nextSource;
      audioRef.current.load();
    }

    return audioRef.current;
  }, []);

  useEffect(() => {
    if (!currentSong || isPlaying) {
      return;
    }

    prepareAudioElement(currentSong);
  }, [currentSong, isPlaying, prepareAudioElement]);

  const selectSongHandler = async (song, { play = isPlaying } = {}) => {
    if (!song) {
      return;
    }

    setCurrentSong(song);
    resetSongInfo();
    setAudioError("");

    if (!play) {
      return;
    }

    const audioElement = prepareAudioElement(song);
    if (!audioElement) {
      return;
    }

    try {
      await audioElement.play();
      setIsPlaying(true);
    } catch {
      setIsPlaying(false);
      setAudioError("This track could not start. Try another song.");
    }
  };

  const timeUpdateHandler = (event) => {
    const current = event.target.currentTime || 0;
    const duration = event.target.duration || 0;
    const animation = duration ? Math.round((current / duration) * 100) : 0;

    setSongInfo({
      currentTime: current,
      duration,
      animationPercentage: animation,
    });
  };

  const playSongHandler = async () => {
    if (!audioRef.current || !currentSong) {
      return;
    }

    try {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        const audioElement = prepareAudioElement(currentSong);
        await audioElement.play();
        setIsPlaying(true);
      }
      setAudioError("");
    } catch {
      setIsPlaying(false);
      setAudioError("This track could not start. Try another song.");
    }
  };

  const openLibrary = () => {
    setBrowserStatus(false);
    setLibraryStatus((status) => !status);
  };

  const openBrowser = () => {
    setLibraryStatus(false);
    setBrowserStatus(true);
  };

  const handleAudioError = () => {
    setIsPlaying(false);
    setAudioError("This track could not load. Try another song.");
  };

  return (
    <div className="App">
      <Nav
        libraryStatus={libraryStatus}
        onLibraryToggle={openLibrary}
        onBrowserOpen={openBrowser}
      />
      <main className="player-shell">
        {currentSong ? (
          <Song
            currentSong={currentSong}
            libraryCount={songs.length}
            catalogCount={songCatalog.length}
            onBrowseOpen={openBrowser}
            onLibraryOpen={openLibrary}
          />
        ) : (
          <div className="empty-library">
            <h2>Your library is empty</h2>
            <p>Open Browse to add a few tracks, then start a new session.</p>
            <button type="button" onClick={openBrowser}>
              Browse tracks
            </button>
          </div>
        )}
        {audioError && <p className="audio-error">{audioError}</p>}
        {currentSong && (
          <Player
            songs={songs}
            setSongInfo={setSongInfo}
            songInfo={songInfo}
            audioRef={audioRef}
            playSongHandler={playSongHandler}
            isPlaying={isPlaying}
            currentSong={currentSong}
            onSongSelect={selectSongHandler}
          />
        )}
      </main>
      <Library
        onSongSelect={selectSongHandler}
        songs={songs}
        setSongs={setSongs}
        libraryStatus={libraryStatus}
        onClose={() => setLibraryStatus(false)}
      />
      <SongBrowser
        catalog={songCatalog}
        songs={songs}
        setSongs={setSongs}
        isOpen={browserStatus}
        setIsOpen={setBrowserStatus}
      />

      {currentSong && (
        <audio
          onTimeUpdate={timeUpdateHandler}
          ref={audioRef}
          onLoadedMetadata={timeUpdateHandler}
          onError={handleAudioError}
        />
      )}
    </div>
  );
};

export default Home;
