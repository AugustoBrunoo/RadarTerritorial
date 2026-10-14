/**
 * Utilitário de Navegação Segura para o Radar Territorial.
 * 
 * Evita o problema crítico em que chamadas diretas a `navigate(-1)` ou `history.back()`
 * quando o usuário entrou diretamente por URL, atualizou a página, ou está em modo PWA/Mobile
 * levam a uma tela branca/preta ou para a página especial `about:blank`.
 */

export function safeNavigateBack(navigate, fallback = '/') {
  try {
    if (
      typeof window !== 'undefined' &&
      window.history &&
      window.history.state &&
      typeof window.history.state.idx === 'number' &&
      window.history.state.idx > 0
    ) {
      navigate(-1);
      return;
    }
  } catch (err) {
    console.warn('Erro ao inspecionar histórico de navegação:', err);
  }

  // Se não há histórico seguro dentro da aplicação, redireciona para a rota padrão
  navigate(fallback || '/', { replace: true });
}
