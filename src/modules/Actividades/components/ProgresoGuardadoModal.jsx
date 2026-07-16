import { Save } from "lucide-react";

export default function ProgresoGuardadoModal({ respondidas, total, correctas, onVolver }) {
  return (
    <div className="fixed inset-0 bg-brand-midnight/50 flex items-center justify-center z-50 p-4">
      <div className="bg-brand-white rounded-2xl p-8 max-w-md w-full text-center">
        <div className="w-14 h-14 mx-auto rounded-full bg-status-success/15 flex items-center justify-center mb-4">
          <Save size={24} className="text-status-success" />
        </div>
        <h2 className="text-2xl font-bold text-brand-midnight mb-2">Progreso guardado</h2>
        <p className="text-brand-midnight/70 mb-6">
          Llevas <strong>{respondidas}</strong> de <strong>{total}</strong> preguntas
          respondidas ({correctas} correctas). Cuando vuelvas a entrar a esta
          actividad, continuarás justo donde la dejaste.
        </p>
        <button
          onClick={onVolver}
          className="w-full px-5 py-3 rounded-xl bg-button-DEFAULT hover:bg-button-hover text-brand-white font-semibold transition"
        >
          Volver a actividades
        </button>
      </div>
    </div>
  );
}