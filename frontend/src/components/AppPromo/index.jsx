import React from 'react';
import { DownloadCloud, MapPin, Menu, AlertTriangle, Zap, Plus } from 'lucide-react';

export default function AppPromo({ openInstallModal }) {
    return (
        <section id="aplicativo" className="pt-4 pb-12 sm:pt-6 sm:pb-16 lg:pt-8 lg:pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
            <div
                className="bg-zinc-900 dark:bg-zinc-800 rounded-[2.25rem] sm:rounded-[2.75rem] lg:rounded-[3rem] p-6 sm:p-10 lg:p-12 flex flex-col lg:flex-row items-center justify-between gap-8 sm:gap-10 lg:gap-12 relative overflow-hidden shadow-2xl border border-zinc-800/80 dark:border-zinc-700/50">

                <div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] sm:w-[480px] lg:w-[550px] h-[320px] sm:h-[480px] lg:h-[550px] bg-red-600/20 blur-[80px] sm:blur-[100px] rounded-full pointer-events-none">
                </div>

                <div
                    className="relative z-10 lg:w-1/2 text-white text-center lg:text-left flex flex-col items-center lg:items-start">

                    <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-tight mb-4 sm:mb-6 leading-tight"
                        style={{ textWrap: 'balance' }}>
                        O poder de transformar, <span className="text-red-500">direto no seu bolso.</span>
                    </h2>

                    <p className="text-zinc-400 text-sm sm:text-base lg:text-lg mb-6 sm:mb-8 lg:mb-10 max-w-md mx-auto lg:mx-0"
                        style={{ textWrap: 'balance' }}>
                        Leve o RadarTerritorial sempre com você! Adicione o <strong>Web App</strong> à sua tela inicial e
                        ganhe acesso instantâneo para registrar ocorrências e apontar problemas em tempo real, onde quer que
                        você esteja.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                        <button onClick={openInstallModal}
                            className="bg-red-600 hover:bg-red-700 text-white px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all transform hover:-translate-y-1 hover:shadow-lg hover:shadow-red-600/30 w-full sm:w-auto text-sm sm:text-base">
                            <DownloadCloud className="h-5 w-5" /> Quero instalar!
                        </button>
                    </div>
                </div>

                <div className="relative z-10 lg:w-1/2 flex justify-center w-full my-2 sm:my-4 lg:my-0">
                    {/* Sombra dinâmica sincronizada com a levitação */}
                    <div className="absolute -bottom-4 sm:-bottom-5 lg:-bottom-6 w-36 sm:w-44 lg:w-48 h-5 sm:h-6 lg:h-7 bg-black/50 dark:bg-black/70 blur-md sm:blur-lg rounded-full animate-phone-shadow pointer-events-none"></div>

                    {/* Frame do Smartphone com escala responsiva elegante */}
                    <div
                        className="relative w-[200px] sm:w-[225px] lg:w-[245px] h-[390px] sm:h-[440px] lg:h-[480px] bg-zinc-950 border-[5px] sm:border-[6px] lg:border-[7px] border-zinc-800 dark:border-zinc-700 rounded-[2.25rem] sm:rounded-[2.5rem] lg:rounded-[2.75rem] shadow-2xl overflow-hidden animate-phone-float">

                        {/* Ilha dinâmica / Notch */}
                        <div className="absolute top-1.5 sm:top-2 left-1/2 -translate-x-1/2 w-20 sm:w-24 lg:w-26 h-4 sm:h-5 lg:h-5.5 bg-black rounded-full z-30 flex items-center justify-end pr-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-zinc-900"></div>
                        </div>

                        {/* Reflexo de vidro suave (efeito premium) */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/10 pointer-events-none z-20"></div>

                        {/* Conteúdo da Tela do Smartphone */}
                        <div className="absolute inset-0 bg-[#F9FAFB] dark:bg-[#09090B] flex flex-col pt-9 sm:pt-11 lg:pt-12 px-3.5 sm:px-4 lg:px-4.5 pb-4 sm:pb-5 select-none">

                            {/* Top Bar no App */}
                            <div className="flex justify-between items-center mb-4 sm:mb-5 lg:mb-6">
                                <div className="flex items-center gap-1.5 sm:gap-2">
                                    <div className="bg-red-600 p-1 rounded-full">
                                        <MapPin className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-white" />
                                    </div>
                                    <div className="w-12 sm:w-16 h-2 sm:h-2.5 bg-zinc-200 dark:bg-zinc-700 rounded-full"></div>
                                </div>
                                <div
                                    className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center">
                                    <Menu className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-zinc-500" />
                                </div>
                            </div>

                            {/* Linhas de Título */}
                            <div className="w-3/4 h-3 sm:h-3.5 lg:h-4 bg-zinc-200 dark:bg-zinc-800 rounded-md mb-1.5 sm:mb-2"></div>
                            <div className="w-1/2 h-2 sm:h-2.5 bg-zinc-200 dark:bg-zinc-800 rounded-md mb-3 sm:mb-4 lg:mb-5"></div>

                            {/* Cards de Ocorrência Simulados */}
                            <div className="space-y-2.5 sm:space-y-3 flex-grow">
                                <div
                                    className="w-full bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-xl sm:rounded-2xl p-2.5 sm:p-3 shadow-sm flex items-start gap-2.5">
                                    <div
                                        className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-red-100 dark:bg-red-900/30 flex items-center justify-center flex-shrink-0">
                                        <AlertTriangle className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-red-500" />
                                    </div>
                                    <div className="flex-1 space-y-1.5 mt-0.5">
                                        <div className="w-full h-1.5 sm:h-2 bg-zinc-200 dark:bg-zinc-700 rounded-sm"></div>
                                        <div className="w-2/3 h-1.5 sm:h-2 bg-zinc-200 dark:bg-zinc-700 rounded-sm"></div>
                                    </div>
                                </div>

                                <div
                                    className="w-full bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-xl sm:rounded-2xl p-2.5 sm:p-3 shadow-sm flex items-start gap-2.5 opacity-60">
                                    <div
                                        className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center flex-shrink-0">
                                        <Zap className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-zinc-400" />
                                    </div>
                                    <div className="flex-1 space-y-1.5 mt-0.5">
                                        <div className="w-full h-1.5 sm:h-2 bg-zinc-200 dark:bg-zinc-700 rounded-sm"></div>
                                        <div className="w-1/2 h-1.5 sm:h-2 bg-zinc-200 dark:bg-zinc-700 rounded-sm"></div>
                                    </div>
                                </div>
                            </div>

                            {/* Botão de Ação Flutuante (FAB) */}
                            <div
                                className="absolute bottom-4 right-3.5 sm:bottom-5 sm:right-4 lg:bottom-6 lg:right-4.5 w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 bg-red-600 rounded-full shadow-lg shadow-red-600/40 flex items-center justify-center animate-pulse z-10">
                                <Plus className="text-white h-4 w-4 sm:h-5 sm:w-5" />
                            </div>

                            {/* Barra Inferior (Home Indicator) */}
                            <div
                                className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-16 sm:w-20 lg:w-24 h-1 bg-zinc-300 dark:bg-zinc-700 rounded-full">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
