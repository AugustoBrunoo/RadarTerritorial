import html2pdf from 'html2pdf.js';

const TIME_LABELS = {
  all: 'Todo Histórico',
  '30': 'Últimos 30 dias',
  '90': 'Últimos 3 meses',
  '180': 'Últimos 6 meses',
};

const TAB_ACCENTS = {
  red: { bg: '#fef2f2', border: '#fecaca', text: '#dc2626' },
  blue: { bg: '#eff6ff', border: '#bfdbfe', text: '#2563eb' },
  amber: { bg: '#fffbeb', border: '#fde68a', text: '#d97706' },
  zinc: { bg: '#f4f4f5', border: '#e4e4e7', text: '#18181b' },
};

function escapeHtml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function buildHeaderHtml({ dataAtual, bName, tName, tabName, tabDesc, totalRegistros }) {
  return `
    <div style="border-bottom: 2px solid #d4d4d8; padding-bottom: 16px; margin-bottom: 20px; display: flex; justify-content: space-between; align-items: flex-end;">
      <div>
        <h1 style="margin: 0; font-size: 28px; font-weight: 900; letter-spacing: -0.02em; color: #18181b;">
          Radar<span style="color: #dc2626;">Territorial</span>
        </h1>
        <p style="margin: 4px 0 0 0; font-size: 10px; font-weight: 700; color: #71717a; text-transform: uppercase; letter-spacing: 0.12em;">
          Relatório Oficial de Zeladoria Urbana
        </p>
      </div>
      <div style="text-align: right; font-size: 12px; color: #52525b; line-height: 1.5;">
        <p style="margin: 0;"><strong style="color: #18181b;">Gerado em:</strong> ${escapeHtml(dataAtual)}</p>
        <p style="margin: 0;"><strong style="color: #18181b;">Bairro:</strong> ${escapeHtml(bName)} &nbsp;|&nbsp; <strong style="color: #18181b;">Período:</strong> ${escapeHtml(tName)}</p>
        <p style="margin: 0;"><strong style="color: #18181b;">Registros analisados:</strong> ${totalRegistros}</p>
      </div>
    </div>

    <div style="background-color: #f4f4f5; padding: 14px 18px; border-radius: 12px; margin-bottom: 20px; border: 1px solid #e4e4e7;">
      <h2 style="margin: 0; font-size: 17px; font-weight: 800; color: #18181b;">${escapeHtml(tabName)}</h2>
      <p style="margin: 4px 0 0 0; font-size: 12px; color: #3f3f46; line-height: 1.45;">${escapeHtml(tabDesc)}</p>
    </div>
  `;
}

