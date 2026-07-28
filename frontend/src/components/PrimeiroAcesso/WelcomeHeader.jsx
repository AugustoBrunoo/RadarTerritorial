import React, { useState, useEffect } from 'react';
import { PartyPopper } from 'lucide-react';
import { supabase } from '../../lib/supabaseClient';

export default function WelcomeHeader() {
  const [firstName, setFirstName] = useState('');

  useEffect(() => {
    async function loadUser() {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        let fullName = user.user_metadata?.nome_completo;
        
        if (!fullName) {
          const { data: profile } = await supabase
            .from('profiles')
            .select('nome_completo')
            .eq('id', user.id)
            .single();
          if (profile) fullName = profile.nome_completo;
        }

        if (fullName) {
          setFirstName(fullName.trim().split(' ')[0]);
        }
      }
    }
    loadUser();
  }, []);

  return (
    <div className="text-center mb-10 animate-slide-up opacity-0" style={{ animationFillMode: 'forwards' }}>
      <div className="w-20 h-20 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl shadow-red-600/30">
        <PartyPopper className="h-10 w-10 text-white" />
      </div>
      <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-zinc-900 dark:text-white mb-4">
        Olá{firstName ? `, ${firstName}` : ''}! <br />
        <span className="text-red-600">Bem-vindo ao Radar.</span>
      </h1>
      <p className="text-lg text-zinc-500 dark:text-zinc-400 font-medium max-w-xl mx-auto leading-relaxed">
        Antes de começar a transformar o seu bairro, entenda em 4 passos como a nossa plataforma funciona.
      </p>
    </div>
  );
}
