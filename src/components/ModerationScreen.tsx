import React, { useState } from 'react';
import { ShieldCheck, Check, X, ArrowLeft, FileText, AlertCircle } from 'lucide-react';

interface ModerationScreenProps {
  onNavigateHome: () => void;
}

interface PendingDoc {
  id: string;
  title: string;
  university: string;
  faculty: string;
  level: string;
  author: string;
  pages: number;
  price: number;
  status: 'pending' | 'approved' | 'rejected';
}

export const ModerationScreen: React.FC<ModerationScreenProps> = ({ onNavigateHome }) => {
  const [items, setItems] = useState<PendingDoc[]>([
    {
      id: 'mod-1',
      title: 'Droit des Sociétés Commerciales OHADA : Régime de la SARL et de la SAS',
      university: 'Université Félix Houphouët-Boigny (Abidjan)',
      faculty: 'Droit Privé',
      level: 'Licence 3',
      author: 'Koffi Serge E.',
      pages: 28,
      price: 1000,
      status: 'pending',
    },
    {
      id: 'mod-2',
      title: 'Statistiques Inférentielles & Tests d\'Hypothèses Paramétriques',
      university: 'Université Cheikh Anta Diop (UCAD Dakar)',
      faculty: 'Économie & Gestion',
      level: 'Licence 2',
      author: 'Fatoumata N.',
      pages: 18,
      price: 600,
      status: 'pending',
    },
    {
      id: 'mod-3',
      title: 'Pharmacologie Clinique : Bêta-lactamines et Aminosides',
      university: 'Université Nangui Abrogoua',
      faculty: 'Médecine & Pharmacie',
      level: '3ème Année',
      author: 'Dr. Bamba M.',
      pages: 34,
      price: 1500,
      status: 'pending',
    },
  ]);

  const handleAction = (id: string, action: 'approved' | 'rejected') => {
    setItems((prev) =>
      prev.map((doc) => (doc.id === id ? { ...doc, status: action } : doc))
    );
  };

  return (
    <div className="max-w-4xl mx-auto w-full px-4 py-6 flex flex-col gap-6">
      <div className="flex items-center justify-between pb-4 border-b border-[#eaedff]">
        <div>
          <button
            onClick={onNavigateHome}
            className="text-xs text-[#0051d5] font-semibold flex items-center gap-1 hover:underline cursor-pointer mb-1"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Accueil</span>
          </button>
          <h1 className="font-['Plus_Jakarta_Sans'] text-xl sm:text-2xl font-bold text-[#00236f]">
            Comité de Modération Académique
          </h1>
          <p className="font-['Inter'] text-xs text-[#444651]">
            Validation de la conformité aux programmes officiels universitaires et audit d'intégrité intellectuelle avant publication.
          </p>
        </div>

        <div className="px-3 py-1 rounded-md bg-[#eaedff] text-[#00236f] font-['Plus_Jakarta_Sans'] text-xs font-bold flex items-center gap-1.5 border border-[#dbe1ff]">
          <ShieldCheck className="w-4 h-4 text-[#0051d5]" />
          <span>Espace Modérateur</span>
        </div>
      </div>

      {/* File d'attente d'examen */}
      <div className="flex flex-col gap-3">
        {items.map((doc) => (
          <div
            key={doc.id}
            className="p-4 rounded-xl bg-white border border-[#eaedff] shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4"
          >
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded-md bg-[#f2f3ff] text-[#00236f] font-['Plus_Jakarta_Sans'] text-[10px] font-bold">
                  {doc.faculty} • {doc.level}
                </span>
                <span className="text-[10px] text-emerald-800 font-semibold bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                  Audit d'intégrité documentaire : Conforme
                </span>
              </div>
              <h3 className="font-['Plus_Jakarta_Sans'] text-sm font-bold text-[#131b2e]">
                {doc.title}
              </h3>
              <p className="text-xs text-[#757682]">
                {doc.university} • Proposé par {doc.author} • {doc.pages} pages • Tarif d'accès soumis : {doc.price} FCFA
              </p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              {doc.status === 'pending' ? (
                <>
                  <button
                    onClick={() => handleAction(doc.id, 'rejected')}
                    className="h-9 px-3 rounded-lg bg-[#ffdad6] text-[#ba1a1a] font-['Plus_Jakarta_Sans'] text-xs font-bold hover:bg-red-200 transition-colors cursor-pointer flex items-center gap-1"
                  >
                    <X className="w-3.5 h-3.5" />
                    <span>Rejeter</span>
                  </button>
                  <button
                    onClick={() => handleAction(doc.id, 'approved')}
                    className="h-9 px-3.5 rounded-lg bg-[#00236f] text-white font-['Plus_Jakarta_Sans'] text-xs font-bold hover:bg-[#1e3a8a] shadow-xs transition-colors cursor-pointer flex items-center gap-1.5"
                  >
                    <Check className="w-3.5 h-3.5" />
                    <span>Valider et publier</span>
                  </button>
                </>
              ) : doc.status === 'approved' ? (
                <span className="px-3 py-1 rounded-lg bg-emerald-100 text-emerald-800 text-xs font-bold flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5" />
                  <span>Document validé en ligne</span>
                </span>
              ) : (
                <span className="px-3 py-1 rounded-lg bg-red-100 text-red-800 text-xs font-bold flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>Document non conforme</span>
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
