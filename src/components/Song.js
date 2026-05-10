import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMusic, faSearch } from "@fortawesome/free-solid-svg-icons";
import { getFallbackCover } from "../utils/covers";
import usePrefersReducedMotion from "../hooks/usePrefersReducedMotion";

const Song = ({ currentSong, libraryCount, catalogCount, onBrowseOpen, onLibraryOpen }) => {
  const songRef = useRef(null);
  const artRef = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  const [imageError, setImageError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const fallbackImage = getFallbackCover(currentSong.id);

  // Reset states when song changes
  useEffect(() => {
    setImageError(false);
    setIsLoading(true);
  }, [currentSong]);

  useEffect(() => {
    if (prefersReducedMotion || !songRef.current) {
      return;
    }

    songRef.current.animate(
      [
        { opacity: 0.72, transform: "translateY(20px)" },
        { opacity: 1, transform: "translateY(0)" },
      ],
      {
        duration: 680,
        easing: "cubic-bezier(0.22, 1, 0.36, 1)",
      }
    );

    if (artRef.current) {
      artRef.current.animate(
        [
          { opacity: 0.8, transform: "scale(0.965) translateX(22px)" },
          { opacity: 1, transform: "scale(1) translateX(0)" },
        ],
        {
          duration: 820,
          easing: "cubic-bezier(0.22, 1, 0.36, 1)",
        }
      );
    }
  }, [currentSong?.id, prefersReducedMotion]);

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
    <section
      className="song-container"
      aria-labelledby="current-track-title"
      ref={songRef}
    >
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
      <div className="song-art-panel" ref={artRef}>
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
