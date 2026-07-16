import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useBreadcrumb } from "../../context/PageHeaderContext";
import { useActivityDeadline } from "./hooks/useActivityDeadline";
import { obtenerActividad } from "./data/mockActividades";
import { guardarProgreso, obtenerProgreso, limpiarProgreso } from "./utils/progresoStorage";
import TriviaView from "./components/TriviaView";
import ScrambleView from "./components/ScrambleView";
import ConfirmarSalidaModal from "./components/ConfirmarSalidaModal";
import ProgresoGuardadoModal from "./components/ProgresoGuardadoModal";
import ResultadosActividad from "./components/ResultadosActividad";

export default function ActividadPlay() {
  const { grupoId, temaId, actividadId } = useParams();
  const navigate = useNavigate();

  const [actividad, setActividad] = useState(null);
  const [indiceActual, setIndiceActual] = useState(0);
  const [respuestas, setRespuestas] = useState([]);
  const [mostrarSalida, setMostrarSalida] = useState(false);
  const [progresoGuardadoInfo, setProgresoGuardadoInfo] = useState(null);
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
    const datos = obtenerActividad(temaId, actividadId);
    setActividad(datos);

    // Si hay progreso guardado de una sesión anterior, retomamos desde ahí
    const guardado = obtenerProgreso(grupoId, actividadId);
    if (guardado && datos) {
      const indiceValido = Math.min(guardado.indiceActual ?? 0, datos.preguntas.length - 1);
      setIndiceActual(Math.max(indiceValido, 0));
      setRespuestas(guardado.respuestas ?? []);
    }
  }

  const limite = useActivityDeadline(actividad?.limiteTiempo);

  useEffect(() => {
    if (limite.agotado && !finalizada) {
      limpiarProgreso(grupoId, actividadId);
      setFinalizada(true);
    }
  }, [limite.agotado, finalizada]);

  function handleResponder(preguntaId, respuestaDada, esCorrecta) {
    const nuevasRespuestas = [...respuestas, { preguntaId, respuestaDada, esCorrecta }];
    setRespuestas(nuevasRespuestas);
    // Guardado incremental: si el estudiante cierra la pestaña sin usar
    // "Salir", igual queda registrado lo último que respondió.
    guardarProgreso(grupoId, actividadId, {
      indiceActual,
      respuestas: nuevasRespuestas,
    });
  }

  function handleSiguiente() {
    const esUltima = indiceActual + 1 >= actividad.preguntas.length;
    if (esUltima) {
      limpiarProgreso(grupoId, actividadId);
      setFinalizada(true);
    } else {
      const siguienteIndice = indiceActual + 1;
      setIndiceActual(siguienteIndice);
      guardarProgreso(grupoId, actividadId, {
        indiceActual: siguienteIndice,
        respuestas,
      });
    }
  }

  function handleConfirmarSalida() {
    guardarProgreso(grupoId, actividadId, { indiceActual, respuestas });
    setMostrarSalida(false);
    setProgresoGuardadoInfo({
      respondidas: respuestas.length,
      total: actividad.preguntas.length,
      correctas: respuestas.filter((r) => r.esCorrecta).length,
    });
  }

  function handleVolverAActividades() {
    navigate(`/grupos/${grupoId}/actividades/${temaId}`);
  }

  if (!actividad) return null;

  if (!actividad.preguntas || actividad.preguntas.length === 0) {
    return (
      <div className="bg-brand-white rounded-2xl shadow-sm p-10 text-center max-w-xl mx-auto">
        <h2 className="text-xl font-bold text-brand-midnight mb-2">
          Esta actividad aún no tiene contenido
        </h2>
        <p className="text-brand-midnight/60 mb-6">
          Tu profesor todavía no ha cargado las preguntas de "{actividad.titulo}".
          Vuelve más tarde.
        </p>
        <button
          onClick={handleVolverAActividades}
          className="bg-button-DEFAULT hover:bg-button-hover text-brand-white font-semibold px-6 py-3 rounded-xl transition"
        >
          Volver a actividades
        </button>
      </div>
    );
  }

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

  const propsComunes = {
    pregunta: {
      ...preguntaActual,
      tituloActividad: actividad.titulo,
      fecha: actividad.fecha,
    },
    indice: indiceActual + 1,
    total: actividad.preguntas.length,
    xpTotal: actividad.xpTotal,
    onResponder: handleResponder,
    onSiguiente: handleSiguiente,
  };

  return (
    <div>
      <div className="flex justify-end items-center gap-4 mb-4">
        {limite.modoTiempo === "duracion" && (
          <span className="text-sm font-semibold text-brand-midnight/70">
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
          onSalir={handleConfirmarSalida}
        />
      )}

      {progresoGuardadoInfo && (
        <ProgresoGuardadoModal
          respondidas={progresoGuardadoInfo.respondidas}
          total={progresoGuardadoInfo.total}
          correctas={progresoGuardadoInfo.correctas}
          onVolver={handleVolverAActividades}
        />
      )}
    </div>
  );
}