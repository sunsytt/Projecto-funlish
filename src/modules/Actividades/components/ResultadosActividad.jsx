import { PartyPopper } from "lucide-react";
import Confetti from "./Confetti";

export default function ResultadosActividad({
  titulo,
  subtitulo,
  xpGanados,
  correctas,
  incorrectas,
  onVolver,
}) {
  const total = correctas + incorrectas;
  const precision = total > 0 ? Math.round((correctas / total) * 100) : 0;

  return (
    <div className="relative bg-brand-white rounded-2xl shadow-sm overflow-hidden max-w-2xl mx-auto">
      <div className="relative bg-brand-midnight text-brand-white text-center py-10 px-6 overflow-hidden">
        <Confetti />
        <div className="flex justify-center gap-2 mb-6">
          {["bg-status-warning", "bg-status-success", "bg-brand-salmon", "bg-skill-reading", "bg-brand-salmon", "bg-skill-speaking"].map(
            (c, i) => (
              <span key={i} className={`w-3 h-3 rounded-full ${c}`} />
            )
          )}
        </div>
        <div className="w-20 h-20 mx-auto rounded-full border-2 border-brand-white/40 flex items-center justify-center mb-4">
          <PartyPopper size={32} />
        </div>
        <h2 className="text-3xl font-extrabold mb-1">¡Actividad completada!</h2>
        <p className="text-brand-white/80 mb-6">{subtitulo}</p>
        <span className="inline-flex items-center gap-2 bg-status-warning text-brand-white font-bold px-5 py-2 rounded-full">
          ☆ + {xpGanados} XP Ganados
        </span>
      </div>

      <div className="p-8">
        <div className="grid grid-cols-3 text-center mb-6">
          <div>
            <p className="text-3xl font-extrabold text-status-success">{correctas}</p>
            <p className="text-sm text-brand-midnight/60">Correctas</p>
          </div>
          <div>
            <p className="text-3xl font-extrabold text-status-error">{incorrectas}</p>
            <p className="text-sm text-brand-midnight/60">Incorrectas</p>
          </div>
          <div>
            <p className="text-3xl font-extrabold text-status-warning">{precision}%</p>
            <p className="text-sm text-brand-midnight/60">Precisión</p>
          </div>
        </div>

        <div className="mb-8">
          <div className="flex justify-between text-sm font-semibold text-brand-midnight mb-1">
            <span>Progreso de la actividad</span>
            <span>100%</span>
          </div>
          <div className="w-full h-2 bg-neutral-inactive rounded-full overflow-hidden">
            <div className="h-full bg-status-warning w-full" />
          </div>
        </div>

        <button
          onClick={onVolver}
          className="w-full bg-button-DEFAULT hover:bg-button-hover active:bg-button-pressed text-brand-white font-bold py-3 rounded-xl transition"
        >
          Volver a actividades
        </button>
      </div>
    </div>
  );
}