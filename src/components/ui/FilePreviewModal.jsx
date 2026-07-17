import { useState } from "react";
import { X, Minus, Plus, AlertTriangle, ExternalLink } from "lucide-react";

export default function FilePreviewModal({ archivo, onCerrar }) {
  const [pagina, setPagina] = useState(1);
  const [errorCarga, setErrorCarga] = useState(false);

  return (
    <div className="fixed inset-0 bg-brand-midnight/60 flex items-center justify-center z-50 p-4">
      <div className="bg-brand-white rounded-2xl shadow-xl w-full max-w-3xl overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-inactive">
          <h3 className="font-bold text-brand-midnight">{archivo.nombre}</h3>
          <button onClick={onCerrar} className="text-brand-midnight/60 hover:text-brand-midnight">
            <X size={20} />
          </button>
        </div>

        <div className="p-6">
          {errorCarga ? (
            <div className="h-96 flex flex-col items-center justify-center gap-3 bg-neutral-inactive/30 rounded-xl text-brand-midnight/60">
              <AlertTriangle size={28} />
              <p>No se pudo visualizar el archivo.</p>
              <a href={archivo.url} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 text-brand-steel text-sm font-medium hover:underline">
                Abrir en una pestaña nueva <ExternalLink size={14} />
              </a>
            </div>
          ) : archivo.tipo === "image" ? (
            <img
              src={archivo.url}
              alt={archivo.nombre}
              onError={() => setErrorCarga(true)}
              className="w-full h-96 object-contain rounded-xl bg-neutral-inactive/20"
            />
          ) : archivo.tipo === "video" ? (
            <video
              src={archivo.url}
              controls
              onError={() => setErrorCarga(true)}
              className="w-full h-96 rounded-xl bg-brand-black"
            />
          ) : archivo.tipo === "audio" ? (
            <div className="h-40 flex flex-col items-center justify-center gap-3 bg-neutral-inactive/20 rounded-xl">
              <p className="text-sm text-brand-midnight/70 text-center px-6">
                Este audio se aloja en un enlace externo (Drive / YouTube)
              </p>
              <a href={archivo.url} target="_blank" rel="noreferrer" className="bg-status-info text-brand-white text-sm font-medium px-4 py-2 rounded-full">
                Abrir enlace
              </a>
            </div>
          ) : archivo.tipo === "pdf" ? (
            <iframe
              key={pagina}
              src={`${archivo.url}#page=${pagina}`}
              title={archivo.nombre}
              className="w-full h-96 rounded-xl border border-neutral-inactive"
            />
          ) : (
            <div className="h-96 flex items-center justify-center bg-neutral-inactive/20 rounded-xl text-brand-midnight/50 text-sm">
              Tipo de archivo no soportado para vista previa
            </div>
          )}
        </div>

        {archivo.tipo === "pdf" && !errorCarga && (
          <div className="flex items-center justify-between px-6 pb-6">
            <a href={archivo.url} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 text-sm text-brand-midnight/60 hover:text-brand-steel transition">
              Abrir en pestaña nueva <ExternalLink size={13} />
            </a>
            <div className="flex items-center gap-3">
              <span className="bg-neutral-inactive/60 px-4 py-2 rounded-full text-sm font-medium">
                Página {pagina}
              </span>
              <button
                onClick={() => setPagina((p) => Math.max(1, p - 1))}
                className="p-2 rounded-full border border-brand-steel/30 hover:bg-brand-steel/10 transition"
              >
                <Minus size={14} />
              </button>
              <button
                onClick={() => setPagina((p) => p + 1)}
                className="p-2 rounded-full border border-brand-steel/30 hover:bg-brand-steel/10 transition"
              >
                <Plus size={14} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}