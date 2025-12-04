import React, { useState, useCallback, useEffect, useRef } from 'react';
import styles from '../../assets/styles/NowPlayingView.module.css';
import coverArt from '../../../public/images/DuoiNhungConMua.jpg';

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
  const [isMaximized, setIsMaximized] = useState(false);
  const [sidebarWidth, setSidebarWidth] = useState(350); 
  const [isResizing, setIsResizing] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);

  const MIN_WIDTH = 280; 
  const MAX_WIDTH = 450; 

  const startResizing = useCallback(() => {
    setIsResizing(true);
  }, []);

  const stopResizing = useCallback(() => {
    setIsResizing(false);
  }, []);

  const resize = useCallback(
    (mouseMoveEvent: MouseEvent) => {
      if (isResizing) {
        const newWidth = window.innerWidth - mouseMoveEvent.clientX;
        
        if (newWidth > MIN_WIDTH && newWidth < MAX_WIDTH) {
          setSidebarWidth(newWidth);
        }
      }
    },
    [isResizing]
  );

  useEffect(() => {
    window.addEventListener("mousemove", resize);
    window.addEventListener("mouseup", stopResizing);
    return () => {
      window.removeEventListener("mousemove", resize);
      window.removeEventListener("mouseup", stopResizing);
    };
  }, [resize, stopResizing]);


  const nextTrack = { title: "Chỉ Một Mình Anh", artist: "Nam Trương" };

  return (
    <aside 
      ref={sidebarRef}
      className={`${styles.container} ${isMaximized ? styles.maximized : ''} ${isResizing ? styles.resizing : ''}`}
      style={!isMaximized ? { width: `${sidebarWidth}px` } : {}}
    >
      
      {!isMaximized && (
        <div className={styles.resizer} onMouseDown={startResizing}></div>
      )}

      <div className={styles.headerControl}>
        <button 
          className={styles.iconBtn} 
          onClick={onClose} 
          title="Đóng"
        >
          <IoClose size={22} />
        </button>

        <button 
          className={styles.iconBtn} 
          onClick={() => setIsMaximized(!isMaximized)}
          title={isMaximized ? "Thu nhỏ" : "Phóng to"}
        >
          <IoResize size={18} />
        </button>
      </div>

      <div className={styles.scrollContent}>
        
        <div className={styles.coverSection}>
          <img src={coverArt} alt="Cover" className={styles.largeCover} />
        </div>

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

        <div className={styles.creditSection}>
          <h3>Credit</h3>
          <p>Sáng tác: Mr. Siro</p>
          <p>Hòa âm phối khí: Mr. Siro</p>
          <p>Nguồn: BlueLune Records</p>
        </div>

        <div className={styles.queueSection}>
          <div className={styles.queueHeader}>
            <h3>Tiếp theo</h3>
            <span className={styles.seeAll}>Xem tất cả</span>
          </div>
          
          <div className={styles.queueItem}>
            <div className={styles.queueIcon}>🎵</div> 
            <div className={styles.queueInfo}>
              <span className={styles.queueTitle}>{nextTrack.title}</span>
              <span className={styles.queueArtist}>{nextTrack.artist}</span>
            </div>
          </div>
          
          <div className={styles.queueItem}>
            <div className={styles.queueIcon}>🎵</div>
            <div className={styles.queueInfo}>
              <span className={styles.queueTitle}>Gió</span>
              <span className={styles.queueArtist}>Jank</span>
            </div>
          </div>

          <div className={styles.queueItem}>
            <div className={styles.queueIcon}>🎵</div>
            <div className={styles.queueInfo}>
              <span className={styles.queueTitle}>Sóng gió</span>
              <span className={styles.queueArtist}>Jack</span>
            </div>
          </div>


        </div>

      </div>
    </aside>
  );
};

export default NowPlayingView;