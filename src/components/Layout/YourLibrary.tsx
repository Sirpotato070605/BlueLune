// src/components/Layout/YourLibrary.tsx
import React, { useState, useCallback, useEffect, useRef } from 'react';
import styles from '../../assets/styles/YourLibrary.module.css';
import { IoLibrary, IoGridOutline } from "react-icons/io5";
import { ALBUMS } from '../../data/mockData';

interface YourLibraryProps {
  isCollapsed: boolean;
  onToggle: () => void;
}

const YourLibrary: React.FC<YourLibraryProps> = ({ isCollapsed, onToggle }) => {
  // State quản lý chiều rộng, mặc định 280px
  const [width, setWidth] = useState(280);
  const [isResizing, setIsResizing] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);

  const startResizing = useCallback(() => setIsResizing(true), []);
  const stopResizing = useCallback(() => setIsResizing(false), []);

  const resize = useCallback(
    (mouseMoveEvent: MouseEvent) => {
      if (isResizing) {
        // Tính toán width mới dựa trên vị trí chuột
        // Vì Library bên trái, width = vị trí X của chuột
        const newWidth = mouseMoveEvent.clientX; 
        if (newWidth > 72 && newWidth < 450) { // Giới hạn min/max
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
      // Nếu không bị thu gọn thì dùng width custom, ngược lại dùng width mặc định của class collapsed
      style={!isCollapsed ? { width: `${width}px` } : {}}
    >
      <div className={styles.libraryHeader}>
        <div 
          className={styles.headerTitle} 
          onClick={onToggle} 
          title={isCollapsed ? "Mở rộng" : "Thu gọn"}
        >
          <IoLibrary size={24} className={styles.icon} />
          {!isCollapsed && <span className={styles.text}>Thư viện</span>}
        </div>
        
        {!isCollapsed && (
             <div className={styles.headerActions}>
                <IoGridOutline size={18} />
             </div>
        )}
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
              src={album.coverUrl || 'https://via.placeholder.com/50'} 
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

      {/* Thanh kéo thay đổi kích thước (chỉ hiện khi chưa thu gọn) */}
      {!isCollapsed && (
        <div className={styles.resizer} onMouseDown={startResizing}></div>
      )}
    </aside>
  );
};

export default YourLibrary;