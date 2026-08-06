import { useState } from 'react';
import { categoryMacros } from '../components/AnonymousForm/CategorySection';

export function useAiCategory({
  chatStep,
  setChatStep,
  addMessage,
  setMessages,
  setIsTyping,
  triggerSeverityStart
}) {
  const [formMacroCategory, setFormMacroCategory] = useState(null);
  const [formCategory, setFormCategory] = useState('');
  const [isAiAssisted, setIsAiAssisted] = useState(false);

  const triggerCategoryStart = () => {
    setChatStep('CATEGORY_MACRO');
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      addMessage('ai', 'Perfeito! Agora, sobre qual tema principal é o seu relato?', { type: 'category_macro_options' });
    }, 1200);
  };

  const handleCategoryMacroDecision = (macroId) => {
    setMessages(prev => prev.map(msg =>
      msg.extraData?.type === 'category_macro_options' ? { ...msg, extraData: { ...msg.extraData, hideOptions: true } } : msg
    ));

    if (macroId === 'AI_ASSISTED') {
      setIsAiAssisted(true);
      addMessage('user', '✨ Escrever e deixar a IA classificar o problema');
      
      setChatStep('CATEGORY_AI_TEXT');
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        addMessage('ai', 'Ótimo! Descreva o que está acontecendo com as suas próprias palavras. Vou analisar seu texto e classificar o problema automaticamente para você.');
      }, 1000);
    } else {
      const selectedMacro = categoryMacros.find(m => m.id === macroId);
      if (!selectedMacro) return;

      setIsAiAssisted(false);
      setFormMacroCategory(selectedMacro);
      addMessage('user', selectedMacro.title);

      setChatStep('CATEGORY_SUB');
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        addMessage('ai', `Você escolheu **${selectedMacro.title}**. Qual dessas opções descreve melhor a situação?`, { 
          type: 'category_sub_options', 
          macroId: selectedMacro.id 
        });
      }, 1000);
    }
  };

  const handleCategorySubDecision = (subOptionText) => {
    setMessages(prev => prev.map(msg =>
      msg.extraData?.type === 'category_sub_options' ? { ...msg, extraData: { ...msg.extraData, hideOptions: true } } : msg
    ));

    if (subOptionText === 'BACK') {
      addMessage('user', '⬅️ Voltar para Temas Principais');
      setFormMacroCategory(null);
      triggerCategoryStart();
      return;
    }

    setFormCategory(subOptionText);
    addMessage('user', subOptionText);

    // After sub-category is chosen, move to SEVERITY
    triggerSeverityStart();
  };

  return {
    formMacroCategory,
    formCategory,
    isAiAssisted,
    triggerCategoryStart,
    handleCategoryMacroDecision,
    handleCategorySubDecision
  };
}
