import React, { useState, useEffect } from "react";
import { Link } from "react-router";
import { Activity, History } from "lucide-react";
import { supabase } from "../../lib/supabaseClient";

export default function UserImpactCard() {
  const [stats, setStats] = useState({
    enviados: 0,
    naoResolvido: 0,
    resolvidos: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStats() {
      try {
        const { data: { user } } = await supabase.auth.getUser();

        if (!user) {
          setLoading(false);
          return;
        }

        const { data, error } = await supabase
          .from("relatos")
          .select("status")
          .eq("user_id", user.id);

        if (error) throw error;

        if (data) {
          let resolvidos = 0;
          let naoResolvidos = 0;

          data.forEach(relato => {
            if (relato.relatos_status === 'resolvido') {
              resolvidos++;
            } else {
              // pendente, em_analise, em_execucao, rejeitado
              naoResolvidos++;
            }
          });

          setStats({
            enviados: data.length,
            naoResolvido: naoResolvidos,
            resolvidos: resolvidos,
          });
        }
      } catch (err) {
        console.error("Erro ao carregar status dos relatos:", err);
      } finally {
        setLoading(false);
      }
    }

    loadStats();
  }, []);

  return (
    <div className="md:col-span-5 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-[2.5rem] p-8 flex flex-col justify-between shadow-sm relative overflow-hidden">
      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-6 text-zinc-500 dark:text-zinc-400">
          <Activity className="h-4 w-4" />
          <span className="text-[10px] font-black uppercase tracking-wider">Seu impacto comunitário</span>
        </div>
        <h3 className="text-2xl font-black tracking-tight mb-2 text-zinc-900 dark:text-white">Suas Demandas</h3>
        <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed font-medium mb-6">
          Confira o status consolidado das solicitações que você registrou na plataforma.
        </p>
      </div>

      {/* Grid de Status */}
      <div className="grid grid-cols-3 gap-3 mb-6 relative z-10">
        <div className="p-4 bg-zinc-50 dark:bg-zinc-950/40 border border-zinc-200 dark:border-zinc-800/60 rounded-2xl flex flex-col items-center justify-center text-center">
          {loading ? (
            <div className="h-8 w-8 mb-1 rounded-full border-2 border-zinc-300 border-t-zinc-900 dark:border-zinc-700 dark:border-t-white animate-spin"></div>
          ) : (
            <span className="text-3xl font-black text-zinc-900 dark:text-white">{stats.enviados}</span>
          )}
          <span className="text-[9px] font-bold text-zinc-500 dark:text-zinc-400 mt-1 uppercase tracking-wider">Enviados</span>
        </div>
        <div className="p-4 bg-zinc-50 dark:bg-zinc-950/40 border border-zinc-200 dark:border-zinc-800/60 rounded-2xl flex flex-col items-center justify-center text-center">
          {loading ? (
            <div className="h-8 w-8 mb-1 rounded-full border-2 border-zinc-300 border-t-amber-600 animate-spin"></div>
          ) : (
            <span className="text-3xl font-black text-amber-600 dark:text-amber-500">{stats.naoResolvido}</span>
          )}
          <span className="text-[9px] font-bold text-amber-600 mt-1 uppercase tracking-wider">Não Resolvido</span>
        </div>
        <div className="p-4 bg-zinc-50 dark:bg-zinc-950/40 border border-zinc-200 dark:border-zinc-800/60 rounded-2xl flex flex-col items-center justify-center text-center">
          {loading ? (
            <div className="h-8 w-8 mb-1 rounded-full border-2 border-zinc-300 border-t-green-600 animate-spin"></div>
          ) : (
            <span className="text-3xl font-black text-green-600 dark:text-green-500">{stats.resolvidos}</span>
          )}
          <span className="text-[9px] font-bold text-green-600 mt-1 uppercase tracking-wider">Resolvidos</span>
        </div>
      </div>

      <Link
        to="/demandas-usuario"
        className="relative z-10 w-full bg-zinc-900 dark:bg-zinc-100 hover:bg-zinc-800 dark:hover:bg-white text-white dark:text-zinc-900 font-extrabold py-3.5 px-4 rounded-xl text-xs flex items-center justify-center gap-2 transition-all"
      >
        <History className="h-4 w-4" /> <span>Ver Histórico de Relatos</span>
      </Link>
    </div>
  );
}
