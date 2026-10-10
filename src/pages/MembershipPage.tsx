import React, { useState } from 'react';
import { Gift, Sparkles, Check, Info, HeartHandshake, ShieldCheck, UserCheck } from 'lucide-react';

export const MembershipPage: React.FC = () => {
  const [memberEmail, setMemberEmail] = useState('');
  const [memberName, setMemberName] = useState('');
  const [isJoined, setIsJoined] = useState(false);
  const [error, setError] = useState('');

  const sampleBenefits = [
    {
      title: 'Festival Priority Booking Slots',
      desc: 'Early notification to book embroidery slots 4 weeks prior to Diwali, Dussehra, and Eid wedding seasons.',
    },
    {
      title: 'Complimentary Thread Repair Stitching',
      desc: 'One free annual maintenance pass for accidental thread snag repairs on garments embroidered by Spandana.',
    },
    {
      title: 'Seasonal Silk & Zari Thread Consultations',
      desc: 'Personalized color matching swatch preview before stitching begins on custom heirloom fabrics.',
    },
    {
      title: 'Repeat Customer Craft Appreciation',
      desc: 'Special festive pricing adjustments on second and subsequent family garments.',
    },
  ];

  const handleJoinDemo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!memberName.trim() || !memberEmail.trim()) {
      setError('Please provide your name and email address.');
      return;
    }
    setError('');
    setIsJoined(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-12">
      {/* Header */}
      <div className="max-w-3xl space-y-3">
        <span className="text-xs font-semibold uppercase tracking-wider text-rose-600 dark:text-rose-400">
          Craft Circle & Repeat Patron Program
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-slate-900 dark:text-rose-50">
          Spandana Craft Circle
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
          For families and patrons who frequently trust us with their festive wardrobes and children’s outfits. Below is an optional repeat-patron concept designed to show our appreciation.
        </p>
      </div>

      {/* Illustrative Concept Disclaimer Banner */}
      <div className="p-4 sm:p-5 rounded-2xl bg-amber-50/80 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/80 flex items-start gap-3.5 text-xs sm:text-sm text-amber-900 dark:text-amber-200">
        <Info className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" aria-hidden="true" />
        <div className="space-y-1">
          <p className="font-bold text-amber-950 dark:text-amber-100">
            Illustrative Concept & Front-End Demonstration Only
          </p>
          <p className="leading-relaxed">
            The benefits, terms, and sign-up below are sample illustrative representations for the business owner to adapt or formalize. No payment is charged and no binding membership contract is active on this demonstration website.
          </p>
        </div>
      </div>

      {/* Benefits Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {sampleBenefits.map((benefit, idx) => (
          <div
            key={idx}
            className="p-6 rounded-2xl bg-white dark:bg-[#181318] border border-rose-100 dark:border-rose-950 shadow-xs flex items-start gap-4"
          >
            <div className="w-10 h-10 rounded-xl bg-rose-50 dark:bg-rose-950 text-rose-500 flex items-center justify-center shrink-0">
              <Sparkles className="w-5 h-5" aria-hidden="true" />
            </div>
            <div className="space-y-1">
              <h2 className="font-serif font-bold text-lg text-slate-900 dark:text-rose-100">
                {benefit.title}
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                {benefit.desc}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Interactive Demo Registration */}
      <div className="max-w-2xl mx-auto p-8 sm:p-10 rounded-3xl bg-rose-50/50 dark:bg-rose-950/20 border border-rose-100 dark:border-rose-950 text-center space-y-6">
        {isJoined ? (
          <div className="space-y-3 py-4 animate-fade-in" role="status">
            <UserCheck className="w-12 h-12 text-emerald-500 mx-auto" aria-hidden="true" />
            <h2 className="font-serif text-2xl font-bold text-slate-900 dark:text-rose-50">
              Welcome to the Craft Circle (Demo)!
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-md mx-auto">
              Thank you, <strong>{memberName}</strong> ({memberEmail})! Your interest has been recorded in this local session.
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400 italic">
              Remember: This is a front-end demo. In the real atelier, repeat patrons simply mention previous orders when connecting on WhatsApp.
            </p>
            <button
              type="button"
              onClick={() => setIsJoined(false)}
              className="mt-3 px-4 py-2 bg-rose-500 text-white rounded-lg text-xs font-semibold hover:bg-rose-600"
            >
              Reset Demo Sign-Up
            </button>
          </div>
        ) : (
          <>
            <div className="space-y-2">
              <Gift className="w-10 h-10 text-rose-500 mx-auto" aria-hidden="true" />
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900 dark:text-rose-50">
                Join the Free Craft Circle (Demo)
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-md mx-auto">
                Sign up to test how our customer loyalty onboarding works in this website template.
              </p>
            </div>

            {error && (
              <div role="alert" className="p-3 bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300 rounded-lg text-xs">
                {error}
              </div>
            )}

            <form onSubmit={handleJoinDemo} className="space-y-4 max-w-md mx-auto text-left">
              <div>
                <label htmlFor="member-name" className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Full Name
                </label>
                <input
                  id="member-name"
                  type="text"
                  required
                  value={memberName}
                  onChange={(e) => setMemberName(e.target.value)}
                  placeholder="e.g. Radhika Sharma"
                  className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-white dark:bg-neutral-900 border border-rose-200 dark:border-rose-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500 text-slate-900 dark:text-rose-100"
                />
              </div>

              <div>
                <label htmlFor="member-email" className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Email Address
                </label>
                <input
                  id="member-email"
                  type="email"
                  required
                  value={memberEmail}
                  onChange={(e) => setMemberEmail(e.target.value)}
                  placeholder="e.g. radhika@example.com"
                  className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-white dark:bg-neutral-900 border border-rose-200 dark:border-rose-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500 text-slate-900 dark:text-rose-100"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-rose-500 hover:bg-rose-600 text-white rounded-xl text-xs sm:text-sm font-semibold shadow-xs transition-colors"
              >
                Register Interest (Demo)
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};
