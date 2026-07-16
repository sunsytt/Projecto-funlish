import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Star, Trophy, CheckCircle2, Hourglass } from "lucide-react";
import { useBreadcrumb } from "../../context/PageHeaderContext";
import { obtenerPerfil } from "./data/mockPerfil";
import PerfilHeader from "./components/PerfilHeader";
import StatCard from "./components/StatCard";
import RendimientoPorTema from "./components/RendimientoPorTema";
import ActividadesMenorRendimiento from "./components/ActividadesMenorRendimiento";
import RankingGrupal from "./components/RankingGrupal";

export default function Perfil() {
  const { grupoId } = useParams();
  const [perfil, setPerfil] = useState(null);

  useBreadcrumb([{ label: "Perfil" }]);

  useEffect(() => {
    cargarPerfil();
  }, []);

  async function cargarPerfil() {
    // const datos = await perfilApi.obtenerPerfil(grupoId);
    const datos = obtenerPerfil(grupoId);
    setPerfil(datos);
  }

  if (!perfil) return null;

  const { alumno, stats, rendimientoPorTema, actividadesMenorRendimiento, ranking } = perfil;

  return (
    <div>
      <PerfilHeader alumno={alumno} />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard
          icon={Star}
          iconBg="bg-status-warning/15"
          iconColor="text-status-warning"
          label="Puntos acumulados"
          value={stats.puntosAcumulados.toLocaleString()}
          valueColor="text-status-warning"
          footer={`+${stats.puntosGanadosEstaSemana} esta semana`}
        />
        <StatCard
          icon={Trophy}
          iconBg="bg-brand-steel/15"
          iconColor="text-brand-steel"
          label="Posición en ranking"
          value={`#${stats.posicionRanking}`}
          valueColor="text-brand-steel"
          footer={`de ${stats.totalAlumnos} alumnos`}
        />
        <StatCard
          icon={CheckCircle2}
          iconBg="bg-status-success/15"
          iconColor="text-status-success"
          label="Actividades completadas"
          value={stats.actividadesCompletadas}
          valueColor="text-status-success"
          footer={`de ${stats.actividadesTotales} totales`}
        />
        <StatCard
          icon={Hourglass}
          iconBg="bg-brand-salmon/20"
          iconColor="text-brand-salmon"
          label="Actividades pendientes"
          value={stats.actividadesPendientes}
          valueColor="text-brand-salmon"
          footer={stats.pendienteVenceHoy ? "próxima vence hoy" : null}
          footerColor="text-status-error"
        />
      </div>

      <div className="flex flex-col gap-6">
        <RendimientoPorTema datos={rendimientoPorTema} />
        <ActividadesMenorRendimiento datos={actividadesMenorRendimiento} />
        <RankingGrupal ranking={ranking} totalAlumnos={stats.totalAlumnos} />
      </div>
    </div>
  );
}