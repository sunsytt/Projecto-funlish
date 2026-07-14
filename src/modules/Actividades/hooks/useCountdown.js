import { useEffect, useRef, useState } from "react";

/**
 * Cronómetro regresivo para una pregunta/palabra individual.
 * Al llegar a 0 se marca `agotado = true` pero NO dispara ninguna
 * acción automática: el componente que lo use decide bloquear las
 * opciones y esperar a que el estudiante presione "Continuar".
 *
 * @param {number} segundosIniciales - tiempo asignado a la pregunta
 * @param {any} resetKey - cualquier valor que cambie por pregunta (ej. el id)
 *                          para reiniciar el cronómetro automáticamente
 */
export function useCountdown(segundosIniciales, resetKey) {
  const [segundosRestantes, setSegundosRestantes] = useState(segundosIniciales);
  const [agotado, setAgotado] = useState(false);
  const intervaloRef = useRef(null);

  useEffect(() => {
    setSegundosRestantes(segundosIniciales);
    setAgotado(false);
  }, [resetKey, segundosIniciales]);

  useEffect(() => {
    if (agotado) return;

    intervaloRef.current = setInterval(() => {
      setSegundosRestantes((prev) => {
        if (prev <= 1) {
          clearInterval(intervaloRef.current);
          setAgotado(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(intervaloRef.current);
  }, [resetKey, agotado]);

  function pausar() {
    clearInterval(intervaloRef.current);
  }

  return { segundosRestantes, agotado, pausar };
}