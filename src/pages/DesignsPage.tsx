import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, SlidersHorizontal, Info, Heart, Sparkles, X } from 'lucide-react';
import { SAMPLE_DESIGNS } from '../data/designsData';
import { DesignCard } from '../components/common/DesignCard';
import { useShopping } from '../context/ShoppingContext';
import { GarmentCategory } from '../types';

export const DesignsPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { favourites, openAdvisor } = useShopping();

  // Read URL search params if present
  const initialCategory = (searchParams.get('category') as GarmentCategory) || 'all';
  const initialFilter = searchParams.get('filter') || '';
  const initialQuery = searchParams.get('q') || '';

  const [activeCategory, setActiveCategory] = useState<GarmentCategory>(initialCategory);
  const [showFavouritesOnly, setShowFavouritesOnly] = useState<boolean>(initialFilter === 'favourites');
  const [searchQuery, setSearchQuery] = useState<string>(initialQuery);
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'name'>('featured');

  useEffect(() => {
    const filterParam = searchParams.get('filter');
    if (filterParam === 'favourites') {
      setShowFavouritesOnly(true);
    }
    const qParam = searchParams.get('q');
    if (qParam) {
      setSearchQuery(qParam);
    }
  }, [searchParams]);

  // Filter & Sort Logic
  const filteredDesigns = useMemo(() => {
    return SAMPLE_DESIGNS.filter((design) => {
      // Favourites filter
      if (showFavouritesOnly && !favourites.includes(design.id)) {
        return false;
      }

      // Category filter
      if (activeCategory !== 'all' && design.category !== activeCategory) {
        return false;
      }

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesTitle = design.title.toLowerCase().includes(q);
        const matchesDesc = design.description.toLowerCase().includes(q);
        const matchesGarment = design.garmentType.toLowerCase().includes(q);
        const matchesTags = design.tags.some((t) => t.toLowerCase().includes(q));
        const matchesStitches = design.stitchTypes.some((s) => s.toLowerCase().includes(q));
        if (!matchesTitle && !matchesDesc && !matchesGarment && !matchesTags && !matchesStitches) {
          return false;
        }
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.priceRangeINR.min - b.priceRangeINR.min;
      if (sortBy === 'price-desc') return b.priceRangeINR.min - a.priceRangeINR.min;
      if (sortBy === 'name') return a.title.localeCompare(b.title);
      return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    });
  }, [activeCategory, showFavouritesOnly, searchQuery, sortBy, favourites]);

  const clearAllFilters = () => {
    setActiveCategory('all');
    setShowFavouritesOnly(false);
    setSearchQuery('');
    setSortBy('featured');
    setSearchParams({});
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-8">
      {/* Header & Philosophy */}
      <div className="max-w-3xl space-y-3">
        <span className="text-xs font-semibold uppercase tracking-wider text-rose-600 dark:text-rose-400">
          Artisan Portfolio
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900 dark:text-rose-50">
          Indian Embroidery Designs & Needlework
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
          Explore our handcrafted repertoire for women’s kurti yokes, sarees, bridal blouses, and children’s traditional wear. Click any design to inspect stitch techniques or add it to your Quote Basket.
        </p>
      </div>

      {/* Illustrative Price Disclaimer Callout */}
      <div className="p-4 rounded-xl bg-rose-50/70 dark:bg-rose-950/30 border border-rose-100 dark:border-rose-900/60 flex items-start gap-3 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
        <Info className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" aria-hidden="true" />
        <div className="space-y-1">
          <p className="font-semibold text-rose-900 dark:text-rose-200">
            Important Note on Sample Pricing:
          </p>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            All listed prices are illustrative starting ranges based on typical stitch areas. Final quotes depend on your exact garment fabric (silks, organza, cotton), motif scale, thread types (resham silk vs. metallic zari), and custom tailoring requirements.
          </p>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="space-y-4 p-4 sm:p-5 bg-white dark:bg-[#181318] rounded-2xl border border-rose-100 dark:border-rose-950/70 shadow-xs">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          {/* Search Input */}
          <div className="relative flex-1 max-w-md">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by motif, fabric, or stitch (e.g., peacock, kasuti, zari)..."
              aria-label="Search designs"
              className="w-full pl-9 pr-8 py-2 text-xs sm:text-sm bg-rose-50/50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500 text-slate-900 dark:text-rose-100 placeholder:text-slate-400"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" aria-hidden="true" />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                aria-label="Clear search text"
                className="absolute right-2.5 top-2 p-0.5 text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" aria-hidden="true" />
              </button>
            )}
          </div>

          {/* Sorting Control */}
          <div className="flex items-center gap-2 self-end md:self-auto">
            <label htmlFor="design-sort" className="text-xs font-medium text-slate-600 dark:text-slate-400 whitespace-nowrap">
              Sort by:
            </label>
            <select
              id="design-sort"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="text-xs bg-rose-50/50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900 rounded-lg px-2.5 py-1.5 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-rose-500"
            >
              <option value="featured">Curated Order</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="name">Alphabetical</option>
            </select>
          </div>
        </div>

        {/* Functional Category Filter Buttons */}
        <div className="pt-2 flex flex-wrap items-center gap-2 border-t border-rose-100/60 dark:border-rose-950/40 text-xs">
          <button
            type="button"
            onClick={() => {
              setActiveCategory('all');
              setShowFavouritesOnly(false);
            }}
            className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
              activeCategory === 'all' && !showFavouritesOnly
                ? 'bg-rose-500 text-white shadow-2xs'
                : 'bg-rose-50 dark:bg-rose-950/40 text-slate-700 dark:text-slate-300 hover:bg-rose-100'
            }`}
          >
            All Designs ({SAMPLE_DESIGNS.length})
          </button>

          <button
            type="button"
            onClick={() => {
              setActiveCategory('womens');
              setShowFavouritesOnly(false);
            }}
            className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
              activeCategory === 'womens' && !showFavouritesOnly
                ? 'bg-rose-500 text-white shadow-2xs'
                : 'bg-rose-50 dark:bg-rose-950/40 text-slate-700 dark:text-slate-300 hover:bg-rose-100'
            }`}
          >
            Women’s Clothing
          </button>

          <button
            type="button"
            onClick={() => {
              setActiveCategory('childrens');
              setShowFavouritesOnly(false);
            }}
            className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
              activeCategory === 'childrens' && !showFavouritesOnly
                ? 'bg-rose-500 text-white shadow-2xs'
                : 'bg-rose-50 dark:bg-rose-950/40 text-slate-700 dark:text-slate-300 hover:bg-rose-100'
            }`}
          >
            Children’s Clothing
          </button>

          <button
            type="button"
            onClick={() => {
              setActiveCategory('festive');
              setShowFavouritesOnly(false);
            }}
            className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
              activeCategory === 'festive' && !showFavouritesOnly
                ? 'bg-rose-500 text-white shadow-2xs'
                : 'bg-rose-50 dark:bg-rose-950/40 text-slate-700 dark:text-slate-300 hover:bg-rose-100'
            }`}
          >
            Festive & Bridal
          </button>

          <button
            type="button"
            onClick={() => setShowFavouritesOnly(!showFavouritesOnly)}
            className={`px-3 py-1.5 rounded-lg font-medium transition-colors flex items-center gap-1.5 ${
              showFavouritesOnly
                ? 'bg-rose-500 text-white shadow-2xs'
                : 'bg-rose-50 dark:bg-rose-950/40 text-slate-700 dark:text-slate-300 hover:bg-rose-100'
            }`}
          >
            <Heart className={`w-3.5 h-3.5 ${showFavouritesOnly ? 'fill-white' : 'fill-rose-500 text-rose-500'}`} aria-hidden="true" />
            <span>Saved Favourites ({favourites.length})</span>
          </button>

          {(searchQuery || activeCategory !== 'all' || showFavouritesOnly) && (
            <button
              type="button"
              onClick={clearAllFilters}
              className="text-xs text-rose-600 dark:text-rose-400 hover:underline ml-auto"
            >
              Reset Filters
            </button>
          )}
        </div>
      </div>

      {/* Design Cards Grid */}
      {filteredDesigns.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredDesigns.map((design) => (
            <DesignCard key={design.id} design={design} />
          ))}
        </div>
      ) : (
        /* Empty Results State */
        <div className="py-16 text-center space-y-4 bg-white dark:bg-[#181318] rounded-2xl border border-rose-100 dark:border-rose-950 p-8">
          <Search className="w-12 h-12 text-rose-300 dark:text-rose-800 mx-auto" aria-hidden="true" />
          <h2 className="font-serif text-2xl font-bold text-slate-800 dark:text-slate-200">
            No designs match your criteria
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto">
            {showFavouritesOnly
              ? 'You have not saved any designs to favourites yet. Click the heart icon on any design to bookmark it!'
              : `We couldn't find any designs matching "${searchQuery}". Try searching for simpler terms like "kurti", "peacock", or "sleeve".`}
          </p>
          <div className="pt-2 flex justify-center gap-3">
            <button
              type="button"
              onClick={clearAllFilters}
              className="px-4 py-2 bg-rose-500 text-white rounded-lg text-xs font-semibold hover:bg-rose-600"
            >
              Clear Filters
            </button>
            <button
              type="button"
              onClick={() => openAdvisor()}
              className="px-4 py-2 border border-amber-300 dark:border-amber-800 text-amber-900 dark:text-amber-200 bg-amber-50 dark:bg-amber-950/40 rounded-lg text-xs font-semibold flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-500" aria-hidden="true" />
              <span>Ask AI Consultant for Motif Ideas</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
