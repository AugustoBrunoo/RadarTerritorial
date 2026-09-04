import React from 'react';
import { Layers, HelpCircle } from 'lucide-react';
import TooltipWrapper from '../../TooltipWrapper';

export default function MapLegend() {
  return (
    <div className="bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col justify-between min-w-0 h-full relative">
      <div className="absolute top-6 right-6">
        <TooltipWrapper text="Informativo visual detalhando a gravidade temporal de cada alfinete inserido no mapeamento territorial.">
          <HelpCircle className="h-4 w-4 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 cursor-help transition-colors" />
        </TooltipWrapper>
      </div>
      <div>
        <h3 className="text-zinc-900 dark:text-white font-bold text-base mb-6 flex items-center gap-2">
          <Layers className="h-4 w-4 text-red-500" /> Legenda do Mapa
        </h3>
        <div className="space-y-4">
          <div className="flex items-center gap-3 p-3.5 bg-white dark:bg-zinc-950/40 rounded-2xl border border-zinc-200 dark:border-zinc-800/60 shadow-sm">
            <span className="w-3.5 h-3.5 rounded-full bg-red-500 border-2 border-white dark:border-zinc-900 block shrink-0"></span>
            <div>
              <p className="text-sm font-bold text-zinc-900 dark:text-zinc-200 leading-tight">Aguardando Conserto</p>
              <p className="text-[11px] text-zinc-500 mt-0.5">A prefeitura/órgão ainda não resolveu.</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3.5 bg-white dark:bg-zinc-950/40 rounded-2xl border border-zinc-200 dark:border-zinc-800/60 shadow-sm">
            <span className="w-3.5 h-3.5 rounded-full bg-amber-500 border-2 border-white dark:border-zinc-900 block shrink-0"></span>
            <div>
              <p className="text-sm font-bold text-zinc-900 dark:text-zinc-200 leading-tight">Alerta de Atraso</p>
              <p className="text-[11px] text-zinc-500 mt-0.5">Mais de 20 dias parado.</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3.5 bg-white dark:bg-zinc-950/40 rounded-2xl border border-zinc-200 dark:border-zinc-800/60 shadow-sm">
            <span className="w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-white dark:border-zinc-900 block shrink-0"></span>
            <div>
              <p className="text-sm font-bold text-zinc-900 dark:text-zinc-200 leading-tight">Resolvido</p>
              <p className="text-[11px] text-zinc-500 mt-0.5">Conserto confirmado.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
