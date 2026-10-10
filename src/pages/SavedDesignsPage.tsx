import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Heart,
  Trash2,
  Plus,
  Eye,
  Check,
  ShoppingBag,
  Sparkles,
  ArrowRight,
  Info,
  Layers,
} from 'lucide-react';
import { useShopping } from '../context/ShoppingContext';
import { DesignItem } from '../types';

export const SavedDesignsPage: React.FC = () => {
  const {
    favourites,
    toggleFavourite,
    favouriteDesigns,
    addToBasket,
    isItemInBasket,
    openDesignDetail,
    openAdvisor,
    openBasket,
  } = useShopping();

  const [activeCategoryFilter, setActiveCategoryFilter] = useState<'all' | 'womens' | 'childrens' | 'festive'>('all');

  // Filter saved designs if user has multiple categories saved
  const displayedDesigns = favouriteDesigns.filter((d) => {
    if (activeCategoryFilter === 'all') return true;
    return d.category === activeCategoryFilter;
  });

  const handleAddAllToBasket = () => {
    favouriteDesigns.forEach((design) => {
      addToBasket(design);
    });
  };

  const handleClearAllFavourites = () => {
    // Toggling all removes them from favourites
    [...favourites].forEach((id) => {
      toggleFavourite(id);
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-10">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-rose-100 dark:border-rose-950 pb-6">
        <div className="space-y-2 max-w-2xl">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-rose-600 dark:text-rose-400">
            <Heart className="w-4 h-4 fill-rose-500 text-rose-500" aria-hidden="true" />
            <span>Personal Shortlist</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900 dark:text-rose-50">
            My Saved Designs
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            Review your bookmarked embroidery motifs, compare starting prices, or transfer them to your Quote Basket for a consolidated estimate.
          </p>
        </div>

        {/* Global Batch Actions */}
        {favouriteDesigns.length > 0 && (
          <div className="flex items-center gap-2.5 self-start md:self-auto">
            <button
              type="button"
              onClick={handleAddAllToBasket}
              className="px-4 py-2 bg-rose-500 hover:bg-rose-600 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-xs transition-colors"
            >
              <Plus className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Add All to Quote Basket</span>
            </button>

            <button
              type="button"
              onClick={handleClearAllFavourites}
              className="px-3.5 py-2 bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 hover:bg-rose-100 border border-rose-200 dark:border-rose-900 rounded-xl text-xs font-medium transition-colors"
            >
              Clear All ({favouriteDesigns.length})
            </button>
          </div>
        )}
      </div>

      {/* Main Content Area */}
      {favouriteDesigns.length === 0 ? (
        /* Empty State */
        <div className="py-16 sm:py-24 text-center space-y-5 bg-white dark:bg-[#181318] rounded-3xl border border-rose-100 dark:border-rose-950 p-8 shadow-xs max-w-2xl mx-auto animate-fade-in">
          <div className="w-16 h-16 rounded-full bg-rose-50 dark:bg-rose-950/60 text-rose-400 dark:text-rose-500 flex items-center justify-center mx-auto border border-rose-100 dark:border-rose-900">
            <Heart className="w-8 h-8" aria-hidden="true" />
          </div>

          <div className="space-y-1.5">
            <h2 className="font-serif text-2xl font-bold text-slate-900 dark:text-rose-100">
              No saved designs yet
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto leading-relaxed">
              Whenever you see an embroidery motif, neckline, or children’s dress you like, tap the heart icon to save it here for easy review and quoting.
            </p>
          </div>

          <div className="pt-3 flex flex-wrap items-center justify-center gap-3">
            <Link
              to="/designs"
              className="px-6 py-3 bg-rose-500 hover:bg-rose-600 text-white rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2 shadow-xs transition-colors"
            >
              <span>Explore Designs Portfolio</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>

            <button
              type="button"
              onClick={() => openAdvisor()}
              className="px-5 py-3 border border-amber-300 dark:border-amber-800 text-amber-900 dark:text-amber-200 bg-amber-50 dark:bg-amber-950/40 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-amber-500" aria-hidden="true" />
              <span>Ask AI Consultant for Ideas</span>
            </button>
          </div>
        </div>
      ) : (
        /* Saved Items List View */
        <div className="space-y-6">
          {/* Quick Category Filter Tabs */}
          <div className="flex flex-wrap items-center justify-between gap-3 bg-white dark:bg-[#181318] p-3.5 rounded-2xl border border-rose-100 dark:border-rose-950">
            <div className="flex items-center gap-1.5 text-xs">
              <button
                type="button"
                onClick={() => setActiveCategoryFilter('all')}
                className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
                  activeCategoryFilter === 'all'
                    ? 'bg-rose-500 text-white shadow-2xs'
                    : 'bg-rose-50 dark:bg-rose-950/40 text-slate-700 dark:text-slate-300 hover:bg-rose-100'
                }`}
              >
                All Saved ({favouriteDesigns.length})
              </button>

              <button
                type="button"
                onClick={() => setActiveCategoryFilter('womens')}
                className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
                  activeCategoryFilter === 'womens'
                    ? 'bg-rose-500 text-white shadow-2xs'
                    : 'bg-rose-50 dark:bg-rose-950/40 text-slate-700 dark:text-slate-300 hover:bg-rose-100'
                }`}
              >
                Women’s
              </button>

              <button
                type="button"
                onClick={() => setActiveCategoryFilter('childrens')}
                className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
                  activeCategoryFilter === 'childrens'
                    ? 'bg-rose-500 text-white shadow-2xs'
                    : 'bg-rose-50 dark:bg-rose-950/40 text-slate-700 dark:text-slate-300 hover:bg-rose-100'
                }`}
              >
                Children’s
              </button>

              <button
                type="button"
                onClick={() => setActiveCategoryFilter('festive')}
                className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
                  activeCategoryFilter === 'festive'
                    ? 'bg-rose-500 text-white shadow-2xs'
                    : 'bg-rose-50 dark:bg-rose-950/40 text-slate-700 dark:text-slate-300 hover:bg-rose-100'
                }`}
              >
                Festive
              </button>
            </div>

            <span className="text-xs text-slate-500 dark:text-slate-400">
              Showing {displayedDesigns.length} of {favouriteDesigns.length} saved
            </span>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayedDesigns.map((design) => {
              const inBasket = isItemInBasket(design.id);

              return (
                <article
                  key={design.id}
                  className="bg-white dark:bg-[#181318] rounded-2xl border border-rose-100 dark:border-rose-950 overflow-hidden shadow-xs flex flex-col justify-between hover:shadow-md transition-all group"
                >
                  {/* Top Image Preview & Remove Button */}
                  <div className="relative aspect-16/10 w-full bg-rose-50 dark:bg-rose-950/30 overflow-hidden">
                    <img
                      src={design.image}
                      alt={design.alt}
                      className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300"
                    />

                    {/* Quick View Button */}
                    <button
                      type="button"
                      onClick={() => openDesignDetail(design)}
                      aria-label={`View design specifications for ${design.title}`}
                      className="absolute bottom-3 left-3 px-2.5 py-1.5 rounded-lg bg-black/60 hover:bg-black/80 backdrop-blur-xs text-white text-xs font-medium flex items-center gap-1.5"
                    >
                      <Eye className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>Specifications</span>
                    </button>

                    {/* Prominent Remove Button */}
                    <button
                      type="button"
                      onClick={() => toggleFavourite(design.id)}
                      aria-label={`Remove ${design.title} from saved designs`}
                      className="absolute top-3 right-3 p-2 rounded-full bg-white/90 dark:bg-slate-900/90 text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/60 shadow-xs transition-colors flex items-center gap-1"
                      title="Remove from saved designs"
                    >
                      <Trash2 className="w-4 h-4" aria-hidden="true" />
                    </button>
                  </div>

                  {/* Body Content */}
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2 text-xs text-rose-600 dark:text-rose-400 font-medium">
                        <span>{design.garmentType}</span>
                        <span aria-hidden="true">·</span>
                        <span>{design.complexity}</span>
                      </div>

                      <h3 className="font-serif text-lg font-bold text-slate-900 dark:text-rose-50 leading-snug">
                        {design.title}
                      </h3>

                      <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">
                        {design.description}
                      </p>
                    </div>

                    {/* Stitch Techniques Chips */}
                    <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600 dark:text-slate-300">
                      {design.stitchTypes.map((st) => (
                        <span
                          key={st}
                          className="px-2 py-0.5 rounded bg-rose-50 dark:bg-rose-950/50 border border-rose-100 dark:border-rose-900/60"
                        >
                          {st}
                        </span>
                      ))}
                    </div>

                    {/* Footer Actions & Price */}
                    <div className="pt-3 border-t border-rose-100 dark:border-rose-950/60 flex items-center justify-between gap-2">
                      <div>
                        <span className="text-[11px] text-slate-400 dark:text-slate-500 block leading-none">
                          Starting range
                        </span>
                        <span className="font-mono text-sm font-bold text-slate-900 dark:text-rose-100 tabular-nums">
                          ₹{design.priceRangeINR.min.toLocaleString()} – ₹{design.priceRangeINR.max.toLocaleString()}
                        </span>
                      </div>

                      <button
                        type="button"
                        onClick={() => addToBasket(design)}
                        className={`px-3 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
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
                            <span>Add to Quote</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          {/* Consolidated Quote CTA Footer */}
          <div className="p-6 sm:p-8 rounded-3xl bg-rose-50/70 dark:bg-rose-950/30 border border-rose-100 dark:border-rose-950 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="space-y-1 text-center sm:text-left">
              <h2 className="font-serif font-bold text-lg text-slate-900 dark:text-rose-100">
                Ready to request an estimate for these pieces?
              </h2>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Move items into your Quote Basket to submit a consolidated inquiry to our home craft workshop.
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <button
                type="button"
                onClick={openBasket}
                className="px-5 py-2.5 rounded-xl bg-white dark:bg-[#181318] text-slate-800 dark:text-rose-100 border border-rose-200 dark:border-rose-900 text-xs font-semibold hover:bg-rose-50 flex items-center gap-1.5"
              >
                <ShoppingBag className="w-3.5 h-3.5 text-rose-500" aria-hidden="true" />
                <span>Open Quote Basket</span>
              </button>

              <Link
                to="/custom-design"
                className="px-5 py-2.5 rounded-xl bg-rose-500 hover:bg-rose-600 text-white text-xs font-semibold transition-colors"
              >
                Request Custom Consultation
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
