import React from 'react';
import { Calendar } from 'lucide-react';

export default function FilaOperacionalHeader({ currentTime }) {
  const timeParts = (currentTime || '').split(':');
  const hours = timeParts[0] || '--';
  const minutes = timeParts[1] || '--';

  return (
    <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 animate-[fadeInUp_0.5s_ease-out_forwards]">
      <div>
        <p className="text-blue-600 dark:text-blue-500 font-bold tracking-widest uppercase text-xs mb-2 flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
          </span>
          Operação em Tempo Real
        </p>
        <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-zinc-900 dark:text-white">
          Central de Triagem Operacional
        </h1>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-2 max-w-2xl leading-relaxed">
          Painel de controle para gerir as ocorrências ativas do bairro. Distribua tarefas, atualize status e responda ao cidadão diretamente.
        </p>
      </div>

      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 px-3.5 py-2 rounded-2xl flex items-center gap-3 shadow-sm text-sm font-medium text-zinc-600 dark:text-zinc-300">
        <Calendar className="h-4 w-4 text-blue-500 shrink-0" />
        <span className="capitalize">{new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })}</span>
        <div className="h-4 w-px bg-zinc-200 dark:bg-zinc-800"></div>
        <span className="font-black text-zinc-900 dark:text-white flex items-center tabular-nums">
          <span>{hours}</span>
          <span className="animate-pulse inline-block text-blue-600 dark:text-blue-400 font-black px-0.5 select-none">:</span>
          <span>{minutes}</span>
        </span>
      </div>
    </div>
  );
}
