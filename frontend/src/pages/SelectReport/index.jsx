import React from 'react';
import { ShieldCheck, EyeOff, UserCheck, Sparkles } from 'lucide-react';
import SimpleHeader from '../../components/SimpleHeader';
import SimpleFooter from '../../components/SimpleFooter';
import ReportOptionCard from '../../components/ReportOptionCard';

export default function SelectReport() {
    return (
        <div className="transition-colors duration-500 ease-in-out min-h-screen bg-[#F9FAFB] text-zinc-900 dark:bg-[#09090B] dark:text-zinc-50 font-sans selection:bg-red-500 selection:text-white flex flex-col">
            
            <SimpleHeader backLink="/" />

            {/* === SEÇÃO PRINCIPAL DE ESCOLHA === */}
            <main className="flex-grow pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto w-full flex flex-col justify-center min-h-[90vh]">
                <div className="text-center mb-16 relative z-10">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-900/50 mb-6 backdrop-blur-sm">
                        <ShieldCheck className="h-4 w-4 text-red-600" />
                        <span className="text-xs font-bold uppercase tracking-wider text-zinc-600 dark:text-zinc-400">
                            Ambiente Seguro
                        </span>
                    </div>

                    <h1 className="text-4xl md:text-5xl lg:text-[4rem] font-black tracking-tighter leading-tight text-zinc-900 dark:text-white mb-6">
                        Como você prefere <br className="hidden sm:block" />
                        <span className="text-red-600 relative inline-block">
                            fazer o seu relato?
                            <div className="absolute -bottom-2 left-0 w-full h-2 bg-red-600/20 rounded-full"></div>
                        </span>
                    </h1>
                    <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto font-medium">
                        Escolha o método que melhor se adapta a você. Seu impacto na comunidade é o mesmo, independentemente da forma escolhida.
                    </p>
                </div>

                {/* Grid de Opções (Bento Box interativo) */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
                    
                    <ReportOptionCard 
                        to="/reportar/anonimo"
                        icon={EyeOff}
                        optionNumber="Opção 01"
                        title="Anonimato"
                        description="Nenhum dado pessoal será coletado. Ideal para relatos delicados, como barricadas ou problemas de segurança, garantindo 100% de sigilo do cidadão."
                    />

                    <ReportOptionCard 
                        to="#"
                        icon={UserCheck}
                        optionNumber="Opção 02"
                        title="Usar Conta"
                        description="Ao acessar sua conta, você ganha visibilidade total sobre seus relatos: monitore o status em tempo real, receba notificações sobre as resoluções e participe ativamente da transformação do seu bairro."
                    />

                    <ReportOptionCard 
                        to="#"
                        icon={Sparkles}
                        optionNumber="Opção 03"
                        title="Assistente IA"
                        description="Nossa IA transforma sua descrição simples em uma solicitação completa. Identificamos o endereço e o tipo de problema automaticamente, economizando seu tempo e agilizando a resposta da gestão."
                        variant="highlight"
                    />

                </div>
            </main>

            <SimpleFooter />
        </div>
    );
}
