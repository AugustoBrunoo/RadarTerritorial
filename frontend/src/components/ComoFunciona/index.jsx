import React from 'react';

export default function ComoFunciona() {
    return (
        <section id="como-funciona" className="pt-24 pb-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            <div className="mb-16 md:flex md:justify-between md:items-end">
                <div>
                    <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-4">A Dinâmica.</h2>
                    <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-md">
                        Desenhado para ser totalmente intuitivo. Do seu olhar nas ruas direto para o mapa de soluções.
                    </p>
                </div>
                <div className="hidden md:block">
                    <span className="text-red-600 font-bold tracking-widest uppercase text-sm flex items-center gap-2">
                        <i data-lucide="activity" className="h-4 w-4"></i> Fluxo em Tempo Real
                    </span>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 auto-rows-[minmax(280px,auto)]">
                <div
                    className="md:col-span-5 bg-white dark:bg-zinc-900 rounded-[2rem] p-8 border border-zinc-200 dark:border-zinc-800 flex flex-col justify-between group hover:border-red-500/50 transition-colors">
                    <div
                        className="w-14 h-14 bg-zinc-100 dark:bg-zinc-800 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                        <i data-lucide="smartphone" className="h-6 w-6 text-zinc-900 dark:text-white"></i>
                    </div>
                    <div>
                        <span className="text-red-600 font-bold text-sm mb-2 block">PASSO 01</span>
                        <h3 className="text-2xl font-bold mb-3">Acesse ou Escaneie</h3>
                        <p className="text-zinc-600 dark:text-zinc-400 text-base leading-relaxed">
                            Abra o site diretamente no seu celular em qualquer lugar da Zona Oeste ou, se preferir, aponte a
                            câmera para os nossos QR Codes fixados pela Nave do Conhecimento e comércios locais.
                        </p>
                    </div>
                </div>

                <div
                    className="md:col-span-7 bg-zinc-900 dark:bg-zinc-800 rounded-[2rem] p-8 border border-zinc-800 dark:border-zinc-700 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 -mt-20 -mr-20 w-64 h-64 bg-red-600/20 blur-3xl rounded-full"></div>
                    <div className="relative z-10 flex flex-col h-full justify-between">
                        <div className="flex justify-between items-start mb-6">
                            <div className="w-14 h-14 bg-red-600 rounded-2xl flex items-center justify-center">
                                <i data-lucide="sparkles" className="h-6 w-6 text-white"></i>
                            </div>
                        </div>
                        <div>
                            <span className="text-red-400 font-bold text-sm mb-2 block">PASSO 02</span>
                            <h3 className="text-3xl font-bold text-white mb-3">Relate como preferir.</h3>
                            <p className="text-zinc-400 max-w-xl text-base mb-6 leading-relaxed">
                                Esqueça burocracias. Escolha o formato de relatório que melhor se adapta à sua pressa no
                                momento do registro:
                            </p>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
                                <div className="bg-white/5 border border-white/10 rounded-2xl p-4 flex items-start gap-3">
                                    <div className="bg-white/10 p-2 rounded-xl text-red-400">
                                        <i data-lucide="check-square" className="h-4 w-4"></i>
                                    </div>
                                    <div>
                                        <p className="text-white text-sm font-bold">Formulário Rápido</p>
                                        <p className="text-zinc-400 text-xs mt-0.5">Campos pré-selecionados para registrar em
                                            segundos.</p>
                                    </div>
                                </div>
                                <div className="bg-white/5 border border-white/10 rounded-2xl p-4 flex items-start gap-3">
                                    <div className="bg-white/10 p-2 rounded-xl text-red-400">
                                        <i data-lucide="message-square-text" className="h-4 w-4"></i>
                                    </div>
                                    <div>
                                        <p className="text-white text-sm font-bold">Texto Livre + IA</p>
                                        <p className="text-zinc-400 text-xs mt-0.5">Escreva livremente e nossa IA detecta e
                                            preenche as informações.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div
                    className="md:col-span-12 bg-gradient-to-br from-red-500 via-red-600 to-red-800 rounded-[2rem] p-8 sm:p-12 border border-red-500/30 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl shadow-red-950/20">

                    <div className="relative z-10 md:w-1/2 text-white">
                        <span className="text-red-200 font-bold text-sm mb-2 block">PASSO 03</span>
                        <h3 className="text-4xl font-black mb-4 tracking-tight">Comunidade <br />e Ação.</h3>
                        <p className="text-red-100 text-lg mb-8 leading-relaxed">
                            Sua participação gera transparência imediata. O relato gera dados no painel dos gestores e vai
                            direto para a lista pública onde todos podem apoiar, interagir e acompanhar cada etapa de
                            resolução.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <a href="#dashboard"
                                className="bg-white text-red-600 px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-zinc-100 transition-colors shadow-lg shadow-black/10">
                                Painel Público <i data-lucide="bar-chart-3" className="h-4 w-4"></i>
                            </a>
                            <a href="./pages/Feed/NaoLogado/v1.html"
                                className="bg-red-900/40 text-white border border-white/10 px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-red-900/60 transition-colors">
                                Ver Recentes <i data-lucide="message-square" className="h-4 w-4"></i>
                            </a>
                        </div>
                    </div>

                    <div
                        className="md:w-1/2 w-full bg-gradient-to-b from-zinc-900 via-zinc-950 to-zinc-950 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.7)] p-4 sm:p-6 rounded-2xl border border-zinc-800/80 flex flex-col gap-4">

                        <div className="bg-zinc-900/50 p-4 rounded-xl border border-zinc-800/60 backdrop-blur-sm">
                            <div className="flex justify-between items-center mb-3">
                                <div>
                                    <p className="text-red-500 text-xs uppercase tracking-wider font-bold">Relatório de Soluções
                                    </p>
                                    <p className="text-xl font-black text-white">Campo Grande, ZO</p>
                                </div>
                            </div>
                            <div className="w-full bg-zinc-800 h-2 rounded-full overflow-hidden">
                                <div className="bg-gradient-to-r from-emerald-600 to-emerald-400 h-full w-[78%]"></div>
                            </div>
                            <div className="flex justify-between text-xs text-zinc-400 mt-2">
                                <span>78% de problemas resolvidos</span>
                                <span className="font-bold text-white">1.204 Resolvidos</span>
                            </div>
                        </div>

                        <div className="bg-zinc-900/50 p-4 rounded-xl border border-zinc-800/60 backdrop-blur-sm">
                            <p
                                className="text-zinc-400 text-xs uppercase tracking-wider font-bold mb-3 flex items-center gap-2">
                                <i data-lucide="users" className="h-3 w-3"></i> Atualizações de Ocorrências
                            </p>
                            <div className="space-y-3">
                                <div
                                    className="flex items-start justify-between gap-2 sm:gap-3 bg-zinc-950/40 p-2.5 rounded-lg border border-zinc-900">
                                    <div className="flex items-start gap-2.5 sm:gap-3 flex-1 min-w-0">
                                        <div
                                            className="w-8 h-8 rounded-full bg-amber-500/10 flex items-center justify-center flex-shrink-0">
                                            <i data-lucide="alert-triangle" className="h-4 w-4 text-amber-500"></i>
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-white text-xs sm:text-sm font-bold leading-tight line-clamp-2">
                                                Vazamento na Estrada do Campinho</p>
                                            <p className="text-zinc-500 text-[11px] sm:text-xs mt-0.5">Apoio: 15 vizinhos</p>
                                        </div>
                                    </div>
                                    <span
                                        className="flex-shrink-0 whitespace-nowrap bg-amber-500/10 text-amber-400 text-[10px] font-bold px-2 py-0.5 rounded border border-amber-500/20 mt-0.5">
                                        Em Execução
                                    </span>
                                </div>

                                <div
                                    className="flex items-start justify-between gap-2 sm:gap-3 bg-zinc-950/40 p-2.5 rounded-lg border border-zinc-900">
                                    <div className="flex items-start gap-2.5 sm:gap-3 flex-1 min-w-0">
                                        <div
                                            className="w-8 h-8 rounded-full bg-emerald-500/10 flex items-center justify-center flex-shrink-0">
                                            <i data-lucide="check" className="h-4 w-4 text-emerald-500"></i>
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-white text-xs sm:text-sm font-bold leading-tight line-clamp-2">
                                                Postes sem luz na Rua das Flores</p>
                                            <p className="text-zinc-500 text-[11px] sm:text-xs mt-0.5">Finalizado pela equipe
                                                local</p>
                                        </div>
                                    </div>
                                    <span
                                        className="flex-shrink-0 whitespace-nowrap bg-emerald-500/10 text-emerald-400 text-[10px] font-bold px-2 py-0.5 rounded border border-emerald-500/20 mt-0.5">
                                        Resolvido
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
}
