export default function ConfirmarSalidaModal({ onSeguirJugando, onSalir }) {
  return (
    <div className="fixed inset-0 bg-brand-midnight/50 flex items-center justify-center z-50 p-4">
      <div className="bg-brand-white rounded-2xl p-8 max-w-md w-full text-center">
        <h2 className="text-2xl font-bold text-brand-steel mb-4">Confirmar salida</h2>
        <p className="text-brand-midnight/80 mb-6">
          ¿Estás seguro que quieres salir? Tu progreso se guardará y podrás
          continuar la actividad más tarde desde donde te quedaste.
        </p>
        <div className="flex justify-center gap-3">
          <button
            onClick={onSeguirJugando}
            className="px-5 py-2.5 rounded-xl bg-neutral-inactive/50 text-brand-midnight font-semibold hover:bg-neutral-inactive transition"
          >
            Seguir jugando
          </button>
          <button
            onClick={onSalir}
            className="px-5 py-2.5 rounded-xl bg-button-DEFAULT hover:bg-button-hover text-brand-white font-semibold transition"
          >
            Salir
          </button>
        </div>
      </div>
    </div>
  );
}