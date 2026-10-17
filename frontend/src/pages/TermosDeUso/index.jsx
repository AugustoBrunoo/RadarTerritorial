import React from 'react';
import { 
    Calendar, 
    AlertTriangle, 
    User, 
    Mail, 
    Phone, 
    MapPin, 
    CheckCircle, 
    MessageSquare, 
    ShieldOff, 
    Gavel,
    ShieldAlert,
    UserCheck
} from 'lucide-react';
import SimpleHeader from '../../components/SimpleHeader';
import SimpleFooter from '../../components/SimpleFooter';

export default function TermosDeUso() {
    return (
        <div className="min-h-screen bg-[#F9FAFB] dark:bg-[#09090B] flex flex-col font-sans text-zinc-900 dark:text-zinc-50 selection:bg-red-500 selection:text-white relative">
            <SimpleHeader backLink={-1} />
            
            {/* Background elements - contidos em viewport fixo para não gerar overflow nem recálculos na rolagem */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
                <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-red-600/5 dark:bg-red-600/5 blur-3xl" />
                <div className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full bg-blue-600/5 dark:bg-blue-600/5 blur-3xl" />
            </div>

            {/* === HEADER DO DOCUMENTO === */}
            <section className="pt-28 sm:pt-36 pb-6 sm:pb-10 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto w-full text-center relative z-10">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-zinc-900 dark:text-white mb-3 sm:mb-4">
                    Termos de Uso e <br className="hidden sm:inline" />Política de Privacidade
                </h1>
                <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 font-medium flex justify-center items-center gap-1.5 sm:gap-2">
                    <Calendar className="h-3.5 w-3.5 sm:h-4 sm:w-4 shrink-0 text-red-600" /> Versão atualizada em: 17 de outubro de 2026
                </p>
            </section>

            {/* === CORPO DO DOCUMENTO === */}
            <main className="flex-grow pb-10 sm:pb-16 px-3 sm:px-6 lg:px-8 max-w-4xl mx-auto w-full relative z-10">

                <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl sm:rounded-[2rem] p-5 sm:p-8 md:p-12 shadow-xl shadow-zinc-200/50 dark:shadow-black/20">

                    {/* Intro */}
                    <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed mb-8 sm:mb-10 font-medium">
                        Bem-vindo ao Radar Territorial! Esta plataforma foi criada para conectar os moradores da Zona Oeste do
                        Rio de Janeiro à gestão urbana. Ao utilizar nosso sistema, você concorda com os termos e práticas
                        descritos abaixo.
                    </p>

                    {/* Seção 1 */}
                    <section className="mb-10 sm:mb-12">
                        <h2 className="text-xl sm:text-2xl font-black text-zinc-900 dark:text-white mb-3 sm:mb-4 flex items-start sm:items-center gap-3">
                            <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-red-100 dark:bg-red-900/30 text-red-600 flex items-center justify-center text-xs sm:text-sm font-bold shrink-0 flex-shrink-0 mt-0.5 sm:mt-0 select-none">
                                1
                            </span>
                            <span className="leading-snug">Sobre o Radar Territorial</span>
                        </h2>
                        <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed mb-5 sm:mb-6">
                            O Radar Territorial é uma ferramenta de participação social e colaboração urbana. Nosso objetivo é
                            transformar a percepção dos moradores em indicadores territoriais para melhoria dos serviços
                            públicos.
                        </p>

                        {/* Box de Alerta */}
                        <div className="bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-900/30 rounded-2xl p-4 sm:p-6 flex items-start gap-3 sm:gap-4">
                            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center shrink-0 flex-shrink-0 mt-0.5">
                                <AlertTriangle className="h-4 w-4 sm:h-5 sm:w-5 text-red-600" />
                            </div>
                            <div className="min-w-0 flex-1">
                                <h4 className="text-red-800 dark:text-red-400 font-black text-base sm:text-lg mb-1.5 sm:mb-2 uppercase tracking-wide">Aviso Importante</h4>
                                <p className="text-red-900/80 dark:text-red-200/70 text-xs sm:text-sm leading-relaxed font-medium">
                                    O Radar Territorial <strong>NÃO é um canal oficial de emergência ou ouvidoria do
                                        governo.</strong> Em casos de perigo iminente (incêndios, crimes em andamento ou risco
                                    de vida), não utilize esta plataforma. Entre em contato imediatamente com os serviços
                                    oficiais (190 para Polícia Militar, 193 para Bombeiros ou 1746 para a Prefeitura).
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Seção 2 */}
                    <section className="mb-10 sm:mb-12">
                        <h2 className="text-xl sm:text-2xl font-black text-zinc-900 dark:text-white mb-3 sm:mb-4 flex items-start sm:items-center gap-3">
                            <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-red-100 dark:bg-red-900/30 text-red-600 flex items-center justify-center text-xs sm:text-sm font-bold shrink-0 flex-shrink-0 mt-0.5 sm:mt-0 select-none">
                                2
                            </span>
                            <span className="leading-snug">Coleta e Uso de Dados</span>
                        </h2>
                        <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed mb-6 sm:mb-8">
                            Respeitamos a sua privacidade e estamos em conformidade com a <strong>Lei Geral de Proteção de Dados (LGPD)</strong>.
                        </p>

                        <h3 className="text-base sm:text-lg font-bold text-zinc-900 dark:text-white mb-3 sm:mb-4">Quais dados coletamos:</h3>

                        {/* Grid de Dados */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 mb-6 sm:mb-8">
                            <div className="p-3.5 sm:p-4 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-100 dark:border-zinc-800 flex items-start gap-3">
                                <User className="h-5 w-5 text-zinc-500 dark:text-zinc-400 mt-0.5 shrink-0 flex-shrink-0" />
                                <div className="min-w-0">
                                    <span className="font-bold text-zinc-900 dark:text-white block text-sm">Nome de Exibição (Apelido)</span>
                                    <span className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed block mt-0.5">
                                        Você tem a liberdade de escolher como deseja ser identificado na plataforma (nome real ou apelido). O uso de um nome de exibição protege sua identidade enquanto mantém a autoria do relato para a comunidade.
                                    </span>
                                </div>
                            </div>
                            <div className="p-3.5 sm:p-4 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-100 dark:border-zinc-800 flex items-start gap-3">
                                <Mail className="h-5 w-5 text-zinc-500 dark:text-zinc-400 mt-0.5 shrink-0 flex-shrink-0" />
                                <div className="min-w-0">
                                    <span className="font-bold text-zinc-900 dark:text-white block text-sm">E-mail</span>
                                    <span className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed block mt-0.5">
                                        Necessário para validação da conta e contato, caso necessário. Seu e-mail é criptografado em nosso banco de dados e nunca será exibido publicamente ou compartilhado com outros usuários.
                                    </span>
                                </div>
                            </div>
                            <div className="p-3.5 sm:p-4 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-100 dark:border-zinc-800 flex items-start gap-3">
                                <Phone className="h-5 w-5 text-zinc-500 dark:text-zinc-400 mt-0.5 shrink-0 flex-shrink-0" />
                                <div className="min-w-0">
                                    <span className="font-bold text-zinc-900 dark:text-white block text-sm">Telefone (Opcional)</span>
                                    <span className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed block mt-0.5">Coletado apenas se desejar ser contatado agilmente pelos responsáveis.</span>
                                </div>
                            </div>
                            <div className="p-3.5 sm:p-4 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-100 dark:border-zinc-800 flex items-start gap-3">
                                <MapPin className="h-5 w-5 text-zinc-500 dark:text-zinc-400 mt-0.5 shrink-0 flex-shrink-0" />
                                <div className="min-w-0">
                                    <span className="font-bold text-zinc-900 dark:text-white block text-sm">Dados do Relato</span>
                                    <span className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed block mt-0.5">Categoria do problema, descrição e local aproximado da ocorrência.</span>
                                </div>
                            </div>
                        </div>

                        <h3 className="text-base sm:text-lg font-bold text-zinc-900 dark:text-white mb-3 sm:mb-4">Como usamos seus dados:</h3>
                        <ul className="space-y-3 mb-6 sm:mb-8">
                            <li className="flex items-start gap-3 text-sm sm:text-base text-zinc-600 dark:text-zinc-400">
                                <CheckCircle className="h-5 w-5 text-green-500 shrink-0 flex-shrink-0 mt-0.5" />
                                <span>Seus dados pessoais <strong>não serão expostos publicamente</strong>. Eles servem para garantir a seriedade das reclamações.</span>
                            </li>
                            <li className="flex items-start gap-3 text-sm sm:text-base text-zinc-600 dark:text-zinc-400">
                                <CheckCircle className="h-5 w-5 text-green-500 shrink-0 flex-shrink-0 mt-0.5" />
                                <span>
                                    As informações estatísticas coletadas (categoria do problema e localização) serão <strong>anonimizadas</strong>. Isso significa que geramos mapas de calor e relatórios de melhoria para o poder público sem expor qual usuário fez a denúncia, garantindo sua privacidade total.
                                </span>
                            </li>
                        </ul>

                        <h3 className="text-base sm:text-lg font-bold text-zinc-900 dark:text-white mb-2">Compartilhamento</h3>
                        <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed bg-zinc-50 dark:bg-zinc-950 p-3.5 sm:p-4 rounded-xl border border-zinc-100 dark:border-zinc-800">
                            Não vendemos ou compartilhamos seus dados com terceiros. Eles podem ser acessados apenas pelos
                            administradores do projeto e agentes públicos parceiros responsáveis pela zeladoria urbana.
                        </p>
                    </section>

                    {/* Seção 3 */}
                    <section className="mb-10 sm:mb-12">
                        <h2 className="text-xl sm:text-2xl font-black text-zinc-900 dark:text-white mb-3 sm:mb-4 flex items-start sm:items-center gap-3">
                            <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-red-100 dark:bg-red-900/30 text-red-600 flex items-center justify-center text-xs sm:text-sm font-bold shrink-0 flex-shrink-0 mt-0.5 sm:mt-0 select-none">
                                3
                            </span>
                            <span className="leading-snug">Conduta e Responsabilidades do Usuário</span>
                        </h2>
                        <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed mb-5 sm:mb-6">
                            Ao utilizar o sistema, criar uma conta e confirmar sua adesão aos termos de responsabilidade, você declara expressamente que:
                        </p>
                        <ul className="space-y-3 sm:space-y-4">
                            <li className="flex items-start gap-3 bg-zinc-50 dark:bg-zinc-950 p-3.5 sm:p-4 rounded-xl border border-zinc-100 dark:border-zinc-800">
                                <div className="mt-0.5 shrink-0 flex-shrink-0"><UserCheck className="h-4 w-4 sm:h-5 sm:w-5 text-zinc-500 dark:text-zinc-400" /></div>
                                <span className="text-xs sm:text-sm md:text-base text-zinc-700 dark:text-zinc-300 leading-relaxed"><strong>Maioridade e Capacidade Civil:</strong> É maior de 18 anos (ou civilmente emancipado) e assume total capacidade e responsabilidade legal, cívica e jurídica pelos dados cadastrados, relatos publicados e interações na plataforma.</span>
                            </li>
                            <li className="flex items-start gap-3 bg-zinc-50 dark:bg-zinc-950 p-3.5 sm:p-4 rounded-xl border border-zinc-100 dark:border-zinc-800">
                                <div className="mt-0.5 shrink-0 flex-shrink-0"><MessageSquare className="h-4 w-4 sm:h-5 sm:w-5 text-zinc-500 dark:text-zinc-400" /></div>
                                <span className="text-xs sm:text-sm md:text-base text-zinc-700 dark:text-zinc-300 leading-relaxed">As informações enviadas são verdadeiras e baseadas na sua percepção real.</span>
                            </li>
                            <li className="flex items-start gap-3 bg-zinc-50 dark:bg-zinc-950 p-3.5 sm:p-4 rounded-xl border border-zinc-100 dark:border-zinc-800">
                                <div className="mt-0.5 shrink-0 flex-shrink-0"><ShieldOff className="h-4 w-4 sm:h-5 sm:w-5 text-red-500" /></div>
                                <span className="text-xs sm:text-sm md:text-base text-zinc-700 dark:text-zinc-300 leading-relaxed">Não utilizará a plataforma para propagar conteúdo ofensivo, discriminatório, fake news ou para fins ilícitos.</span>
                            </li>
                            <li className="flex items-start gap-3 bg-zinc-50 dark:bg-zinc-950 p-3.5 sm:p-4 rounded-xl border border-zinc-100 dark:border-zinc-800">
                                <div className="mt-0.5 shrink-0 flex-shrink-0"><Gavel className="h-4 w-4 sm:h-5 sm:w-5 text-zinc-500 dark:text-zinc-400" /></div>
                                <span className="text-xs sm:text-sm md:text-base text-zinc-700 dark:text-zinc-300 leading-relaxed">Você é o único responsável pelo conteúdo do seu relato. A administração do Radar Territorial reserva-se o direito de remover qualquer conteúdo que viole estas diretrizes.</span>
                            </li>
                            <li className="flex items-start gap-3 bg-zinc-50 dark:bg-zinc-950 p-3.5 sm:p-4 rounded-xl border border-zinc-100 dark:border-zinc-800">
                                <div className="mt-0.5 shrink-0 flex-shrink-0"><ShieldAlert className="h-4 w-4 sm:h-5 sm:w-5 text-amber-500" /></div>
                                <span className="text-xs sm:text-sm md:text-base text-zinc-700 dark:text-zinc-300 leading-relaxed"><strong>Responsabilidade sobre o Perfil:</strong> O uso de um nome de exibição/apelido não isenta o usuário de responder por denúncias comprovadamente falsas, caluniosas ou que infrinjam a lei, podendo a conta ser banida pelos administradores.</span>
                            </li>
                        </ul>
                    </section>

                    {/* Seção 4 */}
                    <section className="mb-10 sm:mb-12">
                        <h2 className="text-xl sm:text-2xl font-black text-zinc-900 dark:text-white mb-3 sm:mb-4 flex items-start sm:items-center gap-3">
                            <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-red-100 dark:bg-red-900/30 text-red-600 flex items-center justify-center text-xs sm:text-sm font-bold shrink-0 flex-shrink-0 mt-0.5 sm:mt-0 select-none">
                                4
                            </span>
                            <span className="leading-snug">Segurança da Informação</span>
                        </h2>
                        <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">
                            Entendemos a sensibilidade de temas como "Insegurança Territorial". Embora o sistema exija
                            identificação para manter a qualidade dos dados, tratamos todas as informações com rigor técnico
                            para evitar vazamentos. No entanto, o usuário deve estar ciente de que, em ambientes digitais,
                            nenhum sistema é 100% imune a invasões, embora apliquemos as melhores práticas de segurança
                            disponíveis.
                        </p>
                    </section>

                    {/* Seção 5 */}
                    <section>
                        <h2 className="text-xl sm:text-2xl font-black text-zinc-900 dark:text-white mb-3 sm:mb-4 flex items-start sm:items-center gap-3">
                            <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-red-100 dark:bg-red-900/30 text-red-600 flex items-center justify-center text-xs sm:text-sm font-bold shrink-0 flex-shrink-0 mt-0.5 sm:mt-0 select-none">
                                5
                            </span>
                            <span className="leading-snug">Seus Direitos</span>
                        </h2>
                        <div className="bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 p-4 sm:p-6 rounded-2xl flex flex-col sm:flex-row items-center sm:items-center gap-4 sm:gap-6 justify-between">
                            <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed text-center sm:text-left">
                                Você pode, a qualquer momento, solicitar a visualização, correção ou exclusão dos seus dados
                                pessoais coletados por nós através do e-mail de suporte abaixo:
                            </p>
                            <a href="mailto:suporte@radarterritorial.com"
                                className="w-full sm:w-auto shrink-0 flex-shrink-0 flex items-center justify-center gap-2 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 px-5 sm:px-6 py-3 rounded-xl font-bold text-sm sm:text-base hover:scale-[1.02] active:scale-[0.98] transition-all text-center">
                                <Mail className="h-4 w-4 shrink-0" /> Falar com Suporte
                            </a>
                        </div>
                    </section>

                </div>
            </main>

            <SimpleFooter />
        </div>
    );
}
