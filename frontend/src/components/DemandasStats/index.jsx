import React from 'react';

export default function DemandasStats({ enviados, naoResolvidos, resolvidos }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 flex flex-col items-center justify-center shadow-sm text-center">
        <span className="text-4xl font-black text-zinc-900 dark:text-white mb-1">{enviados}</span>
        <span className="text-xs font-black uppercase tracking-widest text-zinc-500 dark:text-zinc-400">Enviados</span>
      </div>
      <div className="bg-amber-50 dark:bg-[#2A1F16] border border-amber-200 dark:border-[#4D3319] rounded-3xl p-6 flex flex-col items-center justify-center shadow-sm text-center">
        <span className="text-4xl font-black text-amber-600 dark:text-[#FFB347] mb-1">{naoResolvidos}</span>
        <span className="text-xs font-black uppercase tracking-widest text-amber-700 dark:text-[#E69933]">Não resolvidos</span>
      </div>
      <div className="bg-green-50 dark:bg-[#162A1D] border border-green-200 dark:border-[#1F4D29] rounded-3xl p-6 flex flex-col items-center justify-center shadow-sm text-center">
        <span className="text-4xl font-black text-green-600 dark:text-[#47FF75] mb-1">{resolvidos}</span>
        <span className="text-xs font-black uppercase tracking-widest text-green-700 dark:text-[#33E65C]">Resolvidos</span>
      </div>
    </div>
  );
}
