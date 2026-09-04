import { supabase } from '../lib/supabaseClient'; // Adjusted path to match project

export async function getRelatosRealtime() {
  try {
    const [relatosResponse, orgaosResponse, profilesResponse] = await Promise.all([
      supabase
        .from('relatos')
        .select('*')
        .order('created_at', { ascending: false }),
      supabase
        .from('orgaos')
        .select('id, nome'),
      supabase
        .from('profiles')
        .select('id, full_name, orgao_id, nome_completo')
        .not('orgao_id', 'is', null)
    ]);

    if (relatosResponse.error) throw relatosResponse.error;
    if (orgaosResponse.error) throw orgaosResponse.error;
    // profilesResponse might have an error, but let's just log it if so, or default to empty
    const relatos = relatosResponse.data;
    const orgaos = orgaosResponse.data || [];
    const perfisOrgao = profilesResponse?.data || [];

    const hoje = new Date();

    // Mapeia os dados do Supabase para o formato consumido pelos componentes visuais
    return relatos.map((item) => {
      const dataCriacao = new Date(item.created_at);
      const dataFim = item.fechado_em ? new Date(item.fechado_em) : hoje;
      
      // Cálculo exato de dias em aberto
      const diffTime = Math.abs(dataFim - dataCriacao);
      const diasAberto = Math.max(1, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));

      const orgao = orgaos.find(o => o.id == item.orgao_responsavel_id);
      const perfilRepresentante = perfisOrgao.find(p => p.orgao_id == item.orgao_responsavel_id);
      
      let operadorNome = "Órgão Responsável";
      if (perfilRepresentante && (perfilRepresentante.nome_completo || perfilRepresentante.full_name)) {
        operadorNome = perfilRepresentante.nome_completo || perfilRepresentante.full_name;
      } else if (orgao) {
        operadorNome = orgao.nome;
      }

      return {
        id: item.id,
        bairro: item.bairro,
        rua: item.rua || 'Rua não informada',
        eixo: item.macro_eixo,
        category: item.categoria_nome,
        status: item.status === 'resolvido' ? 'Resolvido' : 'Não Resolvido',
        statusOriginal: item.status,
        diasAberto: diasAberto,
        lat: Number(item.latitude),
        lng: Number(item.longitude),
        apoios: item.apoios_count || 0,
        comentarios: item.comentarios_count || 0,
        reaberto: item.is_reaberto || false,
        dataCriacao: dataCriacao,
        imagemUrl: item.imagem_url,
        descricao: item.descricao,
        protocolo: item.protocolo_oficial,
        respostaOrgao: item.resposta_orgao,
        operador: operadorNome 
      };
    });
  } catch (err) {
    console.error('Erro ao carregar relatos do Supabase:', err.message);
    return [];
  }
}
