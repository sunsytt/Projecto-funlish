import { useState } from "react";
import { AlertTriangle, Copy, PartyPopper } from "lucide-react";
//import { estudianteApi } from "../../services/estudianteApi";

export default function UnirseModal({ estudianteId, onCerrar, onUnido }) {
  const [codigo, setCodigo] = useState("");
  const [error, setError] = useState("");
  const [exito, setExito] = useState(null); // { nombreAlumno, nombreGrupo, codigo }

  async function manejarSubmit(e) {
    e.preventDefault();

    if (codigo.trim().length !== 8) {
      setError("El código de acceso debe tener exactamente 8 caracteres");
      return;
    }

    try {
      // const grupo = await estudianteApi.unirseAGrupo(estudianteId, codigo.toUpperCase());
      const grupo = { id: 2, nombreGrupo: "Inglés III", nombreAlumno: "Maia" }; // mock temporal
      setError("");
      setExito({ ...grupo, codigo: codigo.toUpperCase() });
    } catch (err) {
      setError("Código no encontrado. Revisa que esté bien escrito o consulta a tu profesor");
    }
  }

  function copiarCodigo() {
    navigator.clipboard.writeText(exito.codigo);
  }

  return (
    <div className="fixed inset-0 bg-brand-midnight/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm overflow-hidden">
        {exito ? (
          <div className="p-6 flex flex-col items-center text-center gap-3 border-t-4 border-status-success">
            <PartyPopper className="text-status-warning" size={28} />
            <h2 className="text-xl font-bold text-status-info">
              ¡Bienvenid@, {exito.nombreAlumno}!
            </h2>
            <p className="text-sm text-brand-midnight/70">
              Te has unido con éxito al grupo {exito.nombreGrupo}
            </p>
            <button
              onClick={copiarCodigo}
              className="flex items-center gap-2 text-xs bg-brand-glacier px-3 py-1 rounded-full text-brand-midnight"
            >
              Código de acceso: {exito.codigo} <Copy size={12} />
            </button>
            <div className="flex gap-3 mt-4 w-full">
              <button
                onClick={onCerrar}
                className="flex-1 py-2 rounded-full bg-neutral-inactive text-brand-midnight/60 font-medium"
              >
                Salir
              </button>
              <button
                onClick={() => onUnido(exito)}
                className="flex-1 py-2 rounded-full bg-brand-midnight text-white font-medium"
              >
                Ir al grupo
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={manejarSubmit} className="p-6">
            <h2 className="text-lg font-bold text-status-info mb-4">
              Unirse a un grupo
            </h2>

            <div className="bg-brand-glacier/60 rounded-xl p-4">
              <p className="text-xs text-brand-midnight/70 mb-3">
                Ingrese el código proporcionado por su docente
              </p>
              <label className="text-xs font-semibold text-brand-midnight">
                Código de acceso
              </label>
              <input
                value={codigo}
                maxLength={8}
                onChange={(e) => setCodigo(e.target.value)}
                className={`w-full mt-1 mb-2 px-3 py-2 rounded-lg border bg-white text-sm focus:outline-none ${
                  error ? "border-status-error" : "border-brand-steel/30"
                }`}
                placeholder="Ej. 586Uz781"
              />

              {error && (
                <div className="flex items-center gap-2 bg-status-error/10 text-status-error text-xs rounded-lg px-3 py-2 mb-2">
                  <AlertTriangle size={14} className="shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <p className="text-xs text-center text-brand-midnight/60 mt-2">
                ¿No tienes un código?
                <br />
                Solicítalo a tu profesor de inglés.
              </p>
            </div>

            <div className="flex gap-3 mt-5">
              <button
                type="button"
                onClick={onCerrar}
                className="flex-1 py-2 rounded-full bg-neutral-inactive text-brand-midnight/70 font-medium"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="flex-1 py-2 rounded-full bg-status-info text-white font-medium"
              >
                Unirme
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}