import React, { useState, useEffect } from 'react';
import LoggedHeader from '../../components/LoggedHeader';
import WelcomeHeader from '../../components/PrimeiroAcesso/WelcomeHeader';
import ProgressionWizard from '../../components/PrimeiroAcesso/ProgressionWizard';
import FinalChoices from '../../components/PrimeiroAcesso/FinalChoices';
import SimpleFooter from '../../components/SimpleFooter';

export default function PrimeiroAcesso() {
  const [showFinalChoices, setShowFinalChoices] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="transition-colors duration-500 ease-in-out min-h-screen bg-[#F9FAFB] text-zinc-900 dark:bg-[#09090B] dark:text-zinc-50 font-sans flex flex-col selection:bg-red-500 selection:text-white">
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
          <FinalChoices />
        )}
      </main>

      {/* === FOOTER SIMPLIFICADO === */}
      <div className="mt-auto relative z-30">
        <SimpleFooter />
      </div>
    </div>
  );
}
