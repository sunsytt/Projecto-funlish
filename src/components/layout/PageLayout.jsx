import { useState } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Breadcrumb from "../ui/Breadcrumb";
import ConfirmarCerrarSesionModal from "../ui/ConfirmarCerrarSesionModal";
import { usePageHeader } from "../../context/PageHeaderContext";
import { useAuth } from "../../context/AuthContext";
import { LogOut } from "lucide-react";

// Ahora es una layout route: usa <Outlet/> en vez de recibir children,
// así App.jsx puede anidar las rutas privadas dentro de esta.
export default function PageLayout() {
  const { items } = usePageHeader();
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [mostrarConfirmarSalida, setMostrarConfirmarSalida] = useState(false);

  function confirmarCierre() {
    logout();
    setMostrarConfirmarSalida(false);
    navigate("/login");
  }

  return (
    <div className="flex min-h-screen bg-brand-sidebar">
      <Sidebar />
      <div className="flex-1 flex flex-col p-4">
        <div className="flex justify-between items-center mb-2 px-2 min-h-7">
          <Breadcrumb items={items} />
          <button
            onClick={() => setMostrarConfirmarSalida(true)}
            className="flex items-center gap-1 text-brand-white text-sm hover:opacity-80 transition-opacity"
          >
            Cerrar sesión <LogOut size={14} />
          </button>
        </div>
        <main className="flex-1 bg-brand-bgApp rounded-2xl py-8 px-5 overflow-y-auto">
          <Outlet />
        </main>
      </div>

      {mostrarConfirmarSalida && (
        <ConfirmarCerrarSesionModal
          onCancelar={() => setMostrarConfirmarSalida(false)}
          onConfirmar={confirmarCierre}
        />
      )}
    </div>
  );
}