import React from 'react';
import { Menu, Search, User, CreditCard } from 'lucide-react';

interface HeaderProps {
  onOpenDrawer: () => void;
  onOpenSearch: () => void;
  onNavigate: (view: string, docId?: string) => void;
  onOpenProfile: () => void;
  unlockedCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenDrawer,
  onOpenSearch,
  onNavigate,
  onOpenProfile,
  unlockedCount
}) => {
  return (
    <header className="fixed top-0 inset-x-0 z-40 bg-[#faf8ff]/95 backdrop-blur-xl pt-safe shadow-[0_1px_8px_rgba(0,0,0,0.04)] border-b border-[#eaedff]">
      <div className="h-14 px-4 max-w-4xl mx-auto flex items-center justify-between">
        {/* Navigation et Logo */}
        <div className="flex items-center gap-2">
          <button
            aria-label="Menu Principal"
            className="w-10 h-10 -ml-1 flex items-center justify-center text-[#131b2e] hover:bg-[#f2f3ff] rounded-lg transition-colors active:scale-95 cursor-pointer"
            onClick={onOpenDrawer}
            type="button"
          >
            <Menu className="w-5 h-5" />
          </button>
          
          <button
            onClick={() => onNavigate('explore')}
            className="flex items-center gap-1.5 text-left cursor-pointer group"
          >
            <span className="font-['Plus_Jakarta_Sans'] text-xl tracking-tight text-[#00236f] font-bold group-hover:opacity-90 transition-opacity">
              Memo<span className="text-[#0051d5]">FAC</span>
            </span>
            <span className="px-1.5 py-0.5 rounded-md bg-[#eaedff] text-[#00236f] font-['Plus_Jakarta_Sans'] text-[10px] font-bold uppercase tracking-wider">
              SaaS Académique
            </span>
          </button>
        </div>

        {/* Actions secondaires */}
        <div className="flex items-center gap-1.5">
          <button
            aria-label="Recherche globale"
            onClick={onOpenSearch}
            className="w-10 h-10 flex items-center justify-center text-[#444651] hover:text-[#00236f] hover:bg-[#f2f3ff] rounded-lg transition-colors cursor-pointer"
            type="button"
          >
            <Search className="w-4 h-4" />
          </button>

          <div 
            title="Devise légale de règlement : Franc CFA (XOF)"
            className="flex items-center bg-[#f2f3ff] px-2.5 py-1 rounded-md text-[#444651] font-['Plus_Jakarta_Sans'] text-xs font-semibold select-none border border-[#eaedff]"
          >
            <CreditCard className="w-3.5 h-3.5 text-[#0051d5] mr-1" />
            <span>FCFA</span>
          </div>

          <button
            aria-label="Profil utilisateur"
            onClick={onOpenProfile}
            className="w-10 h-10 flex items-center justify-center cursor-pointer relative"
            type="button"
          >
            <div className="w-8 h-8 rounded-full bg-[#00236f] hover:bg-[#1e3a8a] text-white flex items-center justify-center shadow-xs transition-colors">
              <User className="w-4 h-4" />
            </div>
            {unlockedCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 rounded-full bg-[#0051d5] border-2 border-[#faf8ff]" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
