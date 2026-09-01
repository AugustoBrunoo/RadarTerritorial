import React from 'react';
import { Link } from 'react-router';
import { PieChart, Settings, ListChecks, Layers, Clock4, Timer, ShieldCheck, Info, Loader2 } from 'lucide-react';
import HeaderOrgao from '../../components/HeaderOrgao';
import { useOrgaoDashboard } from '../../hooks/useOrgaoDashboard';
import KpiCardOrgao from '../../components/KpiCardOrgao';
import StatusDistributionCard from '../../components/StatusDistributionCard';
import NeighborhoodDemandsCard from '../../components/NeighborhoodDemandsCard';
import TopCategoriesCard from '../../components/TopCategoriesCard';
import NotificationSettingsCard from '../../components/NotificationSettingsCard';
import SlaSettingsCard from '../../components/SlaSettingsCard';

export default function DashboardOrgao() {
    const { kpis, loading, orgao, sla, setSla } = useOrgaoDashboard();

    return (
        <div className="min-h-screen bg-[#F9FAFB] text-zinc-900 dark:bg-[#09090B] dark:text-zinc-50 font-sans selection:bg-blue-500 selection:text-white flex flex-col">

            <HeaderOrgao />

            {/* === MAIN CONTENT === */}
            <main className="w-full max-w-6xl mx-auto px-4 pt-36 pb-20 flex-grow space-y-12">

                {/* HEADER DA PÁGINA */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                    <div>
                        <p className="text-blue-600 dark:text-blue-500 font-bold tracking-widest uppercase text-xs mb-2 flex items-center gap-2">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                            </span>
                            Gestão Institucional de Desempenho
                        </p>
                        <h1 className="text-3xl md:text-4xl font-black tracking-tight text-zinc-900 dark:text-white">
                            Dashboard Estratégico do Órgão
                        </h1>
                        <p className="text-zinc-500 dark:text-zinc-400 mt-2 max-w-xl">
                            Acompanhe a métrica acumulada de chamados direcionados à COMLURB, taxa de resposta e SLA operacional.
                        </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-3">
                        <Link to="/gestao/operacional" className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl text-sm font-bold flex items-center gap-2 transition-all shadow-md shadow-blue-500/20 hover:-translate-y-0.5">
                            <ListChecks className="h-4 w-4" /> Ir para Fila Operacional
                        </Link>
                    </div>
                </div>

                {/* === KPIS MACRO PRINCIPAIS === */}
                {loading ? (
                    <div className="flex items-center justify-center h-32 animate-fade-in-up">
                        <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                        <KpiCardOrgao
                            title="Relatos Atribuídos"
                            value={kpis.total.toString()}
                            subtitle="Total Geral"
                            icon={Layers}
                            colorClass="text-blue-600 dark:text-blue-500"
                            bgColorClass="bg-blue-50 dark:bg-blue-950/30"
                            badgeText="Total Geral"
                            tooltipText="Volume total de ocorrências direcionadas a este órgão pelo sistema no período selecionado."
                        />
                        <KpiCardOrgao
                            title="Não Respondidos (%)"
                            value={kpis.porcentagemNaoRespondidos}
                            subtitle={`(${kpis.naoRespondidos} chamados)`}
                            icon={Clock4}
                            colorClass="text-red-600 dark:text-red-500"
                            bgColorClass="bg-red-50 dark:bg-red-950/30"
                            badgeText="Atenção"
                            tooltipText="Percentual de chamados pendentes que ainda não receberam primeira resposta oficial ou parecer técnico do órgão."
                        />
                        <KpiCardOrgao
                            title="Tempo Médio de Atendimento"
                            value={kpis.tempoMedioAtendimento}
                            subtitle={kpis.tempoMedioAtendimento !== 'N/D' ? 'dias' : 'Sem dados suficientes'}
                            icon={Timer}
                            colorClass="text-amber-600 dark:text-amber-500"
                            bgColorClass="bg-amber-50 dark:bg-amber-950/30"
                            badgeText={`Meta: ${sla}d`}
                            badgeColorClass="text-amber-500"
                            tooltipText="Média de dias decorridos entre a abertura do relato até a conclusão ou resposta definitiva pelo órgão."
                        />
                        <KpiCardOrgao
                            title="Resolvidos / Concluídos"
                            value={kpis.taxaResolutividade}
                            subtitle={`(${kpis.resolvidos} chamados)`}
                            icon={ShieldCheck}
                            colorClass="text-emerald-600 dark:text-emerald-500"
                            bgColorClass="bg-emerald-50 dark:bg-emerald-950/30"
                            badgeText="Eficiência"
                            badgeColorClass="text-emerald-500"
                            tooltipText="Taxa de eficácia calculada pela proporção de chamados finalizados com sucesso perante o total recebido."
                        />
                    </div>
                )}

                {/* === SECTION 1: DASHBOARD DE DADOS COMPLETO (ANALYTICS) === */}
                <section id="analytics-section" className="space-y-6 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-zinc-200 dark:border-zinc-800">
                        <div>
                            <h2 className="text-xl font-black text-zinc-900 dark:text-white flex items-center gap-2">
                                <PieChart className="h-5 w-5 text-blue-500" /> Dashboard de Dados Completo
                            </h2>
                            <p className="text-xs text-zinc-400 mt-1">Análise detalhada por status, volume territorial e distribuição por subcategorias do órgão.</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-xs text-zinc-400 font-bold uppercase tracking-wider">Período:</span>
                            <select className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl px-3 py-1.5 text-xs font-bold text-zinc-700 dark:text-zinc-300 focus:outline-none">
                                <option value="30">Últimos 30 dias</option>
                                <option value="90">Últimos 90 dias</option>
                                <option value="365">Ano de 2026</option>
                            </select>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <StatusDistributionCard kpis={kpis} />
                        <NeighborhoodDemandsCard kpis={kpis} />
                        <TopCategoriesCard kpis={kpis} />
                    </div>
                </section>

                {/* === SECTION 2: CONFIGURAÇÕES DO ÓRGÃO === */}
                <section id="settings-section" className="space-y-6 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                    <div className="pb-2 border-b border-zinc-200 dark:border-zinc-800">
                        <h2 className="text-xl font-black text-zinc-900 dark:text-white flex items-center gap-2">
                            <Settings className="h-5 w-5 text-zinc-500" /> Configurações do Órgão
                        </h2>
                        <p className="text-xs text-zinc-400 mt-1">Gerencie metas de resposta, notificações de equipe e parâmetros institucionais.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <NotificationSettingsCard />
                        <SlaSettingsCard sla={sla} setSla={setSla} />
                    </div>
                </section>

            </main>

            {/* === FOOTER === */}
            <footer className="w-full text-center py-6 text-xs font-semibold text-zinc-400 dark:text-zinc-500 border-t border-zinc-200 dark:border-zinc-900/60 bg-white dark:bg-zinc-950/40">
                <div className="flex items-center justify-center gap-2 max-w-2xl mx-auto px-4">
                    <Info className="h-4 w-4 text-zinc-400 dark:text-zinc-600 flex-shrink-0" />
                    <span>Ambiente seguro de monitoramento. Toda resposta e atualização da sua equipe é refletida automaticamente no Painel Público, garantindo transparência.</span>
                </div>
            </footer>
        </div>
    );
}
