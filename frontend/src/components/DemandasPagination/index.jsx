import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function DemandasPagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) {
    return (
      <div className="mt-10 flex justify-center pb-4">
        <nav className="flex items-center gap-1 sm:gap-2">
          <button className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg border border-red-600 bg-red-600 text-white font-bold text-sm shadow-sm transition-colors">
            1
          </button>
        </nav>
      </div>
    );
  }

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
    <div className="mt-10 flex justify-center pb-4">
      <nav className="flex items-center gap-1 sm:gap-2">
        <button 
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="p-2 rounded-lg border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>

        {pages.map((page, index) => {
          if (page === '...') {
            return (
              <span key={`ellipsis-${index}`} className="text-zinc-500 dark:text-zinc-400 px-1 hidden sm:block">
                ...
              </span>
            );
          }

          return (
            <button 
              key={page}
              onClick={() => onPageChange(page)}
              className={`w-9 h-9 sm:w-10 sm:h-10 rounded-lg border font-bold text-sm shadow-sm transition-colors ${
                currentPage === page 
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
          className="p-2 rounded-lg border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </nav>
    </div>
  );
}
