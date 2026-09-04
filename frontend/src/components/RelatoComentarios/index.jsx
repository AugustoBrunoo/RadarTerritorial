import React, { useState, useEffect } from 'react';
import { MessageCircle, Loader2, BadgeCheck } from 'lucide-react';
import { getComentariosByRelato, adicionarComentario } from '../../services/interacoesService';

export default function RelatoComentarios({ report, currentUserId }) {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [commentsCount, setCommentsCount] = useState(report.comentarios_count || 0);

  const getInitials = (name) => {
    if (!name) return "U";
    const parts = name.trim().split(' ');
    if (parts.length > 1) {
      return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  useEffect(() => {
    async function loadComments() {
      if (!report?.id) return;
      setIsLoading(true);
      const data = await getComentariosByRelato(report.id);
      setComments(data);
      setIsLoading(false);
    }
    loadComments();
  }, [report?.id]);

  const handleComentar = async () => {
    if (!comment.trim() || !currentUserId || !report?.id || isSubmitting) return;

    setIsSubmitting(true);
    const { success, data, error } = await adicionarComentario(report.id, currentUserId, comment);
    
    if (success && data) {
      // Adicionar à lista otimista/real
      setComments(prev => [
        data,
        ...prev
      ]);
      setCommentsCount(prev => prev + 1);
      setComment("");
    } else {
      alert("Erro ao enviar comentário: " + (error || "Tente novamente."));
    }
    setIsSubmitting(false);
  };

  return (
    <div className="bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800/80 rounded-[2rem] p-6 sm:p-8 shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden relative">
      <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/5 rounded-full blur-3xl pointer-events-none"></div>
      
      <div className="flex items-center justify-between mb-6 relative z-10">
        <h3 className="font-black text-xl text-zinc-900 dark:text-white flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-2xl bg-zinc-100 dark:bg-zinc-800/80 flex items-center justify-center border border-zinc-200/50 dark:border-zinc-700/50">
            <MessageCircle className="h-5 w-5 text-red-600 dark:text-red-500" />
          </div>
          Comentários
        </h3>
        
        {commentsCount > 0 && (
          <div className="flex items-center justify-center px-3 py-1.5 bg-red-50 dark:bg-red-950/30 border border-red-100 dark:border-red-900/30 rounded-full">
            <span className="text-xs font-black text-red-600 dark:text-red-400">
              {commentsCount} {commentsCount === 1 ? 'comentário' : 'comentários'}
            </span>
          </div>
        )}
      </div>

      {/* Input de Comentário */}
      <div className="mb-8 relative group z-10">
        <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-amber-500 rounded-3xl blur opacity-0 group-focus-within:opacity-20 transition-opacity duration-500"></div>
        <div className="relative bg-zinc-50 dark:bg-zinc-950/80 border border-zinc-200 dark:border-zinc-800/80 rounded-3xl overflow-hidden transition-all duration-300 focus-within:border-red-300 dark:focus-within:border-red-800 focus-within:shadow-sm">
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            disabled={!currentUserId}
            className="w-full bg-transparent p-5 text-sm sm:text-base text-zinc-900 dark:text-zinc-300 placeholder-zinc-400 dark:placeholder-zinc-600 focus:outline-none resize-none h-28 transition-all disabled:opacity-50 disabled:cursor-not-allowed leading-relaxed font-medium"
            placeholder={currentUserId ? "Adicione uma atualização ou opinião..." : "Faça login para comentar"}
          ></textarea>
          
          <div className="px-3 pb-3 pt-1 flex justify-end">
            <button 
              onClick={handleComentar}
              disabled={!currentUserId || !comment.trim() || isSubmitting}
              className="bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 rounded-2xl px-6 py-2.5 text-sm font-bold hover:bg-zinc-800 dark:hover:bg-zinc-200 hover:-translate-y-0.5 hover:shadow-lg transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-none flex items-center gap-2 cursor-pointer"
            >
              {isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />}
              Publicar
            </button>
          </div>
        </div>
      </div>

      {/* Lista de Comentários */}
      <div className="space-y-6 max-h-[600px] overflow-y-auto custom-scroll pr-2 relative z-10">
        {isLoading ? (
          <div className="flex justify-center items-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-zinc-300 dark:text-zinc-700" />
          </div>
        ) : comments.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center px-4">
            <div className="w-16 h-16 rounded-full bg-zinc-100 dark:bg-zinc-800/50 flex items-center justify-center mb-4">
              <MessageCircle className="h-8 w-8 text-zinc-300 dark:text-zinc-600" />
            </div>
            <p className="text-zinc-600 dark:text-zinc-400 text-sm font-medium">Nenhum comentário ainda.</p>
            <p className="text-zinc-500 dark:text-zinc-500 text-xs mt-1">Seja o primeiro a compartilhar sua opinião!</p>
          </div>
        ) : (
          <div className="space-y-6 relative">
            <div className="absolute left-6 top-6 bottom-6 w-px bg-zinc-100 dark:bg-zinc-800/50"></div>
            {comments.map(c => {
              const isGestor = c.authorRole === 'gestor_publico' || c.authorRole === 'admin';
              
              return (
                <div key={c.id} className="flex gap-4 animate-in fade-in slide-in-from-bottom-4 duration-500 min-w-0 relative">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 border shadow-sm relative z-10 overflow-hidden ${isGestor ? 'bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-950/50 border-blue-200 dark:border-blue-800' : 'bg-gradient-to-br from-zinc-100 to-zinc-200 dark:from-zinc-800 dark:to-zinc-900 border-white dark:border-zinc-800'}`}>
                    <span className={`font-black text-sm ${isGestor ? 'text-blue-700 dark:text-blue-400' : 'text-zinc-700 dark:text-zinc-300'}`}>
                      {getInitials(c.authorName)}
                    </span>
                  </div>
                  <div className={`flex-1 min-w-0 p-5 rounded-3xl rounded-tl-xl border shadow-sm transition-shadow duration-300 group ${isGestor ? 'bg-blue-50/50 dark:bg-blue-950/20 border-blue-100 dark:border-blue-900/50 hover:shadow-md hover:border-blue-200 dark:hover:border-blue-800/80' : 'bg-white dark:bg-zinc-900 border-zinc-200/80 dark:border-zinc-800 hover:shadow-md'}`}>
                    <div className="flex justify-between items-start mb-3 gap-3 min-w-0">
                      <div className="flex flex-col min-w-0">
                        <span className={`font-bold text-sm sm:text-base truncate flex items-center gap-1.5 transition-colors ${isGestor ? 'text-blue-900 dark:text-blue-300' : 'text-zinc-900 dark:text-zinc-100 group-hover:text-red-600 dark:group-hover:text-red-400'}`}>
                          {c.authorName}
                          {isGestor && (
                            <BadgeCheck className="h-4 w-4 text-blue-500 flex-shrink-0" title="Gestor Público Verificado" />
                          )}
                        </span>
                        {isGestor && (
                          <span className="text-[10px] uppercase font-black tracking-wider text-blue-600/70 dark:text-blue-400/70 mt-0.5">Gestor Público</span>
                        )}
                      </div>
                      <span className={`text-[11px] whitespace-nowrap font-semibold flex-shrink-0 px-2 py-1 rounded-lg ${isGestor ? 'bg-blue-100/50 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400' : 'bg-zinc-100 dark:bg-zinc-800/50 text-zinc-400 dark:text-zinc-500'}`}>
                        {new Date(c.created_at).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' })} • {new Date(c.created_at).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                    <p className={`text-sm sm:text-[15px] leading-relaxed whitespace-pre-wrap break-words [overflow-wrap:anywhere] font-medium ${isGestor ? 'text-blue-800/90 dark:text-blue-200/90' : 'text-zinc-600 dark:text-zinc-300'}`}>
                      {c.texto}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
