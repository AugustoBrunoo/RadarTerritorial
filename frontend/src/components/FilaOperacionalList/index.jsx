import React from 'react';
import { CheckCircle2, Siren, MapPin, Calendar, Eye, Edit3, Trash2, Cone, Lightbulb, AlertTriangle } from 'lucide-react';

export default function FilaOperacionalList({
  filteredReports,
  todayRef,
  setSelectedReportId,
  setDetailModalOpen,
  setResponseModalOpen
}) {
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
            <div key={report.id} className={`bg-white dark:bg-zinc-900 border ${isSlaCritical ? 'border-red-300 dark:border-red-900/50' : 'border-zinc-200 dark:border-zinc-800'} rounded-[2rem] p-6 shadow-sm hover:shadow-md transition-all relative overflow-hidden group`}>
              {isSlaCritical && <div className="absolute left-0 top-0 bottom-0 w-2 bg-red-500"></div>}
              
              <div className="flex flex-col lg:flex-row gap-6 lg:items-center">
                
                {/* Meta Infos */}
                <div className="lg:w-1/4 shrink-0 flex flex-col gap-3 border-b lg:border-b-0 lg:border-r border-zinc-100 dark:border-zinc-800 pb-4 lg:pb-0 lg:pr-6">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-black text-zinc-900 dark:text-white bg-zinc-100 dark:bg-zinc-800 px-2.5 py-1 rounded-lg border border-zinc-200 dark:border-zinc-700">#{shortId}</span>
                    {isSlaCritical && (
                      <span className="text-[10px] font-black text-red-600 uppercase tracking-wider bg-red-50 dark:bg-red-900/20 px-2 py-1 rounded-lg border border-red-200 dark:border-red-900/50 flex items-center gap-1 animate-pulse">
                        <Siren className="h-3 w-3" /> SLA
                      </span>
                    )}
                  </div>
                  
                  <div className={`flex items-center gap-1.5 text-xs font-bold ${urgencyClass} w-max px-2.5 py-1.5 rounded-xl border`}>
                    <IconCmp className="h-3.5 w-3.5" /> {urgencyText}
                  </div>

                  <div className="mt-auto pt-2 grid grid-cols-2 gap-2 text-center">
                    <div className="bg-zinc-50 dark:bg-zinc-950 rounded-xl p-2 border border-zinc-100 dark:border-zinc-800/80">
                      <span className="block font-black text-zinc-900 dark:text-white text-lg leading-none">{diffDays}</span>
                      <span className="text-[9px] font-bold text-zinc-400 uppercase tracking-wider">Dias Ativo</span>
                    </div>
                    <div className="bg-blue-50 dark:bg-blue-950/20 rounded-xl p-2 border border-blue-100 dark:border-blue-900/30">
                      <span className="block font-black text-blue-600 dark:text-blue-400 text-lg leading-none">{report.apoios_count || 0}</span>
                      <span className="text-[9px] font-bold text-blue-500 uppercase tracking-wider">Apoios</span>
                    </div>
                  </div>
                </div>

                {/* Desc */}
                <div className="flex-grow space-y-3">
                  <h3 className="text-lg font-bold text-zinc-900 dark:text-white leading-snug">
                    "{report.descricao || 'Sem descrição'}"
                  </h3>
                  
                  <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 text-sm font-medium text-zinc-600 dark:text-zinc-400">
                    <div className="flex items-center gap-2"><MapPin className="h-4 w-4 text-zinc-400" /> {locationText}</div>
                    <div className="flex items-center gap-2"><Calendar className="h-4 w-4 text-zinc-400" /> Aberto em {displayDate}</div>
                  </div>
                </div>

                {/* Ações Gestão */}
                <div className="lg:w-48 shrink-0 flex flex-row lg:flex-col justify-end lg:justify-center items-center gap-3 pt-4 lg:pt-0 border-t lg:border-t-0 border-zinc-100 dark:border-zinc-800">
                  
                  <button onClick={() => { setSelectedReportId(report.id); setDetailModalOpen(true); }} className="w-full lg:w-full bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 py-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 border border-zinc-200 dark:border-zinc-700 shadow-sm">
                    <Eye className="h-4 w-4" /> Ver Detalhes
                  </button>
                  
                  {report.status !== 'resolvido' ? (
                    <button onClick={() => { setSelectedReportId(report.id); setResponseModalOpen(true); }} className={`w-full lg:w-full ${report.status === 'em_analise' || report.status === 'em_execucao' ? 'bg-amber-600 hover:bg-amber-700 shadow-amber-600/20' : 'bg-blue-600 hover:bg-blue-700 shadow-blue-600/20'} text-white py-3.5 rounded-xl text-sm font-black shadow-md transition-all transform active:scale-95 flex items-center justify-center gap-2`}>
                      <Edit3 className="h-4 w-4" /> {(report.status === 'em_analise' || report.status === 'em_execucao') ? 'Atualizar Ticket' : 'Atender Chamado'}
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
  );
}
