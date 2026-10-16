import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';

export function useAuth() {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProfile(userId, currentUser) {
      const { data } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .maybeSingle();
      
      let currentProfile = data;

      // Se o perfil na tabela profiles estiver com 'Cidadão' ou vazio, mas os metadados contiverem o nome real
      const metaName = currentUser?.user_metadata?.nome_completo ||
                       currentUser?.user_metadata?.name ||
                       currentUser?.user_metadata?.full_name ||
                       currentUser?.user_metadata?.username;

      if (currentProfile && metaName && (!currentProfile.nome_completo || currentProfile.nome_completo === 'Cidadão')) {
        const { data: synced } = await supabase
          .from('profiles')
          .update({ nome_completo: metaName })
          .eq('id', userId)
          .select()
          .maybeSingle();

        if (synced) currentProfile = synced;
      }

      if (currentProfile) {
        setProfile(currentProfile);
      }
      setLoading(false);
    }

    async function getSession() {
      setLoading(true);
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session?.user) {
        setUser(session.user);
        await fetchProfile(session.user.id, session.user);
      } else {
        setUser(null);
        setProfile(null);
        setLoading(false);
      }
    }

    getSession();

    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        setUser(session.user);
        await fetchProfile(session.user.id, session.user);
      } else {
        setUser(null);
        setProfile(null);
        setLoading(false);
      }
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  return {
    user,
    profile,
    loading,
    isAdmin: profile?.role === 'admin',
    isGestor: profile?.role === 'gestor_publico'
  };
}
