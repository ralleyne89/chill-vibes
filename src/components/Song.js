import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { getFallbackCover } from "../utils/covers";

const Song = ({ currentSong }) => {
  const [imageError, setImageError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const fallbackImage = getFallbackCover(currentSong.id);

  // Reset states when song changes
  useEffect(() => {
    setImageError(false);
    setIsLoading(true);
  }, [currentSong]);

  const handleImageError = () => {
    if (imageError) {
      return;
    }
    setImageError(true);
    setIsLoading(false);
  };

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  return (
    <div className="song-container">
      {isLoading && <div className="loading-spinner">Loading...</div>}
      <img
        className={isLoading ? "hidden" : ""}
        alt={currentSong.name}
        src={imageError ? fallbackImage : currentSong.cover}
        onError={handleImageError}
        onLoad={handleImageLoad}
      />
      <h2>{currentSong.name}</h2>
      <h3>{currentSong.artist}</h3>
      <div className="song-meta">
        <span>{currentSong.genre}</span>
        <span>{currentSong.mood}</span>
        <span>{currentSong.durationLabel}</span>
      </div>
    </div>
  );
};

Song.propTypes = {
  currentSong: PropTypes.object.isRequired,
};

export default Song;
