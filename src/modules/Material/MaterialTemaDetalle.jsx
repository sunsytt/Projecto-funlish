import { useState } from "react";
import { useParams } from "react-router-dom";
import { FileText, Image as ImageIcon, Video, Headphones, File } from "lucide-react";
import { usePageBreadcrumb } from "../../context/BreadcrumbContext";
import { TEMAS_MOCK } from "./MaterialTemas";
import FileViewerModal from "./FileViewerModal";

function getTipoArchivo(nombre) {
  const ext = nombre.split(".").pop().toLowerCase();
  if (ext === "pdf") return "pdf";
  if (["png", "jpg", "jpeg", "webp", "gif"].includes(ext)) return "imagen";
  if (["mp4", "mov", "webm"].includes(ext)) return "video";
  if (["mp3", "wav"].includes(ext)) return "audio";
  return "otro";
}

// bg = pastilla suave para el ícono, usando tus tokens fileType-* (30% opacidad)
const ICONOS = {
  pdf: { Icon: FileText, bg: "bg-fileType-pdf/30" },
  imagen: { Icon: ImageIcon, bg: "bg-fileType-image/30" },
  video: { Icon: Video, bg: "bg-fileType-video/30" },
  audio: { Icon: Headphones, bg: "bg-fileType-audio/30" },
  otro: { Icon: File, bg: "bg-neutral-inactive/40" },
};

export default function MaterialTemaDetalle() {
  const { grupoId, unidadId, temaId } = useParams();
  const [archivoActivo, setArchivoActivo] = useState(null);

  usePageBreadcrumb([
    { label: "Material", path: `/grupos/${grupoId}/material` },
    { label: `Unidad ${unidadId}`, path: `/grupos/${grupoId}/material/${unidadId}` },
  ]);

  const tema = (TEMAS_MOCK[unidadId] || []).find((t) => t.id === temaId);

  if (!tema) {
    return (
      <div className="p-8">
        <p className="text-brand-midnight/70">No encontramos este tema.</p>
      </div>
    );
  }

  return (
    <div className="p-8">
      <h1 className="text-4xl font-extrabold text-brand-midnight">{tema.nombre}</h1>
      <p className="text-brand-midnight/70 mt-1 mb-6">{tema.archivos.length} Archivos</p>

      <div className="bg-white rounded-2xl p-6">
        <div className="flex items-center gap-4 pb-5 border-b border-brand-midnight/10">
          <span className="w-14 h-14 rounded-full bg-brand-glacier/40 flex items-center justify-center shrink-0">
            <FileText className="text-brand-midnight" size={24} />
          </span>
          <div>
            <h2 className="text-lg font-bold text-brand-midnight">{tema.nombre}</h2>
            <p className="text-sm text-brand-midnight/60">{tema.archivos.length} Archivos</p>
          </div>
        </div>

        <p className="text-brand-midnight py-5">{tema.descripcion}</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {tema.archivos.map((archivo) => {
            const tipo = getTipoArchivo(archivo);
            const { Icon, bg } = ICONOS[tipo];
            return (
              <button
                key={archivo}
                onClick={() => setArchivoActivo({ nombre: archivo, tipo })}
                className={`flex items-center gap-2 ${bg} rounded-xl px-4 py-3 text-left font-semibold text-brand-midnight
                            transition-all duration-150 hover:-translate-y-0.5 hover:shadow-sm
                            focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-status-info`}
              >
                <Icon size={18} className="shrink-0" />
                <span className="truncate">{archivo}</span>
              </button>
            );
          })}
        </div>
      </div>

      {archivoActivo && (
        <FileViewerModal archivo={archivoActivo} onClose={() => setArchivoActivo(null)} />
      )}
    </div>
  );
}