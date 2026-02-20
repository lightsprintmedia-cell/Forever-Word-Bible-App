
import React from 'react';
import { TRANSLATIONS, BIBLE_BOOKS } from '../constants';

interface HeaderProps {
  currentBook: string;
  setCurrentBook: (b: string) => void;
  currentChapter: number;
  setCurrentChapter: (c: number) => void;
  translation: string;
  setTranslation: (t: string) => void;
  onDashboardToggle: () => void;
}

const Header: React.FC<HeaderProps> = ({ 
  currentBook, setCurrentBook, 
  currentChapter, setCurrentChapter, 
  translation, setTranslation,
  onDashboardToggle
}) => {
  return (
    <header className="sticky top-0 z-50 glass border-b border-stone-200/50 px-6 py-4 flex items-center justify-between">
      <div className="flex items-center gap-8">
        <h1 
          className="text-xl font-bold tracking-tight text-stone-800 cursor-pointer"
          onClick={onDashboardToggle}
        >
          TheKing's <span className="font-light text-stone-500">Bible</span>
        </h1>
        
        <div className="flex items-center gap-3 bg-stone-100/50 rounded-full px-4 py-1.5 border border-stone-200/50">
          <select 
            value={currentBook} 
            onChange={(e) => setCurrentBook(e.target.value)}
            className="bg-transparent text-sm font-medium focus:outline-none cursor-pointer"
          >
            {BIBLE_BOOKS.map(b => <option key={b.name} value={b.name}>{b.name}</option>)}
          </select>
          <div className="w-px h-4 bg-stone-300" />
          <select 
            value={currentChapter} 
            onChange={(e) => setCurrentChapter(Number(e.target.value))}
            className="bg-transparent text-sm font-medium focus:outline-none cursor-pointer"
          >
            {Array.from({ length: BIBLE_BOOKS.find(b => b.name === currentBook)?.chapters || 1 }, (_, i) => i + 1).map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <select 
          value={translation} 
          onChange={(e) => setTranslation(e.target.value)}
          className="text-sm font-semibold text-stone-600 bg-white px-3 py-1 rounded-lg border border-stone-200 shadow-sm focus:outline-none"
        >
          {TRANSLATIONS.map(t => <option key={t} value={t}>{t}</option>)}
        </select>
        
        <button 
          onClick={onDashboardToggle}
          className="p-2 hover:bg-stone-100 rounded-full transition-colors"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="3" width="7" height="7" rx="1" />
            <rect x="14" y="3" width="7" height="7" rx="1" />
            <rect x="14" y="14" width="7" height="7" rx="1" />
            <rect x="3" y="14" width="7" height="7" rx="1" />
          </svg>
        </button>
      </div>
    </header>
  );
};

export default Header;
