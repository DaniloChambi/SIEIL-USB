// Catálogo Oficial de Mallas Curriculares, Taxonomía ESCO y Oportunidades - SIEIL-USB
// Generado a partir de los pensums oficiales de las 7 carreras participantes de la Universidad Salesiana de Bolivia

export const CARRERAS_USB = [
  {
    id: "ingenieria-de-sistemas",
    codigo: "SIS",
    nombre: "Ingeniería de Sistemas",
    facultad: "Ingeniería",
    semestres: 10,
    color: "#582C83",
    perfilBase:
      "Formación sólida en ingeniería de software, arquitectura de bases de datos, redes y comunicaciones, inteligencia artificial, auditoría y gestión de proyectos tecnológicos.",
    materias: [
      { sigla: "ING-111", nombre: "Introducción a la Informática", semestre: 1 },
      { sigla: "MAT-112", nombre: "Álgebra", semestre: 1 },
      { sigla: "MAT-113", nombre: "Cálculo I", semestre: 1 },
      { sigla: "LIN-114", nombre: "Expresión Oral y Escrita", semestre: 1 },
      { sigla: "INV-115", nombre: "Técnicas de Estudio", semestre: 1 },
      { sigla: "FHC-116", nombre: "Revelación y Fe", semestre: 1 },
      { sigla: "ING-121", nombre: "Introducción a la Programación", semestre: 2 },
      { sigla: "SIS-122", nombre: "Introducción a los Sistemas Administrativos", semestre: 2 },
      { sigla: "SIS-123", nombre: "Sistemas de Información Contable", semestre: 2 },
      { sigla: "MAT-124", nombre: "Cálculo II", semestre: 2 },
      { sigla: "RED-125", nombre: "Electrónica I", semestre: 2 },
      { sigla: "FHC-126", nombre: "Moral Cristiana, Iglesia y Sociedad", semestre: 2 },
      { sigla: "ING-211", nombre: "Programación I", semestre: 3 },
      { sigla: "MAT-212", nombre: "Estadística I", semestre: 3 },
      { sigla: "MAT-213", nombre: "Álgebra Lineal", semestre: 3 },
      { sigla: "MAT-214", nombre: "Cálculo III", semestre: 3 },
      { sigla: "RED-215", nombre: "Electrónica II", semestre: 3 },
      { sigla: "FHC-216", nombre: "Biblia y Vida Cristiana", semestre: 3 },
      { sigla: "ING-221", nombre: "Programación II", semestre: 4 },
      { sigla: "SIS-222", nombre: "Base de Datos I", semestre: 4 },
      { sigla: "SIS-223", nombre: "Análisis y Diseño de Sistemas I", semestre: 4 },
      { sigla: "MAT-224", nombre: "Estadística II", semestre: 4 },
      { sigla: "RED-225", nombre: "Sistemas Digitales", semestre: 4 },
      { sigla: "FHC-226", nombre: "Sacramentos y Espiritualidad", semestre: 4 },
      { sigla: "ING-311", nombre: "Programación III", semestre: 5 },
      { sigla: "SIS-312", nombre: "Base de Datos II", semestre: 5 },
      { sigla: "SIS-313", nombre: "Análisis y Diseño de Sistemas II", semestre: 5 },
      { sigla: "MAT-314", nombre: "Análisis Numérico", semestre: 5 },
      { sigla: "RED-315", nombre: "Hardware y Arquitectura de Computadoras", semestre: 5 },
      { sigla: "ING-321", nombre: "Programación Avanzada", semestre: 6 },
      { sigla: "SIS-322", nombre: "Teoría de los Sistemas de Información", semestre: 6 },
      { sigla: "SIS-323", nombre: "Sistemas Operativos", semestre: 6 },
      { sigla: "MAT-324", nombre: "Investigación Operativa I", semestre: 6 },
      { sigla: "RED-325", nombre: "Redes de Computadoras", semestre: 6 },
      { sigla: "ING-411", nombre: "Proyecto de Software", semestre: 7 },
      { sigla: "SIS-412", nombre: "Programación en Internet", semestre: 7 },
      { sigla: "MAT-413", nombre: "Investigación Operativa II", semestre: 7 },
      { sigla: "RED-414", nombre: "Redes y Comunicaciones", semestre: 7 },
      { sigla: "INV-416", nombre: "Metodología de la Investigación I", semestre: 7 },
      { sigla: "ING-421", nombre: "Ingeniería de Software I", semestre: 8 },
      { sigla: "RED-422", nombre: "Ingeniería de Redes", semestre: 8 },
      { sigla: "SIM-423", nombre: "Inteligencia Artificial I", semestre: 8 },
      { sigla: "SIM-424", nombre: "Ingeniería de Sistemas I", semestre: 8 },
      { sigla: "INV-426", nombre: "Metodología de la Investigación II", semestre: 8 },
      { sigla: "ING-511", nombre: "Ingeniería de Software II", semestre: 9 },
      { sigla: "ING-512", nombre: "Lenguajes Formales y Compiladores", semestre: 9 },
      { sigla: "SIM-513", nombre: "Inteligencia Artificial II", semestre: 9 },
      { sigla: "SIM-514", nombre: "Ingeniería de Sistemas II", semestre: 9 },
      { sigla: "INV-516", nombre: "Taller de Grado I", semestre: 9 },
      { sigla: "SIS-521", nombre: "Gestión y Evaluación de Proyectos Asistidos por Computadora", semestre: 10 },
      { sigla: "SIM-522", nombre: "Simulación y Modelación", semestre: 10 },
      { sigla: "SIM-523", nombre: "Sistemas de Control Digital", semestre: 10 },
      { sigla: "INV-525", nombre: "Taller de Grado II", semestre: 10 }
    ],
    competencias: [
      { id: "sis-alg", nombre: "Lógica y Programación Estructurada / POO", semestreMin: 2, materia: "ING-211" },
      { id: "sis-sql", nombre: "Modelado y Administración de Bases de Datos SQL (PostgreSQL/MySQL)", semestreMin: 4, materia: "SIS-222" },
      { id: "sis-uml", nombre: "Análisis y Diseño de Sistemas (UML / Requisitos)", semestreMin: 4, materia: "SIS-223" },
      { id: "sis-bd2", nombre: "Optimización de Consultas, Triggers y Procedimientos Almacenados", semestreMin: 5, materia: "SIS-312" },
      { id: "sis-linux", nombre: "Administración de Sistemas Operativos y Servidores Linux", semestreMin: 6, materia: "SIS-323" },
      { id: "sis-redes", nombre: "Configuración de Redes TCP/IP, Routing y Switching", semestreMin: 6, materia: "RED-325" },
      { id: "sis-web", nombre: "Desarrollo de Aplicaciones Web Full-Stack y APIs REST", semestreMin: 7, materia: "SIS-412" },
      { id: "sis-docker", nombre: "Contenerización con Docker y Despliegue en Nube", semestreMin: 7, materia: "ING-411" },
      { id: "sis-ingsw", nombre: "Ingeniería de Software Ágil (Scrum / Git / CI-CD)", semestreMin: 8, materia: "ING-421" },
      { id: "sis-ia", nombre: "Inteligencia Artificial, Machine Learning e Integración LLM/RAG", semestreMin: 8, materia: "SIM-423" },
      { id: "sis-sec", nombre: "Seguridad de Redes e Infraestructura de Comunicaciones", semestreMin: 8, materia: "RED-422" },
      { id: "sis-qa", nombre: "Aseguramiento de Calidad de Software (QA & Testing)", semestreMin: 9, materia: "ING-511" },
      { id: "sis-pm", nombre: "Formulación, Gestión y Evaluación de Proyectos TI", semestreMin: 10, materia: "SIS-521" }
    ],
    proyectosSugeridos: [
      {
        titulo: "Sistema Web Transaccional con Base de Datos Relacional",
        materia: "ING-411 Proyecto de Software / SIS-412 Programación en Internet",
        descripcion: "Diseño del modelo entidad-relación en PostgreSQL, construcción de API REST y frontend responsivo con control de roles y reportes PDF."
      },
      {
        titulo: "Diseño y Segmentación de Red Corporativa Segura",
        materia: "RED-414 Redes y Comunicaciones / RED-422 Ingeniería de Redes",
        descripcion: "Implementación de topología de red con VLANs, políticas de firewall, direccionamiento IPv4/IPv6 y servicios de servidor en Linux."
      },
      {
        titulo: "Prototipo de Asistente Inteligente / Modelo Predictivo",
        materia: "SIM-423 Inteligencia Artificial I / SIM-513 Inteligencia Artificial II",
        descripcion: "Desarrollo de un módulo de análisis de datos e integración de modelos de lenguaje para automatizar la clasificación y atención de consultas."
      }
    ]
  },
  {
    id: "derecho",
    codigo: "DER",
    nombre: "Derecho",
    facultad: "Ciencias Jurídicas y Políticas",
    semestres: 10,
    color: "#D9820B",
    perfilBase:
      "Formación integral en derecho constitucional, civil, penal, administrativo, laboral, comercial y métodos alternativos de solución de controversias, con sólido compromiso ético.",
    materias: [
      { sigla: "DPU-111", nombre: "Pensamiento Político y Teoría del Estado", semestre: 1 },
      { sigla: "DGL-112", nombre: "Introducción al Derecho", semestre: 1 },
      { sigla: "DGL-113", nombre: "Historia del Derecho y del Derecho Romano", semestre: 1 },
      { sigla: "DGL-114", nombre: "Expresión Oral y Escrita", semestre: 1 },
      { sigla: "FHC-116", nombre: "Revelación y Fe", semestre: 1 },
      { sigla: "DPU-121", nombre: "Pluralismo Jurídico", semestre: 2 },
      { sigla: "DPU-122", nombre: "Derecho Penal I", semestre: 2 },
      { sigla: "DPR-123", nombre: "Derecho Civil I (Personas)", semestre: 2 },
      { sigla: "DPU-211", nombre: "Derecho Natural, DD.HH. y Sistemas de Protección", semestre: 3 },
      { sigla: "DPU-212", nombre: "Derecho Constitucional I", semestre: 3 },
      { sigla: "DPR-214", nombre: "Derecho Civil II (Bienes y Derechos Reales)", semestre: 3 },
      { sigla: "DPU-221", nombre: "Derecho Constitucional II", semestre: 4 },
      { sigla: "DPR-223", nombre: "Derecho Civil III (Obligaciones)", semestre: 4 },
      { sigla: "DPR-224", nombre: "Derecho Comercial I", semestre: 4 },
      { sigla: "Dso-225", nombre: "Derecho Agroambiental", semestre: 4 },
      { sigla: "DPU-312", nombre: "Derecho Administrativo", semestre: 5 },
      { sigla: "DPR-314", nombre: "Derecho Civil IV (Contratos)", semestre: 5 },
      { sigla: "DPR-315", nombre: "Derecho Comercial II", semestre: 5 },
      { sigla: "DSO-316", nombre: "Derechos de la Niña, Niño y Adolescente", semestre: 5 },
      { sigla: "DPU-322", nombre: "Derecho Procesal Administrativo", semestre: 6 },
      { sigla: "DPU-323", nombre: "Derecho Procesal Penal I", semestre: 6 },
      { sigla: "DPU-324", nombre: "Derecho Financiero y Tributario", semestre: 6 },
      { sigla: "DPR-326", nombre: "Derecho Empresarial", semestre: 6 },
      { sigla: "DPU-411", nombre: "Derecho Autonómico", semestre: 7 },
      { sigla: "DPR-413", nombre: "Derecho Procesal Civil I", semestre: 7 },
      { sigla: "DPR-414", nombre: "Derecho Informático y Comercio Electrónico", semestre: 7 },
      { sigla: "DGL-416", nombre: "Métodos Alternativos de Solución de Controversias", semestre: 7 },
      { sigla: "DPU-421", nombre: "Derecho Municipal", semestre: 8 },
      { sigla: "DPU-422", nombre: "Metodología de Audiencias (Penal)", semestre: 8 },
      { sigla: "DSO-425", nombre: "Derecho del Trabajo y Procedimiento", semestre: 8 },
      { sigla: "DSO-426", nombre: "Derecho de Familia y Procedimientos", semestre: 8 },
      { sigla: "DPU-511", nombre: "Derecho Procesal Constitucional", semestre: 9 },
      { sigla: "DPU-512", nombre: "Derecho Aduanero", semestre: 9 },
      { sigla: "DPR-513", nombre: "Metodología de Audiencias (Civil)", semestre: 9 },
      { sigla: "DGL-521", nombre: "Práctica Profesional", semestre: 10 },
      { sigla: "INV-523", nombre: "Taller de Grado II", semestre: 10 }
    ],
    competencias: [
      { id: "der-mem", nombre: "Redacción Jurídica de Memoriales, Informes Legales y Resoluciones", semestreMin: 3, materia: "DPU-212" },
      { id: "der-civ", nombre: "Elaboración y Revisión de Contratos Civiles y Comerciales", semestreMin: 5, materia: "DPR-314" },
      { id: "der-adm", nombre: "Gestión de Trámites y Procedimientos Administrativos (Ley 2341)", semestreMin: 6, materia: "DPU-322" },
      { id: "der-emp", nombre: "Constitución de Sociedades, Gobierno Corporativo y Registro SEPREC", semestreMin: 6, materia: "DPR-326" },
      { id: "der-trib", nombre: "Derecho Financiero, Tributario y Recursos ante la AIT", semestreMin: 6, materia: "DPU-324" },
      { id: "der-masc", nombre: "Conciliación, Mediación y Arbitraje (MASC)", semestreMin: 7, materia: "DGL-416" },
      { id: "der-inf", nombre: "Protección de Datos, Firma Digital y Comercio Electrónico", semestreMin: 7, materia: "DPR-414" },
      { id: "der-lab", nombre: "Derecho Laboral, Seguridad Social y Gestión ante el MTEPS", semestreMin: 8, materia: "DSO-425" },
      { id: "der-fam", nombre: "Procesos de Familia y Niñez (Código de las Familias / Ley 548)", semestreMin: 8, materia: "DSO-426" },
      { id: "der-lit", nombre: "Litigación Oral y Metodología de Audiencias (Penal y Civil)", semestreMin: 9, materia: "DPR-513" },
      { id: "der-const", nombre: "Acciones de Defensa y Derecho Procesal Constitucional", semestreMin: 9, materia: "DPU-511" }
    ],
    proyectosSugeridos: [
      {
        titulo: "Expediente Clínico de Litigación y Simulación de Audiencia Oral",
        materia: "DPU-422 / DPR-513 Metodología de Audiencias",
        descripcion: "Estructuración de teoría del caso, redacción de piezas procesales, ofrecimiento de prueba e intervención oral en audiencia simulada."
      },
      {
        titulo: "Auditoría Legal Preventiva y Estructuración Contractual Societaria",
        materia: "DPR-314 Derecho Civil IV (Contratos) / DPR-326 Derecho Empresarial",
        descripcion: "Elaboración de minutas de constitución, poderes, contratos comerciales y matrices de cumplimiento normativo laboral y tributario."
      },
      {
        titulo: "Orientación Jurídica Comunitaria y Conciliación Extrajudicial",
        materia: "DGL-416 Métodos Alternativos de Solución de Controversias / DGL-521 Práctica Profesional",
        descripcion: "Atención de consultas jurídicas supervisadas, redacción de actas de entendimiento y orientación en derechos fundamentales."
      }
    ]
  },
  {
    id: "contaduria-publica",
    codigo: "CON",
    nombre: "Contaduría Pública",
    facultad: "Ciencias Económicas y Financieras",
    semestres: 10,
    color: "#0A4988",
    perfilBase:
      "Especialización en contabilidad financiera, tributaria, de costos, gubernamental, bancaria y auditoría integral (financiera, operativa, interna, tributaria y de sistemas).",
    materias: [
      { sigla: "CON-111", nombre: "Contabilidad Básica", semestre: 1 },
      { sigla: "ADM-112", nombre: "Administración General", semestre: 1 },
      { sigla: "CON-121", nombre: "Contabilidad Intermedia I", semestre: 2 },
      { sigla: "SIS-122", nombre: "Ofimática", semestre: 2 },
      { sigla: "CON-211", nombre: "Contabilidad Intermedia II", semestre: 3 },
      { sigla: "MAT-214", nombre: "Matemática Financiera", semestre: 3 },
      { sigla: "DER-215", nombre: "Derecho Comercial y Corporativo", semestre: 3 },
      { sigla: "CON-221", nombre: "Contabilidad de Sociedades", semestre: 4 },
      { sigla: "CON-222", nombre: "Contabilidad Tributaria", semestre: 4 },
      { sigla: "DER-225", nombre: "Derecho Tributario y Legislación Aduanera", semestre: 4 },
      { sigla: "CON-311", nombre: "Contabilidad de Costos I", semestre: 5 },
      { sigla: "CON-312", nombre: "Contabilidad de Seguros", semestre: 5 },
      { sigla: "CON-313", nombre: "Contabilidad Bancaria", semestre: 5 },
      { sigla: "DER-316", nombre: "Derecho del Trabajo y Seguridad Social", semestre: 5 },
      { sigla: "CON-321", nombre: "Contabilidad de Costos II", semestre: 6 },
      { sigla: "CON-322", nombre: "Contabilidad Agrícola y Ganadera", semestre: 6 },
      { sigla: "CON-323", nombre: "Contabilidad Internacional", semestre: 6 },
      { sigla: "CON-324", nombre: "Contabilidad Minera y Petrolera", semestre: 6 },
      { sigla: "AUD-411", nombre: "Auditoría I", semestre: 7 },
      { sigla: "AUD-412", nombre: "Auditoría Operativa", semestre: 7 },
      { sigla: "CON-413", nombre: "Contabilidad Gubernamental", semestre: 7 },
      { sigla: "CON-414", nombre: "Contabilidad de Presupuesto y Gubernamental", semestre: 7 },
      { sigla: "CON-415", nombre: "Análisis e Interpretación de Estados Financieros", semestre: 7 },
      { sigla: "AUD-421", nombre: "Auditoría II", semestre: 8 },
      { sigla: "AUD-422", nombre: "Auditoría Interna", semestre: 8 },
      { sigla: "AUD-423", nombre: "Auditoría Gubernamental", semestre: 8 },
      { sigla: "ECO-425", nombre: "Preparación y Evaluación de Proyectos", semestre: 8 },
      { sigla: "AUD-511", nombre: "Gabinete de Auditoría", semestre: 9 },
      { sigla: "AUD-512", nombre: "Aplicación de Sistemas de Contabilidad", semestre: 9 },
      { sigla: "AUD-513", nombre: "Auditoría Tributaria y Gabinete", semestre: 9 },
      { sigla: "ADM-515", nombre: "Administración Financiera I", semestre: 9 },
      { sigla: "AUD-521", nombre: "Auditoría de Proyectos", semestre: 10 },
      { sigla: "AUD-522", nombre: "Auditoría de Sistemas", semestre: 10 },
      { sigla: "ADM-523", nombre: "Administración Financiera II", semestre: 10 }
    ],
    competencias: [
      { id: "con-eeff", nombre: "Elaboración de Estados Financieros bajo Normas de Contabilidad (NC / NIIF)", semestreMin: 3, materia: "CON-211" },
      { id: "con-siat", nombre: "Liquidación de Impuestos (IVA, IT, IUE, RC-IVA) y SIAT en Línea SIN", semestreMin: 4, materia: "CON-222" },
      { id: "con-plan", nombre: "Elaboración de Planillas Salariales, Cargas Sociales, Gestora y ROE", semestreMin: 5, materia: "DER-316" },
      { id: "con-cost", nombre: "Contabilidad de Costos Industriales, Presupuestos y Punto de Equilibrio", semestreMin: 6, materia: "CON-321" },
      { id: "con-banca", nombre: "Contabilidad Bancaria, Extractiva (Minera/Petrolera) y Agropecuaria", semestreMin: 6, materia: "CON-324" },
      { id: "con-gub", nombre: "Contabilidad Integrada Gubernamental (SIGEP), Presupuesto Público y Ley 1178", semestreMin: 7, materia: "CON-413" },
      { id: "con-fin", nombre: "Análisis Financiero por Ratios, Flujo de Efectivo y Diagnóstico Patrimonial", semestreMin: 7, materia: "CON-415" },
      { id: "con-aud", nombre: "Auditoría Financiera, Control Interno (COSO) y Papeles de Trabajo", semestreMin: 8, materia: "AUD-422" },
      { id: "con-erp", nombre: "Manejo de Software Contable, Excel Financiero Avanzado y Auditoría Tributaria", semestreMin: 9, materia: "AUD-512" },
      { id: "con-audsis", nombre: "Auditoría de Sistemas de Información y Proyectos", semestreMin: 10, materia: "AUD-522" }
    ],
    proyectosSugeridos: [
      {
        titulo: "Legajo Completo de Auditoría Financiera y Tributaria (Papeles de Trabajo)",
        materia: "AUD-511 Gabinete de Auditoría / AUD-513 Auditoría Tributaria",
        descripcion: "Planificación de auditoría, evaluación de control interno COSO, pruebas sustantivas y emisión de dictamen de auditoría e informe tributario complementario (ITC)."
      },
      {
        titulo: "Diseño del Ciclo Contable y Tributario Integral para Empresa Comercial/Industrial",
        materia: "CON-222 Contabilidad Tributaria / CON-321 Contabilidad de Costos II",
        descripcion: "Estructuración del plan de cuentas, kardex de inventarios PEPS/CPP, determinación de costos unitarios, bancarización y declaración en SIAT."
      },
      {
        titulo: "Diagnóstico Financiero y Evaluación de Proyecto de Inversión",
        materia: "CON-415 Análisis de Estados Financieros / ECO-425 Evaluación de Proyectos",
        descripcion: "Análisis vertical y horizontal de 3 gestiones, indicadores de liquidez/rentabilidad, proyección de flujos de caja, VAN y TIR."
      }
    ]
  },
  {
    id: "gastronomia",
    codigo: "GAS",
    nombre: "Gastronomía y Gestión de Restaurantes",
    facultad: "Ciencias Sociales y Humanísticas",
    semestres: 8,
    color: "#24657C",
    perfilBase:
      "Profesional en artes culinarias nacionales e internacionales, alta repostería, panadería, inocuidad alimentaria, costos gastronómicos, marketing y dirección integral de restaurantes y eventos.",
    materias: [
      { sigla: "FTG-111", nombre: "Técnicas Culinarias", semestre: 1 },
      { sigla: "FTG-112", nombre: "Fundamentos de la Gastronomía", semestre: 1 },
      { sigla: "PGH-133", nombre: "Gestión de Restaurantes", semestre: 1 },
      { sigla: "OPG-155", nombre: "Sanidad Alimentaria y Seguridad en el Trabajo", semestre: 1 },
      { sigla: "FTG-211", nombre: "Técnicas Elementales en Cocina I", semestre: 2 },
      { sigla: "FTG-212", nombre: "Etiqueta y Protocolo", semestre: 2 },
      { sigla: "OPG-255", nombre: "Nutrición y Dietética", semestre: 2 },
      { sigla: "PRG-266", nombre: "Cocina Boliviana I", semestre: 2 },
      { sigla: "FTG-311", nombre: "Técnicas Elementales en Cocina II", semestre: 3 },
      { sigla: "PGH-333", nombre: "Contabilidad y Costos de Producción", semestre: 3 },
      { sigla: "PRG-366", nombre: "Cocina Boliviana II", semestre: 3 },
      { sigla: "PRG-367", nombre: "Repostería I", semestre: 3 },
      { sigla: "PGH-433", nombre: "Microeconomía y Mercado", semestre: 4 },
      { sigla: "OPG-455", nombre: "Software de Restaurantes", semestre: 4 },
      { sigla: "PRG-466", nombre: "Cocina Internacional I", semestre: 4 },
      { sigla: "PRG-467", nombre: "Repostería II", semestre: 4 },
      { sigla: "FTG-511", nombre: "Técnicas Culinarias para la Alimentación Saludable", semestre: 5 },
      { sigla: "OPG-555", nombre: "Operaciones y Servicios en Alimentos y Bebidas", semestre: 5 },
      { sigla: "PRG-566", nombre: "Cocina Internacional II", semestre: 5 },
      { sigla: "PRG-567", nombre: "Alta Repostería", semestre: 5 },
      { sigla: "FTG-611", nombre: "Estándares, Normas y Legislación Gastronómica", semestre: 6 },
      { sigla: "PGH-633", nombre: "Diseño y Equipamiento de Restaurantes", semestre: 6 },
      { sigla: "INV-644", nombre: "Emprendedurismo", semestre: 6 },
      { sigla: "PRG-666", nombre: "Cocina Internacional III", semestre: 6 },
      { sigla: "FTG-711", nombre: "Gastronomía Industrial y Molecular", semestre: 7 },
      { sigla: "PGH-733", nombre: "Estructuras Administrativas para el Servicio", semestre: 7 },
      { sigla: "PRG-766", nombre: "Panadería", semestre: 7 },
      { sigla: "FTG-811", nombre: "Servicio de Coctelería y Vinos", semestre: 8 },
      { sigla: "PGH-833", nombre: "Marketing Gastronómico y de Restaurantes", semestre: 8 },
      { sigla: "OPG-855", nombre: "Catering y Organización de Eventos", semestre: 8 }
    ],
    competencias: [
      { id: "gas-bpm", nombre: "Inocuidad Alimentaria, Normas BPM / HACCP y Seguridad Ocupacional", semestreMin: 1, materia: "OPG-155" },
      { id: "gas-bol", nombre: "Cocina Patrimonial Boliviana y Revalorización de Insumos Locales", semestreMin: 3, materia: "PRG-366" },
      { id: "gas-cost", nombre: "Estandarización de Recetas, Fichas Técnicas y Costos de Alimentos y Bebidas (A&B)", semestreMin: 3, materia: "PGH-333" },
      { id: "gas-pos", nombre: "Manejo de Software POS de Restaurantes y Control de Inventarios", semestreMin: 4, materia: "OPG-455" },
      { id: "gas-rep", nombre: "Alta Repostería, Pastelería Fina y Panadería Artesanal/Industrial", semestreMin: 5, materia: "PRG-567" },
      { id: "gas-int", nombre: "Cocina Internacional, Vanguardia Culinaria y Gastronomía Molecular", semestreMin: 6, materia: "PRG-666" },
      { id: "gas-lay", nombre: "Diseño de Flujos de Cocina, Equipamiento y Normativa Gastronómica", semestreMin: 6, materia: "PGH-633" },
      { id: "gas-som", nombre: "Enología, Maridaje, Coctelería y Gestión de Salón (Etiqueta y Protocolo)", semestreMin: 8, materia: "FTG-811" },
      { id: "gas-cat", nombre: "Planificación de Catering, Banquetes Corporativos y Marketing Gastronómico", semestreMin: 8, materia: "OPG-855" }
    ],
    proyectosSugeridos: [
      {
        titulo: "Estandarización de Carta, Fichas Técnicas de Costeo y Manual BPM para Restaurante",
        materia: "PGH-333 Costos de Producción / OPG-155 Sanidad Alimentaria",
        descripcion: "Elaboración de recetas estándar con cálculo de merma, factor de rendimiento, precio sugerido de venta (ingeniería de menú) y protocolo de higiene."
      },
      {
        titulo: "Plan de Negocio y Diseño Operativo de Emprendimiento Gastronómico",
        materia: "INV-644 Emprendedurismo / PGH-633 Diseño y Equipamiento de Restaurantes",
        descripcion: "Diseño de layout de cocina caliente/fría bajo marcha adelante, selección de equipamiento industrial, flujo de servicio y estrategia comercial."
      },
      {
        titulo: "Producción y Dirección Integral de Evento de Catering / Muestra Gastronómica",
        materia: "OPG-855 Catering y Organización de Eventos / FTG-811 Coctelería y Vinos",
        descripcion: "Planificación logística de banquete para más de 100 comensales, brigada de cocina y salón, maridaje y control de calidad en servicio."
      }
    ]
  },
  {
    id: "ingenieria-comercial",
    codigo: "ICO",
    nombre: "Ingeniería Comercial",
    facultad: "Ciencias Económicas y Financieras",
    semestres: 8,
    color: "#C83E1D",
    perfilBase:
      "Formación ejecutiva en marketing estratégico, finanzas corporativas, gestión de calidad ISO 9001, logística y cadena de suministro, comercio exterior y dirección competitiva de negocios.",
    materias: [
      { sigla: "ECO-111", nombre: "Economía I", semestre: 1 },
      { sigla: "ADM-122", nombre: "Fundamentos de los Negocios", semestre: 1 },
      { sigla: "FIN-133", nombre: "Contabilidad I", semestre: 1 },
      { sigla: "ECO-211", nombre: "Economía II", semestre: 2 },
      { sigla: "ADM-222", nombre: "Emprendimiento", semestre: 2 },
      { sigla: "FIN-233", nombre: "Contabilidad II", semestre: 2 },
      { sigla: "ADM-321", nombre: "Creación y Organización de Empresas", semestre: 3 },
      { sigla: "FIN-332", nombre: "Finanzas I", semestre: 3 },
      { sigla: "COM-353", nombre: "Ventas y Técnicas de Negociación", semestre: 3 },
      { sigla: "ADM-421", nombre: "Administración de Personal", semestre: 4 },
      { sigla: "ADM-422", nombre: "Comportamiento Organizacional", semestre: 4 },
      { sigla: "FIN-433", nombre: "Finanzas II", semestre: 4 },
      { sigla: "COM-454", nombre: "Marketing", semestre: 4 },
      { sigla: "ADM-521", nombre: "Logística, Compras y Manejo de Inventarios", semestre: 5 },
      { sigla: "ADM-522", nombre: "Sistema de Gestión ISO 9001", semestre: 5 },
      { sigla: "FIN-533", nombre: "Investigación Operativa", semestre: 5 },
      { sigla: "MAT-544", nombre: "Estadística Económica", semestre: 5 },
      { sigla: "COM-555", nombre: "Gestión de Procesos Productivos y Comerciales", semestre: 5 },
      { sigla: "ECO-611", nombre: "Responsabilidad Social y Desarrollo Sustentable", semestre: 6 },
      { sigla: "ADM-622", nombre: "Informática en los Negocios", semestre: 6 },
      { sigla: "ADM-623", nombre: "Gestión del Talento Humano", semestre: 6 },
      { sigla: "COM-654", nombre: "Diseño e Implementación de Modelos de Negocios", semestre: 6 },
      { sigla: "COM-655", nombre: "Preparación, Ejecución y Evaluación de Proyectos", semestre: 6 },
      { sigla: "ADM-721", nombre: "Contexto de la Organización y Derecho Empresarial", semestre: 7 },
      { sigla: "ADM-722", nombre: "Gestión del Riesgo y Toma de Decisiones", semestre: 7 },
      { sigla: "FIN-733", nombre: "Ingeniería de Costos", semestre: 7 },
      { sigla: "COM-754", nombre: "Comercio Exterior", semestre: 7 },
      { sigla: "ADM-821", nombre: "Liderazgo y Oratoria", semestre: 8 },
      { sigla: "ADM-822", nombre: "Dirección Estratégica y Competitividad", semestre: 8 },
      { sigla: "FIN-833", nombre: "Sistema Económico, Financiero y Tributario", semestre: 8 }
    ],
    competencias: [
      { id: "ico-ven", nombre: "Gestión Comercial, Estrategias B2B/B2C y Técnicas de Negociación", semestreMin: 3, materia: "COM-353" },
      { id: "ico-mkt", nombre: "Investigación de Mercados, Marketing Estratégico y Posicionamiento", semestreMin: 4, materia: "COM-454" },
      { id: "ico-fin", nombre: "Análisis Financiero Corporativo, Presupuestos e Ingeniería de Costos", semestreMin: 4, materia: "FIN-433" },
      { id: "ico-log", nombre: "Gestión de Compras, Almacenes, Inventarios y Cadena de Suministro", semestreMin: 5, materia: "ADM-521" },
      { id: "ico-iso", nombre: "Implementación y Auditoría de Sistemas de Gestión de Calidad ISO 9001", semestreMin: 5, materia: "ADM-522" },
      { id: "ico-bi", nombre: "Informática para los Negocios, Cuadros de Mando (KPIs) y Analítica Comercial", semestreMin: 6, materia: "ADM-622" },
      { id: "ico-proy", nombre: "Formulación y Evaluación Financiera de Proyectos (VAN, TIR, Sensibilidad)", semestreMin: 6, materia: "COM-655" },
      { id: "ico-comex", nombre: "Operaciones de Comercio Exterior, Incoterms, Importación y Exportación", semestreMin: 7, materia: "COM-754" },
      { id: "ico-est", nombre: "Dirección Estratégica, Balanced Scorecard y Gestión del Riesgo", semestreMin: 8, materia: "ADM-822" }
    ],
    proyectosSugeridos: [
      {
        titulo: "Plan Estratégico de Marketing y Posicionamiento Comercial",
        materia: "COM-454 Marketing / COM-353 Ventas y Negociación",
        descripcion: "Estudio de mercado cuantitativo, segmentación de clientes, diseño de estrategia omnicanal, embudo de ventas y presupuesto de retorno comercial."
      },
      {
        titulo: "Manual de Procesos y Sistema de Gestión de Calidad bajo Norma ISO 9001",
        materia: "ADM-522 Sistema de Gestión ISO 9001 / COM-555 Procesos Comerciales",
        descripcion: "Mapeo de procesos estratégicos y operativos, matriz de riesgos IPER, indicadores de desempeño (KPIs) y procedimientos documentados."
      },
      {
        titulo: "Estudio de Factibilidad Comercial, Técnica y Financiera de Proyecto",
        materia: "COM-655 Preparación, Ejecución y Evaluación de Proyectos",
        descripcion: "Modelado de inversión inicial, estructura de financiamiento, ingeniería de costos, flujo de caja proyectado a 5 años y análisis de riesgo."
      }
    ]
  },
  {
    id: "ciencias-de-la-educacion",
    codigo: "EDU",
    nombre: "Ciencias de la Educación",
    facultad: "Ciencias de la Educación y Humanidades",
    semestres: 9,
    color: "#2E6B34",
    perfilBase:
      "Especialista en diseño y evaluación curricular, planificación didáctica, gestión e innovación educativa, psicopedagogía, educación inclusiva y proyectos socioeducativos.",
    materias: [
      { sigla: "PED-111", nombre: "Introducción a las Ciencias de la Educación", semestre: 1 },
      { sigla: "SOC-112", nombre: "Sociedad y Estado", semestre: 1 },
      { sigla: "BIO-113", nombre: "Fundamentos Biológicos de la Educación", semestre: 1 },
      { sigla: "PED-121", nombre: "Pedagogía General", semestre: 2 },
      { sigla: "SOC-123", nombre: "Sociología de la Educación", semestre: 2 },
      { sigla: "PED-211", nombre: "Corrientes Pedagógicas Contemporáneas", semestre: 3 },
      { sigla: "ADM-212", nombre: "Administración y Gestión Educativa I", semestre: 3 },
      { sigla: "PSI-213", nombre: "Psicología del Desarrollo Humano I (Infancia y Niñez)", semestre: 3 },
      { sigla: "INV-215", nombre: "Investigación Educativa I", semestre: 3 },
      { sigla: "PED-221", nombre: "Teoría Curricular", semestre: 4 },
      { sigla: "ADM-222", nombre: "Administración y Gestión Educativa II", semestre: 4 },
      { sigla: "PSI-223", nombre: "Psicología del Desarrollo Humano II (Adolescencia y Adultez)", semestre: 4 },
      { sigla: "INV-225", nombre: "Investigación Educativa II (Cuantitativa)", semestre: 4 },
      { sigla: "PED-311", nombre: "Diseño Curricular", semestre: 5 },
      { sigla: "PED-312", nombre: "Educación Comunitaria e Intercultural", semestre: 5 },
      { sigla: "ADM-314", nombre: "Evaluación de la Gestión Educativa", semestre: 5 },
      { sigla: "PSI-315", nombre: "Psicología Educativa del Aprendizaje", semestre: 5 },
      { sigla: "INV-316", nombre: "Investigación Educativa III (Cualitativa)", semestre: 5 },
      { sigla: "PED-321", nombre: "Didáctica General", semestre: 6 },
      { sigla: "PED-322", nombre: "Educación Alternativa y Especial", semestre: 6 },
      { sigla: "ADM-324", nombre: "Política Educativa", semestre: 6 },
      { sigla: "PED-411", nombre: "Planificación Didáctica", semestre: 7 },
      { sigla: "PED-412", nombre: "Educación para la Diversidad", semestre: 7 },
      { sigla: "LEN-414", nombre: "Taller de Redacción Académica", semestre: 7 },
      { sigla: "PED-421", nombre: "Diseño de Proyectos Educativos", semestre: 8 },
      { sigla: "PED-422", nombre: "Evaluación de los Aprendizajes", semestre: 8 },
      { sigla: "ADM-423", nombre: "Emprendimiento en Educación", semestre: 8 },
      { sigla: "PSI-424", nombre: "Psicopedagogía", semestre: 8 },
      { sigla: "ADM-511", nombre: "Gerencia y Presupuesto", semestre: 9 },
      { sigla: "PSI-512", nombre: "Prevención e Intervención Psicopedagógica", semestre: 9 },
      { sigla: "SOC-513", nombre: "Legislación Educativa", semestre: 9 }
    ],
    competencias: [
      { id: "edu-ges", nombre: "Administración, Gestión Institucional y Evaluación de Centros Educativos", semestreMin: 4, materia: "ADM-222" },
      { id: "edu-inv", nombre: "Investigación Educativa Cuantitativa y Cualitativa", semestreMin: 5, materia: "INV-316" },
      { id: "edu-cur", nombre: "Diseño, Adaptación y Desarrollo Curricular por Competencias", semestreMin: 5, materia: "PED-311" },
      { id: "edu-com", nombre: "Educación Comunitaria, Intercultural, Alternativa y Especial", semestreMin: 6, materia: "PED-322" },
      { id: "edu-did", nombre: "Planificación Didáctica, Entornos Virtuales (LMS/Moodle) y Recursos Pedagógicos", semestreMin: 7, materia: "PED-411" },
      { id: "edu-div", nombre: "Educación Inclusiva, Atención a la Diversidad y Adaptaciones Curriculares", semestreMin: 7, materia: "PED-412" },
      { id: "edu-proy", nombre: "Diseño, Ejecución y Monitoreo de Proyectos Socioeducativos (Marco Lógico)", semestreMin: 8, materia: "PED-421" },
      { id: "edu-eval", nombre: "Diseño de Instrumentos y Rúbricas de Evaluación de los Aprendizajes", semestreMin: 8, materia: "PED-422" },
      { id: "edu-psi", nombre: "Diagnóstico, Prevención e Intervención Psicopedagógica", semestreMin: 9, materia: "PSI-512" }
    ],
    proyectosSugeridos: [
      {
        titulo: "Diseño de Proyecto Socioeducativo y Capacitación bajo Enfoque de Marco Lógico",
        materia: "PED-421 Diseño de Proyectos Educativos / PED-312 Educación Comunitaria",
        descripcion: "Diagnóstico participativo de necesidades formativas, matriz de planificación, guías didácticas, talleres presenciales/virtuales e indicadores de impacto."
      },
      {
        titulo: "Propuesta de Rediseño Microcurricular y Planificación Didáctica por Competencias",
        materia: "PED-311 Diseño Curricular / PED-411 Planificación Didáctica",
        descripcion: "Estructuración de secuencias didácticas, integración de TICs, instrumentos de evaluación formativa y adaptaciones para inclusión educativa."
      },
      {
        titulo: "Programa de Diagnóstico e Intervención Psicopedagógica en Aula",
        materia: "PSI-424 Psicopedagogía / PSI-512 Prevención e Intervención Psicopedagógica",
        descripcion: "Aplicación de baterías de evaluación psicopedagógica, detección de dificultades de aprendizaje y diseño de plan individualizado de apoyo."
      }
    ]
  },
  {
    id: "psicomotricidad",
    codigo: "PSM",
    nombre: "Psicomotricidad",
    facultad: "Ciencias de la Educación y Humanidades",
    semestres: 10,
    color: "#D62868",
    perfilBase:
      "Profesional especializado en atención temprana, educación psicomotriz, evaluación diagnóstica, intervención clínica y terapéutica en trastornos del neurodesarrollo, gerontopsicomotricidad y psicomotricidad deportiva.",
    materias: [
      { sigla: "PSM-111", nombre: "Introducción a la Psicomotricidad", semestre: 1 },
      { sigla: "PSI-112", nombre: "Introducción a la Psicología y Psicogenética", semestre: 1 },
      { sigla: "PSM-121", nombre: "Psicomotricidad I (Atención Temprana)", semestre: 2 },
      { sigla: "PSI-123", nombre: "Psicología Evolutiva", semestre: 2 },
      { sigla: "BIO-124", nombre: "Neuroanatomofisiología", semestre: 2 },
      { sigla: "PSM-211", nombre: "Psicomotricidad II (Educación Psicomotriz)", semestre: 3 },
      { sigla: "PSM-212", nombre: "Psicomotricidad II (Práctica)", semestre: 3 },
      { sigla: "BIO-214", nombre: "Neurofisiología del Lenguaje", semestre: 3 },
      { sigla: "PSM-221", nombre: "Psicomotricidad III (Desarrollo Psicomotriz de la Adolescencia)", semestre: 4 },
      { sigla: "BIO-224", nombre: "Neurodesarrollo", semestre: 4 },
      { sigla: "BIO-225", nombre: "Anatomía y Fisiología del Aparato Locomotor", semestre: 4 },
      { sigla: "PSM-311", nombre: "Psicomotricidad IV (Patología Psicomotriz)", semestre: 5 },
      { sigla: "PSM-312", nombre: "Psicomotricidad IV (Práctica)", semestre: 5 },
      { sigla: "BIO-316", nombre: "Semiología y Primeros Auxilios", semestre: 5 },
      { sigla: "PSM-321", nombre: "Psicomotricidad V (Trastornos Psicomotores)", semestre: 6 },
      { sigla: "PSM-322", nombre: "Evaluación Diagnóstica I", semestre: 6 },
      { sigla: "BIO-325", nombre: "Patología del Lenguaje", semestre: 6 },
      { sigla: "PED-326", nombre: "Deontología y Legislación", semestre: 6 },
      { sigla: "PSM-411", nombre: "Psicomotricidad VI (Gerontopsicomotricidad)", semestre: 7 },
      { sigla: "PSM-412", nombre: "Evaluación Diagnóstica II", semestre: 7 },
      { sigla: "INV-415", nombre: "Elaboración de Proyectos en Psicomotricidad", semestre: 7 },
      { sigla: "PSM-421", nombre: "Psicomotricidad VII (Intervención Psicomotriz)", semestre: 8 },
      { sigla: "PSM-422", nombre: "Psicomotricidad VII (Práctica)", semestre: 8 },
      { sigla: "PSM-423", nombre: "Evaluación Diagnóstica III", semestre: 8 },
      { sigla: "PED-425", nombre: "Didáctica Especial", semestre: 8 },
      { sigla: "PSM-511", nombre: "Psicomotricidad VIII (Deportiva)", semestre: 9 },
      { sigla: "PSM-513", nombre: "Práctica Institucional I", semestre: 9 },
      { sigla: "BIO-515", nombre: "Práctica Clínica", semestre: 9 },
      { sigla: "PSM-521", nombre: "Práctica Institucional II", semestre: 10 },
      { sigla: "PSI-522", nombre: "Psicoprofilaxis del Ejercicio Profesional", semestre: 10 }
    ],
    competencias: [
      { id: "psm-at", nombre: "Estimulación y Atención Temprana del Desarrollo Infantil (0 a 3 años)", semestreMin: 2, materia: "PSM-121" },
      { id: "psm-edu", nombre: "Educación Psicomotriz Preventiva en Nivel Inicial y Primario", semestreMin: 3, materia: "PSM-211" },
      { id: "psm-neu", nombre: "Evaluación del Neurodesarrollo y Funcionalidad del Aparato Locomotor", semestreMin: 4, materia: "BIO-224" },
      { id: "psm-pat", nombre: "Detección de Patologías y Trastornos Psicomotores en la Infancia", semestreMin: 6, materia: "PSM-321" },
      { id: "psm-diag", nombre: "Aplicación de Baterías y Protocolos de Evaluación Diagnóstica Psicomotriz", semestreMin: 7, materia: "PSM-412" },
      { id: "psm-ger", nombre: "Gerontopsicomotricidad y Estimulación Cognitiva-Motora del Adulto Mayor", semestreMin: 7, materia: "PSM-411" },
      { id: "psm-proy", nombre: "Diseño de Proyectos de Intervención Comunitaria y Salud Psicomotriz", semestreMin: 7, materia: "INV-415" },
      { id: "psm-int", nombre: "Terapia e Intervención Psicomotriz Clínica y Redacción de Informes", semestreMin: 8, materia: "PSM-421" },
      { id: "psm-dep", nombre: "Psicomotricidad Deportiva, Coordinación Motriz y Práctica Hospitalaria/Institucional", semestreMin: 9, materia: "PSM-511" }
    ],
    proyectosSugeridos: [
      {
        titulo: "Evaluación Diagnóstica y Plan de Intervención Psicomotriz Individualizado",
        materia: "PSM-412 Evaluación Diagnóstica II / PSM-421 Intervención Psicomotriz",
        descripcion: "Aplicación de balance psicomotor (tono, equilibrio, lateralidad, esquema corporal, praxias), elaboración de informe clínico y sesiones de sala psicomotriz."
      },
      {
        titulo: "Programa de Estimulación Temprana y Educación Psicomotriz en Centro Infantil",
        materia: "PSM-121 Atención Temprana / PSM-212 Educación Psicomotriz (Práctica)",
        descripcion: "Planificación y ejecución de talleres de psicomotricidad educativa para niños de 2 a 6 años, seguimiento evolutivo y orientación a familias."
      },
      {
        titulo: "Proyecto de Gerontopsicomotricidad y Prevención del Deterioro Funcional",
        materia: "PSM-411 Gerontopsicomotricidad / PSM-513 Práctica Institucional I",
        descripcion: "Intervención grupal con adultos mayores enfocada en equilibrio, coordinación, memoria corporal y autonomía funcional en actividades de la vida diaria."
      }
    ]
  }
];

