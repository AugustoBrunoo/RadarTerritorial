import React, { useState } from 'react';
import { Flag, Building2, TrendingUp, Layers, Bot, ShieldAlert, Briefcase } from 'lucide-react';
import AdminKpiCard from '../../../components/AdminKpiCard';
import AdminActionCard from '../../../components/AdminActionCard';

export default function AdminDashboard() {
  const [metrics] = useState({
    denunciasCount: 4,
    solicitacoesCount: 1,
    relatosCount: 1248
  });

  return (
    <div className="max-w-6xl mx-auto space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* 1. KPIS MACRO (Bento Grid Style) */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <AdminKpiCard 
          title="Denúncias Pendentes"
          value={metrics.denunciasCount}
          icon={Flag}
          colorScheme="red"
          trendIcon={TrendingUp}
          trendValue="+2 hoje"
          highlight={true}
        />
        
        <AdminKpiCard 
          title="Solicitações de Órgãos"
          value={metrics.solicitacoesCount}
          icon={Building2}
          colorScheme="amber"
        />

        <AdminKpiCard 
          title="Relatos (Mês Atual)"
          value={metrics.relatosCount}
          icon={Layers}
          colorScheme="blue"
        />

        <AdminKpiCard 
          title="Acurácia Triagem IA"
          value="--"
          icon={Bot}
          colorScheme="zinc"
          comingSoon={true}
        />
      </section>

      {/* 2. ATALHOS DE AÇÃO (Substituindo listas complexas no dashboard) */}
      <section className="space-y-6">
        <div>
          <h2 className="text-xl font-black text-zinc-900 dark:text-white flex items-center gap-2 mb-2">
            Ações Requeridas
          </h2>
          <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
            Módulos que exigem atenção da administração
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <AdminActionCard 
            title="Fila de Moderação"
            description="Relatos sinalizados como falsos, ofensivos ou spam pela comunidade aguardando análise."
            value={metrics.denunciasCount}
            valueSuffix="Pendentes"
            icon={ShieldAlert}
            actionText="Analisar Denúncias"
            actionLink="/admin/moderacao"
            colorClass="text-red-600 bg-red-50 dark:bg-red-950/30 border-red-100 dark:border-red-900/30"
            btnClass="bg-red-600 hover:bg-red-700 text-white dark:bg-red-600 dark:hover:bg-red-500"
          />

          <AdminActionCard 
            title="Solicitações de Órgãos"
            description="Novos cadastros de gestores públicos e órgãos que precisam de aprovação de acesso."
            value={metrics.solicitacoesCount}
            valueSuffix="Aguardando"
            icon={Briefcase}
            actionText="Gerenciar Órgãos"
            actionLink="/admin/orgaos"
            colorClass="text-amber-600 bg-amber-50 dark:bg-amber-950/30 border-amber-100 dark:border-amber-900/30"
            btnClass="bg-zinc-900 hover:bg-zinc-800 text-white dark:bg-white dark:hover:bg-zinc-200 dark:text-zinc-900"
          />
        </div>
      </section>
    </div>
  );
}
