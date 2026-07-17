import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useBreadcrumb } from "../../context/PageHeaderContext";
import ActivityCard from "./components/ActivityCard";
import IniciarActividadModal from "./components/IniciarActividadModal";
import { obtenerTema } from "./data/mockActividades";

// import { actividadesApi } from "../../services/actividadesApi";

const FILTROS = [
  { id: "todas", label: "Todas" },
  { id: "completada", label: "Completadas" },
  { id: "en-curso", label: "En curso" },
  { id: "por-completar", label: "Por completar" },
];

// "Por completar" agrupa lo que aún no se termina: asignadas y sin entregar
function coincideConFiltro(estadoActividad, filtro) {
  if (filtro === "todas") return true;
  if (filtro === "por-completar") {
    return estadoActividad === "asignada" || estadoActividad === "sin-entregar";
  }
  return estadoActividad === filtro;
}

export default function TemaActividades() {
  const { grupoId, temaId } = useParams();
  const navigate = useNavigate();
  const [tema, setTema] = useState(null);
  const [actividadSeleccionada, setActividadSeleccionada] = useState(null);
  const [filtro, setFiltro] = useState("todas");

  useBreadcrumb([
    { label: "Actividades", to: `/grupos/${grupoId}/actividades` },
  ]);

  async function cargarActividades() {
    // const datos = await actividadesApi.listarPorTema(grupoId, temaId);
    const datos = obtenerTema(temaId);
    setTema(datos);
  }

  useEffect(() => {
    cargarActividades();
  }, [temaId]);

  if (!tema) return null;

  const actividadesFiltradas = tema.actividades.filter((a) =>
    coincideConFiltro(a.estado, filtro)
  );

  return (
    <div>
      <h1 className="text-3xl font-bold text-brand-midnight mb-4">{tema.nombre}</h1>

      <div className="flex flex-wrap gap-2 mb-6">
        {FILTROS.map((f) => (
          <button
            key={f.id}
            onClick={() => setFiltro(f.id)}
            className={`text-sm font-semibold px-4 py-2 rounded-full transition-colors ${
              filtro === f.id
                ? "bg-status-info text-brand-white"
                : "bg-brand-white text-brand-midnight/70 hover:bg-neutral-inactive/40"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {actividadesFiltradas.length === 0 ? (
        <p className="text-brand-midnight/60 bg-brand-white rounded-2xl p-6 text-center">
          No hay actividades en esta categoría.
        </p>
      ) : (
        <div className="flex flex-col gap-4">
          {actividadesFiltradas.map((a) => (
            <ActivityCard key={a.id} actividad={a} onIniciar={setActividadSeleccionada} />
          ))}
        </div>
      )}

      {actividadSeleccionada && (
        <IniciarActividadModal
          actividad={actividadSeleccionada}
          onCancelar={() => setActividadSeleccionada(null)}
          onConfirmar={() =>
            navigate(`/grupos/${grupoId}/actividades/${temaId}/${actividadSeleccionada.id}`)
          }
        />
      )}
    </div>
  );
}