import React, { useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { X, Sparkles, Phone, MessageSquare, Compass, ArrowRight, Sun, Moon } from 'lucide-react';
import { useShopping } from '../../context/ShoppingContext';
import { useTheme } from '../../context/ThemeContext';
import { BUSINESS_CONFIG } from '../../data/designsData';

interface NavigationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NavigationDrawer: React.FC<NavigationDrawerProps> = ({ isOpen, onClose }) => {
  const drawerRef = useRef<HTMLDivElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const { openAdvisor } = useShopping();
  const { isDark, toggleTheme } = useTheme();

  // Navigation Items (All 8 Distinct Pages)
  const navLinks = [
    { to: '/', label: 'Home', desc: 'Welcome, craft philosophy & featured work' },
    { to: '/designs', label: 'Designs / Portfolio', desc: 'Browse curated women’s & children’s embroidery' },
    { to: '/pricing', label: 'Pricing & Tiers', desc: 'Illustrative starting ranges & cost factors' },
    { to: '/custom-design', label: 'Custom Design', desc: 'Step-by-step request for personalized needlework' },
    { to: '/membership', label: 'Membership', desc: 'Repeat-customer craft benefits & loyalty concept' },
    { to: '/free-resources', label: 'Free Resources', desc: 'Garment prep guidance, checklists & care audio' },
    { to: '/track-order', label: 'Track Order', desc: 'Check current progress with your Quote ID' },
    { to: '/account', label: 'Account', desc: 'Customer sign-in & registration portal (demo)' },
    { to: '/contact', label: 'Contact', desc: 'Reach our home workshop, inquiries & locations' },
  ];

  // Accessibility: Focus trap & Escape key listener
  useEffect(() => {
    if (!isOpen) return;

    // Focus the close button when opened
    const timer = setTimeout(() => {
      closeButtonRef.current?.focus();
    }, 50);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }

      // Trap focus inside drawer
      if (e.key === 'Tab' && drawerRef.current) {
        const focusableElements = drawerRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement?.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement?.focus();
          }
        }
      }
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="nav-drawer-title"
      className="fixed inset-0 z-50 overflow-hidden"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer Panel */}
      <div
        ref={drawerRef}
        className="fixed inset-y-0 right-0 max-w-full flex pl-10 sm:pl-16"
      >
        <div className="w-screen max-w-md bg-white dark:bg-[#181318] border-l border-rose-100 dark:border-rose-950 shadow-2xl flex flex-col justify-between overflow-y-auto">
          {/* Drawer Header */}
          <div className="p-6 border-b border-rose-100 dark:border-rose-950/60 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500" aria-hidden="true" />
              <div>
                <h2 id="nav-drawer-title" className="font-serif text-xl font-bold text-slate-900 dark:text-rose-100">
                  Spandana Menu
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {BUSINESS_CONFIG.tagline}
                </p>
              </div>
            </div>

            <button
              ref={closeButtonRef}
              type="button"
              onClick={onClose}
              aria-label="Close navigation menu"
              className="p-2 text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-rose-100 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-950/50 transition-colors focus-visible:outline-rose-500"
            >
              <X className="w-5 h-5" aria-hidden="true" />
            </button>
          </div>

          {/* Navigation Links List */}
          <nav className="p-6 space-y-1.5 flex-1" aria-label="Main Navigation">
            {navLinks.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={onClose}
                className={({ isActive }) =>
                  `group flex items-start justify-between p-3 rounded-xl transition-all ${
                    isActive
                      ? 'bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-300 font-semibold'
                      : 'text-slate-700 dark:text-slate-300 hover:bg-rose-50/60 dark:hover:bg-rose-950/20 hover:text-rose-600 dark:hover:text-rose-300'
                  }`
                }
              >
                <div>
                  <div className="text-base flex items-center gap-2">
                    <span>{item.label}</span>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 font-normal">
                    {item.desc}
                  </p>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-rose-500 group-hover:translate-x-1 transition-all mt-1 shrink-0" aria-hidden="true" />
              </NavLink>
            ))}

            {/* AI Craft Advisor Direct Trigger */}
            <div className="pt-4 mt-2 border-t border-rose-100 dark:border-rose-950/60">
              <button
                type="button"
                onClick={() => {
                  onClose();
                  openAdvisor();
                }}
                className="w-full flex items-center gap-3 p-3.5 rounded-xl bg-gradient-to-r from-rose-500 to-amber-500 text-white font-medium hover:brightness-105 shadow-sm transition-all text-left"
              >
                <Sparkles className="w-5 h-5 shrink-0 text-amber-200" aria-hidden="true" />
                <div className="flex-1">
                  <span className="text-sm font-semibold block">Craft Consultant AI</span>
                  <span className="text-xs text-rose-100 font-normal">
                    Ask about motif ideas, fabrics & stitch care
                  </span>
                </div>
              </button>
            </div>

            {/* Appearance Theme Switcher in Menu */}
            <div className="pt-2">
              <button
                type="button"
                onClick={toggleTheme}
                aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
                className="w-full flex items-center justify-between p-3 rounded-xl border border-rose-200 dark:border-rose-900 bg-rose-50/50 dark:bg-rose-950/30 text-slate-700 dark:text-rose-200 hover:bg-rose-100/60 dark:hover:bg-rose-950/60 transition-colors text-xs font-semibold"
              >
                <div className="flex items-center gap-2.5">
                  {isDark ? (
                    <Sun className="w-4 h-4 text-amber-300" aria-hidden="true" />
                  ) : (
                    <Moon className="w-4 h-4 text-slate-600" aria-hidden="true" />
                  )}
                  <span>Appearance: {isDark ? 'Dark Theme' : 'Light Theme'}</span>
                </div>
                <span className="text-[11px] font-normal text-rose-600 dark:text-rose-400">
                  Switch to {isDark ? 'Light' : 'Dark'}
                </span>
              </button>
            </div>
          </nav>

          {/* Drawer Footer / Quick Info */}
          <div className="p-6 bg-rose-50/50 dark:bg-rose-950/20 border-t border-rose-100 dark:border-rose-950/60 text-xs text-slate-600 dark:text-slate-400 space-y-2">
            <div className="flex items-center gap-2">
              <Phone className="w-3.5 h-3.5 text-rose-500" aria-hidden="true" />
              <span>Inquiries: {BUSINESS_CONFIG.phonePlaceholder}</span>
            </div>
            <div className="flex items-center gap-2">
              <MessageSquare className="w-3.5 h-3.5 text-rose-500" aria-hidden="true" />
              <span>WhatsApp: {BUSINESS_CONFIG.whatsappPlaceholder}</span>
            </div>
            <p className="text-[11px] text-slate-400 dark:text-slate-500 pt-1">
              Note: Contact numbers are editable placeholders for the craft owner.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
