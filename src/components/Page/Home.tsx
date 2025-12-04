import React, { useMemo } from 'react';
import styles from '../../assets/styles/Home.module.css';
import { ALBUMS, TRACKS } from '../../data/mockData';

const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return 'Chào buổi sáng';
  if (hour < 18) return 'Chào buổi chiều';
  return 'Chào buổi tối';
};

const Home: React.FC = () => {
  const greeting = useMemo(() => getGreeting(), []);

  // Giả lập danh sách "Gần đây" từ TRACKS (Lấy 6 bài đầu)
  const recentPlayed = TRACKS.slice(0, 6);

  return (
    <div className={styles.homeContainer}>
      
      {/* 1. Lời chào */}
      <h1 className={styles.greeting}>{greeting}</h1>

      {/* 2. Grid Gần đây - Dạng thẻ chữ nhật ngang */}
      <div className={styles.recentGrid}>
        {recentPlayed.map((track) => (
          <div key={`recent-${track.id}`} className={styles.recentCard}>
            <img 
              src={track.coverArtUrl || 'https://via.placeholder.com/64'} 
              alt={track.title} 
              className={styles.recentImg} 
            />
            <span className={styles.recentTitle}>{track.title}</span>
          </div>
        ))}
      </div>

      {/* 3. Section: Tuyển tập hàng đầu - Dạng thẻ vuông lớn */}
      <div className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Tuyển tập hàng đầu của bạn</h2>
          <span className={styles.showAll}>Hiện tất cả</span>
        </div>

        <div className={styles.albumGrid}>
          {ALBUMS.map((album) => (
            <div key={album.id} className={styles.albumCard}>
              <div className={styles.albumImageWrapper}>
                <img 
                  src={album.coverUrl || 'https://via.placeholder.com/180'} 
                  alt={album.title} 
                  className={styles.albumImg} 
                />
              </div>
              <div className={styles.albumInfo}>
                <div className={styles.albumTitle}>{album.title}</div>
                <div className={styles.albumDesc}>{album.description}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

       {/* 4. Section: Gợi ý cho hôm nay (Reuse Albums để demo) */}
       <div className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Gợi ý cho hôm nay</h2>
          <span className={styles.showAll}>Hiện tất cả</span>
        </div>

        <div className={styles.albumGrid}>
          {ALBUMS.slice().reverse().map((album) => (
            <div key={`suggest-${album.id}`} className={styles.albumCard}>
              <div className={styles.albumImageWrapper}>
                <img 
                  src={album.coverUrl || 'https://via.placeholder.com/180'} 
                  alt={album.title} 
                  className={styles.albumImg} 
                />
              </div>
              <div className={styles.albumInfo}>
                <div className={styles.albumTitle}>{album.title}</div>
                <div className={styles.albumDesc}>{album.description}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default Home;