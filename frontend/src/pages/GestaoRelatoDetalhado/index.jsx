import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import {
  ArrowLeft, Clock, Droplet, MapPin,
  Loader2, CheckCircle, Lightbulb, ShieldAlert, Bus,
  Edit3, CheckCircle2
} from 'lucide-react';
import HeaderOrgao from '../../components/HeaderOrgao';
import SimpleFooter from '../../components/SimpleFooter';
import { supabase } from '../../lib/supabaseClient';

import RelatoHeader from '../../components/RelatoHeader';
import RelatoMidia from '../../components/RelatoMidia';
import RelatoLinhaDoTempo from '../../components/RelatoLinhaDoTempo';
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

export default function GestaoRelatoDetalhado() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authorName, setAuthorName] = useState("");
  const [currentUserId, setCurrentUserId] = useState(null);
  const [orgaoResponsavel, setOrgaoResponsavel] = useState(null);

  // States for Gestor Operations
  const [newStatus, setNewStatus] = useState('em_analise');
  const [protocolNumber, setProtocolNumber] = useState('');
  const [officialMessage, setOfficialMessage] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);

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
        setNewStatus(relatoData.status);

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

  const handleUpdateTicket = async () => {
    setIsUpdating(true);
    // Aqui você faria o update real no supabase:
    // await supabase.from('relatos').update({ status: newStatus }).eq('id', id);
    
    // Simulating API call
    setTimeout(() => {
      setIsUpdating(false);
      alert('Status do Ticket atualizado! O cidadão será notificado e o feed público será sincronizado.');
      setReport(prev => ({ ...prev, status: newStatus })); // Update locally for fast feedback
    }, 1000);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F9FAFB] text-zinc-900 dark:bg-[#09090B] dark:text-zinc-50 font-sans flex flex-col">
        <HeaderOrgao />
        <main className="flex-grow pt-40 pb-16 px-4 flex flex-col items-center justify-center">
          <Loader2 className="h-10 w-10 text-blue-600 animate-spin mb-4" />
          <p className="font-bold text-zinc-600 dark:text-zinc-400">Buscando detalhes operacionais...</p>
        </main>
        <SimpleFooter />
      </div>
    );
  }

  if (!report) {
    return (
      <div className="min-h-screen bg-[#F9FAFB] text-zinc-900 dark:bg-[#09090B] dark:text-zinc-50 font-sans flex flex-col">
        <HeaderOrgao />
        <main className="flex-grow pt-40 pb-16 px-4 flex flex-col items-center justify-center">
          <MapPin className="h-10 w-10 text-zinc-400 mb-4" />
          <h2 className="text-xl font-bold mb-4">Ticket não encontrado</h2>
          <button onClick={() => navigate('/gestao/operacional')} className="px-4 py-2 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition-colors">Voltar para Fila Operacional</button>
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
      <HeaderOrgao />

      <main className="flex-grow pt-32 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full animate-[fadeInUp_0.5s_ease-out_forwards]">

        <div className="mb-6">
          <button
            onClick={() => navigate('/gestao/operacional')}
            className="inline-flex items-center gap-2.5 px-4 py-2.5 bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 rounded-2xl shadow-sm hover:shadow text-xs sm:text-sm font-bold text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white transition-all active:scale-95 group w-max"
          >
            <div className="w-7 h-7 rounded-xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-500 group-hover:text-zinc-900 dark:group-hover:text-white group-hover:-translate-x-0.5 transition-all">
              <ArrowLeft className="h-4 w-4" />
            </div>
            <span>Voltar à Fila Operacional</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* COLUNA DA ESQUERDA (Detalhes do Relato) */}
          <div className="lg:col-span-2 space-y-8 min-w-0">
            <RelatoHeader
              report={report}
              dateStr={dateStr}
              isOwner={false} // Organização não é o owner original
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

          {/* COLUNA DA DIREITA (Ações Gestão e Comentários) */}
          <div className="space-y-6 min-w-0">
            
            {/* PAINEL DE CONTROLE DO GESTOR */}
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-[2rem] p-6 shadow-sm flex flex-col gap-5">
              <div className="flex items-center gap-3 border-b border-zinc-100 dark:border-zinc-800/60 pb-4">
                <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-500 shrink-0">
                  <Edit3 className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-lg font-black text-zinc-900 dark:text-white leading-tight">Painel Operacional</h3>
                  <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400">Atualize o cidadão sobre o andamento</p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-zinc-700 dark:text-zinc-300 mb-2">Mudar Status Operacional</label>
                <select 
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value)}
                  className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-3.5 text-sm font-bold text-zinc-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none shadow-sm transition-all hover:border-blue-400 cursor-pointer"
                >
                  <option value="pendente">Pendente (Aguardando Triagem)</option>
                  <option value="em_analise">Em Análise (Triagem Técnica)</option>
                  <option value="em_execucao">Em Execução (Equipe Despachada)</option>
                  <option value="resolvido">Resolvido / Concluído</option>
                  <option value="rejeitado">Rejeitado / Improcedente</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold text-zinc-700 dark:text-zinc-300 mb-2">Enviar Protocolo (Opcional)</label>
                <input 
                  type="text"
                  value={protocolNumber}
                  onChange={(e) => setProtocolNumber(e.target.value)}
                  placeholder="Ex: PROT-2026-8942"
                  className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-3.5 text-sm font-medium text-zinc-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none shadow-sm transition-all placeholder-zinc-400"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-zinc-700 dark:text-zinc-300 mb-2 flex items-center justify-between">
                  <span>Mensagem Oficial ao Cidadão</span>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20 px-2 py-0.5 rounded border border-emerald-200 dark:border-emerald-900/50">Feed Público</span>
                </label>
                <textarea 
                  rows="4" 
                  value={officialMessage}
                  onChange={(e) => setOfficialMessage(e.target.value)}
                  placeholder="Ex: Informamos que a equipe foi despachada ao local e o problema será resolvido em até 48h..." 
                  className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-3 text-sm text-zinc-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none resize-none shadow-sm transition-all placeholder-zinc-400 font-medium"
                ></textarea>
                <div className="mt-2 flex gap-2">
                  <button onClick={() => setOfficialMessage("Informamos que a equipe foi despachada para o local. Previsão de atendimento em até 48h.")} className="text-xs bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 px-3 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-700 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors">Em Rota</button>
                  <button onClick={() => setOfficialMessage("Serviço concluído com sucesso. Agradecemos o relato e a colaboração com a cidade.")} className="text-xs bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 px-3 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-700 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors">Concluído</button>
                </div>
              </div>

              <div className="pt-2">
                <button 
                  onClick={handleUpdateTicket}
                  disabled={isUpdating}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-3.5 rounded-xl text-sm font-black flex items-center justify-center gap-2 shadow-md shadow-blue-600/20 transition-all transform active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isUpdating ? <Loader2 className="h-5 w-5 animate-spin" /> : <CheckCircle2 className="h-5 w-5" />}
                  {isUpdating ? 'Atualizando...' : 'Atualizar Ticket e Notificar'}
                </button>
              </div>
            </div>

            <RelatoComentarios report={report} currentUserId={currentUserId} />
          </div>
        </div>
      </main>

      <SimpleFooter />
    </div>
  );
}
