import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

const Song = ({ currentSong }) => {
  const [imageError, setImageError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const fallbackImage =
    "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?q=80&w=500&auto=format&fit=crop";

  // Reset states when song changes
  useEffect(() => {
    setImageError(false);
    setIsLoading(true);
  }, [currentSong]);

  const handleImageError = () => {
    console.log("Image failed to load:", currentSong.cover);
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
        crossOrigin="anonymous"
      />
      <h2>{currentSong.name}</h2>
      <h3>{currentSong.artist}</h3>
    </div>
  );
};

Song.propTypes = {
  currentSong: PropTypes.object.isRequired,
};

export default Song;
