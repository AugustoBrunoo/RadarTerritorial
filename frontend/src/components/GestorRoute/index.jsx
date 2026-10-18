import React from 'react';
import { Navigate, Outlet } from 'react-router';
import { useAuth } from '../../hooks/useAuth';
import SEO from '../SEO';

export function GestorRoute() {
  const { profile, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-50 dark:bg-zinc-950">
        <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  // Verifica se o usuário tem role de gestor e está vinculado a um órgão
  const isGestorValido = profile && (profile.role === 'gestor_publico' || profile.role === 'admin') && profile.orgao_id;

  if (!isGestorValido) {
    return <Navigate replace to="/login"/>;
  }

  return (
    <>
      <SEO title="Gestão Pública Operacional | Radar Territorial" noindex={true} />
      <Outlet/>
    </>
  );
}
