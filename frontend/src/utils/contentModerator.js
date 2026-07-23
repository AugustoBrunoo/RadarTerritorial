const BAD_WORDS_PATTERNS = [
  /\b(porra|caralho|merda|puta|puto|cacete|buceta|pica|desgraça|desgraçado|fdp)\b/i,
  /\b(filho\s*de\s*puta|vai\s*tomar\s*no\s*c|pau\s*no\s*cu)\b/i,
  /\b(corrupto|safado|ladrão|vagabundo|maldito)\b/i
];

export function validateDescriptionContent(text) {
  if (!text || text.trim().length === 0) {
    return { is_aprovado: true, motivo_rejeicao: null };
  }

  // Normaliza acentos e transforma em minúsculas
  const normalizedText = text.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

  for (const pattern of BAD_WORDS_PATTERNS) {
    if (pattern.test(normalizedText)) {
      return {
        is_aprovado: false,
        motivo_rejeicao: "Identificamos linguagem inadequada ou palavras de baixo calão no relato. Por favor, revise a descrição antes de enviar."
      };
    }
  }

  return { is_aprovado: true, motivo_rejeicao: null };
}
