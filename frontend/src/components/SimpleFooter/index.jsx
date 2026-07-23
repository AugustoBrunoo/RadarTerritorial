import React from 'react';
import { Link } from 'react-router';
import { MapPin } from 'lucide-react';

export default function SimpleFooter() {
    return (
        <footer className="border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#09090B] mt-auto">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-zinc-500 text-sm font-medium">
                <div className="flex items-center gap-3">
                    <MapPin className="h-4 w-4 text-red-600" />
                    <span className="text-zinc-900 dark:text-white font-bold tracking-tight">Radar<span className="text-red-600">Territorial</span></span>
                    <span>© {new Date().getFullYear()}</span>
                </div>
                <div className="flex gap-6 font-semibold text-zinc-600 dark:text-zinc-400">
                    <Link to="/termos" className="hover:text-red-600 transition-colors">Privacidade e Termos de Uso</Link>
                </div>
            </div>
        </footer>
    );
}
