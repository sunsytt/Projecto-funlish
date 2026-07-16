// Simula lo que vendrá de tu API/base de datos. Una sola fuente de verdad
// para que los conteos y el tipo de actividad sean consistentes entre
// Actividades.jsx (temas), TemaActividades.jsx (lista) y ActividadPlay.jsx (juego).
// Cuando conectes el backend, cada función de abajo se vuelve un fetch real.

export const MOCK_TEMAS = {
  1: {
    nombre: "Present tenses",
    actividades: [
      {
        id: 101,
        titulo: "Present Tense Trivia",
        fecha: "29 jun 2026",
        tipo: "trivia",
        estado: "completada",
        xpGanado: 100,
        progreso: 100,
        limiteTiempo: { modoTiempo: "duracion", duracionMinutos: 10 },
        preguntas: [
          {
            id: 1,
            enunciado: '"Every morning, Sarah ______ her dog in the park before going to work."',
            opciones: [
              { id: "a", texto: "walks" },
              { id: "b", texto: "is walk" },
              { id: "c", texto: "walk" },
              { id: "d", texto: "walking" },
            ],
            respuestaCorrectaId: "a",
            puntos: 20,
          },
          {
            id: 2,
            enunciado: '"They usually ______ breakfast together on Sundays."',
            opciones: [
              { id: "a", texto: "has" },
              { id: "b", texto: "have" },
              { id: "c", texto: "having" },
              { id: "d", texto: "is having" },
            ],
            respuestaCorrectaId: "b",
            puntos: 20,
          },
          {
            id: 3,
            enunciado: '"My brother ______ soccer every weekend."',
            opciones: [
              { id: "a", texto: "play" },
              { id: "b", texto: "playing" },
              { id: "c", texto: "plays" },
              { id: "d", texto: "is play" },
            ],
            respuestaCorrectaId: "c",
            puntos: 20,
          },
          {
            id: 4,
            enunciado: '"I ______ my teeth twice a day."',
            opciones: [
              { id: "a", texto: "brushes" },
              { id: "b", texto: "brush" },
              { id: "c", texto: "brushing" },
              { id: "d", texto: "am brush" },
            ],
            respuestaCorrectaId: "b",
            puntos: 20,
          },
          {
            id: 5,
            enunciado: '"She ______ to the gym after work."',
            opciones: [
              { id: "a", texto: "go" },
              { id: "b", texto: "going" },
              { id: "c", texto: "goes" },
              { id: "d", texto: "is go" },
            ],
            respuestaCorrectaId: "c",
            puntos: 20,
          },
        ],
      },
      {
        id: 102,
        titulo: "Daily Routines Scramble",
        fecha: "25 jun 2026",
        tipo: "scramble",
        estado: "en_curso",
        xpGanado: 0,
        progreso: 50,
        limiteTiempo: { modoTiempo: "duracion", duracionMinutos: 10 },
        preguntas: [
          {
            id: 1,
            modoScramble: "letras",
            pista: "Take a...",
            respuestaCorrecta: "shower",
            piezas: ["w", "h", "r", "o", "s", "e"],
            puntos: 15,
          },
          {
            id: 2,
            modoScramble: "letras",
            pista: "Brush your...",
            respuestaCorrecta: "teeth",
            piezas: ["t", "e", "e", "t", "h"],
            puntos: 15,
          },
          {
            id: 3,
            modoScramble: "oraciones",
            pista: "Rutina matutina",
            respuestaCorrecta: "I usually wake up early",
            piezas: ["wake", "I", "early", "usually", "up"],
            puntos: 15,
          },
          {
            id: 4,
            modoScramble: "letras",
            pista: "Go to...",
            respuestaCorrecta: "work",
            piezas: ["w", "o", "r", "k"],
            puntos: 15,
          },
          {
            id: 5,
            modoScramble: "oraciones",
            pista: "Antes de dormir",
            respuestaCorrecta: "She brushes her teeth every night",
            piezas: ["her", "brushes", "every", "She", "teeth", "night"],
            puntos: 15,
          },
        ],
      },
      {
        id: 103,
        titulo: '"Help!" by The Beatles',
        fecha: "19 jun 2026",
        tipo: "trivia",
        estado: "sin_entregar",
        xpGanado: 0,
        progreso: 50,
        limiteTiempo: {
          modoTiempo: "fecha",
          fechaInicio: "2026-06-10T00:00:00",
          fechaLimite: "2026-06-19T23:59:59",
        },
        preguntas: [],
      },
      {
        id: 104,
        titulo: "Photo Quiz: Food & Quantifiers",
        fecha: "9 jun 2026",
        tipo: "scramble",
        estado: "asignada",
        xpGanado: 0,
        progreso: 0,
        limiteTiempo: {
          modoTiempo: "fecha",
          fechaInicio: "2026-07-01T00:00:00",
          fechaLimite: "2026-07-25T23:59:59",
        },
        preguntas: [],
      },
    ],
  },

  2: {
    nombre: "Past tenses",
    actividades: [
      {
        id: 201,
        titulo: "Past Simple Trivia",
        fecha: "12 jun 2026",
        tipo: "trivia",
        estado: "en_curso",
        xpGanado: 0,
        progreso: 0,
        limiteTiempo: { modoTiempo: "duracion", duracionMinutos: 10 },
        preguntas: [
          {
            id: 1,
            enunciado: '"Yesterday, I ______ to the store."',
            opciones: [
              { id: "a", texto: "went" },
              { id: "b", texto: "goed" },
              { id: "c", texto: "going" },
              { id: "d", texto: "go" },
            ],
            respuestaCorrectaId: "a",
            puntos: 20,
          },
          {
            id: 2,
            enunciado: '"She ______ her homework before dinner."',
            opciones: [
              { id: "a", texto: "finish" },
              { id: "b", texto: "finished" },
              { id: "c", texto: "finishing" },
              { id: "d", texto: "finishes" },
            ],
            respuestaCorrectaId: "b",
            puntos: 20,
          },
          {
            id: 3,
            enunciado: '"They ______ a movie last night."',
            opciones: [
              { id: "a", texto: "watch" },
              { id: "b", texto: "watched" },
              { id: "c", texto: "watching" },
              { id: "d", texto: "watches" },
            ],
            respuestaCorrectaId: "b",
            puntos: 20,
          },
          {
            id: 4,
            enunciado: '"He ______ to Paris last summer."',
            opciones: [
              { id: "a", texto: "travel" },
              { id: "b", texto: "traveled" },
              { id: "c", texto: "traveling" },
              { id: "d", texto: "travels" },
            ],
            respuestaCorrectaId: "b",
            puntos: 20,
          },
          {
            id: 5,
            enunciado: '"We ______ pizza for lunch."',
            opciones: [
              { id: "a", texto: "eat" },
              { id: "b", texto: "eaten" },
              { id: "c", texto: "ate" },
              { id: "d", texto: "eating" },
            ],
            respuestaCorrectaId: "c",
            puntos: 20,
          },
        ],
      },
      {
        id: 202,
        titulo: "Irregular Verbs Scramble",
        fecha: "10 jun 2026",
        tipo: "scramble",
        estado: "en_curso",
        xpGanado: 0,
        progreso: 0,
        limiteTiempo: { modoTiempo: "duracion", duracionMinutos: 10 },
        preguntas: [
          { id: 1, modoScramble: "letras", pista: "Past of 'go'", respuestaCorrecta: "went", piezas: ["w", "e", "n", "t"], puntos: 20 },
          { id: 2, modoScramble: "letras", pista: "Past of 'eat'", respuestaCorrecta: "ate", piezas: ["a", "t", "e"], puntos: 20 },
          { id: 3, modoScramble: "letras", pista: "Past of 'see'", respuestaCorrecta: "saw", piezas: ["s", "a", "w"], puntos: 20 },
          { id: 4, modoScramble: "letras", pista: "Past of 'buy'", respuestaCorrecta: "bought", piezas: ["b", "o", "u", "g", "h", "t"], puntos: 20 },
          { id: 5, modoScramble: "letras", pista: "Past of 'think'", respuestaCorrecta: "thought", piezas: ["t", "h", "o", "u", "g", "h", "t"], puntos: 20 },
        ],
      },
      {
        id: 203,
        titulo: "Story Retelling Trivia",
        fecha: "5 jun 2026",
        tipo: "trivia",
        estado: "completada",
        xpGanado: 100,
        progreso: 100,
        limiteTiempo: { modoTiempo: "duracion", duracionMinutos: 10 },
        preguntas: [],
      },
      {
        id: 204,
        titulo: "Weekend Story Scramble",
        fecha: "14 jun 2026",
        tipo: "scramble",
        estado: "en_curso",
        xpGanado: 0,
        progreso: 0,
        limiteTiempo: { modoTiempo: "duracion", duracionMinutos: 10 },
        preguntas: [
          {
            id: 1,
            modoScramble: "oraciones",
            pista: "Sábado por la mañana",
            respuestaCorrecta: "She woke up early and made breakfast",
            piezas: ["made", "early", "woke", "breakfast", "and", "up", "She"],
            puntos: 20,
          },
          {
            id: 2,
            modoScramble: "oraciones",
            pista: "Después del desayuno",
            respuestaCorrecta: "They went for a walk in the park",
            piezas: ["walk", "went", "the", "park", "for", "in", "They", "a"],
            puntos: 20,
          },
          {
            id: 3,
            modoScramble: "oraciones",
            pista: "Por la tarde",
            respuestaCorrecta: "He read a book and drank some tea",
            piezas: ["read", "some", "a", "drank", "book", "and", "tea", "He"],
            puntos: 20,
          },
          {
            id: 4,
            modoScramble: "oraciones",
            pista: "Por la noche",
            respuestaCorrecta: "We watched a movie before going to bed",
            piezas: ["a", "before", "watched", "bed", "movie", "to", "going", "We"],
            puntos: 20,
          },
        ],
      },
    ],
  },

  3: {
    nombre: "Future forms",
    actividades: [
      { id: 301, titulo: "Will vs Going to", fecha: "1 jul 2026", tipo: "trivia", estado: "asignada", xpGanado: 0, progreso: 0, limiteTiempo: { modoTiempo: "fecha", fechaInicio: "2026-07-01T00:00:00", fechaLimite: "2026-07-30T23:59:59" }, preguntas: [] },
      { id: 302, titulo: "Predictions Scramble", fecha: "3 jul 2026", tipo: "scramble", estado: "asignada", xpGanado: 0, progreso: 0, limiteTiempo: { modoTiempo: "fecha", fechaInicio: "2026-07-03T00:00:00", fechaLimite: "2026-07-30T23:59:59" }, preguntas: [] },
      { id: 303, titulo: "Plans Trivia", fecha: "5 jul 2026", tipo: "trivia", estado: "asignada", xpGanado: 0, progreso: 0, limiteTiempo: { modoTiempo: "fecha", fechaInicio: "2026-07-05T00:00:00", fechaLimite: "2026-07-30T23:59:59" }, preguntas: [] },
      { id: 304, titulo: "Weather Forecast Scramble", fecha: "7 jul 2026", tipo: "scramble", estado: "asignada", xpGanado: 0, progreso: 0, limiteTiempo: { modoTiempo: "fecha", fechaInicio: "2026-07-07T00:00:00", fechaLimite: "2026-07-30T23:59:59" }, preguntas: [] },
      { id: 305, titulo: "Future Trivia Mix", fecha: "9 jul 2026", tipo: "trivia", estado: "asignada", xpGanado: 0, progreso: 0, limiteTiempo: { modoTiempo: "fecha", fechaInicio: "2026-07-09T00:00:00", fechaLimite: "2026-07-30T23:59:59" }, preguntas: [] },
    ],
  },

  4: {
    nombre: "Modal verbs",
    actividades: [
      { id: 401, titulo: "Modals Trivia", fecha: "20 jun 2026", tipo: "trivia", estado: "completada", xpGanado: 100, progreso: 100, limiteTiempo: { modoTiempo: "duracion", duracionMinutos: 10 }, preguntas: [] },
      { id: 402, titulo: "Advice Scramble", fecha: "22 jun 2026", tipo: "scramble", estado: "en_curso", xpGanado: 0, progreso: 30, limiteTiempo: { modoTiempo: "duracion", duracionMinutos: 10 }, preguntas: [] },
    ],
  },
};

// XP total de una actividad = suma de los puntos de sus preguntas
export function calcularXpTotal(actividad) {
  return actividad.preguntas.reduce((sum, p) => sum + (p.puntos || 0), 0);
}

export function listarTemas() {
  return Object.entries(MOCK_TEMAS).map(([id, tema]) => ({
    id: Number(id),
    nombre: tema.nombre,
    numActividades: tema.actividades.length,
    completadas: tema.actividades.filter((a) => a.estado === "completada").length,
  }));
}

export function obtenerTema(temaId) {
  const tema = MOCK_TEMAS[temaId];
  if (!tema) return null;
  return {
    nombre: tema.nombre,
    actividades: tema.actividades.map((a) => ({
      ...a,
      xpTotal: calcularXpTotal(a),
    })),
  };
}

export function obtenerActividad(temaId, actividadId) {
  const tema = MOCK_TEMAS[temaId];
  if (!tema) return null;
  const actividad = tema.actividades.find((a) => String(a.id) === String(actividadId));
  if (!actividad) return null;
  return {
    ...actividad,
    temaNombre: tema.nombre,
    xpTotal: calcularXpTotal(actividad),
  };
}