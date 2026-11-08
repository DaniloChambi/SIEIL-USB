// Cliente Frontend del MVP - SIEIL-USB (Universidad Salesiana de Bolivia)
// Cumple estándares de accesibilidad, formularios adaptativos y generación PDF

const state = {
  catalogo: null,
  currentView: "wizard",
  currentStep: 1,
  currentDocTab: "cv-formal",
  apiKey: localStorage.getItem("sieil_usb_apikey") || "",
  lastResult: null,
  livePollTimer: null
};

// Fallback de auto-crecimiento para navegadores sin soporte nativo de field-sizing: content
function initGrowableTextareaFallback() {
  if (!window.CSS || !CSS.supports("field-sizing", "content")) {
    document.querySelectorAll(".growable-textarea > textarea").forEach((textarea) => {
      const sync = () => {
        if (textarea.parentNode) {
          textarea.parentNode.dataset.replicatedValue = textarea.value;
        }
      };
      textarea.addEventListener("input", sync);
      sync();
    });
  }
}

// Matriz de temporización de validación (validar en blur, limpiar en input)
function initAccessibleValidation(form) {
  const inputs = form.querySelectorAll("input[required], select[required], textarea[required]");
  inputs.forEach((input) => {
    input.addEventListener("input", () => {
      input.setCustomValidity("");
      input.classList.remove("is-invalid");
    });
    input.addEventListener("blur", () => {
      if (!input.checkValidity()) {
        input.classList.add("is-invalid");
      } else {
        input.classList.remove("is-invalid");
      }
    });
  });
}

function switchMainView(viewName) {
  state.currentView = viewName;
  document.querySelectorAll(".tab-btn").forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.view === viewName);
  });

  const views = ["wizard", "documentos", "bolsa", "aulamagna"];
  views.forEach((v) => {
    const el = document.getElementById(`view-${v}`);
    if (el) el.hidden = v !== viewName;
  });

  if (viewName === "aulamagna") {
    cargarEstadisticasAulaMagna();
    if (!state.livePollTimer) {
      state.livePollTimer = setInterval(cargarEstadisticasAulaMagna, 6000);
    }
  } else if (state.livePollTimer) {
    clearInterval(state.livePollTimer);
    state.livePollTimer = null;
  }
}

