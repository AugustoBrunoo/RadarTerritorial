import React, { useState, useEffect } from 'react';
import { useNavigate, Navigate } from 'react-router';
import LoggedHeader from '../../components/LoggedHeader';
import WelcomeHeader from '../../components/PrimeiroAcesso/WelcomeHeader';
import ProgressionWizard from '../../components/PrimeiroAcesso/ProgressionWizard';
import FinalChoices from '../../components/PrimeiroAcesso/FinalChoices';
import SimpleFooter from '../../components/SimpleFooter';
import ReportChoiceModal from '../../components/ReportChoiceModal';
import { completeFirstAccess, isFirstAccessCompleted } from '../../services/authService';
import { supabase } from '../../lib/supabaseClient';

export default function PrimeiroAcesso() {
  const navigate = useNavigate();
  const [checkingAccess, setCheckingAccess] = useState(true);
  const [showFinalChoices, setShowFinalChoices] = useState(false);
  const [isReportChoiceModalOpen, setIsReportChoiceModalOpen] = useState(false);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);

    let isMounted = true;

    const checkAccess = async () => {
      try {
        // Limpa chave genérica legada para garantir isolamento por conta no mesmo aparelho
        if (typeof window !== 'undefined') {
          localStorage.removeItem('primeiro_acesso_concluido');
        }

        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
          navigate('/login', { replace: true });
          return;
        }

        if (isMounted) {
          setUserId(user.id);
        }

        // Se este usuário específico já concluiu o primeiro acesso no localStorage
        if (typeof window !== 'undefined' && localStorage.getItem(`primeiro_acesso_concluido_${user.id}`) === 'true') {
          navigate('/central-cidadao', { replace: true });
          return;
        }

        // Se este usuário específico já concluiu primeiro acesso no backend (user_metadata ou profiles)
        const completed = await isFirstAccessCompleted();
        if (completed) {
          if (typeof window !== 'undefined') {
            localStorage.setItem(`primeiro_acesso_concluido_${user.id}`, 'true');
          }
          navigate('/central-cidadao', { replace: true });
          return;
        }

        if (isMounted) {
          setCheckingAccess(false);
        }
      } catch (err) {
        console.error('Erro ao verificar primeiro acesso:', err);
        if (isMounted) {
          setCheckingAccess(false);
        }
      }
    };

    checkAccess();

    return () => {
      isMounted = false;
    };
  }, [navigate]);

  // Enquanto valida se o usuário tem permissão para ver esta tela
  if (checkingAccess) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#F9FAFB] dark:bg-[#09090B]">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-red-600 mb-4"></div>
        <p className="text-zinc-500 dark:text-zinc-400 font-medium animate-pulse text-sm">Verificando acesso...</p>
      </div>
    );
  }

  // Handler executado quando o usuário escolhe qualquer opção (cards ou modal)
  const handleChoice = async (path) => {
    setIsReportChoiceModalOpen(false);

    // Marca no localStorage especificamente para este usuário para barrar retorno à tela
    if (typeof window !== 'undefined' && userId) {
      localStorage.setItem(`primeiro_acesso_concluido_${userId}`, 'true');
    }

    // Persiste no Supabase
    await completeFirstAccess();

    // Substitui a rota no histórico de navegação
    navigate(path, { replace: true });
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB] text-zinc-900 dark:bg-[#09090B] dark:text-zinc-50 font-sans flex flex-col selection:bg-red-500 selection:text-white">
      <style>{`
        .typing-container::after {
            content: '|';
            animation: blink 1s step-start infinite;
        }
        @keyframes blink {
            50% { opacity: 0; }
        }
      `}</style>

      {/* === NAVBAR LOGADA === */}
      <LoggedHeader />

      {/* === MAIN CONTAINER === */}
      <main className="flex-grow pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto w-full flex flex-col justify-center items-center">
        {!showFinalChoices ? (
          <>
            <WelcomeHeader />
            <ProgressionWizard onFinish={() => setShowFinalChoices(true)} />
          </>
        ) : (
          <FinalChoices
            onOpenReportModal={() => setIsReportChoiceModalOpen(true)}
            onSelectOption={handleChoice}
          />
        )}
      </main>

      {/* === FOOTER SIMPLIFICADO === */}
      <div className="mt-auto relative z-30">
        <SimpleFooter />
      </div>

      {/* === MODAL DE OPÇÕES DE RELATO === */}
      <ReportChoiceModal
        isOpen={isReportChoiceModalOpen}
        onClose={() => setIsReportChoiceModalOpen(false)}
        onSelect={handleChoice}
      />
    </div>
  );
}
