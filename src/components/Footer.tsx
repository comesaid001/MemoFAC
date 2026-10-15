import React, { useState } from 'react';
import { Share2, Check } from 'lucide-react';

interface FooterProps {
  onNavigate: (view: string) => void;
  onOpenInfoModal: (type: 'terms' | 'drm' | 'support') => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenInfoModal }) => {
  const [copied, setCopied] = useState(false);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'MemoFAC - Plateforme Web Académique',
        text: 'Accédez aux ressources pédagogiques et annales universitaires vérifiées sous protection DRM.',
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard?.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <footer className="w-full bg-white mt-10 border-t border-[#eaedff] shadow-[0_1px_8px_rgba(0,0,0,0.04)] pb-safe">
      <div className="max-w-4xl mx-auto px-4 py-8 flex flex-col gap-6">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-2">
            <span className="font-['Plus_Jakarta_Sans'] text-lg font-bold text-[#00236f]">MemoFAC</span>
            <span className="text-[#757682] font-['Plus_Jakarta_Sans'] text-xs font-semibold">
              Portail Universitaire Sécurisé
            </span>
          </div>

          <button
            onClick={handleShare}
            className="h-10 px-4 flex items-center gap-2 rounded-xl bg-[#f2f3ff] text-[#131b2e] font-['Plus_Jakarta_Sans'] text-xs font-bold hover:bg-[#e2e7ff] transition-all active:scale-95 cursor-pointer shadow-xs border border-[#eaedff]"
            type="button"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4 text-[#0051d5]" />}
            <span>{copied ? 'Lien copié' : 'Partager le lien du portail'}</span>
          </button>
        </div>

        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[#444651] font-['Plus_Jakarta_Sans'] text-xs">
          <button
            onClick={() => onOpenInfoModal('terms')}
            className="hover:text-[#00236f] transition-colors cursor-pointer text-left"
          >
            Conditions d'utilisation
          </button>
          <span className="text-[#c5c5d3]">/</span>
          <button
            onClick={() => onOpenInfoModal('drm')}
            className="hover:text-[#00236f] transition-colors cursor-pointer text-left"
          >
            Sécurité & Droits d'Auteur (DRM)
          </button>
          <span className="text-[#c5c5d3]">/</span>
          <button
            onClick={() => onOpenInfoModal('support')}
            className="hover:text-[#00236f] transition-colors cursor-pointer text-left"
          >
            Assistance Mobile Money
          </button>
        </div>

        <p className="text-xs text-[#757682] font-['Inter'] leading-relaxed">
          © 2026 MemoFAC Technologies. Plateforme académique et lecteur sécurisé pour les universités d'Afrique de l'Ouest et Centrale. Tous droits réservés.
        </p>
      </div>
    </footer>
  );
};