function goToStep(stepNum) {
  state.currentStep = stepNum;
  document.querySelectorAll(".wizard-step").forEach((panel) => {
    const pNum = Number(panel.dataset.stepPanel);
    if (pNum === stepNum) {
      panel.hidden = false;
      panel.classList.add("active");
    } else {
      panel.hidden = true;
      panel.classList.remove("active");
    }
  });

  document.querySelectorAll("#wizard-stepper .step-item").forEach((li) => {
    const s = Number(li.dataset.step);
    li.classList.toggle("step-active", s === stepNum);
    li.classList.toggle("step-done", s < stepNum);
    if (s === stepNum) {
      li.setAttribute("aria-current", "step");
    } else {
      li.removeAttribute("aria-current");
    }
  });
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function obtenerCarreraSeleccionada() {
  const select = document.getElementById("carreraId");
  const cid = select?.value || "ingenieria-de-sistemas";
  return (
    state.catalogo?.carreras.find((c) => c.id === cid) ||
    state.catalogo?.carreras[0]
  );
}

function poblarSelectSemestres(carrera, semestrePreferido = null) {
  const selectSem = document.getElementById("semestre");
  const valorPrevio = semestrePreferido || Number(selectSem.value) || Math.min(8, carrera.semestres);
  selectSem.innerHTML = "";

  for (let s = 1; s <= carrera.semestres; s++) {
    const opt = document.createElement("option");
    opt.value = String(s);
    opt.textContent =
      s === carrera.semestres
        ? `${s}° Semestre (Último Semestre / Egresado — ${carrera.nombre})`
        : `${s}° Semestre`;
    if (s === Math.min(valorPrevio, carrera.semestres)) opt.selected = true;
    selectSem.appendChild(opt);
  }
}

function renderizarPaso2CompetenciasYMalla(competenciasMarcadas = null) {
  const carrera = obtenerCarreraSeleccionada();
  if (!carrera) return;
  const semestre = Number(document.getElementById("semestre").value) || 8;

  // Resumen de malla e imagen
  document.getElementById("malla-career-title").textContent = `Pensum Oficial: ${carrera.nombre} (${carrera.semestres} Semestres)`;
  const materiasCursadas = carrera.materias.filter((m) => m.semestre <= semestre);
  document.getElementById("malla-career-stats").textContent = `Al estar en ${semestre}° semestre, registras ${materiasCursadas.length} de ${carrera.materias.length} asignaturas cursadas de tu malla curricular.`;

  const imgPreview = document.getElementById("malla-img-preview");
  imgPreview.src = `/Mallas/${carrera.id}.png`;
  imgPreview.alt = `Malla Curricular de ${carrera.nombre}`;

  const tagsContainer = document.getElementById("malla-materias-tags");
  tagsContainer.innerHTML = carrera.materias
    .map(
      (m) =>
        `<span class="materia-tag ${m.semestre <= semestre ? "cursada" : ""}" title="${m.semestre}° Semestre">${m.sigla} · ${m.nombre}</span>`
    )
    .join("");

  // Chips de Competencias Técnicas ESCO
  const contTecnicas = document.getElementById("chips-competencias-tecnicas");
  const seleccionSet = competenciasMarcadas
    ? new Set(competenciasMarcadas)
    : new Set(carrera.competencias.filter((c) => c.semestreMin <= semestre).map((c) => c.id));

  contTecnicas.innerHTML = carrera.competencias
    .map((comp) => {
      const checked = seleccionSet.has(comp.id) ? "checked" : "";
      return `
        <label class="skill-chip-label" for="comp-${comp.id}">
          <input type="checkbox" id="comp-${comp.id}" name="competenciaTecnica" value="${comp.id}" ${checked}>
          <div>
            <span>${comp.nombre}</span>
            <span class="chip-meta">Vinculada a ${comp.materia} (${comp.semestreMin}° Sem.)</span>
          </div>
        </label>
      `;
    })
    .join("");

  // Plantillas rápidas de proyectos académicos para el Paso 3
  const contPlantillas = document.getElementById("suggested-projects-buttons");
  contPlantillas.innerHTML = "";
  carrera.proyectosSugeridos.forEach((proy, idx) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "btn-template-chip";
    btn.textContent = `+ Cargar Plantilla ${idx + 1}: ${proy.titulo}`;
    btn.addEventListener("click", () => {
      document.getElementById("proy1Titulo").value = proy.titulo;
      document.getElementById("proy1Materia").value = proy.materia;
      const descEl = document.getElementById("proy1Desc");
      descEl.value = proy.descripcion;
      descEl.dispatchEvent(new Event("input"));
    });
    contPlantillas.appendChild(btn);
  });

  // Si los campos de proyecto están vacíos, precargar el primero de la carrera
  const tituloInput = document.getElementById("proy1Titulo");
  if (!tituloInput.value.trim() && carrera.proyectosSugeridos[0]) {
    tituloInput.value = carrera.proyectosSugeridos[0].titulo;
    document.getElementById("proy1Materia").value = carrera.proyectosSugeridos[0].materia;
    const descEl = document.getElementById("proy1Desc");
    descEl.value = carrera.proyectosSugeridos[0].descripcion;
    descEl.dispatchEvent(new Event("input"));
  }

  // Preseleccionar la oportunidad de la carrera en Paso 4
  const selectOpp = document.getElementById("oportunidadId");
  const oppDeCarrera = state.catalogo.oportunidadesDemo.find((o) => o.carreraId === carrera.id);
  if (oppDeCarrera && selectOpp) {
    selectOpp.value = oppDeCarrera.id;
  }
}

