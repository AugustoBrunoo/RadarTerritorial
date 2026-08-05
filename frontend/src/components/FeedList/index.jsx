import React from 'react';
import { FilterX, ChevronLeft, ChevronRight } from 'lucide-react';
import FeedCard from '../FeedCard';

export default function FeedList({
  filteredData,
  paginatedData,
  handleSupport,
  currentPage,
  setCurrentPage,
  totalPages,
  currentUserId
}) {
  return (
    <div className="lg:col-span-8 space-y-4">
      <div className="flex justify-between items-center px-2 text-xs font-bold text-zinc-400 uppercase tracking-widest">
        <span>Total de Relatos</span>
        <span className="text-zinc-900 dark:text-white bg-zinc-100 dark:bg-zinc-800 px-2 py-1 rounded">
          {filteredData.length}
        </span>
      </div>

      <div className="space-y-6">
        {filteredData.length === 0 ? (
          <div className="flex flex-col items-center justify-center text-center py-20 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-[2.5rem] animate-in fade-in">
            <div className="w-16 h-16 bg-zinc-100 dark:bg-zinc-800 rounded-full flex items-center justify-center mb-4 text-zinc-400">
              <FilterX className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-bold mb-1">Nenhum relato encontrado</h3>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 max-w-xs font-medium">
              Tente ajustar seus critérios de busca ou redefinir os filtros.
            </p>
          </div>
        ) : (
          paginatedData.map(report => (
            <FeedCard 
              key={report.id} 
              report={report} 
              onSupport={handleSupport} 
              currentUserId={currentUserId}
            />
          ))
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-10 flex justify-center pb-4">
          <nav className="flex items-center gap-1 sm:gap-2">
            <button 
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="p-2 rounded-lg border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>

            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i + 1}
                onClick={() => setCurrentPage(i + 1)}
                className={`w-9 h-9 sm:w-10 sm:h-10 rounded-lg border font-bold text-sm transition-colors ${currentPage === i + 1 ? 'border-red-600 bg-red-600 text-white shadow-sm' : 'border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800'}`}
              >
                {i + 1}
              </button>
            ))}

            <button 
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="p-2 rounded-lg border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </nav>
        </div>
      )}
    </div>
  );
}
