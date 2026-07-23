import React from "react";

export default function AnonymousAcceptance({
  currentStep,
  setCurrentStep,
  acceptedTerms,
  setAcceptedTerms,
}) {
  return (
    <>
      {/*  ==========================================
             ETAPA 2: TERMO DE ACEITE
             ==========================================  */}
      <div
        id="step-acceptance"
        className={`flex-col items-center${currentStep === 2 ? " flex" : " hidden"}  w-full max-w-lg text-center`}
      >
        <div className="w-20 h-20 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mb-6">
          <i data-lucide="alert-circle" className="h-10 w-10 text-red-600"></i>
        </div>

        <h2 className="text-3xl font-black tracking-tight mb-4">
          Antes de prosseguir.
        </h2>

        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 mb-8 text-left text-sm text-zinc-600 dark:text-zinc-400">
          <p className="mb-4">
            Para proteger a comunidade contra spam, o{" "}
            <strong>Modo Anônimo</strong> possui uma restrição importante:
          </p>
          <ul className="space-y-3 font-medium text-zinc-900 dark:text-zinc-300">
            <li className="flex items-start gap-2">
              <i
                data-lucide="x-circle"
                className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5"
              ></i>
              Não poderá interagir, curtir ou comentar nos problemas reportados
              pelos seus vizinhos na plataforma.
            </li>
          </ul>
        </div>

        <label className="flex items-center justify-center gap-3 cursor-pointer group mb-8">
          <div className="relative flex items-center">
            <input
              type="checkbox"
              id="accept-checkbox"
              className="custom-checkbox opacity-0 absolute h-6 w-6 cursor-pointer"
              checked={acceptedTerms}
              onChange={(e) => setAcceptedTerms(e.target.checked)}
            />
            <div
              className={`w-6 h-6 border-2 rounded flex items-center justify-center transition-colors ${acceptedTerms ? "bg-red-500 border-red-500" : "border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900"}`}
            >
              <svg
                className={`${acceptedTerms ? "block " : "hidden "}w-4 h-4 text-white pointer-events-none`}
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
          <span className="text-zinc-600 dark:text-zinc-400 font-medium select-none group-hover:text-zinc-900 dark:group-hover:text-white transition-colors">
            Eu entendo as restrições e quero continuar.
          </span>
        </label>

        <button
          id="btn-start-form"
          onClick={() => setCurrentStep(3)}
          disabled={!acceptedTerms}
          className={
            acceptedTerms
              ? "w-full py-4 rounded-xl font-bold text-lg transition-all duration-300 bg-red-600 hover:bg-red-700 text-white shadow-lg shadow-red-600/30"
              : "w-full py-4 rounded-xl font-bold text-lg transition-all duration-300 bg-zinc-200 dark:bg-zinc-800 text-zinc-400 cursor-not-allowed"
          }
        >
          Abrir Formulário Seguro
        </button>
        <p className="mt-4 text-xs text-zinc-500">
          Se prefere ter acesso total,{" "}
          <a
            href="escolhaReporte.html"
            className="text-red-600 font-bold underline hover:text-red-700"
          >
            volte e crie uma conta.
          </a>
        </p>
      </div>
    </>
  );
}
