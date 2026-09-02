import React from 'react';
import { Link } from 'react-router';
import { Building2, BadgeCheck, ThumbsUp, ThumbsDown, Award, Eye, MapPin, Lightbulb, Droplet, ShieldAlert, Bus, Clock, CheckCircle } from 'lucide-react';

const getCategoryIcon = (macroEixo) => {
  const eixoStr = (macroEixo || "").toLowerCase();
  if (eixoStr.includes('infra')) return MapPin;
  if (eixoStr.includes('ilumina')) return Lightbulb;
  if (eixoStr.includes('saneamento') || eixoStr.includes('agua') || eixoStr.includes('esgoto')) return Droplet;
  if (eixoStr.includes('inseguran') || eixoStr.includes('seguran')) return ShieldAlert;
  if (eixoStr.includes('transporte') || eixoStr.includes('mobilidade')) return Bus;
  return MapPin; // default
};

const getStatusProps = (status) => {
  switch (status) {
    case 'resolvido':
      return {
        text: 'Resolvido',
        className: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 border-green-200 dark:border-green-800',
        Icon: CheckCircle,
      };
    case 'rejeitado':
      return {
        text: 'Rejeitado',
        className: 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 border-red-200 dark:border-red-800',
        Icon: ThumbsDown,
      };
    case 'em_execucao':
      return {
        text: 'Em Execução',
        className: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 border-blue-200 dark:border-blue-800',
        Icon: Clock,
      };
    case 'em_analise':
      return {
        text: 'Em Análise',
        className: 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 border-purple-200 dark:border-purple-800',
        Icon: Clock,
      };
    case 'pendente':
    default:
      return {
        text: 'Pendente',
        className: 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-800',
        Icon: Clock,
      };
  }
};

