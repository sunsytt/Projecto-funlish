import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import Breadcrumb from "../ui/Breadcrumb";
import ConfirmarCerrarSesionModal from "../ui/ConfirmarCerrarSesionModal";
import { usePageHeader } from "../../context/PageHeaderContext";
import { LogOut } from "lucide-react";

export default function PageLayout({ children }) {
  const { items } = usePageHeader();
  const navigate = useNavigate();
  const [mostrarConfirmarSalida, setMostrarConfirmarSalida] = useState(false);

  function confirmarCierre() {
    // TODO: cuando exista el módulo de Autenticación, limpiar aquí el token/sesión real
    setMostrarConfirmarSalida(false);
    navigate("/login");
  }

  return (
    <div className="flex min-h-screen bg-brand-sidebar">
      <Sidebar />
      <div className="flex-1 flex flex-col p-4">
        <div className="flex justify-between items-center mb-2 px-2 min-h-[28px]">
          <Breadcrumb items={items} />
          <button
            onClick={() => setMostrarConfirmarSalida(true)}
            className="flex items-center gap-1 text-brand-white text-sm hover:opacity-80 transition-opacity"
          >
            Cerrar sesión <LogOut size={14} />
          </button>
        </div>
        <main className="flex-1 bg-brand-bgApp rounded-2xl py-8 px-5 overflow-y-auto">
          {children}
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