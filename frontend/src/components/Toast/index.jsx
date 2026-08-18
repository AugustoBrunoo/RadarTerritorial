import React, { useEffect } from 'react';
import { CheckCircle2 } from 'lucide-react';

export default function Toast({ message, show, onClose, duration = 3000 }) {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        if (onClose) onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [show, duration, onClose]);

  if (!show) return null;

  return (
    <div className="fixed bottom-6 right-6 z-[120] flex items-center gap-3 px-5 py-3.5 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 rounded-2xl shadow-2xl border border-zinc-700 dark:border-zinc-200 animate-in fade-in slide-in-from-bottom-4 duration-300 pointer-events-none">
      <div className="w-6 h-6 rounded-full bg-green-500/20 text-green-500 dark:text-green-600 flex items-center justify-center flex-shrink-0">
        <CheckCircle2 className="h-4 w-4" />
      </div>
      <p className="text-xs sm:text-sm font-bold tracking-tight">
        {message || 'Alterações realizadas com sucesso!'}
      </p>
    </div>
  );
}
