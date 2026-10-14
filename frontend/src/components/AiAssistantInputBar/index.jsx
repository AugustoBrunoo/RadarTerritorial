import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, Eye, EyeOff, ArrowRight, Info } from 'lucide-react';

export default function AiAssistantInputBar({
  inputType,
  inputValue,
  setInputValue,
  handleKeyPress,
  isInputEnabled,
  placeholderText,
  showPasswordToggle,
  togglePasswordVisibility,
  sendUserMessage,
  showSuggestions,
  chatStep,
  isSearching,
  suggestions,
  selectSuggestion,
  isSubmitDisabled,
  onOpenHowItWorks
}) {
  const [showTooltip, setShowTooltip] = useState(true);
  const textareaRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTooltip(false);
    }, 10000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!['START', 'LOCATION_START', 'AUTH_CHECKING'].includes(chatStep)) {
      setShowTooltip(false);
    }
  }, [chatStep]);

  // Auto-resize textarea height when input value changes
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      const scrollHeight = textareaRef.current.scrollHeight;
      textareaRef.current.style.height = `${Math.min(Math.max(scrollHeight, 38), 140)}px`;
    }
  }, [inputValue, showPasswordToggle]);

  return (
    <div className="p-1.5 sm:p-2.5 relative flex items-end gap-1 sm:gap-2 mb-2 sm:mb-4 mx-2 sm:mx-4 bg-white/70 dark:bg-zinc-900/70 backdrop-blur-xl border border-zinc-200 dark:border-zinc-800 rounded-3xl sm:rounded-[2rem] shadow-lg shadow-zinc-200/20 dark:shadow-black/40 transition-all">
      
      {/* SUGGESTIONS DROPDOWN */}
      {showSuggestions && chatStep === 'INPUT_LOCATION_MANUAL' && (
        <div className="absolute bottom-full left-0 w-full px-4 mb-2 z-10">
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col">
            {isSearching ? (
              <div className="p-4 text-sm text-zinc-500 font-medium flex items-center justify-center gap-2">
                <Sparkles className="h-4 w-4 animate-spin text-red-600" /> Buscando endereços...
              </div>
            ) : suggestions.length > 0 ? (
              suggestions.map((sug, idx) => (
                <button
                  key={sug.id || idx}
                  onClick={() => selectSuggestion(sug)}
                  disabled={sug.disabled}
                  className={`text-left p-4 text-sm font-semibold border-b border-zinc-100 dark:border-zinc-800 last:border-0 transition-colors ${sug.disabled ? 'text-zinc-500 bg-zinc-50 dark:bg-zinc-900/50 cursor-not-allowed' : 'text-zinc-800 dark:text-zinc-100 hover:bg-zinc-50 dark:hover:bg-zinc-800 active:bg-zinc-100 dark:active:bg-zinc-700 cursor-pointer flex items-center gap-2'}`}
                >
                  {sug.text}
                </button>
              ))
            ) : null}
          </div>
        </div>
      )}

      <div className="relative shrink-0 mb-0.5 sm:mb-1">
        <button
          type="button"
          onClick={onOpenHowItWorks}
          aria-label="Como funciona a IA?"
          title="Como funciona a IA?"
          className="p-2.5 sm:p-3 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 hover:bg-zinc-200/60 dark:hover:bg-zinc-800 rounded-full transition-colors focus:outline-none cursor-pointer"
        >
          <Info className="h-5 w-5" />
        </button>

        <div className={`absolute bottom-full left-0 sm:left-1/2 translate-x-0 sm:-translate-x-1/2 mb-2 w-max transition-all duration-700 ease-in-out pointer-events-none ${showTooltip ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}>
          <div className="bg-zinc-800 dark:bg-zinc-100 text-white dark:text-zinc-900 text-[11px] sm:text-xs font-bold py-1.5 px-3 rounded-xl shadow-xl relative flex items-center">
            Dúvidas? Como funciona?
            <div className="absolute -bottom-1 left-6 sm:left-1/2 -translate-x-1/2 border-4 border-transparent border-t-zinc-800 dark:border-t-zinc-100"></div>
          </div>
        </div>
      </div>

      <div className="flex-1 relative flex items-center min-w-0 py-0.5 sm:py-1">
        {showPasswordToggle ? (
          <div className="w-full relative flex items-center">
            <input
              type={inputType}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  if (isSubmitDisabled || !isInputEnabled) return;
                  if (handleKeyPress) handleKeyPress(e);
                  else sendUserMessage();
                }
              }}
              aria-label={inputType === 'password' ? 'Digite sua senha' : (placeholderText || 'Mensagem para o assistente')}
              disabled={!isInputEnabled}
              placeholder={placeholderText}
              className="w-full bg-transparent border-transparent pl-2 sm:pl-3 pr-10 py-2 sm:py-2.5 text-[13px] sm:text-base outline-none focus:ring-0 focus:border-transparent transition-all placeholder-zinc-400 font-medium disabled:opacity-50 disabled:cursor-not-allowed text-zinc-900 dark:text-zinc-100"
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              aria-label={inputType === 'password' ? 'Mostrar senha' : 'Ocultar senha'}
              className="absolute right-2 sm:right-3 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 transition-colors cursor-pointer"
            >
              {inputType === 'password' ? <Eye className="h-5 w-5" /> : <EyeOff className="h-5 w-5" />}
            </button>
          </div>
        ) : (
          <textarea
            ref={textareaRef}
            rows={1}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                if (isSubmitDisabled || !isInputEnabled || inputValue.trim() === '') return;
                if (handleKeyPress) handleKeyPress(e);
                else sendUserMessage();
                return;
              }
            }}
            aria-label={placeholderText || 'Escreva sua mensagem para o assistente'}
            disabled={!isInputEnabled}
            placeholder={placeholderText}
            className="w-full bg-transparent border-none pl-2 sm:pl-3 pr-2 py-2 sm:py-2.5 text-[13px] sm:text-base outline-none focus:ring-0 focus:border-transparent transition-all placeholder-zinc-400 font-medium disabled:opacity-50 disabled:cursor-not-allowed text-zinc-900 dark:text-zinc-100 resize-none max-h-36 overflow-y-auto break-words [overflow-wrap:anywhere] leading-relaxed"
            style={{ minHeight: '38px', height: '38px' }}
          />
        )}
      </div>

      <button
        onClick={sendUserMessage}
        disabled={!isInputEnabled || inputValue.trim() === '' || isSubmitDisabled}
        aria-label="Enviar mensagem"
        className="p-2.5 sm:p-3 bg-red-600 hover:bg-red-700 disabled:bg-zinc-400 dark:disabled:bg-zinc-700 disabled:cursor-not-allowed active:scale-95 text-white rounded-full transition-all duration-150 shadow-md shadow-red-600/20 flex items-center justify-center shrink-0 mb-0.5 sm:mb-1 cursor-pointer"
      >
        <ArrowRight className="h-5 w-5" />
      </button>
    </div>
  );
}
