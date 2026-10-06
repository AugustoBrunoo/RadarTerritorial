import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { MapPin, Circle, CheckCircle2 } from 'lucide-react';
import AiAssistantHowItWorksModal from '../../components/AiAssistantHowItWorksModal';
import AiAssistantBetaModal from '../../components/AiAssistantBetaModal';
import AiAssistantChatMessages from '../../components/AiAssistantChatMessages';
import AiAssistantInputBar from '../../components/AiAssistantInputBar';
import SimpleHeader from '../../components/SimpleHeader';

import { useAiChat } from '../../hooks/useAiChat';
import { useAiAuth } from '../../hooks/useAiAuth';
import { useAiLocation } from '../../hooks/useAiLocation';
import { useAiCategory } from '../../hooks/useAiCategory';
import { useAiSeverity } from '../../hooks/useAiSeverity';
import { useAiDescription } from '../../hooks/useAiDescription';
import { useAiReview } from '../../hooks/useAiReview';
import { useAuth } from '../../hooks/useAuth';

export default function AiAssistant() {
  const { user, profile, loading: authLoading } = useAuth();
  const [isHowModalOpen, setIsHowModalOpen] = useState(false);
  const [isBetaModalOpen, setIsBetaModalOpen] = useState(false);

  useEffect(() => {
    const hasSeenBetaModal = localStorage.getItem('seenAiBetaModal');
    if (!hasSeenBetaModal) {
      setIsBetaModalOpen(true);
      localStorage.setItem('seenAiBetaModal', 'true');
    }
  }, []);

  // 1. Chat State Hook
  const {
    messages,
    setMessages,
    addMessage,
    chatStep,
    setChatStep,
    isTyping,
    setIsTyping,
    inputValue,
    setInputValue,
    inputType,
    setInputType,
    togglePasswordVisibility,
    chatViewportRef,
  } = useAiChat([]);

  // 1.1 Description Logic Hook
  const {
    formDescription,
    triggerDescriptionStart,
    processDescriptionInput,
    skipDescription
  } = useAiDescription({
    setChatStep,
    setIsTyping,
    addMessage
  });

  // 1.2 Severity Logic Hook
  const {
    formSeverity,
    triggerSeverityStart,
    handleSeverityToggle,
    confirmSeverity
  } = useAiSeverity({
    setChatStep,
    setIsTyping,
    addMessage,
    setMessages,
    triggerDescriptionStart
  });

  // 1.5 Category Logic Hook
  const {
    formMacroCategory,
    formCategory,
    isAiAssisted,
    triggerCategoryStart,
    handleCategoryMacroDecision,
    handleCategorySubDecision
  } = useAiCategory({
    chatStep,
    setChatStep,
    addMessage,
    setMessages,
    setIsTyping,
    triggerSeverityStart
  });

  // 2. Location Logic Hook
  const {
    collectedData,
    suggestions,
    isSearching,
    showSuggestions,
    triggerLocationStart,
    handleLocationDecision,
    handleLocationConfirmDecision,
    selectSuggestion,
    handleLocationReviewDecision,
    handleLocationKeepRefDecision,
    handleLocationEditDecision,
    handleNumberDecision
  } = useAiLocation({
    chatStep,
    setChatStep,
    addMessage,
    setMessages,
    setIsTyping,
    inputValue,
    setInputValue,
    triggerCategoryStart
  });

  // 3. Auth Logic Hook
  const {
    userName,
    userEmail,
    registerPassword,
    termsAccepted,
    setTermsAccepted,
    isResendDisabled,
    processEmailInput,
    processPasswordInput,
    processRegisterNameInput,
    processRegisterEmailInput,
    processRegisterPasswordInput,
    processRegisterConfirmPasswordInput,
    handleRegisterConfirmDecision,
    handleRegisterTermsDecision,
    handleRegisterSuccessDecision,
    handleRegisterErrorDecision
  } = useAiAuth({
    chatStep,
    setChatStep,
    setIsTyping,
    addMessage,
    setInputType,
    setMessages,
    triggerLocationStart
  });

  // 4. Review Logic Hook
  const {
    handleReviewDecision,
    handleReviewEditDecision,
    handleSuccessDecision
  } = useAiReview({
    setChatStep,
    setIsTyping,
    addMessage,
    setMessages,
    formLocation: collectedData,
    formMacroCategory,
    formCategory,
    isAiAssisted,
    formSeverity,
    formDescription,
    userEmail
  });

  useEffect(() => {
    if (messages.length === 0) {
      setIsTyping(true);
    }
    
    if (authLoading) return;

    if (messages.length === 0) {
      // Delay natural para não piscar a tela e parecer mais fluido
      const timeoutId = setTimeout(() => {
        setIsTyping(false);
        if (user) {
          setChatStep('LOCATION_START');
          const fullName = profile?.nome_completo || user.user_metadata?.username || 'Cidadão';
          const firstName = fullName.split(' ')[0];
          
          setMessages([
            {
              id: Date.now(),
              sender: 'ai',
              text: `Olá, **${firstName}**! Tudo bem? Já identifiquei que você está conectado. Para começarmos o seu relato, preciso saber onde aconteceu o problema.`,
              extraData: { type: 'location_start_options' },
              timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            }
          ]);
        } else {
          setChatStep('START');
          setMessages([
            {
              id: Date.now(),
              sender: 'ai',
              text: 'Olá! Sou o assistente do Radar Territorial. Para começarmos, como você prefere prosseguir o relato?',
              extraData: { type: 'start_options' },
              timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            }
          ]);
        }
      }, 600);

      return () => clearTimeout(timeoutId);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authLoading, user, profile]);

  const handleStartDecision = (choice) => {
    setMessages(prev => prev.map(msg =>
      msg.extraData?.type === 'start_options' ? { ...msg, extraData: { ...msg.extraData, hideOptions: true } } : msg
    ));

    if (choice === 'ANONYMOUS') {
      addMessage('user', 'Enviar como Anônimo');
      setChatStep('ANONYMOUS_DISCLAIMER');

      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        addMessage('ai', null, { type: 'anonymous_disclaimer' });
      }, 1000);
    } else if (choice === 'LOGIN') {
      addMessage('user', '🔑 Já tenho conta / Fazer Login');
      setChatStep('LOGIN_EMAIL');

      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        addMessage('ai', 'Ótimo! Para vincular este relato à sua conta e permitir que você receba atualizações sobre a resolução, por favor **digite o seu e-mail cadastrado**:');
      }, 1000);
    } else if (choice === 'REGISTER') {
      addMessage('user', '✨ Criar nova conta');
      setChatStep('REGISTER_NAME');

      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        addMessage('ai', 'Ótimo! Para criar sua conta, como você gostaria de ser chamado?');
      }, 1000);
    }
  };

  const handleDisclaimerDecision = (agreed) => {
    setMessages(prev => prev.map(msg =>
      msg.extraData?.type === 'anonymous_disclaimer' ? { ...msg, extraData: { ...msg.extraData, hideOptions: true } } : msg
    ));

    if (agreed) {
      addMessage('user', 'Concordo e Quero Continuar');
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        addMessage('ai', 'Opção anônima confirmada com sucesso! ✨');
        triggerLocationStart();
      }, 1000);
    } else {
      addMessage('user', 'Não Concordo');
      setChatStep('ANONYMOUS_DECLINED');
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        addMessage('ai', 'Sem problemas! Respeitamos sua decisão. Como a navegação do assistente requer o aceite dessas diretrizes para o modo anônimo, encerraremos por aqui.', { type: 'anonymous_declined' });
      }, 1000);
    }
  };

  const isInputEnabled = ['LOGIN_EMAIL', 'LOGIN_PASSWORD', 'INPUT_LOCATION_MANUAL', 'INPUT_NUMBER_REF', 'REGISTER_NAME', 'REGISTER_EMAIL', 'REGISTER_PASSWORD', 'REGISTER_CONFIRM_PASSWORD', 'CATEGORY_AI_TEXT', 'DESCRIPTION_START'].includes(chatStep);
  const showPasswordToggle = ['LOGIN_PASSWORD', 'REGISTER_PASSWORD', 'REGISTER_CONFIRM_PASSWORD'].includes(chatStep);

  let placeholderText = "Aguarde as opções...";
  if (['LOGIN_EMAIL', 'REGISTER_EMAIL'].includes(chatStep)) placeholderText = "Digite seu e-mail...";
  else if (showPasswordToggle) placeholderText = "Digite sua senha...";
  else if (chatStep === 'REGISTER_NAME') placeholderText = "Digite seu nome...";
  else if (chatStep === 'INPUT_LOCATION_MANUAL') placeholderText = "Ex: 23070220 ou Estrada do Campinho...";
  else if (chatStep === 'INPUT_NUMBER_REF') placeholderText = "Ex: Nº 486 ou Em frente à praça...";
  else if (chatStep === 'CATEGORY_AI_TEXT' || chatStep === 'DESCRIPTION_START') placeholderText = "Descreva o problema em detalhes...";
  else if (chatStep === 'ANONYMOUS_DECLINED') placeholderText = "Sessão encerrada.";
  else if (chatStep === 'LOCATION_PAUSED') placeholderText = "Fluxo de localização concluído.";

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') sendUserMessage();
  };

  const sendUserMessage = () => {
    const text = inputValue.trim();
    if (!text || !isInputEnabled) return;

    if (chatStep === 'INPUT_LOCATION_MANUAL') return;

    setInputValue('');

    if (chatStep === 'LOGIN_PASSWORD') {
      addMessage('user', '••••••••');
      processPasswordInput(text);
    } else if (chatStep === 'LOGIN_EMAIL') {
      addMessage('user', text);
      processEmailInput(text);
    } else if (chatStep === 'REGISTER_NAME') {
      addMessage('user', text);
      processRegisterNameInput(text);
    } else if (chatStep === 'REGISTER_EMAIL') {
      addMessage('user', text);
      processRegisterEmailInput(text);
    } else if (chatStep === 'REGISTER_PASSWORD') {
      addMessage('user', '••••••••');
      processRegisterPasswordInput(text);
    } else if (chatStep === 'REGISTER_CONFIRM_PASSWORD') {
      addMessage('user', '••••••••');
      processRegisterConfirmPasswordInput(text);
    } else if (chatStep === 'INPUT_NUMBER_REF') {
      handleNumberDecision(text);
    } else if (chatStep === 'CATEGORY_AI_TEXT') {
      addMessage('user', text);
      setInputValue('');
      triggerDescriptionStart();
    } else if (chatStep === 'DESCRIPTION_START') {
      processDescriptionInput(text);
    }
  };

  const renderPasswordStrengthWidget = () => {
    if (!['REGISTER_PASSWORD', 'REGISTER_CONFIRM_PASSWORD'].includes(chatStep)) return null;

    const currentPass = chatStep === 'REGISTER_PASSWORD' ? inputValue : registerPassword;
    const confirmPass = chatStep === 'REGISTER_CONFIRM_PASSWORD' ? inputValue : '';

    const checks = {
      length: currentPass.length >= 8,
      upper: /[A-Z]/.test(currentPass),
      number: /[0-9]/.test(currentPass),
      symbol: /[!@#$%^&*(),.?":{}|<>]/.test(currentPass),
      match: chatStep === 'REGISTER_CONFIRM_PASSWORD' ? currentPass === confirmPass && confirmPass.length > 0 : false
    };

    const requirements = [
      { id: 'length', text: 'Mínimo 8 caracteres', pass: checks.length },
      { id: 'upper', text: 'Letra maiúscula', pass: checks.upper },
      { id: 'number', text: 'Um número', pass: checks.number },
      { id: 'symbol', text: 'Símbolo (!@#)', pass: checks.symbol },
      { id: 'match', text: 'Senhas conferem', pass: checks.match, dimInFirstStep: chatStep === 'REGISTER_PASSWORD' }
    ];

    return (
      <div className="mx-4 mb-4 p-4 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-sm animate-in fade-in slide-in-from-bottom-2">
        <h4 className="text-sm font-bold text-zinc-800 dark:text-zinc-100 mb-2">Força da senha</h4>
        <div className="h-px w-full bg-zinc-100 dark:bg-zinc-800 mb-3" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {requirements.map(req => (
            <div key={req.id} className={`flex items-center gap-2 text-sm transition-all duration-300 ${req.pass ? 'text-green-600 dark:text-green-500 font-semibold' : (req.dimInFirstStep ? 'text-zinc-300 dark:text-zinc-700' : 'text-zinc-500 dark:text-zinc-400')}`}>
              {req.pass ? <CheckCircle2 className="h-4 w-4 scale-110 transition-transform" /> : <Circle className="h-4 w-4" />}
              <span>{req.text}</span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const isSubmitDisabled = () => {
    if (chatStep === 'REGISTER_PASSWORD') {
      return !(inputValue.length >= 8 && /[A-Z]/.test(inputValue) && /[0-9]/.test(inputValue) && /[!@#$%^&*(),.?":{}|<>]/.test(inputValue));
    }
    if (chatStep === 'REGISTER_CONFIRM_PASSWORD') {
      return inputValue !== registerPassword || inputValue.length === 0;
    }
    return false;
  };

  return (
    <div className="h-screen overflow-hidden bg-white dark:bg-zinc-950 flex flex-col font-sans">
      <SimpleHeader backLink={-1} />

      <main className="flex-1 min-h-0 w-full max-w-5xl mx-auto flex flex-col px-2 sm:px-6 lg:px-8 pb-2 sm:pb-4 pt-20 sm:pt-28 animate-in slide-in-from-bottom-4 duration-500">

        <div className="flex flex-col flex-1 relative min-h-0 w-full">
          <AiAssistantChatMessages
            messages={messages}
            isTyping={isTyping}
            chatStep={chatStep}
            handleStartDecision={handleStartDecision}
            handleDisclaimerDecision={handleDisclaimerDecision}
            handleLocationDecision={handleLocationDecision}
            handleLocationConfirmDecision={handleLocationConfirmDecision}
            handleNumberDecision={handleNumberDecision}
            handleLocationReviewDecision={handleLocationReviewDecision}
            handleLocationEditDecision={handleLocationEditDecision}
            handleLocationKeepRefDecision={handleLocationKeepRefDecision}
            handleRegisterErrorDecision={handleRegisterErrorDecision}
            handleRegisterSuccessDecision={handleRegisterSuccessDecision}
            handleRegisterConfirmDecision={handleRegisterConfirmDecision}
            handleRegisterTermsDecision={handleRegisterTermsDecision}
            handleCategoryMacroDecision={handleCategoryMacroDecision}
            handleCategorySubDecision={handleCategorySubDecision}
            formLocation={collectedData}
            formMacroCategory={formMacroCategory}
            formCategory={formCategory}
            formSeverity={formSeverity}
            formDescription={formDescription}
            handleSeverityToggle={handleSeverityToggle}
            confirmSeverity={confirmSeverity}
            skipDescription={skipDescription}
            handleReviewDecision={handleReviewDecision}
            handleReviewEditDecision={handleReviewEditDecision}
            handleSuccessDecision={handleSuccessDecision}
            userName={userName}
            termsAccepted={termsAccepted}
            setTermsAccepted={setTermsAccepted}
            isResendDisabled={isResendDisabled}
            chatViewportRef={chatViewportRef}
          />

          {renderPasswordStrengthWidget()}

          <AiAssistantInputBar
            inputType={inputType}
            inputValue={inputValue}
            setInputValue={setInputValue}
            handleKeyPress={handleKeyPress}
            isInputEnabled={isInputEnabled}
            placeholderText={placeholderText}
            showPasswordToggle={showPasswordToggle}
            togglePasswordVisibility={togglePasswordVisibility}
            sendUserMessage={sendUserMessage}
            showSuggestions={showSuggestions}
            chatStep={chatStep}
            isSearching={isSearching}
            suggestions={suggestions}
            selectSuggestion={selectSuggestion}
            isSubmitDisabled={isSubmitDisabled()}
            onOpenHowItWorks={() => setIsHowModalOpen(true)}
          />

          <div className="text-center pb-2">
            <p className="text-[10px] sm:text-xs text-zinc-400 dark:text-zinc-500 font-medium px-4">
              A Inteligência Artificial do Radar Territorial está em fase Beta (v2.0.0) e pode apresentar erros ou inconsistências.
            </p>
          </div>
        </div>
      </main>

      <AiAssistantHowItWorksModal isOpen={isHowModalOpen} onClose={() => setIsHowModalOpen(false)} />
      <AiAssistantBetaModal isOpen={isBetaModalOpen} onClose={() => setIsBetaModalOpen(false)} />
    </div>
  );
}
