import { useEffect, useState } from "react";
import { asignarColoresAPiezas } from "../utils/letterColors";

export default function ScrambleView({ pregunta, indice, total, xpTotal, onResponder, onSiguiente }) {
  const esOraciones = pregunta.modoScramble === "oraciones";
  const separador = esOraciones ? " " : "";
  // Piezas objetivo para saber cuántos huecos mostrar en "Tu respuesta"
  const piezasObjetivo = esOraciones
    ? pregunta.respuestaCorrecta.split(" ")
    : pregunta.respuestaCorrecta.split("");

  const [disponibles, setDisponibles] = useState([]);
  const [respuesta, setRespuesta] = useState([]);
  const [verificado, setVerificado] = useState(false);

  useEffect(() => {
    const coloreadas = asignarColoresAPiezas(pregunta.piezas).map((p) => ({
      ...p,
      usada: false,
    }));
    setDisponibles(coloreadas);
    setRespuesta([]);
    setVerificado(false);
  }, [pregunta.id, pregunta.piezas]);

  function seleccionarPieza(pieza) {
    if (verificado || pieza.usada) return;
    if (respuesta.length >= piezasObjetivo.length) return;

    setDisponibles((prev) =>
      prev.map((p) => (p.id === pieza.id ? { ...p, usada: true } : p))
    );
    setRespuesta((prev) => [...prev, pieza]);
  }

  function quitarDeRespuesta(pieza) {
    if (verificado) return;
    setRespuesta((prev) => prev.filter((p) => p.id !== pieza.id));
    setDisponibles((prev) =>
      prev.map((p) => (p.id === pieza.id ? { ...p, usada: false } : p))
    );
  }

  function borrarUltima() {
    if (verificado || respuesta.length === 0) return;
    quitarDeRespuesta(respuesta[respuesta.length - 1]);
  }

  function verificar() {
    const armado = respuesta.map((p) => p.valor).join(separador);
    const esCorrecta = armado.toLowerCase() === pregunta.respuestaCorrecta.toLowerCase();
    setVerificado(true);
    onResponder(pregunta.id, armado, esCorrecta);
  }

  function handleBoton() {
    verificado ? onSiguiente() : verificar();
  }

  const progreso = Math.round((indice / total) * 100);
  const respuestaCompleta = respuesta.length === piezasObjetivo.length;
  const botonDeshabilitado = !verificado && !respuestaCompleta;

  const claseFicha = esOraciones
    ? "px-4 py-3 rounded-xl font-semibold text-base"
    : "w-14 h-14 rounded-xl font-bold text-xl uppercase";

  return (
    <div>
      <div className="border-2 border-status-warning rounded-2xl p-6 mb-6 bg-brand-white">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h2 className="text-xl font-bold text-brand-midnight">{pregunta.tituloActividad}</h2>
            <p className="text-sm text-brand-midnight/60 mb-2">{pregunta.fecha}</p>
            <span className="px-3 py-1 rounded-full text-xs font-semibold border border-brand-steel/40 text-brand-steel">
              Scramble
            </span>
          </div>
          <div className="text-right shrink-0">
            <span className="inline-block bg-status-info text-brand-white text-sm font-semibold px-4 py-1 rounded-full mb-1">
              En curso
            </span>
            <p className="text-status-warning font-extrabold text-2xl leading-none">{xpTotal} XP</p>
            <p className="text-xs text-brand-midnight/60">{progreso}% progreso</p>
          </div>
        </div>

        <div className="w-full h-2 bg-neutral-inactive rounded-full overflow-hidden mb-2">
          <div className="h-full bg-status-warning rounded-full transition-all" style={{ width: `${progreso}%` }} />
        </div>
        <span className="text-brand-steel font-medium text-sm">
          {esOraciones ? "Oración" : "Palabra"} {indice} de {total}
        </span>
      </div>

      <div className="bg-brand-white rounded-2xl p-8 mb-6">
        <p className="text-center font-bold text-brand-midnight mb-2">
          {esOraciones
            ? "Ordena las palabras para formar la oración"
            : "Ordena las letras para formar la palabra"}
        </p>
        <p className="text-center text-brand-midnight/60 mb-8">Pista: "{pregunta.pista}"</p>

        <p className="font-semibold text-brand-midnight mb-3">
          {esOraciones ? "Palabras disponibles:" : "Letras disponibles:"}
        </p>
        <div className="flex flex-wrap gap-3 mb-8">
          {disponibles.map((p) => (
            <button
              key={p.id}
              onClick={() => seleccionarPieza(p)}
              disabled={p.usada || verificado}
              className={`transition ${claseFicha} ${p.bg} ${p.text} ${
                p.usada ? "opacity-30 cursor-not-allowed" : "hover:brightness-95"
              }`}
            >
              {p.valor}
            </button>
          ))}
        </div>

        <p className="font-semibold text-brand-midnight mb-3">Tu respuesta:</p>
        <div className="flex flex-wrap gap-3">
          {piezasObjetivo.map((_, i) => {
            const pieza = respuesta[i];
            if (!pieza) {
              return (
                <span
                  key={i}
                  className={`${esOraciones ? "min-w-20 h-12" : "w-14 h-14"} rounded-xl bg-neutral-inactive/40 border-2 border-dashed border-neutral-inactive`}
                />
              );
            }

            let estilo = `${pieza.bg}/40 ${pieza.text}`;
            if (verificado) {
              const correctaEnPosicion =
                piezasObjetivo[i]?.toLowerCase() === pieza.valor.toLowerCase();
              estilo = correctaEnPosicion
                ? "bg-status-success/30 text-status-success border-2 border-status-success"
                : "bg-status-error/30 text-status-error border-2 border-status-error";
            }

            return (
              <button
                key={pieza.id}
                onClick={() => quitarDeRespuesta(pieza)}
                disabled={verificado}
                className={`transition ${claseFicha} ${estilo}`}
              >
                {pieza.valor}
              </button>
            );
          })}
        </div>

        {verificado && (
          <div className="mt-6">
            <p className="text-sm font-semibold text-brand-midnight/60 mb-2">Respuesta correcta:</p>
            <div className="flex flex-wrap gap-2">
              {piezasObjetivo.map((valor, i) => (
                <span
                  key={i}
                  className={`${
                    esOraciones ? "px-4 py-2" : "w-12 h-12 flex items-center justify-center"
                  } rounded-xl bg-status-success/30 text-status-success font-bold uppercase`}
                >
                  {valor}
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