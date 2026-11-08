import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const avatarsDir = path.join(__dirname, "..", "public", "avatars");
if (!fs.existsSync(avatarsDir)) {
  fs.mkdirSync(avatarsDir, { recursive: true });
}

function createStudioHeadshot({
  id,
  bgStart = "#e2e8f0",
  bgEnd = "#94a3b8",
  skin = "#f5d0b5",
  skinShadow = "#e2b291",
  hairColor = "#1e293b",
  hairType = "short", // "long-straight", "long-wavy", "short", "updo", "chef"
  clothingType = "suit", // "suit", "blazer-w", "chef", "polo", "glasses-blazer"
  tieColor = "#b91c1c",
  shirtColor = "#ffffff",
  jacketColor = "#0f172a",
  accessories = null
}) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 360" width="300" height="360">
  <defs>
    <linearGradient id="bg-${id}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${bgStart}"/>
      <stop offset="100%" stop-color="${bgEnd}"/>
    </linearGradient>
    <linearGradient id="skin-${id}" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="${skin}"/>
      <stop offset="100%" stop-color="${skinShadow}"/>
    </linearGradient>
    <linearGradient id="jacket-${id}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${jacketColor}"/>
      <stop offset="100%" stop-color="#020617"/>
    </linearGradient>
    <filter id="shadow-${id}" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="4" stdDeviation="4" flood-opacity="0.15"/>
    </filter>
  </defs>

  <!-- Fondo de estudio formal -->
  <rect width="300" height="360" fill="url(#bg-${id})" rx="12"/>
  <circle cx="150" cy="140" r="110" fill="#ffffff" opacity="0.18"/>

  <!-- Pelo trasero si es largo -->
  ${hairType === "long-straight" ? `<path d="M 85 120 C 80 180 75 250 80 270 C 95 275 110 250 110 220 L 190 220 C 190 250 205 275 220 270 C 225 250 220 180 215 120 Z" fill="${hairColor}"/>` : ""}
  ${hairType === "long-wavy" ? `<path d="M 80 120 C 70 190 70 260 85 275 C 100 275 105 240 105 210 L 195 210 C 195 240 200 275 215 275 C 230 260 230 190 220 120 Z" fill="${hairColor}"/>` : ""}

  <!-- Cuello y hombros base -->
  <path d="M 125 185 L 125 230 Q 150 245 175 230 L 175 185 Z" fill="url(#skin-${id})"/>
  <!-- Sombra cuello -->
  <path d="M 125 195 Q 150 215 175 195 Q 150 225 125 195 Z" fill="${skinShadow}" opacity="0.6"/>

  <!-- Ropa según profesión -->
  ${clothingType === "suit" ? `
    <!-- Traje formal masculino con corbata -->
    <path d="M 40 360 C 45 285 85 245 130 235 L 170 235 C 215 245 255 285 260 360 Z" fill="url(#jacket-${id})"/>
    <!-- Camisa blanca -->
    <polygon points="130,235 170,235 185,320 115,320" fill="${shirtColor}"/>
    <polygon points="126,235 150,265 138,245" fill="#e2e8f0"/>
    <polygon points="174,235 150,265 162,245" fill="#e2e8f0"/>
    <!-- Corbata -->
    <polygon points="144,260 156,260 160,340 150,355 140,340" fill="${tieColor}"/>
    <!-- Cuello de camisa -->
    <polygon points="125,235 145,262 135,262 118,240" fill="#ffffff" filter="url(#shadow-${id})"/>
    <polygon points="175,235 155,262 165,262 182,240" fill="#ffffff" filter="url(#shadow-${id})"/>
    <!-- Solapas del saco -->
    <path d="M 70 360 L 125 250 L 140 300 L 90 360 Z" fill="${jacketColor}" filter="url(#shadow-${id})"/>
    <path d="M 230 360 L 175 250 L 160 300 L 210 360 Z" fill="${jacketColor}" filter="url(#shadow-${id})"/>
  ` : ""}

  ${clothingType === "blazer-w" ? `
    <!-- Blazer formal femenino -->
    <path d="M 40 360 C 45 280 85 245 125 235 L 175 235 C 215 245 255 280 260 360 Z" fill="url(#jacket-${id})"/>
    <!-- Blusa / Top interior -->
    <path d="M 125 235 Q 150 280 175 235 L 185 360 L 115 360 Z" fill="${shirtColor}"/>
    <!-- Collar elegante -->
    <circle cx="150" cy="245" r="4" fill="#fbbf24"/>
    <!-- Solapas blazer estilizadas -->
    <path d="M 70 360 L 125 240 L 145 320 L 80 360 Z" fill="${jacketColor}" filter="url(#shadow-${id})"/>
    <path d="M 230 360 L 175 240 L 155 320 L 220 360 Z" fill="${jacketColor}" filter="url(#shadow-${id})"/>
  ` : ""}

  ${clothingType === "glasses-blazer" ? `
    <!-- Blazer formal con blusa ejecutiva -->
    <path d="M 40 360 C 45 280 85 245 125 235 L 175 235 C 215 245 255 280 260 360 Z" fill="url(#jacket-${id})"/>
    <polygon points="125,235 175,235 165,360 135,360" fill="${shirtColor}"/>
    <polygon points="125,235 150,265 120,250" fill="#f8fafc"/>
    <polygon points="175,235 150,265 180,250" fill="#f8fafc"/>
    <path d="M 65 360 L 125 240 L 140 310 L 80 360 Z" fill="${jacketColor}" filter="url(#shadow-${id})"/>
    <path d="M 235 360 L 175 240 L 160 310 L 220 360 Z" fill="${jacketColor}" filter="url(#shadow-${id})"/>
  ` : ""}

  ${clothingType === "chef" ? `
    <!-- Filipina de Chef blanca profesional -->
    <path d="M 40 360 C 45 280 85 240 120 230 L 180 230 C 215 240 255 280 260 360 Z" fill="#ffffff" filter="url(#shadow-${id})"/>
    <!-- Cuello cruzado y botones dobles -->
    <path d="M 115 230 L 185 230 L 170 360 L 100 360 Z" fill="#f8fafc"/>
    <path d="M 120 230 L 180 270 L 155 360 L 95 360 Z" fill="#ffffff"/>
    <path d="M 120 230 Q 150 250 180 230" stroke="#002855" stroke-width="4" fill="none"/>
    <!-- Pañuelo de cuello rojo gastronómico -->
    <polygon points="135,232 165,232 150,255" fill="#dc2626"/>
    <!-- Botones negros de filipina -->
    <circle cx="165" cy="275" r="3.5" fill="#1e293b"/>
    <circle cx="140" cy="275" r="3.5" fill="#1e293b"/>
    <circle cx="165" cy="305" r="3.5" fill="#1e293b"/>
    <circle cx="140" cy="305" r="3.5" fill="#1e293b"/>
    <circle cx="165" cy="335" r="3.5" fill="#1e293b"/>
    <circle cx="140" cy="335" r="3.5" fill="#1e293b"/>
  ` : ""}

  ${clothingType === "polo" ? `
    <!-- Chomba / Polo institucional deportiva y de salud -->
    <path d="M 40 360 C 45 280 85 245 125 235 L 175 235 C 215 245 255 280 260 360 Z" fill="${jacketColor}"/>
    <polygon points="135,235 165,235 162,310 138,310" fill="#0284c7"/>
    <circle cx="150" cy="255" r="2.5" fill="#ffffff"/>
    <circle cx="150" cy="275" r="2.5" fill="#ffffff"/>
    <circle cx="150" cy="295" r="2.5" fill="#ffffff"/>
    <!-- Cuello de polo -->
    <polygon points="120,230 145,255 135,255 110,235" fill="#0369a1"/>
    <polygon points="180,230 155,255 165,255 190,235" fill="#0369a1"/>
    <!-- Logo bordado salud -->
    <rect x="75" y="275" width="22" height="15" rx="3" fill="#ffffff" opacity="0.8"/>
    <path d="M 86 278 L 86 287 M 81.5 282.5 L 90.5 282.5" stroke="#002855" stroke-width="2"/>
  ` : ""}

  <!-- Cabeza y rostro -->
  <!-- Orejas -->
  <ellipse cx="94" cy="148" rx="10" ry="16" fill="url(#skin-${id})"/>
  <ellipse cx="94" cy="148" rx="6" ry="10" fill="${skinShadow}"/>
  <ellipse cx="206" cy="148" rx="10" ry="16" fill="url(#skin-${id})"/>
  <ellipse cx="206" cy="148" rx="6" ry="10" fill="${skinShadow}"/>

  <!-- Forma del rostro -->
  <path d="M 98 120 C 98 75 202 75 202 120 C 202 165 185 198 150 198 C 115 198 98 165 98 120 Z" fill="url(#skin-${id})" filter="url(#shadow-${id})"/>

  <!-- Ojos -->
  <ellipse cx="128" cy="142" rx="7" ry="5" fill="#ffffff"/>
  <circle cx="128" cy="142" r="3.8" fill="#331c12"/>
  <circle cx="126.5" cy="140.5" r="1.3" fill="#ffffff"/>

  <ellipse cx="172" cy="142" rx="7" ry="5" fill="#ffffff"/>
  <circle cx="172" cy="142" r="3.8" fill="#331c12"/>
  <circle cx="170.5" cy="140.5" r="1.3" fill="#ffffff"/>

  <!-- Cejas -->
  <path d="M 118 132 Q 128 128 138 131" stroke="${hairColor}" stroke-width="3" stroke-linecap="round" fill="none"/>
  <path d="M 162 131 Q 172 128 182 132" stroke="${hairColor}" stroke-width="3" stroke-linecap="round" fill="none"/>

  <!-- Nariz sutil -->
  <path d="M 150 142 L 148 158 Q 150 162 154 160" stroke="${skinShadow}" stroke-width="2" stroke-linecap="round" fill="none"/>

  <!-- Sonrisa profesional -->
  <path d="M 136 172 Q 150 183 164 172" stroke="#991b1b" stroke-width="2.5" stroke-linecap="round" fill="none"/>
  <path d="M 140 173 Q 150 178 160 173" stroke="#ffffff" stroke-width="2" fill="none"/>

  <!-- Gafas si aplica -->
  ${accessories === "glasses" ? `
    <!-- Marco de gafas moderno -->
    <rect x="114" y="133" width="28" height="18" rx="4" fill="none" stroke="#0f172a" stroke-width="2.5"/>
    <rect x="158" y="133" width="28" height="18" rx="4" fill="none" stroke="#0f172a" stroke-width="2.5"/>
    <line x1="142" y1="140" x2="158" y2="140" stroke="#0f172a" stroke-width="2.5"/>
    <line x1="98" y1="138" x2="114" y2="138" stroke="#0f172a" stroke-width="2"/>
    <line x1="186" y1="138" x2="202" y2="138" stroke="#0f172a" stroke-width="2"/>
  ` : ""}

  <!-- Cabello frontal superior -->
  ${hairType === "short" ? `
    <!-- Corte masculino formal pulcro -->
    <path d="M 94 115 C 94 65 130 55 160 55 C 190 55 208 70 206 115 C 198 100 180 92 150 92 C 120 92 105 102 94 115 Z" fill="${hairColor}"/>
    <path d="M 140 58 Q 165 52 185 62" stroke="#475569" stroke-width="2" fill="none" opacity="0.4"/>
  ` : ""}

  ${hairType === "long-straight" ? `
    <!-- Cabello femenino estilizado profesional -->
    <path d="M 95 115 C 95 62 130 52 155 52 C 180 52 205 65 205 115 C 190 85 170 82 150 82 C 130 82 110 88 95 115 Z" fill="${hairColor}"/>
    <path d="M 96 115 Q 92 145 92 180 Q 102 145 106 125 Z" fill="${hairColor}"/>
    <path d="M 204 115 Q 208 145 208 180 Q 198 145 194 125 Z" fill="${hairColor}"/>
  ` : ""}

  ${hairType === "long-wavy" ? `
    <!-- Cabello femenino con ondas ejecutivas -->
    <path d="M 92 115 C 92 58 130 50 152 50 C 182 50 208 62 208 115 C 192 82 170 80 150 80 C 128 80 108 85 92 115 Z" fill="${hairColor}"/>
    <path d="M 90 120 Q 82 155 86 195 Q 100 155 102 125 Z" fill="${hairColor}"/>
    <path d="M 210 120 Q 218 155 214 195 Q 200 155 198 125 Z" fill="${hairColor}"/>
  ` : ""}

  ${hairType === "chef" ? `
    <!-- Cofia / Toque de Chef institucional -->
    <path d="M 94 110 C 94 70 120 60 150 60 C 180 60 206 70 206 110 C 195 95 175 90 150 90 C 125 90 105 95 94 110 Z" fill="${hairColor}"/>
    <!-- Banda de la cofia -->
    <rect x="96" y="65" width="108" height="26" rx="4" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.5"/>
    <path d="M 102 65 C 95 25 130 15 150 15 C 170 15 205 25 198 65 Z" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.5"/>
    <path d="M 125 22 Q 130 55 132 65 M 150 16 L 150 65 M 175 22 Q 170 55 168 65" stroke="#e2e8f0" stroke-width="1.5"/>
  ` : ""}

  ${hairType === "updo" ? `
    <!-- Peinado recogido formal femenino -->
    <path d="M 95 115 C 95 62 130 52 155 52 C 180 52 205 65 205 115 C 190 85 170 82 150 82 C 130 82 110 88 95 115 Z" fill="${hairColor}"/>
    <circle cx="150" cy="40" r="24" fill="${hairColor}"/>
  ` : ""}
