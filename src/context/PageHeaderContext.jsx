import { createContext, useContext, useState, useEffect } from "react";

const PageHeaderContext = createContext(null);

export function PageHeaderProvider({ children }) {
  const [items, setItems] = useState([]);
  return (
    <PageHeaderContext.Provider value={{ items, setItems }}>
      {children}
    </PageHeaderContext.Provider>
  );
}

export function usePageHeader() {
  return useContext(PageHeaderContext);
}

// Hook que cada página usa para definir su propio breadcrumb/título.
// Ejemplo: useBreadcrumb([{ label: "Material", to: "/grupos/1/material" }, { label: "Unidad 1" }])
export function useBreadcrumb(items) {
  const { setItems } = usePageHeader();
  useEffect(() => {
    setItems(items);
    return () => setItems([]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(items)]);
}