import { useState, useEffect } from "react";
import { NavLink, useLocation, matchPath } from "react-router-dom";
import {
  BookOpen,
  Gamepad2,
  MessageSquare,
  User,
  Users,
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useGrupo } from "../../context/GrupoContext";
import logo from "../../assets/images/logo.png";

const modulosGrupo = [
  { path: "foro", label: "Foro", icon: MessageSquare },
  { path: "material", label: "Material", icon: BookOpen },
  { path: "actividades", label: "Actividades", icon: Gamepad2 },
  { path: "perfil", label: "Perfil", icon: User },
];

const pillBase =
  "flex items-center gap-2 px-4 py-2 rounded-full font-medium text-sm w-full transition-colors";
const pillActive = "bg-status-info text-white";
const pillDefault = "bg-skill-reading text-white hover:brightness-95";

const CLAVE_SIDEBAR_COLAPSADO = "funlish_sidebar_colapsado";

export default function Sidebar() {
  const location = useLocation();
  const match = matchPath("/grupos/:grupoId/*", location.pathname);
  const grupoId = match?.params.grupoId;
  const { grupoActual } = useGrupo();

  // Lee el valor guardado como estado inicial (evita el "parpadeo" de
  // abrir expandido y luego colapsarse un instante después al montar)
  const [colapsado, setColapsado] = useState(() => {
    try {
      return localStorage.getItem(CLAVE_SIDEBAR_COLAPSADO) === "true";
    } catch {
      return false;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(CLAVE_SIDEBAR_COLAPSADO, String(colapsado));
    } catch {
      // si localStorage falla (incógnito, cuota llena) simplemente no persiste, no rompe nada
    }
  }, [colapsado]);

  return (
    <aside
      className={`h-screen shrink-0 bg-brand-sidebar flex flex-col py-8 px-3 gap-3 transition-all duration-300 ${
        colapsado ? "w-20" : "w-56"
      }`}
    >
      <div className="flex items-center justify-between px-1 mb-8 gap-2">
        {!colapsado && (
          <img src={logo} alt="logo-funlish" className="h-16 w-auto shrink-0" />
        )}
        <button
          onClick={() => setColapsado((v) => !v)}
          className="text-white/70 hover:text-white transition-colors p-1.5 rounded-lg hover:bg-white/10 shrink-0 ml-auto"
          aria-label={colapsado ? "Expandir menú" : "Colapsar menú"}
        >
          {colapsado ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </button>
      </div>

      <div className="flex-1 overflow-y-auto flex flex-col gap-3 min-h-0">
        {grupoId ? (
          <>
            <NavLink
              to="/mis-clases"
              title={grupoActual?.nombre ?? "Mis grupos"}
              className={`flex items-center gap-2 px-2 py-2 mb-2 text-white/90 text-sm hover:text-white transition-colors ${
                colapsado ? "justify-center" : ""
              }`}
            >
              <ArrowLeft size={16} className="shrink-0" />
              {!colapsado && (
                <span className="font-semibold truncate">
                  {grupoActual?.nombre ?? "Mis grupos"}
                </span>
              )}
            </NavLink>

            {modulosGrupo.map(({ path, label, icon: Icon }) => (
              <NavLink
                key={path}
                to={`/grupos/${grupoId}/${path}`}
                title={label}
                className={({ isActive }) =>
                  `${pillBase} ${isActive ? pillActive : pillDefault} ${
                    colapsado ? "justify-center px-0" : ""
                  }`
                }
              >
                <Icon size={16} className="shrink-0" />
                {!colapsado && <span>{label}</span>}
              </NavLink>
            ))}
          </>
        ) : (
          <NavLink
            to="/mis-clases"
            title="Mis Grupos"
            className={({ isActive }) =>
              `${pillBase} ${isActive ? pillActive : pillDefault} ${
                colapsado ? "justify-center px-0" : ""
              }`
            }
          >
            <Users size={16} className="shrink-0" />
            {!colapsado && <span>Mis Grupos</span>}
          </NavLink>
        )}
      </div>
    </aside>
  );
}