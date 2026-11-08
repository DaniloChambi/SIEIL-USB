-- Esquema Relacional y Vectorial de Producción (PostgreSQL 16 + pgvector)
-- Propuesta R-1041: Sistema de Información, Empleabilidad e Intermediación Laboral (SIEIL-USB)

CREATE EXTENSION IF NOT EXISTS vector;

CREATE TABLE IF NOT EXISTS convenios_interinstitucionales (
  id SERIAL PRIMARY KEY,
  codigo_convenio VARCHAR(64) UNIQUE NOT NULL,
  razon_social VARCHAR(255) NOT NULL,
  nit VARCHAR(32) NOT NULL,
  matricula_seprec VARCHAR(64),
  roe VARCHAR(64),
  estado VARCHAR(24) NOT NULL DEFAULT 'VIGENTE',
  habilitacion_agil_junior BOOLEAN NOT NULL DEFAULT FALSE,
  fecha_suscripcion DATE NOT NULL,
  fecha_vencimiento DATE NOT NULL,
  modalidades_habilitadas JSONB NOT NULL DEFAULT '["PASANTIA", "TRABAJO_DIRIGIDO", "PROYECTO_GRADO", "EMPLEO_JUNIOR"]'::jsonb,
  creado_en TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS estudiantes_titulados (
  id SERIAL PRIMARY KEY,
  uuid VARCHAR(64) UNIQUE NOT NULL,
  matricula VARCHAR(64) UNIQUE,
  nombre_completo VARCHAR(180) NOT NULL,
  email VARCHAR(180) UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  telefono VARCHAR(40),
  carrera_id VARCHAR(64) NOT NULL,
  semestre INTEGER NOT NULL,
  mencion VARCHAR(180),
  visibilidad VARCHAR(24) NOT NULL DEFAULT 'activa',
  perfil_json JSONB NOT NULL DEFAULT '{}'::jsonb,
  carpeta_ia_json JSONB NOT NULL DEFAULT '{}'::jsonb,
  embedding_perfil vector(768),
  cv_generados_count INTEGER NOT NULL DEFAULT 0,
  creado_en TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  actualizado_en TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_estudiantes_carrera ON estudiantes_titulados(carrera_id);
CREATE INDEX IF NOT EXISTS idx_convenios_vigencia ON convenios_interinstitucionales(estado, fecha_vencimiento);
