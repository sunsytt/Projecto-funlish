import { useState, useEffect, useCallback } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import {
  X,
  Minus,
  Plus,
  AlertTriangle,
  FileText,
  Image as ImageIcon,
  Video,
  Headphones,
  Download,
  Loader2,
} from "lucide-react";

// react-pdf necesita un worker de pdf.js. Usamos el CDN para no complicar el bundler.
pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

const TIPO_INFO = {
  pdf: { Icon: FileText, label: "PDF" },
  imagen: { Icon: ImageIcon, label: "Imagen" },
  video: { Icon: Video, label: "Video" },
  audio: { Icon: Headphones, label: "Audio" },
  otro: { Icon: FileText, label: "Archivo" },
};

function detectarProveedorAudio(url = "") {
  if (url.includes("drive.google")) return "drive";
  if (url.includes("youtube") || url.includes("youtu.be")) return "youtube";
  return "desconocido";
}

/**
 * archivo: { nombre, tipo: "pdf" | "imagen" | "video" | "audio",
 *            url?: string, tamano?: string }
 *
 * El audio no se sube como archivo: siempre llega como un link
 * (Google Drive o YouTube) que se embebe en un iframe.
 */
export default function FileViewerModal({ archivo, onClose }) {
  const [pagina, setPagina] = useState(1);
  const [numPaginas, setNumPaginas] = useState(null);
  const [zoom, setZoom] = useState(1);
  const [error, setError] = useState(false);
  const [cargando, setCargando] = useState(true);

  const { Icon, label } = TIPO_INFO[archivo.tipo] || TIPO_INFO.otro;

  // Cerrar con Escape + bloquear scroll del fondo mientras el modal está abierto
  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "Escape") onClose();
    },
    [onClose]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    const overflowOriginal = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = overflowOriginal;
    };
  }, [handleKeyDown]);

  return (
    <div
      className="fixed inset-0 bg-brand-midnight/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="bg-white rounded-3xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 px-6 py-5 border-b border-brand-midnight/10">
          <Icon className="text-brand-midnight" size={22} />
          <h3 className="font-bold text-brand-midnight flex-1 truncate">{archivo.nombre}</h3>

          {archivo.url && !error && (
            <a
              href={archivo.url}
              download
              className="text-brand-midnight/60 hover:text-brand-midnight transition-colors"
              aria-label="Descargar archivo"
            >
              <Download size={20} />
            </a>
          )}
          <button
            onClick={onClose}
            className="text-brand-midnight hover:opacity-60 transition-opacity"
            aria-label="Cerrar"
          >
            <X size={22} />
          </button>
        </div>

        <div className="flex-1 overflow-auto p-6 flex items-center justify-center bg-brand-bgApp min-h-[320px] relative">
          {cargando && !error && archivo.tipo !== "pdf" && (
            <Loader2 className="absolute text-brand-midnight/40 animate-spin" size={32} />
          )}

          {error ? (
            <div className="flex flex-col items-center text-center gap-3 py-16">
              <AlertTriangle className="text-status-error" size={40} />
              <p className="text-brand-midnight font-semibold">No se puede visualizar este archivo</p>
              <p className="text-brand-midnight/60 text-sm max-w-xs">
                Intenta descargarlo o pide a tu profesor que vuelva a compartirlo.
              </p>
            </div>
          ) : archivo.tipo === "pdf" ? (
            archivo.url ? (
              <Document
                file={archivo.url}
                onLoadSuccess={({ numPages }) => {
                  setNumPaginas(numPages);
                  setCargando(false);
                }}
                onLoadError={() => setError(true)}
                loading={<Loader2 className="text-brand-midnight/40 animate-spin" size={32} />}
              >
                <Page pageNumber={pagina} scale={zoom} />
              </Document>
            ) : (
              // Sin URL real (datos mock) — placeholder para no romper la demo
              <div className="bg-neutral-inactive/40 rounded-xl w-full aspect-[4/3] flex items-center justify-center">
                <span className="text-brand-midnight/40 text-sm text-center px-6">
                  Conecta una URL real para previsualizar este PDF
                </span>
              </div>
            )
          ) : archivo.tipo === "imagen" ? (
            <img
              src={archivo.url}
              alt={archivo.nombre}
              className="max-h-[60vh] rounded-xl"
              onLoad={() => setCargando(false)}
              onError={() => setError(true)}
            />
          ) : archivo.tipo === "video" ? (
            <video
              src={archivo.url}
              controls
              className="max-h-[60vh] w-full rounded-xl"
              onLoadedData={() => setCargando(false)}
              onError={() => setError(true)}
            />
          ) : archivo.tipo === "audio" ? (
            <AudioEmbed
              url={archivo.url}
              onLoad={() => setCargando(false)}
              onError={() => setError(true)}
            />
          ) : (
            <p className="text-brand-midnight/60">Vista previa no disponible para este tipo de archivo.</p>
          )}
        </div>

        {archivo.tipo === "pdf" && !error && archivo.url && (
          <div className="flex items-center justify-between px-6 py-4 border-t border-brand-midnight/10">
            <span className="text-sm font-semibold text-brand-midnight">
              {label} · {archivo.tamano || "—"}
            </span>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setPagina((p) => Math.max(1, p - 1))}
                disabled={pagina <= 1}
                className="bg-neutral-inactive/40 rounded-lg px-4 py-2 font-semibold text-brand-midnight disabled:opacity-40"
              >
                Página {pagina} de {numPaginas || "—"}
              </button>
              <button
                onClick={() => setPagina((p) => Math.min(numPaginas || p, p + 1))}
                disabled={pagina >= (numPaginas || 1)}
                className="bg-neutral-inactive/40 rounded-lg px-3 py-2 font-semibold text-brand-midnight disabled:opacity-40"
              >
                Siguiente
              </button>
              <button
                onClick={() => setZoom((z) => Math.max(0.5, z - 0.1))}
                className="border border-brand-midnight/20 rounded-full p-2 text-brand-midnight hover:bg-neutral-inactive/40 transition-colors"
                aria-label="Alejar"
              >
                <Minus size={16} />
              </button>
              <button
                onClick={() => setZoom((z) => Math.min(2, z + 0.1))}
                className="border border-brand-midnight/20 rounded-full p-2 text-brand-midnight hover:bg-neutral-inactive/40 transition-colors"
                aria-label="Acercar"
              >
                <Plus size={16} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function AudioEmbed({ url, onLoad, onError }) {
  const proveedor = detectarProveedorAudio(url);

  if (proveedor === "drive") {
    return (
      <iframe
        src={(url || "").replace("/view", "/preview")}
        className="w-full h-40 rounded-xl"
        allow="autoplay"
        onLoad={onLoad}
        onError={onError}
        title="audio-drive"
      />
    );
  }
  if (proveedor === "youtube") {
    return (
      <iframe
        src={url}
        className="w-full aspect-video rounded-xl"
        allow="autoplay; encrypted-media"
        onLoad={onLoad}
        onError={onError}
        title="audio-youtube"
      />
    );
  }
  return (
    <div className="text-center text-brand-midnight/60">
      <p>Enlace de audio no reconocido (usa un link de Drive o YouTube).</p>
    </div>
  );
}