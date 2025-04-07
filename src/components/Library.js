import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import LibrarySong from "./LibrarySong";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faTimes, faHeart } from "@fortawesome/free-solid-svg-icons";

const Library = ({
  setCurrentSong,
  songs,
  audioRef,
  isPlaying,
  setSongs,
  libraryStatus,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredSongs, setFilteredSongs] = useState(songs);
  const [showFavorites, setShowFavorites] = useState(false);

  useEffect(() => {
    let results = songs;

    // Filter by search term
    if (searchTerm) {
      results = results.filter(
        (song) =>
          song.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          song.artist.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by favorites
    if (showFavorites) {
      results = results.filter((song) => song.favorite);
    }

    setFilteredSongs(results);
  }, [searchTerm, songs, showFavorites]);

  return (
    <div className={`library ${libraryStatus ? "active-library" : ""}`}>
      <h2>Your Music Library</h2>
      <div className="search-container">
        <div className="search-input-container">
          <FontAwesomeIcon icon={faSearch} className="search-icon" />
          <input
            type="text"
            placeholder="Search songs or artists..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          {searchTerm && (
            <FontAwesomeIcon
              icon={faTimes}
              className="clear-icon"
              onClick={() => setSearchTerm("")}
            />
          )}
        </div>
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
            <p>No songs found matching "{searchTerm}"</p>
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
