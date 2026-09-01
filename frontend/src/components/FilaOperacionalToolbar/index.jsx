import React from 'react';
import { Search, Download } from 'lucide-react';

export default function FilaOperacionalToolbar({
  currentTab,
  setCurrentTab,
  search,
  setSearch,
  urgency,
  setUrgency,
  kpis
}) {
  const tabs = [
    { id: 'pendente', label: 'Aguardando Triagem', count: kpis?.pendentes || 0, badgeColor: 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400' },
    { id: 'em_analise', label: 'Em Análise', count: kpis?.emAnalise || 0, badgeColor: 'bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400' },
    { id: 'em_execucao', label: 'Em Execução', count: kpis?.emExecucao || 0, badgeColor: 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' },
    { id: 'resolvido', label: 'Resolvidos', count: kpis?.resolvidos || 0, badgeColor: 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400' },
    { id: 'rejeitado', label: 'Rejeitados', count: kpis?.rejeitados || 0, badgeColor: 'bg-zinc-200 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400' }
  ];

  return (
    <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-4 flex flex-col gap-4 shadow-sm z-40 animate-[fadeInUp_0.5s_ease-out_forwards]" style={{ animationDelay: '0.2s' }}>
      
      {/* Tabs */}
      <div className="flex p-1.5 bg-zinc-50 dark:bg-zinc-950/50 border border-zinc-200 dark:border-zinc-800 rounded-2xl overflow-x-auto w-full shrink-0 [&::-webkit-scrollbar]:hidden">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setCurrentTab(tab.id)}
            className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all whitespace-nowrap flex items-center gap-2 flex-1 justify-center ${
              currentTab === tab.id 
                ? 'bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white font-bold shadow-sm border border-zinc-200 dark:border-zinc-700' 
                : 'text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-900/50 border border-transparent'
            }`}
          >
            {tab.label}
            <span className={`px-2 py-0.5 rounded-lg text-[10px] font-black ${tab.badgeColor}`}>
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      {/* Filters & Actions */}
      <div className="flex flex-col sm:flex-row gap-3 w-full justify-between items-center">
        <div className="relative w-full sm:w-1/2 lg:w-2/5">
          <input
            type="text"
            placeholder="ID, bairro, rua..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl pl-10 pr-4 py-3 text-sm text-zinc-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all placeholder-zinc-400 font-medium"
          />
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-400">
            <Search className="h-4 w-4" />
          </div>
        </div>

        <div className="flex gap-3 w-full sm:w-auto">
          <select
            value={urgency}
            onChange={(e) => setUrgency(e.target.value)}
            className="flex-1 sm:flex-none w-full sm:w-48 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-3 text-sm text-zinc-700 dark:text-zinc-300 focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium cursor-pointer"
          >
            <option value="all">Todas as Urgências</option>
            <option value="grave">Apenas Graves</option>
            <option value="abandono">Abandono</option>
          </select>

          <button
            className="flex items-center justify-center gap-2 px-5 py-3 bg-zinc-900 hover:bg-zinc-800 dark:bg-white dark:hover:bg-zinc-100 text-white dark:text-zinc-900 border border-transparent rounded-xl text-sm font-bold shadow-md transition-all active:scale-95 shrink-0"
            title="Exportar Relatório em formato PDF"
          >
            <Download className="h-4 w-4" />
            <span className="hidden sm:inline">Exportar PDF</span>
          </button>
        </div>
      </div>
    </div>
  );
}
