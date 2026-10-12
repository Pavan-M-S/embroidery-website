import React from "react";
import { motion } from "motion/react";
import { Sparkles } from "lucide-react";

export const FloatingAIButton: React.FC<{
  isOpen: boolean;
  onOpen: () => void;
}> = ({ isOpen, onOpen }) => {
  // If the advisor modal is already open, hide the floating button
  if (isOpen) return null;

  return (
    <div
      className="fixed bottom-6 right-6 flex items-center justify-end pointer-events-auto"
      style={{ zIndex: "var(--z-floating-ai, 300)" }}
    >
      {/* Outer shell (Double-bezel container) */}
      <div className="rounded-[2.2rem] p-1.5 bg-black/5 dark:bg-white/10 backdrop-blur-md shadow-2xl ring-1 ring-black/10 dark:ring-white/15">
        <motion.button
          type="button"
          onClick={() => onOpen()}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
          aria-label="Open AI Craft & Motif Consultant"
          data-testid="button-open-ai-consultant"
          className="group relative flex items-center gap-3.5 pl-5 pr-2 py-2.5 rounded-[calc(2.2rem-0.375rem)] bg-gradient-to-r from-rose-600 via-rose-500 to-amber-600 text-white shadow-[inset_0_1px_1px_rgba(255,255,255,0.3)] transition-shadow duration-300 hover:shadow-rose-500/25 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-rose-500"
        >
          {/* Subtle breathing ambient halo */}
          <span
            className="absolute inset-0 rounded-[calc(2.2rem-0.375rem)] bg-gradient-to-r from-rose-500 to-amber-500 opacity-40 blur-md group-hover:opacity-70 transition-opacity -z-10 pointer-events-none"
            aria-hidden="true"
          />

          {/* Label area with Eyebrow */}
          <div className="flex flex-col text-left">
            <div className="flex items-center gap-1.5">
              <span className="text-xs sm:text-sm font-semibold tracking-tight text-white drop-shadow-xs">
                Craft Consultant
              </span>
              <span className="rounded-full px-1.5 py-0.5 text-[9px] uppercase tracking-wider font-bold bg-white/20 text-rose-50 border border-white/20">
                AI
              </span>
            </div>
            <span className="text-[10px] text-rose-100/90 font-normal leading-tight hidden sm:block mt-0.5">
              Motif, fabric & stitch advice
            </span>
          </div>

          {/* Nested CTA button-in-button icon capsule */}
          <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-xs flex items-center justify-center shrink-0 border border-white/30 group-hover:scale-105 group-hover:rotate-12 transition-transform duration-200">
            <Sparkles className="w-4 h-4 text-amber-200" aria-hidden="true" />
          </div>
        </motion.button>
      </div>
    </div>
  );
};