function buildGeralKpisHtml({ stats, hasScore, notaBairro, resolucaoPct, tempoMedio }) {
  const kpiValueStyle = 'margin: 6px 0 0 0; font-size: 24px; font-weight: 900; color: #18181b; line-height: 1.1;';
  const kpiUndefinedStyle = 'margin: 6px 0 0 0; font-size: 18px; font-weight: 800; color: #71717a; line-height: 1.2;';

  return `
    <div style="background-color: #fafafa; border: 1px solid #e4e4e7; border-radius: 12px; padding: 14px 18px; margin-bottom: 14px; display: flex; justify-content: space-between; align-items: center; page-break-inside: avoid;">
      <div>
        <p style="margin: 0; font-size: 10px; font-weight: 800; color: #71717a; text-transform: uppercase; letter-spacing: 0.08em;">Nota do Bairro</p>
        <p style="margin: 4px 0 0 0; font-size: 11px; color: #52525b;">
          ${hasScore
            ? 'Calculada com base na proporção de relatos resolvidos pelos órgãos públicos.'
            : 'Não houve resposta suficiente dos órgãos públicos (mínimo de 6 respostas).'}
        </p>
      </div>
      <div style="text-align: right; min-width: 140px;">
        ${hasScore
          ? `<span style="font-size: 28px; font-weight: 900; color: #18181b;">${escapeHtml(notaBairro)}</span><span style="font-size: 14px; font-weight: 700; color: #71717a;"> /10</span>`
          : `<span style="font-size: 18px; font-weight: 800; color: #71717a; background-color: #e4e4e7; padding: 4px 10px; border-radius: 8px; display: inline-block;">Não definido</span>`
        }
      </div>
    </div>

    <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; margin-bottom: 24px; page-break-inside: avoid;">
      <div style="border: 1px solid #e4e4e7; padding: 14px; border-radius: 12px; background-color: #ffffff;">
        <p style="margin: 0; font-size: 10px; font-weight: 800; color: #71717a; text-transform: uppercase; letter-spacing: 0.06em;">Em Andamento</p>
        <h3 style="${kpiValueStyle}">${stats.ativas}</h3>
        <p style="margin: 4px 0 0 0; font-size: 10px; color: #71717a;">Chamados ativos</p>
      </div>

      <div style="border: 1px solid #e4e4e7; padding: 14px; border-radius: 12px; background-color: #ffffff;">
        <p style="margin: 0; font-size: 10px; font-weight: 800; color: #71717a; text-transform: uppercase; letter-spacing: 0.06em;">Taxa de Solução</p>
        ${hasScore
          ? `<h3 style="${kpiValueStyle}">${resolucaoPct}%</h3><p style="margin: 4px 0 0 0; font-size: 10px; color: #71717a;">Média geral</p>`
          : `<h3 style="${kpiUndefinedStyle}">Não definido</h3><p style="margin: 4px 0 0 0; font-size: 10px; color: #a1a1aa;">Sem resposta suficiente</p>`
        }
      </div>

      <div style="border: 1px solid #e4e4e7; padding: 14px; border-radius: 12px; background-color: #ffffff;">
        <p style="margin: 0; font-size: 10px; font-weight: 800; color: #71717a; text-transform: uppercase; letter-spacing: 0.06em;">Prazo Médio</p>
        ${hasScore
          ? `<h3 style="${kpiValueStyle}">${tempoMedio} <span style="font-size: 13px; font-weight: 700; color: #71717a;">dias</span></h3><p style="margin: 4px 0 0 0; font-size: 10px; color: #71717a;">Tempo de resposta</p>`
          : `<h3 style="${kpiUndefinedStyle}">Não definido</h3><p style="margin: 4px 0 0 0; font-size: 10px; color: #a1a1aa;">Sem resposta suficiente</p>`
        }
      </div>

      <div style="border: 1px solid #fecaca; background-color: #fef2f2; padding: 14px; border-radius: 12px;">
        <p style="margin: 0; font-size: 10px; font-weight: 800; color: #dc2626; text-transform: uppercase; letter-spacing: 0.06em;">Prazo Vencido</p>
        ${hasScore
          ? `<h3 style="margin: 6px 0 0 0; font-size: 24px; font-weight: 900; color: #dc2626; line-height: 1.1;">${stats.slaEstourado}</h3><p style="margin: 4px 0 0 0; font-size: 10px; color: #ef4444;">&gt; 30 dias sem resposta</p>`
          : `<h3 style="margin: 6px 0 0 0; font-size: 18px; font-weight: 800; color: #ef4444; line-height: 1.2;">Não definido</h3><p style="margin: 4px 0 0 0; font-size: 10px; color: #f87171;">Sem resposta suficiente</p>`
        }
      </div>
    </div>
  `;
}

function buildSpecificKpiHtml({ topProblemCount, topProblemName, cor }) {
  const palette = TAB_ACCENTS[cor] || TAB_ACCENTS.zinc;
  return `
    <div style="border: 1px solid ${palette.border}; background-color: ${palette.bg}; color: ${palette.text}; padding: 20px; border-radius: 12px; margin-bottom: 24px; text-align: center; page-break-inside: avoid;">
      <h3 style="margin: 0 0 4px 0; font-size: 36px; font-weight: 900;">${topProblemCount}</h3>
      <p style="margin: 0; font-size: 16px; font-weight: 800;">${escapeHtml(topProblemName)}</p>
      <p style="margin: 4px 0 0 0; font-size: 12px; opacity: 0.85;">Maior problema reportado neste eixo.</p>
    </div>
  `;
}

