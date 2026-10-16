import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import legacy from '@vitejs/plugin-legacy'

// Piso de compatibilidade (mantenha em sincronia com .browserslistrc)
const MODERN_TARGETS = ['ios >= 15', 'safari >= 15']

// Apenas o que o WebKit 15.0-15.3 não tem e o app/dependências usam. O iOS >= 15.4
// (inclui o iOS 15.8 do iPhone 7 Plus) já traz tudo isso nativamente.
const MODERN_POLYFILLS = [
  'es.array.at',
  'es.array.find-last',
  'es.array.find-last-index',
  'es.string.at-alternative',
  'es.object.has-own',
]

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    // O iOS 15 já executa ES Modules nativamente, então NÃO geramos bundle legado
    // (SystemJS). O plugin é usado apenas para injetar, via <script type="module">,
    // um chunk de polyfills core-js calculado pelo uso real no bundle e pelo piso
    // acima. Navegadores modernos o baixam (poucos KB) e o core-js só aplica o que falta.
    legacy({
      renderLegacyChunks: false,
      modernTargets: MODERN_TARGETS,
      modernPolyfills: MODERN_POLYFILLS,
    }),
  ],
  build: {
    // Lightning CSS (minificador padrão do Vite 8) rebaixa a sintaxe de CSS para estes alvos.
    cssTarget: ['safari15', 'ios15', 'chrome90', 'edge90', 'firefox90'],
  },
})
