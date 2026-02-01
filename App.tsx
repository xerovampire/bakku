import React, { useState, useEffect } from 'react';
import { Search, Sparkles, User, Bell, Settings } from 'lucide-react';
import Sidebar from './components/Sidebar';
import MusicPlayer from './components/MusicPlayer';
import CategoryPills from './components/CategoryPills';
import SongCard from './components/SongCard';
import HeroCarousel from './components/HeroCarousel';
import Splash from './components/Splash';
import { Song, Category, ViewState } from './types';
import { generateAiPlaylist } from './geminiService';

// Mock Data
const SONGS: Song[] = [
  { id: '1', title: 'Echoes of Midnight', artist: 'Jon Hickman', coverUrl: 'https://picsum.photos/seed/midnight/400/400', duration: '3:58', durationSec: 238 },
  { id: '2', title: 'Fading Horizon', artist: 'Ella Hunt', coverUrl: 'https://picsum.photos/seed/horizon/400/400', duration: '3:12', durationSec: 192 },
  { id: '3', title: 'Waves of Time', artist: 'Lana Rivers', coverUrl: 'https://picsum.photos/seed/waves/400/400', duration: '4:05', durationSec: 245 },
  { id: '4', title: 'Electric Dreams', artist: 'Mia Lowell', coverUrl: 'https://picsum.photos/seed/electric/400/400', duration: '2:55', durationSec: 175 },
  { id: '5', title: 'Shadows & Light', artist: 'Ryan Miles', coverUrl: 'https://picsum.photos/seed/shadows/400/400', duration: '3:30', durationSec: 210 },
  { id: '6', title: 'Golden Days', artist: 'Felix Carter', coverUrl: 'https://picsum.photos/seed/golden/400/400', duration: '3:15', durationSec: 195 },
];

const CATEGORIES: Category[] = [
  { id: 'all', label: 'All' },
  { id: 'relax', label: 'Relax' },
  { id: 'sad', label: 'Sad' },
  { id: 'party', label: 'Party' },
  { id: 'romance', label: 'Romance' },
  { id: 'energetic', label: 'Energetic' },
  { id: 'jazz', label: 'Jazz' },
  { id: 'alternative', label: 'Alternative' },
];

