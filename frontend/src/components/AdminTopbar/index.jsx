import React from 'react';
import { Menu, Sun, Moon } from 'lucide-react';

export default function AdminTopbar({ isDarkMode, toggleTheme, title, subtitle }) {
  return (
    <header className="h-20 flex items-center justify-between px-6 lg:px-10 border-b border-zinc-200 dark:border-zinc-800/60 bg-white/50 dark:bg-zinc-900/50 backdrop-blur-md z-10 flex-shrink-0">
      <div className="flex items-center gap-4">
        <button className="md:hidden p-2 -ml-2 rounded-lg hover:bg-zinc-200 dark:hover:bg-zinc-800 text-zinc-500">
          <Menu className="h-5 w-5" />
        </button>
        <div>
          <h1 className="text-xl lg:text-2xl font-black tracking-tight text-zinc-900 dark:text-white">{title}</h1>
          <p className="text-xs font-medium text-zinc-500 mt-0.5">{subtitle}</p>
        </div>
      </div>

      {/* Ações Rápidas do Topo */}
      <div className="flex items-center gap-3">
        <button onClick={toggleTheme} className="p-2.5 rounded-full bg-zinc-100 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700/50 text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors" title="Alternar tema">
          {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </button>
      </div>
    </header>
  );
}
