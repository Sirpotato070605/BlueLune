import React, { useState, useCallback, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../../assets/styles/YourLibrary.module.css';
import { LuLibraryBig } from "react-icons/lu";
import { ALBUMS } from '../../data/mockData';

interface YourLibraryProps {
  isCollapsed: boolean;
  onToggle: (collapsed: boolean) => void; 
}

const YourLibrary: React.FC<YourLibraryProps> = ({ isCollapsed, onToggle }) => {
  const [width, setWidth] = useState(280);
  const [isResizing, setIsResizing] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const startResizing = useCallback(() => setIsResizing(true), []);
  const stopResizing = useCallback(() => setIsResizing(false), []);

  const resize = useCallback(
    (mouseMoveEvent: MouseEvent) => {
      if (isResizing) {
        const newWidth = mouseMoveEvent.clientX; 
        

        const COLLAPSE_THRESHOLD = 180; 
        const MAX_WIDTH = 480;

        if (newWidth < COLLAPSE_THRESHOLD) {
            if (!isCollapsed) onToggle(true);
        } else if ( newWidth < MAX_WIDTH) {
            if (isCollapsed) onToggle(false);
            setWidth(newWidth);
        }
      }
    },
    [isResizing, isCollapsed, onToggle]
  );

  useEffect(() => {
    window.addEventListener("mousemove", resize);
    window.addEventListener("mouseup", stopResizing);
    return () => {
      window.removeEventListener("mousemove", resize);
      window.removeEventListener("mouseup", stopResizing);
    };
  }, [resize, stopResizing]);

  const handlePlaylistClick = () => {
    navigate('/playlist');
  };

  return (
    <aside 
      ref={sidebarRef}
      className={`${styles.libraryContainer} ${isCollapsed ? styles.collapsed : ''} ${isResizing ? styles.resizing : ''}`}
      style={!isCollapsed ? { width: `${width}px` } : {}}
    >
      <div className={styles.libraryHeader}>
        <div 
          className={styles.headerTitle} 
          onClick={() => onToggle(!isCollapsed)}  
          title={isCollapsed ? "Mở rộng" : "Thu gọn"}
        >
          <LuLibraryBig size={24} className={styles.icon} />
          {!isCollapsed && <span className={styles.text}>Your Library</span>}
        </div>
      </div>

      {!isCollapsed && (
          <div className={styles.filterTags}>
            <span className={styles.tag}>Playlist</span>
            <span className={styles.tag}>Nghệ sĩ</span>
          </div>
      )}

      <div className={styles.scrollContent}>
        {ALBUMS.map((album) => (
          <div 
            key={album.id} 
            className={styles.libraryItem}
            onClick={handlePlaylistClick} 
          >
            <img 
              src={album.coverUrl} 
              alt={album.title} 
              className={styles.itemImg} 
            />
            {!isCollapsed && (
              <div className={styles.itemInfo}>
                <div className={styles.itemTitle}>{album.title}</div>
                <div className={styles.itemSub}>{album.description}</div>
              </div>
            )}
          </div>
        ))}
      </div>

      {!isCollapsed && (
        <div className={styles.resizer} onMouseDown={startResizing}></div>
      )}
      
      {!isCollapsed && (
        <div className={styles.resizer}
        style={{width: '10px', right: '-5px', zIndex: 100}}
        onMouseDown={startResizing}></div>
      )}
    </aside>
  );
};

export default YourLibrary;