import React from 'react';
import { Edit2, RotateCcw, Trash2 } from 'lucide-react';

export default function OrgaoCard({ orgao, onToggleStatus, onDelete }) {
  const Icon = orgao.icon;

  const getIconColorClasses = (colorClass, status) => {
    if (status === 'inativo') {
      return "bg-zinc-200 dark:bg-zinc-800 border-zinc-300 dark:border-zinc-700 text-zinc-400";
    }
    
    switch(colorClass) {
      case 'blue':
        return "bg-blue-50 dark:bg-blue-900/20 border-blue-100 dark:border-blue-800/30 text-blue-600 dark:text-blue-400";
      case 'zinc':
      default:
        return "bg-zinc-100 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400";
    }
  };

  return (
    <div 
      className={`bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-4 md:p-0 shadow-sm hover:border-zinc-300 dark:hover:border-zinc-700 transition-all group ${
        orgao.status === 'inativo' ? 'opacity-75 bg-zinc-50/70 dark:bg-zinc-900/40' : ''
      }`}
    >
      <div className="md:grid md:grid-cols-12 md:gap-4 md:items-center md:px-6 md:py-4 flex flex-col gap-4">
        
        {/* Coluna 1: Nome e Email */}
        <div className="md:col-span-4 flex items-center gap-4">
          <div className={`w-12 h-12 rounded-xl border flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-105 ${getIconColorClasses(orgao.iconColor, orgao.status)}`}>
            <Icon className="h-6 w-6" />
          </div>
          <div className="overflow-hidden">
            <h3 className={`text-sm font-bold truncate ${orgao.status === 'inativo' ? 'text-zinc-700 dark:text-zinc-300' : 'text-zinc-900 dark:text-white'}`}>
              {orgao.name}
            </h3>
            <p className={`text-xs truncate ${orgao.status === 'inativo' ? 'text-zinc-400' : 'text-zinc-500'}`}>
              {orgao.email}
            </p>
          </div>
        </div>

        {/* Coluna 2: Área */}
        <div className="md:col-span-3">
          <span className="md:hidden text-[10px] font-bold text-zinc-400 uppercase tracking-wider block mb-1">Área:</span>
          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium border ${
            orgao.status === 'inativo' 
              ? 'bg-zinc-100 dark:bg-zinc-800/50 text-zinc-500 border-zinc-200 dark:border-zinc-800'
              : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border-zinc-200 dark:border-zinc-700/50'
          }`}>
            {orgao.area}
          </span>
        </div>

        {/* Coluna 3: Status */}
        <div className="md:col-span-3">
          <span className="md:hidden text-[10px] font-bold text-zinc-400 uppercase tracking-wider block mb-1">Status:</span>
          <span className={`inline-flex items-center gap-1.5 text-xs font-bold ${
            orgao.status === 'ativo' ? 'text-green-600 dark:text-green-500' : 'text-zinc-500 dark:text-zinc-500'
          }`}>
            <span className={`w-2 h-2 rounded-full ${orgao.status === 'ativo' ? 'bg-green-500 animate-pulse' : 'bg-zinc-400 dark:bg-zinc-600'}`}></span> 
            {orgao.status === 'ativo' ? 'Ativo' : 'Inativo'}
          </span>
        </div>

        {/* Coluna 4: Ações */}
        <div className="md:col-span-2 flex items-center justify-end gap-2 mt-2 md:mt-0 pt-3 md:pt-0 border-t border-zinc-100 dark:border-zinc-800/50 md:border-t-0">
          <button 
            onClick={() => onToggleStatus(orgao)}
            className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg text-zinc-400 hover:text-blue-500 transition-colors cursor-pointer" 
            title={orgao.status === 'ativo' ? "Desativar órgão" : "Reativar órgão"}
          >
            {orgao.status === 'ativo' ? <Edit2 className="h-4 w-4" /> : <RotateCcw className="h-4 w-4" />}
          </button>
          <button 
            onClick={() => onDelete(orgao)}
            className="p-2 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg text-zinc-400 hover:text-red-500 transition-colors cursor-pointer" 
            title="Remover Órgão"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
