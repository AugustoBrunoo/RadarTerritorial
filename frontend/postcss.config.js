/* global process */
import tailwindcss from '@tailwindcss/postcss'
import postcssPresetEnv from 'postcss-preset-env'
import autoprefixer from 'autoprefixer'

/**
 * Fallback encadeado para unidades de viewport dinâmicas.
 * Para qualquer declaração com dvh/svh/lvh (ex.: classes de altura dinâmica ou
 * `calc(100dvh - 4rem)` inline), insere ANTES a mesma declaração em `vh`/`vw`.
 * Navegadores sem suporte (WebKit < 15.4 / ambientes legados) descartam a
 * segunda e usam a primeira; os modernos continuam usando a dinâmica.
 */
const viewportUnitFallback = () => {
  const DYNAMIC_UNIT = /(\d*\.?\d+)(?:d|s|l)(v[hw]|vmin|vmax)\b/g
  return {
    postcssPlugin: 'viewport-unit-fallback',
    Declaration(decl) {
      if (decl.prop.startsWith('--') || !DYNAMIC_UNIT.test(decl.value)) return
      DYNAMIC_UNIT.lastIndex = 0

      const fallback = decl.value.replace(DYNAMIC_UNIT, '$1$2')
      const prev = decl.prev()
      if (prev && prev.type === 'decl' && prev.prop === decl.prop && prev.value === fallback) return

      decl.cloneBefore({ value: fallback })
    },
  }
}
viewportUnitFallback.postcss = true

const isBuild = process.env.NODE_ENV === 'production'

export default {
  plugins: [
    // 1. Tailwind v4 gera o CSS (e já aplica seu próprio Lightning CSS).
    tailwindcss(),

    // 2. Somente no `vite dev`: transpila CSS moderno para o piso do .browserslistrc
    //    (iOS/Safari 15): media queries de intervalo (`width >= 40rem`), oklch/oklab/lab,
    //    color-mix e rgb(from ...) estáticos, nesting etc. `preserve` mantém a versão
    //    moderna logo após o fallback, então os navegadores novos não perdem nada.
    //    No `vite build` essa etapa é feita pelo Lightning CSS do Vite (build.cssTarget),
    //    que gera hex + display-p3 + lab com fidelidade exata das cores do Tailwind;
    //    repetir aqui apenas geraria microvariações nos fallbacks.
    ...(isBuild
      ? []
      : [
          postcssPresetEnv({
            stage: 2,
            autoprefixer: false, // aplicado explicitamente (e por último) abaixo
            features: {
              // Achatar @layer altera especificidade e infla o CSS em TODOS os navegadores.
              // iOS >= 15.4 já suporta @layer nativamente (iPhone 7 Plus vai até o 15.8).
              'cascade-layers': false,
            },
          }),
        ]),

    // 3. Fallbacks de dvh/svh/lvh -> vh.
    viewportUnitFallback(),

    // 4. Autoprefixer SEMPRE por último (-webkit-backdrop-filter, etc.).
    autoprefixer(),
  ],
}
