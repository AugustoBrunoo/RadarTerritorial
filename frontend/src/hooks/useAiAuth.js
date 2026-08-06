import { useState } from 'react';
import { supabase } from '../lib/supabaseClient';

export function useAiAuth({ 
  chatStep, 
  setChatStep, 
  setIsTyping, 
  addMessage, 
  setInputType, 
  setMessages,
  triggerLocationStart
}) {
  const [userEmail, setUserEmail] = useState('');
  const [userName, setUserName] = useState('');
  const [registerName, setRegisterName] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [isResendDisabled, setIsResendDisabled] = useState(false);

  const processEmailInput = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      addMessage('ai', 'Por favor, digite um e-mail válido (ex: seuemail@dominio.com).');
      return;
    }

    setUserEmail(email);
    setChatStep('LOGIN_PASSWORD');
    setInputType('password');

    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      addMessage('ai', 'E-mail informado! Agora, **digite a sua senha** de acesso:');
    }, 800);
  };

  const processPasswordInput = async (password) => {
    setChatStep('AUTH_CHECKING');
    setInputType('text'); // reset for future inputs
    setIsTyping(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: userEmail,
        password: password,
      });

      setIsTyping(false);

      if (error) {
        addMessage('ai', 'Ops! E-mail ou senha incorretos. Por favor, tente novamente.\n\n**Digite novamente o seu e-mail cadastrado:**');
        setChatStep('LOGIN_EMAIL');
        setUserEmail('');
      } else {
        const fullName = data.user?.user_metadata?.nome_completo || data.user?.email || "Morador";
        const firstName = fullName.split(' ')[0].split('@')[0];
        setUserName(fullName);

        addMessage('ai', `Olá, ${firstName}! Que bom ter você aqui. Autenticação realizada com sucesso! 🎉`);
        triggerLocationStart();
      }
    } catch (err) {
      setIsTyping(false);
      addMessage('ai', 'Ocorreu um erro inesperado ao conectar. Tente novamente.');
      setChatStep('LOGIN_EMAIL');
      setUserEmail('');
    }
  };

  const processRegisterNameInput = (name) => {
    setRegisterName(name);
    setChatStep('REGISTER_EMAIL');
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      addMessage('ai', `Prazer, ${name}! Agora, digite o e-mail que deseja usar no seu cadastro:`);
    }, 800);
  };

  const processRegisterEmailInput = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      addMessage('ai', 'Por favor, digite um e-mail válido (ex: seuemail@dominio.com).');
      return;
    }
    setRegisterEmail(email);
    setChatStep('REGISTER_PASSWORD');
    setInputType('password');
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      addMessage('ai', 'Perfeito! Escolha uma senha segura (mínimo de 8 caracteres):');
    }, 800);
  };

  const processRegisterPasswordInput = (password) => {
    setRegisterPassword(password);
    setChatStep('REGISTER_CONFIRM_PASSWORD');
    setInputType('password');
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      addMessage('ai', 'Por favor, confirme a sua senha digitando-a novamente:', { type: 'register_confirm_options' });
    }, 800);
  };

  const handleRegisterConfirmDecision = (choice) => {
    if (choice === 'BACK') {
      setMessages(prev => prev.map(msg =>
        msg.extraData?.type === 'register_confirm_options' ? { ...msg, extraData: { ...msg.extraData, hideOptions: true } } : msg
      ));
      addMessage('user', '⬅️ Esqueci a senha / Voltar');
      setRegisterPassword('');
      setChatStep('REGISTER_PASSWORD');
      setInputType('password');
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        addMessage('ai', 'Tudo bem! Digite a nova senha desejada:');
      }, 800);
    }
  };

  const processRegisterConfirmPasswordInput = () => {
    setChatStep('REGISTER_TERMS');
    setInputType('text'); // reset
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      addMessage('ai', 'Para finalizar o seu cadastro no Radar Territorial, precisamos que você leia e concorde com os nossos termos de uso.', { type: 'register_terms_options' });
    }, 1000);
  };

  const handleRegisterTermsDecision = async () => {
    setMessages(prev => prev.map(msg =>
      msg.extraData?.type === 'register_terms_options' ? { ...msg, extraData: { ...msg.extraData, hideOptions: true } } : msg
    ));
    addMessage('user', '✨ Concordar e Criar Minha Conta');
    setChatStep('REGISTER_CHECKING');
    setIsTyping(true);

    try {
      const { error } = await supabase.auth.signUp({
        email: registerEmail,
        password: registerPassword,
        options: {
          data: { full_name: registerName }
        }
      });

      setIsTyping(false);

      if (error) {
        addMessage('ai', `Não foi possível criar a conta: ${error.message}`, { type: 'register_error_options' });
      } else {
        const fullName = registerName || "Morador";
        const firstName = fullName.split(' ')[0];
        setUserName(fullName);
        setChatStep('REGISTER_SUCCESS_WAITING');
        addMessage('ai', `Conta criada com sucesso, **${firstName}**! ✉️ Enviamos um link de confirmação para o e-mail **${registerEmail}**. Por favor, acesse sua caixa de entrada para ativar sua conta.`, { type: 'register_success_options', registerEmail });
      }
    } catch (err) {
      setIsTyping(false);
      addMessage('ai', 'Ocorreu um erro inesperado ao cadastrar. Tente novamente.', { type: 'register_error_options' });
    }
  };

  const handleRegisterSuccessDecision = async (choice, emailToLogin) => {
    if (choice === 'LOGIN') {
      setMessages(prev => prev.map(msg =>
        msg.extraData?.type === 'register_success_options' ? { ...msg, extraData: { ...msg.extraData, hideOptions: true } } : msg
      ));
      addMessage('user', '🔑 Já confirmei meu e-mail / Fazer Login');
      setUserEmail(emailToLogin);
      setChatStep('LOGIN_PASSWORD');
      setInputType('password');

      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        addMessage('ai', `Excelente! E-mail **${emailToLogin}** selecionado. Digite sua senha para entrar e continuar seu relato:`);
      }, 800);
    } else if (choice === 'RESEND') {
      if (isResendDisabled) return;

      addMessage('user', '📩 Reenviar e-mail de confirmação');
      setIsTyping(true);

      const { error } = await supabase.auth.resend({
        type: 'signup',
        email: emailToLogin,
      });

      setIsTyping(false);

      if (error) {
        if (error.status === 429) {
          addMessage('ai', '⚠️ O limite de envios do servidor foi atingido por segurança (excesso de tentativas). Por favor, aguarde alguns minutos antes de tentar reenviar ou verifique sua pasta de Spam.');
        } else {
          addMessage('ai', 'Não foi possível reenviar o e-mail no momento. Aguarde alguns instantes e tente novamente.');
        }
      } else {
        addMessage('ai', `Novo e-mail de confirmação enviado para **${emailToLogin}**! Por favor, confira sua caixa de entrada e a pasta de spam.`);
        setIsResendDisabled(true);
        setTimeout(() => setIsResendDisabled(false), 60000);
      }
    }
  };

  const handleRegisterErrorDecision = (choice) => {
    setMessages(prev => prev.map(msg =>
      msg.extraData?.type === 'register_error_options' ? { ...msg, extraData: { ...msg.extraData, hideOptions: true } } : msg
    ));
    if (choice === 'LOGIN') {
      addMessage('user', '🔑 Ir para Login');
      setChatStep('LOGIN_EMAIL');
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        addMessage('ai', 'Por favor, digite o seu e-mail cadastrado:');
      }, 800);
    } else if (choice === 'RETRY') {
      addMessage('user', '✏️ Tentar cadastrar outro e-mail');
      setChatStep('REGISTER_EMAIL');
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        addMessage('ai', 'Digite o e-mail que deseja usar no seu cadastro:');
      }, 800);
    }
  };

  return {
    userEmail,
    setUserEmail,
    userName,
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
  };
}
