import React from 'react';
import { Link } from 'react-router';
import { Check, PlusCircle, LayoutDashboard, Layers, BarChart3 } from 'lucide-react';

export default function FinalChoices() {
  return (
    <div className="w-full flex flex-col items-center animate-pop">
      <div className="text-center mb-10">
        <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <Check className="h-8 w-8" />
        </div>
        <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-zinc-900 dark:text-white mb-2">Tudo pronto!</h2>
        <p className="text-base text-zinc-500 dark:text-zinc-400 font-medium">O que você deseja fazer agora?</p>
      </div>

      {/* Grid de Opções */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
        
        {/* Card 1: Criar Relato */}
        <Link to="/reportar" className="group bg-red-600 text-white rounded-[2rem] p-6 sm:p-8 flex flex-col justify-between border border-red-700 hover:-translate-y-1 transition-all shadow-lg shadow-red-600/20 active:scale-95">
          <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mb-6">
            <PlusCircle className="h-6 w-6 text-white" />
          </div>
          <div>
            <h4 className="text-xl font-black mb-1">Criar um Relato</h4>
            <p className="text-red-100 text-sm font-medium">Reportar um novo problema no mapa.</p>
          </div>
        </Link>

        {/* Card 2: Meu Painel */}
        <Link to="/hub" className="group bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white rounded-[2rem] p-6 sm:p-8 flex flex-col justify-between border border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 hover:-translate-y-1 transition-all shadow-sm active:scale-95 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 blur-3xl rounded-full pointer-events-none"></div>
          <div className="w-12 h-12 bg-zinc-100 dark:bg-zinc-800 rounded-full flex items-center justify-center mb-6 relative z-10">
            <LayoutDashboard className="h-6 w-6 text-blue-500" />
          </div>
          <div className="relative z-10">
            <h4 className="text-xl font-black mb-1">Ir para a Central</h4>
            <p className="text-zinc-500 dark:text-zinc-400 text-sm font-medium">Ver seu painel pessoal de controle.</p>
          </div>
        </Link>

        {/* Card 3: Ver Feed */}
        <Link to="/feed" className="group bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white rounded-[2rem] p-6 sm:p-8 flex flex-col justify-between border border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 hover:-translate-y-1 transition-all shadow-sm active:scale-95 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 blur-3xl rounded-full pointer-events-none"></div>
          <div className="w-12 h-12 bg-zinc-100 dark:bg-zinc-800 rounded-full flex items-center justify-center mb-6 relative z-10">
            <Layers className="h-6 w-6 text-amber-500" />
          </div>
          <div className="relative z-10">
            <h4 className="text-xl font-black mb-1">Ver Relatos</h4>
            <p className="text-zinc-500 dark:text-zinc-400 text-sm font-medium">Navegar no feed da comunidade.</p>
          </div>
        </Link>

        {/* Card 4: Dashboard Público */}
        <Link to="/dashboard" className="group bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white rounded-[2rem] p-6 sm:p-8 flex flex-col justify-between border border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 hover:-translate-y-1 transition-all shadow-sm active:scale-95 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 blur-3xl rounded-full pointer-events-none"></div>
          <div className="w-12 h-12 bg-zinc-100 dark:bg-zinc-800 rounded-full flex items-center justify-center mb-6 relative z-10">
            <BarChart3 className="h-6 w-6 text-purple-500" />
          </div>
          <div className="relative z-10">
            <h4 className="text-xl font-black mb-1">Ver Dashboard</h4>
            <p className="text-zinc-500 dark:text-zinc-400 text-sm font-medium">Dados públicos e impacto da região.</p>
          </div>
        </Link>

      </div>
    </div>
  );
}
