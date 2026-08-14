import React from 'react';
import { Settings2, X, SunMoon, LayoutDashboard, ChevronDown, Calendar, FolderOutput } from 'lucide-react';

export default function MobileDrawer({
  isDrawerOpen, setIsDrawerOpen,
  toggleTheme, currentTab, setCurrentTab,
  bairroFilter, setBairroFilter,
  timeFilter, setTimeFilter,
  setIsExportModalOpen
}) {
  if (!isDrawerOpen) return null;

  return (
    <div className="md:hidden fixed inset-0 z-[9999] flex items-end bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="w-full bg-white dark:bg-zinc-950 rounded-t-3xl shadow-2xl border-t border-zinc-200 dark:border-zinc-800 animate-in slide-in-from-bottom-full duration-300 flex flex-col max-h-[90vh]">
        <div className="p-4 flex justify-between items-center border-b border-zinc-200 dark:border-zinc-800 relative">
          <div className="absolute top-2 left-1/2 -translate-x-1/2 w-12 h-1.5 bg-zinc-300 dark:bg-zinc-700 rounded-full"></div>
          <h3 className="text-lg font-black text-zinc-900 dark:text-white mt-2 flex items-center gap-2">
            <Settings2 className="h-5 w-5 text-red-500" /> Controles
          </h3>
          <div className="flex items-center gap-2 mt-2">
            <button onClick={toggleTheme} className="p-2 text-zinc-500 hover:text-amber-500 bg-zinc-100 dark:bg-zinc-900 rounded-full transition-colors"><SunMoon className="h-5 w-5" /></button>
            <button onClick={() => setIsDrawerOpen(false)} className="p-2 text-zinc-500 hover:text-zinc-900 dark:hover:text-white bg-zinc-100 dark:bg-zinc-900 rounded-full transition-colors"><X className="h-5 w-5" /></button>
          </div>
        </div>
        <div className="p-6 space-y-6 overflow-y-auto">
          <div>
            <label className="block text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-widest mb-2">Tema do Painel</label>
            <div className="relative">
              <select value={currentTab} onChange={e => setCurrentTab(e.target.value)} className="w-full appearance-none bg-zinc-50 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-white text-base font-bold rounded-xl pl-4 pr-10 py-3.5 outline-none focus:ring-2 focus:ring-red-600 transition-colors shadow-sm">
                <option value="geral">Visão Geral</option>
                <option value="infra">Infraestrutura Urbana e Vias</option>
                <option value="saneamento">Saneamento e Limpeza Pública</option>
                <option value="iluminacao">Iluminação Pública e Segurança</option>
                <option value="mobilidade">Serviços de Transporte e Mobilidade</option>
                <option value="inseguranca">Dinâmicas de Insegurança e Território</option>
              </select>
              <LayoutDashboard className="h-5 w-5 text-zinc-400 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-widest mb-2">Região</label>
              <div className="relative">
                <select value={bairroFilter} onChange={e => setBairroFilter(e.target.value)} className="w-full appearance-none bg-zinc-50 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-white text-sm font-bold rounded-xl pl-3 pr-8 py-3 outline-none focus:ring-2 focus:ring-red-600 transition-colors shadow-sm">
                  <option value="all">Todos</option>
                  <option value="Campo Grande">C. Grande</option>
                  <option value="Inhoaíba">Inhoaíba</option>
                  <option value="Cosmos">Cosmos</option>
                </select>
                <ChevronDown className="h-4 w-4 text-zinc-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-widest mb-2">Período</label>
              <div className="relative">
                <select value={timeFilter} onChange={e => setTimeFilter(e.target.value)} className="w-full appearance-none bg-zinc-50 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-white text-sm font-bold rounded-xl pl-3 pr-8 py-3 outline-none focus:ring-2 focus:ring-red-600 transition-colors shadow-sm">
                  <option value="all">Todo o Histórico</option>
                  <option value="30">30 dias</option>
                  <option value="90">3 meses</option>
                  <option value="180">6 meses</option>
                </select>
                <Calendar className="h-4 w-4 text-zinc-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>
          </div>
          <div className="pt-4 border-t border-zinc-200 dark:border-zinc-800">
            <button onClick={() => { setIsExportModalOpen(true); setIsDrawerOpen(false); }} className="w-full flex items-center justify-center gap-2 px-4 py-3.5 bg-zinc-100 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-xl text-base font-bold text-zinc-800 dark:text-zinc-200 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors active:scale-95">
              <FolderOutput className="h-5 w-5" /> Opções de Exportação
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
