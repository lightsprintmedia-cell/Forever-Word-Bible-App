
import React from 'react';

const Watermark: React.FC = () => {
  return (
    <div className="fixed bottom-32 right-8 pointer-events-none select-none opacity-20 z-10 flex flex-col items-end rotate-[-15deg]">
      <div className="flex items-center gap-2 mb-1">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M11 2v9H2v2h9v9h2v-9h9v-2h-9V2h-2z" />
        </svg>
        <span className="text-xs font-bold tracking-[0.2em] uppercase">TheKing's</span>
      </div>
      <p className="text-[10px] font-medium whitespace-nowrap">Forever Word Bible App — Share the Light</p>
    </div>
  );
};

export default Watermark;