function inicializarCatalogoUI() {
  const { carreras, competenciasTransversales, pastoralActividades, oportunidadesDemo } = state.catalogo;

  // 1. Selector de carreras
  const selectCarrera = document.getElementById("carreraId");
  selectCarrera.innerHTML = carreras
    .map((c) => `<option value="${c.id}">${c.nombre} (${c.semestres} Semestres)</option>`)
    .join("");

  poblarSelectSemestres(carreras[0], 8);

  // 2. Competencias transversales
  const contTrans = document.getElementById("chips-competencias-transversales");
  contTrans.innerHTML = competenciasTransversales
    .map((ct, idx) => {
      const checked = idx < 3 ? "checked" : "";
      return `
        <label class="skill-chip-label" for="ct-${idx}">
          <input type="checkbox" id="ct-${idx}" name="competenciaTransversal" value="${ct}" ${checked}>
          <span>${ct}</span>
        </label>
      `;
    })
    .join("");

  // 3. Pastoral Universitaria (Ley 342)
  const contPastoral = document.getElementById("pastoral-options-grid");
  contPastoral.innerHTML = pastoralActividades
    .map((p, idx) => {
      const checked = idx === 0 ? "checked" : "";
      return `
        <label class="pastoral-card" for="past-${p.id}">
          <input type="checkbox" id="past-${p.id}" name="pastoralItem" value="${p.id}" ${checked}>
          <div>
            <strong>${p.titulo} (${p.horasDefault} hrs.)</strong>
            <span>${p.resumenLey342}</span>
          </div>
        </label>
      `;
    })
    .join("");

  // 4. Selector de Oportunidades en Convenio
  const selectOpp = document.getElementById("oportunidadId");
  selectOpp.innerHTML =
    `<option value="">— Seleccionar oportunidad en convenio vigente —</option>` +
    oportunidadesDemo
      .map((o) => `<option value="${o.id}">[${o.canal}] ${o.titulo} — ${o.entidad}</option>`)
      .join("");

  renderizarPaso2CompetenciasYMalla();
}

function recolectarPerfilDelFormulario() {
  const carrera = obtenerCarreraSeleccionada();
  const competenciasTecnicas = Array.from(
    document.querySelectorAll('input[name="competenciaTecnica"]:checked')
  ).map((el) => el.value);

  const competenciasTransversales = Array.from(
    document.querySelectorAll('input[name="competenciaTransversal"]:checked')
  ).map((el) => el.value);

  const pastoralSeleccionada = Array.from(
    document.querySelectorAll('input[name="pastoralItem"]:checked')
  ).map((el) => {
    const pObj = state.catalogo.pastoralActividades.find((p) => p.id === el.value);
    return {
      id: el.value,
      titulo: pObj?.titulo || "Voluntariado Pastoral Salesiano",
      horas: pObj?.horasDefault || 90,
      resumenLey342: pObj?.resumenLey342 || ""
    };
  });

  const proyectos = [];
  const proy1Titulo = document.getElementById("proy1Titulo").value.trim();
  const proy1Materia = document.getElementById("proy1Materia").value.trim();
  const proy1Desc = document.getElementById("proy1Desc").value.trim();
  if (proy1Titulo || proy1Desc) {
    proyectos.push({
      titulo: proy1Titulo || carrera.proyectosSugeridos[0].titulo,
      materia: proy1Materia || carrera.proyectosSugeridos[0].materia,
      descripcion: proy1Desc || carrera.proyectosSugeridos[0].descripcion
    });
  }

  const experiencias = [];
  const expCargo = document.getElementById("expCargo").value.trim();
  const expInst = document.getElementById("expInstitucion").value.trim();
  const expLogros = document.getElementById("expLogros").value.trim();
  if (expCargo || expInst) {
    experiencias.push({
      cargo: expCargo,
      institucion: expInst,
      periodo: "Experiencia Previa",
      modalidad: "Pasantía / Práctica Preprofesional",
      logros: expLogros
    });
  }

  const idiomaTexto = document.getElementById("idiomaPrincipal").value.trim() || "Inglés Técnico (Nivel Intermedio)";
  const objetivoEl = document.querySelector('input[name="objetivoPostulacion"]:checked');

  return {
    nombreCompleto: document.getElementById("nombreCompleto").value.trim(),
    email: document.getElementById("email").value.trim(),
    telefono: document.getElementById("telefono").value.trim(),
    matricula: document.getElementById("matricula").value.trim(),
    carreraId: carrera.id,
    semestre: Number(document.getElementById("semestre").value) || 8,
    mencion: document.getElementById("mencion").value.trim(),
    competenciasTecnicas,
    competenciasTransversales,
    idiomas: [{ idioma: idiomaTexto, nivel: "" }],
    proyectos,
    pastoral: pastoralSeleccionada,
    experiencias,
    objetivoPostulacion: objetivoEl ? objetivoEl.value : "Primera Pasantía Preprofesional",
    oportunidadId: document.getElementById("oportunidadId").value,
    entidadDestino: document.getElementById("entidadDestino").value.trim()
  };
}

