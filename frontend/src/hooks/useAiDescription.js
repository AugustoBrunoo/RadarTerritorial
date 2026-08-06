import { useState } from 'react';
import { validateDescriptionContent } from '../utils/contentModerator';

export function useAiDescription({ setChatStep, setIsTyping, addMessage }) {
  const [formDescription, setFormDescription] = useState('');

  const triggerDescriptionStart = () => {
    setChatStep('DESCRIPTION_START');
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      addMessage('ai', 'Entendi. Agora, descreva livremente o que está acontecendo (Opcional):', { type: 'description_options' });
    }, 1000);
  };

  const processDescriptionInput = (text) => {
    if (!text.trim()) return;

    // Moderação de Conteúdo
    const modResult = validateDescriptionContent(text);
    if (!modResult.is_aprovado) {
      addMessage('ai', 'Atenção com as palavras', { 
        type: 'moderation_error', 
        errorText: modResult.motivo_rejeicao 
      });
      return;
    }

    setFormDescription(text);
    addMessage('user', text);
    
    proceedToReview();
  };

  const skipDescription = () => {
    addMessage('user', 'Pular detalhamento');
    proceedToReview();
  };

  const proceedToReview = () => {
    setChatStep('REVIEW_START');
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      addMessage('ai', 'Tudo certo! Antes de enviarmos, quer revisar o resumo do seu relato?', { type: 'review_options' });
    }, 1000);
  };

  return {
    formDescription,
    triggerDescriptionStart,
    processDescriptionInput,
    skipDescription
  };
}
