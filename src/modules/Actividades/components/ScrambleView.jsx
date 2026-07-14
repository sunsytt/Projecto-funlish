import { useEffect, useState } from "react";
import { useCountdown } from "../hooks/useCountdown";
import { asignarColoresALetras } from "../utils/letterColors";

export default function ScrambleView({
  pregunta,
  indice,
  total,
  xpTotal,
  tiempoSegundosPregunta,
  onResponder,
  onSiguiente,
}) {
  const [disponibles, setDisponibles] = useState([]);
  const [respuesta, setRespuesta] = useState([]);
  const [verificado, setVerificado] = useState(false);

  const { segundosRestantes, agotado } = useCountdown(
    tiempoSegundosPregunta,
    pregunta.id
  );

  // Reinicia todo cuando cambia la palabra
  useEffect(() => {
    const coloreadas = asignarColoresALetras(pregunta.letras).map((l) => ({
      ...l,
      usada: false,
    }));
    setDisponibles(coloreadas);
    setRespuesta([]);
    setVerificado(false);
  }, [pregunta.id, pregunta.letras]);

  // Si se acaba el tiempo, congela la selección y auto-envía lo que tenga
  useEffect(() => {
    if (agotado && !verificado) {
      verificar();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [agotado]);

  function seleccionarLetra(letra) {
    if (verificado || agotado) return;
    if (letra.usada) return;
    if (respuesta.length >= pregunta.palabraCorrecta.length) return;

    setDisponibles((prev) =>
      prev.map((l) => (l.id === letra.id ? { ...l, usada: true } : l))
    );
    setRespuesta((prev) => [...prev, letra]);
  }

  function quitarDeRespuesta(letra) {
    if (verificado || agotado) return;
    setRespuesta((prev) => prev.filter((l) => l.id !== letra.id));
    setDisponibles((prev) =>
      prev.map((l) => (l.id === letra.id ? { ...l, usada: false } : l))
    );
  }

  function borrarUltima() {
    if (verificado || agotado || respuesta.length === 0) return;
    const ultima = respuesta[respuesta.length - 1];
    quitarDeRespuesta(ultima);
  }

  function verificar() {
    const palabraArmada = respuesta.map((l) => l.letra).join("");
    const esCorrecta = palabraArmada === pregunta.palabraCorrecta;
    setVerificado(true);
    onResponder(pregunta.id, palabraArmada, esCorrecta);
  }

  function handleBoton() {
    if (!verificado) {
      verificar();
    } else {
      onSiguiente();
    }
  }

  const progreso = Math.round((indice / total) * 100);
  const respuestaCompleta = respuesta.length === pregunta.palabraCorrecta.length;
  const botonDeshabilitado = !verificado && !respuestaCompleta;

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
                Scramble
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
            Palabra {indice} de {total}
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

      <div className="bg-brand-white rounded-2xl p-8 mb-6">
        <p className="text-center font-bold text-brand-midnight mb-2">
          Ordena las palabras para formar la palabra
        </p>
        <p className="text-center text-brand-midnight/60 mb-8">
          Pista: "{pregunta.pista}"
        </p>

        <p className="font-semibold text-brand-midnight mb-3">Letras disponibles:</p>
        <div className="flex flex-wrap gap-3 mb-8">
          {disponibles.map((l) => (
            <button
              key={l.id}
              onClick={() => seleccionarLetra(l)}
              disabled={l.usada || verificado || agotado}
              className={`w-14 h-14 rounded-xl font-bold text-xl uppercase transition ${l.bg} ${l.text} ${
                l.usada ? "opacity-30 cursor-not-allowed" : "hover:brightness-95"
              }`}
            >
              {l.letra}
            </button>
          ))}
        </div>

        <p className="font-semibold text-brand-midnight mb-3">Tu respuesta:</p>
        <div className="flex flex-wrap gap-3">
          {Array.from({ length: pregunta.palabraCorrecta.length }).map((_, i) => {
            const letra = respuesta[i];
            if (!letra) {
              return (
                <span
                  key={i}
                  className="w-14 h-14 rounded-xl bg-neutral-inactive/40 border-2 border-dashed border-neutral-inactive"
                />
              );
            }

            let estiloVerificado = `${letra.bg}/40 ${letra.text}`;
            if (verificado) {
              const correctaEnPosicion =
                pregunta.palabraCorrecta[i]?.toLowerCase() === letra.letra.toLowerCase();
              estiloVerificado = correctaEnPosicion
                ? "bg-status-success/30 text-status-success border-2 border-status-success"
                : "bg-status-error/30 text-status-error border-2 border-status-error";
            }

            return (
              <button
                key={letra.id}
                onClick={() => quitarDeRespuesta(letra)}
                disabled={verificado || agotado}
                className={`w-14 h-14 rounded-xl font-bold text-xl uppercase transition ${estiloVerificado}`}
              >
                {letra.letra}
              </button>
            );
          })}
        </div>

        {verificado && (
          <div className="mt-6">
            <p className="text-sm font-semibold text-brand-midnight/60 mb-2">
              Respuesta correcta:
            </p>
            <div className="flex gap-2">
              {pregunta.palabraCorrecta.split("").map((letra, i) => (
                <span
                  key={i}
                  className="w-12 h-12 rounded-xl bg-status-success/30 text-status-success font-bold text-lg uppercase flex items-center justify-center"
                >
                  {letra}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="flex gap-4">
        <button
          onClick={borrarUltima}
          disabled={verificado || respuesta.length === 0}
          className="px-6 py-4 rounded-2xl font-bold text-brand-white bg-brand-midnight hover:brightness-110 transition disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Borrar
        </button>
        <button
          onClick={handleBoton}
          disabled={botonDeshabilitado}
          className="flex-1 py-4 rounded-2xl font-bold text-lg text-brand-white transition disabled:opacity-40 disabled:cursor-not-allowed bg-button-DEFAULT hover:bg-button-hover active:bg-button-pressed"
        >
          {verificado ? "Continuar" : "Verificar"}
        </button>
      </div>
    </div>
  );
}