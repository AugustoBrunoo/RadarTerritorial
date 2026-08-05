import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router';
import { MapPin, ChevronDown, Home, LogOut, LayoutDashboard, Settings, Moon, Sun } from 'lucide-react';
import { signOutUser } from '../../services/authService';
import { supabase } from '../../lib/supabaseClient';

export default function LoggedHeader() {
  const navigate = useNavigate();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [userName, setUserName] = useState('Cidadão');
  const [userInitials, setUserInitials] = useState('RT');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  useEffect(() => {
    setIsDarkMode(document.documentElement.classList.contains('dark'));
  }, []);

  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    if (newMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  useEffect(() => {
    async function loadUser() {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        let fullName = user.user_metadata?.nome_completo;

        // Se não tiver no metadata, tenta na tabela profiles
        if (!fullName) {
          const { data: profile } = await supabase
            .from('profiles')
            .select('nome_completo')
            .eq('id', user.id)
            .single();
          if (profile) fullName = profile.nome_completo;
        }

        if (fullName) {
          setUserName(fullName);
          const parts = fullName.trim().split(' ');
          if (parts.length > 1) {
            setUserInitials(`${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase());
          } else {
            setUserInitials(fullName.substring(0, 2).toUpperCase());
          }
        }
      }
    }
    loadUser();
  }, []);

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
      <header className="pointer-events-auto w-full max-w-5xl bg-white/70 dark:bg-zinc-900/70 backdrop-blur-xl border border-zinc-200 dark:border-zinc-800 rounded-full px-4 sm:px-6 py-3 flex justify-between items-center shadow-lg shadow-zinc-200/20 dark:shadow-black/40 transition-all duration-300 relative">

        {/* Logo */}
        <Link to="/central-cidadao" className="flex items-center gap-2 cursor-pointer group">
          <div className="bg-red-600 p-2 rounded-full group-hover:scale-105 transition-transform">
            <MapPin className="h-5 w-5 text-white" />
          </div>
          <span className="font-bold text-lg sm:text-xl tracking-tight text-zinc-900 dark:text-white">
            Radar<span className="text-red-600">Territorial</span>
          </span>
        </Link>

        {/* Menu Autenticado */}
        <div className="flex items-center gap-4 relative">
          <button
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            onBlur={() => setTimeout(() => setShowProfileMenu(false), 200)}
            className="flex items-center gap-2 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 pl-3 pr-2 py-1.5 rounded-full transition-colors border border-zinc-200 dark:border-zinc-700"
          >
            <span className="text-sm font-bold text-zinc-700 dark:text-zinc-300 max-w-[100px] truncate hidden sm:block">
              {userName.split(' ')[0]}
            </span>
            <div className="w-8 h-8 rounded-full bg-zinc-300 dark:bg-zinc-600 flex items-center justify-center overflow-hidden">
              <span className="font-extrabold text-xs text-zinc-600 dark:text-zinc-300">{userInitials}</span>
            </div>
            <ChevronDown className="h-4 w-4 text-zinc-500" />
          </button>

          {/* Dropdown */}
          <div className={`absolute right-0 top-12 mt-2 w-56 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-xl shadow-zinc-200/20 dark:shadow-black/40 py-2 transition-all duration-200 origin-top-right transform z-50 ${showProfileMenu ? 'opacity-100 scale-100 pointer-events-auto' : 'opacity-0 scale-95 pointer-events-none'}`}>
            <div className="px-4 py-2 border-b border-zinc-100 dark:border-zinc-800 mb-1">
              <span className="block text-[10px] font-black text-zinc-400 uppercase tracking-widest">Logado como</span>
              <span className="block text-sm font-bold text-zinc-900 dark:text-white truncate">{userName}</span>
            </div>

            <div className="px-4 py-3 border-b border-zinc-100 dark:border-zinc-800 mb-1 flex items-center justify-between">
              <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Modo Escuro</span>
              <button
                onClick={toggleDarkMode}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${isDarkMode ? 'bg-red-500' : 'bg-zinc-300 dark:bg-zinc-700'}`}
              >
                <span className={`${isDarkMode ? 'translate-x-6' : 'translate-x-1'} inline-flex h-4 w-4 transform rounded-full bg-white transition-transform items-center justify-center`}>
                  {isDarkMode ? <Moon className="h-3 w-3 text-red-500" /> : <Sun className="h-3 w-3 text-zinc-500" />}
                </span>
              </button>
            </div>

            <Link to="/central-cidadao" className="flex items-center gap-3 px-4 py-2 text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 hover:text-zinc-900 dark:hover:text-white transition-colors">
              <Home className="h-4 w-4" /> Início
            </Link>
            <Link to="/demandas-usuario" className="flex items-center gap-3 px-4 py-2 text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 hover:text-zinc-900 dark:hover:text-white transition-colors">
              <LayoutDashboard className="h-4 w-4" /> Minhas Demandas
            </Link>
            <button className="w-full flex items-center gap-3 px-4 py-2 text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 hover:text-zinc-900 dark:hover:text-white transition-colors">
              <Settings className="h-4 w-4" /> Configurações
            </button>

            <div className="border-t border-zinc-100 dark:border-zinc-800 my-1"></div>

            <button onClick={() => { setShowLogoutModal(true); setShowProfileMenu(false); }} className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-bold text-red-600 hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors">
              <LogOut className="h-4 w-4" /> Sair da conta
            </button>
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
