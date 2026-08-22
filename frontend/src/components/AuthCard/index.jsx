import React from 'react';
import { Link } from 'react-router';
import { ArrowRight } from 'lucide-react';

export default function AuthCard({
  to,
  icon: Icon,
  title,
  description,
  buttonText,
  variant = 'light',
  className = ''
}) {
  const isDark = variant === 'dark';

  const containerClasses = isDark
    ? "bg-zinc-900 dark:bg-zinc-800 border border-zinc-800 dark:border-zinc-700 hover:border-red-500/70 hover:shadow-2xl hover:shadow-red-600/20"
    : "bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-red-500/50 dark:hover:border-red-500/50 hover:shadow-2xl hover:shadow-zinc-200 dark:hover:shadow-black/50";

  const iconWrapperClasses = isDark
    ? "bg-red-600 shadow-lg shadow-red-600/30 transform group-hover:scale-110"
    : "bg-zinc-100 dark:bg-zinc-800 group-hover:bg-red-50 dark:group-hover:bg-red-900/20";

  const iconClasses = isDark
    ? "text-white"
    : "text-zinc-900 dark:text-white group-hover:text-red-600";

  const titleClasses = isDark
    ? "text-white"
    : "text-zinc-900 dark:text-white";

  const descClasses = isDark
    ? "text-zinc-400"
    : "text-zinc-500 dark:text-zinc-400";

  const dividerClasses = isDark
    ? "border-zinc-700/50"
    : "border-zinc-100 dark:border-zinc-800/80";

  const buttonClasses = isDark
    ? "bg-red-600 text-white group-hover:bg-white group-hover:text-red-600 shadow-lg shadow-red-600/20"
    : "bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white group-hover:bg-red-600 group-hover:text-white";

  return (
    <Link
      to={to}
      className={`group text-left rounded-[2.5rem] p-8 sm:p-10 transition-all duration-500 hover:-translate-y-2 flex flex-col h-full relative overflow-hidden ${containerClasses} ${className}`}
    >
      {isDark && (
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-48 h-48 bg-red-600/20 blur-3xl rounded-full opacity-50 group-hover:opacity-100 transition-opacity duration-500"></div>
      )}

      <div className="flex justify-between items-start mb-8 relative z-10">
        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-500 ${iconWrapperClasses}`}>
          <Icon className={`h-7 w-7 ${iconClasses}`} />
        </div>
      </div>

      <h3 className={`relative z-10 text-3xl font-black tracking-tight mb-3 ${titleClasses}`}>
        {title}
      </h3>
      <p className={`relative z-10 leading-relaxed text-base ${descClasses}`}>
        {description}
      </p>

      <div className={`relative z-10 mt-8 pt-8 border-t w-full mt-auto ${dividerClasses}`}>
        <div className={`flex items-center justify-between gap-2 w-full px-6 py-4 rounded-xl font-bold transition-colors duration-300 ${buttonClasses}`}>
          <span>{buttonText}</span>
          <ArrowRight className="h-5 w-5 transform group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </Link>
  );
}
