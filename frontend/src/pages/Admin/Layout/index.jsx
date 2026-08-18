import React, { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router';
import AdminSidebar from '../../../components/AdminSidebar';
import AdminTopbar from '../../../components/AdminTopbar';

export default function AdminLayout() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsDarkMode(document.documentElement.classList.contains('dark'));
  }, []);

  const toggleTheme = () => {
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

  // Determinar titulo e subtitulo da página com base na rota
  let title = "Painel de Administração";
  let subtitle = "Gestão Geral do Sistema";

  if (location.pathname === '/admin/dashboard' || location.pathname === '/admin') {
    title = "Visão Geral";
    subtitle = "Métricas de governança e fila de moderação";
  } else if (location.pathname.includes('/admin/moderacao')) {
    title = "Moderação";
    subtitle = "Análise de denúncias da comunidade";
  } else if (location.pathname.includes('/admin/orgaos')) {
    title = "Gestão de Órgãos";
    subtitle = "Gerencie secretarias e subprefeituras";
  } else if (location.pathname.includes('/admin/usuarios')) {
    title = "Usuários e Perfis";
    subtitle = "Gestão de acessos do sistema";
  }

  return (
    <div className="bg-[#F9FAFB] dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50 font-sans h-screen flex overflow-hidden transition-colors duration-300">
      <AdminSidebar />

      {/* === CONTEÚDO PRINCIPAL === */}
      <main className="flex-1 flex flex-col h-full overflow-hidden relative bg-zinc-50 dark:bg-zinc-950/50">
        <AdminTopbar 
          title={title} 
          subtitle={subtitle} 
          isDarkMode={isDarkMode} 
          toggleTheme={toggleTheme} 
        />

        {/* Scrollable Content - The pages will render here */}
        <div className="flex-1 overflow-y-auto p-6 lg:p-10 scroll-smooth">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
