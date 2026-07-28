import React from "react";
import { Link } from "react-router";
import { Activity, History } from "lucide-react";

export default function UserImpactCard() {
  return (
    <div className="md:col-span-5 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-[2.5rem] p-8 flex flex-col justify-between shadow-sm relative overflow-hidden">
      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-6 text-zinc-500 dark:text-zinc-400">
          <Activity className="h-4 w-4" />
          <span className="text-[10px] font-black uppercase tracking-wider">Seu impacto comunitário</span>
        </div>
        <h3 className="text-2xl font-black tracking-tight mb-2 text-zinc-900 dark:text-white">Suas Demandas</h3>
        <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed font-medium mb-6">
          Confira o status consolidado das solicitações que você registrou na plataforma.
        </p>
      </div>

      {/* Grid de Status */}
      <div className="grid grid-cols-3 gap-3 mb-6 relative z-10">
        <div className="p-4 bg-zinc-50 dark:bg-zinc-950/40 border border-zinc-200 dark:border-zinc-800/60 rounded-2xl flex flex-col items-center justify-center text-center">
          <span className="text-3xl font-black text-zinc-900 dark:text-white">5</span>
          <span className="text-[9px] font-bold text-zinc-500 dark:text-zinc-400 mt-1 uppercase tracking-wider">Enviados</span>
        </div>
        <div className="p-4 bg-zinc-50 dark:bg-zinc-950/40 border border-zinc-200 dark:border-zinc-800/60 rounded-2xl flex flex-col items-center justify-center text-center">
          <span className="text-3xl font-black text-amber-600 dark:text-amber-500">2</span>
          <span className="text-[9px] font-bold text-amber-600 mt-1 uppercase tracking-wider">Não Resolvido</span>
        </div>
        <div className="p-4 bg-zinc-50 dark:bg-zinc-950/40 border border-zinc-200 dark:border-zinc-800/60 rounded-2xl flex flex-col items-center justify-center text-center">
          <span className="text-3xl font-black text-green-600 dark:text-green-500">3</span>
          <span className="text-[9px] font-bold text-green-600 mt-1 uppercase tracking-wider">Resolvidos</span>
        </div>
      </div>

      <Link
        to="#"
        className="relative z-10 w-full bg-zinc-900 dark:bg-zinc-100 hover:bg-zinc-800 dark:hover:bg-white text-white dark:text-zinc-900 font-extrabold py-3.5 px-4 rounded-xl text-xs flex items-center justify-center gap-2 transition-all"
      >
        <History className="h-4 w-4" /> <span>Ver Histórico de Relatos</span>
      </Link>
    </div>
  );
}
