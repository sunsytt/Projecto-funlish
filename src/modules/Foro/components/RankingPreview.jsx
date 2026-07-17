import { User } from "lucide-react";

export default function RankingPreview({ ranking }) {
  return (
    <div className="bg-brand-white rounded-2xl shadow-sm p-6">
      <h2 className="font-bold text-brand-midnight text-lg mb-4">Ranking</h2>
      <div className="flex flex-col gap-3">
        {ranking.top.map((a) => (
          <div key={a.puesto} className="flex items-center gap-3">
            <span className="w-6 font-bold text-brand-midnight">{a.puesto}</span>
            <span className="w-8 h-8 rounded-full bg-neutral-inactive shrink-0 flex items-center justify-center">
              <User size={16} className="text-brand-midnight/60" />
            </span>
            <span className="flex-1 text-brand-midnight font-medium truncate">{a.nombre}</span>
            <span className="text-status-warning font-bold text-sm">{a.xp} XP</span>
          </div>
        ))}
      </div>
      <p className="text-center text-brand-midnight/60 font-semibold text-sm mt-4">
        Tu posición: {ranking.posicionUsuario}°
      </p>
    </div>
  );
}