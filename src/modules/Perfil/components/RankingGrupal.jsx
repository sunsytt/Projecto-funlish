import { Crown, User } from "lucide-react";

const MEDALLA = {
  1: "bg-status-warning text-brand-white",
  2: "bg-neutral-inactive text-brand-midnight",
  3: "bg-brand-salmon text-brand-white",
};

export default function RankingGrupal({ ranking, totalAlumnos }) {
  return (
    <div className="bg-brand-white rounded-2xl shadow-sm p-6">
      <div className="flex items-baseline justify-between mb-5">
        <h2 className="text-lg font-bold text-brand-midnight">Ranking del grupo</h2>
        <span className="text-sm text-brand-midnight/50">{totalAlumnos} alumnos</span>
      </div>

      <div className="flex flex-col gap-2">
        {ranking.map((a) => (
          <div
            key={a.id}
            className={`flex items-center gap-4 px-4 py-3 rounded-xl transition ${
              a.esUsuarioActual
                ? "bg-brand-steel/10 border-2 border-brand-steel"
                : "hover:bg-neutral-inactive/20"
            }`}
          >
            <span
              className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm shrink-0 ${
                MEDALLA[a.puesto] ?? "bg-neutral-inactive/40 text-brand-midnight/70"
              }`}
            >
              {a.puesto <= 3 ? <Crown size={14} /> : a.puesto}
            </span>

            <span className="w-9 h-9 rounded-full bg-brand-glacier shrink-0 flex items-center justify-center">
              <User size={18} className="text-brand-steel" />
            </span>

            <span
              className={`flex-1 font-medium ${
                a.esUsuarioActual ? "text-brand-steel font-bold" : "text-brand-midnight"
              }`}
            >
              {a.nombre}
              {a.esUsuarioActual && (
                <span className="ml-2 text-xs font-semibold text-brand-steel">(Tú)</span>
              )}
            </span>

            <span className="text-status-warning font-bold shrink-0">{a.xp} XP</span>
          </div>
        ))}
      </div>
    </div>
  );
}