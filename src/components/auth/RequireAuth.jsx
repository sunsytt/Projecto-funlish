import { Navigate, useLocation, Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

/**
 * Ruta protegida. Úsala como layout route en App.jsx:
 *
 *   <Route element={<RequireAuth rolesPermitidos={["estudiante"]} />}>
 *     <Route path="/mis-clases" element={<MisClases />} />
 *     ...
 *   </Route>
 *
 * Si no hay sesión, manda a /login (y recuerda a dónde iba, para regresarlo
 * ahí después de iniciar sesión). Si hay sesión pero el rol no coincide,
 * lo regresa a /mis-clases en vez de dejarlo entrar a una zona ajena.
 */
export default function RequireAuth({ rolesPermitidos }) {
  const { usuario, isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  if (rolesPermitidos && !rolesPermitidos.includes(usuario.rol)) {
    return <Navigate to="/mis-clases" replace />;
  }

  return <Outlet />;
}