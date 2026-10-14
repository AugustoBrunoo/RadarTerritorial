import React from 'react';
import { User, CalendarDays } from 'lucide-react';

export default function RelatoHeader({ report, dateStr, timeStr, isOwner, authorName, CategoryIcon, StatusIcon, statusDetails }) {
  let displayName = authorName || "Usuário Anônimo";
  if (isOwner && displayName !== "Usuário Anônimo") {
    displayName += " (Você)";
  }

  return (
    <header>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 sm:gap-4 mb-4 sm:mb-6">
        <div className="flex flex-wrap items-center gap-2 sm:gap-2.5 min-w-0">
          <span className={`px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-full border text-[11px] sm:text-xs font-black tracking-wider flex items-center gap-1.5 uppercase ${statusDetails.class}`}>
            <StatusIcon className="h-3.5 w-3.5 shrink-0" /> {statusDetails.text}
          </span>
          <span className="px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 text-[11px] sm:text-xs font-bold tracking-wider flex items-center gap-1.5 border border-zinc-200 dark:border-zinc-700">
            <CategoryIcon className="h-3.5 w-3.5 shrink-0" /> {report.categoria_nome || report.macro_eixo}
          </span>
        </div>
        
        <div className="flex items-center gap-2 bg-zinc-100 dark:bg-zinc-800/60 px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-xl border border-zinc-200 dark:border-zinc-700/80 shadow-sm w-fit max-w-full shrink-0">
          <CalendarDays className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-zinc-500 dark:text-zinc-400 shrink-0" />
          <span className="text-zinc-700 dark:text-zinc-300 text-xs sm:text-sm font-bold tracking-wide whitespace-nowrap">
            {dateStr}
            {timeStr && (
              <>
                <span className="text-zinc-400 dark:text-zinc-500 font-normal mx-1">às</span>
                <span>{timeStr}</span>
              </>
            )}
          </span>
        </div>
      </div>

      <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-zinc-900 dark:text-white leading-tight mb-3 sm:mb-4 break-words">
        {report.categoria_nome || report.macro_eixo} em {report.bairro || 'Local'}
      </h1>

      <p className={`text-sm sm:text-base md:text-lg leading-relaxed mb-4 sm:mb-6 break-words ${report.descricao ? 'text-zinc-600 dark:text-zinc-400' : 'text-zinc-400 dark:text-zinc-500 italic'}`}>
        {report.descricao || "Nenhum detalhe adicional fornecido pelo usuário."}
      </p>

      <div className="flex items-center gap-2.5 sm:gap-3 text-zinc-600 dark:text-zinc-400 font-medium bg-white dark:bg-zinc-900/50 p-3 sm:p-4 rounded-xl sm:rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-500 dark:text-zinc-300 shrink-0">
          <User className="h-4 w-4 sm:h-5 sm:w-5" />
        </div>
        <div className="min-w-0">
          <p className="text-zinc-600 dark:text-zinc-300 text-xs sm:text-sm truncate">
            Enviado por <strong className="text-zinc-900 dark:text-white">{displayName}</strong>
          </p>
        </div>
      </div>
    </header>
  );
}
