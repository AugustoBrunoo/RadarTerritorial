import React from 'react';
import { Link } from 'react-router';
import { ArrowRight } from 'lucide-react';

export default function AdminActionCard({
  title,
  description,
  value,
  valueSuffix,
  icon: Icon,
  actionText,
  actionLink,
  colorClass = "text-red-600 bg-red-50 dark:bg-red-950/30 border-red-100 dark:border-red-900/30",
  btnClass = "bg-red-600 hover:bg-red-700 text-white dark:bg-red-600 dark:hover:bg-red-500",
  comingSoon = false
}) {
  return (
    <div className={`bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-sm flex flex-col md:flex-row gap-6 items-start md:items-center justify-between ${comingSoon ? 'opacity-70 grayscale' : ''}`}>
      <div className="flex items-start gap-4">
        <div className={`p-3 rounded-xl border flex-shrink-0 ${comingSoon ? 'text-zinc-500 bg-zinc-100 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700' : colorClass}`}>
          <Icon className="h-6 w-6" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-black text-zinc-900 dark:text-white">{title}</h3>
            {comingSoon && (
              <span className="flex items-center gap-1 text-[10px] font-black uppercase tracking-wider text-zinc-500 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700/60 px-2 py-0.5 rounded-full">
                Em breve
              </span>
            )}
          </div>
          <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400 mt-1 max-w-md">{description}</p>
        </div>
      </div>
      
      <div className="flex items-center gap-6 w-full md:w-auto">
        <div className="text-center">
          <span className="block text-2xl font-black text-zinc-900 dark:text-white">{comingSoon ? '--' : value}</span>
          <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">{valueSuffix}</span>
        </div>
        
        {comingSoon ? (
          <span className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm ml-auto md:ml-0 bg-zinc-100 text-zinc-400 dark:bg-zinc-800 dark:text-zinc-500 border border-zinc-200 dark:border-zinc-700 cursor-not-allowed">
            {actionText}
          </span>
        ) : (
          <Link to={actionLink} className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm transition-colors ml-auto md:ml-0 ${btnClass}`}>
            {actionText} <ArrowRight className="h-4 w-4" />
          </Link>
        )}
      </div>
    </div>
  );
}
