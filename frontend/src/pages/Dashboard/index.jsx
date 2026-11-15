import React, { useState, useMemo, useEffect } from 'react';
import { SlidersHorizontal, Activity, TriangleAlert, CloudRain, Zap, Bus, ShieldAlert, Loader2 } from 'lucide-react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';

import { EIXOS, CONTATOS_ORGAOS, ruas } from './data';
import { exportDashboardCSV, exportDashboardPDF } from '../../utils/dashboardExport';
import { getRelatosRealtime } from '../../services/reports';
import Header from '../../components/Dashboard/Header';
import FilterBar from '../../components/Dashboard/FilterBar';
import MobileDrawer from '../../components/Dashboard/MobileDrawer';
import ExportModal from '../../components/Dashboard/ExportModal';
import HeroSection from '../../components/Dashboard/HeroSection';
import GeralKpis from '../../components/Dashboard/GeralKpis';
import MapSection from '../../components/Dashboard/MapSection';
import ChartsSection from '../../components/Dashboard/ChartsSection';
import TopRuasTable from '../../components/Dashboard/TopRuasTable';
import ConstructionModal from '../../components/Dashboard/ConstructionModal';
import SEO from '../../components/SEO';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

export default function Dashboard() {
  // State
  const [currentTab, setCurrentTab] = useState('geral');
  const [bairroFilter, setBairroFilter] = useState('all');
  const [timeFilter, setTimeFilter] = useState('all');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof document !== 'undefined') {
      return document.documentElement.classList.contains('dark');
    }
    return true;
  });
  const [currentTime, setCurrentTime] = useState('');
  
  const [realDatabase, setRealDatabase] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [mapCenter, setMapCenter] = useState([-22.904, -43.585]);
  const [mapZoom, setMapZoom] = useState(13);

  // Time formatting
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const dateStr = now.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' });
      const timeStr = now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
      setCurrentTime(`${dateStr} ${timeStr}`);
    };
    updateTime();
    const int = setInterval(updateTime, 60000);
    return () => clearInterval(int);
  }, []);

  // Theme Sync
  useEffect(() => {
    const isDark = document.documentElement.classList.contains('dark');
    setIsDarkMode(isDark);
    
    // Update Chart defaults
    ChartJS.defaults.color = isDark ? '#a1a1aa' : '#52525b';
    ChartJS.defaults.scale.grid.color = isDark ? '#27272a' : '#e4e4e7';
    ChartJS.defaults.plugins.tooltip.backgroundColor = isDark ? 'rgba(9, 9, 11, 0.9)' : 'rgba(255, 255, 255, 0.9)';
    ChartJS.defaults.plugins.tooltip.titleColor = isDark ? '#ffffff' : '#18181b';
    ChartJS.defaults.plugins.tooltip.bodyColor = isDark ? '#ffffff' : '#18181b';
  }, []);

  const toggleTheme = () => {
    const html = document.documentElement;
    html.classList.toggle('dark');
    const isDark = html.classList.contains('dark');
    setIsDarkMode(isDark);
    try {
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
    } catch (e) {}
    ChartJS.defaults.color = isDark ? '#a1a1aa' : '#52525b';
    ChartJS.defaults.scale.grid.color = isDark ? '#27272a' : '#e4e4e7';
    ChartJS.defaults.plugins.tooltip.backgroundColor = isDark ? 'rgba(9, 9, 11, 0.9)' : 'rgba(255, 255, 255, 0.9)';
    ChartJS.defaults.plugins.tooltip.titleColor = isDark ? '#ffffff' : '#18181b';
    ChartJS.defaults.plugins.tooltip.bodyColor = isDark ? '#ffffff' : '#18181b';
  };

  // Map Locate
  const locateUser = () => {
    if (navigator.geolocation) { 
      navigator.geolocation.getCurrentPosition(pos => { 
        setMapCenter([pos.coords.latitude, pos.coords.longitude]);
        setMapZoom(15);
      }); 
    }
  };

  // Fetch Real Data
  useEffect(() => {
    async function carregarDados() {
      try {
        setIsLoading(true);
        const data = await getRelatosRealtime();
        setRealDatabase(data);
      } catch (err) {
        setError('Falha ao carregar dados do sistema.');
      } finally {
        setIsLoading(false);
      }
    }
    carregarDados();
  }, []);

  useEffect(() => {
    if (bairroFilter !== 'all' && ruas[bairroFilter]) {
      setMapCenter(ruas[bairroFilter].baseCoords);
      setMapZoom(14);
    }
  }, [bairroFilter]);

  // Data processing
  const { filteredData, stats } = useMemo(() => {
    let fd = realDatabase;

    const normalizeEixo = (eixo) => {
      if (!eixo) return 'outros';
      const e = String(eixo).toLowerCase();
      if (e.includes('infra')) return 'infra';
      if (e.includes('saneamento') || e.includes('limpeza') || e.includes('lixo') || e.includes('esgoto')) return 'saneamento';
      if (e.includes('ilumina') || e.includes('luz')) return 'iluminacao';
      if (e.includes('mobilidade') || e.includes('transporte')) return 'mobilidade';
      if (e.includes('segurança') || e.includes('insegurança') || e.includes('território') || e.includes('ordem') || e.includes('seguranca')) return 'inseguranca';
      return e;
    };

    if (bairroFilter !== 'all') fd = fd.filter(d => d.bairro === bairroFilter);
    if (timeFilter !== 'all') {
        const limitDate = new Date(); 
        limitDate.setDate(limitDate.getDate() - parseInt(timeFilter));
        fd = fd.filter(d => d.dataCriacao >= limitDate);
    }
    if (currentTab !== 'geral') { fd = fd.filter(d => normalizeEixo(d.eixo) === currentTab); }

    const st = { total: fd.length, resolvidos: 0, ativas: 0, slaEstourado: 0, somaDias: 0, reabertas: 0, subs: {}, eixos: {}, pontosCriticos: {}, ops: {}, comResposta: 0 };

    fd.forEach(d => {
        if (d.status === "Resolvido") st.resolvidos++; else st.ativas++;
        if (d.status === "Não Resolvido" && d.diasAberto > 30) st.slaEstourado++;
        if (d.reaberto) st.reabertas++;
        if (d.status === "Resolvido") st.somaDias += d.diasAberto;
        if (d.respostaOrgao || d.status === "Resolvido") st.comResposta++;
        
        if (!st.subs[d.category]) st.subs[d.category] = 0; 
        st.subs[d.category]++;
        
        const eixoNorm = normalizeEixo(d.eixo);
        const eixoKey = ['infra', 'saneamento', 'iluminacao', 'mobilidade', 'inseguranca'].includes(eixoNorm) ? eixoNorm : (d.eixo || 'Outros');
        if (!st.eixos[eixoKey]) st.eixos[eixoKey] = 0; 
        st.eixos[eixoKey]++;
        
        if (!st.ops[d.operador]) st.ops[d.operador] = { resolvido: 0, pendente: 0 };
        if (d.status === "Resolvido") st.ops[d.operador].resolvido++; else st.ops[d.operador].pendente++;
        if (d.status === "Não Resolvido") {
            const key = `${d.rua}|${d.bairro}|${d.operador}`;
            if (!st.pontosCriticos[key]) st.pontosCriticos[key] = { registros: 0, apoios: 0 };
            st.pontosCriticos[key].registros++; st.pontosCriticos[key].apoios += d.apoios;
        }
    });

    return { filteredData: fd, stats: st };
  }, [currentTab, bairroFilter, timeFilter, realDatabase]);

  // KPIs calculation
  const hasScore = stats.comResposta > 5;
  const resolucaoPct = stats.total > 0 ? Math.round((stats.resolvidos / stats.total) * 100) : 0;
  const tempoMedio = stats.resolvidos > 0 ? Math.round(stats.somaDias / stats.resolvidos) : 0;
  const notaBairro = hasScore ? ((stats.resolvidos / stats.total) * 10).toFixed(1) : "0.0";
  const notaProgressPct = stats.total > 0 ? Math.round((stats.resolvidos / stats.total) * 100) : 0;
  
  let notaColor = "bg-emerald-500";
  if (!hasScore) notaColor = "bg-zinc-400 dark:bg-zinc-600";
  else if (notaProgressPct < 50) notaColor = "bg-red-500";
  else if (notaProgressPct < 75) notaColor = "bg-amber-500";

  const topRuas = Object.entries(stats.pontosCriticos).sort((a, b) => b[1].apoios - a[1].apoios).slice(0, 5);

  // Specific Tab Data
  const tabColors = { infra: 'red', saneamento: 'blue', iluminacao: 'amber', mobilidade: 'zinc', inseguranca: 'red' };
  const tabIcons = { infra: TriangleAlert, saneamento: CloudRain, iluminacao: Zap, mobilidade: Bus, inseguranca: ShieldAlert };
  
  const cor = tabColors[currentTab] || 'red';
  const icone = tabIcons[currentTab] || Activity;

  // Find most reported problem
  const topCategoryEntry = Object.entries(stats.subs).sort((a, b) => b[1] - a[1])[0];
  const topProblemName = topCategoryEntry ? topCategoryEntry[0] : 'Nenhum Registro Ativo';
  const topProblemCount = topCategoryEntry ? topCategoryEntry[1] : 0;
  const topProblemApoios = topCategoryEntry 
    ? filteredData.filter(d => d.category === topProblemName).reduce((sum, d) => sum + (Number(d.apoios) || 0), 0)
    : 0;
  const info = (CONTATOS_ORGAOS[currentTab] && CONTATOS_ORGAOS[currentTab][bairroFilter])
      ? CONTATOS_ORGAOS[currentTab][bairroFilter]
      : (CONTATOS_ORGAOS[currentTab] && CONTATOS_ORGAOS[currentTab]["Geral"] ? CONTATOS_ORGAOS[currentTab]["Geral"] : { orgao: "Órgão Competente", contato: "1746", link: "https://www.1746.rio", instrucoes: "Utilize os canais oficiais para reportar o problema à administração pública." });

  // Chart configuration
  const labelsOp = Object.keys(stats.ops);
  const dataOpResolvido = labelsOp.map(k => stats.ops[k].resolvido);
  const dataOpPendente = labelsOp.map(k => stats.ops[k].pendente);
  
  const labelsEixos = Object.keys(stats.eixos).map(k => EIXOS[k] ? EIXOS[k].label : k);
  const dataEixos = Object.values(stats.eixos);

  const chartOpData = {
    labels: labelsOp,
    datasets: [
      { label: 'Resolvidos', data: dataOpResolvido, backgroundColor: '#10b981' },
      { label: 'Em Andamento', data: dataOpPendente, backgroundColor: '#3b82f6' }
    ]
  };

  const chartOpOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: true, position: 'bottom', align: 'start', labels: { boxWidth: 12, padding: 16, font: { size: 11 } } } },
    scales: { x: { stacked: true, grid: { display: false } }, y: { stacked: true, border: { display: false } } }
  };

  const chartEixosData = {
    labels: labelsEixos,
    datasets: [{ data: dataEixos, backgroundColor: ['#ef4444', '#f59e0b', '#3b82f6', '#10b981', '#8b5cf6', '#64748b'], borderWidth: 0 }]
  };

  const chartEixosOptions = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '70%',
    plugins: { legend: { position: 'bottom', align: 'start', labels: { boxWidth: 12, padding: 16, font: { size: 11 } } } }
  };

  // Specific Tab charts
  const subChartType = (currentTab === 'saneamento' || currentTab === 'mobilidade') ? 'doughnut' : 'bar';
  const subColors = subChartType === 'doughnut' ? ['#3b82f6', '#8b5cf6', '#10b981'] : (cor === 'amber' ? '#f59e0b' : (cor === 'blue' ? '#3b82f6' : '#ef4444'));

  const subChartData = {
    labels: Object.keys(stats.subs),
    datasets: [{
      label: 'Registros',
      data: Object.values(stats.subs),
      backgroundColor: subColors,
      borderRadius: subChartType === 'bar' ? 4 : 0
    }]
  };

  const subChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: subChartType === 'doughnut', position: 'bottom', align: 'start', labels: { boxWidth: 12, padding: 16, font: { size: 11 } } } },
    scales: subChartType === 'bar' ? { x: { grid: { display: false } }, y: { grid: { display: false } } } : {}
  };


  // Exports
  const executeExportCSV = () => {
    exportDashboardCSV({ filteredData, currentTab });
    setIsExportModalOpen(false);
  };

  const executeExportPDF = async () => {
    setIsExportModalOpen(false);
    await exportDashboardPDF({
      currentTab,
      bairroFilter,
      timeFilter,
      eixos: EIXOS,
      stats,
      filteredData,
      hasScore,
      notaBairro,
      resolucaoPct,
      tempoMedio,
      topRuas,
      topProblemName,
      topProblemCount,
      cor,
    });
  };

  return (
    <div className="bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50 font-sans min-h-screen flex flex-col selection:bg-red-600 selection:text-white overflow-x-hidden relative">
      <SEO 
        title="Painel Público de Indicadores Urbanos | Radar Territorial"
        description="Monitore indicadores em tempo real de zeladoria urbana, taxa de resolução de problemas, mapa territorial e demandas por bairro em Campo Grande e região."
        canonical="/dashboard"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "Dataset",
          "name": "Indicadores Públicos de Zeladoria Urbana - Radar Territorial",
          "description": "Dados abertos e indicadores territoriais de resolução de problemas urbanos em Campo Grande, Cosmos e Inhoaíba.",
          "url": "https://radar-territorial.vercel.app/dashboard",
          "creator": {
            "@type": "Organization",
            "name": "Radar Territorial"
          }
        }}
      />
      
      <Header toggleTheme={toggleTheme} currentTime={currentTime} />

      <FilterBar 
        currentTab={currentTab} setCurrentTab={setCurrentTab}
        bairroFilter={bairroFilter} setBairroFilter={setBairroFilter}
        timeFilter={timeFilter} setTimeFilter={setTimeFilter}
        setIsExportModalOpen={setIsExportModalOpen}
      />

      {/* MOBILE DRAWER TRIGGER */}
      <button onClick={() => setIsDrawerOpen(true)} className="md:hidden fixed bottom-6 right-6 z-[90] bg-red-600 text-white p-4 rounded-full shadow-[0_10px_40px_rgba(220,38,38,0.6)] hover:bg-red-700 active:scale-95 transition-all flex items-center justify-center">
        <SlidersHorizontal className="h-6 w-6" />
      </button>

      <MobileDrawer
        isDrawerOpen={isDrawerOpen} setIsDrawerOpen={setIsDrawerOpen}
        toggleTheme={toggleTheme} currentTab={currentTab} setCurrentTab={setCurrentTab}
        bairroFilter={bairroFilter} setBairroFilter={setBairroFilter}
        timeFilter={timeFilter} setTimeFilter={setTimeFilter}
        setIsExportModalOpen={setIsExportModalOpen}
      />

      <ExportModal 
        isExportModalOpen={isExportModalOpen} setIsExportModalOpen={setIsExportModalOpen}
        executeExportCSV={executeExportCSV} executeExportPDF={executeExportPDF}
      />

      <ConstructionModal />

      {/* MAIN CONTENT */}
      <main className="flex-grow p-4 sm:p-6 max-w-7xl mx-auto w-full space-y-6 animate-in slide-in-from-bottom-4 fade-in duration-500 pb-24 md:pb-6">
        
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="h-10 w-10 text-red-600 animate-spin mb-4" />
            <h3 className="text-xl font-bold text-zinc-900 dark:text-white">Carregando dados territoriais...</h3>
            <p className="text-zinc-500 mt-2">Sincronizando com o Supabase</p>
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <TriangleAlert className="h-10 w-10 text-red-600 mb-4" />
            <h3 className="text-xl font-bold text-zinc-900 dark:text-white">{error}</h3>
            <button onClick={() => window.location.reload()} className="mt-4 px-4 py-2 bg-red-600 text-white rounded-xl font-bold hover:bg-red-700">Tentar Novamente</button>
          </div>
        ) : (
          <>
            <HeroSection 
              eixoData={EIXOS[currentTab] || EIXOS.geral} 
              notaBairro={notaBairro} 
              notaProgressPct={hasScore ? notaProgressPct : 0} 
              notaColor={notaColor} 
              hasScore={hasScore}
            />

            {currentTab === 'geral' && (
              <GeralKpis 
                stats={stats} 
                resolucaoPct={resolucaoPct} 
                tempoMedio={tempoMedio}
                hasScore={hasScore}
              />
            )}

            <MapSection 
              mapCenter={mapCenter} 
              mapZoom={mapZoom} 
              locateUser={locateUser} 
              isDarkMode={isDarkMode} 
              filteredData={filteredData} 
            />

            <ChartsSection 
              currentTab={currentTab}
              chartOpOptions={chartOpOptions}
              chartOpData={chartOpData}
              chartEixosOptions={chartEixosOptions}
              chartEixosData={chartEixosData}
              cor={cor}
              icone={icone}
              topProblemName={topProblemName}
              topProblemCount={topProblemCount}
              topProblemApoios={topProblemApoios}
              subChartType={subChartType}
              subChartOptions={subChartOptions}
              subChartData={subChartData}
              info={info}
              bairroFilter={bairroFilter}
            />

            <TopRuasTable topRuas={topRuas} />
          </>
        )}
      </main>
    </div>
  );
}
