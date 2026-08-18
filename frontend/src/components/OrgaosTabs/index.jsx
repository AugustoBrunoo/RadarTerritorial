import React from 'react';

export default function OrgaosTabs({ activeTab, setActiveTab, orgaosCount, solicitacoesCount, filteredCount, paginatedCount, itemsPerPage }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      {/* Tabs */}
      <div className="flex gap-2 bg-zinc-200/50 dark:bg-zinc-900/50 p-1 rounded-xl border border-zinc-200 dark:border-zinc-800 w-full sm:w-auto">
        <button 
          onClick={() => setActiveTab('ativos')}
          className={`flex-1 sm:flex-none px-4 py-2 rounded-lg text-sm transition-colors cursor-pointer ${
            activeTab === 'ativos' 
              ? 'bg-white dark:bg-zinc-800 shadow-sm font-bold text-zinc-900 dark:text-white' 
              : 'font-medium text-zinc-500 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800/50'
          }`}
        >
          Órgãos Cadastrados ({orgaosCount})
        </button>
        <button 
          onClick={() => setActiveTab('pendentes')}
          className={`flex-1 sm:flex-none px-4 py-2 rounded-lg text-sm transition-colors flex items-center justify-center gap-2 cursor-pointer ${
            activeTab === 'pendentes' 
              ? 'bg-white dark:bg-zinc-800 shadow-sm font-bold text-zinc-900 dark:text-white' 
              : 'font-medium text-zinc-500 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800/50'
          }`}
        >
          Solicitações 
          {solicitacoesCount > 0 && (
            <span className="bg-amber-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
              {solicitacoesCount}
            </span>
          )}
        </button>
      </div>

      {/* Indicador de Contagem */}
      {activeTab === 'ativos' && (
        <div className="flex items-center justify-between sm:justify-end gap-3 px-1 text-xs">
          <span className="font-bold text-zinc-500 dark:text-zinc-400">
            Mostrando <strong className="text-zinc-900 dark:text-white">{paginatedCount}</strong> de <strong className="text-zinc-900 dark:text-white">{filteredCount}</strong> órgãos
          </span>
          <span className="text-[11px] font-semibold text-zinc-400">
            ({itemsPerPage} por página)
          </span>
        </div>
      )}
    </div>
  );
}
