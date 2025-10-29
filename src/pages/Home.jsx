// src/pages/Home.jsx
import React from 'react';
import SongCard from './components/SongCard.jsx';
import MusicPlayer from './components/Player/MusicPlayer.jsx';

const sampleSongs = [
  {
    id: 1,
    title: "Blue Lune",
    artist: "Sir Potato",
    duration: "3:45",
    cover: "/audioMOC/cover1.jpg", // sẽ thêm ảnh sau
    src: "/audioMOC/song1.mp3"
  },
  {
    id: 2,
    title: "Moonlight",
    artist: "Luna",
    duration: "4:12",
    cover: "/audioMOC/cover2.jpg",
    src: "/audioMOC/song2.mp3"
  }
];

function Home() {
  return (
    <div className="home">
      <header className="home-header">
        <h1>BlueLune</h1>
        <p>Nghe nhạc không quảng cáo</p>
      </header>

      <main className="song-list">
        <h2>Nổi bật hôm nay</h2>
        <div className="songs-grid">
          {sampleSongs.map(song => (
            <SongCard key={song.id} song={song} />
          ))}
        </div>
      </main>

      {/* Thanh phát nhạc cố định dưới cùng */}
      <MusicPlayer />
    </div>
  );
}

export default Home;