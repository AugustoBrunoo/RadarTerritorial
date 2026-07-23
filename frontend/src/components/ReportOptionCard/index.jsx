import React from 'react';
import { Link } from 'react-router';
import { ArrowRight } from 'lucide-react';

export default function ReportOptionCard({ 
    to, 
    icon: Icon, 
    optionNumber, 
    title, 
    description, 
    variant = 'default' 
}) {
    if (variant === 'highlight') {
        return (
            <Link to={to} className="group text-left bg-zinc-900 dark:bg-zinc-800 border border-zinc-800 dark:border-zinc-700 rounded-[2.5rem] p-8 sm:p-10 hover:border-red-500/70 transition-all duration-500 hover:shadow-2xl hover:shadow-red-600/20 hover:-translate-y-2 flex flex-col justify-start relative overflow-hidden h-full">
                <div className="absolute top-0 right-0 -mt-10 -mr-10 w-48 h-48 bg-red-600/20 blur-3xl rounded-full opacity-50 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative z-10 w-16 h-16 bg-red-600 rounded-2xl flex items-center justify-center mb-8 transform group-hover:scale-110 transition-transform duration-500 shadow-lg shadow-red-600/30">
                    <Icon className="h-8 w-8 text-white" />
                </div>
                <span className="relative z-10 text-red-400 font-bold tracking-widest uppercase text-xs mb-3 block">{optionNumber}</span>
                <h3 className="relative z-10 text-3xl font-black text-white tracking-tight mb-2">{title}</h3>
                <p className="relative z-10 text-zinc-400 mt-4 leading-relaxed text-base">
                    {description}
                </p>
                <div className="relative z-10 mt-auto pt-8 w-full">
                    <div className="flex items-center justify-center gap-2 w-full bg-red-600 text-white group-hover:bg-white group-hover:text-red-600 py-4 rounded-xl font-bold transition-colors duration-300 shadow-lg shadow-red-600/20">
                        Selecionar <ArrowRight className="h-4 w-4" />
                    </div>
                </div>
            </Link>
        );
    }

    return (
        <Link to={to} className="group text-left bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-[2.5rem] p-8 sm:p-10 hover:border-red-500/50 dark:hover:border-red-500/50 transition-all duration-500 hover:shadow-2xl hover:shadow-zinc-200 dark:hover:shadow-black/50 hover:-translate-y-2 flex flex-col justify-start relative overflow-hidden h-full">
            <div className="w-16 h-16 bg-zinc-100 dark:bg-zinc-800 group-hover:bg-red-50 dark:group-hover:bg-red-900/20 rounded-2xl flex items-center justify-center mb-8 transition-colors duration-500">
                <Icon className="h-8 w-8 text-zinc-900 dark:text-white group-hover:text-red-600 transition-colors duration-500" />
            </div>
            <span className="text-red-600 dark:text-red-500 font-bold tracking-widest uppercase text-xs mb-3 block">{optionNumber}</span>
            <h3 className="text-3xl font-black text-zinc-900 dark:text-white tracking-tight mb-2">{title}</h3>
            <p className="text-zinc-500 dark:text-zinc-400 mt-4 leading-relaxed text-base">
                {description}
            </p>
            <div className="mt-auto pt-8 w-full">
                <div className="flex items-center justify-center gap-2 w-full bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white group-hover:bg-red-600 group-hover:text-white py-4 rounded-xl font-bold transition-colors duration-300">
                    Selecionar <ArrowRight className="h-4 w-4" />
                </div>
            </div>
        </Link>
    );
}
