import React from 'react';

export default function Ecossistema() {
    return (
        <section id="projetos-jcc" className="py-24 border-t border-zinc-200 dark:border-zinc-800/80 overflow-hidden relative">

            <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col items-center text-center mb-16">

                <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight mb-6" style={{ textWrap: 'balance' }}>
                    Inovação nascida em <span className="text-red-600">Campo Grande.</span>
                </h2>

                <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto"
                    style={{ textWrap: 'balance' }}>
                    O Radar Territorial é apenas uma das soluções criadas na Nave do Conhecimento. Explore outras
                    iniciativas tecnológicas desenvolvidas por outros Jovens Cientistas Cariocas para a própria Zona Oeste.
                </p>
            </div>

            <div
                className="absolute left-0 top-0 bottom-0 w-8 md:w-32 bg-gradient-to-r from-[#F9FAFB] to-transparent dark:from-[#09090B] z-10 pointer-events-none mt-40">
            </div>
            <div
                className="absolute right-0 top-0 bottom-0 w-8 md:w-32 bg-gradient-to-l from-[#F9FAFB] to-transparent dark:from-[#09090B] z-10 pointer-events-none mt-40">
            </div>

            <div className="relative w-full flex overflow-x-hidden group">
                <div className="flex gap-6 w-max animate-marquee group-hover:[animation-play-state:paused] px-6">
                    {/* Projeto 1 */}
                    <div
                        className="w-[320px] bg-white dark:bg-zinc-900 rounded-3xl p-6 border border-zinc-200 dark:border-zinc-800 flex flex-col justify-between flex-shrink-0 transition-all hover:border-red-500/50 hover:shadow-xl">
                        <div>
                            <div className="flex items-center gap-3 mb-5 pb-5 border-b border-zinc-100 dark:border-zinc-800/80">
                                <img src="https://placehold.co/100x100/f87171/ffffff?text=L" alt="Autor"
                                    className="w-12 h-12 rounded-full object-cover shadow-sm" />
                                <div>
                                    <p className="text-sm font-bold text-zinc-900 dark:text-white">Lucas Mendes</p>
                                    <p className="text-xs font-medium text-zinc-500">Desenvolvedor JCC</p>
                                </div>
                            </div>
                            <h3 className="text-xl font-bold mb-2 text-zinc-900 dark:text-white flex items-center gap-2"><i
                                    data-lucide="leaf" className="h-5 w-5 text-emerald-500"></i> EcoMonitor ZO</h3>
                            <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed">Sensores IoT de baixo custo
                                espalhados pelos postes para mapear a qualidade do ar e criar alertas de ilhas de calor.</p>
                        </div>
                    </div>

                    {/* Projeto 2 */}
                    <div
                        className="w-[320px] bg-white dark:bg-zinc-900 rounded-3xl p-6 border border-zinc-200 dark:border-zinc-800 flex flex-col justify-between flex-shrink-0 transition-all hover:border-red-500/50 hover:shadow-xl">
                        <div>
                            <div className="flex items-center gap-3 mb-5 pb-5 border-b border-zinc-100 dark:border-zinc-800/80">
                                <img src="https://placehold.co/100x100/60a5fa/ffffff?text=M" alt="Autor"
                                    className="w-12 h-12 rounded-full object-cover shadow-sm" />
                                <div>
                                    <p className="text-sm font-bold text-zinc-900 dark:text-white">Mariana Costa</p>
                                    <p className="text-xs font-medium text-zinc-500">Pesquisadora JCC</p>
                                </div>
                            </div>
                            <h3 className="text-xl font-bold mb-2 text-zinc-900 dark:text-white flex items-center gap-2"><i
                                    data-lucide="graduation-cap" className="h-5 w-5 text-blue-500"></i> EducaConecta</h3>
                            <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed">Uma plataforma gamificada
                                que une alunos de escolas públicas a mentores voluntários para reforço em matemática básica.
                            </p>
                        </div>
                    </div>

                    {/* Projeto 3 */}
                    <div
                        className="w-[320px] bg-white dark:bg-zinc-900 rounded-3xl p-6 border border-zinc-200 dark:border-zinc-800 flex flex-col justify-between flex-shrink-0 transition-all hover:border-red-500/50 hover:shadow-xl">
                        <div>
                            <div className="flex items-center gap-3 mb-5 pb-5 border-b border-zinc-100 dark:border-zinc-800/80">
                                <img src="https://placehold.co/100x100/f59e0b/ffffff?text=P" alt="Autor"
                                    className="w-12 h-12 rounded-full object-cover shadow-sm" />
                                <div>
                                    <p className="text-sm font-bold text-zinc-900 dark:text-white">Pedro Alvarez</p>
                                    <p className="text-xs font-medium text-zinc-500">Eng. Robótica JCC</p>
                                </div>
                            </div>
                            <h3 className="text-xl font-bold mb-2 text-zinc-900 dark:text-white flex items-center gap-2"><i
                                    data-lucide="bot" className="h-5 w-5 text-amber-500"></i> ColetaBot</h3>
                            <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed">Robô lixeiro autônomo
                                desenvolvido com sucata para limpar praças públicas, usando visão computacional para separar
                                recicláveis.</p>
                        </div>
                    </div>

                    {/* Projeto 4 */}
                    <div
                        className="w-[320px] bg-white dark:bg-zinc-900 rounded-3xl p-6 border border-zinc-200 dark:border-zinc-800 flex flex-col justify-between flex-shrink-0 transition-all hover:border-red-500/50 hover:shadow-xl">
                        <div>
                            <div className="flex items-center gap-3 mb-5 pb-5 border-b border-zinc-100 dark:border-zinc-800/80">
                                <img src="https://placehold.co/100x100/10b981/ffffff?text=A" alt="Autor"
                                    className="w-12 h-12 rounded-full object-cover shadow-sm" />
                                <div>
                                    <p className="text-sm font-bold text-zinc-900 dark:text-white">Ana Souza</p>
                                    <p className="text-xs font-medium text-zinc-500">Cientista de Dados</p>
                                </div>
                            </div>
                            <h3 className="text-xl font-bold mb-2 text-zinc-900 dark:text-white flex items-center gap-2"><i
                                    data-lucide="activity" className="h-5 w-5 text-emerald-500"></i> SaúdeZO</h3>
                            <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed">App que centraliza o tempo
                                de espera de clínicas da família, permitindo aos moradores escolherem os postos menos cheios.
                            </p>
                        </div>
                    </div>

                    {/* Projeto 5 */}
                    <div
                        className="w-[320px] bg-white dark:bg-zinc-900 rounded-3xl p-6 border border-zinc-200 dark:border-zinc-800 flex flex-col justify-between flex-shrink-0 transition-all hover:border-red-500/50 hover:shadow-xl">
                        <div>
                            <div className="flex items-center gap-3 mb-5 pb-5 border-b border-zinc-100 dark:border-zinc-800/80">
                                <img src="https://placehold.co/100x100/ec4899/ffffff?text=J" alt="Autor"
                                    className="w-12 h-12 rounded-full object-cover shadow-sm" />
                                <div>
                                    <p className="text-sm font-bold text-zinc-900 dark:text-white">Júlia Gomes</p>
                                    <p className="text-xs font-medium text-zinc-500">Eng. de Software</p>
                                </div>
                            </div>
                            <h3 className="text-xl font-bold mb-2 text-zinc-900 dark:text-white flex items-center gap-2"><i
                                    data-lucide="cloud-rain" className="h-5 w-5 text-pink-500"></i> ÁguaViva</h3>
                            <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed">Rede de alerta de enchentes
                                alimentada pela comunidade, usando IA para prever áreas de risco após chuvas fortes.</p>
                        </div>
                    </div>

                    {/* Projeto 6 */}
                    <div
                        className="w-[320px] bg-white dark:bg-zinc-900 rounded-3xl p-6 border border-zinc-200 dark:border-zinc-800 flex flex-col justify-between flex-shrink-0 transition-all hover:border-red-500/50 hover:shadow-xl">
                        <div>
                            <div className="flex items-center gap-3 mb-5 pb-5 border-b border-zinc-100 dark:border-zinc-800/80">
                                <img src="https://placehold.co/100x100/a78bfa/ffffff?text=F" alt="Autor"
                                    className="w-12 h-12 rounded-full object-cover shadow-sm" />
                                <div>
                                    <p className="text-sm font-bold text-zinc-900 dark:text-white">Felipe Rocha</p>
                                    <p className="text-xs font-medium text-zinc-500">Pesquisador JCC</p>
                                </div>
                            </div>
                            <h3 className="text-xl font-bold mb-2 text-zinc-900 dark:text-white flex items-center gap-2"><i
                                    data-lucide="shield-check" className="h-5 w-5 text-violet-500"></i> BairroSeguro</h3>
                            <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed">Mapeamento colaborativo de
                                postes apagados e terrenos baldios, gerando rotas mais seguras para pedestres à noite.</p>
                        </div>
                    </div>

                    {/* REPLICAÇÃO DO LOOP PARA EFEITO MARQUEE SEM ENGASGOS */}
                    <div
                        className="w-[320px] bg-white dark:bg-zinc-900 rounded-3xl p-6 border border-zinc-200 dark:border-zinc-800 flex flex-col justify-between flex-shrink-0 transition-all hover:border-red-500/50 hover:shadow-xl">
                        <div>
                            <div className="flex items-center gap-3 mb-5 pb-5 border-b border-zinc-100 dark:border-zinc-800/80">
                                <img src="https://placehold.co/100x100/f87171/ffffff?text=L" alt="Autor"
                                    className="w-12 h-12 rounded-full object-cover shadow-sm" />
                                <div>
                                    <p className="text-sm font-bold text-zinc-900 dark:text-white">Lucas Mendes</p>
                                    <p className="text-xs font-medium text-zinc-500">Desenvolvedor JCC</p>
                                </div>
                            </div>
                            <h3 className="text-xl font-bold mb-2 text-zinc-900 dark:text-white flex items-center gap-2"><i
                                    data-lucide="leaf" className="h-5 w-5 text-emerald-500"></i> EcoMonitor ZO</h3>
                            <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed">Sensores IoT de baixo custo
                                espalhados pelos postes para mapear a qualidade do ar e criar alertas de ilhas de calor.</p>
                        </div>
                    </div>

                    <div
                        className="w-[320px] bg-white dark:bg-zinc-900 rounded-3xl p-6 border border-zinc-200 dark:border-zinc-800 flex flex-col justify-between flex-shrink-0 transition-all hover:border-red-500/50 hover:shadow-xl">
                        <div>
                            <div className="flex items-center gap-3 mb-5 pb-5 border-b border-zinc-100 dark:border-zinc-800/80">
                                <img src="https://placehold.co/100x100/60a5fa/ffffff?text=M" alt="Autor"
                                    className="w-12 h-12 rounded-full object-cover shadow-sm" />
                                <div>
                                    <p className="text-sm font-bold text-zinc-900 dark:text-white">Mariana Costa</p>
                                    <p className="text-xs font-medium text-zinc-500">Pesquisadora JCC</p>
                                </div>
                            </div>
                            <h3 className="text-xl font-bold mb-2 text-zinc-900 dark:text-white flex items-center gap-2"><i
                                    data-lucide="graduation-cap" className="h-5 w-5 text-blue-500"></i> EducaConecta</h3>
                            <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed">Uma plataforma gamificada
                                que une alunos de escolas públicas a mentores voluntários para reforço em matemática básica.
                            </p>
                        </div>
                    </div>

                </div>
            </div>

            <div className="mt-16 text-center">
                <a href="./pages/Projetos/index.html"
                    className="inline-flex px-8 py-4 rounded-xl bg-zinc-900 dark:bg-white hover:bg-zinc-800 dark:hover:bg-zinc-200 text-white dark:text-zinc-900 font-bold transition-all hover:-translate-y-1 items-center gap-3 shadow-lg shadow-zinc-900/20 dark:shadow-white/10">
                    <i data-lucide="layers" className="h-5 w-5"></i> Conhecer os projetos a fundo
                </a>
                <p className="mt-4 text-sm font-medium text-zinc-500 dark:text-zinc-400">Passe o mouse (ou segure) nos cartões
                    para ler com calma.</p>
            </div>
        </section>
    );
}
