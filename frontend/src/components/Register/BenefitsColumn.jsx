import React from 'react';
import { Link } from 'react-router';
import { Users, ThumbsUp, History, ArrowRight } from 'lucide-react';

export default function BenefitsColumn() {
  return (
    <div className="w-full md:w-5/12 bg-zinc-900 dark:bg-zinc-950 p-8 lg:p-12 text-white relative overflow-hidden flex flex-col justify-between">
      <div className="absolute top-0 right-0 -mt-20 -mr-20 w-64 h-64 bg-red-600/20 blur-3xl rounded-full pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-48 h-48 bg-blue-600/10 blur-3xl rounded-full pointer-events-none"></div>

      <div className="relative z-10">
        <h2 className="text-3xl lg:text-4xl font-black tracking-tight mb-2">
          Faça parte da <br /><span className="text-red-500">solução.</span>
        </h2>
        <p className="text-zinc-400 text-sm mb-10 leading-relaxed">
          Criar uma conta no Radar Territorial leva menos de um minuto e transforma completamente a sua experiência com a gestão pública e com seu bairro.
        </p>

        <div className="space-y-8">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-red-500/20 border border-red-500/30 flex items-center justify-center flex-shrink-0">
              <Users className="h-5 w-5 text-red-400" />
            </div>
            <div>
              <h4 className="font-bold text-lg mb-1">Interação Comunitária</h4>
              <p className="text-zinc-400 text-sm">Comente, reaja e participe ativamente dos debates e relatos feitos pelos outros moradores do seu bairro na plataforma.</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-blue-500/20 border border-blue-500/30 flex items-center justify-center flex-shrink-0">
              <ThumbsUp className="h-5 w-5 text-blue-400" />
            </div>
            <div>
              <h4 className="font-bold text-lg mb-1">Engajamento Coletivo</h4>
              <p className="text-zinc-400 text-sm">Apoie os problemas dos seus vizinhos votando nas postagens deles para dar mais peso e urgência às demandas da região.</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-purple-500/20 border border-purple-500/30 flex items-center justify-center flex-shrink-0">
              <History className="h-5 w-5 text-purple-400" />
            </div>
            <div>
              <h4 className="font-bold text-lg mb-1">Histórico Unificado</h4>
              <p className="text-zinc-400 text-sm">Tenha todos os seus pedidos de melhoria salvos e organizados em um único painel pessoal.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-10 mt-12 pt-8 border-t border-zinc-800 text-sm text-zinc-500 flex justify-between items-center">
        <span>Já tem uma conta?</span>
        <Link to="/login" className="text-white font-bold hover:text-red-400 transition-colors flex items-center gap-1">
          Fazer Login <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}
