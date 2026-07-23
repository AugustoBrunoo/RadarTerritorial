import React, { useState, useEffect } from "react";
import {
  Cone,
  Droplet,
  Lightbulb,
  Bus,
  ShieldAlert,
  Sparkles,
  ChevronRight,
  AlertTriangle,
} from "lucide-react";
import { classifyIssueWithGemini } from "../../../services/geminiService";
import MacroAccordion from "./MacroAccordion";
import AiCategoryModal from "./AiCategoryModal";

/**
 * Componente responsável pela Etapa 2 do formulário (Categoria do problema).
 * Lida com a seleção de macro eixos (Infraestrutura, Saneamento, etc.)
 */
// Dados das categorias para renderização dinâmica
export const categoryMacros = [
  {
    id: "macro-1",
    title: "Infraestrutura Urbana e Vias",
    icon: Cone,
    iconColorClass: "text-zinc-500",
    options: [
      "Buraco na via",
      "Calçada danificada",
      "Árvore com risco de queda",
      "Outra situação",
    ],
  },
  {
    id: "macro-2",
    title: "Saneamento e Limpeza Pública",
    icon: Droplet,
    iconColorClass: "text-blue-500",
    options: [
      "Vazamento de água/esgoto",
      "Acúmulo de lixo/Entulho",
      "Bueiro entupido",
      "Outra situação",
    ],
  },
  {
    id: "macro-3",
    title: "Iluminação Pública e Segurança Cidadã",
    icon: Lightbulb,
    iconColorClass: "text-amber-500",
    options: ["Poste com luz apagada", "Fios caídos na rua", "Outra situação"],
  },
  {
    id: "macro-4",
    title: "Serviços de Transporte e Mobilidade Local",
    icon: Bus,
    iconColorClass: "text-purple-500",
    options: [
      "Semáforo defeituoso",
      "Ponto de ônibus danificado",
      "Outra situação",
    ],
  },
  {
    id: "macro-5",
    title: "Dinâmicas de Insegurança e Território",
    icon: ShieldAlert,
    iconColorClass: "text-red-600",
    options: ["Barricada na via", "Ocupação irregular", "Outra situação"],
  },
];

