import { supabase } from '../lib/supabaseClient';

/**
 * Retorna os IDs dos relatos que o usuário já apoiou.
 * @param {string} userId - UUID do usuário.
 * @returns {Promise<string[]>} Lista de relato_ids.
 */
export async function getUserApoios(userId) {
  if (!userId) return [];
  try {
    const { data, error } = await supabase
      .from('apoios')
      .select('relato_id')
      .eq('user_id', userId);

    if (error) throw error;
    return data.map(apoio => apoio.relato_id);
  } catch (err) {
    console.error("Erro ao buscar apoios do usuário:", err);
    return [];
  }
}

/**
 * Alterna o apoio de um usuário em um relato.
 * @param {string} relatoId - UUID do relato.
 * @param {string} userId - UUID do usuário.
 * @param {boolean} currentStatus - Status atual (se true, remove o apoio. se false, insere).
 * @returns {Promise<{success: boolean, error?: string}>}
 */
export async function toggleApoio(relatoId, userId, currentStatus) {
  if (!userId || !relatoId) return { success: false, error: 'Usuário ou relato inválido' };
  
  try {
    if (currentStatus) {
      // Remover apoio
      const { error } = await supabase
        .from('apoios')
        .delete()
        .eq('relato_id', relatoId)
        .eq('user_id', userId);
      
      if (error) throw error;
    } else {
      // Inserir apoio
      const { error } = await supabase
        .from('apoios')
        .insert([{ relato_id: relatoId, user_id: userId }]);
      
      if (error) throw error;
    }

    return { success: true };
  } catch (err) {
    console.error("Erro ao alternar apoio:", err);
    return { success: false, error: err.message };
  }
}

/**
 * Busca os comentários de um relato juntamente com os dados do autor.
 * @param {string} relatoId - UUID do relato.
 * @returns {Promise<any[]>}
 */
export async function getComentariosByRelato(relatoId) {
  try {
    const { data: comentarios, error } = await supabase
      .from('comentarios')
      .select('*')
      .eq('relato_id', relatoId)
      .order('created_at', { ascending: false });

    if (error) throw error;

    if (!comentarios || comentarios.length === 0) return [];

    // Pegar nomes dos autores
    const userIds = [...new Set(comentarios.map(c => c.user_id).filter(Boolean))];
    const { data: profiles } = await supabase
      .from('profiles')
      .select('id, nome_completo, role')
      .in('id', userIds);

    return comentarios.map(comentario => {
      const prof = profiles?.find(p => p.id === comentario.user_id);
      return {
        ...comentario,
        authorName: prof?.nome_completo || "Usuário",
        authorRole: prof?.role || "user"
      };
    });
  } catch (err) {
    console.error("Erro ao buscar comentários:", err);
    return [];
  }
}

/**
 * Adiciona um novo comentário em um relato.
 * @param {string} relatoId - UUID do relato.
 * @param {string} userId - UUID do usuário.
 * @param {string} texto - Conteúdo do comentário.
 * @returns {Promise<{success: boolean, data?: any, error?: string}>}
 */
export async function adicionarComentario(relatoId, userId, texto) {
  if (!userId || !relatoId || !texto) {
    return { success: false, error: 'Dados insuficientes' };
  }

  try {
    const payload = {
      relato_id: relatoId,
      user_id: userId,
      texto: texto
    };

    const { data, error } = await supabase
      .from('comentarios')
      .insert([payload])
      .select()
      .single();

    if (error) throw error;

    // Buscar profile do usuário para retornar nome e role imediatamente
    const { data: prof } = await supabase
      .from('profiles')
      .select('nome_completo, role')
      .eq('id', userId)
      .maybeSingle();

    return { 
      success: true, 
      data: {
        ...data,
        authorName: prof?.nome_completo || "Você",
        authorRole: prof?.role || "user"
      } 
    };
  } catch (err) {
    console.error("Erro ao adicionar comentário:", err);
    return { success: false, error: err.message };
  }
}

/**
 * Envia uma denúncia de relato para a tabela `denuncias` no Supabase.
 * @param {string} relatoId 
 * @param {string|null} userId 
 * @param {string} motivo 
 * @param {string} [descricao=''] 
 * @returns {Promise<{success: boolean, error?: any}>}
 */
export async function denunciarRelato(relatoId, userId, motivo, descricao = '') {
  try {
    const payload = { 
      relato_id: relatoId, 
      motivo, 
      descricao 
    };
    if (userId) {
      payload.user_id = userId;
    }

    const { data, error } = await supabase
      .from('denuncias')
      .insert([payload]);

    if (error) throw error;

    return { success: true, data };
  } catch (err) {
    console.error("Erro ao enviar denúncia:", err);
    return { success: false, error: err.message || err };
  }
}
