import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useBreadcrumb } from "../../context/PageHeaderContext";
import { useActivityDeadline } from "./hooks/useActivityDeadline";
import TriviaView from "./components/TriviaView";
import ScrambleView from "./components/ScrambleView";
import ConfirmarSalidaModal from "./components/ConfirmarSalidaModal";
import ResultadosActividad from "./components/ResultadosActividad";
// import { actividadesApi } from "../../services/actividadesApi";

export default function ActividadPlay() {
  const { grupoId, temaId, actividadId } = useParams();
  const navigate = useNavigate();

  const [actividad, setActividad] = useState(null);
  const [indiceActual, setIndiceActual] = useState(0);
  const [respuestas, setRespuestas] = useState([]); // { preguntaId, esCorrecta }
  const [mostrarSalida, setMostrarSalida] = useState(false);
  const [finalizada, setFinalizada] = useState(false);

  useBreadcrumb([
    { label: "Actividades", to: `/grupos/${grupoId}/actividades` },
    { label: actividad?.temaNombre ?? "...", to: `/grupos/${grupoId}/actividades/${temaId}` },
  ]);

  useEffect(() => {
    cargarActividad();
  }, [actividadId]);

  async function cargarActividad() {
    // const datos = await actividadesApi.obtenerActividad(grupoId, temaId, actividadId);
    const datos = {
      id: actividadId,
      tipo: "trivia", // "trivia" | "scramble"
      titulo: "Present Tense Trivia",
      temaNombre: "Present tenses",
      fecha: "29 jun 2026",
      tiempoSegundosPregunta: 30,
      limiteTiempo: { modoTiempo: "duracion", duracionMinutos: 10 },
      // limiteTiempo: { modoTiempo: "fecha", fechaLimite: "2026-07-20T23:59:59" },
      preguntas: [
        {
          id: 1,
          enunciado: '"Every morning, Sarah ______ her dog in the park before going to work."',
          opciones: [
            { id: "a", texto: "walks" },
            { id: "b", texto: "is walk" },
            { id: "c", texto: "walk" },
            { id: "d", texto: "walking" },
          ],
          respuestaCorrectaId: "a",
          puntos: 20,
        },
        {
          id: 2,
          enunciado: '"They usually ______ breakfast together on Sundays."',
          opciones: [
            { id: "a", texto: "has" },
            { id: "b", texto: "have" },
            { id: "c", texto: "having" },
            { id: "d", texto: "is having" },
          ],
          respuestaCorrectaId: "b",
          puntos: 20,
        },
        {
          id: 3,
          enunciado: '"My brother ______ soccer every weekend."',
          opciones: [
            { id: "a", texto: "play" },
            { id: "b", texto: "playing" },
            { id: "c", texto: "plays" },
            { id: "d", texto: "is play" },
          ],
          respuestaCorrectaId: "c",
          puntos: 20,
        },
        {
          id: 4,
          enunciado: '"I ______ my teeth twice a day."',
          opciones: [
            { id: "a", texto: "brushes" },
            { id: "b", texto: "brush" },
            { id: "c", texto: "brushing" },
            { id: "d", texto: "am brush" },
          ],
          respuestaCorrectaId: "b",
          puntos: 20,
        },
        {
          id: 5,
          enunciado: '"She ______ to the gym after work."',
          opciones: [
            { id: "a", texto: "go" },
            { id: "b", texto: "going" },
            { id: "c", texto: "goes" },
            { id: "d", texto: "is go" },
          ],
          respuestaCorrectaId: "c",
          puntos: 20,
        },
      ],
    };
    setActividad(datos);
  }

  const limite = useActivityDeadline(actividad?.limiteTiempo);

  // Si se acaba el tiempo total de la actividad, se corta y pasa a resultados
  useEffect(() => {
    if (limite.agotado && !finalizada) {
      setFinalizada(true);
    }
  }, [limite.agotado, finalizada]);

  function handleResponder(preguntaId, respuestaDada, esCorrecta) {
    setRespuestas((prev) => [...prev, { preguntaId, respuestaDada, esCorrecta }]);
  }

  function handleSiguiente() {
    const esUltima = indiceActual + 1 >= actividad.preguntas.length;
    if (esUltima) {
      setFinalizada(true);
    } else {
      setIndiceActual((i) => i + 1);
    }
  }

  function handleVolverAActividades() {
    navigate(`/grupos/${grupoId}/actividades/${temaId}`);
  }

  if (!actividad) return null;

  if (finalizada) {
    const correctas = respuestas.filter((r) => r.esCorrecta).length;
    const incorrectas = respuestas.length - correctas;
    const xpGanados = actividad.preguntas
      .filter((p) => respuestas.find((r) => r.preguntaId === p.id && r.esCorrecta))
      .reduce((sum, p) => sum + p.puntos, 0);

    return (
      <ResultadosActividad
        titulo={actividad.titulo}
        subtitulo={`${actividad.titulo} - ${actividad.tipo === "trivia" ? "Trivia" : "Scramble"}`}
        xpGanados={xpGanados}
        correctas={correctas}
        incorrectas={incorrectas}
        onVolver={handleVolverAActividades}
      />
    );
  }

  const preguntaActual = actividad.preguntas[indiceActual];
  const xpTotalActividad = actividad.preguntas.reduce((sum, p) => sum + p.puntos, 0);

  const propsComunes = {
    pregunta: {
      ...preguntaActual,
      tituloActividad: actividad.titulo,
      fecha: actividad.fecha,
      // Para scramble, si tu backend usa otro nombre de campo, ajusta aquí:
      palabraCorrecta: preguntaActual.palabraCorrecta,
      letras: preguntaActual.letras,
      pista: preguntaActual.pista,
    },
    indice: indiceActual + 1,
    total: actividad.preguntas.length,
    xpTotal: xpTotalActividad,
    tiempoSegundosPregunta: actividad.tiempoSegundosPregunta,
    onResponder: handleResponder,
    onSiguiente: handleSiguiente,
  };

  return (
    <div>
      <div className="flex justify-end mb-4">
        {limite.modoTiempo === "duracion" && (
          <span className="text-sm font-semibold text-brand-midnight/70 mr-4 self-center">
            Tiempo restante de la actividad: {limite.tiempoFormateado}
          </span>
        )}
        <button
          onClick={() => setMostrarSalida(true)}
          className="text-sm font-semibold text-status-error hover:underline"
        >
          Salir de la actividad
        </button>
      </div>

      {actividad.tipo === "trivia" ? (
        <TriviaView {...propsComunes} />
      ) : (
        <ScrambleView {...propsComunes} />
      )}

      {mostrarSalida && (
        <ConfirmarSalidaModal
          onSeguirJugando={() => setMostrarSalida(false)}
          onSalir={handleVolverAActividades}
        />
      )}
    </div>
  );
}