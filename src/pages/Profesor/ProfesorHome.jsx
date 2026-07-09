import { useAuth } from "../../context/AuthContext";

// Placeholder temporal — el panel real de docente se construye en otra sesión.
export default function ProfesorHome() {
  const { usuario } = useAuth();

  return (
    <div className="p-8">
      <div className="bg-white rounded-2xl p-12 text-center">
        <h1 className="text-2xl font-bold text-brand-midnight mb-2">
          ¡Hola, {usuario?.nombre}!
        </h1>
        <p className="text-brand-midnight/70">
          El panel de docente todavía está en construcción. Pronto podrás gestionar
          tus grupos, material y actividades desde aquí.
        </p>
      </div>
    </div>
  );
}