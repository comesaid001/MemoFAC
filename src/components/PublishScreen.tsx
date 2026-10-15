import React, { useState } from 'react';
import { 
  Upload, 
  CheckCircle2, 
  Calculator, 
  Smartphone, 
  ArrowLeft, 
  FileText, 
  ShieldCheck 
} from 'lucide-react';
import { FacultyType, MobileMoneyOperator } from '../types';

interface PublishScreenProps {
  onDocumentPublished: (newDocData: any) => void;
  onNavigateHome: () => void;
}

export const PublishScreen: React.FC<PublishScreenProps> = ({
  onDocumentPublished,
  onNavigateHome,
}) => {
  const [title, setTitle] = useState('');
  const [faculty, setFaculty] = useState<FacultyType>('droit');
  const [university, setUniversity] = useState('Université Félix Houphouët-Boigny (Abidjan)');
  const [level, setLevel] = useState('Licence 2');
  const [price, setPrice] = useState(800);
  const [pagesCount, setPagesCount] = useState(15);
  const [synopsis, setSynopsis] = useState('');
  const [momoProvider, setMomoProvider] = useState<MobileMoneyOperator>('wave');
  const [momoPhone, setMomoPhone] = useState('07 48 92 11 89');
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const earningsPerSale = Math.round(price * 0.8);

  const handleFileDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setUploadedFileName(e.dataTransfer.files[0].name);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploadedFileName(e.target.files[0].name);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      alert('Veuillez renseigner le titre du document.');
      return;
    }

    const facultyLabels: Record<FacultyType, string> = {
      all: 'Général',
      droit: 'Droit & Sciences Politiques',
      economie: 'Économie & Gestion',
      medecine: 'Médecine & Pharmacie',
      sciences: 'Sciences Exactes & STIC',
      lettres: 'Lettres & Sciences Humaines',
    };

    const newDoc = {
      id: `doc-${Date.now()}`,
      slug: title.toLowerCase().replace(/[^a-z0-9]/g, '-'),
      title,
      faculty,
      facultyLabel: facultyLabels[faculty],
      university,
      ufr: 'UFR de rattachement',
      level: `${level} • Fiche certifiée`,
      pagesCount,
      formatTag: 'Document certifié',
      rating: 5.0,
      ratingCount: 1,
      priceFCFA: price,
      author: {
        name: 'Kouassi Jean-Eudes',
        role: `Auteur certifié • ${university}`,
        avatarInitials: 'KJ',
        verified: true,
        publishedCount: 1,
      },
      thumbnailUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBYvZtMccYwNZE4zwRrQEn6NSxZUdMTxikreraU5W_sSrfRmMx6sTks6LuBGBV7mU5a2f5k-xgA8n6wGOfu8OsmkJ0xlzI5Dkhl7yw1H_7DGeOjVo4o1XDWssot01OyA_fMhqoPL4XJLLv5eE-m5gwfLpBZnsweJfj_4njMv71Fk5pDrEJGfiHstYsqXXNcFyLfV4tlX9e4xEZpibXfWmFARqWB5lgRNacEC5YZVbv1-n8lyKP6icI9',
      altText: 'Document académique déposé',
      acceptedPayments: momoProvider === 'wave' ? 'Wave CI' : 'Orange Money',
      synopsis: synopsis || 'Document de synthèse conforme aux exigences du syllabus universitaire.',
      whatsappShareText: `Ressource universitaire déposée sur MemoFAC : ${title}`,
      pages: [
        {
          pageNumber: 1,
          chapterTitle: title.toUpperCase(),
          subTitle: 'Synthèse du syllabus et méthodologie',
          content: synopsis || 'Contenu structuré avec définitions conceptuelles, jurisprudence et méthode de résolution universitaire.',
          bulletPoints: [
            'Principes généraux et fondements doctrinaux.',
            'Exceptions applicables selon le corpus normatif en vigueur.',
            'Applications pratiques et jurisprudence de référence.',
          ],
        },
      ],
      reviews: [],
    };

    onDocumentPublished(newDoc);
    setIsSuccess(true);
  };

  return (
    <div className="max-w-3xl mx-auto w-full px-4 py-6">
      {/* En-tête institutionnel */}
      <div className="flex items-center justify-between pb-4 border-b border-[#eaedff]">
        <div>
          <button
            onClick={onNavigateHome}
            className="text-xs text-[#0051d5] font-semibold flex items-center gap-1 hover:underline cursor-pointer mb-1"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Retour au catalogue</span>
          </button>
          <h1 className="font-['Plus_Jakarta_Sans'] text-xl sm:text-2xl font-bold text-[#00236f]">
            Dépôt d'une Ressource Académique
          </h1>
          <p className="font-['Inter'] text-xs text-[#444651]">
            Soumettez vos résumés et fiches de travaux dirigés au comité d'évaluation universitaire.
          </p>
        </div>

        <div className="w-10 h-10 rounded-xl bg-[#dbe1ff] flex items-center justify-center text-[#00174b]">
          <Upload className="w-5 h-5 text-[#00236f]" />
        </div>
      </div>

      {isSuccess ? (
        <div className="mt-8 p-6 rounded-2xl bg-white border border-[#b4c5ff] shadow-lg text-center flex flex-col items-center gap-4 animate-in zoom-in-95">
          <div className="w-16 h-16 rounded-full bg-[#dbe1ff] flex items-center justify-center text-[#00236f]">
            <CheckCircle2 className="w-8 h-8 text-[#0051d5]" />
          </div>
          <div className="flex flex-col gap-1.5">
            <h2 className="font-['Plus_Jakarta_Sans'] text-xl font-bold text-[#00236f]">
              Document transmis pour modération académique
            </h2>
            <p className="font-['Inter'] text-xs sm:text-sm text-[#444651] max-w-md leading-relaxed">
              Votre ressource est actuellement examinée par le comité pédagogique. Dès validation de conformité (sous 24 heures ouvrées), elle sera mise en ligne avec filigrane DRM et vos rétributions seront créditées sur le compte Mobile Money (+225 {momoPhone}).
            </p>
          </div>
          <button
            onClick={onNavigateHome}
            className="px-6 py-2.5 rounded-xl bg-[#00236f] text-white font-['Plus_Jakarta_Sans'] text-xs font-bold hover:bg-[#1e3a8a] cursor-pointer"
          >
            Consulter les documents en ligne
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-5">
          {/* Zone de téléversement sécurisée */}
          <div
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleFileDrop}
            className="p-6 border-2 border-dashed border-[#b4c5ff] rounded-2xl bg-[#f2f3ff] hover:bg-[#e2e7ff] transition-colors flex flex-col items-center justify-center text-center gap-2 cursor-pointer relative"
          >
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={handleFileInput}
              className="absolute inset-0 opacity-0 cursor-pointer"
            />
            <div className="w-12 h-12 rounded-full bg-white shadow-xs flex items-center justify-center text-[#0051d5]">
              <Upload className="w-6 h-6 text-[#00236f]" />
            </div>
            <div className="flex flex-col">
              <span className="font-['Plus_Jakarta_Sans'] text-sm font-bold text-[#131b2e]">
                {uploadedFileName ? `Fichier sélectionné : ${uploadedFileName}` : 'Sélectionnez ou glissez-déposez le document (PDF, Word)'}
              </span>
              <span className="text-xs text-[#757682]">
                Traitement automatique du document et configuration de la protection DRM.
              </span>
            </div>
          </div>

          {/* Formulaire descriptif */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1 sm:col-span-2">
              <label className="font-['Plus_Jakarta_Sans'] text-xs font-bold text-[#131b2e]">
                Intitulé officiel du document *
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Exemple : Droit Administratif des Biens, Économétrie Appliquée..."
                className="h-11 px-3.5 rounded-xl bg-white border border-[#eaedff] text-xs font-medium focus:ring-2 focus:ring-[#0051d5] focus:outline-none"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="font-['Plus_Jakarta_Sans'] text-xs font-bold text-[#131b2e]">
                Discipline universitaire
              </label>
              <select
                value={faculty}
                onChange={(e) => setFaculty(e.target.value as FacultyType)}
                className="h-11 px-3 rounded-xl bg-white border border-[#eaedff] text-xs font-medium focus:ring-2 focus:ring-[#0051d5] focus:outline-none"
              >
                <option value="droit">Droit & Sciences Politiques</option>
                <option value="economie">Économie & Gestion</option>
                <option value="medecine">Médecine & Pharmacie</option>
                <option value="sciences">Sciences Exactes & STIC</option>
              </select>
            </div>

            <div className="flex flex-col gap-1">
              <label className="font-['Plus_Jakarta_Sans'] text-xs font-bold text-[#131b2e]">
                Niveau d'études académique
              </label>
              <select
                value={level}
                onChange={(e) => setLevel(e.target.value)}
                className="h-11 px-3 rounded-xl bg-white border border-[#eaedff] text-xs font-medium focus:ring-2 focus:ring-[#0051d5] focus:outline-none"
              >
                <option value="Licence 1">Licence 1 (L1)</option>
                <option value="Licence 2">Licence 2 (L2)</option>
                <option value="Licence 3">Licence 3 (L3)</option>
                <option value="Master 1">Master 1 (M1)</option>
                <option value="Master 2">Master 2 (M2)</option>
                <option value="Classes Préparatoires">Classes Préparatoires / Doctorat</option>
              </select>
            </div>

            <div className="flex flex-col gap-1 sm:col-span-2">
              <label className="font-['Plus_Jakarta_Sans'] text-xs font-bold text-[#131b2e]">
                Établissement universitaire de rattachement
              </label>
              <input
                type="text"
                value={university}
                onChange={(e) => setUniversity(e.target.value)}
                placeholder="Exemple : Université Félix Houphouët-Boigny"
                className="h-11 px-3.5 rounded-xl bg-white border border-[#eaedff] text-xs font-medium focus:ring-2 focus:ring-[#0051d5] focus:outline-none"
              />
            </div>

            <div className="flex flex-col gap-1 sm:col-span-2">
              <label className="font-['Plus_Jakarta_Sans'] text-xs font-bold text-[#131b2e]">
                Résumé analytique du contenu
              </label>
              <textarea
                rows={3}
                value={synopsis}
                onChange={(e) => setSynopsis(e.target.value)}
                placeholder="Précisez le plan d'études, les notions abordées et les références bibliographiques..."
                className="p-3 rounded-xl bg-white border border-[#eaedff] text-xs font-medium focus:ring-2 focus:ring-[#0051d5] focus:outline-none"
              />
            </div>
          </div>

          {/* Simulateur de rétribution 80% */}
          <div className="p-4 rounded-2xl bg-[#f2f3ff] border border-[#eaedff] flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Calculator className="w-4 h-4 text-[#0051d5]" />
                <span className="font-['Plus_Jakarta_Sans'] text-xs sm:text-sm font-bold text-[#00236f]">
                  Barème de Rétribution de l'Auteur (80% net)
                </span>
              </div>
              <span className="px-2 py-0.5 rounded-md bg-[#eaedff] text-[#00236f] font-['Plus_Jakarta_Sans'] text-[10px] font-bold">
                Reversement direct
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 items-center">
              <div className="flex flex-col gap-1">
                <label className="font-['Plus_Jakarta_Sans'] text-xs font-bold text-[#131b2e]">
                  Tarif fixé pour la ressource (FCFA)
                </label>
                <div className="flex items-center bg-white rounded-xl px-3 border border-[#eaedff] h-11">
                  <input
                    type="number"
                    min={200}
                    max={10000}
                    step={50}
                    value={price}
                    onChange={(e) => setPrice(Number(e.target.value))}
                    className="w-full bg-transparent font-['Plus_Jakarta_Sans'] text-base font-bold text-[#00236f] focus:outline-none"
                  />
                  <span className="text-xs font-bold text-[#757682]">FCFA</span>
                </div>
              </div>

              <div className="p-3 bg-white rounded-xl border border-[#eaedff] flex flex-col justify-center">
                <span className="text-[11px] text-[#757682]">Rétribution nette par consultation autorisée :</span>
                <div className="flex items-baseline gap-1">
                  <span className="font-['Plus_Jakarta_Sans'] text-2xl font-bold text-[#0051d5]">
                    {earningsPerSale}
                  </span>
                  <span className="font-['Plus_Jakarta_Sans'] text-xs font-bold text-[#00236f]">
                    FCFA (80%)
                  </span>
                </div>
                <span className="text-[11px] text-[#444651]">
                  Frais de passerelle bancaire et de serveur de 20% inclus.
                </span>
              </div>
            </div>

            {/* Opérateur de versement */}
            <div className="pt-2 border-t border-[#eaedff] flex flex-col gap-2">
              <label className="font-['Plus_Jakarta_Sans'] text-xs font-bold text-[#131b2e]">
                Opérateur Mobile Money pour le versement des droits
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { id: 'wave', label: 'Wave CI' },
                  { id: 'orange', label: 'Orange Money' },
                  { id: 'mtn', label: 'MTN MoMo' },
                  { id: 'moov', label: 'Moov Money' },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setMomoProvider(item.id as MobileMoneyOperator)}
                    className={`h-9 px-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      momoProvider === item.id
                        ? 'bg-[#00236f] text-white shadow-xs'
                        : 'bg-white text-[#444651] border border-[#eaedff] hover:bg-[#faf8ff]'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>

              <div className="flex items-center rounded-xl bg-white border border-[#eaedff] px-3 h-11 mt-1">
                <span className="font-['Plus_Jakarta_Sans'] text-xs font-bold text-[#00236f] mr-2">
                  +225
                </span>
                <input
                  type="tel"
                  value={momoPhone}
                  onChange={(e) => setMomoPhone(e.target.value)}
                  placeholder="07 00 00 00 00"
                  className="w-full bg-transparent font-['Plus_Jakarta_Sans'] text-xs font-semibold focus:outline-none"
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="w-full h-12 rounded-xl bg-[#00236f] hover:bg-[#1e3a8a] text-white font-['Plus_Jakarta_Sans'] text-sm font-bold flex items-center justify-center gap-2 shadow-md active:scale-98 transition-all cursor-pointer"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Valider et soumettre pour révision académique</span>
          </button>
        </form>
      )}
    </div>
  );
};
