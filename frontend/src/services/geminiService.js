import { GoogleGenAI } from '@google/genai';

export async function classifyIssueWithGemini(userDescription) {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

  if (!apiKey) {
    console.warn("⚠️ VITE_GEMINI_API_KEY ausente. Ativando fallback de segurança.");
    return getFallbackCategory();
  }

  const ai = new GoogleGenAI({ apiKey: apiKey.trim() });

  const systemPrompt = `Você é o classificador do sistema 'Radar Territorial'. Analise a descrição do problema do usuário e identifique em qual categoria oficial ele se encaixa.

Categorias Oficiais:
- Infraestrutura Urbana e Vias (macro_eixo: 'infra'): 'Buraco na via', 'Calçada danificada', 'Árvore com risco de queda'
- Saneamento e Limpeza Pública (macro_eixo: 'saneamento'): 'Vazamento de água/esgoto', 'Acúmulo de lixo/Entulho', 'Bueiro entupido'
- Iluminação Pública e Segurança (macro_eixo: 'iluminacao'): 'Poste com luz apagada', 'Fios caídos na rua'
- Transporte e Mobilidade Local (macro_eixo: 'mobilidade'): 'Semáforo defeituoso', 'Ponto de ônibus danificado'
- Dinâmicas de Insegurança e Território (macro_eixo: 'inseguranca'): 'Barricada na via', 'Ocupação irregular'

Regras:
1. Se o problema se encaixar em uma categoria oficial, retorne o nome exato da categoria, seu respectivo macro_eixo e "is_oficial": true.
2. Se o problema for válido mas NÃO se encaixar nas oficiais, retorne "categoria_nome": "Outra situação", o "macro_eixo" mais coerente e "is_oficial": false.
3. CRÍTICO: Se o texto do usuário não tiver QUALQUER relação com problemas urbanos, de infraestrutura, zeladoria ou segurança (exemplo: saudações como "oi", palavras aleatórias, desabafos sem contexto, perguntas de suporte genéricas), retorne OBRIGATORIAMENTE "macro_eixo": null e "categoria_nome": null.
4. Responda ESTRITAMENTE em formato JSON.

Descrição do usuário: "${userDescription}"`;

  // Lista de modelos ativos da família Gemini 3 em ordem de prioridade
  const activeModels = ['gemini-3.6-flash', 'gemini-3.5-flash', 'gemini-3.5-flash-lite'];

  for (const modelName of activeModels) {
    try {
      const response = await ai.models.generateContent({
        model: modelName,
        contents: systemPrompt,
        config: {
          responseMimeType: 'application/json'
        }
      });

      if (response && response.text) {
        console.log(`✅ Sucesso na categorização utilizando o modelo: ${modelName}`);
        const cleanedText = response.text.replace(/```json/g, '').replace(/```/g, '').trim();
        console.log(cleanedText);
        return JSON.parse(cleanedText);
      }
    } catch (error) {
      console.warn(`Tentativa com ${modelName} falhou:`, error.message);
    }
  }

  // Se nenhum responder por instabilidade temporária, aciona o fallback seguro
  return getFallbackCategory();
}

function getFallbackCategory() {
  return {
    categoria_nome: "Outra situação",
    macro_eixo: "inseguranca",
    is_oficial: false,
    fallback_ativo: true
  };
}



