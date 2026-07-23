import React from "react";
import { Sparkles, Cpu, CheckCircle, X } from "lucide-react";

/**
 * Modal Inteligente para Enquadramento Automático (IA).
 */
export default function AiCategoryModal({
  isOpen,
  onClose,
  aiStep,
  aiDescription,
  setAiDescription,
  processCategoryWithAI,
  aiSuggestedCategory,
  confirmAiCategory,
  aiSuggestedMacro,
  setAiStep,
}) {
  const mapMacroEixoToTitle = {
    infra: "Infraestrutura Urbana e Vias",
    saneamento: "Saneamento e Limpeza Pública",
    iluminacao: "Iluminação Pública e Segurança Cidadã",
    mobilidade: "Serviços de Transporte e Mobilidade Local",
    inseguranca: "Dinâmicas de Insegurança e Território",
  };
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-md px-4">
      <div className="bg-white dark:bg-zinc-900 w-full max-w-lg rounded-[2.5rem] p-6 sm:p-8 border border-zinc-200 dark:border-zinc-800 shadow-2xl relative text-zinc-900 dark:text-white animate-in zoom-in-95 duration-300">
        {/* Botão Fechar */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 bg-zinc-100 dark:bg-zinc-800 p-2 rounded-full transition-colors focus:outline-none"
        >
          <X className="h-4 w-4" />
        </button>

        {/* ETAPA 1: Escrever o Relato */}
        {aiStep === 1 && (
          <div className="block">
            <div className="w-12 h-12 bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-900/30 rounded-xl flex items-center justify-center mb-6 text-red-600 dark:text-red-500">
              <Sparkles className="h-6 w-6" />
            </div>
            <h3 className="text-2xl font-black mb-2 tracking-tight">
              Análise Inteligente
            </h3>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-6">
              Explique brevemente o que está acontecendo. Nossa inteligência
              artificial tentará identificar o setor responsável.
            </p>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-2">
                  O que precisa de reparo?
                </label>
                <textarea
                  rows="4"
                  placeholder="Ex: Tem um bueiro sem tampa aqui na calçada que está perigoso para os pedestres caírem à noite..."
                  value={aiDescription}
                  onChange={(e) => setAiDescription(e.target.value)}
                  className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl px-4 py-3 text-sm text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-red-500 transition-colors resize-none"
                ></textarea>
              </div>
              <button
                onClick={processCategoryWithAI}
                disabled={!aiDescription.trim()}
                className="w-full bg-red-600 hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-red-600/20 hover:-translate-y-0.5"
              >
                Analisar Ocorrência
              </button>
            </div>
          </div>
        )}

        {/* ETAPA 2: Processamento / Loading */}
        {aiStep === 2 && (
          <div className="text-center py-8">
            <div className="relative w-16 h-16 mx-auto mb-6 flex items-center justify-center">
              <div className="absolute inset-0 border-4 border-zinc-100 dark:border-zinc-800 rounded-full"></div>
              <div className="absolute inset-0 border-4 border-t-red-600 rounded-full animate-spin"></div>
              <Cpu className="h-6 w-6 text-red-500 animate-pulse" />
            </div>
            <h4 className="text-xl font-bold mb-2">
              Processando Linguagem Natural...
            </h4>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 max-w-xs mx-auto">
              A IA está interpretando o seu texto para encontrar
              correspondência com as forças públicas locais.
            </p>
          </div>
        )}

        {/* ETAPA 3: Resultado / Sugestão Cadastrada */}
        {aiStep === 3 && (
          <div className="text-center py-4">
            <div className="w-16 h-16 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-900/30 rounded-full flex items-center justify-center mx-auto mb-6 text-emerald-600 dark:text-emerald-400">
              <CheckCircle className="h-8 w-8" />
            </div>
            <h3 className="text-2xl font-black mb-2 tracking-tight">
              Ocorrência Enquadrada!
            </h3>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-6 leading-relaxed">
              Com base na descrição, identificamos o problema e aplicamos a
              categoria automática:
            </p>

            <div className="bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 p-4 rounded-2xl text-left mb-8 space-y-4">
              <div>
                <span className="text-[10px] font-bold uppercase text-red-600 dark:text-red-500 tracking-wider block mb-1">
                  Macro Eixo Principal
                </span>
                <strong className="text-sm text-zinc-900 dark:text-white block">
                  {mapMacroEixoToTitle[aiSuggestedMacro] || aiSuggestedMacro}
                </strong>
              </div>
              
              <div className="h-px bg-zinc-200 dark:bg-zinc-800 w-full"></div>
              
              <div>
                <span className="text-[10px] font-bold uppercase text-red-600 dark:text-red-500 tracking-wider block mb-1">
                  Setor / Categoria Específica
                </span>
                <strong className="text-base text-zinc-900 dark:text-white block">
                  {aiSuggestedCategory}
                </strong>
              </div>
            </div>

            <button
              onClick={confirmAiCategory}
              className="w-full bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 font-bold py-4 rounded-xl transition-all hover:scale-105"
            >
              Confirmar e Seguir
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
