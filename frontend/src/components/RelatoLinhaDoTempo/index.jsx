import React from 'react';
import { GitCommit } from 'lucide-react';

export default function RelatoLinhaDoTempo({ report, dateStr }) {
  return (
    <section className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 sm:p-8 mt-8 shadow-sm">
      <h2 className="text-xl font-bold mb-6 flex items-center gap-2 text-zinc-900 dark:text-white">
        <GitCommit className="h-5 w-5 text-zinc-400" /> Linha do Tempo
      </h2>

      <div className="relative pl-6 border-l-2 border-zinc-200 dark:border-zinc-800 space-y-8">
        {/* Etapa 1: Atual */}
        <div className="relative">
          <div className="absolute -left-[35px] top-1 h-5 w-5 rounded-full bg-amber-500 border-4 border-white dark:border-zinc-900 flex items-center justify-center shadow-[0_0_10px_rgba(245,158,11,0.5)]"></div>
          <h3 className="text-lg font-bold text-amber-600 dark:text-amber-500 mb-1">Registro na Plataforma</h3>
          <p className="text-zinc-600 dark:text-zinc-400 text-sm">
            O relato foi registrado na plataforma e está visível para a comunidade.
          </p>
          <span className="text-xs text-zinc-500 mt-2 block">{dateStr}</span>
        </div>

        {/* Etapa 2: Futura / Atual */}
        <div className={`relative ${report.status === 'pendente' ? 'opacity-50' : ''}`}>
          <div className={`absolute -left-[35px] top-1 h-5 w-5 rounded-full border-4 border-white dark:border-zinc-900 ${report.status !== 'pendente' ? 'bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]' : 'bg-zinc-200 dark:bg-zinc-800'}`}></div>
          <h3 className={`text-lg font-bold mb-1 ${report.status !== 'pendente' ? 'text-blue-600 dark:text-blue-400' : 'text-zinc-700 dark:text-zinc-300'}`}>Encaminhado / Em Análise</h3>
          <p className="text-zinc-500 text-sm">
            {report.resposta_orgao || "O problema será notificado oficialmente para as autoridades responsáveis."}
          </p>
        </div>

        {/* Etapa 3: Futura */}
        <div className={`relative ${report.status !== 'resolvido' ? 'opacity-50' : ''}`}>
          <div className={`absolute -left-[35px] top-1 h-5 w-5 rounded-full border-4 border-white dark:border-zinc-900 ${report.status === 'resolvido' ? 'bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]' : 'bg-zinc-200 dark:bg-zinc-800'}`}></div>
          <h3 className={`text-lg font-bold mb-1 ${report.status === 'resolvido' ? 'text-green-600 dark:text-green-400' : 'text-zinc-700 dark:text-zinc-300'}`}>Resolvido</h3>
          <p className="text-zinc-500 text-sm">Problema solucionado e validado pela comunidade.</p>
        </div>
      </div>
    </section>
  );
}
