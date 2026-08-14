import React from 'react';
import { DownloadCloud, X, FileSpreadsheet, Printer } from 'lucide-react';

export default function ExportModal({ 
  isExportModalOpen, setIsExportModalOpen, 
  executeExportCSV, executeExportPDF 
}) {
  if (!isExportModalOpen) return null;

  return (
    <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-300 px-4">
      <div className="bg-white dark:bg-zinc-950 w-full max-w-md rounded-3xl p-6 shadow-2xl border border-zinc-200 dark:border-zinc-800 animate-in zoom-in-95 duration-300">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-black text-zinc-900 dark:text-white flex items-center gap-2">
            <DownloadCloud className="h-5 w-5 text-red-500" /> Exportar Dados
          </h3>
          <button onClick={() => setIsExportModalOpen(false)} className="text-zinc-500 hover:text-zinc-900 dark:hover:text-white bg-zinc-100 dark:bg-zinc-900 p-2 rounded-full transition-colors">
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="space-y-4">
          <button onClick={executeExportCSV} className="w-full flex items-center gap-4 p-4 rounded-2xl border border-zinc-200 dark:border-zinc-800 hover:border-blue-500 dark:hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all text-left group">
            <div className="bg-blue-100 dark:bg-blue-500/20 p-3 rounded-xl group-hover:scale-110 transition-transform">
              <FileSpreadsheet className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <strong className="block text-zinc-900 dark:text-white text-base">Planilha de Dados (.CSV)</strong>
              <span className="text-xs text-zinc-500 block mt-0.5">Tabela bruta ideal para Excel e análise.</span>
            </div>
          </button>
          <button onClick={executeExportPDF} className="w-full flex items-center gap-4 p-4 rounded-2xl border border-zinc-200 dark:border-zinc-800 hover:border-red-500 dark:hover:border-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all text-left group">
            <div className="bg-red-100 dark:bg-red-500/20 p-3 rounded-xl group-hover:scale-110 transition-transform">
              <Printer className="h-6 w-6 text-red-600 dark:text-red-400" />
            </div>
            <div>
              <strong className="block text-zinc-900 dark:text-white text-base">Relatório Visual (Gerar PDF)</strong>
              <span className="text-xs text-zinc-500 block mt-0.5">Documento formato A4 dinâmico da aba atual.</span>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
