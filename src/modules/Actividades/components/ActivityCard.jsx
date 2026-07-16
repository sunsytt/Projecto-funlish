import { Brain, Shuffle, Lock } from "lucide-react";
import EstadoBadge from "./EstadoBadge";

const iconoPorTipo = {
  trivia: Brain,
  scramble: Shuffle,
};

export default function ActivityCard({ actividad, onIniciar }) {
  const Icono = iconoPorTipo[actividad.tipo];
  const xpMostrado =
    actividad.estado === "completada"
      ? `${actividad.xpGanado ?? 0}/${actividad.xpTotal} XP`
      : `0/${actividad.xpTotal} XP`;

  const sinContenido = !actividad.preguntas || actividad.preguntas.length === 0;
  const vencida = actividad.estado === "sin_entregar";
  const puedeIniciar = actividad.estado !== "completada" && !vencida && !sinContenido;

  let mensajeBloqueo = null;
  if (actividad.estado !== "completada") {
    if (vencida) mensajeBloqueo = "El plazo de entrega ya venció";
    else if (sinContenido) mensajeBloqueo = "Tu profesor aún no carga el contenido";
  }

  return (
    <div className="bg-brand-white rounded-2xl shadow-sm p-5 flex items-center justify-between gap-4">
      <div className="flex items-center gap-4">
        <span className="bg-skill-writing/20 rounded-full p-4 shrink-0">
          <Icono size={22} className="text-brand-midnight" />
        </span>
        <div>
          <h3 className="font-bold text-brand-midnight text-lg">{actividad.titulo}</h3>
          <p className="text-sm text-brand-midnight/60 mb-2">{actividad.fecha}</p>
          <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold border border-brand-steel/40 text-brand-steel">
            {actividad.tipo === "trivia" ? "Trivia" : "Scramble"}
          </span>
        </div>
      </div>

      <div className="flex flex-col items-end gap-2 shrink-0">
        <EstadoBadge estado={actividad.estado} />
        <span className="text-status-warning font-bold text-lg">{xpMostrado}</span>
        <span className="text-xs text-brand-midnight/60">
          {actividad.progreso}% {actividad.estado === "completada" ? "progreso" : "completada"}
        </span>

        {actividad.estado !== "completada" && puedeIniciar && (
          <button
            onClick={() => onIniciar(actividad)}
            className="mt-1 bg-button-DEFAULT hover:bg-button-hover active:bg-button-pressed text-brand-white text-sm font-semibold px-4 py-2 rounded-xl transition"
          >
            Iniciar actividad
          </button>
        )}

        {actividad.estado !== "completada" && !puedeIniciar && (
          <span className="mt-1 flex items-center gap-1.5 text-xs text-brand-midnight/50 px-4 py-2">
            <Lock size={12} />
            {mensajeBloqueo}
          </span>
        )}
      </div>
    </div>
  );
}