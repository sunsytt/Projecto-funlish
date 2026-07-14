import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Search, FileStack } from "lucide-react";
import { useBreadcrumb } from "../../context/PageHeaderContext";
// import { materialesApi } from "../../services/materialesApi";

export default function UnidadDetail() {
  const { grupoId, unidadId } = useParams();
  const navigate = useNavigate();
  const [temas, setTemas] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [temaExpandidoId, setTemaExpandidoId] = useState(null);

  useBreadcrumb([
    { label: "Material", to: `/grupos/${grupoId}/material` },
    { label: `Unidad ${unidadId}` },
    { label: "Temas" },
  ]);

  useEffect(() => {
    cargarTemas();
  }, [unidadId]);

  async function cargarTemas() {
    // const datos = await materialesApi.listarTemas(grupoId, unidadId);
    const datos = [
      { id: 1, titulo: "Past Simple", numArchivos: 5, descripcion: "We will talk about a time", publicado: "20 jun 2026" },
      { id: 2, titulo: "Future plans y predictions", numArchivos: 3, descripcion: "We will talk about a time", publicado: "20 jun 2026" },
      { id: 3, titulo: "At the Supermarket: Quantifiers", numArchivos: 4, descripcion: "We will talk about a time", publicado: "20 jun 2026" },
      { id: 4, titulo: "Making Comparisons", numArchivos: 3, descripcion: "We will talk about a time", publicado: "20 jun 2026" },
    ];
    setTemas(datos);
  }

  const temasFiltrados = temas.filter((t) =>
    t.titulo.toLowerCase().includes(busqueda.toLowerCase())
  );
  const totalArchivos = temas.reduce((sum, t) => sum + t.numArchivos, 0);

  return (
    <div>
      <h1 className="text-3xl font-bold text-brand-midnight mb-1">
        Unidad {unidadId}
      </h1>
      {temas.length > 0 && (
        <p className="text-brand-midnight/60 text-sm mb-4">
          {temas.length} Temas - {totalArchivos} Materiales
        </p>
      )}

      <div className="relative mb-6">
        <Search
          className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-midnight/40"
          size={18}
        />
        <input
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          placeholder="Buscar temas"
          className="w-full bg-neutral-inactive/60 rounded-full pl-11 pr-4 py-3 text-sm focus:outline-none"
        />
      </div>

      <h2 className="text-lg font-bold text-brand-midnight mb-3">
        Temas de la unidad
      </h2>

      {temasFiltrados.length === 0 ? (
        <div className="bg-brand-white rounded-2xl flex flex-col items-center justify-center gap-4 py-24 text-center">
          <img
            src="/src/assets/mascot-rabbit.png"
            alt="Sin materiales"
            className="h-24 w-24 object-contain"
          />
          <p className="text-brand-midnight/70 max-w-sm">
            Tu profesor aún no ha compartido materiales de apoyo para este tema.
            <br />
            ¡Vuelve más tarde!
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {temasFiltrados.map((tema) => (
            <div key={tema.id} className="bg-brand-white rounded-2xl p-5 shadow-sm">
              <button
                onClick={() =>
                  setTemaExpandidoId(temaExpandidoId === tema.id ? null : tema.id)
                }
                className="w-full flex items-start justify-between gap-4 text-left"
              >
                <div className="flex items-start gap-4">
                  <span className="bg-fileType-pdf/30 rounded-full p-3 shrink-0">
                    <FileStack size={20} className="text-brand-midnight" />
                  </span>
                  <div>
                    <h3 className="font-bold text-brand-midnight text-lg">
                      {tema.titulo}
                    </h3>
                    <p className="text-sm text-brand-midnight/60">
                      {tema.numArchivos} Archivos
                    </p>
                    <p className="text-sm text-brand-midnight/60">{tema.descripcion}</p>
                  </div>
                </div>
                <span className="text-xs text-brand-midnight/50 whitespace-nowrap">
                  Publicado: {tema.publicado}
                </span>
              </button>

              {temaExpandidoId === tema.id && (
                <div className="mt-4 pt-4 border-t border-neutral-inactive flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <p className="text-sm text-brand-midnight/60">
                    Vista previa: {tema.numArchivos} archivo(s) disponibles
                  </p>
                  <button
                    onClick={() =>
                      navigate(`/grupos/${grupoId}/material/${unidadId}/${tema.id}`)
                    }
                    className="bg-status-info text-brand-white text-sm font-medium px-4 py-2 rounded-full"
                  >
                    Ver material
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}