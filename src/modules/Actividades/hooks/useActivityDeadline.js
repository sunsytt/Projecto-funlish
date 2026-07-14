import { useEffect, useState } from "react";

export function useActivityDeadline(duracionTotal) {
  const [tiempoRestante, setTiempoRestante] = useState(duracionTotal);
  const [finalizado, setFinalizado] = useState(false);

  useEffect(() => {
    setTiempoRestante(duracionTotal);
    setFinalizado(false);

    const intervalo = setInterval(() => {
      setTiempoRestante((prev) => {
        if (prev <= 1) {
          clearInterval(intervalo);
          setFinalizado(true);
          return 0;
        }

        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(intervalo);

  }, [duracionTotal]);

  return {
    tiempoRestante,
    finalizado
  };
}