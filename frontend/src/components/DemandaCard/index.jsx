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
    <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-[2rem] p-6 shadow-sm hover:shadow-md transition-shadow animate-in zoom-in-95">
      <div className="flex justify-between items-start gap-4 mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2 flex-wrap">
            <span className={`px-2.5 py-1 rounded-lg border text-[10px] font-black uppercase tracking-widest ${statusProps.className} flex items-center gap-1.5`}>
              <StatusIcon className="h-3 w-3" /> {statusProps.text}
            </span>
            {report.protocolo_oficial && (
              <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest bg-zinc-100 dark:bg-zinc-800 px-2 py-1 rounded-lg">
                {report.protocolo_oficial}
              </span>
            )}
          </div>
          <h4 className="font-bold text-zinc-900 dark:text-white flex items-center gap-1.5 text-sm sm:text-base">
            <MapPin className="h-4 w-4 text-red-600 flex-shrink-0" /> <span className="line-clamp-2">{locationStr}</span>
          </h4>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 flex items-center gap-1 font-semibold">
            <CategoryIcon className="h-3 w-3" /> {report.categoria_nome || report.macro_eixo}
          </p>
        </div>
        
        <div className="ml-auto text-right flex flex-col items-end gap-1 flex-shrink-0">
          <span className="text-[10px] font-black text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">{timeStr}</span>
          <span className="text-[9px] font-bold text-zinc-400 dark:text-zinc-500">{dateStr}</span>
        </div>
      </div>

      <div className={`pl-3 border-l-2 border-zinc-200 dark:border-zinc-800 text-sm leading-relaxed font-medium ${report.descricao ? 'text-zinc-700 dark:text-zinc-300' : 'text-zinc-400 dark:text-zinc-500 italic'}`}>
        {report.descricao || "Sem detalhes adicionais fornecidos pelo usuário."}
      </div>

      {report.resposta_orgao && (
        <div className="mt-5 bg-zinc-50 dark:bg-zinc-950/60 rounded-2xl p-4 sm:p-5 border border-zinc-100 dark:border-zinc-800 relative overflow-hidden shadow-inner">
          <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-green-500"></div>
          
          <div className="flex items-center justify-between mb-3 pl-2">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white dark:bg-zinc-800 flex items-center justify-center overflow-hidden border border-zinc-200 dark:border-zinc-700 shadow-sm flex-shrink-0 relative">
                <Building2 className="h-5 w-5 text-zinc-400" />
              </div>
              <div>
                <h5 className="text-sm font-black text-zinc-900 dark:text-white flex items-center gap-1.5">
                  Órgão Responsável
                  <BadgeCheck className="h-4 w-4 text-blue-500" title="Órgão Verificado" />
                </h5>
                {responseDateStr && (
                  <p className="text-[11px] font-bold text-zinc-500 dark:text-zinc-400">Respondido em {responseDateStr}</p>
                )}
              </div>
            </div>
          </div>
          
          <p className="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed pl-2 mb-5 font-medium italic">
            "{report.resposta_orgao}"
          </p>

          {report.status === 'resolvido' && (
            <div className="pt-4 border-t border-zinc-200 dark:border-zinc-800/80 pl-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <span className="text-xs font-black text-zinc-600 dark:text-zinc-400 uppercase tracking-wide">Essa solução foi boa para você?</span>
              <div className="flex items-center gap-2">
                <button className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 hover:bg-green-50 hover:text-green-700 hover:border-green-300 dark:hover:bg-green-900/20 dark:hover:text-green-400 transition-all shadow-sm active:scale-95">
                  <ThumbsUp className="h-4 w-4" /> Sim
                </button>
                <button className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 hover:bg-red-50 hover:text-red-700 hover:border-red-300 dark:hover:bg-red-900/20 dark:hover:text-red-400 transition-all shadow-sm active:scale-95">
                  <ThumbsDown className="h-4 w-4" /> Não
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      <div className="flex flex-col sm:flex-row sm:items-center justify-between pt-5 mt-5 border-t border-zinc-150 dark:border-zinc-800/60 gap-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center font-black text-xs text-zinc-600 dark:text-zinc-300">
            {userInitials || 'VC'}
          </div>
          <span className="text-xs font-bold text-zinc-600 dark:text-zinc-400">Enviado por você</span>
        </div>
        
        <div className="flex items-center justify-between sm:justify-end gap-3 w-full sm:w-auto">
          <div className="flex items-center gap-1.5 text-xs font-bold text-zinc-500 dark:text-zinc-400">
            <Award className="h-4 w-4 text-red-600" /> {report.apoios_count || 0} <span className="hidden sm:inline">Apoios</span>
          </div>
          
          <Link to={`/relato/${report.id}`} className="flex items-center gap-1.5 py-2 px-4 rounded-xl text-xs font-black tracking-wide bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-200 transition-all border border-transparent">
            <Eye className="h-4 w-4" /> Ver relato
          </Link>
        </div>
      </div>
    </div>
  );
}
