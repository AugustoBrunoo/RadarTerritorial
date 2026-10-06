import React, { useEffect } from 'react';
import { Sparkles, X } from 'lucide-react';
import AiAssistantInfoCards from '../AiAssistantInfoCards';

export default function AiAssistantHowItWorksModal({ isOpen, onClose }) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-zinc-900/60 dark:bg-black/80 backdrop-blur-md animate-in fade-in duration-300">
      <div className="bg-white dark:bg-zinc-900 w-full max-w-4xl rounded-[2.5rem] border border-zinc-200 dark:border-zinc-800 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300 flex flex-col">

        {/* Header */}
        <div className="p-6 border-b border-zinc-100 dark:border-zinc-800/80 flex justify-between items-center bg-zinc-50 dark:bg-zinc-950/40">
          <div className="flex items-center gap-2.5">
            <div className="bg-red-600 p-2 rounded-xl text-white">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-black text-lg text-zinc-900 dark:text-white leading-none">Como funciona a IA?</h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-zinc-200 dark:hover:bg-zinc-800 rounded-full transition-colors text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Body (Cards) */}
        <div className="p-6 sm:p-8 flex-1 overflow-y-auto max-h-[70vh]">
          <AiAssistantInfoCards />
          
          <div className="mt-4 flex justify-end">
            <button
              onClick={onClose}
              className="bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 font-extrabold text-sm py-3 px-6 rounded-xl transition-all hover:scale-105 active:scale-95"
            >
              Entendi, começar!
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
