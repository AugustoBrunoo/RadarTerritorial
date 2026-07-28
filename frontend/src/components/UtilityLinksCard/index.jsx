import React from "react";
import { ExternalLink, ArrowUpRight, Phone, Grid } from "lucide-react";

export default function UtilityLinksCard({ onOpenModal }) {
  return (
    <div className="md:col-span-4 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-[2.5rem] p-6 flex flex-col justify-between shadow-sm">
      <div>
        <div className="flex items-center gap-2 mb-4 text-zinc-400">
          <ExternalLink className="h-4 w-4" />
          <span className="text-[10px] font-black uppercase tracking-wider">Ouvidorias & Serviços</span>
        </div>
        <h3 className="text-xl font-black tracking-tight mb-2">Utilidade Pública</h3>
        <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed font-medium mb-4">
          Para casos de perigo de vida ou problemas de responsabilidade de concessionárias oficiais, utilize os atalhos rápidos:
        </p>
      </div>

      <div className="space-y-3">
        <a
          href="https://www.1746.rio"
          target="_blank"
          rel="noreferrer"
          className="w-full flex items-center justify-between p-4 bg-zinc-50 dark:bg-zinc-950/40 hover:bg-zinc-100 dark:hover:bg-zinc-900 border border-zinc-200 dark:border-zinc-800/60 rounded-2xl transition-all group"
        >
          <span className="text-xs font-bold text-zinc-700 dark:text-zinc-300">Central de Atendimento 1746</span>
          <ArrowUpRight className="h-4 w-4 text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-white" />
        </a>
        <a
          href="tel:190"
          className="w-full flex items-center justify-between p-4 bg-zinc-50 dark:bg-zinc-950/40 hover:bg-zinc-100 dark:hover:bg-zinc-900 border border-zinc-200 dark:border-zinc-800/60 rounded-2xl transition-all"
        >
          <span className="text-xs font-bold text-red-600 dark:text-red-400">Polícia Militar (190)</span>
          <Phone className="h-4 w-4 text-red-600 dark:text-red-400" />
        </a>
        <button
          onClick={onOpenModal}
          className="w-full flex items-center justify-between p-4 bg-zinc-50 dark:bg-zinc-950/40 hover:bg-zinc-100 dark:hover:bg-zinc-900 border border-zinc-200 dark:border-zinc-800/60 rounded-2xl transition-all text-left"
        >
          <span className="text-xs font-bold text-zinc-700 dark:text-zinc-300">Ver demais atalhos</span>
          <Grid className="h-4 w-4 text-zinc-400" />
        </button>
      </div>
    </div>
  );
}
