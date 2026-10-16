/**
 * Polyfills de runtime para WebKit legado (iOS/Safari 15.x).
 *
 * O core-js (injetado pelo @vitejs/plugin-legacy) cobre recursos de linguagem
 * (Array.prototype.at, Object.hasOwn, etc.), mas NÃO cobre APIs de DOM/Web.
 * Dependências como @google/genai chamam `AbortSignal.timeout()` sem checar
 * suporte (Safari >= 16), o que quebra a requisição em silêncio no iOS 15.
 *
 * Deve ser o primeiro import de src/main.jsx.
 */

if (typeof AbortSignal !== 'undefined') {
  if (typeof AbortSignal.timeout !== 'function') {
    AbortSignal.timeout = function timeout(ms) {
      const controller = new AbortController()
      setTimeout(() => {
        const reason =
          typeof DOMException === 'function'
            ? new DOMException('The operation timed out.', 'TimeoutError')
            : new Error('The operation timed out.')
        controller.abort(reason)
      }, ms)
      return controller.signal
    }
  }

  if (typeof AbortSignal.any !== 'function') {
    AbortSignal.any = function any(signals) {
      const controller = new AbortController()
      const list = Array.from(signals)
      const onAbort = (event) => {
        cleanup()
        controller.abort(event.target.reason)
      }
      const cleanup = () => list.forEach((s) => s.removeEventListener('abort', onAbort))

      for (const signal of list) {
        if (signal.aborted) {
          controller.abort(signal.reason)
          return controller.signal
        }
      }
      list.forEach((s) => s.addEventListener('abort', onAbort, { once: true }))
      return controller.signal
    }
  }
}

// AbortController.abort(reason) / signal.reason / throwIfAborted() (Safari 15.4+ / 15.0)
if (typeof AbortSignal !== 'undefined' && !('throwIfAborted' in AbortSignal.prototype)) {
  AbortSignal.prototype.throwIfAborted = function throwIfAborted() {
    if (this.aborted) throw this.reason
  }
}

// structuredClone (Safari 15.4+): usado por @google/genai para clonar o histórico do chat
// (dados JSON-serializáveis). Fallback leve para evitar carregar o polyfill completo do core-js.
if (typeof globalThis.structuredClone !== 'function') {
  globalThis.structuredClone = function structuredClone(value) {
    return value === undefined ? undefined : JSON.parse(JSON.stringify(value))
  }
}
