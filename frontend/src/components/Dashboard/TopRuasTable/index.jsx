import React from 'react';
import { Users, HelpCircle, MapPin, Landmark } from 'lucide-react';
import TooltipWrapper from '../../TooltipWrapper';

export default function TopRuasTable({ topRuas }) {
  return (
    <section className="pb-4 mt-6">
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-4 sm:p-6 shadow-sm flex flex-col min-w-0">
        <div className="flex items-start justify-between gap-3 mb-6">
          <div className="min-w-0 flex-1">
            <h2 className="text-base sm:text-lg font-bold text-zinc-900 dark:text-white flex items-center gap-2">
              <MapPin className="h-5 w-5 text-red-500 shrink-0" />
              <span className="leading-snug">
                Ruas que Mais Precisam de Ajuda <span className="inline-block whitespace-nowrap text-zinc-500 dark:text-zinc-400 font-semibold text-sm sm:text-base">(Top 5)</span>
              </span>
            </h2>
            <p className="text-xs sm:text-sm font-medium text-zinc-500 dark:text-zinc-400 mt-1 leading-relaxed">
              Lista organizada pela quantidade de moradores afetados.
            </p>
          </div>
          
          <div className="shrink-0 pt-0.5">
            <TooltipWrapper text="Rank das 5 vias mais afetadas e urgentes. A ordenação prioriza o volume de engajamento e moradores impactados pela falha.">
              <HelpCircle className="h-4 w-4 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 cursor-help transition-colors" />
            </TooltipWrapper>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          {topRuas.length === 0 ? (
            <div className="p-8 text-center text-zinc-500 bg-zinc-50 dark:bg-zinc-950/50 rounded-2xl border border-dashed border-zinc-200 dark:border-zinc-800">
              Nenhum problema ativo nesta categoria.
            </div>
          ) : (
            topRuas.map(([key, val], idx) => {
              const [rua, bairro, op] = key.split('|');
              return (
                <div key={idx} className="flex flex-col md:flex-row md:items-center justify-between p-4 bg-zinc-50 hover:bg-zinc-100 dark:bg-zinc-950/40 dark:hover:bg-zinc-800/60 rounded-2xl border border-zinc-200 dark:border-zinc-800 transition-colors gap-4">
                  
                  {/* Left Side: Address Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="flex items-center justify-center bg-zinc-200 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 font-bold text-xs h-5 w-5 rounded-full shrink-0">
                        {idx + 1}
                      </span>
                      <strong className="block text-base text-zinc-900 dark:text-white truncate">{rua}</strong>
                    </div>
                    <div className="pl-7 flex flex-col sm:flex-row sm:items-center gap-1.5 sm:gap-4">
                      <div className="flex items-center gap-1.5 text-[13px] text-zinc-500 dark:text-zinc-400 min-w-0">
                        <MapPin className="h-3.5 w-3.5 shrink-0" />
                        <span className="truncate">{bairro}</span>
                      </div>
                      <div className="hidden sm:block text-zinc-300 dark:text-zinc-700">•</div>
                      <div className="flex items-center gap-1.5 text-[13px] text-zinc-500 dark:text-zinc-400 min-w-0">
                        <Landmark className="h-3.5 w-3.5 shrink-0" />
                        <span className="truncate">{op}</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Right Side: Stats */}
                  <div className="flex items-center justify-between md:justify-end gap-6 pl-7 md:pl-0">
                    <div className="text-left md:text-right">
                      <span className="block text-[11px] uppercase tracking-wider font-bold text-zinc-400 mb-0.5">Registros</span>
                      <strong className="block text-sm text-zinc-900 dark:text-zinc-200">{val.registros}</strong>
                    </div>
                    
                    <div className="text-left md:text-right">
                      <span className="block text-[11px] uppercase tracking-wider font-bold text-blue-500 mb-0.5 flex items-center md:justify-end gap-1">
                        <Users className="h-3 w-3" /> Afetados
                      </span>
                      <strong className="block text-sm font-black text-blue-600 dark:text-blue-400">{val.apoios}</strong>
                    </div>
                  </div>
                  
                </div>
              );
            })
          )}
        </div>
      </div>
    </section>
  );
}
