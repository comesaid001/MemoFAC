import React from 'react';
import { 
  X, 
  BookOpen, 
  Upload, 
  Wallet, 
  ShieldCheck, 
  LogIn 
} from 'lucide-react';

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  currentView: string;
  onNavigate: (view: string) => void;
  onOpenProfile: () => void;
}

export const MobileDrawer: React.FC<MobileDrawerProps> = ({
  isOpen,
  onClose,
  currentView,
  onNavigate,
  onOpenProfile,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-[#131b2e]/40 backdrop-blur-sm transition-opacity">
      <div 
        className="fixed inset-y-0 left-0 w-3/4 max-w-xs bg-white p-6 flex flex-col justify-between shadow-2xl pt-safe pb-safe animate-in slide-in-from-left duration-200"
      >
        <div className="flex flex-col gap-5">
          {/* En-tête */}
          <div className="flex items-center justify-between pb-3 border-b border-[#eaedff]">
            <div className="flex items-center gap-1.5">
              <span className="font-['Plus_Jakarta_Sans'] text-xl font-bold text-[#00236f]">
                Memo<span className="text-[#0051d5]">FAC</span>
              </span>
              <span className="px-2 py-0.5 rounded-md bg-[#eaedff] text-[#00236f] font-['Plus_Jakarta_Sans'] text-[10px] font-bold">
                Portail Académique
              </span>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center text-[#444651] hover:bg-[#f2f3ff] rounded-lg transition-colors cursor-pointer"
              type="button"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex flex-col gap-1.5 font-['Plus_Jakarta_Sans']">
            <button
              onClick={() => {
                onNavigate('explore');
                onClose();
              }}
              className={`flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-sm font-semibold transition-colors text-left cursor-pointer ${
                currentView === 'explore'
                  ? 'bg-[#e2e7ff] text-[#00236f]'
                  : 'text-[#131b2e] hover:bg-[#f2f3ff]'
              }`}
            >
              <BookOpen className="w-4 h-4 text-[#00236f]" />
              <span>Catalogue des Cours</span>
            </button>

            <button
              onClick={() => {
                onNavigate('publish');
                onClose();
              }}
              className={`flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-sm font-semibold transition-colors text-left cursor-pointer ${
                currentView === 'publish'
                  ? 'bg-[#e2e7ff] text-[#00236f]'
                  : 'text-[#131b2e] hover:bg-[#f2f3ff]'
              }`}
            >
              <Upload className="w-4 h-4 text-[#0051d5]" />
              <span>Dépôt Universitaire</span>
            </button>

            <button
              onClick={() => {
                onNavigate('author');
                onClose();
              }}
              className={`flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-sm font-semibold transition-colors text-left cursor-pointer ${
                currentView === 'author'
                  ? 'bg-[#e2e7ff] text-[#00236f]'
                  : 'text-[#131b2e] hover:bg-[#f2f3ff]'
              }`}
            >
              <Wallet className="w-4 h-4 text-[#00236f]" />
              <span>Espace Auteur</span>
            </button>

            <button
              onClick={() => {
                onNavigate('moderation');
                onClose();
              }}
              className={`flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-sm font-semibold transition-colors text-left cursor-pointer ${
                currentView === 'moderation'
                  ? 'bg-[#e2e7ff] text-[#00236f]'
                  : 'text-[#131b2e] hover:bg-[#f2f3ff]'
              }`}
            >
              <ShieldCheck className="w-4 h-4 text-[#444651]" />
              <span>Modération Académique</span>
            </button>
          </nav>
        </div>

        {/* Pied du menu */}
        <div className="flex flex-col gap-3 pt-4 border-t border-[#eaedff]">
          <div className="flex items-center justify-between p-3 rounded-xl bg-[#f2f3ff]">
            <span className="font-['Plus_Jakarta_Sans'] text-xs text-[#444651] font-medium">Devise de règlement</span>
            <span className="font-['Plus_Jakarta_Sans'] text-xs font-bold text-[#00236f]">XOF (Franc CFA)</span>
          </div>

          <button
            onClick={() => {
              onOpenProfile();
              onClose();
            }}
            className="w-full h-11 flex items-center justify-center gap-2 rounded-xl bg-[#00236f] hover:bg-[#1e3a8a] text-white font-['Plus_Jakarta_Sans'] text-sm font-bold shadow-xs active:scale-98 transition-all cursor-pointer"
            type="button"
          >
            <LogIn className="w-4 h-4" />
            <span>Espace Étudiant & Traçabilité</span>
          </button>
        </div>
      </div>
    </div>
  );
};
