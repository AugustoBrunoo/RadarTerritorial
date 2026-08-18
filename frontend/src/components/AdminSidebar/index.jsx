import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import {
  ShieldCheck, LayoutDashboard, Flag, Building2, Users, ListTree, LogOut
} from 'lucide-react';
import { signOutUser } from '../../services/authService';
import AdminLogoutModal from '../AdminLogoutModal';

export default function AdminSidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const pathname = location.pathname;
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);
      await signOutUser();
      setShowLogoutModal(false);
      navigate('/login');
    } catch (error) {
      console.error('Erro ao encerrar sessão:', error);
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <>
      <aside className="w-64 lg:w-72 border-r border-zinc-200 dark:border-zinc-800/60 bg-white dark:bg-zinc-900/50 hidden md:flex flex-col justify-between flex-shrink-0 backdrop-blur-xl z-20 relative">
        {/* Logo & Header */}
        <div>
          <div className="h-20 flex items-center px-6 border-b border-zinc-200 dark:border-zinc-800/60">
            <Link to="/admin/dashboard" className="flex items-center gap-2 cursor-pointer group">
              <div className="bg-red-600 p-1.5 rounded-lg group-hover:scale-105 transition-transform">
                <ShieldCheck className="h-5 w-5 text-white" />
              </div>
              <span className="font-black text-lg tracking-tight text-zinc-900 dark:text-white">
                Radar<span className="text-red-600">Admin</span>
              </span>
            </Link>
          </div>

          {/* Navegação */}
          <nav className="p-4 space-y-1.5">
            <div className="px-3 mb-2 mt-4">
              <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Controle</span>
            </div>

            <Link to="/admin/dashboard" className={`flex items-center gap-3 px-3 py-2.5 rounded-xl font-semibold text-sm transition-colors ${pathname === '/admin/dashboard' || pathname === '/admin'
                ? 'bg-zinc-100 dark:bg-zinc-800/80 text-zinc-900 dark:text-white border border-zinc-200 dark:border-zinc-700/50'
                : 'hover:bg-zinc-50 dark:hover:bg-zinc-800/40 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 border border-transparent'
              }`}>
              <LayoutDashboard className={`h-4 w-4 ${pathname === '/admin/dashboard' || pathname === '/admin' ? 'text-red-600' : ''}`} /> Dashboard
            </Link>

            <Link to="/admin/moderacao" className={`flex items-center gap-3 px-3 py-2.5 rounded-xl font-semibold text-sm transition-colors group ${pathname.includes('/admin/moderacao')
                ? 'bg-zinc-100 dark:bg-zinc-800/80 text-zinc-900 dark:text-white border border-zinc-200 dark:border-zinc-700/50'
                : 'hover:bg-zinc-50 dark:hover:bg-zinc-800/40 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 border border-transparent'
              }`}>
              <Flag className={`h-4 w-4 ${pathname.includes('/admin/moderacao') ? 'text-red-600' : 'group-hover:text-red-500'} transition-colors`} /> Moderação
              <span className="ml-auto bg-red-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">3</span>
            </Link>

            <Link to="/admin/orgaos" className={`flex items-center gap-3 px-3 py-2.5 rounded-xl font-semibold text-sm transition-colors group ${pathname.includes('/admin/orgaos')
                ? 'bg-zinc-100 dark:bg-zinc-800/80 text-zinc-900 dark:text-white border border-zinc-200 dark:border-zinc-700/50'
                : 'hover:bg-zinc-50 dark:hover:bg-zinc-800/40 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 border border-transparent'
              }`}>
              <Building2 className={`h-4 w-4 ${pathname.includes('/admin/orgaos') ? 'text-red-600' : 'group-hover:text-red-500'} transition-colors`} /> Gestão de Órgãos
            </Link>

            <div className="px-3 mb-2 mt-6">
              <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Sistema</span>
            </div>

            <Link to="#" className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-zinc-50 dark:hover:bg-zinc-800/40 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 font-medium text-sm transition-colors">
              <Users className="h-4 w-4" /> Usuários & Perfis
            </Link>

            <Link to="#" className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-zinc-50 dark:hover:bg-zinc-800/40 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 font-medium text-sm transition-colors">
              <ListTree className="h-4 w-4" /> Eixos & Categorias
            </Link>
          </nav>
        </div>

        {/* Footer da Sidebar (Admin Profile) */}
        <div className="p-4 border-t border-zinc-200 dark:border-zinc-800/60">
          <button
            onClick={() => setShowLogoutModal(true)}
            className="w-full flex items-center justify-between p-2 rounded-xl hover:bg-zinc-50 dark:hover:bg-zinc-800/40 transition-colors text-left group cursor-pointer"
            title="Sair do painel administrativo"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-red-600/10 border border-red-600/20 flex items-center justify-center text-red-600 flex-shrink-0">
                <span className="font-black text-xs">AD</span>
              </div>
              <div className="overflow-hidden">
                <span className="block text-sm font-bold text-zinc-900 dark:text-white truncate">Administrador</span>
              </div>
            </div>
            <LogOut className="h-4 w-4 text-zinc-400 group-hover:text-red-500 transition-colors" />
          </button>
        </div>
      </aside>

      {/* Modal de Confirmação de Logout */}
      <AdminLogoutModal
        isOpen={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        onConfirm={handleLogout}
        loading={isLoggingOut}
      />
    </>
  );
}
