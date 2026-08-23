import React from 'react';
import { HelpCircle } from 'lucide-react';
import TooltipWrapper from '../TooltipWrapper';

export default function KpiCardOrgao({ 
    title, 
    value, 
    subtitle, 
    icon: Icon, 
    colorClass, 
    bgColorClass, 
    badgeText, 
    badgeColorClass,
    subtitleIcon: SubtitleIcon,
    tooltipText
}) {
    return (
        <div 
            className="bg-white dark:bg-zinc-900 rounded-3xl p-6 border border-zinc-200 dark:border-zinc-800 shadow-sm relative group hover:z-30 focus-within:z-30 transition-all"
            role="region"
            aria-label={`${title}: ${value}`}
        >
            <div className="absolute inset-0 rounded-3xl overflow-hidden pointer-events-none">
                <div className={`absolute top-0 right-0 w-28 h-28 ${bgColorClass.replace('bg-', 'bg-').replace('50', '500/10')} rounded-full blur-2xl -mr-8 -mt-8 transition-transform group-hover:scale-150`}></div>
            </div>
            
            <div className="flex justify-between items-start mb-4 relative z-10">
                <div className={`${bgColorClass} p-2.5 rounded-xl`}>
                    <Icon className={`h-5 w-5 ${colorClass}`} aria-hidden="true" />
                </div>
                <div className="flex items-center gap-1.5">
                    {tooltipText && (
                        <TooltipWrapper text={tooltipText}>
                            <button
                                type="button"
                                aria-label={`Informações explicativas sobre ${title}`}
                                className="p-1 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <HelpCircle className="h-4 w-4" />
                            </button>
                        </TooltipWrapper>
                    )}
                    <span className={`text-xs font-bold ${colorClass} ${bgColorClass} px-2 py-1 rounded-lg`}>{badgeText}</span>
                </div>
            </div>
            
            <h3 className="text-zinc-500 dark:text-zinc-400 text-xs font-bold uppercase tracking-wider mb-1">{title}</h3>
            <div className="flex items-baseline gap-2">
                <span className={`text-4xl font-black ${title === 'Não Respondidos (%)' ? colorClass : 'text-zinc-900 dark:text-white'} tracking-tighter`}>{value}</span>
                <span className={`text-xs ${SubtitleIcon ? 'font-bold' : 'font-medium'} ${badgeColorClass} flex items-center`}>
                    {SubtitleIcon && <SubtitleIcon className="h-3 w-3 mr-0.5" aria-hidden="true" />} {subtitle}
                </span>
            </div>
        </div>
    );
}
