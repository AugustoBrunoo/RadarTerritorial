import React from 'react';
import { Link } from 'react-router';
import { Mail } from 'lucide-react';

export default function VerificationModal({ show }) {
  if (!show) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
      <div className="bg-white dark:bg-zinc-900 w-full max-w-md rounded-[2.5rem] p-6 sm:p-8 shadow-2xl border border-zinc-200 dark:border-zinc-800 animate-fade-in-up">
        
        <div className="w-16 h-16 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-2xl flex items-center justify-center mb-5 mx-auto">
          <Mail className="h-8 w-8" />
        </div>

        <h3 className="text-2xl font-black text-center text-zinc-900 dark:text-white mb-2 tracking-tight">Verifique seu E-mail</h3>
        <p className="text-sm text-center text-zinc-500 dark:text-zinc-400 mb-6 font-medium leading-relaxed">
          Quase lá! Enviamos um link de confirmação para o endereço informado. Siga o passo a passo para ativar sua conta:
        </p>

        <div className="space-y-4 mb-8">
          <div className="flex items-start gap-3 bg-zinc-50 dark:bg-zinc-950 p-3 rounded-xl border border-zinc-100 dark:border-zinc-800/60">
            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-zinc-200 dark:bg-zinc-800 text-xs font-black flex items-center justify-center text-zinc-700 dark:text-zinc-300">1</span>
            <p className="text-xs font-bold text-zinc-600 dark:text-zinc-400 leading-normal">
              Abra a caixa de entrada do e-mail cadastrado (verifique também a pasta de <span className="text-zinc-900 dark:text-white">Spam</span> ou <span className="text-zinc-900 dark:text-white">Promoções</span>).
            </p>
          </div>
          <div className="flex items-start gap-3 bg-zinc-50 dark:bg-zinc-950 p-3 rounded-xl border border-zinc-100 dark:border-zinc-800/60">
            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-zinc-200 dark:bg-zinc-800 text-xs font-black flex items-center justify-center text-zinc-700 dark:text-zinc-300">2</span>
            <p className="text-xs font-bold text-zinc-600 dark:text-zinc-400 leading-normal">
              Clique no botão ou link de <span className="text-red-600 dark:text-red-400">Confirmar Conta</span> presente na mensagem.
            </p>
          </div>
          <div className="flex items-start gap-3 bg-zinc-50 dark:bg-zinc-950 p-3 rounded-xl border border-zinc-100 dark:border-zinc-800/60">
            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-zinc-200 dark:bg-zinc-800 text-xs font-black flex items-center justify-center text-zinc-700 dark:text-zinc-300">3</span>
            <p className="text-xs font-bold text-zinc-600 dark:text-zinc-400 leading-normal">
              Após a validação, retorne à tela de login para acessar sua conta manualmente.
            </p>
          </div>
        </div>

        <Link 
          to="/login"
          className="w-full py-4 px-4 rounded-xl text-sm font-black text-white bg-red-600 hover:bg-red-700 text-center transition-all shadow-lg shadow-red-600/20 block transform hover:-translate-y-0.5"
        >
          Ir para o Login
        </Link>
      </div>
    </div>
  );
}
