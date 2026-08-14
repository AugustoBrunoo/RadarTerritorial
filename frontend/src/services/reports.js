import { supabase } from '../lib/supabaseClient'; // Adjusted path to match project

export async function getRelatosRealtime() {
  try {
    const { data, error } = await supabase
      .from('relatos')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;

    const hoje = new Date();

    // Mapeia os dados do Supabase para o formato consumido pelos componentes visuais
    return data.map((item) => {
      const dataCriacao = new Date(item.created_at);
      const dataFim = item.fechado_em ? new Date(item.fechado_em) : hoje;
      
      // Cálculo exato de dias em aberto
      const diffTime = Math.abs(dataFim - dataCriacao);
      const diasAberto = Math.max(1, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));

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
        // Mantemos fallback do operador para não quebrar compatibilidade
        operador: item.orgao_responsavel_id || "Órgão Competente" 
      };
    });
  } catch (err) {
    console.error('Erro ao carregar relatos do Supabase:', err.message);
    return [];
  }
}
