import React from 'react';
import { Activity, RefreshCw, CheckCircle, Clock, TimerOff, HelpCircle } from 'lucide-react';
import TooltipWrapper from '../../TooltipWrapper';

export default function GeralKpis({ stats, resolucaoPct, tempoMedio }) {
  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-5 shadow-lg relative flex flex-col justify-center min-w-0">
        <div className="absolute top-3 right-3 z-20">
          <TooltipWrapper text="Total de chamados em aberto aguardando ação da prefeitura e volumetria de reaberturas pela população.">
            <HelpCircle className="h-4 w-4 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 cursor-help transition-colors" />
          </TooltipWrapper>
        </div>
        <div className="absolute top-0 right-0 p-4 opacity-5 dark:opacity-10"><Activity className="h-16 w-16 text-red-500" /></div>
        <div className="relative z-10">
          <p className="text-xs font-black text-zinc-500 uppercase tracking-wider mb-1">Problemas em Andamento</p>
          <div className="flex items-end gap-2">
            <h3 className="text-4xl font-black text-zinc-900 dark:text-white">{stats.ativas}</h3>
          </div>
          <p className="text-[11px] font-medium text-red-600 dark:text-red-400 mt-2"><RefreshCw className="h-3 w-3 inline mr-1" /> {stats.reabertas} reclamações reabertas</p>
        </div>
      </div>

      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-5 shadow-lg relative min-w-0">
        <div className="absolute top-3 right-3 z-20">
          <TooltipWrapper text="Porcentagem de eficiência de zeladoria. Indica a proporção de problemas resolvidos perante o total registrado.">
            <HelpCircle className="h-4 w-4 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 cursor-help transition-colors" />
          </TooltipWrapper>
        </div>
        <div className="absolute top-0 right-0 p-4 opacity-5 dark:opacity-10"><CheckCircle className="h-16 w-16 text-emerald-500" /></div>
        <div className="relative z-10">
          <p className="text-xs font-black text-zinc-500 uppercase tracking-wider mb-1">Taxa de Solução</p>
          <div className="flex items-end gap-1">
            <h3 className="text-4xl font-black text-zinc-900 dark:text-white">{resolucaoPct}</h3><span className="text-2xl font-bold text-zinc-400 mb-1">%</span>
          </div>
          <div className="w-full bg-zinc-100 dark:bg-zinc-800 h-1.5 rounded-full mt-3 overflow-hidden">
            <div className="bg-emerald-500 h-full rounded-full transition-all duration-1000" style={{ width: `${resolucaoPct}%` }}></div>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-5 shadow-lg relative min-w-0">
        <div className="absolute top-3 right-3 z-20">
          <TooltipWrapper text="Média de dias corridos que as entidades públicas levam do recebimento do chamado até a conclusão do conserto.">
            <HelpCircle className="h-4 w-4 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 cursor-help transition-colors" />
          </TooltipWrapper>
        </div>
        <div className="absolute top-0 right-0 p-4 opacity-5 dark:opacity-10"><Clock className="h-16 w-16 text-amber-500" /></div>
        <div className="relative z-10">
          <p className="text-xs font-black text-zinc-500 uppercase tracking-wider mb-1">Prazo Médio de Espera</p>
          <div className="flex items-end gap-1">
            <h3 className="text-4xl font-black text-zinc-900 dark:text-white">{tempoMedio}</h3><span className="text-sm font-bold text-zinc-400 mb-1.5">dias</span>
          </div>
          <p className="text-[11px] font-medium text-zinc-500 mt-2">Tempo que o órgão leva para resolver</p>
        </div>
      </div>

      <div className="bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/40 rounded-2xl p-5 shadow-lg relative min-w-0">
        <div className="absolute top-3 right-3 z-20">
          <TooltipWrapper text="Casos críticos ignorados ou travados na burocracia que ultrapassaram o teto aceitável de 30 dias sem resposta.">
            <HelpCircle className="h-4 w-4 text-red-400 dark:text-red-500 hover:text-red-600 cursor-help transition-colors" />
          </TooltipWrapper>
        </div>
        <div className="absolute top-0 right-0 w-24 h-24 bg-red-600/10 blur-2xl rounded-full pointer-events-none"></div>
        <div className="relative z-10">
          <p className="text-xs font-black text-red-600 dark:text-red-400 uppercase tracking-wider mb-1 flex items-center gap-1.5">
            <TimerOff className="h-3.5 w-3.5" /> Prazo Vencido
          </p>
          <div className="flex items-end gap-1 mt-1">
            <h3 className="text-3xl font-black text-zinc-900 dark:text-white">{stats.slaEstourado}</h3><span className="text-sm font-bold text-zinc-500 mb-1">casos</span>
          </div>
          <p className="text-[11px] font-medium text-red-600 dark:text-red-400/80 mt-2 bg-red-100 dark:bg-red-950/30 inline-block px-2 py-1 rounded border border-red-200 dark:border-red-900/50">
            Mais de 30 dias sem resposta
          </p>
        </div>
      </div>
    </section>
  );
}
