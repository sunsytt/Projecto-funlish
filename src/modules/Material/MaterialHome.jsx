import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ModuleBanner from "../../components/ui/ModuleBanner";
import { useBreadcrumb } from "../../context/PageHeaderContext";
import { getRandomCardColor } from "../../utils/cardColors";
import UnidadCard from "./components/UnidadCard";
// import { materialesApi } from "../../services/materialesApi";

export default function MaterialHome() {
  const { grupoId } = useParams();
  const navigate = useNavigate();
  const [unidades, setUnidades] = useState([]);

  useBreadcrumb([{ label: "Material" }]);

  async function cargarUnidades() {
    // const datos = await materialesApi.listarUnidades(grupoId);
    const datos = [
      { id: 1, nombre: "Unidad 1", descripcion: "Verb To Be & Greetings", numTemas: 5 },
      { id: 2, nombre: "Unidad 2", descripcion: "Daily Routines & Frequency Adverbs", numTemas: 4 },
      { id: 3, nombre: "Unidad 3", descripcion: "Past Simple & Time Expressions", numTemas: 2 },
      { id: 4, nombre: "Unidad 4", descripcion: "Future Plans & Predictions", numTemas: 6 },
      { id: 5, nombre: "Unidad 5", descripcion: "Comparatives & Superlatives", numTemas: 3 },
      { id: 6, nombre: "Unidad 6", descripcion: "Modal Verbs & Suggestions", numTemas: 9 },
    ];
    // Asignamos un color de pestaña aleatorio a cada unidad, una sola vez al cargar
    setUnidades(datos.map((u) => ({ ...u, colorClass: getRandomCardColor() })));
  }

  useEffect(() => {
    cargarUnidades();
  }, []);

  return (
    <div>
      <ModuleBanner
        title="Material"
        subtitle="Encuentra todas las guías de estudio, lecturas, audios y recursos que tu profesor ha preparado para ti."
      />
      <h2 className="text-xl font-bold text-brand-midnight mb-6">Unidades</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10">
        {unidades.map((u) => (
          <UnidadCard
            key={u.id}
            nombre={u.nombre}
            descripcion={u.descripcion}
            numTemas={u.numTemas}
            colorClass={u.colorClass}
            onClick={() => navigate(`/grupos/${grupoId}/material/${u.id}`)}
          />
        ))}
      </div>
    </div>
  );
}