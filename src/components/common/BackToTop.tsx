import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

export const BackToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 320) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  if (!isVisible) return null;

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Back to top of page"
      className="fixed bottom-6 left-6 z-40 p-3 bg-white dark:bg-[#1C161C] text-slate-700 dark:text-rose-200 border border-rose-200 dark:border-rose-900 rounded-full shadow-lg hover:bg-rose-50 dark:hover:bg-rose-950 hover:text-rose-600 transition-all focus-visible:outline-rose-500 animate-fade-in"
    >
      <ArrowUp className="w-5 h-5" aria-hidden="true" />
    </button>
  );
};
