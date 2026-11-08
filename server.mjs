// Servidor Principal del MVP - Sistema de Información, Empleabilidad e Intermediación Laboral (SIEIL-USB)
// Universidad Salesiana de Bolivia — Taller Viernes 13 de Noviembre (Aula Magna)

import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { DatabaseSync } from "node:sqlite";
import { fileURLToPath } from "node:url";

import {
  CARRERAS_USB,
  COMPETENCIAS_TRANSVERSALES,
  PASTORAL_ACTIVIDADES,
  OPORTUNIDADES_DEMO
} from "./data/mallas-usb.mjs";
import { calcularMatchingOfertas, generarCarpetaEmpleabilidadIA } from "./data/motor-ia.mjs";
import { generarQRCodeSVG } from "./data/qr-svg.mjs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PORT = Number(process.env.PORT || 3000);

// Inicializar Base de Datos Relacional Local (SQLite nativo + esquema compatible con PostgreSQL)
fs.mkdirSync(path.join(__dirname, "data"), { recursive: true });
const db = new DatabaseSync(path.join(__dirname, "data", "sieil-usb.db"));

db.exec(`
  CREATE TABLE IF NOT EXISTS estudiantes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    uuid TEXT UNIQUE NOT NULL,
    nombre_completo TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    telefono TEXT DEFAULT '',
    ciudad TEXT DEFAULT 'La Paz, Bolivia',
    linkedin TEXT DEFAULT '',
    matricula TEXT DEFAULT '',
    carrera_id TEXT NOT NULL,
    semestre INTEGER NOT NULL DEFAULT 8,
    mencion TEXT DEFAULT '',
    visibilidad TEXT DEFAULT 'activa',
    perfil_json TEXT NOT NULL DEFAULT '{}',
    carpeta_ia_json TEXT NOT NULL DEFAULT '{}',
    cv_generados_count INTEGER NOT NULL DEFAULT 0,
    creado_en TEXT NOT NULL,
    actualizado_en TEXT NOT NULL
  );
`);

function hashPassword(password) {
  return crypto.scryptSync(String(password), "sieil-usb-salt-2026", 32).toString("hex");
}

