import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { PlayAudio } from "../util";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as regularHeart } from "@fortawesome/free-regular-svg-icons";

const LibrarySong = ({
  song,
  songs,
  setCurrentSong,
  id,
  audioRef,
  isPlaying,
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
    // Selecting song
    setCurrentSong(song);
    // Add active state
    const newSongs = songs.map((song) => {
      if (song.id === id) {
        return {
          ...song,
          active: true,
        };
      } else {
        return {
          ...song,
          active: false,
        };
      }
    });
    setSongs(newSongs);
    // Check if the song is playing
    PlayAudio(isPlaying, audioRef);
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

  const handleImageError = () => {
    console.log("Library image failed to load:", song.cover);
    setImageError(true);
    setIsLoading(false);
  };

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  return (
    <div
      onClick={songSelectHandler}
      className={`library-song ${song.active ? "selected" : ""}`}
    >
      {isLoading && <div className="loading-image">...</div>}
      <img
        className={isLoading ? "hidden" : ""}
        alt={song.name}
        src={imageError ? fallbackImage : song.cover}
        onError={handleImageError}
        onLoad={handleImageLoad}
        crossOrigin="anonymous"
      />
      <div className="song-description">
        <h3>{song.name}</h3>
        <h4>{song.artist}</h4>
      </div>
      <button
        className={`favorite-btn ${song.favorite ? "active" : ""}`}
        onClick={toggleFavorite}
        aria-label={
          song.favorite ? "Remove from favorites" : "Add to favorites"
        }
      >
        <FontAwesomeIcon icon={song.favorite ? solidHeart : regularHeart} />
      </button>
    </div>
  );
};

LibrarySong.propTypes = {
  song: PropTypes.object.isRequired,
  songs: PropTypes.array.isRequired,
  setCurrentSong: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  audioRef: PropTypes.object.isRequired,
  isPlaying: PropTypes.bool.isRequired,
  setSongs: PropTypes.func.isRequired,
};

export default LibrarySong;
