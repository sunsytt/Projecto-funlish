export default function ConfirmarCerrarSesionModal({ onCancelar, onConfirmar }) {
  return (
    <div className="fixed inset-0 bg-brand-midnight/50 flex items-center justify-center z-50 p-4">
      <div className="bg-brand-white rounded-2xl shadow-xl w-full max-w-sm p-6 text-center">
        <h2 className="text-xl font-bold text-status-info mb-4">Cerrar sesión</h2>
        <p className="text-brand-midnight/70 mb-6">
          ¿Estás seguro que quieres cerrar sesión?
        </p>
        <div className="flex gap-3">
          <button
            onClick={onCancelar}
            className="flex-1 py-2 rounded-full bg-neutral-inactive text-brand-midnight font-medium"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirmar}
            className="flex-1 py-2 rounded-full bg-status-error text-brand-white font-medium"
          >
            Cerrar sesión
          </button>
        </div>
      </div>
    </div>
  );
}