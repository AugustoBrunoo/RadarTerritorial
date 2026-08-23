import React from 'react';

const TooltipWrapper = ({ children, text, posClass = "tooltip-bottom-left" }) => {
  // Classes de posicionamento e da seta indicadora
  let positionClasses = "top-full mt-2.5 right-0";
  let arrowClasses = "-top-1.5 right-3 border-t border-l";

  if (posClass === "tooltip-bottom-right" || posClass === "bottom-right") {
    positionClasses = "top-full mt-2.5 left-0";
    arrowClasses = "-top-1.5 left-3 border-t border-l";
  } else if (posClass === "tooltip-bottom-center" || posClass === "bottom-center" || posClass === "bottom") {
    positionClasses = "top-full mt-2.5 left-1/2 -translate-x-1/2";
    arrowClasses = "-top-1.5 left-1/2 -translate-x-1/2 border-t border-l";
  } else if (posClass === "tooltip-top-left" || posClass === "top-left") {
    positionClasses = "bottom-full mb-2.5 right-0";
    arrowClasses = "-bottom-1.5 right-3 border-b border-r";
  } else if (posClass === "tooltip-top-right" || posClass === "top-right") {
    positionClasses = "bottom-full mb-2.5 left-0";
    arrowClasses = "-bottom-1.5 left-3 border-b border-r";
  } else if (posClass === "tooltip-top-center" || posClass === "top-center" || posClass === "top") {
    positionClasses = "bottom-full mb-2.5 left-1/2 -translate-x-1/2";
    arrowClasses = "-bottom-1.5 left-1/2 -translate-x-1/2 border-b border-r";
  }

  return (
    <div className="relative inline-flex items-center group">
      {children}
      <div 
        role="tooltip"
        className={`absolute z-[999] opacity-0 invisible group-hover:opacity-100 group-hover:visible group-focus-within:opacity-100 group-focus-within:visible pointer-events-none transition-all duration-150 ease-out transform scale-95 group-hover:scale-100 group-focus-within:scale-100 w-64 max-w-[calc(100vw-3rem)] bg-zinc-900 text-zinc-100 dark:bg-zinc-800 dark:text-zinc-100 text-xs leading-relaxed font-normal p-3 rounded-2xl shadow-2xl border border-zinc-700/80 dark:border-zinc-600/80 ${positionClasses}`}
      >
        {/* Seta indicadora com borda sutil */}
        <div 
          className={`absolute w-3 h-3 bg-zinc-900 dark:bg-zinc-800 border-zinc-700/80 dark:border-zinc-600/80 rotate-45 pointer-events-none ${arrowClasses}`}
          aria-hidden="true"
        />
        <div className="relative z-10">
          {text}
        </div>
      </div>
    </div>
  );
};

export default TooltipWrapper;