export default function CategorySection({
  activeFormSection,
  formCategory,
  setFormCategory,
  formMacroCategory,
  setFormMacroCategory,
  isCategoriaIa,
  setIsCategoriaIa,
  formDescription,
  setFormDescription,
  openAccordions,
  toggleAccordion,
  step2Ref
}) {
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const [aiStep, setAiStep] = useState(1);
  const [aiDescription, setAiDescription] = useState("");
  const [showAiError, setShowAiError] = useState(false);
  const [aiSuggestedCategory, setAiSuggestedCategory] = useState(
    "Saneamento e Limpeza Pública",
  );
  const [aiSuggestedMacro, setAiSuggestedMacro] = useState("");

  // Trava o scroll do body quando o modal estiver aberto
  useEffect(() => {
    if (isAiModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isAiModalOpen]);

  const openAiModal = () => {
    setIsAiModalOpen(true);
    setAiStep(1);
    setAiDescription("");
  };

  const processCategoryWithAI = async () => {
    if (aiStep !== 1 || !aiDescription.trim()) return;
    setAiStep(2);
    const result = await classifyIssueWithGemini(aiDescription);
    
    if (!result.macro_eixo || result.macro_eixo === "null" || result.macro_eixo === "undefined") {
      setShowAiError(true);
      setAiStep(1); // Reset back to step 1 behind the error modal
    } else {
      setAiSuggestedCategory(result.categoria_nome);
      setAiSuggestedMacro(result.macro_eixo);
      setAiStep(3);
    }
  };

  const confirmAiCategory = () => {
    setFormCategory(aiSuggestedCategory);

    // Map AI macro code to full title
    const mapMacroEixoToTitle = {
      infra: "Infraestrutura Urbana e Vias",
      saneamento: "Saneamento e Limpeza Pública",
      iluminacao: "Iluminação Pública e Segurança Cidadã",
      mobilidade: "Serviços de Transporte e Mobilidade Local",
      inseguranca: "Dinâmicas de Insegurança e Território",
    };
    const mappedTitle = mapMacroEixoToTitle[aiSuggestedMacro] || aiSuggestedMacro;

    if (setFormMacroCategory) setFormMacroCategory(mappedTitle);
    if (setIsCategoriaIa) setIsCategoriaIa(true);
    if (setFormDescription) setFormDescription(aiDescription);

    setIsAiModalOpen(false);
    setTimeout(() => {
      const step3 = document.getElementById("form-sec-3");
      if (step3) {
        step3.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 150);
  };

  const handleCategorySelect = (label, macroTitle) => {
    setFormCategory(label);
    if (setIsCategoriaIa) setIsCategoriaIa(false);
    if (macroTitle && setFormMacroCategory) {
      setFormMacroCategory(macroTitle);
    }

    setTimeout(() => {
      const step3 = document.getElementById("form-sec-3");
      if (step3) {
        step3.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 150);
  };

  return (
    <>
      {/* Bloco 2: O Quê (Acordeão de Macro Eixos) */}
      <div
        id="form-sec-2"
        ref={step2Ref}
        className={`bg-white transition-all duration-500 ${
          activeFormSection >= 2
            ? "opacity-100 pointer-events-auto"
            : "opacity-40 pointer-events-none"
        } dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 sm:p-8 shadow-sm`}
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="w-8 h-8 bg-zinc-100 dark:bg-zinc-800 rounded-full flex items-center justify-center font-bold text-zinc-500">
            2
          </div>
          <h3 className="text-xl font-bold">O que está acontecendo?</h3>
        </div>

        <div className="space-y-3">
          {categoryMacros.map((macro) => (
            <MacroAccordion
              key={macro.id}
              {...macro}
              openAccordions={openAccordions}
              toggleAccordion={toggleAccordion}
              formCategory={formCategory}
              formMacroCategory={formMacroCategory}
              handleCategorySelect={handleCategorySelect}
            />
          ))}
        </div>

        {/* === BOTÃO: CATEGORIA NÃO ENCONTRADA (IA) === */}
        <div className="mt-8 flex justify-center w-full">
          <button
            type="button"
            onClick={openAiModal}
            className="flex items-center gap-3 px-6 py-4 w-full border border-dashed border-zinc-300 dark:border-zinc-700 hover:border-red-500/50 bg-transparent hover:bg-zinc-50 dark:hover:bg-zinc-800/50 rounded-2xl text-zinc-500 dark:text-zinc-400 transition-all text-left group"
          >
            <div className="bg-zinc-100 dark:bg-zinc-800 group-hover:bg-red-50 dark:group-hover:bg-red-900/20 p-2.5 rounded-xl text-zinc-400 group-hover:text-red-500 transition-colors flex-shrink-0">
              <Sparkles className="h-5 w-5" />
            </div>
            <div className="flex-grow">
              <strong className="block text-sm text-zinc-700 dark:text-zinc-300 group-hover:text-zinc-900 dark:group-hover:text-white transition-colors">
                Não encontrou a categoria certa?
              </strong>
              <span className="text-xs text-zinc-500 block mt-0.5">
                Descreva o problema e nossa IA fará o enquadramento automático.
              </span>
            </div>
            <ChevronRight className="h-4 w-4 text-zinc-400 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>

      {/* MODAL INTELIGENTE */}
      <AiCategoryModal
        isOpen={isAiModalOpen}
        onClose={() => setIsAiModalOpen(false)}
        aiStep={aiStep}
        setAiStep={setAiStep}
        aiDescription={aiDescription}
        setAiDescription={setAiDescription}
        processCategoryWithAI={processCategoryWithAI}
        aiSuggestedCategory={aiSuggestedCategory}
        aiSuggestedMacro={aiSuggestedMacro}
        confirmAiCategory={confirmAiCategory}
      />

      {/* ERROR MODAL SOBREPOSTO */}
      {showAiError && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/70 backdrop-blur-sm px-4">
          <div className="bg-white dark:bg-zinc-900 w-full max-w-sm rounded-[2rem] p-6 border border-zinc-200 dark:border-zinc-800 shadow-2xl text-center animate-in zoom-in-95 duration-200">
            <div className="w-16 h-16 bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-900/30 rounded-full flex items-center justify-center mx-auto mb-4 text-red-600 dark:text-red-500">
              <AlertTriangle className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-bold mb-2">Relato Incompatível</h3>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-6 leading-relaxed">
              O texto informado não parece ter relação com zeladoria, infraestrutura ou problemas locais. O Radar Territorial é exclusivo para registrar ocorrências do seu bairro.
            </p>
            <div className="flex flex-col gap-3">
              <button
                onClick={() => setShowAiError(false)}
                className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-xl transition-colors shadow-lg shadow-red-600/20"
              >
                Tentar Novamente
              </button>
              <button
                onClick={() => window.location.reload()}
                className="w-full bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 font-bold py-3 rounded-xl transition-colors"
              >
                Cancelar Relato
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}