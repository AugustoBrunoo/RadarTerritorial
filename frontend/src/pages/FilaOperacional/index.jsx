import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import {
  ArrowLeft,
  MapPin,
  Menu,
  PieChart,
  Sun,
  Moon,
  LogOut,
  Calendar,
  BellPlus,
  Inbox,
  HardHat,
  Siren,
  Search,
  Download,
  CheckCircle2,
  Edit3,
  X,
  User,
  Info,
  Trash2,
  Cone,
  Lightbulb,
  Eye,
} from 'lucide-react';

const operatorDatabaseMock = [
  {
    id: 'RT-2026-8891',
    author: 'Mariana Siqueira',
    location: 'Estrada de Cosmos, Cosmos (Próximo à estação)',
    categoryText: 'Saneamento e Limpeza Pública',
    categoryIcon: Trash2,
    urgency: 'grave',
    urgencyText: 'Grave / Risco de Doenças',
    urgencyClass: 'bg-red-50 dark:bg-red-950/30 text-red-600 border-red-200 dark:border-red-900/30',
    description: 'Descarte irregular de lixo enorme bloqueando metade da calçada e atraindo muitos ratos. Fica bem na rota das crianças para a escola.',
    votes: 42,
    date: '2026-08-15',
    displayDate: '15/08/2026',
    status: 'novo',
  },
  {
    id: 'RT-2026-8899',
    author: 'Anônimo',
    location: 'Rua Cabaúna, Campo Grande',
    categoryText: 'Infraestrutura Urbana e Vias',
    categoryIcon: Cone,
    urgency: 'abandono',
    urgencyText: 'Muito Abandono',
    urgencyClass: 'bg-purple-50 dark:bg-purple-950/30 text-purple-600 border-purple-200 dark:border-purple-900/30',
    description: 'Papeleiras destruídas na praça principal. Está acumulando sujeira por todo o chão. Ninguém limpa há meses.',
    votes: 15,
    date: '2026-08-23',
    displayDate: 'Hoje, 09:12',
    status: 'novo',
  },
  {
    id: 'RT-2026-8805',
    author: 'Carlos P.',
    location: 'Rua do Campinho, Inhoaíba',
    categoryText: 'Infraestrutura Urbana e Vias',
    categoryIcon: Cone,
    urgency: 'urgente',
    urgencyText: 'Urgente',
    urgencyClass: 'bg-amber-50 dark:bg-amber-950/30 text-amber-600 border-amber-200 dark:border-amber-900/30',
    description: 'Árvore caiu na via ontem à noite. Comlurb precisa vir cortar os galhos urgentes, está fechando meia pista.',
    votes: 89,
    date: '2026-08-22',
    displayDate: 'Ontem',
    status: 'andamento',
  },
  {
    id: 'RT-2026-8711',
    author: 'Roberto Gomes',
    location: 'Praça do Morro do Banco, Cosmos',
    categoryText: 'Iluminação Pública e Segurança',
    categoryIcon: Lightbulb,
    urgency: 'abandono',
    urgencyText: 'Muito Abandono',
    urgencyClass: 'bg-purple-50 dark:bg-purple-950/30 text-purple-600 border-purple-200 dark:border-purple-900/30',
    description: 'Poste central da praça queimado. Fica muito escuro de noite e as crianças não podem brincar.',
    votes: 112,
    date: '2026-08-10',
    displayDate: '10/08/2026',
    status: 'concluido',
  },
];

