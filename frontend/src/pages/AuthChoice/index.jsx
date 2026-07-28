import React, { useEffect } from 'react';
import { Link } from 'react-router';
import { LogIn, UserPlus, MapPin } from 'lucide-react';
import SimpleHeader from '../../components/SimpleHeader';
import SimpleFooter from '../../components/SimpleFooter';
import AuthCard from '../../components/AuthCard';

export default function AuthChoice() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="transition-colors duration-500 ease-in-out min-h-screen bg-[#F9FAFB] text-zinc-900 dark:bg-[#09090B] dark:text-zinc-50 font-sans selection:bg-red-500 selection:text-white flex flex-col">
      <SimpleHeader backLink="/reportar" />

      <main className="flex-grow pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto w-full flex flex-col justify-center min-h-[90vh] relative">
        {/* Elemento de Blur Decorativo no Fundo */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl h-96 bg-red-600/5 blur-[120px] rounded-full pointer-events-none -z-10"></div>

        <div className="text-center mb-12 relative z-10 animate-fade-in-up">
          <h1 className="text-4xl md:text-5xl font-black tracking-tighter leading-tight text-zinc-900 dark:text-white mb-4">
            Boas-vindas ao <br className="hidden sm:block" />
            <span className="text-red-600">RadarTerritorial.</span>
          </h1>
          <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-xl mx-auto font-medium">
            Para ter controle total sobre seus relatos e interagir com a comunidade, acesse ou crie sua conta abaixo.
          </p>
        </div>

        {/* Grid de Opções (Login vs Cadastro) */}
        <div className="flex flex-col md:grid md:grid-cols-2 gap-6 relative z-10 max-w-4xl mx-auto w-full animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
          {/* OPÇÃO 1: JÁ TENHO CONTA (LOGIN) */}
          <AuthCard
            to="/login?redirect=/reportar-logado"
            icon={LogIn}
            title="Já sou cadastrado"
            description="Faça login com e-mail ou CPF para acompanhar seus relatos ativos, visualizar respostas da prefeitura e apoiar demandas de outros moradores."
            buttonText="Entrar na minha conta"
            variant="light"
            className="order-2 md:order-1"
          />

          {/* OPÇÃO 2: CRIAR CONTA (CADASTRO) */}
          <AuthCard
            to="/cadastro?redirect=/reportar-logado"
            icon={UserPlus}
            title="Criar nova conta"
            description="Junte-se à comunidade. O cadastro é rápido e seguro, permitindo que você tenha um histórico unificado e colabore diretamente com as melhorias da sua região."
            buttonText="Iniciar Cadastro"
            variant="dark"
            className="order-1 md:order-2"
          />
        </div>
      </main>

      {/* Footer Simplificado */}
      <SimpleFooter />
    </div>
  );
}
