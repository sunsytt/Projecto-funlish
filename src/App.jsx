import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import PageLayout from "./components/layout/PageLayout";
import { GrupoProvider } from "./context/GrupoContext";
import { PageHeaderProvider } from "./context/PageHeaderContext";

import MisClases from "./pages/MisClases/MisClases";
import MaterialHome from "./modules/Material/MaterialHome";
import UnidadDetail from "./modules/Material/UnidadDetail";
import TemaDetail from "./modules/Material/TemaDetail";
import Foro from "./modules/Foro/Foro";
import Perfil from "./modules/Perfil/Perfil";
import Actividades from "./modules/Actividades/Actividades";
import TemaActividades from "./modules/Actividades/TemaActividades";
import ActividadPlay from "./modules/Actividades/ActividadPlay";

function App() {
  return (
    <GrupoProvider>
      <PageHeaderProvider>
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
              <Route path="/grupos/:grupoId/material" element={<MaterialHome />} />
              <Route
                path="/grupos/:grupoId/material/:unidadId"
                element={<UnidadDetail />}
              />
              <Route
                path="/grupos/:grupoId/material/:unidadId/:temaId"
                element={<TemaDetail />}
              />
              <Route path="/grupos/:grupoId/actividades" element={<Actividades />} />
              <Route path="/grupos/:grupoId/actividades/:temaId" element={<TemaActividades />} />
              <Route path="/grupos/:grupoId/actividades/:temaId/:actividadId" element={<ActividadPlay />} />
              <Route path="/grupos/:grupoId/foro" element={<Foro />} />
              <Route path="/grupos/:grupoId/perfil" element={<Perfil />} />
            </Routes>
          </PageLayout>
        </BrowserRouter>
      </PageHeaderProvider>
    </GrupoProvider>
  );
}

export default App;