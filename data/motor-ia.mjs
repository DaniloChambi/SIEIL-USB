// Motor de Empleabilidad Asistido por IA y Emparejamiento Multicriterio - PEIL-USB
// Soporta:
// 1. Google Gemini API (gemini-2.5-flash — Google AI Studio generateContent con Structured Output JSON)
// 2. OpenAI API (gpt-4o-mini — Structured Outputs json_schema)
// 3. Motor Experto Institucional Determinista (0ms latencia / Respaldo en vivo para el Aula Magna)

import { CARRERAS_USB, OPORTUNIDADES_DEMO } from "./mallas-usb.mjs";

const OUTPUT_SCHEMA = {
  type: "object",
  properties: {
    resumenProfesional: {
      type: "string",
      description: "Párrafo ejecutivo de 4 a 5 líneas para el CV, sobrio, formal y compatible con sistemas ATS."
    },
    proyectosMejorados: {
      type: "array",
      items: {
        type: "object",
        properties: {
          titulo: { type: "string" },
          contexto: { type: "string" },
          logros: {
            type: "array",
            items: { type: "string" }
          }
        },
        required: ["titulo", "contexto", "logros"]
      }
    },
    cartaPresentacion: {
      type: "object",
      properties: {
        destinatario: { type: "string" },
        asunto: { type: "string" },
        cuerpoParrafos: {
          type: "array",
          items: { type: "string" }
        },
        despedida: { type: "string" }
      },
      required: ["destinatario", "asunto", "cuerpoParrafos", "despedida"]
    },
    guiaEntrevista: {
      type: "array",
      items: {
        type: "object",
        properties: {
          tipo: { type: "string" },
          pregunta: { type: "string" },
          claveRespuestaSTAR: { type: "string" }
        },
        required: ["tipo", "pregunta", "claveRespuestaSTAR"]
      }
    }
  },
  required: ["resumenProfesional", "proyectosMejorados", "cartaPresentacion", "guiaEntrevista"]
};

export function calcularMatchingOfertas(perfil) {
  const carrera = CARRERAS_USB.find((c) => c.id === perfil.carreraId) || CARRERAS_USB[0];
  const semestreNum = Number(perfil.semestre) || 8;
  const compEstudiante = new Set(perfil.competenciasTecnicas || []);
  const compTransversales = (perfil.competenciasTransversales || []).length;
  const tieneProyectos = (perfil.proyectos || []).length > 0;
  const tienePastoral = (perfil.pastoral || []).length > 0;
  const tieneExp = (perfil.experiencias || []).length > 0;

  return OPORTUNIDADES_DEMO.map((opp) => {
    const reqs = opp.competenciasRequeridas || [];
    const cumplidas = reqs.filter((r) => compEstudiante.has(r));
    const faltantes = reqs.filter((r) => !compEstudiante.has(r));

    // CT: Competencias Técnicas (45%) - Con bonificación de afinidad de carrera
    let ratioCT = reqs.length > 0 ? cumplidas.length / reqs.length : 0.7;
    if (opp.carreraId !== carrera.id) {
      ratioCT = Math.max(0.15, ratioCT * 0.45);
    }
    const scoreCT = Math.min(1, ratioCT);

    // RA: Requisito Académico (25%)
    const cumpleCarrera = opp.carreraId === carrera.id;
    const ratioSemestre = semestreNum >= opp.semestreMin ? 1.0 : Math.max(0.4, semestreNum / opp.semestreMin);
    const scoreRA = cumpleCarrera ? ratioSemestre : 0.35 * ratioSemestre;

    // CTR: Competencias Transversales + Pastoral (15%)
    const scoreCTR = Math.min(1, (compTransversales * 0.18) + (tienePastoral ? 0.35 : 0));

    // PE: Portafolio / Experiencia (15%) con normalización adaptativa para primera pasantía sin experiencia previa
    let scorePE = 0.4;
    if (tieneExp && tieneProyectos) scorePE = 1.0;
    else if (tieneProyectos && tienePastoral) scorePE = 0.95; // Normalización adaptativa Ley 342 + Proyectos de Aula
    else if (tieneProyectos || tieneExp) scorePE = 0.85;
    else if (tienePastoral) scorePE = 0.75;

    const ic = Math.round((0.45 * scoreCT + 0.25 * scoreRA + 0.15 * scoreCTR + 0.15 * scorePE) * 100);

    const nombresFaltantes = faltantes.map((fid) => {
      const cObj = carrera.competencias.find((c) => c.id === fid);
      return cObj ? cObj.nombre : fid;
    });

    return {
      ...opp,
      ic,
      desglose: {
        CT: Math.round(scoreCT * 100),
        RA: Math.round(scoreRA * 100),
        CTR: Math.round(scoreCTR * 100),
        PE: Math.round(scorePE * 100)
      },
      cumplidasCount: cumplidas.length,
      totalReqs: reqs.length,
      competenciasFaltantes: nombresFaltantes
    };
  }).sort((a, b) => b.ic - a.ic);
}

