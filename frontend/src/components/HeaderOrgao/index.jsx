import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router';
import { MapPin, Menu, PieChart, Settings, BarChart3, LogOut } from 'lucide-react';
import { signOutUser } from '../../services/authService';

export default function HeaderOrgao() {
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [showLogoutModal, setShowLogoutModal] = useState(false);
    const menuRef = useRef(null);

    const toggleMenu = () => setIsMenuOpen(prev => !prev);
    const closeMenu = () => setIsMenuOpen(false);

    useEffect(() => {
        function handleClickOutside(event) {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                closeMenu();
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [menuRef]);

    useEffect(() => {
        if (showLogoutModal) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [showLogoutModal]);

    const handleLogout = async () => {
        await signOutUser();
        navigate('/login');
    };

    return (
        <div className="fixed top-6 left-0 right-0 z-50 px-4 flex justify-center pointer-events-none">
            <header className="pointer-events-auto w-full max-w-6xl bg-white/70 dark:bg-zinc-900/70 backdrop-blur-xl border border-zinc-200 dark:border-zinc-800 rounded-full px-4 sm:px-6 py-3 flex justify-between items-center shadow-lg transition-all duration-300">
                
                {/* Logo */}
                <Link to="/" className="flex items-center gap-2 cursor-pointer group">
                    <div className="bg-red-600 p-2 rounded-full group-hover:scale-105 transition-transform">
                        <MapPin className="h-5 w-5 text-white" />
                    </div>
                    <span className="font-bold text-lg sm:text-xl tracking-tight text-zinc-900 dark:text-white">
                        Radar<span className="text-red-600">Territorial</span>
                    </span>
                </Link>

                {/* Actions */}
                <div className="flex items-center gap-3">
                    {/* Identificação do Órgão */}
                    <div className="hidden sm:flex items-center gap-2 bg-zinc-100 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 px-4 py-1.5 rounded-full">
                        <span className="text-xs font-medium text-zinc-600 dark:text-zinc-400">
                            Vinculado como: <strong className="font-bold text-zinc-900 dark:text-white">COMLURB</strong>
                        </span>
                    </div>

                    {/* Menu Hamburguer */}
                    <div className="relative flex items-center" ref={menuRef}>
                        <button onClick={toggleMenu} className="w-10 h-10 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-600 dark:text-zinc-400 hover:text-blue-500 transition-colors focus:outline-none shadow-sm active:scale-95">
                            <Menu className="h-5 w-5" />
                        </button>

                        {/* Dropdown Menu */}
                        <div className={`absolute right-0 top-full mt-3 w-56 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl shadow-xl shadow-zinc-200/20 dark:shadow-black/40 py-2 transition-all duration-200 origin-top-right z-50 ${isMenuOpen ? 'opacity-100 scale-100 pointer-events-auto' : 'opacity-0 scale-95 pointer-events-none hidden'}`}>
                            <div className="px-2 space-y-1">
                                <a href="#analytics-section" onClick={closeMenu} className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 hover:text-zinc-900 dark:hover:text-white rounded-xl transition-colors">
                                    <PieChart className="h-4 w-4 text-zinc-400" /> Relatórios & Dados
                                </a>
                                <a href="#settings-section" onClick={closeMenu} className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 hover:text-zinc-900 dark:hover:text-white rounded-xl transition-colors">
                                    <Settings className="h-4 w-4 text-zinc-400" /> Configurações do Órgão
                                </a>
                                <Link to="/dashboard" onClick={closeMenu} className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 hover:text-zinc-900 dark:hover:text-white rounded-xl transition-colors">
                                    <BarChart3 className="h-4 w-4 text-zinc-400" /> Painel Público
                                </Link>
                                <div className="border-t border-zinc-100 dark:border-zinc-800 my-1"></div>
                                <button 
                                    onClick={() => { 
                                        setShowLogoutModal(true); 
                                        closeMenu(); 
                                    }} 
                                    className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-red-600 dark:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-xl transition-colors"
                                >
                                    <LogOut className="h-4 w-4 text-red-500" /> Sair
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* Logout Modal */}
            {showLogoutModal && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm px-4 pointer-events-auto">
                    <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 md:p-8 max-w-sm w-full shadow-2xl animate-in zoom-in-95 duration-200">
                        <div className="flex flex-col items-center text-center">
                            <div className="w-16 h-16 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center text-red-600 mb-4">
                                <LogOut className="h-8 w-8" />
                            </div>
                            <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-2">Sair da conta</h3>
                            <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-6">
                                Tem certeza que deseja sair? Você precisará fazer login novamente para acessar seus dados.
                            </p>
                            <div className="flex gap-3 w-full">
                                <button
                                    onClick={() => setShowLogoutModal(false)}
                                    className="flex-1 py-3 px-4 rounded-xl font-bold text-zinc-700 dark:text-white bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
                                >
                                    Cancelar
                                </button>
                                <button
                                    onClick={handleLogout}
                                    className="flex-1 py-3 px-4 rounded-xl font-bold text-white bg-red-600 hover:bg-red-700 transition-colors shadow-lg shadow-red-500/20"
                                >
                                    Sair
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
