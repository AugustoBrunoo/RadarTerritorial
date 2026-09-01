import React from 'react';
import { BellPlus, Inbox, Clock4, Siren } from 'lucide-react';

export default function FilaOperacionalKPIs({ kpis, loading }) {
  const novosHoje = loading ? '...' : kpis?.novosHoje || 0;
  const pendentes = loading ? '...' : kpis?.pendentes || 0;
  const naoRespondidos = loading ? '...' : kpis?.naoRespondidos || 0;
  const atrasados = loading ? '...' : kpis?.atrasados || 0;
  const slaText = loading ? '...' : (kpis?.sla || 3);

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 animate-[fadeInUp_0.5s_ease-out_forwards]" style={{ animationDelay: '0.1s' }}>
      
      <div className="bg-white dark:bg-zinc-900 rounded-[2rem] p-5 border border-zinc-200 dark:border-zinc-800 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/10 rounded-full blur-xl -mr-6 -mt-6"></div>
        <div className="flex justify-between items-start mb-3">
          <div className="bg-blue-50 dark:bg-blue-950/40 p-2 rounded-xl text-blue-600 dark:text-blue-400">
            <BellPlus className="h-5 w-5" />
          </div>
        </div>
        <div className="text-3xl font-black text-zinc-900 dark:text-white mb-1">{novosHoje}</div>
        <p className="text-xs font-bold uppercase tracking-wide text-zinc-500">Novos Hoje</p>
        <p className="text-[10px] text-zinc-400 mt-1">Atualizado até <span className="font-semibold text-blue-500">agora</span></p>
      </div>

      <div className="bg-white dark:bg-zinc-900 rounded-[2rem] p-5 border border-zinc-200 dark:border-zinc-800 shadow-sm relative overflow-hidden">
        <div className="flex justify-between items-start mb-3">
          <div className="bg-zinc-100 dark:bg-zinc-800 p-2 rounded-xl text-zinc-600 dark:text-zinc-400">
            <Inbox className="h-5 w-5" />
          </div>
        </div>
        <div className="text-3xl font-black text-zinc-900 dark:text-white mb-1">{pendentes}</div>
        <p className="text-xs font-bold uppercase tracking-wide text-zinc-500">Aguardando Triagem</p>
        <p className="text-[10px] text-zinc-400 mt-1">Parados na fila inicial</p>
      </div>

      <div className="bg-white dark:bg-zinc-900 rounded-[2rem] p-5 border border-zinc-200 dark:border-zinc-800 shadow-sm relative overflow-hidden">
        <div className="flex justify-between items-start mb-3">
          <div className="bg-amber-50 dark:bg-amber-950/40 p-2 rounded-xl text-amber-600 dark:text-amber-400">
            <Clock4 className="h-5 w-5" />
          </div>
        </div>
        <div className="text-3xl font-black text-zinc-900 dark:text-white mb-1">{naoRespondidos}</div>
        <p className="text-xs font-bold uppercase tracking-wide text-zinc-500">Não Respondidos</p>
        <p className="text-[10px] text-zinc-400 mt-1">Aguardando parecer técnico</p>
      </div>

      <div className="bg-white dark:bg-zinc-900 rounded-[2rem] p-5 border border-red-200 dark:border-red-900/30 shadow-sm relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-24 h-24 bg-red-500/10 rounded-full blur-xl -mr-6 -mt-6 transition-transform group-hover:scale-150"></div>
        <div className="flex justify-between items-start mb-3">
          <div className="bg-red-50 dark:bg-red-950/40 p-2 rounded-xl text-red-600 dark:text-red-400">
            <Siren className="h-5 w-5" />
          </div>
          <span className="flex h-2 w-2 rounded-full bg-red-500 animate-pulse mt-2 mr-1"></span>
        </div>
        <div className="text-3xl font-black text-red-600 dark:text-red-500 mb-1">{atrasados}</div>
        <p className="text-xs font-bold uppercase tracking-wide text-zinc-500">Atrasados (SLA &gt; {slaText}d)</p>
        <p className="text-[10px] text-zinc-400 mt-1 font-semibold text-red-400">Ação Imediata Necessária</p>
      </div>
    </div>
  );
}
