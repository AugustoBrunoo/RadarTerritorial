import { supabase } from '../lib/supabaseClient'; // Ajuste o caminho conforme seu projeto

/**
 * Cadastra um novo cidadão no Supabase Auth.
 * Envia o e-mail de confirmação estilizado e salva metadados do usuário.
 */
export async function signUpUser({ email, password, nomeCompleto }) {
  try {
    const redirectUrl = `${window.location.origin}/confirmacao-sucesso`;

    const { data, error } = await supabase.auth.signUp({
      email: email.trim(),
      password,
      options: {
        emailRedirectTo: redirectUrl,
        data: {
          nome_completo: nomeCompleto.trim(),
        }
      }
    });

    if (error) throw error;

    // Trava de e-mail duplicado do Supabase (identities retorna [] quando o e-mail já existe)
    if (data.user && data.user.identities && data.user.identities.length === 0) {
      return {
        success: false,
        isDuplicate: true,
        error: 'Este e-mail já está cadastrado no Radar Territorial.'
      };
    }

    return {
      success: true,
      user: data.user,
      session: data.session,
      // Se a sessão for null, significa que a confirmação de e-mail é obrigatória
      requiresEmailConfirmation: !data.session
    };
  } catch (error) {
    console.error('Erro no cadastro:', error.message);
    return {
      success: false,
      error: formatAuthError(error)
    };
  }
}

/**
 * Realiza o login do usuário com Email e Senha.
 * Busca os dados do perfil na tabela `profiles`.
 */
export async function signInUser({ email, password }) {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password
    });

    if (error) throw error;

    // Busca o perfil na tabela 'profiles'
    const profile = await getUserProfile(data.user.id);

    // Avalia se é o primeiro acesso (se não estiver false explicitly, consideramos true para novas contas)
    // Primeiro checa user_metadata, depois o profile.
    let isFirstAccess = true;
    if (data.user.user_metadata?.primeiro_acesso === false) {
      isFirstAccess = false;
    } else if (profile?.primeiro_acesso === false) {
      isFirstAccess = false;
    }

    return {
      success: true,
      user: data.user,
      profile,
      isFirstAccess,
      session: data.session
    };
  } catch (error) {
    console.error('Erro no login:', error.message);
    return {
      success: false,
      error: formatAuthError(error)
    };
  }
}

/**
 * Reenvia o e-mail de confirmação para o cidadão caso ele não tenha recebido.
 */
export async function resendConfirmationEmail(email) {
  try {
    const redirectUrl = `${window.location.origin}/confirmacao-sucesso`;
    const { error } = await supabase.auth.resend({
      type: 'signup',
      email: email.trim(),
      options: {
        emailRedirectTo: redirectUrl
      }
    });

    if (error) throw error;

    return { success: true };
  } catch (error) {
    console.error('Erro ao reenviar e-mail:', error.message);
    return { success: false, error: formatAuthError(error) };
  }
}

/**
 * Busca os dados do perfil do usuário na tabela 'profiles'
 */
export async function getUserProfile(userId) {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .maybeSingle();

    if (error) throw error;
    return data;
  } catch (error) {
    console.warn('Não foi possível carregar o perfil:', error.message);
    return null;
  }
}

/**
 * Atualiza o status de primeiro acesso do usuário para false
 */
export async function completeFirstAccess() {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return false;

    // Tenta atualizar na tabela profiles (pode falhar por RLS dependendo da config)
    const { error: profileError } = await supabase
      .from('profiles')
      .update({ primeiro_acesso: false })
      .eq('id', user.id);

    // Garante a atualização no user_metadata do Auth (não sofre bloqueio de RLS)
    const { error: authError } = await supabase.auth.updateUser({
      data: { primeiro_acesso: false }
    });

    if (profileError && authError) {
      console.error('Falha dupla ao atualizar primeiro acesso');
    }
    
    return true;
  } catch (error) {
    console.error('Erro ao atualizar primeiro acesso:', error.message);
    return false;
  }
}

/**
 * Encerra a sessão do usuário
 */
export async function signOutUser() {
  const { error } = await supabase.auth.signOut();
  if (error) console.error('Erro ao sair:', error.message);
}

/**
 * Tradutor de mensagens de erro do Supabase para Português
 */
function formatAuthError(error) {
  const msg = error.message ? error.message.toLowerCase() : '';

  if (msg.includes('user already registered') || msg.includes('already exists')) {
    return 'Este e-mail já está cadastrado. Tente fazer login ou recupere sua senha.';
  }
  if (msg.includes('email not confirmed')) {
    return 'Seu e-mail ainda não foi confirmado. Verifique sua caixa de entrada e clique no link enviado.';
  }
  if (msg.includes('invalid login credentials') || msg.includes('invalid_grant')) {
    return 'E-mail ou senha incorretos. Verifique seus dados e tente novamente.';
  }
  if (msg.includes('password should be at least')) {
    return 'A senha deve ter pelo menos 6 caracteres.';
  }

  return error.message || 'Ocorreu um erro ao processar sua solicitação. Tente novamente.';
}
