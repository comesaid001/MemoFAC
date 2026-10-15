import React, { useState } from 'react';
import { 
  Search, 
  ArrowRight, 
  BookOpen, 
  FileText, 
  CheckCircle2, 
  ShieldCheck, 
  Smartphone, 
  Zap, 
  Upload, 
  Star, 
  Scale, 
  TrendingUp, 
  Stethoscope, 
  Atom, 
  GraduationCap,
  HardDrive,
  Eye,
  Lock
} from 'lucide-react';
import { AcademicDocument, FacultyType, ResourceType } from '../types';

interface HomeScreenProps {
  documents: AcademicDocument[];
  onOpenPreview: (doc: AcademicDocument) => void;
  onOpenReader: (docId: string) => void;
  onNavigatePublish: () => void;
  onOpenSearch: () => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  documents,
  onOpenPreview,
  onOpenReader,
  onNavigatePublish,
  onOpenSearch,
}) => {
  const [activeFaculty, setActiveFaculty] = useState<FacultyType>('all');
  const [searchFilter, setSearchFilter] = useState('');
  const [activeResourceType, setActiveResourceType] = useState<ResourceType | null>(null);

  const facultyOptions: { id: FacultyType; label: string; icon: React.ReactNode }[] = [
    { id: 'all', label: 'Toutes disciplines', icon: <GraduationCap className="w-3.5 h-3.5" /> },
    { id: 'droit', label: 'Droit & Sciences Politiques', icon: <Scale className="w-3.5 h-3.5" /> },
    { id: 'economie', label: 'Économie & Gestion', icon: <TrendingUp className="w-3.5 h-3.5" /> },
    { id: 'medecine', label: 'Médecine & Pharmacie', icon: <Stethoscope className="w-3.5 h-3.5" /> },
    { id: 'sciences', label: 'Sciences & STIC', icon: <Atom className="w-3.5 h-3.5" /> },
  ];

  const filteredDocs = documents.filter((doc) => {
    const matchesFaculty = activeFaculty === 'all' || doc.faculty === activeFaculty;
    const matchesSearch =
      searchFilter.trim() === '' ||
      doc.title.toLowerCase().includes(searchFilter.toLowerCase()) ||
      doc.university.toLowerCase().includes(searchFilter.toLowerCase()) ||
      doc.author.name.toLowerCase().includes(searchFilter.toLowerCase());
    return matchesFaculty && matchesSearch;
  });

  return (
    <div className="flex flex-col w-full">
      {/* Section 1: Hero Institutionnel Web SaaS */}
      <section className="relative px-4 pt-5 pb-7 bg-white shadow-xs rounded-b-2xl overflow-hidden border-b border-[#eaedff]">
        <div className="absolute -top-12 -right-12 w-48 h-48 bg-[#dce1ff]/30 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute top-24 -left-10 w-40 h-40 bg-[#dbe1ff]/40 rounded-full blur-xl pointer-events-none" />

        <div className="relative flex flex-col gap-3.5 z-10 max-w-4xl mx-auto">
          {/* Badge Institutionnel */}
          <div className="inline-flex items-center gap-2 self-start px-3 py-1 rounded-full bg-[#eaedff] text-[#131b2e]">
            <ShieldCheck className="w-3.5 h-3.5 text-[#0051d5]" />
            <span className="font-['Plus_Jakarta_Sans'] text-xs text-[#00236f] font-semibold tracking-wide">
              Consultation Universitaire In-Browser • Sans installation
            </span>
          </div>

          {/* Titre et introduction institutionnelle */}
          <div className="flex flex-col gap-2">
            <h1 className="font-['Plus_Jakarta_Sans'] text-2xl sm:text-3xl font-extrabold text-[#131b2e] tracking-tight leading-tight">
              Ressources académiques d'excellence pour l'enseignement supérieur.
            </h1>
            <p className="font-['Inter'] text-sm text-[#444651] leading-relaxed max-w-2xl">
              Consultez instantanément les fiches de synthèse, méthodologies juridiques, exercices corrigés et annales universitaires certifiés selon les programmes académiques en vigueur.
            </p>
          </div>

          {/* Moteur de recherche et sélecteur de discipline */}
          <div className="mt-1 flex flex-col gap-2 p-2.5 bg-[#f2f3ff] rounded-xl shadow-xs border border-[#eaedff]">
            <div className="flex items-center bg-white rounded-lg px-3 py-2 shadow-xs border border-[#eaedff]">
              <Search className="w-4 h-4 text-[#0051d5] mr-2 shrink-0" />
              <input
                className="w-full bg-transparent font-['Inter'] text-sm text-[#131b2e] placeholder:text-[#757682] focus:outline-none"
                placeholder="Rechercher par matière, intitulé de cours ou université..."
                type="text"
                value={searchFilter}
                onChange={(e) => setSearchFilter(e.target.value)}
              />
              <button
                onClick={onOpenSearch}
                aria-label="Lancer la recherche"
                className="w-8 h-8 rounded-md bg-[#00236f] hover:bg-[#1e3a8a] flex items-center justify-center text-white shrink-0 transition-colors cursor-pointer"
                type="button"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Disciplines sans aucun emoji */}
            <div className="flex items-center gap-1.5 overflow-x-auto py-1 scrollbar-none">
              {facultyOptions.map((opt) => {
                const isActive = activeFaculty === opt.id;
                return (
                  <button
                    key={opt.id}
                    onClick={() => setActiveFaculty(opt.id)}
                    className={`px-3 py-1.5 rounded-full font-['Plus_Jakarta_Sans'] text-xs whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
                      isActive
                        ? 'bg-[#00236f] text-white font-bold shadow-xs'
                        : 'bg-[#eaedff] text-[#444651] hover:text-[#00236f] hover:bg-[#dbe1ff]'
                    }`}
                    type="button"
                  >
                    {opt.icon}
                    <span>{opt.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Dépôt de ressources académiques */}
          <div className="flex items-center justify-between p-3.5 rounded-xl bg-[#e2e7ff] border border-[#dbe1ff]">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-[#316bf3] flex items-center justify-center text-white shrink-0">
                <Upload className="w-4 h-4" />
              </div>
              <div className="flex flex-col">
                <span className="font-['Plus_Jakarta_Sans'] text-xs sm:text-sm text-[#131b2e] font-bold">
                  Vous disposez de travaux académiques vérifiés ?
                </span>
                <span className="text-[11px] text-[#444651]">
                  Partagez vos synthèses universitaires sous protection DRM.
                </span>
              </div>
            </div>
            <button
              onClick={onNavigatePublish}
              className="px-3.5 py-1.5 rounded-lg bg-[#00236f] hover:bg-[#1e3a8a] text-white font-['Plus_Jakarta_Sans'] text-xs font-bold tracking-wide shadow-xs flex items-center gap-1.5 active:scale-95 transition-all cursor-pointer shrink-0"
            >
              <span>Déposer un document</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Indicateurs réels d'infrastructure */}
          <div className="grid grid-cols-3 gap-2.5 pt-1 text-center">
            <div className="p-2.5 rounded-xl bg-[#f2f3ff] border border-[#eaedff] flex flex-col items-center justify-center">
              <span className="font-['Plus_Jakarta_Sans'] text-base sm:text-lg text-[#00236f] font-bold">
                {documents.length}
              </span>
              <span className="font-['Plus_Jakarta_Sans'] text-[11px] text-[#444651]">
                Ressources indexées
              </span>
            </div>
            <div className="p-2.5 rounded-xl bg-[#f2f3ff] border border-[#eaedff] flex flex-col items-center justify-center">
              <span className="font-['Plus_Jakarta_Sans'] text-base sm:text-lg text-[#0051d5] font-bold">
                CAMES
              </span>
              <span className="font-['Plus_Jakarta_Sans'] text-[11px] text-[#444651]">
                Syllabus de référence
              </span>
            </div>
            <div className="p-2.5 rounded-xl bg-[#f2f3ff] border border-[#eaedff] flex flex-col items-center justify-center">
              <span className="font-['Plus_Jakarta_Sans'] text-base sm:text-lg text-[#00236f] font-bold">
                DRM
              </span>
              <span className="font-['Plus_Jakarta_Sans'] text-[11px] text-[#444651]">
                Protection numérique
              </span>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto w-full px-4">
        {/* Section 2: Typologies de ressources académiques */}
        <section className="mt-8 flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#0051d5]" />
              <h2 className="font-['Plus_Jakarta_Sans'] text-base sm:text-lg font-bold text-[#131b2e]">
                Typologies de Ressources Pédagogiques
              </h2>
            </div>
            <span className="font-['Plus_Jakarta_Sans'] text-xs text-[#757682] font-medium">
              Consultation in-browser
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            {/* Fiches de Synthèse */}
            <button
              onClick={() => setActiveResourceType(activeResourceType === 'fiches' ? null : 'fiches')}
              className={`p-3.5 bg-white hover:bg-[#f2f3ff] rounded-xl shadow-xs border transition-all flex flex-col gap-2 text-left cursor-pointer active:scale-[0.99] ${
                activeResourceType === 'fiches' ? 'border-[#0051d5] ring-2 ring-[#0051d5]/20' : 'border-[#eaedff]'
              }`}
            >
              <div className="w-9 h-9 rounded-lg bg-[#dbe1ff] flex items-center justify-center text-[#00174b]">
                <BookOpen className="w-4 h-4" />
              </div>
              <div className="flex flex-col">
                <span className="font-['Plus_Jakarta_Sans'] text-sm font-bold text-[#131b2e]">
                  Fiches de Synthèse
                </span>
                <span className="font-['Inter'] text-xs text-[#444651]">
                  Résumés exhaustifs et notions clés
                </span>
              </div>
              <div className="mt-auto pt-1 flex items-center text-[#0051d5] font-['Plus_Jakarta_Sans'] text-xs font-semibold gap-1">
                <span>Consulter la sélection</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </button>

            {/* Sujets d'Examens & Annales */}
            <button
              onClick={() => setActiveResourceType(activeResourceType === 'annales' ? null : 'annales')}
              className={`p-3.5 bg-white hover:bg-[#f2f3ff] rounded-xl shadow-xs border transition-all flex flex-col gap-2 text-left cursor-pointer active:scale-[0.99] ${
                activeResourceType === 'annales' ? 'border-[#00236f] ring-2 ring-[#00236f]/20' : 'border-[#eaedff]'
              }`}
            >
              <div className="w-9 h-9 rounded-lg bg-[#dce1ff] flex items-center justify-center text-[#00164e]">
                <FileText className="w-4 h-4" />
              </div>
              <div className="flex flex-col">
                <span className="font-['Plus_Jakarta_Sans'] text-sm font-bold text-[#131b2e]">
                  Annales d'Examens
                </span>
                <span className="font-['Inter'] text-xs text-[#444651]">
                  Épreuves universitaires et barèmes
                </span>
              </div>
              <div className="mt-auto pt-1 flex items-center text-[#00236f] font-['Plus_Jakarta_Sans'] text-xs font-semibold gap-1">
                <span>Consulter la sélection</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </button>

            {/* Travaux Dirigés Corrigés */}
            <button
              onClick={() => setActiveResourceType(activeResourceType === 'td' ? null : 'td')}
              className={`p-3.5 bg-white hover:bg-[#f2f3ff] rounded-xl shadow-xs border transition-all flex flex-col gap-2 text-left cursor-pointer active:scale-[0.99] ${
                activeResourceType === 'td' ? 'border-[#00236f] ring-2 ring-[#00236f]/20' : 'border-[#eaedff]'
              }`}
            >
              <div className="w-9 h-9 rounded-lg bg-[#eaedff] flex items-center justify-center text-[#00236f]">
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <div className="flex flex-col">
                <span className="font-['Plus_Jakarta_Sans'] text-sm font-bold text-[#131b2e]">
                  Travaux Dirigés
                </span>
                <span className="font-['Inter'] text-xs text-[#444651]">
                  Corrigés types et guides méthodologiques
                </span>
              </div>
              <div className="mt-auto pt-1 flex items-center text-[#00236f] font-['Plus_Jakarta_Sans'] text-xs font-semibold gap-1">
                <span>Consulter la sélection</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </button>

            {/* Cas Pratiques & Syllogismes */}
            <button
              onClick={() => setActiveResourceType(activeResourceType === 'cas_pratiques' ? null : 'cas_pratiques')}
              className={`p-3.5 bg-white hover:bg-[#f2f3ff] rounded-xl shadow-xs border transition-all flex flex-col gap-2 text-left cursor-pointer active:scale-[0.99] ${
                activeResourceType === 'cas_pratiques' ? 'border-[#0051d5] ring-2 ring-[#0051d5]/20' : 'border-[#eaedff]'
              }`}
            >
              <div className="w-9 h-9 rounded-lg bg-[#dbe1ff] flex items-center justify-center text-[#0051d5]">
                <Scale className="w-4 h-4" />
              </div>
              <div className="flex flex-col">
                <span className="font-['Plus_Jakarta_Sans'] text-sm font-bold text-[#131b2e]">
                  Cas Pratiques & Méthode
                </span>
                <span className="font-['Inter'] text-xs text-[#444651]">
                  Plans de dissertation et syllogismes
                </span>
              </div>
              <div className="mt-auto pt-1 flex items-center text-[#0051d5] font-['Plus_Jakarta_Sans'] text-xs font-semibold gap-1">
                <span>Consulter la sélection</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </button>
          </div>
        </section>

        {/* Section 3: Catalogue des documents vérifiés */}
        <section className="mt-8 flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-['Plus_Jakarta_Sans'] text-base sm:text-lg font-bold text-[#131b2e]">
                Documents Académiques Disponibles
              </h2>
              <p className="font-['Inter'] text-xs text-[#444651]">
                Ressources vérifiées par les enseignants et majors de promotion
              </p>
            </div>
            <button
              onClick={onOpenSearch}
              className="px-3 py-1 rounded-lg bg-[#eaedff] text-[#00236f] font-['Plus_Jakarta_Sans'] text-xs font-bold flex items-center gap-1 hover:bg-[#dbe1ff] transition-colors cursor-pointer"
            >
              <span>Index complet</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="flex flex-col gap-3">
            {filteredDocs.length === 0 ? (
              <div className="p-8 text-center bg-white rounded-xl border border-[#eaedff]">
                <p className="text-sm font-semibold text-[#131b2e]">Aucune ressource ne correspond aux critères sélectionnés.</p>
                <button
                  onClick={() => {
                    setActiveFaculty('all');
                    setSearchFilter('');
                  }}
                  className="mt-2 text-xs text-[#0051d5] font-bold underline cursor-pointer"
                >
                  Réinitialiser les filtres
                </button>
              </div>
            ) : (
              filteredDocs.map((doc) => (
                <div
                  key={doc.id}
                  className="p-4 bg-white rounded-xl shadow-xs border border-[#eaedff] flex flex-col gap-3 transition-shadow hover:shadow-md"
                >
                  <div className="flex gap-3.5">
                    {/* Thumbnail prévisualisation web sécurisée */}
                    <div 
                      onClick={() => onOpenPreview(doc)}
                      className="relative w-20 h-24 rounded-lg bg-[#eaedff] overflow-hidden shrink-0 cursor-pointer group"
                    >
                      <img
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        alt={doc.altText}
                        src={doc.thumbnailUrl}
                        referrerPolicy="no-referrer"
                      />
                      <span className="absolute top-1 left-1 px-1 rounded bg-[#00236f] text-white font-['Plus_Jakarta_Sans'] text-[9px] uppercase tracking-wider font-bold">
                        {doc.formatTag}
                      </span>
                      <div className="absolute inset-0 bg-[#00236f]/15 backdrop-blur-[0.5px] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <Eye className="w-5 h-5 text-white drop-shadow-md" />
                      </div>
                    </div>

                    {/* Métadonnées Document */}
                    <div className="flex flex-col justify-between flex-grow min-w-0">
                      <div className="flex flex-col">
                        <div className="flex items-center justify-between gap-1">
                          <span className="font-['Plus_Jakarta_Sans'] text-xs text-[#0051d5] font-semibold truncate">
                            {doc.university}
                          </span>
                          <span className="flex items-center text-[#757682] font-['Plus_Jakarta_Sans'] text-xs font-semibold shrink-0">
                            <Star className="w-3.5 h-3.5 text-[#d97706] fill-[#d97706] mr-1" />
                            {doc.rating}
                          </span>
                        </div>

                        <h3 
                          onClick={() => onOpenReader(doc.id)}
                          className="font-['Plus_Jakarta_Sans'] text-sm font-bold text-[#131b2e] line-clamp-2 mt-0.5 hover:text-[#0051d5] cursor-pointer transition-colors"
                        >
                          {doc.title}
                        </h3>

                        <p className="font-['Inter'] text-xs text-[#444651] truncate mt-0.5">
                          {doc.level} • {doc.pagesCount} pages documentées
                        </p>
                      </div>

                      {/* Tarif dynamique fixé par l'auteur */}
                      <div className="flex items-center justify-between pt-1">
                        <div className="flex items-center gap-1.5">
                          <span className="px-2 py-0.5 rounded-md bg-[#eaedff] text-[#00236f] font-['Plus_Jakarta_Sans'] text-xs font-bold">
                            {doc.priceFCFA} FCFA
                          </span>
                          <span className="font-['Plus_Jakarta_Sans'] text-[11px] text-[#757682]">
                            {doc.acceptedPayments}
                          </span>
                        </div>
                        <span className="font-['Plus_Jakarta_Sans'] text-[11px] text-[#757682] truncate max-w-[150px]">
                          Par {doc.author.name}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Actions directes web */}
                  <div className="flex items-center gap-2 pt-1 border-t border-[#f2f3ff]">
                    <button
                      className="flex-1 h-9 rounded-lg bg-[#eaedff] hover:bg-[#dbe1ff] text-[#131b2e] font-['Plus_Jakarta_Sans'] text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                      onClick={() => onOpenPreview(doc)}
                      type="button"
                    >
                      <BookOpen className="w-3.5 h-3.5 text-[#00236f]" />
                      <span>Extrait gratuit</span>
                    </button>
                    <button
                      className="flex-1 h-9 rounded-lg bg-[#0051d5] hover:bg-[#003ea8] text-white font-['Plus_Jakarta_Sans'] text-xs font-bold flex items-center justify-center gap-1.5 shadow-xs active:scale-98 transition-all cursor-pointer"
                      onClick={() => onOpenReader(doc.id)}
                      type="button"
                    >
                      <Lock className="w-3.5 h-3.5" />
                      <span>Consulter la fiche</span>
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>

        {/* Section 4: Avantages techniques de la consultation in-browser */}
        <section className="mt-8">
          <div className="p-5 rounded-2xl bg-[#f2f3ff] border border-[#eaedff] flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <div className="inline-flex items-center gap-1.5 text-[#00236f]">
                <ShieldCheck className="w-4 h-4 text-[#0051d5]" />
                <span className="font-['Plus_Jakarta_Sans'] text-xs uppercase tracking-wider font-bold">
                  Environnement Web Sécurisé
                </span>
              </div>
              <h2 className="font-['Plus_Jakarta_Sans'] text-base sm:text-lg font-bold text-[#131b2e]">
                Spécifications Techniques et Déontologie
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-2.5">
              <div className="flex items-start gap-3 p-3.5 bg-white rounded-xl border border-[#eaedff]">
                <div className="w-10 h-10 rounded-lg bg-[#dbe1ff] flex items-center justify-center text-[#00174b] shrink-0">
                  <HardDrive className="w-5 h-5 text-[#00236f]" />
                </div>
                <div className="flex flex-col">
                  <span className="font-['Plus_Jakarta_Sans'] text-sm font-bold text-[#131b2e]">
                    Absence d'empreinte logicielle locale
                  </span>
                  <p className="font-['Inter'] text-xs text-[#444651] mt-0.5 leading-relaxed">
                    Aucune installation d'application tierce requise. Les contenus s'exécutent au sein du bac à sable standard des navigateurs modernes.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 bg-white rounded-xl border border-[#eaedff]">
                <div className="w-10 h-10 rounded-lg bg-[#eaedff] flex items-center justify-center text-[#00236f] shrink-0">
                  <Zap className="w-5 h-5 text-[#0051d5]" />
                </div>
                <div className="flex flex-col">
                  <span className="font-['Plus_Jakarta_Sans'] text-sm font-bold text-[#131b2e]">
                    Optimisation pour réseaux à bande passante variable
                  </span>
                  <p className="font-['Inter'] text-xs text-[#444651] mt-0.5 leading-relaxed">
                    Compression vectorielle et chargement asynchrone page par page pour garantir la réactivité sur les réseaux 3G et 4G universitaires.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 bg-white rounded-xl border border-[#eaedff]">
                <div className="w-10 h-10 rounded-lg bg-[#dce1ff] flex items-center justify-center text-[#00164e] shrink-0">
                  <ShieldCheck className="w-5 h-5 text-[#00236f]" />
                </div>
                <div className="flex flex-col">
                  <span className="font-['Plus_Jakarta_Sans'] text-sm font-bold text-[#131b2e]">
                    Protection DRM et traçabilité des droits
                  </span>
                  <p className="font-['Inter'] text-xs text-[#444651] mt-0.5 leading-relaxed">
                    Incrustation dynamique d'un filigrane numérique nominatif et horodaté décourageant la captation non autorisée et protégeant la propriété intellectuelle.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 5: Valorisation des travaux académiques */}
        <section className="mt-8">
          <div className="relative overflow-hidden rounded-2xl bg-[#00236f] p-5 sm:p-6 text-white shadow-md border border-[#1e3a8a]">
            <div className="relative flex flex-col gap-3.5 z-10">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0051d5] text-white font-['Plus_Jakarta_Sans'] text-xs font-bold self-start">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Reversement direct de 80% aux auteurs</span>
              </div>

              <div className="flex flex-col gap-1.5">
                <h2 className="font-['Plus_Jakarta_Sans'] text-xl font-bold tracking-tight">
                  Valorisation de la production académique
                </h2>
                <p className="font-['Inter'] text-xs sm:text-sm text-[#dce1ff] leading-relaxed">
                  Publiez vos résumés et fiches de cours après validation par notre comité de lecture académique. Chaque consultation rémunère directement votre travail d'auteur via les opérateurs Mobile Money régionaux.
                </p>
              </div>

              {/* Opérateurs régionaux */}
              <div className="flex flex-wrap items-center gap-2 pt-1">
                {['Wave CI', 'Orange Money', 'MTN MoMo', 'Moov Money'].map((op) => (
                  <div key={op} className="px-3 py-1 rounded-lg bg-white/10 text-white font-['Plus_Jakarta_Sans'] text-xs font-semibold flex items-center gap-1.5 border border-white/15">
                    <Smartphone className="w-3 h-3 text-[#dce1ff]" />
                    <span>{op}</span>
                  </div>
                ))}
              </div>

              <div className="mt-2 flex flex-col gap-2">
                <button
                  onClick={onNavigatePublish}
                  className="w-full h-12 rounded-xl bg-white hover:bg-[#faf8ff] text-[#00236f] font-['Plus_Jakarta_Sans'] text-sm font-bold flex items-center justify-center gap-2 shadow-md transition-all active:scale-98 cursor-pointer"
                  type="button"
                >
                  <Upload className="w-4 h-4 text-[#0051d5]" />
                  <span>Soumettre un document pour évaluation académique</span>
                </button>
                <span className="font-['Inter'] text-[11px] text-center text-[#b6c4ff]">
                  Examen de conformité au programme universitaire sous 24h ouvrées.
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Section 6: Retours d'expérience académiques */}
        <section className="mt-8 mb-4 flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <h2 className="font-['Plus_Jakarta_Sans'] text-base sm:text-lg font-bold text-[#131b2e]">
                Évaluations des utilisateurs
              </h2>
              <p className="font-['Inter'] text-xs text-[#444651]">
                Retours d'expérience vérifiés d'étudiants et d'enseignants
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-4 rounded-xl bg-white border border-[#eaedff] shadow-xs flex flex-col justify-between gap-3">
              <p className="font-['Inter'] text-xs text-[#131b2e] leading-relaxed">
                "La rigueur méthodologique des corrigés de travaux dirigés de droit civil constitue un support de révision particulièrement pertinent pour les examens terminaux."
              </p>
              <div className="flex items-center gap-2.5 pt-2 border-t border-[#f2f3ff]">
                <div className="w-8 h-8 rounded-full bg-[#dbe1ff] flex items-center justify-center text-[#00174b] font-bold font-['Plus_Jakarta_Sans'] text-xs shrink-0">
                  YD
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="font-['Plus_Jakarta_Sans'] text-xs font-bold text-[#131b2e] truncate">
                    Yves Didier K.
                  </span>
                  <span className="font-['Inter'] text-[11px] text-[#757682] truncate">
                    Étudiant en Licence 3 • UFHB Abidjan
                  </span>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-white border border-[#eaedff] shadow-xs flex flex-col justify-between gap-3">
              <p className="font-['Inter'] text-xs text-[#131b2e] leading-relaxed">
                "La publication des synthèses d'économie monétaire permet de valoriser un travail d'écriture rigoureux tout en recevant directement les rétributions convenues."
              </p>
              <div className="flex items-center gap-2.5 pt-2 border-t border-[#f2f3ff]">
                <div className="w-8 h-8 rounded-full bg-[#dce1ff] flex items-center justify-center text-[#00164e] font-bold font-['Plus_Jakarta_Sans'] text-xs shrink-0">
                  FS
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="font-['Plus_Jakarta_Sans'] text-xs font-bold text-[#131b2e] truncate">
                    Fatou Sène
                  </span>
                  <span className="font-['Inter'] text-[11px] text-[#757682] truncate">
                    Master en Sciences Économiques • UCAD Dakar
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
