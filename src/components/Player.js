import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faPause,
  faAngleLeft,
  faAngleRight,
  faTachometerAlt,
} from "@fortawesome/free-solid-svg-icons";
import usePrefersReducedMotion from "../hooks/usePrefersReducedMotion";

const Player = ({
  songs,
  currentSong,
  isPlaying,
  audioRef,
  setSongInfo,
  songInfo,
  playSongHandler,
  onSongSelect,
}) => {
  const playerRef = useRef(null);
  const playButtonRef = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  const [showSpeedControl, setShowSpeedControl] = useState(false);
  const [currentSpeed, setCurrentSpeed] = useState(1);
  const speedOptions = [0.5, 0.75, 1, 1.25, 1.5, 2];

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.playbackRate = currentSpeed;
    }
  }, [audioRef, currentSpeed, currentSong?.id]);

  useEffect(() => {
    if (prefersReducedMotion || !playerRef.current) {
      return;
    }

    playerRef.current.animate(
      [
        { opacity: 0.75, transform: "translateY(28px) scale(0.985)" },
        { opacity: 1, transform: "translateY(0) scale(1)" },
      ],
      {
        duration: 620,
        easing: "cubic-bezier(0.22, 1, 0.36, 1)",
      }
    );
  }, [currentSong?.id, prefersReducedMotion]);

  useEffect(() => {
    if (prefersReducedMotion || !isPlaying || !playButtonRef.current) {
      return undefined;
    }

    const pulseAnimation = playButtonRef.current.animate(
      [
        { boxShadow: "0 0 0 0 rgba(83, 177, 255, 0.36)" },
        { boxShadow: "0 0 0 18px rgba(83, 177, 255, 0)" },
      ],
      {
        duration: 1500,
        easing: "ease-out",
        iterations: Infinity,
      }
    );

    return () => pulseAnimation.cancel();
  }, [isPlaying, prefersReducedMotion]);

  const getTime = (time) =>
    Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2);

  const dragHandler = (event) => {
    const currentTime = Number(event.target.value);
    const duration = songInfo.duration || 0;
    if (audioRef.current) {
      audioRef.current.currentTime = currentTime;
    }
    setSongInfo({
      ...songInfo,
      currentTime,
      animationPercentage: duration
        ? Math.round((currentTime / duration) * 100)
        : 0,
    });
  };

  const skipTrackHandler = (direction) => {
    if (!songs.length) {
      return;
    }

    const currentIndex = songs.findIndex((song) => song.id === currentSong.id);
    const safeIndex = currentIndex === -1 ? 0 : currentIndex;
    const nextIndex =
      direction === "skip-forward"
        ? (safeIndex + 1) % songs.length
        : (safeIndex - 1 + songs.length) % songs.length;

    onSongSelect(songs[nextIndex], { play: isPlaying });
  };

  const changeSpeed = (speed) => {
    setCurrentSpeed(speed);
    setShowSpeedControl(false);
  };

  const trackAnim = {
    "--progress": `${songInfo.animationPercentage}%`,
  };

  return (
    <div
      className={`player ${isPlaying ? "is-playing" : "is-ready"}`}
      data-speed-open={showSpeedControl}
      aria-label="Music player"
      ref={playerRef}
    >
      <div className="player-ambient" aria-hidden="true" />
      <div className="player-heading">
        <div>
          <p>Signal deck</p>
          <h2>{currentSong.name}</h2>
        </div>
        <div className="deck-status">
          <div className="equalizer" aria-hidden="true">
            <span />
            <span />
            <span />
            <span />
          </div>
          <span className="status-chip" aria-live="polite">
            {isPlaying ? "Live" : "Ready"}
          </span>
        </div>
      </div>
      <div className="time-control">
        <p>{getTime(songInfo.currentTime)}</p>
        <div
          className="track"
          style={trackAnim}
        >
          <div className="track-glow" aria-hidden="true" />
          <div className="track-progress" aria-hidden="true" />
          <input
            type="range"
            aria-label={`Playback position for ${currentSong.name}`}
            min={0}
            max={songInfo.duration || 0}
            value={songInfo.currentTime}
            onChange={dragHandler}
          />
        </div>
        <p>{songInfo.duration ? getTime(songInfo.duration) : "0:00"}</p>
      </div>
      <div className="play-control" aria-label="Playback controls">
        <button
          type="button"
          className="control-button"
          onClick={() => skipTrackHandler("skip-back")}
          aria-label="Previous track"
        >
          <FontAwesomeIcon size="2x" icon={faAngleLeft} aria-hidden="true" />
        </button>
        <button
          type="button"
          className="control-button play-button"
          onClick={playSongHandler}
          aria-label={isPlaying ? "Pause track" : "Play track"}
          ref={playButtonRef}
        >
          <span className="play-core" aria-hidden="true" />
          <FontAwesomeIcon
            size="2x"
            icon={isPlaying ? faPause : faPlay}
            aria-hidden="true"
          />
        </button>
        <button
          type="button"
          className="control-button"
          onClick={() => skipTrackHandler("skip-forward")}
          aria-label="Next track"
        >
          <FontAwesomeIcon size="2x" icon={faAngleRight} aria-hidden="true" />
        </button>
      </div>
      <div className="playback-speed">
        <div className="current-speed" aria-live="polite">
          <span>{currentSpeed}x</span>
        </div>
        <div className="speed-control-container">
          <button
            type="button"
            className="speed-button"
            onClick={() => setShowSpeedControl(!showSpeedControl)}
            aria-expanded={showSpeedControl}
            aria-label="Change playback speed"
          >
            <FontAwesomeIcon icon={faTachometerAlt} aria-hidden="true" />
          </button>
          {showSpeedControl && (
            <div className="speed-options" role="menu">
              {speedOptions.map((speed) => (
                <button
                  key={speed}
                  type="button"
                  onClick={() => changeSpeed(speed)}
                  className={currentSpeed === speed ? "active" : ""}
                  role="menuitem"
                >
                  {speed}x
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

Player.propTypes = {
  songs: PropTypes.array.isRequired,
  currentSong: PropTypes.object.isRequired,
  isPlaying: PropTypes.bool.isRequired,
  audioRef: PropTypes.object.isRequired,
  setSongInfo: PropTypes.func.isRequired,
  songInfo: PropTypes.object.isRequired,
  playSongHandler: PropTypes.func.isRequired,
  onSongSelect: PropTypes.func.isRequired,
};

export default Player;
