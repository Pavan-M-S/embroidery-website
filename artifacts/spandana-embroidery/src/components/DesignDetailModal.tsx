import React, { useEffect, useRef } from 'react';
import { X, Heart, Plus, Check, Sparkles, MessageCircle, Info } from 'lucide-react';
import { useShopping } from '../../context/ShoppingContext';

export const DesignDetailModal: React.FC = () => {
  const {
    activeDesignDetail,
    closeDesignDetail,
    isFavourite,
    toggleFavourite,
    addToBasket,
    isItemInBasket,
    openAdvisor,
  } = useShopping();

  const closeBtnRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (!activeDesignDetail) return;

    closeBtnRef.current?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeDesignDetail();
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeDesignDetail, closeDesignDetail]);

  if (!activeDesignDetail) return null;

  const design = activeDesignDetail;
  const isFav = isFavourite(design.id);
  const inBasket = isItemInBasket(design.id);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="design-detail-title"
      className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 sm:p-6"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity"
        onClick={closeDesignDetail}
        aria-hidden="true"
      />

      {/* Modal Dialog Card */}
      <div className="relative w-full max-w-2xl bg-white dark:bg-[#181318] rounded-2xl border border-rose-100 dark:border-rose-950 shadow-2xl overflow-hidden z-10 animate-fade-in my-8">
        {/* Header Bar */}
        <div className="p-4 sm:p-5 border-b border-rose-100 dark:border-rose-950/60 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-rose-600 dark:text-rose-400 font-semibold tracking-wide">
            <span>{design.garmentType}</span>
            <span aria-hidden="true">·</span>
            <span>{design.complexity}</span>
          </div>

          <button
            ref={closeBtnRef}
            type="button"
            onClick={closeDesignDetail}
            aria-label="Close design specifications"
            className="p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-rose-200 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-950/50"
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 items-center">
            {/* Image */}
            <div className="relative aspect-4/3 rounded-xl overflow-hidden bg-rose-50 dark:bg-rose-950/40 border border-rose-100 dark:border-rose-900">
              <img
                src={design.image}
                alt={design.alt}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.currentTarget as HTMLElement).style.display = 'none';
                }}
              />
            </div>

            {/* Design Info */}
            <div className="space-y-3">
              <h3 id="design-detail-title" className="font-serif text-2xl font-bold text-slate-900 dark:text-rose-50">
                {design.title}
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {design.description}
              </p>

              {/* Price Banner */}
              <div className="p-3 bg-rose-50/70 dark:bg-rose-950/30 rounded-xl border border-rose-100 dark:border-rose-900">
                <span className="text-xs text-slate-500 dark:text-slate-400 block">
                  Illustrative Starting Range
                </span>
                <span className="font-mono text-xl font-bold text-slate-900 dark:text-rose-100 tabular-nums">
                  ₹{design.priceRangeINR.min.toLocaleString()} – ₹{design.priceRangeINR.max.toLocaleString()}
                </span>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 flex items-start gap-1">
                  <Info className="w-3.5 h-3.5 text-rose-500 shrink-0 mt-0.5" aria-hidden="true" />
                  <span>Final pricing is confirmed upon assessing your fabric, placement dimensions & custom stitch density.</span>
                </p>
              </div>
            </div>
          </div>

          {/* Stitch Techniques Breakdown */}
          <div className="space-y-2 pt-2 border-t border-rose-100 dark:border-rose-950/60">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300">
              Employed Needlework Techniques
            </h4>
            <div className="flex flex-wrap gap-2 text-xs text-slate-600 dark:text-slate-300">
              {design.stitchTypes.map((st) => (
                <span key={st} className="px-2.5 py-1 bg-rose-50 dark:bg-rose-950/50 rounded-md border border-rose-100 dark:border-rose-900/60 font-medium">
                  {st}
                </span>
              ))}
            </div>
          </div>

          {/* Tags */}
          <div className="space-y-1.5">
            <span className="text-xs text-slate-500 dark:text-slate-400">Design Tags:</span>
            <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400">
              {design.tags.map((tag, idx) => (
                <span key={tag}>
                  {tag}
                  {idx < design.tags.length - 1 && <span className="ml-2 text-slate-300" aria-hidden="true">·</span>}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Actions Footer */}
        <div className="p-4 sm:p-5 bg-rose-50/50 dark:bg-rose-950/20 border-t border-rose-100 dark:border-rose-950/60 flex flex-wrap items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => toggleFavourite(design.id)}
            aria-label={isFav ? 'Remove from favourites' : 'Save to favourites'}
            className="px-3.5 py-2 rounded-lg border border-rose-200 dark:border-rose-900 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-rose-100 dark:hover:bg-rose-950/60 flex items-center gap-2"
          >
            <Heart className={`w-4 h-4 ${isFav ? 'fill-rose-500 text-rose-500' : ''}`} aria-hidden="true" />
            <span>{isFav ? 'Favorited' : 'Favorite'}</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                closeDesignDetail();
                openAdvisor(`I have a question about the ${design.title} design (${design.garmentType}). Can this be adapted to my fabric?`);
              }}
              className="px-3.5 py-2 rounded-lg border border-amber-300 dark:border-amber-800 text-amber-900 dark:text-amber-200 bg-amber-50 dark:bg-amber-950/40 hover:bg-amber-100 text-xs font-semibold flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-500" aria-hidden="true" />
              <span>Ask AI Consultant</span>
            </button>

            <button
              type="button"
              onClick={() => {
                addToBasket(design);
                closeDesignDetail();
              }}
              className="px-4 py-2 rounded-lg bg-rose-500 hover:bg-rose-600 text-white text-xs font-semibold flex items-center gap-1.5 shadow-xs"
            >
              <Plus className="w-4 h-4" aria-hidden="true" />
              <span>{inBasket ? 'In Basket (Add Another)' : 'Add to Quote Basket'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