function renderizarCarpetaGenerada(data) {
  state.lastResult = data;
  const { uuid, verifyUrl, qrSvg, perfil, carpetaIA, matchingOfertas } = data;
  const carrera = state.catalogo.carreras.find((c) => c.id === perfil.carreraId) || state.catalogo.carreras[0];

  // Actualizar sello de verificación superior
  const pill = document.getElementById("student-uuid-pill");
  const linkUuid = document.getElementById("link-verify-uuid");
  pill.hidden = false;
  linkUuid.href = `/verificar/${uuid}`;
  linkUuid.textContent = `${uuid} (Verificar QR)`;

  document.getElementById("doc-provider-meta").innerHTML =
    `Generado por: <strong>${carpetaIA.proveedorUsado || "Motor IA SIEIL-USB"}</strong> · Código Único de Verificación: <a href="/verificar/${uuid}" target="_blank" rel="noopener"><code>${uuid}</code></a>`;

  // 1. Renderizar CV
  document.getElementById("cv-nombre").textContent = perfil.nombreCompleto;
  const estadoSem =
    Number(perfil.semestre) >= carrera.semestres
      ? `Egresado / ${carrera.semestres}° Semestre`
      : `${perfil.semestre}° Semestre`;
  document.getElementById("cv-titulo-carrera").textContent =
    `${carrera.nombre} (${estadoSem})${perfil.mencion ? ` · ${perfil.mencion}` : ""}`;

  const partesContacto = [
    "La Paz, Bolivia",
    perfil.email,
    perfil.telefono || null,
    perfil.matricula ? `Matrícula: ${perfil.matricula}` : null
  ].filter(Boolean);
  document.getElementById("cv-contacto").textContent = partesContacto.join("  |  ");

  document.getElementById("cv-qr-svg").innerHTML = qrSvg;
  document.getElementById("cv-uuid-code").textContent = uuid;
  document.getElementById("cv-resumen").textContent = carpetaIA.resumenProfesional;

  document.getElementById("cv-edu-carrera").textContent = `Licenciatura en ${carrera.nombre}`;
  document.getElementById("cv-edu-semestre").textContent = `Universidad Salesiana de Bolivia — ${estadoSem}`;
  document.getElementById("cv-edu-mencion").textContent =
    perfil.mencion ? `Área de Especialización: ${perfil.mencion}` : carrera.perfilBase;

  const materiasClave = carrera.materias
    .filter((m) => m.semestre <= Number(perfil.semestre) && m.semestre >= Math.max(1, Number(perfil.semestre) - 3))
    .slice(0, 6)
    .map((m) => `${m.nombre} (${m.sigla})`)
    .join(", ");
  document.getElementById("cv-edu-materias").textContent =
    `Asignaturas relevantes aprobadas según pensum USB: ${materiasClave}.`;

  // Proyectos mejorados por IA
  const contProy = document.getElementById("cv-proyectos-list");
  contProy.innerHTML = (carpetaIA.proyectosMejorados || [])
    .map(
      (p) => `
      <div class="cv-item">
        <div class="cv-item-header">
          <strong>${p.titulo}</strong>
          <span>${p.contexto}</span>
        </div>
        <ul class="cv-bullets">
          ${(p.logros || []).map((l) => `<li>${l}</li>`).join("")}
        </ul>
      </div>
    `
    )
    .join("");

  // Pastoral Ley 342
  const secPastoral = document.getElementById("cv-pastoral-section");
  const contPastoral = document.getElementById("cv-pastoral-list");
  if ((perfil.pastoral || []).length > 0) {
    secPastoral.hidden = false;
    contPastoral.innerHTML = perfil.pastoral
      .map(
        (pa) => `
        <div class="cv-item">
          <div class="cv-item-header">
            <strong>${pa.titulo}</strong>
            <span>Pastoral Universitaria USB (${pa.horas || 90} horas certificables)</span>
          </div>
          <p class="cv-body-text cv-small-note">${
            pa.resumenLey342 ||
            "Experiencia de liderazgo juvenil y acción social computable al amparo del Art. 28 de la Ley N° 342 de la Juventud y DS N° 2114."
          }</p>
        </div>
      `
      )
      .join("");
  } else {
    secPastoral.hidden = true;
  }

  // Competencias en CV
  const nombresCompTec = (perfil.competenciasTecnicas || []).map((cid) => {
    const found = carrera.competencias.find((x) => x.id === cid);
    return found ? found.nombre : cid;
  });
  document.getElementById("cv-skills-tecnicas").textContent =
    nombresCompTec.join(" · ") || carrera.competencias.map((c) => c.nombre).join(" · ");
  document.getElementById("cv-skills-transversales").textContent =
    (perfil.competenciasTransversales || []).join(" · ");
  document.getElementById("cv-skills-idiomas").textContent =
    (perfil.idiomas || []).map((i) => `${i.idioma} ${i.nivel || ""}`.trim()).join(" · ");
  document.getElementById("cv-verify-url-text").textContent = `Validación en línea: ${verifyUrl}`;

  // 2. Renderizar Carta de Presentación
  const carta = carpetaIA.cartaPresentacion || {};
  document.getElementById("carta-uuid-ref").textContent = `Código de Verificación USB: ${uuid}`;
  document.getElementById("carta-destinatario").textContent = carta.destinatario || "";
  document.getElementById("carta-asunto").textContent = `REF.: ${carta.asunto || "Postulación Institucional"}`;
  document.getElementById("carta-cuerpo").innerHTML = (carta.cuerpoParrafos || [])
    .map((par) => `<p>${par.replace(/\n/g, "<br>")}</p>`)
    .join("");
  document.getElementById("carta-despedida").textContent = carta.despedida || "";

  // 3. Renderizar Guía de Entrevista (Método STAR)
  const contEntrevista = document.getElementById("entrevista-questions-list");
  contEntrevista.innerHTML = (carpetaIA.guiaEntrevista || [])
    .map(
      (q) => `
      <div class="interview-card">
        <span class="interview-card-type">${q.tipo}</span>
        <h3>«${q.pregunta}»</h3>
        <p><strong>Cómo responder con éxito (Método STAR):</strong> ${q.claveRespuestaSTAR}</p>
      </div>
    `
    )
    .join("");

  // 4. Renderizar Bolsa Segmentada y Análisis de Brechas MOOC
  renderizarBolsaOportunidades(matchingOfertas);
}

