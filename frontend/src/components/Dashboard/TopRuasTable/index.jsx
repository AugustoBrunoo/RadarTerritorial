import React from 'react';
import { Users, HelpCircle } from 'lucide-react';
import TooltipWrapper from '../../TooltipWrapper';

export default function TopRuasTable({ topRuas }) {
  return (
    <section className="pb-4 mt-6">
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-lg flex flex-col min-w-0 relative">
        <div className="absolute top-6 right-6">
          <TooltipWrapper text="Rank das 5 vias mais afetadas e urgentes. A ordenação prioriza o volume de engajamento e moradores impactados pela falha.">
            <HelpCircle className="h-4 w-4 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 cursor-help transition-colors" />
          </TooltipWrapper>
        </div>
        <div className="flex items-center gap-2 mb-1">
          <h2 className="text-lg font-bold text-zinc-900 dark:text-white truncate">Ruas que Mais Precisam de Ajuda (Top 5)</h2>
        </div>
        <p className="text-xs font-medium text-zinc-500 mb-6 truncate">Lista organizada pela quantidade de moradores afetados.</p>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse whitespace-nowrap">
            <thead>
              <tr className="text-xs font-black text-zinc-400 dark:text-zinc-500 uppercase tracking-widest border-b border-zinc-200 dark:border-zinc-800">
                <th className="pb-3 font-medium">Onde / Quem resolve</th>
                <th className="pb-3 font-medium">Bairro</th>
                <th className="pb-3 font-medium text-center">Registros</th>
                <th className="pb-3 font-medium text-center text-blue-500"><Users className="h-3 w-3 inline mr-1" />Moradores Afetados</th>
                <th className="pb-3 font-medium text-center">Status</th>
              </tr>
            </thead>
            <tbody className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
              {topRuas.length === 0 ? (
                <tr><td colSpan="5" className="py-4 text-center text-zinc-500">Nenhum problema ativo nesta categoria.</td></tr>
              ) : (
                topRuas.map(([key, val], idx) => {
                  const [rua, bairro, op] = key.split('|');
                  const isHigh = val.apoios > 100;
                  const statusClass = isHigh ? 'bg-red-100 text-red-600 dark:bg-red-500/20 dark:text-red-400 border-red-200 dark:border-red-500/30' : 'bg-amber-100 text-amber-600 dark:bg-amber-500/20 dark:text-amber-400 border-amber-200 dark:border-amber-500/30';
                  const statusLabel = isHigh ? 'Alto Impacto' : 'Atenção';
                  return (
                    <tr key={idx} className="hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors">
                      <td className="py-3.5 border-b border-zinc-200 dark:border-zinc-800/50 pr-4">
                        <strong className="block">{rua}</strong>
                        <span className="text-xs text-zinc-500">{op}</span>
                      </td>
                      <td className="py-3.5 border-b border-zinc-200 dark:border-zinc-800/50 text-zinc-500">{bairro}</td>
                      <td className="py-3.5 border-b border-zinc-200 dark:border-zinc-800/50 text-center font-bold">{val.registros}</td>
                      <td className="py-3.5 border-b border-zinc-200 dark:border-zinc-800/50 text-center font-black text-blue-500">{val.apoios}</td>
                      <td className="py-3.5 border-b border-zinc-200 dark:border-zinc-800/50 text-center">
                        <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded border ${statusClass}`}>{statusLabel}</span>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
