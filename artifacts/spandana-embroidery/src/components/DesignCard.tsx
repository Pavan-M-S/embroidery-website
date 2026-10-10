import React, { useState } from 'react';
import { Heart, Plus, Eye, Check } from 'lucide-react';
import { DesignItem } from '../../types';
import { useShopping } from '../../context/ShoppingContext';

interface DesignCardProps {
  design: DesignItem;
}

export const DesignCard: React.FC<DesignCardProps> = ({ design }) => {
  const { isFavourite, toggleFavourite, addToBasket, isItemInBasket, openDesignDetail } = useShopping();
  const [imageError, setImageError] = useState(false);
  const isFav = isFavourite(design.id);
  const inBasket = isItemInBasket(design.id);

  return (
    <article className="group bg-white dark:bg-[#181318] rounded-xl border border-rose-100 dark:border-rose-950/70 overflow-hidden shadow-xs hover:shadow-md hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between">
      {/* Visual Image Slot */}
      <div className="relative aspect-4/3 w-full bg-rose-50 dark:bg-rose-950/30 overflow-hidden">
        {!imageError ? (
          <img
            src={design.image}
            alt={design.alt}
            loading="lazy"
            referrerPolicy="no-referrer"
            onError={() => setImageError(true)}
            className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-300"
          />
        ) : (
          /* Styled SVG Craft Fallback Pattern */
          <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-gradient-to-br from-rose-50 via-rose-100/50 to-orange-50 dark:from-rose-950/50 dark:to-neutral-900 border-b border-rose-100 dark:border-rose-950">
            <svg
              className="w-12 h-12 text-rose-400 dark:text-rose-500 mb-2 stroke-[1.2]"
              viewBox="0 0 48 48"
              fill="none"
              stroke="currentColor"
              aria-hidden="true"
            >
              <circle cx="24" cy="24" r="18" strokeDasharray="3 3" />
              <path d="M24 10v28M10 24h28M14 14l20 20M34 14L14 34" strokeLinecap="round" />
            </svg>
            <span className="font-serif text-sm font-semibold text-rose-900 dark:text-rose-200">
              {design.title}
            </span>
            <span className="text-[11px] text-rose-700/80 dark:text-rose-400/80 mt-0.5">
              Handcrafted Indian Needlework
            </span>
          </div>
        )}

        {/* Floating Quick Action Overlay */}
        <div className="absolute top-3 right-3 flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => toggleFavourite(design.id)}
            aria-label={isFav ? `Remove ${design.title} from saved favourites` : `Save ${design.title} to favourites`}
            className="p-2 rounded-full bg-white/90 dark:bg-slate-900/90 backdrop-blur-xs text-slate-700 dark:text-slate-200 hover:text-rose-500 hover:scale-110 shadow-xs transition-all focus-visible:outline-rose-500"
          >
            <Heart
              className={`w-4 h-4 transition-colors ${isFav ? 'fill-rose-500 text-rose-500' : ''}`}
              aria-hidden="true"
            />
          </button>
        </div>

        {/* Quick View Button on Image hover */}
        <button
          type="button"
          onClick={() => openDesignDetail(design)}
          aria-label={`View design specifications for ${design.title}`}
          className="absolute bottom-3 left-3 px-3 py-1.5 rounded-lg bg-black/60 hover:bg-black/80 backdrop-blur-xs text-white text-xs font-medium flex items-center gap-1.5 opacity-90 group-hover:opacity-100 transition-opacity focus-visible:outline-white"
        >
          <Eye className="w-3.5 h-3.5" aria-hidden="true" />
          <span>Details</span>
        </button>
      </div>

      {/* Card Content & Metadata */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Zero-Pill Clean Metadata */}
          <div className="flex items-center gap-2 text-xs text-rose-600 dark:text-rose-400 font-medium tracking-wide mb-1.5">
            <span>{design.garmentType}</span>
            <span aria-hidden="true" className="text-rose-300 dark:text-rose-700">·</span>
            <span>{design.complexity}</span>
          </div>

          <h3 className="font-serif text-lg font-bold text-slate-900 dark:text-rose-50 leading-snug group-hover:text-rose-600 dark:group-hover:text-rose-400 transition-colors">
            {design.title}
          </h3>

          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 line-clamp-2 mt-1 leading-relaxed">
            {design.description}
          </p>

          {/* Stitch Types Preview */}
          <div className="flex flex-wrap items-center gap-1.5 text-[11px] text-slate-500 dark:text-slate-400 mt-3 pt-3 border-t border-rose-100/60 dark:border-rose-950/40">
            <span className="font-medium text-slate-700 dark:text-slate-300">Stitches:</span>
            {design.stitchTypes.map((stitch, idx) => (
              <span key={stitch}>
                {stitch}
                {idx < design.stitchTypes.length - 1 && <span className="ml-1 text-slate-300 dark:text-slate-600" aria-hidden="true">/</span>}
              </span>
            ))}
          </div>
        </div>

        {/* Pricing & Add to Basket Footer */}
        <div className="mt-4 pt-3 border-t border-rose-100 dark:border-rose-950/60 flex items-center justify-between gap-2">
          <div>
            <span className="text-[11px] text-slate-500 dark:text-slate-400 block leading-none">
              Indicative starting range
            </span>
            <span className="font-mono text-base font-bold text-slate-900 dark:text-rose-100 tabular-nums">
              ₹{design.priceRangeINR.min.toLocaleString()} – ₹{design.priceRangeINR.max.toLocaleString()}
            </span>
          </div>

          <button
            type="button"
            onClick={() => addToBasket(design)}
            aria-label={inBasket ? `Add another ${design.title} to quote basket` : `Add ${design.title} to quote basket`}
            className={`px-3 py-2 text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-all shadow-2xs active:scale-95 ${
              inBasket
                ? 'bg-amber-100 text-amber-900 dark:bg-amber-950/50 dark:text-amber-200 border border-amber-300 dark:border-amber-800'
                : 'bg-rose-500 hover:bg-rose-600 text-white'
            }`}
          >
            {inBasket ? (
              <>
                <Check className="w-3.5 h-3.5" aria-hidden="true" />
                <span>In Basket</span>
              </>
            ) : (
              <>
                <Plus className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Quote Basket</span>
              </>
            )}
          </button>
        </div>
      </div>
    </article>
  );
};
