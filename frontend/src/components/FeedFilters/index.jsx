import React from 'react';
import { Filter, ChevronDown, Search, RefreshCw } from 'lucide-react';

export default function FeedFilters({
  filters,
  setFilters,
  clearFilters,
  showMobileFilters,
  setShowMobileFilters
}) {
  const activeFiltersCount = [
    filters.search?.trim(),
    filters.region !== 'all',
    filters.category !== 'all',
    filters.urgency !== 'all'
  ].filter(Boolean).length;

  return (
    <div className="lg:col-span-4 z-40">
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-[2rem] p-5 lg:p-6 shadow-sm">
        {/* Botão de alternar filtros no mobile / tablet */}
        <button 
          type="button"
          onClick={() => setShowMobileFilters(!showMobileFilters)}
          aria-expanded={showMobileFilters}
          aria-controls="feed-filters-panel"
          aria-label="Alternar painel de filtros"
          className="w-full flex items-center justify-between lg:hidden font-bold text-zinc-900 dark:text-white cursor-pointer select-none py-1 group"
        >
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded-lg bg-red-50 dark:bg-red-950/30 text-red-600 dark:text-red-500 transition-colors group-hover:bg-red-100 dark:group-hover:bg-red-900/40">
              <Filter className="h-4 w-4" />
            </div>
            <span className="text-base tracking-tight">Filtrar Publicações</span>
            {activeFiltersCount > 0 && (
              <span className="ml-1 px-2 py-0.5 text-xs font-black bg-red-600 text-white rounded-full">
                {activeFiltersCount}
              </span>
            )}
          </div>
          <div className={`p-1.5 rounded-full transition-all duration-300 ${
            showMobileFilters 
              ? 'bg-zinc-100 dark:bg-zinc-800 rotate-180 text-red-600' 
              : 'text-zinc-400 group-hover:text-zinc-600 dark:group-hover:text-zinc-200'
          }`}>
            <ChevronDown className="h-4 w-4" />
          </div>
        </button>

        {/* Cabeçalho fixo no desktop */}
        <div className="hidden lg:flex items-center gap-2.5 font-bold text-zinc-900 dark:text-white mb-6">
          <div className="p-1.5 rounded-lg bg-red-50 dark:bg-red-950/30 text-red-600 dark:text-red-500">
            <Filter className="h-4 w-4" />
          </div>
          <span className="text-base tracking-tight">Filtrar Publicações</span>
        </div>

        {/* Container com animação suave descendo o filtro */}
        <div 
          id="feed-filters-panel"
          className={`feed-filter-collapsible ${showMobileFilters ? 'open' : ''}`}
        >
          <div className="feed-filter-content">
            <div className="pt-5 lg:pt-0 space-y-6 max-h-[60vh] lg:max-h-none overflow-y-auto custom-scroll pr-2">
              
              {/* Search */}
              <div>
                <label htmlFor="feed-search-input" className="block text-xs font-black uppercase tracking-widest text-zinc-400 mb-2">Buscar por palavra-chave</label>
                <div className="relative">
                  <input 
                    id="feed-search-input"
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
                <span className="block text-xs font-black uppercase tracking-widest text-zinc-400 mb-2.5">Bairro / Distrito</span>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: 'all', label: 'Todos' },
                    { id: 'campo-grande', label: 'Campo Grande' },
                    { id: 'inhoaiba', label: 'Inhoaíba' },
                    { id: 'cosmos', label: 'Cosmos' }
                  ].map(region => (
                    <button 
                      key={region.id}
                      type="button"
                      onClick={() => setFilters(prev => ({ ...prev, region: region.id }))}
                      aria-pressed={filters.region === region.id}
                      className={`text-xs font-bold py-2.5 px-3 rounded-xl border text-center transition-all cursor-pointer ${filters.region === region.id ? 'border-zinc-900 bg-zinc-900 text-white dark:border-white dark:bg-white dark:text-zinc-900' : 'border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 bg-zinc-50 dark:bg-zinc-950 hover:bg-zinc-100 dark:hover:bg-zinc-800'}`}
                    >
                      {region.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Category */}
              <div>
                <label htmlFor="feed-category-select" className="block text-xs font-black uppercase tracking-widest text-zinc-400 mb-2.5">Tipo de Ocorrência</label>
                <select 
                  id="feed-category-select"
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
                <label htmlFor="feed-urgency-select" className="block text-xs font-black uppercase tracking-widest text-zinc-400 mb-2.5">Nível de Urgência</label>
                <select 
                  id="feed-urgency-select"
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
                type="button"
                onClick={clearFilters}
                aria-label="Limpar todos os filtros"
                className="w-full flex items-center justify-center gap-2 py-3 border border-dashed border-zinc-200 dark:border-zinc-800 text-xs font-bold text-zinc-400 hover:text-red-500 hover:border-red-500 dark:hover:border-red-900/50 rounded-xl transition-all cursor-pointer"
              >
                <RefreshCw className="h-3.5 w-3.5" /> Limpar Filtros
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
