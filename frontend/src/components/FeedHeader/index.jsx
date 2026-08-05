import React from 'react';
import { useNavigate, Link } from 'react-router';
import { ArrowLeft, LayoutDashboard, PlusCircle } from 'lucide-react';

export default function FeedHeader() {
  const navigate = useNavigate();

  return (
    <>
      <div className="mb-6 flex flex-wrap gap-3">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-sm font-bold text-zinc-700 dark:text-zinc-300 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 px-4 py-2 rounded-xl shadow-sm hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-all"
        >
          <ArrowLeft className="h-4 w-4" />
          Voltar
        </button>
        <Link 
          to="/demandas-usuario"
          className="flex items-center gap-2 text-sm font-bold text-zinc-700 dark:text-zinc-300 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 px-4 py-2 rounded-xl shadow-sm hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-all"
        >
          <LayoutDashboard className="h-4 w-4" />
          Ir para minhas demandas
        </Link>
      </div>

      <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-zinc-900 dark:text-white flex items-center gap-3">
            Feed de Relatos
          </h1>
          <p className="text-sm sm:text-base text-zinc-500 dark:text-zinc-400 font-medium mt-1">
            Veja o que seus vizinhos estão relatando na região.
          </p>
        </div>

        <Link 
          to="/reportar-logado"
          className="bg-red-600 hover:bg-red-700 text-white font-extrabold py-3.5 px-6 rounded-2xl text-sm flex items-center justify-center gap-2 transition-all transform hover:-translate-y-0.5 active:scale-95 shadow-md shadow-red-600/10"
        >
          <PlusCircle className="h-4 w-4" /> <span>Criar Relato</span>
        </Link>
      </div>
    </>
  );
}
