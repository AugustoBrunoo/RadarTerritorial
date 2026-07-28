import React from "react";
import { Link } from "react-router";
import { Megaphone, ArrowRight } from "lucide-react";

export default function QuickReportCard() {
  return (
    <div className="md:col-span-7 bg-zinc-900 border border-zinc-800 rounded-[2.5rem] p-8 flex flex-col justify-between relative overflow-hidden group shadow-xl">
      <div className="absolute top-0 right-0 -mt-12 -mr-12 w-48 h-48 bg-red-600/20 blur-3xl rounded-full transition-opacity duration-300 group-hover:bg-red-600/30"></div>
      
      <div className="relative z-10 flex justify-between items-start">
        <div className="w-12 h-12 bg-red-600 rounded-2xl flex items-center justify-center shadow-lg shadow-red-600/30 group-hover:scale-105 transition-transform duration-300">
          <Megaphone className="h-6 w-6 text-white" />
        </div>
      </div>

      <div className="relative z-10 mt-8 mb-6">
        <h3 className="text-3xl font-black text-white leading-tight mb-3">
          Encontrou algum problema na sua rua hoje?
        </h3>
        <p className="text-sm text-zinc-400 leading-relaxed font-medium max-w-md">
          Abra um relato de buraco, iluminação pública, saneamento ou trânsito em menos de um minuto e acelere a resolução.
        </p>
      </div>

      <div className="relative z-10">
        <Link
          to="/reportar-logado"
          className="w-full bg-red-600 hover:bg-red-700 text-white font-extrabold py-4 px-6 rounded-2xl text-sm flex items-center justify-center gap-2 transition-all transform hover:-translate-y-0.5 active:scale-95 shadow-md shadow-red-600/10"
        >
          <span>Reportar Problema</span> <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}
