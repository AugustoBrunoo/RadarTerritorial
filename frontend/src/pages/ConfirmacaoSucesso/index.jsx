import React, { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { CheckCircle2, MapPin, ArrowRight, LogIn } from 'lucide-react';

export default function ConfirmacaoSucesso() {
  const navigate = useNavigate();

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-[#09090B] text-zinc-50 font-sans selection:bg-red-500 selection:text-white">
      {/* Main Content */}
      <main className="flex-grow flex items-center justify-center px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="w-full max-w-md bg-zinc-900 rounded-3xl border border-zinc-800 shadow-2xl p-8 sm:p-10 animate-fade-in-up text-center relative overflow-hidden">
          
          {/* Subtle background glow inside card */}
          <div className="absolute top-0 right-0 -mt-20 -mr-20 w-48 h-48 bg-green-500/10 blur-3xl rounded-full pointer-events-none"></div>

          <div className="relative z-10 flex flex-col items-center">
            {/* Logo */}
            <div className="flex items-center justify-center gap-2 cursor-pointer group mb-8">
              <div className="bg-red-600 p-2 rounded-full group-hover:scale-105 transition-transform shadow-lg shadow-red-600/20">
                <MapPin className="h-4 w-4 text-white" />
              </div>
              <span className="font-bold text-lg sm:text-xl tracking-tight text-white">
                Radar<span className="text-red-600">Territorial</span>
              </span>
            </div>

            {/* Icon Circle */}
            <div className="w-20 h-20 bg-green-500/10 border border-green-500/20 text-green-500 rounded-full flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(34,197,94,0.15)]">
              <CheckCircle2 className="h-10 w-10" strokeWidth={2.5} />
            </div>

            {/* Title */}
            <h1 className="text-2xl sm:text-3xl font-black text-white mb-3 tracking-tight">
              E-mail Confirmado com Sucesso!
            </h1>
            
            {/* Description */}
            <p className="text-zinc-400 text-sm leading-relaxed mb-10">
              Sua conta foi verificada e ativada. Agora você já pode fazer login para acompanhar, relatar e transformar o seu bairro.
            </p>

            {/* CTA Button */}
            <button
              onClick={() => navigate('/login')}
              className="w-full py-4 px-6 rounded-xl font-bold text-base bg-red-600 hover:bg-red-700 text-white transition-all shadow-lg shadow-red-600/30 flex items-center justify-center gap-2 transform hover:-translate-y-0.5"
            >
              <LogIn className="h-5 w-5" />
              Ir para o Login
              <ArrowRight className="h-4 w-4 ml-1" />
            </button>
          </div>
        </div>
      </main>

      {/* Discrete Footer */}
      <footer className="w-full text-center py-6 text-zinc-600 text-xs font-medium relative z-20">
        Radar Territorial • Gestão e Monitoramento Comunitário
      </footer>
    </div>
  );
}
