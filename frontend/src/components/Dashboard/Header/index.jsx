import React from 'react';
import { MapPin, SunMoon } from 'lucide-react';

export default function Header({ toggleTheme, currentTime }) {
  return (
    <header className="relative z-40 bg-white dark:bg-zinc-950 border-b border-zinc-200 dark:border-zinc-800 px-4 py-3 shadow-sm">
      <div className="max-w-7xl mx-auto flex justify-between items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="bg-red-600 p-2.5 rounded-xl shadow-lg shadow-red-600/20">
            <MapPin className="h-5 w-5 text-white" />
          </div>
          <div>
            <h1 className="font-black text-xl tracking-tight text-zinc-900 dark:text-white">Radar<span className="text-red-500">Territorial</span></h1>
            <div className="flex items-center gap-2 mt-0.5">
                <span className="text-[10px] font-bold text-zinc-500 dark:text-zinc-400 tracking-widest cursor-pointer dark:hover:text-white transition-colors">v1.1.0</span>
            </div>
          </div>
        </div>
        <div className="flex justify-end items-center gap-3">
          <button onClick={toggleTheme} title="Alternar Tema Claro/Escuro" className="hidden md:block p-2.5 bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl text-zinc-600 dark:text-zinc-300 hover:text-amber-500 transition-colors">
            <SunMoon className="h-5 w-5" />
          </button>
          <div className="hidden md:flex bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 px-3 py-1.5 md:px-4 md:py-2 rounded-xl items-center gap-2 md:gap-3">
            <div className="relative flex h-2 w-2 md:h-3 md:w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 md:h-3 md:w-3 bg-emerald-500"></span>
            </div>
            <div className="text-left">
              <p className="hidden md:block text-[10px] font-black uppercase tracking-widest text-zinc-500">Atualizado em</p>
              <p className="text-[10px] md:text-xs font-bold text-zinc-700 dark:text-zinc-300">{currentTime || '--/--/---- --:--'}</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
