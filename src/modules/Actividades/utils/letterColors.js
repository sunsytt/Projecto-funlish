const LETTER_COLORS = [
  { bg: "bg-cardColor-skyBlue", text: "text-brand-midnight" },
  { bg: "bg-cardColor-celeste", text: "text-brand-midnight" },
  { bg: "bg-cardColor-lavender", text: "text-brand-white" },
  { bg: "bg-cardColor-mint", text: "text-brand-midnight" },
  { bg: "bg-skill-reading", text: "text-brand-white" },
  { bg: "bg-skill-writing", text: "text-brand-white" },
  { bg: "bg-skill-listening", text: "text-brand-midnight" },
  { bg: "bg-skill-speaking", text: "text-brand-white" },
];

/**
 * Asigna un color estable a cada letra según su posición en el arreglo
 * original (para que "Tu respuesta" pueda mostrar el mismo color con
 * menor opacidad, como en el diseño de Figma).
 */
export function asignarColoresALetras(letras) {
  return letras.map((letra, i) => ({
    letra,
    id: `${letra}-${i}`,
    ...LETTER_COLORS[i % LETTER_COLORS.length],
  }));
}