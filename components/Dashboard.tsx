
import React from 'react';
import { Icons, MOCK_VERSES } from '../constants';

interface DashboardProps {
  streak: number;
  bookmarks: string[];
  onContinue: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ streak, bookmarks, onContinue }) => {
  return (
    <div className="max-w-6xl mx-auto p-8 pt-12 animate-in fade-in duration-1000">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Welcome Card */}
        <div className="md:col-span-2 bg-stone-900 rounded-3xl p-8 text-white relative overflow-hidden shadow-2xl">
          <div className="relative z-10 h-full flex flex-col justify-between">
            <div>
              <h2 className="text-4xl font-serif font-bold mb-4">Good morning, Beloved.</h2>
              <p className="text-stone-400 max-w-xs">Your soul is being restored day by day. Continue your journey through Psalms today.</p>
            </div>
            <button 
              onClick={onContinue}
              className="mt-8 bg-amber-500 text-stone-900 font-bold px-8 py-3 rounded-full self-start hover:scale-105 active:scale-95 transition-all"
            >
              Continue Reading
            </button>
          </div>
          <div className="absolute top-0 right-0 p-8 opacity-10">
            <svg width="200" height="200" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2L4.5 20.29l.71.71L12 18l6.79 3 .71-.71z" />
            </svg>
          </div>
        </div>

        {/* Streak Card */}
        <div className="glass rounded-3xl p-8 flex flex-col items-center justify-center text-center shadow-lg group">
          <div className="relative mb-4">
            <div className="w-20 h-20 rounded-full border-4 border-amber-500/20 flex items-center justify-center">
              <span className="text-3xl font-bold text-stone-800">{streak}</span>
            </div>
            <div className="absolute -top-2 -right-2 bg-amber-500 p-1.5 rounded-full shadow-lg group-hover:animate-bounce">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="white"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
            </div>
          </div>
          <h3 className="font-bold text-stone-700">Daily Streak</h3>
          <p className="text-xs text-stone-500 mt-1">Consistency is the key to spiritual growth.</p>
        </div>

        {/* Bookmarks Quick Card */}
        <div className="glass rounded-3xl p-8 shadow-lg">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-stone-800 flex items-center gap-2">
              <Icons.Bookmark size={18} /> Bookmarks
            </h3>
            <span className="text-xs bg-stone-100 px-2 py-0.5 rounded-full font-bold">{bookmarks.length}</span>
          </div>
          <div className="space-y-3">
            {bookmarks.slice(0, 3).map(id => {
              const verse = MOCK_VERSES.find(v => v.id === id);
              return (
                <div key={id} className="text-sm border-b border-stone-100 pb-2">
                  <p className="font-bold text-amber-700 text-xs">{verse?.book} {verse?.chapter}:{verse?.verse}</p>
                  <p className="text-stone-600 line-clamp-1 italic">"{verse?.text}"</p>
                </div>
              );
            })}
            {bookmarks.length === 0 && <p className="text-xs text-stone-400 text-center py-4">No bookmarks yet.</p>}
          </div>
        </div>

        {/* Plans Grid */}
        <div className="md:col-span-3 grid grid-cols-1 sm:grid-cols-3 gap-6">
          {['Wisdom Journey', 'Morning Peace', 'Power of Grace'].map((plan, i) => (
            <div key={plan} className={`rounded-2xl p-6 shadow-md transition-all hover:-translate-y-1 cursor-pointer bg-white border border-stone-100`}>
              <div className={`w-10 h-10 rounded-xl mb-4 flex items-center justify-center ${i === 0 ? 'bg-blue-50 text-blue-500' : i === 1 ? 'bg-green-50 text-green-500' : 'bg-purple-50 text-purple-500'}`}>
                <Icons.Play size={20} />
              </div>
              <h4 className="font-bold text-stone-800 mb-1">{plan}</h4>
              <p className="text-xs text-stone-500">Day {i + 4} of 21</p>
              <div className="mt-4 h-1.5 w-full bg-stone-100 rounded-full overflow-hidden">
                <div className="h-full bg-stone-800" style={{ width: `${(i+4)*5}%` }} />
              </div>
            </div>
          ))}
        </div>

        {/* Voice Command Hint */}
        <div className="bg-amber-100/50 border border-amber-200 rounded-3xl p-8 flex flex-col justify-center">
          <div className="w-12 h-12 bg-white rounded-2xl shadow-sm flex items-center justify-center mb-4 text-amber-600">
            <Icons.Mic />
          </div>
          <h4 className="font-bold text-amber-900 mb-2">Voice Activated</h4>
          <p className="text-xs text-amber-800/70">Try saying <span className="font-bold italic">"Play Psalm 23"</span> or <span className="font-bold italic">"Next chapter"</span></p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
