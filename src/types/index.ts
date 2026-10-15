export type FacultyType = 
  | 'all'
  | 'droit'
  | 'economie'
  | 'medecine'
  | 'sciences'
  | 'lettres';

export type ResourceType = 
  | 'fiches'
  | 'annales'
  | 'td'
  | 'cas_pratiques';

export type MobileMoneyOperator = 'wave' | 'orange' | 'mtn' | 'moov';

export interface Review {
  id: string;
  authorName: string;
  authorInitials: string;
  studyLevel: string;
  rating: number;
  comment: string;
  date: string;
}

export interface DocumentPage {
  pageNumber: number;
  chapterTitle?: string;
  subTitle?: string;
  content: string;
  bulletPoints?: string[];
  tableData?: { headers: string[]; rows: string[][] };
  legalQuote?: string;
  keyNote?: string;
}

export interface AcademicDocument {
  id: string;
  slug: string;
  title: string;
  faculty: FacultyType;
  facultyLabel: string;
  university: string;
  ufr: string;
  level: string;
  pagesCount: number;
  formatTag: string;
  rating: number;
  ratingCount: number;
  priceFCFA: number;
  author: {
    name: string;
    role: string;
    avatarInitials: string;
    verified: boolean;
    publishedCount: number;
  };
  thumbnailUrl: string;
  altText: string;
  acceptedPayments: string;
  synopsis: string;
  pages: DocumentPage[];
  reviews: Review[];
  whatsappShareText: string;
}

export interface UserSession {
  fullName: string;
  phone: string;
  university: string;
  faculty: string;
  level: string;
  balanceFCFA: number;
  unlockedDocIds: string[];
}
