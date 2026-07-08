import { NavLink, useLocation, matchPath } from "react-router-dom";
import { BookOpen, Gamepad2, MessageSquare, User, Users, ArrowLeft } from "lucide-react";
import { useGrupo } from "../../context/GrupoContext";
import  logo from "../../assets/images/logo.png";


const modulosGrupo = [
  { path: "material", label: "Material", icon: BookOpen },
  { path: "actividades", label: "Actividades", icon: Gamepad2 },
  { path: "foro", label: "Foro", icon: MessageSquare },
  { path: "perfil", label: "Perfil", icon: User },
];

const pillBase =
  "flex items-center gap-2 px-4 py-2 rounded-full font-medium text-sm w-full transition-colors";
const pillActive = "bg-status-info text-white";
const pillDefault = "bg-skill-reading text-white hover:brightness-95";

export default function Sidebar() {
  const location = useLocation();
  const match = matchPath("/grupos/:grupoId/*", location.pathname);
  const grupoId = match?.params.grupoId;
  const { grupoActual } = useGrupo();

  return (
    <aside className="h-screen w-56 shrink-0 bg-brand-sidebar flex flex-col py-8 px-4 gap-3">
      <div className="flex items-center gap-2 text-white text-xl font-bold mb-8 px-1">
        <img src={logo} alt="logo-funlish" className="h-20 w-auto"/>
      </div>

      {grupoId ? (
        <>
          <NavLink
            to="/mis-clases"
            className="flex items-center gap-2 px-2 py-2 mb-2 text-white/90 text-sm hover:text-white transition-colors"
          >
            <ArrowLeft size={16} className="shrink-0" />
            <span className="font-semibold truncate">
              {grupoActual?.nombre ?? "Mis grupos"}
            </span>
          </NavLink>

          {modulosGrupo.map(({ path, label, icon: Icon }) => (
            <NavLink
              key={path}
              to={`/grupos/${grupoId}/${path}`}
              className={({ isActive }) =>
                `${pillBase} ${isActive ? pillActive : pillDefault}`
              }
            >
              <Icon size={16} />
              <span>{label}</span>
            </NavLink>
          ))}
        </>
      ) : (
        <NavLink
          to="/mis-clases"
          className={({ isActive }) =>
            `${pillBase} ${isActive ? pillActive : pillDefault}`
          }
        >
          <Users size={16} />
          <span>Mis Grupos</span>
        </NavLink>
      )}
    </aside>
  );
}