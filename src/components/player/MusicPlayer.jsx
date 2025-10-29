// src/components/Player/MusicPlayer.jsx
import React, { useState, useRef } from 'react';

function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef(null);

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="music-player">
      <audio
        ref={audioRef}
        src="/audioMOC/song1.mp3"
        onTimeUpdate={(e) => setCurrentTime(e.target.currentTime)}
        onLoadedMetadata={(e) => setDuration(e.target.duration)}
      />

      <div className="player-info">
        <img src="/audioMOC/cover1.jpg" alt="cover" />
        <div>
          <h4>Blue Lune</h4>
          <p>Sir Potato</p>
        </div>
      </div>

      <div className="player-controls">
        <button>⏮</button>
        <button onClick={togglePlay} className="play-pause">
          {isPlaying ? '⏸' : '▶'}
        </button>
        <button>⏭</button>
      </div>

      <div className="progress-bar">
        <span>{formatTime(currentTime)}</span>
        <div className="progress">
          <div
            className="progress-filled"
            style={{ width: `${(currentTime / duration) * 100 || 0}%` }}
          />
        </div>
        <span>{formatTime(duration)}</span>
      </div>
    </div>
  );
}

function formatTime(seconds) {
  if (!seconds) return "0:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

export default MusicPlayer;