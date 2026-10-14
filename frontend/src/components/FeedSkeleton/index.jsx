import React from 'react';

export default function FeedSkeleton({ count = 3 }) {
  return (
    <div 
      className="lg:col-span-8 space-y-6" 
      role="status" 
      aria-busy="true" 
      aria-label="Carregando relatos comunitários"
    >
      <div className="flex justify-between items-center px-2">
        <div className="h-4 w-28 bg-zinc-200 dark:bg-zinc-800 rounded animate-pulse" />
        <div className="h-5 w-8 bg-zinc-200 dark:bg-zinc-800 rounded animate-pulse" />
      </div>

      {[...Array(count)].map((_, i) => (
        <div 
          key={i} 
          className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-[2rem] p-6 shadow-sm animate-pulse min-h-[320px] flex flex-col justify-between"
        >
          {/* Header Skeleton */}
          <div>
            <div className="flex items-start sm:items-center gap-3 mb-5">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-zinc-200 dark:bg-zinc-800 flex-shrink-0" />
              <div className="flex-1 space-y-2">
                <div className="h-4 w-36 sm:w-48 bg-zinc-200 dark:bg-zinc-800 rounded-md" />
                <div className="h-3 w-48 sm:w-64 bg-zinc-100 dark:bg-zinc-800/60 rounded-md" />
              </div>
              <div className="space-y-1.5 text-right flex flex-col items-end">
                <div className="h-3 w-12 bg-zinc-200 dark:bg-zinc-800 rounded" />
                <div className="h-2.5 w-16 bg-zinc-100 dark:bg-zinc-800/60 rounded" />
              </div>
            </div>

            {/* Badges Skeleton */}
            <div className="flex flex-wrap gap-2 mb-4">
              <div className="h-7 w-28 bg-zinc-100 dark:bg-zinc-800 rounded-xl" />
              <div className="h-7 w-32 bg-zinc-100 dark:bg-zinc-800 rounded-xl" />
            </div>

            {/* Description lines Skeleton */}
            <div className="mb-5 pl-2 border-l-2 border-zinc-100 dark:border-zinc-800 space-y-2 ml-1">
              <div className="h-3.5 w-full bg-zinc-100 dark:bg-zinc-800/80 rounded" />
              <div className="h-3.5 w-4/5 bg-zinc-100 dark:bg-zinc-800/60 rounded" />
            </div>
          </div>

          {/* Action Bar Skeleton */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between pt-4 border-t border-zinc-100 dark:border-zinc-800 gap-4 sm:gap-0">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-zinc-200 dark:bg-zinc-800" />
              <div className="space-y-1">
                <div className="h-3 w-6 bg-zinc-200 dark:bg-zinc-800 rounded" />
                <div className="h-2 w-10 bg-zinc-100 dark:bg-zinc-800/60 rounded" />
              </div>
            </div>

            <div className="flex gap-2 justify-end">
              <div className="h-9 w-14 bg-zinc-100 dark:bg-zinc-800 rounded-xl" />
              <div className="h-9 w-24 bg-zinc-100 dark:bg-zinc-800 rounded-xl" />
              <div className="h-9 w-20 bg-zinc-200 dark:bg-zinc-800 rounded-xl" />
            </div>
          </div>
        </div>
      ))}
      <span className="sr-only">Carregando relatos...</span>
    </div>
  );
}