function buildBarsSectionHtml(title, entries, barColor = '#3b82f6') {
  if (entries.length === 0) {
    return `
      <div style="margin-bottom: 24px; page-break-inside: avoid;">
        <h3 style="margin: 0 0 12px 0; font-size: 15px; font-weight: 800; color: #18181b; border-bottom: 1px solid #e4e4e7; padding-bottom: 6px;">${escapeHtml(title)}</h3>
        <p style="margin: 0; font-size: 12px; color: #71717a; font-style: italic;">Sem dados registrados neste filtro.</p>
      </div>
    `;
  }

  const maxVal = Math.max(1, entries[0][1]);
  const totalSum = entries.reduce((acc, [, val]) => acc + val, 0) || 1;

  const rowsHtml = entries
    .map(([label, value]) => {
      const widthPct = Math.max(2, Math.round((value / maxVal) * 100));
      const sharePct = Math.round((value / totalSum) * 100);
      return `
        <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 8px;">
          <div style="width: 38%; font-size: 12px; font-weight: 700; color: #3f3f46; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
            ${escapeHtml(label)}
          </div>
          <div style="width: 62%; display: flex; align-items: center; gap: 10px;">
            <div style="flex-grow: 1; background-color: #f4f4f5; border-radius: 6px; height: 16px; overflow: hidden; border: 1px solid #e4e4e7;">
              <div style="background-color: ${barColor}; height: 100%; border-radius: 6px; width: ${widthPct}%;"></div>
            </div>
            <div style="width: 64px; text-align: right; font-size: 12px; font-weight: 800; color: #18181b;">
              ${value} <span style="font-weight: 600; color: #71717a; font-size: 10px;">(${sharePct}%)</span>
            </div>
          </div>
        </div>
      `;
    })
    .join('');

  return `
    <div style="margin-bottom: 24px; page-break-inside: avoid;">
      <h3 style="margin: 0 0 12px 0; font-size: 15px; font-weight: 800; color: #18181b; border-bottom: 1px solid #e4e4e7; padding-bottom: 6px;">${escapeHtml(title)}</h3>
      <div>${rowsHtml}</div>
    </div>
  `;
}

function buildTopRuasTableHtml(topRuas) {
  const bodyHtml =
    topRuas.length === 0
      ? `<tr><td colspan="4" style="padding: 14px; text-align: center; color: #71717a; font-style: italic;">Nenhum problema crítico ativo neste filtro.</td></tr>`
      : topRuas
          .map(([key, val]) => {
            const [rua, bairro, op] = key.split('|');
            return `
              <tr style="border-bottom: 1px solid #f4f4f5;">
                <td style="padding: 9px 6px;">
                  <strong style="display: block; color: #18181b; font-size: 12px;">${escapeHtml(rua)}</strong>
                  <span style="display: block; color: #71717a; font-size: 10px; text-transform: uppercase;">${escapeHtml(op)}</span>
                </td>
                <td style="padding: 9px 6px; color: #52525b; font-size: 12px;">${escapeHtml(bairro)}</td>
                <td style="padding: 9px 6px; text-align: center; font-weight: 700; color: #18181b; font-size: 12px;">${val.registros}</td>
                <td style="padding: 9px 6px; text-align: center; font-weight: 800; color: #2563eb; font-size: 12px;">${val.apoios}</td>
              </tr>
            `;
          })
          .join('');

  return `
    <div style="margin-bottom: 24px; page-break-inside: avoid;">
      <h3 style="margin: 0 0 12px 0; font-size: 15px; font-weight: 800; color: #18181b; border-bottom: 1px solid #e4e4e7; padding-bottom: 6px;">Vias Mais Críticas (Top 5)</h3>
      <table style="width: 100%; border-collapse: collapse; text-align: left;">
        <thead>
          <tr style="font-size: 10px; font-weight: 800; color: #71717a; text-transform: uppercase; letter-spacing: 0.06em; border-bottom: 2px solid #e4e4e7;">
            <th style="padding: 0 6px 8px 6px;">Onde / Responsável</th>
            <th style="padding: 0 6px 8px 6px;">Bairro</th>
            <th style="padding: 0 6px 8px 6px; text-align: center;">Registros</th>
            <th style="padding: 0 6px 8px 6px; text-align: center; color: #2563eb;">Moradores Afetados</th>
          </tr>
        </thead>
        <tbody>${bodyHtml}</tbody>
      </table>
    </div>
  `;
}

