import React, { useState, useEffect } from 'react';
import { Building2, Droplet, Building, Trash, Building2 as BuildingIcon, Check } from 'lucide-react';
import AdminPagination from '../../../components/AdminPagination';
import Toast from '../../../components/Toast';

// Componentes extraídos
import OrgaosFilter from '../../../components/OrgaosFilter';
import OrgaosTabs from '../../../components/OrgaosTabs';
import OrgaoCard from '../../../components/OrgaoCard';
import SolicitacaoCard from '../../../components/SolicitacaoCard';
import NovoOrgaoModal from '../../../components/NovoOrgaoModal';
import DeleteOrgaoModal from '../../../components/DeleteOrgaoModal';

export default function AdminOrgaos() {
  const [activeTab, setActiveTab] = useState('ativos');
  
  // Estados dos Filtros
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedArea, setSelectedArea] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [sortOrder, setSortOrder] = useState('az');

  // Estado de Paginação
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  // Notificação Toast
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  // Modais
  const [isNovoOrgaoModalOpen, setIsNovoOrgaoModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [orgaoToDelete, setOrgaoToDelete] = useState(null);

  const [orgaos, setOrgaos] = useState([
    {
      id: 1,
      name: 'Águas do Rio (Saneamento)',
      email: 'contato@aguasdorico.com.br',
      area: 'Saneamento Básico',
      status: 'ativo',
      icon: Droplet,
      iconColor: 'blue'
    },
    {
      id: 2,
      name: 'Subprefeitura da Zona Oeste',
      email: 'gabinete@subzo.pcrj.gov.br',
      area: 'Infraestrutura Urbana',
      status: 'ativo',
      icon: Building,
      iconColor: 'zinc'
    },
    {
      id: 3,
      name: 'Comlurb - Polo C. Grande',
      email: 'polo.cg@comlurb.gov.br',
      area: 'Limpeza Urbana',
      status: 'inativo',
      icon: Trash,
      iconColor: 'zinc'
    },
    {
      id: 4,
      name: 'Rioluz - Iluminação Pública',
      email: 'ouvidoria@rioluz.rj.gov.br',
      area: 'Iluminação Pública',
      status: 'ativo',
      icon: BuildingIcon,
      iconColor: 'zinc'
    },
    {
      id: 5,
      name: 'CET-Rio - Trânsito e Mobilidade',
      email: 'operacoes@cetrio.com.br',
      area: 'Transporte e Mobilidade',
      status: 'ativo',
      icon: Building,
      iconColor: 'zinc'
    },
    {
      id: 6,
      name: 'Secretaria Municipal de Ordem Pública (SEOP)',
      email: 'contato@seop.pcrj.gov.br',
      area: 'Segurança e Ordem Pública',
      status: 'ativo',
      icon: BuildingIcon,
      iconColor: 'zinc'
    },
    {
      id: 7,
      name: 'ConservaRio - Gerência Oeste',
      email: 'conservacao.oeste@rio.rj.gov.br',
      area: 'Infraestrutura Urbana',
      status: 'inativo',
      icon: Building,
      iconColor: 'zinc'
    }
  ]);

  const [solicitacoes, setSolicitacoes] = useState([
    {
      id: 101,
      name: 'Light S.A.',
      email: 'joao.silva@light.com.br',
      area: 'Iluminação Pública',
      timeAgo: 'Há 2 horas'
    }
  ]);

  const triggerToast = (msg = 'Alterações realizadas com sucesso!') => {
    setToastMessage(msg);
    setShowToast(true);
  };

  // Resetar página quando os filtros ou aba mudarem
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedArea, selectedStatus, sortOrder, activeTab]);

  const openDeleteModal = (orgao) => {
    setOrgaoToDelete(orgao);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (orgaoToDelete) {
      setOrgaos(prev => prev.filter(o => o.id !== orgaoToDelete.id));
      setIsDeleteModalOpen(false);
      setOrgaoToDelete(null);
      triggerToast('Órgão removido com sucesso!');
    }
  };

  const handleToggleStatus = (orgao) => {
    setOrgaos(prev => prev.map(o => {
      if (o.id === orgao.id) {
        const nextStatus = o.status === 'ativo' ? 'inativo' : 'ativo';
        return { ...o, status: nextStatus };
      }
      return o;
    }));
    triggerToast(orgao.status === 'ativo' ? 'Órgão marcado como inativo.' : 'Órgão reativado com sucesso!');
  };

  const handleSaveNovoOrgao = (dados) => {
    const novoItem = {
      id: Date.now(),
      name: dados.nome,
      email: dados.email || 'contato@orgao.gov.br',
      area: dados.area || 'Infraestrutura Urbana',
      status: dados.ativo ? 'ativo' : 'inativo',
      icon: dados.area === 'Saneamento Básico' ? Droplet : (dados.area === 'Limpeza Urbana' ? Trash : Building2),
      iconColor: dados.area === 'Saneamento Básico' ? 'blue' : 'zinc'
    };

    setOrgaos(prev => [novoItem, ...prev]);
    setIsNovoOrgaoModalOpen(false);
    triggerToast('Órgão cadastrado com sucesso!');
  };

  const handleAprovarSolicitacao = (req) => {
    const novoOrgao = {
      id: Date.now(),
      name: req.name,
      email: req.email,
      area: req.area,
      status: 'ativo',
      icon: BuildingIcon,
      iconColor: 'zinc'
    };
    setOrgaos(prev => [novoOrgao, ...prev]);
    setSolicitacoes(prev => prev.filter(s => s.id !== req.id));
    triggerToast(`Solicitação de ${req.name} aprovada com sucesso!`);
  };

  const handleRejeitarSolicitacao = (req) => {
    setSolicitacoes(prev => prev.filter(s => s.id !== req.id));
    triggerToast(`Solicitação de ${req.name} rejeitada.`);
  };

  // Filtragem e Ordenação dinâmica
  const filteredOrgaos = orgaos
    .filter(o => {
      const matchesSearch = 
        o.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        o.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        o.area.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesArea = selectedArea ? o.area === selectedArea : true;
      const matchesStatus = selectedStatus ? o.status === selectedStatus : true;
      return matchesSearch && matchesArea && matchesStatus;
    })
    .sort((a, b) => {
      if (sortOrder === 'za') {
        return b.name.localeCompare(a.name);
      }
      if (sortOrder === 'recentes') {
        return (b.id || 0) - (a.id || 0);
      }
      if (sortOrder === 'antigos') {
        return (a.id || 0) - (b.id || 0);
      }
      return a.name.localeCompare(b.name);
    });

  // Dados Paginados
  const totalPages = Math.max(1, Math.ceil(filteredOrgaos.length / itemsPerPage));
  const paginatedOrgaos = filteredOrgaos.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="flex flex-col h-full animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-6 pb-12">
      
      {/* SECTION DE FILTROS */}
      <OrgaosFilter 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedArea={selectedArea}
        setSelectedArea={setSelectedArea}
        selectedStatus={selectedStatus}
        setSelectedStatus={setSelectedStatus}
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
        onNovoOrgaoClick={() => setIsNovoOrgaoModalOpen(true)}
      />

      {/* ABAS / TABS E CONTAGENS */}
      <OrgaosTabs 
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        orgaosCount={orgaos.length}
        solicitacoesCount={solicitacoes.length}
        filteredCount={filteredOrgaos.length}
        paginatedCount={paginatedOrgaos.length}
        itemsPerPage={itemsPerPage}
      />

      {/* CONTEÚDO PRINCIPAL */}
      <div className="max-w-6xl w-full mx-auto space-y-4">
        {activeTab === 'ativos' ? (
          <>
            {/* CABEÇALHO DA LISTA (Apenas Desktop) */}
            <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-3 border-b border-zinc-200 dark:border-zinc-800/50 text-xs font-bold text-zinc-400 uppercase tracking-wider">
              <div className="col-span-4">Nome do Órgão</div>
              <div className="col-span-3">Área de Atuação</div>
              <div className="col-span-3">Status</div>
              <div className="col-span-2 text-right">Ações</div>
            </div>

            {filteredOrgaos.length === 0 ? (
              <div className="bg-zinc-50 dark:bg-zinc-900/30 border border-zinc-200 dark:border-zinc-800/50 border-dashed rounded-2xl p-10 flex flex-col items-center justify-center text-center">
                <div className="w-14 h-14 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-400 mb-3">
                  <Building2 className="h-7 w-7" />
                </div>
                <h3 className="text-base font-bold text-zinc-900 dark:text-white">Nenhum órgão encontrado</h3>
                <p className="text-xs text-zinc-500 mt-1 max-w-sm">
                  Nenhum registro corresponde aos filtros selecionados. Tente ajustar os termos de busca.
                </p>
              </div>
            ) : (
              paginatedOrgaos.map((orgao) => (
                <OrgaoCard 
                  key={orgao.id}
                  orgao={orgao}
                  onToggleStatus={handleToggleStatus}
                  onDelete={openDeleteModal}
                />
              ))
            )}

            {/* Componente de Paginação */}
            <AdminPagination 
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </>
        ) : (
          /* Aba Pendentes / Solicitações */
          <div className="space-y-4">
            {solicitacoes.map((req) => (
              <SolicitacaoCard 
                key={req.id}
                solicitacao={req}
                onAprovar={handleAprovarSolicitacao}
                onRejeitar={handleRejeitarSolicitacao}
              />
            ))}
            
            {solicitacoes.length === 0 && (
              <div className="bg-zinc-50 dark:bg-zinc-900/30 border border-zinc-200 dark:border-zinc-800/50 border-dashed rounded-2xl p-10 flex flex-col items-center justify-center text-center">
                <div className="w-14 h-14 rounded-full bg-green-100 dark:bg-green-950/30 flex items-center justify-center text-green-600 mb-3">
                  <Check className="h-7 w-7" />
                </div>
                <h3 className="text-base font-bold text-zinc-900 dark:text-white">Nenhuma solicitação pendente</h3>
                <p className="text-xs text-zinc-500 mt-1 max-w-sm">
                  Todas as solicitações de órgãos governamentais foram analisadas.
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* MODAL: NOVO ÓRGÃO */}
      <NovoOrgaoModal 
        isOpen={isNovoOrgaoModalOpen}
        onClose={() => setIsNovoOrgaoModalOpen(false)}
        onSave={handleSaveNovoOrgao}
      />

      {/* MODAL: CONFIRMAR EXCLUSÃO */}
      <DeleteOrgaoModal 
        isOpen={isDeleteModalOpen}
        orgaoName={orgaoToDelete?.name}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={confirmDelete}
      />

      {/* TOAST NOTIFICATION */}
      <Toast 
        show={showToast}
        message={toastMessage}
        onClose={() => setShowToast(false)}
      />

    </div>
  );
}
