import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/images/logo.png";
// Ajusta estos nombres a como se llamen realmente en tu carpeta de assets
import ilustracionEstudiante from "../../assets/images/rolAlumno.png";
import ilustracionDocente from "../../assets/images/rolDocente.png";
import StepDots from "../../components/ui/StepDots";

const ROLES = [
  {
    id: "estudiante",
    titulo: "Estudiante",
    descripcion:
      "Recibe información importante de tu docente, únete a una clase, practica las 4 habilidades, observa tu progreso y comparte tus ideas con el grupo.",
    imagen: ilustracionEstudiante,
  },
  {
    id: "docente",
    titulo: "Docente",
    descripcion:
      "Crea grupos, sube material y evalúa a tus alumnos a través de dinámicas creativas y, a la vez, mira sus resultados por habilidad.",
    imagen: ilustracionDocente,
  },
];

export default function RoleSelectPage() {
  const [rolSeleccionado, setRolSeleccionado] = useState("estudiante");
  const navigate = useNavigate();

  function continuar() {
    navigate("/registro/datos", { state: { rol: rolSeleccionado } });
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <header className="p-6">
        <img src={logo} alt="Logo Funlish" className="h-10 w-auto" />
      </header>

      <main className="flex-1 flex items-center justify-center px-6 pb-10">
        <div className="w-full max-w-4xl bg-brand-glacier/40 rounded-[2rem] p-10">
          <h1 className="text-4xl font-extrabold text-brand-midnight mb-2">¿Quién eres?</h1>
          <p className="font-bold text-brand-midnight mb-2 capitalize">{rolSeleccionado}</p>
          <StepDots total={2} current={1} />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
            {ROLES.map((rol) => {
              const seleccionado = rolSeleccionado === rol.id;
              return (
                <button
                  key={rol.id}
                  type="button"
                  onClick={() => setRolSeleccionado(rol.id)}
                  className={`text-left rounded-2xl p-4 border-2 transition-all duration-200
                              focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-status-info
                              ${
                                seleccionado
                                  ? "bg-brand-glacier border-brand-steel shadow-md"
                                  : "bg-white border-transparent hover:border-brand-steel/30"
                              }`}
                >
                  <img
                    src={rol.imagen}
                    alt=""
                    className="w-full h-40 object-cover rounded-xl mb-4 bg-white"
                  />
                  <h3 className="text-xl font-bold text-brand-midnight mb-2">{rol.titulo}</h3>
                  <p className="text-sm text-brand-midnight/80">{rol.descripcion}</p>
                </button>
              );
            })}
          </div>

          <button
            type="button"
            onClick={continuar}
            className="w-full bg-button-DEFAULT hover:bg-button-hover active:bg-button-pressed text-white font-bold rounded-xl py-3 transition-colors"
          >
            Continuar
          </button>
        </div>
      </main>
    </div>
  );
}