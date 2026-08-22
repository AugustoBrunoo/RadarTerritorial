import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { ArrowLeft, History, HelpCircle, Inbox, Clock, CheckCircle, Loader2 } from "lucide-react";
import LoggedHeader from "../../components/LoggedHeader";
import SimpleFooter from "../../components/SimpleFooter";
import DemandasStats from "../../components/DemandasStats";
import DemandasFiltros from "../../components/DemandasFiltros";
import DemandaCard from "../../components/DemandaCard";
import DemandasPagination from "../../components/DemandasPagination";
import DemandasTutorialModal from "../../components/DemandasTutorialModal";
import { supabase } from "../../lib/supabaseClient";

export default function DemandasUsuario() {
  const navigate = useNavigate();
  const [currentFilter, setCurrentFilter] = useState('all');
  const [isTutorialOpen, setIsTutorialOpen] = useState(false);
  const [currentTutStep, setCurrentTutStep] = useState(1);
  
  const [reports, setReports] = useState([]);
  const [userInitials, setUserInitials] = useState('VC');
  const [loading, setLoading] = useState(true);
  const totalTutSteps = 4;

  useEffect(() => {
    async function fetchReports() {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
          setLoading(false);
          return;
        }

        // Buscando iniciais do usuário
        let fullName = user.user_metadata?.nome_completo;
        if (!fullName) {
          const { data: profile } = await supabase
            .from('profiles')
            .select('nome_completo')
            .eq('id', user.id)
            .single();
          if (profile) fullName = profile.nome_completo;
        }

        if (fullName) {
          const parts = fullName.trim().split(' ');
          if (parts.length > 1) {
            setUserInitials(`${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase());
          } else {
            setUserInitials(fullName.substring(0, 2).toUpperCase());
          }
        }

        const { data, error } = await supabase
          .from("relatos")
          .select(`
            id, created_at, bairro, cep, rua, referencia, tipo_loc, 
            macro_eixo, categoria_nome, status, descricao, 
            resposta_orgao, fechado_em, protocolo_oficial, 
            apoios_count, comentarios_count
          `)
          .eq("user_id", user.id)
          .order("created_at", { ascending: false });

        if (error) throw error;
        setReports(data || []);
      } catch (err) {
        console.error("Erro ao buscar demandas:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchReports();
  }, []);

  // "pendente", "em_analise", "em_execucao", "rejeitado" -> pending
  // "resolvido" -> resolved
  const getMappedStatus = (dbStatus) => {
    return dbStatus === 'resolvido' ? 'resolved' : 'pending';
  };

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const filteredData = reports.filter(report => {
    if (currentFilter === 'all') return true;
    return getMappedStatus(report.status) === currentFilter;
  });

  // Whenever filter changes, reset to page 1
  useEffect(() => {
    setCurrentPage(1);
  }, [currentFilter]);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  
  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const nextTutorialStep = () => {
    if (currentTutStep < totalTutSteps) {
      setCurrentTutStep(prev => prev + 1);
    } else {
      setIsTutorialOpen(false);
      setTimeout(() => setCurrentTutStep(1), 300);
    }
  };

  const prevTutorialStep = () => {
    if (currentTutStep > 1) {
      setCurrentTutStep(prev => prev - 1);
    }
  };

  // derived state for counts
  const pendingCount = reports.filter(r => getMappedStatus(r.status) === 'pending').length;
  const resolvedCount = reports.filter(r => getMappedStatus(r.status) === 'resolved').length;

  return (
    <div className="min-h-screen bg-[#F9FAFB] text-zinc-900 dark:bg-[#09090B] dark:text-zinc-50 font-sans flex flex-col">
      <LoggedHeader />

      <main className="flex-grow pt-32 pb-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto w-full flex flex-col justify-start animate-in fade-in slide-in-from-bottom-8 duration-700">
        
        {/* Botões de Navegação */}
        <div className="mb-6 flex flex-wrap gap-3">
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-sm font-bold text-zinc-700 dark:text-zinc-300 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 px-4 py-2 rounded-xl shadow-sm hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-all"
          >
            <ArrowLeft className="h-4 w-4" />
            Voltar
          </button>
        </div>

        {/* Cabeçalho da Página */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-zinc-900 dark:text-white flex items-center gap-3">
                <History className="h-8 w-8 text-red-600" /> Suas Demandas
              </h1>
              <p className="text-sm sm:text-base text-zinc-500 dark:text-zinc-400 font-medium mt-2">
                Confira o status consolidado das solicitações que você registrou na plataforma.
              </p>
            </div>

            <button 
              onClick={() => {
                setCurrentTutStep(1);
                setIsTutorialOpen(true);
              }}
              className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:bg-zinc-50 dark:hover:bg-zinc-800 text-sm font-bold text-zinc-700 dark:text-zinc-300 transition-all shadow-sm active:scale-95 group"
            >
              <HelpCircle className="h-4 w-4 text-red-600 group-hover:rotate-12 transition-transform" />
              <span>Como funciona?</span>
            </button>
          </div>
        </div>

        <DemandasStats 
          enviados={reports.length} 
          naoResolvidos={pendingCount} 
          resolvidos={resolvedCount} 
        />

        <DemandasFiltros 
          currentFilter={currentFilter} 
          onFilterChange={setCurrentFilter} 
          totalCount={reports.length}
          pendingCount={pendingCount}
          resolvedCount={resolvedCount}
        />

        {/* LISTA DE DEMANDAS */}
        <div className="space-y-5">
          {loading ? (
            <div className="flex flex-col items-center justify-center text-center py-16 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-[2rem]">
              <Loader2 className="h-10 w-10 text-red-600 animate-spin mb-4" />
              <h3 className="text-xl font-bold mb-1">Carregando seus relatos...</h3>
            </div>
          ) : filteredData.length === 0 ? (
            <div className="flex flex-col items-center justify-center text-center py-16 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-[2rem] animate-in fade-in">
              <div className="w-16 h-16 bg-zinc-100 dark:bg-zinc-800 rounded-full flex items-center justify-center mb-4 text-zinc-400">
                <Inbox className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold mb-1">Nenhum relato encontrado</h3>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 max-w-xs font-medium">Você não possui demandas nesta categoria.</p>
            </div>
          ) : (
            paginatedData.map(report => (
              <DemandaCard key={report.id} report={report} userInitials={userInitials} />
            ))
          )}
        </div>

        {filteredData.length > 0 && (
          <DemandasPagination 
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        )}
      </main>

      <SimpleFooter />

      <DemandasTutorialModal 
        isOpen={isTutorialOpen} 
        onClose={() => setIsTutorialOpen(false)} 
        currentTutStep={currentTutStep} 
        totalTutSteps={totalTutSteps} 
        onNext={nextTutorialStep} 
        onPrev={prevTutorialStep} 
      />
    </div>
  );
}
