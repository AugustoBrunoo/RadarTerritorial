import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import {
  ArrowLeft, Clock, Droplet, MapPin,
  Loader2, CheckCircle, Lightbulb, ShieldAlert, Bus
} from 'lucide-react';
import LoggedHeader from '../../components/LoggedHeader';
import SimpleHeader from '../../components/SimpleHeader';
import SimpleFooter from '../../components/SimpleFooter';
import { supabase } from '../../lib/supabaseClient';

import RelatoHeader from '../../components/RelatoHeader';
import RelatoMidia from '../../components/RelatoMidia';
import RelatoLinhaDoTempo from '../../components/RelatoLinhaDoTempo';
import RelatoAcoes from '../../components/RelatoAcoes';
import RelatoComentarios from '../../components/RelatoComentarios';

const getCategoryIcon = (macroEixo) => {
  const eixoStr = (macroEixo || "").toLowerCase();
  if (eixoStr.includes('infra')) return MapPin;
  if (eixoStr.includes('ilumina')) return Lightbulb;
  if (eixoStr.includes('saneamento') || eixoStr.includes('agua') || eixoStr.includes('esgoto')) return Droplet;
  if (eixoStr.includes('inseguran') || eixoStr.includes('seguran')) return ShieldAlert;
  if (eixoStr.includes('transporte') || eixoStr.includes('mobilidade')) return Bus;
  return MapPin;
};

const getStatusDetails = (status) => {
  switch (status) {
    case 'resolvido':
      return { text: 'Resolvido', class: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 border-green-200 dark:border-green-800', Icon: CheckCircle };
    case 'rejeitado':
      return { text: 'Rejeitado', class: 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 border-red-200 dark:border-red-800', Icon: CheckCircle };
    case 'em_execucao':
      return { text: 'Em Execução', class: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 border-blue-200 dark:border-blue-800', Icon: Clock };
    case 'em_analise':
      return { text: 'Em Análise', class: 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 border-purple-200 dark:border-purple-800', Icon: Clock };
    case 'pendente':
    default:
      return { text: 'Pendente', class: 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-800', Icon: Clock };
  }
};

export default function RelatoDetalhado() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isOwner, setIsOwner] = useState(false);
  const [authorName, setAuthorName] = useState("");
  const [currentUserId, setCurrentUserId] = useState(null);
  const [orgaoResponsavel, setOrgaoResponsavel] = useState(null);

  useEffect(() => {
    async function loadData() {
      if (!id) return;
      setLoading(true);
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          setCurrentUserId(user.id);
        }

        const { data: relatoData, error } = await supabase
          .from('relatos')
          .select('*')
          .eq('id', id)
          .single();

        if (error) throw error;

        setReport(relatoData);
        if (user && relatoData.user_id === user.id) {
          setIsOwner(true);
        }

        if (relatoData.is_anonimo) {
          setAuthorName("Usuário Anônimo");
        } else if (relatoData.user_id) {
          const { data: profile } = await supabase
            .from('profiles')
            .select('nome_completo')
            .eq('id', relatoData.user_id)
            .single();
          setAuthorName(profile?.nome_completo || "Usuário Anônimo");
        } else {
          setAuthorName("Usuário Anônimo");
        }

        if (relatoData.orgao_responsavel_id) {
          const { data: orgao } = await supabase
            .from('orgaos')
            .select('*')
            .eq('id', relatoData.orgao_responsavel_id)
            .single();
          if (orgao) {
            setOrgaoResponsavel(orgao);
          }
        }
      } catch (err) {
        console.error("Erro ao carregar relato:", err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F9FAFB] text-zinc-900 dark:bg-[#09090B] dark:text-zinc-50 font-sans flex flex-col">
        {currentUserId ? <LoggedHeader /> : <SimpleHeader backLink="/feed" />}
        <main className="flex-grow pt-40 pb-16 px-4 flex flex-col items-center justify-center">
          <Loader2 className="h-10 w-10 text-red-600 animate-spin mb-4" />
          <p className="font-bold">Buscando relato...</p>
        </main>
        <SimpleFooter />
      </div>
    );
  }

  if (!report) {
    return (
      <div className="min-h-screen bg-[#F9FAFB] text-zinc-900 dark:bg-[#09090B] dark:text-zinc-50 font-sans flex flex-col">
        {currentUserId ? <LoggedHeader /> : <SimpleHeader backLink="/feed" />}
        <main className="flex-grow pt-40 pb-16 px-4 flex flex-col items-center justify-center">
          <MapPin className="h-10 w-10 text-zinc-400 mb-4" />
          <h2 className="text-xl font-bold mb-4">Relato não encontrado</h2>
          <button onClick={() => navigate('/feed')} className="px-4 py-2 bg-red-600 text-white rounded-lg font-bold">Voltar para o Feed</button>
        </main>
        <SimpleFooter />
      </div>
    );
  }

  const CategoryIcon = getCategoryIcon(report.macro_eixo);
  const statusDetails = getStatusDetails(report.status);
  const StatusIcon = statusDetails.Icon;

  const createdDate = new Date(report.created_at);
  const dateStr = createdDate.toLocaleDateString('pt-BR');

  let locationParts = [report.rua, report.bairro, report.cep ? `CEP: ${report.cep}` : null].filter(Boolean);
  let locationStr = locationParts.join(', ') || 'Localização não informada';
  if (report.referencia) locationStr += ` • Ref: ${report.referencia}`;

  return (
    <div className="min-h-screen bg-[#F9FAFB] text-zinc-900 dark:bg-[#09090B] dark:text-zinc-50 font-sans flex flex-col">
      {currentUserId ? <LoggedHeader /> : <SimpleHeader backLink="/feed" />}

      <main className="flex-grow pt-32 pb-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto w-full animate-in fade-in slide-in-from-bottom-8 duration-700">

        {/* Navigation (Exclusivo para usuários logados, já que não logados possuem o botão no SimpleHeader) */}
        {currentUserId && (
          <div className="mb-6 flex flex-wrap gap-3">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-sm font-bold text-zinc-700 dark:text-zinc-300 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 px-4 py-2 rounded-xl shadow-sm hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-all"
            >
              <ArrowLeft className="h-4 w-4" />
              Voltar
            </button>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* COLUNA DA ESQUERDA (Detalhes do Relato) */}
          <div className="lg:col-span-2 space-y-8 min-w-0">
            <RelatoHeader
              report={report}
              dateStr={dateStr}
              isOwner={isOwner}
              authorName={authorName}
              CategoryIcon={CategoryIcon}
              StatusIcon={StatusIcon}
              statusDetails={statusDetails}
            />
            <RelatoMidia
              report={report}
              locationStr={locationStr}
            />
            <RelatoLinhaDoTempo
              report={report}
              dateStr={dateStr}
              orgao={orgaoResponsavel}
            />
          </div>

          {/* COLUNA DA DIREITA (Apoio e Comentários) */}
          <div className="space-y-6 min-w-0">
            <RelatoAcoes report={report} isOwner={isOwner} currentUserId={currentUserId} />
            <RelatoComentarios report={report} currentUserId={currentUserId} />
          </div>
        </div>
      </main>

      <SimpleFooter />
    </div>
  );
}
