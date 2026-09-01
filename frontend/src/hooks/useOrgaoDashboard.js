import { useState, useEffect, useCallback, useMemo } from 'react';
import { useAuth } from './useAuth';
import { buscarPainelOrgao, responderOcorrencia } from '../services/orgaoService';

export function useOrgaoDashboard() {
  const { profile, loading: authLoading } = useAuth();
  const [orgao, setOrgao] = useState(null);
  const [relatos, setRelatos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const orgaoId = profile?.orgao_id;

  const [sla, setSla] = useState(() => {
    try {
      const saved = localStorage.getItem(`radar_orgao_sla_${orgaoId || 'default'}`);
      return saved ? parseInt(saved, 10) : 3;
    } catch {
      return 3;
    }
  });

  const carregarDados = useCallback(async () => {
    if (!orgaoId) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const { orgao: dadosOrgao, relatos: listaRelatos } = await buscarPainelOrgao(orgaoId);
      setOrgao(dadosOrgao);
      setRelatos(listaRelatos || []);
    } catch (err) {
      console.error('Erro ao carregar painel do órgão:', err);
      setError(err.message || 'Falha ao sincronizar dados operacionais.');
    } finally {
      setLoading(false);
    }
  }, [orgaoId]);

  useEffect(() => {
    if (!authLoading) {
      carregarDados();
    }
  }, [authLoading, carregarDados]);

  // Cálculo das Métricas e KPIs
  const kpis = useMemo(() => {
    const total = relatos.length;
    if (total === 0) {
      return {
        total: 0,
        naoRespondidos: 0,
        porcentagemNaoRespondidos: '0%',
        resolvidos: 0,
        taxaResolutividade: '0%',
        tempoMedioAtendimento: 'N/D',
        bairroCritico: 'N/D',
        pendentes: 0,
        emAnalise: 0,
        emExecucao: 0,
        rejeitados: 0,
        distribuicaoBairros: [],
        distribuicaoCategorias: []
      };
    }

    const pendentes = relatos.filter(r => r.status === 'pendente').length;
    const emAnalise = relatos.filter(r => r.status === 'em_analise').length;
    const emExecucao = relatos.filter(r => r.status === 'em_execucao').length;
    const resolvidos = relatos.filter(r => r.status === 'resolvido').length;
    const rejeitados = relatos.filter(r => r.status === 'rejeitado').length;
    
    // Mantendo a métrica de não respondidos (pendentes ou sem resposta técnica)
    const naoRespondidos = relatos.filter(r => !r.resposta_orgao || r.status === 'pendente').length;

    // Distribuição por Bairros
    const distribuicaoBairrosObj = relatos.reduce((acc, relato) => {
      const bairro = relato.bairro || 'Outros';
      if (!acc[bairro]) acc[bairro] = { total: 0, resolvidos: 0, naoRespondidos: 0 };
      acc[bairro].total++;
      if (relato.status === 'resolvido') acc[bairro].resolvidos++;
      else if (!relato.resposta_orgao || relato.status === 'pendente') acc[bairro].naoRespondidos++;
      return acc;
    }, {});

    const distribuicaoBairros = Object.entries(distribuicaoBairrosObj)
      .map(([nome, dados]) => ({ nome, ...dados }))
      .sort((a, b) => b.total - a.total);

    const bairroCritico = distribuicaoBairros[0]?.nome || 'N/D';

    // Distribuição por Categorias
    const distribuicaoCategoriasObj = relatos.reduce((acc, relato) => {
      const categoria = relato.subcategoria || relato.categoria || 'Não Categorizado';
      acc[categoria] = (acc[categoria] || 0) + 1;
      return acc;
    }, {});

    const distribuicaoCategorias = Object.entries(distribuicaoCategoriasObj)
      .map(([nome, total]) => ({ nome, total }))
      .sort((a, b) => b.total - a.total);

    // Cálculo do Tempo Médio de Atendimento (TMA) em dias
    const relatosResolvidos = relatos.filter(r => r.status === 'resolvido');
    let tmaDias = 0;
    
    if (relatosResolvidos.length > 0) {
      const somaDias = relatosResolvidos.reduce((acc, relato) => {
        const criado = new Date(relato.created_at);
        const atualizado = new Date(relato.updated_at || relato.created_at);
        const diffTempo = Math.abs(atualizado - criado);
        const diffDias = Math.ceil(diffTempo / (1000 * 60 * 60 * 24));
        return acc + diffDias;
      }, 0);
      
      tmaDias = (somaDias / relatosResolvidos.length).toFixed(1);
    }
    // Cálculo de novosHoje e atrasados
    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);

    const novosHoje = relatos.filter(r => {
      if (!r.created_at) return false;
      const criadoEm = new Date(r.created_at);
      criadoEm.setHours(0, 0, 0, 0);
      return criadoEm.getTime() === hoje.getTime();
    }).length;

    const atrasados = relatos.filter(r => {
      if (r.status === 'resolvido' || !r.created_at) return false;
      const criadoEm = new Date(r.created_at);
      const diffTime = Math.abs(new Date() - criadoEm);
      const diffDias = Math.floor(diffTime / (1000 * 60 * 60 * 24));
      return diffDias > sla;
    }).length;

    return {
      total,
      naoRespondidos,
      porcentagemNaoRespondidos: `${((naoRespondidos / total) * 100).toFixed(1)}%`,
      resolvidos,
      taxaResolutividade: `${((resolvidos / total) * 100).toFixed(1)}%`,
      tempoMedioAtendimento: tmaDias > 0 ? `${tmaDias}d` : 'N/D',
      bairroCritico,
      pendentes,
      emAnalise,
      emExecucao,
      rejeitados,
      distribuicaoBairros,
      distribuicaoCategorias,
      novosHoje,
      atrasados,
      sla
    };
  }, [relatos, sla]);

  // Ação de Resposta com atualização otimista/local de estado
  const responder = async (dados) => {
    const relatoAtualizado = await responderOcorrencia(dados);
    setRelatos(prev => prev.map(r => r.id === relatoAtualizado.id ? { ...r, ...relatoAtualizado } : r));
    return relatoAtualizado;
  };

  // Ação de Salvar SLA com persistência
  const salvarSlaConfig = async (novoPrazo) => {
    const prazoNumerico = parseInt(novoPrazo, 10);
    if (!prazoNumerico || isNaN(prazoNumerico) || prazoNumerico <= 0) {
      throw new Error('Prazo de SLA inválido.');
    }
    setSla(prazoNumerico);
    try {
      localStorage.setItem(`radar_orgao_sla_${orgaoId || 'default'}`, String(prazoNumerico));
    } catch (e) {
      console.warn('Falha ao salvar no storage:', e);
    }
    return prazoNumerico;
  };

  return {
    profile,
    orgao,
    relatos,
    kpis,
    loading: authLoading || loading,
    error,
    sla,
    setSla,
    salvarSlaConfig,
    recarregar: carregarDados,
    responder
  };
}
