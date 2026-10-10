import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { X, Trash2, Send, ShoppingBag, Info, CheckCircle2, Phone, MessageSquare } from 'lucide-react';
import { useShopping } from '../../context/ShoppingContext';
import { BUSINESS_CONFIG } from '../../data/designsData';

export const QuoteBasketModal: React.FC = () => {
  const {
    isBasketOpen,
    closeBasket,
    basketItems,
    removeFromBasket,
    updateBasketItemQuantity,
    clearBasket,
  } = useShopping();

  const [customerName, setCustomerName] = useState('');
  const [contactValue, setContactValue] = useState('');
  const [preferredContact, setPreferredContact] = useState<'whatsapp' | 'phone' | 'email'>('whatsapp');
  const [additionalNotes, setAdditionalNotes] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [validationError, setValidationError] = useState('');

  const modalRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!isBasketOpen) {
      setIsSubmitted(false);
      setValidationError('');
      return;
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeBasket();
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isBasketOpen, closeBasket]);

  if (!isBasketOpen) return null;

  const handleSubmitEstimate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim()) {
      setValidationError('Please provide your name.');
      return;
    }
    if (!contactValue.trim()) {
      setValidationError('Please provide your phone number, WhatsApp, or email.');
      return;
    }

    setValidationError('');
    setIsSubmitted(true);
    // In practice, this submits to the business owner or prepares WhatsApp message
  };

  // Calculate approximate total starting price range
  const totalMin = basketItems.reduce(
    (sum, item) => sum + item.design.priceRangeINR.min * item.quantity,
    0
  );
  const totalMax = basketItems.reduce(
    (sum, item) => sum + item.design.priceRangeINR.max * item.quantity,
    0
  );

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="basket-modal-title"
      className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 sm:p-6"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity"
        onClick={closeBasket}
        aria-hidden="true"
      />

      {/* Modal Dialog Card */}
      <div
        ref={modalRef}
        className="relative w-full max-w-2xl bg-white dark:bg-[#181318] rounded-2xl border border-rose-100 dark:border-rose-950 shadow-2xl overflow-hidden z-10 animate-fade-in my-8 max-h-[90vh] flex flex-col"
      >
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-rose-100 dark:border-rose-950/60 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <ShoppingBag className="w-5 h-5 text-rose-500" aria-hidden="true" />
            <div>
              <h2 id="basket-modal-title" className="font-serif text-xl font-bold text-slate-900 dark:text-rose-50">
                Design Quote Basket
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Shortlist designs before requesting a consolidated craft estimate
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={closeBasket}
            aria-label="Close quote basket"
            className="p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-rose-200 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-950/50"
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>

        {/* Clear Non-Purchase Explanation Banner */}
        <div className="bg-amber-50 dark:bg-amber-950/30 px-4 py-2.5 border-b border-amber-200 dark:border-amber-900/60 flex items-start gap-2.5 text-xs text-amber-900 dark:text-amber-200">
          <Info className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" aria-hidden="true" />
          <span>
            <strong>Informational Shortlist:</strong> Adding designs to this basket collects them for an estimate request. It does <em>not</em> process payment or order finished garments automatically.
          </span>
        </div>

        {/* Modal Scrollable Content */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-6 flex-1">
          {basketItems.length === 0 ? (
            <div className="py-12 text-center space-y-3">
              <ShoppingBag className="w-12 h-12 text-rose-200 dark:text-rose-900 mx-auto" aria-hidden="true" />
              <h3 className="font-serif text-lg font-bold text-slate-800 dark:text-slate-200">
                Your Quote Basket is empty
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
                Explore our portfolio and click "Quote Basket" on any embroidery design to collect and compare designs.
              </p>
            </div>
          ) : isSubmitted ? (
            /* Success State */
            <div className="py-8 text-center space-y-4 animate-fade-in">
              <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto" aria-hidden="true" />
              <div>
                <h3 className="font-serif text-2xl font-bold text-slate-900 dark:text-rose-50">
                  Estimate Request Received (Demo)
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-md mx-auto mt-1">
                  Thank you, <strong>{customerName}</strong>! Your shortlist of {basketItems.length} design(s) has been prepared.
                </p>
              </div>

              {/* Editable Contact Fallback Notice */}
              <div className="bg-rose-50 dark:bg-rose-950/40 p-4 rounded-xl border border-rose-200 dark:border-rose-900 text-xs text-left text-slate-700 dark:text-slate-300 space-y-2 max-w-md mx-auto">
                <span className="font-semibold text-rose-900 dark:text-rose-200 block">
                  Next Step for Real Business Orders:
                </span>
                <p>
                  This front-end demonstration records your design shortlist locally. To finalize fabric handover and confirm dates with Spandana Embroidery:
                </p>
                <div className="pt-2 border-t border-rose-200/60 dark:border-rose-900/60 space-y-1 font-mono text-[11px]">
                  <div>WhatsApp: {BUSINESS_CONFIG.whatsappPlaceholder}</div>
                  <div>Phone: {BUSINESS_CONFIG.phonePlaceholder}</div>
                  <div>Email: {BUSINESS_CONFIG.emailPlaceholder}</div>
                </div>
              </div>

              <div className="pt-3 flex flex-wrap items-center justify-center gap-3">
                <Link
                  to="/track-order"
                  onClick={() => {
                    closeBasket();
                  }}
                  className="px-5 py-2.5 bg-rose-500 text-white rounded-lg text-xs font-semibold hover:bg-rose-600 transition-colors"
                >
                  Track Order Portal
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    clearBasket();
                    closeBasket();
                  }}
                  className="px-5 py-2.5 bg-rose-50 dark:bg-rose-950/40 text-slate-700 dark:text-rose-200 border border-rose-200 dark:border-rose-900 rounded-lg text-xs font-semibold hover:bg-rose-100"
                >
                  Done & Clear Basket
                </button>
              </div>
            </div>
          ) : (
            /* Active Basket Items List */
            <>
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                  <span>Collected Designs ({basketItems.length})</span>
                  <button
                    type="button"
                    onClick={clearBasket}
                    className="text-rose-500 hover:text-rose-700 underline text-xs"
                  >
                    Clear All
                  </button>
                </div>

                {basketItems.map((item) => (
                  <div
                    key={item.design.id}
                    className="p-3.5 bg-rose-50/40 dark:bg-rose-950/20 rounded-xl border border-rose-100 dark:border-rose-950 flex items-center justify-between gap-3"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={item.design.image}
                        alt=""
                        className="w-14 h-14 object-cover rounded-lg bg-rose-100 shrink-0"
                      />
                      <div>
                        <h4 className="font-serif font-bold text-sm text-slate-900 dark:text-rose-50">
                          {item.design.title}
                        </h4>
                        <span className="text-xs text-slate-500 dark:text-slate-400 block">
                          {item.design.garmentType}
                        </span>
                        <span className="font-mono text-xs text-rose-600 dark:text-rose-400 font-semibold tabular-nums">
                          ₹{item.design.priceRangeINR.min} – ₹{item.design.priceRangeINR.max} est.
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      {/* Quantity Stepper */}
                      <div className="flex items-center border border-rose-200 dark:border-rose-900 rounded-lg overflow-hidden bg-white dark:bg-neutral-900">
                        <button
                          type="button"
                          onClick={() => updateBasketItemQuantity(item.design.id, item.quantity - 1)}
                          aria-label={`Decrease quantity of ${item.design.title}`}
                          className="px-2 py-1 text-slate-600 hover:bg-rose-50 dark:hover:bg-rose-950"
                        >
                          -
                        </button>
                        <span className="px-2 py-1 text-xs font-mono font-semibold">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateBasketItemQuantity(item.design.id, item.quantity + 1)}
                          aria-label={`Increase quantity of ${item.design.title}`}
                          className="px-2 py-1 text-slate-600 hover:bg-rose-50 dark:hover:bg-rose-950"
                        >
                          +
                        </button>
                      </div>

                      {/* Remove Button */}
                      <button
                        type="button"
                        onClick={() => removeFromBasket(item.design.id)}
                        aria-label={`Remove ${item.design.title} from basket`}
                        className="p-1.5 text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 rounded-lg hover:bg-rose-50"
                      >
                        <Trash2 className="w-4 h-4" aria-hidden="true" />
                      </button>
                    </div>
                  </div>
                ))}

                {/* Subtotal Indicative Summary */}
                <div className="p-3 bg-white dark:bg-neutral-900 rounded-xl border border-rose-100 dark:border-rose-900 flex items-center justify-between text-xs">
                  <span className="text-slate-600 dark:text-slate-400 font-medium">
                    Total Starting Estimate:
                  </span>
                  <span className="font-mono text-sm font-bold text-slate-900 dark:text-rose-100 tabular-nums">
                    ₹{totalMin.toLocaleString()} – ₹{totalMax.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Estimate Request Form */}
              <form onSubmit={handleSubmitEstimate} className="pt-4 border-t border-rose-100 dark:border-rose-950 space-y-3.5">
                <h4 className="font-serif text-base font-bold text-slate-900 dark:text-rose-50">
                  Request Free Price Quote
                </h4>

                {validationError && (
                  <div role="alert" className="p-2.5 bg-rose-50 dark:bg-rose-950/60 border border-rose-300 dark:border-rose-800 rounded-lg text-xs text-rose-700 dark:text-rose-200">
                    {validationError}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label htmlFor="basket-name" className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                      Your Full Name <span className="text-rose-500">*</span>
                    </label>
                    <input
                      id="basket-name"
                      type="text"
                      required
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="e.g. Radhika Sharma"
                      className="w-full px-3 py-2 text-xs bg-rose-50/40 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
                    />
                  </div>

                  <div>
                    <label htmlFor="basket-contact" className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                      Phone, WhatsApp, or Email <span className="text-rose-500">*</span>
                    </label>
                    <input
                      id="basket-contact"
                      type="text"
                      required
                      value={contactValue}
                      onChange={(e) => setContactValue(e.target.value)}
                      placeholder="e.g. +91 98765 43210 or email"
                      className="w-full px-3 py-2 text-xs bg-rose-50/40 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="basket-notes" className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Fabric or Customization Notes (Optional)
                  </label>
                  <textarea
                    id="basket-notes"
                    rows={2}
                    value={additionalNotes}
                    onChange={(e) => setAdditionalNotes(e.target.value)}
                    placeholder="e.g. I have a maroon raw silk fabric piece and need it completed before Diwali..."
                    className="w-full px-3 py-2 text-xs bg-rose-50/40 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 bg-rose-500 hover:bg-rose-600 text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-2 shadow-xs transition-colors"
                >
                  <Send className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>Submit Estimate Request (Demo)</span>
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
