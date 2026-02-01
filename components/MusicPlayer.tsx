import React, { useState, useEffect } from 'react';
import { Play, Pause, SkipBack, SkipForward, Repeat, Shuffle, Volume2, Heart, ChevronDown, Maximize2 } from 'lucide-react';
import { Song } from '../types';

interface MusicPlayerProps {
  currentSong: Song | null;
  isPlaying: boolean;
  onPlayPause: () => void;
  onNext: () => void;
  onPrev: () => void;
}

const MusicPlayer: React.FC<MusicPlayerProps> = ({ currentSong, isPlaying, onPlayPause, onNext, onPrev }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [progress, setProgress] = useState(30);

  if (!currentSong) return null;

  const toggleExpand = () => setIsExpanded(!isExpanded);

  // Desktop/Minimized View
  return (
    <>
      <div className="h-24 bg-[#121216]/95 backdrop-blur-md border-t border-white/5 flex items-center px-4 md:px-8 justify-between z-40 relative">
        {/* Song Info */}
        <div className="flex items-center gap-4 w-1/3 cursor-pointer" onClick={toggleExpand}>
          <img src={currentSong.coverUrl} alt={currentSong.title} className="w-14 h-14 rounded-xl shadow-lg object-cover" />
          <div className="overflow-hidden">
            <h4 className="font-bold text-white truncate">{currentSong.title}</h4>
            <p className="text-sm text-gray-400 truncate">{currentSong.artist}</p>
          </div>
        </div>

        {/* Controls - Center */}
        <div className="flex-1 flex flex-col items-center max-w-lg">
          <div className="flex items-center gap-6 mb-1">
            <button className="text-gray-400 hover:text-white"><Shuffle size={18} /></button>
            <button className="text-gray-300 hover:text-white" onClick={onPrev}><SkipBack size={24} fill="currentColor" /></button>
            <button 
              className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-black hover:scale-105 transition-transform"
              onClick={onPlayPause}
            >
              {isPlaying ? <Pause size={20} fill="currentColor" /> : <Play size={20} fill="currentColor" className="ml-1" />}
            </button>
            <button className="text-gray-300 hover:text-white" onClick={onNext}><SkipForward size={24} fill="currentColor" /></button>
            <button className="text-gray-400 hover:text-white"><Repeat size={18} /></button>
          </div>
          <div className="w-full flex items-center gap-3 text-xs text-gray-500 font-medium">
            <span>0:42</span>
            <div className="flex-1 h-1 bg-gray-700 rounded-full overflow-hidden relative group">
                <div className="absolute top-0 left-0 h-full bg-white w-[30%]"></div>
            </div>
            <span>{currentSong.duration}</span>
          </div>
        </div>

        {/* Volume / Extra - Right */}
        <div className="w-1/3 flex items-center justify-end gap-4 hidden md:flex">
           <Heart size={20} className="text-gray-400 hover:text-primary cursor-pointer" />
           <div className="flex items-center gap-2 w-32">
             <Volume2 size={20} className="text-gray-400" />
             <div className="h-1 flex-1 bg-gray-700 rounded-full">
               <div className="h-full w-2/3 bg-gray-400 rounded-full"></div>
             </div>
           </div>
        </div>
        
        {/* Mobile Expand Trigger */}
        <button className="md:hidden text-white ml-4" onClick={toggleExpand}>
          <Maximize2 size={20} />
        </button>
      </div>

      {/* Full Screen Player (Mobile/Expanded) */}
      <div className={`fixed inset-0 bg-background z-50 flex flex-col transition-transform duration-500 ease-in-out ${isExpanded ? 'translate-y-0' : 'translate-y-full'}`}>
        <div className="p-6 flex items-center justify-between">
            <button onClick={toggleExpand} className="text-gray-300"><ChevronDown size={28} /></button>
            <span className="text-sm font-semibold tracking-widest uppercase text-gray-400">Now Playing</span>
            <button className="text-gray-300"><span className="text-2xl leading-none mb-2">...</span></button>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center p-8">
            <div className="w-full aspect-square max-w-sm rounded-[2rem] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/5 mb-10 relative">
                 <img src={currentSong.coverUrl} className="w-full h-full object-cover" alt="cover" />
                 {/* Decorative elements resembling the speakers in screenshot 3 */}
                 <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/40"></div>
            </div>

            <div className="w-full max-w-sm mb-8">
                <div className="flex justify-between items-end mb-2">
                    <div>
                        <h2 className="text-3xl font-bold text-white mb-1">{currentSong.title}</h2>
                        <p className="text-lg text-gray-400">{currentSong.artist}</p>
                    </div>
                    <Heart size={28} className="text-primary mb-2" fill="currentColor" />
                </div>
            </div>

             {/* Progress */}
             <div className="w-full max-w-sm mb-10">
                <div className="h-1.5 bg-gray-800 rounded-full mb-2 relative">
                    <div className="absolute h-full bg-white rounded-full w-[35%]"></div>
                    <div className="absolute h-4 w-4 bg-white rounded-full top-1/2 -translate-y-1/2 left-[35%] shadow-lg"></div>
                </div>
                <div className="flex justify-between text-xs text-gray-400 font-medium">
                    <span>1:23</span>
                    <span>{currentSong.duration}</span>
                </div>
             </div>

             {/* Controls */}
             <div className="flex items-center justify-between w-full max-w-xs">
                <button className="text-gray-400 hover:text-white"><Shuffle size={24} /></button>
                <button onClick={onPrev} className="text-white"><SkipBack size={32} fill="currentColor" /></button>
                <button onClick={onPlayPause} className="w-20 h-20 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white border border-white/10 shadow-xl transition-all">
                     {isPlaying ? <Pause size={32} fill="currentColor" /> : <Play size={32} fill="currentColor" className="ml-2" />}
                </button>
                <button onClick={onNext} className="text-white"><SkipForward size={32} fill="currentColor" /></button>
                <button className="text-gray-400 hover:text-white"><Repeat size={24} /></button>
             </div>
        </div>
      </div>
    </>
  );
};

export default MusicPlayer;
