import { useState } from "react";
import { X, Minus, Plus, AlertTriangle } from "lucide-react";

export default function FilePreviewModal({ archivo, onCerrar }) {
  const [pagina, setPagina] = useState(1);
  const [errorCarga, setErrorCarga] = useState(false);
  const totalPaginas = archivo.totalPaginas ?? 8; // mock, ajustar cuando venga del backend

  return (
    <div className="fixed inset-0 bg-brand-midnight/60 flex items-center justify-center z-50 p-4">
      <div className="bg-brand-white rounded-2xl shadow-xl w-full max-w-3xl overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-inactive">
          <h3 className="font-bold text-brand-midnight">{archivo.nombre}</h3>
          <button
            onClick={onCerrar}
            className="text-brand-midnight/60 hover:text-brand-midnight"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-6">
          {errorCarga ? (
            <div className="h-96 flex flex-col items-center justify-center gap-3 bg-neutral-inactive/30 rounded-xl text-brand-midnight/60">
              <AlertTriangle size={28} />
              <p>No se pudo visualizar el archivo.</p>
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
              <a
                href={archivo.url}
                target="_blank"
                rel="noreferrer"
                className="bg-status-info text-brand-white text-sm font-medium px-4 py-2 rounded-full"
              >
                Abrir enlace
              </a>
            </div>
          ) : (
            // pdf: placeholder visual (sin renderizado real todavía, solo la UI de navegación)
            <div className="h-96 bg-neutral-inactive/20 rounded-xl border border-neutral-inactive" />
          )}
        </div>

        {archivo.tipo === "pdf" && !errorCarga && (
          <div className="flex items-center justify-between px-6 pb-6">
            <span className="text-sm text-brand-midnight/60">
              PDF{archivo.tamano ? ` - ${archivo.tamano}` : ""}
            </span>
            <div className="flex items-center gap-3">
              <span className="bg-neutral-inactive/60 px-4 py-2 rounded-full text-sm font-medium">
                Página {pagina} de {totalPaginas}
              </span>
              <button
                onClick={() => setPagina((p) => Math.max(1, p - 1))}
                className="p-2 rounded-full border border-brand-steel/30"
              >
                <Minus size={14} />
              </button>
              <button
                onClick={() => setPagina((p) => Math.min(totalPaginas, p + 1))}
                className="p-2 rounded-full border border-brand-steel/30"
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