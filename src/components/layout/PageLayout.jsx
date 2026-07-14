import Sidebar from "./Sidebar";
import Breadcrumb from "../ui/Breadcrumb";
import { usePageHeader } from "../../context/PageHeaderContext";
import { LogOut } from "lucide-react";

export default function PageLayout({ children }) {
  const { items } = usePageHeader();

  return (
    <div className="flex min-h-screen bg-brand-sidebar">
      <Sidebar />
      <div className="flex-1 flex flex-col p-4">
        <div className="flex justify-between items-center mb-2 px-2 min-h-7">
          <Breadcrumb items={items} />
          {/* TODO: conectar con la lógica real de logout cuando esté el auth */}
          <button className="flex items-center gap-1 text-brand-white text-sm hover:opacity-80 transition-opacity">
            Cerrar sesión <LogOut size={14} />
          </button>
        </div>
        <main className="flex-1 bg-brand-bgApp rounded-2xl py-4 px-4 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}