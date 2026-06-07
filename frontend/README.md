# Radar Territorial

> **Plataforma Participativa para Análise e Priorização de Demandas Urbanas em Campo Grande, Inhoaíba e Cosmos.**

---

## 📋 Sobre o Projeto

O **Radar Territorial** é um ecossistema digital (Web App) desenvolvido em parceria com o programa **Jovens Cientistas Cariocas (JCC)**. O objetivo central é transformar percepções individuais de moradores em indicadores territoriais claros, fortalecendo a gestão pública participativa e a zeladoria urbana na Zona Oeste do Rio de Janeiro.

Utilizando a **Nave do Conhecimento de Campo Grande** como hub tecnológico e ponto focal de engajamento, a população pode relatar problemas de infraestrutura, saneamento e segurança de forma extremamente simples através de QR Codes espalhados pelo território.

### 💡 Por que o Radar Territorial foi construído?
Em grandes territórios periféricos, muitos desafios urbanos permanecem invisíveis devido à dispersão das informações e às barreiras digitais enfrentadas por parcelas da população. O Radar Territorial resolve isso atuando em duas frentes:
1. **Acessibilidade Inclusiva:** Uma plataforma ultra-leve adaptada para dispositivos móveis antigos e com baixo consumo de dados.
2. **Abordagem Híbrida com IA:** Permite o relato tradicional por formulários ou através de uma conversa fluida com um chatbot inteligente, que traduz desabafos de cidadãos com baixo letramento digital em dados estruturados.

---

## 🧠 Arquitetura Híbrida e Inteligência Territorial

O grande diferencial técnico do sistema é a sua capacidade de processar dados qualitativos e quantitativos de forma unificada:

* **O Fluxo Tradicional (MVP Seguro):** O cidadão aponta a câmera para o QR Code, seleciona a categoria do problema através de menus simples (`selects`), adiciona uma localização aproximada e envia o relato.
* **O Fluxo com IA (Inclusão Digital):** Para usuários que encontram dificuldades em formulários, um assistente conversacional processa o texto livre (ou ditado por voz), extrai o problema real e preenche as categorias do sistema automaticamente em segundo plano.

> ⚠️ **Compromisso com a Segurança e Anonimato:** Diante do cenário sensível de segurança pública no Rio de Janeiro, o sistema adota **anonimato absoluto por padrão** (zero autenticação/login para relatos) e **georreferenciamento por aproximação** (registro por ruas/referências, e não coordenadas exatas), protegendo a integridade física dos moradores.

## 🛠️ Tecnologias Utilizadas (Stack)

O projeto foi construído utilizando uma arquitetura moderna e escalável baseada inteiramente em **JavaScript/TypeScript**:

### Frontend
* **React + Vite:** Interface SPA (Single Page Application) ultra-rápida, otimizada para carregamento imediato em redes móveis e aparelhos antigos.
* **Tailwind CSS:** Estilização responsiva e fluida baseada em utilitários.
* **Chart.js & React-Chartjs-2:** Renderização do dashboard estatístico em tempo real para agentes públicos e líderes comunitários.
* **Lucide React:** Biblioteca de ícones minimalistas.

### Backend & Banco de Dados
* **Node.js + Express:** Servidor encarregado de processar as requisições e isolar as chaves de API com segurança.
* **Supabase (PostgreSQL):** Banco de dados relacional robusto encarregado de centralizar os chamados urbanos e pronto para expansões geográficas (PostGIS).
* **Google Gen AI SDK (Gemini):** Motor de Inteligência Artificial utilizado para a extração de entidades e geração de outputs estruturados (JSON) a partir do texto livre dos usuários.

---

## 📂 Organização do Repositório

O projeto adota uma estrutura de pastas limpa e isolada (Monorepo Simplificado) para garantir a separação de responsabilidades e segurança das credenciais:

```text
radar-territorial/
├── backend/                # Servidor Node.js, Express e conexões com APIs de IA e Supabase
│   ├── src/
│   │   ├── controllers/    # Lógica de processamento e inteligência artificial
│   │   ├── routes/         # Definição dos endpoints da API
│   │   └── server.js       # Ponto de entrada do backend
│   └── package.json
│
├── frontend/               # Interface em React, Tailwind e Dashboard de Gráficos
│   ├── src/
│   │   ├── components/     # Componentes reutilizáveis da interface
│   │   ├── data/           # Configurações estáticas (ex: JSON de categorias)
│   │   ├── pages/          # Telas de Formulário, Chatbot e Painel Estatístico
│   │   └── main.jsx        # Inicialização do ecossistema React
│   └── package.json
└── README.md