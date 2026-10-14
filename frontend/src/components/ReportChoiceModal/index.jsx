import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router';
import { 
  Megaphone, 
  X, 
  UserCheck, 
  EyeOff, 
  ArrowRight, 
  ShieldCheck, 
  Sparkles, 
  AlertCircle,
  CheckCircle2
} from 'lucide-react';

export default function ReportChoiceModal({ isOpen, onClose }) {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setShow(true);
      document.body.style.overflow = 'hidden';
    } else {
      const timer = setTimeout(() => setShow(false), 250);
      document.body.style.overflow = '';
      return () => clearTimeout(timer);
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen && !show) return null;

  const handleSelect = (path) => {
    onClose();
    navigate(path);
  };

  return (
    <div
      className={`fixed inset-0 z-[110] flex items-center justify-center p-4 bg-zinc-900/60 dark:bg-black/80 backdrop-blur-md transition-opacity duration-300 ${
        isOpen ? 'opacity-100' : 'opacity-0'
      }`}
      onClick={onClose}
    >
      <div
        className={`bg-white dark:bg-zinc-950 w-full max-w-2xl rounded-3xl sm:rounded-[2.5rem] border border-zinc-200 dark:border-zinc-800 shadow-2xl overflow-hidden flex flex-col max-h-[90vh] transition-all duration-300 transform ${
          isOpen ? 'scale-100 translate-y-0 opacity-100' : 'scale-95 translate-y-4 opacity-0'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Cabeçalho do Modal */}
        <div className="p-5 sm:p-6 border-b border-zinc-100 dark:border-zinc-800/80 flex justify-between items-center bg-zinc-50/70 dark:bg-zinc-900/40 shrink-0">
          <div className="flex items-center gap-3">
            <div className="bg-red-600 p-2.5 rounded-2xl text-white shadow-md shadow-red-600/20">
              <Megaphone className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-black text-lg sm:text-xl text-zinc-900 dark:text-white leading-tight">
                Como você deseja relatar?
              </h3>
              <p className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 mt-0.5">
                Escolha o formato ideal para este relato
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-zinc-200 dark:hover:bg-zinc-800 rounded-full transition-colors text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 cursor-pointer"
            aria-label="Fechar"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Corpo com os dois cards principais */}
        <div className="p-5 sm:p-7 overflow-y-auto space-y-4 flex-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* CARD 1: RELATO COM A CONTA (IDENTIFICADO) */}
            <div
              onClick={() => handleSelect('/reportar-logado')}
              className="group cursor-pointer bg-white dark:bg-zinc-900 border-2 border-zinc-200 dark:border-zinc-800 hover:border-red-600 dark:hover:border-red-600 rounded-3xl p-5 sm:p-6 flex flex-col justify-between transition-all duration-200 hover:shadow-xl hover:shadow-red-600/5 hover:-translate-y-0.5 relative overflow-hidden"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-red-50 dark:bg-red-950/40 border border-red-100 dark:border-red-900/40 flex items-center justify-center text-red-600 dark:text-red-400 group-hover:scale-105 transition-transform">
                    <UserCheck className="h-6 w-6" />
                  </div>
                  <span className="text-[11px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-full bg-red-100/70 dark:bg-red-950/60 text-red-700 dark:text-red-300">
                    Minha Conta
                  </span>
                </div>

                <h4 className="text-lg font-black text-zinc-900 dark:text-white mb-2 leading-snug group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors">
                  Usar Minha Conta
                </h4>
                <p className="text-xs sm:text-[13px] text-zinc-500 dark:text-zinc-400 leading-relaxed font-medium mb-4">
                  O relato ficará vinculado ao seu perfil e você terá total visibilidade sobre as resoluções.
                </p>

                <div className="space-y-2 mb-5 pt-3 border-t border-zinc-100 dark:border-zinc-800">
                  <div className="flex items-center gap-2 text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                    <CheckCircle2 className="h-3.5 w-3.5 text-green-600 dark:text-green-500 shrink-0" />
                    <span>Aparece em "Minhas Demandas"</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                    <CheckCircle2 className="h-3.5 w-3.5 text-green-600 dark:text-green-500 shrink-0" />
                    <span>Atualizações em tempo real</span>
                  </div>
                </div>
              </div>

              <button
                type="button"
                className="w-full py-3 px-4 rounded-xl font-bold text-xs sm:text-sm bg-red-600 group-hover:bg-red-700 text-white flex items-center justify-center gap-2 transition-all shadow-md shadow-red-600/20"
              >
                <span>Relatar com Conta</span>
                <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>

            {/* CARD 2: RELATO ANÔNIMO (100% SIGILOSO) */}
            <div
              onClick={() => handleSelect('/reportar/anonimo')}
              className="group cursor-pointer bg-white dark:bg-zinc-900 border-2 border-zinc-200 dark:border-zinc-800 hover:border-zinc-400 dark:hover:border-zinc-600 rounded-3xl p-5 sm:p-6 flex flex-col justify-between transition-all duration-200 hover:shadow-xl hover:-translate-y-0.5 relative overflow-hidden"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 flex items-center justify-center text-zinc-700 dark:text-zinc-300 group-hover:scale-105 transition-transform">
                    <EyeOff className="h-6 w-6" />
                  </div>
                  <span className="text-[11px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300">
                    100% Sigiloso
                  </span>
                </div>

                <h4 className="text-lg font-black text-zinc-900 dark:text-white mb-2 leading-snug group-hover:text-zinc-900 dark:group-hover:text-white transition-colors">
                  Relato Anônimo
                </h4>
                <p className="text-xs sm:text-[13px] text-zinc-500 dark:text-zinc-400 leading-relaxed font-medium mb-4">
                  Nenhum dado pessoal é coletado ou exibido. Ideal para questões delicadas ou segurança pública.
                </p>

                {/* Aviso explicativo obrigatório solicitado */}
                <div className="p-3 rounded-2xl bg-amber-50/80 dark:bg-amber-950/30 border border-amber-200/80 dark:border-amber-900/50 mb-5">
                  <div className="flex items-start gap-2 text-[11px] font-semibold text-amber-800 dark:text-amber-300 leading-tight">
                    <AlertCircle className="h-4 w-4 shrink-0 text-amber-600 dark:text-amber-400 mt-0.5" />
                    <span>
                      Este relato <strong>não aparecerá</strong> nas suas demandas salvas para garantir seu anonimato absoluto.
                    </span>
                  </div>
                </div>
              </div>

              <button
                type="button"
                className="w-full py-3 px-4 rounded-xl font-bold text-xs sm:text-sm bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 hover:bg-zinc-800 dark:hover:bg-white flex items-center justify-center gap-2 transition-all shadow-md"
              >
                <span>Relatar Anonimamente</span>
                <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>

          </div>

          {/* Dica do Assistente IA no Rodapé */}
          <div className="pt-2">
            <button
              type="button"
              onClick={() => handleSelect('/assistente-ia')}
              className="w-full text-left p-3.5 sm:p-4 rounded-2xl bg-zinc-50 hover:bg-zinc-100 dark:bg-zinc-900/60 dark:hover:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex items-center justify-between gap-3 transition-colors cursor-pointer group"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-red-100 dark:bg-red-950/50 text-red-600 dark:text-red-400">
                  <Sparkles className="h-4 w-4" />
                </div>
                <div>
                  <span className="text-xs sm:text-sm font-bold text-zinc-900 dark:text-white block">
                    Prefere uma conversa guiada?
                  </span>
                  <span className="text-[11px] text-zinc-500 dark:text-zinc-400 font-medium block">
                    Use o Assistente de Inteligência Artificial para formatar seu relato em segundos.
                  </span>
                </div>
              </div>
              <ArrowRight className="h-4 w-4 text-zinc-400 group-hover:text-red-600 dark:group-hover:text-red-400 group-hover:translate-x-0.5 transition-all shrink-0" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
