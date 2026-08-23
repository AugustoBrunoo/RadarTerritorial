import React from 'react';
import { MapPin, HelpCircle } from 'lucide-react';
import TooltipWrapper from '../TooltipWrapper';

export default function NeighborhoodDemandsCard() {
    return (
        <section
            aria-labelledby="neighborhood-demands-title"
            className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-[2rem] p-6 shadow-sm space-y-6 relative hover:z-20 focus-within:z-20 transition-all"
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

            <div className="space-y-4" role="list" aria-label="Lista de demandas por bairro">
                <div role="listitem" className="p-3 bg-zinc-50 dark:bg-zinc-800/50 rounded-2xl border border-zinc-100 dark:border-zinc-800 flex items-center justify-between">
                    <div>
                        <h4 className="text-sm font-bold text-zinc-900 dark:text-white">Campo Grande</h4>
                        <span className="text-[11px] text-zinc-500">642 chamados • 68% atendidos</span>
                    </div>
                    <span className="text-sm font-black text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40 px-3 py-1 rounded-xl">51,4%</span>
                </div>

                <div role="listitem" className="p-3 bg-zinc-50 dark:bg-zinc-800/50 rounded-2xl border border-zinc-100 dark:border-zinc-800 flex items-center justify-between">
                    <div>
                        <h4 className="text-sm font-bold text-zinc-900 dark:text-white">Cosmos</h4>
                        <span className="text-[11px] text-zinc-500 font-medium text-red-500">384 chamados • 42% não respondidos</span>
                    </div>
                    <span className="text-sm font-black text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40 px-3 py-1 rounded-xl">30,7%</span>
                </div>

                <div role="listitem" className="p-3 bg-zinc-50 dark:bg-zinc-800/50 rounded-2xl border border-zinc-100 dark:border-zinc-800 flex items-center justify-between">
                    <div>
                        <h4 className="text-sm font-bold text-zinc-900 dark:text-white">Inhoaíba</h4>
                        <span className="text-[11px] text-zinc-500">222 chamados • 81% atendidos</span>
                    </div>
                    <span className="text-sm font-black text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-3 py-1 rounded-xl">17,9%</span>
                </div>
            </div>
        </section>
    );
}
