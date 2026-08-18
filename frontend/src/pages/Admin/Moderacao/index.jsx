import React, { useState, useEffect } from 'react';
import { 
  Search, AlertTriangle, MessageSquareOff, ShoppingBag, Users, 
  MessageSquare, Maximize2, CheckCircle2, Trash2, ShieldCheck, 
  FileText, User, X, ArrowUp, Bot, ShieldAlert, 
  Filter, Check, HelpCircle
} from 'lucide-react';
import AdminPagination from '../../../components/AdminPagination';

export default function AdminModeracao() {
  const [selectedReport, setSelectedReport] = useState(null);
  const [isAutoModalOpen, setIsAutoModalOpen] = useState(false);
  
  // Notificação Toast
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  
  // Configurações de Moderação Automática
  const [autoModerationEnabled, setAutoModerationEnabled] = useState(true);
  const [autoModerationThreshold, setAutoModerationThreshold] = useState(10);

  // Estados dos Filtros
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedBairro, setSelectedBairro] = useState('');
  const [sortOrder, setSortOrder] = useState('recentes');

  // Estado de Paginação
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  const triggerToast = (msg = 'Alterações realizadas com sucesso!') => {
    setToastMessage(msg);
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  };

  const handleSaveAutoModeration = () => {
    setIsAutoModalOpen(false);
    triggerToast('Alterações realizadas com sucesso!');
  };

  const [denuncias, setDenuncias] = useState([
    {
      id: 'denuncia-1',
      category: 'falso',
      type: 'Falso / Fake News',
      typeIcon: AlertTriangle,
      colorClass: 'text-red-700 dark:text-red-400 bg-red-100 dark:bg-red-950/50 border-red-200 dark:border-red-900/30 border-l-red-400 dark:border-l-red-600',
      count: 3,
      supportsCount: 15,
      commentsCount: 2,
      authorInitials: 'MT',
      author: 'Marcos Teixeira',
      bairro: 'campo-grande',
      locationInfo: 'Em Campo Grande, há 2 dias',
      timestamp: 1723800000000,
      title: 'Barricada na Estrada do Campinho',
      description: 'Tem uma barricada gigante na Estrada do Campinho, fecharam tudo e a polícia não faz nada! Absurdo total!',
      img: null,
      comments: [
        { author: 'João D.', text: 'Passei lá agora pouco e está tudo normal, trânsito fluindo. É mentira.' },
        { author: 'Ana P.', text: 'Notícia falsa para causar pânico.' }
      ]
    },
    {
      id: 'denuncia-2',
      category: 'ofensivo',
      type: 'Ofensivo / Ódio',
      typeIcon: MessageSquareOff,
      colorClass: 'text-amber-700 dark:text-amber-500 bg-amber-100 dark:bg-amber-950/30 border-amber-200 dark:border-amber-900/30 border-l-amber-400 dark:border-l-amber-600',
      count: 1,
      supportsCount: 7,
      commentsCount: 1,
      authorInitials: 'CP',
      author: 'Carlos Pedro',
      bairro: 'inhoaiba',
      locationInfo: 'Em Inhoaíba, há 5 horas',
      timestamp: 1723900000000,
      title: 'Acúmulo de Lixo - Vizinho',
      description: 'O vizinho do 42 é um idiota que joga lixo na rua todo dia, vagabundo não quer trabalhar e suja a rua, tinha que apanhar na cara pra aprender. Se eu pegar na rua ele vai ver só.',
      img: null,
      comments: [
        { author: 'Anônimo', text: 'Linguagem agressiva e ameaça direta a outro morador.' }
      ]
    },
    {
      id: 'denuncia-3',
      category: 'spam',
      type: 'Spam / Comercial',
      typeIcon: ShoppingBag,
      colorClass: 'text-blue-700 dark:text-blue-500 bg-blue-100 dark:bg-blue-950/30 border-blue-200 dark:border-blue-900/30 border-l-blue-400 dark:border-l-blue-600',
      count: 2,
      supportsCount: 11,
      commentsCount: 1,
      authorInitials: 'LV',
      author: 'Loja da Val',
      bairro: 'cosmos',
      locationInfo: 'Em Cosmos, ontem',
      timestamp: 1723850000000,
      title: 'Promoção de Roupas de Frio!',
      description: 'Aproveite a promoção de inverno da nossa loja na Rua Guarujá! Casacos a partir de R$49,90. Venha conferir, não perca essa oportunidade!! Tudo em até 3x sem juros.',
      img: 'https://placehold.co/800x400/18181b/52525b?text=Foto+da+Loja',
      comments: [
        { author: 'Luiza', text: 'Usando o aplicativo para fazer propaganda comercial, poluindo o feed de problemas.' }
      ]
    },
    {
      id: 'denuncia-4',
      category: 'falso',
      type: 'Falso / Fake News',
      typeIcon: AlertTriangle,
      colorClass: 'text-red-700 dark:text-red-400 bg-red-100 dark:bg-red-950/50 border-red-200 dark:border-red-900/30 border-l-red-400 dark:border-l-red-600',
      count: 4,
      supportsCount: 4,
      commentsCount: 3,
      authorInitials: 'RA',
      author: 'Rodrigo Alves',
      bairro: 'campo-grande',
      locationInfo: 'Em Campo Grande, há 3 dias',
      timestamp: 1723750000000,
      title: 'Falta total de água há 3 semanas na Cesário de Melo',
      description: 'Estamos sem uma gota de água há quase um mês na altura do número 2000. Nenhuma equipe veio ao local verificar.',
      img: null,
      comments: [
        { author: 'Clara S.', text: 'Moro no 2050 e a água está caindo normalmente, isso é informação incorreta.' }
      ]
    },
    {
      id: 'denuncia-5',
      category: 'outro',
      type: 'Outro Motivo',
      typeIcon: HelpCircle,
      colorClass: 'text-purple-700 dark:text-purple-400 bg-purple-100 dark:bg-purple-950/50 border-purple-200 dark:border-purple-900/30 border-l-purple-400 dark:border-l-purple-600',
      count: 2,
      supportsCount: 22,
      commentsCount: 5,
      authorInitials: 'FA',
      author: 'Fernanda Andrade',
      bairro: 'inhoaiba',
      locationInfo: 'Em Inhoaíba, há 4 dias',
      timestamp: 1723700000000,
      title: 'Postagem duplicada repetidas vezes',
      description: 'Relato postado repetidamente sobre o mesmo buraco na via férrea por contas secundárias.',
      img: null,
      comments: [
        { author: 'Paulo M.', text: 'Mesmo problema postado 4 vezes no mesmo minuto.' }
      ]
    },
    {
      id: 'denuncia-6',
      category: 'ofensivo',
      type: 'Ofensivo / Ódio',
      typeIcon: MessageSquareOff,
      colorClass: 'text-amber-700 dark:text-amber-500 bg-amber-100 dark:bg-amber-950/30 border-amber-200 dark:border-amber-900/30 border-l-amber-400 dark:border-l-amber-600',
      count: 2,
      supportsCount: 8,
      commentsCount: 2,
      authorInitials: 'GS',
      author: 'Gabriel Santos',
      bairro: 'cosmos',
      locationInfo: 'Em Cosmos, há 1 dia',
      timestamp: 1723820000000,
      title: 'Ataques verbais e difamação a comerciante local',
      description: 'O texto do relato contém xingamentos nominais contra o proprietário da mercearia da esquina.',
      img: null,
      comments: [
        { author: 'Mariana B.', text: 'Difamação pessoal direta no aplicativo.' }
      ]
    }
  ]);

  // Resetar página quando os filtros mudarem
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedCategory, selectedBairro, sortOrder]);

  const resolveItem = (id, action = 'resolvida') => {
    setDenuncias(prev => {
      const updated = prev.filter(d => d.id !== id);
      const newTotalPages = Math.ceil(updated.length / itemsPerPage);
      if (currentPage > newTotalPages && newTotalPages > 0) {
        setCurrentPage(newTotalPages);
      }
      return updated;
    });
    triggerToast(action === 'ignorado' ? 'Denúncia ignorada com sucesso.' : 'Relato ocultado da plataforma.');
  };

  const openReportModal = (denuncia) => {
    setSelectedReport(denuncia);
    document.body.classList.add('overflow-hidden');
  };

  const closeReportModal = () => {
    setSelectedReport(null);
    document.body.classList.remove('overflow-hidden');
  };

  // Filtragem e Ordenação dinâmica
  const filteredDenuncias = denuncias
    .filter(d => {
      const matchesSearch = 
        d.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        d.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        d.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
        d.id.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory ? d.category === selectedCategory : true;
      const matchesBairro = selectedBairro ? d.bairro === selectedBairro : true;
      return matchesSearch && matchesCategory && matchesBairro;
    })
    .sort((a, b) => {
      if (sortOrder === 'antigos') {
        return a.timestamp - b.timestamp;
      }
      return b.timestamp - a.timestamp;
    });

  // Dados Paginados
  const totalPages = Math.ceil(filteredDenuncias.length / itemsPerPage);
  const paginatedDenuncias = filteredDenuncias.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="flex flex-col h-full animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-6 pb-12">
      
      {/* === SECTION ELEGANTE DE FILTROS & AUTOMAÇÃO === */}
      <section className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-5 sm:p-6 shadow-sm">
        
        {/* Cabeçalho da Section */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-zinc-100 dark:border-zinc-800/80 mb-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-600 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700/60">
              <Filter className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-base font-black text-zinc-900 dark:text-white tracking-tight">Filtros & Triagem</h2>
              <p className="text-xs font-medium text-zinc-500">Refine a fila de denúncias ou configure regras automatizadas</p>
            </div>
          </div>

          {/* Botão de Moderação Automática */}
          <button
            onClick={() => setIsAutoModalOpen(true)}
            className="flex items-center justify-between sm:justify-start gap-2.5 px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700/70 bg-zinc-50 hover:bg-zinc-100 dark:bg-zinc-800/60 dark:hover:bg-zinc-800 text-zinc-800 dark:text-zinc-200 text-xs font-bold transition-all shadow-xs group cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <Bot className="h-4 w-4 text-red-600 dark:text-red-500 group-hover:scale-110 transition-transform" />
              <span>Moderação Automática</span>
            </div>
            <span className={`inline-flex items-center gap-1 text-[10px] font-black uppercase px-2 py-0.5 rounded-full ${
              autoModerationEnabled 
                ? 'bg-green-100 text-green-700 dark:bg-green-950/60 dark:text-green-400 border border-green-200 dark:border-green-800/50' 
                : 'bg-zinc-200 text-zinc-600 dark:bg-zinc-700 dark:text-zinc-300'
            }`}>
              <span className={`w-1.5 h-1.5 rounded-full ${autoModerationEnabled ? 'bg-green-500 animate-pulse' : 'bg-zinc-400'}`}></span>
              {autoModerationEnabled ? 'ON' : 'OFF'}
            </span>
          </button>
        </div>

        {/* Linha de Inputs Padronizados */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
          
          {/* Input de Busca */}
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400 pointer-events-none" />
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar por termo, autor ou ID..."
              className="w-full h-11 bg-zinc-50 dark:bg-zinc-950/60 border border-zinc-200 dark:border-zinc-800 rounded-xl pl-10 pr-4 text-sm text-zinc-900 dark:text-white placeholder-zinc-400 dark:placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-red-500/40 focus:border-red-500/50 transition-all font-medium" 
            />
          </div>

          {/* Select de Categoria */}
          <div>
            <select 
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full h-11 bg-zinc-50 dark:bg-zinc-950/60 border border-zinc-200 dark:border-zinc-800 rounded-xl px-3.5 text-sm text-zinc-700 dark:text-zinc-200 focus:outline-none focus:ring-2 focus:ring-red-500/40 focus:border-red-500/50 transition-all font-medium cursor-pointer"
            >
              <option value="">Todas as Categorias</option>
              <option value="falso">Falso / Fake News</option>
              <option value="ofensivo">Ofensivo / Ódio</option>
              <option value="spam">Spam / Comercial</option>
              <option value="outro">Outro Motivo</option>
            </select>
          </div>

          {/* Select de Bairro */}
          <div>
            <select 
              value={selectedBairro}
              onChange={(e) => setSelectedBairro(e.target.value)}
              className="w-full h-11 bg-zinc-50 dark:bg-zinc-950/60 border border-zinc-200 dark:border-zinc-800 rounded-xl px-3.5 text-sm text-zinc-700 dark:text-zinc-200 focus:outline-none focus:ring-2 focus:ring-red-500/40 focus:border-red-500/50 transition-all font-medium cursor-pointer"
            >
              <option value="">Todos os Bairros</option>
              <option value="campo-grande">Campo Grande</option>
              <option value="inhoaiba">Inhoaíba</option>
              <option value="cosmos">Cosmos</option>
            </select>
          </div>

          {/* Select de Ordenação */}
          <div>
            <select 
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="w-full h-11 bg-zinc-50 dark:bg-zinc-950/60 border border-zinc-200 dark:border-zinc-800 rounded-xl px-3.5 text-sm text-zinc-700 dark:text-zinc-200 focus:outline-none focus:ring-2 focus:ring-red-500/40 focus:border-red-500/50 transition-all font-medium cursor-pointer"
            >
              <option value="recentes">Mais Recentes</option>
              <option value="antigos">Mais Antigos</option>
            </select>
          </div>

        </div>
      </section>

      {/* === CABEÇALHO COM CONTAGEM DE RELATOS === */}
      <div className="flex items-center justify-between px-1">
        <span className="text-xs font-bold text-zinc-500 dark:text-zinc-400">
          Mostrando <strong className="text-zinc-900 dark:text-white">{paginatedDenuncias.length}</strong> de <strong className="text-zinc-900 dark:text-white">{filteredDenuncias.length}</strong> relatos denunciados
        </span>
        <span className="text-[11px] font-semibold text-zinc-400">
          Limite: {itemsPerPage} por página
        </span>
      </div>

      {/* === LISTA DE MODERAÇÃO === */}
      <div className="max-w-5xl mx-auto space-y-6 w-full">
        {filteredDenuncias.length === 0 ? (
          <div className="bg-zinc-50 dark:bg-zinc-900/30 border border-zinc-200 dark:border-zinc-800/50 border-dashed rounded-2xl p-10 flex flex-col items-center justify-center text-center mt-6">
            <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-950/30 flex items-center justify-center text-green-600 mb-4">
              <ShieldCheck className="h-8 w-8" />
            </div>
            <h3 className="text-lg font-black text-zinc-900 dark:text-white">Nenhum relato pendente!</h3>
            <p className="text-sm text-zinc-500 mt-2 max-w-sm">
              {denuncias.length === 0 
                ? "Excelente trabalho. Nenhuma denúncia pendente de análise no momento." 
                : "Nenhum relato corresponde aos filtros selecionados acima."}
            </p>
          </div>
        ) : (
          paginatedDenuncias.map((denuncia) => {
            const Icon = denuncia.typeIcon;
            
            // Extract pure color classes by removing border-l classes
            const baseColors = denuncia.colorClass.split(' ').filter(c => !c.includes('border-l-')).join(' ');
            const leftBorderColor = denuncia.colorClass.split(' ').find(c => c.includes('border-l-') && !c.includes('dark:'));
            const darkLeftBorderColor = denuncia.colorClass.split(' ').find(c => c.includes('dark:border-l-'));

            return (
              <div key={denuncia.id} className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-[1.5rem] p-6 shadow-sm relative overflow-hidden flex flex-col lg:flex-row gap-6 transition-all">
                
                {/* Lado Esquerdo: Detalhes do Relato */}
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2 mb-4">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-black uppercase tracking-wider border ${baseColors}`}>
                      <Icon className="h-3.5 w-3.5" /> {denuncia.type}
                    </span>
                    <span className="inline-flex items-center px-3 py-1 rounded-md text-xs font-black uppercase tracking-wider bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-700">
                      <Users className="h-3 w-3 mr-1" /> {denuncia.count} Denúncia{denuncia.count > 1 ? 's' : ''}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 mb-3 pb-3 border-b border-zinc-100 dark:border-zinc-800/60">
                    <div className="w-8 h-8 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-500 text-xs font-bold border border-zinc-200 dark:border-zinc-700">
                      {denuncia.authorInitials}
                    </div>
                    <div>
                      <p className="text-xs font-medium text-zinc-500">Relato postado por <strong className="text-zinc-900 dark:text-white">{denuncia.author}</strong></p>
                      <p className="text-[10px] text-zinc-400">{denuncia.locationInfo}</p>
                    </div>
                  </div>

                  <div className="mb-5 flex flex-col sm:flex-row gap-4">
                    {denuncia.img && (
                      <div className="w-full sm:w-24 h-40 sm:h-24 bg-zinc-200 dark:bg-zinc-800 rounded-xl overflow-hidden flex-shrink-0 relative">
                        <img src={denuncia.img} alt="Anexo do relato" className="object-cover w-full h-full opacity-80 mix-blend-luminosity" />
                      </div>
                    )}
                    <div className="flex-1">
                      <h3 className="text-base font-bold text-zinc-900 dark:text-white mb-2">{denuncia.title}</h3>
                      <p className={`text-sm text-zinc-600 dark:text-zinc-300 bg-zinc-50 dark:bg-zinc-950/50 p-4 rounded-xl border border-zinc-100 dark:border-zinc-800/50 italic border-l-4 ${leftBorderColor} ${darkLeftBorderColor} ${denuncia.img ? 'line-clamp-3' : ''}`}>
                        "{denuncia.description}"
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 pt-2">
                    <button className="flex items-center gap-1.5 px-3 py-1.5 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-600 dark:text-zinc-300 rounded-lg text-xs font-bold transition-colors">
                      <MessageSquare className="h-4 w-4" /> {denuncia.commentsCount || denuncia.comments?.length || 0} Comentários
                    </button>
                    <button className="flex items-center gap-1.5 px-3 py-1.5 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-600 dark:text-zinc-300 rounded-lg text-xs font-bold transition-colors">
                      <ArrowUp className="h-4 w-4" /> {denuncia.supportsCount || 0} Apoios
                    </button>
                  </div>
                </div>

                {/* Lado Direito: Ações */}
                <div className="w-full lg:w-64 flex flex-col gap-3 lg:border-l lg:border-zinc-100 lg:dark:border-zinc-800 lg:pl-6 justify-center">
                  <button onClick={() => openReportModal(denuncia)} className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-zinc-900 dark:bg-white hover:bg-zinc-800 dark:hover:bg-zinc-200 text-white dark:text-zinc-900 rounded-xl text-sm font-bold transition-colors shadow-sm cursor-pointer">
                    <Maximize2 className="h-4 w-4" /> Ver Relato
                  </button>
                  <div className="w-full h-px bg-zinc-100 dark:bg-zinc-800/80 my-1"></div>
                  <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest text-center">Decisão</p>
                  <button onClick={() => resolveItem(denuncia.id, 'ignorado')} className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-200 rounded-xl text-sm font-bold transition-colors cursor-pointer">
                    <CheckCircle2 className="h-4 w-4" /> Ignorar Denúncias
                  </button>
                  <button onClick={() => resolveItem(denuncia.id, 'ocultado')} className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-red-50 dark:bg-red-950/30 hover:bg-red-100 dark:hover:bg-red-900/50 text-red-600 border border-red-200 dark:border-red-900/30 rounded-xl text-sm font-bold transition-colors cursor-pointer">
                    <Trash2 className="h-4 w-4" /> Ocultar Relato
                  </button>
                </div>

              </div>
            );
          })
        )}

        {/* Componente de Paginação */}
        <AdminPagination 
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>

      {/* === MODAL: MODERAÇÃO AUTOMÁTICA (REGRAS E SWITCH) === */}
      {isAutoModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-zinc-900/60 dark:bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-white dark:bg-[#09090b] w-full max-w-lg rounded-[2rem] border border-zinc-200 dark:border-zinc-800 shadow-2xl overflow-hidden flex flex-col relative animate-in zoom-in-95 duration-200">
            
            {/* Header Modal */}
            <div className="flex items-center justify-between p-5 md:p-6 border-b border-zinc-100 dark:border-zinc-800/80 bg-zinc-50/80 dark:bg-zinc-900/50 backdrop-blur-sm">
              <div className="flex items-center gap-3">
                <div className="bg-red-100 dark:bg-red-950/50 border border-red-200 dark:border-red-900/40 p-2.5 rounded-2xl text-red-600 dark:text-red-400">
                  <Bot className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-black text-lg text-zinc-900 dark:text-white leading-none">Moderação Automática</h3>
                  <p className="text-xs text-zinc-500 font-medium mt-1">Regras de proteção em tempo real</p>
                </div>
              </div>
              <button 
                onClick={() => setIsAutoModalOpen(false)} 
                className="p-2 hover:bg-zinc-200 dark:hover:bg-zinc-800 rounded-full transition-colors text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Conteúdo do Modal */}
            <div className="p-6 space-y-6">
              
              {/* Switch Principal ON / OFF */}
              <div className="p-4 sm:p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/70 dark:bg-zinc-900/50 flex items-center justify-between gap-4">
                <div>
                  <span className="block text-sm font-black text-zinc-900 dark:text-white">Status do Mecanismo</span>
                  <span className="text-xs text-zinc-500 font-medium">
                    {autoModerationEnabled ? 'Gatilhos de proteção ativos no banco de dados' : 'Mecanismo pausado no sistema'}
                  </span>
                </div>

                {/* Switch Toggle Button */}
                <button
                  type="button"
                  onClick={() => setAutoModerationEnabled(!autoModerationEnabled)}
                  className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors duration-300 ease-in-out focus:outline-none p-1 cursor-pointer ${
                    autoModerationEnabled ? 'bg-red-600' : 'bg-zinc-300 dark:bg-zinc-700'
                  }`}
                  role="switch"
                  aria-checked={autoModerationEnabled}
                >
                  <span
                    aria-hidden="true"
                    className={`pointer-events-none inline-flex h-6 w-6 transform items-center justify-center rounded-full bg-white shadow-md transition-transform duration-300 ease-in-out leading-none text-center ${
                      autoModerationEnabled 
                        ? 'translate-x-6 text-red-600 font-black text-[9px]' 
                        : 'translate-x-0 text-zinc-500 font-bold text-[9px]'
                    }`}
                  >
                    {autoModerationEnabled ? 'ON' : 'OFF'}
                  </span>
                </button>
              </div>

              {/* Regra de Queda Automática */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-zinc-400">
                  <ShieldAlert className="h-4 w-4 text-red-500" />
                  Regra de Despublicação Instantânea
                </div>

                <div className="p-4 rounded-2xl bg-red-50/70 dark:bg-red-950/20 border border-red-100 dark:border-red-900/30 text-xs text-zinc-700 dark:text-zinc-300 leading-relaxed space-y-2">
                  <p className="font-semibold text-zinc-900 dark:text-white">
                    🎯 Limite de Acúmulo: <span className="text-red-600 dark:text-red-400 font-black">{autoModerationThreshold} denúncias de usuários únicos (IDs distintos)</span>
                  </p>
                  <p>
                    Quando um relato recebe <strong>10 ou mais denúncias</strong> de contas distintas, ele é automaticamente <strong>ocultado do feed público e do mapa</strong> até que um administrador aprove ou exclua definitivamente.
                  </p>
                </div>
              </div>

              {/* Informações Complementares */}
              <div className="space-y-2.5 text-xs text-zinc-500 dark:text-zinc-400">
                <div className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                  <span>Evita ataques de spam ou notícias falsas virais fora do horário comercial.</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                  <span>Denúncias duplicadas do mesmo autor (mesmo ID) são contabilizadas como 1 único voto.</span>
                </div>
              </div>

            </div>

            {/* Footer Modal */}
            <div className="p-5 border-t border-zinc-100 dark:border-zinc-800/80 bg-zinc-50/80 dark:bg-zinc-900/50 backdrop-blur-sm flex justify-end gap-3">
              <button 
                onClick={handleSaveAutoModeration}
                className="px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm bg-zinc-900 hover:bg-zinc-800 dark:bg-white dark:hover:bg-zinc-200 text-white dark:text-zinc-900 transition-colors shadow-sm cursor-pointer"
              >
                Salvar & Concluir
              </button>
            </div>

          </div>
        </div>
      )}

      {/* === MODAL: DETALHES DO RELATO === */}
      {selectedReport && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-zinc-900/60 dark:bg-black/80 backdrop-blur-md animate-in fade-in duration-300">
          <div className="bg-white dark:bg-[#09090b] w-full max-w-3xl max-h-[90vh] rounded-[2rem] border border-zinc-200 dark:border-zinc-800 shadow-2xl overflow-hidden flex flex-col relative animate-in zoom-in-95 duration-300">
            
            <div className="flex items-center justify-between p-5 md:p-6 border-b border-zinc-100 dark:border-zinc-800/80 bg-zinc-50/80 dark:bg-zinc-900/50 backdrop-blur-sm sticky top-0 z-10">
              <div className="flex items-center gap-3">
                <div className="bg-zinc-200 dark:bg-zinc-800 p-2 rounded-xl text-zinc-600 dark:text-zinc-400">
                  <FileText className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-black text-lg text-zinc-900 dark:text-white leading-none">Detalhes do Relato Original</h3>
                  <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mt-1">Modo Leitura</p>
                </div>
              </div>
              <button onClick={closeReportModal} className="p-2 hover:bg-zinc-200 dark:hover:bg-zinc-800 rounded-full transition-colors text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 cursor-pointer">
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="p-6 md:p-8 overflow-y-auto">
              <div className="space-y-6">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-2.5 py-1 rounded-md bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 text-xs font-bold tracking-wider flex items-center gap-1.5 uppercase border border-zinc-200 dark:border-zinc-700">
                    Sinalizado como: {selectedReport.type.split('/')[0].trim()}
                  </span>
                  <span className="text-zinc-500 text-xs font-medium ml-auto">
                    {selectedReport.locationInfo}
                  </span>
                </div>

                <h1 className="text-2xl font-black text-zinc-900 dark:text-white leading-tight">
                  {selectedReport.title}
                </h1>

                <p className="text-zinc-600 dark:text-zinc-300 text-base leading-relaxed p-4 bg-zinc-50 dark:bg-zinc-900/50 rounded-2xl border border-zinc-100 dark:border-zinc-800/80">
                  {selectedReport.description}
                </p>

                <div className="flex items-center gap-3 text-zinc-600 dark:text-zinc-400 font-medium bg-zinc-100 dark:bg-zinc-900/50 p-4 rounded-2xl border border-zinc-200 dark:border-zinc-800/50">
                  <div className="w-10 h-10 rounded-full bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center text-zinc-500 shrink-0">
                    <User className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-zinc-700 dark:text-zinc-300 text-sm">Enviado por <strong className="text-zinc-900 dark:text-white">{selectedReport.author}</strong></p>
                  </div>
                </div>

                {selectedReport.img && (
                  <div className="w-full h-64 rounded-2xl overflow-hidden bg-zinc-900 border border-zinc-800">
                    <img src={selectedReport.img} alt="Anexo do relato" className="w-full h-full object-cover opacity-90" />
                  </div>
                )}
              </div>
            </div>

            <div className="p-5 border-t border-zinc-100 dark:border-zinc-800/80 bg-zinc-50/80 dark:bg-zinc-900/50 backdrop-blur-sm flex justify-end gap-3">
              <button onClick={closeReportModal} className="px-5 py-2.5 rounded-xl font-bold text-sm bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-white hover:bg-zinc-300 dark:hover:bg-zinc-700 transition-colors cursor-pointer">
                Voltar à Fila
              </button>
            </div>
          </div>
        </div>
      )}

      {/* === POPUP / TOAST ELEGANTE COM FECHAMENTO AUTOMÁTICO === */}
      {showToast && (
        <div className="fixed bottom-6 right-6 z-[120] flex items-center gap-3 px-5 py-3.5 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 rounded-2xl shadow-2xl border border-zinc-700 dark:border-zinc-200 animate-in fade-in slide-in-from-bottom-4 duration-300 pointer-events-none">
          <div className="w-6 h-6 rounded-full bg-green-500/20 text-green-500 dark:text-green-600 flex items-center justify-center flex-shrink-0">
            <CheckCircle2 className="h-4 w-4" />
          </div>
          <p className="text-xs sm:text-sm font-bold tracking-tight">
            {toastMessage || 'Alterações realizadas com sucesso!'}
          </p>
        </div>
      )}

    </div>
  );
}
