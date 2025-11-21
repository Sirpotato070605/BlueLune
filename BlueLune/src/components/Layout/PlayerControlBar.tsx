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
} from "react-icons/md"; 

const DURATION_SECONDS = 300; 

const PlayerControlBar: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration] = useState(DURATION_SECONDS);
  const [volumePercent, setVolumePercent] = useState(100);
  const [isShuffled, setIsShuffled] = useState(false);
  const [isRepeating, setIsRepeating] = useState(0);

  const progressBarRef = useRef<HTMLDivElement>(null);
  const volumeBarRef = useRef<HTMLDivElement>(null);
  
  // Ref để lưu trữ âm lượng trước khi mute
  const previousVolumeRef = useRef(100);

  // --- Logic Chạy Thời gian (Timer) ---
  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null;
    
    if (isPlaying && currentTime < duration) {
      interval = setInterval(() => {
        setCurrentTime((prevTime) => {
          const newTime = prevTime + 1;
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

const calculatePosition = (e: MouseEvent, ref: React.RefObject<HTMLDivElement | null>) => {
  if (!ref.current) return 0;
  const rect = ref.current.getBoundingClientRect();
  const clientX = e.clientX;
  const clickX = clientX - rect.left;
  return Math.min(Math.max(0, clickX / rect.width), 1);
};
  
  // Xử lý Progress Bar
  const handleProgressStart = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    // Chỉ kích hoạt nếu click trực tiếp vào thanh bar
    if (!progressBarRef.current || !progressBarRef.current.contains(e.target as Node)) return;
    
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
    if (!volumeBarRef.current || !volumeBarRef.current.contains(e.target as Node)) return;
    
    const onMouseMove = (moveEvent: MouseEvent) => {
      const percent = calculatePosition(moveEvent, volumeBarRef) * 100;
      setVolumePercent(percent);
    };

    const onMouseUp = () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);

    const percent = calculatePosition(e.nativeEvent, volumeBarRef) * 100;
    setVolumePercent(percent);
    
  }, []);
  
  // --- Logic Nút Previous và Next ---
  const handlePrevious = () => {
      setCurrentTime(0); 
      setIsPlaying(true); // Tự động play lại
  };

  const handleNext = () => {
      setCurrentTime(duration); 
      setIsPlaying(false); 
  };

  // --- Logic Nút Mute ---
  const toggleMute = () => {
    if (volumePercent > 0) {
      previousVolumeRef.current = volumePercent; // Lưu lại âm lượng hiện tại
      setVolumePercent(0); // Tắt âm
    } else {
      // Khôi phục âm lượng (nếu trước đó là 0 thì mặc định 100)
      setVolumePercent(previousVolumeRef.current > 0 ? previousVolumeRef.current : 100);
    }
  };
  
  // Tính toán phần trăm
  const progressPercent = useMemo(() => {
    return duration > 0 ? (currentTime / duration) * 100 : 0;
  }, [currentTime, duration]);


  return (
    <div className={styles.playerBar}>
      <div className={styles.controls}>
        
        {/* === PHẦN BÊN TRÁI === */}
        <div className={styles.leftControls}>
          <img src={coverArt} alt="Cover"
          className={`${styles.coverArt} ${isPlaying ? styles.spinningCover : ''}`}
          />
          <div className={styles.songInfo}>
            <span className={styles.songName}>Dưới Những Cơn Mưa</span>
            <span className={styles.artistName}>Mr. Siro</span>
          </div>
        </div>

        {/* === PHẦN TRUNG TÂM === */}
        <div className={styles.centerSection}>
          <div className={styles.centerTopControls}>
            <button 
                className={`${styles.controlButton} ${isShuffled ? styles.activeControl : ''}`} 
                onClick={() => setIsShuffled(!isShuffled)}
                title="Shuffle" 
            >
                <IoShuffle size={20} /> 
            </button>
            {/* THAY ĐỔI: Sử dụng Icon */}
            <button className={styles.controlButton} onClick={handlePrevious} title="Previous">
                <IoPlaySkipBack size={22} />
            </button>
              <button 
                className={styles.playButton}
                onClick={() => setIsPlaying(!isPlaying)}
                title={isPlaying ? 'Pause' : 'Play'}
              >
                {isPlaying ? <IoPause size={28} /> : <IoPlay size={28} />}
              </button>
            {/* THAY ĐỔI: Sử dụng Icon */}
            <button className={styles.controlButton} onClick={handleNext} title="Next">
                <IoPlaySkipForward size={22} />
            </button>
              <button 
                  className={`${styles.controlButton} ${isRepeating > 0 ? styles.activeControl : ''}`}
                  onClick={() => setIsRepeating((isRepeating + 1) % 3)}
                  title="Repeat"
              >
                  <IoRepeat size={20} />
              </button>
          </div>
          
          <div className={styles.centerBottomProgress}>
            <span className={styles.time}>{formatTime(currentTime)}</span>
            
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
            
            <span className={styles.time}>
                {formatTime(duration)}
            </span>
          </div>
        </div>
        
        {/* === PHẦN BÊN PHẢI === */}
        <div className={styles.rightControls}>
          {/* THAY ĐỔI: Sử dụng Icon */}
          <button className={styles.controlButton} title="Queue/Lyrics">
              <MdQueueMusic size={22} />
          </button>
          
          {/* Nút Connect (Giữ lại vì chưa import icon phù hợp) */}
          <button className={styles.controlButton} title="Connect to a device">Connect</button>
          
          {/* THAY ĐỔI: Sử dụng Icon và logic mute */}
          <button className={styles.controlButton} onClick={toggleMute} title={volumePercent === 0 ? "Unmute" : "Mute"}>
            {volumePercent === 0 ? <MdVolumeOff size={22} /> : <MdVolumeUp size={22} />}
          </button>
          
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
          
          {/* THAY ĐỔI: Sử dụng Icon */}
          <button className={styles.controlButton} title="Miniplayer">
              <MdPictureInPictureAlt size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlayerControlBar;