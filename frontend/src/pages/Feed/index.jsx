import React, { useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import LoggedHeader from '../../components/LoggedHeader';
import SimpleFooter from '../../components/SimpleFooter';
import FeedHeader from '../../components/FeedHeader';
import FeedFilters from '../../components/FeedFilters';
import FeedList from '../../components/FeedList';
import { supabase } from '../../lib/supabaseClient';

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
          const { data: profiles } = await supabase.from('profiles').select('id, nome_completo').in('id', userIds);
          
          const mapped = fallbackData.map(report => {
            const prof = profiles?.find(p => p.id === report.user_id);
            return mapDBReportToFeedCard(report, prof);
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

  const mapDBReportToFeedCard = (dbReport, profileData) => {
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

    const region = dbReport.bairro ? dbReport.bairro.toLowerCase().replace(/ /g, "-") : "all";

    const categoryIconMap = {
      'infra': 'MapPin',
      'saneamento': 'Droplet',
      'mobilidade': 'Bus',
      'iluminacao': 'Lightbulb',
      'seguranca': 'ShieldAlert'
    };
    const categoryIcon = categoryIconMap[dbReport.macro_eixo] || 'Info';

    let urgency = 'recente';
    let urgencyText = 'Problema Recente';
    let urgencyClass = 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800/50 text-blue-700 dark:text-blue-400';
    let urgencyIcon = 'Info';

    const urgenciasStr = dbReport.urgencias ? dbReport.urgencias.join(' ').toLowerCase() : '';
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

    return {
      id: dbReport.id,
      author,
      initials,
      avatarBg,
      location,
      region,
      category: dbReport.macro_eixo,
      categoryText: dbReport.categoria_nome || dbReport.macro_eixo,
      categoryIcon,
      urgency,
      urgencyText,
      urgencyClass,
      urgencyIcon,
      description: dbReport.descricao,
      votes: dbReport.apoios_count || 0,
      userHasVoted: false,
      date,
      time,
      status: dbReport.status === 'resolvido' ? 'resolved' : 'pending',
      statusText,
      statusClass,
      statusIcon,
      organName: dbReport.orgao_responsavel_id ? "Órgão Responsável" : null,
      responseDate: dbReport.fechado_em ? new Date(dbReport.fechado_em).toLocaleDateString('pt-BR') : date,
      responseText: dbReport.resposta_orgao,
      comments: [], // Arrays can be expanded in the future
      comentarios_count: dbReport.comentarios_count || 0,
      user_id: dbReport.user_id
    };
  };

  const handleSupport = (id) => {
    setReports(prev => prev.map(report => {
      if (report.id === id) {
        return {
          ...report,
          userHasVoted: !report.userHasVoted,
          votes: report.userHasVoted ? report.votes - 1 : report.votes + 1
        };
      }
      return report;
    }));
  };

  const filteredData = reports.filter(report => {
    const searchLower = filters.search.toLowerCase();
    const matchesSearch = filters.search === "" ||
      report.author.toLowerCase().includes(searchLower) ||
      report.location.toLowerCase().includes(searchLower) ||
      (report.description && report.description.toLowerCase().includes(searchLower));

    const matchesRegion = filters.region === "all" || report.region === filters.region;
    const matchesCategory = filters.category === "all" || report.category === filters.category;
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
    <div className="transition-colors duration-500 ease-in-out min-h-screen bg-[#F9FAFB] text-zinc-900 dark:bg-[#09090B] dark:text-zinc-50 font-sans flex flex-col">
      <LoggedHeader />

      <main className="flex-grow pt-32 pb-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto w-full flex flex-col justify-start animate-in slide-in-from-bottom-4 duration-500">
        
        <FeedHeader />

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
