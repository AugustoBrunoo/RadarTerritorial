import React from 'react';
import { Link } from 'react-router';
import mapaCampoGrandeImg from '../../assets/images/home/mapa-campo-grande.png';

export default function Hero() {
    return (
        <section id="inicio"
            className="pt-40 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto min-h-[90vh] flex flex-col justify-center">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

                <div className="lg:col-span-7 flex flex-col items-start relative z-10">
                    <h1
                        className="text-[3.5rem] sm:text-[5rem] lg:text-[6rem] font-black tracking-tighter leading-[0.9] text-zinc-900 dark:text-white mb-6">
                        O SEU <br />
                        BAIRRO <br />
                        <span className="text-red-600 flex items-center gap-4">
                            NO RADAR.
                            <span className="hidden md:block h-3 flex-grow bg-red-600 mt-4 rounded-full"></span>
                        </span>
                    </h1>

                    <p
                        className="text-lg sm:text-xl text-zinc-600 dark:text-zinc-400 max-w-xl leading-relaxed mb-10 font-medium">
                        Aponte problemas no seu bairro diretamente para a gestão urbana, sem burocracia. Um canal rápido,
                        inteligente apoiado pela Nave do Conhecimento, com anonimato garantido se você preferir.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                        <Link to="/reportar"
                            className="flex-1 sm:flex-none flex justify-between items-center gap-6 bg-red-600 hover:bg-red-700 text-white px-8 py-5 rounded-2xl text-lg font-bold transition-transform hover:-translate-y-1">
                            <span>Reportar Ocorrência</span>
                            <i data-lucide="arrow-up-right" className="h-5 w-5 opacity-70"></i>
                        </Link>
                        <a href="./pages/Dashboard/v12.html"
                            className="flex-1 sm:flex-none flex justify-between items-center gap-6 bg-zinc-200 hover:bg-zinc-300 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-900 dark:text-white px-8 py-5 rounded-2xl text-lg font-bold transition-transform hover:-translate-y-1">
                            <span className="flex items-center gap-2">
                                <i data-lucide="bar-chart-3" className="h-4 w-4"></i>
                                Ver painel público
                            </span>
                        </a>
                    </div>
                </div>

                <div
                    className="lg:col-span-5 relative w-full h-[350px] sm:h-[450px] lg:h-[600px] flex items-center justify-center mt-10 lg:mt-0">
                    <div
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-red-600/10 dark:bg-red-900/20 blur-[80px] rounded-full pointer-events-none">
                    </div>
                    <img src={mapaCampoGrandeImg} alt="Mapa da região de Campo Grande, Cosmos e Inhoaíba"
                        className="relative z-10 w-full max-w-[320px] sm:max-w-[400px] lg:max-w-[480px] h-auto object-contain drop-shadow-2xl animate-float transition-transform duration-500 hover:scale-[1.03]" />
                </div>

            </div>
        </section>
    );
}
