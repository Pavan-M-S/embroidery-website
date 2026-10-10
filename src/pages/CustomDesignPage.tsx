import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Send, Sparkles, CheckCircle2, AlertCircle, Info, Phone, MessageSquare, Loader2 } from 'lucide-react';
import { BUSINESS_CONFIG } from '../data/designsData';
import { CustomDesignFormData } from '../types';
import { analyzeCustomIdea } from '../utils/aiService';

export const CustomDesignPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const prefilledTier = searchParams.get('tier') || '';

  const [formData, setFormData] = useState<CustomDesignFormData>({
    fullName: '',
    contactMethod: 'whatsapp',
    contactValue: '',
    garmentType: prefilledTier ? `Kurti / Blouse (${prefilledTier})` : 'Kurti / Anarkali',
    designIdea: '',
    preferredColors: '',
    referenceUrl: '',
    estimatedDeadline: '',
    additionalNotes: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [aiSuggestions, setAiSuggestions] = useState<{
    recommendedStitches: string[];
    suggestedColorPalette: string[];
    feasibilityNote: string;
  } | null>(null);

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Please enter your full name.';
    }

    if (!formData.contactValue.trim()) {
      newErrors.contactValue = 'Please provide your contact number, WhatsApp, or email.';
    } else if (
      formData.contactMethod === 'email' &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.contactValue)
    ) {
      newErrors.contactValue = 'Please enter a valid email address.';
    }

    if (!formData.designIdea.trim() || formData.designIdea.trim().length < 10) {
      newErrors.designIdea = 'Please describe your design idea in at least 10 characters.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitted(true);
  };

  // AI Design Idea Consultation
  const handleAnalyzeWithAI = async () => {
    if (!formData.designIdea.trim()) {
      setErrors((prev) => ({
        ...prev,
        designIdea: 'Please write a brief idea first so our AI Craft Consultant can analyze it.',
      }));
      return;
    }

    setIsAnalyzing(true);
    setAiSuggestions(null);

    try {
      const data = await analyzeCustomIdea(
        formData.designIdea,
        formData.garmentType,
        formData.preferredColors
      );
      setAiSuggestions(data);
    } catch (err) {
      console.warn('AI analysis error:', err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-12">
      {/* Page Header */}
      <div className="max-w-3xl space-y-3">
        <span className="text-xs font-semibold uppercase tracking-wider text-rose-600 dark:text-rose-400">
          Personalized Needlework
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-slate-900 dark:text-rose-50">
          Request Custom Embroidery
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
          Have a specific festive motif, saree border match, or children’s dress in mind? Share your concept below. We personally review every request to provide genuine stitch advice and transparent pricing.
        </p>
      </div>

      {/* 4 Realistic Steps of Custom Ordering */}
      <section className="grid grid-cols-1 md:grid-cols-4 gap-6 p-6 sm:p-8 rounded-3xl bg-rose-50/50 dark:bg-rose-950/20 border border-rose-100 dark:border-rose-950">
        <div className="space-y-1.5">
          <span className="text-xs font-bold text-rose-600 dark:text-rose-400 uppercase tracking-wider">
            Step 1
          </span>
          <h2 className="font-serif font-bold text-base text-slate-900 dark:text-rose-100">
            Share Your Idea
          </h2>
          <p className="text-xs text-slate-600 dark:text-slate-400">
            Tell us about your garment type, preferred motifs (floral, geometric, peacock), and color palette.
          </p>
        </div>

        <div className="space-y-1.5">
          <span className="text-xs font-bold text-rose-600 dark:text-rose-400 uppercase tracking-wider">
            Step 2
          </span>
          <h2 className="font-serif font-bold text-base text-slate-900 dark:text-rose-100">
            Discuss Specifications
          </h2>
          <p className="text-xs text-slate-600 dark:text-slate-400">
            We confirm fabric suitability, scale, thread materials (cotton vs. resham silk vs. zari), and timeline.
          </p>
        </div>

        <div className="space-y-1.5">
          <span className="text-xs font-bold text-rose-600 dark:text-rose-400 uppercase tracking-wider">
            Step 3
          </span>
          <h2 className="font-serif font-bold text-base text-slate-900 dark:text-rose-100">
            Quote Confirmation
          </h2>
          <p className="text-xs text-slate-600 dark:text-slate-400">
            You receive an itemized quote. Once confirmed, you provide the fabric piece or unstitched garment cut.
          </p>
        </div>

        <div className="space-y-1.5">
          <span className="text-xs font-bold text-rose-600 dark:text-rose-400 uppercase tracking-wider">
            Step 4
          </span>
          <h2 className="font-serif font-bold text-base text-slate-900 dark:text-rose-100">
            Handcrafted Delivery
          </h2>
          <p className="text-xs text-slate-600 dark:text-slate-400">
            We hand-embroider your piece with care, press it from reverse, and notify you for handover or courier.
          </p>
        </div>
      </section>

      {/* Main Request Form Container */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Form Card (2 Columns) */}
        <div className="lg:col-span-2 bg-white dark:bg-[#181318] p-6 sm:p-10 rounded-3xl border border-rose-100 dark:border-rose-950 shadow-xs space-y-6">
          {isSubmitted ? (
            /* Submission Success State */
            <div className="py-10 text-center space-y-4 animate-fade-in" role="status">
              <CheckCircle2 className="w-16 h-16 text-emerald-500 mx-auto" aria-hidden="true" />
              <h2 className="font-serif text-3xl font-bold text-slate-900 dark:text-rose-50">
                Custom Request Recorded (Demo)
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-md mx-auto leading-relaxed">
                Thank you, <strong>{formData.fullName}</strong>. Your custom embroidery request for <em>{formData.garmentType}</em> has been saved in this demo session.
              </p>

              {/* Editable Contact Fallback Banner */}
              <div className="p-5 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 text-xs text-slate-700 dark:text-slate-300 max-w-md mx-auto text-left space-y-2">
                <div className="font-semibold text-rose-900 dark:text-rose-200">
                  Direct Contact for Real Business Inquiries:
                </div>
                <p>
                  Because this is a front-end showcase, orders are not automatically dispatched to a server database. You can directly contact our home craft workshop with your request details:
                </p>
                <div className="pt-2 border-t border-rose-200/60 dark:border-rose-900/60 font-mono text-[11px] space-y-1">
                  <div>WhatsApp: {BUSINESS_CONFIG.whatsappPlaceholder}</div>
                  <div>Phone: {BUSINESS_CONFIG.phonePlaceholder}</div>
                  <div>Email: {BUSINESS_CONFIG.emailPlaceholder}</div>
                </div>
              </div>

              <div className="pt-4">
                <button
                  type="button"
                  onClick={() => setIsSubmitted(false)}
                  className="px-5 py-2.5 bg-rose-500 hover:bg-rose-600 text-white rounded-xl text-xs font-semibold"
                >
                  Submit Another Request
                </button>
              </div>
            </div>
          ) : (
            /* Interactive Validated Form */
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Demo Notice */}
              <div className="p-3.5 bg-rose-50/70 dark:bg-rose-950/30 rounded-xl border border-rose-100 dark:border-rose-900/60 flex items-start gap-2.5 text-xs text-rose-900 dark:text-rose-200">
                <Info className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" aria-hidden="true" />
                <span>
                  <strong>Demo Mode Note:</strong> This form demonstrates our custom intake flow locally. For actual business bookings, please use the workshop contact channels provided below.
                </span>
              </div>

              {/* Personal Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="custom-fullname" className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Your Full Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    id="custom-fullname"
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="e.g. Ananya Rao"
                    aria-invalid={!!errors.fullName}
                    aria-describedby={errors.fullName ? 'err-fullname' : undefined}
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-rose-50/40 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500 text-slate-900 dark:text-rose-100"
                  />
                  {errors.fullName && (
                    <span id="err-fullname" className="text-xs text-rose-600 dark:text-rose-400 mt-1 block">
                      {errors.fullName}
                    </span>
                  )}
                </div>

                <div>
                  <label htmlFor="custom-contactmethod" className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Preferred Contact Channel <span className="text-rose-500">*</span>
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {(['whatsapp', 'phone', 'email'] as const).map((method) => (
                      <button
                        key={method}
                        type="button"
                        onClick={() => setFormData({ ...formData, contactMethod: method })}
                        className={`py-2 text-xs font-medium rounded-lg capitalize border transition-all ${
                          formData.contactMethod === method
                            ? 'bg-rose-500 text-white border-rose-500 shadow-2xs'
                            : 'bg-white dark:bg-neutral-900 text-slate-700 dark:text-slate-300 border-rose-200 dark:border-rose-900'
                        }`}
                      >
                        {method}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Contact Value */}
              <div>
                <label htmlFor="custom-contactvalue" className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  {formData.contactMethod === 'email' ? 'Email Address' : `${formData.contactMethod.toUpperCase()} Number`}{' '}
                  <span className="text-rose-500">*</span>
                </label>
                <input
                  id="custom-contactvalue"
                  type={formData.contactMethod === 'email' ? 'email' : 'tel'}
                  required
                  value={formData.contactValue}
                  onChange={(e) => setFormData({ ...formData, contactValue: e.target.value })}
                  placeholder={
                    formData.contactMethod === 'email'
                      ? 'e.g. ananya@example.com'
                      : 'e.g. +91 98765 43210'
                  }
                  aria-invalid={!!errors.contactValue}
                  aria-describedby={errors.contactValue ? 'err-contactvalue' : undefined}
                  className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-rose-50/40 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500 text-slate-900 dark:text-rose-100"
                />
                {errors.contactValue && (
                  <span id="err-contactvalue" className="text-xs text-rose-600 dark:text-rose-400 mt-1 block">
                    {errors.contactValue}
                  </span>
                )}
              </div>

              {/* Garment Type & Color Preference */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="custom-garmenttype" className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Garment / Item Type
                  </label>
                  <select
                    id="custom-garmenttype"
                    value={formData.garmentType}
                    onChange={(e) => setFormData({ ...formData, garmentType: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-rose-50/40 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500 text-slate-900 dark:text-rose-100"
                  >
                    <option value="Kurti / Anarkali Neckline">Kurti / Anarkali Neckline</option>
                    <option value="Saree Blouse (Back & Sleeves)">Saree Blouse (Back & Sleeves)</option>
                    <option value="Children’s Pattu Pavadai">Children’s Pattu Pavadai (Lehenga)</option>
                    <option value="Baby Frock / Jhabla">Baby Frock / Jhabla</option>
                    <option value="Dupatta Pallu Border">Dupatta Pallu Border</option>
                    <option value="Boys Festive Kurta">Boys Festive Kurta</option>
                    <option value="Other / Custom Craft">Other / Custom Craft</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="custom-colors" className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Preferred Thread Colors / Fabric Tone
                  </label>
                  <input
                    id="custom-colors"
                    type="text"
                    value={formData.preferredColors}
                    onChange={(e) => setFormData({ ...formData, preferredColors: e.target.value })}
                    placeholder="e.g. Maroon base with antique gold zari and rose silk"
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-rose-50/40 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500 text-slate-900 dark:text-rose-100"
                  />
                </div>
              </div>

              {/* Design Idea & AI Analysis Trigger */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label htmlFor="custom-idea" className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Describe Your Design Idea <span className="text-rose-500">*</span>
                  </label>
                  <button
                    type="button"
                    onClick={handleAnalyzeWithAI}
                    disabled={isAnalyzing}
                    className="text-[11px] font-semibold text-amber-600 dark:text-amber-400 hover:underline flex items-center gap-1"
                  >
                    {isAnalyzing ? (
                      <>
                        <Loader2 className="w-3 h-3 animate-spin" aria-hidden="true" />
                        <span>Analyzing with AI...</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-3 h-3 text-amber-500" aria-hidden="true" />
                        <span>Get AI Stitch Recommendations</span>
                      </>
                    )}
                  </button>
                </div>
                <textarea
                  id="custom-idea"
                  rows={4}
                  required
                  value={formData.designIdea}
                  onChange={(e) => setFormData({ ...formData, designIdea: e.target.value })}
                  placeholder="Tell us what you envision: e.g. Delicate vine border along a U-shaped kurti neckline with small temple flowers, using French knots for the bud centers..."
                  aria-invalid={!!errors.designIdea}
                  aria-describedby={errors.designIdea ? 'err-idea' : undefined}
                  className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-rose-50/40 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500 text-slate-900 dark:text-rose-100"
                />
                {errors.designIdea && (
                  <span id="err-idea" className="text-xs text-rose-600 dark:text-rose-400 mt-1 block">
                    {errors.designIdea}
                  </span>
                )}
              </div>

              {/* AI Recommendation Card (if triggered) */}
              {aiSuggestions && (
                <div className="p-4 rounded-2xl bg-amber-50/90 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/80 space-y-3 animate-fade-in text-xs">
                  <div className="flex items-center gap-2 text-amber-900 dark:text-amber-200 font-bold">
                    <Sparkles className="w-4 h-4 text-amber-500 shrink-0" aria-hidden="true" />
                    <span>AI Craft Consultant Assessment</span>
                  </div>
                  <div className="space-y-1">
                    <span className="font-semibold text-slate-800 dark:text-slate-200">Recommended Stitches:</span>
                    <ul className="list-disc list-inside text-slate-700 dark:text-slate-300">
                      {aiSuggestions.recommendedStitches.map((st) => (
                        <li key={st}>{st}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="space-y-1">
                    <span className="font-semibold text-slate-800 dark:text-slate-200">Harmonious Palette:</span>
                    <p className="text-slate-700 dark:text-slate-300">{aiSuggestions.suggestedColorPalette.join(' · ')}</p>
                  </div>
                  <p className="text-slate-600 dark:text-slate-400 italic pt-1 border-t border-amber-200/60 dark:border-amber-900/60">
                    {aiSuggestions.feasibilityNote}
                  </p>
                </div>
              )}

              {/* Reference Image Link & Deadline */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="custom-refurl" className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Optional Reference Link / Image URL
                  </label>
                  <input
                    id="custom-refurl"
                    type="url"
                    value={formData.referenceUrl}
                    onChange={(e) => setFormData({ ...formData, referenceUrl: e.target.value })}
                    placeholder="https://... (e.g. Pinterest or Google Drive link)"
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-rose-50/40 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500 text-slate-900 dark:text-rose-100"
                  />
                </div>

                <div>
                  <label htmlFor="custom-deadline" className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Target Function Date / Desired Handover
                  </label>
                  <input
                    id="custom-deadline"
                    type="text"
                    value={formData.estimatedDeadline}
                    onChange={(e) => setFormData({ ...formData, estimatedDeadline: e.target.value })}
                    placeholder="e.g. By October 25th for family wedding"
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-rose-50/40 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500 text-slate-900 dark:text-rose-100"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3.5 bg-rose-500 hover:bg-rose-600 text-white rounded-xl text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 shadow-md transition-all active:scale-95"
                >
                  <Send className="w-4 h-4" aria-hidden="true" />
                  <span>Submit Custom Request (Demo)</span>
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Sidebar Info & Owner Contact Guidelines */}
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-rose-50/70 dark:bg-rose-950/30 border border-rose-100 dark:border-rose-950 space-y-4">
            <h2 className="font-serif font-bold text-lg text-slate-900 dark:text-rose-100">
              Need Prompt Assistance?
            </h2>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              For rapid questions regarding fabric thickness, whether your saree blouse cut has enough margin, or color matching:
            </p>
            <div className="space-y-3 pt-2 text-xs font-mono">
              <div className="flex items-center gap-2.5 text-slate-800 dark:text-slate-200">
                <MessageSquare className="w-4 h-4 text-rose-500 shrink-0" aria-hidden="true" />
                <span>WhatsApp: {BUSINESS_CONFIG.whatsappPlaceholder}</span>
              </div>
              <div className="flex items-center gap-2.5 text-slate-800 dark:text-slate-200">
                <Phone className="w-4 h-4 text-rose-500 shrink-0" aria-hidden="true" />
                <span>Phone: {BUSINESS_CONFIG.phonePlaceholder}</span>
              </div>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 pt-2 border-t border-rose-200/60 dark:border-rose-900/60">
              Hours: {BUSINESS_CONFIG.workingHours}
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white dark:bg-[#181318] border border-rose-100 dark:border-rose-950 space-y-3">
            <h2 className="font-serif font-bold text-base text-slate-900 dark:text-rose-100">
              Fabric Preparation Tip
            </h2>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              If providing unstitched cotton or raw silk, pre-wash or dry-clean first to avoid unexpected fabric shrinkage after the embroidery is completed!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
