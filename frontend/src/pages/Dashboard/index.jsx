import React, { useState, useMemo, useEffect } from 'react';
import { SlidersHorizontal, Activity, TriangleAlert, CloudRain, Zap, Bus, ShieldAlert, Loader2 } from 'lucide-react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import html2pdf from 'html2pdf.js';

import { EIXOS, CONTATOS_ORGAOS, ruas } from './data';
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

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

export default function Dashboard() {
  // State
  const [currentTab, setCurrentTab] = useState('geral');
  const [bairroFilter, setBairroFilter] = useState('all');
  const [timeFilter, setTimeFilter] = useState('all');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
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

    if (bairroFilter !== 'all') fd = fd.filter(d => d.bairro === bairroFilter);
    if (timeFilter !== 'all') {
        const limitDate = new Date(); 
        limitDate.setDate(limitDate.getDate() - parseInt(timeFilter));
        fd = fd.filter(d => d.dataCriacao >= limitDate);
    }
    if (currentTab !== 'geral') { fd = fd.filter(d => d.eixo === currentTab); }

    const st = { total: fd.length, resolvidos: 0, ativas: 0, slaEstourado: 0, somaDias: 0, reabertas: 0, subs: {}, eixos: {}, pontosCriticos: {}, ops: {} };

    fd.forEach(d => {
        if (d.status === "Resolvido") st.resolvidos++; else st.ativas++;
        if (d.status === "Não Resolvido" && d.diasAberto > 30) st.slaEstourado++;
        if (d.reaberto) st.reabertas++;
        if (d.status === "Resolvido") st.somaDias += d.diasAberto;
        if (!st.subs[d.category]) st.subs[d.category] = 0; st.subs[d.category]++;
        if (!st.eixos[d.eixo]) st.eixos[d.eixo] = 0; st.eixos[d.eixo]++;
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
  const resolucaoPct = stats.total > 0 ? Math.round((stats.resolvidos / stats.total) * 100) : 0;
  const tempoMedio = stats.resolvidos > 0 ? Math.round(stats.somaDias / stats.resolvidos) : 0;
  const notaBairro = stats.total > 0 ? ((stats.resolvidos / stats.total) * 10).toFixed(1) : "10.0";
  const notaProgressPct = stats.total > 0 ? Math.round((stats.resolvidos / stats.total) * 100) : 100;
  
  let notaColor = "bg-emerald-500";
  if (notaProgressPct < 50) notaColor = "bg-red-500";
  else if (notaProgressPct < 75) notaColor = "bg-amber-500";

  const topRuas = Object.entries(stats.pontosCriticos).sort((a, b) => b[1].apoios - a[1].apoios).slice(0, 5);

  // Specific Tab Data
  let arvores = 0, icone = Activity, cor = 'red', tituloKpi = '', subtituloKpi = '';
  if (currentTab === 'infra') { arvores = filteredData.filter(d => d.category === "Árvore com risco de queda" && d.status === "Não Resolvido").length; icone = TriangleAlert; cor = 'red'; tituloKpi = 'Árvores com Risco Iminente'; subtituloKpi = 'Aguardando intervenção emergencial na região.'; }
  else if (currentTab === 'saneamento') { arvores = filteredData.filter(d => d.category === "Bueiro entupido" && d.status === "Não Resolvido").length; icone = CloudRain; cor = 'blue'; tituloKpi = 'Alerta de Alagamento (Bueiros)'; subtituloKpi = 'Pontos críticos para dias de chuva forte.'; }
  else if (currentTab === 'iluminacao') { arvores = filteredData.filter(d => d.category === "Fios caídos na rua" && d.status === "Não Resolvido").length; icone = Zap; cor = 'amber'; tituloKpi = 'Risco de Choque Elétrico'; subtituloKpi = 'Fiações caídas aguardando reparo.'; }
  else if (currentTab === 'mobilidade') { arvores = filteredData.filter(d => d.category === "Ponto de ônibus danificado" && d.status === "Não Resolvido").length; icone = Bus; cor = 'zinc'; tituloKpi = 'Índice de Desabrigo'; subtituloKpi = 'Pontos de ônibus destruídos na região.'; }
  else if (currentTab === 'inseguranca') { arvores = filteredData.filter(d => d.category === "Barricada na via" && d.status === "Não Resolvido").length; icone = ShieldAlert; cor = 'red'; tituloKpi = 'Vias Bloqueadas (Barricadas)'; subtituloKpi = 'Cerceamento do direito de ir e vir.'; }

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
    plugins: { legend: { display: true, position: 'bottom' } },
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
    plugins: { legend: { position: 'right' } }
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
    plugins: { legend: { display: subChartType === 'doughnut', position: 'right' } },
    scales: subChartType === 'bar' ? { x: { grid: { display: false } }, y: { grid: { display: false } } } : {}
  };


  // Exports
  const executeExportCSV = () => {
    let csvContent = "data:text/csv;charset=utf-8,ID,Bairro,Rua,Eixo,Categoria,Operador,Status,Dias_Aberto,Apoios,Reaberto\n";
    filteredData.forEach(row => { csvContent += `${row.id},${row.bairro},"${row.rua}",${row.eixo},${row.category},${row.operador},${row.status},${row.diasAberto},${row.apoios},${row.reaberto}\n`; });
    const link = document.createElement("a"); 
    link.setAttribute("href", encodeURI(csvContent)); 
    link.setAttribute("download", `RadarTerritorial_${currentTab}_${new Date().getTime()}.csv`);
    document.body.appendChild(link); link.click(); document.body.removeChild(link);
    setIsExportModalOpen(false);
  };

  const executeExportPDF = () => {
    setIsExportModalOpen(false);

    const bName = bairroFilter === 'all' ? 'Todos os Bairros' : bairroFilter;
    const tMap = { 'all': 'Todo Histórico', '30': 'Últimos 30 dias', '90': 'Últimos 3 meses', '180': 'Últimos 6 meses' };
    const tName = tMap[timeFilter];
    const dataAtual = new Date().toLocaleString('pt-BR');
    const tabName = EIXOS[currentTab].label;

    let htmlPDF = `
        <div class="border-b-2 border-zinc-300 pb-4 mb-6 flex justify-between items-end">
            <div>
                <h1 class="text-4xl font-black tracking-tight text-zinc-900">Radar<span class="text-red-600">Territorial</span></h1>
                <p class="text-[11px] font-bold text-zinc-500 uppercase tracking-widest mt-1">Relatório Oficial de Zeladoria Urbana</p>
            </div>
            <div class="text-right text-sm text-zinc-600">
                <p><strong>Gerado em:</strong> ${dataAtual}</p>
                <p><strong>Bairro:</strong> ${bName} | <strong>Período:</strong> ${tName}</p>
            </div>
        </div>
        <div class="bg-zinc-100 p-4 rounded-xl mb-6 border border-zinc-200">
            <h2 class="text-xl font-bold text-zinc-900">${tabName}</h2>
            <p class="text-sm text-zinc-700 mt-1">${EIXOS[currentTab].desc}</p>
        </div>
    `;

    if (currentTab === 'geral') {
        htmlPDF += `
        <div class="grid grid-cols-4 gap-4 mb-8">
            <div class="border border-zinc-200 p-4 rounded-xl bg-white">
                <p class="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">Em Andamento</p>
                <h3 class="text-3xl font-black text-zinc-900 mt-1">${stats.ativas}</h3>
                <p class="text-[10px] text-red-500 mt-1 font-bold">+${stats.reabertas} reabertas</p>
            </div>
            <div class="border border-zinc-200 p-4 rounded-xl bg-white">
                <p class="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">Taxa de Solução</p>
                <h3 class="text-3xl font-black text-zinc-900 mt-1">${resolucaoPct}%</h3>
                <p class="text-[10px] text-zinc-500 mt-1">Média geral</p>
            </div>
            <div class="border border-zinc-200 p-4 rounded-xl bg-white">
                <p class="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">Prazo Médio</p>
                <h3 class="text-3xl font-black text-zinc-900 mt-1">${tempoMedio} <span class="text-sm">dias</span></h3>
                <p class="text-[10px] text-zinc-500 mt-1">Tempo de resposta</p>
            </div>
            <div class="border border-red-200 bg-red-50 p-4 rounded-xl">
                <p class="text-[10px] font-bold text-red-600 uppercase tracking-wider">Prazo Vencido</p>
                <h3 class="text-3xl font-black text-red-600 mt-1">${stats.slaEstourado}</h3>
                <p class="text-[10px] text-red-500 mt-1">> 30 dias paralisados</p>
            </div>
        </div>`;
    } else {
        let kpiClass = "bg-zinc-100 border-zinc-200 text-zinc-900";
        if (cor === 'red') kpiClass = "bg-red-50 border-red-200 text-red-600";
        else if (cor === 'blue') kpiClass = "bg-blue-50 border-blue-200 text-blue-600";
        else if (cor === 'amber') kpiClass = "bg-amber-50 border-amber-200 text-amber-600";

        htmlPDF += `
        <div class="border p-6 rounded-xl mb-8 text-center ${kpiClass}">
            <h3 class="text-5xl font-black mb-2">${arvores}</h3>
            <p class="text-lg font-bold">${tituloKpi}</p>
            <p class="text-sm mt-1 opacity-80">${subtituloKpi}</p>
        </div>`;
    }

    htmlPDF += `<h3 class="text-lg font-bold text-zinc-900 mb-4 border-b border-zinc-200 pb-2">Distribuição de Ocorrências</h3>`;
    htmlPDF += `<div class="mb-8 space-y-3">`;

    let dataForBars = {};
    if (currentTab === 'geral') {
        Object.keys(stats.ops).forEach(op => { dataForBars[op] = stats.ops[op].resolvido + stats.ops[op].pendente; });
    } else { dataForBars = stats.subs; }

    const sortedBars = Object.entries(dataForBars).sort((a, b) => b[1] - a[1]);
    const maxVal = sortedBars.length > 0 ? sortedBars[0][1] : 1;

    sortedBars.forEach(([label, value]) => {
        const pct = Math.max(2, Math.round((value / maxVal) * 100));
        htmlPDF += `
        <div class="flex items-center gap-4">
            <div class="w-2/5 text-sm font-bold text-zinc-700 truncate">${label}</div>
            <div class="w-3/5 flex items-center gap-3">
                <div class="flex-grow bg-zinc-100 rounded-md h-5 overflow-hidden border border-zinc-200">
                    <div class="bg-blue-500 h-full rounded-md" style="width: ${pct}%"></div>
                </div>
                <div class="w-10 text-right text-sm font-black text-zinc-900">${value}</div>
            </div>
        </div>`;
    });
    htmlPDF += `</div>`;

    htmlPDF += `<h3 class="text-lg font-bold text-zinc-900 mb-4 border-b border-zinc-200 pb-2">Vias Mais Críticas (Top 5)</h3>`;
    htmlPDF += `
    <table class="w-full text-left border-collapse text-sm">
        <thead>
            <tr class="text-[10px] font-bold text-zinc-500 uppercase tracking-wider border-b-2 border-zinc-200">
                <th class="pb-2">Onde / Responsável</th>
                <th class="pb-2">Bairro</th>
                <th class="pb-2 text-center">Registros</th>
                <th class="pb-2 text-center text-blue-600">Moradores Afetados</th>
            </tr>
        </thead>
        <tbody class="text-zinc-800">
    `;

    if (topRuas.length === 0) {
        htmlPDF += `<tr><td colspan="4" class="py-4 text-center text-zinc-500 italic">Nenhum problema crítico ativo neste filtro.</td></tr>`;
    } else {
        topRuas.forEach(([key, val]) => {
            const [rua, bairro, op] = key.split('|');
            htmlPDF += `
                <tr class="border-b border-zinc-100">
                    <td class="py-3"><strong class="block text-zinc-900">${rua}</strong><span class="text-[10px] text-zinc-500 uppercase block">${op}</span></td>
                    <td class="py-3 text-zinc-600">${bairro}</td>
                    <td class="py-3 text-center font-bold">${val.registros}</td>
                    <td class="py-3 text-center font-black text-blue-600">${val.apoios}</td>
                </tr>
            `;
        });
    }
    htmlPDF += `</tbody></table>`;

    const tempContainer = document.createElement('div');
    tempContainer.innerHTML = htmlPDF;
    tempContainer.className = "bg-white text-zinc-900 w-[800px] p-10 font-sans shadow-none";
    tempContainer.style.position = 'absolute';
    tempContainer.style.top = '0';
    tempContainer.style.left = '0';
    tempContainer.style.zIndex = '-9999';
    tempContainer.style.opacity = '0.01';
    tempContainer.style.pointerEvents = 'none';

    document.body.appendChild(tempContainer);

    const opt = {
        margin: 10,
        filename: `RadarTerritorial_${currentTab}_${Date.now()}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true, logging: false },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    setTimeout(() => {
        html2pdf().set(opt).from(tempContainer).save().then(() => {
            document.body.removeChild(tempContainer);
        });
    }, 150);
  };

  return (
    <div className="bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50 font-sans min-h-screen flex flex-col selection:bg-red-600 selection:text-white overflow-x-hidden relative">
      
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
              eixoData={EIXOS[currentTab]} 
              notaBairro={notaBairro} 
              notaProgressPct={notaProgressPct} 
              notaColor={notaColor} 
            />

            {currentTab === 'geral' && (
              <GeralKpis 
                stats={stats} 
                resolucaoPct={resolucaoPct} 
                tempoMedio={tempoMedio} 
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
              arvores={arvores}
              tituloKpi={tituloKpi}
              subtituloKpi={subtituloKpi}
              icone={icone}
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
