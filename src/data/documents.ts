import { AcademicDocument } from '../types';

export const INITIAL_DOCUMENTS: AcademicDocument[] = [
  {
    id: 'droit-obligations-l2',
    slug: 'droit-obligations-l2',
    title: 'Droit des Obligations : Régime général & Théorie du Contrat',
    faculty: 'droit',
    facultyLabel: 'Droit & Sciences Politiques',
    university: 'Université Félix Houphouët-Boigny (UFHB Abidjan)',
    ufr: 'UFR Sciences Juridiques, Administratives et Politiques',
    level: 'Licence 2 • Droit Privé',
    pagesCount: 18,
    formatTag: 'Fiche de cours certifiée',
    rating: 4.9,
    ratingCount: 3,
    priceFCFA: 500,
    author: {
      name: 'Dr. Koffi D. Assoumou',
      role: 'Maître-Assistant • Département de Droit Privé',
      avatarInitials: 'KA',
      verified: true,
      publishedCount: 4
    },
    thumbnailUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBYvZtMccYwNZE4zwRrQEn6NSxZUdMTxikreraU5W_sSrfRmMx6sTks6LuBGBV7mU5a2f5k-xgA8n6wGOfu8OsmkJ0xlzI5Dkhl7yw1H_7DGeOjVo4o1XDWssot01OyA_fMhqoPL4XJLLv5eE-m5gwfLpBZnsweJfj_4njMv71Fk5pDrEJGfiHstYsqXXNcFyLfV4tlX9e4xEZpibXfWmFARqWB5lgRNacEC5YZVbv1-n8lyKP6icI9',
    altText: "Page de garde universitaire d'un cours de Droit Civil Ivoirien avec en-tête académique moderne bleu nuit et sceau de vérification sur papier texturé clair sous une lumière douce de bibliothèque.",
    acceptedPayments: 'Wave / Orange Money',
    synopsis: "Synthèse intégrale structurée selon le programme officiel de Licence 2 Droit (UFHB & Universités Francophones de l'espace CAMES). Intègre la jurisprudence de la Cour de Cassation ivoirienne et de la CCJA de l'OHADA.",
    whatsappShareText: "Document académique : Droit des Obligations L2 sur MemoFAC - https://memofac.ci/fiche/droit-obligations-l2",
    pages: [
      {
        pageNumber: 1,
        chapterTitle: 'CHAPITRE I : LA FORMATION DU CONTRAT ET LE CONSENTEMENT',
        subTitle: 'Semestre 3 • Droit Civil Privé • Conforme au programme universitaire',
        content: "Le contrat est une convention par laquelle une ou plusieurs personnes s'obligent, envers une ou plusieurs autres, à donner, à faire ou à ne pas faire quelque chose. En vertu des principes généraux régissant l'espace OHADA et le Code Civil en vigueur, la validité de toute convention dépend de quatre conditions juridiques fondamentales :",
        bulletPoints: [
          "Le consentement éclairé et intègre de la partie qui s'oblige (absence d'erreur, de dol ou de violence).",
          "La capacité juridique de contracter des parties prenantes (capacité d'exercice et de jouissance).",
          "Un objet certain et déterminé qui forme la matière de l'engagement.",
          "Une cause licite dans l'obligation (conformité à l'ordre public et aux bonnes mœurs)."
        ],
        legalQuote: "Section 1.1 — La rencontre des volontés : offre formelle et acceptation univoque en jurisprudence comparée (Cour Commune de Justice et d'Arbitrage, Arrêt N° 042/2018).",
        keyNote: "Document académique vérifié • Consultation sécurisée in-browser"
      },
      {
        pageNumber: 2,
        chapterTitle: 'SECTION II : LES VICES DU CONSENTEMENT ET LE RÉGIME DES NULLITÉS',
        subTitle: "Erreur, Dol, Violence et Lésion selon l'Acte Uniforme et le droit commun",
        content: "Les vices du consentement entraînent une nullité relative dont seul le contractant protégé peut se prévaloir dans les délais légaux de prescription. L'analyse doctrinale distingue la nature de l'atteinte portée à l'intégrité de la volonté :",
        bulletPoints: [
          "L'Erreur obstacle et l'erreur portant sur la substance essentielle de la prestation convenue.",
          "Le Dol : manœuvres frauduleuses, affirmations mensongères et réticence dolosive déterminante.",
          "La Violence : contrainte matérielle ou morale illégitime inspirant la crainte d'un préjudice considérable.",
          "La Nullité relative (protection d'un intérêt particulier) et la Nullité absolue (atteinte à l'ordre public de direction)."
        ],
        tableData: {
          headers: ['Vice du consentement', 'Condition juridique requise', 'Sanction civile', 'Délai de prescription'],
          rows: [
            ['Erreur sur la substance', 'Caractère déterminant et excusable', 'Nullité relative', '5 ans'],
            ['Réticence dolosive', 'Intention délibérée de dissimulation', 'Nullité relative et dommages-intérêts', '5 ans'],
            ['Violence morale ou physique', 'Gravité de la menace démontrée', 'Nullité relative', '5 ans'],
            ['Illicéité de l\'objet', 'Contraire aux dispositions d\'ordre public', 'Nullité absolue', '30 ans']
          ]
        },
        legalQuote: "Tribunal de Première Instance d'Abidjan : La réticence dolosive vicie le consentement dès lors que l'information dissimulée aurait conduit le cocontractant à ne pas contracter.",
        keyNote: "Document académique vérifié • Protection DRM active"
      },
      {
        pageNumber: 3,
        chapterTitle: "CHAPITRE II : L'EXÉCUTION DU CONTRAT ET LA FORCE MAJEURE",
        subTitle: 'Effets obligatoires entre les parties contractantes et opposabilité aux tiers',
        content: "Les conventions légalement formées tiennent lieu de loi à ceux qui les ont faites. Elles ne peuvent être révoquées que de leur consentement mutuel ou pour les causes prévues par la loi, et doivent être exécutées de bonne foi.",
        bulletPoints: [
          "Principe de l'effet relatif des contrats et exceptions admises (stipulation pour autrui, représentation).",
          "L'exception d'inexécution : conditions préalables et exigence de simultanéité des obligations.",
          "La qualification de la Force Majeure : imprévisibilité, irrésistibilité et extériorité constatées.",
          "La résolution judiciaire et l'application des clauses résolutoires expresses."
        ],
        keyNote: "Document académique vérifié • Protection DRM active"
      },
      {
        pageNumber: 4,
        chapterTitle: 'CHAPITRE III : LA RESPONSABILITÉ CIVILE DÉLICTUELLE',
        subTitle: 'Régime général de la faute, du dommage et de la causalité',
        content: "Tout fait de l'homme, qui cause à autrui un dommage, oblige celui par la faute duquel il est arrivé à le réparer. La mise en œuvre de la responsabilité délictuelle exige la démonstration rigoureuse d'un fait générateur, d'un préjudice certain et direct, et d'un lien de causalité direct.",
        bulletPoints: [
          "Caractères du préjudice indemnisable : certain, personnel, légitime et direct (matériel, corporel ou moral).",
          "Éléments constitutifs de la faute : composante matérielle et composante d'illicéité.",
          "Régime de responsabilité du fait des choses inanimées : notion de garde et de contrôle.",
          "Régime de responsabilité des commettants du fait de leurs préposés dans l'exercice de leurs missions."
        ],
        keyNote: "Document académique vérifié • Protection DRM active"
      }
    ],
    reviews: [
      {
        id: 'rev-1',
        authorName: 'Amadou B.',
        authorInitials: 'AB',
        studyLevel: 'Licence 2 Droit • UFHB',
        rating: 5,
        date: 'Octobre 2026',
        comment: "« La structuration sur la responsabilité contractuelle et les quasi-contrats apporte une clarification méthodologique rigoureuse. Tableaux de synthèse clairs et exhaustifs. »"
      },
      {
        id: 'rev-2',
        authorName: 'Esther Touré',
        authorInitials: 'ET',
        studyLevel: 'Licence 2 Droit • UFHB',
        rating: 4.8,
        date: 'Octobre 2026',
        comment: "« Règlement validé immédiatement par Mobile Money. La consultation web in-browser est fluide et adaptée aux postes de travail universitaires. »"
      }
    ]
  },
  {
    id: 'microeconomie-2-ucad',
    slug: 'microeconomie-2-ucad',
    title: 'Microéconomie II : Concurrence Parfaite et Monopoles',
    faculty: 'economie',
    facultyLabel: 'Économie & Gestion',
    university: 'Université Cheikh Anta Diop (UCAD Dakar)',
    ufr: 'Faculté des Sciences Économiques et de Gestion (FASEG)',
    level: 'Licence 1 • Économie-Gestion',
    pagesCount: 14,
    formatTag: 'Fiche méthodologique',
    rating: 5.0,
    ratingCount: 2,
    priceFCFA: 600,
    author: {
      name: 'Aminata Diallo',
      role: 'Diplômée FASEG • Major de promotion',
      avatarInitials: 'AD',
      verified: true,
      publishedCount: 2
    },
    thumbnailUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB4jaGBCMPHgdWmDuotq4t0lQADAxVBX9IvKeq83nq2Y2rncZQ8edcJu3YIiuhIV4799p-CcqU00WNsC12_TtBNQGFxJh9P4dwuDpjlQMMrvNKRDOy-sWRIF2Lh5PXrZPm3j7IR90I0EtNgaB4wjMfRSO78iH0_bnM-fPXiDEHEqsxDarnO9ot9DnVMCGpJiIVvA-Zm3tHZ_zxR53gf2eujdR3InkTS5Mt_AHnk9BxIJm8YGYKDat-n',
    altText: "Graphiques économiques soignés et calculs de microéconomie sur tablette numérique d'étudiant africain avec graphiques d'élasticité et schémas d'équilibre des marchés.",
    acceptedPayments: 'Wave / Orange Money',
    synopsis: "Synthèse des modèles d'équilibre partiel de Cournot, Bertrand et Stackelberg, calculs du surplus du consommateur et analyse des pertes sèches de monopole selon les standards académiques universitaires.",
    whatsappShareText: "Document académique : Microéconomie II (UCAD) sur MemoFAC - https://memofac.ci/fiche/microeconomie-2-ucad",
    pages: [
      {
        pageNumber: 1,
        chapterTitle: 'MODULE 1 : LE MODÈLE DE CONCURRENCE PURE ET PARFAITE (CPP)',
        subTitle: 'Équilibre de court terme et de long terme de la firme représentative',
        content: "En régime de concurrence pure et parfaite, les hypothèses d'atomicité, d'homogénéité des produits, de fluidité du marché et de transparence de l'information imposent à la firme un comportement de preneuse de prix. La recette marginale est rigoureusement égale au prix unitaire de marché déterminé par l'équilibre global.",
        bulletPoints: [
          "Condition nécessaire de maximisation du profit : égalité entre recette marginale et coût marginal (Rm = Cm = P).",
          "Condition suffisante : dérivée seconde du coût total strictement positive (phase de rendements décroissants).",
          "Seuil de fermeture : égalité entre le prix et le minimum du coût variable moyen à court terme.",
          "Seuil de rentabilité : égalité entre le prix et le minimum du coût total moyen à long terme."
        ],
        legalQuote: "Définition analytique : Le profit économique s'annule à long terme par l'ajustement du nombre de firmes sur le marché concurrentiel.",
        keyNote: "Document académique vérifié • Consultation sécurisée in-browser"
      }
    ],
    reviews: [
      {
        id: 'rev-micro-1',
        authorName: 'Cheikh Ndiaye',
        authorInitials: 'CN',
        studyLevel: 'Licence 1 Économie • UCAD',
        rating: 5,
        date: 'Octobre 2026',
        comment: "« Démonstrations rigoureuses et conformes aux épreuves de travaux dirigés de la FASEG. Résolution pas à pas des exercices d'équilibre. »"
      }
    ]
  },
  {
    id: 'biochimie-metabolique-una',
    slug: 'biochimie-metabolique-una',
    title: 'Biochimie Métabolique : Cycle de Krebs & Glycolyse',
    faculty: 'medecine',
    facultyLabel: 'Médecine & Pharmacie',
    university: 'Université Nangui Abrogoua (UNA)',
    ufr: 'UFR Sciences de la Nature et de la Santé',
    level: 'PCEM1 • Études Médicales et Pharmaceutiques',
    pagesCount: 22,
    formatTag: 'Manuel de révision',
    rating: 4.8,
    ratingCount: 2,
    priceFCFA: 1200,
    author: {
      name: 'Dr. Konan Kouakou',
      role: 'Interne en Médecine • Enseignant-Tuteur',
      avatarInitials: 'KK',
      verified: true,
      publishedCount: 3
    },
    thumbnailUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBkD8NvLqWz86aOoKJ2iWweeD3XeTD4-SAes0uwJE98meyKBpy_5uMu53wymTcLgADsq9mTqaX9bYuFqCq06JitSqoUaTF3OvGaVeDO8ZIH8cWTyR7W1x8YznFZFxbX9-8ZCodd5EC3XKGOJx6wuihRQgcWv9b1_eW3DeqfkWUYg0Hc5-S4KH57HL89TMHe8dLPXAvReMlNVLcA-O1FCcshHZtAY3x1mM87O4v8hAYLWEn6PBwDGWEY',
    altText: "Schémas anatomiques médicaux clairs et fiches de pharmacologie rédigées à la main avec repères de couleurs vives pour étudiants en première et deuxième année de santé.",
    acceptedPayments: 'MTN MoMo / Wave',
    synopsis: "Fiches synthétiques des dix étapes enzymatiques de la glycolyse cytosolique, mécanismes de régulation allostérique de la phosphofructokinase-1 (PFK-1), bilan stœchiométrique et cycle de l'acide citrique.",
    whatsappShareText: "Manuel de révision : Biochimie Métabolique sur MemoFAC - https://memofac.ci/fiche/biochimie-metabolique-una",
    pages: [
      {
        pageNumber: 1,
        chapterTitle: 'VOIE DE LA GLYCOLYSE CYTOSOLIQUE (VOIE D’EMBDEN-MEYERHOF)',
        subTitle: 'Phase d’investissement énergétique et phase de restitution d’ATP',
        content: "La glycolyse est la voie métabolique universelle de catabolisme du glucose en pyruvate, générant du pouvoir réducteur sous forme de coenzymes réduits (NADH,H+) et de l'énergie libre sous forme d'adénosine triphosphate (ATP). Ce processus s'effectue intégralement au sein du cytosol cellulaire.",
        bulletPoints: [
          "Étape 1 : Phosphorylation du glucose en Glucose-6-Phosphate par l'Hexokinase.",
          "Étape 3 : Étape limitante et irréversible — Phosphorylation du F-6-P en F-1,6-biP par la PFK-1.",
          "Régulation allostérique positive de la PFK-1 : concentrations élevées d'AMP et de Fructose-2,6-bisphosphate.",
          "Régulation allostérique négative : concentrations élevées d'ATP cellulaire et de citrate mitochondrial.",
          "Bilan stœchiométrique net en aérobiose : 1 Glucose aboutit à 2 Pyruvates, 2 ATP et 2 NADH,H+."
        ],
        keyNote: "Document académique vérifié • Consultation sécurisée in-browser"
      }
    ],
    reviews: [
      {
        id: 'rev-med-1',
        authorName: 'Aïcha Koné',
        authorInitials: 'AK',
        studyLevel: 'PCEM1 • UNA',
        rating: 4.8,
        date: 'Septembre 2026',
        comment: "« Les fiches enzymatiques et les bilans métaboliques sont rigoureusement alignés sur le syllabus de première année de santé. »"
      }
    ]
  },
  {
    id: 'droit-constitutionnel-l1',
    slug: 'droit-constitutionnel-l1',
    title: 'Droit Constitutionnel & Régimes Politiques Comparés',
    faculty: 'droit',
    facultyLabel: 'Droit & Sciences Politiques',
    university: 'Université Thomas Sankara (UTS Ouagadougou)',
    ufr: 'UFR Sciences Juridiques et Politiques',
    level: 'Licence 1 • Droit Public',
    pagesCount: 16,
    formatTag: 'Fiche de synthèse',
    rating: 4.9,
    ratingCount: 1,
    priceFCFA: 650,
    author: {
      name: 'Pr. Souleymane Ouédraogo',
      role: 'Enseignant-Chercheur en Droit Public',
      avatarInitials: 'SO',
      verified: true,
      publishedCount: 2
    },
    thumbnailUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBYvZtMccYwNZE4zwRrQEn6NSxZUdMTxikreraU5W_sSrfRmMx6sTks6LuBGBV7mU5a2f5k-xgA8n6wGOfu8OsmkJ0xlzI5Dkhl7yw1H_7DGeOjVo4o1XDWssot01OyA_fMhqoPL4XJLLv5eE-m5gwfLpBZnsweJfj_4njMv71Fk5pDrEJGfiHstYsqXXNcFyLfV4tlX9e4xEZpibXfWmFARqWB5lgRNacEC5YZVbv1-n8lyKP6icI9',
    altText: "Fiche de révision reliée de droit public africain avec schémas de séparation des pouvoirs.",
    acceptedPayments: 'Orange Money / Wave',
    synopsis: "Analyse comparée des régimes présidentiels, parlementaires et semi-présidentiels, principes fondamentaux de l'État de droit et contrôle de constitutionnalité en Afrique francophone.",
    whatsappShareText: "Document académique : Droit Constitutionnel L1 sur MemoFAC - https://memofac.ci/fiche/droit-constitutionnel-l1",
    pages: [
      {
        pageNumber: 1,
        chapterTitle: "THÉORIE GÉNÉRALE DE L'ÉTAT ET SÉPARATION DES POUVOIRS",
        subTitle: 'Fondements doctrinaux et applications institutionnelles contemporaines',
        content: "L'État est une collectivité humaine établie de façon permanente sur un territoire déterminé et soumise à une autorité politique souveraine. Les trois éléments constitutifs juridiquement indispensables sont la population, le territoire délimité et la puissance publique souveraine.",
        bulletPoints: [
          "Le pouvoir législatif : délibération et adoption de la norme légale, contrôle de l'action exécutive.",
          "Le pouvoir exécutif : mise en œuvre des lois et direction de l'appareil administratif.",
          "Le pouvoir juridictionnel : garantie de la hiérarchie des normes et impartialité du règlement des litiges."
        ],
        keyNote: "Document académique vérifié • Protection DRM active"
      }
    ],
    reviews: []
  },
  {
    id: 'algebre-lineaire-stic',
    slug: 'algebre-lineaire-stic',
    title: 'Algèbre Linéaire & Espaces Vectoriels : Méthodes et Démonstrations',
    faculty: 'sciences',
    facultyLabel: 'Sciences & STIC',
    university: 'INP-HB Yamoussoukro',
    ufr: 'Département de Mathématiques et Informatique',
    level: 'Classes Préparatoires / Licence 1',
    pagesCount: 20,
    formatTag: 'Travaux dirigés corrigés',
    rating: 5.0,
    ratingCount: 1,
    priceFCFA: 800,
    author: {
      name: 'Yao N\'Guessan',
      role: 'Ingénieur polytechnicien • Enseignant-Assistant',
      avatarInitials: 'YN',
      verified: true,
      publishedCount: 1
    },
    thumbnailUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB4jaGBCMPHgdWmDuotq4t0lQADAxVBX9IvKeq83nq2Y2rncZQ8edcJu3YIiuhIV4799p-CcqU00WNsC12_TtBNQGFxJh9P4dwuDpjlQMMrvNKRDOy-sWRIF2Lh5PXrZPm3j7IR90I0EtNgaB4wjMfRSO78iH0_bnM-fPXiDEHEqsxDarnO9ot9DnVMCGpJiIVvA-Zm3tHZ_zxR53gf2eujdR3InkTS5Mt_AHnk9BxIJm8YGYKDat-n',
    altText: "Démonstrations mathématiques matricielles écrites avec soin pour classes préparatoires scientifiques.",
    acceptedPayments: 'Wave / MTN MoMo',
    synopsis: "Déterminants, réduction d'endomorphismes, diagonalisation, polynômes caractéristiques et méthode de Jordan. Intègre des résolutions rédigées selon les exigences des épreuves de concours.",
    whatsappShareText: "Document académique : Algèbre Linéaire INP-HB sur MemoFAC - https://memofac.ci/fiche/algebre-lineaire-stic",
    pages: [
      {
        pageNumber: 1,
        chapterTitle: 'ESPACES VECTORIELS ET FAMILLES LIBRES',
        subTitle: 'Sous-espaces vectoriels supplémentaires et théorème du rang',
        content: "Soit E un espace vectoriel sur un corps commutatif K. Une famille de vecteurs est qualifiée de libre si toute combinaison linéaire nulle impose la nullité de tous les coefficients scalaires. Le théorème fondamental du rang établit l'égalité entre la dimension de l'espace de départ et la somme des dimensions du noyau et de l'image d'une application linéaire.",
        bulletPoints: [
          "Critères de stabilité des sous-espaces vectoriels.",
          "Calcul matriciel de déterminants par développement selon une ligne ou colonne optimale.",
          "Matrice de passage et changement de base canonique."
        ],
        keyNote: "Document académique vérifié • Protection DRM active"
      }
    ],
    reviews: []
  }
];

export const MOCK_USER_SESSION = {
  fullName: 'Kouassi Jean-Eudes',
  phone: '+225 07 48 92 11 89',
  university: 'Université Félix Houphouët-Boigny (Abidjan)',
  faculty: 'Sciences Juridiques',
  level: 'Licence 2',
  balanceFCFA: 0,
  unlockedDocIds: [] as string[]
};
