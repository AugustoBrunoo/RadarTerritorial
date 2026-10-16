import React from 'react';
import { Link, useNavigate } from 'react-router';
import { MapPin, SunMoon, ArrowLeft } from 'lucide-react';
import { safeNavigateBack } from '../../../utils/navigation';

export default function Header({ toggleTheme, currentTime }) {
  const navigate = useNavigate();
  
  return (
    <header className="relative z-40 bg-white dark:bg-zinc-950 border-b border-zinc-200 dark:border-zinc-800 px-3 sm:px-6 py-2 sm:py-3 shadow-sm min-h-[54px] sm:min-h-[66px] flex items-center">
      <div className="max-w-7xl mx-auto w-full flex justify-between items-center gap-4">
        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
          <button 
            onClick={() => safeNavigateBack(navigate, '/')}
            title="Voltar"
            aria-label="Voltar para a página inicial"
            className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 border border-zinc-200 dark:border-zinc-700 rounded-full transition-all duration-300 shadow-sm shrink-0 active:scale-95 cursor-pointer mr-1 sm:mr-2"
          >
            <ArrowLeft className="h-4 w-4 sm:h-5 sm:w-5" />
          </button>
          
          <Link
            to="/"
            className="flex items-center gap-1.5 sm:gap-2 cursor-pointer group min-w-0 shrink"
          >
            <div className="bg-red-600 p-1.5 sm:p-2 rounded-full group-hover:scale-105 transition-transform shrink-0">
              <MapPin className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
            </div>
            <div className="flex items-baseline gap-1.5 min-w-0">
              <span className="font-bold text-[18px] sm:text-[20px] md:text-xl tracking-tight text-zinc-900 dark:text-white truncate">
                Radar<span className="text-red-600">Territorial</span>
              </span>
              <span className="hidden sm:inline-block text-[10px] font-bold text-zinc-400 dark:text-zinc-500 tracking-wider shrink-0">v1.1.0</span>
            </div>
          </Link>
        </div>
        <div className="flex justify-end items-center gap-2 sm:gap-3 shrink-0">
          <button 
            onClick={toggleTheme} 
            title="Alternar Tema Claro/Escuro" 
            aria-label="Alternar tema claro ou escuro"
            className="hidden md:flex w-9 h-9 sm:w-10 sm:h-10 items-center justify-center bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 border border-zinc-200 dark:border-zinc-700 rounded-full text-zinc-600 dark:text-zinc-300 hover:text-amber-500 transition-all duration-300 shadow-sm active:scale-95 cursor-pointer"
          >
            <SunMoon className="h-4 w-4 sm:h-5 sm:w-5" />
          </button>
          <div className="hidden md:flex h-9 sm:h-10 bg-zinc-100 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700/80 px-3.5 rounded-full items-center gap-2.5">
            <div className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </div>
            <div className="text-left flex items-baseline gap-1.5">
              <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Atualizado:</span>
              <span className="text-xs font-bold text-zinc-700 dark:text-zinc-300 tabular-nums">{currentTime || '--/--/---- --:--'}</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
