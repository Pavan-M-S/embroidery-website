import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, Search, Heart, ShoppingBag, Sun, Moon, Sparkles, X } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useShopping } from '../../context/ShoppingContext';
import { NavigationDrawer } from './NavigationDrawer';

export const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const { isDark, toggleTheme } = useTheme();
  const { favouriteCount, basketCount, openBasket, searchQuery, setSearchQuery } = useShopping();
  const navigate = useNavigate();

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/designs?q=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchExpanded(false);
    }
  };

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-white/95 dark:bg-[#121013]/95 backdrop-blur-md border-b border-rose-100 dark:border-rose-950/80 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-4">
          {/* Brand Wordmark Zone */}
          <Link
            to="/"
            className="flex items-center gap-3 group focus-visible:outline-rose-500 rounded-lg p-1"
            aria-label="Spandana Embroidery - Return to homepage"
          >
            {/* Needle & Thread Decorative Motif */}
            <div className="w-9 h-9 rounded-full bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-800 flex items-center justify-center text-rose-500 dark:text-rose-400 group-hover:scale-105 transition-transform shrink-0 shadow-xs">
              <svg
                viewBox="0 0 24 24"
                className="w-5 h-5 stroke-current fill-none stroke-[1.75]"
                aria-hidden="true"
              >
                {/* Needle outline */}
                <path d="M19 5l-7 7m0 0l-2 2a2.8 2.8 0 01-4-4l2-2 7-7a2 2 0 012.8 0l1.2 1.2a2 2 0 010 2.8z" />
                {/* Curved stitch thread */}
                <path d="M7 17c-2 2-3 3-5 3 0-2 1-3 3-5" strokeDasharray="2 2" />
              </svg>
            </div>

            <div>
              <span className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-rose-50 block leading-tight">
                Spandana Embroidery
              </span>
              <span className="text-[11px] tracking-wide text-rose-600 dark:text-rose-400 font-medium block leading-none">
                Quality embroidery at affordable prices
              </span>
            </div>
          </Link>

          {/* Controls Zone */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* Expandable Search Input / Button */}
            {isSearchExpanded ? (
              <form onSubmit={handleSearchSubmit} className="relative flex items-center animate-fade-in">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search kurti, peacock, kasuti..."
                  autoFocus
                  aria-label="Search portfolio designs"
                  className="w-48 sm:w-64 pl-9 pr-8 py-1.5 text-xs sm:text-sm bg-rose-50/70 dark:bg-rose-950/40 text-slate-900 dark:text-rose-100 placeholder:text-slate-400 border border-rose-200 dark:border-rose-900 rounded-full focus:outline-none focus:ring-2 focus:ring-rose-500"
                />
                <Search className="w-4 h-4 text-slate-400 absolute left-3 pointer-events-none" aria-hidden="true" />
                <button
                  type="button"
                  onClick={() => setIsSearchExpanded(false)}
                  aria-label="Close search input"
                  className="absolute right-2 p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                >
                  <X className="w-3.5 h-3.5" aria-hidden="true" />
                </button>
              </form>
            ) : (
              <button
                type="button"
                onClick={() => setIsSearchExpanded(true)}
                aria-label="Open design search bar"
                className="p-2 sm:p-2.5 text-slate-600 hover:text-rose-600 dark:text-slate-300 dark:hover:text-rose-300 rounded-full hover:bg-rose-50 dark:hover:bg-rose-950/50 transition-colors focus-visible:outline-rose-500"
              >
                <Search className="w-5 h-5" aria-hidden="true" />
              </button>
            )}

            {/* Favourites Button */}
            <Link
              to="/designs?filter=favourites"
              aria-label={`View saved favourites (${favouriteCount} saved)`}
              className="relative p-2 sm:p-2.5 text-slate-600 hover:text-rose-600 dark:text-slate-300 dark:hover:text-rose-300 rounded-full hover:bg-rose-50 dark:hover:bg-rose-950/50 transition-colors focus-visible:outline-rose-500"
            >
              <Heart
                className={`w-5 h-5 transition-colors ${
                  favouriteCount > 0 ? 'fill-rose-500 text-rose-500' : ''
                }`}
                aria-hidden="true"
              />
              {favouriteCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-rose-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center font-mono">
                  {favouriteCount}
                </span>
              )}
            </Link>

            {/* Quote Basket / Cart Button */}
            <button
              type="button"
              onClick={openBasket}
              aria-label={`Open quote basket (${basketCount} items)`}
              className="relative p-2 sm:p-2.5 text-slate-600 hover:text-rose-600 dark:text-slate-300 dark:hover:text-rose-300 rounded-full hover:bg-rose-50 dark:hover:bg-rose-950/50 transition-colors focus-visible:outline-rose-500"
            >
              <ShoppingBag className="w-5 h-5" aria-hidden="true" />
              {basketCount > 0 && (
                <span className="absolute top-1 right-1 w-4.5 h-4.5 bg-amber-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center font-mono animate-pulse">
                  {basketCount}
                </span>
              )}
            </button>

            {/* Dark / Light Theme Toggle */}
            <button
              type="button"
              onClick={toggleTheme}
              aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
              className="p-2 sm:p-2.5 text-slate-600 hover:text-rose-600 dark:text-slate-300 dark:hover:text-rose-300 rounded-full hover:bg-rose-50 dark:hover:bg-rose-950/50 transition-colors focus-visible:outline-rose-500"
            >
              {isDark ? (
                <Sun className="w-5 h-5 text-amber-300" aria-hidden="true" />
              ) : (
                <Moon className="w-5 h-5 text-slate-600" aria-hidden="true" />
              )}
            </button>

            {/* Hamburger Menu as the ONLY Primary Navigation Control */}
            <button
              type="button"
              onClick={() => setIsMenuOpen(true)}
              aria-expanded={isMenuOpen}
              aria-label="Open main navigation menu"
              className="flex items-center gap-2 px-3 py-2 bg-rose-500 hover:bg-rose-600 text-white rounded-lg shadow-xs transition-all font-medium text-xs sm:text-sm focus-visible:outline-rose-500 active:scale-95 ml-1"
            >
              <Menu className="w-4 h-4 sm:w-5 sm:h-5" aria-hidden="true" />
              <span className="hidden sm:inline font-medium">Menu</span>
            </button>
          </div>
        </div>
      </header>

      {/* Primary Navigation Drawer Modal */}
      <NavigationDrawer isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </>
  );
};
