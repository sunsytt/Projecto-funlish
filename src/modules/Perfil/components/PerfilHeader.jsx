export default function PerfilHeader({ alumno }) {
  return (
    <div className="bg-brand-white rounded-2xl shadow-sm p-6 flex items-center justify-between gap-4 mb-6">
      <div className="flex items-center gap-5">
        <div className="w-20 h-20 rounded-full bg-brand-steel flex items-center justify-center shrink-0">
          <span className="text-brand-white text-2xl font-extrabold">
            {alumno.iniciales}
          </span>
        </div>
        <div>
          <h1 className="text-2xl font-bold text-brand-midnight">{alumno.nombre}</h1>
          <p className="text-brand-midnight/60 text-sm">Matrícula: {alumno.matricula}</p>
          <p className="text-brand-midnight/60 text-sm">{alumno.email}</p>
        </div>
      </div>
      <span className="bg-status-success/15 text-status-success font-semibold text-sm px-4 py-1.5 rounded-full shrink-0">
        {alumno.estado === "activa" ? "Activa" : "Inactiva"}
      </span>
    </div>
  );
}