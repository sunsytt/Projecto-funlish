const COLORES = [
  "bg-cardColor-skyBlue",
  "bg-cardColor-celeste",
  "bg-cardColor-lavender",
  "bg-cardColor-mint",
  "bg-skill-reading",
  "bg-skill-writing",
  "bg-skill-listening",
  "bg-skill-speaking",
];

/**
 * Asigna un color por PIEZA ÚNICA (letra o palabra), no por posición.
 * El texto siempre es oscuro (text-brand-midnight): así se mantiene
 * legible sin importar si el fondo está a color completo, al 40% (en
 * "Tu respuesta") o al 30% (letra ya usada/deshabilitada).
 */
export function asignarColoresAPiezas(piezas) {
  const colorPorValor = new Map();
  let siguienteColor = 0;

  piezas.forEach((valor) => {
    const clave = valor.toLowerCase();
    if (!colorPorValor.has(clave)) {
      colorPorValor.set(clave, COLORES[siguienteColor % COLORES.length]);
      siguienteColor++;
    }
  });

  return piezas.map((valor, i) => ({
    valor,
    id: `${valor}-${i}`,
    bg: colorPorValor.get(valor.toLowerCase()),
    text: "text-brand-midnight",
  }));
}