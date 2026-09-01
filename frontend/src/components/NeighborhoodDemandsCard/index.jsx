import React from 'react';
import { MapPin, HelpCircle } from 'lucide-react';
import TooltipWrapper from '../TooltipWrapper';

export default function NeighborhoodDemandsCard({ kpis }) {
    const bairros = kpis?.distribuicaoBairros || [];
    const topBairros = bairros.slice(0, 3);
    const totalGeral = kpis?.total || 1;

    // Definição de cores fixas para os top 3
    const colors = [
        {
            bg: "bg-blue-50 dark:bg-blue-950/40",
            text: "text-blue-600 dark:text-blue-400"
        },
        {
            bg: "bg-amber-50 dark:bg-amber-950/40",
            text: "text-amber-600 dark:text-amber-400"
        },
        {
            bg: "bg-emerald-50 dark:bg-emerald-950/40",
            text: "text-emerald-600 dark:text-emerald-400"
        }
    ];

    return (
        <section
            aria-labelledby="neighborhood-demands-title"
            className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-[2rem] p-6 shadow-sm space-y-6 relative hover:z-20 focus-within:z-20 transition-all flex flex-col h-full min-h-[300px]"
        >
            <div className="flex items-center justify-between">
                <h3 id="neighborhood-demands-title" className="text-base font-bold text-zinc-900 dark:text-white flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-red-500" aria-hidden="true" /> Demandas por Bairro
                </h3>
                <TooltipWrapper text="Mapeia a distribuição geográfica das solicitações por bairro, permitindo identificar áreas com maior acúmulo de chamados.">
                    <button
                        type="button"
                        aria-label="Informações sobre as Demandas por Bairro"
                        className="p-1 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <HelpCircle className="h-4 w-4" />
                    </button>
                </TooltipWrapper>
            </div>

            {topBairros.length === 0 ? (
                <div className="flex-grow flex items-center justify-center text-zinc-500 dark:text-zinc-400 text-sm">
                    Nenhum dado disponível.
                </div>
            ) : (
                <div className="space-y-4 flex-grow" role="list" aria-label="Lista de demandas por bairro">
                    {topBairros.map((bairro, index) => {
                        const participacao = ((bairro.total / totalGeral) * 100).toFixed(1);
                        const atendidosPercent = bairro.total > 0 ? ((bairro.resolvidos / bairro.total) * 100).toFixed(0) : 0;
                        const naoRespondidosPercent = bairro.total > 0 ? ((bairro.naoRespondidos / bairro.total) * 100).toFixed(0) : 0;

                        // Se a maioria não foi respondida, mostramos alerta vermelho
                        const isCritico = naoRespondidosPercent > 50;

                        const colorClass = colors[index % colors.length];

                        return (
                            <div key={bairro.nome} role="listitem" className="p-3 bg-zinc-50 dark:bg-zinc-800/50 rounded-2xl border border-zinc-100 dark:border-zinc-800 flex items-center justify-between">
                                <div>
                                    <h4 className="text-sm font-bold text-zinc-900 dark:text-white">{bairro.nome}</h4>
                                    <span className={`text-[11px] ${isCritico ? 'font-medium text-red-500' : 'text-zinc-500'}`}>
                                        {bairro.total} chamados • {isCritico ? `${naoRespondidosPercent}% não respondidos` : `${atendidosPercent}% atendidos`}
                                    </span>
                                </div>
                                <span className={`text-sm font-black ${colorClass.text} ${colorClass.bg} px-3 py-1 rounded-xl`}>
                                    {participacao}%
                                </span>
                            </div>
                        );
                    })}
                </div>
            )}
        </section>
    );
}
