import React, { useEffect } from "react";
import {
  PhoneCall,
  X,
  Flame,
  Ambulance,
  ShieldAlert,
  Leaf,
  UserX,
  Phone,
  Droplet,
  Zap
} from "lucide-react";

export default function UtilityModal({ isOpen, onClose }) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-zinc-900/60 dark:bg-black/80 backdrop-blur-md animate-in fade-in duration-300">
      <div className="bg-white dark:bg-zinc-900 w-full max-w-2xl rounded-[2rem] border border-zinc-200 dark:border-zinc-800 shadow-2xl overflow-hidden transform animate-in zoom-in-95 duration-300 flex flex-col max-h-[90vh]">
        
        {/* Header do Modal */}
        <div className="bg-zinc-50 dark:bg-zinc-950/40 p-5 md:p-6 border-b border-zinc-100 dark:border-zinc-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-red-600 p-2.5 rounded-xl text-white">
              <PhoneCall className="h-5 w-5 animate-pulse" />
            </div>
            <div>
              <h3 className="font-black text-lg md:text-xl text-zinc-900 dark:text-white leading-none">
                Canais de Utilidade Pública
              </h3>
              <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mt-1">
                Telefones e portais de emergência
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-zinc-200 dark:hover:bg-zinc-800 rounded-full transition-colors text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Corpo Rolável do Modal */}
        <div className="p-6 md:p-8 overflow-y-auto space-y-6 flex-1">
          
          {/* Emergência e Defesa Civil */}
          <div>
            <span className="block text-xs font-black uppercase tracking-wider text-red-600 dark:text-red-400 mb-3">
              🚨 Emergência & Socorro
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <a href="tel:193" className="flex items-center justify-between p-4 bg-zinc-50 dark:bg-zinc-950 hover:bg-zinc-100 dark:hover:bg-zinc-900 border border-zinc-200 dark:border-white/5 rounded-2xl transition-all">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-red-100 dark:bg-red-950/30 rounded-xl flex items-center justify-center text-red-600 flex-shrink-0">
                    <Flame className="h-5 w-5" />
                  </div>
                  <div className="text-left">
                    <span className="block font-bold text-sm text-zinc-900 dark:text-white">Corpo de Bombeiros</span>
                    <span className="text-[10px] text-zinc-400 font-medium">Incêndio e resgates</span>
                  </div>
                </div>
                <span className="text-sm font-black text-red-600">193</span>
              </a>

              <a href="tel:192" className="flex items-center justify-between p-4 bg-zinc-50 dark:bg-zinc-950 hover:bg-zinc-100 dark:hover:bg-zinc-900 border border-zinc-200 dark:border-white/5 rounded-2xl transition-all">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-red-100 dark:bg-red-950/30 rounded-xl flex items-center justify-center text-red-600 flex-shrink-0">
                    <Ambulance className="h-5 w-5" />
                  </div>
                  <div className="text-left">
                    <span className="block font-bold text-sm text-zinc-900 dark:text-white">SAMU</span>
                    <span className="text-[10px] text-zinc-400 font-medium">Urgências médicas</span>
                  </div>
                </div>
                <span className="text-sm font-black text-red-600">192</span>
              </a>

              <a href="tel:199" className="flex items-center justify-between p-4 bg-zinc-50 dark:bg-zinc-950 hover:bg-zinc-100 dark:hover:bg-zinc-900 border border-zinc-200 dark:border-white/5 rounded-2xl transition-all sm:col-span-2">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-amber-100 dark:bg-amber-950/30 rounded-xl flex items-center justify-center text-amber-600 flex-shrink-0">
                    <ShieldAlert className="h-5 w-5" />
                  </div>
                  <div className="text-left">
                    <span className="block font-bold text-sm text-zinc-900 dark:text-white">Defesa Civil Municipal</span>
                    <span className="text-[10px] text-zinc-400 font-medium">Alagamentos, desabamentos e vistorias</span>
                  </div>
                </div>
                <span className="text-sm font-black text-amber-600">199</span>
              </a>
            </div>
          </div>

          {/* Segurança & Meio Ambiente */}
          <div>
            <span className="block text-xs font-black uppercase tracking-wider text-zinc-400 mb-3">
              🛡️ Proteção & Meio Ambiente
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <a href="tel:03002531177" className="flex items-center justify-between p-4 bg-zinc-50 dark:bg-zinc-950 hover:bg-zinc-100 dark:hover:bg-zinc-900 border border-zinc-200 dark:border-white/5 rounded-2xl transition-all">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-100 dark:bg-green-950/30 rounded-xl flex items-center justify-center text-green-600 flex-shrink-0">
                    <Leaf className="h-5 w-5" />
                  </div>
                  <div className="text-left">
                    <span className="block font-bold text-sm text-zinc-900 dark:text-white">Linha Verde (Amb.)</span>
                    <span className="text-[10px] text-zinc-400 font-medium">Maus-tratos e desmate</span>
                  </div>
                </div>
                <Phone className="h-4 w-4 text-zinc-400" />
              </a>

              <a href="tel:22531177" className="flex items-center justify-between p-4 bg-zinc-50 dark:bg-zinc-950 hover:bg-zinc-100 dark:hover:bg-zinc-900 border border-zinc-200 dark:border-white/5 rounded-2xl transition-all">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-zinc-100 dark:bg-zinc-800 rounded-xl flex items-center justify-center text-zinc-600 dark:text-zinc-300 flex-shrink-0">
                    <UserX className="h-5 w-5" />
                  </div>
                  <div className="text-left">
                    <span className="block font-bold text-sm text-zinc-900 dark:text-white">Disque Denúncia</span>
                    <span className="text-[10px] text-zinc-400 font-medium">Segurança anônima</span>
                  </div>
                </div>
                <Phone className="h-4 w-4 text-zinc-400" />
              </a>
            </div>
          </div>

          {/* Concessionárias */}
          <div>
            <span className="block text-xs font-black uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-3">
              💧 Concessionárias Públicas (Zona Oeste)
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <a href="tel:08005002500" className="flex items-center justify-between p-4 bg-zinc-50 dark:bg-zinc-950 hover:bg-zinc-100 dark:hover:bg-zinc-900 border border-zinc-200 dark:border-white/5 rounded-2xl transition-all">
                <div className="flex items-center gap-3 font-medium">
                  <div className="w-10 h-10 bg-blue-100 dark:bg-blue-950/30 rounded-xl flex items-center justify-center text-blue-600 flex-shrink-0">
                    <Droplet className="h-5 w-5" />
                  </div>
                  <div className="text-left">
                    <span className="block font-bold text-sm text-zinc-900 dark:text-white">ZO Mais Saneamento</span>
                    <span className="text-[10px] text-zinc-400">Esgoto em C. Grande e Cosmos</span>
                  </div>
                </div>
                <Phone className="h-4 w-4 text-zinc-400" />
              </a>

              <a href="tel:08000210196" className="flex items-center justify-between p-4 bg-zinc-50 dark:bg-zinc-950 hover:bg-zinc-100 dark:hover:bg-zinc-900 border border-zinc-200 dark:border-white/5 rounded-2xl transition-all">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-amber-100 dark:bg-amber-950/30 rounded-xl flex items-center justify-center text-amber-500 flex-shrink-0">
                    <Zap className="h-5 w-5" />
                  </div>
                  <div className="text-left">
                    <span className="block font-bold text-sm text-zinc-900 dark:text-white">Light Energia</span>
                    <span className="text-[10px] text-zinc-400 font-medium">Distribuição e queda de luz</span>
                  </div>
                </div>
                <Phone className="h-4 w-4 text-zinc-400" />
              </a>
            </div>
          </div>

        </div>

        {/* Footer do Modal */}
        <div className="p-5 bg-zinc-50 dark:bg-zinc-950/60 border-t border-zinc-100 dark:border-zinc-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-3 rounded-xl font-bold text-sm bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-white hover:bg-zinc-300 dark:hover:bg-zinc-700 transition-colors"
          >
            Fechar Canais
          </button>
        </div>
      </div>
    </div>
  );
}
