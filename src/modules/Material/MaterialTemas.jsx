import { useState, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Search, BookText, ChevronDown, X } from "lucide-react";
import { usePageBreadcrumb } from "../../context/BreadcrumbContext";
import { EmptyState } from "./MaterialUnidades";

// Mock — reemplazar por fetch al backend cuando exista el endpoint de temas.
// La clave es el id de la unidad.
export const TEMAS_MOCK = {
  1: [
    {
      id: "past-simple",
      nombre: "Past Simple",
      descripcion: "We will talk about a time",
      fecha: "20 jun 2026",
      archivos: [
        "Vocabulary_Help_Beatles.pdf",
        "Grammar_Rules.png",
        "Explanation_Present.mp4",
        "Listening_Conversation.mp3",
        "Practice_Worksheet.pdf",
      ],
    },
    {
      id: "future-plans",
      nombre: "Future plans y predictions",
      descripcion: "We will talk about a time",
      fecha: "20 jun 2026",
      archivos: ["Grammar_Rules.png", "Explanation_Present.mp4", "Listening_Conversation.mp3"],
    },
    {
      id: "supermarket",
      nombre: "At the Supermarket: Quantifiers",
      descripcion: "We will talk about a time",
      fecha: "20 jun 2026",
      archivos: [
        "Vocabulary_Help_Beatles.pdf",
        "Grammar_Rules.png",
        "Explanation_Present.mp4",
        "Listening_Conversation.mp3",
      ],
    },
    {
      id: "comparisons",
      nombre: "Making Comparisons",
      descripcion: "We will talk about a time",
      fecha: "20 jun 2026",
      archivos: ["Grammar_Rules.png", "Explanation_Present.mp4", "Listening_Conversation.mp3"],
    },
  ],
};

function resaltar(texto, busqueda) {
  if (!busqueda.trim()) return texto;
  const partes = texto.split(new RegExp(`(${busqueda})`, "gi"));
  return partes.map((parte, i) =>
    parte.toLowerCase() === busqueda.toLowerCase() ? (
      <mark key={i} className="bg-status-info/15 text-brand-midnight rounded px-0.5">
        {parte}
      </mark>
    ) : (
      parte
    )
  );
}

export default function MaterialTemas() {
  const { grupoId, unidadId } = useParams();
  const navigate = useNavigate();
  const [busqueda, setBusqueda] = useState("");
  const [expandido, setExpandido] = useState(null);

  usePageBreadcrumb([
    { label: "Material", path: `/grupos/${grupoId}/material` },
    { label: `Unidad ${unidadId}`, path: `/grupos/${grupoId}/material/${unidadId}` },
    { label: "Temas" },
  ]);

  const temas = TEMAS_MOCK[unidadId] || [];
  const totalArchivos = temas.reduce((acc, t) => acc + t.archivos.length, 0);

  const temasFiltrados = useMemo(() => {
    if (!busqueda.trim()) return temas;
    return temas.filter((t) => t.nombre.toLowerCase().includes(busqueda.toLowerCase()));
  }, [busqueda, temas]);

  return (
    <div className="p-8">
      <h1 className="text-4xl font-extrabold text-brand-midnight">Unidad {unidadId}</h1>
      {temas.length > 0 && (
        <p className="text-brand-midnight/70 mt-1 mb-6">
          {temas.length} Temas - {totalArchivos} Materiales
        </p>
      )}

      <div className="relative mb-6">
        <input
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          placeholder="Buscar temas"
          className="w-full bg-neutral-inactive/40 rounded-xl py-4 px-5 pr-12 text-brand-midnight placeholder:text-brand-midnight/50
                     outline-none transition-shadow focus:ring-2 focus:ring-status-info"
        />
        {busqueda ? (
          <button
            onClick={() => setBusqueda("")}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-brand-midnight/60 hover:text-brand-midnight transition-colors"
            aria-label="Limpiar búsqueda"
          >
            <X size={20} />
          </button>
        ) : (
          <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-brand-midnight/60 pointer-events-none" size={20} />
        )}
      </div>

      <h2 className="text-xl font-bold text-brand-midnight mb-4">Temas de la unidad</h2>

      {temas.length === 0 ? (
        <EmptyState mensaje="Tu profesor aún no ha compartido materiales de apoyo para este tema. ¡Vuelve más tarde!" />
      ) : temasFiltrados.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 flex flex-col items-center text-center gap-3">
          <Search className="text-brand-midnight/30" size={40} />
          <p className="text-brand-midnight/60">
            No encontramos temas que coincidan con "{busqueda}".
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {temasFiltrados.map((tema) => {
            const isOpen = expandido === tema.id;
            return (
              <div
                key={tema.id}
                className="bg-white rounded-2xl overflow-hidden transition-shadow hover:shadow-md"
              >
                <button
                  onClick={() => setExpandido(isOpen ? null : tema.id)}
                  className="w-full flex items-center gap-4 p-5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-status-info focus-visible:ring-inset"
                  aria-expanded={isOpen}
                >
                  <span className="shrink-0 w-14 h-14 rounded-full bg-brand-glacier/40 flex items-center justify-center">
                    <BookText className="text-brand-midnight" size={24} />
                  </span>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-bold text-brand-midnight">
                      {resaltar(tema.nombre, busqueda)}
                    </h3>
                    <p className="text-sm text-brand-midnight/60 truncate">
                      {tema.archivos.length} Archivos · {tema.descripcion}
                    </p>
                  </div>
                  <span className="text-sm text-brand-midnight/50 shrink-0 hidden sm:block">
                    Publicado: {tema.fecha}
                  </span>
                  <ChevronDown
                    className={`text-brand-midnight/50 transition-transform duration-200 shrink-0 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                    size={20}
                  />
                </button>

                {/* Acordeón animado con grid-template-rows, sin librerías extra */}
                <div
                  className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${
                    isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  }`}
                  aria-hidden={!isOpen}
                >
                  <div className="overflow-hidden">
                    <div className="px-5 pb-5 pt-4 border-t border-brand-midnight/10">
                      <div className="flex flex-wrap gap-2 mb-4">
                        {tema.archivos.slice(0, 4).map((archivo) => (
                          <span
                            key={archivo}
                            className="text-xs px-3 py-1.5 rounded-lg bg-neutral-inactive/40 text-brand-midnight/80 truncate max-w-45"
                          >
                            {archivo}
                          </span>
                        ))}
                        {tema.archivos.length > 4 && (
                          <span className="text-xs px-3 py-1.5 text-brand-midnight/50">
                            +{tema.archivos.length - 4} más
                          </span>
                        )}
                      </div>
                      <button
                        onClick={() => navigate(`/grupos/${grupoId}/material/${unidadId}/${tema.id}`)}
                        className="bg-button-DEFAULT text-white font-semibold rounded-xl px-5 py-2.5
                                   transition-colors hover:bg-button-hover active:bg-button-pressed
                                   focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-status-info focus-visible:ring-offset-2"
                      >
                        Ver material
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}