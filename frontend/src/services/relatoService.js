import { supabase } from '../lib/supabaseClient';

/**
 * Envia um relato para a tabela `relatos` no Supabase.
 * @param {Object} dadosFormulario - Dados montados pelo formulário de relato.
 * @param {boolean} modoAnonimo - Flag indicando se o envio é anônimo.
 * @returns {Promise<{success: boolean, data?: any, error?: string}>}
 */
export async function enviarOcorrencia(dadosFormulario, modoAnonimo) {
  try {
    let finalUserId = null;

    // 1. Checagem de Autenticação
    if (!modoAnonimo) {
      const { data: { user }, error: authError } = await supabase.auth.getUser();
      
      if (authError || !user) {
        return { 
          success: false, 
          error: "É necessário estar autenticado para enviar um relato identificado." 
        };
      }
      finalUserId = user.id;
    }

    // 2. Validação do Enum tipo_loc
    let validTipoLoc = 'manual';
    if (dadosFormulario.tipo_loc === 'gps') {
      validTipoLoc = 'gps';
    }

    // 3. Montagem do payload final
    const payload = {
      ...dadosFormulario,
      user_id: finalUserId,
      is_anonimo: modoAnonimo,
      tipo_loc: validTipoLoc,
    };

    // Remove is_anonymous se existir acidentalmente no payload inicial
    if ('is_anonymous' in payload) {
      delete payload.is_anonymous;
    }

    // 4. Inserção no Banco
    const { data, error } = await supabase
      .from('relatos') // NOME_DA_SUA_TABELA
      .insert([payload])
      .select();

    // 5. Tratamento de Erros e Retorno
    if (error) {
      console.error("Erro no Supabase ao inserir relato:", error);
      return { success: false, error: error.message };
    }

    return { success: true, data };

  } catch (err) {
    console.error("Erro inesperado em enviarOcorrencia:", err);
    return { success: false, error: err.message || "Erro desconhecido ao processar o envio." };
  }
}
