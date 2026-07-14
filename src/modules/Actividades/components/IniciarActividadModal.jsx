export default function IniciarActividadModal({ actividad, onCancelar, onConfirmar }) {
  return (
    <div className="fixed inset-0 bg-brand-midnight/50 flex items-center justify-center z-50 p-4">
      <div className="bg-brand-white rounded-2xl p-8 max-w-md w-full text-center">
        <h2 className="text-2xl font-bold text-brand-midnight mb-3">
          ¿Listo para empezar?
        </h2>
        <p className="text-brand-midnight/70 mb-6">
          Estás a punto de iniciar <strong>{actividad.titulo}</strong>. Una vez
          dentro, el tiempo empezará a correr.
        </p>
        <div className="flex justify-center gap-3">
          <button
            onClick={onCancelar}
            className="px-5 py-2.5 rounded-xl bg-neutral-inactive/50 text-brand-midnight font-semibold hover:bg-neutral-inactive transition"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirmar}
            className="px-5 py-2.5 rounded-xl bg-button-DEFAULT hover:bg-button-hover text-brand-white font-semibold transition"
          >
            Iniciar actividad
          </button>
        </div>
      </div>
    </div>
  );
}