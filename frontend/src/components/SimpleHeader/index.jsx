import React from 'react';
import { Link, useNavigate } from 'react-router';
import { MapPin, ArrowLeft } from 'lucide-react';
import { safeNavigateBack } from '../../utils/navigation';

export default function SimpleHeader({ backLink = "/", onLogoClick, onBackClick }) {
    const navigate = useNavigate();

    const handleBack = (e) => {
        e.preventDefault();
        if (onBackClick) {
            onBackClick(e);
        } else if (backLink === -1 || backLink === '-1') {
            safeNavigateBack(navigate, "/");
        } else {
            navigate(backLink || "/");
        }
    };

    const handleLogoClick = (e) => {
        if (onLogoClick) {
            e.preventDefault();
            onLogoClick(e);
        }
    };

    return (
        <div className="fixed top-3 sm:top-6 left-0 right-0 z-50 px-2.5 sm:px-4 flex justify-center pointer-events-none">
            <header className="pointer-events-auto w-full max-w-5xl bg-white/70 dark:bg-zinc-900/70 backdrop-blur-xl border border-zinc-200 dark:border-zinc-800 rounded-full px-3 sm:px-6 py-2 sm:py-3 flex justify-between items-center shadow-lg shadow-zinc-200/20 dark:shadow-black/40 transition-all duration-300 relative min-h-[54px] sm:min-h-[66px]">
                <Link
                    to="/"
                    onClick={handleLogoClick}
                    className="flex items-center gap-1.5 sm:gap-2 cursor-pointer group min-w-0 shrink"
                >
                    <div className="bg-red-600 p-1.5 sm:p-2 rounded-full group-hover:scale-105 transition-transform shrink-0">
                        <MapPin className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                    </div>
                    <span className="font-bold text-[18px] sm:text-[20px] md:text-xl tracking-tight text-zinc-900 dark:text-white truncate">
                        Radar<span className="text-red-600">Territorial</span>
                    </span>
                </Link>

                <div className="flex items-center gap-2 sm:gap-3 shrink-0">
                    <button
                        onClick={handleBack}
                        aria-label="Voltar para a página anterior"
                        className="flex items-center justify-center gap-1.5 sm:gap-2 w-9 h-9 sm:w-auto sm:h-10 sm:px-5 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white rounded-full text-xs sm:text-sm font-bold transition-all duration-300 border border-zinc-200 dark:border-zinc-700 cursor-pointer shrink-0 active:scale-95 shadow-sm"
                    >
                        <ArrowLeft className="h-4 w-4 sm:h-4 sm:w-4 shrink-0" />
                        <span className="hidden sm:inline">Voltar</span>
                    </button>
                </div>
            </header>
        </div>
    );
}
