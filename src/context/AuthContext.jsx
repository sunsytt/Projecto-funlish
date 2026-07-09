import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

// Mock — reemplazar por la llamada real a tu backend Java cuando exista el endpoint de login.
// matrícula de estudiante: 6 dígitos · matrícula de docente: 4 dígitos
const USUARIOS_MOCK = [
  { matricula: "253489", contrasena: "123456", rol: "estudiante", nombre: "Maia" },
  { matricula: "1234", contrasena: "1234", rol: "docente", nombre: "Marisa López Cortés" },
];

export function AuthProvider({ children }) {
  // usuario: { matricula, rol, nombre } | null
  const [usuario, setUsuario] = useState(null);

  function login(matricula, contrasena) {
    return new Promise((resolve, reject) => {
      // Simula latencia de red para que los estados de carga/éxito se sientan reales
      setTimeout(() => {
        const encontrado = USUARIOS_MOCK.find(
          (u) => u.matricula === matricula.trim() && u.contrasena === contrasena
        );
        if (encontrado) {
          const { contrasena: _omit, ...datosPublicos } = encontrado;
          setUsuario(datosPublicos);
          resolve(datosPublicos);
        } else {
          reject(new Error("Matrícula o contraseña incorrecta. Por favor inténtalo de nuevo."));
        }
      }, 700);
    });
  }

  function logout() {
    setUsuario(null);
  }

  function registrar({ nombre, correo, matricula, contrasena, rol }) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const yaExiste = USUARIOS_MOCK.some((u) => u.matricula === matricula.trim());
        if (yaExiste) {
          reject(new Error("Este usuario ya existe, inicie sesión."));
          return;
        }
        // Mock: se guarda solo en memoria mientras no exista el endpoint real.
        USUARIOS_MOCK.push({ matricula: matricula.trim(), contrasena, rol, nombre, correo });
        resolve({ nombre, matricula, rol });
      }, 700);
    });
  }

  return (
    <AuthContext.Provider value={{ usuario, login, logout, registrar, isAuthenticated: !!usuario }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe usarse dentro de un AuthProvider");
  }
  return context;
}