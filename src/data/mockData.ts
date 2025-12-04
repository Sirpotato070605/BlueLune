// src/data/mockData.ts
import type { User, Track, Album } from '../types';

// 1. Dữ liệu User
export const CURRENT_USER: User = {
  id: 'u001',
  name: 'Nam Trương',
  avatarUrl: '/images/GaoXanh.jpg', 
  isAuthenticated: true,
};

// 2. Dữ liệu Bài hát (Tracks)
export const TRACKS: Track[] = [
  {
    id: 't001',
    title: 'Chỉ Một Mình Anh',
    artist: 'Nam Trương',
    // LINK_AUDIO: Điền link file mp3 vào đây
    audioUrl: 'LINK_AUDIO_CUA_BAN_O_DAY', 
    // LINK_IMAGE: Điền link ảnh bìa bài hát
    coverArtUrl: 'LINK_ANH_BIA_O_DAY',
    duration: 293,
  },
  {
    id: 't002',
    title: 'Dưới Những Cơn Mưa',
    artist: 'Mr. Siro',
    audioUrl: 'LINK_AUDIO_CUA_BAN_O_DAY',
    coverArtUrl: 'LINK_ANH_BIA_O_DAY',
    duration: 185,
  },
  {
    id: 't003',
    title: 'Gió',
    artist: 'Jank',
    audioUrl: 'LINK_AUDIO_CUA_BAN_O_DAY',
    coverArtUrl: 'LINK_ANH_BIA_O_DAY',
    duration: 240,
  },
  {
    id: 't004',
    title: 'Making My Way',
    artist: 'Sơn Tùng M-TP',
    audioUrl: 'LINK_AUDIO_CUA_BAN_O_DAY',
    coverArtUrl: 'LINK_ANH_BIA_O_DAY',
    duration: 210,
  },
  {
    id: 't005',
    title: 'Nấu ăn cho em',
    artist: 'Đen Vâu',
    audioUrl: 'LINK_AUDIO_CUA_BAN_O_DAY',
    coverArtUrl: 'LINK_ANH_BIA_O_DAY',
    duration: 250,
  }
];

// 3. Dữ liệu Album / Playlist
export const ALBUMS: Album[] = [
  {
    id: 'al001',
    title: 'Tuyển Tập Nhạc Buồn',
    description: 'Mr. Siro, Chillies và nhiều hơn nữa',
    // LINK_IMAGE_ALBUM
    coverUrl: 'LINK_ANH_ALBUM_O_DAY', 
    trackIds: ['t001', 't002']
  },
  {
    id: 'al002',
    title: 'Rap Việt Hay Nhất',
    description: 'Đen Vâu, Binz, Karik',
    coverUrl: 'LINK_ANH_ALBUM_O_DAY',
    trackIds: ['t005']
  },
  {
    id: 'al003',
    title: 'V-Pop Thịnh Hành',
    description: 'Cập nhật những bài hát mới nhất',
    coverUrl: 'LINK_ANH_ALBUM_O_DAY',
    trackIds: ['t003', 't004']
  },
  {
    id: 'al004',
    title: 'Nhạc Lofi Chill',
    description: 'Học tập và làm việc hiệu quả',
    coverUrl: 'LINK_ANH_ALBUM_O_DAY',
    trackIds: ['t001']
  }
];

// Helper function để lấy bài hát theo ID
export const getTracksByAlbum = (albumId: string): Track[] => {
  const album = ALBUMS.find(a => a.id === albumId);
  if (!album) return [];
  return TRACKS.filter(track => album.trackIds.includes(track.id));
};