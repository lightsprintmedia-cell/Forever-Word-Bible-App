
import React, { useState, useEffect, useRef, useCallback } from 'react';
import Header from './components/Header';
import BibleView from './components/BibleView';
import PlayerBar from './components/PlayerBar';
import Notepad from './components/Notepad';
import Dashboard from './components/Dashboard';
import Watermark from './components/Watermark';
import { UserState, Translation, Note } from './types';
import { MOCK_VERSES } from './constants';

const App: React.FC = () => {
  const [userState, setUserState] = useState<UserState>({
    bookmarks: [],
    history: ['John 1'],
    streak: 7,
    notes: [],
    currentTranslation: Translation.NIV,
    theme: 'cream'
  });

  const [currentBook, setCurrentBook] = useState('John');
  const [currentChapter, setCurrentChapter] = useState(1);
  const [selectedVerseId, setSelectedVerseId] = useState<string | null>(null);
  const [isNotepadOpen, setIsNotepadOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showDashboard, setShowDashboard] = useState(true);
  const [playbackVerseId, setPlaybackVerseId] = useState<string | null>(null);

  // Filter verses for current view
  const currentVerses = MOCK_VERSES.filter(v => v.book === currentBook && v.chapter === currentChapter);

  const toggleBookmark = (id: string) => {
    setUserState(prev => ({
      ...prev,
      bookmarks: prev.bookmarks.includes(id) 
        ? prev.bookmarks.filter(b => b !== id) 
        : [...prev.bookmarks, id]
    }));
  };

  const addNote = (content: string, verseRef?: string) => {
    const newNote: Note = {
      id: Math.random().toString(36).substr(2, 9),
      verseRef: verseRef || `${currentBook} ${currentChapter}`,
      content,
      tags: [],
      createdAt: Date.now()
    };
    setUserState(prev => ({
      ...prev,
      notes: [newNote, ...prev.notes]
    }));
  };

  const handleVerseClick = (id: string) => {
    setSelectedVerseId(id);
    // If clicking a verse while dashboard is open, close dashboard
    if (showDashboard) setShowDashboard(false);
  };

  // Simulated playback logic
  useEffect(() => {
    let interval: any;
    if (isPlaying) {
      let currentIndex = currentVerses.findIndex(v => v.id === (playbackVerseId || currentVerses[0]?.id));
      setPlaybackVerseId(currentVerses[currentIndex]?.id);

      interval = setInterval(() => {
        currentIndex++;
        if (currentIndex < currentVerses.length) {
          setPlaybackVerseId(currentVerses[currentIndex].id);
        } else {
          setIsPlaying(false);
          setPlaybackVerseId(null);
          clearInterval(interval);
        }
      }, 4000); // 4 seconds per verse simulated
    } else {
      setPlaybackVerseId(null);
    }
    return () => clearInterval(interval);
  }, [isPlaying, currentVerses]);

  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-500 bg-[#FDFBF7]`}>
      <Header 
        currentBook={currentBook}
        setCurrentBook={setCurrentBook}
        currentChapter={currentChapter}
        setCurrentChapter={setCurrentChapter}
        translation={userState.currentTranslation}
        setTranslation={(t) => setUserState(prev => ({ ...prev, currentTranslation: t }))}
        onDashboardToggle={() => setShowDashboard(!showDashboard)}
      />

      <main className="flex-1 flex relative overflow-hidden">
        <div className={`flex-1 transition-all duration-300 ${isNotepadOpen ? 'mr-96' : 'mr-0'}`}>
          {showDashboard ? (
            <Dashboard 
              streak={userState.streak} 
              bookmarks={userState.bookmarks}
              onContinue={() => setShowDashboard(false)}
            />
          ) : (
            <div className="max-w-4xl mx-auto px-6 py-12 pb-40">
              <BibleView 
                verses={currentVerses}
                selectedVerseId={selectedVerseId}
                playbackVerseId={playbackVerseId}
                bookmarkedIds={userState.bookmarks}
                onVerseClick={handleVerseClick}
                onToggleBookmark={toggleBookmark}
              />
            </div>
          )}
        </div>

        <Notepad 
          isOpen={isNotepadOpen} 
          setIsOpen={setIsNotepadOpen}
          notes={userState.notes}
          addNote={addNote}
          currentContext={selectedVerseId ? MOCK_VERSES.find(v => v.id === selectedVerseId) : null}
        />
        
        <Watermark />
      </main>

      <PlayerBar 
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        currentVerse={playbackVerseId ? MOCK_VERSES.find(v => v.id === playbackVerseId) : null}
        onExplain={() => setIsNotepadOpen(true)}
      />
    </div>
  );
};

export default App;
