export const CARD_ACCENT_COLORS = [
  "bg-cardColor-skyBlue",
  "bg-cardColor-celeste",
  "bg-cardColor-lavender",
  "bg-cardColor-mint",
];

export function getRandomCardColor() {
  const i = Math.floor(Math.random() * CARD_ACCENT_COLORS.length);
  return CARD_ACCENT_COLORS[i];
}