import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router';

export default function Header({ activeSection, isDarkMode, toggleTheme, openInstallModal }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navPillRef = useRef(null);

    const toggleAppMenu = () => setIsMenuOpen(!isMenuOpen);
    const closeAppMenu = () => setIsMenuOpen(false);

    const updateNavPill = (id) => {
        const activeLink = document.querySelector(`.nav-item[href="#${id}"]`);
        const navContainer = navPillRef.current ? navPillRef.current.parentElement : null;
        
        if (!activeLink || !navContainer || !navPillRef.current) return;

        const linkRect = activeLink.getBoundingClientRect();
        const containerRect = navContainer.getBoundingClientRect();

        const offsetLeft = linkRect.left - containerRect.left;
        const width = linkRect.width;

        navPillRef.current.style.width = width + 'px';
        navPillRef.current.style.transform = 'translateX(' + offsetLeft + 'px)';
        navPillRef.current.style.opacity = '1';
    };

    useEffect(() => {
        updateNavPill(activeSection);
        
        const handleResize = () => updateNavPill(activeSection);
        window.addEventListener('resize', handleResize);
        
        return () => window.removeEventListener('resize', handleResize);
    }, [activeSection]);

    return (
        <div className="fixed top-6 left-0 right-0 z-50 px-4 flex justify-center pointer-events-none">
            <header
                className="pointer-events-auto w-full max-w-5xl bg-white/70 dark:bg-zinc-900/70 backdrop-blur-xl border border-zinc-200 dark:border-zinc-800 rounded-full px-4 sm:px-6 py-3 flex justify-between items-center shadow-lg shadow-zinc-200/20 dark:shadow-black/40 transition-all duration-300">

                {/* Logo */}
                <div className="flex items-center gap-2 cursor-pointer group">
                    <div className="bg-red-600 p-2 rounded-full group-hover:scale-105 transition-transform">
                        <i data-lucide="map-pin" className="h-5 w-5 text-white"></i>
                    </div>
                    <span className="font-bold text-lg sm:text-xl tracking-tight">
                        Radar<span className="text-red-600">Territorial</span>
                    </span>
                </div>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center relative bg-zinc-100/50 dark:bg-zinc-800/50 p-1.5 rounded-full">
                    {/* Pílula de fundo animada (Efeito iOS) */}
                    <div id="nav-pill" ref={navPillRef}
                        className="absolute top-1.5 bottom-1.5 left-0 bg-white dark:bg-zinc-700 rounded-full shadow-sm transition-all duration-300 ease-out opacity-0 pointer-events-none"
                        style={{ width: '0px', transform: 'translateX(0px)' }}></div>

                    <a href="#inicio"
                        className={activeSection === "inicio" ? "nav-item relative z-10 text-sm font-semibold px-4 py-1.5 transition-colors duration-300 text-zinc-900 dark:text-white" : "nav-item relative z-10 text-sm font-semibold px-4 py-1.5 transition-colors duration-300 text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"}>Início</a>
                    <a href="#como-funciona"
                        className={activeSection === "como-funciona" ? "nav-item relative z-10 text-sm font-semibold px-4 py-1.5 transition-colors duration-300 text-zinc-900 dark:text-white" : "nav-item relative z-10 text-sm font-semibold px-4 py-1.5 transition-colors duration-300 text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"}>A Dinâmica</a>
                    <a href="#projetos-jcc"
                        className={activeSection === "projetos-jcc" ? "nav-item relative z-10 text-sm font-semibold px-4 py-1.5 transition-colors duration-300 text-zinc-900 dark:text-white" : "nav-item relative z-10 text-sm font-semibold px-4 py-1.5 transition-colors duration-300 text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"}>Ecossistema</a>
                    <a href="#dashboard"
                        className={activeSection === "dashboard" ? "nav-item relative z-10 text-sm font-semibold px-4 py-1.5 transition-colors duration-300 text-zinc-900 dark:text-white" : "nav-item relative z-10 text-sm font-semibold px-4 py-1.5 transition-colors duration-300 text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"}>Impacto</a>
                </nav>

                {/* Actions (Botoes de acao de acesso rapido e Menu Hamburguer) */}
                <div className="flex items-center gap-3">
                    {/* Botão de Ação Direta no Desktop */}
                    <Link to="/reportar"
                        className="hidden sm:flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-full text-sm font-bold transition-all shadow-md shadow-red-500/10 hover:shadow-red-500/20 active:scale-95 pointer-events-auto">
                        <span>Reportar</span>
                        <i data-lucide="plus" className="h-4 w-4"></i>
                    </Link>

                    <div className="relative flex items-center">
                        <button onClick={toggleAppMenu}
                            className="flex items-center justify-center w-10 h-10 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded-full transition-colors border border-zinc-200 dark:border-zinc-700 focus:outline-none pointer-events-auto">
                            <i data-lucide="menu" className="h-5 w-5 text-zinc-700 dark:text-zinc-300"></i>
                        </button>

                        {/* Dropdown Menu */}
                        <div id="app-menu-dropdown" className={`absolute right-0 top-full mt-3 w-64 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl shadow-xl shadow-zinc-200/20 dark:shadow-black/40 py-2 transition-all duration-200 origin-top-right transform z-50 ${isMenuOpen ? "opacity-100 scale-100 pointer-events-auto" : "opacity-0 scale-95 pointer-events-none"}`}>

                            {/* Links de Navegação (Visível apenas no Mobile) */}
                            <div className="md:hidden border-b border-zinc-100 dark:border-zinc-800 pb-2 mb-2 px-2">
                                <a href="#inicio" onClick={closeAppMenu}
                                    className="block px-4 py-2 text-sm font-semibold text-zinc-600 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800 rounded-lg transition-colors">Início</a>
                                <a href="#como-funciona" onClick={closeAppMenu}
                                    className="block px-4 py-2 text-sm font-semibold text-zinc-600 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800 rounded-lg transition-colors">A Dinâmica</a>
                                <a href="#projetos-jcc" onClick={closeAppMenu}
                                    className="block px-4 py-2 text-sm font-semibold text-zinc-600 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800 rounded-lg transition-colors">Ecossistema</a>
                                <a href="#dashboard" onClick={closeAppMenu}
                                    className="block px-4 py-2 text-sm font-semibold text-zinc-600 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800 rounded-lg transition-colors">Impacto</a>
                            </div>

                            {/* Opções Principais do App */}
                            <div className="px-2 space-y-1">
                                <Link to="/reportar"
                                    className="sm:hidden flex items-center gap-3 px-4 py-2.5 text-sm font-bold text-red-600 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-xl transition-colors">
                                    <i data-lucide="megaphone" className="h-4 w-4"></i> Reportar Problema
                                </Link>
                                <a href="./pages/EscolhaDeReportar/UsarConta/logar_v1.html"
                                    className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 hover:text-zinc-900 dark:hover:text-white rounded-xl transition-colors">
                                    <i data-lucide="log-in" className="h-4 w-4 text-zinc-400"></i> Entrar
                                </a>
                                <a href="./pages/Dashboard/v12.html"
                                    className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 hover:text-zinc-900 dark:hover:text-white rounded-xl transition-colors">
                                    <i data-lucide="layout-dashboard" className="h-4 w-4 text-zinc-400"></i> Ver Painel
                                </a>
                                <a href="./pages/Feed/NaoLogado/v1.html"
                                    className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 hover:text-zinc-900 dark:hover:text-white rounded-xl transition-colors">
                                    <i data-lucide="layers" className="h-4 w-4 text-zinc-400"></i> Ver Publicações
                                </a>
                            </div>

                            <div className="border-t border-zinc-100 dark:border-zinc-800 my-2"></div>

                            {/* Toggle de Tema */}
                            <div className="px-5 py-3 flex items-center justify-between group cursor-pointer"
                                onClick={toggleTheme}>
                                <span
                                    className="text-sm font-medium text-zinc-600 dark:text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-white transition-colors">Modo Escuro</span>

                                <button
                                    className="relative inline-flex h-6 w-11 items-center rounded-full bg-zinc-200 dark:bg-red-600 transition-colors focus:outline-none shadow-inner pointer-events-none">
                                    <span
                                        className="h-4 w-4 transform rounded-full bg-white shadow-sm transition-transform translate-x-1 dark:translate-x-6 flex items-center justify-center">
                                        <i data-lucide="sun" className="h-3 w-3 text-zinc-400 dark:hidden block"></i>
                                        <i data-lucide="moon" className="h-3 w-3 text-red-600 hidden dark:block"></i>
                                    </span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        </div>
    );
}
