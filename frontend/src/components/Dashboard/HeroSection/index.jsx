import React from 'react';
import { useNavigate } from 'react-router';
import { ArrowLeft, Megaphone, HelpCircle } from 'lucide-react';
import TooltipWrapper from '../../TooltipWrapper';

export default function HeroSection({ eixoData, notaBairro, notaProgressPct, notaColor, hasScore }) {
  const navigate = useNavigate();

  return (
    <section className="relative bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 sm:p-10 shadow-xl min-w-0 overflow-hidden">
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-red-600/5 dark:bg-red-600/10 blur-[100px] rounded-full pointer-events-none -translate-y-1/2 translate-x-1/3"></div>
      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
        <div className="max-w-3xl">
          <h2 className="text-3xl sm:text-4xl font-black text-zinc-900 dark:text-white tracking-tight mb-3">
            {eixoData.label}
          </h2>
          <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 font-medium leading-relaxed mb-6">
            {eixoData.desc}
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button onClick={() => navigate(-1)} className="inline-flex justify-center items-center gap-2 px-5 py-3 bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-200 font-bold rounded-xl transition-all shadow-sm active:scale-95 text-sm">
              <ArrowLeft className="h-4 w-4" /> Voltar
            </button>
            <button className="inline-flex justify-center items-center gap-2 px-5 py-3 bg-red-600 hover:bg-red-700 text-white font-black rounded-xl transition-all shadow-sm active:scale-95 text-sm">
              <Megaphone className="h-4 w-4" /> Reportar Novo Problema
            </button>
          </div>
        </div>

        <div className="bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 text-center shadow-inner shrink-0 w-full md:w-64 relative">
          <div className="absolute top-3 right-3">
            <TooltipWrapper text={<span><strong>Nota do Bairro:</strong> A nota apenas é calculada após o primeiro caso relatado receber alguma resposta oficial do órgão responsável ou ser resolvido.<br/><br/><strong>Cálculo:</strong> (Relatos Resolvidos ÷ Total de Relatos) × 10.</span>}>
              <HelpCircle className="h-4 w-4 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 cursor-help transition-colors" />
            </TooltipWrapper>
          </div>
          <p className="text-xs font-black uppercase tracking-widest text-zinc-500 mb-2">Nota do Bairro</p>
          
          {hasScore ? (
            <>
              <div className="flex items-center justify-center gap-2 mb-2">
                <h3 className="text-5xl font-black text-zinc-900 dark:text-white">{notaBairro}</h3>
                <span className="text-xl text-zinc-400">/10</span>
              </div>
              <div className="w-full bg-zinc-200 dark:bg-zinc-800 h-2 rounded-full overflow-hidden">
                <div className={`${notaColor} h-full rounded-full transition-all duration-1000`} style={{ width: `${notaProgressPct}%` }}></div>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center pt-2">
              <span className="text-sm font-bold text-zinc-500 dark:text-zinc-400 bg-zinc-200/50 dark:bg-zinc-800/50 px-4 py-2 rounded-xl mb-3">
                Ainda não avaliado
              </span>
              <div className="w-full bg-zinc-200 dark:bg-zinc-800 h-2 rounded-full overflow-hidden">
                <div className="bg-zinc-300 dark:bg-zinc-700 h-full rounded-full w-0"></div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
