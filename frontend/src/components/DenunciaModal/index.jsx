import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { Flag, X, CheckCircle, Loader2, UserCircle, LogIn } from 'lucide-react';
import { denunciarRelato } from '../../services/interacoesService';

export default function DenunciaModal({ isOpen, onClose, reportId, currentUserId }) {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [reason, setReason] = useState('');
  const [details, setDetails] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  if (!isOpen) return null;

  const handleClose = () => {
    setStep(1);
    setReason('');
    setDetails('');
    setErrorMessage('');
    onClose();
  };

  if (!currentUserId) {
    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-300">
        <div className="bg-white dark:bg-zinc-900 w-full max-w-md rounded-3xl p-6 sm:p-8 shadow-2xl border border-zinc-200 dark:border-zinc-800 transform animate-in zoom-in-95 duration-300 relative text-center flex flex-col items-center">
          <button 
            onClick={handleClose}
            className="absolute top-4 right-4 text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 transition-colors bg-zinc-100 dark:bg-zinc-800 p-1.5 rounded-full"
          >
            <X className="h-4 w-4" />
          </button>

          <div className="w-16 h-16 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-full flex items-center justify-center mb-5">
            <UserCircle className="h-8 w-8" />
          </div>

          <h3 className="text-xl font-black text-zinc-900 dark:text-white mb-2">
            Acesso Restrito
          </h3>

          <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-6 font-medium leading-relaxed">
            Para garantir a veracidade e a segurança da comunidade, você precisa estar conectado à sua conta para enviar uma denúncia.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 w-full">
            <button 
              onClick={handleClose}
              className="flex-1 py-3.5 px-4 rounded-xl text-sm font-bold text-zinc-700 dark:text-zinc-300 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-all"
            >
              Cancelar
            </button>
            <button 
              onClick={() => navigate('/login')}
              className="flex-1 py-3.5 px-4 rounded-xl text-sm font-bold text-white bg-red-600 hover:bg-red-700 transition-all shadow-md shadow-red-600/20 flex items-center justify-center gap-2"
            >
              <LogIn className="h-4 w-4" /> Fazer Login
            </button>
          </div>
        </div>
      </div>
    );
  }

  const handleSubmit = async () => {
    if (!reason || isSubmitting) return;

    setIsSubmitting(true);
    setErrorMessage('');

    const { success, error } = await denunciarRelato(reportId, currentUserId, reason, details);

    setIsSubmitting(false);

    if (success) {
      setStep(2);
    } else {
      setErrorMessage(error || 'Erro ao enviar a denúncia. Tente novamente.');
    }
  };

  const reasons = [
    'Spam ou Comercial',
    'Falso / Fake News',
    'Ofensivo ou Ódio',
    'Outro Motivo'
  ];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-300">
      <div className="bg-white dark:bg-zinc-900 w-full max-w-md rounded-3xl p-6 sm:p-8 shadow-2xl border border-zinc-200 dark:border-zinc-800 transform animate-in zoom-in-95 duration-300">
        
        {step === 1 ? (
          <div>
            <div className="flex justify-between items-center mb-5">
              <h3 className="text-xl font-black text-zinc-900 dark:text-white flex items-center gap-2">
                <Flag className="h-5 w-5 text-red-600" /> Denunciar Relato
              </h3>
              <button 
                onClick={handleClose}
                className="text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 transition-colors bg-zinc-100 dark:bg-zinc-800 p-1.5 rounded-full"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4 font-medium">
              Por que você está denunciando esta publicação?
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
              {reasons.map((r) => (
                <button 
                  key={r}
                  type="button" 
                  onClick={() => setReason(r)}
                  className={`text-left px-4 py-3 rounded-xl border text-sm font-bold transition-all ${
                    reason === r 
                      ? 'border-red-600 bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-400 dark:border-red-500' 
                      : 'border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800'
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>

            <div className="mb-6">
              <label className="block text-xs font-black uppercase tracking-widest text-zinc-400 mb-2">
                Detalhes (Opcional)
              </label>
              <textarea
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl p-3 text-sm text-zinc-900 dark:text-white focus:ring-1 focus:ring-zinc-300 dark:focus:ring-zinc-700 outline-none transition-all placeholder-zinc-400 shadow-sm custom-scroll resize-none h-20"
                placeholder="Nos conte mais detalhes sobre o problema..."
              />
            </div>

            {errorMessage && (
              <p className="text-xs text-red-600 font-bold mb-4 bg-red-50 dark:bg-red-900/20 p-2.5 rounded-xl border border-red-200 dark:border-red-800">
                {errorMessage}
              </p>
            )}

            <div className="flex gap-3">
              <button 
                onClick={handleClose}
                disabled={isSubmitting}
                className="flex-1 py-3 px-4 rounded-xl text-sm font-bold text-zinc-700 dark:text-zinc-300 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-all disabled:opacity-50"
              >
                Cancelar
              </button>
              <button 
                onClick={handleSubmit} 
                disabled={!reason || isSubmitting}
                className="flex-1 py-3 px-4 rounded-xl text-sm font-bold text-white bg-red-600 hover:bg-red-700 transition-all shadow-md shadow-red-600/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Enviar'}
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center text-center py-6">
            <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full flex items-center justify-center mb-4 animate-in zoom-in duration-300">
              <CheckCircle className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-black text-zinc-900 dark:text-white mb-2">Denúncia Enviada!</h3>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-8 font-medium">
              Nossa equipe irá analisar o relato o mais rápido possível. Obrigado por manter nossa comunidade segura.
            </p>
            <button 
              onClick={handleClose}
              className="w-full py-3 px-4 rounded-xl text-sm font-bold text-zinc-700 dark:text-zinc-300 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-all"
            >
              Fechar Aba
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
