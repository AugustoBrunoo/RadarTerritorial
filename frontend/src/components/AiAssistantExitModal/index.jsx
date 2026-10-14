import React, { useEffect, useState } from 'react';
import { AlertTriangle, X } from 'lucide-react';

export default function AiAssistantExitModal({ isOpen, onClose, onConfirm }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setShow(true);
      document.body.style.overflow = 'hidden';
    } else {
      const timer = setTimeout(() => setShow(false), 300);
      document.body.style.overflow = '';
      return () => clearTimeout(timer);
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen && !show) return null;

  return (
    <div
      className={`fixed inset-0 z-[120] flex items-center justify-center p-4 bg-zinc-900/60 dark:bg-black/80 backdrop-blur-md transition-opacity duration-300 ${
        isOpen ? 'opacity-100' : 'opacity-0'
      }`}
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="exit-modal-title"
        className={`bg-white dark:bg-zinc-950 w-full max-w-md rounded-3xl sm:rounded-[2.5rem] border border-zinc-200 dark:border-zinc-800 shadow-2xl overflow-hidden p-6 sm:p-8 text-center relative transition-all duration-300 transform ${
          isOpen ? 'scale-100 translate-y-0 opacity-100' : 'scale-95 translate-y-4 opacity-0'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Botão de Fechar no topo */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 sm:top-5 sm:right-5 p-2 rounded-full text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
          aria-label="Fechar"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Ícone de Aviso */}
        <div className="w-16 h-16 sm:w-20 sm:h-20 bg-amber-50 dark:bg-amber-950/40 text-amber-500 rounded-3xl flex items-center justify-center mx-auto mb-5 border border-amber-200/60 dark:border-amber-800/50 shadow-inner">
          <AlertTriangle className="h-8 w-8 sm:h-10 sm:w-10 animate-bounce duration-1000" />
        </div>

        <h2 id="exit-modal-title" className="font-black text-xl sm:text-2xl text-zinc-900 dark:text-white mb-2 tracking-tight">
          Sair do assistente?
        </h2>

        <p className="text-sm sm:text-base text-zinc-500 dark:text-zinc-400 mb-6 font-medium leading-relaxed">
          Tem certeza de que deseja sair? O progresso do seu relato será{' '}
          <span className="font-bold text-red-500 dark:text-red-400">perdido</span> e você terá que começar novamente.
        </p>

        {/* Botões de Ação */}
        <div className="flex flex-col sm:flex-row-reverse gap-2.5 sm:gap-3 w-full">
          <button
            type="button"
            onClick={onConfirm}
            className="w-full sm:flex-1 px-4 py-3 sm:py-3.5 rounded-2xl font-bold text-sm bg-red-600 hover:bg-red-700 active:scale-95 text-white transition-all shadow-md shadow-red-600/20 cursor-pointer flex items-center justify-center gap-2"
          >
            Sim, sair
          </button>
          <button
            type="button"
            onClick={onClose}
            className="w-full sm:flex-1 px-4 py-3 sm:py-3.5 rounded-2xl font-bold text-sm bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-200 hover:bg-zinc-200 dark:hover:bg-zinc-700 active:scale-95 transition-all cursor-pointer"
          >
            Continuar no relato
          </button>
        </div>
      </div>
    </div>
  );
}