export const COMPETENCIAS_TRANSVERSALES = [
  "Trabajo colaborativo y liderazgo de equipos",
  "Comunicación asertiva oral y redacción ejecutiva",
  "Ética profesional y compromiso social salesiano",
  "Resolución de problemas complejos y pensamiento crítico",
  "Adaptabilidad, aprendizaje continuo y gestión del tiempo",
  "Orientación al servicio, empatía y trato humano",
  "Gestión de proyectos y orientación a resultados"
];

export const PASTORAL_ACTIVIDADES = [
  {
    id: "past-oratorio",
    titulo: "Animador / Voluntario del Oratorio Universitario Salesiano",
    horasDefault: 120,
    resumenLey342:
      "Formación y acompañamiento integral de niños, adolescentes y jóvenes en jornadas sabatinas, recreación educativa y liderazgo preventivo salesiano (Certificable bajo Ley N° 342 Art. 28)."
  },
  {
    id: "past-asociacionismo",
    titulo: "Liderazgo en Asociacionismo Salesiano Universitario (ASU)",
    horasDefault: 90,
    resumenLey342:
      "Coordinación de grupos juveniles universitarios, organización de encuentros formativos, cultura asociativa y servicio a la comunidad estudiantil."
  },
  {
    id: "past-misiones",
    titulo: "Voluntariado Social y Misiones de Acción Solidaria USB",
    horasDefault: 100,
    resumenLey342:
      "Ejecución de campañas solidarias, apoyo pedagógico/comunitario en zonas periurbanas y rurales e intervención social interdisciplinaria."
  },
  {
    id: "past-ce",
    titulo: "Representación Estudiantil / Organización de Jornadas Académicas",
    horasDefault: 80,
    resumenLey342:
      "Apoyo logístico y académico en talleres, ferias científicas, seminarios de carrera y bienvenida estudiantil."
  }
];

