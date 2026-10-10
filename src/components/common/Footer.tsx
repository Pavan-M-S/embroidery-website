import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Clock, Instagram, MessageCircle, Facebook, Sparkles } from 'lucide-react';
import { BUSINESS_CONFIG } from '../../data/designsData';
import { useShopping } from '../../context/ShoppingContext';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const { openAdvisor } = useShopping();

  return (
    <footer className="bg-white dark:bg-[#0E0C0F] border-t border-rose-100 dark:border-rose-950/80 text-slate-700 dark:text-slate-300 transition-colors pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Col 1: Business Intro & Philosophy */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-800 flex items-center justify-center text-rose-500">
                <span className="font-serif font-bold text-sm">S</span>
              </div>
              <span className="font-serif text-xl font-bold text-slate-900 dark:text-rose-100">
                Spandana Embroidery
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              A home-owned embroidery workshop crafting traditional Indian needlework for women’s and children’s clothing. Every piece is stitched with dedicated care and aesthetic attention.
            </p>
            <div className="text-xs font-serif italic text-rose-600 dark:text-rose-400">
              “{BUSINESS_CONFIG.tagline}”
            </div>
            <div>
              <button
                type="button"
                onClick={() => openAdvisor()}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-50 dark:bg-rose-950/50 text-rose-600 dark:text-rose-300 text-xs font-semibold hover:bg-rose-100 transition-colors"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-500" aria-hidden="true" />
                <span>Craft Consultation AI</span>
              </button>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="space-y-3">
            <h3 className="font-serif text-sm font-bold text-slate-900 dark:text-rose-100 uppercase tracking-wider">
              Explore Our Work
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <Link to="/" className="hover:text-rose-600 dark:hover:text-rose-300 transition-colors">
                  Home & Overview
                </Link>
              </li>
              <li>
                <Link to="/designs" className="hover:text-rose-600 dark:hover:text-rose-300 transition-colors">
                  Designs Portfolio
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="hover:text-rose-600 dark:hover:text-rose-300 transition-colors">
                  Pricing & Tiers
                </Link>
              </li>
              <li>
                <Link to="/custom-design" className="hover:text-rose-600 dark:hover:text-rose-300 transition-colors">
                  Custom Needlework Request
                </Link>
              </li>
              <li>
                <Link to="/free-resources" className="hover:text-rose-600 dark:hover:text-rose-300 transition-colors">
                  Garment Preparation & Fabric Care
                </Link>
              </li>
              <li>
                <Link to="/membership" className="hover:text-rose-600 dark:hover:text-rose-300 transition-colors">
                  Loyalty & Membership Concept
                </Link>
              </li>
              <li>
                <Link to="/track-order" className="hover:text-rose-600 dark:hover:text-rose-300 transition-colors">
                  Track Order Status
                </Link>
              </li>
              <li>
                <Link to="/saved-designs" className="hover:text-rose-600 dark:hover:text-rose-300 transition-colors">
                  My Saved Designs
                </Link>
              </li>
              <li>
                <Link to="/account" className="hover:text-rose-600 dark:hover:text-rose-300 transition-colors">
                  Account Portal (Demo)
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Verifiable Contact Placeholders */}
          <div className="space-y-3">
            <h3 className="font-serif text-sm font-bold text-slate-900 dark:text-rose-100 uppercase tracking-wider">
              Workshop Contact
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Direct communication for fabric handover & custom orders:
            </p>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" aria-hidden="true" />
                <span className="font-mono text-xs">{BUSINESS_CONFIG.phonePlaceholder}</span>
              </li>
              <li className="flex items-start gap-2.5">
                <MessageCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" aria-hidden="true" />
                <span className="font-mono text-xs">WhatsApp: {BUSINESS_CONFIG.whatsappPlaceholder}</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" aria-hidden="true" />
                <span className="font-mono text-xs">{BUSINESS_CONFIG.emailPlaceholder}</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" aria-hidden="true" />
                <span className="text-xs">{BUSINESS_CONFIG.workingHours}</span>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" aria-hidden="true" />
                <span className="text-xs">{BUSINESS_CONFIG.workshopCityPlaceholder}</span>
              </li>
            </ul>
          </div>

          {/* Col 4: Craft Ethics & Social Links */}
          <div className="space-y-3">
            <h3 className="font-serif text-sm font-bold text-slate-900 dark:text-rose-100 uppercase tracking-wider">
              Craft Ethics
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              We uphold honest, transparent estimates. All sample prices shown on this site are illustrative starting ranges based on stitch density and fabric type.
            </p>
            <div className="pt-2">
              <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-2">
                Connect With Our Workshop:
              </span>
              <div className="flex items-center gap-3">
                <a
                  href={BUSINESS_CONFIG.socialLinks.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Spandana Embroidery on Instagram (Placeholder link)"
                  className="p-2 rounded-lg bg-rose-50 dark:bg-rose-950/40 text-slate-600 dark:text-slate-300 hover:text-rose-500 hover:bg-rose-100 transition-colors"
                >
                  <Instagram className="w-4 h-4" aria-hidden="true" />
                </a>
                <a
                  href={BUSINESS_CONFIG.socialLinks.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Spandana Embroidery on WhatsApp (Placeholder link)"
                  className="p-2 rounded-lg bg-rose-50 dark:bg-rose-950/40 text-slate-600 dark:text-slate-300 hover:text-rose-500 hover:bg-rose-100 transition-colors"
                >
                  <MessageCircle className="w-4 h-4" aria-hidden="true" />
                </a>
                <a
                  href={BUSINESS_CONFIG.socialLinks.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Spandana Embroidery on Facebook (Placeholder link)"
                  className="p-2 rounded-lg bg-rose-50 dark:bg-rose-950/40 text-slate-600 dark:text-slate-300 hover:text-rose-500 hover:bg-rose-100 transition-colors"
                >
                  <Facebook className="w-4 h-4" aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar & Copyright */}
        <div className="pt-8 border-t border-rose-100 dark:border-rose-950/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
          <p>© {currentYear} Spandana Embroidery. All rights reserved. Handcrafted in India.</p>
          <p className="text-[11px] text-slate-400 dark:text-slate-500 text-center sm:text-right">
            Designed for genuine artisan transparency. Replace bracketed placeholders with live contact channels.
          </p>
        </div>
      </div>
    </footer>
  );
};
