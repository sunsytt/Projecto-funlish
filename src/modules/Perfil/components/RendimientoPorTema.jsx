const PALETA = [
  "bg-brand-steel",
  "bg-skill-reading",
  "bg-skill-writing",
  "bg-skill-listening",
  "bg-cardColor-lavender",
];

export default function RendimientoPorTema({ datos }) {
  return (
    <div className="bg-brand-white rounded-2xl shadow-sm p-6">
      <h2 className="text-lg font-bold text-brand-midnight mb-5">Rendimiento por tema</h2>
      <div className="flex flex-col gap-4">
        {datos.map((d, i) => (
          <div key={d.tema} className="flex items-center gap-4">
            <span className="w-32 shrink-0 text-sm font-medium text-brand-midnight/80">
              {d.tema}
            </span>
            <div className="flex-1 h-3 bg-neutral-inactive/50 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full ${PALETA[i % PALETA.length]}`}
                style={{ width: `${d.porcentaje}%` }}
              />
            </div>
            <span className="w-12 text-right text-sm font-bold text-brand-midnight">
              {d.porcentaje}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}