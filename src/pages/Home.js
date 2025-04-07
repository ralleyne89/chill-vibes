import React, { useState, useRef, useEffect } from "react";
import Library from "../components/Library";
import Nav from "../components/Nav";
import Player from "../components/Player";
import Song from "../components/Song";
import SongBrowser from "../components/SongBrowser";
import data from "../data";

const Home = () => {
  // Ref
  const audioRef = useRef(null);
  // State
  const [songs, setSongs] = useState(data());
  const [currentSong, setCurrentSong] = useState(songs[0] || null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [libraryStatus, setLibraryStatus] = useState(false);
  const [browserStatus, setBrowserStatus] = useState(false);
  const [songInfo, setSongInfo] = useState({
    currentTime: 0,
    duration: 0,
    animationPercentage: 0,
  });
  // Update currentSong if songs change and current song is removed
  useEffect(() => {
    if (
      songs.length > 0 &&
      !songs.some((song) => song.id === currentSong?.id)
    ) {
      setCurrentSong(songs[0]);
    }
  }, [songs, currentSong]);

  const timeUpdateHandler = (e) => {
    const current = e.target.currentTime;
    const duration = e.target.duration;
    // calculate percentage
    const roundedCurrent = Math.round(current);
    const roundedDuration = Math.round(duration);
    const animation = Math.round((roundedCurrent / roundedDuration) * 100);
    setSongInfo({
      ...songInfo,
      currentTime: current,
      duration,
      animationPercentage: animation || 0,
    });
  };
  // Event handlers
  const playSongHandler = () => {
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(!isPlaying);
    } else {
      audioRef.current.play();
      setIsPlaying(!isPlaying);
    }
  };
  return (
    <div
      className={`App ${libraryStatus ? "library-active" : ""} ${
        browserStatus ? "browser-active" : ""
      }`}
    >
      <Nav
        libraryStatus={libraryStatus}
        setLibraryStatus={setLibraryStatus}
        setBrowserStatus={setBrowserStatus}
      />
      {currentSong ? (
        <Song currentSong={currentSong} />
      ) : (
        <div className="empty-library">
          <h2>Your library is empty</h2>
          <p>Click the Browse button to add songs to your library</p>
        </div>
      )}
      {currentSong && (
        <Player
          songs={songs}
          setSongInfo={setSongInfo}
          songInfo={songInfo}
          audioRef={audioRef}
          playSongHandler={playSongHandler}
          isPlaying={isPlaying}
          currentSong={currentSong}
          setCurrentSong={setCurrentSong}
          setSongs={setSongs}
        />
      )}
      <Library
        setCurrentSong={setCurrentSong}
        songs={songs}
        audioRef={audioRef}
        isPlaying={isPlaying}
        setSongs={setSongs}
        libraryStatus={libraryStatus}
      />
      <SongBrowser
        songs={songs}
        setSongs={setSongs}
        isOpen={browserStatus}
        setIsOpen={setBrowserStatus}
      />

      {currentSong && (
        <audio
          onTimeUpdate={timeUpdateHandler}
          ref={audioRef}
          src={currentSong.audio}
          onLoadedMetadata={timeUpdateHandler}
          onError={(e) => console.error("Audio loading error:", e)}
          crossOrigin="anonymous"
        />
      )}
    </div>
  );
};

export default Home;
