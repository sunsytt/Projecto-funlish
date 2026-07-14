import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FileText, Image, Video, Headphones } from "lucide-react";
import { useBreadcrumb } from "../../context/PageHeaderContext";
import FilePreviewModal from "../../components/ui/FilePreviewModal";
// import { materialesApi } from "../../services/materialesApi";

const fileTypeStyles = {
  pdf: { bg: "bg-fileType-pdf/40", icon: FileText },
  image: { bg: "bg-fileType-image/40", icon: Image },
  video: { bg: "bg-fileType-video/40", icon: Video },
  audio: { bg: "bg-fileType-audio/40", icon: Headphones },
};

export default function TemaDetail() {
  const { grupoId, unidadId, temaId } = useParams();
  const [tema, setTema] = useState(null);
  const [archivoActivo, setArchivoActivo] = useState(null);

  useBreadcrumb([
    { label: "Material", to: `/grupos/${grupoId}/material` },
    { label: `Unidad ${unidadId}`, to: `/grupos/${grupoId}/material/${unidadId}` },
  ]);

  useEffect(() => {
    cargarTema();
  }, [temaId]);

  async function cargarTema() {
    // const datos = await materialesApi.obtenerTema(grupoId, unidadId, temaId);
    const datos = {
      titulo: "Present Tenses",
      descripcion:
        "Aprende a diferenciar tus hábitos diarios de las acciones que haces en este preciso instante.",
      archivos: [
        { id: 1, nombre: "Vocabulary_Help_Beatles.pdf", tipo: "pdf", url: "" },
        { id: 2, nombre: "Grammar_Rules.png", tipo: "image", url: "" },
        { id: 3, nombre: "Explanation_Present.mp4", tipo: "video", url: "" },
        { id: 4, nombre: "Listening_Conversation.mp3", tipo: "audio", url: "" },
      ],
    };
    setTema(datos);
  }

  if (!tema) return null;

  return (
    <div>
      <h1 className="text-3xl font-bold text-brand-midnight mb-1">{tema.titulo}</h1>
      <p className="text-brand-midnight/60 text-sm mb-6">
        {tema.archivos.length} Archivos
      </p>

      <div className="bg-brand-white rounded-2xl p-6 shadow-sm">
        <div className="flex items-center gap-4 pb-4 border-b border-neutral-inactive">
          <span className="bg-fileType-pdf/30 rounded-full p-3">
            <FileText size={20} className="text-brand-midnight" />
          </span>
          <div>
            <h2 className="font-bold text-brand-midnight text-lg">{tema.titulo}</h2>
            <p className="text-sm text-brand-midnight/60">
              {tema.archivos.length} Archivos
            </p>
          </div>
        </div>

        <p className="text-brand-midnight/80 my-4">{tema.descripcion}</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {tema.archivos.map((archivo) => {
            const { bg, icon: Icon } = fileTypeStyles[archivo.tipo];
            return (
              <button
                key={archivo.id}
                onClick={() => setArchivoActivo(archivo)}
                className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium text-sm text-brand-midnight ${bg} hover:brightness-95 transition`}
              >
                <Icon size={18} />
                <span className="truncate">{archivo.nombre}</span>
              </button>
            );
          })}
        </div>
      </div>

      {archivoActivo && (
        <FilePreviewModal archivo={archivoActivo} onCerrar={() => setArchivoActivo(null)} />
      )}
    </div>
  );
}