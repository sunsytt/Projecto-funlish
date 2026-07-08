import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import PageLayout from "./components/layout/PageLayout";
import { GrupoProvider } from "./context/GrupoContext";

import MisClases from "./pages/MisClases/MisClases";
import Actividades from "./modules/Actividades/Actividades";
import Foro from "./modules/Foro/Foro";
import Perfil from "./modules/Perfil/Perfil";
import { BreadcrumbProvider } from "./context/BreadcrumbContext";
import MaterialUnidades from "./modules/material/MaterialUnidades";
import MaterialTemas from "./modules/material/MaterialTemas";
import MaterialTemaDetalle from "./modules/material/MaterialTemaDetalle";

function App() {
  return (
    <GrupoProvider>
      <BreadcrumbProvider>
        <BrowserRouter>
          <PageLayout>
            <Routes>
              <Route path="/" element={<Navigate to="/mis-clases" replace />} />
              <Route path="/mis-clases" element={<MisClases />} />

              {/* Al entrar a un grupo sin especificar módulo, cae en Material por defecto */}
              <Route
                path="/grupos/:grupoId"
                element={<Navigate to="material" replace />}
              />
              <Route path="/grupos/:grupoId/actividades" element={<Actividades />} />
              <Route path="/grupos/:grupoId/foro" element={<Foro />} />
              <Route path="/grupos/:grupoId/perfil" element={<Perfil />} />
              <Route path="/grupos/:grupoID/material" element={<MaterialUnidades />} />
              <Route path="/grupos/:grupoID/material/:unidadId" element={<MaterialTemas />} />
              <Route path="/grupos/:grupoID/material/:unidadId/:temaId" element={<MaterialTemaDetalle />} />
            </Routes>
          </PageLayout>
        </BrowserRouter>
      </BreadcrumbProvider>      
      
    </GrupoProvider>
  );
}

export default App;