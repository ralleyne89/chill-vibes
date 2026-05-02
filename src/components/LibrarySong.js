import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart as solidHeart,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { faHeart as regularHeart } from "@fortawesome/free-regular-svg-icons";

const LibrarySong = ({
  song,
  songs,
  setCurrentSong,
  id,
  setSongs,
}) => {
  const [imageError, setImageError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const fallbackImage =
    "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?q=80&w=500&auto=format&fit=crop";

  // Reset image error state when song changes
  useEffect(() => {
    setImageError(false);
    setIsLoading(true);
  }, [song]);

  // Event Handler
  const songSelectHandler = () => {
    setCurrentSong(song);
  };

  // Toggle favorite status
  const toggleFavorite = (e) => {
    e.stopPropagation(); // Prevent triggering songSelectHandler

    const newSongs = songs.map((s) => {
      if (s.id === id) {
        return {
          ...s,
          favorite: !s.favorite,
        };
      } else {
        return s;
      }
    });

    setSongs(newSongs);
  };

  // Remove song from library
  const removeSong = (e) => {
    e.stopPropagation(); // Prevent triggering songSelectHandler

    const newSongs = songs.filter((s) => s.id !== id);
    setSongs(newSongs);
  };

  const handleImageError = () => {
    setImageError(true);
    setIsLoading(false);
  };

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      songSelectHandler();
    }
  };

  return (
    <div
      onClick={songSelectHandler}
      onKeyDown={handleKeyDown}
      className={`library-song ${song.active ? "selected" : ""}`}
      role="button"
      tabIndex={0}
      aria-label={`Play ${song.name} by ${song.artist}`}
    >
      <div className="song-image-container">
        {isLoading && <div className="loading-image">...</div>}
        <img
          className={isLoading ? "hidden" : ""}
          alt={song.name}
          src={imageError ? fallbackImage : song.cover}
          onError={handleImageError}
          onLoad={handleImageLoad}
        />
      </div>
      <div className="song-description">
        <h3>{song.name}</h3>
        <h4>
          {song.artist}
          {song.mood ? ` / ${song.mood}` : ""}
        </h4>
      </div>
      <div className="song-actions">
        <button
          className={`favorite-btn ${song.favorite ? "active" : ""}`}
          onClick={toggleFavorite}
          aria-label={
            song.favorite
              ? `Remove ${song.name} from favorites`
              : `Add ${song.name} to favorites`
          }
        >
          <FontAwesomeIcon icon={song.favorite ? solidHeart : regularHeart} />
        </button>
        <button
          className="remove-btn"
          onClick={removeSong}
          aria-label={`Remove ${song.name} from library`}
        >
          <FontAwesomeIcon icon={faTrash} />
        </button>
      </div>
    </div>
  );
};

LibrarySong.propTypes = {
  song: PropTypes.object.isRequired,
  songs: PropTypes.array.isRequired,
  setCurrentSong: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  setSongs: PropTypes.func.isRequired,
};

export default LibrarySong;
