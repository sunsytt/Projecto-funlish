import { BrowserRouter, Routes, Route, Navigate, Outlet } from "react-router-dom";
import PageLayout from "./components/layout/PageLayout";
import { GrupoProvider } from "./context/GrupoContext";
import { BreadcrumbProvider } from "./context/BreadcrumbContext";
import { AuthProvider, useAuth } from "./context/AuthContext";
import RequireAuth from "./components/auth/RequireAuth";

import LoginPage from "./pages/Auth/LoginPage";
import RoleSelectPage from "./pages/Auth/RoleSelectPage";
import RegistroForm from "./pages/Auth/RegistroForm";
import MisClases from "./pages/MisClases/MisClases";
import Actividades from "./modules/Actividades/Actividades";
import Foro from "./modules/Foro/Foro";
import Perfil from "./modules/Perfil/Perfil";
import MaterialUnidades from "./modules/material/MaterialUnidades";
import MaterialTemas from "./modules/material/MaterialTemas";
import MaterialTemaDetalle from "./modules/material/MaterialTemaDetalle";
import ProfesorHome from "./pages/Profesor/ProfesorHome";

// Envuelve las páginas autenticadas con el Sidebar + TopBar.
// El login se queda FUERA de esto para que sea pantalla completa.
function AppLayout() {
  return (
    <PageLayout>
      <Outlet />
    </PageLayout>
  );
}

// Decide a dónde mandar "/" según si hay sesión y qué rol tiene.
function RootRedirect() {
  const { isAuthenticated, usuario } = useAuth();

  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return (
    <Navigate to={usuario.rol === "docente" ? "/profesor" : "/mis-clases"} replace />
  );
}

function App() {
  return (
    <AuthProvider>
      <GrupoProvider>
        <BreadcrumbProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<RootRedirect />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/registro" element={<RoleSelectPage />} />
              <Route path="/registro/datos" element={<RegistroForm />} />

              {/* Zona de estudiante */}
              <Route element={<RequireAuth rolesPermitidos={["estudiante"]} />}>
                <Route element={<AppLayout />}>
                  <Route path="/mis-clases" element={<MisClases />} />

                  {/* Al entrar a un grupo sin especificar módulo, cae en Material por defecto */}
                  <Route path="/grupos/:grupoId" element={<Navigate to="material" replace />} />

                  <Route path="/grupos/:grupoId/actividades" element={<Actividades />} />
                  <Route path="/grupos/:grupoId/foro" element={<Foro />} />
                  <Route path="/grupos/:grupoId/perfil" element={<Perfil />} />

                  <Route path="/grupos/:grupoId/material" element={<MaterialUnidades />} />
                  <Route path="/grupos/:grupoId/material/:unidadId" element={<MaterialTemas />} />
                  <Route
                    path="/grupos/:grupoId/material/:unidadId/:temaId"
                    element={<MaterialTemaDetalle />}
                  />
                </Route>
              </Route>

              {/* Zona de docente (placeholder por ahora) */}
              <Route element={<RequireAuth rolesPermitidos={["docente"]} />}>
                <Route element={<AppLayout />}>
                  <Route path="/profesor" element={<ProfesorHome />} />
                </Route>
              </Route>
            </Routes>
          </BrowserRouter>
        </BreadcrumbProvider>
      </GrupoProvider>
    </AuthProvider>
  );
}

export default App;