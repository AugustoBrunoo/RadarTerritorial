import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router';
import { supabase } from '../../lib/supabaseClient';
import {
  MapPin,
  ArrowLeft,
  ShieldAlert,
  ArrowRight,
  Mail,
  Send,
  Loader2,
  Info,
  MailWarning,
  Check,
  CheckCircle2
} from 'lucide-react';

import SimpleHeader from '../../components/SimpleHeader';

export default function EsqueciSenha() {
  const [email, setEmail] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState('sending'); // 'sending' | 'sent'
  const [apiDone, setApiDone] = useState(false);
  const navigate = useNavigate();

  // Animation effect for progress bar
  useEffect(() => {
    let interval;
    if (modalOpen && status === 'sending') {
      interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 90 && !apiDone) {
            return 90; // Trava em 90% até o Supabase concluir a requisição real
          }
          const increment = Math.floor(Math.random() * 15) + 10;
          const next = prev + increment;
          if (next >= 100) {
            clearInterval(interval);
            setTimeout(() => {
              setStatus('sent');
            }, 400);
            return 100;
          }
          return next;
        });
      }, 250);
    }
    return () => clearInterval(interval);
  }, [modalOpen, status, apiDone]);

  const handleResetRequest = async (e) => {
    e.preventDefault();
    if (!email.trim()) return;

    setProgress(0);
    setStatus('sending');
    setApiDone(false);
    setModalOpen(true);

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `https://radar-territorial.vercel.app/redefinir-senha`,
      });

      if (error) {
        console.error("Erro no envio do e-mail de redefinição:", error.message);
      }
    } catch (err) {
      console.error("Erro inesperado:", err);
    } finally {
      setApiDone(true);
    }
  };

  const closeModalAndRedirect = () => {
    setModalOpen(false);
    navigate('/login');
  };

  const resetModalState = () => {
    setProgress(0);
    setStatus('sending');
  };

  const currentYear = new Date().getFullYear();

  return (
    <div className="min-h-screen bg-[#F9FAFB] text-zinc-900 dark:bg-[#09090B] dark:text-zinc-50 font-sans selection:bg-red-500 selection:text-white flex flex-col">

      <SimpleHeader backLink="/login" />

      {/* === SEÇÃO DE RECUPERAÇÃO DE SENHA (SPLIT LAYOUT) === */}
      <main className="flex-grow pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto w-full flex items-center justify-center min-h-[90vh] animate-in fade-in slide-in-from-bottom-4 duration-700 relative z-10">

        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-[2.5rem] shadow-2xl overflow-hidden w-full flex flex-col md:flex-row max-w-5xl">

          {/* === COLUNA ESQUERDA: INFORMAÇÕES === */}
          <div className="w-full md:w-5/12 bg-zinc-900 dark:bg-zinc-950 p-6 sm:p-8 lg:p-12 text-white relative overflow-hidden flex flex-col justify-between">
            <div className="absolute top-0 right-0 -mt-20 -mr-20 w-64 h-64 bg-red-600/20 blur-3xl rounded-full pointer-events-none animate-pulse"></div>
            <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-48 h-48 bg-zinc-600/10 blur-3xl rounded-full pointer-events-none"></div>

            <div className="relative z-10">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight mb-3 sm:mb-4">
                Esqueceu sua<br />senha?
              </h2>
              <p className="text-zinc-400 text-xs sm:text-sm mb-6 sm:mb-10 leading-relaxed font-medium">
                Não se preocupe! Insira o seu e-mail cadastrado e enviaremos um link seguro para você redefinir
                sua senha em poucos passos.
              </p>
            </div>

            <div className="relative z-10 mt-6 sm:mt-12 pt-6 sm:pt-8 border-t border-zinc-800 text-xs sm:text-sm text-zinc-500 flex justify-between items-center">
              <span>Lembrou a senha?</span>
              <Link to="/login" className="text-white font-bold hover:text-red-400 transition-colors flex items-center gap-1">
                Fazer Login <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>

          {/* === COLUNA DIREITA: FORMULÁRIO DE RECUPERAÇÃO === */}
          <div className="w-full md:w-7/12 p-6 sm:p-8 lg:p-12 bg-white dark:bg-zinc-900 flex flex-col justify-center relative">
            <div className="mb-8 sm:mb-10 mt-6 sm:mt-0">
              <h3 className="text-2xl sm:text-3xl font-black text-zinc-900 dark:text-white tracking-tight">
                Redefinir Senha
              </h3>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-2">
                Digite o e-mail associado à sua conta do Radar Territorial.
              </p>
            </div>

            <form className="space-y-6" onSubmit={handleResetRequest}>

              {/* E-mail */}
              <div>
                <label className="block text-xs font-bold text-zinc-500 uppercase tracking-wide mb-1.5">
                  E-mail Cadastrado
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-zinc-400" />
                  </div>
                  <input
                    type="email"
                    required
                    placeholder="seu.email@exemplo.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl pl-11 pr-4 py-3.5 text-zinc-900 dark:text-white focus:ring-2 focus:ring-red-500 outline-none transition-all placeholder-zinc-400 font-medium"
                  />
                </div>
              </div>

              {/* Botão Submit */}
              <div className="pt-2">
                <button type="submit" className="w-full bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 hover:bg-zinc-800 dark:hover:bg-zinc-200 py-4 rounded-xl font-black text-base transition-all hover:-translate-y-1 shadow-lg flex justify-center items-center gap-2 group">
                  <span>Enviar Instruções</span>
                  <Send className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>

      {/* === MODAL ELEGANTE DE PROGRESSO / CONFIRMAÇÃO === */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/70 backdrop-blur-md animate-in fade-in duration-300">

          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl animate-in zoom-in-95 duration-300 relative overflow-hidden">

            {/* Glow sutil de fundo do modal */}
            <div className="absolute -top-12 -right-12 w-32 h-32 bg-red-600/10 blur-2xl rounded-full pointer-events-none"></div>

            {/* Cabeçalho do Modal */}
            <div className="flex items-start justify-between mb-6">
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${status === 'sending' ? 'bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-900/50 text-red-600 dark:text-red-400' : 'bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-emerald-600 dark:text-emerald-400 transition-colors duration-500'}`}>
                {status === 'sending' ? (
                  <Loader2 className="h-6 w-6 animate-spin" />
                ) : (
                  <CheckCircle2 className="h-6 w-6" />
                )}
              </div>

              <span className={`text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1.5 border ${status === 'sending' ? 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 border-zinc-200 dark:border-zinc-700' : 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800 transition-colors duration-500'}`}>
                <span className={`w-2 h-2 rounded-full ${status === 'sending' ? 'bg-red-600 animate-ping' : 'bg-emerald-500'}`}></span>
                <span>{status === 'sending' ? 'Enviando...' : 'Enviado'}</span>
              </span>
            </div>

            {/* Conteúdo Dinâmico */}
            <div className="space-y-3">
              <h3 className="text-xl font-black text-zinc-900 dark:text-white tracking-tight">
                {status === 'sending' ? 'Processando solicitação' : 'Solicitação Processada!'}
              </h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed font-medium">
                {status === 'sending'
                  ? 'Aguarde enquanto validamos as informações e preparamos a mensagem de redefinição.'
                  : 'As instruções de recuperação foram enviadas para o endereço informado.'}
              </p>
            </div>

            {/* Barra de Progresso Animada */}
            <div className="mt-6 mb-2">
              <div className="flex justify-between items-center text-xs font-bold text-zinc-500 mb-2">
                <span>Progresso do envio</span>
                <span>{progress}%</span>
              </div>
              <div className="w-full bg-zinc-100 dark:bg-zinc-800 rounded-full h-2.5 overflow-hidden p-0.5 border border-zinc-200 dark:border-zinc-700/50">
                <div
                  className={`h-full rounded-full transition-all duration-300 ease-out shadow-sm ${status === 'sending' ? 'bg-red-600 shadow-red-500/50' : 'bg-emerald-500 shadow-emerald-500/50'}`}
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>

            {/* Box informativo sobre verificação de e-mail */}
            {status === 'sent' && (
              <div className="mt-6 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-4 text-xs text-zinc-600 dark:text-zinc-400 space-y-2 animate-in fade-in slide-in-from-bottom-2 duration-300">
                <div className="flex items-center gap-2 font-bold text-zinc-900 dark:text-white">
                  <Info className="h-4 w-4 text-red-600" />
                  <span>O que fazer agora?</span>
                </div>
                <p className="leading-relaxed">
                  Se o endereço <strong className="text-zinc-900 dark:text-white font-semibold">{email}</strong> estiver cadastrado no sistema,
                  você receberá um e-mail em instantes com as instruções.
                </p>
                <div className="pt-1 text-[11px] text-zinc-500 flex items-center gap-1.5">
                  <MailWarning className="h-3.5 w-3.5 text-zinc-400" />
                  <span>Lembre-se de checar sua pasta de <strong>Spam</strong> ou <strong>Lixo Eletrônico</strong>.</span>
                </div>
              </div>
            )}

            {/* Ações do Modal */}
            {status === 'sent' && (
              <div className="mt-6 pt-4 border-t border-zinc-100 dark:border-zinc-800/80 flex flex-col sm:flex-row gap-3 animate-in fade-in duration-500">
                <button
                  onClick={closeModalAndRedirect}
                  className="w-full bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 hover:bg-zinc-800 dark:hover:bg-zinc-200 py-3.5 rounded-xl font-bold text-sm transition-colors flex items-center justify-center gap-2"
                >
                  <Check className="h-4 w-4" /> Entendi
                </button>
                <button
                  onClick={resetModalState}
                  className="w-full sm:w-auto bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700 px-5 py-3.5 rounded-xl font-bold text-sm transition-colors"
                >
                  Reenviar
                </button>
              </div>
            )}

          </div>
        </div>
      )}

      {/* === FOOTER SIMPLIFICADO === */}
      <footer className="border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#09090B] mt-auto relative z-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-zinc-500 text-sm font-medium">
          <div className="flex items-center gap-3">
            <MapPin className="h-4 w-4 text-red-600" />
            <span className="text-zinc-900 dark:text-white font-bold tracking-tight">Radar<span className="text-red-600">Territorial</span></span>
            <span>© {currentYear}</span>
          </div>
          <div className="flex gap-6 font-semibold text-zinc-600 dark:text-zinc-400">
            <Link to="/termos" className="hover:text-red-600 transition-colors">Privacidade e Termos de Uso</Link>
          </div>
        </div>
      </footer>

    </div>
  );
}
