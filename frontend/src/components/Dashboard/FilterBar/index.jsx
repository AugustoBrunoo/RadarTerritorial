import React from 'react';
import { Filter, ChevronDown, Calendar, FolderOutput } from 'lucide-react';

const SubTabButton = ({ id, label, currentTab, setCurrentTab }) => {
  const active = currentTab === id;
  return (
    <button 
      onClick={() => setCurrentTab(id)}
      className={`shrink-0 px-4 py-2 rounded-lg text-sm font-bold shadow-sm transition-colors ${active ? 'bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white border border-zinc-200 dark:border-zinc-700' : 'bg-transparent text-zinc-500 hover:text-zinc-900 dark:hover:text-white border border-transparent'}`}
    >
      {label}
    </button>
  );
};

export default function FilterBar({ 
  currentTab, setCurrentTab, 
  bairroFilter, setBairroFilter, 
  timeFilter, setTimeFilter, 
  setIsExportModalOpen 
}) {
  return (
    <div className="hidden md:block bg-zinc-100/50 dark:bg-zinc-900/40 border-b border-zinc-200 dark:border-zinc-800 sticky top-0 z-30 backdrop-blur-md">
      <div className="border-b border-zinc-200 dark:border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 flex items-center overflow-x-auto gap-2 py-2 [&::-webkit-scrollbar]:hidden">
          <SubTabButton id="geral" label="Visão Geral" currentTab={currentTab} setCurrentTab={setCurrentTab} />
          <SubTabButton id="infra" label="Infraestrutura e Vias" currentTab={currentTab} setCurrentTab={setCurrentTab} />
          <SubTabButton id="saneamento" label="Saneamento e Limpeza" currentTab={currentTab} setCurrentTab={setCurrentTab} />
          <SubTabButton id="iluminacao" label="Iluminação e Segurança" currentTab={currentTab} setCurrentTab={setCurrentTab} />
          <SubTabButton id="mobilidade" label="Transporte e Mobilidade" currentTab={currentTab} setCurrentTab={setCurrentTab} />
          <SubTabButton id="inseguranca" label="Insegurança e Território" currentTab={currentTab} setCurrentTab={setCurrentTab} />
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <p className="text-sm font-bold text-zinc-500 dark:text-zinc-400 flex items-center gap-2">
            <Filter className="h-4 w-4" /> Filtros:
          </p>
          <div className="relative w-48">
            <select value={bairroFilter} onChange={(e) => setBairroFilter(e.target.value)} className="w-full appearance-none bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-white text-sm font-bold rounded-xl pl-4 pr-10 py-2 outline-none focus:ring-2 focus:ring-red-600 transition-colors cursor-pointer shadow-sm">
              <option value="all">Todos os Bairros</option>
              <option value="Campo Grande">Campo Grande</option>
              <option value="Inhoaíba">Inhoaíba</option>
              <option value="Cosmos">Cosmos</option>
            </select>
            <ChevronDown className="h-4 w-4 text-zinc-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
          <div className="relative w-48">
            <select value={timeFilter} onChange={(e) => setTimeFilter(e.target.value)} className="w-full appearance-none bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-white text-sm font-bold rounded-xl pl-4 pr-10 py-2 outline-none focus:ring-2 focus:ring-red-600 transition-colors cursor-pointer shadow-sm">
              <option value="all">Todo Histórico</option>
              <option value="30">Últimos 30 dias</option>
              <option value="90">Últimos 3 meses</option>
              <option value="180">Últimos 6 meses</option>
            </select>
            <Calendar className="h-4 w-4 text-zinc-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>
        <button onClick={() => setIsExportModalOpen(true)} className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 rounded-xl text-sm font-bold text-zinc-700 dark:text-zinc-300 hover:text-red-500 hover:border-red-500 dark:hover:text-red-400 transition-colors shadow-sm active:scale-95">
          <FolderOutput className="h-4 w-4" /> Exportar
        </button>
      </div>
    </div>
  );
}
