import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Scissors, Palette, ShieldCheck, Heart, ChevronDown, ChevronUp } from 'lucide-react';
import { ThreadCanvas } from '../components/common/ThreadCanvas';
import { DesignCard } from '../components/common/DesignCard';
import { SAMPLE_DESIGNS, FAQ_DATA, BUSINESS_CONFIG } from '../data/designsData';
import { useShopping } from '../context/ShoppingContext';

export const HomePage: React.FC = () => {
  const { openAdvisor } = useShopping();
  const [openFaqId, setOpenFaqId] = useState<string | null>(FAQ_DATA[0].id);

  const featuredDesigns = SAMPLE_DESIGNS.filter((d) => d.featured).slice(0, 4);

  const toggleFaq = (id: string) => {
    setOpenFaqId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="space-y-16 sm:space-y-24">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-16 sm:pt-20 sm:pb-28 border-b border-rose-100 dark:border-rose-950/60 bg-gradient-to-b from-rose-50/70 via-white to-white dark:from-rose-950/20 dark:via-[#121013] dark:to-[#121013]">
        {/* Animated Silk Thread Background */}
        <ThreadCanvas className="opacity-70" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-6">
            {/* Craft Origin Kicker */}
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-rose-600 dark:text-rose-400">
              <span className="w-6 h-px bg-rose-500" aria-hidden="true" />
              <span>Handcrafted Indian Needlework · Home Atelier</span>
            </div>

            {/* Main Headline */}
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-rose-50 tracking-tight leading-tight text-balance">
              Spandana Embroidery
            </h1>

            {/* Tagline */}
            <p className="font-serif text-xl sm:text-2xl text-rose-600 dark:text-rose-400 font-medium italic">
              “{BUSINESS_CONFIG.tagline}”
            </p>

            {/* Warm Welcoming Introduction */}
            <p className="text-base sm:text-lg text-slate-700 dark:text-slate-300 leading-relaxed max-w-2xl">
              Welcome to our home-owned craft space in India. We hand-embellish women’s kurtis, festive blouses, sarees, and children’s traditional outfits with timeless Resham silk, Kasuti, and Zari needlework.
            </p>

            {/* Primary Actions */}
            <div className="pt-2 flex flex-wrap items-center gap-3 sm:gap-4">
              <Link
                to="/designs"
                className="px-6 py-3.5 rounded-xl bg-rose-500 hover:bg-rose-600 text-white font-semibold text-sm shadow-md hover:shadow-lg transition-all flex items-center gap-2 active:scale-95"
              >
                <span>Explore Designs</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>

              <Link
                to="/custom-design"
                className="px-6 py-3.5 rounded-xl bg-white dark:bg-[#1C161C] hover:bg-rose-50 dark:hover:bg-rose-950/60 text-slate-800 dark:text-rose-100 font-semibold text-sm border border-rose-200 dark:border-rose-900 shadow-xs transition-all active:scale-95"
              >
                Request Custom Work
              </Link>

              <button
                type="button"
                onClick={() => openAdvisor()}
                className="px-4 py-3.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 text-amber-900 dark:text-amber-200 hover:bg-amber-100 text-xs sm:text-sm font-semibold border border-amber-200 dark:border-amber-800 flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-amber-500" aria-hidden="true" />
                <span>Ask AI Consultant</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Verifiable Trust & Craft Foundation */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 rounded-2xl bg-white dark:bg-[#181318] border border-rose-100 dark:border-rose-950/70 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-rose-50 dark:bg-rose-950 text-rose-500 flex items-center justify-center">
              <Scissors className="w-5 h-5" aria-hidden="true" />
            </div>
            <h3 className="font-serif text-lg font-bold text-slate-900 dark:text-rose-100">
              Home-Owned Atelier
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Every garment is stitched personally with individual attention, without industrial mass-production shortcuts.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-[#181318] border border-rose-100 dark:border-rose-950/70 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-orange-50 dark:bg-orange-950 text-orange-500 flex items-center justify-center">
              <Palette className="w-5 h-5" aria-hidden="true" />
            </div>
            <h3 className="font-serif text-lg font-bold text-slate-900 dark:text-rose-100">
              Colourfast Silk & Zari
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Tested resham threads and tarnish-resistant zari chosen specifically to match your base fabric without bleeding.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-[#181318] border border-rose-100 dark:border-rose-950/70 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-rose-50 dark:bg-rose-950 text-rose-500 flex items-center justify-center">
              <Heart className="w-5 h-5" aria-hidden="true" />
            </div>
            <h3 className="font-serif text-lg font-bold text-slate-900 dark:text-rose-100">
              Gentle on Children
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Kids’ pattu pavadais and jhablas are backed with ultra-soft inner lining so delicate skin stays itch-free.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-[#181318] border border-rose-100 dark:border-rose-950/70 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950 text-emerald-500 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" aria-hidden="true" />
            </div>
            <h3 className="font-serif text-lg font-bold text-slate-900 dark:text-rose-100">
              Affordable & Upfront
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Transparent starting rates from ₹350. We discuss design dimensions and stitch density before confirming quotes.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Designs Showcase */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-semibold text-rose-600 dark:text-rose-400 uppercase tracking-wider block mb-1">
              Curated Craft Portfolio
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900 dark:text-rose-50">
              Featured Embroidery Designs
            </h2>
          </div>

          <Link
            to="/designs"
            className="text-xs sm:text-sm font-semibold text-rose-600 dark:text-rose-400 hover:text-rose-700 flex items-center gap-1.5 self-start sm:self-auto"
          >
            <span>View all 12 designs</span>
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredDesigns.map((design) => (
            <DesignCard key={design.id} design={design} />
          ))}
        </div>
      </section>

      {/* 4-Step Craft Process Overview */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-rose-50/60 dark:bg-rose-950/30 border border-rose-100 dark:border-rose-950 space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-rose-600 dark:text-rose-400">
              Simple & Personal
            </span>
            <h2 className="font-serif text-3xl font-bold text-slate-900 dark:text-rose-50">
              How We Work With You
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
              From your initial idea to handcrafting the final stitch on your fabric.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="space-y-2">
              <span className="font-serif text-2xl font-bold text-rose-500">01.</span>
              <h3 className="font-serif text-base font-bold text-slate-900 dark:text-rose-100">
                Idea & Garment Selection
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Choose a design from our portfolio or share a motif picture. Tell us your garment type (kurti, blouse, pattu pavadai).
              </p>
            </div>

            <div className="space-y-2">
              <span className="font-serif text-2xl font-bold text-rose-500">02.</span>
              <h3 className="font-serif text-base font-bold text-slate-900 dark:text-rose-100">
                Thread & Color Harmonization
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                We select matching silk resham shades, metallic zari, and glass beads to complement your base fabric tone.
              </p>
            </div>

            <div className="space-y-2">
              <span className="font-serif text-2xl font-bold text-rose-500">03.</span>
              <h3 className="font-serif text-base font-bold text-slate-900 dark:text-rose-100">
                Precision Hand-Stitching
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Mounted on artisan frames, our needlework proceeds stitch by stitch with gentle tension and protective backing.
              </p>
            </div>

            <div className="space-y-2">
              <span className="font-serif text-2xl font-bold text-rose-500">04.</span>
              <h3 className="font-serif text-base font-bold text-slate-900 dark:text-rose-100">
                Inspection & Handover
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                We trim all loose thread tails, press the garment from the reverse, and prepare it for collection or courier.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Custom Design Callout Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-rose-500 via-rose-600 to-amber-600 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-xl">
            <span className="text-xs font-semibold uppercase tracking-wider text-rose-200">
              Have a unique festive idea?
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold leading-tight">
              Bring Your Custom Embroidery Vision to Life
            </h2>
            <p className="text-sm text-rose-100 leading-relaxed">
              Whether you want a traditional temple gopura motif for your daughter’s first festival or a customized floral kurti yoke for family celebrations, we are delighted to discuss it.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <Link
              to="/custom-design"
              className="px-6 py-3.5 rounded-xl bg-white text-rose-600 hover:bg-rose-50 font-semibold text-sm shadow-md text-center transition-all"
            >
              Start Custom Request
            </Link>
            <Link
              to="/contact"
              className="px-6 py-3.5 rounded-xl bg-rose-700/60 hover:bg-rose-700 text-white font-semibold text-sm border border-rose-300/40 text-center transition-all"
            >
              Direct Workshop Contact
            </Link>
          </div>
        </div>
      </section>

      {/* Frequently Asked Questions (FAQ Accordion with accessible semantics) */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-rose-600 dark:text-rose-400">
            Got Questions?
          </span>
          <h2 className="font-serif text-3xl font-bold text-slate-900 dark:text-rose-50">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-3" role="region" aria-label="Frequently Asked Questions">
          {FAQ_DATA.map((faq) => {
            const isOpen = openFaqId === faq.id;
            return (
              <div
                key={faq.id}
                className="rounded-xl border border-rose-100 dark:border-rose-950/70 bg-white dark:bg-[#181318] overflow-hidden"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(faq.id)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${faq.id}`}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-serif text-base sm:text-lg font-bold text-slate-900 dark:text-rose-100 hover:text-rose-600 dark:hover:text-rose-400 transition-colors focus-visible:outline-rose-500"
                >
                  <span>{faq.question}</span>
                  {isOpen ? (
                    <ChevronUp className="w-5 h-5 text-rose-500 shrink-0" aria-hidden="true" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-slate-400 shrink-0" aria-hidden="true" />
                  )}
                </button>

                {isOpen && (
                  <div
                    id={`faq-answer-${faq.id}`}
                    className="px-4 pb-4 sm:px-5 sm:pb-5 text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed border-t border-rose-50 dark:border-rose-950/40 pt-3 animate-fade-in"
                  >
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};
