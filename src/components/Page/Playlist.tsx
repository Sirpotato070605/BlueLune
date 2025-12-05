import React, { useMemo } from 'react';
import styles from '../../assets/styles/Playlist.module.css';
import { ALBUMS, CURRENT_USER, getTracksByAlbum } from '../../data/mockData';
import { 
    IoPlay, 
    IoShuffle, 
    IoHeartOutline, 
    IoArrowDownCircleOutline, 
    IoEllipsisHorizontal, 
    IoSearch, 
    IoListOutline,
    IoTimeOutline 
} from "react-icons/io5";

const Playlist: React.FC = () => {
  // Lấy dữ liệu mẫu: Album đầu tiên trong danh sách
  const currentAlbum = ALBUMS[0]; 
  const albumTracks = useMemo(() => getTracksByAlbum(currentAlbum.id), [currentAlbum]);

  // Tính tổng thời lượng (phút)
  const totalDurationMin = Math.floor(albumTracks.reduce((acc, curr) => acc + curr.duration, 0) / 60);

  // Format thời lượng bài hát (giây -> mm:ss)
  const formatDuration = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div className={styles.playlistContainer}>
      
      {/* HEADER: Ảnh bìa & Thông tin */}
      <div className={styles.header}>
        <img 
            src={currentAlbum.coverUrl} 
            alt={currentAlbum.title} 
            className={styles.coverImage} 
        />
        <div className={styles.playlistInfo}>
            <span className={styles.publicLabel}>Public Playlist</span>
            <h1 className={styles.title}>{currentAlbum.title}</h1>
            <p className={styles.description}>{currentAlbum.description}</p>
            
            <div className={styles.meta}>
                <img src={CURRENT_USER.avatarUrl} alt="User" className={styles.userAvatar} />
                <b>{CURRENT_USER.name}</b>
                <span>•</span>
                <span>{albumTracks.length} songs,</span>
                <span>khoảng {totalDurationMin} phút</span>
            </div>
        </div>
      </div>

      {/* CONTROLS: Các nút chức năng */}
      <div className={styles.controls}>
        <button className={styles.playButton} title="Play">
            <IoPlay size={28} />
        </button>
        
        <button className={styles.actionButton} title="Shuffle">
            <IoShuffle size={32} />
        </button>
        
        <button className={styles.actionButton} title="Save to Library">
            <IoHeartOutline size={32} />
        </button>

        <button className={styles.actionButton} title="Download">
            <IoArrowDownCircleOutline size={32} />
        </button>

        <button className={styles.actionButton} title="More options">
            <IoEllipsisHorizontal size={32} />
        </button>

        <div className={styles.spacer}></div>

        <div className={styles.searchOrder}>
            <IoSearch size={20} />
            <span>Custom order</span>
            <IoListOutline size={20} />
        </div>
      </div>

      {/* TRACK LIST TABLE */}
      <div className={styles.tableContainer}>
        {/* Table Header */}
        <div className={styles.tableHeader}>
            <div>#</div>
            <div>Title</div>
            <div>Album</div>
            <div>Date added</div>
            <div style={{textAlign: 'right'}}><IoTimeOutline size={18} /></div>
        </div>

        {/* Rows */}
        <div className={styles.trackList}>
            {albumTracks.map((track, index) => (
                <div key={track.id} className={styles.trackRow}>
                    {/* Index / Play Icon hover */}
                    <div className={styles.indexContainer}>
                        <span className={styles.index}>{index + 1}</span>
                        <IoPlay className={styles.playIcon} />
                    </div>

                    {/* Title + Image + Artist */}
                    <div className={styles.trackMain}>
                        <img src={track.coverArtUrl} alt="" className={styles.trackCover} />
                        <div className={styles.trackInfo}>
                            <span className={styles.trackTitle}>{track.title}</span>
                            <span className={styles.trackArtist}>{track.artist}</span>
                        </div>
                    </div>

                    {/* Album Name (Mock data as user requested structure) */}
                    <div className={styles.albumName}>{currentAlbum.title}</div>

                    {/* Date Added (Mock data) */}
                    <div className={styles.dateAdded}>Feb 27, 2025</div>

                    {/* Duration */}
                    <div className={styles.duration}>{formatDuration(track.duration)}</div>
                </div>
            ))}
        </div>
      </div>

    </div>
  );
};

export default Playlist;