import React from 'react';
import { MailWarning } from 'lucide-react';

export default function SolicitacaoCard({ solicitacao, onAprovar, onRejeitar }) {
  return (
    <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-sm flex items-start gap-4 animate-in fade-in slide-in-from-bottom-4">
      <div className="w-12 h-12 rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-100 dark:border-amber-800/30 flex items-center justify-center text-amber-600 flex-shrink-0">
        <MailWarning className="h-6 w-6" />
      </div>
      <div className="flex-1">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-bold text-zinc-900 dark:text-white">{solicitacao.name}</h3>
          <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider">{solicitacao.timeAgo}</span>
        </div>
        <p className="text-xs text-zinc-600 dark:text-zinc-400 mb-4">
          Solicitação de cadastro feita por <strong className="text-zinc-800 dark:text-zinc-200">{solicitacao.email}</strong> para área de {solicitacao.area}.
        </p>
        <div className="flex gap-2">
          <button 
            onClick={() => onAprovar(solicitacao)}
            className="px-4 py-2 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 rounded-xl text-xs font-bold hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors cursor-pointer"
          >
            Aprovar Órgão
          </button>
          <button 
            onClick={() => onRejeitar(solicitacao)}
            className="px-4 py-2 bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 rounded-xl text-xs font-bold hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors cursor-pointer"
          >
            Rejeitar
          </button>
        </div>
      </div>
    </div>
  );
}
