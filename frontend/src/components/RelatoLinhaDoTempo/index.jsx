import React from 'react';
import { GitCommit, Building2, CheckCircle2, MessageSquare, Clock, ShieldCheck } from 'lucide-react';

const formatDateTime = (timestamp) => {
  if (!timestamp) return null;
  const date = new Date(timestamp);
  if (isNaN(date.getTime())) return null;
  const d = date.toLocaleDateString('pt-BR');
  const t = date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
  return `${d} às ${t}`;
};

const getStatusBadge = (status) => {
  switch (status) {
    case 'resolvido':
      return {
        label: 'Resolvido',
        className: 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-900/40'
      };
    case 'em_execucao':
      return {
        label: 'Em Execução',
        className: 'bg-orange-50 dark:bg-orange-950/40 text-orange-600 dark:text-orange-400 border-orange-200 dark:border-orange-900/40'
      };
    case 'em_analise':
      return {
        label: 'Em Análise',
        className: 'bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-900/40'
      };
    case 'rejeitado':
      return {
        label: 'Rejeitado',
        className: 'bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 border-rose-200 dark:border-rose-900/40'
      };
    default:
      return {
        label: 'Pendente',
        className: 'bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 border-amber-200 dark:border-amber-900/40'
      };
  }
};

export default function RelatoLinhaDoTempo({ report, dateStr, orgao }) {
  const isPendente = report.status === 'pendente';
  const isResolvido = report.status === 'resolvido';
  const hasResposta = !!report.resposta_orgao;

  const nomeOrgao = orgao?.nome || orgao?.nome_orgao || orgao?.sigla || null;
  const siglaOrgao = orgao?.sigla || null;

  const etapa2State = (hasResposta || isResolvido) ? 'completed' : (orgao || !isPendente) ? 'active' : 'pending';
  const etapa3State = isResolvido ? 'completed' : hasResposta ? 'active' : 'pending';

  const statusBadge = getStatusBadge(report.status);
  const rawTimestamp = report.data_resposta || report.updated_at || (hasResposta ? new Date().toISOString() : null);
  const formattedResponseTime = formatDateTime(rawTimestamp);

  return (
    <section className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 sm:p-8 mt-8 shadow-sm">
      <div className="flex items-center justify-between mb-8 pb-4 border-b border-zinc-100 dark:border-zinc-800/80">
        <div>
          <h2 className="text-xl font-black flex items-center gap-2.5 text-zinc-900 dark:text-white">
            <GitCommit className="h-5 w-5 text-blue-600 dark:text-blue-500" /> Trajeto & Linha do Tempo
          </h2>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
            Acompanhe o percurso deste relato desde o registro do cidadão até a atuação do poder público.
          </p>
        </div>
      </div>

      <div className="relative pl-6 sm:pl-8 space-y-8">
        
        {/* Etapa 1: Registro na Plataforma */}
        <div className="relative">
          {/* Linha conectora vertical até a Etapa 2 */}
          <div className="absolute -left-[24px] sm:-left-[32px] top-3 -bottom-[46px] w-0.5 bg-zinc-200 dark:bg-zinc-800" />

          <div className="absolute -left-[35px] sm:-left-[43px] top-0.5 h-6 w-6 rounded-full bg-emerald-500 border-4 border-white dark:border-zinc-900 flex items-center justify-center shadow-md shadow-emerald-500/20 text-white z-10">
            <CheckCircle2 className="h-3 w-3" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-bold text-zinc-900 dark:text-white">Registro na Plataforma</h3>
              <span className="text-[10px] font-black uppercase tracking-wider bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 px-2 py-0.5 rounded-md border border-emerald-200 dark:border-emerald-900/40">
                Concluído
              </span>
            </div>
            <p className="text-zinc-600 dark:text-zinc-400 text-sm mt-1">
              O relato foi submetido pelo cidadão, geolocalizado e publicado no feed comunitário.
            </p>
            <span className="text-xs font-semibold text-zinc-400 dark:text-zinc-500 mt-2 inline-flex items-center gap-1.5">
              <Clock className="h-3 w-3" /> Registrado em {dateStr}
            </span>
          </div>
        </div>

        {/* Etapa 2: Encaminhado ao Órgão Responsável */}
        <div className="relative">
          {/* Linha conectora vertical até a Etapa 3 */}
          <div className="absolute -left-[24px] sm:-left-[32px] top-3 -bottom-[46px] w-0.5 bg-zinc-200 dark:bg-zinc-800" />

          <div className={`absolute -left-[35px] sm:-left-[43px] top-0.5 h-6 w-6 rounded-full border-4 border-white dark:border-zinc-900 flex items-center justify-center z-10 ${
            etapa2State === 'completed'
              ? 'bg-emerald-500 shadow-md shadow-emerald-500/30 text-white'
              : etapa2State === 'active'
              ? 'bg-blue-600 shadow-md shadow-blue-500/30 text-white'
              : 'bg-zinc-200 dark:bg-zinc-800 text-zinc-400'
          }`}>
            {etapa2State === 'completed' ? <CheckCircle2 className="h-3 w-3" /> : (orgao || !isPendente) ? <Building2 className="h-3 w-3" /> : <Clock className="h-3 w-3" />}
          </div>

          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h3 className={`text-base font-bold ${
                etapa2State === 'completed' ? 'text-zinc-900 dark:text-white' 
                : etapa2State === 'active' ? 'text-blue-600 dark:text-blue-400'
                : 'text-zinc-700 dark:text-zinc-300'
              }`}>
                Encaminhamento & Órgão Responsável
              </h3>
              {etapa2State === 'completed' ? (
                <span className="text-[10px] font-black uppercase tracking-wider bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 px-2 py-0.5 rounded-md border border-emerald-200 dark:border-emerald-900/40 flex items-center gap-1">
                  <ShieldCheck className="h-3 w-3" /> Atribuído Oficialmente
                </span>
              ) : etapa2State === 'active' ? (
                <span className="text-[10px] font-black uppercase tracking-wider bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 px-2 py-0.5 rounded-md border border-blue-200 dark:border-blue-900/40 flex items-center gap-1">
                  <ShieldCheck className="h-3 w-3" /> Atribuído Oficialmente
                </span>
              ) : (
                <span className="text-[10px] font-bold uppercase tracking-wider bg-zinc-100 dark:bg-zinc-800 text-zinc-500 px-2 py-0.5 rounded-md">
                  Em Triagem
                </span>
              )}
            </div>

            {/* Bloco Detalhado do Órgão Atribuído */}
            {orgao ? (
              <div className="mt-3.5 bg-zinc-50 dark:bg-zinc-950/60 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-4 sm:p-5">
                <div className="flex items-start gap-3.5">
                  <div className={`p-2.5 rounded-xl shrink-0 ${
                    etapa2State === 'completed'
                      ? 'bg-emerald-100/80 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400'
                      : 'bg-blue-100/80 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400'
                  }`}>
                    <Building2 className="h-5 w-5" />
                  </div>
                  <div className="flex-grow">
                    <div className="flex flex-wrap items-center gap-2">
                      <h4 className="text-sm font-black text-zinc-900 dark:text-white">
                        {nomeOrgao}
                      </h4>
                      {siglaOrgao && siglaOrgao !== nomeOrgao && (
                        <span className="text-[11px] font-bold text-zinc-500 bg-zinc-200/60 dark:bg-zinc-800 px-2 py-0.5 rounded">
                          {siglaOrgao}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 leading-relaxed">
                      {orgao.descricao || "Este órgão público é a autoridade competente para fiscalizar, planejar e executar a resolução deste chamado."}
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-zinc-500 dark:text-zinc-400 text-sm mt-1 leading-relaxed">
                O chamado está na fila do Radar Territorial aguardando triagem automática ou direcionamento manual para o órgão competente.
              </p>
            )}
          </div>
        </div>

        {/* Etapa 3: Resolução e Validação */}
        <div className={`relative ${etapa3State === 'pending' ? 'opacity-60' : ''}`}>
          <div className={`absolute -left-[35px] sm:-left-[43px] top-0.5 h-6 w-6 rounded-full border-4 border-white dark:border-zinc-900 flex items-center justify-center z-10 ${
            etapa3State === 'completed' || etapa3State === 'active'
              ? 'bg-emerald-500 shadow-md shadow-emerald-500/30 text-white'
              : 'bg-zinc-200 dark:bg-zinc-800 text-zinc-400'
          }`}>
            {etapa3State === 'completed' || etapa3State === 'active' ? (
              <CheckCircle2 className="h-3 w-3" />
            ) : (
              <div className="h-1.5 w-1.5 rounded-full bg-zinc-400"></div>
            )}
          </div>

          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h3 className={`text-base font-bold ${
                etapa3State === 'completed' || etapa3State === 'active'
                  ? 'text-zinc-900 dark:text-white'
                  : 'text-zinc-700 dark:text-zinc-300'
              }`}>
                Resolução & Resposta Oficial
              </h3>
              {hasResposta && (
                <span className={`text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md border flex items-center gap-1 ${statusBadge.className}`}>
                  <ShieldCheck className="h-3 w-3" /> Status: {statusBadge.label}
                </span>
              )}
            </div>
            
            {hasResposta ? (
              <div className="mt-3.5 bg-zinc-50 dark:bg-zinc-950/60 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-4 sm:p-5">
                <div className="flex items-start gap-3.5">
                  <div className="bg-emerald-100/80 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400 p-2.5 rounded-xl shrink-0">
                    <MessageSquare className="h-5 w-5" />
                  </div>
                  <div className="flex-grow min-w-0">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex flex-wrap items-center gap-2">
                        <h4 className="text-sm font-black text-zinc-900 dark:text-white">
                          {nomeOrgao || "Órgão Responsável"}
                        </h4>
                        {siglaOrgao && siglaOrgao !== nomeOrgao && (
                          <span className="text-[11px] font-bold text-zinc-500 bg-zinc-200/60 dark:bg-zinc-800 px-2 py-0.5 rounded">
                            {siglaOrgao}
                          </span>
                        )}
                      </div>

                      {formattedResponseTime && (
                        <span className="text-xs font-semibold text-zinc-400 dark:text-zinc-500 inline-flex items-center gap-1.5">
                          <Clock className="h-3 w-3" /> Respondido em {formattedResponseTime}
                        </span>
                      )}
                    </div>

                    <div className="mt-3.5 pt-3.5 border-t border-zinc-200/70 dark:border-zinc-800/80">
                      <p className="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed font-medium">
                        {report.resposta_orgao}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-zinc-500 text-sm mt-1 leading-relaxed">
                Após a conclusão das obras ou reparos pelo órgão, a resposta oficial e o status serão exibidos aqui.
              </p>
            )}
          </div>
        </div>

      </div>
    </section>
  );
}

