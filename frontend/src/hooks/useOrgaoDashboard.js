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
        porBairro: { 'Campo Grande': 0, 'Cosmos': 0, 'Inhoaíba': 0 }
      };
    }

    const naoRespondidos = relatos.filter(r => !r.resposta_orgao || r.status === 'pendente').length;
    const resolvidos = relatos.filter(r => r.status === 'resolvido').length;

    // Contagem por Bairro
    const contagemBairros = relatos.reduce((acc, relato) => {
      const bairro = relato.bairro || 'Outros';
      acc[bairro] = (acc[bairro] || 0) + 1;
      return acc;
    }, {});

    // Identificação do bairro com maior volume de chamados
    const bairroCritico = Object.entries(contagemBairros).sort((a, b) => b[1] - a[1])[0]?.[0] || 'N/D';

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

    return {
      total,
      naoRespondidos,
      porcentagemNaoRespondidos: `${((naoRespondidos / total) * 100).toFixed(1)}%`,
      resolvidos,
      taxaResolutividade: `${((resolvidos / total) * 100).toFixed(1)}%`,
      tempoMedioAtendimento: tmaDias > 0 ? `${tmaDias}d` : 'N/D',
      bairroCritico,
      porBairro: contagemBairros
    };
  }, [relatos]);

  // Ação de Resposta com atualização otimista/local de estado
  const responder = async (dados) => {
    const relatoAtualizado = await responderOcorrencia(dados);
    setRelatos(prev => prev.map(r => r.id === relatoAtualizado.id ? { ...r, ...relatoAtualizado } : r));
    return relatoAtualizado;
  };

  return {
    orgao,
    relatos,
    kpis,
    loading: authLoading || loading,
    error,
    recarregar: carregarDados,
    responder
  };
}
