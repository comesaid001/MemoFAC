import React from 'react';
import { X, Lock, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { AcademicDocument } from '../types';

interface PreviewModalProps {
  document: AcademicDocument | null;
  onClose: () => void;
  onUnlock: (docId: string) => void;
}

export const PreviewModal: React.FC<PreviewModalProps> = ({
  document,
  onClose,
  onUnlock,
}) => {
  if (!document) return null;

  return (
    <div className="fixed inset-0 z-50 bg-[#131b2e]/50 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in duration-200">
      <div 
        className="w-full max-w-lg bg-white rounded-t-2xl sm:rounded-2xl p-5 flex flex-col gap-4 shadow-2xl max-h-[85vh] overflow-y-auto animate-in slide-in-from-bottom duration-200"
      >
        {/* En-tête de l'extrait */}
        <div className="flex items-center justify-between pb-3 border-b border-[#eaedff]">
          <div className="flex items-center gap-2 min-w-0 pr-2">
            <ShieldCheck className="w-5 h-5 text-[#0051d5] shrink-0" />
            <span className="font-['Plus_Jakarta_Sans'] text-sm sm:text-base font-bold text-[#131b2e] truncate">
              {document.title}
            </span>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#f2f3ff] hover:bg-[#e2e7ff] flex items-center justify-center text-[#444651] transition-colors shrink-0 cursor-pointer"
            type="button"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Cadre de visualisation sécurisé */}
        <div className="relative p-5 bg-[#f2f3ff] rounded-xl flex flex-col gap-3 overflow-hidden select-none border border-[#eaedff]">
          <div className="absolute inset-0 flex items-center justify-center -rotate-25 pointer-events-none opacity-10">
            <span className="font-['Plus_Jakarta_Sans'] text-2xl font-black text-[#131b2e] text-center uppercase tracking-widest leading-relaxed">
              MEMOFAC • EXTRAIT EN LIBRE ACCÈS • DRM PROTÉGÉ
            </span>
          </div>

          <div className="flex items-center justify-between z-10">
            <span className="font-['Plus_Jakarta_Sans'] text-xs text-[#0051d5] font-bold tracking-wide">
              PAGE 1 / {document.pagesCount} (EXTRAIT PÉDAGOGIQUE)
            </span>
            <span className="text-[10px] bg-[#dbe1ff] text-[#00174b] px-2 py-0.5 rounded-md font-bold">
              {document.formatTag}
            </span>
          </div>

          <h4 className="font-['Plus_Jakarta_Sans'] text-base font-bold text-[#131b2e] z-10">
            {document.pages[0]?.chapterTitle || "Notions fondamentales"}
          </h4>

          <p className="font-['Inter'] text-xs text-[#444651] leading-relaxed text-justify z-10">
            {document.pages[0]?.content}
          </p>

          {document.pages[0]?.bulletPoints && (
            <div className="z-10 flex flex-col gap-1.5 p-3 rounded-lg bg-white/70 backdrop-blur-xs border border-white">
              {document.pages[0].bulletPoints.slice(0, 3).map((bp: string, i: number) => (
                <div key={i} className="flex items-start gap-2 text-xs text-[#131b2e]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0051d5] mt-1.5 shrink-0" />
                  <span className="leading-snug">{bp}</span>
                </div>
              ))}
            </div>
          )}

          <div className="p-2.5 rounded-lg bg-[#eaedff] text-[#757682] font-['Inter'] text-[11px] text-center z-10 border border-dashed border-[#c5c5d3]">
            [ Schémas, formules et développements théoriques complets réservés à la consultation autorisée ]
          </div>
        </div>

        {/* Tarif dynamique fixé par l'auteur */}
        <div className="flex items-center justify-between p-3 rounded-xl bg-[#faf8ff] border border-[#eaedff]">
          <div className="flex flex-col">
            <span className="text-[11px] text-[#757682] font-medium">Tarif d'accès fixé par l'auteur</span>
            <div className="flex items-baseline gap-1.5">
              <span className="font-['Plus_Jakarta_Sans'] text-xl font-bold text-[#00236f]">
                {document.priceFCFA} FCFA
              </span>
            </div>
          </div>
          <div className="flex items-center gap-1.5 text-xs font-semibold text-[#0051d5] bg-[#dbe1ff] px-2.5 py-1 rounded-md">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Consultation in-browser</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-2 pt-1">
          <button
            onClick={() => {
              onClose();
              onUnlock(document.id);
            }}
            className="w-full h-12 rounded-xl bg-[#00236f] hover:bg-[#1e3a8a] text-white font-['Plus_Jakarta_Sans'] text-sm font-bold flex items-center justify-center gap-2 shadow-md active:scale-98 transition-all cursor-pointer"
            type="button"
          >
            <Lock className="w-4 h-4" />
            <span>Accéder au document complet ({document.acceptedPayments})</span>
          </button>

          <button
            onClick={onClose}
            className="w-full h-10 rounded-xl bg-transparent text-[#757682] hover:bg-[#f2f3ff] font-['Plus_Jakarta_Sans'] text-xs font-semibold text-center transition-colors cursor-pointer"
            type="button"
          >
            Fermer l'extrait
          </button>
        </div>
      </div>
    </div>
  );
};