function buildRecentReportsTableHtml(filteredData, eixos) {
  const recent = [...filteredData]
    .sort((a, b) => (b.apoios || 0) - (a.apoios || 0))
    .slice(0, 15);

  if (recent.length === 0) return '';

  const rowsHtml = recent
    .map((item) => {
      const eixoLabel = eixos[item.eixo]?.label || item.eixo || 'Outros';
      const isResolved = item.status === 'Resolvido';
      const statusStyle = isResolved
        ? 'background-color: #ecfdf5; color: #059669; border: 1px solid #a7f3d0;'
        : 'background-color: #fef2f2; color: #dc2626; border: 1px solid #fecaca;';

      return `
        <tr style="border-bottom: 1px solid #f4f4f5; page-break-inside: avoid;">
          <td style="padding: 8px 6px;">
            <strong style="display: block; color: #18181b; font-size: 11px;">${escapeHtml(item.category || 'Ocorrência')}</strong>
            <span style="display: block; color: #71717a; font-size: 10px;">${escapeHtml(item.rua)} — ${escapeHtml(item.bairro)}</span>
          </td>
          <td style="padding: 8px 6px; color: #52525b; font-size: 11px;">${escapeHtml(eixoLabel)}</td>
          <td style="padding: 8px 6px; color: #52525b; font-size: 11px;">${escapeHtml(item.operador)}</td>
          <td style="padding: 8px 6px; text-align: center;">
            <span style="display: inline-block; padding: 2px 8px; border-radius: 999px; font-size: 10px; font-weight: 700; ${statusStyle}">
              ${escapeHtml(item.status)}
            </span>
          </td>
          <td style="padding: 8px 6px; text-align: center; font-weight: 800; color: #18181b; font-size: 11px;">${item.apoios || 0}</td>
        </tr>
      `;
    })
    .join('');

  return `
    <div style="margin-top: 8px;">
      <h3 style="margin: 0 0 12px 0; font-size: 15px; font-weight: 800; color: #18181b; border-bottom: 1px solid #e4e4e7; padding-bottom: 6px;">
        Principais Ocorrências Registradas (Top ${recent.length} por Apoios)
      </h3>
      <table style="width: 100%; border-collapse: collapse; text-align: left;">
        <thead>
          <tr style="font-size: 10px; font-weight: 800; color: #71717a; text-transform: uppercase; letter-spacing: 0.06em; border-bottom: 2px solid #e4e4e7;">
            <th style="padding: 0 6px 8px 6px;">Problema / Local</th>
            <th style="padding: 0 6px 8px 6px;">Eixo</th>
            <th style="padding: 0 6px 8px 6px;">Órgão</th>
            <th style="padding: 0 6px 8px 6px; text-align: center;">Status</th>
            <th style="padding: 0 6px 8px 6px; text-align: center;">Apoios</th>
          </tr>
        </thead>
        <tbody>${rowsHtml}</tbody>
      </table>
    </div>
  `;
}

