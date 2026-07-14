import { ClipboardList } from "lucide-react";

export default function TemaActividadCard({
  nombre,
  numActividades,
  completadas,
  colorClass,
  onClick,
}) {
  const porcentaje =
    numActividades > 0 ? Math.round((completadas / numActividades) * 100) : 0;

  return (
    <button
      onClick={onClick}
      className="text-left bg-brand-white rounded-2xl shadow-sm overflow-hidden hover:shadow-md transition"
    >
      <div className={`h-24 ${colorClass} flex items-center justify-center`}>
        <ClipboardList size={36} className="text-brand-midnight/70" />
      </div>
      <div className="p-4">
        <h3 className="font-bold text-brand-midnight text-lg mb-1">{nombre}</h3>
        <p className="text-sm text-brand-midnight/60 mb-3">
          {completadas}/{numActividades} actividades completadas
        </p>
        <div className="w-full h-2 bg-neutral-inactive rounded-full overflow-hidden">
          <div
            className="h-full bg-status-info rounded-full transition-all"
            style={{ width: `${porcentaje}%` }}
          />
        </div>
      </div>
    </button>
  );
}