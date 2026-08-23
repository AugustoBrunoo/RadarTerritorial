import React from 'react';
import { Sliders, HelpCircle } from 'lucide-react';
import TooltipWrapper from '../TooltipWrapper';

export default function SlaSettingsCard() {
    return (
        <section 
            aria-labelledby="sla-settings-title"
            className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-[2rem] p-6 shadow-sm space-y-5 relative hover:z-20 focus-within:z-20 transition-all"
        >
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 rounded-xl">
                        <Sliders className="h-5 w-5" aria-hidden="true" />
                    </div>
                    <div>
                        <h3 id="sla-settings-title" className="text-base font-bold text-zinc-900 dark:text-white">
                            Meta Operacional & Equipe
                        </h3>
                        <p className="text-xs text-zinc-500">Defina o prazo padrão de atendimento.</p>
                    </div>
                </div>
                <TooltipWrapper text="Determina o tempo máximo aceitável para o órgão fornecer uma resposta conclusiva ao cidadão antes que o chamado entre em estado de alerta.">
                    <button
                        type="button"
                        aria-label="Informações sobre a Meta Operacional e SLA"
                        className="p-1 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <HelpCircle className="h-4 w-4" />
                    </button>
                </TooltipWrapper>
            </div>

            <div className="space-y-4 pt-2">
                <div>
                    <label htmlFor="sla-meta-select" className="block text-xs font-bold uppercase tracking-wider text-zinc-500 mb-2">
                        Meta de Tempo de Resposta (SLA)
                    </label>
                    <select 
                        id="sla-meta-select"
                        defaultValue="3" 
                        className="w-full bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 rounded-xl px-4 py-3 text-sm font-bold text-zinc-900 dark:text-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                    >
                        <option value="2">Até 2 dias úteis</option>
                        <option value="3">Até 3 dias úteis (Padrão)</option>
                        <option value="5">Até 5 dias úteis</option>
                    </select>
                </div>

                <div className="pt-2">
                    <button 
                        type="button"
                        onClick={() => alert('Configurações salvas com sucesso!')} 
                        className="w-full bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 hover:bg-zinc-800 dark:hover:bg-zinc-200 py-3 rounded-xl font-extrabold text-xs transition-all shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                        Salvar Preferências
                    </button>
                </div>
            </div>
        </section>
    );
}
