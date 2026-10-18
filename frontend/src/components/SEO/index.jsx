import { useEffect } from 'react';
import { useLocation } from 'react-router';

const DEFAULT_TITLE = 'Radar Territorial | Zeladoria Urbana Inteligente';
const DEFAULT_DESCRIPTION = 'Plataforma inteligente de zeladoria urbana, indicadores locais e participação comunitária colaborativa para Campo Grande e Zona Oeste do Rio de Janeiro.';
const SITE_URL = 'https://radar-territorial.vercel.app';
const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.jpg`;

/**
 * Componente unificado de SEO para React SPA
 * Atualiza dinamicamente título, meta description, canonical, Open Graph, Twitter Cards e Schema JSON-LD
 */
export default function SEO({
  title,
  description = DEFAULT_DESCRIPTION,
  canonical,
  ogImage = DEFAULT_OG_IMAGE,
  ogType = 'website',
  noindex = false,
  jsonLd,
}) {
  const location = useLocation();

  useEffect(() => {
    // 1. Título do Documento
    const fullTitle = title 
      ? (title.includes('Radar Territorial') ? title : `${title} | Radar Territorial`)
      : DEFAULT_TITLE;
    document.title = fullTitle;

    // Helper para atualizar ou criar meta tag por atributo (name ou property)
    const setMetaTag = (attr, key, content) => {
      if (!content) return;
      let el = document.querySelector(`meta[${attr}="${key}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attr, key);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    // Helper para atualizar ou criar link tag (ex: canonical)
    const setLinkTag = (rel, href) => {
      if (!href) return;
      let el = document.querySelector(`link[rel="${rel}"]`);
      if (!el) {
        el = document.createElement('link');
        el.setAttribute('rel', rel);
        document.head.appendChild(el);
      }
      el.setAttribute('href', href);
    };

    // 2. Canonical URL
    const canonicalUrl = canonical
      ? (canonical.startsWith('http') ? canonical : `${SITE_URL}${canonical}`)
      : `${SITE_URL}${location.pathname}`;
    setLinkTag('canonical', canonicalUrl);

    // 3. Meta Description
    setMetaTag('name', 'description', description);

    // 4. Robots Directives
    const robotsContent = noindex
      ? 'noindex, nofollow'
      : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1';
    setMetaTag('name', 'robots', robotsContent);

    // 5. Open Graph
    setMetaTag('property', 'og:title', fullTitle);
    setMetaTag('property', 'og:description', description);
    setMetaTag('property', 'og:url', canonicalUrl);
    setMetaTag('property', 'og:image', ogImage);
    setMetaTag('property', 'og:image:secure_url', ogImage);
    setMetaTag('property', 'og:image:type', 'image/jpeg');
    setMetaTag('property', 'og:image:width', '1200');
    setMetaTag('property', 'og:image:height', '675');
    setMetaTag('property', 'og:image:alt', fullTitle);
    setMetaTag('property', 'og:type', ogType);
    setMetaTag('property', 'og:site_name', 'Radar Territorial');
    setMetaTag('property', 'og:locale', 'pt_BR');

    // 6. Twitter Card
    setMetaTag('name', 'twitter:card', 'summary_large_image');
    setMetaTag('name', 'twitter:title', fullTitle);
    setMetaTag('name', 'twitter:description', description);
    setMetaTag('name', 'twitter:image', ogImage);
    setMetaTag('name', 'twitter:image:alt', fullTitle);

    // 7. Structured Data (JSON-LD dinâmico por página)
    let scriptEl = document.getElementById('page-structured-data');
    if (jsonLd) {
      if (!scriptEl) {
        scriptEl = document.createElement('script');
        scriptEl.id = 'page-structured-data';
        scriptEl.type = 'application/ld+json';
        document.head.appendChild(scriptEl);
      }
      scriptEl.textContent = JSON.stringify(jsonLd);
    } else if (scriptEl) {
      scriptEl.remove();
    }

    return () => {
      // Limpeza de script dinâmico ao desmontar página
      const dynamicScript = document.getElementById('page-structured-data');
      if (dynamicScript) {
        dynamicScript.remove();
      }
    };
  }, [title, description, canonical, ogImage, ogType, noindex, jsonLd, location.pathname]);

  return null;
}
