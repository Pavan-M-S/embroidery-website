import React, { useState } from 'react';
import { Sparkles, MessageSquareHeart } from 'lucide-react';
export const FloatingAIButton: React.FC<{
  isOpen: boolean;
  onOpen: () => void;
}> = ({ isOpen, onOpen }) => {
  const [isHovered, setIsHovered] = useState(false);

  // If the advisor modal is already open, hide or dim the floating button
  if (isOpen) return null;

  return (
    <div className="fixed bottom-6 right-6 z-40 flex items-center justify-end">
      {/* Floating Action Trigger */}
      <button
        type="button"
        onClick={() => onOpen()}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        aria-label="Open AI Craft & Motif Consultant"
        className="group relative flex items-center gap-2.5 px-4 py-3 sm:py-3.5 bg-gradient-to-r from-rose-500 via-rose-600 to-amber-500 text-white rounded-full shadow-lg hover:shadow-rose-500/30 hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-rose-500"
      >
        {/* Subtle breathing ambient halo */}
        <span
          className="absolute inset-0 rounded-full bg-gradient-to-r from-rose-400 to-amber-400 opacity-40 blur-md group-hover:opacity-75 transition-opacity -z-10 animate-pulse pointer-events-none"
          aria-hidden="true"
        />

        {/* Icon with craft rotation */}
        <div className="w-6 h-6 rounded-full bg-white/20 backdrop-blur-xs flex items-center justify-center shrink-0 group-hover:rotate-12 transition-transform">
          <Sparkles className="w-3.5 h-3.5 text-amber-200" aria-hidden="true" />
        </div>

        {/* Label */}
        <div className="flex flex-col text-left">
          <span className="text-xs sm:text-sm font-bold tracking-tight leading-none flex items-center gap-1.5">
            <span>Craft Consultant</span>
            <span className="text-[10px] font-mono px-1 py-0.2 rounded bg-white/25 text-rose-50 font-medium leading-tight">
              AI
            </span>
          </span>
          <span className="text-[10px] text-rose-100/90 font-normal leading-tight hidden sm:block mt-0.5">
            Ask motif, fabric & stitch advice
          </span>
        </div>
      </button>
    </div>
  );
};
