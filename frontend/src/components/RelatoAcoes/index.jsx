import React, { useState, useEffect } from 'react';
import { Flame, ThumbsUp, Share2, X, AlertTriangle, Link2, MessageCircle, Check, Loader2 } from 'lucide-react';
import AutoSupportModal from '../AutoSupportModal';
import AuthRequiredModal from '../AuthRequiredModal';
import { toggleApoio, getUserApoios } from '../../services/interacoesService';

const InstagramIcon = ({ className }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
);

export default function RelatoAcoes({ report, isOwner, currentUserId }) {
  const [showModal, setShowModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [showInstagramModal, setShowInstagramModal] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);

  const [hasSupported, setHasSupported] = useState(false);
  const [apoiosCount, setApoiosCount] = useState(report.apoios_count || 0);
  const [isLiking, setIsLiking] = useState(false);

  useEffect(() => {
    async function checkSupport() {
      if (!currentUserId || !report?.id) return;
      const apoios = await getUserApoios(currentUserId);
      if (apoios.includes(report.id)) {
        setHasSupported(true);
      }
    }
    checkSupport();
  }, [currentUserId, report?.id]);

  const handleApoiar = async () => {
    if (!currentUserId) {
      setShowAuthModal(true);
      return;
    }
    if (isOwner) {
      setShowModal(true);
      return;
    }

    if (isLiking) return;

    setIsLiking(true);
    const prevSupported = hasSupported;
    const prevCount = apoiosCount;

    // Otimista
    setHasSupported(!prevSupported);
    setApoiosCount(prev => prevSupported ? Math.max(0, prev - 1) : prev + 1);

    const { success } = await toggleApoio(report.id, currentUserId, prevSupported);
    
    if (!success) {
      // Reverter em caso de falha
      setHasSupported(prevSupported);
      setApoiosCount(prevCount);
    }
    
    setIsLiking(false);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareText = `Confira este relato no Radar Territorial: ${report.categoria_nome || report.macro_eixo} em ${report.bairro || 'nossa região'}. Acesse para apoiar!`;
  const shareUrl = window.location.href;

  const handleWhatsAppShare = () => {
    window.open(`https://wa.me/?text=${encodeURIComponent(shareText + ' ' + shareUrl)}`, '_blank');
  };

  const handleInstagramShare = () => {
    // Instagram doesn't have a web share API for feed/stories directly via URL
    // Best effort is to copy the link and open IG
    handleCopyLink();
    setShowInstagramModal(true);
  };

  return (
    <>
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 relative shadow-sm">
        <div className="text-center mb-6">
          <div className="text-4xl font-black text-zinc-900 dark:text-white flex items-center justify-center gap-2 mb-1">
            <Flame className="h-8 w-8 text-red-600" /> {apoiosCount}
          </div>
          <p className="text-xs text-zinc-500 font-bold uppercase tracking-wider">Apoios da Vizinhança</p>
        </div>

        <button 
          onClick={handleApoiar}
          disabled={isLiking}
          className={`w-full font-bold py-4 rounded-2xl transition-all shadow-[0_0_20px_rgba(220,38,38,0.2)] flex items-center justify-center gap-2 mb-3 active:scale-95 disabled:opacity-70 disabled:cursor-wait
            ${hasSupported 
              ? "bg-red-50 dark:bg-red-950/40 text-red-600 border-2 border-red-200 dark:border-red-900 shadow-none hover:bg-red-100 dark:hover:bg-red-900/40" 
              : "bg-red-600 hover:bg-red-500 text-white hover:shadow-[0_0_25px_rgba(239,68,68,0.4)]"
            }
          `}
        >
          {isLiking ? <Loader2 className="h-5 w-5 animate-spin" /> : <ThumbsUp className={`h-5 w-5 ${hasSupported ? "fill-red-600" : ""}`} />} 
          {hasSupported ? "Apoiado" : "Apoiar Causa"}
        </button>

        <button 
          onClick={() => setShowShareModal(true)}
          className="w-full bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-900 dark:text-white font-bold py-3.5 rounded-2xl transition-all flex items-center justify-center gap-2 border border-zinc-200 dark:border-zinc-700 active:scale-95"
        >
          <Share2 className="h-5 w-5" /> Compartilhar
        </button>

        <p className="text-[11px] text-zinc-500 text-center mt-4 font-medium leading-relaxed">
          Ao apoiar, este relato ganha mais relevância no ranking da região e pressiona as autoridades por uma solução rápida.
        </p>
      </div>

      {/* Modal de Compartilhamento */}
      {showShareModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white dark:bg-zinc-950 rounded-3xl p-6 sm:p-8 max-w-sm w-full shadow-2xl border border-zinc-200 dark:border-zinc-800 animate-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-black text-zinc-900 dark:text-white flex items-center gap-2">
                <Share2 className="h-5 w-5 text-zinc-400" />
                Compartilhar
              </h3>
              <button 
                onClick={() => setShowShareModal(false)}
                className="text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors bg-zinc-100 dark:bg-zinc-800 p-2 rounded-full"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            
            <p className="text-zinc-600 dark:text-zinc-400 text-sm mb-6 font-medium">
              Envie este relato para seus vizinhos ou grupos. Quanto mais apoios, mais rápido o problema é resolvido!
            </p>

            <div className="flex bg-zinc-100 dark:bg-zinc-900 p-2 rounded-xl mb-6 border border-zinc-200 dark:border-zinc-800">
              <input 
                type="text" 
                readOnly 
                value={shareUrl}
                className="bg-transparent text-zinc-500 dark:text-zinc-400 text-xs w-full px-2 outline-none"
              />
              <button 
                onClick={handleCopyLink}
                className="bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white text-xs font-bold px-4 py-2 rounded-lg border border-zinc-200 dark:border-zinc-700 hover:bg-zinc-50 transition-colors flex items-center gap-2 shrink-0"
              >
                {copied ? <Check className="h-4 w-4 text-green-500" /> : <Link2 className="h-4 w-4" />}
                {copied ? "Copiado" : "Copiar"}
              </button>
            </div>
            
            <div className="space-y-3">
              <button 
                onClick={handleWhatsAppShare}
                className="w-full bg-[#25D366]/10 hover:bg-[#25D366]/20 text-[#25D366] font-bold py-3.5 px-4 rounded-xl transition-all flex items-center gap-3 border border-[#25D366]/20"
              >
                <MessageCircle className="h-5 w-5" /> Enviar pelo WhatsApp
              </button>

              <button 
                onClick={handleInstagramShare}
                className="w-full bg-gradient-to-r from-[#833AB4]/10 via-[#FD1D1D]/10 to-[#F56040]/10 hover:opacity-80 text-[#E1306C] font-bold py-3.5 px-4 rounded-xl transition-all flex items-center gap-3 border border-[#E1306C]/20"
              >
                <InstagramIcon className="h-5 w-5" /> Compartilhar no Instagram
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de confirmação do Instagram */}
      {showInstagramModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white dark:bg-zinc-950 rounded-3xl p-6 sm:p-8 max-w-sm w-full shadow-2xl border border-zinc-200 dark:border-zinc-800 animate-in zoom-in-95 duration-200 text-center relative">
            <button 
              onClick={() => setShowInstagramModal(false)}
              className="absolute top-4 right-4 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors bg-zinc-100 dark:bg-zinc-800 p-2 rounded-full"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#833AB4] via-[#FD1D1D] to-[#F56040] text-white flex items-center justify-center mx-auto mb-5 shadow-lg shadow-pink-500/20">
              <InstagramIcon className="h-8 w-8" />
            </div>

            <h3 className="text-xl font-black text-zinc-900 dark:text-white mb-2">
              Link Copiado!
            </h3>

            <p className="text-zinc-600 dark:text-zinc-400 text-sm mb-6 font-medium leading-relaxed">
              O link deste relato já foi copiado para sua área de transferência. Agora é só colar no seu Instagram (Direct ou Stories)!
            </p>

            <div className="space-y-2.5">
              <button 
                onClick={() => {
                  setShowInstagramModal(false);
                  window.open('https://instagram.com', '_blank');
                }}
                className="w-full bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#F56040] hover:opacity-95 text-white font-bold py-3.5 px-4 rounded-xl transition-all flex items-center justify-center gap-2 shadow-md"
              >
                <InstagramIcon className="h-4 w-4" /> Abrir Instagram
              </button>
              <button 
                onClick={() => setShowInstagramModal(false)}
                className="w-full bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 font-bold py-3 px-4 rounded-xl transition-colors text-xs"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}

      <AutoSupportModal 
        isOpen={showModal} 
        onClose={() => setShowModal(false)} 
      />
      <AuthRequiredModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} message="Crie uma conta para apoiar este relato." />
    </>
  );
}
