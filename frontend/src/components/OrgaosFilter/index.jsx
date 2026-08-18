import React from 'react';
import { Filter, Search, Plus } from 'lucide-react';

export default function OrgaosFilter({
  searchQuery,
  setSearchQuery,
  selectedArea,
  setSelectedArea,
  selectedStatus,
  setSelectedStatus,
  sortOrder,
  setSortOrder,
  onNovoOrgaoClick
}) {
  return (
    <section className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-5 sm:p-6 shadow-sm">
      {/* Cabeçalho da Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-zinc-100 dark:border-zinc-800/80 mb-5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-600 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700/60">
            <Filter className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-base font-black text-zinc-900 dark:text-white tracking-tight">Filtros & Gestão</h2>
            <p className="text-xs font-medium text-zinc-500">Refine a lista de órgãos ou cadastre novas entidades</p>
          </div>
        </div>

        {/* Botão Novo Órgão */}
        <button
          onClick={onNovoOrgaoClick}
          className="flex items-center justify-center gap-2 px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs sm:text-sm font-bold transition-all shadow-sm shadow-red-500/20 cursor-pointer group"
        >
          <Plus className="h-4 w-4 group-hover:scale-110 transition-transform" />
          <span>Novo Órgão</span>
        </button>
      </div>

      {/* Linha de Inputs Padronizados */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
        {/* Input de Busca */}
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400 pointer-events-none" />
          <input 
            type="text" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar por nome, e-mail..."
            className="w-full h-11 bg-zinc-50 dark:bg-zinc-950/60 border border-zinc-200 dark:border-zinc-800 rounded-xl pl-10 pr-4 text-sm text-zinc-900 dark:text-white placeholder-zinc-400 dark:placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-red-500/40 focus:border-red-500/50 transition-all font-medium" 
          />
        </div>

        {/* Select de Área de Atuação */}
        <div>
          <select 
            value={selectedArea}
            onChange={(e) => setSelectedArea(e.target.value)}
            className="w-full h-11 bg-zinc-50 dark:bg-zinc-950/60 border border-zinc-200 dark:border-zinc-800 rounded-xl px-3.5 text-sm text-zinc-700 dark:text-zinc-200 focus:outline-none focus:ring-2 focus:ring-red-500/40 focus:border-red-500/50 transition-all font-medium cursor-pointer"
          >
            <option value="">Todas as Áreas</option>
            <option value="Infraestrutura Urbana">Infraestrutura Urbana</option>
            <option value="Saneamento Básico">Saneamento Básico</option>
            <option value="Limpeza Urbana">Limpeza Urbana</option>
            <option value="Iluminação Pública">Iluminação Pública</option>
            <option value="Segurança e Ordem Pública">Segurança e Ordem Pública</option>
            <option value="Transporte e Mobilidade">Transporte e Mobilidade</option>
          </select>
        </div>

        {/* Select de Status */}
        <div>
          <select 
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="w-full h-11 bg-zinc-50 dark:bg-zinc-950/60 border border-zinc-200 dark:border-zinc-800 rounded-xl px-3.5 text-sm text-zinc-700 dark:text-zinc-200 focus:outline-none focus:ring-2 focus:ring-red-500/40 focus:border-red-500/50 transition-all font-medium cursor-pointer"
          >
            <option value="">Todos os Status</option>
            <option value="ativo">Apenas Ativos</option>
            <option value="inativo">Apenas Inativos</option>
          </select>
        </div>

        {/* Select de Ordenação */}
        <div>
          <select 
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="w-full h-11 bg-zinc-50 dark:bg-zinc-950/60 border border-zinc-200 dark:border-zinc-800 rounded-xl px-3.5 text-sm text-zinc-700 dark:text-zinc-200 focus:outline-none focus:ring-2 focus:ring-red-500/40 focus:border-red-500/50 transition-all font-medium cursor-pointer"
          >
            <option value="az">Nome (A - Z)</option>
            <option value="za">Nome (Z - A)</option>
            <option value="recentes">Mais Recentes</option>
            <option value="antigos">Mais Antigos</option>
          </select>
        </div>
      </div>
    </section>
  );
}
