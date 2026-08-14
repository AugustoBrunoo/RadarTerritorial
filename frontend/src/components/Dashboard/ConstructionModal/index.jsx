import React, { useState, useEffect } from 'react';
import { Construction, X, AlertTriangle } from 'lucide-react';

export default function ConstructionModal() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Verificar no sessionStorage se o usuário já fechou o aviso nesta sessão
    const hasSeen = sessionStorage.getItem('dashboard_construction_warning');
    if (!hasSeen) {
      setIsOpen(true);
    }
  }, []);

  const closeModal = () => {
    sessionStorage.setItem('dashboard_construction_warning', 'true');
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[999999] flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-300 px-4 p-4">
      <div className="bg-white dark:bg-zinc-950 w-full max-w-md rounded-3xl p-6 shadow-2xl border border-zinc-200 dark:border-zinc-800 animate-in zoom-in-95 duration-300 relative">
        <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-amber-500 text-white p-4 rounded-full shadow-lg border-4 border-white dark:border-zinc-950">
          <Construction className="h-8 w-8" />
        </div>
        
        <button onClick={closeModal} className="absolute top-4 right-4 text-zinc-400 hover:text-zinc-900 dark:hover:text-white bg-zinc-100 dark:bg-zinc-900 p-2 rounded-full transition-colors">
          <X className="h-5 w-5" />
        </button>

        <div className="text-center mt-8">
          <h3 className="text-2xl font-black text-zinc-900 dark:text-white mb-2">Página em Construção</h3>
          
          <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50 rounded-xl p-4 mb-6 text-left flex gap-3">
            <AlertTriangle className="h-5 w-5 text-amber-600 dark:text-amber-500 shrink-0 mt-0.5" />
            <div className="text-sm text-amber-800 dark:text-amber-400">
              <p className="font-bold mb-1">Aviso Importante</p>
              <p>Este painel ainda está em fase de integração e testes. Os dados exibidos podem não refletir a realidade do banco de dados e <strong>você pode encontrar divergências ou instabilidades</strong> durante a navegação.</p>
              <p className="mt-2 font-medium">Por favor, não confie plenamente nesses indicadores no momento atual.</p>
            </div>
          </div>
          
          <button onClick={closeModal} className="w-full py-3.5 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 font-bold rounded-xl hover:bg-zinc-800 dark:hover:bg-zinc-100 transition-colors active:scale-95">
            Entendi, quero explorar mesmo assim
          </button>
        </div>
      </div>
    </div>
  );
}
