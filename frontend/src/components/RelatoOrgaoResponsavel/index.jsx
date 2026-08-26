import React from 'react';
import { Building2, CheckCircle2, AlertCircle } from 'lucide-react';

export default function RelatoOrgaoResponsavel({ orgao }) {
  if (!orgao) {
    return (
      <div className="bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-5 mb-6 flex items-start gap-4">
        <div className="bg-zinc-100 dark:bg-zinc-800 p-3 rounded-full text-zinc-400">
          <AlertCircle className="h-6 w-6" />
        </div>
        <div>
          <h3 className="text-sm font-bold text-zinc-900 dark:text-white mb-1">Órgão Responsável</h3>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">Ainda não atribuído a um órgão específico.</p>
        </div>
      </div>
    );
  }

  // Fallbacks para campos comuns da tabela orgaos
  const nomeOrgao = orgao.nome || orgao.nome_orgao || orgao.sigla || "Órgão Responsável";
  const siglaOrgao = orgao.sigla || "";
  const descricao = orgao.descricao || "Responsável por atender e solucionar esta demanda.";

  return (
    <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 mb-6 shadow-sm relative overflow-hidden group">
      {/* Background Decorativo */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 dark:bg-blue-500/10 rounded-full blur-2xl -mr-10 -mt-10 transition-transform group-hover:scale-110"></div>
      
      <div className="relative z-10 flex items-start gap-4">
        <div className="bg-blue-50 dark:bg-blue-950/40 border border-blue-100 dark:border-blue-900/50 p-3.5 rounded-2xl text-blue-600 dark:text-blue-500 shadow-sm flex-shrink-0">
          <Building2 className="h-6 w-6" />
        </div>
        <div className="flex-grow">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-base font-black text-zinc-900 dark:text-white">
              {nomeOrgao}
            </h3>
            <span className="bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-400 text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider flex items-center gap-1">
              <CheckCircle2 className="h-3 w-3" />
              Atribuído
            </span>
          </div>
          {siglaOrgao && siglaOrgao !== nomeOrgao && (
            <p className="text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-widest mb-1.5">
              {siglaOrgao}
            </p>
          )}
          <p className="text-sm text-zinc-600 dark:text-zinc-400 font-medium leading-relaxed">
            {descricao}
          </p>
        </div>
      </div>
    </div>
  );
}
