import React, { useState, useEffect } from 'react';
import { X, Smartphone, TabletSmartphone, Compass, Share, PlusCircle, Globe, MoreVertical, Download } from 'lucide-react';

export default function InstallModal({ isOpen, onClose }) {
    const [installStep, setInstallStep] = useState('selection');
    const [wizardCurrentOS, setWizardCurrentOS] = useState('');
    const [wizardCurrentStep, setWizardCurrentStep] = useState(1);
    const totalSteps = 3;

    useEffect(() => {
        if (isOpen) {
            setInstallStep('selection');
            setWizardCurrentStep(1);
            setWizardCurrentOS('');
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isOpen]);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape' && isOpen) {
                onClose();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, onClose]);

    const startInstallFlow = (os) => {
        setWizardCurrentOS(os);
        setWizardCurrentStep(1);
        setInstallStep('wizard');
    };

    const wizardNext = () => {
        if (wizardCurrentStep < totalSteps) {
            setWizardCurrentStep(wizardCurrentStep + 1);
        } else {
            onClose();
        }
    };

    const wizardPrev = () => {
        if (wizardCurrentStep > 1) {
            setWizardCurrentStep(wizardCurrentStep - 1);
        } else {
            setInstallStep('selection');
        }
    };

    const stepsContent = {
        ios: [
            {
                title: "Abra no Safari",
                desc: "Verifique se você está acessando a plataforma utilizando o navegador **Safari**. Fluxos de instalação para atalhos PWA no iOS não são suportados nativamente por navegadores de terceiros.",
                Icon: Compass
            },
            {
                title: "Menu de Compartilhamento",
                desc: "Com o painel do Radar Territorial aberto, toque no botão de **Compartilhar** (o ícone de um quadrado com uma seta apontando para cima) localizado na barra inferior do Safari.",
                Icon: Share
            },
            {
                title: "Adicionar à Tela de Início",
                desc: "Role a lista de opções para baixo e selecione o item **'Adicionar à Tela de Início'**. Se desejar, personalize o nome do atalho e confirme tocando em **'Adicionar'** no canto superior direito.",
                Icon: PlusCircle
            }
        ],
        android: [
            {
                title: "Abra no Google Chrome",
                desc: "Certifique-se de carregar esta página de maneira nativa de dentro do aplicativo do **Google Chrome** no seu dispositivo Android.",
                Icon: Globe
            },
            {
                title: "Acesse as Opções",
                desc: "Toque no ícone de **três pontos verticais** situado no canto superior direito do Chrome para expandir a lista de controle do navegador.",
                Icon: MoreVertical
            },
            {
                title: "Instalar Aplicativo",
                desc: "Toque na opção **'Instalar aplicativo'** (ou **'Adicionar à tela inicial'**). Um prompt de confirmação do sistema Android surgirá na tela, valide-o clicando em **'Instalar'**.",
                Icon: Download
            }
        ]
    };

    const renderWizardStep = () => {
        if (!wizardCurrentOS) return null;
        const data = stepsContent[wizardCurrentOS][wizardCurrentStep - 1];
        const IconComponent = data.Icon;
        
        return (
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3.5 sm:gap-4 text-center sm:text-left">
                <div className="bg-red-50 dark:bg-red-950/30 text-red-600 dark:text-red-400 p-3.5 sm:p-4 rounded-2xl flex-shrink-0">
                    <IconComponent className="h-7 w-7 sm:h-8 sm:w-8" />
                </div>
                <div className="flex-1 min-w-0">
                    <h4 className="text-lg sm:text-xl font-bold mb-1.5 sm:mb-2 text-zinc-900 dark:text-white leading-snug">{data.title}</h4>
                    <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed font-medium" dangerouslySetInnerHTML={{__html: data.desc.replace(/\*\*(.*?)\*\*/g, '<strong class="text-zinc-900 dark:text-white font-semibold">$1</strong>')}}></p>
                </div>
            </div>
        );
    };

    if (!isOpen) return null;

    return (
        <div
            id="install-modal"
            onClick={onClose}
            className={`fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-md transition-opacity duration-300 p-4 overflow-y-auto ${
                isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
        >
            <div
                id="install-modal-content"
                role="dialog"
                aria-modal="true"
                aria-labelledby="install-modal-title"
                onClick={(e) => e.stopPropagation()}
                className={`bg-white dark:bg-zinc-900 w-full max-w-lg h-[470px] sm:h-[420px] max-h-[calc(100dvh-2rem)] rounded-[2.5rem] p-6 sm:p-8 shadow-2xl border border-zinc-200 dark:border-zinc-800 transform transition-all duration-300 relative text-zinc-900 dark:text-white flex flex-col justify-between my-auto ${
                    isOpen ? "scale-100 translate-y-0 opacity-100" : "scale-95 translate-y-4 opacity-0"
                }`}
            >
                {/* Botão Fechar no Topo */}
                <button
                    onClick={onClose}
                    aria-label="Fechar modal de instalação"
                    className="absolute top-5 right-5 sm:top-6 sm:right-6 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 p-2 rounded-full transition-colors z-20 cursor-pointer"
                >
                    <X className="h-5 w-5" />
                </button>

                {/* ETAPA 1: Seleção de Plataforma */}
                {installStep === "selection" && (
                    <div id="install-step-selection" className="h-full flex flex-col justify-between animate-in fade-in duration-200">
                        {/* Header */}
                        <div>
                            <h3 id="install-modal-title" className="text-xl sm:text-2xl font-black mb-1.5 sm:mb-2 tracking-tight pr-8">
                                Instalar na Tela Inicial
                            </h3>
                            <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed font-medium">
                                Escolha a plataforma do seu aparelho para ver o passo a passo dedicado:
                            </p>
                        </div>

                        {/* Cards de Plataforma Padronizados */}
                        <div className="grid grid-cols-2 gap-3 sm:gap-4 my-auto py-2">
                            <button
                                type="button"
                                onClick={() => startInstallFlow('ios')}
                                className="flex flex-col items-center justify-center gap-3 p-4 sm:p-5 rounded-2xl border-2 border-zinc-200 dark:border-zinc-800 hover:border-red-500 dark:hover:border-red-500 hover:bg-zinc-50 dark:hover:bg-zinc-800/40 active:scale-95 transition-all text-center group cursor-pointer"
                            >
                                <div className="bg-zinc-100 dark:bg-zinc-800 p-3 sm:p-3.5 rounded-2xl text-zinc-700 dark:text-zinc-300 group-hover:scale-110 group-hover:text-red-600 dark:group-hover:text-red-400 transition-all">
                                    <Smartphone className="h-7 w-7 sm:h-8 sm:w-8" />
                                </div>
                                <div>
                                    <strong className="block text-sm sm:text-base font-bold text-zinc-900 dark:text-white">iPhone / iOS</strong>
                                    <span className="text-[11px] sm:text-xs text-zinc-400 block mt-0.5">Via Safari</span>
                                </div>
                            </button>

                            <button
                                type="button"
                                onClick={() => startInstallFlow('android')}
                                className="flex flex-col items-center justify-center gap-3 p-4 sm:p-5 rounded-2xl border-2 border-zinc-200 dark:border-zinc-800 hover:border-red-500 dark:hover:border-red-500 hover:bg-zinc-50 dark:hover:bg-zinc-800/40 active:scale-95 transition-all text-center group cursor-pointer"
                            >
                                <div className="bg-zinc-100 dark:bg-zinc-800 p-3 sm:p-3.5 rounded-2xl text-zinc-700 dark:text-zinc-300 group-hover:scale-110 group-hover:text-red-600 dark:group-hover:text-red-400 transition-all">
                                    <TabletSmartphone className="h-7 w-7 sm:h-8 sm:w-8" />
                                </div>
                                <div>
                                    <strong className="block text-sm sm:text-base font-bold text-zinc-900 dark:text-white">Android</strong>
                                    <span className="text-[11px] sm:text-xs text-zinc-400 block mt-0.5">Via Chrome</span>
                                </div>
                            </button>
                        </div>

                        {/* Rodapé Informativo Padronizado */}
                        <div className="border-t border-zinc-100 dark:border-zinc-800 pt-3 sm:pt-4 text-center shrink-0">
                            <p className="text-[11px] sm:text-xs text-zinc-500 dark:text-zinc-400 font-medium">
                                💡 Atalho leve e seguro, sem necessidade de baixar pela loja de apps.
                            </p>
                        </div>
                    </div>
                )}

                {/* ETAPA 2: Wizard Passo a Passo */}
                {installStep === "wizard" && (
                    <div id="install-step-wizard" className="h-full flex flex-col justify-between animate-in fade-in duration-200">
                        {/* Header com Badge, Contador e Botão de Troca */}
                        <div className="flex items-center justify-between pr-8 shrink-0">
                            <div className="flex items-center gap-2">
                                <span
                                    id="wizard-os-badge"
                                    className={`px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider ${
                                        wizardCurrentOS === "ios"
                                            ? "bg-zinc-100 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200"
                                            : "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400"
                                    }`}
                                >
                                    {wizardCurrentOS === "ios" ? "Apple iOS" : "Android OS"}
                                </span>
                                <span id="wizard-progress-text" className="text-xs font-bold text-zinc-400">
                                    Passo {wizardCurrentStep} de {totalSteps}
                                </span>
                            </div>
                            <button
                                type="button"
                                onClick={() => setInstallStep('selection')}
                                className="text-xs font-bold text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 transition-colors cursor-pointer"
                            >
                                Trocar sistema
                            </button>
                        </div>

                        {/* Conteúdo do Passo Centralizado */}
                        <div className="my-auto py-2">
                            <div id="wizard-content-step" key={`${wizardCurrentOS}-${wizardCurrentStep}`} className="animate-in fade-in duration-200">
                                {renderWizardStep()}
                            </div>
                        </div>

                        {/* Rodapé de Navegação */}
                        <div className="flex items-center justify-between border-t border-zinc-100 dark:border-zinc-800 pt-3 sm:pt-4 shrink-0">
                            <button
                                id="wizard-btn-prev"
                                type="button"
                                onClick={wizardPrev}
                                className="px-3 sm:px-4 py-2 text-xs sm:text-sm font-bold text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors cursor-pointer"
                            >
                                {wizardCurrentStep === 1 ? "Voltar ao Menu" : "Anterior"}
                            </button>

                            <div className="flex gap-1.5 items-center" id="wizard-dots">
                                {Array.from({ length: totalSteps }).map((_, i) => (
                                    <span
                                        key={i}
                                        className={`h-2 rounded-full transition-all duration-300 ${
                                            i + 1 === wizardCurrentStep
                                                ? "w-6 bg-red-600"
                                                : "w-2 bg-zinc-200 dark:bg-zinc-700"
                                        }`}
                                    />
                                ))}
                            </div>

                            <button
                                id="wizard-btn-next"
                                type="button"
                                onClick={wizardNext}
                                className={`px-4 sm:px-5 py-2.5 text-xs sm:text-sm font-bold text-white rounded-xl shadow-md transition-all active:scale-95 cursor-pointer ${
                                    wizardCurrentStep === totalSteps
                                        ? "bg-emerald-600 hover:bg-emerald-700 shadow-emerald-600/20"
                                        : "bg-red-600 hover:bg-red-700 shadow-red-600/20"
                                }`}
                            >
                                {wizardCurrentStep === totalSteps ? "Concluído" : "Próximo"}
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
