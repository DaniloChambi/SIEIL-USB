import docx
from docx.shared import Inches, Pt, RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.enum.table import WD_TABLE_ALIGNMENT, WD_ALIGN_VERTICAL
from docx.oxml import parse_xml, OxmlElement
from docx.oxml.ns import nsdecls, qn
import os

OUTPUT_PATH = "R-1041 Propuesta Metodologica para el desarrollo del conversatorio.docx"

def set_cell_margins(cell, top=100, bottom=100, left=150, right=150):
    tcPr = cell._tc.get_or_add_tcPr()
    tcMar = parse_xml(
        f'<w:tcMar {nsdecls("w")}>'
        f'<w:top w:w="{top}" w:type="dxa"/>'
        f'<w:bottom w:w="{bottom}" w:type="dxa"/>'
        f'<w:left w:w="{left}" w:type="dxa"/>'
        f'<w:right w:w="{right}" w:type="dxa"/>'
        f'</w:tcMar>'
    )
    tcPr.append(tcMar)

def set_cell_shading(cell, color_hex):
    tcPr = cell._tc.get_or_add_tcPr()
    shd = parse_xml(f'<w:shd {nsdecls("w")} w:fill="{color_hex}"/>')
    tcPr.append(shd)

def create_document():
    doc = docx.Document()

    # Configuración de márgenes (2.5 cm en todos los lados)
    for section in doc.sections:
        section.top_margin = Inches(0.98)
        section.bottom_margin = Inches(0.98)
        section.left_margin = Inches(0.98)
        section.right_margin = Inches(0.98)

        # Encabezado y Pie de página
        header = section.header
        hp = header.paragraphs[0]
        hp.alignment = WD_ALIGN_PARAGRAPH.RIGHT
        hrun = hp.add_run("UNIVERSIDAD SALESIANA DE BOLIVIA · R-1041 | PEIL-USB")
        hrun.font.name = "Calibri"
        hrun.font.size = Pt(8.5)
        hrun.font.color.rgb = RGBColor(100, 116, 139)

        footer = section.footer
        fp = footer.paragraphs[0]
        fp.alignment = WD_ALIGN_PARAGRAPH.CENTER
        frun = fp.add_run("Propuesta Metodológica y Operativa · Conversatorio-Taller Aula Magna · Viernes 13 de Noviembre de 2026")
        frun.font.name = "Calibri"
        frun.font.size = Pt(8.5)
        frun.font.color.rgb = RGBColor(100, 116, 139)

    NAVY = RGBColor(0, 40, 85)       # #002855
    GOLD = RGBColor(180, 83, 9)       # #B45309
    DARK_GRAY = RGBColor(30, 41, 59)  # #1E293B
    MUTED = RGBColor(71, 85, 105)     # #475569

    # -------------------------------------------------------------
    # PORTADA INSTITUCIONAL
    # -------------------------------------------------------------
    p_inst = doc.add_paragraph()
    p_inst.alignment = WD_ALIGN_PARAGRAPH.CENTER
    p_inst.paragraph_format.space_before = Pt(12)
    p_inst.paragraph_format.space_after = Pt(2)
    r_inst = p_inst.add_run("UNIVERSIDAD SALESIANA DE BOLIVIA")
    r_inst.font.name = "Calibri"
    r_inst.font.size = Pt(15)
    r_inst.font.bold = True
    r_inst.font.color.rgb = NAVY

    p_sub = doc.add_paragraph()
    p_sub.alignment = WD_ALIGN_PARAGRAPH.CENTER
    p_sub.paragraph_format.space_after = Pt(14)
    r_sub = p_sub.add_run("VICERRECTORADO ACADÉMICO Y DE INVESTIGACIÓN · VICERRECTORADO ADMINISTRATIVO Y FINANCIERO\nSERVICIO INTEGRAL DE FORMACIÓN HUMANA CRISTIANA Y PROYECCIÓN INSTITUCIONAL (PASTORAL)\nCARRERA DE INGENIERÍA DE SISTEMAS")
    r_sub.font.name = "Calibri"
    r_sub.font.size = Pt(9.5)
    r_sub.font.bold = True
    r_sub.font.color.rgb = GOLD

    p_code = doc.add_paragraph()
    p_code.alignment = WD_ALIGN_PARAGRAPH.CENTER
    p_code.paragraph_format.space_after = Pt(18)
    r_code = p_code.add_run("DOCUMENTO TÉCNICO-METODOLÓGICO R-1041 / PEIL-USB-2026")
    r_code.font.name = "Calibri"
    r_code.font.size = Pt(11)
    r_code.font.bold = True
    r_code.font.color.rgb = NAVY

    p_title = doc.add_paragraph()
    p_title.alignment = WD_ALIGN_PARAGRAPH.CENTER
    p_title.paragraph_format.space_after = Pt(10)
    r_title = p_title.add_run("PROPUESTA METODOLÓGICA, PEDAGÓGICA Y OPERATIVA PARA EL DESARROLLO DEL CONVERSATORIO-TALLER:")
    r_title.font.name = "Calibri"
    r_title.font.size = Pt(16)
    r_title.font.bold = True
    r_title.font.color.rgb = NAVY

    p_motto = doc.add_paragraph()
    p_motto.alignment = WD_ALIGN_PARAGRAPH.CENTER
    p_motto.paragraph_format.space_after = Pt(22)
    r_motto = p_motto.add_run("«Construye tu primer currículum, descubre tus habilidades y prepárate para tu primera oportunidad laboral»")
    r_motto.font.name = "Calibri"
    r_motto.font.size = Pt(14)
    r_motto.font.italic = True
    r_motto.font.bold = True
    r_motto.font.color.rgb = GOLD

    # Ficha Técnica de Portada
    t_meta = doc.add_table(rows=9, cols=2)
    t_meta.alignment = WD_TABLE_ALIGNMENT.CENTER
    meta_data = [
        ("Evento / Jornada:", "Conversatorio-Taller de Empleabilidad, Orientación Profesional y Habilidades Laborales"),
        ("Sede y Escenario:", "Aula Magna de la Universidad Salesiana de Bolivia (Campus Achachicala, La Paz)"),
        ("Fecha y Horario:", "Viernes 13 de Noviembre de 2026 · 18:30 a 20:30 hrs. (120 Minutos continuos)"),
        ("Plataforma Tecnológica:", "PEIL-USB (Plataforma de Empleabilidad e Intermediación Laboral de la Universidad Salesiana)"),
        ("Población Beneficiaria:", "Estudiantes de TODAS las carreras de la Universidad Salesiana de Bolivia, convocados prioritariamente en el ÚLTIMO SEMESTRE de formación (etapa de egreso y titulación), así como egresados y recién titulados."),
        ("Alcance de Carreras:", "Universal a nivel institucional (Todas las Carreras y Facultades USB), con pilotaje intensivo y digitalización curricular de las 7 mallas oficiales en la plataforma PEIL-USB."),
        ("Carreras de Referencia:", "Ing. de Sistemas, Derecho, Contaduría Pública, Gastronomía y Gestión de Restaurantes, Ing. Comercial, Ciencias de la Educación y Psicomotricidad (más carreras afines de la USB)."),
        ("Marco Normativo e Identidad:", "Reglamento R-1041, Ley N° 342 (Art. 28 - Valor Curricular de la Pastoral), Ley N° 070 y Sistema Preventivo de Don Bosco"),
        ("Responsable / Facilitador:", "Ing. Danilo Chambi, Ph.D. — Dirección de la Carrera de Ingeniería de Sistemas / Equipo Técnico PEIL-USB")
    ]

    for i, (k, v) in enumerate(meta_data):
        row = t_meta.rows[i]
        c0, c1 = row.cells[0], row.cells[1]
        c0.width = Inches(2.3)
        c1.width = Inches(4.7)
        set_cell_margins(c0, 70, 70, 100, 100)
        set_cell_margins(c1, 70, 70, 100, 100)
        set_cell_shading(c0, "F1F5F9" if i % 2 == 0 else "FFFFFF")
        set_cell_shading(c1, "F8FAFC" if i % 2 == 0 else "FFFFFF")

        p0 = c0.paragraphs[0]
        p0.paragraph_format.space_after = Pt(2)
        r0 = p0.add_run(k)
        r0.font.name = "Calibri"
        r0.font.size = Pt(9.5)
        r0.font.bold = True
        r0.font.color.rgb = NAVY

        p1 = c1.paragraphs[0]
        p1.paragraph_format.space_after = Pt(2)
        r1 = p1.add_run(v)
        r1.font.name = "Calibri"
        r1.font.size = Pt(9.5)
        r1.font.color.rgb = DARK_GRAY

    doc.add_page_break()

    # -------------------------------------------------------------
    # HELPERS DE CONTENIDO
    # -------------------------------------------------------------
    def add_h1(text):
        p = doc.add_paragraph()
        p.paragraph_format.space_before = Pt(16)
        p.paragraph_format.space_after = Pt(6)
        p.paragraph_format.keep_with_next = True
        run = p.add_run(text)
        run.font.name = "Calibri"
        run.font.size = Pt(13.5)
        run.font.bold = True
        run.font.color.rgb = NAVY
        return p

    def add_h2(text):
        p = doc.add_paragraph()
        p.paragraph_format.space_before = Pt(12)
        p.paragraph_format.space_after = Pt(4)
        p.paragraph_format.keep_with_next = True
        run = p.add_run(text)
        run.font.name = "Calibri"
        run.font.size = Pt(11.5)
        run.font.bold = True
        run.font.color.rgb = GOLD
        return p

    def add_h3(text):
        p = doc.add_paragraph()
        p.paragraph_format.space_before = Pt(8)
        p.paragraph_format.space_after = Pt(2)
        p.paragraph_format.keep_with_next = True
        run = p.add_run(text)
        run.font.name = "Calibri"
        run.font.size = Pt(10.5)
        run.font.bold = True
        run.font.color.rgb = NAVY
        return p

    def add_p(text, bold_prefix=None, space_after=6):
        p = doc.add_paragraph()
        p.paragraph_format.space_before = Pt(0)
        p.paragraph_format.space_after = Pt(space_after)
        p.paragraph_format.line_spacing = 1.15
        if bold_prefix:
            r_b = p.add_run(bold_prefix)
            r_b.font.name = "Calibri"
            r_b.font.size = Pt(10)
            r_b.font.bold = True
            r_b.font.color.rgb = DARK_GRAY
        r = p.add_run(text)
        r.font.name = "Calibri"
        r.font.size = Pt(10)
        r.font.color.rgb = DARK_GRAY
        return p

    def add_bullet(text, bold_prefix=None):
        p = doc.add_paragraph(style='List Bullet')
        p.paragraph_format.space_before = Pt(0)
        p.paragraph_format.space_after = Pt(3)
        p.paragraph_format.line_spacing = 1.15
        if bold_prefix:
            r_b = p.add_run(bold_prefix)
            r_b.font.name = "Calibri"
            r_b.font.size = Pt(10)
            r_b.font.bold = True
            r_b.font.color.rgb = DARK_GRAY
        r = p.add_run(text)
        r.font.name = "Calibri"
        r.font.size = Pt(10)
        r.font.color.rgb = DARK_GRAY
        return p

    def add_callout(text, title="PRINCIPIO METODOLÓGICO CLAVE"):
        tbl = doc.add_table(rows=1, cols=1)
        tbl.alignment = WD_TABLE_ALIGNMENT.CENTER
        cell = tbl.cell(0, 0)
        cell.width = Inches(7.0)
        set_cell_margins(cell, 120, 120, 160, 160)
        set_cell_shading(cell, "EFF6FF")
        tcPr = cell._tc.get_or_add_tcPr()
        borders = parse_xml(
            f'<w:tcBorders {nsdecls("w")}>'
            f'<w:top w:val="none"/>'
            f'<w:left w:val="single" w:sz="24" w:space="0" w:color="002855"/>'
            f'<w:bottom w:val="none"/>'
            f'<w:right w:val="none"/>'
            f'</w:tcBorders>'
        )
        tcPr.append(borders)
        p = cell.paragraphs[0]
        p.paragraph_format.space_after = Pt(3)
        r_title = p.add_run(f"★ {title}\n")
        r_title.font.name = "Calibri"
        r_title.font.size = Pt(10)
        r_title.font.bold = True
        r_title.font.color.rgb = NAVY
        r_body = p.add_run(text)
        r_body.font.name = "Calibri"
        r_body.font.size = Pt(9.5)
        r_body.font.italic = True
        r_body.font.color.rgb = DARK_GRAY
        doc.add_paragraph().paragraph_format.space_after = Pt(4)

    # -------------------------------------------------------------
    # 1. INTRODUCCIÓN, ANTECEDENTES Y DIAGNÓSTICO INSTITUCIONAL
    # -------------------------------------------------------------
    add_h1("1. Introducción, Antecedentes y Diagnóstico Institucional")

    add_p("La transición entre las aulas universitarias y el primer empleo formal constituye uno de los momentos de mayor incertidumbre para los jóvenes en Bolivia. De acuerdo con los estudios de empleabilidad juvenil y los registros de seguimiento a graduados de la Universidad Salesiana de Bolivia (USB), los estudiantes que cursan el último tramo de sus carreras y los recién egresados se enfrentan de manera recurrente a una paradoja ampliamente documentada: el mercado laboral exige «experiencia laboral previa comprobable», mientras que los postulantes junior aún no han tenido la oportunidad de acceder a un contrato laboral formal dependiente.")

    add_p("Es imperativo subrayar que la convocatoria del conversatorio-taller tiene un **alcance institucional universal y abierto**: está dirigida a los estudiantes de **TODAS LAS CARRERAS de la Universidad Salesiana de Bolivia** (sin excepción de área, facultad o disciplina: ciencias jurídicas, sociales, empresariales, económicas, exactas, tecnológicas, de la educación y de la salud). Dentro de este universo, la propuesta se enfoca de manera prioritaria y estratégica en los estudiantes que cursan el **ÚLTIMO SEMESTRE DE FORMACIÓN ACADÉMICA** (8°, 9° o 10° semestre según el plan de estudios correspondiente), por encontrarse en la antesala inmediata de su graduación e inserción laboral formal.")

    add_p("Esta barrera psicológica y procedimental genera lo que en psicología organizacional se denomina el «Síndrome de la Hoja en Blanco»: más del 80% de los estudiantes universitarios bolivianos manifiesta inseguridad al redactar su primer Currículum Vitae, considerando erróneamente que «no tienen nada que poner» porque reducen el concepto de trayectoria laboral a los empleos remunerados con aportes a la seguridad social. Sin embargo, al llegar al último semestre de su carrera en la Universidad Salesiana de Bolivia, los estudiantes han desarrollado una riqueza empírica y valórica extraordinaria:")

    add_bullet(" Proyectos semestrales aplicados, software funcional, análisis de casos jurisprudenciales, auditorías simuladas, diseño de cartas de menú con costeo real, planes de negocio y proyectos psicomotrices clínicos.", bold_prefix="Proyectos Formativos de Aula:")
    add_bullet(" Horas de práctica intensiva en talleres de gastronomía, centros de atención psicomotriz, salas de simulación de audiencias, laboratorios de redes y gabinetes contables.", bold_prefix="Prácticas de Laboratorio y Gabinete:")
    add_bullet(" Cientos de horas dedicadas al voluntariado en Oratorios Universitarios, Asociacionismo Salesiano Universitario (ASU), misiones en áreas rurales y centros de estudiantes, donde han forjado liderazgo, empatía, resiliencia y resolución de conflictos comunitarios.", bold_prefix="Compromiso Pastoral y Social Salesiano:")

    add_p("El problema no radica en la falta de capacidades del estudiante salesiano de último semestre, sino en la ausencia de una metodología institucional estructurada que le permita traducir, clasificar y visibilizar esas competencias académicas, técnicas y valóricas en un perfil profesional competitivo, auditable y compatible con las exigencias del mercado moderno (incluyendo los filtros algorítmicos ATS utilizados por las empresas medianas y grandes).")

    add_p("En este marco, la presente Propuesta Metodológica formaliza el diseño, pedagogía y operación del Conversatorio-Taller «Construye tu primer currículum, descubre tus habilidades y prepárate para tu primera oportunidad laboral», programado para el viernes 13 de noviembre de 2026 a las 18:30 horas en el Aula Magna de la USB. Este evento no se concibe como una conferencia expositiva tradicional, sino como una jornada de intervención práctica y masiva, donde los estudiantes de todas las carreras de la universidad ingresarán con dudas y saldrán del recinto con su carpeta integral de empleabilidad generada en tiempo real mediante la Plataforma PEIL-USB.")

    # -------------------------------------------------------------
    # 2. MARCO FILOSÓFICO, NORMATIVO Y PEDAGÓGICO
    # -------------------------------------------------------------
    add_h1("2. Marco Filosófico, Normativo y Pedagógico")

    add_h2("2.1. El Sistema Preventivo de San Juan Bosco Aplicado a la Empleabilidad")
    add_p("La Universidad Salesiana de Bolivia fundamenta su acción educativa en el carisma de Don Bosco. En el ámbito de la inserción laboral, el Sistema Preventivo adquiere una vigencia contemporánea ineludible sustentada en tres pilares:")

    add_bullet(" Enseñar al estudiante a reconocer con rigor y autocrítica sus verdaderas competencias cognitivas y procedimentales adquiridas en la malla curricular. La razón exige superar la improvisación: saber qué sabe hacer y para qué tipo de puesto está preparado.", bold_prefix="La Razón (Rendimiento Técnico y Autoconocimiento):")
    add_bullet(" La formación de «buenos cristianos y honrados ciudadanos» se traduce en el mercado laboral como ética intachable, transparencia corporativa, vocación de servicio, empatía con los sectores vulnerables y rechazo absoluto a la corrupción.", bold_prefix="La Religión y la Espiritualidad (Ética Profesional Salesiana):")
    add_bullet(" La «amorevolezza» se operativiza como el acompañamiento institucional cercano. La universidad no abandona al estudiante en la puerta del aula una vez aprobadas las materias, sino que lo toma de la mano en su último semestre, lo orienta pedagógicamente y le brinda herramientas digitales de vanguardia para su inserción digna en la sociedad.", bold_prefix="El Amor y la Amabilidad (Acompañamiento y Asistencia Salesiana):")

    add_h2("2.2. Marco Normativo Legal Nacional")
    add_p("El taller y la plataforma de soporte se articulan estrictamente con la legislación nacional vigente:")
    add_bullet(" Dispone que el Estado y las entidades públicas y privadas promoverán políticas de formación técnica y empleo digno para la juventud boliviana, reconociendo la necesidad de articular la formación superior con el aparato productivo.", bold_prefix="Constitución Política del Estado (Arts. 54, 77 y 91):")
    add_bullet(" Establece con rango de ley que «las actividades de voluntariado social desarrolladas por jóvenes en instituciones reconocidas tendrán valor curricular y serán certificadas formalmente como mérito en procesos de postulación e inserción laboral». Este artículo es el fundamento jurídico que PEIL-USB utiliza para certificar las horas pastorales en el CV.", bold_prefix="Ley N° 342 de la Juventud (Artículo 28 — Valor Curricular del Voluntariado):")
    add_bullet(" Promueve una formación universitaria productiva, comunitaria y comprometida con el desarrollo socioeconómico nacional.", bold_prefix="Ley N° 070 de la Educación «Avelino Siñani - Elizardo Pérez»:")
    add_bullet(" Regula que las modalidades de Trabajo Dirigido y Pasantía deben estar debidamente respaldadas por un convenio interinstitucional vigente, con contrapartes formalmente acreditadas.", bold_prefix="Reglamento de Graduación y Guía de Tesis / Trabajo Dirigido de la USB:")

    add_h2("2.3. Estándares Internacionales del Mercado de Empleo")
    add_bullet(" Estipulan la gratuidad total de los servicios de intermediación para los postulantes y la necesidad de vincular tres componentes: orientación vocacional, cruce de perfiles y certificación de habilidades.", bold_prefix="Convenio N° 88 y Recomendación N° 195 de la OIT:")
    add_bullet(" Estructura las competencias de las carreras de la USB en habilidades cognitivas, destrezas de especialidad y competencias transversales estandarizadas, facilitando el emparejamiento con vacantes locales e internacionales.", bold_prefix="Taxonomía Europea de Competencias y Ocupaciones (ESCO / O*NET):")
    add_bullet(" Más del 70% de las corporaciones medianas y grandes en Bolivia y la región filtran los CVs mediante motores de lectura automatizada (ATS). Estos motores rechazan currículums con tablas complejas, fuentes no estándar, gráficos o fotografías incrustadas en el texto. La propuesta introduce el concepto del «Doble CV»: un CV Institucional Formal (con foto, marco y sello QR para entrega en persona) y un CV Limpio ATS (texto jerarquizado para postulación en portales digitales).", bold_prefix="Estándar ATS (Applicant Tracking Systems):")

    add_callout(
        "El taller convoca de forma universal a todas las carreras de la USB y pone el foco en el último semestre de formación para convertir la culminación de estudios en una inserción laboral inmediata, ética y legalmente respaldada por la Ley N° 342.",
        title="DECLARACIÓN DE INTEGRIDAD Y ALCANCE INSTITUCIONAL"
    )

    # -------------------------------------------------------------
    # 3. OBJETIVOS Y METAS DE LA JORNADA
    # -------------------------------------------------------------
    add_h1("3. Objetivos y Metas de la Jornada")

    add_h2("3.1. Objetivo General")
    add_p("Capacitar, empoderar e instrumentar a los estudiantes de **TODAS LAS CARRERAS de la Universidad Salesiana de Bolivia**, con atención focalizada y prioritaria en los cursantes del **ÚLTIMO SEMESTRE DE FORMACIÓN** y recién titulados, en la construcción interactiva de su perfil profesional de alto impacto, generación de su carpeta de empleabilidad (CV Formal con QR, CV ATS, Carta de Motivación y Guía STAR) y entrenamiento en entrevistas laborales, mediante la aplicación de la Plataforma PEIL-USB en tiempo real durante la jornada del 13 de noviembre en el Aula Magna.")

    add_h2("3.2. Objetivos Específicos")
    add_bullet(" Desmontar la creencia limitante de la «falta de experiencia» en los estudiantes que están a punto de egresar, identificando sus proyectos formativos de aula, prácticas de laboratorio y actividades de extensión como evidencia empírica válida para el mercado laboral.", bold_prefix="1. Desmitificación y Autodiagnóstico en Egresados:")
    add_bullet(" Clasificar las capacidades de los participantes bajo la taxonomía internacional ESCO mapeada a las mallas curriculares de la USB, integrando el reconocimiento curricular de la pastoral universitaria (Ley N° 342 Art. 28).", bold_prefix="2. Mapeo Multidisciplinario de Competencias:")
    add_bullet(" Guiar a la audiencia de todas las carreras en el uso de la Plataforma PEIL-USB desde sus dispositivos móviles (Mobile-First) para que generen y descarguen en vivo su CV Institucional con Sello Criptográfico QR y su versión optimizada para ATS.", bold_prefix="3. Generación Tecnológica en Vivo:")
    add_bullet(" Entrenar a los estudiantes de último semestre en la resolución de entrevistas de trabajo mediante la metodología STAR (Situación, Tarea, Acción, Resultado), simulando casos reales en el escenario del Aula Magna.", bold_prefix="4. Entrenamiento en Entrevistas Laborales:")
    add_bullet(" Explicar los mecanismos institucionales de Trabajo Dirigido, convenios interinstitucionales vigentes y la ruta de nivelación de habilidades faltantes mediante la plataforma MOOC de la USB (`mooc.usalesiana.online`).", bold_prefix="5. Intermediación y Cierre de Brechas:")

    add_h2("3.3. Metas Cuantitativas y Cualitativas")
    add_bullet(" Convocatoria de entre 250 y 350 estudiantes en las butacas del Aula Magna, asegurando representación de todas las facultades y carreras de la USB, con mayoría de estudiantes de último semestre.", bold_prefix="Asistencia Proyectada:")
    add_bullet(" Al menos el 90% de los estudiantes asistentes conectados a la red generan y descargan su CV en PDF en sus teléfonos celulares durante el bloque práctico.", bold_prefix="Efectividad Documental:")
    add_bullet(" El 100% de los perfiles creados quedan registrados con su código oficial de Registro Universitario (RU).", bold_prefix="Acreditación Institucional:")
    add_bullet(" Al menos el 45% de los perfiles incorporan horas certificadas de Oratorio, Voluntariado ASU, Centros de Estudiantes o Misiones Solidarias.", bold_prefix="Reconocimiento Pastoral:")
    add_bullet(" Calificación de satisfacción del taller mayor o igual al 92% en la encuesta digital rápida de cierre.", bold_prefix="Satisfacción Estudiantil:")

    # -------------------------------------------------------------
    # 4. ALCANCE UNIVERSAL A TODAS LAS CARRERAS Y FOCO EN EL ÚLTIMO SEMESTRE
    # -------------------------------------------------------------
    add_h1("4. Población Beneficiaria, Alcance Abierto a Todas las Carreras y Foco en el Último Semestre")

    add_h2("4.1. Convocatoria Institucional Abierta a Todas las Carreras de la USB")
    add_p("La Universidad Salesiana de Bolivia cuenta con una diversa oferta académica en áreas empresariales, tecnológicas, jurídicas, sociales y de la salud. La problemática del desempleo juvenil, la inseguridad al redactar el primer currículum y el descarte automatizado por filtros ATS no distingue carreras: afecta tanto a un futuro abogado como a un ingeniero de sistemas, un contador público, un gastrónomo, un pedagogo, un psicomotricista o un comunicador social.")

    add_p("Por ello, la presente propuesta metodológica establece que **el evento es formalmente abierto y convoca a los estudiantes de todas las carreras de la USB**. Las Direcciones de Carrera de toda la universidad, en coordinación con el Vicerrectorado Académico y la Dirección de Pastoral, emitirán comunicados oficiales para que la comunidad estudiantil participe masivamente en la jornada.")

    add_h2("4.2. Por qué el Foco Prioritario está en el Último Semestre de Formación")
    add_p("Si bien el taller resulta enriquecedor para cualquier estudiante universitario, la metodología se enfoca de manera primordial en los estudiantes que cursan el **último semestre de su plan de estudios** (etapa terminal de culminación académica) y recién egresados, debido a cuatro factores determinantes:")

    add_bullet(" El estudiante de último semestre ya ha vencido entre el 90% y el 100% de sus asignaturas troncales. Cuenta con una masa crítica de proyectos, laboratorios y conocimientos consolidados listos para ser transformados en un perfil profesional completo.", bold_prefix="1. Consolidación de Competencias:")
    add_bullet(" En la USB, el último semestre coincide con la elección y ejecución de modalidades de graduación, especialmente el Trabajo Dirigido y la Práctica Profesional en instituciones externas. El taller les dota de la carpeta formal requerida para gestionar sus plazas.", bold_prefix="2. Articulación con Modalidades de Graduación:")
    add_bullet(" Los estudiantes terminales se encuentran a escasas semanas o meses de su ingreso definitivo al mercado de trabajo. La necesidad de un CV formal, un CV ATS y entrenamiento en entrevistas es inmediata y de aplicación práctica urgente.", bold_prefix="3. Proximidad de la Inserción Laboral:")
    add_bullet(" Durante sus años de permanencia en la USB, los estudiantes de último semestre acumularon horas de pastoral en oratorios, voluntariado ASU o misiones. Es el momento decisivo para certificar ese valor bajo la Ley N° 342 y distinguirse de postulantes de otras universidades.", bold_prefix="4. Certificación del Trayecto Formativo Integral:")

    add_h2("4.3. Estrategia Operativa en Dos Niveles en la Plataforma PEIL-USB")
    add_p("Para conciliar la convocatoria abierta a todas las carreras con la precisión técnica de la plataforma digital, PEIL-USB opera bajo una **estrategia pedagógica y funcional de dos niveles**:")

    add_bullet(" Cualquier estudiante de cualquier carrera de la USB puede ingresar a la plataforma con su correo y RU, completar sus datos de identidad, cargar su fotografía formal, seleccionar sus competencias transversales, acreditar sus horas de pastoral (Ley N° 342) y redactar sus proyectos, obteniendo de inmediato su CV Formal con QR y su CV ATS.", bold_prefix="Nivel 1 — Funcionalidad Universal para Todas las Carreras:")
    add_bullet(" Siete carreras de alta representatividad cuentan con sus mallas curriculares troncales digitalizadas y vacantes de convenio precargadas en el motor IA (Sistemas, Derecho, Contaduría, Gastronomía, Comercial, Educación y Psicomotricidad). Estas 7 mallas sirven como modelo de referencia en pantalla durante el taller, proyectando el estándar hacia la Fase 2, en la que se digitalizarán los pensums de las carreras restantes.", bold_prefix="Nivel 2 — Mapeo Curricular Profundo de Referencia (7 Carreras Piloto):")

    t_carreras = doc.add_table(rows=8, cols=5)
    t_carreras.alignment = WD_TABLE_ALIGNMENT.CENTER
    carreras_headers = ["Carrera USB (Modelo Piloto)", "Último Semestre Meta", "Competencias Clave (ESCO)", "Proyecto Emblemático de Aula", "Entidad en Convenio Demostrativa"]
    
    for col_idx, h_text in enumerate(carreras_headers):
        c = t_carreras.rows[0].cells[col_idx]
        set_cell_margins(c, 80, 80, 80, 80)
        set_cell_shading(c, "002855")
        p = c.paragraphs[0]
        p.alignment = WD_ALIGN_PARAGRAPH.CENTER
        run = p.add_run(h_text)
        run.font.name = "Calibri"
        run.font.size = Pt(8.5)
        run.font.bold = True
        run.font.color.rgb = RGBColor(255, 255, 255)

    carreras_rows = [
        ("Ingeniería de Sistemas", "10° Semestre / Egresados", "Desarrollo Web Full-Stack, PostgreSQL, Docker, Scrum, IA y Arquitectura TI.", "Sistema Web de Gestión Académica y Reportes con Firma QR en Contenedores.", "Banco PyME Ecofuturo (Convenio USB-014)"),
        ("Derecho", "10° Semestre / Egresados", "Memoriales, Contratos Civiles/Comerciales, Trámites SEPREC, MASC y Litigación.", "Clínica Jurídica de Conciliación Extrajudicial y Contratos Comerciales Ley 2341.", "Cámara Nacional de Comercio — CNC (Convenio USB-008)"),
        ("Contaduría Pública", "10° Semestre / Egresados", "Estados Financieros NIIF, SIAT SIN, Planillas ROE/Gestora, Costos y Auditoría COSO.", "Legajo Completo de Auditoría Financiera y Declaración Tributaria Integral.", "Consultora Delta Auditores & Asoc. (Convenio USB-021)"),
        ("Gastronomía y Gestión", "8° Semestre / Egresados", "Inocuidad BPM, Costeo A&B, Fichas Técnicas, Alta Cocina y Gestión de Banquetes.", "Estandarización de 25 Recetas con Control de Mermas y Servicio para 120 pax.", "Hotel Casa Grande & Centro Convenciones (Convenio USB-019)"),
        ("Ingeniería Comercial", "8° Semestre / Egresados", "Investigación de Mercados, KPIs Power BI, Calidad ISO 9001 y Evaluación Proyectos.", "Plan Estratégico de Marketing, Embudo de Ventas y Manual de Procesos ISO.", "Grupo Industrial CBN / Dist. Andina (Convenio USB-032)"),
        ("Ciencias de la Educación", "9° Semestre / Egresados", "Diseño Curricular, Didáctica Virtual LMS/Moodle, Inclusión y Marco Lógico.", "Proyecto Socioeducativo de Adaptación Curricular y Aula Virtual por Competencias.", "Fundación Fe y Alegría / Obras Salesianas (Convenio USB-005)"),
        ("Psicomotricidad", "10° Semestre / Egresados", "Atención Temprana, Evaluación Neurodesarrollo, Test Psicomotores y Clínica.", "Protocolo de Balance Psicomotor Infantil y Plan Terapéutico Individualizado.", "Centro de Rehabilitación San Juan de Dios (Convenio USB-011)")
    ]

    for row_idx, row_data in enumerate(carreras_rows):
        row = t_carreras.rows[row_idx + 1]
        for col_idx, cell_value in enumerate(row_data):
            cell = row.cells[col_idx]
            set_cell_margins(cell, 60, 60, 80, 80)
            set_cell_shading(cell, "F8FAFC" if row_idx % 2 == 0 else "FFFFFF")
            p = cell.paragraphs[0]
            p.alignment = WD_ALIGN_PARAGRAPH.LEFT
            r = p.add_run(cell_value)
            r.font.name = "Calibri"
            r.font.size = Pt(8.5)
            r.font.color.rgb = DARK_GRAY

    widths = [Inches(1.2), Inches(0.9), Inches(1.8), Inches(1.7), Inches(1.4)]
    for row in t_carreras.rows:
        for idx, w in enumerate(widths):
            row.cells[idx].width = w

    doc.add_page_break()

    # -------------------------------------------------------------
    # 5. PROGRAMA MINUTO A MINUTO Y DESARROLLO METODOLÓGICO
    # -------------------------------------------------------------
    add_h1("5. Estructura Metodológica y Cronograma Minuto a Minuto")
    add_p("La jornada del viernes 13 de noviembre de 2026 en el Aula Magna está diseñada con una duración total de **120 minutos (2 horas reloj)**, estructurada en seis bloques secuenciales de alto dinamismo para mantener la concentración y participación activa del estudiantado:")

    t_cron = doc.add_table(rows=7, cols=5)
    t_cron.alignment = WD_TABLE_ALIGNMENT.CENTER
    cron_headers = ["Bloque", "Horario", "Duración", "Eje Temático / Actividad Principal", "Dinámica y Metodología"]
    
    for col_idx, h_text in enumerate(cron_headers):
        c = t_cron.rows[0].cells[col_idx]
        set_cell_margins(c, 80, 80, 80, 80)
        set_cell_shading(c, "002855")
        p = c.paragraphs[0]
        p.alignment = WD_ALIGN_PARAGRAPH.CENTER
        run = p.add_run(h_text)
        run.font.name = "Calibri"
        run.font.size = Pt(9)
        run.font.bold = True
        run.font.color.rgb = RGBColor(255, 255, 255)

    cron_rows = [
        ("Bloque 1", "18:30 - 18:45", "15 min", "Apertura Institucional, Mística Salesiana y Encuadre del Taller", "Acto protocolar, oración juvenil salesiana y presentación del dilema del primer empleo."),
        ("Bloque 2", "18:45 - 19:10", "25 min", "Conversatorio: «Anatomía de un Perfil Ganador y Filtros ATS»", "Diálogo interactivo con el auditorio, comparación de casos reales y valorización del portafolio."),
        ("Bloque 3", "19:10 - 19:40", "30 min", "Laboratorio en Vivo: Construcción del CV en 4 Pasos con PEIL-USB", "Taller masivo en smartphone: QR en ecran, carga de foto, malla, proyectos e IA con telemetría en vivo."),
        ("Bloque 4", "19:40 - 20:00", "20 min", "Simulador Práctico de Entrevistas de Trabajo: Técnica STAR", "Role-playing en escenario con voluntarios estudiantiles aplicando las preguntas generadas por IA."),
        ("Bloque 5", "20:00 - 20:15", "15 min", "Bolsa de Oportunidades, Convenios y Nivelación MOOC", "Presentación de vacantes reales en convenio, matching algorítmico y cursos en mooc.usalesiana.online."),
        ("Bloque 6", "20:15 - 20:30", "15 min", "Ronda de Preguntas, Reconocimiento ASU y Clausura", "Micrófono abierto, entrega de estímulos al asociacionismo salesiano y bendición de envío laboral.")
    ]

    for row_idx, row_data in enumerate(cron_rows):
        row = t_cron.rows[row_idx + 1]
        for col_idx, cell_value in enumerate(row_data):
            cell = row.cells[col_idx]
            set_cell_margins(cell, 60, 60, 80, 80)
            set_cell_shading(cell, "F8FAFC" if row_idx % 2 == 0 else "FFFFFF")
            p = cell.paragraphs[0]
            p.alignment = WD_ALIGN_PARAGRAPH.CENTER if col_idx in [0, 1, 2] else WD_ALIGN_PARAGRAPH.LEFT
            r = p.add_run(cell_value)
            r.font.name = "Calibri"
            r.font.size = Pt(8.5)
            r.font.color.rgb = DARK_GRAY

    cron_widths = [Inches(0.9), Inches(1.1), Inches(0.8), Inches(2.2), Inches(2.0)]
    for row in t_cron.rows:
        for idx, w in enumerate(cron_widths):
            row.cells[idx].width = w

    add_p("")
    add_h2("5.1. Desarrollo Detallado por Bloques")

    # Bloque 1
    add_h3("Bloque 1: Apertura Institucional, Mística Salesiana y Encuadre (18:30 - 18:45 | 15 min)")
    add_bullet(" Entrada de los participantes al Aula Magna con música instrumental salesiana de fondo. El equipo de edecanes y animadores de la Pastoral distribuye el programa de mano con el código QR de acceso a la red y a la plataforma.", bold_prefix="Recepción y Acreditación (5 min):")
    add_bullet(" A cargo del Delegado de Pastoral Universitaria o Sacerdote Salesiano. Se enfatiza el lema de Don Bosco: «El trabajo y la oración son las dos alas que elevan al joven hacia su realización humana y cristiana». Se encomienda la jornada a María Auxiliadora.", bold_prefix="Oración Inicial y Mística (3 min):")
    add_bullet(" Palabras breves de apertura por parte de las autoridades académicas (Vicerrectorado / Dirección de Carrera), destacando que la USB no solo gradúa profesionales, sino que los acompaña activamente en su inserción al trabajo digno.", bold_prefix="Mensaje de Autoridades (3 min):")
    add_bullet(" A cargo del facilitador principal (Ing. Danilo Chambi). Se lanza la pregunta disparadora al auditorio: «¿Quiénes de ustedes han sentido miedo de postular a una pasantía porque creen que no tienen experiencia?». Breve levantamiento de manos en la sala para encuadrar la solución del taller.", bold_prefix="Encuadre Provocador (4 min):")

    # Bloque 2
    add_h3("Bloque 2: Conversatorio «Anatomía de un Perfil Ganador y Filtros ATS» (18:45 - 19:10 | 25 min)")
    add_p("Este bloque desmitifica los errores habituales del postulante junior a través de un diálogo dinámico apoyado por diapositivas de alto impacto visual:")
    add_bullet(" Se proyecta en la pantalla gigante la anatomía de un CV tradicional saturado de errores (plantillas de Canva con barras de porcentaje subjetivas de «90% de inglés», formatos gráficos ilegibles, fuentes góticas, ausencia de logros concretos) frente a un CV Estructurado por Competencias.", bold_prefix="1. Anatomía Visual y Errores Fatales:")
    add_bullet(" Se explica con lenguaje accesible cómo operan los sistemas ATS que utilizan las entidades financieras, consultoras y grandes corporaciones en Bolivia (Banco Ecofuturo, CBN, empresas auditoras). Se demuestra por qué un CV gráfico es descartado por el robot en 3 segundos y por qué un CV con jerarquía de texto y taxonomía ESCO supera la primera fase con éxito.", bold_prefix="2. El Monstruo del Algoritmo ATS:")
    add_bullet(" Se enseña la fórmula de redacción de impacto: [Verbo de Acción en Infinitivo/Pasado] + [Materia o Herramienta Tecnológica Aplicada] + [Problema Resuelto o Entregable Real]. Se analizan ejemplos para Sistemas, Derecho, Gastronomía, etc.", bold_prefix="3. La Traducción de Proyectos de Aula en Logros:")
    add_bullet(" El facilitador expone el valor diferencial de la USB: las empresas no solo buscan técnicos fríos, sino personas con inteligencia socioemocional, trabajo en equipo y honestidad a toda prueba. Se explica el respaldo del Art. 28 de la Ley N° 342 y cómo certificar el voluntariado pastoral en el currículum formal.", bold_prefix="4. El Valor Curricular de la Pastoral:")

    # Bloque 3
    add_h3("Bloque 3: Laboratorio en Vivo «Construcción con PEIL-USB» (19:10 - 19:40 | 30 min) [HITO CENTRAL]")
    add_p("Es el momento culminante del taller. Toda la audiencia saca su teléfono móvil para interactuar con la plataforma:")
    add_bullet(" Se ilumina en el ecran central un código QR gigante de alta densidad acompañado de la URL directa `http://...`. El facilitador indica: «Escaneen el código desde sus butacas; no necesitan instalar ninguna app de la tienda, funciona directo en su navegador».", bold_prefix="1. Escaneo Masivo del Código QR (2 min):")
    add_bullet(" El estudiante ingresa su correo institucional o personal, nombre completo, teléfono y su Registro Universitario (RU). El sistema activa de inmediato la recuperación automática si el estudiante ya tenía datos previos. A continuación, utiliza la cámara del celular para tomarse una fotografía formal o subir una imagen de su galería, la cual es recortada y optimizada automáticamente en formato retrato 5:6 por el navegador.", bold_prefix="2. Paso 1 — Identidad y Carrera (5 min):")
    add_bullet(" Al elegir su carrera y semestre, la plataforma despliega automáticamente las materias troncales vencidas y las competencias técnicas oficiales de la taxonomía ESCO. El estudiante selecciona las habilidades que domina y marca sus competencias transversales salesianas e idiomas.", bold_prefix="3. Paso 2 — Malla y Competencias (6 min):")
    add_bullet(" El estudiante describe su mejor proyecto formativo (título, materia y entregable) y marca sus horas de participación en Oratorios, Voluntariado ASU, Centros de Estudiantes o Misiones Solidarias.", bold_prefix="4. Paso 3 — Proyectos y Pastoral (6 min):")
    add_bullet(" El estudiante elige su meta (Pasantía, Trabajo Dirigido o Empleo Junior) y la vacante de su interés. Al presionar el botón «Generar con IA», el motor institucional (Google Gemini 2.5 Flash / Motor Experto) redacta en 2 segundos el perfil profesional formal, la carta de presentación y 4 preguntas STAR con respuestas recomendadas.", bold_prefix="5. Paso 4 — Generación IA y Descarga (5 min):")
    add_bullet(" Mientras los estudiantes interactúan, la pantalla gigante del Aula Magna conmuta al «Modo Telemetría en Vivo», proyectando los KPIs actualizados en tiempo real: contador de estudiantes registrados, total de CVs emitidos, barra comparativa por carrera y sellos criptográficos generados. Los estudiantes descargan su CV en PDF con código QR y su versión ATS directamente a sus teléfonos.", bold_prefix="6. Telemetría y Descarga Simultánea (6 min):")

    # Bloque 4
    add_h3("Bloque 4: Simulación de Entrevistas de Trabajo: Técnica STAR (19:40 - 20:00 | 20 min)")
    add_p("Este bloque entrena la comunicación oral y el desempeño en la entrevista de selección:")
    add_bullet(" El facilitador explica los 4 componentes de la técnica recomendada por reclutadores internacionales: **S**ituación (el contexto del problema), **T**area (el reto específico asignado), **A**cción (lo que el estudiante hizo directamente) y **R**esultado (el impacto positivo medible).", bold_prefix="1. Metodología STAR (5 min):")
    add_bullet(" Se invita al escenario a dos estudiantes voluntarios de distintas carreras de último semestre. El facilitador simula una entrevista real utilizando las preguntas STAR que la plataforma PEIL-USB les acaba de generar en sus celulares.", bold_prefix="2. Dinámica de Role-Playing en Escenario (10 min):")
    add_bullet(" Retroalimentación inmediata con participación del auditorio: postura corporal, contacto visual, tono de voz asertivo y cómo convertir un proyecto de aula o una experiencia en el Oratorio en una respuesta contundente de liderazgo y resolución de problemas.", bold_prefix="3. Feedback en Vivo y Buenas Prácticas (5 min):")

    # Bloque 5
    add_h3("Bloque 5: Bolsa de Oportunidades, Convenios y Nivelación MOOC (20:00 - 20:15 | 15 min)")
    add_bullet(" Presentación de las oportunidades vigentes cargadas en el sistema para las carreras participantes (Banco Ecofuturo, CNC, Delta Auditores, Hotel Casa Grande, CBN, Fe y Alegría, San Juan de Dios). Se explica el candado institucional: toda pasantía debe fluir por convenio formal para proteger legalmente al estudiante.", bold_prefix="1. El Candado de Convenios USB (5 min):")
    add_bullet(" Demostración de cómo el algoritmo de PEIL-USB calcula el Índice de Compatibilidad ($IC$) comparando el perfil del estudiante con los requisitos de la vacante, mostrando el porcentaje de ajuste en tiempo real.", bold_prefix="2. Matching Algorítmico (5 min):")
    add_bullet(" Se muestra la conexión pedagógica de PEIL-USB con la plataforma `mooc.usalesiana.online`: si a un estudiante le falta una competencia para alcanzar el 100% (ej. Docker en Sistemas, SICOES en Derecho, Power BI en Comercial o HACCP en Gastronomía), el sistema le recomienda el curso virtual gratuito para cerrar su brecha y postular con éxito.", bold_prefix="3. Cierre de Brechas con MOOC (5 min):")

    # Bloque 6
    add_h3("Bloque 6: Ronda de Preguntas, Reconocimiento ASU y Clausura (20:15 - 20:30 | 15 min)")
    add_bullet(" Espacio para resolver dudas del auditorio sobre homologación de horas de trabajo dirigido, registro de certificados y postulación a vacantes.", bold_prefix="1. Plenaria Abierta (6 min):")
    add_bullet(" Mención especial y entrega de incentivos institucionales al Asociacionismo Salesiano Universitario (ASU) y a los estudiantes que obtuvieron puntajes de compatibilidad destacados en la jornada.", bold_prefix="2. Reconocimiento al Voluntariado (4 min):")
    add_bullet(" Palabras finales a cargo de la Dirección de Pastoral y Vicerrectorado. Bendición de envío a los futuros profesionales para que salgan a transformar el país con profesionalismo y testimonio salesiano.", bold_prefix="3. Clausura y Bendición de Envío (5 min):")

    doc.add_page_break()

    # -------------------------------------------------------------
    # 6. ESPECIFICACIÓN TÉCNICA DE LA PLATAFORMA PEIL-USB EN VIVO
    # -------------------------------------------------------------
    add_h1("6. Especificación Técnica de la Plataforma PEIL-USB para el Aula Magna")
    add_p("Para asegurar que la experiencia masiva en el Aula Magna sea un éxito absoluto y no sufra demoras ni caídas de servidor, la arquitectura técnica de PEIL-USB ha sido dotada de especificaciones de alta resiliencia:")

    add_bullet(" El 95% de los asistentes utilizará teléfonos inteligentes. Toda la interfaz gráfica está desarrollada bajo el principio Mobile-First, utilizando CSS semántico puro sin frameworks pesados, garantizando un peso de carga inicial inferior a 60 KB y tiempos de respuesta ultrarrápidos.", bold_prefix="Arquitectura Ultraligera Mobile-First:")
    add_bullet(" La fotografía que sube el estudiante no viaja en peso bruto al servidor. Una rutina en JavaScript `<canvas>` recorta la imagen en proporción retrato 5:6 centrada y la comprime en JPEG de 320x384 píxeles (~20 KB), reduciendo el consumo de ancho de banda del auditorio en un 98%.", bold_prefix="Compresión y Recorte de Foto en Cliente:")
    add_bullet(" El sistema conecta con la API de Google Gemini (modelo `gemini-2.5-flash`) mediante structured outputs (`responseSchema`). Cuenta además con fallback automático a `gemini-1.5-flash` y, como seguro de vida para el evento, con el **Motor Experto Institucional Determinista (0 ms de latencia)**, el cual genera los documentos al 100% sin requerir internet si la red externa sufriera saturación.", bold_prefix="Motor de Inteligencia Artificial Híbrido:")
    add_bullet(" El sistema incluye un tablero de proyección exclusivo para el proyector principal del Aula Magna (`/` tab 4), que consulta la base de datos en intervalos asíncronos y proyecta en tiempo real los KPIs de registro sin interferir con la navegación de los teléfonos.", bold_prefix="Módulo de Proyección y Telemetría en Tiempo Real:")
    add_bullet(" Cada CV generado incorpora un sello QR vectorizado en SVG ISO/IEC 18004. Al escanearlo con cualquier cámara, dirige a `/verificar/:uuid`, desplegando el certificado de perfil verificado con fotografía, carrera, semestre, RU y competencias asociadas, garantizando total inviolabilidad documental frente a las empresas.", bold_prefix="Verificación Criptográfica Pública (QR):")

    # -------------------------------------------------------------
    # 7. REQUERIMIENTOS LOGÍSTICOS, TÉCNICOS Y DE ESCENARIO
    # -------------------------------------------------------------
    add_h1("7. Requerimientos Logísticos, Técnicos y de Escenario")

    add_h2("7.1. Requerimientos de Espacio y Mobiliario (Aula Magna)")
    add_bullet(" Habilitación y limpieza de las butacas del auditorio con capacidad para 350 personas.", bold_prefix="Capacidad de Butacas:")
    add_bullet(" Mesa principal con mantel institucional azul USB y 4 sillas para autoridades / moderación.", bold_prefix="Escenario y Mesa Principal:")
    add_bullet(" Atril con iluminación focalizada y logotipo de la USB para las exposiciones del facilitador.", bold_prefix="Atril de Exposición:")
    add_bullet(" 2 mesas en los laterales del escenario para la dinámica de role-playing y simulación de entrevistas.", bold_prefix="Espacio de Simulación STAR:")

    add_h2("7.2. Requerimientos Audiovisuales y Tecnológicos")
    add_bullet(" Proyector multimedia de alta luminosidad (mínimo 5.000 lúmenes) conectado a la laptop principal del facilitador mediante cable HDMI de alta velocidad, proyectando sobre el ecran central gigante.", bold_prefix="Proyección Ecran Principal:")
    add_bullet(" 1 micrófono inalámbrico de solapa (o vincha) para el facilitador principal, 2 micrófonos inalámbricos de mano para las autoridades y las intervenciones del auditorio, y 1 micrófono fijo en el atril.", bold_prefix="Sistema de Audio y Microfonía:")
    add_bullet(" Monitor o pantalla de retorno en el suelo del escenario para que el facilitador visualice el tiempo y los resultados de la plataforma sin voltear la espalda al público.", bold_prefix="Monitor de Retorno:")
    add_bullet(" Iluminación tenue en la zona de butacas que permita ver la pantalla del celular y luz cenital destacada sobre el escenario.", bold_prefix="Iluminación:")

    add_h2("7.3. Requerimientos de Red y Conectividad")
    add_bullet(" Configuración prioritaria del punto de acceso WiFi del Aula Magna (`SSID: USB-Eventos` o similar) con ancho de banda balanceado para soportar 200 conexiones concurrentes.", bold_prefix="Punto de Acceso WiFi Dedicado:")
    add_bullet(" La plataforma está optimizada para operar perfectamente sobre redes 4G/LTE de Entel, Tigo y Viva, permitiendo que los estudiantes sin WiFi utilicen sus propios datos móviles sin consumir más de 1 MB en toda la sesión.", bold_prefix="Compatibilidad Móvil 4G/LTE:")
    add_bullet(" 2 pendones laterales en el ingreso y 4 afiches en los pasillos con el código QR impreso en alta definición para agilizar el acceso de quienes ingresen cuando las luces del auditorio se atenúen.", bold_prefix="Material QR Físico Impreso:")

    # -------------------------------------------------------------
    # 8. MATRIZ DE GOBERNANZA, ROLES Y RESPONSABILIDADES (RACI)
    # -------------------------------------------------------------
    add_h1("8. Matriz de Gobernanza, Roles y Responsabilidades (RACI)")
    add_p("Para garantizar una coordinación impecable antes, durante y después del evento, se define la siguiente matriz de asignación de responsabilidades:")

    t_raci = doc.add_table(rows=8, cols=6)
    t_raci.alignment = WD_TABLE_ALIGNMENT.CENTER
    raci_headers = ["Fase / Actividad Operativa", "Facilitador (Ing. Sistemas)", "Pastoral (ASU)", "Direcciones de Carrera", "TI / Redes", "Protocolo"]
    
    for col_idx, h_text in enumerate(raci_headers):
        c = t_raci.rows[0].cells[col_idx]
        set_cell_margins(c, 70, 70, 70, 70)
        set_cell_shading(c, "002855")
        p = c.paragraphs[0]
        p.alignment = WD_ALIGN_PARAGRAPH.CENTER
        run = p.add_run(h_text)
        run.font.name = "Calibri"
        run.font.size = Pt(8.5)
        run.font.bold = True
        run.font.color.rgb = RGBColor(255, 255, 255)

    raci_rows = [
        ("Convocatoria y difusión masiva a todas las carreras de la USB", "C", "R", "A", "I", "C"),
        ("Despliegue y pruebas de carga en servidor Dokploy", "A / R", "I", "I", "C", "I"),
        ("Preparación y prueba de WiFi en el Aula Magna", "C", "I", "I", "A / R", "I"),
        ("Acreditación y entrega de programas QR en puerta", "I", "C", "I", "I", "A / R"),
        ("Conducción pedagógica y taller interactivo en vivo", "A / R", "C", "C", "I", "I"),
        ("Simulación de entrevistas STAR en escenario", "A / R", "C", "C", "I", "I"),
        ("Sistematización y reporte post-evento al Rectorado", "A / R", "C", "C", "I", "I")
    ]

    for row_idx, row_data in enumerate(raci_rows):
        row = t_raci.rows[row_idx + 1]
        for col_idx, cell_value in enumerate(row_data):
            cell = row.cells[col_idx]
            set_cell_margins(cell, 60, 60, 70, 70)
            set_cell_shading(cell, "F8FAFC" if row_idx % 2 == 0 else "FFFFFF")
            p = cell.paragraphs[0]
            p.alignment = WD_ALIGN_PARAGRAPH.LEFT if col_idx == 0 else WD_ALIGN_PARAGRAPH.CENTER
            r = p.add_run(cell_value)
            r.font.name = "Calibri"
            r.font.size = Pt(8.5)
            r.font.color.rgb = DARK_GRAY

    raci_widths = [Inches(2.4), Inches(1.1), Inches(0.9), Inches(1.0), Inches(0.8), Inches(0.8)]
    for row in t_raci.rows:
        for idx, w in enumerate(raci_widths):
            row.cells[idx].width = w

    add_p("A = Aprobador Final (Accountable) | R = Responsable Ejecutor (Responsible) | C = Consultado (Consulted) | I = Informado (Informed)", bold_prefix="Leyenda RACI: ", space_after=10)

    doc.add_page_break()

    # -------------------------------------------------------------
    # 9. GESTIÓN DE RIESGOS Y PLAN DE CONTINGENCIA
    # -------------------------------------------------------------
    add_h1("9. Gestión Integral de Riesgos y Plan de Contingencia")
    add_p("Para blindar el conversatorio-taller contra cualquier imprevisto técnico o logístico, se ha diseñado una matriz de contingencia que prevé soluciones automáticas:")

    t_risk = doc.add_table(rows=6, cols=4)
    t_risk.alignment = WD_TABLE_ALIGNMENT.CENTER
    risk_headers = ["Escenario de Riesgo", "Probabilidad / Impacto", "Medida Preventiva", "Plan de Acción Inmediato (Contingencia)"]
    
    for col_idx, h_text in enumerate(risk_headers):
        c = t_risk.rows[0].cells[col_idx]
        set_cell_margins(c, 80, 80, 80, 80)
        set_cell_shading(c, "002855")
        p = c.paragraphs[0]
        p.alignment = WD_ALIGN_PARAGRAPH.CENTER
        run = p.add_run(h_text)
        run.font.name = "Calibri"
        run.font.size = Pt(8.5)
        run.font.bold = True
        run.font.color.rgb = RGBColor(255, 255, 255)

    risk_rows = [
        ("Saturación o caída del WiFi del Aula Magna", "Media / Alta", "Optimización de la app (<60 KB). Servidor con compresión gzip/brotli.", "Instruir al auditorio el uso de sus datos 4G (consumo <1 MB). El sistema corre de forma nativa."),
        ("Fallo de cuota o latencia en la API externa de IA", "Baja / Crítica", "Preconfiguración de llaves de respaldo (Gemini 2.5 Flash + fallback 1.5).", "Conmutación en 0 ms al Motor Experto Institucional Determinista; los CVs se generan de inmediato sin error."),
        ("Estudiantes sin batería o sin teléfono inteligente", "Media / Media", "Exhortar en la convocatoria a asistir con teléfono cargado al 100%.", "Habilitación de 2 laptops en los laterales del escenario y trabajo en parejas (co-working salesiano)."),
        ("Estudiantes rezagados que ingresan tarde al auditorio", "Alta / Baja", "Impresión de afiches QR físicos colocados en los respaldos de las butacas.", "Los rezagados escanean el QR desde su butaca e ingresan al asistente sin interrumpir la ponencia."),
        ("Fallo eléctrico en el proyector o ecran principal", "Baja / Alta", "Revisión técnica previa con el equipo de infraestructura de la USB.", "Conducción verbal apoyada en el sistema de audio; los estudiantes siguen el taller directo en sus teléfonos.")
    ]

    for row_idx, row_data in enumerate(risk_rows):
        row = t_risk.rows[row_idx + 1]
        for col_idx, cell_value in enumerate(row_data):
            cell = row.cells[col_idx]
            set_cell_margins(cell, 60, 60, 80, 80)
            set_cell_shading(cell, "F8FAFC" if row_idx % 2 == 0 else "FFFFFF")
            p = cell.paragraphs[0]
            p.alignment = WD_ALIGN_PARAGRAPH.LEFT
            r = p.add_run(cell_value)
            r.font.name = "Calibri"
            r.font.size = Pt(8.5)
            r.font.color.rgb = DARK_GRAY

    risk_widths = [Inches(1.8), Inches(1.1), Inches(2.0), Inches(2.1)]
    for row in t_risk.rows:
        for idx, w in enumerate(risk_widths):
            row.cells[idx].width = w

    # -------------------------------------------------------------
    # 10. EVALUACIÓN, INDICADORES (KPIS) Y ENTREGABLES POST-EVENTO
    # -------------------------------------------------------------
    add_h1("10. Evaluación, Indicadores de Impacto (KPIs) y Entregables Post-Evento")

    add_h2("10.1. Indicadores Clave de Éxito de la Jornada")
    add_bullet(" Número total de estudiantes de último semestre registrados con RU en la base de datos de PEIL-USB durante las 2 horas del evento (Meta: >= 250).", bold_prefix="KPI 1 — Tasa de Adopción Digital en Último Semestre:")
    add_bullet(" Cantidad de Currículums Vitae en PDF y cartas de presentación descargadas en los dispositivos móviles de los asistentes (Meta: >= 220).", bold_prefix="KPI 2 — Rendimiento Documental:")
    add_bullet(" Porcentaje de perfiles que acreditaron al menos una actividad pastoral (Oratorio, ASU, Misiones, Centro de Estudiantes) bajo la Ley N° 342 (Meta: >= 40%).", bold_prefix="KPI 3 — Reconocimiento Pastoral Curricular:")
    add_bullet(" Porcentaje de estudiantes que reportan sentirse «altamente preparados» o «preparados» para una entrevista de trabajo tras el ejercicio STAR (Meta: >= 85%).", bold_prefix="KPI 4 — Eficacia en Entrevistas STAR:")
    add_bullet(" Cero caídas del servidor y latencia promedio de generación documental inferior a 3 segundos.", bold_prefix="KPI 5 — Estabilidad Tecnológica:")

    add_h2("10.2. Entregables Institucionales Post-Evento para el Consejo Académico y Rectoral")
    add_p("Al concluir la jornada del viernes 13 de noviembre, la Dirección de la Carrera de Ingeniería de Sistemas y el equipo técnico de PEIL-USB entregarán a las máximas autoridades de la universidad:")

    add_bullet(" Listado consolidado y auditable de los estudiantes registrados de las diferentes carreras de la USB, ordenados por carrera, semestre, RU y competencias técnicas declaradas.", bold_prefix="1. Padrón Institucional de Talentos USB:")
    add_bullet(" Informe analítico que identifique qué competencias de la taxonomía ESCO fueron las más seleccionadas por los estudiantes y cuáles presentaron mayores vacíos respecto a las ofertas de empleo en convenio, constituyendo un insumo científico invaluable para los Comités de Rediseño Curricular.", bold_prefix="2. Mapeo Estadístico de Brechas de Habilidades:")
    add_bullet(" Archivo de trazabilidad que almacena los sellos criptográficos QR emitidos, permitiendo a las empresas e instituciones que tienen convenios con la USB verificar la autenticidad de los postulantes de manera indefinida.", bold_prefix="3. Repositorio de Perfiles Verificados:")
    add_bullet(" Documento de lecciones aprendidas y cronograma de despliegue para la Fase 2 de PEIL-USB (habilitación del portal exclusivo para empresas contrapartes y sincronización directa con el Sistema Académico central de la USB).", bold_prefix="4. Hoja de Ruta para la Fase 2:")

    # -------------------------------------------------------------
    # CONCLUSIÓN INSTITUCIONAL Y FIRMAS
    # -------------------------------------------------------------
    add_h1("Conclusión y Solicitud de Aprobación")
    add_p("El conversatorio-taller del viernes 13 de noviembre en el Aula Magna no es un evento aislado ni una charla motivacional pasajera; representa el punto de partida operativo para transformar la empleabilidad en la Universidad Salesiana de Bolivia. Al convocar a los estudiantes de todas las carreras de la institución y concentrar los esfuerzos en quienes cursan su último semestre de formación, la universidad brinda una respuesta concreta a la angustia del primer empleo.")

    add_p("Poner en manos de los futuros egresados una herramienta moderna, ética y potente como PEIL-USB hace honor a la promesa salesiana de formar «buenos cristianos y honrados ciudadanos» capaces de insertarse con éxito, dignidad y liderazgo en el tejido productivo del país.")

    add_p("Por todo lo expuesto, se solicita formalmente al Consejo Académico y a las autoridades universitarias la aprobación del presente documento técnico R-1041, autorizando la coordinación logística, tecnológica y pastoral para el exitoso desarrollo de la jornada.")

    doc.add_paragraph().paragraph_format.space_after = Pt(25)

    # Bloque de Firmas
    t_firmas = doc.add_table(rows=2, cols=2)
    t_firmas.alignment = WD_TABLE_ALIGNMENT.CENTER
    c_f0 = t_firmas.cell(0, 0)
    c_f1 = t_firmas.cell(0, 1)
    c_f0.width = Inches(3.5)
    c_f1.width = Inches(3.5)

    p_f0 = c_f0.paragraphs[0]
    p_f0.alignment = WD_ALIGN_PARAGRAPH.CENTER
    r_f0 = p_f0.add_run("_________________________________________\nIng. Danilo Chambi, Ph.D.\nProyectista / Facilitador Principal\nDirección Carrera de Ingeniería de Sistemas\nUniversidad Salesiana de Bolivia")
    r_f0.font.name = "Calibri"
    r_f0.font.size = Pt(9)
    r_f0.font.color.rgb = DARK_GRAY

    p_f1 = c_f1.paragraphs[0]
    p_f1.alignment = WD_ALIGN_PARAGRAPH.CENTER
    r_f1 = p_f1.add_run("_________________________________________\nMSc. Eusebio Marcial Riveros Tito\nDirector del Servicio Integral de Formación\nHumana Cristiana y Proyección Institucional\nUniversidad Salesiana de Bolivia")
    r_f1.font.name = "Calibri"
    r_f1.font.size = Pt(9)
    r_f1.font.color.rgb = DARK_GRAY

    c_f2 = t_firmas.cell(1, 0)
    c_f3 = t_firmas.cell(1, 1)
    p_f2 = c_f2.paragraphs[0]
    p_f2.alignment = WD_ALIGN_PARAGRAPH.CENTER
    p_f2.paragraph_format.space_before = Pt(20)
    r_f2 = p_f2.add_run("_________________________________________\nAbg. Gabriela Alejandra Gallo Chacón\nVicerrectora Académica y de Investigación\nUniversidad Salesiana de Bolivia")
    r_f2.font.name = "Calibri"
    r_f2.font.size = Pt(9)
    r_f2.font.color.rgb = DARK_GRAY

    p_f3 = c_f3.paragraphs[0]
    p_f3.alignment = WD_ALIGN_PARAGRAPH.CENTER
    p_f3.paragraph_format.space_before = Pt(20)
    r_f3 = p_f3.add_run("_________________________________________\nP. Marcelo Miguel Escalante Mendoza, SDB.\nRector\nUniversidad Salesiana de Bolivia")
    r_f3.font.name = "Calibri"
    r_f3.font.size = Pt(9)
    r_f3.font.color.rgb = DARK_GRAY

    doc.save(OUTPUT_PATH)
    print(f"Documento regenerado exitosamente en: {OUTPUT_PATH}")

if __name__ == "__main__":
    create_document()
