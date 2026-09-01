import React from 'react';
import { Bell, HelpCircle } from 'lucide-react';
import TooltipWrapper from '../TooltipWrapper';

export default function NotificationSettingsCard({ sla = 3 }) {
    return (
        <section 
            aria-labelledby="notification-settings-title"
            className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-[2rem] p-6 shadow-sm space-y-5 relative hover:z-20 focus-within:z-20 transition-all"
        >
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 rounded-xl">
                        <Bell className="h-5 w-5" aria-hidden="true" />
                    </div>
                    <div>
                        <h3 id="notification-settings-title" className="text-base font-bold text-zinc-900 dark:text-white">
                            Notificações e Alertas de Fila
                        </h3>
                        <p className="text-xs text-zinc-500">Escolha quando a equipe do órgão deve ser avisada.</p>
                    </div>
                </div>
                <TooltipWrapper text="Configuração dos gatilhos que disparam e-mails e alertas automáticos para as equipes responsáveis.">
                    <button
                        type="button"
                        aria-label="Informações sobre as Notificações e Alertas"
                        className="p-1 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <HelpCircle className="h-4 w-4" />
                    </button>
                </TooltipWrapper>
            </div>

            <div className="space-y-4 pt-2">
                <label className="flex items-center justify-between p-3.5 bg-zinc-50 dark:bg-zinc-800/40 rounded-2xl border border-zinc-100 dark:border-zinc-800 cursor-pointer">
                    <div>
                        <h4 className="text-xs font-bold text-zinc-900 dark:text-white">Aviso de Relatos com +30 Apoios</h4>
                        <p className="text-[11px] text-zinc-500">Notificar imediatamente a equipe operacional por e-mail.</p>
                    </div>
                    <input 
                        type="checkbox" 
                        defaultChecked 
                        aria-label="Ativar aviso de relatos com mais de 30 apoios"
                        className="w-5 h-5 accent-blue-600 rounded cursor-pointer" 
                    />
                </label>

                <label className="flex items-center justify-between p-3.5 bg-zinc-50 dark:bg-zinc-800/40 rounded-2xl border border-zinc-100 dark:border-zinc-800 cursor-pointer">
                    <div>
                        <h4 className="text-xs font-bold text-zinc-900 dark:text-white">Alerta de Estouro de SLA ({sla} {sla === 1 ? 'dia' : 'dias'})</h4>
                        <p className="text-[11px] text-zinc-500">Enviar aviso quando um chamado ficar sem resposta.</p>
                    </div>
                    <input 
                        type="checkbox" 
                        defaultChecked 
                        aria-label={`Ativar alerta de estouro de SLA de ${sla} dias`}
                        className="w-5 h-5 accent-blue-600 rounded cursor-pointer" 
                    />
                </label>
            </div>
        </section>
    );
}
