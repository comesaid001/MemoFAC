import React, { useState } from 'react';
import { 
  Wallet, 
  FileText, 
  ArrowLeft, 
  Plus, 
  CreditCard, 
  CheckCircle2, 
  ShieldCheck, 
  TrendingUp, 
  ArrowUpRight 
} from 'lucide-react';
import { AcademicDocument } from '../types';

interface AuthorScreenProps {
  documents: AcademicDocument[];
  onNavigateHome: () => void;
  onNavigatePublish: () => void;
}

export const AuthorScreen: React.FC<AuthorScreenProps> = ({
  documents,
  onNavigateHome,
  onNavigatePublish,
}) => {
  const [balance, setBalance] = useState(0);
  const [totalSimulatedSales, setTotalSimulatedSales] = useState(0);
  const [isWithdrawing, setIsWithdrawing] = useState(false);
  const [withdrawSuccess, setWithdrawSuccess] = useState(false);

  // Author documents (authored by logged-in author, or sample published ones)
  const myDocs = documents.slice(0, 2);

  const handleWithdraw = () => {
    if (balance <= 0) return;
    setIsWithdrawing(true);
    setTimeout(() => {
      setIsWithdrawing(false);
      setWithdrawSuccess(true);
      setBalance(0);
      setTimeout(() => setWithdrawSuccess(false), 4000);
    }, 1800);
  };

  const handleSimulateSale = () => {
    setBalance((prev) => prev + 400);
    setTotalSimulatedSales((prev) => prev + 1);
  };

  return (
    <div className="max-w-4xl mx-auto w-full px-4 py-6 flex flex-col gap-6">
      {/* En-tête institutionnel */}
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
            Espace Auteur & Suivi des Droits
          </h1>
          <p className="font-['Inter'] text-xs text-[#444651]">
            Gestion des fiches publiées, comptabilisation des consultations et transferts Mobile Money.
          </p>
        </div>

        <button
          onClick={onNavigatePublish}
          className="h-10 px-3.5 rounded-xl bg-[#00236f] hover:bg-[#1e3a8a] text-white font-['Plus_Jakarta_Sans'] text-xs font-bold flex items-center gap-1.5 shadow-xs cursor-pointer active:scale-95 transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Déposer un document</span>
        </button>
      </div>

      {/* Carte de solde et virement */}
      <div className="p-5 sm:p-6 rounded-2xl bg-[#00236f] text-white shadow-lg flex flex-col gap-4 border border-[#1e3a8a]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
              <Wallet className="w-4 h-4 text-[#dce1ff]" />
            </div>
            <span className="font-['Plus_Jakarta_Sans'] text-xs font-semibold text-[#dce1ff]">
              Solde disponible pour virement
            </span>
          </div>
          <span className="px-2.5 py-0.5 rounded-full bg-[#0051d5] text-white text-[10px] font-bold">
            Taux contractuel : 80% net
          </span>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="font-['Plus_Jakarta_Sans'] text-3xl sm:text-4xl font-extrabold">
                {balance.toLocaleString()}
              </span>
              <span className="font-['Plus_Jakarta_Sans'] text-lg font-bold text-[#dce1ff]">
                FCFA
              </span>
            </div>
            <span className="font-['Inter'] text-xs text-[#b6c4ff] mt-0.5 block">
              Compte de versement : Wave CI / Orange Money (+225 07 •• •• 89)
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleWithdraw}
              disabled={balance === 0 || isWithdrawing}
              className={`h-11 px-5 rounded-xl bg-white text-[#00236f] hover:bg-[#faf8ff] font-['Plus_Jakarta_Sans'] text-xs font-bold flex items-center justify-center gap-2 shadow-md active:scale-95 transition-all cursor-pointer ${
                balance === 0 ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              <CreditCard className="w-4 h-4 text-[#0051d5]" />
              <span>{isWithdrawing ? 'Transfert en cours...' : 'Demander le virement Mobile Money'}</span>
            </button>

            <button
              onClick={handleSimulateSale}
              title="Tester une consultation étudiante de votre fiche"
              className="h-11 px-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-['Plus_Jakarta_Sans'] text-xs font-semibold flex items-center gap-1 cursor-pointer transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Test consultation (+400 F)</span>
            </button>
          </div>
        </div>

        {withdrawSuccess && (
          <div className="p-3 rounded-xl bg-emerald-500/20 border border-emerald-400 text-emerald-100 text-xs flex items-center gap-2 animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Ordre de virement transmis avec succès à l'opérateur Mobile Money.</span>
          </div>
        )}
      </div>

      {/* Grille d'indicateurs réels */}
      <div className="grid grid-cols-3 gap-3">
        <div className="p-3.5 rounded-xl bg-white border border-[#eaedff] shadow-xs flex flex-col">
          <span className="text-[11px] text-[#757682] font-medium">Consultations autorisées</span>
          <span className="font-['Plus_Jakarta_Sans'] text-xl font-bold text-[#00236f] mt-0.5">
            {totalSimulatedSales}
          </span>
          <span className="text-[10px] text-[#757682] mt-1">Données en temps réel</span>
        </div>

        <div className="p-3.5 rounded-xl bg-white border border-[#eaedff] shadow-xs flex flex-col">
          <span className="text-[11px] text-[#757682] font-medium">Fiches actives en ligne</span>
          <span className="font-['Plus_Jakarta_Sans'] text-xl font-bold text-[#00236f] mt-0.5">
            {myDocs.length}
          </span>
          <span className="text-[10px] text-[#0051d5] font-semibold mt-1">Conformes aux syllabus</span>
        </div>

        <div className="p-3.5 rounded-xl bg-white border border-[#eaedff] shadow-xs flex flex-col">
          <span className="text-[11px] text-[#757682] font-medium">Statut de conformité</span>
          <div className="flex items-center gap-1.5 mt-0.5">
            <span className="font-['Plus_Jakarta_Sans'] text-sm font-bold text-[#00236f]">Certifié</span>
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
          </div>
          <span className="text-[10px] text-[#757682] mt-1">Protection DRM activée</span>
        </div>
      </div>

      {/* Liste des documents déposés */}
      <div className="flex flex-col gap-3">
        <h2 className="font-['Plus_Jakarta_Sans'] text-base font-bold text-[#00236f]">
          Documents universitaires publiés
        </h2>

        <div className="flex flex-col gap-2.5">
          {myDocs.map((doc) => (
            <div
              key={doc.id}
              className="p-3.5 rounded-xl bg-white border border-[#eaedff] shadow-xs flex items-center justify-between gap-3"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-10 h-12 rounded-lg bg-[#eaedff] overflow-hidden shrink-0">
                  <img src={doc.thumbnailUrl} alt={doc.title} className="w-full h-full object-cover" />
                </div>
                <div className="flex flex-col min-w-0">
                  <h4 className="font-['Plus_Jakarta_Sans'] text-xs font-bold text-[#131b2e] truncate">
                    {doc.title}
                  </h4>
                  <span className="text-[11px] text-[#757682] truncate">
                    {doc.university} • Tarif d'accès : {doc.priceFCFA} FCFA
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2.5 shrink-0">
                <span className="px-2.5 py-0.5 rounded-md bg-emerald-50 text-emerald-800 text-[10px] font-bold border border-emerald-200">
                  En ligne
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
