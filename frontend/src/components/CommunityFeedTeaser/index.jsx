import React from "react";
import { Link } from "react-router";
import { Users, ArrowRight } from "lucide-react";

export default function CommunityFeedTeaser() {
  return (
    <div className="md:col-span-4 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-[2.5rem] p-6 flex flex-col justify-between shadow-sm group hover:border-red-500/30 transition-all duration-300">
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2 text-zinc-400">
            <Users className="h-4 w-4" />
            <span className="text-[10px] font-black uppercase tracking-wider">Radar da Vizinhança</span>
          </div>
        </div>
        <h3 className="text-xl font-black tracking-tight mb-2">Feed de Relatos</h3>
        <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed font-medium mb-6">
          Descubra o que os moradores estão relatando perto de você em Cosmos, Inhoaíba e Campo Grande. Vote e comente para dar força às causas locais.
        </p>
      </div>

      <div className="space-y-4">
        <div className="bg-zinc-50 dark:bg-zinc-950/40 border border-zinc-200 dark:border-zinc-800/60 p-3 rounded-2xl flex items-center gap-3">
          <div className="w-8 h-8 bg-red-100 dark:bg-red-900/20 rounded-xl flex items-center justify-center flex-shrink-0">
            <span className="animate-pulse text-red-500 text-lg">🔥</span>
          </div>
          <span className="text-xs font-bold text-zinc-700 dark:text-zinc-300">14 novos relatos nas últimas 24h</span>
        </div>
        <Link
          to="#"
          className="w-full bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 font-extrabold py-3 px-4 rounded-xl text-xs flex items-center justify-center gap-2 transition-all"
        >
          <span>Explorar Feed de Relatos</span> <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </div>
  );
}
