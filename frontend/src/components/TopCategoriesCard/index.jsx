import React from 'react';
import { BarChart2, HelpCircle } from 'lucide-react';
import TooltipWrapper from '../TooltipWrapper';

export default function TopCategoriesCard({ kpis }) {
    const categorias = kpis?.distribuicaoCategorias || [];
    const topCategorias = categorias.slice(0, 4);
    
    // Calcula o total apenas das top categorias para o percentual da barra
    const maxValue = topCategorias[0]?.total || 1;

    const colors = [
        "bg-blue-600",
        "bg-amber-500",
        "bg-emerald-500",
        "bg-purple-500"
    ];

    return (
        <section 
            aria-labelledby="top-categories-title"
            className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-[2rem] p-6 shadow-sm space-y-6 relative hover:z-20 focus-within:z-20 transition-all flex flex-col h-full min-h-[300px]"
        >
            <div className="flex items-center justify-between">
                <h3 id="top-categories-title" className="text-base font-bold text-zinc-900 dark:text-white flex items-center gap-2">
                    <BarChart2 className="h-4 w-4 text-emerald-500" aria-hidden="true" /> Principais Tipos de Ocorrência
                </h3>
                <TooltipWrapper text="Ranqueamento das subcategorias com maior número de registros, auxiliando no planejamento de mutirões e equipes operacionais.">
                    <button
                        type="button"
                        aria-label="Informações sobre os Principais Tipos de Ocorrência"
                        className="p-1 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <HelpCircle className="h-4 w-4" />
                    </button>
                </TooltipWrapper>
            </div>

            {topCategorias.length === 0 ? (
                <div className="flex-grow flex items-center justify-center text-zinc-500 dark:text-zinc-400 text-sm">
                    Nenhum dado disponível.
                </div>
            ) : (
                <div className="space-y-3 flex-grow" role="list" aria-label="Ranking de tipos de ocorrências">
                    {topCategorias.map((categoria, index) => {
                        // Calcula proporção em relação ao maior valor para preencher a barra corretamente
                        const proporcao = Math.min(((categoria.total / maxValue) * 100), 100).toFixed(0);
                        const colorClass = colors[index % colors.length];
                        
                        return (
                            <div key={categoria.nome} role="listitem" className={index > 0 ? "pt-2" : ""}>
                                <div className="flex items-center justify-between text-xs font-bold text-zinc-700 dark:text-zinc-300">
                                    <span className="truncate pr-2">{categoria.nome}</span>
                                    <span className="text-zinc-900 dark:text-white font-extrabold">{categoria.total}</span>
                                </div>
                                <div className="w-full bg-zinc-100 dark:bg-zinc-800 rounded-full h-2 mt-1 overflow-hidden" role="progressbar" aria-valuenow={proporcao} aria-valuemin={0} aria-valuemax={100} aria-label={`${categoria.nome}: ${categoria.total} ocorrências`}>
                                    <div className={`${colorClass} h-full rounded-full transition-all duration-500`} style={{ width: `${proporcao}%` }}></div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </section>
    );
}
