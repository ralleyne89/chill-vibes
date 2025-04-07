import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import LibrarySong from "./LibrarySong";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

const Library = ({
  setCurrentSong,
  songs,
  audioRef,
  isPlaying,
  setSongs,
  libraryStatus,
}) => {
  const [filteredSongs, setFilteredSongs] = useState(songs);
  const [showFavorites, setShowFavorites] = useState(false);

  useEffect(() => {
    let results = songs;

    // Filter by favorites
    if (showFavorites) {
      results = results.filter((song) => song.favorite);
    }

    setFilteredSongs(results);
  }, [songs, showFavorites]);

  // Update filtered songs when songs change
  useEffect(() => {
    if (!showFavorites) {
      setFilteredSongs(songs);
    }
  }, [songs, showFavorites]);

  return (
    <div className={`library ${libraryStatus ? "active-library" : ""}`}>
      <h2>Your Music Library</h2>
      <div className="filter-container">
        <div className="filter-options">
          <button
            className={`favorites-filter ${showFavorites ? "active" : ""}`}
            onClick={() => setShowFavorites(!showFavorites)}
            aria-label={
              showFavorites ? "Show all songs" : "Show favorites only"
            }
          >
            <FontAwesomeIcon icon={faHeart} />
            <span>{showFavorites ? "All Songs" : "Favorites"}</span>
          </button>
        </div>
      </div>
      <div className="library-songs">
        {filteredSongs.length === 0 ? (
          <div className="no-results">
            {showFavorites ? (
              <p>You haven't added any favorites yet</p>
            ) : (
              <p>Your library is empty. Click "Browse" to add songs.</p>
            )}
          </div>
        ) : (
          filteredSongs.map((song) => (
            <LibrarySong
              setCurrentSong={setCurrentSong}
              song={song}
              songs={songs}
              id={song.id}
              key={song.id}
              audioRef={audioRef}
              isPlaying={isPlaying}
              setSongs={setSongs}
            />
          ))
        )}
      </div>
      <div className="library-footer">
        <p>Chill Vibes Music Player</p>
      </div>
    </div>
  );
};

Library.propTypes = {
  setCurrentSong: PropTypes.func.isRequired,
  songs: PropTypes.array.isRequired,
  audioRef: PropTypes.object.isRequired,
  isPlaying: PropTypes.bool.isRequired,
  setSongs: PropTypes.func.isRequired,
  libraryStatus: PropTypes.bool.isRequired,
};

export default Library;
