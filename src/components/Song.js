import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMusic, faSearch } from "@fortawesome/free-solid-svg-icons";
import { getFallbackCover } from "../utils/covers";

const Song = ({ currentSong, libraryCount, catalogCount, onBrowseOpen, onLibraryOpen }) => {
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
    <section className="song-container" aria-labelledby="current-track-title">
      <div className="song-copy">
        <p className="song-kicker">Now playing</p>
        <h1 id="current-track-title">{currentSong.name}</h1>
        <p className="song-artist">{currentSong.artist}</p>
        <div className="song-meta" aria-label="Current track details">
          <span>{currentSong.genre}</span>
          <span>{currentSong.mood}</span>
          <span>{currentSong.durationLabel}</span>
        </div>
        <div className="session-stats" aria-label="Session summary">
          <span>
            <strong>{libraryCount}</strong>
            saved tracks
          </span>
          <span>
            <strong>{catalogCount}</strong>
            catalog tracks
          </span>
        </div>
        <div className="song-actions">
          <button type="button" className="primary-action" onClick={onBrowseOpen}>
            <FontAwesomeIcon icon={faSearch} aria-hidden="true" />
            <span>Browse tracks</span>
          </button>
          <button type="button" className="secondary-action" onClick={onLibraryOpen}>
            <FontAwesomeIcon icon={faMusic} aria-hidden="true" />
            <span>Open library</span>
          </button>
        </div>
      </div>
      <div className="song-art-panel">
        {isLoading && <div className="loading-spinner">Loading artwork</div>}
        <img
          className={isLoading ? "hidden" : ""}
          alt={currentSong.name}
          src={imageError ? fallbackImage : currentSong.cover}
          onError={handleImageError}
          onLoad={handleImageLoad}
        />
        <div className="song-art-caption" aria-hidden="true">
          <span>{currentSong.mood}</span>
          <span>{currentSong.genre}</span>
        </div>
      </div>
    </section>
  );
};

Song.propTypes = {
  currentSong: PropTypes.object.isRequired,
  libraryCount: PropTypes.number.isRequired,
  catalogCount: PropTypes.number.isRequired,
  onBrowseOpen: PropTypes.func.isRequired,
  onLibraryOpen: PropTypes.func.isRequired,
};

export default Song;
