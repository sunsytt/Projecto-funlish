import { useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { Eye, EyeOff, AlertTriangle, CheckCircle2 } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import logo from "../../assets/images/logo.png";
// Ajusta esta ruta al nombre real de tu ilustración dentro de assets
import ilustracion from "../../assets/images/inicioGrupos.png";

function matriculaTieneFormatoValido(m) {
  // Estudiante: 6 dígitos · Docente: 4 dígitos
  return /^\d{4}$|^\d{6}$/.test(m.trim());
}

export default function LoginPage() {
  const [matricula, setMatricula] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [mostrarContrasena, setMostrarContrasena] = useState(false);
  const [estado, setEstado] = useState("idle"); // "idle" | "error" | "success"
  const [mensajeError, setMensajeError] = useState("");

  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // El segundo punto se "activa" en cuanto el usuario empieza a escribir,
  // como en tu mockup (ambos puntos apagados solo en el estado inicial vacío).
  const tocado = matricula.length > 0 || contrasena.length > 0;

  async function manejarSubmit(e) {
    e.preventDefault();

    if (!matriculaTieneFormatoValido(matricula)) {
      setMensajeError("La matrícula debe tener 4 dígitos (docente) o 6 dígitos (estudiante).");
      setEstado("error");
      return;
    }

    try {
      const usuario = await login(matricula, contrasena);
      setEstado("success");
      const destino =
        location.state?.from?.pathname ||
        (usuario.rol === "docente" ? "/profesor" : "/mis-clases");
      setTimeout(() => navigate(destino, { replace: true }), 1200);
    } catch (err) {
      setMensajeError(err.message);
      setEstado("error");
    }
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <header className="p-6">
        <img src={logo} alt="Logo Funlish" className="h-10 w-auto" />
      </header>

      <main className="flex-1 flex items-center justify-center px-6 pb-10">
        <div className="w-full max-w-5xl bg-brand-glacier/40 rounded-[2rem] p-10 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div>
            <h1 className="text-4xl font-extrabold text-brand-midnight mb-6">
              Inicio de sesión
            </h1>

            <div className="flex items-center gap-2 mb-8" aria-hidden="true">
              <span className="w-3 h-3 rounded-full bg-brand-steel" />
              <span
                className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                  tocado ? "bg-brand-steel" : "bg-neutral-inactive"
                }`}
              />
            </div>

            <form onSubmit={manejarSubmit} className="flex flex-col gap-5" noValidate>
              <div>
                <label htmlFor="matricula" className="block font-bold text-brand-midnight mb-2">
                  Matrícula
                </label>
                <input
                  id="matricula"
                  value={matricula}
                  onChange={(e) => setMatricula(e.target.value)}
                  placeholder="Ingrese su matrícula"
                  autoComplete="username"
                  className={`w-full px-4 py-3 rounded-xl border-2 bg-white text-brand-midnight outline-none transition-colors
                              focus:ring-2 focus:ring-status-info
                              ${estado === "error" ? "border-status-error" : "border-transparent"}`}
                />
              </div>

              <div>
                <label htmlFor="contrasena" className="block font-bold text-brand-midnight mb-2">
                  Contraseña
                </label>
                <div className="relative">
                  <input
                    id="contrasena"
                    type={mostrarContrasena ? "text" : "password"}
                    value={contrasena}
                    onChange={(e) => setContrasena(e.target.value)}
                    placeholder="Ingrese su contraseña"
                    autoComplete="current-password"
                    className={`w-full px-4 py-3 pr-12 rounded-xl border-2 bg-white text-brand-midnight outline-none transition-colors
                                focus:ring-2 focus:ring-status-info
                                ${estado === "error" ? "border-status-error" : "border-transparent"}`}
                  />
                  <button
                    type="button"
                    onClick={() => setMostrarContrasena((v) => !v)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-brand-midnight/60 hover:text-brand-midnight transition-colors"
                    aria-label={mostrarContrasena ? "Ocultar contraseña" : "Mostrar contraseña"}
                  >
                    {mostrarContrasena ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              {estado === "error" && (
                <div className="flex items-center gap-3 bg-status-error/10 border border-status-error rounded-xl px-4 py-3">
                  <AlertTriangle className="text-status-error shrink-0" size={20} />
                  <p className="text-sm text-status-error font-medium">{mensajeError}</p>
                </div>
              )}

              {estado === "success" && (
                <div className="flex items-center gap-3 bg-status-success/10 border border-status-success rounded-xl px-4 py-3">
                  <CheckCircle2 className="text-status-success shrink-0" size={20} />
                  <p className="text-sm text-status-success font-medium">
                    ¡Inicio de sesión exitoso! Redirigiéndote...
                  </p>
                </div>
              )}

              <button
                type="submit"
                disabled={estado === "success"}
                className="bg-button-DEFAULT hover:bg-button-hover active:bg-button-pressed text-white font-bold rounded-xl py-3
                           transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
              >
                Iniciar sesión
              </button>

              <p className="text-center text-brand-midnight font-semibold">
                ¿No tienes cuenta?{" "}
                <Link to="/registro" className="text-brand-steel hover:underline">
                  Regístrate
                </Link>
              </p>
            </form>
          </div>

          <img
            src={ilustracion}
            alt="Ilustración de estudiantes en el campus"
            className="hidden lg:block w-full h-auto rounded-3xl object-cover max-h-130"
          />
        </div>
      </main>
    </div>
  );
}