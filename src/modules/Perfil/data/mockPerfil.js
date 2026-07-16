// Simula lo que vendrá de tu API/base de datos, ligado al módulo de
// Actividades (puntos acumulados, ranking grupal, completadas/pendientes).

export function obtenerPerfil(grupoId) {
  // const datos = await perfilApi.obtenerPerfil(grupoId);
  return {
    alumno: {
      nombre: "María Alejandra López",
      iniciales: "MA",
      matricula: "2024-ENG-0841",
      email: "maria.lopez@funlish.edu.mx",
      estado: "activa",
    },
    stats: {
      puntosAcumulados: 2340,
      puntosGanadosEstaSemana: 80,
      posicionRanking: 4,
      totalAlumnos: 28,
      actividadesCompletadas: 18,
      actividadesTotales: 24,
      actividadesPendientes: 6,
      pendienteVenceHoy: true,
    },
    rendimientoPorTema: [
      { tema: "Present Simple", porcentaje: 92 },
      { tema: "Past Simple", porcentaje: 80 },
      { tema: "Vocabulary", porcentaje: 74 },
      { tema: "Listening", porcentaje: 68 },
      { tema: "Future Tense", porcentaje: 55 },
    ],
    actividadesMenorRendimiento: [
      { titulo: "Daily Routines Scramble", porcentaje: 45, tipo: "scramble" },
      { titulo: "Present Perfect Quiz", porcentaje: 48, tipo: "trivia" },
      { titulo: "Irregular Verbs", porcentaje: 58, tipo: "scramble" },
      { titulo: "Pronunciation Trivia", porcentaje: 68, tipo: "trivia" },
    ],
    // Ranking grupal (top de la lista); el backend debería devolverlo
    // ordenado desc por xp. Ajustado para que María quede exactamente en
    // el puesto #4, consistente con su stat card (de 28 alumnos en total).
    ranking: [
      { id: 1, nombre: "Arturo Pérez", xp: 3799 },
      { id: 2, nombre: "Teresa López", xp: 2864 },
      { id: 3, nombre: "Eduardo C.", xp: 2510 },
      { id: 4, nombre: "María Alejandra López", xp: 2340 },
      { id: 5, nombre: "Ninive Ramos", xp: 1005 },
      { id: 6, nombre: "Benjamín Anglada", xp: 999 },
      { id: 7, nombre: "Manolo Ramírez", xp: 895 },
      { id: 8, nombre: "Casandra Pérez", xp: 524 },
    ]
      .sort((a, b) => b.xp - a.xp)
      .map((a, i) => ({
        ...a,
        puesto: i + 1,
        esUsuarioActual: a.nombre === "María Alejandra López",
      })),
  };
}