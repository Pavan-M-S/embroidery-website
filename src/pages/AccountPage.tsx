import React, { useState } from 'react';
import { Eye, EyeOff, Lock, Mail, User, CheckCircle2, Info, LogOut, Heart, ShoppingBag } from 'lucide-react';
import { useShopping } from '../context/ShoppingContext';
import { Link } from 'react-router-dom';

export const AccountPage: React.FC = () => {
  const { favouriteCount, basketCount, openBasket } = useShopping();
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Form State (kept in component memory only, NEVER saved to localStorage)
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Please enter a valid email address.';
    }
    if (!password || password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters.';
    }
    if (activeTab === 'register' && !fullName.trim()) {
      newErrors.fullName = 'Please enter your name.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    // Simulate demo login/registration in local state
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setEmail('');
    setPassword('');
    setFullName('');
    setPhone('');
    setErrors({});
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-10">
      {/* Page Header */}
      <div className="max-w-2xl mx-auto text-center space-y-3">
        <span className="text-xs font-semibold uppercase tracking-wider text-rose-600 dark:text-rose-400">
          Customer Portal Demo
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900 dark:text-rose-50">
          {isLoggedIn ? 'Welcome to Your Account' : 'Sign In or Register'}
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
          A demonstration customer portal for reviewing saved embroidery shortlists and custom order inquiries.
        </p>
      </div>

      {/* Prominent Demo Limitation Disclaimer */}
      <div className="max-w-md mx-auto p-4 rounded-xl bg-amber-50/80 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/80 flex items-start gap-3 text-xs text-amber-900 dark:text-amber-200">
        <Info className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" aria-hidden="true" />
        <div className="space-y-1">
          <p className="font-bold text-amber-950 dark:text-amber-100">
            Front-End Demonstration Only
          </p>
          <p>
            No real credentials are sent to or stored on a database. Sensitive password data is never saved to localStorage. You can test sign-in with any dummy email and password (6+ chars).
          </p>
        </div>
      </div>

      {isLoggedIn ? (
        /* Logged In Demo Profile View */
        <div className="max-w-md mx-auto bg-white dark:bg-[#181318] p-6 sm:p-8 rounded-3xl border border-rose-100 dark:border-rose-950 shadow-md space-y-6 animate-fade-in">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-rose-500 text-white font-serif text-2xl font-bold flex items-center justify-center">
              {fullName ? fullName.charAt(0).toUpperCase() : email.charAt(0).toUpperCase()}
            </div>
            <div>
              <h2 className="font-serif text-xl font-bold text-slate-900 dark:text-rose-100">
                {fullName || 'Demo Craft Patron'}
              </h2>
              <span className="text-xs text-slate-500 dark:text-slate-400 block">{email}</span>
              <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">
                Active Demo Session
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-2">
            <Link
              to="/designs?filter=favourites"
              className="p-3 bg-rose-50/50 dark:bg-rose-950/30 rounded-xl border border-rose-100 dark:border-rose-950 flex flex-col items-center justify-center text-center hover:bg-rose-100/50 transition-colors"
            >
              <Heart className="w-5 h-5 text-rose-500 mb-1" aria-hidden="true" />
              <span className="font-mono text-base font-bold text-slate-900 dark:text-rose-100">
                {favouriteCount}
              </span>
              <span className="text-[11px] text-slate-500 dark:text-slate-400">Saved Favourites</span>
            </Link>

            <button
              type="button"
              onClick={openBasket}
              className="p-3 bg-amber-50/50 dark:bg-amber-950/30 rounded-xl border border-amber-200 dark:border-amber-900 flex flex-col items-center justify-center text-center hover:bg-amber-100/50 transition-colors"
            >
              <ShoppingBag className="w-5 h-5 text-amber-500 mb-1" aria-hidden="true" />
              <span className="font-mono text-base font-bold text-slate-900 dark:text-rose-100">
                {basketCount}
              </span>
              <span className="text-[11px] text-slate-500 dark:text-slate-400">Quote Basket Items</span>
            </button>
          </div>

          <div className="pt-1">
            <Link
              to="/track-order"
              className="w-full py-2.5 bg-rose-500 hover:bg-rose-600 text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-colors shadow-xs"
            >
              <span>Track Active Project (Quote Status)</span>
            </Link>
          </div>

          <div className="pt-2 border-t border-rose-100 dark:border-rose-950">
            <button
              type="button"
              onClick={handleLogout}
              className="w-full py-2.5 bg-rose-50 dark:bg-rose-950/50 hover:bg-rose-100 text-rose-700 dark:text-rose-300 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
            >
              <LogOut className="w-4 h-4" aria-hidden="true" />
              <span>Sign Out of Demo Session</span>
            </button>
          </div>
        </div>
      ) : (
        /* Sign In / Register Tabs */
        <div className="max-w-md mx-auto bg-white dark:bg-[#181318] p-6 sm:p-8 rounded-3xl border border-rose-100 dark:border-rose-950 shadow-xs space-y-6">
          <div className="flex border-b border-rose-100 dark:border-rose-950 text-xs font-semibold">
            <button
              type="button"
              onClick={() => {
                setActiveTab('login');
                setErrors({});
              }}
              className={`flex-1 pb-3 transition-colors border-b-2 ${
                activeTab === 'login'
                  ? 'border-rose-500 text-rose-600 dark:text-rose-400'
                  : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              Sign In (Demo)
            </button>
            <button
              type="button"
              onClick={() => {
                setActiveTab('register');
                setErrors({});
              }}
              className={`flex-1 pb-3 transition-colors border-b-2 ${
                activeTab === 'register'
                  ? 'border-rose-500 text-rose-600 dark:text-rose-400'
                  : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              Create Account (Demo)
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {activeTab === 'register' && (
              <div>
                <label htmlFor="acc-fullname" className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Full Name <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <input
                    id="acc-fullname"
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Radhika Sharma"
                    className="w-full pl-9 pr-3.5 py-2.5 text-xs sm:text-sm bg-rose-50/40 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500 text-slate-900 dark:text-rose-100"
                  />
                  <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" aria-hidden="true" />
                </div>
                {errors.fullName && (
                  <span className="text-xs text-rose-600 dark:text-rose-400 mt-1 block">
                    {errors.fullName}
                  </span>
                )}
              </div>
            )}

            <div>
              <label htmlFor="acc-email" className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Email Address <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <input
                  id="acc-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. radhika@example.com"
                  className="w-full pl-9 pr-3.5 py-2.5 text-xs sm:text-sm bg-rose-50/40 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500 text-slate-900 dark:text-rose-100"
                />
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" aria-hidden="true" />
              </div>
              {errors.email && (
                <span className="text-xs text-rose-600 dark:text-rose-400 mt-1 block">
                  {errors.email}
                </span>
              )}
            </div>

            <div>
              <label htmlFor="acc-password" className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Password <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <input
                  id="acc-password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter 6+ characters"
                  className="w-full pl-9 pr-10 py-2.5 text-xs sm:text-sm bg-rose-50/40 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500 text-slate-900 dark:text-rose-100"
                />
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" aria-hidden="true" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  className="absolute right-3 top-3 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" aria-hidden="true" />
                  ) : (
                    <Eye className="w-4 h-4" aria-hidden="true" />
                  )}
                </button>
              </div>
              {errors.password && (
                <span className="text-xs text-rose-600 dark:text-rose-400 mt-1 block">
                  {errors.password}
                </span>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-rose-500 hover:bg-rose-600 text-white rounded-xl text-xs sm:text-sm font-semibold shadow-xs transition-colors"
            >
              {activeTab === 'login' ? 'Sign In to Demo' : 'Create Demo Account'}
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
