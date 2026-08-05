import React from 'react';

export default function DemandasFiltros({ currentFilter, onFilterChange, totalCount, pendingCount, resolvedCount }) {
  return (
    <div className="flex overflow-x-auto gap-2 mb-6 pb-2">
      <button 
        onClick={() => onFilterChange('all')}
        className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all whitespace-nowrap ${currentFilter === 'all' ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900' : 'text-zinc-600 dark:text-zinc-400 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800'}`}
      >
        Todos ({totalCount})
      </button>
      <button 
        onClick={() => onFilterChange('pending')}
        className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all whitespace-nowrap ${currentFilter === 'pending' ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900' : 'text-zinc-600 dark:text-zinc-400 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800'}`}
      >
        Não resolvidos ({pendingCount})
      </button>
      <button 
        onClick={() => onFilterChange('resolved')}
        className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all whitespace-nowrap ${currentFilter === 'resolved' ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900' : 'text-zinc-600 dark:text-zinc-400 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800'}`}
      >
        Resolvidos ({resolvedCount})
      </button>
    </div>
  );
}