function renderizarBolsaOportunidades(ofertas) {
  const cont = document.getElementById("bolsa-cards-container");
  if (!cont || !ofertas) return;

  cont.innerHTML = ofertas
    .map((opp) => {
      const badgeClass = opp.ic >= 75 ? "matching-high" : "matching-mid";
      const tieneBrecha = (opp.competenciasFaltantes || []).length > 0;

      return `
        <article class="bolsa-card">
          <div>
            <div class="bolsa-card-top">
              <span class="bolsa-canal-pill">${opp.canal}</span>
              <span class="matching-badge ${badgeClass}">${opp.ic}% Compatibilidad (IC)</span>
            </div>
            <h3 style="margin:0.55rem 0 0.2rem; color:var(--brand-dark); font-size:1.05rem;">${opp.titulo}</h3>
            <p style="margin:0 0 0.5rem; font-size:0.86rem; font-weight:700; color:var(--text-muted);">${opp.entidad} · ${opp.modalidad}</p>
            <p style="margin:0 0 0.75rem; font-size:0.88rem;">${opp.descripcion}</p>
            <p style="margin:0 0 0.65rem; font-size:0.78rem; color:var(--text-muted);">
              Desglose Multicriterio: <strong>CT: ${opp.desglose.CT}%</strong> · <strong>RA: ${opp.desglose.RA}%</strong> · <strong>CTR: ${opp.desglose.CTR}%</strong> · <strong>PE: ${opp.desglose.PE}%</strong>
            </p>
            ${
              tieneBrecha
                ? `<div class="mooc-gap-box">
                     <strong>⚡ Detección de Brecha (Fase 5 — Conexión MOOC USB):</strong>
                     <span>Para alcanzar el 100% del perfil se recomienda reforzar: <em>${opp.competenciasFaltantes.join(", ")}</em>.</span>
                     <div style="margin-top:0.35rem;">
                       Curso sugerido en <code>mooc.usalesiana.online</code>: <strong>${opp.brechaMooc.cursoMooc}</strong>
                     </div>
                   </div>`
                : `<div class="mooc-gap-box" style="background:#f0fdf4; border-color:#bbf7d0;">
                     <strong style="color:#166534;">✅ Perfil 100% Compatible con Sello de Validación USB</strong>
                     <span>Cumples todas las competencias clave requeridas por esta convocatoria.</span>
                   </div>`
            }
          </div>
          <button type="button" class="btn-outline-sm btn-adaptar-oferta" data-opp-id="${opp.id}" data-entidad="${opp.entidad}">
            🎯 Adaptar mi CV y Carta a esta Oportunidad
          </button>
        </article>
      `;
    })
    .join("");

  cont.querySelectorAll(".btn-adaptar-oferta").forEach((btn) => {
    btn.addEventListener("click", async () => {
      document.getElementById("oportunidadId").value = btn.dataset.oppId;
      document.getElementById("entidadDestino").value = btn.dataset.entidad;
      await ejecutarGeneracionCarpeta();
      switchMainView("documentos");
      activarSubTabDocumento("carta");
    });
  });
}

