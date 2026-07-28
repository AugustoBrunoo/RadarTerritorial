import React, { useState, useEffect } from 'react';
import { Send, ArrowBigUp, CornerDownRight, ArrowRight, Check } from 'lucide-react';
import { completeFirstAccess } from '../../services/authService';

export default function ProgressionWizard({ onFinish }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [statusText, setStatusText] = useState('Atualizando...');
  const [isLoading, setIsLoading] = useState(false);
  const totalSteps = 4;

  useEffect(() => {
    const interval = setInterval(() => {
      setStatusText('Não Resolvido');
      setTimeout(() => setStatusText('Resolvido'), 1500);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleNextStep = async () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      setIsLoading(true);
      await completeFirstAccess();
      setIsLoading(false);
      onFinish();
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-[2.5rem] shadow-xl p-6 sm:p-10 relative overflow-hidden transition-all duration-500 animate-slide-up opacity-0" style={{ animationDelay: '200ms', animationFillMode: 'forwards' }}>
      
      {/* Progress Bar */}
      <div className="w-full bg-zinc-100 dark:bg-zinc-800 h-1.5 rounded-full mb-8 overflow-hidden">
        <div 
          className="bg-red-600 h-full transition-all duration-500 ease-out"
          style={{ width: `${(currentStep / totalSteps) * 100}%` }}
        ></div>
      </div>

      <div className="relative min-h-[320px] sm:min-h-[280px]">
        
        {/* PASSO 1: Explorar */}
        <div className={`absolute inset-0 flex flex-col sm:flex-row items-center gap-8 transition-all duration-500 transform ${currentStep === 1 ? 'translate-x-0 opacity-100 pointer-events-auto' : currentStep > 1 ? '-translate-x-full opacity-0 pointer-events-none' : 'translate-x-full opacity-0 pointer-events-none'}`}>
          <div className="w-full sm:w-1/2">
            <span className="text-xs font-black uppercase tracking-widest text-red-600 mb-2 block">Passo 1</span>
            <h3 className="text-2xl font-bold text-zinc-900 dark:text-white mb-3">Feed Comunitário</h3>
            <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed">
              É aqui que a mágica acontece. No feed, você visualiza todos os relatos publicados pelos moradores da Zona Oeste. Filtre por bairro, urgência e entenda as necessidades da sua rua.
            </p>
          </div>
          <div className="w-full sm:w-1/2 bg-zinc-50 dark:bg-zinc-950 p-4 rounded-2xl border border-zinc-100 dark:border-zinc-800 relative overflow-hidden h-40">
            <div className="absolute inset-x-4 top-4 space-y-3 animate-slide-up infinite" style={{ animationDuration: '4s' }}>
              <div className="bg-white dark:bg-zinc-900 p-3 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm flex gap-3">
                <div className="w-8 h-8 bg-zinc-200 dark:bg-zinc-800 rounded-full flex-shrink-0"></div>
                <div className="space-y-1.5 flex-1">
                  <div className="h-2 w-1/2 bg-zinc-200 dark:bg-zinc-800 rounded"></div>
                  <div className="h-2 w-full bg-zinc-200 dark:bg-zinc-800 rounded"></div>
                  <div className="h-2 w-3/4 bg-zinc-200 dark:bg-zinc-800 rounded"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* PASSO 2: Ação */}
        <div className={`absolute inset-0 flex flex-col sm:flex-row items-center gap-8 transition-all duration-500 transform ${currentStep === 2 ? 'translate-x-0 opacity-100 pointer-events-auto' : currentStep > 2 ? '-translate-x-full opacity-0 pointer-events-none' : 'translate-x-full opacity-0 pointer-events-none'}`}>
          <div className="w-full sm:w-1/2">
            <span className="text-xs font-black uppercase tracking-widest text-blue-500 mb-2 block">Passo 2</span>
            <h3 className="text-2xl font-bold text-zinc-900 dark:text-white mb-3">Criar Relatos</h3>
            <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed">
              Buraco na via? Lâmpada queimada? Esgoto a céu aberto? Crie um relato detalhado (ou deixe nossa IA ajudar você). O seu registro vira um alerta oficial na plataforma.
            </p>
          </div>
          <div className="w-full sm:w-1/2 bg-zinc-50 dark:bg-zinc-950 p-4 rounded-2xl border border-zinc-100 dark:border-zinc-800 h-40 flex flex-col justify-center">
            <div className="bg-white dark:bg-zinc-900 p-3 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
              <div className="h-2 w-1/3 bg-zinc-200 dark:bg-zinc-800 rounded mb-3"></div>
              <div className="overflow-hidden whitespace-nowrap text-xs font-mono text-zinc-600 dark:text-zinc-400 border-r-2 border-red-500 typing-container animate-typing mb-4">
                Buraco enorme na via principal...
              </div>
              <div className="flex justify-end mt-2">
                <div className="animate-btn-click px-3 py-1.5 rounded-lg text-[10px] font-bold text-white flex items-center gap-1 w-[70px] justify-center overflow-hidden">
                  <Send className="h-3 w-3" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* PASSO 3: Interação */}
        <div className={`absolute inset-0 flex flex-col sm:flex-row items-center gap-8 transition-all duration-500 transform ${currentStep === 3 ? 'translate-x-0 opacity-100 pointer-events-auto' : currentStep > 3 ? '-translate-x-full opacity-0 pointer-events-none' : 'translate-x-full opacity-0 pointer-events-none'}`}>
          <div className="w-full sm:w-1/2">
            <span className="text-xs font-black uppercase tracking-widest text-amber-500 mb-2 block">Passo 3</span>
            <h3 className="text-2xl font-bold text-zinc-900 dark:text-white mb-3">Apoiar e Comentar</h3>
            <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed">
              Um problema na sua rua não afeta só você. Vizinhos podem apoiar sua publicação para aumentar a relevância dela, gerar discussões nos comentários e cobrar resoluções.
            </p>
          </div>
          <div className="w-full sm:w-1/2 bg-zinc-50 dark:bg-zinc-950 p-4 rounded-2xl border border-zinc-100 dark:border-zinc-800 h-40 flex flex-col justify-center gap-4">
            <div className="flex items-center gap-4 bg-white dark:bg-zinc-900 p-3 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
              <div className="flex items-center gap-1.5 text-red-500 font-black animate-bounce-slight bg-red-50 dark:bg-red-900/20 px-2 py-1 rounded-lg">
                <ArrowBigUp className="h-4 w-4" /> +1
              </div>
              <div className="h-2 w-1/2 bg-zinc-200 dark:bg-zinc-800 rounded"></div>
            </div>
            <div className="flex items-start gap-2 pl-4 animate-slide-up infinite" style={{ animationDuration: '3s' }}>
              <CornerDownRight className="h-4 w-4 text-zinc-300 mt-1" />
              <div className="bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 text-xs px-3 py-2 rounded-lg font-medium border border-blue-100 dark:border-blue-900/30">
                "Eu passo aí todo dia, muito perigoso!"
              </div>
            </div>
          </div>
        </div>

        {/* PASSO 4: Solução */}
        <div className={`absolute inset-0 flex flex-col sm:flex-row items-center gap-8 transition-all duration-500 transform ${currentStep === 4 ? 'translate-x-0 opacity-100 pointer-events-auto' : 'translate-x-full opacity-0 pointer-events-none'}`}>
          <div className="w-full sm:w-1/2">
            <span className="text-xs font-black uppercase tracking-widest text-green-500 mb-2 block">Passo 4</span>
            <h3 className="text-2xl font-bold text-zinc-900 dark:text-white mb-3">Acompanhar Impacto</h3>
            <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed">
              Você possui um painel exclusivo para monitorar se a prefeitura resolveu o que você solicitou. O status do seu relato é atualizado oficialmente pela gestão da cidade.
            </p>
          </div>
          <div className="w-full sm:w-1/2 bg-zinc-50 dark:bg-zinc-950 p-4 rounded-2xl border border-zinc-100 dark:border-zinc-800 h-40 flex flex-col justify-center items-center">
            <div className="bg-white dark:bg-zinc-900 p-6 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm w-full text-center relative overflow-hidden">
              <span className="text-xs font-black uppercase tracking-widest block mb-1 text-zinc-400">Status do Relato</span>
              <div className="animate-status-change px-4 py-2 rounded-lg text-sm font-bold inline-flex items-center justify-center min-w-[120px]">
                <span>{statusText}</span>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Controles do Wizard */}
      <div className="mt-8 pt-6 border-t border-zinc-100 dark:border-zinc-800 flex justify-between items-center">
        <button 
          onClick={handlePrevStep}
          disabled={isLoading}
          className={`text-sm font-bold text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors px-4 py-2 ${(currentStep === 1 || isLoading) ? 'invisible' : 'visible'}`}
        >
          Voltar
        </button>
        <button 
          onClick={handleNextStep}
          disabled={isLoading}
          className={`bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 px-6 py-2.5 rounded-xl text-sm font-bold transition-transform shadow-md flex items-center gap-2 ${isLoading ? 'opacity-75 cursor-not-allowed' : 'hover:-translate-y-0.5'}`}
        >
          {isLoading ? (
            <>Carregando... <span className="animate-pulse">⏳</span></>
          ) : currentStep === totalSteps ? (
            <>Começar Agora <Check className="h-4 w-4 ml-1" /></>
          ) : (
            <>Continuar <ArrowRight className="h-4 w-4 ml-1" /></>
          )}
        </button>
      </div>
    </div>
  );
}
