import React from 'react';
import { BarChart2, HelpCircle } from 'lucide-react';
import TooltipWrapper from '../TooltipWrapper';

export default function TopCategoriesCard() {
    return (
        <section 
            aria-labelledby="top-categories-title"
            className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-[2rem] p-6 shadow-sm space-y-6 relative hover:z-20 focus-within:z-20 transition-all"
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

            <div className="space-y-3" role="list" aria-label="Ranking de tipos de ocorrências">
                <div role="listitem">
                    <div className="flex items-center justify-between text-xs font-bold text-zinc-700 dark:text-zinc-300">
                        <span>Lixo acumulado em calçadas</span>
                        <span className="text-zinc-900 dark:text-white font-extrabold">512</span>
                    </div>
                    <div className="w-full bg-zinc-100 dark:bg-zinc-800 rounded-full h-2 mt-1 overflow-hidden" role="progressbar" aria-valuenow={65} aria-valuemin={0} aria-valuemax={100} aria-label="Lixo acumulado em calçadas: 512 ocorrências">
                        <div className="bg-blue-600 h-full rounded-full" style={{ width: '65%' }}></div>
                    </div>
                </div>

                <div role="listitem" className="pt-2">
                    <div className="flex items-center justify-between text-xs font-bold text-zinc-700 dark:text-zinc-300">
                        <span>Descarte irregular de entulho</span>
                        <span className="text-zinc-900 dark:text-white font-extrabold">340</span>
                    </div>
                    <div className="w-full bg-zinc-100 dark:bg-zinc-800 rounded-full h-2 mt-1 overflow-hidden" role="progressbar" aria-valuenow={45} aria-valuemin={0} aria-valuemax={100} aria-label="Descarte irregular de entulho: 340 ocorrências">
                        <div className="bg-amber-500 h-full rounded-full" style={{ width: '45%' }}></div>
                    </div>
                </div>

                <div role="listitem" className="pt-2">
                    <div className="flex items-center justify-between text-xs font-bold text-zinc-700 dark:text-zinc-300">
                        <span>Atraso na coleta domiciliar</span>
                        <span className="text-zinc-900 dark:text-white font-extrabold">264</span>
                    </div>
                    <div className="w-full bg-zinc-100 dark:bg-zinc-800 rounded-full h-2 mt-1 overflow-hidden" role="progressbar" aria-valuenow={32} aria-valuemin={0} aria-valuemax={100} aria-label="Atraso na coleta domiciliar: 264 ocorrências">
                        <div className="bg-emerald-500 h-full rounded-full" style={{ width: '32%' }}></div>
                    </div>
                </div>

                <div role="listitem" className="pt-2">
                    <div className="flex items-center justify-between text-xs font-bold text-zinc-700 dark:text-zinc-300">
                        <span>Móveis / Grandes Objetos</span>
                        <span className="text-zinc-900 dark:text-white font-extrabold">132</span>
                    </div>
                    <div className="w-full bg-zinc-100 dark:bg-zinc-800 rounded-full h-2 mt-1 overflow-hidden" role="progressbar" aria-valuenow={18} aria-valuemin={0} aria-valuemax={100} aria-label="Móveis e grandes objetos: 132 ocorrências">
                        <div className="bg-purple-500 h-full rounded-full" style={{ width: '18%' }}></div>
                    </div>
                </div>
            </div>
        </section>
    );
}
