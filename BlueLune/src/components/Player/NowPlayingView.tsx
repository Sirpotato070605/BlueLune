import React, { useState } from 'react';
import styles from '../../assets/styles/NowPlayingView.module.css';
import coverArt from '../../../public/images/DuoiNhungConMua.jpg'; // Ảnh demo

// Import các icon cần thiết
import { 
  IoClose, 
  IoResize, 
  IoShareSocialOutline, 
  IoAddCircleOutline 
} from "react-icons/io5";

interface NowPlayingViewProps {
  onClose: () => void;
}

const NowPlayingView: React.FC<NowPlayingViewProps> = ({ onClose }) => {
  // State quản lý việc phóng to view (Full content hay bình thường)
  const [isMaximized, setIsMaximized] = useState(false);

  // Mock data cho Next in Queue
  const nextTrack = {
    title: "Chỉ Một Mình Anh",
    artist: "Nam Trương"
  };

  return (
    <aside className={`${styles.container} ${isMaximized ? styles.maximized : ''}`}>
      
      {/* --- HEADER CONTROL --- */}
      <div className={styles.headerControl}>
        <button 
          className={styles.iconBtn} 
          onClick={onClose} 
          title="Ẩn Now Playing View"
        >
          <IoClose size={20} />
        </button>

        <button 
          className={styles.iconBtn} 
          onClick={() => setIsMaximized(!isMaximized)}
          title={isMaximized ? "Thu nhỏ" : "Phóng to"}
        >
          <IoResize size={18} />
        </button>
      </div>

      {/* --- CONTENT SCROLLABLE --- */}
      <div className={styles.scrollContent}>
        
        {/* 1. Ảnh Bài Hát */}
        <div className={styles.coverSection}>
          <img src={coverArt} alt="Cover" className={styles.largeCover} />
        </div>

        {/* 2. Thông tin chính & Nút tác vụ */}
        <div className={styles.trackHeader}>
          <div className={styles.trackInfoMain}>
            <h2 className={styles.songTitle}>Dưới Những Cơn Mưa</h2>
            <p className={styles.artistName}>Mr. Siro</p>
          </div>
          
          <div className={styles.actions}>
            <button className={styles.actionBtn} title="Chia sẻ">
              <IoShareSocialOutline size={22} />
            </button>
            <button className={styles.actionBtn} title="Thêm vào Playlist">
              <IoAddCircleOutline size={22} />
            </button>
          </div>
        </div>

        {/* 3. Credit / Thông tin thêm */}
        <div className={styles.creditSection}>
          <h3>Credit</h3>
          <p>Sáng tác: Mr. Siro</p>
          <p>Hòa âm phối khí: Mr. Siro</p>
          <p>Nguồn: BlueLune Records</p>
        </div>

        {/* 4. Next In Queue */}
        <div className={styles.queueSection}>
          <div className={styles.queueHeader}>
            <h3>Tiếp theo</h3>
            <span className={styles.seeAll}>Xem tất cả</span>
          </div>
          
          <div className={styles.queueItem}>
            <div className={styles.queueIcon}>🎵</div> {/* Hoặc ảnh nhỏ */}
            <div className={styles.queueInfo}>
              <span className={styles.queueTitle}>{nextTrack.title}</span>
              <span className={styles.queueArtist}>{nextTrack.artist}</span>
            </div>
          </div>
          
          {/* Item giả định thêm */}
          <div className={styles.queueItem}>
            <div className={styles.queueIcon}>🎵</div>
            <div className={styles.queueInfo}>
              <span className={styles.queueTitle}>Gió</span>
              <span className={styles.queueArtist}>Jank</span>
            </div>
          </div>
        </div>

      </div>
    </aside>
  );
};

export default NowPlayingView;