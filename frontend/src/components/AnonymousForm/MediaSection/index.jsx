import React, { useState } from "react";
import { Send, ShieldAlert } from "lucide-react";
import ReviewModal from "./ReviewModal";
import { validateDescriptionContent } from "../../../utils/contentModerator";

/**
 * Componente responsável pela Etapa 4 do formulário (Detalhes e Envio).
 * Lida com texto de descrição extra, envio de mídias (fotos/vídeos) e finalização.
 */
export default function MediaSection({ 
  activeFormSection, 
  formLocation, 
  formCategory, 
  formSeverity,
  formDescription,
  setFormDescription,
  formMacroCategory,
  isCategoriaIa
}) {
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [moderationError, setModerationError] = useState(null);

  const handleReviewClick = () => {
    if (formDescription && formDescription.trim().length > 0) {
      const modResult = validateDescriptionContent(formDescription);
      
      if (!modResult.is_aprovado) {
        setModerationError(modResult.motivo_rejeicao);
        return;
      }
    }
    setIsReviewModalOpen(true);
  };

  return (
    <>
      {/* Bloco 4: Finalizar (Aparece após Bloco 3) */}
      <div
        id="form-sec-4"
        className={`bg-white transition-all duration-500 ${activeFormSection >= 4 ? "opacity-100 pointer-events-auto" : "opacity-40 pointer-events-none"} dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 sm:p-8 shadow-sm`}
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="w-8 h-8 bg-zinc-100 dark:bg-zinc-800 rounded-full flex items-center justify-center font-bold text-zinc-500">
            4
          </div>
          <h3 className="text-xl font-bold">Detalhes & Envio</h3>
        </div>

        <div className="space-y-6">
          <div>
            <label
              htmlFor="input-desc"
              className="block text-sm font-semibold text-zinc-600 dark:text-zinc-400 mb-2"
            >
              Descreva livremente (Opcional)
            </label>
            <textarea
              id="input-desc"
              rows="3"
              value={formDescription}
              onChange={(e) => setFormDescription(e.target.value)}
              placeholder="Ex: O buraco já está quase engolindo a calçada e idosos têm dificuldade de passar..."
              className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-3.5 text-zinc-900 dark:text-white focus:ring-2 focus:ring-red-500 outline-none transition-all resize-none"
            ></textarea>
          </div>

          <div className="pt-2">
            <button
              id="btn-review"
              type="button"
              onClick={handleReviewClick}
              className="w-full py-4 rounded-xl font-black text-lg transition-all flex justify-center items-center gap-2 bg-red-600 hover:bg-red-700 text-white hover:-translate-y-1 shadow-lg shadow-red-600/30"
            >
              <Send className="h-5 w-5" /> Revisar Relato Seguro
            </button>
          </div>
        </div>
      </div>

      <ReviewModal
        isOpen={isReviewModalOpen}
        onClose={() => setIsReviewModalOpen(false)}
        formLocation={formLocation}
        formCategory={formCategory}
        formSeverity={formSeverity}
        formDescription={formDescription}
        formMacroCategory={formMacroCategory}
        isCategoriaIa={isCategoriaIa}
      />

      {/* ERROR MODAL DE MODERAÇÃO */}
      {moderationError && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/70 backdrop-blur-sm px-4">
          <div className="bg-white dark:bg-zinc-900 w-full max-w-sm rounded-[2rem] p-6 border border-zinc-200 dark:border-zinc-800 shadow-2xl text-center animate-in zoom-in-95 duration-200">
            <div className="w-16 h-16 bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-900/30 rounded-full flex items-center justify-center mx-auto mb-4 text-red-600 dark:text-red-500">
              <ShieldAlert className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-bold mb-2">Atenção com as palavras</h3>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-6 leading-relaxed">
              Nosso sistema identificou que a sua descrição pode conter <b>palavras de baixo calão, ofensas ou discurso inadequado</b>. <br/><br/>
              Motivo: <i>{moderationError}</i><br/><br/>
              O Radar Territorial é um espaço seguro e construtivo. Por favor, ajuste o seu texto para prosseguir.
            </p>
            <div className="flex flex-col gap-3">
              <button
                onClick={() => setModerationError(null)}
                className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-xl transition-colors shadow-lg shadow-red-600/20"
              >
                Ajustar Descrição
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}