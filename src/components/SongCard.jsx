// src/components/SongCard.jsx
import React from 'react';

function SongCard({ song }) {
  return (
    <div className="song-card">
      <img src={song.cover} alt={song.title} className="song-cover" />
      <div className="song-info">
        <h3>{song.title}</h3>
        <p>{song.artist}</p>
        <span>{song.duration}</span>
      </div>
      <button className="play-btn">▶</button>
    </div>
  );
}

export default SongCard;