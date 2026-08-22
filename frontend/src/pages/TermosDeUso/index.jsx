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
    Gavel 
} from 'lucide-react';
import SimpleHeader from '../../components/SimpleHeader';
import SimpleFooter from '../../components/SimpleFooter';

export default function TermosDeUso() {
    return (
        <div className="min-h-screen bg-[#F9FAFB] dark:bg-[#09090B] flex flex-col font-sans relative overflow-hidden text-zinc-900 dark:text-zinc-50">
            <SimpleHeader />
            
            {/* Background elements */}
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-red-600/5 dark:bg-red-600/5 blur-[120px] pointer-events-none" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-blue-600/5 dark:bg-blue-600/5 blur-[120px] pointer-events-none" />

            {/* === HEADER DO DOCUMENTO === */}
            <section className="pt-36 pb-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto w-full animate-in fade-in duration-700 text-center relative z-10">
                <h1 className="text-4xl md:text-5xl font-black tracking-tight text-zinc-900 dark:text-white mb-4">
                    Termos de Uso e <br />Política de Privacidade
                </h1>
                <p className="text-zinc-500 dark:text-zinc-400 font-medium flex justify-center items-center gap-2">
                    <Calendar className="h-4 w-4" /> Versão atualizada em: 04 de julho de 2026
                </p>
            </section>

            {/* === CORPO DO DOCUMENTO === */}
            <main className="flex-grow pb-24 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto w-full animate-in slide-in-from-bottom-8 duration-700 relative z-10">

                <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-[2rem] p-8 md:p-12 shadow-xl shadow-zinc-200/50 dark:shadow-black/20">

                    {/* Intro */}
                    <p className="text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed mb-10 font-medium">
                        Bem-vindo ao Radar Territorial! Esta plataforma foi criada para conectar os moradores da Zona Oeste do
                        Rio de Janeiro à gestão urbana. Ao utilizar nosso sistema, você concorda com os termos e práticas
                        descritos abaixo.
                    </p>

                    {/* Seção 1 */}
                    <section className="mb-12">
                        <h2 className="text-2xl font-black text-zinc-900 dark:text-white mb-4 flex items-center gap-3">
                            <span className="w-8 h-8 rounded-full bg-red-100 dark:bg-red-900/30 text-red-600 flex items-center justify-center text-sm">1</span>
                            Sobre o Radar Territorial
                        </h2>
                        <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed mb-6">
                            O Radar Territorial é uma ferramenta de participação social e colaboração urbana. Nosso objetivo é
                            transformar a percepção dos moradores em indicadores territoriais para melhoria dos serviços
                            públicos.
                        </p>

                        {/* Box de Alerta */}
                        <div className="bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-900/30 rounded-2xl p-6 flex items-start gap-4">
                            <div className="w-10 h-10 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center flex-shrink-0 mt-1">
                                <AlertTriangle className="h-5 w-5 text-red-600" />
                            </div>
                            <div>
                                <h4 className="text-red-800 dark:text-red-400 font-black text-lg mb-2 uppercase tracking-wide">Aviso Importante</h4>
                                <p className="text-red-900/80 dark:text-red-200/70 text-sm leading-relaxed font-medium">
                                    O Radar Territorial <strong>NÃO é um canal oficial de emergência ou ouvidoria do
                                        governo.</strong> Em casos de perigo iminente (incêndios, crimes em andamento ou risco
                                    de vida), não utilize esta plataforma. Entre em contato imediatamente com os serviços
                                    oficiais (190 para Polícia Militar, 193 para Bombeiros ou 1746 para a Prefeitura).
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Seção 2 */}
                    <section className="mb-12">
                        <h2 className="text-2xl font-black text-zinc-900 dark:text-white mb-4 flex items-center gap-3">
                            <span className="w-8 h-8 rounded-full bg-red-100 dark:bg-red-900/30 text-red-600 flex items-center justify-center text-sm">2</span>
                            Coleta e Uso de Dados
                        </h2>
                        <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed mb-8">
                            Respeitamos a sua privacidade e estamos em conformidade com a <strong>Lei Geral de Proteção de Dados (LGPD)</strong>.
                        </p>

                        <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-4">Quais dados coletamos:</h3>

                        {/* Grid de Dados */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                            <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-100 dark:border-zinc-800 flex items-start gap-3">
                                <User className="h-5 w-5 text-zinc-500 mt-0.5 flex-shrink-0" />
                                <div>
                                    <span className="font-bold text-zinc-900 dark:text-white block text-sm">Nome Completo</span>
                                    <span className="text-xs text-zinc-500">Necessário para identificar a autoria do relato e evitar "spam" ou registros falsos.</span>
                                </div>
                            </div>
                            <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-100 dark:border-zinc-800 flex items-start gap-3">
                                <Mail className="h-5 w-5 text-zinc-500 mt-0.5 flex-shrink-0" />
                                <div>
                                    <span className="font-bold text-zinc-900 dark:text-white block text-sm">E-mail</span>
                                    <span className="text-xs text-zinc-500">Necessário para validação da conta e contato, caso necessário.</span>
                                </div>
                            </div>
                            <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-100 dark:border-zinc-800 flex items-start gap-3">
                                <Phone className="h-5 w-5 text-zinc-500 mt-0.5 flex-shrink-0" />
                                <div>
                                    <span className="font-bold text-zinc-900 dark:text-white block text-sm">Telefone (Opcional)</span>
                                    <span className="text-xs text-zinc-500">Coletado apenas se desejar ser contatado agilmente pelos responsáveis.</span>
                                </div>
                            </div>
                            <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-100 dark:border-zinc-800 flex items-start gap-3">
                                <MapPin className="h-5 w-5 text-zinc-500 mt-0.5 flex-shrink-0" />
                                <div>
                                    <span className="font-bold text-zinc-900 dark:text-white block text-sm">Dados do Relato</span>
                                    <span className="text-xs text-zinc-500">Categoria do problema, descrição e local aproximado da ocorrência.</span>
                                </div>
                            </div>
                        </div>

                        <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-4">Como usamos seus dados:</h3>
                        <ul className="space-y-3 mb-8">
                            <li className="flex items-start gap-3 text-zinc-600 dark:text-zinc-400">
                                <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                                <span>Seus dados pessoais <strong>não serão expostos publicamente</strong>. Eles servem para garantir a seriedade das reclamações.</span>
                            </li>
                            <li className="flex items-start gap-3 text-zinc-600 dark:text-zinc-400">
                                <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                                <span>As informações estatísticas coletadas (problemas e locais) serão utilizadas exclusivamente para gerar relatórios de melhoria para o bairro.</span>
                            </li>
                        </ul>

                        <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-2">Compartilhamento</h3>
                        <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed bg-zinc-50 dark:bg-zinc-950 p-4 rounded-xl border border-zinc-100 dark:border-zinc-800">
                            Não vendemos ou compartilhamos seus dados com terceiros. Eles podem ser acessados apenas pelos
                            administradores do projeto e agentes públicos parceiros responsáveis pela zeladoria urbana.
                        </p>
                    </section>

                    {/* Seção 3 */}
                    <section className="mb-12">
                        <h2 className="text-2xl font-black text-zinc-900 dark:text-white mb-4 flex items-center gap-3">
                            <span className="w-8 h-8 rounded-full bg-red-100 dark:bg-red-900/30 text-red-600 flex items-center justify-center text-sm">3</span>
                            Conduta e Responsabilidades do Usuário
                        </h2>
                        <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed mb-6">
                            Ao utilizar o sistema, você declara que:
                        </p>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3 bg-zinc-50 dark:bg-zinc-950 p-4 rounded-xl border border-zinc-100 dark:border-zinc-800">
                                <div className="mt-0.5"><MessageSquare className="h-5 w-5 text-zinc-500" /></div>
                                <span className="text-zinc-700 dark:text-zinc-300">As informações enviadas são verdadeiras e baseadas na sua percepção real.</span>
                            </li>
                            <li className="flex items-start gap-3 bg-zinc-50 dark:bg-zinc-950 p-4 rounded-xl border border-zinc-100 dark:border-zinc-800">
                                <div className="mt-0.5"><ShieldOff className="h-5 w-5 text-red-500" /></div>
                                <span className="text-zinc-700 dark:text-zinc-300">Não utilizará a plataforma para propagar conteúdo ofensivo, discriminatório, fake news ou para fins ilícitos.</span>
                            </li>
                            <li className="flex items-start gap-3 bg-zinc-50 dark:bg-zinc-950 p-4 rounded-xl border border-zinc-100 dark:border-zinc-800">
                                <div className="mt-0.5"><Gavel className="h-5 w-5 text-zinc-500" /></div>
                                <span className="text-zinc-700 dark:text-zinc-300">Você é o único responsável pelo conteúdo do seu relato. A administração do Radar Territorial reserva-se o direito de remover qualquer conteúdo que viole estas diretrizes.</span>
                            </li>
                        </ul>
                    </section>

                    {/* Seção 4 */}
                    <section className="mb-12">
                        <h2 className="text-2xl font-black text-zinc-900 dark:text-white mb-4 flex items-center gap-3">
                            <span className="w-8 h-8 rounded-full bg-red-100 dark:bg-red-900/30 text-red-600 flex items-center justify-center text-sm">4</span>
                            Segurança da Informação
                        </h2>
                        <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                            Entendemos a sensibilidade de temas como "Insegurança Territorial". Embora o sistema exija
                            identificação para manter a qualidade dos dados, tratamos todas as informações com rigor técnico
                            para evitar vazamentos. No entanto, o usuário deve estar ciente de que, em ambientes digitais,
                            nenhum sistema é 100% imune a invasões, embora apliquemos as melhores práticas de segurança
                            disponíveis.
                        </p>
                    </section>

                    {/* Seção 5 */}
                    <section>
                        <h2 className="text-2xl font-black text-zinc-900 dark:text-white mb-4 flex items-center gap-3">
                            <span className="w-8 h-8 rounded-full bg-red-100 dark:bg-red-900/30 text-red-600 flex items-center justify-center text-sm">5</span>
                            Seus Direitos
                        </h2>
                        <div className="bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 p-6 rounded-2xl flex flex-col md:flex-row items-center gap-6 justify-between">
                            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed text-center md:text-left">
                                Você pode, a qualquer momento, solicitar a visualização, correção ou exclusão dos seus dados
                                pessoais coletados por nós através do e-mail de suporte abaixo:
                            </p>
                            <a href="mailto:suporte@radarterritorial.com"
                                className="shrink-0 flex items-center gap-2 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 px-6 py-3 rounded-xl font-bold hover:scale-105 transition-transform">
                                <Mail className="h-4 w-4" /> Falar com Suporte
                            </a>
                        </div>
                    </section>

                </div>
            </main>

            <SimpleFooter />
        </div>
    );
}
