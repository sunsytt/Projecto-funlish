import { Library } from "lucide-react";

export default function UnidadCard({ nombre, numTemas, colorClass, onClick }) {
  return (
    <button
      onClick={onClick}
      className="text-left w-full transition-transform duration-200 hover:-translate-y-1"
    >
      <div className="relative">
        {/* Pestaña de color aleatorio, asomando detrás de la card */}
        <div
          className={`absolute -top-4 left-3 w-24 h-6 rounded-t-lg ${colorClass}`}
        />
        <div className="relative bg-brand-white border border-status-success/30 rounded-2xl p-5 h-56 flex flex-col justify-between shadow-sm hover:shadow-lg transition-shadow">
          <div className="flex items-start justify-between">
            <h3 className="text-brand-midnight font-bold text-xl">{nombre}</h3>
            <Library size={22} className="text-brand-midnight shrink-0" />
          </div>
          <p className="text-brand-midnight/60 text-sm">{numTemas} Temas</p>
        </div>
      </div>
    </button>
  );
}