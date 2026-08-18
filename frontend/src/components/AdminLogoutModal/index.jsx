import React from 'react';
import { LogOut } from 'lucide-react';

export default function AdminLogoutModal({ isOpen, onClose, onConfirm, loading = false }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-zinc-900/60 dark:bg-black/80 backdrop-blur-md animate-in fade-in duration-300">
      <div className="bg-white dark:bg-zinc-900 w-full max-w-sm rounded-[2rem] border border-zinc-200 dark:border-zinc-800 shadow-2xl overflow-hidden flex flex-col p-6 sm:p-8 text-center relative animate-in zoom-in-95 duration-300">
        
        <div className="w-16 h-16 bg-red-50 dark:bg-red-900/20 text-red-600 rounded-full flex items-center justify-center mx-auto mb-5 border border-red-100 dark:border-red-900/30">
          <LogOut className="h-8 w-8" />
        </div>

        <h3 className="font-black text-xl text-zinc-900 dark:text-white mb-2">Encerrar Sessão?</h3>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-6 font-medium leading-relaxed">
          Tem certeza que deseja sair do painel administrativo? Você será redirecionado para a tela de login.
        </p>

        <div className="flex flex-col gap-3 w-full">
          <button 
            onClick={onConfirm}
            disabled={loading}
            className="w-full px-4 py-3 rounded-xl font-bold text-sm bg-red-600 hover:bg-red-700 text-white transition-colors shadow-sm shadow-red-500/20 cursor-pointer disabled:opacity-50"
          >
            {loading ? 'Saindo...' : 'Sim, encerrar sessão'}
          </button>
          <button 
            onClick={onClose}
            disabled={loading}
            className="w-full px-4 py-3 rounded-xl font-bold text-sm bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-white hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors cursor-pointer"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}
