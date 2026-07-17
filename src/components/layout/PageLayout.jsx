import { useState } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Breadcrumb from "../ui/Breadcrumb";
import ConfirmarCerrarSesionModal from "../ui/ConfirmarCerrarSesionModal";
import { usePageHeader } from "../../context/PageHeaderContext";
import { useAuth } from "../../context/AuthContext";
import { LogOut } from "lucide-react";

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
    // h-screen + overflow-hidden: la página completa ya NO puede crecer más
    // allá de la ventana ni hacer scroll global. Así el sidebar (que vive
    // fuera del <main>) se queda fijo sin importar qué tan largo sea el
    // contenido de cada módulo.
    <div className="flex h-screen overflow-hidden bg-brand-sidebar">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="flex justify-between items-center mb-2 px-2 pt-4 min-h-7 shrink-0">
          <Breadcrumb items={items} />
          <button
            onClick={() => setMostrarConfirmarSalida(true)}
            className="flex items-center gap-1 text-brand-white text-sm hover:opacity-80 transition-opacity"
          >
            Cerrar sesión <LogOut size={14} />
          </button>
        </div>
        <main className="flex-1 bg-brand-bgApp rounded-2xl py-8 px-5 mx-4 mb-4 overflow-y-auto">
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