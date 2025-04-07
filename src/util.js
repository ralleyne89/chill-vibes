export const PlayAudio = (isPlaying, audioRef) => {
  if (isPlaying) {
    const playPromise = audioRef.current.play();
    if (playPromise !== undefined) {
      playPromise.catch((error) => {
        console.error("PlayAudio error:", error);
        // Try to play again after a short delay
        setTimeout(() => {
          audioRef.current
            .play()
            .catch((e) => console.error("Retry failed:", e));
        }, 1000);
      });
    }
  }
};
