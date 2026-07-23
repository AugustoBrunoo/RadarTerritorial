import React from "react";

/**
 * Componente de opção de categoria de rádio estilizada.
 */
export default function RadioOption({ label, macroTitle, formCategory, formMacroCategory, onSelect }) {
  const isSelected = formCategory === label && formMacroCategory === macroTitle;

  return (
    <label className="cursor-pointer group">
      <input
        type="radio"
        name="categoria"
        className="peer sr-only"
        checked={isSelected}
        onChange={() => onSelect(label, macroTitle)}
      />
      <div
        className={`flex items-center justify-between p-3 rounded-xl border-2 transition-all shadow-sm
        ${
          isSelected
            ? "border-red-500 bg-red-50/50 dark:bg-red-900/20 text-red-700 dark:text-red-400"
            : "border-transparent bg-white dark:bg-zinc-900 hover:border-zinc-300 dark:hover:border-zinc-700 text-zinc-700 dark:text-zinc-300"
        }
      `}
      >
        <span className="font-medium text-sm leading-tight pr-2">{label}</span>
        <div
          className={`w-4 h-4 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-colors
          ${
            isSelected
              ? "border-red-500 bg-red-500"
              : "border-zinc-300 dark:border-zinc-600 group-hover:border-zinc-400"
          }
        `}
        >
          <div
            className={`w-1.5 h-1.5 rounded-full bg-white transition-opacity ${
              isSelected ? "opacity-100" : "opacity-0"
            }`}
          ></div>
        </div>
      </div>
    </label>
  );
}
