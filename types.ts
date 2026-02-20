
export interface BibleVerse {
  id: string;
  book: string;
  chapter: number;
  verse: number;
  text: string;
}

export interface Note {
  id: string;
  verseRef: string;
  content: string;
  tags: string[];
  createdAt: number;
}

export interface UserState {
  bookmarks: string[]; // Verse IDs
  history: string[]; // Recent chapters
  streak: number;
  notes: Note[];
  currentTranslation: string;
  theme: 'cream' | 'dark' | 'forest';
}

export enum Translation {
  KJV = 'KJV',
  NIV = 'NIV',
  ESV = 'ESV',
  NLT = 'NLT',
  NKJV = 'NKJV'
}

export interface BibleBook {
  name: string;
  chapters: number;
}
