export default function ModuleBanner({
  title,
  subtitle,
  mascotSrc = "/src/assets/images/mascota.png",
  icon: Icon,
}) {
  return (
    <div className="bg-brand-white rounded-2xl p-6 relative overflow-hidden flex items-center justify-between mb-6 border border-brand-midnight/10">
      <span className="absolute top-0 right-0 bottom-0 w-1.5 bg-brand-salmon" />

      <div>
        <span className="inline-flex items-center gap-2 bg-brand-bgApp px-3.5 py-1.5 rounded-full mb-3">
          {Icon && <Icon size={15} className="text-brand-steel" />}
          <span className="text-xs font-semibold text-brand-steel">Módulo</span>
        </span>
        <h1 className="text-2xl font-bold text-brand-midnight mb-1.5">{title}</h1>
        <p className="text-brand-midnight/60 text-sm max-w-md">{subtitle}</p>
        <span className="block h-1 w-12 bg-brand-steel rounded-full mt-3" />
      </div>

      <img
        src={mascotSrc}
        alt="Mascota Funlish"
        className="h-20 w-20 object-contain hidden sm:block shrink-0"
      />
    </div>
  );
}