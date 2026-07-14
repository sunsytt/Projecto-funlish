import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useBreadcrumb } from "../../context/PageHeaderContext";
import ActivityCard from "./components/ActivityCard";
import IniciarActividadModal from "./components/IniciarActividadModal";
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
    const datos = {
      nombre: "Present tenses",
      actividades: [
        {
          id: 1,
          titulo: "Present Tense Trivia",
          fecha: "29 jun 2026",
          tipo: "trivia",
          estado: "completada",
          xpTotal: 100,
          xpGanado: 100,
          progreso: 50,
        },
        {
          id: 2,
          titulo: "Daily Routines Scramble",
          fecha: "25 jun 2026",
          tipo: "scramble",
          estado: "en_curso",
          xpTotal: 150,
          xpGanado: 0,
          progreso: 50,
        },
        {
          id: 3,
          titulo: '"Help!" by The Beatles',
          fecha: "19 jun 2026",
          tipo: "trivia",
          estado: "sin_entregar",
          xpTotal: 200,
          xpGanado: 0,
          progreso: 50,
        },
        {
          id: 4,
          titulo: "Photo Quiz: Food & Quantifiers",
          fecha: "9 jun 2026",
          tipo: "scramble",
          estado: "asignada",
          xpTotal: 200,
          xpGanado: 0,
          progreso: 0,
        },
      ],
    };
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