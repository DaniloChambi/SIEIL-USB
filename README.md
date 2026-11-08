# PEIL-USB (Plataforma de Empleabilidad e Intermediación Laboral)
**Universidad Salesiana de Bolivia — Propuesta R-1041**

Plataforma institucional de empleabilidad para estudiantes y titulados de la USB. Permite registrarse, estructurar competencias técnicas según el pensum oficial y taxonomía ESCO, reconocer actividades pastorales al amparo del Art. 28 de la Ley N° 342, y generar automáticamente:
1. **CV Institucional con código QR de verificación en tiempo real**
2. **CV Optimizado para ATS**
3. **Carta de Presentación formal adaptada**
4. **Simulador / Guía de entrevista bajo metodología STAR**
5. **Matching con Bolsa de Oportunidades y detección de brechas con Open edX (`mooc.usalesiana.online`)**
6. **Modo Proyección en Vivo para el Aula Magna**

---

## 🚀 Despliegue con Dokploy

Esta aplicación está 100% contenerizada y no requiere servicios externos obligatorios para arrancar.

### 1. Despliegue como "Application" (Dockerfile)
En tu panel de Dokploy:
1. Selecciona tu proyecto y crea una nueva **Application**.
2. Vincula tu repositorio de GitHub: `tu-usuario/SIEIL-ant` (o el nombre que le des).
3. En **Build Type**, selecciona **Dockerfile**.
4. En **Port**, coloca: `3000`.
5. En **Environment Variables**, configura (opcional si usas Gemini/OpenAI):
   ```env
   PORT=3000
   GEMINI_API_KEY=tu_api_key_de_gemini
   OPENAI_API_KEY=tu_api_key_de_openai
   ```
6. En **Volumes / Mounts** (para persistir los datos de registros entre redespliegues):
   - **Mount Type**: Volume (o Bind mount de host)
   - **Path en contenedor**: `/app/data`
7. Configura tu dominio o subdominio (ej: `empleabilidad.usalesiana.online` o el que uses en Dokploy) con certificado SSL automático (Let's Encrypt).
8. Haz clic en **Deploy**.

### 2. Despliegue con Docker Compose en Dokploy
Si prefieres crear un servicio tipo **Compose** en Dokploy:
- Utiliza el archivo `docker-compose.yml` del repositorio.

---

## 💻 Ejecución Local

Requiere Node.js `>= 22.5.0` (incluye SQLite nativo y servidor HTTP sin dependencias npm pesadas).

```bash
# Iniciar servidor
npm start

# Modo desarrollo con auto-reload
npm run dev
```

Abrir en el navegador: [http://localhost:3000](http://localhost:3000)

---

## 🏛️ Carreras Integradas en el Pensum
- Ingeniería de Sistemas
- Derecho
- Contaduría Pública
- Gastronomía y Gestión de Restaurantes
- Ingeniería Comercial
- Ciencias de la Educación
- Psicomotricidad
