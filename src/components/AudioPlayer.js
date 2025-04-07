import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

// List of free lofi beats from freesound.org
const audioFiles = [
  '/audio/lofi-beat-1.mp3',
  '/audio/lofi-beat-2.mp3',
  '/audio/lofi-beat-3.mp3',
  '/audio/lofi-beat-4.mp3',
  '/audio/lofi-beat-5.mp3',
];

const AudioPlayer = ({ isPlaying, onTimeUpdate, onLoadedMetadata, onError }) => {
  const audioRef = useRef(null);
  
  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(error => {
          console.error('Error playing audio:', error);
          onError && onError(error);
        });
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, onError]);

  return (
    <audio
      ref={audioRef}
      src={audioFiles[0]} // Default to first track
      onTimeUpdate={onTimeUpdate}
      onLoadedMetadata={onLoadedMetadata}
      onError={onError}
    />
  );
};

AudioPlayer.propTypes = {
  isPlaying: PropTypes.bool.isRequired,
  onTimeUpdate: PropTypes.func,
  onLoadedMetadata: PropTypes.func,
  onError: PropTypes.func,
};

export default AudioPlayer;
