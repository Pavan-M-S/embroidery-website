import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Check, Info, Sparkles, ArrowRight, HelpCircle, Layers, Clock, Feather, ShieldAlert } from 'lucide-react';
import { PRICING_TIERS } from '../data/designsData';
import { useShopping } from '../context/ShoppingContext';

export const PricingPage: React.FC = () => {
  const { openAdvisor } = useShopping();
  const [selectedTierForModal, setSelectedTierForModal] = useState<string | null>(null);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-12 sm:space-y-16">
      {/* Page Header */}
      <div className="max-w-3xl space-y-3">
        <span className="text-xs font-semibold uppercase tracking-wider text-rose-600 dark:text-rose-400">
          Transparent Craftsmanship
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-slate-900 dark:text-rose-50">
          Embroidery Pricing & Tiers
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
          At Spandana Embroidery, we believe in honest craft pricing. Below are our illustrative starting tiers to give you a dependable reference point before we evaluate your fabric in person.
        </p>
      </div>

      {/* Prominent Illustrative Disclaimer */}
      <div className="p-4 sm:p-5 rounded-2xl bg-amber-50/80 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/80 flex items-start gap-3.5 text-xs sm:text-sm text-amber-900 dark:text-amber-200">
        <Info className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" aria-hidden="true" />
        <div className="space-y-1">
          <p className="font-bold text-amber-950 dark:text-amber-100">
            Illustrative Sample Rates Only
          </p>
          <p className="leading-relaxed">
            The figures below represent typical starting points for standard dimensions. They are not fixed or binding quotes. The exact price will be confirmed after examining your specific fabric, stitch density, and design measurements.
          </p>
        </div>
      </div>

      {/* Pricing Tier Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {PRICING_TIERS.map((tier) => (
          <div
            key={tier.id}
            className={`rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition-all ${
              tier.isPopular
                ? 'bg-white dark:bg-[#1C161C] border-2 border-rose-500 shadow-xl relative'
                : 'bg-white dark:bg-[#181318] border border-rose-100 dark:border-rose-950 shadow-xs'
            }`}
          >
            {tier.isPopular && (
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-1 bg-rose-500 text-white rounded-full text-[11px] font-bold uppercase tracking-wider shadow-xs">
                Most Requested
              </div>
            )}

            <div className="space-y-6">
              <div>
                <span className="text-xs font-semibold text-rose-600 dark:text-rose-400 uppercase tracking-wider block">
                  {tier.complexityLabel}
                </span>
                <h2 className="font-serif text-2xl font-bold text-slate-900 dark:text-rose-50 mt-1">
                  {tier.name}
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  {tier.subtitle}
                </p>
              </div>

              {/* Price Banner */}
              <div className="py-4 border-y border-rose-100 dark:border-rose-950/60">
                <span className="text-xs text-slate-500 dark:text-slate-400 block leading-none">
                  Starting from
                </span>
                <div className="flex items-baseline gap-1 mt-1">
                  <span className="font-mono text-3xl sm:text-4xl font-bold text-slate-900 dark:text-rose-100 tabular-nums">
                    ₹{tier.startingPriceINR}
                  </span>
                  <span className="text-xs text-slate-500 dark:text-slate-400">
                    / piece
                  </span>
                </div>
                <span className="text-[11px] text-slate-400 dark:text-slate-500 block mt-1">
                  {tier.turnaroundNote}
                </span>
              </div>

              {/* Typical Garments */}
              <div className="space-y-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                  Ideal For:
                </span>
                <ul className="text-xs text-slate-600 dark:text-slate-400 space-y-1">
                  {tier.typicalGarments.map((g) => (
                    <li key={g} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-rose-400 shrink-0" aria-hidden="true" />
                      <span>{g}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Included Features */}
              <div className="space-y-2 pt-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                  What’s Included:
                </span>
                <ul className="space-y-2.5 text-xs text-slate-600 dark:text-slate-400">
                  {tier.includedFeatures.map((feat) => (
                    <li key={feat} className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" aria-hidden="true" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* CTA Button */}
            <div className="pt-8">
              <Link
                to={`/custom-design?tier=${encodeURIComponent(tier.name)}`}
                className={`w-full py-3 rounded-xl text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 transition-all ${
                  tier.isPopular
                    ? 'bg-rose-500 hover:bg-rose-600 text-white shadow-md'
                    : 'bg-rose-50 dark:bg-rose-950/50 hover:bg-rose-100 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-900'
                }`}
              >
                <span>Request Quote for This Tier</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Factors Influencing Final Quote Breakdown */}
      <section className="p-8 sm:p-12 rounded-3xl bg-rose-50/60 dark:bg-rose-950/20 border border-rose-100 dark:border-rose-950 space-y-8">
        <div className="max-w-2xl space-y-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-rose-600 dark:text-rose-400">
            Behind the Stitches
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900 dark:text-rose-50">
            What Influences Your Final Estimate?
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
            We are always transparent about how time and material costs are estimated.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-5 rounded-2xl bg-white dark:bg-[#181318] border border-rose-100 dark:border-rose-950/60 space-y-2">
            <Feather className="w-5 h-5 text-rose-500" aria-hidden="true" />
            <h3 className="font-serif font-bold text-base text-slate-900 dark:text-rose-100">
              1. Fabric Sensitivity
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Delicate organza, net, and chiffons require painstaking stabilization and slower hand stitching than sturdy raw silk or cotton.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-[#181318] border border-rose-100 dark:border-rose-950/60 space-y-2">
            <Layers className="w-5 h-5 text-orange-500" aria-hidden="true" />
            <h3 className="font-serif font-bold text-base text-slate-900 dark:text-rose-100">
              2. Stitch Density
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Scattered butta sprigs require fewer needle passes than dense all-over floral yokes or compact Kasuti geometric fillings.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-[#181318] border border-rose-100 dark:border-rose-950/60 space-y-2">
            <Sparkles className="w-5 h-5 text-amber-500" aria-hidden="true" />
            <h3 className="font-serif font-bold text-base text-slate-900 dark:text-rose-100">
              3. Embellishment Grade
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Genuine metallic Zari wire, micro-cutdana beads, seed pearls, and glass mirrors require specialized hand-threading techniques.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-[#181318] border border-rose-100 dark:border-rose-950/60 space-y-2">
            <Clock className="w-5 h-5 text-emerald-500" aria-hidden="true" />
            <h3 className="font-serif font-bold text-base text-slate-900 dark:text-rose-100">
              4. Festival Urgency
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Advance planning ensures standard scheduling. Orders needed within 3–4 days for upcoming functions may require priority hours.
            </p>
          </div>
        </div>
      </section>

      {/* Responsive Comparison Table for Mobile & Desktop */}
      <section className="space-y-6">
        <h2 className="font-serif text-2xl font-bold text-slate-900 dark:text-rose-50">
          Tier Feature Comparison
        </h2>

        <div className="overflow-x-auto rounded-2xl border border-rose-100 dark:border-rose-950 bg-white dark:bg-[#181318]">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-rose-50/70 dark:bg-rose-950/40 border-b border-rose-100 dark:border-rose-950 text-slate-700 dark:text-slate-200">
              <tr>
                <th scope="col" className="p-4 font-semibold">Craft Feature</th>
                <th scope="col" className="p-4 font-semibold">Gentle Accent</th>
                <th scope="col" className="p-4 font-semibold">Artisan Yoke</th>
                <th scope="col" className="p-4 font-semibold">Heritage & Bridal</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-rose-100/60 dark:divide-rose-950/40 text-slate-600 dark:text-slate-400">
              <tr>
                <td className="p-4 font-medium text-slate-900 dark:text-rose-100">Indicative Price (INR)</td>
                <td className="p-4 font-mono font-bold text-rose-600 dark:text-rose-400 tabular-nums">From ₹350</td>
                <td className="p-4 font-mono font-bold text-rose-600 dark:text-rose-400 tabular-nums">From ₹750</td>
                <td className="p-4 font-mono font-bold text-rose-600 dark:text-rose-400 tabular-nums">From ₹1,500</td>
              </tr>
              <tr>
                <td className="p-4 font-medium text-slate-900 dark:text-rose-100">Thread Materials</td>
                <td className="p-4">Colourfast cotton & gentle resham</td>
                <td className="p-4">Pure resham silk + light zari</td>
                <td className="p-4">Gold/silver zari, cutdana & pearls</td>
              </tr>
              <tr>
                <td className="p-4 font-medium text-slate-900 dark:text-rose-100">Stitch Techniques</td>
                <td className="p-4">Bullion, lazy daisy, stem stitch</td>
                <td className="p-4">French knots, aari chain, shisha mirror</td>
                <td className="p-4">Zardozi, 3D relief, fine resham shading</td>
              </tr>
              <tr>
                <td className="p-4 font-medium text-slate-900 dark:text-rose-100">Protective Backing</td>
                <td className="p-4">Soft cotton fusible backing</td>
                <td className="p-4">Double-layer itch-free shield</td>
                <td className="p-4">Hand-stitched silk lining barrier</td>
              </tr>
              <tr>
                <td className="p-4 font-medium text-slate-900 dark:text-rose-100">Estimated Days</td>
                <td className="p-4 font-mono tabular-nums">3 – 5 days</td>
                <td className="p-4 font-mono tabular-nums">5 – 8 days</td>
                <td className="p-4 font-mono tabular-nums">8 – 14 days</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Quote CTA Banner */}
      <div className="p-8 rounded-2xl bg-gradient-to-r from-rose-500 to-amber-500 text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-md">
        <div>
          <h3 className="font-serif text-2xl font-bold">
            Need an accurate estimate for your fabric?
          </h3>
          <p className="text-xs sm:text-sm text-rose-100 mt-1">
            Send us your garment measurements or upload a sketch description in our custom request portal.
          </p>
        </div>
        <Link
          to="/custom-design"
          className="px-6 py-3 bg-white text-rose-600 rounded-xl font-semibold text-xs sm:text-sm hover:bg-rose-50 transition-colors shrink-0"
        >
          Request Custom Estimate
        </Link>
      </div>
    </div>
  );
};
