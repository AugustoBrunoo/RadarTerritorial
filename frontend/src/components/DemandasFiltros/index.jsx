import React from 'react';
import { 
  Filter, 
  ArrowDownUp, 
  MapPin, 
  Layers, 
  ChevronDown, 
  RotateCcw, 
  SlidersHorizontal,
  Clock,
  MessageSquare,
  CheckCircle2,
  Inbox
} from 'lucide-react';

export default function DemandasFiltros({ 
  currentFilter, onFilterChange, counts,
  currentOrder, onOrderChange,
  currentBairro, onBairroChange, bairrosList,
  currentEixo, onEixoChange, eixosList,
  onResetFilters
}) {
  const hasActiveFilters = 
    currentFilter !== 'all' || 
    currentOrder !== 'recent' || 
    currentBairro !== 'all' || 
    currentEixo !== 'all';

  const mainTabs = [
    { 
      id: 'all', 
      label: 'Todos', 
      count: counts.all,
      icon: Inbox,
      activeDot: 'bg-zinc-900 dark:bg-white',
      badgeColor: 'bg-zinc-200 dark:bg-zinc-700 text-zinc-900 dark:text-zinc-100'
    },
    { 
      id: 'nao_respondidos', 
      label: 'Aguardando', 
      count: counts.nao_respondidos,
      icon: Clock,
      activeDot: 'bg-amber-500',
      badgeColor: 'bg-amber-100 dark:bg-amber-900/50 text-amber-800 dark:text-amber-300'
    },
    { 
      id: 'respondidos', 
      label: 'Respondidos', 
      count: counts.respondidos,
      icon: MessageSquare,
      activeDot: 'bg-blue-500',
      badgeColor: 'bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-300'
    },
    { 
      id: 'resolvido', 
      label: 'Finalizados', 
      count: counts.resolvido,
      icon: CheckCircle2,
      activeDot: 'bg-emerald-500',
      badgeColor: 'bg-emerald-100 dark:bg-emerald-900/50 text-emerald-800 dark:text-emerald-300'
    }
  ];

  return (
    <div className="mb-8 bg-white dark:bg-[#121214] border border-zinc-200 dark:border-zinc-800 rounded-3xl p-4 sm:p-6 shadow-sm">
      {/* Header com Título e Ação de Limpar Filtros */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-blue-50 dark:bg-blue-950/40 flex items-center justify-center text-blue-600 dark:text-blue-400 border border-blue-100 dark:border-blue-900/40 shadow-sm">
            <SlidersHorizontal className="h-4 w-4" />
          </div>
          <div>
            <h3 className="font-bold text-sm sm:text-base text-zinc-900 dark:text-white leading-tight">
              Filtros da Demanda
            </h3>
            <p className="text-[11px] font-medium text-zinc-500 dark:text-zinc-400">
              Gerencie a visualização por status, ordem e localização
            </p>
          </div>
        </div>

        {hasActiveFilters && (
          <button
            onClick={onResetFilters}
            className="self-start sm:self-auto flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-red-600 hover:text-red-700 dark:text-red-400 bg-red-50 hover:bg-red-100/80 dark:bg-red-950/30 dark:hover:bg-red-900/40 border border-red-200/60 dark:border-red-900/40 transition-all shadow-sm active:scale-95"
            title="Restaurar todos os filtros"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span>Limpar filtros</span>
          </button>
        )}
      </div>

      {/* Abas de Status Principal (1 coluna no mobile para legibilidade total, 4 colunas em telas maiores) */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-2 w-full p-1.5 bg-zinc-100/80 dark:bg-zinc-900/90 rounded-2xl border border-zinc-200/80 dark:border-zinc-800/80">
        {mainTabs.map((tab) => {
          const isActive = currentFilter === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => onFilterChange(tab.id)}
              className={`flex items-center justify-between md:justify-center gap-2.5 py-2.5 px-3.5 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 ${
                isActive
                  ? 'bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white shadow-sm border border-zinc-200/80 dark:border-zinc-700'
                  : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 hover:bg-white/50 dark:hover:bg-zinc-800/50'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <span className={`w-2 h-2 rounded-full flex-shrink-0 ${tab.activeDot}`} />
                <span className="font-bold">{tab.label}</span>
              </div>
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-black ${
                isActive ? tab.badgeColor : 'bg-zinc-200/70 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400'
              }`}>
                {tab.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Grid de Filtros Complementares (4 colunas no Desktop, 2 no Tablet, 1 no Mobile) */}
      <div className="mt-5 pt-5 border-t border-zinc-100 dark:border-zinc-800/80 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
        {/* Status Detalhado / Fase */}
        <div className="flex flex-col gap-1.5">
          <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 flex items-center gap-1.5">
            <Filter className="h-3 w-3 text-blue-500" /> Status Detalhado
          </label>
          <div className="relative">
            <select
              value={currentFilter}
              onChange={(e) => onFilterChange(e.target.value)}
              className="w-full bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 rounded-xl pl-3.5 pr-8 py-2.5 text-xs sm:text-sm font-semibold text-zinc-800 dark:text-zinc-200 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all appearance-none cursor-pointer"
            >
              <option value="all">Todos os status ({counts.all})</option>
              <option value="nao_respondidos">Aguardando Resposta ({counts.nao_respondidos})</option>
              <option value="respondidos">Respondidos pelo Órgão ({counts.respondidos})</option>
              <option value="pendente">Pendente ({counts.pendente})</option>
              <option value="em_analise">Em Análise ({counts.em_analise})</option>
              <option value="em_execucao">Em Execução ({counts.em_execucao})</option>
              <option value="resolvido">Finalizados ({counts.resolvido})</option>
            </select>
            <ChevronDown className="h-4 w-4 text-zinc-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        {/* Ordem */}
        <div className="flex flex-col gap-1.5">
          <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 flex items-center gap-1.5">
            <ArrowDownUp className="h-3 w-3 text-amber-500" /> Ordenar por
          </label>
          <div className="relative">
            <select 
              value={currentOrder}
              onChange={(e) => onOrderChange(e.target.value)}
              className="w-full bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 rounded-xl pl-3.5 pr-8 py-2.5 text-xs sm:text-sm font-semibold text-zinc-800 dark:text-zinc-200 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all appearance-none cursor-pointer"
            >
              <option value="recent">Mais Recentes</option>
              <option value="oldest">Mais Antigos</option>
              <option value="most_supported">Maior número de apoios</option>
            </select>
            <ChevronDown className="h-4 w-4 text-zinc-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        {/* Bairro */}
        <div className="flex flex-col gap-1.5">
          <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 flex items-center gap-1.5">
            <MapPin className="h-3 w-3 text-red-500" /> Filtrar por Bairro
          </label>
          <div className="relative">
            <select 
              value={currentBairro}
              onChange={(e) => onBairroChange(e.target.value)}
              className="w-full bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 rounded-xl pl-3.5 pr-8 py-2.5 text-xs sm:text-sm font-semibold text-zinc-800 dark:text-zinc-200 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all appearance-none cursor-pointer"
            >
              <option value="all">Todos os bairros</option>
              {bairrosList.map(b => (
                <option key={b} value={b}>{b}</option>
              ))}
            </select>
            <ChevronDown className="h-4 w-4 text-zinc-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        {/* Macro-eixo */}
        <div className="flex flex-col gap-1.5">
          <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 flex items-center gap-1.5">
            <Layers className="h-3 w-3 text-purple-500" /> Macro-eixo
          </label>
          <div className="relative">
            <select 
              value={currentEixo}
              onChange={(e) => onEixoChange(e.target.value)}
              className="w-full bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 rounded-xl pl-3.5 pr-8 py-2.5 text-xs sm:text-sm font-semibold text-zinc-800 dark:text-zinc-200 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all appearance-none cursor-pointer"
            >
              <option value="all">Todos os eixos</option>
              {eixosList.map(e => (
                <option key={e} value={e}>{e}</option>
              ))}
            </select>
            <ChevronDown className="h-4 w-4 text-zinc-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>
      </div>
    </div>
  );
}
