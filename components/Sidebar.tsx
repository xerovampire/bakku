import React from 'react';
import { Home, Music2, Mic2, ListMusic, LogOut, Settings } from 'lucide-react';

interface SidebarProps {
  className?: string;
}

const Sidebar: React.FC<SidebarProps> = ({ className = '' }) => {
  return (
    <aside className={`w-64 h-full bg-background flex flex-col border-r border-white/5 p-6 ${className}`}>
      <div className="flex items-center gap-3 mb-10 text-primary">
        <Music2 className="w-8 h-8" />
        <h1 className="text-2xl font-bold tracking-tight text-white">RhythmoTune</h1>
      </div>

      <nav className="flex-1 space-y-2">
        <NavItem icon={<Home size={20} />} label="Home" active />
        <NavItem icon={<ListMusic size={20} />} label="Categories" />
        <NavItem icon={<Mic2 size={20} />} label="Artists" />
        
        <div className="pt-6 pb-2">
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">Playlists</h3>
          <div className="space-y-4 pl-2">
             <PlaylistItem label="Vibes & Chill" img="https://picsum.photos/seed/vibes/40/40" />
             <PlaylistItem label="Morning Boost" img="https://picsum.photos/seed/morning/40/40" />
             <PlaylistItem label="Rhythm & Energy" img="https://picsum.photos/seed/energy/40/40" />
          </div>
        </div>
      </nav>

      <div className="mt-auto space-y-4">
        <button className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors w-full p-2">
            <LogOut size={20} />
            <span className="font-medium">Logout</span>
        </button>
      </div>
    </aside>
  );
};

const NavItem = ({ icon, label, active = false }: { icon: React.ReactNode, label: string, active?: boolean }) => (
  <button className={`flex items-center gap-4 w-full p-3 rounded-xl transition-all ${active ? 'bg-surfaceLight text-white font-medium' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}>
    {icon}
    <span>{label}</span>
  </button>
);

const PlaylistItem = ({ label, img }: { label: string, img: string }) => (
  <button className="flex items-center gap-3 w-full group">
    <img src={img} alt={label} className="w-8 h-8 rounded-lg opacity-70 group-hover:opacity-100 transition-opacity" />
    <span className="text-sm text-gray-400 group-hover:text-white transition-colors text-left">{label}</span>
  </button>
);

export default Sidebar;