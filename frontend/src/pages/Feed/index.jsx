import React, { useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import LoggedHeader from '../../components/LoggedHeader';
import SimpleHeader from '../../components/SimpleHeader';
import SimpleFooter from '../../components/SimpleFooter';
import FeedHeader from '../../components/FeedHeader';
import FeedFilters from '../../components/FeedFilters';
import FeedList from '../../components/FeedList';
import { supabase } from '../../lib/supabaseClient';
import { getUserApoios, toggleApoio } from '../../services/interacoesService';

export default function Feed() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentUserId, setCurrentUserId] = useState(null);
  const itemsPerPage = 5;

  const [filters, setFilters] = useState({
    search: '',
    region: 'all',
    category: 'all',
    urgency: 'all'
  });

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          setCurrentUserId(user.id);
        }
        // Buscamos os relatos manualmente e depois mapeamos os perfis para evitar erro de Foreign Key
        const { data: fallbackData, error } = await supabase.from('relatos').select('*').order('created_at', { ascending: false });
        
        if (error) throw error;
        
        if (fallbackData) {
          const userIds = [...new Set(fallbackData.map(r => r.user_id).filter(Boolean))];
          const orgaosIds = [...new Set(fallbackData.map(r => r.orgao_responsavel_id).filter(Boolean))];

          const [ { data: profiles }, { data: orgaos } ] = await Promise.all([
            supabase.from('profiles').select('id, nome_completo').in('id', userIds),
            orgaosIds.length > 0 ? supabase.from('orgaos').select('*').in('id', orgaosIds) : { data: [] }
          ]);
          
          let userApoiosIds = [];
          if (user) {
            userApoiosIds = await getUserApoios(user.id);
          }

          const mapped = fallbackData.map(report => {
            const prof = profiles?.find(p => p.id === report.user_id);
            const orgao = orgaos?.find(o => o.id == report.orgao_responsavel_id);
            const userVoted = userApoiosIds.includes(report.id);
            return mapDBReportToFeedCard(report, prof, userVoted, orgao);
          });
          setReports(mapped);
        }
      } catch (err) {
        console.error("Erro ao buscar feed:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const normalizeStr = (str) =>
    (str || '')
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .trim();

  const normalizeRegionKey = (bairro, location) => {
    const text = `${bairro || ''} ${location || ''}`;
    const norm = normalizeStr(text);
    if (norm.includes('campo grande') || norm.includes('campo-grande')) return 'campo-grande';
    if (norm.includes('inhoaiba')) return 'inhoaiba';
    if (norm.includes('cosmos')) return 'cosmos';
    return norm.replace(/\s+/g, '-') || 'all';
  };

  const normalizeCategoryKey = (macroEixo, categoriaNome) => {
    const text = `${macroEixo || ''} ${categoriaNome || ''}`;
    const norm = normalizeStr(text);
    if (norm.includes('infra') || norm.includes('via') || norm.includes('buraco') || norm.includes('calcada') || norm.includes('arvore')) return 'infra';
    if (norm.includes('saneamento') || norm.includes('limpeza') || norm.includes('lixo') || norm.includes('esgoto') || norm.includes('agua') || norm.includes('bueiro') || norm.includes('entulho')) return 'saneamento';
    if (norm.includes('ilumina') || norm.includes('luz') || norm.includes('poste') || norm.includes('fio') || norm.includes('lampada')) return 'iluminacao';
    if (norm.includes('mobilidade') || norm.includes('transporte') || norm.includes('onibus') || norm.includes('semaforo') || norm.includes('ponto')) return 'mobilidade';
    if (norm.includes('seguranca') || norm.includes('inseguranca') || norm.includes('barricada') || norm.includes('ocupacao')) return 'seguranca';
    return norm.replace(/\s+/g, '-') || 'all';
  };

  const mapDBReportToFeedCard = (dbReport, profileData, userVoted = false, orgaoData = null) => {
    let author = "Usuário Anônimo";
    let initials = "CA";
    
    if (!dbReport.is_anonimo && profileData) {
      author = profileData.nome_completo || author;
      const parts = author.trim().split(' ');
      if (parts.length > 1) {
        initials = `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
      } else {
        initials = author.substring(0, 2).toUpperCase();
      }
    }

    const colors = [
      "bg-red-500/10 text-red-600", "bg-blue-500/10 text-blue-600", 
      "bg-green-500/10 text-green-600", "bg-amber-500/10 text-amber-600", 
      "bg-purple-500/10 text-purple-600", "bg-zinc-500/10 text-zinc-600 dark:text-zinc-400"
    ];
    const avatarBg = dbReport.is_anonimo 
      ? "bg-zinc-200 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300" 
      : colors[author.length % colors.length];

    let locationParts = [dbReport.rua, dbReport.bairro, dbReport.cep ? `CEP: ${dbReport.cep}` : null].filter(Boolean);
    let location = locationParts.join(', ') || 'Localização não informada';
    if (dbReport.referencia) location += ` • Ref: ${dbReport.referencia}`;

    const region = normalizeRegionKey(dbReport.bairro, location);
    const categoryKey = normalizeCategoryKey(dbReport.macro_eixo, dbReport.categoria_nome);

    const categoryIconMap = {
      'infra': 'MapPin',
      'saneamento': 'Droplet',
      'mobilidade': 'Bus',
      'iluminacao': 'Lightbulb',
      'seguranca': 'ShieldAlert',
      'inseguranca': 'ShieldAlert'
    };
    const categoryIcon = categoryIconMap[categoryKey] || 'MapPin';

    let urgency = 'recente';
    let urgencyText = 'Problema Recente';
    let urgencyClass = 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800/50 text-blue-700 dark:text-blue-400';
    let urgencyIcon = 'Info';

    const urgenciasStr = Array.isArray(dbReport.urgencias)
      ? dbReport.urgencias.join(' ').toLowerCase()
      : (typeof dbReport.urgencias === 'string' ? dbReport.urgencias.toLowerCase() : '');

    if (urgenciasStr.includes('grave') || urgenciasStr.includes('acidente')) {
      urgency = 'grave';
      urgencyText = 'Grave / Risco de Acidente';
      urgencyClass = 'bg-red-50 dark:bg-red-950/30 border-red-200 dark:border-red-900/30 text-red-600 dark:text-red-400';
      urgencyIcon = 'AlertTriangle';
    } else if (urgenciasStr.includes('urgente')) {
      urgency = 'urgente';
      urgencyText = 'Urgente';
      urgencyClass = 'bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-900/20 text-amber-600 dark:text-amber-400';
      urgencyIcon = 'AlertCircle';
    } else if (urgenciasStr.includes('abandono') || urgenciasStr.includes('tempo')) {
      urgency = 'abandono';
      urgencyText = 'Muito tempo abandonado';
      urgencyClass = 'bg-purple-50 dark:bg-purple-950/20 border-purple-200 dark:border-purple-900/20 text-purple-600 dark:text-purple-400';
      urgencyIcon = 'History';
    }

    const dateObj = new Date(dbReport.created_at);
    const date = dateObj.toLocaleDateString('pt-BR');
    const time = dateObj.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

    let statusText = 'Pendente';
    let statusClass = 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-800';
    let statusIcon = 'Clock';
    
    if (dbReport.status === 'resolvido') {
      statusText = 'Resolvido';
      statusClass = 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 border-green-200 dark:border-green-800';
      statusIcon = 'CheckCircle';
    }

    let formattedResponseDate = `${date} às ${time}`;
    if (dbReport.fechado_em) {
      const responseDateObj = new Date(dbReport.fechado_em);
      formattedResponseDate = `${responseDateObj.toLocaleDateString('pt-BR')} às ${responseDateObj.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}`;
    } else if (dbReport.updated_at && dbReport.resposta_orgao) {
      const responseDateObj = new Date(dbReport.updated_at);
      formattedResponseDate = `${responseDateObj.toLocaleDateString('pt-BR')} às ${responseDateObj.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}`;
    }

    return {
      id: dbReport.id,
      author,
      initials,
      avatarBg,
      location,
      region,
      category: categoryKey,
      categoryText: dbReport.categoria_nome || dbReport.macro_eixo || 'Outra situação',
      categoryIcon,
      urgency,
      urgencyText,
      urgencyClass,
      urgencyIcon,
      description: dbReport.descricao,
      votes: dbReport.apoios_count || 0,
      userHasVoted: userVoted,
      date,
      time,
      status: dbReport.status === 'resolvido' ? 'resolved' : 'pending',
      statusText,
      statusClass,
      statusIcon,
      organName: orgaoData ? (orgaoData.nome || orgaoData.name || "Órgão Responsável") : (dbReport.orgao_responsavel_id ? "Órgão Responsável" : null),
      responseDate: formattedResponseDate,
      responseText: dbReport.resposta_orgao,
      comments: [],
      comentarios_count: dbReport.comentarios_count || 0,
      user_id: dbReport.user_id
    };
  };

  const handleSupport = async (id) => {
    if (!currentUserId) return; // Se não logado, o AuthModal já cuidará disso no FeedCard
    
    // Encontrar report atual
    const reportToUpdate = reports.find(r => r.id === id);
    if (!reportToUpdate) return;

    const currentStatus = reportToUpdate.userHasVoted;

    // Atualização otimista
    setReports(prev => prev.map(report => {
      if (report.id === id) {
        return {
          ...report,
          userHasVoted: !currentStatus,
          votes: currentStatus ? Math.max(0, report.votes - 1) : report.votes + 1
        };
      }
      return report;
    }));

    // Chamada à API
    const { success } = await toggleApoio(id, currentUserId, currentStatus);
    
    // Se falhar, reverte
    if (!success) {
      setReports(prev => prev.map(report => {
        if (report.id === id) {
          return {
            ...report,
            userHasVoted: currentStatus,
            votes: currentStatus ? report.votes + 1 : Math.max(0, report.votes - 1)
          };
        }
        return report;
      }));
    }
  };

  const filteredData = reports.filter(report => {
    const searchLower = normalizeStr(filters.search);
    const matchesSearch = searchLower === "" ||
      normalizeStr(report.author).includes(searchLower) ||
      normalizeStr(report.location).includes(searchLower) ||
      normalizeStr(report.categoryText).includes(searchLower) ||
      (report.description && normalizeStr(report.description).includes(searchLower));

    const matchesRegion = filters.region === "all" || 
      report.region === filters.region ||
      normalizeStr(report.region).includes(normalizeStr(filters.region)) ||
      normalizeStr(report.location).includes(normalizeStr(filters.region.replace(/-/g, ' ')));

    const matchesCategory = filters.category === "all" || 
      report.category === filters.category ||
      (filters.category === "seguranca" && report.category === "inseguranca") ||
      (filters.category === "inseguranca" && report.category === "seguranca") ||
      normalizeStr(report.categoryText).includes(normalizeStr(filters.category));

    const matchesUrgency = filters.urgency === "all" || report.urgency === filters.urgency;

    return matchesSearch && matchesRegion && matchesCategory && matchesUrgency;
  });

  useEffect(() => {
    setCurrentPage(1);
  }, [filters]);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const clearFilters = () => {
    setFilters({
      search: '',
      region: 'all',
      category: 'all',
      urgency: 'all'
    });
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB] text-zinc-900 dark:bg-[#09090B] dark:text-zinc-50 font-sans flex flex-col">
      {currentUserId ? <LoggedHeader /> : <SimpleHeader backLink="/" />}

      <main className="flex-grow pt-32 pb-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto w-full flex flex-col justify-start animate-in slide-in-from-bottom-4 duration-500">
        
        <FeedHeader isLoggedIn={!!currentUserId} />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          <FeedFilters 
            filters={filters}
            setFilters={setFilters}
            clearFilters={clearFilters}
            showMobileFilters={showMobileFilters}
            setShowMobileFilters={setShowMobileFilters}
          />

          {loading ? (
             <div className="lg:col-span-8 flex flex-col items-center justify-center text-center py-20 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-[2.5rem]">
               <Loader2 className="h-10 w-10 text-red-600 animate-spin mb-4" />
               <h3 className="text-xl font-bold mb-1">Carregando Feed Comunitário...</h3>
             </div>
          ) : (
            <FeedList 
              filteredData={filteredData}
              paginatedData={paginatedData}
              handleSupport={handleSupport}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              totalPages={totalPages}
              currentUserId={currentUserId}
            />
          )}
          
        </div>
      </main>
      <SimpleFooter />
    </div>
  );
}
