
import React from 'react';
import { BibleVerse } from '../types';
import { Icons } from '../constants';

interface BibleViewProps {
  verses: BibleVerse[];
  selectedVerseId: string | null;
  playbackVerseId: string | null;
  bookmarkedIds: string[];
  onVerseClick: (id: string) => void;
  onToggleBookmark: (id: string) => void;
}

const BibleView: React.FC<BibleViewProps> = ({ 
  verses, 
  selectedVerseId, 
  playbackVerseId, 
  bookmarkedIds,
  onVerseClick,
  onToggleBookmark
}) => {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="mb-12">
        <h2 className="text-4xl font-serif font-bold text-stone-900 mb-2">
          {verses[0]?.book} {verses[0]?.chapter}
        </h2>
        <div className="h-1 w-20 bg-amber-500 rounded-full" />
      </div>

      <div className="bible-text text-2xl leading-relaxed text-stone-800 space-y-4">
        {verses.map((v) => {
          const isSelected = selectedVerseId === v.id;
          const isPlaying = playbackVerseId === v.id;
          const isBookmarked = bookmarkedIds.includes(v.id);

          return (
            <span 
              key={v.id}
              className={`
                relative group transition-all duration-300 inline cursor-pointer px-1 rounded
                ${isSelected ? 'bg-amber-100' : ''}
                ${isPlaying ? 'bg-amber-400/30 ring-2 ring-amber-400' : ''}
                hover:bg-stone-100
              `}
              onClick={() => onVerseClick(v.id)}
            >
              <sup className="text-xs font-sans text-stone-400 mr-1 select-none">
                {v.verse}
              </sup>
              {v.text}{' '}
              
              {isSelected && (
                <span className="absolute -top-10 left-0 flex items-center gap-1 bg-white shadow-xl border border-stone-100 rounded-full px-2 py-1 z-20 animate-in zoom-in-50 duration-200">
                  <button 
                    onClick={(e) => { e.stopPropagation(); onToggleBookmark(v.id); }}
                    className={`p-1.5 rounded-full hover:bg-stone-100 ${isBookmarked ? 'text-amber-500' : 'text-stone-400'}`}
                  >
                    <Icons.Bookmark filled={isBookmarked} size={16} />
                  </button>
                  <button className="p-1.5 rounded-full hover:bg-stone-100 text-stone-400">
                    <Icons.Sparkles size={16} />
                  </button>
                  <button className="p-1.5 rounded-full hover:bg-stone-100 text-stone-400">
                    <Icons.Note size={16} />
                  </button>
                </span>
              )}
            </span>
          );
        })}
      </div>
    </div>
  );
};

export default BibleView;
