import { useState } from 'react';

export function useAiSeverity({ setChatStep, setIsTyping, addMessage, setMessages, triggerDescriptionStart }) {
  const [formSeverity, setFormSeverity] = useState([]);

  const triggerSeverityStart = () => {
    setChatStep('SEVERITY_SELECTION');
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      addMessage('ai', 'Qual o nível de urgência desse problema? Você pode escolher mais de uma opção (Opcional):', { type: 'severity_options' });
    }, 1000);
  };

  const handleSeverityToggle = (value) => {
    setFormSeverity((prev) => {
      const isArr = Array.isArray(prev) ? prev : [];
      if (value === "nenhum") {
        return isArr.includes("nenhum") ? [] : ["nenhum"];
      } else {
        const withoutNenhum = isArr.filter((v) => v !== "nenhum");
        return withoutNenhum.includes(value)
          ? withoutNenhum.filter((v) => v !== value)
          : [...withoutNenhum, value];
      }
    });
  };

  const confirmSeverity = () => {
    // Hide options
    setMessages(prev => prev.map(msg =>
      msg.extraData?.type === 'severity_options' ? { ...msg, extraData: { ...msg.extraData, hideOptions: true } } : msg
    ));

    let userText = "Não informou severidade";
    if (formSeverity.length > 0 && !formSeverity.includes("nenhum")) {
      userText = formSeverity.map(s => {
        if (s === 'recente') return 'Recente';
        if (s === 'abandono') return 'Abandonado';
        if (s === 'urgente') return 'Urgente';
        if (s === 'grave') return 'Grave / Risco';
        return s;
      }).join(', ');
    } else if (formSeverity.includes("nenhum")) {
      userText = "Prefiro não informar";
    }
    
    addMessage('user', userText);

    // Transition to Description
    triggerDescriptionStart();
  };

  return {
    formSeverity,
    triggerSeverityStart,
    handleSeverityToggle,
    confirmSeverity
  };
}
