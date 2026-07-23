import React from 'react';

export default function AppPromo({ openInstallModal }) {
    return (
        <section id="aplicativo" className="pt-8 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
            <div
                className="bg-zinc-900 dark:bg-zinc-800 rounded-[3rem] p-8 md:p-16 flex flex-col lg:flex-row items-center justify-between gap-16 relative overflow-hidden shadow-2xl">

                <div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-red-600/20 blur-[100px] rounded-full pointer-events-none">
                </div>

                <div
                    className="relative z-10 lg:w-1/2 text-white text-center lg:text-left flex flex-col items-center lg:items-start">

                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight mb-6 leading-tight"
                        style={{ textWrap: 'balance' }}>
                        O poder de transformar, <span className="text-red-500">direto no seu bolso.</span>
                    </h2>

                    <p className="text-zinc-400 text-base sm:text-lg mb-10 max-w-md mx-auto lg:mx-0"
                        style={{ textWrap: 'balance' }}>
                        Leve o RadarTerritorial sempre com você! Adicione o <strong>Web App</strong> à sua tela inicial e
                        ganhe acesso instantâneo para registrar ocorrências e apontar problemas em tempo real, onde quer que
                        você esteja.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                        <button onClick={openInstallModal}
                            className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all transform hover:-translate-y-1 hover:shadow-lg hover:shadow-red-600/30 w-full sm:w-auto">
                            <i data-lucide="download-cloud" className="h-5 w-5"></i> Quero instalar!
                        </button>
                    </div>
                </div>

                <div className="relative z-10 lg:w-1/2 flex justify-center w-full">
                    <div className="absolute bottom-[-20px] w-48 h-8 bg-black/40 blur-xl rounded-full"></div>

                    <div
                        className="relative w-[280px] h-[580px] bg-zinc-950 border-[8px] border-zinc-800 rounded-[3rem] shadow-2xl overflow-hidden animate-float">

                        <div className="absolute top-2 left-1/2 -translate-x-1/2 w-28 h-7 bg-black rounded-full z-30"></div>

                        <div className="absolute inset-0 bg-[#F9FAFB] dark:bg-[#09090B] flex flex-col pt-14 px-5 pb-6">

                            <div className="flex justify-between items-center mb-8">
                                <div className="flex items-center gap-2">
                                    <div className="bg-red-600 p-1.5 rounded-full">
                                        <i data-lucide="map-pin" className="h-3 w-3 text-white"></i>
                                    </div>
                                    <div className="w-16 h-3 bg-zinc-200 dark:bg-zinc-700 rounded-full"></div>
                                </div>
                                <div
                                    className="w-8 h-8 rounded-full bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center">
                                    <i data-lucide="menu" className="h-4 w-4 text-zinc-500"></i>
                                </div>
                            </div>

                            <div className="w-3/4 h-5 bg-zinc-200 dark:bg-zinc-800 rounded-md mb-3"></div>
                            <div className="w-1/2 h-3 bg-zinc-200 dark:bg-zinc-800 rounded-md mb-8"></div>

                            <div className="space-y-4 flex-grow">
                                <div
                                    className="w-full bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-2xl p-4 shadow-sm flex items-start gap-3">
                                    <div
                                        className="w-10 h-10 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center flex-shrink-0">
                                        <i data-lucide="alert-triangle" className="h-4 w-4 text-red-500"></i>
                                    </div>
                                    <div className="flex-1 space-y-2 mt-1">
                                        <div className="w-full h-2.5 bg-zinc-200 dark:bg-zinc-700 rounded-sm"></div>
                                        <div className="w-2/3 h-2.5 bg-zinc-200 dark:bg-zinc-700 rounded-sm"></div>
                                    </div>
                                </div>

                                <div
                                    className="w-full bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-2xl p-4 shadow-sm flex items-start gap-3 opacity-60">
                                    <div
                                        className="w-10 h-10 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center flex-shrink-0">
                                        <i data-lucide="zap" className="h-4 w-4 text-zinc-400"></i>
                                    </div>
                                    <div className="flex-1 space-y-2 mt-1">
                                        <div className="w-full h-2.5 bg-zinc-200 dark:bg-zinc-700 rounded-sm"></div>
                                        <div className="w-1/2 h-2.5 bg-zinc-200 dark:bg-zinc-700 rounded-sm"></div>
                                    </div>
                                </div>
                            </div>

                            <div
                                className="absolute bottom-8 right-6 w-14 h-14 bg-red-600 rounded-full shadow-lg shadow-red-600/40 flex items-center justify-center animate-pulse">
                                <i data-lucide="plus" className="text-white h-6 w-6"></i>
                            </div>

                            <div
                                className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1 bg-zinc-300 dark:bg-zinc-700 rounded-full">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
