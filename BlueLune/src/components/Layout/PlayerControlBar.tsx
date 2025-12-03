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
  MdPictureInPictureAlt,
  MdLyrics,           // Icon cho Lyrics
  MdViewSidebar       // Icon cho Now Playing View
} from "react-icons/md"; 

const DURATION_SECONDS = 300; 

const PlayerControlBar: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration] = useState(DURATION_SECONDS);
  const [volumePercent, setVolumePercent] = useState(100);
  const [isShuffled, setIsShuffled] = useState(false);
  const [isRepeating, setIsRepeating] = useState(0); // 0: off, 1: all, 2: one

  const progressBarRef = useRef<HTMLDivElement>(null);
  const volumeBarRef = useRef<HTMLDivElement>(null);
  const previousVolumeRef = useRef(100);

  // --- Logic Timer ---
  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null;
    if (isPlaying && currentTime < duration) {
      interval = setInterval(() => {
        setCurrentTime((prev) => (prev + 1 >= duration ? duration : prev + 1));
      }, 1000);
    } else if (!isPlaying && interval) {
      clearInterval(interval);
    }
    return () => { if (interval) clearInterval(interval); };
  }, [isPlaying, currentTime, duration]);

  // --- Helpers ---
  const formatTime = (time: number) => {
    const min = Math.floor(time / 60);
    const sec = Math.floor(time % 60);
    return `${min}:${sec < 10 ? '0' : ''}${sec}`;
  };

  const calculatePosition = (e: MouseEvent, ref: React.RefObject<HTMLDivElement | null>) => {
    if (!ref.current) return 0;
    const rect = ref.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    return Math.min(Math.max(0, clickX / rect.width), 1);
  };

  // --- Handlers ---
  const handleProgressStart = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!progressBarRef.current) return;
    const update = (moveEvent: MouseEvent) => {
      const p = calculatePosition(moveEvent, progressBarRef);
      setCurrentTime(p * duration);
    };
    const up = () => {
      document.removeEventListener('mousemove', update);
      document.removeEventListener('mouseup', up);
    };
    document.addEventListener('mousemove', update);
    document.addEventListener('mouseup', up);
    update(e.nativeEvent);
  }, [duration]);

  const handleVolumeStart = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!volumeBarRef.current) return;
    const update = (moveEvent: MouseEvent) => {
      const p = calculatePosition(moveEvent, volumeBarRef);
      setVolumePercent(p * 100);
    };
    const up = () => {
      document.removeEventListener('mousemove', update);
      document.removeEventListener('mouseup', up);
    };
    document.addEventListener('mousemove', update);
    document.addEventListener('mouseup', up);
    update(e.nativeEvent);
  }, []);

  const toggleMute = () => {
    if (volumePercent > 0) {
      previousVolumeRef.current = volumePercent;
      setVolumePercent(0);
    } else {
      setVolumePercent(previousVolumeRef.current || 100);
    }
  };

  const progressPercent = useMemo(() => (duration ? (currentTime / duration) * 100 : 0), [currentTime, duration]);

  return (
    <div className={styles.playerBar}>
      <div className={styles.controls}>
        
        {/* === LEFT: Info === */}
        <div className={styles.leftControls}>
          <img src={coverArt} alt="Cover" className={`${styles.coverArt} ${isPlaying ? styles.spinningCover : ''}`} />
          <div className={styles.songInfo}>
            <span className={styles.songName}>Dưới Những Cơn Mưa</span>
            <span className={styles.artistName}>Mr. Siro</span>
          </div>
        </div>

        {/* === CENTER: Playback === */}
        <div className={styles.centerSection}>
          <div className={styles.centerTopControls}>
            <button 
                className={`${styles.controlButton} ${isShuffled ? styles.activeControl : ''}`} 
                onClick={() => setIsShuffled(!isShuffled)}
                title="Shuffle" 
            >
                <IoShuffle size={20} /> 
            </button>
            
            <button className={styles.controlButton} onClick={() => { setCurrentTime(0); setIsPlaying(true); }} title="Previous">
                <IoPlaySkipBack size={22} />
            </button>
            
            <button 
              className={styles.playButton}
              onClick={() => setIsPlaying(!isPlaying)}
              title={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? <IoPause size={28} /> : <IoPlay size={28} />}
            </button>
            
            <button className={styles.controlButton} onClick={() => { setCurrentTime(duration); setIsPlaying(false); }} title="Next">
                <IoPlaySkipForward size={22} />
            </button>
            
            <button 
                className={`${styles.controlButton} ${isRepeating > 0 ? styles.activeControl : ''}`}
                onClick={() => setIsRepeating((prev) => (prev + 1) % 3)}
                title="Repeat"
            >
                <IoRepeat size={20} />
            </button>
          </div>
          
          <div className={styles.centerBottomProgress}>
            <span className={styles.time}>{formatTime(currentTime)}</span>
            <div className={styles.progressBar} ref={progressBarRef} onMouseDown={handleProgressStart}>
              <div className={styles.progress} style={{ width: `${progressPercent}%` }} />
            </div>
            <span className={styles.time}>{formatTime(duration)}</span>
          </div>
        </div>
        
        {/* === RIGHT: Tools === */}
        <div className={styles.rightControls}>
          
          {/* 1. Now Playing View (Thay thế vị trí Connect cũ) */}
          <button className={styles.controlButton} title="Now Playing View">
              <MdViewSidebar size={20} />
          </button>

          {/* 2. Lyrics (Tách riêng) */}
          <button className={styles.controlButton} title="Lyrics">
              <MdLyrics size={20} />
          </button>
          
          {/* 3. Queue (Tách riêng) */}
          <button className={styles.controlButton} title="Queue">
              <MdQueueMusic size={22} />
          </button>
          
          {/* 4. Mute/Volume */}
          <div className={styles.volumeWrapper}>
            <button className={styles.controlButton} onClick={toggleMute} title="Mute/Unmute">
              {volumePercent === 0 ? <MdVolumeOff size={22} /> : <MdVolumeUp size={22} />}
            </button>
            
            <div className={styles.volumeBarContainer}>
              <div className={styles.volumeBar} ref={volumeBarRef} onMouseDown={handleVolumeStart}>
                <div className={styles.volumeTrack} style={{ width: `${volumePercent}%` }} />
                <div className={styles.volumeKnob} style={{ left: `${volumePercent}%` }} />
              </div>
            </div>
          </div>
          
          {/* 5. Miniplayer */}
          <button className={styles.controlButton} title="Miniplayer">
              <MdPictureInPictureAlt size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlayerControlBar;