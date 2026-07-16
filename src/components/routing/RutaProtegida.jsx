import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function RutaProtegida() {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    // Guardamos a dónde intentaba ir, así LoginPage puede regresarlo ahí
    // después de iniciar sesión (usuario.rol === docente/estudiante ya lo maneja LoginPage).
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
}