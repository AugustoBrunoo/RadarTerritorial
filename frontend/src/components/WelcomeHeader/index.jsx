import React, { useState, useEffect } from "react";
import { Calendar } from "lucide-react";

export default function WelcomeHeader() {
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    const dateOptions = { weekday: "long", year: "numeric", month: "long", day: "numeric" };
    setCurrentDate(new Date().toLocaleDateString("pt-BR", dateOptions));
  }, []);

  return (
    <div className="mb-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-zinc-900 dark:text-white">
          Central do Cidadão
        </h1>
        <p className="text-sm sm:text-base text-zinc-500 dark:text-zinc-400 font-medium mt-1">
          Acompanhe seus relatos, métricas locais e atualizações da comunidade.
        </p>
      </div>

      {/* Data Minimalista */}
      <div className="flex items-center gap-2 px-4 py-2 bg-zinc-100 dark:bg-zinc-900/50 rounded-xl border border-zinc-200 dark:border-zinc-800 text-zinc-500 dark:text-zinc-400">
        <Calendar className="h-4 w-4" />
        <span className="text-xs font-bold uppercase tracking-wider">
          {currentDate || "Buscando data..."}
        </span>
      </div>
    </div>
  );
}
