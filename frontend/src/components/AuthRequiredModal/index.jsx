import React from 'react';
import { useNavigate } from 'react-router';
import { X, UserCircle, LogIn } from 'lucide-react';

export default function AuthRequiredModal({ isOpen, onClose, message = "Crie uma conta para interagir com relatos." }) {
  const navigate = useNavigate();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-all duration-300 animate-in fade-in">
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl w-full max-w-md overflow-hidden shadow-2xl relative animate-in zoom-in-95 duration-300">

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 rounded-full transition-colors z-10"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="p-8 text-center flex flex-col items-center">
          <div className="w-16 h-16 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-full flex items-center justify-center mb-6">
            <UserCircle className="h-8 w-8" />
          </div>

          <h2 className="text-2xl font-black text-zinc-900 dark:text-white mb-3">Acesso Restrito</h2>

          <p className="text-zinc-600 dark:text-zinc-400 font-medium leading-relaxed mb-8">
            {message}
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full">
            <button
              onClick={onClose}
              className="w-full sm:flex-1 py-3.5 px-4 rounded-xl font-bold bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 transition-all text-sm"
            >
              Voltar
            </button>
            <button
              onClick={() => navigate('/login')}
              className="w-full sm:flex-1 py-3.5 px-4 rounded-xl font-bold bg-red-600 hover:bg-red-700 text-white transition-all text-sm flex items-center justify-center gap-2 shadow-md shadow-red-600/20"
            >
              <LogIn className="h-4 w-4" /> Fazer Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
