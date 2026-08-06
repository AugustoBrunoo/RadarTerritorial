import { useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { enviarOcorrencia } from '../services/relatoService';

export function useAiReview({ 
  setChatStep, 
  setIsTyping, 
  addMessage, 
  setMessages,
  formLocation,
  formMacroCategory,
  formCategory,
  isAiAssisted,
  formSeverity,
  formDescription,
  userEmail
}) {

  const formatBairro = (bairroSlug) => {
    if (!bairroSlug) return null;
    const map = {
      "campo-grande": "Campo Grande",
      inhoaiba: "Inhoaíba",
      cosmos: "Cosmos",
    };
    return map[bairroSlug] || bairroSlug;
  };
  const handleReviewDecision = async (choice) => {
    setMessages(prev => prev.map(msg =>
      msg.extraData?.type === 'review_options' ? { ...msg, extraData: { ...msg.extraData, hideOptions: true } } : msg
    ));

    if (choice === 'PUBLISH') {
      addMessage('user', '✅ Confirmar e Publicar');
      setChatStep('PUBLISH_START');
      setIsTyping(true);
      
      addMessage('ai', 'Tudo certo! Publicando seu relato... 🚀', { type: 'publishing_progress' });
      
      const isAnonymousFlow = !userEmail;
      const macroTitle = typeof formMacroCategory === 'string' ? formMacroCategory : formMacroCategory?.title || "Categoria Adicional";

      const payloadSupabase = {
        tipo_loc: formLocation?.gps ? "gps" : "manual",
        bairro: formatBairro(formLocation?.bairro),
        cep: formLocation?.cep || null,
        rua: formLocation?.rua || null,
        referencia: formLocation?.numero_referencia && formLocation.numero_referencia !== 'Sem número / Apenas a rua' ? formLocation.numero_referencia : null,
        is_sn: formLocation?.numero_referencia === 'Sem número / Apenas a rua' || false,
        latitude: formLocation?.lat ? parseFloat(formLocation.lat) : null,
        longitude: formLocation?.lon ? parseFloat(formLocation.lon) : null,
        macro_eixo: macroTitle, 
        categoria_nome: formCategory || null,
        is_categoria_ia: isAiAssisted || false,
        urgencias: Array.isArray(formSeverity) ? formSeverity : [],
        descricao: formDescription || null,
        imagem_url: null,
      };

      console.log("=== ENVIANDO PARA O SUPABASE (AI ASSISTANT) ===");
      console.log("Form Location Original:", formLocation);
      console.log("Payload:", JSON.stringify(payloadSupabase, null, 2));

      const response = await enviarOcorrencia(payloadSupabase, isAnonymousFlow);
      setIsTyping(false);

      // Hide the publishing progress
      setMessages(prev => prev.map(msg =>
        msg.extraData?.type === 'publishing_progress' ? { ...msg, extraData: { ...msg.extraData, hideOptions: true } } : msg
      ));

      if (response.success) {
        addMessage('ai', '🎉 **Relato Publicado com Sucesso!**\n\nMuito obrigado por contribuir com o Radar Territorial. Seu relato já está disponível no mapa público.\n\nO que você deseja fazer agora?', { type: 'success_options', reportId: response.data?.[0]?.id });
      } else {
        addMessage('ai', '❌ Ocorreu um erro ao publicar seu relato: ' + response.error);
        addMessage('ai', 'Por favor, tente novamente.', { type: 'review_options' });
      }

    } else if (choice === 'EDIT') {
      addMessage('user', '✏️ Ajustar algo no relato');
      setChatStep('REVIEW_EDIT');
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        addMessage('ai', 'O que você gostaria de alterar?', { type: 'review_edit_options' });
      }, 800);
    }
  };

  const handleReviewEditDecision = (field) => {
    setMessages(prev => prev.map(msg =>
      msg.extraData?.type === 'review_edit_options' ? { ...msg, extraData: { ...msg.extraData, hideOptions: true } } : msg
    ));

    if (field === 'ENDERECO') {
      addMessage('user', '📍 Endereço');
      // Jump back to location flow
      setChatStep('INPUT_LOCATION_MANUAL');
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        addMessage('ai', 'Vamos alterar o endereço. Digite novamente o CEP ou o nome da rua:');
      }, 800);
    } else if (field === 'CATEGORIA') {
      addMessage('user', '🗂️ Tema Principal (Macro-eixo)');
      // Jump back to category flow
      setChatStep('CATEGORY_MACRO');
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        addMessage('ai', 'Selecione o novo tema principal do seu relato:', { type: 'category_macro_options' });
      }, 800);
    } else if (field === 'SEVERIDADE') {
      addMessage('user', '⚠️ Severidade');
      // Jump back to severity flow
      setChatStep('SEVERITY_START');
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        addMessage('ai', 'Selecione a nova severidade do seu relato:', { type: 'severity_options' });
      }, 800);
    } else if (field === 'DESCRICAO') {
      addMessage('user', '📝 Descrição');
      // Jump back to description flow
      setChatStep('DESCRIPTION_START');
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        addMessage('ai', 'Digite a nova descrição do seu relato:');
      }, 800);
    }
  };

  const handleSuccessDecision = (choice) => {
    setMessages(prev => prev.map(msg =>
      msg.extraData?.type === 'success_options' ? { ...msg, extraData: { ...msg.extraData, hideOptions: true } } : msg
    ));

    if (choice === 'HOME') {
      addMessage('user', '🏠 Voltar para o início');
      window.location.href = '/';
    } else if (choice === 'NEW_REPORT') {
      addMessage('user', '📝 Fazer mais um relato');
      window.location.reload();
    }
  };

  return {
    handleReviewDecision,
    handleReviewEditDecision,
    handleSuccessDecision
  };
}
