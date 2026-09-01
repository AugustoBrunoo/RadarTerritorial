import React from 'react';
import { Donut, HelpCircle } from 'lucide-react';
import TooltipWrapper from '../TooltipWrapper';

export default function StatusDistributionCard({ kpis }) {
    if (!kpis || kpis.total === 0) {
        return (
            <section 
                aria-labelledby="status-dist-title"
                className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-[2rem] p-6 shadow-sm space-y-6 relative hover:z-20 focus-within:z-20 transition-all flex flex-col justify-center items-center h-full min-h-[300px]"
            >
                <div className="text-zinc-500 dark:text-zinc-400 text-sm">Nenhum dado disponível.</div>
            </section>
        );
    }

    const formatPercent = (value, total) => total > 0 ? ((value / total) * 100).toFixed(1) : 0;
    const resolvidosPercent = formatPercent(kpis.resolvidos, kpis.total);
    const emExecucaoPercent = formatPercent(kpis.emExecucao, kpis.total);
    const emAnalisePercent = formatPercent(kpis.emAnalise, kpis.total);
    const pendentesPercent = formatPercent(kpis.pendentes, kpis.total);
    const rejeitadosPercent = formatPercent(kpis.rejeitados, kpis.total);

    return (
        <section 
            aria-labelledby="status-dist-title"
            className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-[2rem] p-6 shadow-sm space-y-6 relative hover:z-20 focus-within:z-20 transition-all flex flex-col"
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

            <div className="space-y-4 flex-grow" role="list" aria-label="Lista de status de chamados">
                <div role="listitem">
                    <div className="flex justify-between text-xs font-bold mb-1">
                        <span className="text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
                            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" aria-hidden="true"></span> Resolvidos
                        </span>
                        <span className="text-zinc-900 dark:text-white">{kpis.resolvidos} ({resolvidosPercent}%)</span>
                    </div>
                    <div className="w-full bg-zinc-100 dark:bg-zinc-800 rounded-full h-2 overflow-hidden" role="progressbar" aria-valuenow={resolvidosPercent} aria-valuemin={0} aria-valuemax={100} aria-label={`${resolvidosPercent}% resolvidos`}>
                        <div className="bg-emerald-500 h-full rounded-full transition-all duration-500" style={{ width: `${resolvidosPercent}%` }}></div>
                    </div>
                </div>

                <div role="listitem">
                    <div className="flex justify-between text-xs font-bold mb-1">
                        <span className="text-blue-600 dark:text-blue-400 flex items-center gap-1.5">
                            <span className="w-2.5 h-2.5 rounded-full bg-blue-500" aria-hidden="true"></span> Em Execução
                        </span>
                        <span className="text-zinc-900 dark:text-white">{kpis.emExecucao} ({emExecucaoPercent}%)</span>
                    </div>
                    <div className="w-full bg-zinc-100 dark:bg-zinc-800 rounded-full h-2 overflow-hidden" role="progressbar" aria-valuenow={emExecucaoPercent} aria-valuemin={0} aria-valuemax={100} aria-label={`${emExecucaoPercent}% em execução`}>
                        <div className="bg-blue-500 h-full rounded-full transition-all duration-500" style={{ width: `${emExecucaoPercent}%` }}></div>
                    </div>
                </div>

                <div role="listitem">
                    <div className="flex justify-between text-xs font-bold mb-1">
                        <span className="text-amber-600 dark:text-amber-400 flex items-center gap-1.5">
                            <span className="w-2.5 h-2.5 rounded-full bg-amber-500" aria-hidden="true"></span> Em Análise
                        </span>
                        <span className="text-zinc-900 dark:text-white">{kpis.emAnalise} ({emAnalisePercent}%)</span>
                    </div>
                    <div className="w-full bg-zinc-100 dark:bg-zinc-800 rounded-full h-2 overflow-hidden" role="progressbar" aria-valuenow={emAnalisePercent} aria-valuemin={0} aria-valuemax={100} aria-label={`${emAnalisePercent}% em análise`}>
                        <div className="bg-amber-500 h-full rounded-full transition-all duration-500" style={{ width: `${emAnalisePercent}%` }}></div>
                    </div>
                </div>

                <div role="listitem">
                    <div className="flex justify-between text-xs font-bold mb-1">
                        <span className="text-red-600 dark:text-red-400 flex items-center gap-1.5">
                            <span className="w-2.5 h-2.5 rounded-full bg-red-500" aria-hidden="true"></span> Pendentes
                        </span>
                        <span className="text-zinc-900 dark:text-white">{kpis.pendentes} ({pendentesPercent}%)</span>
                    </div>
                    <div className="w-full bg-zinc-100 dark:bg-zinc-800 rounded-full h-2 overflow-hidden" role="progressbar" aria-valuenow={pendentesPercent} aria-valuemin={0} aria-valuemax={100} aria-label={`${pendentesPercent}% pendentes`}>
                        <div className="bg-red-500 h-full rounded-full transition-all duration-500" style={{ width: `${pendentesPercent}%` }}></div>
                    </div>
                </div>

                <div role="listitem">
                    <div className="flex justify-between text-xs font-bold mb-1">
                        <span className="text-zinc-600 dark:text-zinc-400 flex items-center gap-1.5">
                            <span className="w-2.5 h-2.5 rounded-full bg-zinc-500" aria-hidden="true"></span> Rejeitados
                        </span>
                        <span className="text-zinc-900 dark:text-white">{kpis.rejeitados} ({rejeitadosPercent}%)</span>
                    </div>
                    <div className="w-full bg-zinc-100 dark:bg-zinc-800 rounded-full h-2 overflow-hidden" role="progressbar" aria-valuenow={rejeitadosPercent} aria-valuemin={0} aria-valuemax={100} aria-label={`${rejeitadosPercent}% rejeitados`}>
                        <div className="bg-zinc-500 h-full rounded-full transition-all duration-500" style={{ width: `${rejeitadosPercent}%` }}></div>
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
