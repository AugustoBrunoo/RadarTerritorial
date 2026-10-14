import React from 'react';
import SimpleHeader from '../SimpleHeader';
import LoggedHeader from '../LoggedHeader';
import SimpleFooter from '../SimpleFooter';

export default function RelatoDetalhadoSkeleton({ currentUserId }) {
  return (
    <div className="min-h-screen bg-[#F9FAFB] text-zinc-900 dark:bg-[#09090B] dark:text-zinc-50 font-sans flex flex-col">
      {currentUserId ? <LoggedHeader /> : <SimpleHeader backLink="/feed" />}

      <main className="flex-grow pt-20 sm:pt-28 md:pt-32 pb-12 sm:pb-16 px-3.5 sm:px-6 lg:px-8 max-w-6xl mx-auto w-full">
        {/* Placeholder para botão voltar */}
        <div className="mb-4 sm:mb-6 h-8 sm:h-9 w-20 sm:w-24 bg-zinc-200/80 dark:bg-zinc-800/80 rounded-xl animate-pulse" />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 items-start">
          {/* COLUNA DA ESQUERDA */}
          <div className="lg:col-span-2 space-y-6 sm:space-y-8 min-w-0">
            {/* Header Skeleton */}
            <div className="space-y-3 sm:space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 sm:gap-4">
                <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
                  <div className="h-6 sm:h-7 w-24 sm:w-28 bg-zinc-200/80 dark:bg-zinc-800/80 rounded-full animate-pulse" />
                  <div className="h-6 sm:h-7 w-28 sm:w-36 bg-zinc-200/80 dark:bg-zinc-800/80 rounded-full animate-pulse" />
                </div>
                <div className="h-7 sm:h-8 w-36 sm:w-44 bg-zinc-200/80 dark:bg-zinc-800/80 rounded-xl animate-pulse shrink-0" />
              </div>
              <div className="h-8 sm:h-10 w-3/4 bg-zinc-200/80 dark:bg-zinc-800/80 rounded-2xl animate-pulse" />
              <div className="h-4 sm:h-5 w-full bg-zinc-200/80 dark:bg-zinc-800/80 rounded-xl animate-pulse" />
              <div className="h-4 sm:h-5 w-2/3 bg-zinc-200/80 dark:bg-zinc-800/80 rounded-xl animate-pulse" />
              <div className="h-14 sm:h-16 w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl sm:rounded-2xl p-3 sm:p-4 flex items-center gap-2.5 sm:gap-3 animate-pulse">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-zinc-200 dark:bg-zinc-800 shrink-0" />
                <div className="h-4 w-40 sm:w-48 bg-zinc-200 dark:bg-zinc-800 rounded" />
              </div>
            </div>

            {/* Localização / Mapa Skeleton */}
            <div className="bg-zinc-50 dark:bg-zinc-900/50 p-4 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-3 sm:space-y-4">
              <div className="h-5 sm:h-6 w-36 sm:w-44 bg-zinc-200/80 dark:bg-zinc-800/80 rounded-xl animate-pulse" />
              <div className="h-3.5 sm:h-4 w-56 sm:w-72 bg-zinc-200/80 dark:bg-zinc-800/80 rounded-lg animate-pulse" />
              <div className="w-full h-52 sm:h-64 rounded-xl sm:rounded-2xl bg-zinc-200/70 dark:bg-zinc-800/70 animate-pulse border border-zinc-200 dark:border-zinc-700" />
            </div>

            {/* Linha do Tempo Skeleton */}
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 space-y-6 shadow-sm">
              <div className="h-5 sm:h-6 w-44 sm:w-56 bg-zinc-200/80 dark:bg-zinc-800/80 rounded-xl animate-pulse" />
              <div className="space-y-6 sm:space-y-8 pl-5 sm:pl-6">
                <div className="space-y-2">
                  <div className="h-4 sm:h-5 w-36 sm:w-44 bg-zinc-200/80 dark:bg-zinc-800/80 rounded-lg animate-pulse" />
                  <div className="h-3.5 sm:h-4 w-full bg-zinc-200/70 dark:bg-zinc-800/70 rounded-lg animate-pulse" />
                  <div className="h-3.5 sm:h-4 w-28 sm:w-32 bg-zinc-200/70 dark:bg-zinc-800/70 rounded-lg animate-pulse" />
                </div>
                <div className="space-y-2">
                  <div className="h-4 sm:h-5 w-44 sm:w-56 bg-zinc-200/80 dark:bg-zinc-800/80 rounded-lg animate-pulse" />
                  <div className="h-3.5 sm:h-4 w-3/4 bg-zinc-200/70 dark:bg-zinc-800/70 rounded-lg animate-pulse" />
                </div>
              </div>
            </div>
          </div>

          {/* COLUNA DA DIREITA */}
          <div className="space-y-5 sm:space-y-6 min-w-0">
            {/* Apoios Skeleton */}
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl sm:rounded-3xl p-4 sm:p-6 space-y-4 shadow-sm">
              <div className="h-8 sm:h-10 w-16 sm:w-20 mx-auto bg-zinc-200/80 dark:bg-zinc-800/80 rounded-xl animate-pulse" />
              <div className="h-3 sm:h-3.5 w-28 sm:w-32 mx-auto bg-zinc-200/80 dark:bg-zinc-800/80 rounded-lg animate-pulse" />
              <div className="h-11 sm:h-14 w-full bg-zinc-200/80 dark:bg-zinc-800/80 rounded-xl sm:rounded-2xl animate-pulse mt-3 sm:mt-4" />
              <div className="h-10 sm:h-12 w-full bg-zinc-200/80 dark:bg-zinc-800/80 rounded-xl sm:rounded-2xl animate-pulse" />
            </div>

            {/* Comentários Skeleton */}
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl sm:rounded-[2rem] p-4 sm:p-6 md:p-8 space-y-4 shadow-sm">
              <div className="h-5 sm:h-6 w-32 sm:w-36 bg-zinc-200/80 dark:bg-zinc-800/80 rounded-xl animate-pulse" />
              <div className="h-24 sm:h-28 w-full bg-zinc-200/70 dark:bg-zinc-800/70 rounded-2xl sm:rounded-3xl animate-pulse" />
            </div>
          </div>
        </div>
      </main>

      <SimpleFooter />
    </div>
  );
}
