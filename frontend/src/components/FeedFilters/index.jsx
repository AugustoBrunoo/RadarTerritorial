import React from 'react';
import { Filter, ChevronDown, Search, RefreshCw } from 'lucide-react';

export default function FeedFilters({
  filters,
  setFilters,
  clearFilters,
  showMobileFilters,
  setShowMobileFilters
}) {
  return (
    <div className="lg:col-span-4 z-40">
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-[2rem] p-5 lg:p-6 shadow-sm">
        <button 
          onClick={() => setShowMobileFilters(!showMobileFilters)}
          className="w-full flex items-center justify-between lg:hidden font-bold text-zinc-900 dark:text-white"
        >
          <div className="flex items-center gap-2">
            <Filter className="h-5 w-5 text-red-600" />
            <span>Filtrar Publicações</span>
          </div>
          <ChevronDown className={`h-5 w-5 transition-transform duration-300 ${showMobileFilters ? 'rotate-180' : ''}`} />
        </button>

        <div className={`${showMobileFilters ? 'block' : 'hidden'} lg:block space-y-6 mt-5 lg:mt-0 max-h-[60vh] lg:max-h-none overflow-y-auto custom-scroll pr-2`}>
          
          {/* Search */}
          <div>
            <label className="block text-xs font-black uppercase tracking-widest text-zinc-400 mb-2">Buscar por palavra-chave</label>
            <div className="relative">
              <input 
                type="text" 
                placeholder="Ex: esgoto, buraco..."
                value={filters.search}
                onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
                className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl pl-10 pr-4 py-3 text-sm text-zinc-900 dark:text-white focus:ring-2 focus:ring-red-500 outline-none transition-all placeholder-zinc-400 font-medium shadow-sm"
              />
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-400">
                <Search className="h-4 w-4" />
              </div>
            </div>
          </div>

          {/* Region */}
          <div>
            <label className="block text-xs font-black uppercase tracking-widest text-zinc-400 mb-2.5">Bairro / Distrito</label>
            <div className="grid grid-cols-2 gap-2">
              {[
                { id: 'all', label: 'Todos' },
                { id: 'campo-grande', label: 'Campo Grande' },
                { id: 'inhoaiba', label: 'Inhoaíba' },
                { id: 'cosmos', label: 'Cosmos' }
              ].map(region => (
                <button 
                  key={region.id}
                  onClick={() => setFilters(prev => ({ ...prev, region: region.id }))}
                  className={`text-xs font-bold py-2.5 px-3 rounded-xl border text-center transition-all ${filters.region === region.id ? 'border-zinc-900 bg-zinc-900 text-white dark:border-white dark:bg-white dark:text-zinc-900' : 'border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 bg-zinc-50 dark:bg-zinc-950 hover:bg-zinc-100 dark:hover:bg-zinc-800'}`}
                >
                  {region.label}
                </button>
              ))}
            </div>
          </div>

          {/* Category */}
          <div>
            <label className="block text-xs font-black uppercase tracking-widest text-zinc-400 mb-2.5">Tipo de Ocorrência</label>
            <select 
              value={filters.category}
              onChange={(e) => setFilters(prev => ({ ...prev, category: e.target.value }))}
              className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-3 text-sm text-zinc-900 dark:text-white focus:ring-2 focus:ring-red-500 outline-none transition-all cursor-pointer font-medium shadow-sm"
            >
              <option value="all">Todas as Categorias</option>
              <option value="infra">Infraestrutura e Vias</option>
              <option value="saneamento">Saneamento e Limpeza</option>
              <option value="iluminacao">Iluminação e Segurança</option>
              <option value="mobilidade">Mobilidade e Transporte</option>
              <option value="seguranca">Insegurança e Território</option>
            </select>
          </div>

          {/* Urgency */}
          <div>
            <label className="block text-xs font-black uppercase tracking-widest text-zinc-400 mb-2.5">Nível de Urgência</label>
            <select 
              value={filters.urgency}
              onChange={(e) => setFilters(prev => ({ ...prev, urgency: e.target.value }))}
              className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-3 text-sm text-zinc-900 dark:text-white focus:ring-2 focus:ring-red-500 outline-none transition-all cursor-pointer font-medium shadow-sm"
            >
              <option value="all">Todas as Gravidades</option>
              <option value="recente">Problema Recente</option>
              <option value="urgente">Urgente</option>
              <option value="abandono">Muito tempo abandonado</option>
              <option value="grave">Grave / Risco de Acidente</option>
            </select>
          </div>

          {/* Clear Filters */}
          <button 
            onClick={clearFilters}
            className="w-full flex items-center justify-center gap-2 py-3 border border-dashed border-zinc-200 dark:border-zinc-800 text-xs font-bold text-zinc-400 hover:text-red-500 hover:border-red-500 dark:hover:border-red-900/50 rounded-xl transition-all"
          >
            <RefreshCw className="h-3.5 w-3.5" /> Limpar Filtros
          </button>
        </div>
      </div>
    </div>
  );
}
