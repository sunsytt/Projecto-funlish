import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ModuleBanner from "../../components/ui/ModuleBanner";
import { useBreadcrumb } from "../../context/PageHeaderContext";
import { getRandomCardColor } from "../../utils/cardColors";
import TemaActividadCard from "./components/TemaActividadCard";
// import { actividadesApi } from "../../services/actividadesApi";

export default function Actividades() {
  const { grupoId } = useParams();
  const navigate = useNavigate();
  const [temas, setTemas] = useState([]);

  useBreadcrumb([{ label: "Actividades" }]);

  useEffect(() => {
    cargarTemas();
  }, []);

  async function cargarTemas() {
    // Los temas ya existen (creados en Material); aquí solo traemos
    // cuántas actividades tiene cada uno y cuántas ha resuelto el estudiante.
    // const datos = await actividadesApi.listarTemas(grupoId);
    const datos = [
      { id: 1, nombre: "Present tenses", numActividades: 4, completadas: 1 },
      { id: 2, nombre: "Past tenses", numActividades: 3, completadas: 3 },
      { id: 3, nombre: "Future forms", numActividades: 5, completadas: 0 },
      { id: 4, nombre: "Modal verbs", numActividades: 2, completadas: 1 },
    ];
    setTemas(datos.map((t) => ({ ...t, colorClass: getRandomCardColor() })));
  }

  return (
    <div>
      <ModuleBanner
        title="Actividades"
        subtitle="Pon a prueba lo que has aprendido con trivias y ejercicios interactivos preparados por tu profesor."
      />
      <h2 className="text-xl font-bold text-brand-midnight mb-6">Temas</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10">
        {temas.map((t) => (
          <TemaActividadCard
            key={t.id}
            nombre={t.nombre}
            numActividades={t.numActividades}
            completadas={t.completadas}
            colorClass={t.colorClass}
            onClick={() => navigate(`/grupos/${grupoId}/actividades/${t.id}`)}
          />
        ))}
      </div>
    </div>
  );
}