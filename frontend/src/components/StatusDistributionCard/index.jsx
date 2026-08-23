import React from 'react';
import { Donut, HelpCircle } from 'lucide-react';
import TooltipWrapper from '../TooltipWrapper';

export default function StatusDistributionCard() {
    return (
        <section 
            aria-labelledby="status-dist-title"
            className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-[2rem] p-6 shadow-sm space-y-6 relative hover:z-20 focus-within:z-20 transition-all"
        >
            <div className="flex items-center justify-between">
                <h3 id="status-dist-title" className="text-base font-bold text-zinc-900 dark:text-white flex items-center gap-2">
                    <Donut className="h-4 w-4 text-blue-500" aria-hidden="true" /> Distribuição por Status
                </h3>
                <TooltipWrapper text="Apresenta a divisão quantitativa e percentual das ocorrências segundo o estágio operacional de atendimento.">
                    <button
                        type="button"
                        aria-label="Informações sobre a Distribuição por Status"
                        className="p-1 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <HelpCircle className="h-4 w-4" />
                    </button>
                </TooltipWrapper>
            </div>

            <div className="space-y-4" role="list" aria-label="Lista de status de chamados">
                <div role="listitem">
                    <div className="flex justify-between text-xs font-bold mb-1">
                        <span className="text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
                            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" aria-hidden="true"></span> Resolvidos
                        </span>
                        <span className="text-zinc-900 dark:text-white">894 (71,6%)</span>
                    </div>
                    <div className="w-full bg-zinc-100 dark:bg-zinc-800 rounded-full h-3 overflow-hidden" role="progressbar" aria-valuenow={71.6} aria-valuemin={0} aria-valuemax={100} aria-label="71,6% resolvidos">
                        <div className="bg-emerald-500 h-full rounded-full" style={{ width: '71.6%' }}></div>
                    </div>
                </div>

                <div role="listitem">
                    <div className="flex justify-between text-xs font-bold mb-1">
                        <span className="text-blue-600 dark:text-blue-400 flex items-center gap-1.5">
                            <span className="w-2.5 h-2.5 rounded-full bg-blue-500" aria-hidden="true"></span> Em Atendimento
                        </span>
                        <span className="text-zinc-900 dark:text-white">180 (14,4%)</span>
                    </div>
                    <div className="w-full bg-zinc-100 dark:bg-zinc-800 rounded-full h-3 overflow-hidden" role="progressbar" aria-valuenow={14.4} aria-valuemin={0} aria-valuemax={100} aria-label="14,4% em atendimento">
                        <div className="bg-blue-500 h-full rounded-full" style={{ width: '14.4%' }}></div>
                    </div>
                </div>

                <div role="listitem">
                    <div className="flex justify-between text-xs font-bold mb-1">
                        <span className="text-red-600 dark:text-red-400 flex items-center gap-1.5">
                            <span className="w-2.5 h-2.5 rounded-full bg-red-500" aria-hidden="true"></span> Não Respondidos
                        </span>
                        <span className="text-zinc-900 dark:text-white">174 (14,0%)</span>
                    </div>
                    <div className="w-full bg-zinc-100 dark:bg-zinc-800 rounded-full h-3 overflow-hidden" role="progressbar" aria-valuenow={14} aria-valuemin={0} aria-valuemax={100} aria-label="14% não respondidos">
                        <div className="bg-red-500 h-full rounded-full" style={{ width: '14.0%' }}></div>
                    </div>
                </div>
            </div>

            <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800/80 text-xs text-zinc-500 dark:text-zinc-400">
                <p className="leading-relaxed">
                    <strong className="text-zinc-900 dark:text-white">Nota de Resposta:</strong> Chamados sem interação por mais de 5 dias são sinalizados no painel do administrador.
                </p>
            </div>
        </section>
    );
}