</svg>`;
}

const avatars = [
  {
    file: "avatar-sis.svg",
    options: {
      id: "sis",
      bgStart: "#dbeafe",
      bgEnd: "#93c5fd",
      skin: "#f6d5be",
      skinShadow: "#dfb295",
      hairColor: "#1e1b18",
      hairType: "long-straight",
      clothingType: "blazer-w",
      shirtColor: "#ffffff",
      jacketColor: "#1e3a8a" // Azul USB
    }
  },
  {
    file: "avatar-der.svg",
    options: {
      id: "der",
      bgStart: "#e2e8f0",
      bgEnd: "#94a3b8",
      skin: "#eec9af",
      skinShadow: "#d4a382",
      hairColor: "#0f172a",
      hairType: "short",
      clothingType: "suit",
      jacketColor: "#1e293b",
      tieColor: "#991b1b",
      shirtColor: "#f8fafc"
    }
  },
  {
    file: "avatar-con.svg",
    options: {
      id: "con",
      bgStart: "#ede9fe",
      bgEnd: "#c4b5fd",
      skin: "#f8d8c2",
      skinShadow: "#e0b59b",
      hairColor: "#171717",
      hairType: "updo",
      clothingType: "glasses-blazer",
      accessories: "glasses",
      jacketColor: "#0A4988", // Azul Contaduría
      shirtColor: "#ffffff"
    }
  },
  {
    file: "avatar-gas.svg",
    options: {
      id: "gas",
      bgStart: "#ffedd5",
      bgEnd: "#fed7aa",
      skin: "#fae0cc",
      skinShadow: "#e5bd9f",
      hairColor: "#451a03",
      hairType: "chef",
      clothingType: "chef"
    }
  },
  {
    file: "avatar-ico.svg",
    options: {
      id: "ico",
      bgStart: "#f1f5f9",
      bgEnd: "#cbd5e1",
      skin: "#edd0b7",
      skinShadow: "#d2a88a",
      hairColor: "#1e293b",
      hairType: "short",
      clothingType: "suit",
      jacketColor: "#164e63", // Azul verdoso ejecutivo
      tieColor: "#0284c7",
      shirtColor: "#ffffff"
    }
  },
  {
    file: "avatar-edu.svg",
    options: {
      id: "edu",
      bgStart: "#fef3c7",
      bgEnd: "#fde68a",
      skin: "#f7d7be",
      skinShadow: "#dfb294",
      hairColor: "#292524",
      hairType: "long-wavy",
      clothingType: "blazer-w",
      jacketColor: "#065f46", // Verde esmeralda educación
      shirtColor: "#fefce8"
    }
  },
  {
    file: "avatar-psm.svg",
    options: {
      id: "psm",
      bgStart: "#fce7f3",
      bgEnd: "#fbcfe8",
      skin: "#edd2ba",
      skinShadow: "#d2ab8c",
      hairColor: "#09090b",
      hairType: "short",
      clothingType: "polo",
      jacketColor: "#0f766e" // Teal / Salud institucional
    }
  }
];

for (const a of avatars) {
  const content = createStudioHeadshot(a.options);
  fs.writeFileSync(path.join(avatarsDir, a.file), content, "utf-8");
  console.log(`Generated: public/avatars/${a.file}`);
}