function activarSubTabDocumento(docType) {
  state.currentDocTab = docType;
  document.querySelectorAll(".doc-subtab").forEach((b) => {
    b.classList.toggle("active", b.dataset.doc === docType);
  });

  const panelCV = document.getElementById("doc-panel-cv");
  const panelCarta = document.getElementById("doc-panel-carta");
  const panelEntrevista = document.getElementById("doc-panel-entrevista");

  panelCV.hidden = !(docType === "cv-formal" || docType === "cv-ats");
  panelCV.classList.toggle("ats-mode", docType === "cv-ats");
  panelCarta.hidden = docType !== "carta";
  panelEntrevista.hidden = docType !== "entrevista";
}

async function ejecutarGeneracionCarpeta() {
  const btnSubmit = document.getElementById("btn-submit-generar");
  const prevText = btnSubmit.textContent;
  btnSubmit.disabled = true;
  btnSubmit.textContent = "⏳ Generando CV, Carta y Guía con IA...";

  try {
    const perfil = recolectarPerfilDelFormulario();
    const res = await fetch("/api/perfil/generar", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        perfil,
        apiKey: state.apiKey
      })
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error || "No se pudo generar la carpeta");
    }
    renderizarCarpetaGenerada(data);
    switchMainView("documentos");
    activarSubTabDocumento("cv-formal");
  } catch (err) {
    const alertBox = document.getElementById("form-live-feedback");
    alertBox.hidden = false;
    alertBox.textContent = err.message;
  } finally {
    btnSubmit.disabled = false;
    btnSubmit.textContent = prevText;
  }
}

