import { supabase } from '../lib/supabaseClient';

/**
 * Busca os dados institucionais do órgão e todas as ocorrências vinculadas.
 * @param {string} orgaoId - UUID do órgão
 */
export async function buscarPainelOrgao(orgaoId) {
  if (!orgaoId) throw new Error('Identificador do órgão não informado.');

  // 1. Dados institucionais do Órgão
  const { data: orgao, error: orgaoError } = await supabase
    .from('orgaos')
    .select('id, nome, email_institucional, area_atuacao, ativo')
    .eq('id', orgaoId)
    .single();

  if (orgaoError) throw orgaoError;

  // 2. Relatos atribuídos ao Órgão (ordenados pelos mais recentes)
  const { data: relatos, error: relatosError } = await supabase
    .from('relatos')
    .select(`
      id,
      created_at,
      bairro,
      rua,
      referencia,
      macro_eixo,
      categoria_nome,
      descricao,
      status,
      resposta_orgao,
      protocolo_oficial,
      fechado_por,
      fechado_em,
      apoios_count,
      comentarios_count,
      is_anonimo
    `)
    .eq('orgao_responsavel_id', orgaoId)
    .order('created_at', { ascending: false });

  if (relatosError) throw relatosError;

  return { orgao, relatos };
}

/**
 * Salva a resposta oficial, altera o status e registra auditoria do gestor.
 */
export async function salvarRespostaOperacional({
  relatoId,
  novoStatus,
  respostaOrgao,
  protocoloOficial,
  isAnonimo,
  gestorProfileId
}) {
  if (!relatoId) throw new Error('ID do relato não fornecido.');
  if (!respostaOrgao?.trim()) throw new Error('A mensagem oficial ao cidadão é obrigatória.');

  const isResolvido = novoStatus === 'resolvido';
  const agora = new Date().toISOString();

  const payload = {
    status: novoStatus,
    resposta_orgao: respostaOrgao.trim(),
    // Se o relato for anônimo, o protocolo DEVE ser null
    protocolo_oficial: isAnonimo ? null : (protocoloOficial?.trim() || null),
    respondido_em: agora,
    respondido_por_id: gestorProfileId,
    fechado_por: isResolvido ? 'orgao' : null,
    fechado_em: isResolvido ? agora : null
  };

  const { data, error } = await supabase
    .from('relatos')
    .update(payload)
    .eq('id', relatoId)
    .select()
    .single();

  if (error) throw error;
  return data;
}

/**
 * Atualiza o status e a resposta institucional do chamado.
 * Mantido para retrocompatibilidade com useOrgaoDashboard.
 * @param {Object} params
 * @param {string} params.relatoId - UUID da ocorrência
 * @param {string} params.status - 'em_analise' | 'em_execucao' | 'resolvido' | 'rejeitado'
 * @param {string} params.respostaOrgao - Parecer técnico ou mensagem pública
 * @param {string} [params.protocoloOficial] - Número do protocolo de atendimento (ex: 1746)
 */
export async function responderOcorrencia({ relatoId, status, respostaOrgao, protocoloOficial }) {
  const isResolvido = status === 'resolvido';

  const payload = {
    status,
    resposta_orgao: respostaOrgao,
    protocolo_oficial: protocoloOficial || null,
    fechado_por: isResolvido ? 'orgao' : null,
    fechado_em: isResolvido ? new Date().toISOString() : null
  };

  const { data, error } = await supabase
    .from('relatos')
    .update(payload)
    .eq('id', relatoId)
    .select()
    .single();

  if (error) throw error;
  return data;
}
