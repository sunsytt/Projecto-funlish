// Simula lo que vendrá de tu API/base de datos. Solo el docente puede crear
// publicaciones y adjuntar archivos; los alumnos únicamente comentan.

export function obtenerForo(grupoId) {
  // const datos = await foroApi.obtenerForo(grupoId);
  return {
    grupo: {
      nombre: "Inglés 6C",
      periodo: "Sexto cuatrimestre",
      docente: "Viviana Berenize",
      numAlumnos: 24,
    },
    rankingPreview: {
      top: [
        { puesto: 1, nombre: "Arturo Pérez", xp: 3799 },
        { puesto: 2, nombre: "Teresa López", xp: 1864 },
        { puesto: 3, nombre: "Eduardo C.", xp: 511 },
        { puesto: 4, nombre: "Milena Acuña", xp: 189 },
        { puesto: 5, nombre: "Ninive Ramos", xp: 49 },
      ],
      posicionUsuario: 10,
    },
    publicaciones: [
      {
        id: 1,
        titulo: 'Homework: Song Vocabulary - "Help!"',
        autor: "Marisa López",
        fecha: "Hace 49 minutos",
        contenido:
          "Hi everyone! Les comparto la hoja de trabajo en PDF que utilizaremos mañana para la dinámica de la canción de The Beatles. Por favor, descarguen el archivo y repasen el vocabulario de los verbos en pasado que vienen en la primera página. If you have questions, leave a comment here",
        archivo: { id: 1, nombre: "Vocabulary_Help_Beatles.pdf", tipo: "pdf", url: "" },
        comentarios: [
          {
            id: 1,
            autor: "Kevin Andrade",
            fecha: "Hace 10 min",
            texto: "Teacher, ¿tenemos que imprimir la hoja o la podemos contestar en la tablet?",
          },
          {
            id: 2,
            autor: "Marisa López",
            fecha: "Hace 20 min",
            texto: "La pueden llevar digital en su tablet o celular, Kevin. No es necesario imprimirla.",
          },
        ],
      },
      {
        id: 2,
        titulo: "Exam Guide & Date!",
        autor: "Marisa López",
        fecha: "Hace 23 horas",
        contenido:
          "Hello class! Les recuerdo que el próximo viernes tendremos nuestro examen de la Unidad 3. Para ayudarles a repasar los temas de Vocabulary y Reading, les adjunto la guía de estudio oficial. Traten de resolverla este fin de semana. Si se atoran en algún ejercicio, pónganlo en los comentarios para resolverlo juntos el lunes. Good luck!",
        archivo: { id: 2, nombre: "StudyGuide_Unit3.pdf", tipo: "pdf", url: "" },
        comentarios: [
          { id: 1, autor: "Kevin Andrade", fecha: "Hace 20 horas", texto: "¿El examen es oral o escrito?" },
          {
            id: 2,
            autor: "Marisa López",
            fecha: "Hace 19 horas",
            texto: "Escrito, Kevin. Son opción múltiple y algunas preguntas abiertas.",
          },
          {
            id: 3,
            autor: "Ninive Ramos",
            fecha: "Hace 15 horas",
            texto: "¿Entra el vocabulario de la canción también?",
          },
          {
            id: 4,
            autor: "Marisa López",
            fecha: "Hace 14 horas",
            texto: "No, ese es aparte para la tarea de la canción, no entra en el examen.",
          },
        ],
      },
      {
        id: 3,
        titulo: "Grammar Rules - Present vs Past",
        autor: "Marisa López",
        fecha: "Hace 2 días",
        contenido:
          "Les dejo un esquema visual con la comparación de las reglas gramaticales de Present Simple y Past Simple. Es un buen resumen para tener a la mano mientras hacen sus tareas de esta semana.",
        archivo: { id: 3, nombre: "Grammar_Rules.png", tipo: "image", url: "" },
        comentarios: [
          {
            id: 1,
            autor: "Benjamín Anglada",
            fecha: "Hace 1 día",
            texto: "¡Justo lo que necesitaba, gracias Teacher!",
          },
        ],
      },
      {
        id: 4,
        titulo: "Video Explicativo: Present Continuous",
        autor: "Marisa López",
        fecha: "Hace 3 días",
        contenido:
          "Aquí les dejo el video donde explico paso a paso cómo formar oraciones en Present Continuous, con varios ejemplos de la vida diaria. Véanlo antes de la clase del jueves.",
        archivo: { id: 4, nombre: "Explanation_Present.mp4", tipo: "video", url: "" },
        comentarios: [],
      },
      {
        id: 5,
        titulo: "Listening Practice: Conversación en un café",
        autor: "Marisa López",
        fecha: "Hace 4 días",
        contenido:
          "Escuchen este audio de una conversación real en un café y traten de identificar las frases que usamos para pedir algo de comer o beber. Lo revisamos juntos en la próxima sesión.",
        archivo: { id: 5, nombre: "Listening_Conversation.mp3", tipo: "audio", url: "" },
        comentarios: [
          {
            id: 1,
            autor: "Ninive Ramos",
            fecha: "Hace 3 días",
            texto: "¿Hay transcripción disponible o solo el audio?",
          },
          {
            id: 2,
            autor: "Marisa López",
            fecha: "Hace 3 días",
            texto: "Por ahora solo el audio, la idea es que practiquen el oído sin apoyo del texto.",
          },
        ],
      },
    ],
  };
}