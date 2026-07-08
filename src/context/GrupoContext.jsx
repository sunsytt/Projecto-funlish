import { createContext, useContext, useState } from "react";

const GrupoContext = createContext(null);

export function GrupoProvider({ children }) {
  // grupoActual: { id, nombre } | null
  const [grupoActual, setGrupoActual] = useState(null);

  return (
    <GrupoContext.Provider value={{ grupoActual, setGrupoActual }}>
      {children}
    </GrupoContext.Provider>
  );
}

export function useGrupo() {
  const context = useContext(GrupoContext);
  if (!context) {
    throw new Error("useGrupo debe usarse dentro de un GrupoProvider");
  }
  return context;
}