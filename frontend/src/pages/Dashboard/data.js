// Dashboard Constants and Mock Data Generator

export const EIXOS = {
  "geral": { label: "Visão Geral", desc: "Acompanhe todos os problemas reportados na sua região.", subs: [] },
  "infra": { label: "Infraestrutura e Vias", desc: "Foco em asfalto, calçadas e árvores perigosas.", subs: ["Buraco na via", "Calçada danificada", "Árvore com risco de queda"], op: "Pref. / SMO" },
  "saneamento": { label: "Saneamento e Limpeza", desc: "Vazamentos, lixo acumulado e bueiros entupidos.", subs: ["Vazamento de água/esgoto", "Acúmulo de lixo/Entulho", "Bueiro entupido"], op: "Águas do Rio / Comlurb" },
  "iluminacao": { label: "Iluminação e Segurança", desc: "Ruas às escuras e fiações elétricas rompidas.", subs: ["Poste com luz apagada", "Fios caídos na rua"], op: "RioLuz / Light" },
  "mobilidade": { label: "Transporte e Mobilidade", desc: "Qualidade do mobiliário de transporte e cruzamentos.", subs: ["Semáforo defeituoso", "Ponto de ônibus danificado"], op: "Mobi-Rio / CET-Rio" },
  "inseguranca": { label: "Insegurança e Território", desc: "Cerceamento urbano e riscos à integridade no território.", subs: ["Barricada na via", "Ocupação irregular", "Outra situação de risco"], op: "PMERJ / SEOP" }
};

export const CONTATOS_ORGAOS = {
  "infra": {
      "Geral": { orgao: "Prefeitura / SMO", contato: "Central 1746", link: "https://www.1746.rio", instrucoes: "Informe o número do poste mais próximo ou ponto de referência comercial para agilizar a equipe de conservação." },
      "Campo Grande": { orgao: "Subprefeitura ZO / SMO Campo Grande", contato: "Central 1746", link: "https://www.1746.rio", instrucoes: "Chamados urgentes podem ser acompanhados diretamente na gerência local em Campo Grande." },
      "Inhoaíba": { orgao: "Conservação Paciência (SMO)", contato: "Central 1746", link: "https://www.1746.rio", instrucoes: "Para buracos e calçadas, cite pontos de referência claros no chamado para a gerência de Paciência." },
      "Cosmos": { orgao: "Conservação Paciência (SMO)", contato: "Central 1746", link: "https://www.1746.rio", instrucoes: "Para buracos e calçadas, cite pontos de referência claros no chamado para a gerência de Paciência." }
  },
  "saneamento": {
      "Geral": { orgao: "Rio+Saneamento / Comlurb", contato: "0800 772 1026", link: "https://riomaissaneamento.com.br", instrucoes: "Para vazamentos de água na calçada, informe se há afundamento de pista. Problemas de lixo reportar no 1746." }
  },
  "iluminacao": {
      "Geral": { orgao: "Smart Luz / Light", contato: "Central 1746", link: "https://www.1746.rio", instrucoes: "Poste apagado é responsabilidade da Smart Luz via 1746. Fio partido piscando é urgência com a Light pelo 0800 021 0196." }
  },
  "mobilidade": {
      "Geral": { orgao: "Mobi-Rio / CET-Rio", contato: "Central 1746", link: "https://www.1746.rio", instrucoes: "Vandalismo em estações do BRT, pontos de ônibus danificados ou semáforos apagados devem ser reportados aqui." }
  },
  "inseguranca": {
      "Geral": { orgao: "40º BPM (PMERJ) / SEOP", contato: "190", link: "https://sepm.rj.gov.br/", instrucoes: "Em caso de risco imediato à vida ou barricadas em andamento, ligue 190. Problemas de desordem pública reportar via 1746." }
  }
};

export const bairros = ["Campo Grande", "Cosmos", "Inhoaíba"];
export const ruas = {
  "Campo Grande": { list: ["Av. Cesário de Melo", "Estrada do Monteiro", "Estrada do Campinho", "Rua Viúva Dantas"], baseCoords: [-22.8986, -43.5598] },
  "Cosmos": { list: ["Estrada de Cosmos", "Rua Guarujá", "Travessa das Flores"], baseCoords: [-22.9095, -43.6062] },
  "Inhoaíba": { list: ["Rua Seabra Filho", "Rua Paciente", "Estrada de Inhoaíba"], baseCoords: [-22.9038, -43.5855] }
};


