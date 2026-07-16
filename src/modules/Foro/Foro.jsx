import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ModuleBanner from "../../components/ui/ModuleBanner";
import { useBreadcrumb } from "../../context/PageHeaderContext";
import { obtenerForo } from "./data/mockForo";
import PublicacionCard from "./components/PublicacionCard";
import InfoGrupoPanel from "./components/InfoGrupoPanel";
import RankingPreview from "./components/RankingPreview";
import EstadoVacioForo from "./components/EstadoVacioForo";

export default function Foro() {
  const { grupoId } = useParams();
  const [datos, setDatos] = useState(null);

  useBreadcrumb([{ label: "Foro" }]);

  useEffect(() => {
    cargarForo();
  }, []);

  async function cargarForo() {
    // const datos = await foroApi.obtenerForo(grupoId);
    const datos = obtenerForo(grupoId);
    setDatos(datos);
  }

  if (!datos) return null;

  return (
    <div>
      <ModuleBanner
        title="Foro"
        subtitle="Pregunta tus dudas, comparte ideas con tus compañeros y aprende en equipo."
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        <div className="lg:col-span-2 flex flex-col gap-5">
          {datos.publicaciones.length === 0 ? (
            <EstadoVacioForo />
          ) : (
            datos.publicaciones.map((p) => <PublicacionCard key={p.id} publicacion={p} />)
          )}
        </div>

        <div className="flex flex-col gap-6">
          <InfoGrupoPanel grupo={datos.grupo} />
          <RankingPreview ranking={datos.rankingPreview} />
        </div>
      </div>
    </div>
  );
}