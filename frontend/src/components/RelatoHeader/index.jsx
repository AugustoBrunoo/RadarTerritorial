import React from 'react';
import { User, CalendarDays } from 'lucide-react';

export default function RelatoHeader({ report, dateStr, isOwner, authorName, CategoryIcon, StatusIcon, statusDetails }) {
  let displayName = authorName || "Usuário Anônimo";
  if (isOwner && displayName !== "Usuário Anônimo") {
    displayName += " (Você)";
  }

  return (
    <header>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div className="flex flex-wrap items-center gap-3">
          <span className={`px-3.5 py-1.5 rounded-full border text-xs font-black tracking-wider flex items-center gap-1.5 uppercase ${statusDetails.class}`}>
            <StatusIcon className="h-3.5 w-3.5" /> {statusDetails.text}
          </span>
          <span className="px-3.5 py-1.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 text-xs font-bold tracking-wider flex items-center gap-1.5 border border-zinc-200 dark:border-zinc-700">
            <CategoryIcon className="h-3.5 w-3.5" /> {report.categoria_nome || report.macro_eixo}
          </span>
        </div>
        
        <div className="flex items-center gap-2 bg-zinc-100 dark:bg-zinc-800/60 px-4 py-2 rounded-xl border border-zinc-200 dark:border-zinc-700 shadow-sm w-max">
          <CalendarDays className="h-4 w-4 text-zinc-500 dark:text-zinc-400" />
          <span className="text-zinc-700 dark:text-zinc-300 text-sm font-bold tracking-wide">
            {dateStr}
          </span>
        </div>
      </div>

      <h1 className="text-3xl sm:text-4xl font-black text-zinc-900 dark:text-white leading-tight mb-4">
        {report.categoria_nome || report.macro_eixo} em {report.bairro || 'Local'}
      </h1>

      <p className={`text-lg leading-relaxed mb-6 ${report.descricao ? 'text-zinc-600 dark:text-zinc-400' : 'text-zinc-400 dark:text-zinc-500 italic'}`}>
        {report.descricao || "Nenhum detalhe adicional fornecido pelo usuário."}
      </p>

      <div className="flex items-center gap-3 text-zinc-600 dark:text-zinc-400 font-medium bg-white dark:bg-zinc-900/50 p-4 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
        <div className="w-10 h-10 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-500 dark:text-zinc-300 shrink-0">
          <User className="h-5 w-5" />
        </div>
        <div>
          <p className="text-zinc-600 dark:text-zinc-300 text-sm">
            Enviado por <strong className="text-zinc-900 dark:text-white">{displayName}</strong>
          </p>
        </div>
      </div>
    </header>
  );
}
