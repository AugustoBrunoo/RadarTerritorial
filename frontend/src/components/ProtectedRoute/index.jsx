import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router';
import { supabase } from '../../lib/supabaseClient';

export default function ProtectedRoute({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setIsAuthenticated(!!session);
    };

    checkAuth();

    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      setIsAuthenticated(!!session);
    });

    return () => {
      if (authListener && authListener.subscription) {
        authListener.subscription.unsubscribe();
      }
    };
  }, []);

  // Show a loading state while checking authentication
  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#F9FAFB] dark:bg-[#09090B]">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-zinc-900 dark:border-white mb-4"></div>
        <p className="text-zinc-500 dark:text-zinc-400 font-medium animate-pulse">Verificando acesso...</p>
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Render children if authenticated
  return children;
}
