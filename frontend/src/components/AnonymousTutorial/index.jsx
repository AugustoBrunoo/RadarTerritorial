import React from "react";

export default function AnonymousTutorial({
  currentStep,
  currentSlide,
  setCurrentStep,
  setCurrentSlide,
}) {
  return (
    <div
      id="step-tutorial"
      className={`flex-col items-center${currentStep === 1 ? " flex" : " hidden"}  w-full max-w-lg bg-white dark:bg-zinc-900 rounded-[2rem] border border-zinc-200 dark:border-zinc-800 p-8 shadow-2xl relative overflow-hidden text-center`}
    >
      <div className="w-full max-w-[150px] mx-auto h-1.5 bg-zinc-100 dark:bg-zinc-800 rounded-full mb-6 mt-2 overflow-hidden">
        <div
          id="progress-bar"
          className="h-full bg-red-600 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${(currentSlide / 3) * 100}%` }}
        ></div>
      </div>

      {/*  Slides do Tutorial  */}
      <div
        id="tutorial-slides"
        className="min-h-[250px] flex flex-col justify-center"
      >
        {/*  Slide 1  */}
        <div
          id="slide-1"
          className={currentSlide === 1 ? "animate-fade-in" : "hidden"}
        >
          <div className="w-16 h-16 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <i data-lucide="shield-check" className="h-8 w-8 text-red-600"></i>
          </div>
          <h3 className="text-2xl font-black mb-3">100% de Sigilo</h3>
          <p className="text-zinc-500 dark:text-zinc-400">
            Nenhum dado pessoal seu, como nome ou telefone, será guardado. Sua
            identidade está completamente protegida no sistema.
          </p>
        </div>

        {/*  Slide 2 (Oculto inicialmente)  */}
        <div
          id="slide-2"
          className={currentSlide === 2 ? "animate-fade-in" : "hidden"}
        >
          <div className="w-16 h-16 bg-zinc-100 dark:bg-zinc-800 rounded-full flex items-center justify-center mx-auto mb-6">
            <i
              data-lucide="map"
              className="h-8 w-8 text-zinc-900 dark:text-white"
            ></i>
          </div>
          <h3 className="text-2xl font-black mb-3">Poder de Gestão</h3>
          <p className="text-zinc-500 dark:text-zinc-400">
            Mesmo sem conta, o seu relato vai alimentar o mapa dos gestores
            públicos. A sua voz tem força estatística.
          </p>
        </div>

        {/*  Slide 3 (Oculto inicialmente)  */}
        <div
          id="slide-3"
          className={currentSlide === 3 ? "animate-fade-in" : "hidden"}
        >
          <div className="w-16 h-16 bg-zinc-100 dark:bg-zinc-800 rounded-full flex items-center justify-center mx-auto mb-6">
            <i
              data-lucide="message-square-off"
              className="h-8 w-8 text-zinc-900 dark:text-white"
            ></i>
          </div>
          <h3 className="text-2xl font-black mb-3">Limitações</h3>
          <p className="text-zinc-500 dark:text-zinc-400">
            Por segurança, relatos anônimos não podem ser acompanhados e não
            permitem que você comente ou interaja com outras queixas.
          </p>
        </div>
      </div>

      {/*  Controles do Tutorial  */}
      <div className="mt-8 flex justify-between items-center w-full">
        <button
          onClick={() => setCurrentStep(2)}
          className="text-sm font-semibold text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors"
        >
          Pular Tutorial
        </button>
        <button
          id="btn-next-slide"
          onClick={() => {
            if (currentSlide < 3) setCurrentSlide((s) => s + 1);
            else setCurrentStep(2);
          }}
          className="bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 px-6 py-2.5 rounded-full font-bold flex items-center gap-2 transition-transform hover:scale-105"
        >
          Próximo <i data-lucide="arrow-right" className="h-4 w-4"></i>
        </button>
      </div>
    </div>
  );
}
