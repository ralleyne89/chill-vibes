import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import LibrarySong from "./LibrarySong";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faTimes } from "@fortawesome/free-solid-svg-icons";

const Library = ({
  onSongSelect,
  songs,
  setSongs,
  libraryStatus,
  onClose,
}) => {
  const [filteredSongs, setFilteredSongs] = useState(songs);
  const [showFavorites, setShowFavorites] = useState(false);

  useEffect(() => {
    let results = songs;

    if (showFavorites) {
      results = results.filter((song) => song.favorite);
    }

    setFilteredSongs(results);
  }, [songs, showFavorites]);

  return (
    <aside
      id="library-panel"
      className={`library ${libraryStatus ? "active-library" : ""}`}
      aria-hidden={!libraryStatus}
      aria-label="Your music library"
    >
      <div className="panel-header">
        <div>
          <h2>Your Music Library</h2>
          <p>{songs.length} saved tracks</p>
        </div>
        <button
          type="button"
          className="close-panel"
          onClick={onClose}
          aria-label="Close library"
        >
          <FontAwesomeIcon icon={faTimes} aria-hidden="true" />
        </button>
      </div>
      <div className="filter-container">
        <div className="filter-options">
          <button
            type="button"
            className={`favorites-filter ${showFavorites ? "active" : ""}`}
            onClick={() => setShowFavorites(!showFavorites)}
            aria-pressed={showFavorites}
            aria-label={
              showFavorites ? "Show all songs" : "Show favorites only"
            }
          >
            <FontAwesomeIcon icon={faHeart} aria-hidden="true" />
            <span>{showFavorites ? "All Songs" : "Favorites"}</span>
          </button>
        </div>
      </div>
      <div className="library-songs">
        {filteredSongs.length === 0 ? (
          <div className="no-results">
            {showFavorites ? (
              <p>You have not added any favorites yet.</p>
            ) : (
              <p>Your library is empty. Open Browse to add tracks.</p>
            )}
          </div>
        ) : (
          filteredSongs.map((song) => (
            <LibrarySong
              onSongSelect={onSongSelect}
              song={song}
              songs={songs}
              id={song.id}
              key={song.id}
              setSongs={setSongs}
            />
          ))
        )}
      </div>
      <div className="library-footer">
        <p>Chill Vibes Music Player</p>
      </div>
    </aside>
  );
};

Library.propTypes = {
  onSongSelect: PropTypes.func.isRequired,
  songs: PropTypes.array.isRequired,
  setSongs: PropTypes.func.isRequired,
  libraryStatus: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Library;
