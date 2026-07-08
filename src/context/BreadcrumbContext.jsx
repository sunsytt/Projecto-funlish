import { createContext, useContext, useState, useEffect } from "react";

const BreadcrumbContext = createContext(null);

export function BreadcrumbProvider({ children }) {
  // breadcrumb: [{ label: string, path?: string }]
  const [breadcrumb, setBreadcrumb] = useState([]);

  return (
    <BreadcrumbContext.Provider value={{ breadcrumb, setBreadcrumb }}>
      {children}
    </BreadcrumbContext.Provider>
  );
}

export function useBreadcrumb() {
  const context = useContext(BreadcrumbContext);
  if (!context) {
    throw new Error("useBreadcrumb debe usarse dentro de un BreadcrumbProvider");
  }
  return context;
}

/**
 * Hook de conveniencia: cada página avisa su propio trail al montarse
 * y lo limpia al desmontarse, para que la franja navy siempre muestre
 * la ruta de la vista activa.
 *
 * Uso:
 *   usePageBreadcrumb([
 *     { label: "Material", path: `/grupos/${grupoId}/material` },
 *     { label: "Unidad 1" },
 *   ]);
 */
export function usePageBreadcrumb(items) {
  const { setBreadcrumb } = useBreadcrumb();
  // Se usa JSON.stringify como dependencia porque `items` normalmente
  // se define inline en cada página (nueva referencia en cada render).
  useEffect(() => {
    setBreadcrumb(items);
    return () => setBreadcrumb([]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(items)]);
}