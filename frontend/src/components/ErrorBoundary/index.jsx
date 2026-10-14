import React from 'react';
import { AlertTriangle, RotateCcw, Home } from 'lucide-react';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary capturou um erro não tratado:', error, errorInfo);

    // Se for erro de carregamento de chunk (comum em redes móveis instáveis ou novos deploys)
    const isChunkError =
      error?.message?.includes('Failed to fetch dynamically imported module') ||
      error?.name === 'ChunkLoadError' ||
      error?.message?.includes('dynamically imported module') ||
      error?.message?.includes('Loading chunk');

    if (isChunkError && typeof window !== 'undefined') {
      const lastReload = sessionStorage.getItem('rt_chunk_reload_ts');
      const now = Date.now();
      // Recarrega automaticamente uma única vez se o último reload ocorreu há mais de 10s
      if (!lastReload || now - Number(lastReload) > 10000) {
        sessionStorage.setItem('rt_chunk_reload_ts', String(now));
        window.location.reload();
      }
    }
  }

  handleReload = () => {
    window.location.reload();
  };

  handleGoHome = () => {
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#F9FAFB] dark:bg-[#09090B] text-zinc-900 dark:text-zinc-50 flex items-center justify-center p-4 font-sans">
          <div className="max-w-md w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 sm:p-8 shadow-xl text-center">
            <div className="w-16 h-16 rounded-2xl bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 flex items-center justify-center mx-auto mb-5 shadow-sm">
              <AlertTriangle className="h-8 w-8" />
            </div>

            <h2 className="text-xl sm:text-2xl font-black mb-2 text-zinc-900 dark:text-white">
              Algo inesperado aconteceu
            </h2>

            <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 mb-6 leading-relaxed">
              Não foi possível carregar a tela completamente. Isso pode ocorrer por oscilações temporárias de conexão no celular ou atualização dos dados.
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={this.handleReload}
                className="flex-1 py-3 px-4 rounded-xl font-bold text-white bg-red-600 hover:bg-red-700 transition-colors shadow-md shadow-red-500/20 flex items-center justify-center gap-2 text-sm cursor-pointer"
              >
                <RotateCcw className="h-4 w-4" />
                Recarregar
              </button>
              <button
                onClick={this.handleGoHome}
                className="flex-1 py-3 px-4 rounded-xl font-bold text-zinc-700 dark:text-zinc-300 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors border border-zinc-200 dark:border-zinc-700 flex items-center justify-center gap-2 text-sm cursor-pointer"
              >
                <Home className="h-4 w-4" />
                Início
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
