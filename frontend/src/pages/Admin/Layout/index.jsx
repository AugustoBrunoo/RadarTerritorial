import React from 'react';
import { Outlet, Link } from 'react-router';
import { ShieldAlert, LogOut, Home } from 'lucide-react';

export default function AdminLayout() {
  return (
    <div className="min-h-screen bg-zinc-100 dark:bg-zinc-950 flex">
      {/* Sidebar Simples */}
      <aside className="w-64 bg-white dark:bg-zinc-900 border-r border-zinc-200 dark:border-zinc-800 p-6 flex flex-col shrink-0">
        <div className="flex items-center gap-2 text-red-600 mb-10">
          <ShieldAlert className="h-8 w-8" />
          <span className="font-black text-xl tracking-tight leading-none">Admin<br/>RT</span>
        </div>
        
        <nav className="flex-1 space-y-2">
          <Link to="/admin" className="flex items-center gap-3 px-4 py-3 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 font-bold rounded-xl">
            <Home className="h-5 w-5" /> Dashboard
          </Link>
          {/* Outros links de admin podem entrar aqui */}
        </nav>
        
        <Link to="/feed" className="flex items-center gap-3 px-4 py-3 text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors font-bold mt-auto">
          <LogOut className="h-5 w-5" /> Sair do Admin
        </Link>
      </aside>

      {/* Conteúdo Principal */}
      <main className="flex-1 overflow-auto bg-zinc-50 dark:bg-zinc-950">
        <header className="bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 p-6 sticky top-0 z-10">
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-black text-zinc-900 dark:text-white">Painel de Administração do Sistema</h1>
            <span className="px-3 py-1 bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 text-xs font-black uppercase tracking-widest rounded-full">
              Modo Administrador
            </span>
          </div>
        </header>
        <div className="p-8 max-w-7xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
