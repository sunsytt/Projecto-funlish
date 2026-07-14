const estilos = {
  completada: "bg-status-success/20 text-status-success border-status-success",
  en_curso: "bg-status-info/20 text-status-info border-status-info",
  sin_entregar: "bg-status-error/20 text-status-error border-status-error",
  asignada: "bg-neutral-inactive/40 text-brand-midnight/60 border-neutral-inactive",
};

const etiquetas = {
  completada: "Completada",
  en_curso: "En curso",
  sin_entregar: "Sin entregar",
  asignada: "Asignada",
};

export default function EstadoBadge({ estado }) {
  return (
    <span
      className={`px-4 py-1.5 rounded-full text-sm font-semibold border border-dashed ${estilos[estado]}`}
    >
      {etiquetas[estado]}
    </span>
  );
}