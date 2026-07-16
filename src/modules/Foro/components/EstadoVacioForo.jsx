import { MessageSquareOff } from "lucide-react";

export default function EstadoVacioForo() {
  return (
    <div className="bg-brand-white rounded-2xl shadow-sm p-12 text-center">
      <div className="w-16 h-16 mx-auto rounded-full bg-neutral-inactive/40 flex items-center justify-center mb-4">
        <MessageSquareOff size={28} className="text-brand-midnight/40" />
      </div>
      <h2 className="text-lg font-bold text-brand-midnight mb-1">Aún no hay publicaciones</h2>
      <p className="text-brand-midnight/60">
        Tu profesor o profesora aún no ha hecho ninguna publicación.
      </p>
    </div>
  );
}