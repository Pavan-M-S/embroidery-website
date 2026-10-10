import React, { useState } from 'react';
import { Phone, Mail, Clock, MapPin, Send, MessageSquare, Instagram, Facebook, CheckCircle2, AlertCircle, Info, ExternalLink } from 'lucide-react';
import { BUSINESS_CONFIG } from '../data/designsData';
import { ContactFormData } from '../types';

export const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    fullName: '',
    contactValue: '',
    topic: 'Custom Embroidery Inquiry',
    message: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Please enter your name.';
    }
    if (!formData.contactValue.trim()) {
      newErrors.contactValue = 'Please provide your phone number, WhatsApp, or email.';
    }
    if (!formData.message.trim() || formData.message.trim().length < 10) {
      newErrors.message = 'Please enter a message of at least 10 characters.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setIsSubmitted(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-12">
      {/* Header */}
      <div className="max-w-3xl space-y-3">
        <span className="text-xs font-semibold uppercase tracking-wider text-rose-600 dark:text-rose-400">
          Get in Touch
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-slate-900 dark:text-rose-50">
          Contact Spandana Embroidery
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
          We welcome conversations about your upcoming celebrations, fabric inquiries, and custom design ideas. Connect with our home craft workshop directly below.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Contact Form (2 cols) */}
        <div className="lg:col-span-2 bg-white dark:bg-[#181318] p-6 sm:p-10 rounded-3xl border border-rose-100 dark:border-rose-950 shadow-xs space-y-6">
          {isSubmitted ? (
            <div className="py-10 text-center space-y-4 animate-fade-in" role="status">
              <CheckCircle2 className="w-16 h-16 text-emerald-500 mx-auto" aria-hidden="true" />
              <h2 className="font-serif text-3xl font-bold text-slate-900 dark:text-rose-50">
                Message Received (Demo)
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-md mx-auto leading-relaxed">
                Thank you, <strong>{formData.fullName}</strong>. Your message regarding “{formData.topic}” has been recorded in this demo.
              </p>
              <div className="p-4 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 text-xs text-left max-w-md mx-auto space-y-2 text-slate-700 dark:text-slate-300">
                <span className="font-semibold text-rose-900 dark:text-rose-200 block">
                  Direct Workshop Reachout:
                </span>
                <p>
                  For immediate discussion on ongoing orders, please reach us via WhatsApp or Phone:
                </p>
                <div className="pt-2 font-mono text-[11px] space-y-1">
                  <div>WhatsApp: {BUSINESS_CONFIG.whatsappPlaceholder}</div>
                  <div>Phone: {BUSINESS_CONFIG.phonePlaceholder}</div>
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  setIsSubmitted(false);
                  setFormData({
                    fullName: '',
                    contactValue: '',
                    topic: 'Custom Embroidery Inquiry',
                    message: '',
                  });
                }}
                className="mt-2 px-5 py-2.5 bg-rose-500 hover:bg-rose-600 text-white rounded-xl text-xs font-semibold"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <h2 className="font-serif text-xl font-bold text-slate-900 dark:text-rose-100">
                Send an Online Message
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="contact-name" className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Your Full Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="e.g. Meera Krishnan"
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-rose-50/40 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500 text-slate-900 dark:text-rose-100"
                  />
                  {errors.fullName && (
                    <span className="text-xs text-rose-600 dark:text-rose-400 mt-1 block">
                      {errors.fullName}
                    </span>
                  )}
                </div>

                <div>
                  <label htmlFor="contact-info" className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Phone, WhatsApp, or Email <span className="text-rose-500">*</span>
                  </label>
                  <input
                    id="contact-info"
                    type="text"
                    required
                    value={formData.contactValue}
                    onChange={(e) => setFormData({ ...formData, contactValue: e.target.value })}
                    placeholder="e.g. +91 98765 43210"
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-rose-50/40 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500 text-slate-900 dark:text-rose-100"
                  />
                  {errors.contactValue && (
                    <span className="text-xs text-rose-600 dark:text-rose-400 mt-1 block">
                      {errors.contactValue}
                    </span>
                  )}
                </div>
              </div>

              <div>
                <label htmlFor="contact-topic" className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Inquiry Topic
                </label>
                <select
                  id="contact-topic"
                  value={formData.topic}
                  onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-rose-50/40 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500 text-slate-900 dark:text-rose-100"
                >
                  <option value="Custom Embroidery Inquiry">Custom Embroidery Inquiry</option>
                  <option value="Price Estimate Consultation">Price Estimate Consultation</option>
                  <option value="Fabric Suitability Question">Fabric Suitability Question</option>
                  <option value="Children’s Garment Request">Children’s Garment Request</option>
                  <option value="Workshop Handover / Appointment">Workshop Handover / Appointment</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label htmlFor="contact-msg" className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Your Message <span className="text-rose-500">*</span>
                </label>
                <textarea
                  id="contact-msg"
                  rows={4}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Share details about your fabric, motifs, or questions..."
                  className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-rose-50/40 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500 text-slate-900 dark:text-rose-100"
                />
                {errors.message && (
                  <span className="text-xs text-rose-600 dark:text-rose-400 mt-1 block">
                    {errors.message}
                  </span>
                )}
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-rose-500 hover:bg-rose-600 text-white rounded-xl text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 shadow-xs transition-colors"
              >
                <Send className="w-4 h-4" aria-hidden="true" />
                <span>Send Message (Demo)</span>
              </button>
            </form>
          )}
        </div>

        {/* Contact Info & Clearly Labeled Placeholders */}
        <div className="space-y-6">
          <div className="p-6 sm:p-8 rounded-3xl bg-rose-50/70 dark:bg-rose-950/30 border border-rose-100 dark:border-rose-950 space-y-5">
            <h2 className="font-serif font-bold text-xl text-slate-900 dark:text-rose-100">
              Workshop Contact
            </h2>

            <div className="space-y-3.5 text-xs sm:text-sm">
              <div className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <span className="font-semibold block text-slate-800 dark:text-slate-200">Phone Calls</span>
                  <span className="font-mono text-xs text-slate-600 dark:text-slate-400">{BUSINESS_CONFIG.phonePlaceholder}</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MessageSquare className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <span className="font-semibold block text-slate-800 dark:text-slate-200">WhatsApp Inquiries</span>
                  <span className="font-mono text-xs text-slate-600 dark:text-slate-400">{BUSINESS_CONFIG.whatsappPlaceholder}</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <span className="font-semibold block text-slate-800 dark:text-slate-200">Email Correspondence</span>
                  <span className="font-mono text-xs text-slate-600 dark:text-slate-400">{BUSINESS_CONFIG.emailPlaceholder}</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <span className="font-semibold block text-slate-800 dark:text-slate-200">Operating Hours</span>
                  <span className="text-xs text-slate-600 dark:text-slate-400">{BUSINESS_CONFIG.workingHours}</span>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="pt-3 border-t border-rose-200/60 dark:border-rose-900/60 space-y-2">
              <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 block">
                Social Profiles (Placeholders):
              </span>
              <div className="flex items-center gap-2">
                <a
                  href={BUSINESS_CONFIG.socialLinks.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-lg bg-white dark:bg-[#181318] border border-rose-200 dark:border-rose-900 text-xs font-medium flex items-center gap-1.5 text-slate-700 dark:text-slate-300 hover:text-rose-500"
                >
                  <Instagram className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>Instagram</span>
                </a>
                <a
                  href={BUSINESS_CONFIG.socialLinks.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-lg bg-white dark:bg-[#181318] border border-rose-200 dark:border-rose-900 text-xs font-medium flex items-center gap-1.5 text-slate-700 dark:text-slate-300 hover:text-rose-500"
                >
                  <MessageSquare className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>
          </div>

          {/* Map Location State (Graceful Placeholder per user requirements) */}
          <div className="p-6 rounded-3xl bg-white dark:bg-[#181318] border border-rose-100 dark:border-rose-950 space-y-3">
            <div className="flex items-center gap-2 text-rose-600 dark:text-rose-400">
              <MapPin className="w-5 h-5" aria-hidden="true" />
              <h2 className="font-serif font-bold text-base text-slate-900 dark:text-rose-100">
                Workshop Location
              </h2>
            </div>

            {BUSINESS_CONFIG.googleMapsEmbedUrl ? (
              <div className="aspect-16/9 rounded-xl overflow-hidden border border-rose-200">
                <iframe
                  title="Spandana Embroidery Location"
                  src={BUSINESS_CONFIG.googleMapsEmbedUrl}
                  className="w-full h-full border-0"
                  loading="lazy"
                />
              </div>
            ) : (
              /* Map Unavailable Graceful Placeholder State */
              <div className="p-4 rounded-xl bg-rose-50/50 dark:bg-rose-950/30 border border-dashed border-rose-200 dark:border-rose-900 text-center space-y-2">
                <MapPin className="w-8 h-8 text-rose-400 mx-auto" aria-hidden="true" />
                <h3 className="font-serif font-bold text-sm text-slate-900 dark:text-rose-100">
                  Location Map Placeholder
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  Region: {BUSINESS_CONFIG.workshopCityPlaceholder}
                </p>
                <p className="text-[11px] text-slate-400 dark:text-slate-500 italic">
                  Note: A Google Maps embed is intentionally omitted until the business owner provides their exact physical studio address in <code>src/data/designsData.ts</code>.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
