import { useNavigate, useParams } from "react-router-dom";
import { BookOpen } from "lucide-react";
import { usePageBreadcrumb } from "../../context/BreadcrumbContext";

const COLOR_TABS = [
  "bg-accent-cyan",
  "bg-accent-blue",
  "bg-accent-purple",
  "bg-accent-mint",
  "bg-accent-blue",
  "bg-accent-cyan",
];

// Mock — reemplazar por fetch al backend cuando exista el endpoint de unidades.
const UNIDADES_MOCK = [
  { id: "1", nombre: "Unidad 1", temas: 5 },
  { id: "2", nombre: "Unidad 2", temas: 4 },
  { id: "3", nombre: "Unidad 3", temas: 2 },
  { id: "4", nombre: "Unidad 4", temas: 6 },
  { id: "5", nombre: "Unidad 5", temas: 3 },
  { id: "6", nombre: "Unidad 6", temas: 9 },
];

export function EmptyState({ mensaje }) {
  return (
    <div className="bg-brand-white rounded-2xl p-16 flex flex-col items-center text-center gap-6 animate-[fadeIn_0.3s_ease-out]">
      <BookOpen className="text-brand-sidebar/30" size={56} strokeWidth={1.5} />
      <p className="text-lg text-brand-sidebar max-w-md">{mensaje}</p>
    </div>
  );
}

export default function MaterialUnidades() {
  const navigate = useNavigate();
  const { grupoId } = useParams();

  usePageBreadcrumb([{ label: "Material", path: `/grupos/${grupoId}/material` }]);

  // Cambia a [] para probar el estado vacío (vista 2).
  const unidades = UNIDADES_MOCK;

  return (
    <div className="p-8">
      <div className="rounded-3xl bg-linear-to-r from-cyan-200 to-teal-100 p-8 mb-8 flex items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-extrabold text-brand-sidebar mb-3">Material</h1>
          <p className="text-brand-sidebar/80 max-w-xl">
            Encuentra todas las guías de estudio, lecturas, audios y recursos que tu profesor ha preparado para ti.
          </p>
        </div>
      </div>

      {unidades.length === 0 ? (
        <EmptyState mensaje="Tu profesor aún no ha compartido material para este grupo. ¡Vuelve más tarde!" />
      ) : (
        <>
          <h2 className="text-2xl font-bold text-brand-sidebar mb-4">Unidades</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {unidades.map((unidad, i) => (
              <button
                key={unidad.id}
                onClick={() => navigate(`/grupos/${grupoId}/material/${unidad.id}`)}
                className="relative text-left bg-brand-white border border-skill-reading/30 rounded-2xl p-5 pt-8 min-h-80
                           transition-all duration-200 ease-out
                           hover:shadow-lg hover:-translate-y-1 hover:border-skill-reading/60
                           focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-status-info"
              >
                <span
                  className={`absolute -top-3 left-5 w-16 h-4 rounded-t-md ${COLOR_TABS[i % COLOR_TABS.length]}`}
                />
                <div className="flex items-start justify-between">
                  <h3 className="text-lg font-bold text-brand-sidebar">{unidad.nombre}</h3>
                  <BookOpen className="text-brand-sidebar" size={22} />
                </div>
                <p className="absolute bottom-5 left-5 text-sm text-brand-sidebar/70">
                  {unidad.temas} {unidad.temas === 1 ? "Tema" : "Temas"}
                </p>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}