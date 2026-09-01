import React from 'react';
import { useNavigate } from 'react-router';
import { CheckCircle2, Siren, MapPin, Calendar, Eye, Edit3, Trash2, Cone, Lightbulb, AlertTriangle } from 'lucide-react';

export default function FilaOperacionalList({
  filteredReports,
  todayRef,
  setSelectedReportId,
  setResponseModalOpen
}) {
  const navigate = useNavigate();
  return (
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
          const reportDate = new Date(report.created_at || new Date());
          const diffTime = Math.abs(todayRef - reportDate);
          const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
          const isSlaCritical = diffDays > 3 && report.status !== 'resolvido';

          const displayDate = reportDate.toLocaleDateString('pt-BR');
          const shortId = report.id ? String(report.id).substring(0, 8).toUpperCase() : 'N/D';
          const locationText = [report.rua, report.bairro].filter(Boolean).join(', ') || 'Local não informado';
          const authorText = report.is_anonimo ? 'Cidadão Anônimo' : 'Cidadão';
          
          let IconCmp = AlertTriangle;
          let urgencyClass = 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 border-zinc-200 dark:border-zinc-700';
          let urgencyText = report.macro_eixo || 'Não Categorizado';

          if (urgencyText.toLowerCase().includes('zeladoria')) {
            IconCmp = Trash2;
            urgencyClass = 'bg-orange-50 dark:bg-orange-900/20 text-orange-600 border-orange-200 dark:border-orange-900/50';
          } else if (urgencyText.toLowerCase().includes('ilumina')) {
            IconCmp = Lightbulb;
            urgencyClass = 'bg-yellow-50 dark:bg-yellow-900/20 text-yellow-600 border-yellow-200 dark:border-yellow-900/50';
          } else if (urgencyText.toLowerCase().includes('infra')) {
            IconCmp = Cone;
            urgencyClass = 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 border-blue-200 dark:border-blue-900/50';
          }

          return (
            <div key={report.id} className="bg-white dark:bg-[#111113] border border-zinc-200 dark:border-zinc-800/80 rounded-[2rem] p-6 shadow-sm hover:shadow-md hover:border-zinc-300 dark:hover:border-zinc-700 transition-all flex flex-col lg:flex-row gap-6 lg:items-center">
              
              {/* Meta Infos */}
              <div className="lg:w-1/4 shrink-0 flex flex-col gap-3 border-b lg:border-b-0 lg:border-r border-zinc-100 dark:border-zinc-800/50 pb-5 lg:pb-0 lg:pr-6">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-black text-zinc-900 dark:text-zinc-200 bg-zinc-100 dark:bg-[#1A1A1E] px-3 py-1.5 rounded-xl border border-zinc-200 dark:border-zinc-800/80">#{shortId}</span>
                  {isSlaCritical && (
                    <span className="text-[10px] font-black text-red-600 uppercase tracking-widest bg-red-50 dark:bg-red-950/20 px-2 py-1.5 rounded-xl border border-red-200 dark:border-red-900/30 flex items-center gap-1 animate-pulse">
                      <Siren className="h-3 w-3" /> SLA
                    </span>
                  )}
                </div>
                
                <div className={`flex items-center gap-1.5 text-[11px] font-bold ${urgencyClass} w-max px-3 py-1.5 rounded-xl border truncate max-w-full`}>
                  <IconCmp className="h-3.5 w-3.5 shrink-0" /> 
                  <span className="truncate">{urgencyText}</span>
                </div>

                <div className="mt-3 grid grid-cols-2 gap-3 text-center">
                  <div className="bg-zinc-900 dark:bg-zinc-800 text-white rounded-xl p-3 shadow-md border border-zinc-700 dark:border-zinc-700 flex flex-col justify-center">
                    <span className="block font-black text-white text-xl leading-none mb-1.5">{diffDays}</span>
                    <span className="text-[9px] font-bold text-zinc-400 uppercase tracking-widest">Dias Ativo</span>
                  </div>
                  <div className="bg-blue-600 dark:bg-blue-900 text-white rounded-xl p-3 shadow-md border border-blue-500 dark:border-blue-700 flex flex-col justify-center">
                    <span className="block font-black text-white text-xl leading-none mb-1.5">{report.apoios_count || 0}</span>
                    <span className="text-[9px] font-bold text-blue-200 uppercase tracking-widest">Apoios</span>
                  </div>
                </div>
              </div>

              {/* Desc */}
              <div className="flex-grow flex flex-col justify-center space-y-4 lg:px-2">
                
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2.5 py-1 bg-zinc-100 dark:bg-zinc-800/50 text-zinc-600 dark:text-zinc-400 text-[10px] font-black uppercase tracking-widest rounded-lg border border-zinc-200 dark:border-zinc-700/50">
                      {report.categoria_nome || 'Serviço Não Especificado'}
                    </span>
                  </div>
                  
                  {/* Speech Bubble */}
                  <div className="relative bg-zinc-50 dark:bg-zinc-950/50 p-4 rounded-2xl rounded-tl-sm border border-zinc-100 dark:border-zinc-800/80 shadow-sm mt-1">
                    <p className="text-sm md:text-base font-medium text-zinc-800 dark:text-zinc-200 leading-relaxed line-clamp-3">
                      {report.descricao || 'O cidadão não forneceu uma descrição detalhada para esta ocorrência.'}
                    </p>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 text-sm font-medium text-zinc-600 dark:text-zinc-400">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-zinc-400 shrink-0" /> 
                    <span className="truncate">{locationText}</span>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <Calendar className="h-4 w-4 text-zinc-400" /> 
                    Aberto em {displayDate}
                  </div>
                </div>
              </div>

              {/* Ações Gestão */}
              <div className="lg:w-48 shrink-0 flex flex-col justify-center gap-3 pt-5 lg:pt-0 border-t lg:border-t-0 border-zinc-100 dark:border-zinc-800/50">
                <button onClick={() => navigate(`/gestao/relato/${report.id}`)} className="w-full bg-zinc-100 hover:bg-zinc-200 dark:bg-[#1A1A1E] dark:hover:bg-[#25252A] text-zinc-700 dark:text-zinc-300 py-3 rounded-2xl text-xs font-bold transition-all flex items-center justify-center gap-2 border border-zinc-200 dark:border-zinc-800/80 shadow-sm active:scale-95">
                  <Eye className="h-4 w-4" /> Ver Detalhes
                </button>
                
                {report.status !== 'resolvido' ? (
                  <button onClick={() => { setSelectedReportId(report.id); setResponseModalOpen(true); }} className={`w-full ${report.status === 'em_analise' || report.status === 'em_execucao' ? 'bg-amber-600 hover:bg-amber-500 shadow-amber-600/20' : 'bg-blue-600 hover:bg-blue-500 shadow-blue-600/20'} text-white py-3.5 rounded-2xl text-sm font-black shadow-md transition-all active:scale-95 flex items-center justify-center gap-2`}>
                    <Edit3 className="h-4 w-4" /> {(report.status === 'em_analise' || report.status === 'em_execucao') ? 'Atualizar Ticket' : 'Atender Chamado'}
                  </button>
                ) : (
                  <div className="w-full py-3.5 rounded-2xl border border-emerald-500/30 bg-emerald-50 dark:bg-emerald-950/20 flex justify-center shadow-sm">
                    <span className="flex items-center gap-2 text-sm font-black text-emerald-600 dark:text-emerald-500">
                      <CheckCircle2 className="h-4 w-4" /> Concluído
                    </span>
                  </div>
                )}
              </div>
              
            </div>
          );
        })
      )}
    </div>
  );
}