async function cargarPerfilDemoPorEmail(email) {
  if (!email) return;
  const res = await fetch("/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email })
  });
  if (!res.ok) return;
  const { perfil } = await res.json();

  document.getElementById("nombreCompleto").value = perfil.nombreCompleto || "";
  document.getElementById("email").value = perfil.email || "";
  document.getElementById("telefono").value = perfil.telefono || "";
  document.getElementById("matricula").value = perfil.matricula || "";
  document.getElementById("carreraId").value = perfil.carreraId || "ingenieria-de-sistemas";

  const carrera = obtenerCarreraSeleccionada();
  poblarSelectSemestres(carrera, Number(perfil.semestre) || 8);
  document.getElementById("mencion").value = perfil.mencion || "";

  if (perfil.proyectos?.[0]) {
    document.getElementById("proy1Titulo").value = perfil.proyectos[0].titulo || "";
    document.getElementById("proy1Materia").value = perfil.proyectos[0].materia || "";
    const descEl = document.getElementById("proy1Desc");
    descEl.value = perfil.proyectos[0].descripcion || "";
    descEl.dispatchEvent(new Event("input"));
  }

  renderizarPaso2CompetenciasYMalla(perfil.competenciasTecnicas);
  await ejecutarGeneracionCarpeta();
}

async function cargarEstadisticasAulaMagna() {
  try {
    const res = await fetch("/api/estadisticas-aula-magna");
    if (!res.ok) return;
    const stats = await res.json();

    document.getElementById("kpi-total-estudiantes").textContent = stats.totalEstudiantes;
    document.getElementById("kpi-total-cvs").textContent = stats.totalCVsGenerados;
    document.getElementById("kpi-total-pastoral").textContent = stats.totalConPastoral;
    document.getElementById("live-qr-container").innerHTML = stats.qrAulaMagnaSvg;
    document.getElementById("live-url-code").textContent = stats.urlPlataforma;

    const maxCarrera = Math.max(1, ...stats.carreras.map((c) => c.total));
    document.getElementById("live-carreras-bars").innerHTML = stats.carreras
      .map((c) => {
        const pct = Math.round((c.total / maxCarrera) * 100);
        return `
          <div class="career-bar-row">
            <div class="career-bar-head">
              <span>${c.nombre}</span>
              <span>${c.total} est.</span>
            </div>
            <div class="career-bar-track">
              <div class="career-bar-fill" style="width:${Math.max(8, pct)}%; background:${c.color};"></div>
            </div>
          </div>
        `;
      })
      .join("");

    document.getElementById("live-top-skills").innerHTML = stats.topCompetencias
      .map(
        (sk) => `
        <div class="recent-student-item">
          <span>${sk.nombre}</span>
          <strong>${sk.cantidad}</strong>
        </div>
      `
      )
      .join("");

    document.getElementById("live-recent-list").innerHTML = stats.recientes
      .map(
        (r) => `
        <div class="recent-student-item">
          <div>
            <strong>${r.nombreCompleto}</strong>
            <span style="display:block; font-size:0.75rem; color:${r.color}; font-weight:700;">${r.carrera} (${r.semestre}° Sem.)</span>
          </div>
          <a href="/verificar/${r.uuid}" target="_blank" rel="noopener" class="btn-outline-sm">QR Verificado</a>
        </div>
      `
      )
      .join("");
  } catch (_e) {
    // Ignorar errores transitorios de red
  }
}

