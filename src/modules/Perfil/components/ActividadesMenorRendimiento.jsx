import { useState } from "react";

const COLOR_POR_TIPO_INDICE = [
  "bg-brand-salmon",
  "bg-cardColor-lavender",
  "bg-skill-reading",
  "bg-brand-steel",
];

const ETIQUETA_TIPO = { trivia: "Trivia", scramble: "Scramble" };

export default function ActividadesMenorRendimiento({ datos }) {
  const [hoverIndex, setHoverIndex] = useState(null);

  return (
    <div className="bg-brand-white rounded-2xl shadow-sm p-6">
      <h2 className="text-lg font-bold text-brand-midnight mb-6">
        Actividades con menor rendimiento
      </h2>

      <div className="flex flex-col gap-5 mb-2">
        {datos.map((d, i) => (
          <div key={d.titulo} className="flex items-center gap-4 relative">
            <span className="w-36 shrink-0 text-sm text-brand-midnight/70 text-right">
              {d.titulo}
            </span>
            <div
              className="flex-1 h-4 bg-neutral-inactive/40 rounded-full overflow-hidden relative"
              onMouseEnter={() => setHoverIndex(i)}
              onMouseLeave={() => setHoverIndex(null)}
            >
              <div
                className={`h-full rounded-full ${COLOR_POR_TIPO_INDICE[i % COLOR_POR_TIPO_INDICE.length]}`}
                style={{ width: `${d.porcentaje}%` }}
              />
            </div>

            {hoverIndex === i && (
              <div className="absolute left-1/2 -translate-x-1/2 -top-14 bg-brand-white shadow-md rounded-xl px-4 py-2 text-sm z-10 border border-neutral-inactive">
                <p className="font-semibold text-brand-midnight">{d.titulo}</p>
                <p className="text-brand-midnight/70">Rendimiento: {d.porcentaje}%</p>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="flex justify-between text-xs text-brand-midnight/50 pl-40 mb-6">
        <span>0%</span>
        <span>25%</span>
        <span>50%</span>
        <span>75%</span>
        <span>100%</span>
      </div>

      <div className="flex gap-3 flex-wrap">
        {datos.map((d, i) => (
          <span
            key={d.titulo}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold text-brand-white ${COLOR_POR_TIPO_INDICE[i % COLOR_POR_TIPO_INDICE.length]}`}
          >
            {ETIQUETA_TIPO[d.tipo]}
          </span>
        ))}
      </div>
    </div>
  );
}