import { useEffect, useRef, useState } from "react";
import { FileText, MessageCircle, Send } from "lucide-react";
import FilePreviewModal from "../../../components/ui/FilePreviewModal";

export default function PublicacionCard({ publicacion }) {
  const [archivoActivo, setArchivoActivo] = useState(null);
  const [mostrarComentarios, setMostrarComentarios] = useState(false);
  const [nuevoComentario, setNuevoComentario] = useState("");
  const [comentarios, setComentarios] = useState(publicacion.comentarios);
  const listaComentariosRef = useRef(null);

  // Auto-scroll al último comentario cuando se agrega uno nuevo
  useEffect(() => {
    if (mostrarComentarios && listaComentariosRef.current) {
      listaComentariosRef.current.scrollTop = listaComentariosRef.current.scrollHeight;
    }
  }, [comentarios.length, mostrarComentarios]);

  function enviarComentario() {
    const texto = nuevoComentario.trim();
    if (!texto) return;

    // const comentario = await foroApi.comentar(publicacion.id, texto);
    const comentario = {
      id: Date.now(),
      autor: "Tú", // TODO: reemplazar por el usuario de sesión cuando exista AuthContext
      fecha: "Justo ahora",
      texto,
    };
    setComentarios((prev) => [...prev, comentario]);
    setNuevoComentario("");
  }

  return (
    <div className="bg-brand-white rounded-2xl shadow-sm p-6">
      <h2 className="text-xl font-bold text-brand-midnight mb-1">{publicacion.titulo}</h2>
      <div className="flex items-center gap-2 mb-4">
        <span className="w-7 h-7 rounded-full bg-neutral-inactive shrink-0" />
        <span className="text-sm font-medium text-brand-midnight/80">{publicacion.autor}</span>
        <span className="text-brand-midnight/40">•</span>
        <span className="text-sm text-brand-midnight/50">{publicacion.fecha}</span>
      </div>

      <p className="text-brand-midnight/80 mb-4 whitespace-pre-line">{publicacion.contenido}</p>

      {publicacion.archivo && (
        <button
          onClick={() => setArchivoActivo(publicacion.archivo)}
          className="inline-flex items-center gap-2 bg-fileType-pdf/20 hover:bg-fileType-pdf/30 text-brand-midnight font-semibold text-sm px-4 py-3 rounded-xl transition mb-4"
        >
          <FileText size={18} />
          {publicacion.archivo.nombre}
        </button>
      )}

      <button
        onClick={() => setMostrarComentarios((v) => !v)}
        className="flex items-center gap-2 text-brand-midnight/70 font-semibold text-sm hover:text-brand-steel transition"
      >
        <MessageCircle size={18} />
        {comentarios.length} comentarios
      </button>

      {mostrarComentarios && (
        <div className="mt-4 pt-4 border-t border-neutral-inactive">
          {/* Área con scroll interno: nunca crece más allá de max-h-64,
              por más comentarios que se agreguen */}
          <div
            ref={listaComentariosRef}
            className="flex flex-col gap-4 max-h-64 overflow-y-auto pr-2 mb-4"
          >
            {comentarios.map((c) => (
              <div key={c.id} className="flex items-start gap-3">
                <span className="w-7 h-7 rounded-full bg-neutral-inactive shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm">
                    <span className="font-semibold text-brand-midnight">{c.autor}</span>
                    <span className="text-brand-midnight/40 mx-1">•</span>
                    <span className="text-brand-midnight/50">{c.fecha}</span>
                  </p>
                  <p className="text-brand-midnight/80">{c.texto}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Fuera del área con scroll: siempre visible */}
          <div className="flex items-center gap-3 bg-neutral-inactive/30 rounded-xl px-4 py-2">
            <input
              value={nuevoComentario}
              onChange={(e) => setNuevoComentario(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && enviarComentario()}
              placeholder="Escribe un comentario"
              className="flex-1 bg-transparent outline-none text-brand-midnight placeholder:text-brand-midnight/40"
            />
            <button onClick={enviarComentario} disabled={!nuevoComentario.trim()}>
              <Send
                size={18}
                className={nuevoComentario.trim() ? "text-brand-steel" : "text-neutral-inactive"}
              />
            </button>
          </div>
        </div>
      )}

      {archivoActivo && (
        <FilePreviewModal archivo={archivoActivo} onCerrar={() => setArchivoActivo(null)} />
      )}
    </div>
  );
}