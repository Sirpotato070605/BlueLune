import React, { useState, useCallback, useRef, useEffect, useMemo } from 'react';
import styles from '../../assets/styles/PlayerControlBar.module.css';
import coverArt from '../../../public/images/DuoiNhungConMua.jpg';

import { 
  IoPlay, 
  IoPause, 
  IoPlaySkipBack, 
  IoPlaySkipForward, 
  IoShuffle, 
  IoRepeat 
} from "react-icons/io5";
import { 
  MdVolumeUp, 
  MdVolumeOff, 
  MdQueueMusic, 
  MdPictureInPictureAlt 
} from "react-icons/md"; // Dùng thêm icon Material Design

const DURATION_SECONDS = 300; // Tổng thời gian: 5 phút = 300 giây

const PlayerControlBar: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration] = useState(DURATION_SECONDS);
  const [volumePercent, setVolumePercent] = useState(100);
  const [isShuffled, setIsShuffled] = useState(false);
  const [isRepeating, setIsRepeating] = useState(0);

  const progressBarRef = useRef<HTMLDivElement>(null);
  const volumeBarRef = useRef<HTMLDivElement>(null);

  // --- Logic Chạy Thời gian (Timer) ---
  useEffect(() => {
let interval: ReturnType<typeof setInterval> | null = null;
    
    if (isPlaying && currentTime < duration) {
      interval = setInterval(() => {
        setCurrentTime((prevTime) => {
          const newTime = prevTime + 1;
          // Tự động dừng khi hết bài
          if (newTime >= duration) {
            setIsPlaying(false);
            if (interval) clearInterval(interval);
            return duration; 
          }
          return newTime;
        });
      }, 1000);
    } else if (!isPlaying && interval) {
      clearInterval(interval);
    }
    
    // Cleanup function
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlaying, currentTime, duration]);


  // --- Logic Kéo và Thả (Drag and Drop) ---

  const formatTime = (timeInSeconds: number): string => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const calculatePosition = (e: MouseEvent, ref: React.RefObject<HTMLDivElement>) => {
    if (!ref.current) return 0;
    const rect = ref.current.getBoundingClientRect();
    const clientX = e.clientX;
    const clickX = clientX - rect.left;
    return Math.min(Math.max(0, clickX / rect.width), 1); // Trả về giá trị từ 0 đến 1
  };
  
  // Xử lý Progress Bar
  const handleProgressStart = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target !== progressBarRef.current && e.currentTarget !== progressBarRef.current) return;
    
    const onMouseMove = (moveEvent: MouseEvent) => {
      const percent = calculatePosition(moveEvent, progressBarRef) * 100;
      const newTime = (percent / 100) * duration;
      setCurrentTime(newTime);
    };

    const onMouseUp = () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
    
    // Xử lý click ban đầu
    const percent = calculatePosition(e.nativeEvent, progressBarRef) * 100;
    const newTime = (percent / 100) * duration;
    setCurrentTime(newTime);

  }, [duration]);

  // Xử lý Volume Bar
  const handleVolumeStart = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target !== volumeBarRef.current && e.currentTarget !== volumeBarRef.current) return;
    
    const onMouseMove = (moveEvent: MouseEvent) => {
      const percent = calculatePosition(e.nativeEvent, volumeBarRef) * 100;
      setVolumePercent(percent);
    };

    const onMouseUp = () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);

    // Xử lý click ban đầu
    const percent = calculatePosition(e as unknown as MouseEvent, volumeBarRef) * 100;
    setVolumePercent(percent);
    
  }, []);
  
  // --- Logic Nút Previous và Next ---
  const handlePrevious = () => {
      setCurrentTime(0); // Reset thời gian về 0
      setIsPlaying(false); // Dừng phát (tùy chọn)
  };

  const handleNext = () => {
      setCurrentTime(duration); // Chuyển đến cuối bài
      setIsPlaying(false); // Tự động dừng
  };
  
  // Tính toán phần trăm tiến trình
  const progressPercent = useMemo(() => {
    return duration > 0 ? (currentTime / duration) * 100 : 0;
  }, [currentTime, duration]);


  return (
    <div className={styles.playerBar}>
      <div className={styles.controls}>
        
        {/* === PHẦN BÊN TRÁI: Ảnh và Tên Bài hát === */}
        <div className={styles.leftControls}>
          <img src={coverArt} alt="Cover"
          className={`${styles.coverArt} ${isPlaying ? styles.spinningCover : ''}`}
          />
          <div className={styles.songInfo}>
            <span className={styles.songName}>Dưới Những Cơn Mưa</span>
            <span className={styles.artistName}>Mr. Siro</span>
          </div>
        </div>

        {/* === PHẦN TRUNG TÂM: Nút điều khiển và Progress Bar (CĂN GIỮA) === */}
        <div className={styles.centerSection}>
          <div className={styles.centerTopControls}>
            <button 
                className={`${styles.controlButton} ${isShuffled ? styles.activeControl : ''}`} 
                onClick={() => setIsShuffled(!isShuffled)}
                title="Shuffle" // Thêm title để giữ trợ năng (accessibility)
            >
                <IoShuffle size={20} /> {/* Tùy chỉnh kích thước */}
            </button>
            <button className={styles.controlButton} onClick={handlePrevious}>{/* ⏮️ */} Previous</button>
              <button 
                className={styles.playButton}
                onClick={() => setIsPlaying(!isPlaying)}
                title={isPlaying ? 'Pause' : 'Play'}
              >
                {/* Thay đổi icon dựa trên state isPlaying */}
                {isPlaying ? <IoPause size={28} /> : <IoPlay size={28} />}
              </button>
            <button className={styles.controlButton} onClick={handleNext}>{/* ⏭️ */} Next</button>
              <button 
                  className={`${styles.controlButton} ${isRepeating > 0 ? styles.activeControl : ''}`}
                  onClick={() => setIsRepeating((isRepeating + 1) % 3)}
                  title="Repeat"
              >
                  <IoRepeat size={20} />
                  {/* Bạn có thể thêm logic để hiển thị số (isRepeating) nếu muốn */}
              </button>
          </div>
          
          <div className={styles.centerBottomProgress}>
            {/* Thời gian đã phát */}
            <span className={styles.time}>{formatTime(currentTime)}</span>
            
            {/* Thanh Progress Bar (Dùng onMouseDown để bắt đầu kéo) */}
            <div 
                className={styles.progressBar} 
                ref={progressBarRef} 
                onMouseDown={handleProgressStart}
            >
              <div 
                className={styles.progress} 
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            
            {/* Chỉ hiển thị tổng thời gian bài hát */}
            <span className={styles.time}>
                {formatTime(duration)}
            </span>
          </div>
        </div>
        
        {/* === PHẦN BÊN PHẢI: Các nút chức năng và Âm lượng === */}
        <div className={styles.rightControls}>
          <button className={styles.controlButton}>{/* 📜 */} Lyric</button>
          <button className={styles.controlButton}>{/* 📱 */} Connect</button>
          <button className={styles.controlButton}>{/* 🔈 */} Mute</button>
          
          {/* Thanh Âm lượng (Dùng onMouseDown để bắt đầu kéo) */}
          <div className={styles.volumeBarContainer}>
            <div 
                className={styles.volumeBar} 
                ref={volumeBarRef}
                onMouseDown={handleVolumeStart}
            >

            <div 
                className={styles.volumeTrack} 
                style={{ width: `${volumePercent}%` }} 
              />

              <div 
                className={styles.volumeKnob} 
                style={{ left: `${volumePercent}%` }} 
              />
            </div>
          </div>
          
          <button className={styles.controlButton}>{/* 🖼️ */} Miniplayer</button>
        </div>
      </div>
    </div>
  );
};

export default PlayerControlBar;