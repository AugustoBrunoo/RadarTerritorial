import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router';
import { MapPin, Moon, Sun, ArrowLeft, Info, MessageSquare, Sparkles, ArrowRight, User, UserCheck, EyeOff, CheckCircle, Home, Cone, Droplet, Lightbulb, Bus, ShieldAlert, AlertCircle, AlertTriangle } from 'lucide-react';
import HowItWorksModal from './HowItWorksModal';

export default function AiAssistant() {
  const navigate = useNavigate();
  const chatViewportRef = useRef(null);
  
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isHowModalOpen, setIsHowModalOpen] = useState(false);
  
  // Chat States
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [chatStep, setChatStep] = useState('START');
  const [collectedData, setCollectedData] = useState({});
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'ai',
      text: (
        <>
          Olá! Sou o assistente inteligente do Radar Territorial. 🧠<br/><br/>
          Esqueça os formulários chatos! Me diga: <strong>o que está acontecendo no seu bairro e onde fica?</strong><br/><br/>
          <em>Pode digitar livremente e do seu jeito!</em>
        </>
      )
    }
  ]);
  
  // Simulated Turnstile State
  const [turnstileState, setTurnstileState] = useState('idle'); // idle, loading, success

  useEffect(() => {
    setIsDarkMode(document.documentElement.classList.contains('dark'));
  }, []);

  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    if (newMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  const scrollToBottom = () => {
    if (chatViewportRef.current) {
      chatViewportRef.current.scrollTo({
        top: chatViewportRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      sendUserMessage();
    }
  };

  const sendUserMessage = () => {
    const text = inputValue.trim();
    if (!text) return;
    if (chatStep !== 'START' && chatStep !== 'EMAIL_WAIT') return;

    setInputValue('');
    addMessage('user', text);

    if (chatStep === 'START') {
      setCollectedData(prev => ({ ...prev, rawText: text }));
      setIsTyping(true);

      setTimeout(() => {
        setIsTyping(false);
        processAndExtractData(text);
      }, 1800);
    } else if (chatStep === 'EMAIL_WAIT') {
      setCollectedData(prev => ({ ...prev, email: text }));
      setIsTyping(true);

      setTimeout(() => {
        setIsTyping(false);
        concludeAuthenticationFlow(text);
      }, 1500);
    }
  };

  const addMessage = (sender, content, extraData = null) => {
    setMessages(prev => [...prev, {
      id: Date.now(),
      sender,
      text: content,
      extraData
    }]);
  };

  const processAndExtractData = (userInput) => {
    const lowerInput = userInput.toLowerCase();
    
    let categoria = "Infraestrutura Urbana e Vias";
    let iconName = "Cone";
    if (lowerInput.includes('água') || lowerInput.includes('vazamento') || lowerInput.includes('esgoto') || lowerInput.includes('bueiro') || lowerInput.includes('lixo') || lowerInput.includes('entulho')) {
      categoria = "Saneamento e Limpeza Pública";
      iconName = "Droplet";
    } else if (lowerInput.includes('poste') || lowerInput.includes('luz') || lowerInput.includes('lâmpada') || lowerInput.includes('escuro') || lowerInput.includes('apagada') || lowerInput.includes('segurança')) {
      categoria = "Iluminação Pública e Segurança";
      iconName = "Lightbulb";
    } else if (lowerInput.includes('ônibus') || lowerInput.includes('ponto') || lowerInput.includes('transporte') || lowerInput.includes('trânsito') || lowerInput.includes('semáforo') || lowerInput.includes('sinal')) {
      categoria = "Transporte e Mobilidade";
      iconName = "Bus";
    } else if (lowerInput.includes('barricada') || lowerInput.includes('trafico') || lowerInput.includes('perigoso') || lowerInput.includes('risco')) {
      categoria = "Dinâmicas de Insegurança";
      iconName = "ShieldAlert";
    }

    let localizacao = "Cosmos (Identificado)";
    if (lowerInput.includes('campo grande')) localizacao = "Campo Grande (Identificado)";
    else if (lowerInput.includes('inhoaiba') || lowerInput.includes('inhoaíba')) localizacao = "Inhoaíba (Identificado)";

    const regexRua = /(rua|estrada|praça|avenida)\s+([A-Za-zÀ-ÿ0-9º\s]+)/gi;
    const match = regexRua.exec(lowerInput);
    if (match) {
      localizacao = `${match[0].toUpperCase()} • ${localizacao}`;
    }

    let urgencia = "Urgente";
    let urgClass = "bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800/50 text-amber-700 dark:text-amber-400";
    let urgIconName = "AlertCircle";
    if (lowerInput.includes('grave') || lowerInput.includes('perigo') || lowerInput.includes('acidente') || lowerInput.includes('machuc') || lowerInput.includes('caos')) {
      urgencia = "Grave / Risco";
      urgClass = "bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800/50 text-red-700 dark:text-red-400";
      urgIconName = "AlertTriangle";
    } else if (lowerInput.includes('pouco tempo') || lowerInput.includes('recente') || lowerInput.includes('ontem')) {
      urgencia = "Problema Recente";
      urgClass = "bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800/50 text-blue-700 dark:text-blue-400";
      urgIconName = "Info";
    }

    const extractedData = { categoria, localizacao, urgencia, urgClass, iconName, urgIconName };
    setCollectedData(prev => ({ ...prev, extracted: extractedData }));
    
    addMessage('ai', null, { type: 'previewCard', data: extractedData });
    setChatStep('AUTH_DECISION');
  };

  const handleDecision = (choice) => {
    if (choice === 'LOGIN') {
      setChatStep('EMAIL_WAIT');
      addMessage('user', 'Quero seguir com: Conectar Minha Conta');
      setTimeout(() => {
        addMessage('ai', (
          <>
            Excelente escolha! Conectar seu relato dá a você controle total sobre as resoluções. 🎯<br/><br/>
            Por favor, <strong>digite seu e-mail cadastrado</strong> aqui no campo do chat para realizarmos a autenticação mágica.
          </>
        ));
      }, 800);
    } else {
      setChatStep('DONE');
      addMessage('user', 'Quero seguir com: Enviar como Anônimo');
      setTimeout(() => {
        addMessage('ai', null, { type: 'turnstile' });
      }, 800);
    }
  };

  const concludeAuthenticationFlow = (email) => {
    addMessage('ai', null, { type: 'finalLogged', email });
    setChatStep('DONE');
  };

  const simulateTurnstileCheck = () => {
    if (turnstileState !== 'idle') return;
    setTurnstileState('loading');
    setTimeout(() => {
      setTurnstileState('success');
      setTimeout(() => {
        addMessage('ai', null, { type: 'finalAnonymous' });
      }, 800);
    }, 1500);
  };

  // Helper function to render Lucide Icons dynamically from a string name
  const renderIcon = (name, className) => {
    const icons = { Cone, Droplet, Lightbulb, Bus, ShieldAlert, AlertCircle, AlertTriangle, Info };
    const IconComponent = icons[name] || Cone;
    return <IconComponent className={className} />;
  };

  return (
    <div className="transition-colors duration-500 ease-in-out min-h-screen bg-[#F9FAFB] text-zinc-900 dark:bg-[#09090B] dark:text-zinc-50 font-sans flex flex-col">
      {/* NAVBAR */}
      <div className="fixed top-6 left-0 right-0 z-50 px-4 flex justify-center pointer-events-none">
        <header className="pointer-events-auto w-full max-w-5xl bg-white/70 dark:bg-zinc-900/70 backdrop-blur-xl border border-zinc-200 dark:border-zinc-800 rounded-full px-4 sm:px-6 py-3 flex justify-between items-center shadow-lg shadow-zinc-200/20 dark:shadow-black/40 transition-colors duration-300">
          <Link to="/" className="flex items-center gap-2 cursor-pointer group">
            <div className="bg-red-600 p-2 rounded-full group-hover:scale-105 transition-transform">
              <MapPin className="h-5 w-5 text-white" />
            </div>
            <span className="font-bold text-lg sm:text-xl tracking-tight text-zinc-900 dark:text-white flex items-center">
              Radar<span className="text-red-600">Territorial</span>
            </span>
          </Link>

          <div className="flex items-center gap-3">
            <button 
              onClick={toggleDarkMode}
              className="p-2 sm:p-2.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 hover:text-red-600 transition-colors"
              aria-label="Alternar tema"
            >
              {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
            <button 
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white px-5 py-2.5 rounded-full text-sm font-bold transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              <span className="hidden sm:inline">Voltar</span>
            </button>
          </div>
        </header>
      </div>

      <main className="flex-grow pt-32 pb-6 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto w-full flex flex-col justify-center min-h-[90vh] animate-in slide-in-from-bottom-4 duration-500">
        
        {/* INFO BENTO CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white dark:bg-zinc-900/60 border border-zinc-200/80 dark:border-zinc-800/80 rounded-3xl p-5 flex flex-col justify-between shadow-sm relative overflow-hidden group">
            <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-red-600/5 rounded-full blur-xl group-hover:bg-red-600/10 transition-colors duration-300"></div>
            <div className="relative z-10">
              <div className="flex items-center gap-2.5 mb-3 text-red-600 dark:text-red-400">
                <Info className="h-5 w-5" />
                <span className="font-extrabold text-xs uppercase tracking-wider">Como Relatar</span>
              </div>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed font-semibold">
                Diga o que aconteceu, onde fica (rua, avenida ou estrada) e use pontos de referência próximos.
              </p>
            </div>
          </div>

          <div className="bg-white dark:bg-zinc-900/60 border border-zinc-200/80 dark:border-zinc-800/80 rounded-3xl p-5 flex flex-col justify-between shadow-sm relative overflow-hidden group">
            <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-blue-600/5 rounded-full blur-xl group-hover:bg-blue-600/10 transition-colors duration-300"></div>
            <div className="relative z-10">
              <div className="flex items-center gap-2.5 mb-3 text-blue-600 dark:text-blue-400">
                <MessageSquare className="h-5 w-5" />
                <span className="font-extrabold text-xs uppercase tracking-wider">Dica da IA</span>
              </div>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed font-medium italic">
                "Aqui em Cosmos abriu um buraco na calçada perto da praça que já causou acidente há mais de 3 meses."
              </p>
            </div>
          </div>

          <div className="bg-zinc-900 dark:bg-zinc-900 border border-zinc-800 dark:border-zinc-700/80 rounded-3xl p-5 flex flex-col justify-between shadow-md relative overflow-hidden group">
            <div className="absolute top-0 right-0 -mt-8 -mr-8 w-32 h-32 bg-red-600/20 blur-2xl rounded-full"></div>
            <div className="relative z-10 flex flex-col h-full justify-between gap-4">
              <div>
                <div className="flex items-center gap-2.5 mb-2 text-red-500">
                  <Sparkles className="h-5 w-5 animate-pulse" />
                  <span className="font-extrabold text-xs uppercase tracking-widest text-red-400">Processamento Natural</span>
                </div>
                <h4 className="font-black text-white text-base tracking-tight leading-tight">Quer entender a nossa tecnologia?</h4>
              </div>
              <button 
                onClick={() => setIsHowModalOpen(true)}
                className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-4 rounded-2xl text-xs flex items-center justify-center gap-2 transition-all transform hover:-translate-y-0.5 active:scale-95 shadow-lg shadow-red-600/20"
              >
                <span>Como Funciona o Assistente?</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* CHAT CONTAINER */}
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-[2.5rem] shadow-xl overflow-hidden flex flex-col h-[520px] relative">
          
          <div ref={chatViewportRef} className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 scrollbar-thin scrollbar-thumb-zinc-300 dark:scrollbar-thumb-zinc-600 scrollbar-track-transparent">
            
            {messages.map((msg) => (
              <div key={msg.id} className={`flex items-start gap-3 max-w-[85%] animate-in slide-in-from-bottom-2 fade-in duration-300 ${msg.sender === 'user' ? 'ml-auto justify-end' : ''}`}>
                {msg.sender === 'ai' && (
                  <div className="w-10 h-10 rounded-full bg-red-100 dark:bg-red-900/20 flex items-center justify-center flex-shrink-0 mt-1">
                    <Sparkles className="h-5 w-5 text-red-600" />
                  </div>
                )}
                
                <div className={`space-y-1 ${msg.sender === 'user' ? 'text-right' : 'w-full'}`}>
                  {msg.text && (
                    <div className={`${msg.sender === 'user' ? 'bg-red-600 text-white rounded-tr-sm' : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-100 rounded-tl-sm'} p-4 rounded-3xl text-sm sm:text-base leading-relaxed font-semibold`}>
                      {msg.text}
                    </div>
                  )}

                  {msg.extraData?.type === 'previewCard' && (
                    <div className="bg-zinc-100 dark:bg-zinc-800 p-4 rounded-3xl rounded-tl-sm text-sm sm:text-base text-zinc-800 dark:text-zinc-100 leading-relaxed font-semibold space-y-4">
                      <span>Extraordinário! Consegui analisar sua queixa e estruturei ela no formato abaixo usando nossa IA. Dê uma olhada:</span>
                      
                      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-2xl p-4 space-y-3 shadow-inner">
                        <div className="flex items-center gap-2 pb-2 border-b border-zinc-100 dark:border-zinc-800">
                          {renderIcon(msg.extraData.data.iconName, "h-5 w-5 text-red-600")}
                          <span className="font-black text-sm uppercase tracking-wide text-zinc-700 dark:text-zinc-300">{msg.extraData.data.categoria}</span>
                        </div>
                        <div className="space-y-1">
                          <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Endereço Identificado</span>
                          <p className="text-xs sm:text-sm font-semibold text-zinc-700 dark:text-zinc-200 flex items-center gap-1.5">
                            <MapPin className="h-4 w-4 text-zinc-400" /> {msg.extraData.data.localizacao}
                          </p>
                        </div>
                        <div className="space-y-1">
                          <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Gravidade Sugerida</span>
                          <div className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg border font-bold text-xs ${msg.extraData.data.urgClass}`}>
                            {renderIcon(msg.extraData.data.urgIconName, "h-3 w-3")} {msg.extraData.data.urgencia}
                          </div>
                        </div>
                      </div>

                      {chatStep === 'AUTH_DECISION' && (
                        <>
                          <div className="border-t border-zinc-200 dark:border-zinc-700 pt-3">
                            <p className="font-bold">Como você prefere prosseguir para publicar essa demanda no Radar?</p>
                          </div>
                          <div className="flex flex-col sm:flex-row gap-2 mt-2 w-full">
                            <button onClick={() => handleDecision('LOGIN')} className="flex-1 bg-red-600 hover:bg-red-700 text-white font-extrabold py-3.5 px-4 rounded-xl text-xs sm:text-sm transition-transform active:scale-95 shadow-md flex items-center justify-center gap-2">
                              <UserCheck className="h-4 w-4" /> Conectar Minha Conta
                            </button>
                            <button onClick={() => handleDecision('ANONYMOUS')} className="flex-1 bg-zinc-200 hover:bg-zinc-300 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-100 font-extrabold py-3.5 px-4 rounded-xl text-xs sm:text-sm transition-transform active:scale-95 flex items-center justify-center gap-2">
                              <EyeOff className="h-4 w-4" /> Enviar como Anônimo
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                  )}

                  {msg.extraData?.type === 'turnstile' && (
                    <div className="bg-zinc-100 dark:bg-zinc-800 p-4 rounded-3xl rounded-tl-sm text-sm sm:text-base text-zinc-800 dark:text-zinc-100 leading-relaxed font-medium space-y-4">
                      Perfeito! Manteremos o sigilo absoluto. Para publicarmos, só precisamos garantir que você não é um bot de spam 🤖.<br/><br/>
                      Por favor, <strong>resolva a validação de segurança</strong> abaixo:
                      
                      <div 
                        onClick={simulateTurnstileCheck} 
                        className="mt-4 cursor-pointer bg-white dark:bg-[#222222] border border-[#e0e0e0] dark:border-[#333333] rounded-lg p-3 flex items-center justify-between shadow-sm transition-colors hover:bg-zinc-50 dark:hover:bg-zinc-800"
                      >
                        <div className="flex items-center gap-3">
                          {turnstileState === 'loading' && <div className="w-6 h-6 border-2 border-[#e0e0e0] border-t-zinc-400 rounded-full animate-spin"></div>}
                          {turnstileState === 'success' && <CheckCircle className="h-6 w-6 text-green-500" />}
                          {turnstileState === 'idle' && <div className="w-6 h-6 border-2 border-zinc-300 dark:border-zinc-600 rounded bg-white dark:bg-zinc-900"></div>}
                          <span className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 select-none">
                            {turnstileState === 'loading' ? 'Verificando...' : (turnstileState === 'success' ? 'Sucesso!' : 'Não sou um robô')}
                          </span>
                        </div>
                        <div className="flex flex-col items-end">
                          <span className="text-[9px] text-zinc-400 font-bold tracking-tight">Cloudflare</span>
                          <span className="text-[8px] text-zinc-400">Turnstile</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {msg.extraData?.type === 'finalAnonymous' && (
                    <div className="space-y-2 w-full">
                      <div className="bg-zinc-100 dark:bg-zinc-800 p-4 rounded-3xl rounded-tl-sm text-sm sm:text-base text-zinc-800 dark:text-zinc-100 leading-relaxed font-medium">
                        Relato publicado com sucesso de forma 100% anônima! 🤫🎉<br/><br/>
                        Ele já foi jogado no mapa comunitário dos gestores e de seus vizinhos para ganhar apoio. Obrigado por contribuir para a melhoria da sua região!
                      </div>
                      <div className="flex gap-2 mt-2 w-full">
                        <Link to="/" className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold py-3.5 px-4 rounded-xl text-center text-xs sm:text-sm transition-all active:scale-95 shadow-md flex items-center justify-center gap-1.5">
                          <Home className="h-4 w-4" /> Voltar à Home
                        </Link>
                      </div>
                    </div>
                  )}

                  {msg.extraData?.type === 'finalLogged' && (
                    <div className="space-y-2 w-full">
                      <div className="bg-zinc-100 dark:bg-zinc-800 p-4 rounded-3xl rounded-tl-sm text-sm sm:text-base text-zinc-800 dark:text-zinc-100 leading-relaxed font-medium">
                        Sucesso! Identifiquei seu cadastro vinculado a <strong>{msg.extraData.email}</strong>. ✨<br/><br/>
                        O relato da IA foi publicado e já está vinculado ao seu Painel de Controle de morador. Obrigado por fazer a diferença no seu bairro!
                      </div>
                      <div className="flex flex-col sm:flex-row gap-2 mt-2 w-full">
                        <Link to="/" className="flex-1 bg-zinc-200 hover:bg-zinc-300 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-100 font-bold py-3.5 px-4 rounded-xl text-center text-xs sm:text-sm transition-transform active:scale-95 flex items-center justify-center gap-1.5">
                          <Home className="h-4 w-4" /> Voltar à Home
                        </Link>
                        <Link to="/demandas-usuario" className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold py-3.5 px-4 rounded-xl text-center text-xs sm:text-sm transition-transform active:scale-95 shadow-md flex items-center justify-center gap-1.5">
                          Ver em Meu Painel <ArrowRight className="h-4 w-4" />
                        </Link>
                      </div>
                    </div>
                  )}

                  <span className={`text-[10px] font-bold text-zinc-400 uppercase tracking-wide block ${msg.sender === 'user' ? 'mr-2' : 'ml-2'}`}>
                    {msg.sender === 'user' ? 'Você • Agora' : 'Assistente IA • Agora'}
                  </span>
                </div>

                {msg.sender === 'user' && (
                  <div className="w-10 h-10 rounded-full bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center flex-shrink-0 mt-1">
                    <User className="h-5 w-5 text-zinc-600 dark:text-zinc-300" />
                  </div>
                )}
              </div>
            ))}
            
            {isTyping && (
              <div className="flex items-start gap-3 max-w-[85%] px-4 sm:px-0 pb-4 animate-in slide-in-from-bottom-2 fade-in duration-300">
                <div className="w-10 h-10 rounded-full bg-red-100 dark:bg-red-900/20 flex items-center justify-center flex-shrink-0">
                  <Sparkles className="h-5 w-5 text-red-600 animate-spin" style={{ animationDuration: '3s' }} />
                </div>
                <div className="space-y-1">
                  <div className="bg-zinc-100 dark:bg-zinc-800 px-5 py-3.5 rounded-3xl rounded-tl-sm text-sm text-zinc-500 flex items-center gap-1 font-semibold">
                    <span>Analisando com IA</span>
                    <div className="flex gap-1 items-center mt-1 ml-1">
                      <span className="w-1.5 h-1.5 bg-red-600 rounded-full animate-typing-bounce" style={{ animationDelay: '0s' }}></span>
                      <span className="w-1.5 h-1.5 bg-red-600 rounded-full animate-typing-bounce" style={{ animationDelay: '0.2s' }}></span>
                      <span className="w-1.5 h-1.5 bg-red-600 rounded-full animate-typing-bounce" style={{ animationDelay: '0.4s' }}></span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* INPUT BAR */}
          <div className="p-3 sm:p-4 bg-zinc-50 dark:bg-zinc-950 border-t border-zinc-100 dark:border-zinc-800/80 flex items-center gap-2">
            <input 
              type="text" 
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyPress}
              disabled={chatStep === 'DONE' || chatStep === 'AUTH_DECISION'}
              placeholder={chatStep === 'DONE' ? "Relato concluído e publicado." : "Escreva o problema e o local aqui..."}
              className="flex-1 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl px-4 py-3 sm:py-3.5 text-sm sm:text-base outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all placeholder-zinc-400 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            />
            <button 
              onClick={sendUserMessage} 
              disabled={chatStep === 'DONE' || chatStep === 'AUTH_DECISION'}
              className="p-3 sm:p-3.5 bg-red-600 hover:bg-red-700 disabled:bg-zinc-400 disabled:cursor-not-allowed active:scale-95 text-white rounded-2xl transition-all duration-150 shadow-md shadow-red-600/20 flex items-center justify-center"
            >
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>
        </div>

      </main>

      {/* FOOTER */}
      <footer className="border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#09090B] mt-auto">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-zinc-500 text-sm font-medium">
          <div className="flex items-center gap-3">
            <MapPin className="h-4 w-4 text-red-600" />
            <span className="text-zinc-900 dark:text-white font-bold tracking-tight">Radar<span className="text-red-600">Territorial</span></span>
            <span>© {new Date().getFullYear()}</span>
          </div>
        </div>
      </footer>

      <HowItWorksModal isOpen={isHowModalOpen} onClose={() => setIsHowModalOpen(false)} />
    </div>
  );
}
