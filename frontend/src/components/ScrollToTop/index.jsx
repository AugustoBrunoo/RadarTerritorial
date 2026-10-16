import { useEffect, useLayoutEffect } from 'react';
import { useLocation } from 'react-router';

// useLayoutEffect executa antes do browser pintar a tela, eliminando "flashes" visuais
const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

/**
 * Componente global de restauração de scroll.
 * 
 * Em Single Page Applications (SPAs) com React Router, a troca de rotas via <Link>
 * ou navigate() por padrão preserva a posição de scroll da página anterior.
 * Se o usuário rolar a página inicial até o final e clicar em "Ver Feed" ou "Painel Público",
 * o navegador manteria a rolagem lá embaixo na nova página.
 * 
 * Este componente monitora a rota atual e reseta a posição de rolagem para o topo (0, 0)
 * em toda navegação, ou rola até o elemento âncora caso haja uma hash (#secao).
 */
export default function ScrollToTop() {
  const { pathname, search, hash } = useLocation();

  useIsomorphicLayoutEffect(() => {
    // Desativa a restauração automática nativa do histórico do navegador
    // para evitar conflitos com a renderização dinâmica do React/SPA
    if (typeof window !== 'undefined' && 'scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    // Se houver hash na URL (ex: #como-funciona), rola suavemente até o elemento
    if (hash) {
      const targetId = decodeURIComponent(hash.replace('#', ''));
      const scrollToHash = () => {
        const element = document.getElementById(targetId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
          return true;
        }
        return false;
      };

      if (!scrollToHash()) {
        // Caso a rota esteja carregando via Suspense / lazy import, tenta novamente após montagem
        const timer = setTimeout(scrollToHash, 100);
        return () => clearTimeout(timer);
      }
      return;
    }

    // Sem hash: rola instantaneamente para o topo
    const resetScroll = () => {
      const html = document.documentElement;
      const prevBehavior = html.style.scrollBehavior;
      
      // Desativa temporariamente o scroll-behavior smooth global do CSS
      // para evitar transições lentas ou engasgos na troca de página
      html.style.scrollBehavior = 'auto';

      window.scrollTo(0, 0);
      if (document.body) {
        document.body.scrollTop = 0;
      }
      html.scrollTop = 0;

      // Restaura o scroll-behavior original na próxima animação de quadro
      requestAnimationFrame(() => {
        html.style.scrollBehavior = prevBehavior;
      });
    };

    resetScroll();

    // Garante que trocas de rotas assíncronas / lazy components também fiquem no topo
    const rafId = requestAnimationFrame(resetScroll);

    return () => cancelAnimationFrame(rafId);
  }, [pathname, search, hash]);

  return null;
}
