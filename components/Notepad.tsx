
import React, { useState, useEffect } from 'react';
import { Note, BibleVerse } from '../types';
import { Icons } from '../constants';
import { explainVerse, generatePrayer } from '../services/geminiService';

interface NotepadProps {
  isOpen: boolean;
  setIsOpen: (o: boolean) => void;
  notes: Note[];
  addNote: (content: string, ref?: string) => void;
  currentContext: BibleVerse | null;
}

const Notepad: React.FC<NotepadProps> = ({ isOpen, setIsOpen, notes, addNote, currentContext }) => {
  const [newNoteText, setNewNoteText] = useState('');
  const [aiLoading, setAiLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredNotes = notes.filter(n => 
    n.content.toLowerCase().includes(searchQuery.toLowerCase()) || 
    n.verseRef.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAiAction = async (action: 'explain' | 'prayer') => {
    if (!currentContext) return;
    setAiLoading(true);
    const ref = `${currentContext.book} ${currentContext.chapter}:${currentContext.verse}`;
    const result = action === 'explain' 
      ? await explainVerse(ref, currentContext.text)
      : await generatePrayer(ref, currentContext.text);
    
    if (result) addNote(result, ref);
    setAiLoading(false);
  };

  return (
    <>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-24 right-0 z-50 glass p-3 rounded-l-2xl shadow-lg border-r-0 hover:translate-x-[-4px] transition-transform"
      >
        <Icons.Note />
      </button>

      <div className={`
        fixed top-0 right-0 h-full w-96 glass border-l border-stone-200/50 z-50 transition-transform duration-500 transform
        ${isOpen ? 'translate-x-0' : 'translate-x-full'}
        flex flex-col
      `}>
        <div className="p-6 border-b border-stone-100 flex items-center justify-between">
          <h2 className="text-xl font-bold text-stone-800 flex items-center gap-2">
            <Icons.Note size={20} /> Journal
          </h2>
          <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-stone-100 rounded-full">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-4 border-b border-stone-100">
          {currentContext ? (
            <div className="bg-amber-50 rounded-xl p-4 border border-amber-100 mb-4 animate-in fade-in zoom-in-95 duration-300">
              <p className="text-xs font-bold text-amber-700 uppercase tracking-wider mb-1">Current Verse</p>
              <p className="text-sm text-amber-900 line-clamp-2 italic">"{currentContext.text}"</p>
              <div className="flex gap-2 mt-3">
                <button 
                  onClick={() => handleAiAction('explain')}
                  disabled={aiLoading}
                  className="text-xs bg-amber-200 hover:bg-amber-300 px-3 py-1.5 rounded-lg font-semibold text-amber-800 flex items-center gap-1 transition-colors disabled:opacity-50"
                >
                  <Icons.Sparkles size={12} /> Explain
                </button>
                <button 
                  onClick={() => handleAiAction('prayer')}
                  disabled={aiLoading}
                  className="text-xs bg-stone-800 hover:bg-stone-900 px-3 py-1.5 rounded-lg font-semibold text-white flex items-center gap-1 transition-colors disabled:opacity-50"
                >
                  Prayer
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-stone-50 rounded-xl p-4 border border-stone-100 text-center mb-4">
              <p className="text-xs text-stone-500">Tap a verse to reflect with AI</p>
            </div>
          )}

          <div className="relative">
            <textarea 
              value={newNoteText}
              onChange={(e) => setNewNoteText(e.target.value)}
              placeholder="Reflect on the Word..."
              className="w-full bg-white border border-stone-200 rounded-xl p-4 text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none min-h-[100px] resize-none"
            />
            <button 
              onClick={() => {
                if (newNoteText.trim()) {
                  addNote(newNoteText, currentContext ? `${currentContext.book} ${currentContext.chapter}:${currentContext.verse}` : undefined);
                  setNewNoteText('');
                }
              }}
              className="absolute bottom-3 right-3 bg-amber-500 text-white p-2 rounded-full shadow-lg hover:scale-110 active:scale-95 transition-all"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
              </svg>
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-hide">
          <div className="relative mb-2">
            <input 
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search notes..."
              className="w-full bg-stone-100 border-none rounded-lg py-2 pl-10 pr-4 text-sm focus:ring-1 focus:ring-amber-400"
            />
            <svg className="absolute left-3 top-2.5 text-stone-400" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </div>

          {filteredNotes.map(note => (
            <div key={note.id} className="group p-4 bg-white border border-stone-100 rounded-xl hover:shadow-md transition-all">
              <div className="flex justify-between items-start mb-2">
                <span className="text-[10px] font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded uppercase">{note.verseRef}</span>
                <span className="text-[10px] text-stone-400">{new Date(note.createdAt).toLocaleDateString()}</span>
              </div>
              <p className="text-sm text-stone-700 leading-relaxed whitespace-pre-wrap">{note.content}</p>
            </div>
          ))}
          {filteredNotes.length === 0 && (
            <div className="text-center py-12">
              <p className="text-stone-400 text-sm">No reflections yet.</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Notepad;