function construirMotorExpertoDeterminista(perfil, carrera, oportunidadObjetivo) {
  const estadoTexto =
    Number(perfil.semestre) >= carrera.semestres
      ? `Egresado / Último Semestre (${carrera.semestres}° Semestre) de la carrera de ${carrera.nombre}`
      : `Estudiante de ${perfil.semestre}° Semestre de la carrera de ${carrera.nombre}`;

  const nombresComp = (perfil.competenciasTecnicas || [])
    .map((id) => {
      const found = carrera.competencias.find((c) => c.id === id);
      return found ? found.nombre : id;
    })
    .slice(0, 5);

  const compTexto =
    nombresComp.length > 0
      ? nombresComp.join(", ")
      : carrera.competencias.slice(0, 3).map((c) => c.nombre).join(", ");

  const modalidadPostulacion = perfil.objetivoPostulacion || "Pasantía Preprofesional / Trabajo Dirigido";
  const entidadDestino =
    perfil.entidadDestino?.trim() ||
    oportunidadObjetivo?.entidad ||
    "Institución / Empresa en Convenio con la Universidad Salesiana de Bolivia";
  const cargoDestino =
    perfil.cargoDestino?.trim() ||
    oportunidadObjetivo?.titulo ||
    `${modalidadPostulacion} en el área de ${carrera.nombre}`;

  const tienePastoral = (perfil.pastoral || []).length > 0;
  const complementoPastoral = tienePastoral
    ? " Cuenta además con trayectoria certificable de liderazgo juvenil y compromiso social en la Pastoral y Oratorio Universitario Salesiano (reconocida como experiencia previa al amparo de la Ley N° 342 de la Juventud)."
    : " Destaca por su formación humana cristiana salesiana, ética profesional, trabajo colaborativo y orientación a resultados verificables.";

  const resumenProfesional = `${estadoTexto} en la Universidad Salesiana de Bolivia (USB), con sólido dominio en ${compTexto}. Capacidad demostrada en la aplicación práctica de conocimientos académicos mediante proyectos aplicados, resolución estructurada de problemas y uso de herramientas especializadas de su disciplina.${complementoPastoral} En búsqueda activa de integrarse bajo la modalidad de ${modalidadPostulacion} para aportar valor técnico inmediato e innovación institucional.`;

  // Transformar proyectos de aula, experiencias y actividades pastorales en viñetas ejecutivas con verbos de acción
  const proyectosMejorados = [];

  for (const p of perfil.proyectos || []) {
    if (!p.titulo && !p.descripcion) continue;
    proyectosMejorados.push({
      titulo: p.titulo || `Proyecto Académico Aplicado (${carrera.nombre})`,
      contexto: p.materia || `Proyecto de Aula — Universidad Salesiana de Bolivia`,
      logros: [
        `Desarrolló y ejecutó el proyecto "${p.titulo || "Aplicado"}", integrando metodologías actualizadas y estándares técnicos de la carrera de ${carrera.nombre}.`,
        p.descripcion
          ? `Implementó soluciones prácticas orientadas a resultados: ${p.descripcion.replace(/\.$/, "")}.`
          : `Elaboró documentación técnica, análisis de factibilidad y validación de entregables ante tribunal docente.`,
        `Aplicó competencias verificadas en ${nombresComp.slice(0, 2).join(" y ") || carrera.nombre}, cumpliendo el 100% de los objetivos académicos del semestre.`
      ]
    });
  }

  for (const exp of perfil.experiencias || []) {
    if (!exp.cargo && !exp.institucion) continue;
    proyectosMejorados.push({
      titulo: `${exp.cargo || "Práctica / Asistencia Técnica"} — ${exp.institucion || "Entidad"}`,
      contexto: `${exp.periodo || "Experiencia Previa"} (${exp.modalidad || "Práctica Preprofesional"})`,
      logros: [
        exp.logros
          ? `Gestionó actividades operativas y técnicas: ${exp.logros.replace(/\.$/, "")}.`
          : `Brindó soporte especializado en procesos del área de ${carrera.nombre} con cumplimiento riguroso de plazos y calidad.`,
        `Fortaleció la coordinación interdepartamental y la atención oportuna de requerimientos institucionales.`
      ]
    });
  }

  if (proyectosMejorados.length === 0) {
    const sugerido = carrera.proyectosSugeridos[0];
    proyectosMejorados.push({
      titulo: sugerido.titulo,
      contexto: `${sugerido.materia} — Universidad Salesiana de Bolivia`,
      logros: [
        `Ejecutó el desarrollo integral de ${sugerido.titulo.toLowerCase()} aplicando estándares técnicos y normativos vigentes.`,
        `${sugerido.descripcion}`,
        `Presentó y defendió los resultados técnicos demostrando solvencia metodológica y trabajo en equipo.`
      ]
    });
  }

  const cartaPresentacion = {
    destinatario: `Señores\nDirección de Talento Humano / Jefatura de Área\n${entidadDestino}\nPresente.-`,
    asunto: `Postulación a ${cargoDestino} (${modalidadPostulacion})`,
    cuerpoParrafos: [
      `De mi mayor consideración:\n\nPor medio de la presente, tengo el agrado de dirigirme a su prestigiosa institución con el propósito de presentar mi postulación formal para ${cargoDestino}, bajo la modalidad de ${modalidadPostulacion}, en el marco de la vinculación institucional impulsada por la Universidad Salesiana de Bolivia (USB).`,
      `Actualmente soy ${estadoTexto.toLowerCase()}, habiendo consolidado competencias técnicas verificables en ${compTexto}. Durante mi trayectoria formativa he desarrollado proyectos aplicados como "${proyectosMejorados[0]?.titulo}", lo que me ha permitido traducir la teoría universitaria en soluciones prácticas, ordenadas y medibles que responden a las exigencias reales del entorno laboral.`,
      tienePastoral
        ? `Adicionalmente, mi participación activa en la Pastoral y Asociacionismo Salesiano Universitario —reconocida por el Artículo 28 de la Ley N° 342 de la Juventud— ha fortalecido en mí el liderazgo de equipos, la ética profesional, la empatía y la vocación de servicio bajo el principio salesiano de actuar como un profesional íntegro y comprometido.`
        : `Asimismo, la formación humana y ética recibida en la Universidad Salesiana de Bolivia me ha dotado de una alta capacidad de adaptación, comunicación asertiva, responsabilidad y trabajo colaborativo, cualidades que pongo a entera disposición de su equipo de trabajo.`,
      `Agradezco de antemano la atención brindada a mi carpeta de empleabilidad (cuyos datos académicos y de perfil cuentan con código QR de verificación institucional) y quedo a su entera disposición para ampliar cualquier información en una entrevista personal.`
    ],
    despedida: `Con este motivo, saludo a ustedes con las consideraciones más distinguidas.\n\nAtentamente,\n${perfil.nombreCompleto}\n${carrera.nombre} — Universidad Salesiana de Bolivia\nTel.: ${perfil.telefono || "Disponible en CV"} | Correo: ${perfil.email}`
  };

  const guiaEntrevista = [
    {
      tipo: "1. Competencia Técnica de Carrera",
      pregunta: `¿Cómo aplicarías tus conocimientos en ${nombresComp[0] || carrera.nombre} durante tus primeras semanas en ${entidadDestino}?`,
      claveRespuestaSTAR: `Situación/Tarea: Menciona el proyecto "${proyectosMejorados[0]?.titulo}" realizado en la USB. Acción: Explica paso a paso qué metodología o herramienta utilizaste (${nombresComp.slice(0, 2).join(", ")}). Resultado: Destaca cómo esa experiencia práctica te permite integrarte rápidamente sin partir de cero.`
    },
    {
      tipo: "2. Primer Empleo / Sin Experiencia Extensa (Método STAR)",
      pregunta: `Vemos que estás en etapa universitaria o recién titulado. ¿Por qué deberíamos elegirte para ${cargoDestino}?`,
      claveRespuestaSTAR: `Enfócate en tu portafolio académico verificado y en tu curva de aprendizaje: explica que tu formación en la malla de ${carrera.nombre} de la USB es eminentemente práctica y que ya has resuelto casos reales en materias de especialidad, sumado a tu compromiso ético y disponibilidad inmediata.`
    },
    {
      tipo: "3. Habilidades Socioemocionales y Valores Salesianos",
      pregunta: `Cuéntanos una situación en la que tuviste que trabajar bajo presión o resolver un desacuerdo en equipo.`,
      claveRespuestaSTAR: tienePastoral
        ? `Conecta tu experiencia en la Pastoral / Oratorio Universitario Salesiano y en proyectos de semestre: describe cómo organizaron roles, escucharon a cada integrante y cumplieron la meta en la fecha prevista manteniendo un clima de respeto y servicio.`
        : `Describe una entrega crítica de semestre en ${carrera.nombre}: explica cómo dividieron tareas según las fortalezas de cada compañero, hicieron seguimiento diario y lograron presentar el proyecto completo a tiempo.`
    }
  ];

  return {
    proveedorUsado: "Motor Experto Institucional PEIL-USB (Plantilla Curricular Determinista)",
    resumenProfesional,
    proyectosMejorados,
    cartaPresentacion,
    guiaEntrevista
  };
}

