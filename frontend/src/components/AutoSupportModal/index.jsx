import React from 'react';
import { AlertTriangle, X } from 'lucide-react';

export default function AutoSupportModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white dark:bg-zinc-950 rounded-3xl p-6 sm:p-8 max-w-sm w-full shadow-2xl border border-zinc-200 dark:border-zinc-800 animate-in zoom-in-95 duration-200">
        <div className="flex justify-between items-start mb-5">
          <div className="w-12 h-12 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center text-amber-600 dark:text-amber-500 shrink-0">
            <AlertTriangle className="h-6 w-6" />
          </div>
          <button 
            onClick={onClose}
            className="text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors bg-zinc-100 dark:bg-zinc-800 p-2 rounded-full"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        
        <h3 className="text-xl font-black text-zinc-900 dark:text-white mb-2">
          Ação não permitida
        </h3>
        <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed mb-6 font-medium">
          Você não pode apoiar o seu próprio relato. A ideia do apoio é permitir que a comunidade vizinha engaje nas causas, aumentando a relevância do problema organicamente.
        </p>
        
        <button 
          onClick={onClose}
          className="w-full bg-zinc-900 dark:bg-white hover:bg-zinc-800 dark:hover:bg-zinc-200 text-white dark:text-zinc-900 font-bold py-3.5 rounded-2xl transition-all active:scale-95"
        >
          Entendi
        </button>
      </div>
    </div>
  );
}
