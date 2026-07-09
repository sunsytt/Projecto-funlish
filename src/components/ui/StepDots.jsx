/**
 * Indicador de progreso de pasos (ej. Registro: paso 1 "¿Quién eres?",
 * paso 2 "Datos"). Distinto del indicador del Login, que se enciende
 * según si el usuario ya empezó a escribir (no representa pasos reales).
 */
export default function StepDots({ total = 2, current = 1 }) {
  return (
    <div className="flex items-center gap-2 mb-8" aria-hidden="true">
      {Array.from({ length: total }).map((_, i) => (
        <span
          key={i}
          className={`w-3 h-3 rounded-full transition-colors duration-300 ${
            i < current ? "bg-brand-steel" : "bg-neutral-inactive"
          }`}
        />
      ))}
    </div>
  );
}