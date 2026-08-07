import React from 'react';
import { Link } from 'react-router';
import { HardHat, ArrowLeft, Wrench, Sparkles } from 'lucide-react';
import SimpleHeader from '../../components/SimpleHeader';
import SimpleFooter from '../../components/SimpleFooter';

export default function EmConstrucao() {
    return (
        <div className="min-h-screen bg-[#F9FAFB] dark:bg-[#09090B] flex flex-col font-sans transition-colors duration-500 ease-in-out relative overflow-hidden text-zinc-900 dark:text-zinc-50">
            <SimpleHeader />
            
            {/* Background elements */}
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-red-600/10 dark:bg-red-600/5 blur-[120px] pointer-events-none" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-blue-600/10 dark:bg-blue-600/5 blur-[120px] pointer-events-none" />

            <main className="flex-grow flex flex-col items-center justify-center px-4 sm:px-6 z-10 relative pt-32 pb-16">
                <div className="max-w-2xl w-full text-center space-y-10 animate-in slide-in-from-bottom-8 duration-700">
                    
                    {/* Icon Container */}
                    <div className="relative inline-flex items-center justify-center">
                        <div className="absolute inset-0 bg-red-100 dark:bg-red-900/30 rounded-full blur-xl scale-150 animate-pulse" />
                        <div className="relative bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-6 rounded-3xl shadow-xl shadow-red-900/5">
                            <HardHat className="w-16 h-16 text-red-600 dark:text-red-500" />
                            <Sparkles className="w-6 h-6 text-amber-500 absolute -top-2 -right-2 animate-bounce-slight" />
                            <Wrench className="w-6 h-6 text-zinc-400 absolute -bottom-2 -left-2 rotate-12" />
                        </div>
                    </div>

                    {/* Text Content */}
                    <div className="space-y-4">
                        <h1 className="text-4xl sm:text-6xl font-black tracking-tight">
                            Página em <br className="sm:hidden" />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-amber-500">Construção</span>
                        </h1>
                        <p className="text-lg sm:text-xl text-zinc-600 dark:text-zinc-400 max-w-xl mx-auto leading-relaxed font-medium">
                            Nossa equipe de desenvolvedores está trabalhando duro para trazer novidades incríveis para você. Em breve, esta funcionalidade estará disponível!
                        </p>
                    </div>

                    {/* Actions */}
                    <div className="pt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link to="/" className="group flex items-center justify-center gap-2 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 px-8 py-4 rounded-full font-bold text-lg hover:scale-105 transition-transform shadow-lg shadow-zinc-900/20 dark:shadow-white/10 w-full sm:w-auto">
                            <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
                            Voltar para o Início
                        </Link>
                    </div>
                </div>
            </main>

            <SimpleFooter />
        </div>
    );
}
