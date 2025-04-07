import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faPause,
  faAngleLeft,
  faAngleRight,
  faTachometerAlt,
} from "@fortawesome/free-solid-svg-icons";
import { PlayAudio } from "../util";
const Player = ({
  songs,
  currentSong,
  isPlaying,
  audioRef,
  setSongInfo,
  songInfo,
  playSongHandler,
  setCurrentSong,
  setSongs,
}) => {
  const [showSpeedControl, setShowSpeedControl] = useState(false);
  const speedOptions = [0.5, 0.75, 1, 1.25, 1.5, 2];

  // Set playback rate when audio element is available
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.playbackRate = 1;
    }
  }, [audioRef]);
  // useEffect
  useEffect(() => {
    // Add active state
    const newSongs = songs.map((song) => {
      if (song.id === currentSong.id) {
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
  }, [currentSong, songs, setSongs]);
  // Event handlers
  const getTime = (time) => {
    return (
      Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
    );
  };
  const dragHandler = (e) => {
    audioRef.current.currentTime = e.target.value;
    setSongInfo({ ...songInfo, currentTime: e.target.value });
  };
  const skipTrackHandler = (direction) => {
    let currentIndex = songs.findIndex((song) => song.id === currentSong.id);
    if (direction === "skip-forward") {
      setCurrentSong(songs[(currentIndex + 1) % songs.length]);
    }
    if (direction === "skip-back") {
      if ((currentIndex - 1) % songs.length === -1) {
        setCurrentSong(songs[songs.length - 1]);
        return;
      }
      setCurrentSong(songs[(currentIndex - 1) % songs.length]);
    }
    PlayAudio(isPlaying, audioRef);
  };

  const changeSpeed = (speed) => {
    if (audioRef.current) {
      audioRef.current.playbackRate = speed;
    }
    setShowSpeedControl(false);
  };
  //Add styles
  const trackAnim = {
    transform: `translateX(${songInfo.animationPercentage}%)`,
  };
  return (
    <div className="player">
      <div className="time-control">
        <p>{getTime(songInfo.currentTime)}</p>
        <div
          className="track"
          style={{
            background: `linear-gradient(to right, ${currentSong.color[0]}, ${currentSong.color[1]})`,
          }}
        >
          <input
            type="range"
            min={0}
            max={songInfo.duration || 0}
            value={songInfo.currentTime}
            onChange={dragHandler}
          />
          <div className="animate-track" style={trackAnim}></div>
        </div>
        <p>{songInfo.duration ? getTime(songInfo.duration) : "0:00"}</p>
      </div>
      <div className="play-control">
        <FontAwesomeIcon
          onClick={() => skipTrackHandler("skip-back")}
          className="skip-back"
          size="2x"
          icon={faAngleLeft}
        />
        <FontAwesomeIcon
          className="play"
          size="2x"
          icon={isPlaying ? faPause : faPlay}
          onClick={playSongHandler}
        />
        <FontAwesomeIcon
          onClick={() => skipTrackHandler("skip-forward")}
          className="skip-forward"
          size="2x"
          icon={faAngleRight}
        />
      </div>
      <div className="playback-speed">
        <div className="current-speed">
          <span>{audioRef.current ? audioRef.current.playbackRate : 1}x</span>
        </div>
        <div className="speed-control-container">
          <FontAwesomeIcon
            onClick={() => setShowSpeedControl(!showSpeedControl)}
            className="speed-icon"
            icon={faTachometerAlt}
          />
          {showSpeedControl && (
            <div className="speed-options">
              {speedOptions.map((speed) => (
                <button
                  key={speed}
                  onClick={() => changeSpeed(speed)}
                  className={
                    audioRef.current && audioRef.current.playbackRate === speed
                      ? "active"
                      : ""
                  }
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
  setCurrentSong: PropTypes.func.isRequired,
  setSongs: PropTypes.func.isRequired,
};

export default Player;
