import React from 'react';
import { X, User, Info } from 'lucide-react';

export default function DetailModal({ isOpen, onClose, selectedReport }) {
  if (!isOpen || !selectedReport) return null;

  const shortId = selectedReport.id ? String(selectedReport.id).substring(0, 8).toUpperCase() : 'N/D';
  const locationText = [selectedReport.rua, selectedReport.bairro].filter(Boolean).join(', ') || 'Local não informado';
  const authorText = selectedReport.is_anonimo ? 'Cidadão Anônimo' : 'Cidadão';
  const displayDate = selectedReport.created_at ? new Date(selectedReport.created_at).toLocaleDateString('pt-BR') : 'Data não informada';

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
      <div className="bg-white dark:bg-zinc-900 w-full max-w-2xl rounded-[2.5rem] p-6 sm:p-8 shadow-2xl border border-zinc-200 dark:border-zinc-800 flex flex-col">
        
        <div className="flex justify-between items-start mb-6">
          <div>
            <h3 className="text-2xl font-black text-zinc-900 dark:text-white">#{shortId}</h3>
            <p className="text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-widest mt-1">Visão Detalhada</p>
          </div>
          <button onClick={onClose} className="text-zinc-400 hover:text-zinc-900 dark:hover:text-white p-2 bg-zinc-100 dark:bg-zinc-800 rounded-full transition-colors">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-zinc-50 dark:bg-zinc-950 p-4 rounded-2xl border border-zinc-200 dark:border-zinc-800">
              <span className="block text-xs font-bold text-zinc-500 mb-1 uppercase">Localização</span>
              <span className="text-sm font-medium text-zinc-900 dark:text-white">{locationText}</span>
            </div>
            <div className="bg-zinc-50 dark:bg-zinc-950 p-4 rounded-2xl border border-zinc-200 dark:border-zinc-800">
              <span className="block text-xs font-bold text-zinc-500 mb-1 uppercase">Reportado por</span>
              <span className="text-sm font-medium text-zinc-900 dark:text-white flex items-center gap-1.5"><User className="h-3.5 w-3.5 text-zinc-400" /> {authorText}</span>
            </div>
          </div>

          <div>
            <span className="block text-xs font-bold text-zinc-500 mb-2 uppercase">Descrição Original</span>
            <p className="text-base text-zinc-800 dark:text-zinc-200 leading-relaxed bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-4 rounded-2xl">
              "{selectedReport.descricao || 'Sem descrição'}"
            </p>
          </div>

          <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-100 dark:border-blue-900/30 p-4 rounded-2xl flex items-start gap-3">
            <Info className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
            <div>
              <span className="block text-xs font-bold text-blue-600 mb-1 uppercase tracking-wider">Histórico do Sistema</span>
              <ul className="text-[13px] text-zinc-600 dark:text-zinc-400 space-y-1.5 font-medium">
                <li>• Aberto via <strong className="text-zinc-800 dark:text-zinc-200">Formulário Web</strong> em {displayDate}</li>
                <li>• Apoiado por <strong className="text-zinc-800 dark:text-zinc-200">{selectedReport.apoios_count || 0}</strong> moradores da região.</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-8 flex justify-center">
          <button onClick={onClose} className="bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 px-8 py-3 rounded-xl text-sm font-bold transition-all shadow-md active:scale-95">
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
}
