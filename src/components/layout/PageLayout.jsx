import Sidebar from "./Sidebar";
import TopBar from "./TopBar";

export default function PageLayout({ children }) {
  return (
    // Fondo navy de pantalla completa: el Sidebar y el TopBar son del mismo
    // color, así que se funden con este fondo y solo el panel de contenido
    // (más abajo) queda "flotando" encima con esquinas redondeadas.
    <div className="flex h-screen bg-brand-sidebar">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopBar />
        {/* mx-4 mb-4 deja ver el navy de fondo a los lados y abajo;
            sin margen arriba porque ya está pegado al TopBar (mismo color) */}
        <main className="flex-1 overflow-y-auto bg-brand-bgApp rounded-3xl mx-4 mb-4">
          {children}
        </main>
      </div>
    </div>
  );
}