import React from 'react';
import { Sparkles, Eye, EyeOff, ArrowRight } from 'lucide-react';

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
  isSubmitDisabled
}) {
  return (
    <div className="p-3 sm:p-4 bg-zinc-50 dark:bg-zinc-950 border-t border-zinc-100 dark:border-zinc-800/80 relative flex items-center gap-2">
      
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

      <div className="flex-1 relative flex items-center">
        <input
          type={inputType}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => {
            if (isSubmitDisabled && e.key === 'Enter') return;
            if (handleKeyPress) handleKeyPress(e);
          }}
          disabled={!isInputEnabled}
          placeholder={placeholderText}
          className="w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl pl-4 pr-12 py-3 sm:py-3.5 text-sm sm:text-base outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all placeholder-zinc-400 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
        />

        {showPasswordToggle && (
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute right-4 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 transition-colors"
          >
            {inputType === 'password' ? <Eye className="h-5 w-5" /> : <EyeOff className="h-5 w-5" />}
          </button>
        )}
      </div>

      <button
        onClick={sendUserMessage}
        disabled={!isInputEnabled || inputValue.trim() === '' || isSubmitDisabled}
        className="p-3 sm:p-3.5 bg-red-600 hover:bg-red-700 disabled:bg-zinc-400 disabled:cursor-not-allowed active:scale-95 text-white rounded-2xl transition-all duration-150 shadow-md shadow-red-600/20 flex items-center justify-center shrink-0"
      >
        <ArrowRight className="h-5 w-5" />
      </button>
    </div>
  );
}
