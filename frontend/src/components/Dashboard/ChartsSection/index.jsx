import React from 'react';
import { HelpCircle, Landmark, Users, Flame, PhoneCall, Globe } from 'lucide-react';
import { Bar, Doughnut } from 'react-chartjs-2';
import TooltipWrapper from '../../TooltipWrapper';

export default function ChartsSection({
  currentTab,
  chartOpOptions,
  chartOpData,
  chartEixosOptions,
  chartEixosData,
  cor,
  icone,
  topProblemName,
  topProblemCount,
  topProblemApoios,
  subChartType,
  subChartOptions,
  subChartData,
  info,
  bairroFilter
}) {
  if (currentTab === 'geral') {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-lg flex flex-col min-w-0 relative">
          <div className="absolute top-6 right-6">
            <TooltipWrapper text="Mapeamento dos chamados segmentado por entidade operacional responsável pelo reparo final.">
              <HelpCircle className="h-4 w-4 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 cursor-help transition-colors" />
            </TooltipWrapper>
          </div>
          <div className="mb-6"><h2 className="text-lg font-bold text-zinc-900 dark:text-white">Problemas por Órgão Responsável</h2></div>
          <div className="relative h-72 w-full">
            <Bar options={chartOpOptions} data={chartOpData} />
          </div>
        </div>
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-lg min-w-0 relative">
          <div className="absolute top-6 right-6">
            <TooltipWrapper text="Gráfico de distribuição percentual das reclamações vigentes por categoria de serviço urbano.">
              <HelpCircle className="h-4 w-4 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 cursor-help transition-colors" />
            </TooltipWrapper>
          </div>
          <div className="mb-6"><h2 className="text-lg font-bold text-zinc-900 dark:text-white">Ocorrências por Macro-Eixo</h2></div>
          <div className="relative h-72 w-full">
            <Doughnut options={chartEixosOptions} data={chartEixosData} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-lg flex flex-col justify-between relative min-w-0 group">
        <div className="absolute top-6 right-6">
          <TooltipWrapper text="Destaque analítico do problema com maior número de registros ativos neste eixo.">
            <HelpCircle className="h-4 w-4 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 cursor-help transition-colors" />
          </TooltipWrapper>
        </div>
        
        <div>
          <div className="flex items-center gap-3 mb-6">
            <div className={`bg-${cor}-50 dark:bg-${cor}-500/10 border border-${cor}-100 dark:border-${cor}-500/20 p-2.5 rounded-xl transition-transform group-hover:scale-105 duration-300`}>
              {React.createElement(icone, { className: `h-5 w-5 text-${cor}-600 dark:text-${cor}-500` })}
            </div>
            <div>
              <h2 className="text-sm font-bold text-zinc-900 dark:text-white leading-tight">Problema Mais Crítico</h2>
              <p className="text-[11px] font-semibold text-zinc-500 uppercase tracking-wider mt-0.5">Maior Incidência</p>
            </div>
          </div>
          
          <div className="mb-2">
            <h3 className="text-xl sm:text-2xl font-black text-zinc-900 dark:text-white leading-tight mb-2 line-clamp-2">{topProblemName}</h3>
            <div className="flex items-center gap-2">
              <span className={`bg-${cor}-100 text-${cor}-700 dark:bg-${cor}-500/20 dark:text-${cor}-400 px-2 py-0.5 rounded-md font-black text-sm`}>
                {topProblemCount}
              </span>
              <span className="text-xs font-semibold text-zinc-500">registros ativos</span>
            </div>
          </div>
        </div>

        {topProblemApoios > 0 && (
          <div className="mt-5 bg-zinc-50 dark:bg-zinc-950/50 border border-zinc-200/80 dark:border-zinc-800/80 p-3 rounded-xl flex items-center gap-3">
            <div className="bg-blue-100 dark:bg-blue-500/20 p-1.5 rounded-lg shrink-0">
              <Users className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />
            </div>
            <p className="text-[12px] font-medium text-zinc-700 dark:text-zinc-300 leading-tight">
              <strong className="text-zinc-900 dark:text-white font-black">{topProblemApoios} {topProblemApoios === 1 ? 'apoio' : 'apoios'}</strong> nesse tipo de relato
            </p>
          </div>
        )}
      </div>
      
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-lg relative">
        <div className="absolute top-6 right-6">
          <TooltipWrapper text="Divisão minuciosa do volume de ocorrências por subcategoria de problema correspondente.">
            <HelpCircle className="h-4 w-4 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 cursor-help transition-colors" />
          </TooltipWrapper>
        </div>
        <div className="mb-6"><h2 className="text-lg font-bold text-zinc-900 dark:text-white">Natureza da Ocorrência</h2></div>
        <div className="relative h-64 w-full">
          {subChartType === 'bar' ? (
            <Bar options={subChartOptions} data={subChartData} />
          ) : (
            <Doughnut options={subChartOptions} data={subChartData} />
          )}
        </div>
      </div>
      
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-lg flex flex-col justify-between relative min-w-0">
        <div className="absolute top-6 right-6">
          <TooltipWrapper text="Informações de contato do órgão governamental ou concessionária responsável por solucionar este tipo de ocorrência.">
            <HelpCircle className="h-4 w-4 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 cursor-help transition-colors" />
          </TooltipWrapper>
        </div>
        <div>
          <div className="flex items-center gap-3 mb-5">
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-900/30 p-2.5 rounded-xl">
              <Landmark className="h-5 w-5 text-red-600 dark:text-red-500" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-zinc-900 dark:text-white leading-tight">Órgão Responsável</h2>
              <p className="text-xs font-medium text-zinc-500">{bairroFilter !== 'all' ? `em ${bairroFilter}` : 'na Região'}</p>
            </div>
          </div>
          <div className="mb-6">
            <p className="text-xl font-black text-zinc-900 dark:text-white leading-tight mb-2">{info.orgao}</p>
            <p className="text-xs text-zinc-600 dark:text-zinc-400 bg-zinc-50 dark:bg-zinc-950/50 p-3 rounded-xl border border-zinc-200 dark:border-zinc-800/60 leading-relaxed">{info.instrucoes}</p>
          </div>
        </div>
        <div className="space-y-3">
          <a href={`tel:${info.contato.replace(/\D/g, '')}`} className="w-full flex items-center justify-between px-4 py-3 bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700/50 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-xl transition-colors group">
            <div className="flex items-center gap-3">
              <PhoneCall className="h-4 w-4 text-zinc-500 group-hover:text-zinc-900 dark:group-hover:text-white transition-colors" />
              <span className="text-sm font-bold text-zinc-700 dark:text-zinc-200">{info.contato}</span>
            </div>
            <Globe className="h-3 w-3 text-zinc-400 opacity-0" />
          </a>
          <a href={info.link} target="_blank" rel="noreferrer" className="w-full flex items-center justify-between px-4 py-3 bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700/50 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-xl transition-colors group">
            <div className="flex items-center gap-3">
              <Globe className="h-4 w-4 text-zinc-500 group-hover:text-zinc-900 dark:group-hover:text-white transition-colors" />
              <span className="text-sm font-bold text-zinc-700 dark:text-zinc-200">Portal Oficial / Ouvidoria</span>
            </div>
            <Globe className="h-3 w-3 text-zinc-400" />
          </a>
        </div>
      </div>
    </div>
  );
}
