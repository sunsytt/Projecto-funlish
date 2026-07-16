import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Search, FileStack, FileText, Image, Video, Headphones } from "lucide-react";
import { useBreadcrumb } from "../../context/PageHeaderContext";
// import { materialesApi } from "../../services/materialesApi";

const fileTypeStyles = {
  pdf: { bg: "bg-fileType-pdf/40", icon: FileText },
  image: { bg: "bg-fileType-image/40", icon: Image },
  video: { bg: "bg-fileType-video/40", icon: Video },
  audio: { bg: "bg-fileType-audio/40", icon: Headphones },
};

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

  async function cargarTemas() {
    // const datos = await materialesApi.listarTemas(grupoId, unidadId);
    const datos = [
      {
        id: 1,
        titulo: "Past Simple",
        archivos: [
          { id: 1, nombre: "Vocabulary_Help_Beatles.pdf", tipo: "pdf" },
          { id: 2, nombre: "Grammar_Rules.png", tipo: "image" },
          { id: 3, nombre: "Explanation_Present.mp4", tipo: "video" },
          { id: 4, nombre: "Listening_Conversation.mp3", tipo: "audio" },
          { id: 5, nombre: "Reading_Practice.pdf", tipo: "pdf" },
        ],
      },
      {
        id: 2,
        titulo: "Future plans y predictions",
        archivos: [
          { id: 1, nombre: "Future_Forms.pdf", tipo: "pdf" },
          { id: 2, nombre: "Predictions_Chart.png", tipo: "image" },
          { id: 3, nombre: "Listening_Weather.mp3", tipo: "audio" },
        ],
      },
      {
        id: 3,
        titulo: "At the Supermarket: Quantifiers",
        archivos: [
          { id: 1, nombre: "Quantifiers_Guide.pdf", tipo: "pdf" },
          { id: 2, nombre: "Supermarket_Video.mp4", tipo: "video" },
          { id: 3, nombre: "Vocabulary_Food.png", tipo: "image" },
          { id: 4, nombre: "Dialogue_Audio.mp3", tipo: "audio" },
        ],
      },
      {
        id: 4,
        titulo: "Making Comparisons",
        archivos: [
          { id: 1, nombre: "Comparatives_Superlatives.pdf", tipo: "pdf" },
          { id: 2, nombre: "Examples_Chart.png", tipo: "image" },
          { id: 3, nombre: "Practice_Audio.mp3", tipo: "audio" },
        ],
      },
    ];
    setTemas(datos);
  }

  useEffect(() => {
    cargarTemas();
  }, [unidadId]);

  const temasFiltrados = temas.filter((t) =>
    t.titulo.toLowerCase().includes(busqueda.toLowerCase())
  );
  const totalArchivos = temas.reduce((sum, t) => sum + t.archivos.length, 0);

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
                      {tema.archivos.length} Archivos
                    </p>
                  </div>
                </div>
              </button>

              {temaExpandidoId === tema.id && (
                <div className="mt-4 pt-4 border-t border-neutral-inactive">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                    {tema.archivos.map((archivo) => {
                      const { bg, icon: Icon } = fileTypeStyles[archivo.tipo];
                      return (
                        <span
                          key={archivo.id}
                          className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium text-sm text-brand-midnight ${bg}`}
                        >
                          <Icon size={18} className="shrink-0" />
                          <span className="truncate">{archivo.nombre}</span>
                        </span>
                      );
                    })}
                  </div>
                  <button
                    onClick={() =>
                      navigate(`/grupos/${grupoId}/material/${unidadId}/${tema.id}`)
                    }
                    className="text-status-info text-sm font-semibold hover:underline"
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