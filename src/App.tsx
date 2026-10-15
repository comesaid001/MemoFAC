import { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { MobileDrawer } from './components/MobileDrawer';
import { Footer } from './components/Footer';
import { HomeScreen } from './components/HomeScreen';
import { ReaderScreen } from './components/ReaderScreen';
import { PublishScreen } from './components/PublishScreen';
import { AuthorScreen } from './components/AuthorScreen';
import { ModerationScreen } from './components/ModerationScreen';
import { PreviewModal } from './components/PreviewModal';
import { SearchModal } from './components/SearchModal';
import { ProfileModal } from './components/ProfileModal';
import { InfoModal } from './components/InfoModal';
import { INITIAL_DOCUMENTS, MOCK_USER_SESSION } from './data/documents';
import { AcademicDocument, UserSession } from './types';

export default function App() {
  const [documents, setDocuments] = useState<AcademicDocument[]>(INITIAL_DOCUMENTS);
  const [currentView, setCurrentView] = useState<string>('explore');
  const [selectedDocId, setSelectedDocId] = useState<string>('droit-obligations-l2');
  const [previewDoc, setPreviewDoc] = useState<AcademicDocument | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [infoModalType, setInfoModalType] = useState<'terms' | 'drm' | 'support' | null>(null);

  // Persistent user state
  const [userSession, setUserSession] = useState<UserSession>(() => {
    try {
      const saved = localStorage.getItem('memofac_user_session');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      // fallback
    }
    return MOCK_USER_SESSION;
  });

  useEffect(() => {
    try {
      localStorage.setItem('memofac_user_session', JSON.stringify(userSession));
    } catch (e) {}
  }, [userSession]);

  const handleUnlockDoc = (docId: string) => {
    if (!userSession.unlockedDocIds.includes(docId)) {
      setUserSession((prev: UserSession) => ({
        ...prev,
        unlockedDocIds: [...prev.unlockedDocIds, docId],
      }));
    }
  };

  const handleNavigate = (view: string, docId?: string) => {
    if (docId) {
      setSelectedDocId(docId);
    }
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDocumentPublished = (newDoc: AcademicDocument) => {
    setDocuments((prev: AcademicDocument[]) => [newDoc, ...prev]);
    setSelectedDocId(newDoc.id);
  };

  const currentDoc =
    documents.find((d) => d.id === selectedDocId) || documents[0];

  const unlockedDocuments = documents.filter((d) =>
    userSession.unlockedDocIds.includes(d.id)
  );

  return (
    <div className="bg-[#faf8ff] text-[#131b2e] min-h-screen flex flex-col font-['Inter'] antialiased">
      {/* Top Header */}
      <Header
        onOpenDrawer={() => setIsDrawerOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
        onNavigate={handleNavigate}
        onOpenProfile={() => setIsProfileOpen(true)}
        unlockedCount={userSession.unlockedDocIds.length}
      />

      {/* Mobile Drawer */}
      <MobileDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        currentView={currentView}
        onNavigate={handleNavigate}
        onOpenProfile={() => setIsProfileOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex flex-col relative w-full pt-14 flex-grow">
        {currentView === 'explore' && (
          <HomeScreen
            documents={documents}
            onOpenPreview={(doc: AcademicDocument) => setPreviewDoc(doc)}
            onOpenReader={(docId: string) => handleNavigate('reader', docId)}
            onNavigatePublish={() => handleNavigate('publish')}
            onOpenSearch={() => setIsSearchOpen(true)}
          />
        )}

        {currentView === 'reader' && (
          <ReaderScreen
            document={currentDoc}
            userSession={userSession}
            isUnlocked={userSession.unlockedDocIds.includes(currentDoc.id)}
            onUnlockDoc={handleUnlockDoc}
            onNavigateHome={() => handleNavigate('explore')}
          />
        )}

        {currentView === 'publish' && (
          <PublishScreen
            onDocumentPublished={handleDocumentPublished}
            onNavigateHome={() => handleNavigate('explore')}
          />
        )}

        {currentView === 'author' && (
          <AuthorScreen
            documents={documents}
            onNavigateHome={() => handleNavigate('explore')}
            onNavigatePublish={() => handleNavigate('publish')}
          />
        )}

        {currentView === 'moderation' && (
          <ModerationScreen onNavigateHome={() => handleNavigate('explore')} />
        )}
      </main>

      {/* Footer */}
      <Footer
        onNavigate={handleNavigate}
        onOpenInfoModal={(type: 'terms' | 'drm' | 'support') => setInfoModalType(type)}
      />

      {/* Bottom Sheet Preview Modal (from Image 1) */}
      <PreviewModal
        document={previewDoc}
        onClose={() => setPreviewDoc(null)}
        onUnlock={(docId: string) => {
          setSelectedDocId(docId);
          setCurrentView('reader');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* Global Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        documents={documents}
        onSelectDoc={(docId: string) => handleNavigate('reader', docId)}
      />

      {/* Student / Author Profile Modal */}
      <ProfileModal
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        userSession={userSession}
        onUpdateSession={(updated: Partial<UserSession>) =>
          setUserSession((prev: UserSession) => ({ ...prev, ...updated }))
        }
        unlockedDocuments={unlockedDocuments}
        onOpenDoc={(docId: string) => handleNavigate('reader', docId)}
      />

      {/* Info / Policy Modal */}
      <InfoModal
        type={infoModalType}
        onClose={() => setInfoModalType(null)}
      />
    </div>
  );
}
