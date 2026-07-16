import { Users } from "lucide-react";

export default function InfoGrupoPanel({ grupo }) {
  return (
    <div className="bg-brand-white rounded-2xl shadow-sm p-6">
      <div className="flex items-center gap-2 mb-4">
        <Users size={20} className="text-brand-midnight" />
        <h2 className="font-bold text-brand-midnight">Información del grupo</h2>
      </div>

      <p className="text-lg font-bold text-brand-midnight">{grupo.nombre}</p>
      <p className="text-brand-midnight/60 text-sm mb-4">{grupo.periodo}</p>

      <span className="inline-block bg-status-success/15 text-status-success font-semibold text-sm px-4 py-2 rounded-full mb-4">
        Docente: {grupo.docente}
      </span>

      <p className="text-brand-midnight/70 text-sm font-medium">{grupo.numAlumnos} alumnos</p>
    </div>
  );
}