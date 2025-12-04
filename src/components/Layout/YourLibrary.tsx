import React, { useState, useCallback, useEffect, useRef } from 'react';
import styles from '../../assets/styles/YourLibrary.module.css';
import { IoLibrary} from "react-icons/io5";
import { ALBUMS } from '../../../public/data/mockData';

interface YourLibraryProps {
  isCollapsed: boolean;
  onToggle: () => void;
}

const YourLibrary: React.FC<YourLibraryProps> = ({ isCollapsed, onToggle }) => {
  const [width, setWidth] = useState(280);
  const [isResizing, setIsResizing] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);

  const startResizing = useCallback(() => setIsResizing(true), []);
  const stopResizing = useCallback(() => setIsResizing(false), []);

  const resize = useCallback(
    (mouseMoveEvent: MouseEvent) => {
      if (isResizing) {
        const newWidth = mouseMoveEvent.clientX; 
        if (newWidth > 72 && newWidth < 450) { 
          setWidth(newWidth);
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

  return (
    <aside 
      ref={sidebarRef}
      className={`${styles.libraryContainer} ${isCollapsed ? styles.collapsed : ''} ${isResizing ? styles.resizing : ''}`}
      style={!isCollapsed ? { width: `${width}px` } : {}}
    >
      <div className={styles.libraryHeader}>
        <div 
          className={styles.headerTitle} 
          onClick={onToggle} 
          title={isCollapsed ? "Mở rộng" : "Thu gọn"}
        >
          <IoLibrary size={24} className={styles.icon} />
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
          <div key={album.id} className={styles.libraryItem}>
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
    </aside>
  );
};

export default YourLibrary;