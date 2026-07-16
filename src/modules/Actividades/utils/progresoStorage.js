// Persistencia temporal del progreso de una actividad mientras no hay backend.
// Cuando conectes tu API, reemplaza estas 3 funciones por llamadas reales
// (guardar progreso -> POST/PATCH, obtener -> GET) sin tocar ActividadPlay.jsx.

function claveProgreso(grupoId, actividadId) {
  return `funlish_progreso_${grupoId}_${actividadId}`;
}

export function guardarProgreso(grupoId, actividadId, data) {
  try {
    localStorage.setItem(claveProgreso(grupoId, actividadId), JSON.stringify(data));
  } catch {
    // localStorage puede fallar (modo incógnito, cuota llena, etc.) — no rompemos el juego por esto
  }
}

export function obtenerProgreso(grupoId, actividadId) {
  try {
    const guardado = localStorage.getItem(claveProgreso(grupoId, actividadId));
    return guardado ? JSON.parse(guardado) : null;
  } catch {
    return null;
  }
}

export function limpiarProgreso(grupoId, actividadId) {
  try {
    localStorage.removeItem(claveProgreso(grupoId, actividadId));
  } catch {
    // sin problema si no existía
  }
}