import React from 'react';
import { Link } from 'react-router';
import { MapPin, ArrowLeft } from 'lucide-react';

export default function SimpleHeader({ backLink = "/" }) {
    return (
        <div className="fixed top-6 left-0 right-0 z-50 px-4 flex justify-center pointer-events-none">
            <header className="pointer-events-auto w-full max-w-5xl bg-white/70 dark:bg-zinc-900/70 backdrop-blur-xl border border-zinc-200 dark:border-zinc-800 rounded-full px-4 sm:px-6 py-3 flex justify-between items-center shadow-lg shadow-zinc-200/20 dark:shadow-black/40 transition-all duration-300">
                <Link to="/" className="flex items-center gap-2 cursor-pointer group">
                    <div className="bg-red-600 p-2 rounded-full group-hover:scale-105 transition-transform">
                        <MapPin className="h-5 w-5 text-white" />
                    </div>
                    <span className="font-bold text-lg sm:text-xl tracking-tight text-zinc-900 dark:text-white">
                        Radar<span className="text-red-600">Territorial</span>
                    </span>
                </Link>

                <div className="flex items-center gap-3">
                    <Link to={backLink} className="flex items-center gap-2 bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white px-5 py-2.5 rounded-full text-sm font-bold transition-colors">
                        <ArrowLeft className="h-4 w-4" />
                        <span className="hidden sm:inline">Voltar</span>
                    </Link>
                </div>
            </header>
        </div>
    );
}
