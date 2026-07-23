import React, { useState, useEffect } from "react";
import {
  Eye,
  X,
  ShieldCheck,
  MapPin,
  CheckCircle,
  UploadCloud,
  Home,
  ArrowRight,
} from "lucide-react";
import { categoryMacros } from "../../CategorySection";

export default function ReviewModal({
  isOpen,
  onClose,
  formLocation,
  formCategory,
  formSeverity,
  formDescription,
  formMacroCategory,
  isCategoriaIa,
}) {
  const [modalState, setModalState] = useState("REVIEW"); // "REVIEW" | "SUCCESS"
  const [isTurnstileChecking, setIsTurnstileChecking] = useState(false);
  const [isTurnstileChecked, setIsTurnstileChecked] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      // Reset state on open
      setModalState("REVIEW");
      setIsTurnstileChecking(false);
      setIsTurnstileChecked(false);
      setIsPublishing(false);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const simulateTurnstileCheck = () => {
    if (isTurnstileChecked || isTurnstileChecking) return;
    setIsTurnstileChecking(true);
    setTimeout(() => {
      setIsTurnstileChecking(false);
      setIsTurnstileChecked(true);
    }, 1500);
  };

  const formatBairro = (bairroSlug) => {
    if (!bairroSlug) return null;
    const map = {
      "campo-grande": "Campo Grande",
      inhoaiba: "Inhoaíba",
      cosmos: "Cosmos",
    };
    return map[bairroSlug] || bairroSlug;
  };

  const getMacroTitle = () => {
    if (formMacroCategory) return formMacroCategory;
    if (!formCategory) return "";
    const macro = categoryMacros.find((m) => m.options.includes(formCategory));
    return macro ? macro.title : "Categoria Adicional";
  };

  const handleFinalizeReport = () => {
    const payloadSupabase = {
      user_id: null,
      is_anonimo: true,
      tipo_loc: formLocation?.gps ? "gps" : "manual",
      bairro: formatBairro(formLocation?.bairro),
      cep: formLocation?.cep || null,
      rua: formLocation?.rua || null,
      referencia: formLocation?.ref || null,
      is_sn: formLocation?.sn || false,
      latitude: formLocation?.lat || null,
      longitude: formLocation?.lng || null,
      macro_eixo: getMacroTitle(), // Agora mapeado corretamente
      categoria_nome: formCategory || null,
      is_categoria_ia: isCategoriaIa || false,
      urgencias: Array.isArray(formSeverity) ? formSeverity : [],
      descricao: formDescription || null,
      imagem_url: null,
    };

    console.log(
      "Payload pronto para o Supabase:",
      JSON.stringify(payloadSupabase, null, 2),
    );
  };

  const finalPublish = () => {
    if (!isTurnstileChecked || isPublishing) return;
    setIsPublishing(true);

    // Dispara a função que monta e loga o payload
    handleFinalizeReport();

    setTimeout(() => {
      setIsPublishing(false);
      setModalState("SUCCESS");
    }, 2000);
  };

  if (!isOpen) return null;

  const locationString = `${formLocation?.rua || "Endereço não informado"}${
    formLocation?.ref ? ", " + formLocation.ref : ""
  } - ${formatBairro(formLocation?.bairro) || "Bairro não informado"}`;

  const currentDate = new Date();
  const timeString = currentDate.toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
  });
  const dateString = currentDate.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  const renderUrgencyTags = () => {
    const tags = [];
    const macroTitle = getMacroTitle();

    if (macroTitle) {
      tags.push(
        <span
          key="macro"
          className="bg-zinc-800 text-white dark:bg-zinc-200 dark:text-zinc-900 px-2.5 py-1 rounded-md text-xs font-black uppercase tracking-wider"
        >
          {macroTitle}
        </span>,
      );
    }

    if (formCategory) {
      tags.push(
        <span
          key="cat"
          className="bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 px-2.5 py-1 rounded-md text-xs font-bold uppercase tracking-wider"
        >
          {formCategory}
        </span>,
      );
    }
    if (
      Array.isArray(formSeverity) &&
      formSeverity.length > 0 &&
      !formSeverity.includes("nenhum")
    ) {
      const colorMap = {
        recente:
          "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 border border-blue-200 dark:border-blue-800/50",
        abandono:
          "bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 border border-purple-200 dark:border-purple-800/50",
        urgente:
          "bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-800/50",
        grave:
          "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 border border-red-200 dark:border-red-800/50",
      };
      const labelMap = {
        recente: "Problema Recente",
        abandono: "Muito tempo abandonado",
        urgente: "Urgente",
        grave: "Risco Iminente",
      };
      formSeverity.forEach((s) => {
        if (labelMap[s]) {
          tags.push(
            <span
              key={s}
              className={`px-2.5 py-1 rounded-md text-xs font-bold uppercase tracking-wider ${colorMap[s]}`}
            >
              {labelMap[s]}
            </span>,
          );
        }
      });
    }
    return tags;
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-zinc-900/60 dark:bg-black/80 backdrop-blur-md animate-in fade-in duration-300">
      <div className="bg-white dark:bg-zinc-900 w-full max-w-md md:max-w-xl rounded-[2rem] border border-zinc-200 dark:border-zinc-800 shadow-2xl overflow-hidden transform animate-in zoom-in-95 duration-300 flex flex-col max-h-[90vh]">
        {modalState === "REVIEW" && (
          <div className="flex flex-col w-full h-full">
            {/* Header */}
            <div className="bg-zinc-100 dark:bg-zinc-800/80 p-4 md:p-5 border-b border-zinc-200 dark:border-zinc-700 flex items-center justify-between">
              <h3 className="font-black text-lg md:text-xl text-zinc-800 dark:text-white flex items-center gap-2">
                <Eye className="h-5 w-5 text-red-600" /> Revise seu Relato
              </h3>
              <button
                onClick={onClose}
                className="p-2 hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded-full transition-colors"
              >
                <X className="h-5 w-5 text-zinc-500" />
              </button>
            </div>

            {/* Body */}
            <div className="p-6 md:p-8 overflow-y-auto flex-1">
              <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400 mb-6 pb-4 border-b border-zinc-100 dark:border-zinc-800/50">
                É assim que o seu relato aparecerá no painel público para a
                vizinhança. Por favor, verifique se os dados estão corretos
                antes de publicar.
              </p>

              {/* Cabeçalho do Post */}
              <div className="flex items-center gap-3 mb-5 md:mb-6">
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-zinc-100 dark:bg-zinc-800 border-2 border-red-100 dark:border-red-900/30 flex items-center justify-center flex-shrink-0">
                  <ShieldCheck className="h-6 w-6 md:h-7 md:w-7 text-red-600" />
                </div>
                <div>
                  <h4 className="font-bold text-zinc-900 dark:text-white leading-tight md:text-lg">
                    Cidadão Anônimo
                  </h4>
                  <p className="text-xs md:text-sm font-semibold text-zinc-500 dark:text-zinc-400 mt-0.5 flex items-center gap-1">
                    <MapPin className="h-3 w-3 md:h-4 md:w-4" />
                    <span className="truncate max-w-[200px] md:max-w-[300px]">
                      {locationString}
                    </span>
                  </p>
                </div>
                <div className="ml-auto flex flex-col items-end gap-1">
                  <div className="text-[10px] md:text-xs font-black text-red-600 uppercase tracking-widest bg-red-50 dark:bg-red-900/20 px-2.5 py-1 rounded-md border border-red-100 dark:border-red-900/50">
                    {timeString}
                  </div>
                  <div className="text-[10px] md:text-xs font-semibold text-zinc-400 dark:text-zinc-500 capitalize">
                    {dateString}
                  </div>
                </div>
              </div>

              {/* Conteúdo do Post */}
              <div className="pl-2 border-l-2 border-zinc-100 dark:border-zinc-800 mb-4 md:mb-6 ml-5 md:ml-6">
                <div className="ml-4 md:ml-5 space-y-3 md:space-y-4">
                  <div className="flex flex-wrap gap-2 md:gap-3">
                    {renderUrgencyTags()}
                  </div>
                  <div className="bg-zinc-50 dark:bg-zinc-950/50 p-4 md:p-5 rounded-2xl rounded-tl-sm border border-zinc-100 dark:border-zinc-800 relative">
                    <p className="text-zinc-700 dark:text-zinc-300 text-sm md:text-base leading-relaxed font-medium">
                      {formDescription ||
                        "Nenhum detalhe adicional fornecido pelo morador."}
                    </p>
                  </div>
                </div>
              </div>

              {/* Simulação Cloudflare Turnstile */}
              <div className="mt-8 border-t border-zinc-200 dark:border-zinc-800 pt-6">
                <div
                  onClick={simulateTurnstileCheck}
                  className="cursor-pointer max-w-[300px] bg-[#fdfdfd] dark:bg-[#222222] border border-[#e0e0e0] dark:border-[#333333] rounded-lg p-3 flex items-center justify-between shadow-sm transition-colors hover:bg-zinc-50 dark:hover:bg-zinc-800 mx-auto sm:mx-0"
                >
                  <div className="flex items-center gap-3">
                    {isTurnstileChecking ? (
                      <div className="w-6 h-6 border-2 border-[#e0e0e0] border-t-zinc-400 rounded-full animate-spin"></div>
                    ) : isTurnstileChecked ? (
                      <CheckCircle className="h-6 w-6 text-green-500" />
                    ) : (
                      <div className="w-6 h-6 border-2 border-zinc-300 dark:border-zinc-600 rounded bg-white dark:bg-zinc-900 transition-colors"></div>
                    )}
                    <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300 select-none">
                      Verifique se você é humano
                    </span>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-[10px] text-zinc-400 font-bold tracking-tight">
                      Cloudflare
                    </span>
                    <span className="text-[9px] text-zinc-400">
                      Privacidade - Termos
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer / Submit Button */}
            <div className="p-4 md:p-6 bg-zinc-50 dark:bg-zinc-950 border-t border-zinc-100 dark:border-zinc-800 flex flex-col items-center gap-3">
              <button
                onClick={finalPublish}
                disabled={!isTurnstileChecked || isPublishing}
                className={`w-full py-4 rounded-xl font-bold text-sm md:text-base transition-all flex items-center justify-center gap-2 ${
                  isTurnstileChecked && !isPublishing
                    ? "bg-red-600 hover:bg-red-700 text-white shadow-lg shadow-red-600/30 hover:-translate-y-0.5"
                    : "bg-zinc-200 dark:bg-zinc-800 text-zinc-400 cursor-not-allowed"
                }`}
              >
                {isPublishing ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                ) : (
                  <>
                    <UploadCloud className="h-5 w-5" /> Publicar Relato
                    Publicamente
                  </>
                )}
              </button>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">
                Após publicar, por ser anônimo, não será possível editar ou
                apagar o relato.
              </p>
            </div>
          </div>
        )}

        {modalState === "SUCCESS" && (
          <div className="flex flex-col items-center justify-center p-8 md:p-12 text-center h-full min-h-[400px]">
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 flex flex-col items-center">
              <div className="w-24 h-24 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mb-6 shadow-[0_0_40px_rgba(34,197,94,0.3)]">
                <CheckCircle className="h-12 w-12 text-green-600" />
              </div>
              <h3 className="text-2xl md:text-3xl font-black text-zinc-900 dark:text-white tracking-tight mb-3">
                Relato postado com sucesso!
              </h3>
              <p className="text-zinc-500 dark:text-zinc-400 mb-8 max-w-sm">
                Obrigado por ajudar a sua vizinhança. O seu relato já foi
                processado de forma anônima e publicado no portal de demandas
                comunitárias.
              </p>

              <div className="w-full flex flex-col sm:flex-row gap-3">
                <a
                  href="/"
                  className="flex-1 py-3.5 rounded-xl font-bold text-sm bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-white hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors flex items-center justify-center gap-2"
                >
                  <Home className="h-4 w-4" /> Voltar ao Início
                </a>
                <a
                  href="#"
                  className="flex-1 py-3.5 rounded-xl font-bold text-sm bg-red-600 hover:bg-red-700 text-white transition-all flex items-center justify-center gap-2 shadow-lg shadow-red-600/30"
                >
                  Ver Relato Publicado <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