export function exportDashboardCSV({ filteredData, currentTab }) {
  let csvContent = 'data:text/csv;charset=utf-8,ID,Bairro,Rua,Eixo,Categoria,Operador,Status,Dias_Aberto,Apoios,Reaberto\n';
  filteredData.forEach((row) => {
    csvContent += `${row.id},${row.bairro},"${row.rua}",${row.eixo},${row.category},${row.operador},${row.status},${row.diasAberto},${row.apoios},${row.reaberto}\n`;
  });

  const link = document.createElement('a');
  link.setAttribute('href', encodeURI(csvContent));
  link.setAttribute('download', `RadarTerritorial_${currentTab}_${Date.now()}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export async function exportDashboardPDF({
  currentTab,
  bairroFilter,
  timeFilter,
  eixos,
  stats,
  filteredData,
  hasScore,
  notaBairro,
  resolucaoPct,
  tempoMedio,
  topRuas,
  topProblemName,
  topProblemCount,
  cor,
}) {
  const bName = bairroFilter === 'all' ? 'Todos os Bairros' : bairroFilter;
  const tName = TIME_LABELS[timeFilter] || 'Todo Histórico';
  const dataAtual = new Date().toLocaleString('pt-BR');
  const currentEixo = eixos[currentTab] || eixos.geral;

  let htmlPDF = buildHeaderHtml({
    dataAtual,
    bName,
    tName,
    tabName: currentEixo.label,
    tabDesc: currentEixo.desc,
    totalRegistros: filteredData.length,
  });

  if (currentTab === 'geral') {
    htmlPDF += buildGeralKpisHtml({ stats, hasScore, notaBairro, resolucaoPct, tempoMedio });

    const eixoEntries = Object.entries(stats.eixos)
      .map(([key, count]) => [eixos[key]?.label || key, count])
      .sort((a, b) => b[1] - a[1]);
    htmlPDF += buildBarsSectionHtml('Distribuição por Eixo Temático', eixoEntries, '#dc2626');

    const opEntries = Object.entries(stats.ops)
      .map(([op, val]) => [op, val.resolvido + val.pendente])
      .sort((a, b) => b[1] - a[1]);
    htmlPDF += buildBarsSectionHtml('Distribuição por Órgão Responsável', opEntries, '#3b82f6');
  } else {
    htmlPDF += buildSpecificKpiHtml({ topProblemCount, topProblemName, cor });

    const subEntries = Object.entries(stats.subs).sort((a, b) => b[1] - a[1]);
    htmlPDF += buildBarsSectionHtml('Distribuição de Ocorrências por Categoria', subEntries, '#3b82f6');
  }

  htmlPDF += buildTopRuasTableHtml(topRuas);

  if (currentTab === 'geral') {
    htmlPDF += buildRecentReportsTableHtml(filteredData, eixos);
  }

  const tempContainer = document.createElement('div');
  tempContainer.innerHTML = htmlPDF;
  Object.assign(tempContainer.style, {
    position: 'fixed',
    left: '-10000px',
    top: '0',
    width: '794px',
    padding: '36px',
    backgroundColor: '#ffffff',
    color: '#18181b',
    fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    boxSizing: 'border-box',
    opacity: '1',
    pointerEvents: 'none',
    zIndex: '-1',
  });

  document.body.appendChild(tempContainer);

  const opt = {
    margin: [10, 10, 12, 10],
    filename: `RadarTerritorial_${currentTab}_${Date.now()}.pdf`,
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: {
      scale: 2,
      useCORS: true,
      logging: false,
      backgroundColor: '#ffffff',
      onclone: (clonedDoc) => {
        // Remove page stylesheets (Tailwind v4 oklch) so html2canvas only renders self-contained hex styles
        clonedDoc.querySelectorAll('style, link[rel="stylesheet"]').forEach((el) => el.remove());
        clonedDoc.documentElement.style.backgroundColor = '#ffffff';
        clonedDoc.body.style.backgroundColor = '#ffffff';
        clonedDoc.body.style.margin = '0';
      },
    },
    jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
    pagebreak: { mode: ['avoid-all', 'css', 'legacy'] },
  };

  try {
    await new Promise((resolve) => requestAnimationFrame(() => setTimeout(resolve, 100)));
    await html2pdf().set(opt).from(tempContainer).save();
  } finally {
    if (tempContainer.parentNode) {
      tempContainer.parentNode.removeChild(tempContainer);
    }
  }
}
