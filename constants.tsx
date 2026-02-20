
import React from 'react';
import { BibleBook, BibleVerse } from './types';

export const BIBLE_BOOKS: BibleBook[] = [
  { name: 'Genesis', chapters: 50 },
  { name: 'Exodus', chapters: 40 },
  { name: 'Psalms', chapters: 150 },
  { name: 'Proverbs', chapters: 31 },
  { name: 'Matthew', chapters: 28 },
  { name: 'John', chapters: 21 },
  { name: 'Romans', chapters: 16 },
  { name: 'Revelation', chapters: 22 }
];

export const TRANSLATIONS = ['KJV', 'NIV', 'ESV', 'NLT', 'NKJV', 'TPT', 'AMP'];

// Mock data for demonstration
export const MOCK_VERSES: BibleVerse[] = [
  { id: 'john-1-1', book: 'John', chapter: 1, verse: 1, text: 'In the beginning was the Word, and the Word was with God, and the Word was God.' },
  { id: 'john-1-2', book: 'John', chapter: 1, verse: 2, text: 'The same was in the beginning with God.' },
  { id: 'john-1-3', book: 'John', chapter: 1, verse: 3, text: 'All things were made by him; and without him was not any thing made that was made.' },
  { id: 'john-1-4', book: 'John', chapter: 1, verse: 4, text: 'In him was life; and the life was the light of men.' },
  { id: 'john-1-5', book: 'John', chapter: 1, verse: 5, text: 'And the light shineth in darkness; and the darkness comprehended it not.' },
  { id: 'psalm-23-1', book: 'Psalms', chapter: 23, verse: 1, text: 'The Lord is my shepherd; I shall not want.' },
  { id: 'psalm-23-2', book: 'Psalms', chapter: 23, verse: 2, text: 'He maketh me to lie down in green pastures: he leadeth me beside the still waters.' },
  { id: 'psalm-23-3', book: 'Psalms', chapter: 23, verse: 3, text: 'He restoreth my soul: he leadeth me in the paths of righteousness for his name\'s sake.' }
];

export const Icons = {
  Play: ({ size = 24 }: { size?: number }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
  ),
  Pause: ({ size = 24 }: { size?: number }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>
  ),
  Bookmark: ({ filled = false, size = 20 }: { filled?: boolean, size?: number }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2">
      <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
    </svg>
  ),
  Note: ({ size = 20 }: { size?: number }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
    </svg>
  ),
  Sparkles: ({ size = 20 }: { size?: number }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 3l1.912 5.813a2 2 0 0 0 1.275 1.275L21 12l-5.813 1.912a2 2 0 0 0-1.275 1.275L12 21l-1.912-5.813a2 2 0 0 0-1.275-1.275L3 12l5.813-1.912a2 2 0 0 0 1.275-1.275L12 3z" />
    </svg>
  ),
  Mic: ({ size = 20 }: { size?: number }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" /><path d="M19 10v2a7 7 0 0 1-14 0v-2" /><line x1="12" y1="19" x2="12" y2="23" /><line x1="8" y1="23" x2="16" y2="23" />
    </svg>
  )
};
