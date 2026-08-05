import React from 'react';
import { X, LayoutDashboard, Clock, CheckCircle, Users, Check, ArrowRight } from 'lucide-react';

export default function DemandasTutorialModal({ 
  isOpen, 
  onClose, 
  currentTutStep, 
  totalTutSteps, 
  onNext, 
  onPrev 
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
      <div className="bg-white dark:bg-zinc-900 w-full max-w-lg rounded-3xl p-6 sm:p-8 shadow-2xl border border-zinc-200 dark:border-zinc-800 relative overflow-hidden animate-in zoom-in-95 duration-200">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 transition-colors bg-zinc-100 dark:bg-zinc-800 p-2 rounded-full z-10"
        >
          <X className="h-4 w-4" />
        </button>

        {currentTutStep === 1 && (
          <div className="text-center py-4 animate-in fade-in zoom-in duration-300">
            <div className="w-20 h-20 bg-red-50 dark:bg-red-900/20 text-red-600 mx-auto rounded-full flex items-center justify-center mb-6">
              <LayoutDashboard className="h-10 w-10" />
            </div>
            <h3 className="text-2xl font-black text-zinc-900 dark:text-white mb-3">Bem-vindo às Suas Demandas</h3>
            <p className="text-zinc-600 dark:text-zinc-400 font-medium leading-relaxed">
              Aqui é o seu centro de controle. Todos os problemas e ocorrências que você reportou na comunidade ficam salvos nesta tela para você acompanhar o andamento de forma transparente.
            </p>
          </div>
        )}

        {currentTutStep === 2 && (
          <div className="text-center py-4 animate-in fade-in zoom-in duration-300">
            <div className="w-20 h-20 bg-amber-50 dark:bg-amber-900/20 text-amber-600 mx-auto rounded-full flex items-center justify-center mb-6">
              <Clock className="h-10 w-10" />
            </div>
            <h3 className="text-2xl font-black text-zinc-900 dark:text-white mb-3">Demandas Não Resolvidas</h3>
            <p className="text-zinc-600 dark:text-zinc-400 font-medium leading-relaxed">
              Estes são os relatos que enviamos aos órgãos responsáveis, mas que <strong>ainda estão pendentes</strong>. Eles podem estar em análise técnica ou aguardando envio de equipes ao local.
            </p>
          </div>
        )}

        {currentTutStep === 3 && (
          <div className="text-center py-4 animate-in fade-in zoom-in duration-300">
            <div className="w-20 h-20 bg-green-50 dark:bg-green-900/20 text-green-600 mx-auto rounded-full flex items-center justify-center mb-6">
              <CheckCircle className="h-10 w-10" />
            </div>
            <h3 className="text-2xl font-black text-zinc-900 dark:text-white mb-3">Demandas Resolvidas</h3>
            <p className="text-zinc-600 dark:text-zinc-400 font-medium leading-relaxed">
              Vitória da comunidade! Quando a prefeitura, concessionária ou força pública atende o chamado e resolve o problema ou fornece uma resposta oficial final, a demanda cai nesta categoria.
            </p>
          </div>
        )}

        {currentTutStep === 4 && (
          <div className="text-center py-4 animate-in fade-in zoom-in duration-300">
            <div className="w-20 h-20 bg-blue-50 dark:bg-blue-900/20 text-blue-600 mx-auto rounded-full flex items-center justify-center mb-6">
              <Users className="h-10 w-10" />
            </div>
            <h3 className="text-2xl font-black text-zinc-900 dark:text-white mb-3">O poder da Comunidade</h3>
            <p className="text-zinc-600 dark:text-zinc-400 font-medium leading-relaxed">
              Lembre-se: quanto mais <strong className="text-zinc-900 dark:text-white">Apoios</strong> o seu relato tiver dos vizinhos no Feed, maior a visibilidade e mais rápida tende a ser a solução. Compartilhe suas demandas!
            </p>
          </div>
        )}

        <div className="mt-8 flex items-center justify-between">
          <button 
            onClick={onPrev}
            className={`text-zinc-500 hover:text-zinc-900 dark:hover:text-white font-bold text-sm transition-colors px-3 py-2 ${currentTutStep === 1 ? 'invisible' : ''}`}
          >
            Anterior
          </button>

          <div className="flex items-center gap-2">
            {[1, 2, 3, 4].map(step => (
              <div 
                key={step} 
                className={`h-2 rounded-full transition-all duration-300 ${currentTutStep === step ? 'bg-red-600 w-6' : 'bg-zinc-300 dark:bg-zinc-700 w-2'}`}
              ></div>
            ))}
          </div>

          <button 
            onClick={onNext}
            className={`flex items-center px-4 py-2 rounded-xl text-sm font-bold transition-all active:scale-95 shadow-md ${
              currentTutStep === totalTutSteps 
                ? 'bg-red-600 text-white hover:bg-red-700 shadow-red-600/20' 
                : 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 hover:scale-105'
            }`}
          >
            {currentTutStep === totalTutSteps ? (
              <>Entendi <Check className="h-4 w-4 ml-1" /></>
            ) : (
              <>Próximo <ArrowRight className="h-4 w-4 ml-1" /></>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
