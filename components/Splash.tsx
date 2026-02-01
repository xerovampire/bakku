import React from 'react';
import { ArrowRight } from 'lucide-react';

interface SplashProps {
  onStart: () => void;
}

const Splash: React.FC<SplashProps> = ({ onStart }) => {
  return (
    <div className="h-full w-full relative bg-background flex flex-col items-center justify-end pb-12 overflow-hidden">
      {/* Background Collage */}
      <div className="absolute inset-0 opacity-50">
        <div className="grid grid-cols-3 gap-4 p-4 transform -rotate-12 scale-110 -translate-y-20">
             {[...Array(9)].map((_, i) => (
                 <div key={i} className="aspect-square rounded-3xl overflow-hidden shadow-2xl">
                     <img src={`https://picsum.photos/seed/${i + 50}/400/400`} className="w-full h-full object-cover" alt="grid" />
                 </div>
             ))}
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/90 to-transparent"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-md px-8 text-left">
        <h1 className="text-5xl font-bold text-white mb-4 leading-tight">
          Dive Into Your <span className="text-primary">RhythmoTune.</span>
        </h1>
        <p className="text-gray-400 text-lg mb-8">
          Experience seamless music enjoyment, crafted for every moment.
        </p>
        
        <button 
          onClick={onStart}
          className="w-full bg-white text-black font-bold py-4 rounded-2xl flex items-center justify-center gap-2 hover:bg-gray-100 transition-colors shadow-[0_0_20px_rgba(255,255,255,0.3)]"
        >
          <span>Start Explore</span>
          <ArrowRight size={20} />
        </button>
      </div>
    </div>
  );
};

export default Splash;