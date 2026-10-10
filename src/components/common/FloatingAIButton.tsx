import React, { useState } from 'react';
import { Sparkles, Bot, MessageCircle } from 'lucide-react';
import { useShopping } from '../../context/ShoppingContext';

export const FloatingAIButton: React.FC = () => {
  const { openAdvisor, isAdvisorOpen } = useShopping();
  const [isHovered, setIsHovered] = useState(false);

  // If the advisor modal is already open, hide the floating button
  if (isAdvisorOpen) return null;

  return (
    <div
      className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-50 flex items-center justify-end pointer-events-auto"
      style={{ willChange: 'transform' }}
    >
      {/* Floating Corner Button */}
      <button
        type="button"
        onClick={() => openAdvisor()}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        aria-label="Open AI Craft & Motif Consultant"
        className="group relative flex items-center gap-2.5 px-4 py-3 sm:py-3.5 bg-gradient-to-r from-rose-500 via-rose-600 to-amber-500 text-white rounded-full shadow-2xl hover:shadow-rose-500/40 hover:scale-105 active:scale-95 transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-rose-500 animate-floating hover:animate-none"
      >
        {/* Soft breathing ambient halo glow behind the button */}
        <span
          className="absolute inset-0 rounded-full bg-gradient-to-r from-rose-500 to-amber-400 opacity-50 blur-lg group-hover:opacity-85 transition-opacity -z-10 pointer-events-none"
          aria-hidden="true"
        />

        {/* Live status pulse badge on the corner */}
        <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-amber-400 border-2 border-white dark:border-[#121013]" />
        </span>

        {/* Shimmering icon circle */}
        <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/20 backdrop-blur-xs flex items-center justify-center shrink-0 group-hover:rotate-12 transition-transform shadow-xs">
          <Sparkles className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-amber-200" aria-hidden="true" />
        </div>

        {/* Craft Consultant Label */}
        <div className="flex flex-col text-left">
          <div className="flex items-center gap-1.5">
            <span className="text-xs sm:text-sm font-bold tracking-tight leading-none text-white drop-shadow-xs">
              Craft Consultant
            </span>
            <span className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded bg-black/25 text-amber-200 border border-white/20 uppercase tracking-wider leading-none">
              AI
            </span>
          </div>
          <span className="text-[10px] text-rose-100 font-normal leading-tight mt-1 hidden sm:block">
            Ask motif, fabric & stitch advice
          </span>
        </div>
      </button>
    </div>
  );
};
