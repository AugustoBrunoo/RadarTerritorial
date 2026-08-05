import React, { useState } from 'react';
import { Link } from 'react-router';
import { 
  MapPin, Flag, Clock, MessageSquare, Award, CheckCircle, 
  ArrowUp, Building2, BadgeCheck, ThumbsUp, ThumbsDown, Send,
  Cone, AlertCircle, AlertTriangle, Lightbulb, Droplet, Bus, ShieldAlert, History, Info
} from 'lucide-react';
import AutoSupportModal from '../AutoSupportModal';
import ReportModal from '../ReportModal';

const iconMap = {
  Cone, AlertCircle, AlertTriangle, Lightbulb, Droplet, Bus, ShieldAlert, History, Info, CheckCircle
};

export default function FeedCard({ report, onSupport, currentUserId }) {
  const [showComments, setShowComments] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);

  const handleSupportClick = () => {
    if (currentUserId && currentUserId === report.user_id) {
      setShowModal(true);
    } else {
      onSupport(report.id);
    }
  };

  const supportedClass = report.userHasVoted
    ? "bg-green-600 text-white border-green-600 hover:bg-green-700"
    : "bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-200 border-transparent";

  const SupportIcon = report.userHasVoted ? CheckCircle : ArrowUp;
  const supportText = report.userHasVoted ? "Apoiado!" : "Apoiar";

  // Lógica de prazo (+7 dias)
  const parts = report.date.split('/');
  const reportDate = new Date(parts[2], parts[1] - 1, parts[0]);
  const today = new Date();
  const diffTime = Math.abs(today - reportDate);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  const isOverdue = report.status !== 'resolved' && diffDays > 7;

  const CategoryIcon = iconMap[report.categoryIcon] || Info;
  const UrgencyIcon = iconMap[report.urgencyIcon] || Info;
  const StatusIcon = iconMap[report.statusIcon] || Info;

  return (
    <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-[2rem] p-6 shadow-sm hover:shadow-md transition-all duration-300 animate-in zoom-in-95">
      {/* Cabeçalho do Card */}
      <div className="flex items-center gap-3 mb-5">
        <div className={`w-12 h-12 rounded-full ${report.avatarBg} flex items-center justify-center font-black text-sm flex-shrink-0`}>
          <span>{report.initials}</span>
        </div>
        <div className="flex-1">
          <h4 className="font-bold text-zinc-900 dark:text-white leading-tight text-base">{report.author}</h4>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5 flex items-center gap-1 font-semibold">
            <MapPin className="h-3 w-3" /> 
            <span className="truncate max-w-[180px] sm:max-w-md" title={report.location}>{report.location}</span>
          </p>
        </div>
        
        {/* Botão Denunciar e Data/Hora */}
        <div className="flex items-start gap-3">
          <div className="text-right flex flex-col items-end gap-1">
            <span className="text-[10px] font-black text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">{report.time}</span>
            <span className="text-[9px] font-bold text-zinc-400 dark:text-zinc-500">{report.date}</span>
          </div>
          <button 
            onClick={() => setShowReportModal(true)}
            className="text-zinc-400 hover:text-red-500 transition-colors p-1.5 rounded-lg bg-zinc-50 dark:bg-zinc-950 hover:bg-red-50 dark:hover:bg-red-900/20 border border-transparent hover:border-red-200 dark:hover:border-red-900/30" 
            title="Denunciar publicação"
          >
            <Flag className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {/* Categorias e Gravidade (Tags Bento) */}
      <div className="flex flex-wrap gap-2 mb-4">
        {report.status === 'resolved' ? (
          <div className={`flex items-center gap-1 px-3 py-1.5 rounded-xl border text-[11px] font-extrabold ${report.statusClass}`}>
            <StatusIcon className="h-3 w-3" />
            <span>{report.statusText}</span>
          </div>
        ) : isOverdue ? (
          <div className="flex items-center gap-1 px-3 py-1.5 rounded-xl border text-[11px] font-extrabold bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-800">
            <Clock className="h-3 w-3" />
            <span>Não Resolvido (+7 dias)</span>
          </div>
        ) : null}

        <div className="flex items-center gap-1 px-3 py-1.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950/50 text-[11px] font-extrabold text-zinc-700 dark:text-zinc-300">
          <CategoryIcon className="h-3 w-3 text-red-600" />
          <span>{report.categoryText}</span>
        </div>
        <div className={`flex items-center gap-1 px-3 py-1.5 rounded-xl border text-[11px] font-extrabold ${report.urgencyClass}`}>
          <UrgencyIcon className="h-3 w-3" />
          <span>{report.urgencyText}</span>
        </div>
      </div>

      {/* Descrição do Problema */}
      <div className="mb-5 pl-2 border-l-2 border-zinc-200 dark:border-zinc-800 ml-1">
        <p className={`text-sm sm:text-base leading-relaxed font-medium ${(!report.description || report.description.trim() === '' || report.description.trim() === '""') ? 'text-zinc-500 dark:text-zinc-400 italic' : 'text-zinc-700 dark:text-zinc-300'}`}>
          {(!report.description || report.description.trim() === '' || report.description.trim() === '""') 
            ? 'Sem detalhes adicionais fornecidos pelo usuário.' 
            : report.description}
        </p>
      </div>
      
      {/* Resposta do Órgão */}
      {report.status === 'resolved' && report.organName && (
        <div className="mt-5 bg-zinc-50 dark:bg-zinc-950/60 rounded-2xl p-4 sm:p-5 border border-zinc-100 dark:border-zinc-800 relative overflow-hidden shadow-inner mb-5">
          <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-green-500"></div>
          
          <div className="flex items-center justify-between mb-3 pl-2">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white dark:bg-zinc-800 flex items-center justify-center overflow-hidden border border-zinc-200 dark:border-zinc-700 shadow-sm flex-shrink-0 relative">
                <Building2 className="h-5 w-5 text-zinc-400" />
              </div>
              <div>
                <h5 className="text-sm font-black text-zinc-900 dark:text-white flex items-center gap-1.5">
                  {report.organName}
                  <BadgeCheck className="h-4 w-4 text-blue-500" title="Órgão Verificado" />
                </h5>
                <p className="text-[11px] font-bold text-zinc-500 dark:text-zinc-400">Respondido em {report.responseDate}</p>
              </div>
            </div>
          </div>
          
          <p className="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed pl-2 mb-5 font-medium italic">
            "{report.responseText}"
          </p>

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
        </div>
      )}

      {/* Ações do Card */}
      <div className="flex items-center justify-between pt-4 border-t border-zinc-150 dark:border-zinc-800/60">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-red-50 dark:bg-red-950/20 border border-red-100 dark:border-red-900/30 flex items-center justify-center text-red-600 dark:text-red-400">
            <Award className="h-4 w-4" />
          </div>
          <div className="text-xs">
            <span className="font-black text-zinc-900 dark:text-white">{report.votes}</span>
            <span className="block text-[9px] font-bold text-zinc-400 uppercase tracking-wide">Apoios</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button 
            onClick={() => setShowComments(!showComments)}
            className="flex items-center gap-1.5 py-2.5 px-4 rounded-xl text-xs font-black tracking-wide bg-zinc-50 hover:bg-zinc-100 dark:bg-zinc-900 dark:hover:bg-zinc-800 border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 transition-all"
          >
            <MessageSquare className="h-4 w-4" />
            <span>{report.comentarios_count}</span>
          </button>

          <Link 
            to={`/relato/${report.id}`}
            className="flex items-center gap-1.5 py-2.5 px-4 rounded-xl text-xs font-black tracking-wide bg-zinc-50 hover:bg-zinc-100 dark:bg-zinc-900 dark:hover:bg-zinc-800 border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 transition-all"
          >
            <span>Ver Detalhes</span>
          </Link>
          
          <button 
            onClick={handleSupportClick}
            className={`flex items-center gap-1.5 py-2.5 px-4 rounded-xl text-xs font-black tracking-wide border transition-all ${supportedClass}`}
          >
            <SupportIcon className="h-4 w-4" />
            <span className="hidden sm:inline">{supportText}</span>
          </button>
        </div>
      </div>

      {/* Sessão de Comentários */}
      {showComments && (
        <div className="flex flex-col gap-4 mt-5 pt-5 border-t border-zinc-100 dark:border-zinc-800/50 animate-in slide-in-from-top-2">
          <h5 className="text-xs font-black uppercase tracking-widest text-zinc-400">Comentários Locais</h5>
          
          <div className="space-y-3 max-h-56 overflow-y-auto custom-scroll pr-1">
            {report.comments.length > 0 ? (
              report.comments.map((c, i) => (
                <div key={i} className="bg-zinc-50/50 hover:bg-zinc-50 dark:bg-zinc-950/30 dark:hover:bg-zinc-950/50 p-3.5 rounded-2xl transition-colors">
                  <div className="flex justify-between items-center mb-1.5">
                    <span className="text-xs font-bold text-zinc-900 dark:text-white">{c.author}</span>
                    <span className="text-[10px] font-semibold text-zinc-400">{c.time}</span>
                  </div>
                  <p className="text-[13px] text-zinc-600 dark:text-zinc-300 leading-relaxed">{c.text}</p>
                </div>
              ))
            ) : (
              <p className="text-xs text-zinc-400 italic text-center py-4 bg-zinc-50/50 dark:bg-zinc-950/30 rounded-2xl">
                Nenhum comentário ainda. Seja o primeiro a opinar!
              </p>
            )}
          </div>
          
          <div className="relative mt-2">
            <input 
              type="text" 
              placeholder="Escreva seu comentário..." 
              className="w-full bg-zinc-50 dark:bg-zinc-950 border-transparent rounded-xl pl-4 pr-12 py-3 text-sm text-zinc-900 dark:text-white focus:ring-2 focus:ring-zinc-200 dark:focus:ring-zinc-800 focus:bg-white dark:focus:bg-zinc-900 outline-none transition-all placeholder-zinc-400 font-medium"
            />
            <button className="absolute right-2 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 p-2 rounded-lg transition-colors">
              <Send className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      <AutoSupportModal isOpen={showModal} onClose={() => setShowModal(false)} />
      <ReportModal isOpen={showReportModal} onClose={() => setShowReportModal(false)} reportId={report.id} />
    </div>
  );
}
