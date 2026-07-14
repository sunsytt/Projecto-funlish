import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { estudianteApi } from "../../services/estudianteApi";
import { useGrupo } from "../../context/GrupoContext";
import UnirseModal from "./UnirseModal";
import ModuleBanner from "../../components/ui/ModuleBanner";

const ESTUDIANTE_ID = 2;

// Colores rotativos para el acento de cada card (para que no se vean todas iguales)
const cardColors = [
  "bg-cardColor-mint",
  "bg-cardColor-lavender",
  "bg-cardColor-skyBlue",
  "bg-cardColor-celeste",
];

function GroupCard({ nombre, cuatrimestre, docente, alumnos, colorClass, onClick }) {
  return (
    <button
      onClick={onClick}
      className="relative overflow-hidden rounded-2xl p-5 bg-brand-white shadow-sm text-left hover:shadow-md transition-shadow"
    >
      {/* Acento de color difuminado en la esquina, como en el diseño */}
      <div
        className={`absolute -bottom-8 -right-8 w-32 h-32 rounded-full opacity-70 blur-2xl ${colorClass}`}
      />
      <div className="relative z-10">
        <h3 className="text-brand-midnight font-bold text-lg">{nombre}</h3>
        <p className="text-xs text-brand-midnight/60 mt-1">
          Cuatrimestre {cuatrimestre}
        </p>
        <p className="text-xs text-brand-midnight/60">{docente}</p>
        <span className="inline-block mt-5 text-xs font-semibold bg-brand-glacier text-brand-midnight px-3 py-1 rounded-full">
          {alumnos} ALUMNOS
        </span>
      </div>
    </button>
  );
}

function UnirseCard({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="rounded-2xl border-2 border-dashed border-brand-steel/30 bg-brand-white/60 flex flex-col items-center justify-center gap-2 py-10 hover:bg-brand-white transition-colors"
    >
      <span className="w-8 h-8 rounded-full border-2 border-brand-midnight flex items-center justify-center text-brand-midnight text-lg leading-none">
        +
      </span>
      <span className="text-brand-midnight font-medium">
        Unirse a un grupo
      </span>
    </button>
  );
}

export default function MisClases() {
  const [grupos, setGrupos] = useState([]);
  const [mostrarModal, setMostrarModal] = useState(false);
  const navigate = useNavigate();
  const { setGrupoActual } = useGrupo();

  useEffect(() => {
    cargarMisGrupos();
  }, []);

  async function cargarMisGrupos() {
    try {
      // const datos = await estudianteApi.listarMisGrupos(ESTUDIANTE_ID);
      const datos = [
        { id: 1, nombre: "Ingles 6C", cuatrimestre: 6, docente: "Marisa Lopez Cortes", alumnos: 24 },
        { id: 2, nombre: "Ingles III", cuatrimestre: 3, docente: "Marisa Lopez Cortes", alumnos: 24 },
        { id: 3, nombre: "Ingles I", cuatrimestre: 1, docente: "Marisa Lopez Cortes", alumnos: 24 },
      ];
      setGrupos(datos);
    } catch (error) {
      console.error("Error al cargar clases del alumno", error);
    }
  }

  function entrarAGrupo(grupo) {
    setGrupoActual(grupo);
    navigate(`/grupos/${grupo.id}/material`);
  }

  const tieneGrupos = grupos.length > 0;

  return (
    <div>
      <ModuleBanner
        title="Mis grupos"
        subtitle={
          tieneGrupos
            ? "¡Qué bueno verte! Tus grupos están listos para la práctica del día."
            : "¡Hola! ¿Listo para seguir practicando hoy?"
        }
      />

      {!tieneGrupos ? (
        <div className="max-w-xs">
          <UnirseCard onClick={() => setMostrarModal(true)} />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {grupos.map((g, i) => (
            <GroupCard
              key={g.id}
              nombre={g.nombre}
              cuatrimestre={g.cuatrimestre}
              docente={g.docente}
              alumnos={g.alumnos}
              colorClass={cardColors[i % cardColors.length]}
              onClick={() => entrarAGrupo(g)}
            />
          ))}
          <UnirseCard onClick={() => setMostrarModal(true)} />
        </div>
      )}

      {mostrarModal && (
        <UnirseModal
          estudianteId={ESTUDIANTE_ID}
          onCerrar={() => setMostrarModal(false)}
          onUnido={(grupoUnido) => {
            setMostrarModal(false);
            if (grupoUnido?.id) {
              entrarAGrupo({ id: grupoUnido.id, nombre: grupoUnido.nombreGrupo });
            } else {
              cargarMisGrupos();
            }
          }}
        />
      )}
    </div>
  );
}