export default function DemandaCard({ report, userInitials }) {
  const CategoryIcon = getCategoryIcon(report.macro_eixo);
  const statusProps = getStatusProps(report.status);
  const StatusIcon = statusProps.Icon;
  
  // Format dates
  const createdDate = new Date(report.created_at);
  const dateStr = createdDate.toLocaleDateString('pt-BR');
  const timeStr = createdDate.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
  
  let responseDateStr = "";
  if (report.fechado_em) {
    responseDateStr = new Date(report.fechado_em).toLocaleDateString('pt-BR');
  }

  // Location string
  let locationParts = [report.rua, report.bairro, report.cep ? `CEP: ${report.cep}` : null].filter(Boolean);
  let locationStr = locationParts.join(', ') || 'Localização não informada';
  if (report.referencia) {
    locationStr += ` • Ref: ${report.referencia}`;
  }

  return (
    <div className="bg-white dark:bg-[#121214] border border-zinc-200 dark:border-zinc-800 rounded-3xl p-5 sm:p-7 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.05)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:hover:shadow-[0_8px_30px_rgba(255,255,255,0.02)] transition-all duration-300 animate-in zoom-in-95 group overflow-hidden relative">
      {/* Decorative gradient corner */}
      <div className="absolute -top-16 -right-16 w-32 h-32 bg-zinc-100 dark:bg-zinc-800/50 rounded-full blur-3xl opacity-50 pointer-events-none group-hover:bg-blue-100 dark:group-hover:bg-blue-900/20 transition-colors duration-500"></div>

      <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-5 relative z-10">
        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className={`px-2.5 py-1 rounded-full border text-[10px] font-bold uppercase tracking-wider ${statusProps.className} flex items-center gap-1.5 shadow-sm`}>
              <StatusIcon className="h-3.5 w-3.5" /> {statusProps.text}
            </span>
            {report.protocolo_oficial && (
              <span className="text-[10px] font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-widest bg-zinc-100 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700 px-2.5 py-1 rounded-full shadow-sm">
                PROTOCOLO: {report.protocolo_oficial}
              </span>
            )}
            {report.resposta_orgao && report.status !== 'resolvido' && report.status !== 'rejeitado' && (
              <span className="text-[10px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 px-2.5 py-1 rounded-full flex items-center gap-1 shadow-sm">
                <CheckCircle className="h-3 w-3" /> Respondido
              </span>
            )}
          </div>
          <h4 className="font-extrabold text-lg sm:text-xl text-zinc-900 dark:text-white flex items-start gap-2 leading-tight">
            <MapPin className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" /> 
            <span className="line-clamp-2">{locationStr}</span>
          </h4>
          <div className="flex items-center gap-2 mt-2">
            <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-zinc-100 dark:bg-zinc-800 text-xs text-zinc-600 dark:text-zinc-300 font-semibold border border-zinc-200 dark:border-zinc-700">
              <CategoryIcon className="h-3.5 w-3.5" /> {report.categoria_nome || report.macro_eixo}
            </div>
          </div>
        </div>
        
        <div className="text-left sm:text-right flex flex-row sm:flex-col items-center sm:items-end gap-2 sm:gap-1 flex-shrink-0 w-full sm:w-auto bg-zinc-50 sm:bg-transparent dark:bg-zinc-800/30 sm:dark:bg-transparent p-2 sm:p-0 rounded-lg sm:rounded-none">
          <Clock className="h-3.5 w-3.5 text-zinc-400 sm:hidden" />
          <span className="text-[11px] font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">{timeStr}</span>
          <span className="text-[11px] font-bold text-zinc-500 dark:text-zinc-400">•</span>
          <span className="text-[11px] font-bold text-zinc-500 dark:text-zinc-400">{dateStr}</span>
        </div>
      </div>

      <div className={`pl-4 border-l-2 border-zinc-200 dark:border-zinc-700 text-sm sm:text-base leading-relaxed font-medium mb-6 ${report.descricao ? 'text-zinc-700 dark:text-zinc-300' : 'text-zinc-400 dark:text-zinc-500 italic'}`}>
        {report.descricao || "Sem detalhes adicionais fornecidos pelo usuário."}
      </div>

      {report.resposta_orgao && (
        <div className="mb-6 bg-gradient-to-br from-zinc-50 to-white dark:from-zinc-900/50 dark:to-[#18181b] rounded-2xl p-5 border border-zinc-200 dark:border-zinc-800 relative overflow-hidden shadow-sm">
          <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-blue-500 dark:bg-blue-600"></div>
          
          <div className="flex items-center justify-between mb-3 pl-2">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white dark:bg-zinc-800 flex items-center justify-center overflow-hidden border border-zinc-200 dark:border-zinc-700 shadow-sm flex-shrink-0 relative">
                <Building2 className="h-5 w-5 text-zinc-400 dark:text-zinc-500" />
              </div>
              <div>
                <h5 className="text-sm font-black text-zinc-900 dark:text-white flex items-center gap-1.5">
                  Resposta do Órgão Responsável
                  <BadgeCheck className="h-4 w-4 text-blue-500" title="Órgão Verificado" />
                </h5>
                {responseDateStr && (
                  <p className="text-[11px] font-bold text-zinc-500 dark:text-zinc-400">Em {responseDateStr}</p>
                )}
              </div>
            </div>
          </div>
          
          <p className="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed pl-2 mb-4 font-medium">
            {report.resposta_orgao}
          </p>

          {report.status === 'resolvido' && (
            <div className="pt-4 border-t border-zinc-200 dark:border-zinc-800 pl-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-zinc-50/50 dark:bg-zinc-900/50 -mx-5 -mb-5 px-5 pb-5 mt-2 rounded-b-2xl">
              <span className="text-xs font-black text-zinc-600 dark:text-zinc-400 uppercase tracking-wide pt-1">Essa solução foi boa para você?</span>
              <div className="flex items-center gap-2">
                <button className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-5 py-2 rounded-xl text-xs font-bold bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 hover:bg-green-50 hover:text-green-700 hover:border-green-300 dark:hover:bg-green-900/30 dark:hover:text-green-400 transition-all shadow-sm active:scale-95">
                  <ThumbsUp className="h-4 w-4" /> Sim
                </button>
                <button className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-5 py-2 rounded-xl text-xs font-bold bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 hover:bg-red-50 hover:text-red-700 hover:border-red-300 dark:hover:bg-red-900/30 dark:hover:text-red-400 transition-all shadow-sm active:scale-95">
                  <ThumbsDown className="h-4 w-4" /> Não
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      <div className="flex flex-col sm:flex-row sm:items-center justify-between pt-4 border-t border-zinc-100 dark:border-zinc-800/80 gap-4 relative z-10">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 flex items-center justify-center font-black text-xs text-zinc-700 dark:text-zinc-300 shadow-sm">
            {userInitials || 'VC'}
          </div>
          <span className="text-xs font-bold text-zinc-600 dark:text-zinc-400">Enviado por você</span>
        </div>
        
        <div className="flex items-center justify-between sm:justify-end gap-4 w-full sm:w-auto">
          <div className="flex items-center gap-1.5 text-xs font-bold text-zinc-500 dark:text-zinc-400">
            <Award className="h-4 w-4 text-red-600" /> {report.apoios_count || 0} <span className="hidden sm:inline">Apoios</span>
          </div>
          
          <Link to={`/relato/${report.id}`} className="flex items-center gap-2 py-2 px-5 rounded-full text-xs font-bold bg-zinc-900 hover:bg-zinc-800 dark:bg-white dark:hover:bg-zinc-100 text-white dark:text-zinc-900 transition-all shadow-sm active:scale-95">
            <Eye className="h-3.5 w-3.5" /> Ver relato detalhado
          </Link>
        </div>
      </div>
    </div>
  );
}
