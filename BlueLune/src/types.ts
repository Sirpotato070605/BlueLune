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