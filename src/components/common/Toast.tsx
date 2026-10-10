import React from 'react';
import { useShopping } from '../../context/ShoppingContext';
import { CheckCircle2 } from 'lucide-react';

export const Toast: React.FC = () => {
  const { toastMessage } = useShopping();

  if (!toastMessage) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-22 right-6 z-50 max-w-sm bg-slate-900 text-white dark:bg-rose-950 dark:border dark:border-rose-800/60 px-4 py-3 rounded-lg shadow-xl flex items-center gap-3 text-sm animate-fade-in"
    >
      <CheckCircle2 className="w-5 h-5 text-rose-400 shrink-0" aria-hidden="true" />
      <span>{toastMessage}</span>
    </div>
  );
};