export default function FilaOperacional() {
  const navigate = useNavigate();
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    setIsDarkMode(document.documentElement.classList.contains('dark'));
  }, []);

  const toggleTheme = () => {
    const html = document.documentElement;
    html.classList.toggle('dark');
    setIsDarkMode(html.classList.contains('dark'));
  };

  const [currentTab, setCurrentTab] = useState('novo');
  const [search, setSearch] = useState('');
  const [urgency, setUrgency] = useState('all');
  const [currentTime, setCurrentTime] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [operatorDatabase, setOperatorDatabase] = useState(operatorDatabaseMock);

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

  const todayRef = new Date('2026-08-23T00:00:00');

  const filteredReports = operatorDatabase.filter((report) => {
    if (report.status !== currentTab) return false;
    const matchesSearch =
      report.id.toLowerCase().includes(search.toLowerCase()) ||
      report.location.toLowerCase().includes(search.toLowerCase());
    const matchesUrgency = urgency === 'all' || report.urgency === urgency;
    return matchesSearch && matchesUrgency;
  }).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  const handleUpdateTicket = () => {
    alert('Status do Ticket atualizado! O cidadão será notificado e o feed público será sincronizado.');
    setResponseModalOpen(false);
  };

  const selectedReport = selectedReportId ? operatorDatabase.find(r => r.id === selectedReportId) : null;

  return (
    <div className="min-h-screen bg-[#F9FAFB] text-zinc-900 dark:bg-[#09090B] dark:text-zinc-50 font-sans flex flex-col overflow-x-hidden">
      
      {/* NAVBAR FLUTUANTE */}
      <div className="fixed top-6 left-0 right-0 z-50 px-4 flex justify-center pointer-events-none">
        <header className="pointer-events-auto w-full max-w-7xl bg-white/70 dark:bg-zinc-900/70 backdrop-blur-xl border border-zinc-200 dark:border-zinc-800 rounded-full px-4 sm:px-6 py-3 flex justify-between items-center shadow-lg transition-all duration-300">
          
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/dashboard-orgao')}
              title="Voltar ao Dashboard Estratégico"
              className="flex items-center justify-center w-8 h-8 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded-full transition-all text-zinc-600 dark:text-zinc-400"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>
            <div
              className="flex items-center gap-2 cursor-pointer group"
              onClick={() => navigate('/')}
            >
              <div className="bg-red-600 p-1.5 rounded-full group-hover:scale-105 transition-transform">
                <MapPin className="h-4 w-4 text-white" />
              </div>
              <span className="font-bold text-lg tracking-tight hidden sm:block">
                Radar<span className="text-red-600">Territorial</span>
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 bg-zinc-100 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 px-4 py-1.5 rounded-full">
              <span className="text-xs font-medium text-zinc-600 dark:text-zinc-400">
                Órgão: <strong className="font-bold text-zinc-900 dark:text-white">COMLURB</strong>
              </span>
            </div>

            <div className="relative flex items-center">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="w-10 h-10 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-600 dark:text-zinc-400 hover:text-blue-500 transition-colors focus:outline-none shadow-sm active:scale-95"
              >
                <Menu className="h-5 w-5" />
              </button>

              {isMenuOpen && (
                <div className="absolute right-0 top-full mt-3 w-56 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl shadow-xl shadow-zinc-200/20 dark:shadow-black/40 py-2 transition-all duration-200 origin-top-right z-50">
                  <div className="px-2 space-y-1">
                    <button
                      onClick={() => navigate('/dashboard-orgao')}
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 hover:text-zinc-900 dark:hover:text-white rounded-xl transition-colors"
                    >
                      <PieChart className="h-4 w-4 text-zinc-400" /> Dashboard Estratégico
                    </button>
                    <div className="border-t border-zinc-100 dark:border-zinc-800 my-1"></div>
                    <div
                      className="px-4 py-3 flex items-center justify-between group cursor-pointer"
                      onClick={toggleTheme}
                    >
                      <span className="text-sm font-medium text-zinc-600 dark:text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-white transition-colors">
                        Modo Escuro
                      </span>
                      <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-zinc-200 dark:bg-blue-600 transition-colors pointer-events-none">
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-sm transition-transform flex items-center justify-center ${
                            isDarkMode ? 'translate-x-6' : 'translate-x-1'
                          }`}
                        >
                          {isDarkMode ? (
                            <Moon className="h-3 w-3 text-blue-600" />
                          ) : (
                            <Sun className="h-3 w-3 text-zinc-400" />
                          )}
                        </span>
                      </button>
                    </div>
                    <div className="border-t border-zinc-100 dark:border-zinc-800 my-1"></div>
                    <button
                      onClick={() => navigate('/')}
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-red-600 dark:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-xl transition-colors"
                    >
                      <LogOut className="h-4 w-4 text-red-500" /> Encerrar Sessão
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>
      </div>

      <main className="w-full max-w-7xl mx-auto px-4 pt-36 pb-20 flex-grow flex flex-col gap-8">
        
        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 animate-[fadeInUp_0.5s_ease-out_forwards]">
          <div>
            <p className="text-blue-600 dark:text-blue-500 font-bold tracking-widest uppercase text-xs mb-2 flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              Operação em Tempo Real
            </p>
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-zinc-900 dark:text-white">
              Central de Triagem Operacional
            </h1>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-2 max-w-2xl leading-relaxed">
              Painel de controle para gerir as ocorrências ativas do bairro. Distribua tarefas, atualize status e responda ao cidadão diretamente.
            </p>
          </div>

          <div className="bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-2 rounded-2xl flex items-center gap-3 shadow-sm text-sm font-medium text-zinc-600 dark:text-zinc-300">
            <Calendar className="h-4 w-4 text-blue-500" />
            <span>23 de Agosto de 2026</span>
            <div className="h-4 w-px bg-zinc-300 dark:bg-zinc-700"></div>
            <span className="font-black text-zinc-900 dark:text-white">{currentTime}</span>
          </div>
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 animate-[fadeInUp_0.5s_ease-out_forwards]" style={{ animationDelay: '0.1s' }}>
          
          <div className="bg-white dark:bg-zinc-900 rounded-[2rem] p-5 border border-zinc-200 dark:border-zinc-800 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/10 rounded-full blur-xl -mr-6 -mt-6"></div>
            <div className="flex justify-between items-start mb-3">
              <div className="bg-blue-50 dark:bg-blue-950/40 p-2 rounded-xl text-blue-600 dark:text-blue-400">
                <BellPlus className="h-5 w-5" />
              </div>
            </div>
            <div className="text-3xl font-black text-zinc-900 dark:text-white mb-1">12</div>
            <p className="text-xs font-bold uppercase tracking-wide text-zinc-500">Novos Hoje</p>
            <p className="text-[10px] text-zinc-400 mt-1">Atualizado até <span className="font-semibold text-blue-500">agora</span></p>
          </div>

          <div className="bg-white dark:bg-zinc-900 rounded-[2rem] p-5 border border-zinc-200 dark:border-zinc-800 shadow-sm relative overflow-hidden">
            <div className="flex justify-between items-start mb-3">
              <div className="bg-zinc-100 dark:bg-zinc-800 p-2 rounded-xl text-zinc-600 dark:text-zinc-400">
                <Inbox className="h-5 w-5" />
              </div>
            </div>
            <div className="text-3xl font-black text-zinc-900 dark:text-white mb-1">45</div>
            <p className="text-xs font-bold uppercase tracking-wide text-zinc-500">Aguardando Triagem</p>
            <p className="text-[10px] text-zinc-400 mt-1">Parados na fila inicial</p>
          </div>

          <div className="bg-white dark:bg-zinc-900 rounded-[2rem] p-5 border border-zinc-200 dark:border-zinc-800 shadow-sm relative overflow-hidden">
            <div className="flex justify-between items-start mb-3">
              <div className="bg-amber-50 dark:bg-amber-950/40 p-2 rounded-xl text-amber-600 dark:text-amber-400">
                <HardHat className="h-5 w-5" />
              </div>
            </div>
            <div className="text-3xl font-black text-zinc-900 dark:text-white mb-1">129</div>
            <p className="text-xs font-bold uppercase tracking-wide text-zinc-500">Em Andamento</p>
            <p className="text-[10px] text-zinc-400 mt-1">Equipe despachada / Execução</p>
          </div>

          <div className="bg-white dark:bg-zinc-900 rounded-[2rem] p-5 border border-red-200 dark:border-red-900/30 shadow-sm relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-24 h-24 bg-red-500/10 rounded-full blur-xl -mr-6 -mt-6 transition-transform group-hover:scale-150"></div>
            <div className="flex justify-between items-start mb-3">
              <div className="bg-red-50 dark:bg-red-950/40 p-2 rounded-xl text-red-600 dark:text-red-400">
                <Siren className="h-5 w-5" />
              </div>
              <span className="flex h-2 w-2 rounded-full bg-red-500 animate-pulse mt-2 mr-1"></span>
            </div>
            <div className="text-3xl font-black text-red-600 dark:text-red-500 mb-1">18</div>
            <p className="text-xs font-bold uppercase tracking-wide text-zinc-500">Atrasados (SLA &gt; 3d)</p>
            <p className="text-[10px] text-zinc-400 mt-1 font-semibold text-red-400">Ação Imediata Necessária</p>
          </div>
        </div>

        {/* TOOLBAR */}
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-[2rem] p-4 flex flex-col lg:flex-row gap-5 lg:items-center justify-between shadow-sm z-40 animate-[fadeInUp_0.5s_ease-out_forwards]" style={{ animationDelay: '0.2s' }}>
          
          <div className="flex p-1.5 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl overflow-x-auto w-full lg:w-auto shrink-0 [&::-webkit-scrollbar]:hidden">
            <button
              onClick={() => setCurrentTab('novo')}
              className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all whitespace-nowrap flex items-center gap-1.5 ${currentTab === 'novo' ? 'bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white font-bold shadow-sm' : 'text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300'}`}
            >
              Aguardando Triagem
              <span className="px-2 py-0.5 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-lg text-[10px] font-black">45</span>
            </button>
            <button
              onClick={() => setCurrentTab('andamento')}
              className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all whitespace-nowrap flex items-center gap-1.5 ${currentTab === 'andamento' ? 'bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white font-bold shadow-sm' : 'text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300'}`}
            >
              Em Andamento
              <span className="px-2 py-0.5 bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 rounded-lg text-[10px] font-black">129</span>
            </button>
            <button
              onClick={() => setCurrentTab('concluido')}
              className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all whitespace-nowrap ${currentTab === 'concluido' ? 'bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white font-bold shadow-sm' : 'text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300'}`}
            >
              Concluídos
            </button>
          </div>

          <div className="h-px lg:h-10 w-full lg:w-px bg-zinc-200 dark:bg-zinc-800 hidden lg:block"></div>

          <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
            <div className="relative w-full sm:w-64">
              <input
                type="text"
                placeholder="ID ou palavra-chave..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl pl-10 pr-4 py-2.5 text-sm text-zinc-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all placeholder-zinc-400 font-medium"
              />
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-400">
                <Search className="h-4 w-4" />
              </div>
            </div>

            <div className="flex gap-2 w-full sm:w-auto">
              <select
                value={urgency}
                onChange={(e) => setUrgency(e.target.value)}
                className="flex-1 sm:flex-none bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-2.5 text-sm text-zinc-700 dark:text-zinc-300 focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium cursor-pointer"
              >
                <option value="all">Todas as Urgências</option>
                <option value="grave">Apenas Graves</option>
                <option value="abandono">Abandono</option>
              </select>

              <button
                className="flex items-center justify-center p-2.5 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl text-zinc-600 dark:text-zinc-300 hover:text-blue-500 transition-colors"
                title="Exportar Relatório (CSV)"
              >
                <Download className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        {/* LISTAGEM DOS RELATOS */}
        <div className="space-y-5 animate-[fadeInUp_0.5s_ease-out_forwards]" style={{ animationDelay: '0.3s' }}>
          {filteredReports.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24 text-center bg-white dark:bg-zinc-900 rounded-[2.5rem] border border-zinc-200 dark:border-zinc-800 shadow-sm">
              <div className="w-20 h-20 bg-zinc-100 dark:bg-zinc-800 rounded-full flex items-center justify-center mb-5 text-zinc-400">
                <CheckCircle2 className="h-10 w-10" />
              </div>
              <h3 className="text-2xl font-black text-zinc-900 dark:text-white mb-2">Fila Zerada!</h3>
              <p className="text-base text-zinc-500 dark:text-zinc-400 max-w-sm">Bom trabalho. Não há ocorrências correspondentes a esses filtros na fila atual.</p>
            </div>
          ) : (
            filteredReports.map(report => {
              const reportDate = new Date(report.date + 'T00:00:00');
              const diffTime = Math.abs(todayRef - reportDate);
              const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
              const isSlaCritical = diffDays > 3 && report.status !== 'concluido';

              const IconCmp = report.categoryIcon;

              return (
                <div key={report.id} className={`bg-white dark:bg-zinc-900 border ${isSlaCritical ? 'border-red-300 dark:border-red-900/50' : 'border-zinc-200 dark:border-zinc-800'} rounded-[2rem] p-6 shadow-sm hover:shadow-md transition-all relative overflow-hidden group`}>
                  {isSlaCritical && <div className="absolute left-0 top-0 bottom-0 w-2 bg-red-500"></div>}
                  
                  <div className="flex flex-col lg:flex-row gap-6 lg:items-center">
                    
                    {/* Meta Infos */}
                    <div className="lg:w-1/4 shrink-0 flex flex-col gap-3 border-b lg:border-b-0 lg:border-r border-zinc-100 dark:border-zinc-800 pb-4 lg:pb-0 lg:pr-6">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-black text-zinc-900 dark:text-white bg-zinc-100 dark:bg-zinc-800 px-2.5 py-1 rounded-lg border border-zinc-200 dark:border-zinc-700">{report.id}</span>
                        {isSlaCritical && (
                          <span className="text-[10px] font-black text-red-600 uppercase tracking-wider bg-red-50 dark:bg-red-900/20 px-2 py-1 rounded-lg border border-red-200 dark:border-red-900/50 flex items-center gap-1 animate-pulse">
                            <Siren className="h-3 w-3" /> SLA
                          </span>
                        )}
                      </div>
                      
                      <div className={`flex items-center gap-1.5 text-xs font-bold ${report.urgencyClass} w-max px-2.5 py-1.5 rounded-xl border`}>
                        <IconCmp className="h-3.5 w-3.5" /> {report.urgencyText}
                      </div>

                      <div className="mt-auto pt-2 grid grid-cols-2 gap-2 text-center">
                        <div className="bg-zinc-50 dark:bg-zinc-950 rounded-xl p-2 border border-zinc-100 dark:border-zinc-800/80">
                          <span className="block font-black text-zinc-900 dark:text-white text-lg leading-none">{diffDays}</span>
                          <span className="text-[9px] font-bold text-zinc-400 uppercase tracking-wider">Dias Ativo</span>
                        </div>
                        <div className="bg-blue-50 dark:bg-blue-950/20 rounded-xl p-2 border border-blue-100 dark:border-blue-900/30">
                          <span className="block font-black text-blue-600 dark:text-blue-400 text-lg leading-none">{report.votes}</span>
                          <span className="text-[9px] font-bold text-blue-500 uppercase tracking-wider">Apoios</span>
                        </div>
                      </div>
                    </div>

                    {/* Desc */}
                    <div className="flex-grow space-y-3">
                      <h3 className="text-lg font-bold text-zinc-900 dark:text-white leading-snug">
                        "{report.description}"
                      </h3>
                      
                      <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 text-sm font-medium text-zinc-600 dark:text-zinc-400">
                        <div className="flex items-center gap-2"><MapPin className="h-4 w-4 text-zinc-400" /> {report.location}</div>
                        <div className="flex items-center gap-2"><Calendar className="h-4 w-4 text-zinc-400" /> Aberto em {report.displayDate}</div>
                      </div>
                    </div>

                    {/* Ações Gestão */}
                    <div className="lg:w-48 shrink-0 flex flex-row lg:flex-col justify-end lg:justify-center items-center gap-3 pt-4 lg:pt-0 border-t lg:border-t-0 border-zinc-100 dark:border-zinc-800">
                      
                      <button onClick={() => { setSelectedReportId(report.id); setDetailModalOpen(true); }} className="w-full lg:w-full bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 py-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 border border-zinc-200 dark:border-zinc-700 shadow-sm">
                        <Eye className="h-4 w-4" /> Ver Detalhes
                      </button>
                      
                      {report.status !== 'concluido' ? (
                        <button onClick={() => { setSelectedReportId(report.id); setResponseModalOpen(true); }} className={`w-full lg:w-full ${report.status === 'andamento' ? 'bg-amber-600 hover:bg-amber-700 shadow-amber-600/20' : 'bg-blue-600 hover:bg-blue-700 shadow-blue-600/20'} text-white py-3.5 rounded-xl text-sm font-black shadow-md transition-all transform active:scale-95 flex items-center justify-center gap-2`}>
                          <Edit3 className="h-4 w-4" /> {report.status === 'andamento' ? 'Atualizar Ticket' : 'Atender Chamado'}
                        </button>
                      ) : (
                        <div className="w-full py-3.5 rounded-xl border-2 border-emerald-500 bg-emerald-50 dark:bg-emerald-950/20 flex justify-center">
                          <span className="flex items-center gap-1.5 text-sm font-black text-emerald-600 dark:text-emerald-500">
                            <CheckCircle2 className="h-5 w-5" /> Concluído
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

      </main>

      {/* MODAL OPERACIONAL */}
      {responseModalOpen && selectedReport && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
          <div className="bg-white dark:bg-zinc-900 w-full max-w-3xl rounded-[2.5rem] p-6 sm:p-8 shadow-2xl border border-zinc-200 dark:border-zinc-800 flex flex-col max-h-[90vh]">
            
            <div className="flex justify-between items-start mb-6 border-b border-zinc-100 dark:border-zinc-800 pb-5">
              <div>
                <h3 className="text-xl font-black text-zinc-900 dark:text-white flex items-center gap-2">
                  <Edit3 className="h-5 w-5 text-blue-500" /> Atualização Operacional
                </h3>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1 font-medium">Você está gerenciando o ticket <span className="font-black text-zinc-900 dark:text-white">{selectedReport.id}</span></p>
              </div>
              <button onClick={() => setResponseModalOpen(false)} className="text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800">
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="overflow-y-auto [&::-webkit-scrollbar]:hidden pr-2 flex-grow space-y-6">
              <div className="bg-zinc-50 dark:bg-zinc-950/50 rounded-2xl p-5 border border-zinc-200 dark:border-zinc-800 flex flex-col sm:flex-row gap-5">
                <div className="flex-grow">
                  <h4 className="text-sm font-bold text-zinc-900 dark:text-white mb-2">Descrição do Cidadão:</h4>
                  <p className="text-sm text-zinc-700 dark:text-zinc-300 italic border-l-2 border-zinc-300 dark:border-zinc-700 pl-3 leading-relaxed">
                    "{selectedReport.description}"
                  </p>
                </div>
                <div className="sm:w-1/3 shrink-0 flex flex-col gap-2 border-t sm:border-t-0 sm:border-l border-zinc-200 dark:border-zinc-800 pt-3 sm:pt-0 sm:pl-5">
                  <div className="text-xs"><span className="font-bold text-zinc-500">Autor:</span> <span className="font-medium text-zinc-900 dark:text-white block">{selectedReport.author}</span></div>
                  <div className="text-xs"><span className="font-bold text-zinc-500">Local:</span> <span className="font-medium text-zinc-900 dark:text-white block">{selectedReport.location}</span></div>
                  <div className="text-xs"><span className="font-bold text-zinc-500">Data Abertura:</span> <span className="font-medium text-zinc-900 dark:text-white block">{selectedReport.displayDate}</span></div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-bold text-zinc-700 dark:text-zinc-300 mb-2">Mudar Status Operacional</label>
                  <select defaultValue={selectedReport.status === 'andamento' ? 'concluido' : 'andamento'} className="w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-3.5 text-sm font-bold text-zinc-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none shadow-sm transition-all hover:border-blue-400">
                    <option value="andamento">Em Atendimento (Equipe Despachada)</option>
                    <option value="concluido">Resolvido / Concluído</option>
                    <option value="invalid">Improcedente / Fora de Escopo</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-zinc-700 dark:text-zinc-300 mb-2">Atribuir Equipe (Opcional)</label>
                  <select className="w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-3.5 text-sm font-medium text-zinc-700 dark:text-zinc-300 focus:ring-2 focus:ring-blue-500 outline-none shadow-sm transition-all">
                    <option value="">Não atribuir agora</option>
                    <option value="eq1">Equipe Alpha (Vias Públicas)</option>
                    <option value="eq2">Equipe Beta (Poda e Árvores)</option>
                    <option value="eq3">Equipe Gamma (Remoção de Entulho)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-zinc-700 dark:text-zinc-300 mb-2 flex items-center justify-between">
                  <span>Mensagem Oficial ao Cidadão</span>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-green-600 bg-green-50 dark:bg-green-900/20 px-2 py-0.5 rounded border border-green-200 dark:border-green-900/50">Visível no Feed</span>
                </label>
                <textarea rows="4" placeholder="Ex: Informamos que a equipe foi despachada ao local e o problema será resolvido em até 48h..." className="w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-3 text-sm text-zinc-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none resize-none shadow-sm transition-all placeholder-zinc-400 font-medium"></textarea>
                <div className="mt-2 flex gap-2">
                  <button className="text-xs bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 px-3 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-700 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors">Usar template: Em Rota</button>
                  <button className="text-xs bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 px-3 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-700 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors">Usar template: Concluído</button>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-5 border-t border-zinc-100 dark:border-zinc-800 flex justify-end gap-3 shrink-0">
              <button onClick={() => setResponseModalOpen(false)} className="px-5 py-2.5 rounded-xl text-sm font-bold text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors border border-transparent">Cancelar</button>
              <button onClick={handleUpdateTicket} className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl text-sm font-bold flex items-center justify-center gap-2 shadow-md shadow-blue-600/20 transition-all transform active:scale-95">
                <CheckCircle2 className="h-4 w-4" /> Atualizar Ticket
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL DETALHE */}
      {detailModalOpen && selectedReport && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
          <div className="bg-white dark:bg-zinc-900 w-full max-w-2xl rounded-[2.5rem] p-6 sm:p-8 shadow-2xl border border-zinc-200 dark:border-zinc-800 flex flex-col">
            
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="text-2xl font-black text-zinc-900 dark:text-white">{selectedReport.id}</h3>
                <p className="text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-widest mt-1">Visão Detalhada</p>
              </div>
              <button onClick={() => setDetailModalOpen(false)} className="text-zinc-400 hover:text-zinc-900 dark:hover:text-white p-2 bg-zinc-100 dark:bg-zinc-800 rounded-full transition-colors">
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-zinc-50 dark:bg-zinc-950 p-4 rounded-2xl border border-zinc-200 dark:border-zinc-800">
                  <span className="block text-xs font-bold text-zinc-500 mb-1 uppercase">Localização</span>
                  <span className="text-sm font-medium text-zinc-900 dark:text-white">{selectedReport.location}</span>
                </div>
                <div className="bg-zinc-50 dark:bg-zinc-950 p-4 rounded-2xl border border-zinc-200 dark:border-zinc-800">
                  <span className="block text-xs font-bold text-zinc-500 mb-1 uppercase">Reportado por</span>
                  <span className="text-sm font-medium text-zinc-900 dark:text-white flex items-center gap-1.5"><User className="h-3.5 w-3.5 text-zinc-400" /> {selectedReport.author}</span>
                </div>
              </div>

              <div>
                <span className="block text-xs font-bold text-zinc-500 mb-2 uppercase">Descrição Original</span>
                <p className="text-base text-zinc-800 dark:text-zinc-200 leading-relaxed bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-4 rounded-2xl">
                  "{selectedReport.description}"
                </p>
              </div>

              <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-100 dark:border-blue-900/30 p-4 rounded-2xl flex items-start gap-3">
                <Info className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <div>
                  <span className="block text-xs font-bold text-blue-600 mb-1 uppercase tracking-wider">Histórico do Sistema</span>
                  <ul className="text-[13px] text-zinc-600 dark:text-zinc-400 space-y-1.5 font-medium">
                    <li>• Aberto via <strong className="text-zinc-800 dark:text-zinc-200">Formulário Web</strong> em {selectedReport.displayDate}</li>
                    <li>• Apoiado por <strong className="text-zinc-800 dark:text-zinc-200">{selectedReport.votes}</strong> moradores da região.</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="mt-8 flex justify-center">
              <button onClick={() => setDetailModalOpen(false)} className="bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 px-8 py-3 rounded-xl text-sm font-bold transition-all shadow-md active:scale-95">
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