async function initApp() {
  initGrowableTextareaFallback();

  const res = await fetch("/api/catalogo");
  state.catalogo = await res.json();
  inicializarCatalogoUI();

  const form = document.getElementById("form-empleabilidad");
  initAccessibleValidation(form);

  // Eventos de cambio de carrera y semestre
  document.getElementById("carreraId").addEventListener("change", () => {
    const carrera = obtenerCarreraSeleccionada();
    poblarSelectSemestres(carrera);
    document.getElementById("proy1Titulo").value = "";
    renderizarPaso2CompetenciasYMalla();
  });

  document.getElementById("semestre").addEventListener("change", () => {
    renderizarPaso2CompetenciasYMalla();
  });

  // Botón para ver/ocultar la imagen de la malla curricular
  const btnMalla = document.getElementById("btn-toggle-malla-img");
  const boxMalla = document.getElementById("malla-preview-container");
  btnMalla.addEventListener("click", () => {
    const expanded = btnMalla.getAttribute("aria-expanded") === "true";
    btnMalla.setAttribute("aria-expanded", String(!expanded));
    boxMalla.hidden = expanded;
    btnMalla.textContent = expanded ? "Ver Malla Curricular Oficial" : "Ocultar Malla Curricular";
  });

  // Navegación entre pasos del Wizard
  document.querySelectorAll(".btn-next-step").forEach((btn) => {
    btn.addEventListener("click", () => {
      const nextStep = Number(btn.dataset.next);
      if (state.currentStep === 1) {
        const nom = document.getElementById("nombreCompleto");
        const em = document.getElementById("email");
        if (!nom.checkValidity() || !em.checkValidity()) {
          nom.classList.toggle("is-invalid", !nom.checkValidity());
          em.classList.toggle("is-invalid", !em.checkValidity());
          (!nom.checkValidity() ? nom : em).focus();
          return;
        }
      }
      goToStep(nextStep);
    });
  });

  document.querySelectorAll(".btn-prev-step").forEach((btn) => {
    btn.addEventListener("click", () => {
      goToStep(Number(btn.dataset.prev));
    });
  });

  document.querySelectorAll("#wizard-stepper .step-item").forEach((li) => {
    li.addEventListener("click", () => {
      goToStep(Number(li.dataset.step));
    });
  });

  // Navegación de pestañas principales
  document.querySelectorAll(".tab-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      switchMainView(btn.dataset.view);
    });
  });

  // Sub-pestañas de documentos (CV Formal, CV ATS, Carta, Entrevista)
  document.querySelectorAll(".doc-subtab").forEach((btn) => {
    btn.addEventListener("click", () => {
      activarSubTabDocumento(btn.dataset.doc);
    });
  });

  // Botón de impresión / exportación a PDF
  document.getElementById("btn-print-pdf").addEventListener("click", () => {
    window.print();
  });

  // Botón de copiar texto del documento activo
  document.getElementById("btn-copy-doc").addEventListener("click", async () => {
    const activeSheet = document.querySelector(".printable-sheet:not([hidden])");
    if (activeSheet) {
      await navigator.clipboard.writeText(activeSheet.innerText);
      const btn = document.getElementById("btn-copy-doc");
      const old = btn.textContent;
      btn.textContent = "✅ ¡Copiado!";
      setTimeout(() => {
        btn.textContent = old;
      }, 1800);
    }
  });

  // Configuración opcional de API Key (Gemini / OpenAI)
  const btnConfig = document.getElementById("btn-config-ia");
  const drawerConfig = document.getElementById("panel-config-ia");
  const inputKey = document.getElementById("input-api-key");
  inputKey.value = state.apiKey;

  btnConfig.addEventListener("click", () => {
    const isExp = btnConfig.getAttribute("aria-expanded") === "true";
    btnConfig.setAttribute("aria-expanded", String(!isExp));
    drawerConfig.hidden = isExp;
  });

  document.getElementById("btn-save-apikey").addEventListener("click", () => {
    state.apiKey = inputKey.value.trim();
    localStorage.setItem("sieil_usb_apikey", state.apiKey);
    document.getElementById("badge-motor-ia").textContent = state.apiKey
      ? state.apiKey.startsWith("AIza")
        ? "Gemini 3.8 Flash"
        : "OpenAI API"
      : "Institucional Activo";
    drawerConfig.hidden = true;
    btnConfig.setAttribute("aria-expanded", "false");
  });

  // Selector de perfiles de ejemplo
  document.getElementById("quick-demo-select").addEventListener("change", (e) => {
    if (e.target.value) {
      cargarPerfilDemoPorEmail(e.target.value);
    }
  });

  // Envío del formulario principal
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    await ejecutarGeneracionCarpeta();
  });

  // Precargar en segundo plano el primer ejemplo en la vista de documentos para que nunca esté vacía
  const resLogin = await fetch("/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: "camila.quispe@usalesiana.edu.bo" })
  });
  if (resLogin.ok) {
    const demoUser = await resLogin.json();
    const resGen = await fetch("/api/perfil/generar", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ perfil: demoUser.perfil })
    });
    if (resGen.ok) {
      renderizarCarpetaGenerada(await resGen.json());
      switchMainView("wizard");
    }
  }
}

initApp();
