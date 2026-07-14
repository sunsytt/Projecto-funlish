import { useEffect, useState } from "react";
import { useCountdown } from "../hooks/useCountdown";

export default function TriviaView({
  pregunta,
  indice,
  total,
  xpTotal,
  tiempoSegundosPregunta,
  onResponder,
  onSiguiente,
}) {
  const [opcionSeleccionada, setOpcionSeleccionada] = useState(null);
  const [respondida, setRespondida] = useState(false);

  const { segundosRestantes, agotado } = useCountdown(
    tiempoSegundosPregunta,
    pregunta.id
  );

  // Reinicia el estado local cada vez que cambia la pregunta
  useEffect(() => {
    setOpcionSeleccionada(null);
    setRespondida(false);
  }, [pregunta.id]);

  // Si se acaba el tiempo, bloquea las opciones y revela el feedback,
  // pero el avance a la siguiente pregunta lo hace el estudiante con "Continuar"
  useEffect(() => {
    if (agotado && !respondida) {
      setRespondida(true);
      onResponder(pregunta.id, opcionSeleccionada, false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [agotado]);

  function handleSeleccion(opcion) {
    if (respondida || agotado) return;
    setOpcionSeleccionada(opcion.id);
  }

  function handleBoton() {
    if (!respondida) {
      if (opcionSeleccionada == null) return;
      const esCorrecta = opcionSeleccionada === pregunta.respuestaCorrectaId;
      setRespondida(true);
      onResponder(pregunta.id, opcionSeleccionada, esCorrecta);
    } else {
      onSiguiente();
    }
  }

  function estiloOpcion(opcion) {
    if (!respondida) {
      return opcionSeleccionada === opcion.id
        ? "bg-status-warning/25 border-status-warning"
        : "bg-neutral-inactive/40 border-transparent hover:brightness-95";
    }
    if (opcion.id === pregunta.respuestaCorrectaId) {
      return "bg-status-success/20 border-status-success";
    }
    if (opcion.id === opcionSeleccionada) {
      return "bg-status-error/20 border-status-error";
    }
    return "bg-brand-white border-neutral-inactive";
  }

  const progreso = Math.round((indice / total) * 100);
  const botonDeshabilitado = !respondida && opcionSeleccionada == null;

  return (
    <div>
      <div className="border-2 border-status-warning rounded-2xl p-6 mb-6 bg-brand-white">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h2 className="text-xl font-bold text-brand-midnight">
              {pregunta.tituloActividad}
            </h2>
            <p className="text-sm text-brand-midnight/60 mb-2">{pregunta.fecha}</p>
            <div className="flex gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-skill-writing/20 text-skill-writing">
                Writing
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-semibold border border-brand-steel/40 text-brand-steel">
                Trivia
              </span>
            </div>
          </div>
          <div className="text-right shrink-0">
            <span className="inline-block bg-status-info text-brand-white text-sm font-semibold px-4 py-1 rounded-full mb-1">
              En curso
            </span>
            <p className="text-status-warning font-extrabold text-2xl leading-none">
              {xpTotal} XP
            </p>
            <p className="text-xs text-brand-midnight/60">{progreso}% progreso</p>
          </div>
        </div>

        <div className="w-full h-2 bg-neutral-inactive rounded-full overflow-hidden mb-2">
          <div
            className="h-full bg-status-warning rounded-full transition-all"
            style={{ width: `${progreso}%` }}
          />
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-brand-steel font-medium">
            Pregunta {indice} de {total}
          </span>
          <span
            className={`font-semibold ${
              agotado ? "text-status-error" : "text-brand-midnight/60"
            }`}
          >
            {agotado ? "¡Tiempo agotado!" : `${segundosRestantes}s`}
          </span>
        </div>
      </div>

      <div className="bg-brand-white rounded-2xl p-8 text-center text-xl font-medium text-brand-midnight mb-6">
        {pregunta.enunciado}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        {pregunta.opciones.map((opcion) => (
          <button
            key={opcion.id}
            onClick={() => handleSeleccion(opcion)}
            disabled={respondida || agotado}
            className={`px-6 py-5 rounded-2xl border-2 font-medium text-lg text-brand-midnight transition ${estiloOpcion(
              opcion
            )}`}
          >
            {opcion.texto}
          </button>
        ))}
      </div>

      <button
        onClick={handleBoton}
        disabled={botonDeshabilitado}
        className="w-full py-4 rounded-2xl font-bold text-lg text-brand-white transition disabled:opacity-40 disabled:cursor-not-allowed bg-button-DEFAULT hover:bg-button-hover active:bg-button-pressed"
      >
        {respondida ? "Continuar" : "Siguiente"}
      </button>
    </div>
  );
}