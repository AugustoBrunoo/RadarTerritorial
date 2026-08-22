import React from "react";
import { Link } from "react-router";
import { BarChart3, LineChart } from "lucide-react";

export default function LocalIndicatorsCard() {
  return (
    <div className="md:col-span-4 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-[2.5rem] p-6 flex flex-col justify-between shadow-sm group hover:border-red-500/30 transition-colors duration-300">
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2 text-zinc-400">
            <BarChart3 className="h-4 w-4" />
            <span className="text-[10px] font-black uppercase tracking-wider">Zeladoria e Eficiência</span>
          </div>
        </div>
        <h3 className="text-xl font-black tracking-tight mb-2 text-zinc-900 dark:text-white">Indicadores Locais</h3>
        <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed font-medium mb-4">
          O Radar monitora o tempo de resposta da prefeitura para a Zona Oeste e mapeia as soluções por distrito.
        </p>
      </div>

      <div className="space-y-4">

        <Link
          to="#"
          className="w-full bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-200 font-extrabold py-3 px-4 rounded-xl text-xs flex items-center justify-center gap-2 transition-all"
        >
          <span>Ver Dashboard de Dados</span> <LineChart className="h-3.5 w-3.5" />
        </Link>
      </div>
    </div>
  );
}
