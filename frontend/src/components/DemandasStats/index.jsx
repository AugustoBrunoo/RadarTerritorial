import React from 'react';
import { Inbox, Clock, MessageSquare, CheckCircle } from 'lucide-react';

export default function DemandasStats({ counts }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-8">
      {/* Total Enviados */}
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-4 sm:p-5 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
        <div className="absolute -right-6 -top-6 w-24 h-24 bg-zinc-100 dark:bg-zinc-800 rounded-full blur-2xl opacity-50 group-hover:opacity-100 transition-opacity"></div>
        <div className="flex justify-between items-start mb-3 relative z-10">
          <div className="w-9 h-9 rounded-xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-600 dark:text-zinc-400">
            <Inbox className="w-4.5 h-4.5" />
          </div>
          <span className="text-2xl sm:text-3xl font-black text-zinc-900 dark:text-white leading-none tracking-tight">{counts.all}</span>
        </div>
        <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 relative z-10">
          Total Enviados
        </span>
      </div>

      {/* Aguardando Resposta */}
      <div className="bg-white dark:bg-zinc-900 border border-amber-200 dark:border-amber-900/40 rounded-2xl p-4 sm:p-5 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
        <div className="absolute -right-6 -top-6 w-24 h-24 bg-amber-100 dark:bg-amber-900/20 rounded-full blur-2xl opacity-50 group-hover:opacity-100 transition-opacity"></div>
        <div className="flex justify-between items-start mb-3 relative z-10">
          <div className="w-9 h-9 rounded-xl bg-amber-50 dark:bg-amber-900/30 flex items-center justify-center text-amber-600 dark:text-amber-400">
            <Clock className="w-4.5 h-4.5" />
          </div>
          <span className="text-2xl sm:text-3xl font-black text-zinc-900 dark:text-white leading-none tracking-tight">{counts.nao_respondidos}</span>
        </div>
        <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-500 relative z-10">
          Aguardando
        </span>
      </div>

      {/* Respondidos */}
      <div className="bg-white dark:bg-zinc-900 border border-blue-200 dark:border-blue-900/40 rounded-2xl p-4 sm:p-5 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
        <div className="absolute -right-6 -top-6 w-24 h-24 bg-blue-100 dark:bg-blue-900/20 rounded-full blur-2xl opacity-50 group-hover:opacity-100 transition-opacity"></div>
        <div className="flex justify-between items-start mb-3 relative z-10">
          <div className="w-9 h-9 rounded-xl bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
            <MessageSquare className="w-4.5 h-4.5" />
          </div>
          <span className="text-2xl sm:text-3xl font-black text-zinc-900 dark:text-white leading-none tracking-tight">{counts.respondidos}</span>
        </div>
        <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-500 relative z-10">
          Em Andamento
        </span>
      </div>

      {/* Finalizados */}
      <div className="bg-white dark:bg-zinc-900 border border-emerald-200 dark:border-emerald-900/40 rounded-2xl p-4 sm:p-5 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
        <div className="absolute -right-6 -top-6 w-24 h-24 bg-emerald-100 dark:bg-emerald-900/20 rounded-full blur-2xl opacity-50 group-hover:opacity-100 transition-opacity"></div>
        <div className="flex justify-between items-start mb-3 relative z-10">
          <div className="w-9 h-9 rounded-xl bg-emerald-50 dark:bg-emerald-900/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
            <CheckCircle className="w-4.5 h-4.5" />
          </div>
          <span className="text-2xl sm:text-3xl font-black text-zinc-900 dark:text-white leading-none tracking-tight">{counts.resolvido}</span>
        </div>
        <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 relative z-10">
          Finalizados
        </span>
      </div>
    </div>
  );
}