export const OPORTUNIDADES_DEMO = [
  {
    id: "opp-sis-01",
    titulo: "Desarrollador Junior Full-Stack & Automatización de Procesos",
    entidad: "Banco PyME Ecofuturo (Convenio USB-2026-014)",
    canal: "2. Trabajo Dirigido / Pasantía",
    carreraId: "ingenieria-de-sistemas",
    semestreMin: 7,
    modalidad: "Presencial / Híbrido — La Paz",
    competenciasRequeridas: ["sis-sql", "sis-web", "sis-ingsw", "sis-docker"],
    brechaMooc: {
      competencia: "Arquitectura de Contenedores Docker y Despliegue CI/CD",
      cursoMooc: "Despliegue Ágil con Docker y Automatización DevOps",
      urlMooc: "https://mooc.usalesiana.online"
    },
    descripcion:
      "Integrarse al equipo de Innovación Tecnológica para el desarrollo de módulos web internos, optimización de consultas SQL y contenedorización de servicios bajo metodología Scrum."
  },
  {
    id: "opp-der-01",
    titulo: "Practicante Legal en Gestión Corporativa, Contratos y Trámites Administrativos",
    entidad: "Cámara Nacional de Comercio — CNC (Convenio USB-2026-008)",
    canal: "1. Pasantía Preprofesional / Práctica Profesional",
    carreraId: "derecho",
    semestreMin: 7,
    modalidad: "Medio Tiempo — La Paz",
    competenciasRequeridas: ["der-mem", "der-civ", "der-adm", "der-emp"],
    brechaMooc: {
      competencia: "Contrataciones Estatales SICOES y Arbitraje Comercial",
      cursoMooc: "Normativa SICOES (DS 0181) y Conciliación Corporativa",
      urlMooc: "https://mooc.usalesiana.online"
    },
    descripcion:
      "Apoyo en la revisión de contratos comerciales, seguimiento de trámites ante SEPREC y entidades públicas, redacción de informes jurídicos y asistencia en centros de conciliación."
  },
  {
    id: "opp-con-01",
    titulo: "Auxiliar de Auditoría Externa, Tributación SIAT y Estados Financieros",
    entidad: "Consultora Delta Auditores & Asociados SRL (Convenio USB-2026-021)",
    canal: "2. Trabajo Dirigido / Empleo Junior",
    carreraId: "contaduria-publica",
    semestreMin: 7,
    modalidad: "Tiempo Completo / Medio Tiempo — La Paz",
    competenciasRequeridas: ["con-eeff", "con-siat", "con-fin", "con-aud"],
    brechaMooc: {
      competencia: "Analítica Financiera con Power BI y Auditoría Tributaria Digital",
      cursoMooc: "Excel Financiero Avanzado y Power BI para Auditores",
      urlMooc: "https://mooc.usalesiana.online"
    },
    descripcion:
      "Participación en equipos de auditoría financiera y tributaria, elaboración de papeles de trabajo, conciliaciones bancarias, revisión de bancarización y declaraciones en el SIAT en Línea."
  },
  {
    id: "opp-gas-01",
    titulo: "Asistente de Jefatura de Cocina, Costeo de Menús y Control BPM",
    entidad: "Hotel Casa Grande & Centro de Convenciones (Convenio USB-2026-019)",
    canal: "1. Pasantía Preprofesional / Empleo Junior",
    carreraId: "gastronomia",
    semestreMin: 5,
    modalidad: "Turnos Rotativos — Zona Sur, La Paz",
    competenciasRequeridas: ["gas-bpm", "gas-cost", "gas-rep", "gas-cat"],
    brechaMooc: {
      competencia: "Ingeniería de Menús y Gestión Financiera de A&B",
      cursoMooc: "Control de Costos Gastronómicos y Estándares HACCP",
      urlMooc: "https://mooc.usalesiana.online"
    },
    descripcion:
      "Apoyo en la supervisión de producción culinaria y alta repostería para eventos corporativos, control de fichas técnicas de recetas y auditoría diaria de buenas prácticas de manufactura (BPM)."
  },
  {
    id: "opp-ico-01",
    titulo: "Analista Junior de Inteligencia Comercial, Procesos ISO y Proyectos",
    entidad: "Grupo Industrial CBN / Distribuidora Andina (Convenio USB-2026-032)",
    canal: "4. Empleo Formal Junior / Trabajo Dirigido",
    carreraId: "ingenieria-comercial",
    semestreMin: 6,
    modalidad: "Presencial — La Paz / El Alto",
    competenciasRequeridas: ["ico-ven", "ico-mkt", "ico-iso", "ico-bi"],
    brechaMooc: {
      competencia: "Visualización de KPIs Comerciales con Power BI y CRM",
      cursoMooc: "Business Intelligence Aplicado a la Gestión Comercial",
      urlMooc: "https://mooc.usalesiana.online"
    },
    descripcion:
      "Seguimiento de indicadores comerciales, apoyo en la documentación de procesos de calidad ISO 9001, análisis de rotación de inventarios y evaluación de campañas de mercado."
  },
  {
    id: "opp-edu-01",
    titulo: "Facilitador Pedagógico en Diseño Curricular y Proyectos Socioeducativos",
    entidad: "Fundación Fe y Alegría / Red de Obras Educativas Salesianas (Convenio USB-2026-005)",
    canal: "2. Trabajo Dirigido / Acción Social",
    carreraId: "ciencias-de-la-educacion",
    semestreMin: 6,
    modalidad: "Medio Tiempo — La Paz",
    competenciasRequeridas: ["edu-cur", "edu-did", "edu-div", "edu-proy"],
    brechaMooc: {
      competencia: "Diseño Instruccional en Plataformas Virtuales (Moodle / Open edX)",
      cursoMooc: "Tecnologías Educativas y Diseño Instruccional E-Learning",
      urlMooc: "https://mooc.usalesiana.online"
    },
    descripcion:
      "Diseño de materiales didácticos, acompañamiento pedagógico a docentes, implementación de adaptaciones curriculares para educación inclusiva y sistematización de indicadores educativos."
  },
  {
    id: "opp-psm-01",
    titulo: "Psicomotricista en Práctica Clínica de Atención Temprana y Neurodesarrollo",
    entidad: "Centro Integral de Rehabilitación y Desarrollo Infantil San Juan de Dios (Convenio USB-2026-011)",
    canal: "1. Práctica Institucional / Trabajo Dirigido",
    carreraId: "psicomotricidad",
    semestreMin: 6,
    modalidad: "Turno Mañana o Tarde — La Paz",
    competenciasRequeridas: ["psm-at", "psm-neu", "psm-diag", "psm-int"],
    brechaMooc: {
      competencia: "Elaboración de Informes Clínicos Interdisciplinarios y Orientación Familiar",
      cursoMooc: "Protocolos de Evaluación Psicomotriz e Intervención Familiar",
      urlMooc: "https://mooc.usalesiana.online"
    },
    descripcion:
      "Participación en sesiones de evaluación diagnóstica psicomotriz, estimulación temprana, registro de evolución terapéutica en sala de psicomotricidad y trabajo con equipo multidisciplinario."
  }
];
