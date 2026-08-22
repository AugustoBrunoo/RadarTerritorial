import React from 'react';

const TooltipWrapper = ({ children, text, posClass = "tooltip-bottom-left" }) => (
  <div className="relative inline-block group">
    {children}
    <span 
      role="tooltip"
      className={`absolute z-[100] opacity-0 invisible group-hover:opacity-100 group-hover:visible group-focus-within:opacity-100 group-focus-within:visible pointer-events-none transition-opacity duration-150 ease-in-out w-56 bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 text-[11px] font-medium p-2.5 rounded-xl shadow-xl border border-zinc-700 dark:border-zinc-200 ${posClass === "tooltip-bottom-left" ? "top-[130%] right-0" : "top-[130%] left-0"}`}
    >
      {text}
    </span>
  </div>
);

export default TooltipWrapper;
