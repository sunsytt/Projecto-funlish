import { Link, useNavigate } from "react-router-dom";
import { ChevronRight, LogOut } from "lucide-react";
import { useBreadcrumb } from "../../context/BreadcrumbContext";
import { useAuth } from "../../context/AuthContext";

export default function TopBar({ tituloDefault = "" }) {
  const { breadcrumb } = useBreadcrumb();
  const { logout } = useAuth();
  const navigate = useNavigate();

  function manejarCerrarSesion() {
    logout();
    navigate("/login", { replace: true });
  }

  return (
    <header className="h-20 w-full bg-brand-sidebar flex items-center justify-between px-8 shrink-0">
      <div className="flex items-center gap-2 text-white">
        {breadcrumb.length > 0 ? (
          breadcrumb.map((item, i) => {
            const esUltimo = i === breadcrumb.length - 1;
            return (
              <span key={i} className="flex items-center gap-2">
                {item.path && !esUltimo ? (
                  <Link
                    to={item.path}
                    className="text-2xl font-bold hover:opacity-80 transition-opacity"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <span className={esUltimo ? "text-2xl font-bold" : "text-2xl font-bold text-white/60"}>
                    {item.label}
                  </span>
                )}
                {!esUltimo && <ChevronRight size={20} className="text-white/50" />}
              </span>
            );
          })
        ) : (
          <span className="text-2xl font-bold">{tituloDefault}</span>
        )}
      </div>

      <button
        onClick={manejarCerrarSesion}
        className="flex items-center gap-2 text-white hover:opacity-80 transition-opacity text-sm font-medium"
      >
        Cerrar sesión
        <LogOut size={16} />
      </button>
    </header>
  );
}