export default function ModuleBanner({
  title,
  subtitle,
  mascotSrc = "/src/assets/images/mascota.png",
}) {
  return (
    <div className="bg-brand-glacier rounded-2xl p-6 flex items-center justify-between mb-6">
      <div>
        <h1 className="text-2xl font-bold text-brand-midnight mb-1">
          {title}
        </h1>
        <p className="text-brand-midnight/80 text-sm">{subtitle}</p>
      </div>
      <img
        src={mascotSrc}
        alt="Mascota Funlish"
        className="h-20 w-20 object-contain hidden sm:block"
      />
    </div>
  );
}