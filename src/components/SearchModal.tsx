import React, { useState } from 'react';
import { Search, X, BookOpen, Star, FileText } from 'lucide-react';
import { AcademicDocument } from '../types';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  documents: AcademicDocument[];
  onSelectDoc: (docId: string) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  documents,
  onSelectDoc,
}) => {
  const [query, setQuery] = useState('');
  const [selectedFaculty, setSelectedFaculty] = useState<string>('all');

  if (!isOpen) return null;

  const filteredDocs = documents.filter((doc) => {
    const matchesQuery =
      doc.title.toLowerCase().includes(query.toLowerCase()) ||
      doc.university.toLowerCase().includes(query.toLowerCase()) ||
      doc.author.name.toLowerCase().includes(query.toLowerCase()) ||
      doc.synopsis.toLowerCase().includes(query.toLowerCase());
    const matchesFaculty = selectedFaculty === 'all' || doc.faculty === selectedFaculty;
    return matchesQuery && matchesFaculty;
  });

  return (
    <div className="fixed inset-0 z-50 bg-[#131b2e]/60 backdrop-blur-xs flex items-start justify-center p-4 pt-16 sm:pt-20">
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-2xl border border-[#eaedff] flex flex-col overflow-hidden max-h-[80vh] animate-in fade-in zoom-in-95 duration-150">
        {/* Barre de recherche */}
        <div className="p-4 border-b border-[#eaedff] flex items-center gap-3 bg-[#faf8ff]">
          <Search className="w-5 h-5 text-[#0051d5] shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Rechercher par matière, cours, auteur ou université..."
            autoFocus
            className="w-full bg-transparent font-['Inter'] text-sm text-[#131b2e] placeholder:text-[#757682] focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-[#757682] hover:text-[#131b2e] cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-[#f2f3ff] hover:bg-[#e2e7ff] text-[#444651] flex items-center justify-center shrink-0 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Filtres de disciplines sans emojis */}
        <div className="px-4 py-2.5 bg-white border-b border-[#eaedff] flex items-center gap-1.5 overflow-x-auto scrollbar-none">
          {[
            { id: 'all', label: 'Toutes disciplines' },
            { id: 'droit', label: 'Droit' },
            { id: 'economie', label: 'Économie' },
            { id: 'medecine', label: 'Médecine' },
            { id: 'sciences', label: 'Sciences & STIC' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setSelectedFaculty(item.id)}
              className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                selectedFaculty === item.id
                  ? 'bg-[#00236f] text-white'
                  : 'bg-[#f2f3ff] text-[#444651] hover:bg-[#e2e7ff]'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Liste des résultats */}
        <div className="overflow-y-auto p-3 flex flex-col gap-2">
          {filteredDocs.length === 0 ? (
            <div className="py-12 text-center flex flex-col items-center justify-center gap-2">
              <BookOpen className="w-8 h-8 text-[#757682]" />
              <p className="font-['Plus_Jakarta_Sans'] text-sm font-bold text-[#131b2e]">
                Aucun document correspondant à « {query} »
              </p>
              <p className="text-xs text-[#757682]">
                Modifiez vos termes de recherche ou sélectionnez une autre discipline.
              </p>
            </div>
          ) : (
            filteredDocs.map((doc) => (
              <div
                key={doc.id}
                onClick={() => {
                  onSelectDoc(doc.id);
                  onClose();
                }}
                className="p-3 rounded-xl bg-[#faf8ff] hover:bg-[#f2f3ff] border border-[#eaedff] flex items-center justify-between gap-3 cursor-pointer transition-all active:scale-[0.99]"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-12 h-14 rounded-lg overflow-hidden bg-[#eaedff] shrink-0">
                    <img
                      src={doc.thumbnailUrl}
                      alt={doc.altText}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="text-[10px] text-[#0051d5] font-bold truncate">
                      {doc.university}
                    </span>
                    <h5 className="font-['Plus_Jakarta_Sans'] text-xs font-bold text-[#131b2e] truncate">
                      {doc.title}
                    </h5>
                    <span className="text-[11px] text-[#757682] truncate">
                      {doc.level} • {doc.pagesCount} pages
                    </span>
                  </div>
                </div>

                <div className="flex flex-col items-end shrink-0">
                  <span className="font-['Plus_Jakarta_Sans'] text-xs font-bold text-[#00236f] bg-[#eaedff] px-2 py-0.5 rounded-md">
                    {doc.priceFCFA} FCFA
                  </span>
                  <span className="text-[10px] text-[#757682] mt-1 flex items-center gap-0.5">
                    <Star className="w-3 h-3 text-[#d97706] fill-[#d97706]" />
                    {doc.rating}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
