import React, { useState, useEffect } from 'react';
import { MessageCircle, Loader2 } from 'lucide-react';
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
        {
          ...data,
          authorName: "Você" // Uma forma simplificada, ou poderíamos buscar o profile real
        },
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
    <div className="bg-white dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 shadow-sm overflow-hidden">
      <h3 className="font-bold text-lg mb-4 flex items-center gap-2 text-zinc-900 dark:text-white">
        <MessageCircle className="h-5 w-5 text-zinc-400" /> Comentários ({commentsCount})
      </h3>

      {/* Input de Comentário */}
      <div className="mb-6 relative">
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          disabled={!currentUserId}
          className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-4 text-sm text-zinc-900 dark:text-zinc-300 placeholder-zinc-400 dark:placeholder-zinc-600 focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 resize-none h-24 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          placeholder={currentUserId ? "Adicione uma atualização ou opinião..." : "Faça login para comentar"}
        ></textarea>
        <button 
          onClick={handleComentar}
          disabled={!currentUserId || !comment.trim() || isSubmitting}
          className="absolute bottom-3 right-3 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 rounded-xl px-4 py-1.5 text-sm font-bold hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 cursor-pointer"
        >
          {isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />}
          Enviar
        </button>
      </div>

      {/* Lista de Comentários */}
      <div className="space-y-4 max-h-[500px] overflow-y-auto pr-1">
        {isLoading ? (
          <div className="flex justify-center items-center py-6">
            <Loader2 className="h-6 w-6 animate-spin text-zinc-400" />
          </div>
        ) : comments.length === 0 ? (
          <p className="text-zinc-500 text-sm italic text-center py-4">Nenhum comentário ainda. Seja o primeiro!</p>
        ) : (
          comments.map(c => (
            <div key={c.id} className="flex gap-3 animate-in fade-in slide-in-from-bottom-2 min-w-0">
              <div className="w-10 h-10 rounded-full bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center shrink-0 border border-zinc-300 dark:border-zinc-700 shadow-sm mt-1">
                <span className="font-extrabold text-xs text-zinc-600 dark:text-zinc-400">
                  {getInitials(c.authorName)}
                </span>
              </div>
              <div className="flex-1 min-w-0 bg-zinc-50 dark:bg-zinc-950/50 p-4 rounded-3xl rounded-tl-sm border border-zinc-100 dark:border-zinc-800/80 shadow-sm">
                <div className="flex justify-between items-start mb-1.5 gap-2 min-w-0">
                  <span className="font-bold text-sm text-zinc-900 dark:text-zinc-200 truncate min-w-0">{c.authorName}</span>
                  <span className="text-[10px] text-zinc-400 whitespace-nowrap font-medium flex-shrink-0">
                    {new Date(c.created_at).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' })} às {new Date(c.created_at).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed whitespace-pre-wrap break-words [overflow-wrap:anywhere]">{c.texto}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