function crearSemillaInicial() {
  const countRow = db.prepare("SELECT COUNT(*) as total FROM estudiantes").get();
  if (countRow && countRow.total > 0) return;

  const ejemplos = [
    {
      uuid: "usb-2026-sis-8901",
      nombreCompleto: "Camila Alejandra Quispe Mamani",
      email: "camila.quispe@usalesiana.edu.bo",
      telefono: "+591 71548290",
      matricula: "USB-SIS-2022041",
      carreraId: "ingenieria-de-sistemas",
      semestre: 9,
      mencion: "Ingeniería de Software e Inteligencia Artificial",
      competenciasTecnicas: ["sis-alg", "sis-sql", "sis-uml", "sis-web", "sis-docker", "sis-ingsw", "sis-ia"],
      competenciasTransversales: [
        "Trabajo colaborativo y liderazgo de equipos",
        "Ética profesional y compromiso social salesiano",
        "Resolución de problemas complejos y pensamiento crítico"
      ],
      idiomas: [{ idioma: "Inglés Técnico", nivel: "B1 Intermedio" }, { idioma: "Aymara", nivel: "Básico" }],
      proyectos: [
        {
          titulo: "Sistema Web de Gestión Académica y Seguimiento de Proyectos con PostgreSQL",
          materia: "ING-411 Proyecto de Software / SIS-412 Programación en Internet",
          descripcion: "Diseño del esquema relacional, API REST segura, generación de reportes PDF con validación QR y despliegue en contenedores Docker."
        }
      ],
      pastoral: [
        {
          id: "past-oratorio",
          titulo: "Animador / Voluntario del Oratorio Universitario Salesiano",
          horas: 120
        }
      ],
      experiencias: [],
      objetivoPostulacion: "Trabajo Dirigido / Pasantía Preprofesional",
      oportunidadId: "opp-sis-01"
    },
    {
      uuid: "usb-2026-der-4412",
      nombreCompleto: "Rodrigo Mauricio Condori Flores",
      email: "rodrigo.condori@usalesiana.edu.bo",
      telefono: "+591 72091834",
      matricula: "USB-DER-2022118",
      carreraId: "derecho",
      semestre: 9,
      mencion: "Derecho Corporativo, Administrativo y Constitucional",
      competenciasTecnicas: ["der-mem", "der-civ", "der-adm", "der-emp", "der-masc", "der-lit"],
      competenciasTransversales: [
        "Comunicación asertiva oral y redacción ejecutiva",
        "Ética profesional y compromiso social salesiano"
      ],
      idiomas: [{ idioma: "Inglés", nivel: "A2" }, { idioma: "Aymara", nivel: "Intermedio" }],
      proyectos: [
        {
          titulo: "Clínica Jurídica de Conciliación Extrajudicial y Contratos Comerciales",
          materia: "DGL-416 Métodos Alternativos de Solución de Controversias",
          descripcion: "Redacción de contratos civiles/comerciales, actas de conciliación y memoriales administrativos bajo la Ley N° 2341."
        }
      ],
      pastoral: [
        {
          id: "past-asociacionismo",
          titulo: "Liderazgo en Asociacionismo Salesiano Universitario (ASU)",
          horas: 90
        }
      ],
      experiencias: [],
      objetivoPostulacion: "Pasantía Preprofesional / Práctica Profesional",
      oportunidadId: "opp-der-01"
    },
    {
      uuid: "usb-2026-gas-3319",
      nombreCompleto: "Valeria Fernanda Vargas Torrez",
      email: "valeria.vargas@usalesiana.edu.bo",
      telefono: "+591 76512098",
      matricula: "USB-GAS-2023015",
      carreraId: "gastronomia",
      semestre: 7,
      mencion: "Alta Cocina, Costeo Gastronómico y Gestión de Restaurantes",
      competenciasTecnicas: ["gas-bpm", "gas-bol", "gas-cost", "gas-rep", "gas-int", "gas-cat"],
      competenciasTransversales: [
        "Trabajo colaborativo y liderazgo de equipos",
        "Orientación al servicio, empatía y trato humano"
      ],
      idiomas: [{ idioma: "Inglés Gastronómico (CID-734)", nivel: "B1 Intermedio" }],
      proyectos: [
        {
          titulo: "Estandarización de Recetas, Costeo A&B y Protocolo BPM para Banquetes",
          materia: "PGH-333 Contabilidad y Costos de Producción / OPG-155 Sanidad Alimentaria",
          descripcion: "Elaboración de 25 fichas técnicas de producción con control de mermas y dirección de servicio gastronómico para 120 personas."
        }
      ],
      pastoral: [
        {
          id: "past-misiones",
          titulo: "Voluntariado Social y Misiones de Acción Solidaria USB",
          horas: 100
        }
      ],
      experiencias: [],
      objetivoPostulacion: "Primera Pasantía Preprofesional",
      oportunidadId: "opp-gas-01"
    }
  ];

  const stmt = db.prepare(`
    INSERT INTO estudiantes (
      uuid, nombre_completo, email, password_hash, telefono, matricula,
      carrera_id, semestre, mencion, visibilidad, perfil_json, carpeta_ia_json,
      cv_generados_count, creado_en, actualizado_en
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  const now = new Date().toISOString();
  for (const ej of ejemplos) {
    generarCarpetaEmpleabilidadIA(ej).then((carpeta) => {
      try {
        stmt.run(
          ej.uuid,
          ej.nombreCompleto,
          ej.email,
          hashPassword("usb2026"),
          ej.telefono,
          ej.matricula,
          ej.carreraId,
          ej.semestre,
          ej.mencion,
          "activa",
          JSON.stringify(ej),
          JSON.stringify(carpeta),
          1,
          now,
          now
        );
      } catch (_e) {
        // Ignorar si ya existe
      }
    });
  }
}

crearSemillaInicial();

function sendJSON(res, status, payload) {
  const body = JSON.stringify(payload);
  res.writeHead(status, {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store"
  });
  res.end(body);
}

function parseBody(req) {
  return new Promise((resolve, reject) => {
    let data = "";
    req.on("data", (chunk) => {
      data += chunk;
      if (data.length > 2 * 1024 * 1024) {
        reject(new Error("Payload demasiado grande"));
      }
    });
    req.on("end", () => {
      if (!data) return resolve({});
      try {
        resolve(JSON.parse(data));
      } catch (e) {
        reject(e);
      }
    });
    req.on("error", reject);
  });
}

function renderPaginaVerificacionHTML(row, originUrl) {
  if (!row) {
    return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Verificación Institucional — SIEIL-USB</title>
  <link rel="stylesheet" href="/styles.css">
</head>
<body class="verify-page-body">
  <main class="verify-card verify-invalid">
    <h1>Código de Verificación No Encontrado</h1>
    <p>El identificador consultado no corresponde a un documento activo en el Sistema de Información, Empleabilidad e Intermediación Laboral (SIEIL-USB).</p>
    <a href="/" class="btn-primary">Ir a la Plataforma SIEIL-USB</a>
  </main>
</body>
</html>`;
  }

  const perfil = JSON.parse(row.perfil_json || "{}");
  const carpeta = JSON.parse(row.carpeta_ia_json || "{}");
  const carrera = CARRERAS_USB.find((c) => c.id === row.carrera_id) || CARRERAS_USB[0];
  const verifyUrl = `${originUrl}/verificar/${row.uuid}`;
  const qrSvg = generarQRCodeSVG(verifyUrl, 128, "#002855");

  const materiasCursadas = carrera.materias.filter((m) => m.semestre <= Number(row.semestre));
  const compNombres = (perfil.competenciasTecnicas || []).map((cid) => {
    const found = carrera.competencias.find((c) => c.id === cid);
    return found ? found.nombre : cid;
  });

  return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Certificación de Perfil Verificado | ${row.nombre_completo} — USB</title>
  <link rel="stylesheet" href="/styles.css">
</head>
<body class="verify-page-body">
  <main class="verify-card">
    <header class="verify-header">
      <img src="/logo-usb.jpg" alt="Logo Universidad Salesiana de Bolivia" class="verify-logo">
      <div class="verify-badge-ok">
        <span class="verify-dot"></span> PERFIL VERIFICADO POR SIEIL-USB
      </div>
    </header>

    <section class="verify-identity">
      <div style="display:flex; align-items:center; gap:1.15rem; flex:1;">
        ${
          perfil.fotoDataUrl
            ? `<div class="cv-photo-frame"><img src="${perfil.fotoDataUrl}" alt="Fotografía de ${row.nombre_completo}"></div>`
            : ""
        }
        <div>
          <p class="verify-uuid-label">ID Criptográfico: <code>${row.uuid}</code></p>
          <h1>${row.nombre_completo}</h1>
          <p class="verify-career" style="color:${carrera.color}">${carrera.nombre} — ${row.semestre}° Semestre</p>
          <p class="verify-meta">Matrícula / Registro: <strong>${row.matricula || "Estudiante Regular USB"}</strong> · Sede: <strong>${row.ciudad || "La Paz, Bolivia"}</strong></p>
        </div>
      </div>
      <div class="verify-qr-box">
        ${qrSvg}
        <span>Validación Digital</span>
      </div>
    </section>

    <section class="verify-section">
      <h2>Resumen Ejecutivo Validado</h2>
      <p>${carpeta.resumenProfesional || carrera.perfilBase}</p>
    </section>

    <section class="verify-grid">
      <div class="verify-box">
        <h3>Avance Curricular Según Pensum USB</h3>
        <p><strong>${materiasCursadas.length}</strong> asignaturas comprendidas hasta el ${row.semestre}° semestre de la malla oficial de ${carrera.nombre}.</p>
      </div>
      <div class="verify-box">
        <h3>Reconocimiento Ley N° 342 de la Juventud</h3>
        <p>${
          (perfil.pastoral || []).length > 0
            ? `Registra <strong>${perfil.pastoral.reduce((acc, p) => acc + (Number(p.horas) || 90), 0)} horas</strong> en Pastoral / Asociacionismo Salesiano Universitario y proyectos aplicados.`
            : `Perfil habilitado para acreditación de prácticas preprofesionales, Trabajo Dirigido y voluntariado bajo el DS N° 2114.`
        }</p>
      </div>
    </section>

    <section class="verify-section">
      <h2>Competencias Técnicas Asociadas (Taxonomía ESCO / USB)</h2>
      <div class="verify-chips">
        ${compNombres.map((c) => `<span class="verify-chip">${c}</span>`).join("")}
      </div>
    </section>

    <footer class="verify-footer">
      <p>Documento verificado en línea por el Sistema de Información, Empleabilidad e Intermediación Laboral (SIEIL-USB) — Universidad Salesiana de Bolivia.</p>
      <a href="/" class="btn-secondary">Volver al Portal de Empleabilidad SIEIL-USB</a>
    </footer>
  </main>
</body>
</html>`;
}

const MIME_TYPES = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".mjs": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".svg": "image/svg+xml"
};

const server = http.createServer(async (req, res) => {
  try {
    const urlObj = new URL(req.url, `http://${req.headers.host || `localhost:${PORT}`}`);
    const pathname = decodeURIComponent(urlObj.pathname);
    const originUrl = `${req.headers["x-forwarded-proto"] || "http"}://${req.headers.host || `localhost:${PORT}`}`;

    // 1. API: Catálogo completo de Mallas USB, Competencias y Oportunidades
    if (pathname === "/api/catalogo" && req.method === "GET") {
      return sendJSON(res, 200, {
        carreras: CARRERAS_USB,
        competenciasTransversales: COMPETENCIAS_TRANSVERSALES,
        pastoralActividades: PASTORAL_ACTIVIDADES,
        oportunidadesDemo: OPORTUNIDADES_DEMO,
        iaActiva: {
          geminiConfigurado: Boolean(process.env.GEMINI_API_KEY),
          openaiConfigurado: Boolean(process.env.OPENAI_API_KEY),
          modeloRecomendado: "gemini-3.8-flash"
        }
      });
    }

    // 2. API: Estadísticas en tiempo real para proyectar en el Aula Magna
    if (pathname === "/api/estadisticas-aula-magna" && req.method === "GET") {
      const rows = db
        .prepare(
          "SELECT uuid, nombre_completo, carrera_id, semestre, perfil_json, cv_generados_count, actualizado_en FROM estudiantes ORDER BY actualizado_en DESC"
        )
        .all();

      const porCarrera = {};
      for (const c of CARRERAS_USB) {
        porCarrera[c.id] = { id: c.id, nombre: c.nombre, codigo: c.codigo, color: c.color, total: 0 };
      }

      const conteoComp = {};
      let totalCVs = 0;
      let totalConPastoral = 0;

      for (const r of rows) {
        totalCVs += Number(r.cv_generados_count || 1);
        if (porCarrera[r.carrera_id]) porCarrera[r.carrera_id].total += 1;
        const p = JSON.parse(r.perfil_json || "{}");
        if ((p.pastoral || []).length > 0) totalConPastoral += 1;
        const carreraObj = CARRERAS_USB.find((c) => c.id === r.carrera_id);
        for (const cid of p.competenciasTecnicas || []) {
          const nombreComp = carreraObj?.competencias.find((x) => x.id === cid)?.nombre || cid;
          conteoComp[nombreComp] = (conteoComp[nombreComp] || 0) + 1;
        }
      }

      const topCompetencias = Object.entries(conteoComp)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 8)
        .map(([nombre, cantidad]) => ({ nombre, cantidad }));

      const recientes = rows.slice(0, 6).map((r) => {
        const c = CARRERAS_USB.find((x) => x.id === r.carrera_id) || CARRERAS_USB[0];
        return {
          uuid: r.uuid,
          nombreCompleto: r.nombre_completo,
          carrera: c.nombre,
          color: c.color,
          semestre: r.semestre,
          actualizadoEn: r.actualizado_en
        };
      });

      return sendJSON(res, 200, {
        totalEstudiantes: rows.length,
        totalCVsGenerados: totalCVs,
        totalConPastoral,
        carreras: Object.values(porCarrera),
        topCompetencias,
        recientes,
        qrAulaMagnaSvg: generarQRCodeSVG(originUrl, 210, "#002855"),
        urlPlataforma: originUrl
      });
    }

    // 3. API: Registro o actualización rápida de cuenta de Estudiante
    if (pathname === "/api/auth/registro" && req.method === "POST") {
      const body = await parseBody(req);
      const email = String(body.email || "").trim().toLowerCase();
      const nombreCompleto = String(body.nombreCompleto || "").trim();
      const password = String(body.password || "usb2026");
      const carreraId = String(body.carreraId || "ingenieria-de-sistemas");
      const semestre = Number(body.semestre || 8);

      if (!email || !nombreCompleto) {
        return sendJSON(res, 400, { error: "Por favor ingresa tu nombre completo y correo electrónico." });
      }

      const carrera = CARRERAS_USB.find((c) => c.id === carreraId) || CARRERAS_USB[0];
      const compPrecargadas = carrera.competencias
        .filter((c) => c.semestreMin <= semestre)
        .map((c) => c.id);

      const existente = db.prepare("SELECT * FROM estudiantes WHERE email = ?").get(email);
      const now = new Date().toISOString();

      if (existente) {
        const perfilExistente = JSON.parse(existente.perfil_json || "{}");
        const perfilActualizado = {
          ...perfilExistente,
          nombreCompleto,
          email,
          telefono: body.telefono || perfilExistente.telefono || "",
          matricula: body.matricula || perfilExistente.matricula || "",
          carreraId,
          semestre,
          mencion: body.mencion || perfilExistente.mencion || "",
          competenciasTecnicas:
            perfilExistente.carreraId === carreraId && (perfilExistente.competenciasTecnicas || []).length > 0
              ? perfilExistente.competenciasTecnicas
              : compPrecargadas
        };

        db.prepare(
          `UPDATE estudiantes
           SET nombre_completo = ?, telefono = ?, matricula = ?, carrera_id = ?, semestre = ?, mencion = ?, perfil_json = ?, actualizado_en = ?
           WHERE id = ?`
        ).run(
          nombreCompleto,
          perfilActualizado.telefono,
          perfilActualizado.matricula,
          carreraId,
          semestre,
          perfilActualizado.mencion,
          JSON.stringify(perfilActualizado),
          now,
          existente.id
        );

        return sendJSON(res, 200, {
          uuid: existente.uuid,
          perfil: perfilActualizado,
          carpetaIA: JSON.parse(existente.carpeta_ia_json || "{}")
        });
      }

      const uuid = `usb-2026-${carrera.codigo.toLowerCase()}-${crypto.randomBytes(2).toString("hex")}`;
      const nuevoPerfil = {
        uuid,
        nombreCompleto,
        email,
        telefono: String(body.telefono || "").trim(),
        ciudad: "La Paz, Bolivia",
        linkedin: String(body.linkedin || "").trim(),
        matricula: String(body.matricula || "").trim(),
        carreraId,
        semestre,
        mencion: String(body.mencion || "").trim(),
        competenciasTecnicas: compPrecargadas,
        competenciasTransversales: [
          "Trabajo colaborativo y liderazgo de equipos",
          "Ética profesional y compromiso social salesiano",
          "Comunicación asertiva oral y redacción ejecutiva"
        ],
        idiomas: [{ idioma: "Inglés Técnico", nivel: "A2 / B1" }],
        proyectos: [carrera.proyectosSugeridos[0]],
        pastoral: [
          {
            id: "past-oratorio",
            titulo: "Animador / Voluntario del Oratorio Universitario Salesiano",
            horas: 120
          }
        ],
        experiencias: [],
        objetivoPostulacion: "Primera Pasantía Preprofesional / Trabajo Dirigido",
        oportunidadId: OPORTUNIDADES_DEMO.find((o) => o.carreraId === carreraId)?.id || "opp-sis-01"
      };

      const carpetaInicial = await generarCarpetaEmpleabilidadIA(nuevoPerfil);

      db.prepare(
        `INSERT INTO estudiantes (
          uuid, nombre_completo, email, password_hash, telefono, matricula,
          carrera_id, semestre, mencion, visibilidad, perfil_json, carpeta_ia_json,
          cv_generados_count, creado_en, actualizado_en
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
      ).run(
        uuid,
        nombreCompleto,
        email,
        hashPassword(password),
        nuevoPerfil.telefono,
        nuevoPerfil.matricula,
        carreraId,
        semestre,
        nuevoPerfil.mencion,
        "activa",
        JSON.stringify(nuevoPerfil),
        JSON.stringify(carpetaInicial),
        1,
        now,
        now
      );

      return sendJSON(res, 201, {
        uuid,
        perfil: nuevoPerfil,
        carpetaIA: carpetaInicial
      });
    }

    // 4. API: Inicio de sesión por correo
    if (pathname === "/api/auth/login" && req.method === "POST") {
      const body = await parseBody(req);
      const email = String(body.email || "").trim().toLowerCase();
      const row = db.prepare("SELECT * FROM estudiantes WHERE email = ?").get(email);
      if (!row) {
        return sendJSON(res, 404, { error: "No encontramos una cuenta con ese correo. Regístrate en el Paso 1." });
      }
      return sendJSON(res, 200, {
        uuid: row.uuid,
        perfil: JSON.parse(row.perfil_json || "{}"),
        carpetaIA: JSON.parse(row.carpeta_ia_json || "{}")
      });
    }

    // 5. API: Generar CV Formal, CV ATS, Carta de Presentación, Simulador de Entrevista y Matching
    if (pathname === "/api/perfil/generar" && req.method === "POST") {
      const body = await parseBody(req);
      const perfil = body.perfil || {};
      const apiKeyOverride = String(body.apiKey || "").trim();

      if (!perfil.nombreCompleto || !perfil.email) {
        return sendJSON(res, 400, { error: "Completa tu nombre y correo electrónico en el Paso 1." });
      }

      const email = String(perfil.email).trim().toLowerCase();
      let row = db.prepare("SELECT * FROM estudiantes WHERE email = ?").get(email);
      const carrera = CARRERAS_USB.find((c) => c.id === perfil.carreraId) || CARRERAS_USB[0];
      const now = new Date().toISOString();
      const uuid =
        row?.uuid ||
        perfil.uuid ||
        `usb-2026-${carrera.codigo.toLowerCase()}-${crypto.randomBytes(2).toString("hex")}`;

      perfil.uuid = uuid;
      if (row && perfil.fotoDataUrl === undefined) {
        const prevPerfil = JSON.parse(row.perfil_json || "{}");
        if (prevPerfil.fotoDataUrl) perfil.fotoDataUrl = prevPerfil.fotoDataUrl;
      }
      const carpetaIA = await generarCarpetaEmpleabilidadIA(perfil, apiKeyOverride);
      const matchingOfertas = calcularMatchingOfertas(perfil);
      const verifyUrl = `${originUrl}/verificar/${uuid}`;
      const qrSvg = generarQRCodeSVG(verifyUrl, 108, "#002855");

      if (row) {
        db.prepare(
          `UPDATE estudiantes
           SET nombre_completo = ?, telefono = ?, matricula = ?, carrera_id = ?, semestre = ?, mencion = ?,
               perfil_json = ?, carpeta_ia_json = ?, cv_generados_count = cv_generados_count + 1, actualizado_en = ?
           WHERE id = ?`
        ).run(
          perfil.nombreCompleto,
          perfil.telefono || "",
          perfil.matricula || "",
          perfil.carreraId,
          Number(perfil.semestre || 8),
          perfil.mencion || "",
          JSON.stringify(perfil),
          JSON.stringify(carpetaIA),
          now,
          row.id
        );
      } else {
        db.prepare(
          `INSERT INTO estudiantes (
            uuid, nombre_completo, email, password_hash, telefono, matricula,
            carrera_id, semestre, mencion, visibilidad, perfil_json, carpeta_ia_json,
            cv_generados_count, creado_en, actualizado_en
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
        ).run(
          uuid,
          perfil.nombreCompleto,
          email,
          hashPassword("usb2026"),
          perfil.telefono || "",
          perfil.matricula || "",
          perfil.carreraId,
          Number(perfil.semestre || 8),
          perfil.mencion || "",
          "activa",
          JSON.stringify(perfil),
          JSON.stringify(carpetaIA),
          1,
          now,
          now
        );
      }

      return sendJSON(res, 200, {
        uuid,
        verifyUrl,
        qrSvg,
        perfil,
        carpetaIA,
        matchingOfertas
      });
    }

    // 6. Ruta Pública de Verificación QR (/verificar/:uuid)
    if (pathname.startsWith("/verificar/") && req.method === "GET") {
      const uuid = pathname.replace("/verificar/", "").trim();
      const row = db.prepare("SELECT * FROM estudiantes WHERE uuid = ?").get(uuid);
      const html = renderPaginaVerificacionHTML(row, originUrl);
      res.writeHead(row ? 200 : 404, { "Content-Type": "text/html; charset=utf-8" });
      return res.end(html);
    }

    // 7. Servir imágenes de las Mallas Curriculares (/Mallas/*)
    if (pathname.startsWith("/Mallas/")) {
      const safeName = path.basename(pathname);
      const filePath = path.join(__dirname, "Mallas", safeName);
      if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
        const ext = path.extname(filePath).toLowerCase();
        res.writeHead(200, { "Content-Type": MIME_TYPES[ext] || "application/octet-stream" });
        return fs.createReadStream(filePath).pipe(res);
      }
    }

    // 8. Archivos estáticos en /public
    let staticPath = pathname === "/" ? "/index.html" : pathname;
    const resolvedPath = path.join(__dirname, "public", path.normalize(staticPath));
    if (
      resolvedPath.startsWith(path.join(__dirname, "public")) &&
      fs.existsSync(resolvedPath) &&
      fs.statSync(resolvedPath).isFile()
    ) {
      const ext = path.extname(resolvedPath).toLowerCase();
      res.writeHead(200, { "Content-Type": MIME_TYPES[ext] || "application/octet-stream" });
      return fs.createReadStream(resolvedPath).pipe(res);
    }

    // Fallback SPA a index.html
    const indexPath = path.join(__dirname, "public", "index.html");
    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    return fs.createReadStream(indexPath).pipe(res);
  } catch (err) {
    return sendJSON(res, 500, { error: err.message || "Error interno del servidor" });
  }
});

server.listen(PORT, () => {
  console.log(`✅ Plataforma SIEIL-USB (MVP Taller 13 Nov) activa en: http://localhost:${PORT}`);
});
