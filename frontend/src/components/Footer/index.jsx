import React, { useEffect } from 'react';
import { Link } from 'react-router';
import jccLogoImg from '../../assets/images/home/JCC - LOGO PRINCIPAL.png';
import naveLogoImg from '../../assets/images/home/Logo-Nave-CG.png';

export default function Footer() {
    useEffect(() => {
        const yearSpan = document.getElementById('current-year');
        if (yearSpan) yearSpan.textContent = new Date().getFullYear();
    }, []);

    return (
        <footer id="dashboard" className="mt-10 border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#09090B]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">

                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-12 items-start text-center md:text-left">

                    {/* Lado Esquerdo */}
                    <div className="flex flex-col items-center md:items-start">
                        <h2 className="text-4xl sm:text-5xl font-black tracking-tighter mb-6">
                            Pronto para <br className="hidden sm:block" />melhorar <br className="hidden sm:block" />
                            <span className="text-zinc-400">o seu bairro?</span>
                        </h2>
                        <Link to="/reportar"
                            className="bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 px-8 py-4 rounded-full font-bold text-lg hover:scale-105 transition-transform inline-flex items-center justify-center gap-2 shadow-lg shadow-zinc-900/20 dark:shadow-white/10 w-full sm:w-auto">
                            Começar Agora
                        </Link>
                    </div>

                    {/* Lado Direito */}
                    <div className="flex flex-col items-center md:items-end text-center md:text-right w-full">

                        <div className="w-full flex flex-col items-center md:items-end">
                            <p
                                className="font-black text-sm uppercase tracking-widest text-zinc-400 mb-6 flex items-center justify-center md:justify-end gap-2">
                                <i data-lucide="award" className="h-4 w-4"></i> Apoiado por
                            </p>

                            <div
                                className="flex flex-col sm:flex-row items-center md:items-center justify-center md:justify-end gap-6 lg:gap-8">
                                <a href="https://jovenscientistas.ciedseduca.org.br/" target="_blank"
                                    className="group relative flex items-center justify-center h-24 w-52 bg-white dark:bg-zinc-900 rounded-2xl shadow-sm border border-zinc-200 dark:border-zinc-800 transition-transform hover:scale-105 p-4">
                                    <img src={jccLogoImg} alt="Programa Jovens Cientistas Cariocas"
                                        className="relative z-10 h-full w-full object-contain" />
                                </a>

                                <div className="hidden sm:block h-12 w-px bg-zinc-200 dark:bg-zinc-800"></div>

                                <a href="https://www.navedoconhecimento.rio/" target="_blank"
                                    className="group relative flex items-center justify-center h-24 w-52 bg-white dark:bg-zinc-900 rounded-2xl shadow-sm border border-zinc-200 dark:border-zinc-800 transition-transform hover:scale-105 p-1">
                                    <img src={naveLogoImg} alt="Nave do Conhecimento de Campo Grande"
                                        className="relative z-10 h-full w-full object-contain scale-110" />
                                </a>
                            </div>
                        </div>

                        <div className="mt-12 w-full flex flex-col items-center md:items-end">
                            <p className="font-bold text-sm text-zinc-500 dark:text-zinc-400 mb-4">Siga o projeto nas redes</p>
                            <div className="flex items-center justify-center md:justify-end gap-4">
                                <a href="https://www.instagram.com/radarterritorial.oficial/" target="_blank"
                                    aria-label="Instagram"
                                    className="w-10 h-10 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-600 dark:text-zinc-400 hover:bg-gradient-to-tr hover:from-amber-500 hover:via-red-500 hover:to-fuchsia-500 hover:text-white dark:hover:text-white transition-all duration-300 hover:scale-110 shadow-sm">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
                                        fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                        strokeLinejoin="round" className="lucide lucide-instagram">
                                        <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                                        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                                        <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                                    </svg>
                                </a>
                                <a href="#" target="_blank" aria-label="Facebook"
                                    className="w-10 h-10 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-600 dark:text-zinc-400 hover:bg-blue-600 hover:text-white dark:hover:text-white transition-all duration-300 hover:scale-110 shadow-sm">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
                                        fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                        strokeLinejoin="round" className="lucide lucide-facebook">
                                        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </div>

                </div>

                <div
                    className="mt-20 pt-8 border-t border-zinc-200 dark:border-zinc-800 flex flex-col md:flex-row justify-between items-center gap-6 text-zinc-500 text-sm font-medium">

                    <div className="flex items-center gap-3 cursor-pointer group">
                        <div className="bg-red-600 p-2 rounded-full group-hover:scale-105 transition-transform">
                            <i data-lucide="map-pin" className="h-5 w-5 text-white"></i>
                        </div>
                        <span className="font-bold text-lg sm:text-xl tracking-tight text-zinc-900 dark:text-white">
                            Radar<span className="text-red-600">Territorial</span>
                        </span>
                        <span className="ml-1 text-zinc-500 dark:text-zinc-400">© <span id="current-year"></span></span>
                    </div>

                    <div className="flex flex-wrap justify-center gap-6 font-semibold text-zinc-600 dark:text-zinc-400">
                        <a href="./pages/TermosDeUso/Termos_v1.html"
                            className="hover:text-red-600 transition-colors">Privacidade e Termos de Uso</a>
                        <a href="https://github.com/AugustoBrunoo/RadarTerritorial"
                            className="hover:text-red-600 transition-colors flex items-center gap-1">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
                                stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                                className="lucide lucide-github">
                                <path
                                    d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                                <path d="M9 18c-4.51 2-5-2-7-2" />
                            </svg>
                            Código Aberto
                        </a>
                    </div>

                </div>
            </div>
        </footer>
    );
}
