import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ModuleBanner from "../../components/ui/ModuleBanner";
import { useBreadcrumb } from "../../context/PageHeaderContext";
import { getRandomCardColor } from "../../utils/cardColors";
import TemaActividadCard from "./components/TemaActividadCard";
import { listarTemas } from "./data/mockActividades";

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
  // const datos = await actividadesApi.listarTemas(grupoId);
  const datos = listarTemas();
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