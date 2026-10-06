import React, { useEffect, useState } from 'react';
import { Beaker, AlertTriangle, Bug, X, ChevronRight } from 'lucide-react';

export default function AiAssistantBetaModal({ isOpen, onClose }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setShow(true);
      document.body.style.overflow = 'hidden';
    } else {
      setTimeout(() => setShow(false), 300);
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen && !show) return null;

  return (
    <div className={`fixed inset-0 z-[110] flex items-center justify-center p-4 bg-zinc-900/60 dark:bg-black/80 backdrop-blur-md transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}>
      <div className={`bg-white dark:bg-zinc-950 w-full max-w-2xl rounded-3xl sm:rounded-[2.5rem] border border-zinc-200 dark:border-zinc-800 shadow-2xl overflow-hidden transition-transform duration-300 transform ${isOpen ? 'scale-100 translate-y-0' : 'scale-95 translate-y-8'} flex flex-col`}>
        
        {/* Header */}
        <div className="p-4 sm:p-6 border-b border-zinc-100 dark:border-zinc-800/80 flex justify-between items-center bg-zinc-50 dark:bg-zinc-900/40 shrink-0">
          <div className="flex items-center gap-3">
            <div className="bg-amber-100 dark:bg-amber-900/30 p-2 rounded-xl text-amber-600 dark:text-amber-400">
              <Beaker className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-black text-lg sm:text-xl text-zinc-900 dark:text-white leading-none">Assistente Beta (v2.0.0)</h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-zinc-200 dark:hover:bg-zinc-800 rounded-full transition-colors text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Body (Cards) */}
        <div className="p-4 sm:p-6 flex-1 overflow-y-auto bg-white dark:bg-zinc-950">
          <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 font-medium mb-6">
            Nossa Inteligência Artificial está em constante aprendizado. Antes de começarmos, é importante que você saiba de algumas coisas:
          </p>

          <div className="flex flex-col gap-3 sm:gap-4">
            
            {/* Card 1 */}
            <div className="bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-4 flex gap-4 items-start">
              <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-xl text-blue-600 dark:text-blue-400 shrink-0 mt-1 sm:mt-0">
                <Beaker className="h-5 w-5 sm:h-6 sm:w-6" />
              </div>
              <div>
                <h4 className="font-extrabold text-sm sm:text-base text-zinc-900 dark:text-zinc-100 mb-1">Fase Experimental</h4>
                <p className="text-[13px] sm:text-sm text-zinc-600 dark:text-zinc-400 font-medium leading-relaxed">
                  O assistente foi projetado para facilitar a criação do seu relato de zeladoria, porém a tecnologia ainda está sendo testada e aprimorada com o seu uso real.
                </p>
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-4 flex gap-4 items-start">
              <div className="bg-amber-100 dark:bg-amber-900/30 p-3 rounded-xl text-amber-600 dark:text-amber-400 shrink-0 mt-1 sm:mt-0">
                <AlertTriangle className="h-5 w-5 sm:h-6 sm:w-6" />
              </div>
              <div>
                <h4 className="font-extrabold text-sm sm:text-base text-zinc-900 dark:text-zinc-100 mb-1">Possíveis Inconsistências</h4>
                <p className="text-[13px] sm:text-sm text-zinc-600 dark:text-zinc-400 font-medium leading-relaxed">
                  A IA pode, ocasionalmente, interpretar mal algumas informações, apresentar respostas imprecisas ou perder o contexto durante etapas mais longas da conversa.
                </p>
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-4 flex gap-4 items-start">
              <div className="bg-red-100 dark:bg-red-900/30 p-3 rounded-xl text-red-600 dark:text-red-400 shrink-0 mt-1 sm:mt-0">
                <Bug className="h-5 w-5 sm:h-6 sm:w-6" />
              </div>
              <div>
                <h4 className="font-extrabold text-sm sm:text-base text-zinc-900 dark:text-zinc-100 mb-1">Revisão é Fundamental</h4>
                <p className="text-[13px] sm:text-sm text-zinc-600 dark:text-zinc-400 font-medium leading-relaxed">
                  Por favor, leia atentamente as informações que a IA organizar antes de submeter o relato final. Ajude-nos a reportar eventuais bugs ou travamentos no sistema.
                </p>
              </div>
            </div>

          </div>

          <div className="mt-6 flex justify-end">
            <button
              onClick={onClose}
              className="w-full sm:w-auto bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 font-extrabold text-sm py-3.5 px-6 rounded-xl transition-all hover:scale-105 active:scale-95 flex justify-center items-center gap-2 shadow-lg shadow-zinc-900/20 dark:shadow-white/10"
            >
              <span>Estou ciente, continuar</span>
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
