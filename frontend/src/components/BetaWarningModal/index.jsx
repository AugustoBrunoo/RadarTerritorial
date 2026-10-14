import React, { useState, useEffect } from 'react';
import { Hammer, TestTube2, AlertTriangle, ChevronRight, ChevronLeft, X } from 'lucide-react';

export default function BetaWarningModal({ onClose }) {
  const [isVisible, setIsVisible] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    // Aciona a transição de entrada suave logo após a montagem
    const timer = setTimeout(() => setIsVisible(true), 50);
    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    sessionStorage.setItem('hasSeenBetaModal', 'true');
    setIsVisible(false);
    setTimeout(() => {
      if (onClose) onClose();
    }, 450);
  };

  const slides = [
    {
      id: 1,
      icon: <Hammer className="h-12 w-12 text-blue-500" />,
      title: "Versão em Construção",
      description: "Bem-vindo ao Radar Territorial! Nossa plataforma está atualmente em fase de desenvolvimento e construção ativa.",
      bg: "bg-blue-50 dark:bg-blue-900/20"
    },
    {
      id: 2,
      icon: <TestTube2 className="h-12 w-12 text-purple-500" />,
      title: "Fase de Testes",
      description: "Abrimos o sistema antecipadamente para avaliar ajustes, coletar feedbacks e realizar testes práticos com usuários reais.",
      bg: "bg-purple-50 dark:bg-purple-900/20"
    },
    {
      id: 3,
      icon: <AlertTriangle className="h-12 w-12 text-amber-500" />,
      title: "Aviso Importante",
      description: "Durante esta fase beta, você pode encontrar inconsistências, lentidão ou erros no sistema. Contamos com sua compreensão!",
      bg: "bg-amber-50 dark:bg-amber-900/20"
    }
  ];

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      handleClose();
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  return (
    <div className={`fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md transition-opacity duration-500 ease-out ${
      isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
    }`}>
      <div 
        role="dialog"
        aria-modal="true"
        aria-label="Aviso de versão em construção"
        className={`bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-[2.5rem] w-full max-w-lg overflow-hidden shadow-2xl relative flex flex-col transition-all duration-500 ease-out transform ${
        isVisible ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 translate-y-4"
      }`}>
        
        {/* Header / Botão Fechar */}
        <div className="absolute top-4 right-4 z-10">
          <button 
            onClick={handleClose}
            aria-label="Fechar aviso de versão beta"
            className="p-2 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 rounded-full transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Corpo do Carrossel */}
        <div className="p-8 sm:p-12 text-center flex-grow flex flex-col items-center justify-center min-h-[320px] relative overflow-hidden">
          {slides.map((slide, index) => (
            <div 
              key={slide.id}
              className={`absolute inset-0 p-8 sm:p-12 flex flex-col items-center justify-center transition-all duration-500 ease-in-out ${
                index === currentSlide ? "opacity-100 translate-x-0" : index < currentSlide ? "opacity-0 -translate-x-full" : "opacity-0 translate-x-full"
              }`}
            >
              <div className={`w-24 h-24 ${slide.bg} rounded-full flex items-center justify-center mb-6 shadow-inner`}>
                {slide.icon}
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-zinc-900 dark:text-white mb-4 tracking-tight">
                {slide.title}
              </h2>
              <p className="text-zinc-600 dark:text-zinc-400 font-medium leading-relaxed">
                {slide.description}
              </p>
            </div>
          ))}
        </div>

        {/* Rodapé / Controles */}
        <div className="px-8 pb-8 pt-4 flex flex-col sm:flex-row items-center justify-between gap-6 border-t border-zinc-100 dark:border-zinc-800/60 bg-zinc-50 dark:bg-zinc-950/30">
          
          {/* Indicadores */}
          <div className="flex gap-1 justify-center sm:justify-start order-2 sm:order-1 items-center">
            {slides.map((_, index) => (
              <button 
                key={index}
                onClick={() => setCurrentSlide(index)}
                className="p-2 flex items-center justify-center focus:outline-none"
                aria-label={`Ir para o slide ${index + 1}`}
              >
                <span className={`h-2 rounded-full transition-all duration-300 block ${
                  index === currentSlide 
                    ? "w-8 bg-red-600" 
                    : "w-2 bg-zinc-300 dark:bg-zinc-700 hover:bg-zinc-400"
                }`} />
              </button>
            ))}
          </div>

          {/* Botões de Ação */}
          <div className="flex items-center gap-3 w-full sm:w-auto order-1 sm:order-2">
            {currentSlide > 0 && (
              <button 
                onClick={prevSlide}
                aria-label="Slide anterior"
                className="p-3.5 rounded-2xl font-bold bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 transition-all flex items-center justify-center"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
            )}
            
            <button 
              onClick={nextSlide}
              className={`flex-1 sm:flex-none py-3.5 px-6 rounded-2xl font-bold text-white transition-all flex items-center justify-center gap-2 shadow-md ${
                currentSlide === slides.length - 1 
                  ? "bg-green-600 hover:bg-green-700 shadow-green-600/20" 
                  : "bg-red-600 hover:bg-red-700 shadow-red-600/20"
              }`}
            >
              {currentSlide === slides.length - 1 ? "Entendi, acessar!" : "Avançar"}
              {currentSlide < slides.length - 1 && <ChevronRight className="h-4 w-4" />}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
