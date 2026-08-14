import React from 'react';
import { Activity, ShieldCheck, Users, FileText } from 'lucide-react';

export default function AdminDashboard() {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <h2 className="text-2xl font-black text-zinc-900 dark:text-white mb-6">Visão Geral</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[
          { title: "Usuários Ativos", val: "---", icon: Users },
          { title: "Relatos no Sistema", val: "---", icon: FileText },
          { title: "Denúncias (Moderação)", val: "---", icon: ShieldCheck },
          { title: "Acessos Hoje", val: "---", icon: Activity },
        ].map((card, idx) => (
          <div key={idx} className="bg-white dark:bg-zinc-900 p-6 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-500 shrink-0">
              <card.icon className="h-6 w-6" />
            </div>
            <div>
              <p className="text-xs font-black uppercase tracking-widest text-zinc-400">{card.title}</p>
              <p className="text-2xl font-bold text-zinc-900 dark:text-white mt-1">{card.val}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-sm p-8 text-center max-w-3xl mx-auto mt-12">
        <ShieldCheck className="h-16 w-16 text-zinc-300 dark:text-zinc-700 mx-auto mb-4" />
        <h3 className="text-2xl font-black text-zinc-900 dark:text-white mb-3">Painel do Administrador do Sistema - Em Breve</h3>
        <p className="text-zinc-500 dark:text-zinc-400 leading-relaxed font-medium">
          A infraestrutura da área administrativa está configurada. Aqui faremos a moderação global de relatos, banimento de usuários infratores e a parametrização do Radar Territorial. O acesso está bloqueado e seguro apenas para os administradores.
        </p>
      </div>
    </div>
  );
}
