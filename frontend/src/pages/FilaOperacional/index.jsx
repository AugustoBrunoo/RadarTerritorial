import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import {
  Trash2,
  Cone,
  Lightbulb,
  ArrowLeft,
  X,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { useOrgaoDashboard } from '../../hooks/useOrgaoDashboard';
import HeaderOrgao from '../../components/HeaderOrgao';
import FilaOperacionalHeader from '../../components/FilaOperacionalHeader';
import FilaOperacionalKPIs from '../../components/FilaOperacionalKPIs';
import FilaOperacionalToolbar from '../../components/FilaOperacionalToolbar';
import FilaOperacionalList from '../../components/FilaOperacionalList';
import ResponseModal from '../../components/ResponseModal';

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
  const [bairro, setBairro] = useState('all');
  const [currentTime, setCurrentTime] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [exportModalOpen, setExportModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Modals state
  const [responseModalOpen, setResponseModalOpen] = useState(false);
  const [selectedReportId, setSelectedReportId] = useState(null);

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
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [currentTab, search, urgency, bairro]);

  const todayRef = new Date();

  const filteredReports = (relatos || []).filter((report) => {
    if (report.status !== currentTab) return false;
    const searchLower = search.toLowerCase();
    const matchesSearch =
      (report.id && report.id.toLowerCase().includes(searchLower)) ||
      (report.bairro && report.bairro.toLowerCase().includes(searchLower)) ||
      (report.rua && report.rua.toLowerCase().includes(searchLower)) ||
      (report.descricao && report.descricao.toLowerCase().includes(searchLower));

    // Filtro de Urgência
    const matchesUrgency = urgency === 'all' || 
      (report.macro_eixo && report.macro_eixo.toLowerCase().includes(urgency.toLowerCase())) ||
      (report.descricao && report.descricao.toLowerCase().includes(urgency.toLowerCase()));
    
    // Filtro de Bairro
    const matchesBairro = bairro === 'all' || (report.bairro && report.bairro.toLowerCase() === bairro.toLowerCase());
    
    return matchesSearch && matchesUrgency && matchesBairro;
  }).sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()); // sort descending so newest is first, this makes sense for a queue

  const totalItems = filteredReports.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage));
  const currentReports = filteredReports.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  const endIdx = Math.min(currentPage * itemsPerPage, totalItems);
  const displayedCount = totalItems === 0 ? 0 : endIdx;

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

        {/* BOTAO VOLTAR */}
        <div>
          <button 
            onClick={() => navigate('/gestao')} 
            className="inline-flex items-center gap-2.5 px-4 py-2.5 bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 rounded-2xl shadow-sm hover:shadow text-xs sm:text-sm font-bold text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white transition-all active:scale-95 group"
          >
            <div className="w-7 h-7 rounded-xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-500 group-hover:text-zinc-900 dark:group-hover:text-white group-hover:-translate-x-0.5 transition-all">
              <ArrowLeft className="h-4 w-4" />
            </div>
            <span>Voltar ao Painel Geral</span>
          </button>
        </div>

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
          bairro={bairro}
          setBairro={setBairro}
          kpis={kpis}
          onExportClick={() => setExportModalOpen(true)}
        />

        {/* LISTAGEM DOS RELATOS */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between px-2">
            <h2 className="text-lg font-bold text-zinc-900 dark:text-white">Relatos</h2>
            <span className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
              {displayedCount} de {totalItems} relatos vistos
            </span>
          </div>

          <FilaOperacionalList
            filteredReports={currentReports}
            todayRef={todayRef}
            setSelectedReportId={setSelectedReportId}
            setResponseModalOpen={setResponseModalOpen}
          />
          
          {/* PAGINAÇÃO COM CUBINHOS */}
          <div className="flex items-center justify-center gap-2 mt-6 pt-4 border-t border-zinc-100 dark:border-zinc-800/60">
            <button
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="w-10 h-10 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-sm active:scale-95 flex items-center justify-center"
              title="Página Anterior"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>

            <div className="flex items-center gap-1.5">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-10 h-10 rounded-xl text-sm font-black transition-all shadow-sm flex items-center justify-center ${
                    currentPage === page
                      ? 'bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 shadow-md scale-105'
                      : 'bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-50 dark:hover:bg-zinc-800 active:scale-95'
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>

            <button
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="w-10 h-10 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-sm active:scale-95 flex items-center justify-center"
              title="Próxima Página"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>

      </main>

      {/* MODAL OPERACIONAL */}
      <ResponseModal
        isOpen={responseModalOpen}
        onClose={() => setResponseModalOpen(false)}
        selectedReport={selectedReport}
        handleUpdateTicket={handleUpdateTicket}
      />

      {/* MODAL DE EXPORTAÇÃO (EM CONSTRUÇÃO) */}
      {exportModalOpen && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
          <div className="bg-white dark:bg-zinc-900 w-full max-w-sm rounded-3xl p-6 shadow-2xl border border-zinc-200 dark:border-zinc-800 flex flex-col relative text-center">
            <button 
              onClick={() => setExportModalOpen(false)} 
              className="absolute top-4 right-4 text-zinc-400 hover:text-zinc-900 dark:hover:text-white p-2 bg-zinc-100 dark:bg-zinc-800 rounded-full transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
            <div className="w-16 h-16 bg-blue-50 dark:bg-blue-900/20 text-blue-500 rounded-full flex items-center justify-center mx-auto mb-4 border border-blue-100 dark:border-blue-900/50">
              <Cone className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-black text-zinc-900 dark:text-white mb-2">Em Construção</h3>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 font-medium mb-6">
              A funcionalidade de exportação está sendo desenvolvida e estará disponível em breve.
            </p>
            <button 
              onClick={() => setExportModalOpen(false)} 
              className="w-full bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 py-3 rounded-xl text-sm font-bold shadow-md transition-all active:scale-95"
            >
              Entendi
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