export async function generarCarpetaEmpleabilidadIA(perfil, apiKeyOverride = "") {
  const carrera = CARRERAS_USB.find((c) => c.id === perfil.carreraId) || CARRERAS_USB[0];
  const oportunidadObjetivo = OPORTUNIDADES_DEMO.find((o) => o.id === perfil.oportunidadId) || null;
  const fallbackResult = construirMotorExpertoDeterminista(perfil, carrera, oportunidadObjetivo);

  const geminiKey = apiKeyOverride?.startsWith("AIza")
    ? apiKeyOverride
    : process.env.GEMINI_API_KEY || "";
  const openaiKey = apiKeyOverride?.startsWith("sk-")
    ? apiKeyOverride
    : process.env.OPENAI_API_KEY || "";

  if (!geminiKey && !openaiKey) {
    return fallbackResult;
  }

  const nombresComp = (perfil.competenciasTecnicas || []).map((id) => {
    const found = carrera.competencias.find((c) => c.id === id);
    return found ? found.nombre : id;
  });

  const promptContexto = `Eres el Motor Oficial de la Plataforma de Empleabilidad e Intermediación Laboral de la Universidad Salesiana de Bolivia (PEIL-USB).
REGLA ESTRICTA ANTI-ALUCINACIÓN: Usa ÚNICAMENTE los datos reales del estudiante provistos en el siguiente JSON. NO inventes títulos, empresas ni fechas que no estén en el contexto. Transforma sus proyectos de aula, prácticas y actividades de Pastoral Universitaria (reconocidas bajo el Art. 28 de la Ley N° 342 de la Juventud en Bolivia) en logros profesionales de alto impacto usando verbos de acción en español formal boliviano.

DATOS VERIFICADOS DEL ESTUDIANTE:
${JSON.stringify(
  {
    nombreCompleto: perfil.nombreCompleto,
    carrera: carrera.nombre,
    semestre: perfil.semestre,
    mencionEspecialidad: perfil.mencion || "General",
    competenciasTecnicasESCO: nombresComp,
    competenciasTransversales: perfil.competenciasTransversales || [],
    idiomas: perfil.idiomas || [],
    proyectosAcademicos: perfil.proyectos || [],
    experienciasPrevias: perfil.experiencias || [],
    pastoralUniversitariaLey342: perfil.pastoral || [],
    objetivoPostulacion: perfil.objetivoPostulacion || "Primera Pasantía Preprofesional",
    entidadDestino: perfil.entidadDestino || oportunidadObjetivo?.entidad || "Entidad en Convenio USB",
    cargoDestino: perfil.cargoDestino || oportunidadObjetivo?.titulo || `Pasantía / Práctica en ${carrera.nombre}`
  },
  null,
  2
)}`;

  // 1. Intentar con Google Gemini API (Google AI Studio estándar con Structured Output)
  if (geminiKey) {
    const geminiModel = process.env.GEMINI_MODEL || "gemini-2.5-flash";
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 9000);
      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${geminiModel}:generateContent`,
        {
          method: "POST",
          headers: {
            "x-goog-api-key": geminiKey,
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            contents: [{ parts: [{ text: promptContexto }] }],
            generationConfig: {
              temperature: 0.2,
              responseMimeType: "application/json",
              responseSchema: OUTPUT_SCHEMA
            }
          }),
          signal: controller.signal
        }
      );
      clearTimeout(timeout);

      if (res.ok) {
        const data = await res.json();
        const rawText = data.candidates?.[0]?.content?.parts?.[0]?.text;
        if (rawText) {
          const parsed = JSON.parse(rawText);
          return {
            proveedorUsado: `Google Gemini API (${geminiModel})`,
            ...parsed
          };
        }
      } else {
        // Fallback a gemini-1.5-flash si el modelo solicitado no estuviese habilitado
        const fallbackModel = "gemini-1.5-flash";
        const res2 = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/${fallbackModel}:generateContent`,
          {
            method: "POST",
            headers: {
              "x-goog-api-key": geminiKey,
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              contents: [{ parts: [{ text: promptContexto }] }],
              generationConfig: {
                temperature: 0.2,
                responseMimeType: "application/json",
                responseSchema: OUTPUT_SCHEMA
              }
            })
          }
        );
        if (res2.ok) {
          const data2 = await res2.json();
          const rawText2 = data2.candidates?.[0]?.content?.parts?.[0]?.text;
          if (rawText2) {
            return {
              proveedorUsado: `Google Gemini API (${fallbackModel})`,
              ...JSON.parse(rawText2)
            };
          }
        }
      }
    } catch (_err) {
      // Fallback silencioso para garantizar 100% de disponibilidad en el Aula Magna
    }
  }

  // 2. Intentar con OpenAI API (gpt-4o-mini) si está configurada
  if (openaiKey) {
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 9000);
      const res = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${openaiKey}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages: [
            {
              role: "system",
              content:
                "Responde únicamente con un objeto JSON válido que cumpla exactamente el esquema solicitado."
            },
            { role: "user", content: promptContexto }
          ],
          response_format: { type: "json_object" }
        }),
        signal: controller.signal
      });
      clearTimeout(timeout);

      if (res.ok) {
        const data = await res.json();
        const content = data.choices?.[0]?.message?.content;
        if (content) {
          const parsed = JSON.parse(content);
          return {
            proveedorUsado: "OpenAI API (gpt-4o-mini)",
            ...fallbackResult,
            ...parsed
          };
        }
      }
    } catch (_err) {
      // Fallback silencioso al motor experto determinista
    }
  }

  return fallbackResult;
}
