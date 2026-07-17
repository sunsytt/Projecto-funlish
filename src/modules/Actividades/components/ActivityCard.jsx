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
    <div className="bg-brand-white rounded-xl shadow-sm p-3.5 flex items-center justify-between gap-3">
      <div className="flex items-center gap-3">
        <span className="bg-skill-writing/20 rounded-full p-2.5 shrink-0">
          <Icono size={18} className="text-brand-midnight" />
        </span>
        <div>
          <h3 className="font-bold text-brand-midnight text-base leading-tight">
            {actividad.titulo}
          </h3>
          <div className="flex items-center gap-2 mt-0.5">
            <p className="text-xs text-brand-midnight/60">{actividad.fecha}</p>
            <span className="inline-block px-2 py-0.5 rounded-full text-[11px] font-semibold border border-brand-steel/40 text-brand-steel">
              {actividad.tipo === "trivia" ? "Trivia" : "Scramble"}
            </span>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-end gap-1 shrink-0">
        <EstadoBadge estado={actividad.estado} />
        <span className="text-status-warning font-bold text-sm">{xpMostrado}</span>
        <span className="text-[11px] text-brand-midnight/60">
          {actividad.progreso}% {actividad.estado === "completada" ? "progreso" : "completada"}
        </span>

        {actividad.estado !== "completada" && puedeIniciar && (
          <button
            onClick={() => onIniciar(actividad)}
            className="mt-0.5 bg-button-DEFAULT hover:bg-button-hover active:bg-button-pressed text-brand-white text-xs font-semibold px-3 py-1.5 rounded-lg transition"
          >
            Iniciar actividad
          </button>
        )}

        {actividad.estado !== "completada" && !puedeIniciar && (
          <span className="mt-0.5 flex items-center gap-1 text-[11px] text-brand-midnight/50 px-3 py-1.5">
            <Lock size={11} />
            {mensajeBloqueo}
          </span>
        )}
      </div>
    </div>
  );
}