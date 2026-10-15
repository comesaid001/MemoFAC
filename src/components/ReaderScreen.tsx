import React, { useState, useRef } from 'react';
import { 
  Home, 
  Share2, 
  Copy, 
  Check, 
  Lock, 
  ShieldCheck, 
  FileText, 
  Maximize2, 
  Minimize2, 
  ZoomIn, 
  ZoomOut, 
  Sun, 
  Moon, 
  BookOpen, 
  ChevronLeft, 
  ChevronRight, 
  Smartphone, 
  CreditCard, 
  CheckCircle2, 
  Star, 
  UserCheck, 
  RefreshCw,
  Users
} from 'lucide-react';
import { AcademicDocument, MobileMoneyOperator, UserSession, DocumentPage, Review } from '../types';

interface ReaderScreenProps {
  document: AcademicDocument;
  userSession: UserSession;
  isUnlocked: boolean;
  onUnlockDoc: (docId: string) => void;
  onNavigateHome: () => void;
}

export const ReaderScreen: React.FC<ReaderScreenProps> = ({
  document,
  userSession,
  isUnlocked,
  onUnlockDoc,
  onNavigateHome,
}) => {
  const [selectedProvider, setSelectedProvider] = useState<MobileMoneyOperator>('wave');
  const [phone, setPhone] = useState('07 48 92 11 89');
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedUrlDirect, setCopiedUrlDirect] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [zoomLevel, setZoomLevel] = useState(100);
  const [readerTheme, setReaderTheme] = useState<'light' | 'sepia' | 'dark'>('light');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [newReviewText, setNewReviewText] = useState('');
  const [newRating, setNewRating] = useState(5);
  const [showAddReview, setShowAddReview] = useState(false);

  const paymentTunnelRef = useRef<HTMLDivElement>(null);
  const readerStageRef = useRef<HTMLDivElement>(null);

  const scrollToPayment = () => {
    paymentTunnelRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleCopyLink = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleCopyUrlDirect = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopiedUrlDirect(true);
    setTimeout(() => setCopiedUrlDirect(false), 2000);
  };

  const handleCheckout = () => {
    if (!phone || phone.trim().length < 8) {
      alert("Veuillez renseigner un numéro Mobile Money valide (ex: 07 48 92 11 89).");
      return;
    }

    setIsProcessing(true);
    setPaymentSuccess(false);

    setTimeout(() => {
      setIsProcessing(false);
      setPaymentSuccess(true);
      onUnlockDoc(document.id);

      setTimeout(() => {
        readerStageRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 1200);
    }, 2800);
  };

  const toggleFullscreen = () => {
    if (!readerStageRef.current) return;
    if (!documentRefFullscreen()) {
      if (readerStageRef.current.requestFullscreen) {
        readerStageRef.current.requestFullscreen();
      }
      setIsFullscreen(true);
    } else {
      if (window.document.exitFullscreen) {
        window.document.exitFullscreen();
      }
      setIsFullscreen(false);
    }
  };

  const documentRefFullscreen = () => {
    return !!window.document.fullscreenElement;
  };

  const activePageData = document.pages.find((p: DocumentPage) => p.pageNumber === currentPage) || document.pages[0];

  return (
    <div className="flex flex-col w-full pb-10">
      {/* Barre de navigation institutionnelle & Fil d'Ariane */}
      <section className="w-full bg-[#f2f3ff] px-4 py-2.5 shadow-xs border-b border-[#eaedff]">
        <div className="max-w-4xl mx-auto flex flex-col gap-1.5">
          <nav aria-label="Fil d'Ariane" className="flex items-center gap-1.5 overflow-x-auto whitespace-nowrap text-[#444651] font-['Plus_Jakarta_Sans'] text-xs">
            <button
              onClick={onNavigateHome}
              className="hover:text-[#00236f] transition-colors flex items-center gap-1 cursor-pointer font-medium"
            >
              <Home className="w-3.5 h-3.5" />
              <span>Accueil</span>
            </button>
            <span className="text-[#c5c5d3]">/</span>
            <span className="hover:text-[#00236f]">{document.facultyLabel}</span>
            <span className="text-[#c5c5d3]">/</span>
            <span>{document.level.split('•')[0].trim()}</span>
            <span className="text-[#c5c5d3]">/</span>
            <span className="text-[#00236f] font-bold truncate max-w-[200px]">
              {document.title}
            </span>
          </nav>

          {/* Statut de conformité et partage professionnel */}
          <div className="flex items-center justify-between pt-1">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-[#0051d5] text-white font-['Plus_Jakarta_Sans'] text-[10px] uppercase font-bold tracking-wider flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" />
                <span>Document universitaire certifié</span>
              </span>
              <span className="text-[#131b2e] font-['Plus_Jakarta_Sans'] text-xs font-medium hidden sm:inline-flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-[#0051d5]" />
                <span>Session de consultation protégée</span>
              </span>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                onClick={handleCopyLink}
                className="h-8 px-2.5 rounded-lg bg-[#dae2fd] hover:bg-[#dbe1ff] text-[#00236f] font-['Plus_Jakarta_Sans'] text-xs font-bold flex items-center gap-1 transition-all active:scale-95 cursor-pointer"
                type="button"
              >
                {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedLink ? 'Copié' : 'Copier'}</span>
              </button>

              <a
                href={`https://api.whatsapp.com/send?text=${encodeURIComponent(document.whatsappShareText)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="h-8 px-2.5 rounded-lg bg-[#00236f] hover:bg-[#1e3a8a] text-white font-['Plus_Jakarta_Sans'] text-xs font-bold flex items-center gap-1 shadow-xs active:scale-95 transition-all"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>Partager</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto w-full px-4 flex flex-col">
        {/* Bannière juridique et déontologique de protection DRM */}
        <section className="mt-4 p-3.5 rounded-xl bg-[#dae2fd] border border-[#b4c5ff] flex items-start gap-3 shadow-xs">
          <div className="w-9 h-9 rounded-lg bg-[#00236f] flex items-center justify-center shrink-0 text-white">
            <Lock className="w-4 h-4" />
          </div>
          <div className="flex flex-col min-w-0">
            <div className="flex items-center gap-2">
              <h2 className="font-['Plus_Jakarta_Sans'] text-xs sm:text-sm text-[#00236f] font-bold">
                Consultation in-browser sous protection DRM
              </h2>
              <span className="px-2 py-0.5 rounded-full bg-[#dce1ff] text-[#00164e] font-['Plus_Jakarta_Sans'] text-[10px] font-bold">
                Protection légale
              </span>
            </div>
            <p className="font-['Inter'] text-xs text-[#444651] leading-relaxed mt-0.5">
              Téléchargement du fichier source restreint. Un filigrane numérique nominatif et horodaté est associé à votre session pour garantir le respect des droits d'auteur et la traçabilité institutionnelle.
            </p>
          </div>
        </section>

        {/* Métadonnées du document et auteur certifié */}
        <section className="pt-4 pb-2 flex flex-col gap-1.5">
          <div className="flex items-center gap-2 text-[#444651] font-['Plus_Jakarta_Sans'] text-xs">
            <span className="px-2 py-0.5 rounded-md bg-[#eaedff] text-[#00236f] font-bold">
              {document.university}
            </span>
            <span>• {document.ufr}</span>
          </div>

          <h1 className="font-['Plus_Jakarta_Sans'] text-xl sm:text-2xl text-[#00236f] font-bold leading-snug">
            {document.title}
          </h1>

          <div className="flex items-center gap-3 pt-1">
            <div className="w-8 h-8 rounded-full bg-[#00236f] text-white flex items-center justify-center font-bold text-xs font-['Plus_Jakarta_Sans']">
              {document.author.avatarInitials}
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-['Plus_Jakarta_Sans'] text-xs font-bold text-[#131b2e]">
                  {document.author.name}
                </span>
                {document.author.verified && (
                  <span className="inline-flex items-center gap-0.5 text-[10px] bg-emerald-50 text-emerald-700 px-1.5 py-0.2 rounded font-semibold border border-emerald-200">
                    <UserCheck className="w-3 h-3" />
                    Auteur vérifié
                  </span>
                )}
              </div>
              <span className="font-['Inter'] text-[11px] text-[#757682]">
                {document.author.role}
              </span>
            </div>
          </div>
        </section>

        {/* Liseuse HTML5 sécurisée */}
        <section 
          ref={readerStageRef}
          className={`mt-3 rounded-2xl overflow-hidden shadow-md flex flex-col relative select-none border border-[#eaedff] transition-colors ${
            readerTheme === 'sepia' 
              ? 'bg-[#fbf0d9] text-[#433422]' 
              : readerTheme === 'dark' 
                ? 'bg-[#0f172a] text-[#e2e8f0]' 
                : 'bg-white text-[#131b2e]'
          }`}
        >
          {/* Barre d'outils de la liseuse */}
          <div className="bg-[#00236f] text-white px-4 py-2.5 flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-2">
              <span className="font-['Plus_Jakarta_Sans'] text-xs sm:text-sm font-semibold tracking-wide flex items-center gap-1.5">
                <FileText className="w-4 h-4" />
                Page {isUnlocked ? `${currentPage} / ${document.pagesCount}` : `1 / ${document.pagesCount}`}
              </span>
              <span className="px-2 py-0.5 rounded bg-white/20 text-white font-['Plus_Jakarta_Sans'] text-[10px] font-bold">
                {isUnlocked ? 'Accès complet autorisé' : 'Extrait public'}
              </span>
            </div>

            <div className="flex items-center gap-1.5">
              {/* Sélecteur de mode de lecture avec icônes vectorielles sobres */}
              <div className="flex items-center bg-white/10 rounded-lg p-0.5 mr-1 border border-white/15">
                <button
                  onClick={() => setReaderTheme('light')}
                  title="Affichage fond clair"
                  className={`w-6 h-6 rounded flex items-center justify-center transition-colors ${
                    readerTheme === 'light' ? 'bg-white text-[#00236f]' : 'text-white/80 hover:text-white'
                  }`}
                >
                  <Sun className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setReaderTheme('sepia')}
                  title="Affichage sépia reposant"
                  className={`w-6 h-6 rounded flex items-center justify-center transition-colors ${
                    readerTheme === 'sepia' ? 'bg-[#fbf0d9] text-[#433422]' : 'text-white/80 hover:text-white'
                  }`}
                >
                  <BookOpen className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setReaderTheme('dark')}
                  title="Affichage mode sombre"
                  className={`w-6 h-6 rounded flex items-center justify-center transition-colors ${
                    readerTheme === 'dark' ? 'bg-[#0f172a] text-white' : 'text-white/80 hover:text-white'
                  }`}
                >
                  <Moon className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Ajustement du zoom */}
              <button
                onClick={() => setZoomLevel((prev: number) => Math.max(80, prev - 10))}
                className="w-7 h-7 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors cursor-pointer"
                title="Réduire"
                type="button"
              >
                <ZoomOut className="w-3.5 h-3.5" />
              </button>
              <span className="text-[11px] font-mono text-white/80 px-1">{zoomLevel}%</span>
              <button
                onClick={() => setZoomLevel((prev: number) => Math.min(130, prev + 10))}
                className="w-7 h-7 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors cursor-pointer"
                title="Agrandir"
                type="button"
              >
                <ZoomIn className="w-3.5 h-3.5" />
              </button>

              {/* Plein écran */}
              <button
                onClick={toggleFullscreen}
                className="w-7 h-7 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors cursor-pointer ml-1"
                title="Basculer en plein écran"
                type="button"
              >
                {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>

          {/* Page de lecture active */}
          <div 
            style={{ transform: `scale(${zoomLevel / 100})`, transformOrigin: 'top center' }}
            className={`relative p-5 sm:p-7 min-h-[420px] overflow-hidden flex flex-col justify-between transition-transform duration-150 ${
              readerTheme === 'sepia' ? 'bg-[#fbf0d9]' : readerTheme === 'dark' ? 'bg-[#0f172a]' : 'bg-white'
            }`}
          >
            {/* Filigrane d'identification individuel */}
            <div className="pointer-events-none absolute inset-0 flex flex-col justify-around opacity-10 -rotate-25 scale-125 select-none z-10">
              <p className="font-['Plus_Jakarta_Sans'] text-xs sm:text-sm font-bold text-[#00236f] tracking-widest text-center uppercase">
                MEMOFAC • SESSION OFFICIELLE • {userSession.fullName.toUpperCase()} ({userSession.phone})
              </p>
              <p className="font-['Plus_Jakarta_Sans'] text-xs sm:text-sm font-bold text-[#00236f] tracking-widest text-center uppercase">
                MEMOFAC • SESSION OFFICIELLE • {userSession.fullName.toUpperCase()} ({userSession.phone})
              </p>
              <p className="font-['Plus_Jakarta_Sans'] text-xs sm:text-sm font-bold text-[#00236f] tracking-widest text-center uppercase">
                MEMOFAC • SESSION OFFICIELLE • {userSession.fullName.toUpperCase()} ({userSession.phone})
              </p>
            </div>

            {/* Contenu textuel académique */}
            <div className="relative z-0 flex flex-col gap-3">
              <div className="flex items-center justify-between pb-2 border-b border-[#eaedff]">
                <span className="font-['Plus_Jakarta_Sans'] text-[11px] text-[#757682] uppercase font-semibold">
                  Syllabus universitaire validé
                </span>
                <span className="font-['Plus_Jakarta_Sans'] text-[11px] text-[#0051d5] font-bold">
                  {document.university}
                </span>
              </div>

              <h3 className="font-['Plus_Jakarta_Sans'] text-base sm:text-lg font-bold text-[#00236f] underline decoration-[#0051d5] decoration-2 underline-offset-4">
                {activePageData.chapterTitle}
              </h3>

              {activePageData.subTitle && (
                <span className="text-xs font-semibold text-[#0051d5]">
                  {activePageData.subTitle}
                </span>
              )}

              <p className="font-['Inter'] text-xs sm:text-sm leading-relaxed text-justify">
                {activePageData.content}
              </p>

              {activePageData.bulletPoints && (
                <div className={`p-3.5 rounded-xl flex flex-col gap-2 ${
                  readerTheme === 'dark' ? 'bg-white/5 border border-white/10' : 'bg-[#f2f3ff] border border-[#eaedff]'
                }`}>
                  {activePageData.bulletPoints.map((bp: string, idx: number) => (
                    <div key={idx} className="flex items-start gap-2 text-xs sm:text-sm">
                      <span className="font-['Plus_Jakarta_Sans'] font-bold text-[#0051d5]">
                        {idx + 1}.
                      </span>
                      <span className="leading-snug">{bp}</span>
                    </div>
                  ))}
                </div>
              )}

              {activePageData.tableData && (
                <div className="overflow-x-auto rounded-lg border border-[#eaedff] my-1">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-[#e2e7ff] text-[#00236f] font-['Plus_Jakarta_Sans'] font-bold">
                      <tr>
                        {activePageData.tableData.headers.map((h: string, i: number) => (
                          <th key={i} className="p-2 border-b border-[#eaedff]">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {activePageData.tableData.rows.map((row: string[], rIdx: number) => (
                        <tr key={rIdx} className="border-b border-[#eaedff]/60 hover:bg-black/5">
                          {row.map((cell: string, cIdx: number) => (
                            <td key={cIdx} className="p-2 font-medium">{cell}</td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {activePageData.legalQuote && (
                <p className="font-['Inter'] text-xs text-[#757682] italic border-l-2 border-[#0051d5] pl-2.5 my-1">
                  {activePageData.legalQuote}
                </p>
              )}
            </div>

            <div className="flex items-center justify-between pt-4 text-[#757682] font-['Plus_Jakarta_Sans'] text-xs z-0 border-t border-[#eaedff] mt-4">
              <span>{activePageData.keyNote || `Page ${currentPage}/${document.pagesCount}`}</span>
              <span className="flex items-center gap-1 text-[#0051d5] font-semibold">
                <ShieldCheck className="w-4 h-4" />
                Filigrane numérique actif
              </span>
            </div>
          </div>

          {/* Contrôles de navigation entre pages */}
          {isUnlocked && document.pages.length > 1 && (
            <div className="bg-[#f2f3ff] px-4 py-2 flex items-center justify-between border-t border-[#eaedff]">
              <button
                onClick={() => setCurrentPage((p: number) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="h-8 px-3 rounded-lg bg-white border border-[#eaedff] text-xs font-bold text-[#00236f] disabled:opacity-40 flex items-center gap-1 cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
                Page précédente
              </button>

              <div className="flex items-center gap-1">
                {document.pages.map((p: DocumentPage) => (
                  <button
                    key={p.pageNumber}
                    onClick={() => setCurrentPage(p.pageNumber)}
                    className={`w-7 h-7 rounded-md text-xs font-bold transition-all cursor-pointer ${
                      currentPage === p.pageNumber
                        ? 'bg-[#00236f] text-white shadow-xs'
                        : 'bg-white text-[#444651] hover:bg-[#e2e7ff]'
                    }`}
                  >
                    {p.pageNumber}
                  </button>
                ))}
              </div>

              <button
                onClick={() => setCurrentPage((p: number) => Math.min(document.pages.length, p + 1))}
                disabled={currentPage === document.pages.length}
                className="h-8 px-3 rounded-lg bg-white border border-[#eaedff] text-xs font-bold text-[#00236f] disabled:opacity-40 flex items-center gap-1 cursor-pointer"
              >
                Page suivante
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* Page verrouillée et proposition d'accès */}
          {!isUnlocked && (
            <>
              <div className="bg-[#eaedff] py-1.5 px-4 flex items-center justify-between text-[#444651] font-['Plus_Jakarta_Sans'] text-xs border-y border-[#dbe1ff]">
                <span className="font-semibold">Fin de l'extrait en libre accès</span>
                <span>Pages restantes : {document.pagesCount - 1} pages protégées</span>
              </div>

              <div className="relative bg-[#f2f3ff] min-h-[340px] overflow-hidden flex items-center justify-center p-4">
                <div className="absolute inset-0 p-6 flex flex-col gap-4 filter blur-md select-none opacity-40">
                  <h4 className="font-['Plus_Jakarta_Sans'] text-base font-bold text-[#00236f]">
                    SECTION II : ANALYSE JURIDIQUE DES NULLITÉS
                  </h4>
                  <p className="font-['Inter'] text-sm">
                    Régime juridique applicable selon les principes directeurs de l'Acte Uniforme et la jurisprudence constante.
                  </p>
                  <div className="h-16 bg-[#00236f]/20 rounded-xl w-full" />
                </div>

                <div className="relative z-20 w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl border border-[#eaedff] flex flex-col items-center text-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-[#dbe1ff] flex items-center justify-center text-[#00174b]">
                    <Lock className="w-6 h-6 text-[#00236f]" />
                  </div>

                  <div className="flex flex-col">
                    <span className="font-['Plus_Jakarta_Sans'] text-[11px] text-[#0051d5] font-bold uppercase tracking-wider">
                      Consultation intégrale
                    </span>
                    <h3 className="font-['Plus_Jakarta_Sans'] text-lg text-[#00236f] font-bold mt-0.5">
                      Débloquer l'accès au document
                    </h3>
                    <p className="font-['Inter'] text-xs text-[#444651] mt-1 leading-relaxed">
                      Accédez aux {document.pagesCount} pages complètes de la synthèse pédagogique et des cas pratiques.
                    </p>
                  </div>

                  <div className="flex items-baseline justify-center gap-1 py-1">
                    <span className="font-['Plus_Jakarta_Sans'] text-3xl text-[#00236f] font-extrabold">
                      {document.priceFCFA}
                    </span>
                    <span className="font-['Plus_Jakarta_Sans'] text-sm font-bold text-[#0051d5]">
                      FCFA
                    </span>
                  </div>

                  <button
                    onClick={scrollToPayment}
                    className="w-full h-11 rounded-xl bg-[#0051d5] hover:bg-[#003ea8] text-white font-['Plus_Jakarta_Sans'] text-sm font-bold flex items-center justify-center gap-1.5 shadow-md active:scale-98 transition-all cursor-pointer"
                    type="button"
                  >
                    <span>Valider l'accès ({document.priceFCFA} FCFA)</span>
                  </button>

                  <div className="flex items-center justify-center gap-3 text-[#757682] font-['Plus_Jakarta_Sans'] text-xs">
                    <span className="flex items-center gap-1 text-[#00236f]">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      Activation immédiate
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1 text-[#00236f]">
                      <ShieldCheck className="w-3.5 h-3.5 text-[#0051d5]" />
                      Lecture in-browser
                    </span>
                  </div>
                </div>
              </div>
            </>
          )}
        </section>

        {/* Formulaire de paiement Mobile Money institutionnel */}
        {!isUnlocked && (
          <section 
            ref={paymentTunnelRef}
            className="mt-6 p-5 sm:p-6 rounded-2xl bg-white shadow-md border border-[#eaedff] flex flex-col gap-4 scroll-mt-20"
            id="payment-tunnel"
          >
            <div className="flex items-center justify-between pb-2 border-b border-[#eaedff]">
              <div className="flex flex-col">
                <span className="px-2.5 py-0.5 rounded-full bg-[#dbe1ff] text-[#00174b] font-['Plus_Jakarta_Sans'] text-xs w-fit font-bold">
                  Protocole de règlement
                </span>
                <h2 className="font-['Plus_Jakarta_Sans'] text-lg text-[#00236f] font-bold mt-1">
                  Paiement par Mobile Money
                </h2>
              </div>
              <div className="flex items-center gap-1.5 bg-[#f2f3ff] px-2.5 py-1 rounded-full text-[#0051d5] font-['Plus_Jakarta_Sans'] text-xs font-semibold">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Transaction chiffrée</span>
              </div>
            </div>

            <p className="font-['Inter'] text-xs sm:text-sm text-[#444651] leading-relaxed">
              Sélectionnez votre opérateur régional. Une notification d'autorisation de prélèvement USSD s'affichera directement sur votre terminal mobile pour confirmer le montant de <strong>{document.priceFCFA} FCFA</strong>.
            </p>

            {/* Sélecteur d'opérateurs sobre */}
            <div className="grid grid-cols-2 gap-2.5">
              {[
                { id: 'wave', label: 'Wave CI', note: 'Prélèvement direct sans frais' },
                { id: 'orange', label: 'Orange Money', note: 'Validation via #144#' },
                { id: 'mtn', label: 'MTN MoMo', note: 'Validation via *133#' },
                { id: 'moov', label: 'Moov Money', note: 'Validation via *155#' },
              ].map((op) => (
                <label 
                  key={op.id}
                  className={`flex items-start gap-2.5 p-3 rounded-xl border cursor-pointer transition-all ${
                    selectedProvider === op.id
                      ? 'bg-[#dbe1ff]/50 border-[#0051d5] ring-2 ring-[#0051d5]/20'
                      : 'bg-[#f2f3ff] border-[#eaedff] hover:bg-[#e2e7ff]'
                  }`}
                >
                  <input
                    type="radio"
                    name="momo_provider"
                    value={op.id}
                    checked={selectedProvider === op.id}
                    onChange={() => setSelectedProvider(op.id as MobileMoneyOperator)}
                    className="w-4 h-4 text-[#0051d5] accent-[#0051d5] mt-0.5"
                  />
                  <div className="flex flex-col">
                    <span className="font-['Plus_Jakarta_Sans'] text-xs sm:text-sm font-bold text-[#131b2e]">
                      {op.label}
                    </span>
                    <span className="font-['Plus_Jakarta_Sans'] text-[11px] text-[#757682]">
                      {op.note}
                    </span>
                  </div>
                </label>
              ))}
            </div>

            {/* Saisie du numéro de téléphone */}
            <div className="flex flex-col gap-1.5">
              <label className="font-['Plus_Jakarta_Sans'] text-xs font-bold text-[#131b2e]" htmlFor="momo-phone">
                Numéro de téléphone associé au compte Mobile Money
              </label>
              <div className="flex items-center rounded-xl bg-[#f2f3ff] border border-[#eaedff] px-3.5 h-12 shadow-xs focus-within:ring-2 focus-within:ring-[#0051d5] focus-within:bg-white transition-all">
                <span className="font-['Plus_Jakarta_Sans'] text-sm font-bold text-[#00236f] mr-2">
                  +225
                </span>
                <input
                  className="w-full bg-transparent text-[#131b2e] font-['Plus_Jakarta_Sans'] text-sm sm:text-base font-semibold placeholder:text-[#757682] focus:outline-none"
                  id="momo-phone"
                  inputMode="numeric"
                  maxLength={14}
                  value={phone}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPhone(e.target.value)}
                  placeholder="07 00 00 00 00"
                  type="tel"
                />
                <Smartphone className="w-4 h-4 text-[#0051d5]" />
              </div>
              <span className="font-['Inter'] text-[11px] text-[#757682]">
                La demande d'autorisation de débit sécurisée sera transmise à ce numéro.
              </span>
            </div>

            {/* Bouton de confirmation de paiement */}
            <button
              onClick={handleCheckout}
              disabled={isProcessing}
              className={`w-full h-12 rounded-xl bg-[#00236f] hover:bg-[#1e3a8a] text-white font-['Plus_Jakarta_Sans'] text-sm font-bold flex items-center justify-center gap-2 shadow-md active:scale-98 transition-all cursor-pointer ${
                isProcessing ? 'opacity-75 cursor-not-allowed' : ''
              }`}
              type="button"
            >
              <CreditCard className="w-4 h-4" />
              <span>
                {isProcessing
                  ? "Transmission de la requête USSD en cours..."
                  : `Régler ${document.priceFCFA} FCFA et accéder au document`}
              </span>
            </button>

            {/* Alerte de statut de confirmation USSD */}
            {isProcessing && (
              <div className="p-4 rounded-xl bg-[#e2e7ff] border border-[#b4c5ff] flex flex-col gap-2">
                <div className="flex items-center gap-2 text-[#00236f] font-['Plus_Jakarta_Sans'] text-xs sm:text-sm font-bold">
                  <RefreshCw className="w-4 h-4 animate-spin text-[#0051d5]" />
                  <span>Requête d'autorisation transmise (+225 {phone})</span>
                </div>
                <p className="font-['Inter'] text-xs text-[#131b2e] leading-relaxed">
                  Veuillez composer votre code secret sur votre téléphone pour valider l'opération de {document.priceFCFA} FCFA. L'accès au document sera actualisé automatiquement à la réception de la confirmation bancaire.
                </p>
              </div>
            )}

            {paymentSuccess && (
              <div className="p-4 rounded-xl bg-[#dbe1ff] border border-[#0051d5] flex flex-col gap-1.5 animate-in fade-in duration-200">
                <div className="flex items-center gap-2 text-[#00174b] font-bold font-['Plus_Jakarta_Sans'] text-sm">
                  <CheckCircle2 className="w-4 h-4 text-[#0051d5]" />
                  <span>Transaction confirmée avec succès</span>
                </div>
                <p className="font-['Inter'] text-xs text-[#00174b]">
                  L'accès intégral au document est désormais activé pour votre compte ({userSession.fullName}).
                </p>
              </div>
            )}

            {/* Garanties techniques */}
            <div className="flex items-center justify-between pt-1 text-[#757682] font-['Plus_Jakarta_Sans'] text-[11px] flex-wrap gap-2">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-[#0051d5]" />
                Protocole de chiffrement TLS 256-bit
              </span>
              <span className="flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                Déblocage immédiat in-browser
              </span>
            </div>
          </section>
        )}

        {/* Descriptif détaillé et données réelles */}
        <section className="mt-8 flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <h3 className="font-['Plus_Jakarta_Sans'] text-base font-bold text-[#00236f]">
              Descriptif analytique du document
            </h3>
            <p className="font-['Inter'] text-xs sm:text-sm text-[#444651] leading-relaxed">
              {document.synopsis}
            </p>
          </div>

          {/* Grille de métadonnées réelles */}
          <div className="grid grid-cols-3 gap-2.5">
            <div className="p-3 rounded-xl bg-white border border-[#eaedff] shadow-xs flex flex-col items-center text-center">
              <FileText className="w-4 h-4 text-[#0051d5]" />
              <span className="font-['Plus_Jakarta_Sans'] text-base font-bold text-[#00236f] mt-1">
                {document.pagesCount}
              </span>
              <span className="font-['Plus_Jakarta_Sans'] text-[11px] text-[#444651]">Pages documentées</span>
            </div>

            <div className="p-3 rounded-xl bg-white border border-[#eaedff] shadow-xs flex flex-col items-center text-center">
              <Star className="w-4 h-4 text-[#d97706] fill-[#d97706]" />
              <span className="font-['Plus_Jakarta_Sans'] text-base font-bold text-[#00236f] mt-1">
                {document.rating} / 5
              </span>
              <span className="font-['Plus_Jakarta_Sans'] text-[11px] text-[#444651]">
                Évaluation académique
              </span>
            </div>

            <div className="p-3 rounded-xl bg-white border border-[#eaedff] shadow-xs flex flex-col items-center text-center">
              <Users className="w-4 h-4 text-[#00236f]" />
              <span className="font-['Plus_Jakarta_Sans'] text-base font-bold text-[#00236f] mt-1">
                {document.reviews.length}
              </span>
              <span className="font-['Plus_Jakarta_Sans'] text-[11px] text-[#444651]">
                {document.reviews.length <= 1 ? 'Avis enregistré' : 'Avis enregistrés'}
              </span>
            </div>
          </div>

          {/* Évaluations des pairs */}
          <div className="flex flex-col gap-3 pt-2">
            <div className="flex items-center justify-between">
              <h3 className="font-['Plus_Jakarta_Sans'] text-base font-bold text-[#00236f]">
                Évaluations des étudiants
              </h3>
              <button
                onClick={() => setShowAddReview(!showAddReview)}
                className="text-xs text-[#00236f] font-bold underline hover:text-[#0051d5] cursor-pointer"
              >
                {showAddReview ? 'Annuler' : 'Ajouter une évaluation'}
              </button>
            </div>

            {/* Formulaire d'ajout d'avis sobre */}
            {showAddReview && (
              <div className="p-4 rounded-xl bg-white border border-[#eaedff] flex flex-col gap-3 animate-in fade-in">
                <div className="flex items-center justify-between">
                  <span className="font-['Plus_Jakarta_Sans'] text-xs font-bold text-[#131b2e]">
                    Note attribuée :
                  </span>
                  <div className="flex gap-1 text-[#d97706]">
                    {[1, 2, 3, 4, 5].map((star: number) => (
                      <button
                        key={star}
                        onClick={() => setNewRating(star)}
                        className="cursor-pointer"
                        type="button"
                      >
                        <Star className={`w-4 h-4 ${star <= newRating ? 'fill-[#d97706]' : ''}`} />
                      </button>
                    ))}
                  </div>
                </div>
                <textarea
                  value={newReviewText}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setNewReviewText(e.target.value)}
                  placeholder="Rédigez une appréciation constructive sur la conformité et la rigueur de cette fiche..."
                  className="w-full p-2.5 rounded-lg bg-[#f2f3ff] text-xs text-[#131b2e] border border-[#eaedff] focus:outline-none focus:ring-2 focus:ring-[#0051d5]"
                  rows={3}
                />
                <button
                  onClick={() => {
                    if (!newReviewText.trim()) return;
                    document.reviews.unshift({
                      id: `rev-${Date.now()}`,
                      authorName: userSession.fullName,
                      authorInitials: userSession.fullName.slice(0, 2).toUpperCase(),
                      studyLevel: `${userSession.level} • ${userSession.university}`,
                      rating: newRating,
                      date: 'Octobre 2026',
                      comment: `« ${newReviewText} »`,
                    });
                    setNewReviewText('');
                    setShowAddReview(false);
                  }}
                  className="self-end px-4 py-1.5 rounded-lg bg-[#00236f] text-white font-['Plus_Jakarta_Sans'] text-xs font-bold cursor-pointer"
                  type="button"
                >
                  Enregistrer l'évaluation
                </button>
              </div>
            )}

            {/* Liste des avis réels */}
            {document.reviews.length === 0 ? (
              <p className="text-xs text-[#757682] p-4 bg-white rounded-xl border border-[#eaedff] text-center">
                Aucune évaluation enregistrée pour ce document pour l'instant.
              </p>
            ) : (
              document.reviews.map((rev: Review) => (
                <div
                  key={rev.id}
                  className="p-4 rounded-xl bg-white border border-[#eaedff] shadow-xs flex flex-col gap-2"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-full bg-[#dbe1ff] text-[#00174b] flex items-center justify-center font-bold text-xs font-['Plus_Jakarta_Sans']">
                        {rev.authorInitials}
                      </div>
                      <div className="flex flex-col">
                        <span className="font-['Plus_Jakarta_Sans'] text-xs font-bold text-[#131b2e]">
                          {rev.authorName}
                        </span>
                        <span className="font-['Inter'] text-[10px] text-[#757682]">
                          {rev.studyLevel} • {rev.date}
                        </span>
                      </div>
                    </div>

                    <div className="flex text-[#d97706]">
                      {Array.from({ length: 5 }).map((_: unknown, i: number) => (
                        <Star
                          key={i}
                          className={`w-3.5 h-3.5 ${i < Math.floor(rev.rating) ? 'fill-[#d97706]' : ''}`}
                        />
                      ))}
                    </div>
                  </div>

                  <p className="font-['Inter'] text-xs text-[#444651] leading-relaxed">
                    {rev.comment}
                  </p>
                </div>
              ))
            )}
          </div>
        </section>

        {/* Section de partage institutionnel */}
        <section className="mt-8 mb-4 p-5 sm:p-6 rounded-2xl bg-[#eaedff] border border-[#dbe1ff] shadow-xs flex flex-col gap-3 items-center text-center">
          <div className="w-10 h-10 rounded-full bg-[#00236f] text-white flex items-center justify-center">
            <Share2 className="w-5 h-5" />
          </div>

          <div className="flex flex-col">
            <h3 className="font-['Plus_Jakarta_Sans'] text-base sm:text-lg text-[#00236f] font-bold">
              Transmettre cette référence académique
            </h3>
            <p className="font-['Inter'] text-xs sm:text-sm text-[#444651] mt-1 max-w-md">
              Partagez le lien direct de cette fiche avec les étudiants et enseignants de votre faculté.
            </p>
          </div>

          <div className="flex flex-col w-full gap-2 pt-1 max-w-sm">
            <a
              href={`https://api.whatsapp.com/send?text=${encodeURIComponent(document.whatsappShareText)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full h-11 rounded-xl bg-[#00236f] hover:bg-[#1e3a8a] text-white font-['Plus_Jakarta_Sans'] text-xs font-bold flex items-center justify-center gap-2 shadow-xs active:scale-98 transition-all"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>Transmettre par messagerie académique</span>
            </a>

            <button
              onClick={handleCopyUrlDirect}
              className="w-full h-11 rounded-xl bg-white hover:bg-[#faf8ff] text-[#00236f] font-['Plus_Jakarta_Sans'] text-xs font-bold flex items-center justify-center gap-2 shadow-xs border border-[#eaedff] active:scale-98 transition-all cursor-pointer"
              type="button"
            >
              {copiedUrlDirect ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedUrlDirect ? 'Lien copié dans le presse-papiers' : "Copier le lien permanent"}</span>
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};
