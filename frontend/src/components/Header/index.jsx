import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router';
import { MapPin, Plus, Menu, X, Megaphone, LogIn, LayoutDashboard, Layers, Sun, Moon } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

export default function Header({ activeSection, isDarkMode, toggleTheme, openInstallModal }) {
    const { user, profile } = useAuth();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navPillRef = useRef(null);
    const mobileNavPillRef = useRef(null);

    const userName = profile?.nome_completo || user?.user_metadata?.nome_completo || user?.email?.split('@')[0] || 'Cidadão';
    const userInitials = (() => {
        if (!userName) return 'RT';
        const parts = userName.trim().split(' ');
        if (parts.length > 1) {
            return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
        }
        return userName.substring(0, 2).toUpperCase();
    })();

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

    const updateMobileNavPill = (id) => {
        if (!mobileNavPillRef.current) return;
        const targetId = id || 'inicio';
        const activeLink = document.querySelector(`.mobile-nav-item[data-section="${targetId}"]`);

        if (!activeLink) {
            mobileNavPillRef.current.style.opacity = '0';
            return;
        }

        const offsetTop = activeLink.offsetTop;
        const height = activeLink.offsetHeight;

        mobileNavPillRef.current.style.top = `${offsetTop}px`;
        mobileNavPillRef.current.style.height = `${height}px`;
        mobileNavPillRef.current.style.opacity = '1';
    };

    useEffect(() => {
        updateNavPill(activeSection);

        const handleResize = () => {
            updateNavPill(activeSection);
            if (isMenuOpen) {
                updateMobileNavPill(activeSection);
            }
        };
        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, [activeSection, isMenuOpen]);

    useEffect(() => {
        if (isMenuOpen) {
            updateMobileNavPill(activeSection);
            const raf = requestAnimationFrame(() => {
                updateMobileNavPill(activeSection);
            });
            return () => cancelAnimationFrame(raf);
        }
    }, [activeSection, isMenuOpen]);

    const mobileNavSections = [
        { id: 'inicio', label: 'Início', href: '#inicio' },
        { id: 'como-funciona', label: 'A Dinâmica', href: '#como-funciona' },
        { id: 'dashboard', label: 'Impacto', href: '#dashboard' }
    ];

    return (
        <div className="fixed top-3 sm:top-6 left-0 right-0 z-50 px-2.5 sm:px-4 flex justify-center pointer-events-none">
            <header
                className="pointer-events-auto w-full max-w-5xl bg-white/70 dark:bg-zinc-900/70 backdrop-blur-xl border border-zinc-200 dark:border-zinc-800 rounded-full px-3 sm:px-6 py-2 sm:py-3 flex justify-between items-center shadow-lg shadow-zinc-200/20 dark:shadow-black/40 transition-all duration-300 relative min-h-[54px] sm:min-h-[66px]">

                {/* Logo */}
                <Link
                    to="/"
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    className="flex items-center gap-1.5 sm:gap-2 cursor-pointer group min-w-0 shrink"
                >
                    <div className="bg-red-600 p-1.5 sm:p-2 rounded-full group-hover:scale-105 transition-transform shrink-0">
                        <MapPin className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                    </div>
                    <span className="font-bold text-[18px] sm:text-[20px] md:text-xl tracking-tight text-zinc-900 dark:text-white truncate">
                        Radar<span className="text-red-600">Territorial</span>
                    </span>
                </Link>

                {/* Desktop Nav */}
                <nav aria-label="Navegação principal" className="hidden md:flex items-center relative bg-zinc-100/50 dark:bg-zinc-800/50 p-1.5 rounded-full">
                    {/* Pílula de fundo animada (Efeito iOS) */}
                    <div id="nav-pill" ref={navPillRef}
                        className="absolute top-1.5 bottom-1.5 left-0 bg-white dark:bg-zinc-700 rounded-full shadow-sm transition-all duration-300 ease-out opacity-0 pointer-events-none"
                        style={{ width: '0px', transform: 'translateX(0px)' }}></div>

                    <a href="#inicio"
                        className={activeSection === "inicio" ? "nav-item relative z-10 text-sm font-semibold px-4 py-1.5 transition-colors duration-300 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:rounded-full" : "nav-item relative z-10 text-sm font-semibold px-4 py-1.5 transition-colors duration-300 text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:rounded-full"}>Início</a>
                    <a href="#como-funciona"
                        className={activeSection === "como-funciona" ? "nav-item relative z-10 text-sm font-semibold px-4 py-1.5 transition-colors duration-300 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:rounded-full" : "nav-item relative z-10 text-sm font-semibold px-4 py-1.5 transition-colors duration-300 text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:rounded-full"}>A Dinâmica</a>
                    {/* <a href="#projetos-jcc"
                        className={activeSection === "projetos-jcc" ? "nav-item relative z-10 text-sm font-semibold px-4 py-1.5 transition-colors duration-300 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:rounded-full" : "nav-item relative z-10 text-sm font-semibold px-4 py-1.5 transition-colors duration-300 text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:rounded-full"}>Ecossistema</a> */}
                    <a href="#dashboard"
                        className={activeSection === "dashboard" ? "nav-item relative z-10 text-sm font-semibold px-4 py-1.5 transition-colors duration-300 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:rounded-full" : "nav-item relative z-10 text-sm font-semibold px-4 py-1.5 transition-colors duration-300 text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:rounded-full"}>Impacto</a>
                </nav>

                {/* Actions (Botoes de acao de acesso rapido e Menu Hamburguer) */}
                <div className="flex items-center gap-2 sm:gap-3 shrink-0">
                    {/* Botão de Ação Direta no Desktop */}
                    <Link to={user ? "/reportar-logado" : "/reportar"}
                        className="hidden sm:flex items-center justify-center gap-1.5 sm:gap-2 h-10 bg-red-600 hover:bg-red-700 text-white px-4 sm:px-5 rounded-full text-xs sm:text-sm font-bold transition-all shadow-md shadow-red-500/10 hover:shadow-red-500/20 active:scale-95 pointer-events-auto focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 shrink-0">
                        <span>Reportar</span>
                        <Plus className="h-4 w-4" aria-hidden="true" />
                    </Link>

                    <div className="relative flex items-center">
                        <button onClick={toggleAppMenu}
                            aria-label={isMenuOpen ? "Fechar menu principal" : "Abrir menu principal"}
                            aria-expanded={isMenuOpen}
                            aria-controls="app-menu-dropdown"
                            className="flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded-full transition-all duration-300 border border-zinc-200 dark:border-zinc-700 focus:outline-none focus:ring-2 focus:ring-red-500 pointer-events-auto shrink-0 relative cursor-pointer">
                            <Menu
                                className={`h-4 w-4 sm:h-5 sm:w-5 text-zinc-700 dark:text-zinc-300 absolute transition-all duration-300 ease-in-out ${
                                    isMenuOpen
                                        ? 'opacity-0 rotate-90 scale-50 pointer-events-none'
                                        : 'opacity-100 rotate-0 scale-100'
                                }`}
                                aria-hidden="true"
                            />
                            <X
                                className={`h-4 w-4 sm:h-5 sm:w-5 text-zinc-700 dark:text-zinc-300 absolute transition-all duration-300 ease-in-out ${
                                    isMenuOpen
                                        ? 'opacity-100 rotate-0 scale-100'
                                        : 'opacity-0 -rotate-90 scale-50 pointer-events-none'
                                }`}
                                aria-hidden="true"
                            />
                            {user && (
                                <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 sm:w-3 sm:h-3 bg-red-600 rounded-full ring-2 ring-white dark:ring-zinc-900 z-10 shadow-sm pointer-events-none" title="Usuário autenticado" />
                            )}
                        </button>

                        {/* Dropdown Menu - 100% opaco para máxima legibilidade e sem vazamento de fundo */}
                        <div id="app-menu-dropdown" className={`absolute right-0 top-full mt-4 sm:mt-6 w-60 sm:w-64 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl sm:rounded-3xl shadow-2xl shadow-zinc-900/25 dark:shadow-black/70 py-2 transition-all duration-200 origin-top-right transform z-50 ${isMenuOpen ? "opacity-100 scale-100 pointer-events-auto" : "opacity-0 scale-95 pointer-events-none"}`}>

                            {/* Informações do usuário logado */}
                            {user && (
                                <div className="px-4 py-2.5 border-b border-zinc-100 dark:border-zinc-800 mb-2 flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 flex items-center justify-center font-extrabold text-xs shrink-0">
                                        {userInitials}
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <span className="block text-[10px] font-black text-zinc-400 uppercase tracking-widest">Logado como</span>
                                        <span className="block text-sm font-bold text-zinc-900 dark:text-white truncate">
                                            {userName}
                                        </span>
                                    </div>
                                </div>
                            )}

                            {/* Links de Navegação (Visível apenas no Mobile) */}
                            <nav aria-label="Navegação mobile" className="md:hidden border-b border-zinc-100 dark:border-zinc-800 pb-2 mb-2 px-2 relative">
                                {/* Pílula de fundo animada tipo Glass sobre fundo opaco */}
                                <div
                                    ref={mobileNavPillRef}
                                    className="absolute left-2 right-2 rounded-xl transition-all duration-300 ease-out pointer-events-none bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 shadow-sm"
                                    style={{ top: '0px', height: '0px', opacity: 0 }}
                                />

                                {mobileNavSections.map((item) => {
                                    const isActive = (activeSection || 'inicio') === item.id;
                                    return (
                                        <a
                                            key={item.id}
                                            href={item.href}
                                            data-section={item.id}
                                            onClick={closeAppMenu}
                                            className={`mobile-nav-item relative z-10 flex items-center justify-between px-4 py-2.5 text-sm rounded-xl transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500/50 ${
                                                isActive
                                                    ? 'font-bold text-zinc-900 dark:text-white'
                                                    : 'font-semibold text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100/40 dark:hover:bg-zinc-800/30'
                                            }`}
                                        >
                                            <span>{item.label}</span>
                                            {isActive && (
                                                <span className="w-1.5 h-1.5 rounded-full bg-red-600 shadow-sm shadow-red-600/50" />
                                            )}
                                        </a>
                                    );
                                })}
                            </nav>

                            {/* Opções Principais do App */}
                            <nav aria-label="Ações rápidas" className="px-2 space-y-1">
                                <Link to={user ? "/reportar-logado" : "/reportar"}
                                    onClick={closeAppMenu}
                                    className="sm:hidden flex items-center gap-3 px-4 py-2.5 text-sm font-bold text-red-600 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-xl transition-colors focus:outline-none focus:bg-red-50 dark:focus:bg-red-900/10">
                                    <Megaphone className="h-4 w-4" aria-hidden="true" /> Reportar Problema
                                </Link>

                                <Link to={user ? "/central-cidadao" : "/login"}
                                    onClick={closeAppMenu}
                                    className={`flex items-center gap-3 px-4 py-2.5 text-sm rounded-xl transition-colors focus:outline-none ${user
                                            ? "font-bold text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/10 focus:bg-red-50 dark:focus:bg-red-900/10"
                                            : "font-medium text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 hover:text-zinc-900 dark:hover:text-white focus:bg-zinc-50 dark:focus:bg-zinc-800/50"
                                        }`}>
                                    {user ? (
                                        <LayoutDashboard className="h-4 w-4 text-red-600 dark:text-red-400" aria-hidden="true" />
                                    ) : (
                                        <LogIn className="h-4 w-4 text-zinc-400" aria-hidden="true" />
                                    )}
                                    <span>{user ? "Central do Cidadão" : "Entrar"}</span>
                                </Link>

                                <Link to="/dashboard"
                                    onClick={closeAppMenu}
                                    className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 hover:text-zinc-900 dark:hover:text-white rounded-xl transition-colors focus:outline-none focus:bg-zinc-50 dark:focus:bg-zinc-800/50">
                                    <LayoutDashboard className="h-4 w-4 text-zinc-400" aria-hidden="true" /> Ver Painel
                                </Link>
                                <Link to="/feed"
                                    onClick={closeAppMenu}
                                    className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 hover:text-zinc-900 dark:hover:text-white rounded-xl transition-colors focus:outline-none focus:bg-zinc-50 dark:focus:bg-zinc-800/50">
                                    <Layers className="h-4 w-4 text-zinc-400" aria-hidden="true" /> Ver Publicações
                                </Link>
                            </nav>

                            <div className="border-t border-zinc-100 dark:border-zinc-800 my-2"></div>

                            {/* Toggle de Tema */}
                            <div className="px-5 py-3 flex items-center justify-between group">
                                <span
                                    className="text-sm font-medium text-zinc-600 dark:text-zinc-400 transition-colors" aria-hidden="true">Modo Escuro</span>

                                <button
                                    onClick={toggleTheme}
                                    aria-label="Alternar modo escuro"
                                    aria-pressed={isDarkMode}
                                    className="relative inline-flex h-6 w-11 items-center rounded-full bg-zinc-200 dark:bg-red-600 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 shadow-inner cursor-pointer">
                                    <span
                                        className="h-4 w-4 transform rounded-full bg-white shadow-sm transition-transform translate-x-1 dark:translate-x-6 flex items-center justify-center pointer-events-none">
                                        <Sun className="h-3 w-3 text-zinc-400 dark:hidden block" aria-hidden="true" />
                                        <Moon className="h-3 w-3 text-red-600 hidden dark:block" aria-hidden="true" />
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
