import React from 'react';
import { Edit3, X, CheckCircle2 } from 'lucide-react';

export default function ResponseModal({ isOpen, onClose, selectedReport, handleUpdateTicket }) {
  if (!isOpen || !selectedReport) return null;

  const shortId = selectedReport.id ? String(selectedReport.id).substring(0, 8).toUpperCase() : 'N/D';
  const locationText = [selectedReport.rua, selectedReport.bairro].filter(Boolean).join(', ') || 'Local não informado';
  const authorText = selectedReport.is_anonimo ? 'Cidadão Anônimo' : 'Cidadão';
  const displayDate = selectedReport.created_at ? new Date(selectedReport.created_at).toLocaleDateString('pt-BR') : 'Data não informada';

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
      <div className="bg-white dark:bg-zinc-900 w-full max-w-3xl rounded-[2.5rem] p-6 sm:p-8 shadow-2xl border border-zinc-200 dark:border-zinc-800 flex flex-col max-h-[90vh]">
        
        <div className="flex justify-between items-start mb-6 border-b border-zinc-100 dark:border-zinc-800 pb-5">
          <div>
            <h3 className="text-xl font-black text-zinc-900 dark:text-white flex items-center gap-2">
              <Edit3 className="h-5 w-5 text-blue-500" /> Atualização Operacional
            </h3>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1 font-medium">Você está gerenciando o ticket <span className="font-black text-zinc-900 dark:text-white">#{shortId}</span></p>
          </div>
          <button onClick={onClose} className="text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="overflow-y-auto [&::-webkit-scrollbar]:hidden pr-2 flex-grow space-y-6">
          <div className="bg-zinc-50 dark:bg-zinc-950/50 rounded-2xl p-5 border border-zinc-200 dark:border-zinc-800 flex flex-col sm:flex-row gap-5">
            <div className="flex-grow">
              <h4 className="text-sm font-bold text-zinc-900 dark:text-white mb-2">Descrição do Cidadão:</h4>
              <p className="text-sm text-zinc-700 dark:text-zinc-300 italic border-l-2 border-zinc-300 dark:border-zinc-700 pl-3 leading-relaxed">
                "{selectedReport.descricao || 'Sem descrição'}"
              </p>
            </div>
            <div className="sm:w-1/3 shrink-0 flex flex-col gap-2 border-t sm:border-t-0 sm:border-l border-zinc-200 dark:border-zinc-800 pt-3 sm:pt-0 sm:pl-5">
              <div className="text-xs"><span className="font-bold text-zinc-500">Autor:</span> <span className="font-medium text-zinc-900 dark:text-white block">{authorText}</span></div>
              <div className="text-xs"><span className="font-bold text-zinc-500">Local:</span> <span className="font-medium text-zinc-900 dark:text-white block">{locationText}</span></div>
              <div className="text-xs"><span className="font-bold text-zinc-500">Data Abertura:</span> <span className="font-medium text-zinc-900 dark:text-white block">{displayDate}</span></div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-bold text-zinc-700 dark:text-zinc-300 mb-2">Mudar Status Operacional</label>
              <select defaultValue={selectedReport.status} className="w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-3.5 text-sm font-bold text-zinc-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none shadow-sm transition-all hover:border-blue-400">
                <option value="em_analise">Em Análise (Triagem Técnica)</option>
                <option value="em_execucao">Em Execução (Equipe Despachada)</option>
                <option value="resolvido">Resolvido / Concluído</option>
                <option value="rejeitado">Rejeitado / Improcedente</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-bold text-zinc-700 dark:text-zinc-300 mb-2">Atribuir Equipe (Opcional)</label>
              <select className="w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-3.5 text-sm font-medium text-zinc-700 dark:text-zinc-300 focus:ring-2 focus:ring-blue-500 outline-none shadow-sm transition-all">
                <option value="">Não atribuir agora</option>
                <option value="eq1">Equipe Alpha (Vias Públicas)</option>
                <option value="eq2">Equipe Beta (Poda e Árvores)</option>
                <option value="eq3">Equipe Gamma (Remoção de Entulho)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-zinc-700 dark:text-zinc-300 mb-2 flex items-center justify-between">
              <span>Mensagem Oficial ao Cidadão</span>
              <span className="text-[10px] font-bold uppercase tracking-wider text-green-600 bg-green-50 dark:bg-green-900/20 px-2 py-0.5 rounded border border-green-200 dark:border-green-900/50">Visível no Feed</span>
            </label>
            <textarea rows="4" placeholder="Ex: Informamos que a equipe foi despachada ao local e o problema será resolvido em até 48h..." className="w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-3 text-sm text-zinc-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none resize-none shadow-sm transition-all placeholder-zinc-400 font-medium"></textarea>
            <div className="mt-2 flex gap-2">
              <button className="text-xs bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 px-3 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-700 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors">Usar template: Em Rota</button>
              <button className="text-xs bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 px-3 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-700 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors">Usar template: Concluído</button>
            </div>
          </div>
        </div>

        <div className="mt-6 pt-5 border-t border-zinc-100 dark:border-zinc-800 flex justify-end gap-3 shrink-0">
          <button onClick={onClose} className="px-5 py-2.5 rounded-xl text-sm font-bold text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors border border-transparent">Cancelar</button>
          <button onClick={handleUpdateTicket} className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl text-sm font-bold flex items-center justify-center gap-2 shadow-md shadow-blue-600/20 transition-all transform active:scale-95">
            <CheckCircle2 className="h-4 w-4" /> Atualizar Ticket
          </button>
        </div>
      </div>
    </div>
  );
}
