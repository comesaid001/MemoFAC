import React, { useState } from 'react';
import { User, X, ShieldCheck, BookOpen, Check } from 'lucide-react';
import { AcademicDocument, UserSession } from '../types';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  userSession: UserSession;
  onUpdateSession: (updated: Partial<UserSession>) => void;
  unlockedDocuments: AcademicDocument[];
  onOpenDoc: (docId: string) => void;
}

export const ProfileModal: React.FC<ProfileModalProps> = ({
  isOpen,
  onClose,
  userSession,
  onUpdateSession,
  unlockedDocuments,
  onOpenDoc,
}) => {
  const [name, setName] = useState(userSession.fullName);
  const [phone, setPhone] = useState(userSession.phone);
  const [university, setUniversity] = useState(userSession.university);
  const [isEditing, setIsEditing] = useState(false);

  if (!isOpen) return null;

  const handleSave = () => {
    onUpdateSession({
      fullName: name,
      phone,
      university,
    });
    setIsEditing(false);
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#131b2e]/50 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="w-full max-w-md bg-white rounded-t-2xl sm:rounded-2xl p-5 shadow-2xl flex flex-col gap-4 max-h-[85vh] overflow-y-auto animate-in slide-in-from-bottom duration-200">
        <div className="flex items-center justify-between pb-3 border-b border-[#eaedff]">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-[#00236f] text-white flex items-center justify-center font-bold text-sm">
              {userSession.fullName.slice(0, 2).toUpperCase()}
            </div>
            <div className="flex flex-col">
              <span className="font-['Plus_Jakarta_Sans'] text-sm font-bold text-[#131b2e]">
                {userSession.fullName}
              </span>
              <span className="text-[11px] text-[#757682]">{userSession.university}</span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#f2f3ff] text-[#444651] flex items-center justify-center cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Information sur le filigrane DRM individuel */}
        <div className="p-3.5 rounded-xl bg-[#f2f3ff] border border-[#eaedff] flex items-start gap-2.5">
          <ShieldCheck className="w-5 h-5 text-[#0051d5] shrink-0 mt-0.5" />
          <div className="flex flex-col text-xs text-[#444651]">
            <span className="font-bold text-[#00236f]">Identifiant légal de traçabilité DRM</span>
            <span className="text-[11px] mt-0.5 leading-relaxed">
              Votre identité ({userSession.fullName}) et vos coordonnées ({userSession.phone}) sont intégrées en filigrane horodaté sur vos sessions de consultation pour garantir le respect des droits d'auteur académiques.
            </span>
          </div>
        </div>

        {/* Formulaire de modification */}
        {isEditing ? (
          <div className="flex flex-col gap-3 p-3 rounded-xl bg-white border border-[#eaedff]">
            <div className="flex flex-col gap-1">
              <label className="text-xs font-bold text-[#131b2e]">Nom et prénoms</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="h-9 px-3 rounded-lg border border-[#eaedff] text-xs font-medium focus:outline-none focus:ring-1 focus:ring-[#0051d5]"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-bold text-[#131b2e]">Numéro Mobile Money (Filigrane)</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="h-9 px-3 rounded-lg border border-[#eaedff] text-xs font-medium focus:outline-none focus:ring-1 focus:ring-[#0051d5]"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-bold text-[#131b2e]">Université</label>
              <input
                type="text"
                value={university}
                onChange={(e) => setUniversity(e.target.value)}
                className="h-9 px-3 rounded-lg border border-[#eaedff] text-xs font-medium focus:outline-none focus:ring-1 focus:ring-[#0051d5]"
              />
            </div>
            <div className="flex items-center justify-end gap-2 pt-1">
              <button
                onClick={() => setIsEditing(false)}
                className="px-3 py-1 rounded-lg text-xs font-semibold text-[#757682]"
              >
                Annuler
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-1.5 rounded-lg bg-[#00236f] text-white text-xs font-bold flex items-center gap-1"
              >
                <Check className="w-3.5 h-3.5" />
                <span>Enregistrer</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-between text-xs p-1">
            <span className="text-[#757682]">Numéro associé : <strong>{userSession.phone}</strong></span>
            <button
              onClick={() => setIsEditing(true)}
              className="text-[#0051d5] font-bold underline cursor-pointer"
            >
              Modifier
            </button>
          </div>
        )}

        {/* Bibliothèque personnelle */}
        <div className="flex flex-col gap-2 pt-2 border-t border-[#eaedff]">
          <div className="flex items-center justify-between">
            <h4 className="font-['Plus_Jakarta_Sans'] text-xs font-bold text-[#00236f]">
              Ressources débloquées ({unlockedDocuments.length})
            </h4>
            <span className="text-[11px] text-[#0051d5] font-semibold">Accès permanent</span>
          </div>

          {unlockedDocuments.length === 0 ? (
            <div className="p-4 rounded-xl bg-[#faf8ff] border border-dashed border-[#eaedff] text-center text-xs text-[#757682]">
              Aucun document débloqué pour le moment. Parcourez l'index universitaire pour consulter les fiches disponibles.
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              {unlockedDocuments.map((doc) => (
                <div
                  key={doc.id}
                  onClick={() => {
                    onOpenDoc(doc.id);
                    onClose();
                  }}
                  className="p-2.5 rounded-xl bg-[#f2f3ff] hover:bg-[#e2e7ff] border border-[#eaedff] flex items-center justify-between gap-2 cursor-pointer transition-colors"
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <BookOpen className="w-4 h-4 text-[#0051d5] shrink-0" />
                    <span className="text-xs font-bold text-[#131b2e] truncate">{doc.title}</span>
                  </div>
                  <span className="text-[10px] bg-[#dbe1ff] text-[#00174b] px-2 py-0.5 rounded-md font-bold shrink-0">
                    Consulter
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        <button
          onClick={onClose}
          className="w-full h-10 rounded-xl bg-[#f2f3ff] text-[#444651] font-['Plus_Jakarta_Sans'] text-xs font-bold hover:bg-[#e2e7ff] transition-colors mt-2"
        >
          Fermer
        </button>
      </div>
    </div>
  );
};
