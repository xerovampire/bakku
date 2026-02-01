export interface Song {
  id: string;
  title: string;
  artist: string;
  coverUrl: string;
  duration: string; // formatted 'mm:ss'
  durationSec: number;
}

export interface Category {
  id: string;
  label: string;
}

export interface Playlist {
  id: string;
  title: string;
  coverUrl: string;
}

export type ViewState = 'SPLASH' | 'APP';
