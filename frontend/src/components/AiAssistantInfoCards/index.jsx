import React from 'react';
import { Info, MessageSquare, Sparkles, ArrowRight } from 'lucide-react';

export default function AiAssistantInfoCards({ onOpenHowItWorks }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      <div className="bg-white dark:bg-zinc-900/60 border border-zinc-200/80 dark:border-zinc-800/80 rounded-3xl p-5 flex flex-col justify-between shadow-sm relative overflow-hidden group">
        <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-red-600/5 rounded-full blur-xl group-hover:bg-red-600/10 transition-colors duration-300"></div>
        <div className="relative z-10">
          <div className="flex items-center gap-2.5 mb-3 text-red-600 dark:text-red-400">
            <Info className="h-5 w-5" />
            <span className="font-extrabold text-xs uppercase tracking-wider">Como Relatar</span>
          </div>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed font-semibold">
            Diga o que aconteceu, onde fica (rua, avenida ou estrada) e use pontos de referência próximos.
          </p>
        </div>
      </div>

      <div className="bg-white dark:bg-zinc-900/60 border border-zinc-200/80 dark:border-zinc-800/80 rounded-3xl p-5 flex flex-col justify-between shadow-sm relative overflow-hidden group">
        <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-blue-600/5 rounded-full blur-xl group-hover:bg-blue-600/10 transition-colors duration-300"></div>
        <div className="relative z-10">
          <div className="flex items-center gap-2.5 mb-3 text-blue-600 dark:text-blue-400">
            <MessageSquare className="h-5 w-5" />
            <span className="font-extrabold text-xs uppercase tracking-wider">Dica da IA</span>
          </div>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed font-medium italic">
            "Aqui em Cosmos abriu um buraco na calçada perto da praça que já causou acidente há mais de 3 meses."
          </p>
        </div>
      </div>

      <div className="bg-zinc-900 dark:bg-zinc-900 border border-zinc-800 dark:border-zinc-700/80 rounded-3xl p-5 flex flex-col justify-between shadow-md relative overflow-hidden group">
        <div className="absolute top-0 right-0 -mt-8 -mr-8 w-32 h-32 bg-red-600/20 blur-2xl rounded-full"></div>
        <div className="relative z-10 flex flex-col h-full justify-between gap-4">
          <div>
            <div className="flex items-center gap-2.5 mb-2 text-red-500">
              <Sparkles className="h-5 w-5 animate-pulse" />
              <span className="font-extrabold text-xs uppercase tracking-widest text-red-400">Processamento Natural</span>
            </div>
            <h4 className="font-black text-white text-base tracking-tight leading-tight">Quer entender a nossa tecnologia?</h4>
          </div>
          <button 
            onClick={onOpenHowItWorks}
            className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-4 rounded-2xl text-xs flex items-center justify-center gap-2 transition-all transform hover:-translate-y-0.5 active:scale-95 shadow-lg shadow-red-600/20"
          >
            <span>Como Funciona o Assistente?</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