function App() {
  const [viewState, setViewState] = useState<ViewState>('SPLASH');
  const [currentSong, setCurrentSong] = useState<Song>(SONGS[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeCategory, setActiveCategory] = useState('all');
  const [carouselIndex, setCarouselIndex] = useState(0);
  
  // AI State
  const [searchQuery, setSearchQuery] = useState('');
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [aiSuggestion, setAiSuggestion] = useState<string | null>(null);

  const handlePlayPause = () => setIsPlaying(!isPlaying);
  
  const handleNext = () => {
    const currentIndex = SONGS.findIndex(s => s.id === currentSong.id);
    const nextIndex = (currentIndex + 1) % SONGS.length;
    setCurrentSong(SONGS[nextIndex]);
    setCarouselIndex(nextIndex); // Sync carousel
  };

  const handlePrev = () => {
    const currentIndex = SONGS.findIndex(s => s.id === currentSong.id);
    const prevIndex = (currentIndex - 1 + SONGS.length) % SONGS.length;
    setCurrentSong(SONGS[prevIndex]);
    setCarouselIndex(prevIndex);
  };

  const handleSongSelect = (song: Song) => {
    setCurrentSong(song);
    setIsPlaying(true);
    // Find index for carousel
    const idx = SONGS.findIndex(s => s.id === song.id);
    if(idx !== -1) setCarouselIndex(idx);
  };

  const handleAiSearch = async () => {
    if (!searchQuery.trim()) return;
    setIsAiLoading(true);
    setAiSuggestion(null);
    
    // Simulate finding a song or playlist via AI
    const result = await generateAiPlaylist(searchQuery);
    setAiSuggestion(result);
    setIsAiLoading(false);
  };

  if (viewState === 'SPLASH') {
    return <Splash onStart={() => setViewState('APP')} />;
  }

  return (
    <div className="flex h-screen bg-background text-white font-sans overflow-hidden">
      {/* Sidebar - Hidden on mobile */}
      <div className="hidden md:block">
        <Sidebar />
      </div>

      {/* Main Content */}
      <main className="flex-1 flex flex-col relative overflow-hidden">
        {/* Header */}
        <header className="p-6 md:px-10 flex flex-col md:flex-row md:items-center justify-between gap-6 z-20">
          {/* Search */}
          <div className="relative w-full max-w-xl group">
             <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                <Search className="text-gray-500 group-focus-within:text-primary transition-colors" size={20} />
             </div>
             <input 
               type="text" 
               placeholder="Search for a song or ask AI for a mood..."
               value={searchQuery}
               onChange={(e) => setSearchQuery(e.target.value)}
               onKeyDown={(e) => e.key === 'Enter' && handleAiSearch()}
               className="w-full bg-surfaceLight border border-transparent focus:border-primary/50 text-white pl-12 pr-12 py-3.5 rounded-2xl outline-none transition-all placeholder:text-gray-500 shadow-inner"
             />
             <button 
                onClick={handleAiSearch}
                className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-primary transition-colors"
                title="Ask AI DJ"
             >
                {isAiLoading ? (
                    <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                ) : (
                    <Sparkles size={20} />
                )}
             </button>

             {/* AI Dropdown Result */}
             {aiSuggestion && (
                 <div className="absolute top-full left-0 right-0 mt-2 bg-[#1A1A1E] border border-white/10 rounded-2xl p-6 shadow-2xl z-50">
                    <div className="flex justify-between items-center mb-2">
                        <h4 className="text-primary font-bold flex items-center gap-2"><Sparkles size={16} /> AI Recommendation</h4>
                        <button onClick={() => setAiSuggestion(null)} className="text-xs text-gray-500 hover:text-white">Close</button>
                    </div>
                    <p className="text-gray-300 text-sm whitespace-pre-line leading-relaxed">{aiSuggestion}</p>
                 </div>
             )}
          </div>

          {/* User Profile - Desktop */}
          <div className="hidden md:flex items-center gap-4">
             <button className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/5 transition-colors">
                <Bell size={20} />
             </button>
             <button className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/5 transition-colors">
                <Settings size={20} />
             </button>
             <div className="flex items-center gap-3 bg-surfaceLight pl-2 pr-4 py-1.5 rounded-full border border-white/5 cursor-pointer hover:border-white/10 transition-colors">
                <img src="https://picsum.photos/seed/user/100/100" alt="Molly" className="w-8 h-8 rounded-full" />
                <div className="text-sm">
                    <p className="font-bold leading-none">Molly Hunter</p>
                    <p className="text-[10px] text-primary font-medium tracking-wider uppercase">Premium</p>
                </div>
             </div>
          </div>
          
          {/* Mobile Header Elements */}
          <div className="md:hidden flex items-center justify-between w-full">
               <h1 className="text-xl font-bold text-primary flex items-center gap-2"><div className="w-2 h-6 bg-primary rounded-full"></div> RhythmoTune</h1>
               <img src="https://picsum.photos/seed/user/100/100" alt="Molly" className="w-9 h-9 rounded-full border border-white/20" />
          </div>
        </header>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto pb-32 scrollbar-hide">
            <div className="px-6 md:px-10">
                
                {/* Desktop Carousel / Mobile Hero */}
                <section className="mb-10">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl font-bold">Trending Now</h2>
                    </div>
                    {/* Only show 3D carousel on larger screens for better UX, simplified list on mobile */}
                    <div className="hidden md:block">
                        <HeroCarousel songs={SONGS} activeIndex={carouselIndex} onSelect={(idx) => { setCarouselIndex(idx); setCurrentSong(SONGS[idx]); }} />
                    </div>
                    <div className="md:hidden flex overflow-x-auto gap-4 scrollbar-hide pb-4">
                        {SONGS.map(song => (
                             <div key={song.id} className="relative w-64 aspect-[4/5] flex-shrink-0 rounded-2xl overflow-hidden shadow-lg" onClick={() => handleSongSelect(song)}>
                                 <img src={song.coverUrl} className="w-full h-full object-cover" />
                                 <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-4">
                                     <h3 className="text-white font-bold">{song.title}</h3>
                                     <p className="text-gray-300 text-sm">{song.artist}</p>
                                 </div>
                             </div>
                        ))}
                    </div>
                </section>

                {/* Categories */}
                <section className="mb-8">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl font-bold">Select Categories</h2>
                        <div className="flex gap-2">
                            {/* Arrows could go here */}
                        </div>
                    </div>
                    <CategoryPills 
                        categories={CATEGORIES} 
                        selectedId={activeCategory} 
                        onSelect={setActiveCategory} 
                    />
                </section>

                {/* Popular Songs */}
                <section className="mb-8">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl font-bold">Popular songs</h2>
                        <div className="flex gap-2 text-gray-400">
                             {/* Arrows placeholder */}
                             <span className="cursor-pointer hover:text-white">&lt;</span>
                             <span className="cursor-pointer hover:text-white">&gt;</span>
                        </div>
                    </div>
                    
                    <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide">
                        {SONGS.map((song) => (
                            <SongCard 
                                key={song.id} 
                                song={song} 
                                isActive={currentSong.id === song.id}
                                isPlaying={isPlaying}
                                onClick={() => handleSongSelect(song)}
                            />
                        ))}
                    </div>
                </section>

                {/* Recently Listened (Vertical list style) */}
                <section>
                    <div className="flex items-center justify-between mb-4">
                         <h2 className="text-xl font-bold">Recently listened</h2>
                         <button className="text-sm text-gray-400 hover:text-white">See all</button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {SONGS.slice(0, 4).map((song) => (
                            <SongCard 
                                key={`recent-${song.id}`}
                                song={song}
                                isActive={currentSong.id === song.id}
                                isPlaying={isPlaying}
                                onClick={() => handleSongSelect(song)}
                                variant="horizontal"
                            />
                        ))}
                    </div>
                </section>
            </div>
        </div>

        {/* Sticky Player */}
        <div className="absolute bottom-0 left-0 right-0 z-50">
            <MusicPlayer 
                currentSong={currentSong} 
                isPlaying={isPlaying} 
                onPlayPause={handlePlayPause}
                onNext={handleNext}
                onPrev={handlePrev}
            />
        </div>
      </main>
    </div>
  );
}

export default App;