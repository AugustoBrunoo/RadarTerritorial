import React from 'react';

const schemeMap = {
  red: {
    iconWrapper: "text-red-600 bg-red-50 dark:bg-red-950/50 border-red-100 dark:border-red-900/50",
    trend: "text-red-600 bg-red-50 dark:bg-red-950/50",
    highlightBorder: "border-red-200 dark:border-red-900/30",
    glow: "bg-red-600/10"
  },
  amber: {
    iconWrapper: "text-amber-600 bg-amber-50 dark:bg-amber-950/30 border-amber-100 dark:border-amber-900/30",
    trend: "text-amber-600 bg-amber-50 dark:bg-amber-950/30",
    highlightBorder: "border-amber-200 dark:border-amber-900/30",
    glow: "bg-amber-600/10"
  },
  blue: {
    iconWrapper: "text-blue-600 bg-blue-50 dark:bg-blue-950/30 border-blue-100 dark:border-blue-900/30",
    trend: "text-blue-600 bg-blue-50 dark:bg-blue-950/30",
    highlightBorder: "border-blue-200 dark:border-blue-900/30",
    glow: "bg-blue-600/10"
  },
  green: {
    iconWrapper: "text-green-600 bg-green-50 dark:bg-green-950/30 border-green-100 dark:border-green-900/30",
    trend: "text-green-600 bg-green-50 dark:bg-green-950/30",
    highlightBorder: "border-green-200 dark:border-green-900/30",
    glow: "bg-green-600/10"
  },
  zinc: {
    iconWrapper: "text-zinc-600 bg-zinc-50 dark:bg-zinc-950/30 border-zinc-100 dark:border-zinc-900/30",
    trend: "text-zinc-600 bg-zinc-50 dark:bg-zinc-950/30",
    highlightBorder: "border-zinc-200 dark:border-zinc-800/80",
    glow: "bg-zinc-500/10"
  }
};

export default function AdminKpiCard({ 
  title, 
  value, 
  icon: Icon, 
  colorScheme = "zinc",
  trendIcon: TrendIcon,
  trendValue,
  badge,
  comingSoon = false,
  highlight = false 
}) {
  const scheme = schemeMap[colorScheme] || schemeMap.zinc;
  const borderClass = highlight ? scheme.highlightBorder : "border-zinc-200 dark:border-zinc-800/80";

  return (
    <div className={`bg-white dark:bg-zinc-900 border rounded-2xl p-5 shadow-sm relative overflow-hidden group ${borderClass} ${comingSoon ? 'opacity-85' : ''}`}>
      {highlight && (
        <div className={`absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 blur-2xl rounded-full ${scheme.glow}`}></div>
      )}
      <div className="flex justify-between items-start mb-4 relative z-10">
        <div className={`p-2 rounded-xl border ${scheme.iconWrapper}`}>
          <Icon className="h-5 w-5" />
        </div>
        {comingSoon ? (
          <span className="flex items-center gap-1 text-[10px] font-black uppercase tracking-wider text-zinc-500 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700/60 px-2 py-0.5 rounded-full">
            Em breve
          </span>
        ) : badge ? (
          <span className="flex items-center gap-1 text-[10px] font-bold px-2 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300">
            {badge}
          </span>
        ) : TrendIcon && trendValue ? (
          <span className={`flex items-center gap-1 text-[10px] font-bold px-2 py-1 rounded-full ${scheme.trend}`}>
            <TrendIcon className="h-3 w-3" /> {trendValue}
          </span>
        ) : null}
      </div>
      <h3 className={`text-3xl font-black mb-1 relative z-10 ${comingSoon ? 'text-zinc-400 dark:text-zinc-600' : 'text-zinc-900 dark:text-white'}`}>
        {value}
      </h3>
      <p className="text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wide relative z-10">{title}</p>
    </div>
  );
}
