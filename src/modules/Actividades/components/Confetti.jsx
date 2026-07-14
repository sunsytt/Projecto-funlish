import { useMemo } from "react";

const COLORES = [
  "bg-cardColor-skyBlue",
  "bg-cardColor-celeste",
  "bg-cardColor-lavender",
  "bg-cardColor-mint",
  "bg-skill-writing",
  "bg-skill-speaking",
  "bg-status-warning",
];

/**
 * Animación de confeti en CSS puro. Se monta una sola vez sobre la
 * pantalla de resultados y se detiene sola (las piezas usan
 * animation-fill-mode: forwards y quedan fuera de vista).
 */
export default function Confetti({ piezas = 60 }) {
  const trozos = useMemo(
    () =>
      Array.from({ length: piezas }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 0.6,
        duracion: 2.5 + Math.random() * 1.5,
        color: COLORES[i % COLORES.length],
        rotacion: Math.random() * 360,
        tamano: 6 + Math.random() * 6,
      })),
    [piezas]
  );

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {trozos.map((t) => (
        <span
          key={t.id}
          className={`absolute top-0 rounded-sm ${t.color}`}
          style={{
            left: `${t.left}%`,
            width: t.tamano,
            height: t.tamano * 0.4,
            transform: `rotate(${t.rotacion}deg)`,
            animation: `confetti-caida ${t.duracion}s ease-in ${t.delay}s forwards`,
          }}
        />
      ))}

      <style>{`
        @keyframes confetti-caida {
          0% {
            transform: translateY(-10%) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(700%) rotate(720deg);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}