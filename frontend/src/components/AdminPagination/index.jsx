import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function AdminPagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  const getPages = () => {
    const pageNumbers = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pageNumbers.push(i);
    } else {
      if (currentPage <= 3) {
        pageNumbers.push(1, 2, 3, '...', totalPages);
      } else if (currentPage >= totalPages - 2) {
        pageNumbers.push(1, '...', totalPages - 2, totalPages - 1, totalPages);
      } else {
        pageNumbers.push(1, '...', currentPage, '...', totalPages);
      }
    }
    return pageNumbers;
  };

  const pages = getPages();

  return (
    <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 pb-8 border-t border-zinc-200 dark:border-zinc-800">
      <span className="text-xs font-semibold text-zinc-500">
        Página <strong className="text-zinc-900 dark:text-white">{currentPage}</strong> de <strong className="text-zinc-900 dark:text-white">{totalPages}</strong>
      </span>

      <nav className="flex items-center gap-1.5 sm:gap-2">
        <button 
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="p-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
          title="Página Anterior"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>

        {pages.map((page, index) => {
          if (page === '...') {
            return (
              <span key={`ellipsis-${index}`} className="text-zinc-400 dark:text-zinc-600 px-1 font-bold">
                ...
              </span>
            );
          }

          const isCurrent = currentPage === page;

          return (
            <button 
              key={page}
              onClick={() => onPageChange(page)}
              className={`w-9 h-9 rounded-xl border font-bold text-xs sm:text-sm shadow-xs transition-colors cursor-pointer ${
                isCurrent 
                  ? 'border-red-600 bg-red-600 text-white' 
                  : 'border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800'
              }`}
            >
              {page}
            </button>
          );
        })}

        <button 
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="p-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
          title="Próxima Página"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </nav>
    </div>
  );
}
