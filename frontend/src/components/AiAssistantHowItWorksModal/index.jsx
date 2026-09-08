import React, { useState, useEffect } from 'react';
import { Sparkles, X, MessageSquare, Brain, CheckSquare, ChevronRight, Check } from 'lucide-react';

export default function AiAssistantHowItWorksModal({ isOpen, onClose }) {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 3;

  useEffect(() => {
    if (isOpen) {
      setCurrentStep(1);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(prev => prev + 1);
    } else {
      onClose();
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-zinc-900/60 dark:bg-black/80 backdrop-blur-md animate-in fade-in duration-300">
      <div className="bg-white dark:bg-zinc-900 w-full max-w-lg rounded-[2.5rem] border border-zinc-200 dark:border-zinc-800 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300 flex flex-col">

        {/* Header */}
        <div className="p-6 border-b border-zinc-100 dark:border-zinc-800/80 flex justify-between items-center bg-zinc-50 dark:bg-zinc-950/40">
          <div className="flex items-center gap-2.5">
            <div className="bg-red-600 p-2 rounded-xl text-white">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-black text-lg text-zinc-900 dark:text-white leading-none">Como funciona a IA?</h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-zinc-200 dark:hover:bg-zinc-800 rounded-full transition-colors text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Body (Slides) */}
        <div className="p-6 sm:p-8 flex-1">
          {currentStep === 1 && (
            <div className="space-y-5 animate-in fade-in duration-300">
              <div className="w-16 h-16 bg-red-100 dark:bg-red-900/20 rounded-2xl flex items-center justify-center text-red-600">
                <MessageSquare className="h-8 w-8" />
              </div>
              <h4 className="text-xl font-extrabold text-zinc-950 dark:text-white">1. Você escreve do seu jeito</h4>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed font-medium">
                Não se preocupe com termos formais ou preenchimento de campos repetitivos. Escreva como se estivesse conversando com um vizinho em um aplicativo de mensagens.
              </p>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-5 animate-in fade-in duration-300">
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/20 rounded-2xl flex items-center justify-center text-blue-600">
                <Brain className="h-8 w-8" />
              </div>
              <h4 className="text-xl font-extrabold text-zinc-950 dark:text-white">2. Processamos e Extraímos os dados</h4>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed font-medium">
                Nosso modelo de Processamento de Linguagem Natural analisa seu texto instantaneamente para identificar a categoria (Buraco, Lixo, Luz apagada), o endereço exato e estimar o nível de urgência.
              </p>
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-5 animate-in fade-in duration-300">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-2xl flex items-center justify-center text-green-600">
                <CheckSquare className="h-8 w-8" />
              </div>
              <h4 className="text-xl font-extrabold text-zinc-950 dark:text-white">3. Você valida e publica</h4>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed font-medium">
                A IA te devolve um card estruturado para você revisar. Se estiver tudo correto, você escolhe se quer conectar sua conta ou enviar de forma 100% anônima e segura.
              </p>
            </div>
          )}

          {/* Progress Indicators */}
          <div className="flex items-center gap-1.5 mt-8 justify-center">
            {[1, 2, 3].map((step) => (
              <span
                key={step}
                className={`h-2 rounded-full transition-all duration-300 ${currentStep === step ? 'w-8 bg-red-600' : 'w-2.5 bg-zinc-200 dark:bg-zinc-800'}`}
              ></span>
            ))}
          </div>
        </div>

        {/* Controls */}
        <div className="p-6 bg-zinc-50 dark:bg-zinc-950/40 border-t border-zinc-100 dark:border-zinc-800/80 flex justify-between items-center">
          <button
            onClick={prevStep}
            disabled={currentStep === 1}
            className={`text-xs font-bold py-2 px-4 transition-colors ${currentStep === 1 ? 'text-zinc-400 cursor-not-allowed' : 'text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white cursor-pointer'}`}
          >
            Anterior
          </button>
          <button
            onClick={nextStep}
            className="bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 font-extrabold text-xs py-3 px-5 rounded-xl transition-all hover:scale-105 active:scale-95 flex items-center gap-1.5"
          >
            {currentStep === totalSteps ? (
              <><span>Começar</span> <Check className="h-4 w-4" /></>
            ) : (
              <><span>Avançar</span> <ChevronRight className="h-4 w-4" /></>
            )}
          </button>
        </div>

      </div>
    </div>
  );
}
