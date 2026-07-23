import React from "react";
import { ChevronDown } from "lucide-react";
import RadioOption from "../RadioOption";

/**
 * Componente de Acordeão para os Macro Eixos da Categoria.
 */
export default function MacroAccordion({
  id,
  title,
  icon: Icon,
  iconColorClass,
  options,
  openAccordions,
  toggleAccordion,
  formCategory,
  formMacroCategory,
  handleCategorySelect,
}) {
  const isOpen = openAccordions[id];
  const isSelected = formMacroCategory === title;

  return (
    <div className={`border rounded-2xl overflow-hidden transition-all ${
      isSelected 
        ? "border-red-200 dark:border-red-900/30 bg-red-50/50 dark:bg-red-900/10 shadow-sm shadow-red-100 dark:shadow-red-900/20" 
        : "border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950/50"
    }`}>
      <button
        type="button"
        onClick={() => toggleAccordion(id)}
        className="w-full flex items-center justify-between p-4 focus:outline-none hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors"
      >
        <div className="flex items-center gap-3">
          <Icon className={`h-5 w-5 ${iconColorClass}`} />
          <span className="font-bold text-zinc-800 dark:text-zinc-200 text-left">
            {title}
          </span>
        </div>
        <ChevronDown
          className={`h-5 w-5 text-zinc-400 accordion-icon transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      <div
        id={id}
        className={`accordion-grid ${isOpen ? "open" : ""}`}
      >
        <div className="accordion-inner">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2 px-4 pb-4">
            {options.map((opt) => (
              <RadioOption
                key={`${title}-${opt}`}
                label={opt}
                macroTitle={title}
                formCategory={formCategory}
                formMacroCategory={formMacroCategory}
                onSelect={handleCategorySelect}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
