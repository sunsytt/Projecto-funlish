import { useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { Eye, EyeOff, AlertTriangle, CheckCircle2 } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import logo from "../../assets/images/logo.png";
// Ajusta esta ruta al nombre real de tu ilustración
import ilustracionEstudiante from "../../assets/images/registroAlumno.png";
import StepDots from "../../components/ui/StepDots";

// Estudiante: 6 dígitos · Docente: 4 dígitos
const LONGITUD_MATRICULA = { estudiante: 6, docente: 4 };

function Campo({ label, value, onChange, placeholder, type = "text", error, disabled }) {
  return (
    <div className="mb-3">
      <label className="block font-bold text-brand-midnight mb-2">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        className={`w-full px-4 py-3 rounded-xl border-2 bg-white text-brand-midnight outline-none transition-colors
                    focus:ring-2 focus:ring-status-info
                    ${error ? "border-status-error" : "border-transparent"}`}
      />
      {error && <p className="text-xs text-status-error font-semibold text-right mt-1">*{error}</p>}
    </div>
  );
}

export default function RegistroForm() {
  const location = useLocation();
  const { registrar } = useAuth();

  const rol = location.state?.rol || "estudiante";

  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [matricula, setMatricula] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [mostrarContrasena, setMostrarContrasena] = useState(false);

  const [erroresCampo, setErroresCampo] = useState({});
  const [errorGeneral, setErrorGeneral] = useState("");
  const [exito, setExito] = useState(false);

  // El registro de docente todavía no está construido — evita mostrar un
  // formulario a medio hacer y regresa a elegir rol.
  if (rol !== "estudiante") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white px-6">
        <div className="text-center max-w-sm">
          <p className="text-brand-midnight font-semibold mb-4">
            El registro de docentes estará disponible pronto.
          </p>
          <Link to="/registro" className="text-brand-steel hover:underline">
            Volver a elegir rol
          </Link>
        </div>
      </div>
    );
  }

  function validarCampos() {
    const errores = {};
    if (!nombre.trim()) errores.nombre = "Campo obligatorio";
    if (!correo.trim()) errores.correo = "Campo obligatorio";
    else if (!/^\S+@\S+\.\S+$/.test(correo.trim())) errores.correo = "Correo inválido";
    if (!matricula.trim()) errores.matricula = "Campo obligatorio";
    if (!contrasena.trim()) errores.contrasena = "Campo obligatorio";
    return errores;
  }

  async function manejarSubmit(e) {
    e.preventDefault();
    setErrorGeneral("");

    const errores = validarCampos();
    if (Object.keys(errores).length > 0) {
      setErroresCampo(errores);
      return;
    }
    setErroresCampo({});

    const longitudEsperada = LONGITUD_MATRICULA[rol];
    if (!new RegExp(`^\\d{${longitudEsperada}}$`).test(matricula.trim())) {
      setErrorGeneral("La matrícula o correo no corresponden al rol seleccionado.");
      return;
    }

    try {
      await registrar({ nombre, correo, matricula, contrasena, rol });
      setExito(true);
    } catch (err) {
      setErrorGeneral(err.message);
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
            <h1 className="text-4xl font-extrabold text-brand-midnight mb-2">Registro</h1>
            <p className="font-bold text-brand-midnight mb-2 capitalize">{rol}</p>
            <StepDots total={2} current={2} />

            <form onSubmit={manejarSubmit} noValidate>
              <Campo
                label="Nombre"
                value={nombre}
                onChange={setNombre}
                placeholder="Ingrese su nombre"
                error={erroresCampo.nombre}
                disabled={exito}
              />
              <Campo
                label="Correo"
                value={correo}
                onChange={setCorreo}
                placeholder="Ingrese su correo"
                type="email"
                error={erroresCampo.correo}
                disabled={exito}
              />
              <Campo
                label="Matrícula"
                value={matricula}
                onChange={setMatricula}
                placeholder="Ingrese su matrícula"
                error={erroresCampo.matricula}
                disabled={exito}
              />

              <div className="mb-3">
                <label className="block font-bold text-brand-midnight mb-2">Contraseña</label>
                <div className="relative">
                  <input
                    type={mostrarContrasena ? "text" : "password"}
                    value={contrasena}
                    onChange={(e) => setContrasena(e.target.value)}
                    placeholder="Ingrese su contraseña"
                    disabled={exito}
                    className={`w-full px-4 py-3 pr-12 rounded-xl border-2 bg-white text-brand-midnight outline-none transition-colors
                                focus:ring-2 focus:ring-status-info
                                ${erroresCampo.contrasena ? "border-status-error" : "border-transparent"}`}
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
                {erroresCampo.contrasena && (
                  <p className="text-xs text-status-error font-semibold text-right mt-1">
                    *{erroresCampo.contrasena}
                  </p>
                )}
              </div>

              {errorGeneral && (
                <div className="flex items-center gap-3 bg-status-error/10 border border-status-error rounded-xl px-4 py-3 mb-3">
                  <AlertTriangle className="text-status-error shrink-0" size={20} />
                  <p className="text-sm text-status-error font-medium">{errorGeneral}</p>
                </div>
              )}

              {exito && (
                <div className="flex items-center gap-3 bg-status-success/10 border border-status-success rounded-xl px-4 py-3 mb-3">
                  <CheckCircle2 className="text-status-success shrink-0" size={20} />
                  <p className="text-sm text-status-success font-medium">
                    ¡Registro exitoso! Tu cuenta ha sido creada. Por favor,{" "}
                    <Link to="/login" className="underline font-semibold">
                      inicia sesión
                    </Link>
                    .
                  </p>
                </div>
              )}

              <button
                type="submit"
                disabled={exito}
                className="w-full bg-button-DEFAULT hover:bg-button-hover active:bg-button-pressed text-white font-bold rounded-xl py-3
                           transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
              >
                Registrarme
              </button>
            </form>
          </div>

          <img
            src={ilustracionEstudiante}
            alt="Ilustración de estudiante"
            className="hidden lg:block w-full h-auto rounded-3xl object-cover max-h-[520px]"
          />
        </div>
      </main>
    </div>
  );
}