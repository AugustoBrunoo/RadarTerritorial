import { supabase } from '../lib/supabaseClient'; // Ajuste o caminho conforme seu projeto

/**
 * Cadastra um novo cidadão no Supabase Auth.
 * Envia o e-mail de confirmação estilizado e salva metadados do usuário.
 */
export async function signUpUser({ email, password, nomeCompleto }) {
  try {
    const redirectUrl = `${window.location.origin}/confirmacao-sucesso`;
    const cleanName = (nomeCompleto || '').trim();

    const { data, error } = await supabase.auth.signUp({
      email: email.trim(),
      password,
      options: {
        emailRedirectTo: redirectUrl,
        data: {
          nome_completo: cleanName,
          name: cleanName,
          full_name: cleanName,
          username: cleanName,
          nome: cleanName,
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
    let profile = await getUserProfile(data.user.id);

    // Auto-recuperação: se o perfil no banco estiver com o fallback 'Cidadão' ou nulo,
    // mas o usuário possui nome nos metadados de autenticação, sincroniza com a tabela profiles
    const metadataName = data.user.user_metadata?.nome_completo ||
                         data.user.user_metadata?.name ||
                         data.user.user_metadata?.full_name ||
                         data.user.user_metadata?.username;

    if (metadataName && (!profile?.nome_completo || profile.nome_completo === 'Cidadão')) {
      const { data: updatedProfile } = await supabase
        .from('profiles')
        .update({ nome_completo: metadataName })
        .eq('id', data.user.id)
        .select()
        .maybeSingle();

      if (updatedProfile) {
        profile = updatedProfile;
      }
    }

    // Avalia se é o primeiro acesso (se não estiver false explicitly, consideramos true para novas contas)
    // Primeiro checa user_metadata, depois o profile.
    let isFirstAccess = true;
    if (data.user.user_metadata?.primeiro_acesso === false) {
      isFirstAccess = false;
    } else if (profile?.primeiro_acesso === false) {
      isFirstAccess = false;
    }

    if (typeof window !== 'undefined') {
      // Remove qualquer chave global legada para não interferir entre contas diferentes
      localStorage.removeItem('primeiro_acesso_concluido');

      if (!isFirstAccess) {
        localStorage.setItem(`primeiro_acesso_concluido_${data.user.id}`, 'true');
      } else {
        localStorage.removeItem(`primeiro_acesso_concluido_${data.user.id}`);
      }
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

    const metaName = user.user_metadata?.nome_completo ||
                     user.user_metadata?.name ||
                     user.user_metadata?.full_name ||
                     user.user_metadata?.username;

    const profileUpdates = { primeiro_acesso: false };
    if (metaName) {
      profileUpdates.nome_completo = metaName;
    }

    // Tenta atualizar na tabela profiles (pode falhar por RLS dependendo da config)
    const { error: profileError } = await supabase
      .from('profiles')
      .update(profileUpdates)
      .eq('id', user.id);

    // Garante a atualização no user_metadata do Auth (não sofre bloqueio de RLS)
    const authDataUpdates = { primeiro_acesso: false };
    if (metaName) {
      authDataUpdates.nome_completo = metaName;
      authDataUpdates.name = metaName;
      authDataUpdates.full_name = metaName;
    }

    const { error: authError } = await supabase.auth.updateUser({
      data: authDataUpdates
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
 * Verifica se o usuário autenticado já concluiu o primeiro acesso.
 * Retorna true caso já tenha concluído (impedindo acesso à tela /bem-vindo).
 */
export async function isFirstAccessCompleted() {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return true;

    if (typeof window !== 'undefined') {
      // Remove chave global legada para não interferir entre usuários no mesmo aparelho
      localStorage.removeItem('primeiro_acesso_concluido');
      if (localStorage.getItem(`primeiro_acesso_concluido_${user.id}`) === 'true') {
        return true;
      }
    }

    if (user.user_metadata?.primeiro_acesso === false) {
      if (typeof window !== 'undefined') {
        localStorage.setItem(`primeiro_acesso_concluido_${user.id}`, 'true');
      }
      return true;
    }

    const { data: profile } = await supabase
      .from('profiles')
      .select('primeiro_acesso')
      .eq('id', user.id)
      .maybeSingle();

    if (profile?.primeiro_acesso === false) {
      if (typeof window !== 'undefined') {
        localStorage.setItem(`primeiro_acesso_concluido_${user.id}`, 'true');
      }
      return true;
    }

    return false;
  } catch (error) {
    console.error('Erro ao verificar primeiro acesso:', error);
    return false;
  }
}

/**
 * Encerra a sessão do usuário
 */
export async function signOutUser() {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('primeiro_acesso_concluido');
  }
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
