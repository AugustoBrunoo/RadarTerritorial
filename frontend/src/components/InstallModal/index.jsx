import React, { useState, useEffect } from 'react';

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
        }
    }, [isOpen]);

    useEffect(() => {
        if (window.lucide) {
            window.lucide.createIcons();
        }
    }, [installStep, wizardCurrentStep, isOpen]);

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
                icon: "compass"
            },
            {
                title: "Menu de Compartilhamento",
                desc: "Com o painel do Radar Territorial aberto, toque no botão de **Compartilhar** (o ícone de um quadrado com uma seta apontando para cima) localizado na barra inferior do Safari.",
                icon: "share"
            },
            {
                title: "Adicionar à Tela de Início",
                desc: "Role a lista de opções para baixo e selecione o item **'Adicionar à Tela de Início'**. Se desejar, personalize o nome do atalho e confirme tocando em **'Adicionar'** no canto superior direito.",
                icon: "plus-circle"
            }
        ],
        android: [
            {
                title: "Abra no Google Chrome",
                desc: "Certifique-se de carregar esta página de maneira nativa de dentro do aplicativo do **Google Chrome** no seu dispositivo Android.",
                icon: "globe"
            },
            {
                title: "Acesse as Opções",
                desc: "Toque no ícone de **três pontos verticais** situado no canto superior direito do Chrome para expandir a lista de controle do navegador.",
                icon: "more-vertical"
            },
            {
                title: "Instalar Aplicativo",
                desc: "Toque na opção **'Instalar aplicativo'** (ou **'Adicionar à tela inicial'**). Um prompt de confirmação do sistema Android surgirá na tela, valide-o clicando em **'Instalar'**.",
                icon: "download"
            }
        ]
    };

    const renderWizardStep = () => {
        if (!wizardCurrentOS) return null;
        const data = stepsContent[wizardCurrentOS][wizardCurrentStep - 1];
        
        return (
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
                <div className="bg-red-50 dark:bg-red-950/30 text-red-600 dark:text-red-400 p-4 rounded-2xl flex-shrink-0 mb-3 sm:mb-0">
                    <i data-lucide={data.icon} className="h-8 w-8"></i>
                </div>
                <div>
                    <h4 className="text-xl font-bold mb-2">{data.title}</h4>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed" dangerouslySetInnerHTML={{__html: data.desc.replace(/\*\*(.*?)\*\*/g, '<strong class="text-zinc-900 dark:text-white">$1</strong>')}}></p>
                </div>
            </div>
        );
    };

    return (
        <div id="install-modal" className={`fixed inset-0 z-[100] items-center justify-center bg-black/60 backdrop-blur-md transition-opacity duration-300 px-4 ${isOpen ? "flex opacity-100" : "opacity-0 pointer-events-none"}`}>
            <div id="install-modal-content" className={`bg-white dark:bg-zinc-900 w-full max-w-lg rounded-[2.5rem] p-6 sm:p-8 shadow-2xl border border-zinc-200 dark:border-zinc-800 transform transition-transform duration-300 relative text-zinc-900 dark:text-white ${isOpen ? "scale-100" : "scale-95"}`}>

                <button onClick={onClose}
                    className="absolute top-6 right-6 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 bg-zinc-100 dark:bg-zinc-800 p-2 rounded-full transition-colors">
                    <i data-lucide="x" className="h-5 w-5"></i>
                </button>

                <div id="install-step-selection" className={"block " + (installStep === "selection" ? "block" : "hidden")}>
                    <h3 className="text-2xl font-black mb-2 tracking-tight">Instalar na Tela Inicial</h3>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-8">Escolha a plataforma do seu aparelho para ver o
                        passo a passo dedicado:</p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <button onClick={() => startInstallFlow('ios')}
                            className="flex flex-col items-center gap-4 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 hover:border-red-500 dark:hover:border-red-500 hover:bg-zinc-50 dark:hover:bg-zinc-800/40 transition-all text-center group">
                            <div
                                className="bg-zinc-100 dark:bg-zinc-800 p-4 rounded-full text-zinc-700 dark:text-zinc-300 group-hover:scale-110 transition-transform">
                                <i data-lucide="smartphone" className="h-8 w-8"></i>
                            </div>
                            <div>
                                <strong className="block text-lg">iPhone / iOS</strong>
                                <span className="text-xs text-zinc-400 block mt-1">Usando o Safari</span>
                            </div>
                        </button>

                        <button onClick={() => startInstallFlow('android')}
                            className="flex flex-col items-center gap-4 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 hover:border-red-500 dark:hover:border-red-500 hover:bg-zinc-50 dark:hover:bg-zinc-800/40 transition-all text-center group">
                            <div
                                className="bg-zinc-100 dark:bg-zinc-800 p-4 rounded-full text-zinc-700 dark:text-zinc-300 group-hover:scale-110 transition-transform">
                                <i data-lucide="tablet-smartphone" className="h-8 w-8"></i>
                            </div>
                            <div>
                                <strong className="block text-lg">Android</strong>
                                <span className="text-xs text-zinc-400 block mt-1">Usando o Chrome</span>
                            </div>
                        </button>
                    </div>
                </div>

                <div id="install-step-wizard" className={"hidden " + (installStep === "wizard" ? "block" : "hidden")}>
                    <div className="flex items-center gap-2 mb-6">
                        <span id="wizard-os-badge" className={wizardCurrentOS === "ios" ? "px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-zinc-100 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200" : "px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400"}>{wizardCurrentOS === "ios" ? "Apple iOS" : "Android OS"}</span>
                        <span id="wizard-progress-text" className="text-xs font-bold text-zinc-400">Passo {wizardCurrentStep} de {totalSteps}</span>
                    </div>

                    <div className="min-h-[160px] flex flex-col justify-center mb-8">
                        <div id="wizard-content-step" className="text-center sm:text-left">{renderWizardStep()}</div>
                    </div>

                    <div className="flex items-center justify-between border-t border-zinc-100 dark:border-zinc-800 pt-4">
                        <button id="wizard-btn-prev" onClick={wizardPrev} className="px-4 py-2 text-sm font-bold text-zinc-500 hover:text-zinc-900 dark:hover:text-white disabled:opacity-30 disabled:pointer-events-none">{wizardCurrentStep === 1 ? "Voltar ao Menu" : "Anterior"}</button>
                        <div className="flex gap-1" id="wizard-dots">{Array.from({ length: totalSteps }).map((_, i) => (<span key={i} className={"h-2 rounded-full transition-all duration-300 " + (i + 1 === wizardCurrentStep ? "w-6 bg-red-600" : "w-2 bg-zinc-200 dark:bg-zinc-700")}></span>))}</div>
                        <button id="wizard-btn-next" onClick={wizardNext} className={"px-5 py-2.5 text-sm font-bold text-white rounded-xl shadow-md transition-colors " + (wizardCurrentStep === totalSteps ? "bg-emerald-600 hover:bg-emerald-700" : "bg-red-600 hover:bg-red-700")}>{wizardCurrentStep === totalSteps ? "Concluído" : "Próximo"}</button>
                    </div>
                </div>

            </div>
        </div>
    );
}
