import type { User, Track, Album } from '../../src/types';


export const CURRENT_USER: User = {
  id: 'u001',
  name: 'Nam Trương',
  avatarUrl: '/images/GaoXanh.jpg', 
  isAuthenticated: true,
};


export const TRACKS: Track[] = [
  {
    id: 't001',
    title: 'Ngày Em Đẹp Nhất',
    artist: 'Tama',
    audioUrl: 'LINK_AUDIO_CUA_BAN_O_DAY', 
    coverArtUrl: './imagesSong/chimotminhanh.jpg',
    duration: 293,
  },
  {
    id: 't002',
    title: 'Dưới Những Cơn Mưa',
    artist: 'Mr. Siro',
    audioUrl: 'LINK_AUDIO_CUA_BAN_O_DAY',
    coverArtUrl: './imagesSong/DuoiNhungConMua.jpg',
    duration: 185,
  },
  {
    id: 't003',
    title: 'Gió',
    artist: 'Jank',
    audioUrl: 'LINK_AUDIO_CUA_BAN_O_DAY',
    coverArtUrl: './imagesSong/Gio.jpg',
    duration: 240,
  },
  {
    id: 't004',
    title: 'yêu Đơn Phương Là Gì',
    artist: 'Nam Trương',
    audioUrl: 'LINK_AUDIO_CUA_BAN_O_DAY',
    coverArtUrl: './imagesSong/YeuDonPhuongLaGi.jpg',
    duration: 210,
  },
  {
    id: 't005',
    title: 'Phố Cũ Còn Anh',
    artist: 'Quinn',
    audioUrl: 'LINK_AUDIO_CUA_BAN_O_DAY',
    coverArtUrl: './imagesSong/PhoCuConAnh.jpg',
    duration: 250,
  }
];


export const ALBUMS: Album[] = [
  {
    id: 'al001',
    title: 'Nhạc Nhòa',
    description: 'Mr. Siro, Chillies và nhiều hơn nữa',
    coverUrl: '/public/imgAlbum/NhacNhoa.jpg', 
    trackIds: ['t001', 't002']
  },
  {
    id: 'al002',
    title: 'Suy Tình',
    description: 'Đen Vâu, Binz, Karik',
    coverUrl: './public/imgAlbum/SuyTinh.jpg',
    trackIds: ['t005']
  },
  {
    id: 'al003',
    title: 'V-Pop Thịnh Hành',
    description: 'Cập nhật những bài hát mới nhất',
    coverUrl: './public/imgAlbum/VPop.jpg',
    trackIds: ['t003', 't004']
  },
  {
    id: 'al004',
    title: 'Nhạc Lofi Chill',
    description: 'Học tập và làm việc hiệu quả',
    coverUrl: './public/imgAlbum/LofiChill.jpg',
    trackIds: ['t001']
  }
];

export const getTracksByAlbum = (albumId: string): Track[] => {
  const album = ALBUMS.find(a => a.id === albumId);
  if (!album) return [];
  return TRACKS.filter(track => album.trackIds.includes(track.id));
};