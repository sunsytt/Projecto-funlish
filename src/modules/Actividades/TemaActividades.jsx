import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useBreadcrumb } from "../../context/PageHeaderContext";
import ActivityCard from "./components/ActivityCard";
import IniciarActividadModal from "./components/IniciarActividadModal";
import { obtenerTema } from "./data/mockActividades";

// import { actividadesApi } from "../../services/actividadesApi";

export default function TemaActividades() {
  const { grupoId, temaId } = useParams();
  const navigate = useNavigate();
  const [tema, setTema] = useState(null);
  const [actividadSeleccionada, setActividadSeleccionada] = useState(null);

  useBreadcrumb([
    { label: "Actividades", to: `/grupos/${grupoId}/actividades` },
  ]);

  useEffect(() => {
    cargarActividades();
  }, [temaId]);

  async function cargarActividades() {
  // const datos = await actividadesApi.listarPorTema(grupoId, temaId);
  const datos = obtenerTema(temaId);
  setTema(datos);
}

  if (!tema) return null;

  return (
    <div>
      <h1 className="text-3xl font-bold text-brand-midnight mb-6">{tema.nombre}</h1>

      <div className="flex flex-col gap-4">
        {tema.actividades.map((a) => (
          <ActivityCard key={a.id} actividad={a} onIniciar={setActividadSeleccionada} />
        ))}
      </div>

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