import React from 'react';
import { Play, Pause } from 'lucide-react';
import { Song } from '../types';

interface SongCardProps {
  song: Song;
  isActive: boolean;
  isPlaying: boolean;
  onClick: () => void;
  variant?: 'vertical' | 'horizontal';
}

const SongCard: React.FC<SongCardProps> = ({ song, isActive, isPlaying, onClick, variant = 'vertical' }) => {
  if (variant === 'horizontal') {
    return (
       <div 
        onClick={onClick}
        className={`group flex items-center gap-4 p-3 rounded-2xl cursor-pointer transition-all ${isActive ? 'bg-white/10' : 'hover:bg-white/5'}`}
      >
        <div className="relative w-16 h-16 flex-shrink-0">
          <img src={song.coverUrl} alt={song.title} className="w-full h-full object-cover rounded-xl" />
          <div className={`absolute inset-0 bg-black/40 flex items-center justify-center rounded-xl opacity-0 group-hover:opacity-100 transition-opacity ${isActive ? 'opacity-100' : ''}`}>
             {isActive && isPlaying ? <Pause size={20} className="text-white" fill="currentColor" /> : <Play size={20} className="text-white" fill="currentColor" />}
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <h4 className={`font-semibold truncate ${isActive ? 'text-primary' : 'text-white'}`}>{song.title}</h4>
          <p className="text-sm text-gray-400 truncate">{song.artist}</p>
        </div>
        <span className="text-xs text-gray-500 font-medium">{song.duration}</span>
      </div>
    )
  }

  // Vertical card
  return (
    <div className="group relative w-40 md:w-48 flex-shrink-0 cursor-pointer" onClick={onClick}>
      <div className="relative w-full aspect-square mb-3 overflow-hidden rounded-[2rem]">
        <img src={song.coverUrl} alt={song.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-end p-4">
             <div className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center hover:scale-110 transition-transform">
                {isActive && isPlaying ? <Pause size={20} fill="currentColor" /> : <Play size={20} fill="currentColor" className="ml-1" />}
             </div>
        </div>
      </div>
      <h3 className={`font-semibold text-base truncate ${isActive ? 'text-primary' : 'text-white'}`}>{song.title}</h3>
      <p className="text-sm text-gray-400 truncate">{song.artist}</p>
    </div>
  );
};

export default SongCard;