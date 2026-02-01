import React from 'react';
import { Play } from 'lucide-react';
import { Song } from '../types';

interface HeroCarouselProps {
  songs: Song[];
  activeIndex: number;
  onSelect: (index: number) => void;
}

const HeroCarousel: React.FC<HeroCarouselProps> = ({ songs, activeIndex, onSelect }) => {
  // We only show 3 items max for the visual effect
  // This is a simplified implementation of the 3D cover flow seen in screenshot 2
  
  // Calculate indices for previous, current, next
  const getVisibleSongs = () => {
      // For simplicity in this mock, let's just use 0, 1, 2 indices or wrap around if we had more
      // But let's assume 'songs' passed in are the "featured" ones.
      // We will render them all but transform based on distance from activeIndex
      return songs.slice(0, 5); // Limit to first 5 for the carousel
  };

  const visibleSongs = getVisibleSongs();

  return (
    <div className="relative w-full h-64 md:h-80 flex items-center justify-center overflow-hidden perspective-1000 my-8">
      {visibleSongs.map((song, index) => {
        const offset = index - activeIndex;
        // Determine styles based on offset
        let transform = '';
        let zIndex = 0;
        let opacity = 1;
        
        if (offset === 0) {
            transform = 'translateX(0) scale(1) translateZ(0)';
            zIndex = 20;
            opacity = 1;
        } else if (offset === -1) {
             transform = 'translateX(-60%) scale(0.85) translateZ(-50px) rotateY(15deg)';
             zIndex = 10;
             opacity = 0.6;
        } else if (offset === 1) {
             transform = 'translateX(60%) scale(0.85) translateZ(-50px) rotateY(-15deg)';
             zIndex = 10;
             opacity = 0.6;
        } else {
            // Hide others or push far away
            transform = `translateX(${offset * 100}%) scale(0.5)`;
            zIndex = 0;
            opacity = 0;
        }

        return (
          <div
            key={song.id}
            onClick={() => onSelect(index)}
            className="absolute top-0 w-48 md:w-64 aspect-[3/4] transition-all duration-500 ease-out cursor-pointer"
            style={{
                transform,
                zIndex,
                opacity,
                left: '50%',
                marginLeft: index === 0 ? '-6rem' : index === 1 ? '-6rem' : '-6rem', // centering logic approx
                // The above manual centering is a bit hacky, let's use flex centering container logic instead
                // Actually with absolute positioning, left 50% + translate -50% is standard
            }}
          >
            {/* Wrapper to center properly with the left:50% */}
             <div className="w-full h-full relative rounded-3xl overflow-hidden shadow-2xl border border-white/10 -translate-x-1/2">
                <img src={song.coverUrl} alt={song.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/80"></div>
                
                {/* Content only visible on active */}
                <div className={`absolute bottom-0 left-0 p-6 w-full text-left transition-opacity duration-300 ${offset === 0 ? 'opacity-100' : 'opacity-0'}`}>
                    <h2 className="text-2xl font-bold text-white mb-1 leading-tight shadow-black drop-shadow-lg">{song.title}</h2>
                    <p className="text-gray-300 text-sm mb-3">{song.artist}</p>
                    <button className="w-12 h-12 rounded-full bg-white text-black flex items-center justify-center hover:scale-110 transition-transform">
                        <Play size={24} fill="currentColor" className="ml-1" />
                    </button>
                </div>
             </div>
          </div>
        );
      })}
    </div>
  );
};

export default HeroCarousel;