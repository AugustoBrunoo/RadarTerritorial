import React from 'react';
import { useNavigate } from 'react-router';
import { Sparkles, User, UserCheck, EyeOff, Check, X, Shield, ShieldCheck, Eye, AlertCircle, ShieldAlert, ArrowLeft, Navigation, Search, MessageCircle, Map, MapPin, ChevronRight, Info, History, AlertTriangle, Minus, Loader2 } from 'lucide-react';
import { categoryMacros } from '../AnonymousForm/CategorySection';

const renderFormattedText = (text) => {
  if (!text) return null;

  if (typeof text !== 'string') return text;

  const parts = text.split(/\*\*(.*?)\*\*/g);

  return parts.map((part, index) => {
    if (index % 2 === 1) {
      return (
        <strong
          key={index}
          className="font-extrabold text-red-600 dark:text-red-400"
        >
          {part}
        </strong>
      );
    }
    return part;
  });
};

export default function AiAssistantChatMessages({
  messages,
  isTyping,
  chatStep,
  handleStartDecision,
  handleDisclaimerDecision,
  handleLocationDecision,
  handleLocationConfirmDecision,
  handleNumberDecision,
  handleLocationReviewDecision,
  handleLocationEditDecision,
  handleLocationKeepRefDecision,
  handleRegisterErrorDecision,
  handleRegisterSuccessDecision,
  handleRegisterConfirmDecision,
  handleRegisterTermsDecision,
  handleCategoryMacroDecision,
  handleCategorySubDecision,
  formLocation,
  formMacroCategory,
  formCategory,
  formSeverity,
  formDescription,
  handleSeverityToggle,
  confirmSeverity,
  skipDescription,
  handleReviewDecision,
  handleReviewEditDecision,
  handleSuccessDecision,
  userName,
  termsAccepted,
  setTermsAccepted,
  isResendDisabled,
  chatViewportRef
}) {
  const navigate = useNavigate();

  return (
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
              <div className={`${msg.sender === 'user' ? 'bg-red-600 text-white rounded-tr-sm' : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-100 rounded-tl-sm'} p-4 rounded-3xl text-sm sm:text-base leading-relaxed font-semibold whitespace-pre-wrap`}>
                {renderFormattedText(msg.text)}
              </div>
            )}

            {msg.extraData?.type === 'start_options' && !msg.extraData.hideOptions && (
              <div className="flex flex-col gap-2 mt-2 w-full">
                <button onClick={() => handleStartDecision('ANONYMOUS')} className="w-full bg-zinc-200 hover:bg-zinc-300 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-100 font-extrabold py-3.5 px-4 rounded-xl text-xs sm:text-sm transition-transform active:scale-95 flex items-center justify-center gap-2">
                  <EyeOff className="h-4 w-4" /> Enviar como Anônimo
                </button>
                <button onClick={() => handleStartDecision('LOGIN')} className="w-full bg-red-600 hover:bg-red-700 text-white font-extrabold py-3.5 px-4 rounded-xl text-xs sm:text-sm transition-transform active:scale-95 shadow-md flex items-center justify-center gap-2">
                  <UserCheck className="h-4 w-4" /> Já tenho conta / Fazer Login
                </button>
                <button onClick={() => handleStartDecision('REGISTER')} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-extrabold py-3.5 px-4 rounded-xl text-xs sm:text-sm transition-transform active:scale-95 shadow-md flex items-center justify-center gap-2">
                  <Sparkles className="h-4 w-4" /> Criar nova conta
                </button>
              </div>
            )}

            {msg.extraData?.type === 'register_error_options' && !msg.extraData.hideOptions && (
              <div className="flex flex-col sm:flex-row gap-2 mt-2 w-full">
                <button onClick={() => handleRegisterErrorDecision('LOGIN')} className="flex-1 bg-red-600 hover:bg-red-700 text-white font-extrabold py-3.5 px-4 rounded-xl text-xs sm:text-sm transition-transform active:scale-95 shadow-md flex items-center justify-center gap-2">
                  <UserCheck className="h-4 w-4" /> Ir para Login
                </button>
                <button onClick={() => handleRegisterErrorDecision('RETRY')} className="flex-1 bg-zinc-200 hover:bg-zinc-300 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-100 font-extrabold py-3.5 px-4 rounded-xl text-xs sm:text-sm transition-transform active:scale-95 flex items-center justify-center gap-2">
                  <X className="h-4 w-4" /> Tentar cadastrar outro e-mail
                </button>
              </div>
            )}

            {msg.extraData?.type === 'register_success_options' && !msg.extraData.hideOptions && (
              <div className="flex flex-col gap-2 mt-2 w-full">
                <button onClick={() => handleRegisterSuccessDecision('LOGIN', msg.extraData.registerEmail)} className="w-full bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 font-extrabold py-3.5 px-6 rounded-xl text-sm sm:text-base transition-transform active:scale-95 shadow-lg flex items-center justify-center gap-2">
                  <Check className="h-4 w-4" /> Já confirmei meu e-mail / Fazer Login
                </button>
                <button 
                  onClick={() => handleRegisterSuccessDecision('RESEND', msg.extraData.registerEmail)} 
                  disabled={isResendDisabled}
                  className={`w-full font-extrabold py-3.5 px-4 rounded-xl text-sm sm:text-base transition-transform flex items-center justify-center gap-2 ${
                    isResendDisabled 
                      ? 'bg-zinc-300 dark:bg-zinc-700 text-zinc-500 cursor-not-allowed' 
                      : 'bg-zinc-200 hover:bg-zinc-300 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-100 active:scale-95'
                  }`}
                >
                  <MessageCircle className="h-4 w-4" /> Reenviar e-mail de confirmação
                </button>
              </div>
            )}

            {msg.extraData?.type === 'register_confirm_options' && !msg.extraData.hideOptions && (
              <div className="flex gap-2 mt-2 w-full">
                <button onClick={() => handleRegisterConfirmDecision('BACK')} className="bg-zinc-200 hover:bg-zinc-300 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-100 font-extrabold py-3.5 px-6 rounded-xl text-sm sm:text-base transition-transform active:scale-95 flex items-center justify-center gap-2">
                  <ArrowLeft className="h-4 w-4" /> Esqueci a senha / Voltar
                </button>
              </div>
            )}

            {msg.extraData?.type === 'register_terms_options' && !msg.extraData.hideOptions && (
              <div className="flex flex-col gap-4 mt-2 w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-4 rounded-2xl shadow-sm">
                <label className="flex items-start gap-3 cursor-pointer group">
                  <div className="relative flex items-center justify-center mt-1">
                    <input 
                      type="checkbox" 
                      className="peer sr-only"
                      checked={termsAccepted}
                      onChange={(e) => setTermsAccepted(e.target.checked)}
                    />
                    <div className="w-5 h-5 border-2 border-zinc-300 dark:border-zinc-600 rounded peer-checked:bg-red-600 peer-checked:border-red-600 transition-colors"></div>
                    <Check className="absolute w-3.5 h-3.5 text-white opacity-0 peer-checked:opacity-100 transition-opacity" strokeWidth={3} />
                  </div>
                  <span className="text-sm text-zinc-700 dark:text-zinc-300 font-medium leading-relaxed">
                    Eu concordo com os <a href="/termos" target="_blank" rel="noopener noreferrer" className="text-red-600 hover:underline">Termos de Uso</a> e a <a href="/privacidade" target="_blank" rel="noopener noreferrer" className="text-red-600 hover:underline">Política de Privacidade</a>.
                  </span>
                </label>
                <button 
                  onClick={handleRegisterTermsDecision}
                  disabled={!termsAccepted}
                  className={`w-full font-extrabold py-3.5 px-4 rounded-xl text-sm sm:text-base transition-all duration-300 flex items-center justify-center gap-2 ${
                    termsAccepted 
                      ? 'bg-red-600 hover:bg-red-700 text-white shadow-md active:scale-95' 
                      : 'bg-zinc-200 dark:bg-zinc-800 text-zinc-400 cursor-not-allowed'
                  }`}
                >
                  <Sparkles className="h-4 w-4" /> Concordar e Criar Minha Conta
                </button>
              </div>
            )}

            {msg.extraData?.type === 'location_review_card' && !msg.extraData.hideOptions && (
              <div className="flex flex-col sm:flex-row gap-2 mt-2 w-full">
                <button onClick={() => handleLocationReviewDecision('CONFIRM')} className="flex-1 bg-green-600 hover:bg-green-700 text-white font-extrabold py-3.5 px-4 rounded-xl text-xs sm:text-sm transition-transform active:scale-95 shadow-md flex items-center justify-center gap-2">
                  <Check className="h-4 w-4" /> Confirmar Endereço
                </button>
                <button onClick={() => handleLocationReviewDecision('EDIT')} className="flex-1 bg-zinc-200 hover:bg-zinc-300 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-100 font-extrabold py-3.5 px-4 rounded-xl text-xs sm:text-sm transition-transform active:scale-95 flex items-center justify-center gap-2">
                  <X className="h-4 w-4" /> Corrigir Algo
                </button>
              </div>
            )}

            {msg.extraData?.type === 'location_edit_options' && !msg.extraData.hideOptions && (
              <div className="flex flex-col sm:flex-row gap-2 mt-2 w-full">
                <button onClick={() => handleLocationEditDecision('RUA_CEP')} className="flex-1 bg-zinc-200 hover:bg-zinc-300 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-100 font-extrabold py-3.5 px-4 rounded-xl text-xs sm:text-sm transition-transform active:scale-95 flex items-center justify-center gap-2">
                  <Map className="h-4 w-4" /> CEP ou Nome da Rua
                </button>
                <button onClick={() => handleLocationEditDecision('NUMERO')} className="flex-1 bg-zinc-200 hover:bg-zinc-300 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-100 font-extrabold py-3.5 px-4 rounded-xl text-xs sm:text-sm transition-transform active:scale-95 flex items-center justify-center gap-2">
                  <MapPin className="h-4 w-4" /> Número ou Referência
                </button>
              </div>
            )}

            {msg.extraData?.type === 'location_keep_ref_options' && !msg.extraData.hideOptions && (
              <div className="flex flex-col sm:flex-row gap-2 mt-2 w-full">
                <button onClick={() => handleLocationKeepRefDecision('KEEP')} className="flex-1 bg-green-600 hover:bg-green-700 text-white font-extrabold py-3.5 px-4 rounded-xl text-xs sm:text-sm transition-transform active:scale-95 shadow-md flex items-center justify-center gap-2">
                  <Check className="h-4 w-4" /> Sim, manter
                </button>
                <button onClick={() => handleLocationKeepRefDecision('CHANGE')} className="flex-1 bg-zinc-200 hover:bg-zinc-300 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-100 font-extrabold py-3.5 px-4 rounded-xl text-xs sm:text-sm transition-transform active:scale-95 flex items-center justify-center gap-2">
                  <X className="h-4 w-4" /> Não, alterar
                </button>
              </div>
            )}

            {msg.extraData?.type === 'location_start_options' && !msg.extraData.hideOptions && (
              <div className="flex flex-col sm:flex-row gap-2 mt-2 w-full">
                <button onClick={() => handleLocationDecision('GPS')} className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-extrabold py-3.5 px-4 rounded-xl text-xs sm:text-sm transition-transform active:scale-95 shadow-md flex items-center justify-center gap-2">
                  <Navigation className="h-4 w-4" /> Usar minha localização atual
                </button>
                <button onClick={() => handleLocationDecision('MANUAL')} className="flex-1 bg-zinc-200 hover:bg-zinc-300 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-100 font-extrabold py-3.5 px-4 rounded-xl text-xs sm:text-sm transition-transform active:scale-95 flex items-center justify-center gap-2">
                  <Search className="h-4 w-4" /> Digitar CEP ou Nome da Rua
                </button>
              </div>
            )}

            {msg.extraData?.type === 'location_invalid_options' && !msg.extraData.hideOptions && (
              <div className="flex flex-col sm:flex-row gap-2 mt-2 w-full">
                <button onClick={() => handleLocationDecision('GPS')} className="flex-1 bg-zinc-200 hover:bg-zinc-300 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-100 font-extrabold py-3.5 px-4 rounded-xl text-xs sm:text-sm transition-transform active:scale-95 flex items-center justify-center gap-2">
                  <Navigation className="h-4 w-4" /> Tentar GPS novamente
                </button>
                <button onClick={() => handleLocationDecision('MANUAL')} className="flex-1 bg-zinc-200 hover:bg-zinc-300 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-100 font-extrabold py-3.5 px-4 rounded-xl text-xs sm:text-sm transition-transform active:scale-95 flex items-center justify-center gap-2">
                  <Search className="h-4 w-4" /> Digitar manualmente
                </button>
              </div>
            )}

            {msg.extraData?.type === 'location_confirm_options' && !msg.extraData.hideOptions && (
              <div className="flex flex-col sm:flex-row gap-2 mt-2 w-full">
                <button onClick={() => handleLocationConfirmDecision('YES')} className="flex-1 bg-green-600 hover:bg-green-700 text-white font-extrabold py-3.5 px-4 rounded-xl text-xs sm:text-sm transition-transform active:scale-95 shadow-md flex items-center justify-center gap-2">
                  <Check className="h-4 w-4" /> Sim, está correto
                </button>
                <button onClick={() => handleLocationConfirmDecision('RETRY_MANUAL')} className="flex-1 bg-zinc-200 hover:bg-zinc-300 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-100 font-extrabold py-3.5 px-4 rounded-xl text-xs sm:text-sm transition-transform active:scale-95 flex items-center justify-center gap-2">
                  <Search className="h-4 w-4" /> Digitar manualmente
                </button>
              </div>
            )}

            {msg.extraData?.type === 'location_number_options' && !msg.extraData.hideOptions && (
              <div className="flex gap-2 mt-2 w-full">
                <button onClick={() => handleNumberDecision('SEM_NUMERO')} className="bg-zinc-200 hover:bg-zinc-300 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-100 font-extrabold py-3 px-4 rounded-xl text-xs transition-transform active:scale-95 flex items-center justify-center gap-2">
                  <X className="h-4 w-4" /> Sem número / Apenas a rua
                </button>
              </div>
            )}

            {msg.extraData?.type === 'category_macro_options' && !msg.extraData.hideOptions && (
              <div className="flex flex-col gap-2 mt-2 w-full max-w-sm">
                {categoryMacros.map(macro => {
                  const Icon = macro.icon;
                  return (
                    <button 
                      key={macro.id}
                      onClick={() => handleCategoryMacroDecision(macro.id)} 
                      className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 text-zinc-800 dark:text-zinc-100 font-semibold py-3 px-4 rounded-xl text-sm transition-all active:scale-95 flex items-center justify-between text-left group"
                    >
                      <div className="flex items-center gap-3">
                        <div className="bg-zinc-100 dark:bg-zinc-800 p-2 rounded-lg group-hover:bg-red-100 dark:group-hover:bg-red-900/30 transition-colors">
                          <Icon className={`h-5 w-5 ${macro.iconColorClass}`} />
                        </div>
                        <span>{macro.title}</span>
                      </div>
                      <ChevronRight className="h-4 w-4 text-zinc-400 group-hover:text-red-500 transition-colors" />
                    </button>
                  );
                })}
                <button 
                  onClick={() => handleCategoryMacroDecision('AI_ASSISTED')} 
                  className="mt-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-extrabold py-4 px-4 rounded-xl text-sm sm:text-base transition-all active:scale-95 shadow-md flex items-center justify-center gap-2"
                >
                  <Sparkles className="h-5 w-5" /> Escrever e deixar a IA classificar
                </button>
              </div>
            )}

            {msg.extraData?.type === 'category_sub_options' && !msg.extraData.hideOptions && (
              <div className="flex flex-col gap-2 mt-2 w-full max-w-sm">
                {categoryMacros.find(m => m.id === msg.extraData.macroId)?.options.map(option => (
                  <button 
                    key={option}
                    onClick={() => handleCategorySubDecision(option)} 
                    className="bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-100 font-medium py-3 px-4 rounded-xl text-sm transition-all active:scale-95 text-left flex justify-between items-center group"
                  >
                    <span>{option}</span>
                    <ChevronRight className="h-4 w-4 text-zinc-400 group-hover:text-zinc-600 dark:group-hover:text-zinc-300 transition-colors" />
                  </button>
                ))}
                <button 
                  onClick={() => handleCategorySubDecision('BACK')} 
                  className="mt-2 bg-transparent hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-500 dark:text-zinc-400 font-medium py-2 px-4 rounded-xl text-xs transition-colors text-center"
                >
                  Voltar para Temas Principais
                </button>
              </div>
            )}

            {msg.extraData?.type === 'severity_options' && !msg.extraData.hideOptions && (
              <div className="flex flex-col gap-2 mt-2 w-full max-w-sm">
                {[
                  { value: 'recente', title: 'Problema Recente', desc: 'Apareceu há pouco tempo.', icon: Info, colorClass: 'text-blue-600 dark:text-blue-400', bgClass: 'bg-blue-100 dark:bg-blue-900/30', borderActive: 'border-blue-500 bg-blue-50/50 dark:bg-blue-900/20' },
                  { value: 'abandono', title: 'Muito tempo abandonado', desc: 'Faz meses ou anos.', icon: History, colorClass: 'text-purple-600 dark:text-purple-400', bgClass: 'bg-purple-100 dark:bg-purple-900/30', borderActive: 'border-purple-500 bg-purple-50/50 dark:bg-purple-900/20' },
                  { value: 'urgente', title: 'Urgente', desc: 'Causa grandes transtornos.', icon: AlertCircle, colorClass: 'text-amber-600 dark:text-amber-400', bgClass: 'bg-amber-100 dark:bg-amber-900/30', borderActive: 'border-amber-500 bg-amber-50/50 dark:bg-amber-900/20' },
                  { value: 'grave', title: 'Grave / Risco de Acidente', desc: 'Risco iminente de machucar.', icon: AlertTriangle, colorClass: 'text-red-600 dark:text-red-400', bgClass: 'bg-red-100 dark:bg-red-900/30', borderActive: 'border-red-500 bg-red-50/50 dark:bg-red-900/20' },
                  { value: 'nenhum', title: 'Não sei informar', desc: null, icon: Minus, colorClass: 'text-zinc-500 dark:text-zinc-400', bgClass: 'bg-zinc-200 dark:bg-zinc-700', borderActive: 'border-zinc-500 bg-zinc-100 dark:bg-zinc-800' }
                ].map(opt => {
                  const Icon = opt.icon;
                  const isSelected = formSeverity?.includes(opt.value);
                  
                  return (
                    <button 
                      key={opt.value}
                      onClick={() => handleSeverityToggle(opt.value)} 
                      className={`border-2 rounded-xl p-3 flex gap-3 text-left transition-all active:scale-95 ${
                        isSelected 
                          ? opt.borderActive
                          : 'border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:border-zinc-300 dark:hover:border-zinc-700'
                      }`}
                    >
                      <div className={`w-8 h-8 shrink-0 rounded-full flex items-center justify-center transition-colors ${isSelected ? 'bg-white/80 dark:bg-white/20' : opt.bgClass}`}>
                        <Icon className={`h-4 w-4 ${isSelected ? opt.colorClass : opt.colorClass}`} />
                      </div>
                      <div className="flex flex-col flex-1 justify-center">
                        <span className={`text-sm font-bold ${isSelected ? opt.colorClass : 'text-zinc-900 dark:text-zinc-100'}`}>
                          {opt.title}
                        </span>
                        {opt.desc && (
                          <span className={`text-xs ${isSelected ? opt.colorClass : 'text-zinc-500 dark:text-zinc-400'}`}>
                            {opt.desc}
                          </span>
                        )}
                      </div>
                      <div className={`w-5 h-5 shrink-0 rounded-full flex items-center justify-center self-center transition-all ${isSelected ? 'bg-green-500 scale-100' : 'scale-0'}`}>
                        <Check className="w-3 h-3 text-white" />
                      </div>
                    </button>
                  );
                })}
                
                <button 
                  onClick={confirmSeverity}
                  disabled={!formSeverity || formSeverity.length === 0}
                  className={`mt-2 py-3 px-4 rounded-xl text-sm font-extrabold transition-all flex items-center justify-center gap-2 ${
                    formSeverity?.length > 0 
                      ? 'bg-green-600 hover:bg-green-700 text-white shadow-md active:scale-95' 
                      : 'bg-zinc-200 dark:bg-zinc-800 text-zinc-400 cursor-not-allowed'
                  }`}
                >
                  <Check className="h-4 w-4" /> Confirmar Severidade
                </button>
              </div>
            )}

            {msg.extraData?.type === 'description_options' && !msg.extraData.hideOptions && (
              <div className="flex mt-2 w-full max-w-sm">
                <button 
                  onClick={skipDescription}
                  className="bg-zinc-200 hover:bg-zinc-300 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-100 font-extrabold py-3 px-4 rounded-xl text-xs sm:text-sm transition-transform active:scale-95 flex items-center justify-center gap-2 w-full"
                >
                  Pular detalhamento (Opcional)
                </button>
              </div>
            )}

            {msg.extraData?.type === 'moderation_error' && (
              <div className="bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-900/30 rounded-2xl p-4 mt-2 max-w-sm">
                <div className="flex items-center gap-2 mb-2 text-red-600 dark:text-red-500 font-bold">
                  <ShieldAlert className="h-5 w-5" /> Atenção com as palavras
                </div>
                <p className="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">
                  Nosso sistema identificou que a sua descrição pode conter <b>palavras de baixo calão, ofensas ou discurso inadequado</b>. <br/><br/>
                  Motivo: <i>{msg.extraData.errorText}</i>
                </p>
              </div>
            )}

            {msg.extraData?.type === 'review_options' && !msg.extraData.hideOptions && (
              <div className="flex flex-col gap-3 mt-3 w-full max-w-md animate-in zoom-in-95 duration-300">
                <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl overflow-hidden shadow-sm">
                  {/* Header */}
                  <div className="bg-zinc-100 dark:bg-zinc-800/80 p-3 border-b border-zinc-200 dark:border-zinc-700 flex items-center gap-2">
                    <Eye className="h-4 w-4 text-red-600" />
                    <h3 className="font-black text-sm text-zinc-800 dark:text-white">Resumo do Relato</h3>
                  </div>

                  {/* Body */}
                  <div className="p-4 flex flex-col gap-4">
                    {/* Cabeçalho do Post */}
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-zinc-100 dark:bg-zinc-800 border-2 border-red-100 dark:border-red-900/30 flex items-center justify-center flex-shrink-0">
                        <ShieldCheck className="h-5 w-5 text-red-600" />
                      </div>
                      <div>
                        <h4 className="font-bold text-zinc-900 dark:text-white leading-tight text-sm">
                          {userName || "Cidadão Anônimo"}
                        </h4>
                        <p className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 mt-0.5 flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          <span className="truncate max-w-[200px]">
                            {`${formLocation?.rua || "Endereço não informado"}${formLocation?.numero_referencia && formLocation.numero_referencia !== 'Sem número / Apenas a rua' ? ", " + formLocation.numero_referencia : ""} - ${
                              formLocation?.bairro === 'campo-grande' ? 'Campo Grande' :
                              formLocation?.bairro === 'inhoaiba' ? 'Inhoaíba' :
                              formLocation?.bairro === 'cosmos' ? 'Cosmos' :
                              formLocation?.bairro || "Bairro não informado"
                            }`}
                          </span>
                        </p>
                      </div>
                    </div>

                    {/* Descrição */}
                    {formDescription && formDescription.trim().length > 0 && (
                      <div className="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed font-medium bg-zinc-50 dark:bg-zinc-800/50 p-3 rounded-xl">
                        {formDescription}
                      </div>
                    )}

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5">
                      {formMacroCategory && (
                        <span className="bg-zinc-800 text-white dark:bg-zinc-200 dark:text-zinc-900 px-2 py-1 rounded text-[10px] font-black uppercase tracking-wider">
                          {typeof formMacroCategory === 'string' ? formMacroCategory : formMacroCategory.title}
                        </span>
                      )}
                      {formCategory && (
                        <span className="bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider">
                          {formCategory}
                        </span>
                      )}
                      {Array.isArray(formSeverity) && formSeverity.length > 0 && !formSeverity.includes("nenhum") && (
                        formSeverity.map(s => {
                          const colorMap = {
                            recente: "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 border border-blue-200 dark:border-blue-800/50",
                            abandono: "bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 border border-purple-200 dark:border-purple-800/50",
                            urgente: "bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-800/50",
                            grave: "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 border border-red-200 dark:border-red-800/50",
                          };
                          const labelMap = {
                            recente: "Problema Recente",
                            abandono: "Muito tempo abandonado",
                            urgente: "Urgente",
                            grave: "Risco Iminente",
                          };
                          return labelMap[s] ? (
                            <span key={s} className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider ${colorMap[s]}`}>
                              {labelMap[s]}
                            </span>
                          ) : null;
                        })
                      )}
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col gap-2">
                  <button 
                    onClick={() => handleReviewDecision('PUBLISH')}
                    className="bg-green-600 hover:bg-green-700 text-white font-extrabold py-3.5 px-4 rounded-xl text-sm transition-transform active:scale-95 flex items-center justify-center gap-2 shadow-md w-full"
                  >
                    <Check className="h-4 w-4" /> Confirmar e Publicar
                  </button>
                  <button 
                    onClick={() => handleReviewDecision('EDIT')}
                    className="bg-zinc-200 hover:bg-zinc-300 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-100 font-extrabold py-3 px-4 rounded-xl text-xs transition-transform active:scale-95 w-full"
                  >
                    ✏️ Ajustar algo no relato
                  </button>
                </div>
              </div>
            )}

            {msg.extraData?.type === 'review_edit_options' && !msg.extraData.hideOptions && (
              <div className="flex flex-col gap-2 mt-2 w-full max-w-sm">
                {[
                  { id: 'ENDERECO', label: '📍 Endereço' },
                  { id: 'CATEGORIA', label: '🗂️ Tema Principal (Macro-eixo)' },
                  { id: 'SEVERIDADE', label: '⚠️ Severidade' },
                  { id: 'DESCRICAO', label: '📝 Descrição' }
                ].map(opt => (
                  <button 
                    key={opt.id}
                    onClick={() => handleReviewEditDecision(opt.id)}
                    className="bg-white dark:bg-zinc-900 border-2 border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 text-zinc-800 dark:text-zinc-100 font-bold py-3 px-4 rounded-xl text-sm transition-all active:scale-95 text-left"
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            )}

            {msg.extraData?.type === 'publishing_progress' && !msg.extraData.hideOptions && (
              <div className="flex items-center gap-3 mt-3 bg-zinc-100 dark:bg-zinc-800 p-4 rounded-2xl w-full max-w-sm animate-in fade-in duration-300">
                <Loader2 className="h-5 w-5 text-red-600 animate-spin" />
                <span className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">Processando e enviando seu relato...</span>
              </div>
            )}

            {msg.extraData?.type === 'success_options' && !msg.extraData.hideOptions && (
              <div className="flex flex-col gap-3 mt-3 w-full max-w-sm animate-in zoom-in-95 duration-300">
                <button 
                  onClick={() => navigate(`/relato/${msg.extraData.reportId}`)}
                  className="bg-red-600 hover:bg-red-700 text-white font-extrabold py-4 px-4 rounded-2xl text-sm transition-all active:scale-95 flex items-center justify-center gap-2 shadow-lg shadow-red-600/20 w-full"
                >
                  <Eye className="h-5 w-5" /> Ver publicação
                </button>
                <div className="flex gap-2 w-full">
                  <button 
                    onClick={() => handleSuccessDecision('NEW_REPORT')}
                    className="flex-1 bg-white dark:bg-zinc-900 border-2 border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 text-zinc-800 dark:text-zinc-100 font-bold py-3 px-2 rounded-2xl text-[11px] sm:text-xs transition-all active:scale-95 flex flex-col items-center justify-center gap-1.5 text-center leading-tight"
                  >
                    <span className="text-xl">📝</span>
                    Fazer mais um relato
                  </button>
                  <button 
                    onClick={() => handleSuccessDecision('HOME')}
                    className="flex-1 bg-white dark:bg-zinc-900 border-2 border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 text-zinc-800 dark:text-zinc-100 font-bold py-3 px-2 rounded-2xl text-[11px] sm:text-xs transition-all active:scale-95 flex flex-col items-center justify-center gap-1.5 text-center leading-tight"
                  >
                    <span className="text-xl">🏠</span>
                    Voltar ao Início
                  </button>
                </div>
              </div>
            )}

            {msg.extraData?.type === 'anonymous_disclaimer' && (
              <div className="bg-zinc-100 dark:bg-zinc-800 p-4 rounded-3xl rounded-tl-sm text-sm sm:text-base text-zinc-800 dark:text-zinc-100 leading-relaxed font-semibold space-y-4">
                <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-2xl p-4 space-y-4 shadow-inner">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Shield className="h-5 w-5 text-red-600" />
                      <span className="font-bold">100% de Sigilo</span>
                    </div>
                    <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 font-medium">Nenhum dado pessoal seu, como nome ou telefone, será guardado. Sua identidade está completamente protegida no sistema.</p>
                  </div>
                  <div className="space-y-2 border-t border-zinc-100 dark:border-zinc-800 pt-3">
                    <div className="flex items-center gap-2">
                      <AlertCircle className="h-5 w-5 text-blue-600" />
                      <span className="font-bold">Poder de Gestão</span>
                    </div>
                    <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 font-medium">Mesmo sem conta, o seu relato vai alimentar o mapa dos gestores públicos. A sua voz tem força estatística.</p>
                  </div>
                  <div className="space-y-2 border-t border-zinc-100 dark:border-zinc-800 pt-3">
                    <div className="flex items-center gap-2">
                      <ShieldAlert className="h-5 w-5 text-amber-600" />
                      <span className="font-bold">Limitações</span>
                    </div>
                    <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 font-medium">Por segurança, relatos anônimos não podem ser acompanhados no seu painel e não permitem que você comente ou interaja com outras queixas.</p>
                  </div>
                </div>
                <div className="pt-2">
                  <p className="font-semibold text-zinc-900 dark:text-zinc-100">Para proteger a comunidade contra spam, o Modo Anônimo possui uma restrição importante: Você não poderá interagir, curtir ou comentar nos problemas reportados pelos seus vizinhos na plataforma. Você entende e concorda com estas restrições?</p>
                </div>
                {!msg.extraData.hideOptions && (
                  <div className="flex flex-col sm:flex-row gap-2 mt-2 w-full">
                    <button onClick={() => handleDisclaimerDecision(true)} className="flex-1 bg-red-600 hover:bg-red-700 text-white font-extrabold py-3.5 px-4 rounded-xl text-xs sm:text-sm transition-transform active:scale-95 shadow-md flex items-center justify-center gap-2">
                      <Check className="h-4 w-4" /> Concordo e Quero Continuar
                    </button>
                    <button onClick={() => handleDisclaimerDecision(false)} className="flex-1 bg-zinc-200 hover:bg-zinc-300 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-100 font-extrabold py-3.5 px-4 rounded-xl text-xs sm:text-sm transition-transform active:scale-95 flex items-center justify-center gap-2">
                      <X className="h-4 w-4" /> Não Concordo
                    </button>
                  </div>
                )}
              </div>
            )}

            {msg.extraData?.type === 'anonymous_declined' && (
              <div className="mt-4 flex justify-center">
                <button onClick={() => navigate('/reportar')} className="bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 font-extrabold py-3.5 px-6 rounded-xl text-sm sm:text-base transition-transform active:scale-95 shadow-lg flex items-center justify-center gap-2">
                  <ArrowLeft className="h-5 w-5" /> Voltar para a escolha de reporte
                </button>
              </div>
            )}

            <span className={`text-[10px] font-bold text-zinc-400 uppercase tracking-wide block ${msg.sender === 'user' ? 'mr-2' : 'ml-2'}`}>
              {msg.sender === 'user' ? `Você • ${msg.timestamp || 'Agora'}` : `Assistente IA • ${msg.timestamp || 'Agora'}`}
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
            <div className="bg-zinc-100 dark:bg-zinc-800 px-5 py-3.5 rounded-3xl rounded-tl-sm text-sm text-zinc-500 flex items-center gap-2 font-semibold">
              {chatStep === 'AUTH_CHECKING' ? 'Conectando e verificando credenciais' :
                chatStep === 'FETCHING_GPS' ? 'Buscando sua localização pelo GPS...' :
                  chatStep === 'FETCHING_LOCATION' ? 'Procurando endereço nas bases de dados...' : 'Analisando com IA'}
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
  );
}
