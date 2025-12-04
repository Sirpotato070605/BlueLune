export interface Track {
  id: string;
  title: string;
  artist: string;
  audioUrl: string;
  coverArtUrl: string;
  duration: number;
}

export interface User {
  id: string;
  name: string;
  avatarUrl: string;
  isAuthenticated: boolean;
}

export interface Album {
  id: string;
  title: string;
  description: string;
  coverUrl: string;
  trackIds: string[]; // Danh sách ID các bài hát trong album
}