import React, { useState } from 'react';
import { MessageCircle } from 'lucide-react';

export default function RelatoComentarios({ report }) {
  const [comment, setComment] = useState("");

  return (
    <div className="bg-white dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 shadow-sm">
      <h3 className="font-bold text-lg mb-4 flex items-center gap-2 text-zinc-900 dark:text-white">
        <MessageCircle className="h-5 w-5 text-zinc-400" /> Comentários ({report.comentarios_count || 0})
      </h3>

      {/* Input de Comentário */}
      <div className="mb-6 relative">
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-4 text-sm text-zinc-900 dark:text-zinc-300 placeholder-zinc-400 dark:placeholder-zinc-600 focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 resize-none h-24 transition-all"
          placeholder="Adicione uma atualização ou opinião..."
        ></textarea>
        <button className="absolute bottom-3 right-3 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 rounded-xl px-4 py-1.5 text-sm font-bold hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors active:scale-95">
          Enviar
        </button>
      </div>

      {/* Lista de Comentários */}
      <div className="space-y-5">
        {/* Aqui entrará o .map de comentários reais futuramente */}
        <p className="text-zinc-500 text-sm italic">Comentários ainda não estão totalmente integrados ao banco de dados.</p>
      </div>
    </div>
  );
}
