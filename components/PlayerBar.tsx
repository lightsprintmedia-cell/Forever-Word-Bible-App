
import React, { useState } from 'react';
import { Icons } from '../constants';
import { BibleVerse } from '../types';

interface PlayerBarProps {
  isPlaying: boolean;
  setIsPlaying: (p: boolean) => void;
  currentVerse: BibleVerse | null;
  onExplain: () => void;
}

const PlayerBar: React.FC<PlayerBarProps> = ({ isPlaying, setIsPlaying, currentVerse, onExplain }) => {
  const [speed, setSpeed] = useState(1);
  const [showSpeedMenu, setShowSpeedMenu] = useState(false);

  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 w-[90%] max-w-2xl z-40">
      <div className="glass shadow-2xl rounded-2xl p-4 flex items-center justify-between border border-white/40">
        <div className="flex items-center gap-4 min-w-0 flex-1">
          <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center text-amber-600 flex-shrink-0">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18z" />
              <path d="M12 11v5" /><path d="M12 7h.01" />
            </svg>
          </div>
          <div className="min-w-0">
            <h4 className="font-semibold text-stone-800 truncate">
              {currentVerse ? `${currentVerse.book} ${currentVerse.chapter}:${currentVerse.verse}` : 'Select a verse'}
            </h4>
            <p className="text-xs text-stone-500 truncate italic">
              {currentVerse ? currentVerse.text : 'Quiet meditation...'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-6 px-4">
          <button className="text-stone-400 hover:text-stone-600">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M11 17l-5-5 5-5M18 17l-5-5 5-5" />
            </svg>
          </button>
          
          <button 
            onClick={() => setIsPlaying(!isPlaying)}
            className="w-14 h-14 rounded-full bg-stone-900 text-white flex items-center justify-center shadow-lg hover:scale-105 active:scale-95 transition-all"
          >
            {isPlaying ? <Icons.Pause size={28} /> : <Icons.Play size={28} />}
          </button>

          <button className="text-stone-400 hover:text-stone-600">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M13 17l5-5-5-5M6 17l5-5-5-5" />
            </svg>
          </button>
        </div>

        <div className="flex items-center gap-4 flex-shrink-0">
          <div className="relative">
            <button 
              onClick={() => setShowSpeedMenu(!showSpeedMenu)}
              className="text-xs font-bold text-stone-500 hover:bg-stone-100 px-2 py-1 rounded"
            >
              {speed}x
            </button>
            {showSpeedMenu && (
              <div className="absolute bottom-full mb-2 right-0 bg-white shadow-xl rounded-lg p-2 border border-stone-100 flex flex-col gap-1 w-20">
                {[0.75, 1, 1.25, 1.5, 2].map(s => (
                  <button 
                    key={s} 
                    onClick={() => { setSpeed(s); setShowSpeedMenu(false); }}
                    className={`text-xs p-2 rounded text-left hover:bg-stone-50 ${speed === s ? 'text-amber-600 font-bold' : 'text-stone-600'}`}
                  >
                    {s}x
                  </button>
                ))}
              </div>
            )}
          </div>
          
          <button 
            onClick={onExplain}
            className="p-2 text-stone-400 hover:text-amber-600 transition-colors"
          >
            <Icons.Sparkles size={22} />
          </button>
        </div>
      </div>
      
      {/* Waveform Visualization Placeholder */}
      {isPlaying && (
        <div className="absolute -top-4 left-0 right-0 flex items-center justify-center gap-1 opacity-50">
          {Array.from({ length: 20 }).map((_, i) => (
            <div 
              key={i} 
              className="w-1 bg-amber-400 rounded-full animate-pulse" 
              style={{ 
                height: `${Math.random() * 20 + 5}px`,
                animationDelay: `${i * 0.1}s`
              }} 
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default PlayerBar;
