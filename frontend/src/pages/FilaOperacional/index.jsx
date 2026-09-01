import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import {
  Trash2,
  Cone,
  Lightbulb,
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { useOrgaoDashboard } from '../../hooks/useOrgaoDashboard';
import HeaderOrgao from '../../components/HeaderOrgao';
import FilaOperacionalHeader from '../../components/FilaOperacionalHeader';
import FilaOperacionalKPIs from '../../components/FilaOperacionalKPIs';
import FilaOperacionalToolbar from '../../components/FilaOperacionalToolbar';
import FilaOperacionalList from '../../components/FilaOperacionalList';
import ResponseModal from '../../components/ResponseModal';
import DetailModal from '../../components/DetailModal';

export default function FilaOperacional() {
  const navigate = useNavigate();
  const { profile } = useAuth();
  const { kpis, loading: dashboardLoading, relatos } = useOrgaoDashboard();
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    setIsDarkMode(document.documentElement.classList.contains('dark'));
  }, []);

  const toggleTheme = () => {
    const html = document.documentElement;
    html.classList.toggle('dark');
    setIsDarkMode(html.classList.contains('dark'));
  };

  const [currentTab, setCurrentTab] = useState('pendente');
  const [search, setSearch] = useState('');
  const [urgency, setUrgency] = useState('all');
  const [currentTime, setCurrentTime] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Modals state
  const [responseModalOpen, setResponseModalOpen] = useState(false);
  const [selectedReportId, setSelectedReportId] = useState(null);
  const [detailModalOpen, setDetailModalOpen] = useState(false);

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const timeString =
        now.getHours().toString().padStart(2, '0') +
        ':' +
        now.getMinutes().toString().padStart(2, '0');
      setCurrentTime(timeString);
    };
    updateClock();
    const interval = setInterval(updateClock, 60000);
    return () => clearInterval(interval);
  }, []);

  const todayRef = new Date();

  const filteredReports = (relatos || []).filter((report) => {
    if (report.status !== currentTab) return false;
    const searchLower = search.toLowerCase();
    const matchesSearch =
      (report.id && report.id.toLowerCase().includes(searchLower)) ||
      (report.bairro && report.bairro.toLowerCase().includes(searchLower)) ||
      (report.rua && report.rua.toLowerCase().includes(searchLower)) ||
      (report.descricao && report.descricao.toLowerCase().includes(searchLower));
    
    // Simplificando o filtro de urgência para coincidir com palavras do macro_eixo se for diferente de 'all'
    const matchesUrgency = urgency === 'all' || (report.macro_eixo && report.macro_eixo.toLowerCase().includes(urgency.toLowerCase()));
    
    return matchesSearch && matchesUrgency;
  }).sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());

  const handleUpdateTicket = () => {
    alert('Status do Ticket atualizado! O cidadão será notificado e o feed público será sincronizado.');
    setResponseModalOpen(false);
  };

  const selectedReport = selectedReportId ? (relatos || []).find(r => r.id === selectedReportId) : null;

  return (
    <div className="min-h-screen bg-[#F9FAFB] text-zinc-900 dark:bg-[#09090B] dark:text-zinc-50 font-sans flex flex-col overflow-x-hidden">

      {/* NAVBAR FLUTUANTE */}
      <HeaderOrgao />

      <main className="w-full max-w-7xl mx-auto px-4 pt-36 pb-20 flex-grow flex flex-col gap-8">

        {/* HEADER */}
        <FilaOperacionalHeader currentTime={currentTime} />

        {/* KPIs */}
        <FilaOperacionalKPIs kpis={kpis} loading={dashboardLoading} />

        {/* TOOLBAR */}
        <FilaOperacionalToolbar
          currentTab={currentTab}
          setCurrentTab={setCurrentTab}
          search={search}
          setSearch={setSearch}
          urgency={urgency}
          setUrgency={setUrgency}
          kpis={kpis}
        />

        {/* LISTAGEM DOS RELATOS */}
        <FilaOperacionalList
          filteredReports={filteredReports}
          todayRef={todayRef}
          setSelectedReportId={setSelectedReportId}
          setDetailModalOpen={setDetailModalOpen}
          setResponseModalOpen={setResponseModalOpen}
        />

      </main>

      {/* MODAL OPERACIONAL */}
      <ResponseModal
        isOpen={responseModalOpen}
        onClose={() => setResponseModalOpen(false)}
        selectedReport={selectedReport}
        handleUpdateTicket={handleUpdateTicket}
      />

      {/* MODAL DETALHE */}
      <DetailModal
        isOpen={detailModalOpen}
        onClose={() => setDetailModalOpen(false)}
        selectedReport={selectedReport}
      />

    </div>
  );
}
