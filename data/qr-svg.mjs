// Generador Nativo de Códigos QR en SVG (Estándar ISO/IEC 18004, Nivel L, Modo Byte)
// 100% libre de dependencias externas — Escaneable desde cualquier cámara móvil en el Aula Magna

const GF_EXP = new Uint8Array(512);
const GF_LOG = new Uint8Array(256);
(() => {
  let x = 1;
  for (let i = 0; i < 255; i++) {
    GF_EXP[i] = x;
    GF_LOG[x] = i;
    x <<= 1;
    if (x & 0x100) x ^= 0x11d;
  }
  for (let i = 255; i < 512; i++) GF_EXP[i] = GF_EXP[i - 255];
})();

function rsEncode(data, ecLen) {
  let gen = [1];
  for (let i = 0; i < ecLen; i++) {
    const next = new Array(gen.length + 1).fill(0);
    for (let j = 0; j < gen.length; j++) {
      next[j] ^= gen[j];
      next[j + 1] ^= gen[j] === 0 ? 0 : GF_EXP[GF_LOG[gen[j]] + i];
    }
    gen = next;
  }
  const msg = new Uint8Array(data.length + ecLen);
  msg.set(data, 0);
  for (let i = 0; i < data.length; i++) {
    const coef = msg[i];
    if (coef !== 0) {
      for (let j = 1; j < gen.length; j++) {
        msg[i + j] ^= gen[j] === 0 ? 0 : GF_EXP[GF_LOG[gen[j]] + GF_LOG[coef]];
      }
    }
  }
  return msg.slice(data.length);
}

// Configuraciones Nivel L (Versiones 2 a 6 para soportar URLs de hasta 134 bytes)
const QR_VERSIONS = [
  null,
  { v: 1, size: 21, totalData: 19, ecPerBlock: 7, blocks: 1, align: [] },
  { v: 2, size: 25, totalData: 34, ecPerBlock: 10, blocks: 1, align: [6, 18] },
  { v: 3, size: 29, totalData: 55, ecPerBlock: 15, blocks: 1, align: [6, 22] },
  { v: 4, size: 33, totalData: 80, ecPerBlock: 20, blocks: 1, align: [6, 26] },
  { v: 5, size: 37, totalData: 108, ecPerBlock: 26, blocks: 1, align: [6, 30] },
  { v: 6, size: 41, totalData: 136, ecPerBlock: 18, blocks: 2, align: [6, 34] }
];

export function generarQRCodeSVG(texto, sizePx = 110, color = "#002855") {
  const bytes = Buffer.from(String(texto), "utf-8");
  let cfg = QR_VERSIONS.find((c) => c && c.totalData >= bytes.length + 3);
  if (!cfg) cfg = QR_VERSIONS[6];
  const maxBytes = cfg.totalData - 3;
  const payload = bytes.length > maxBytes ? bytes.subarray(0, maxBytes) : bytes;

  // Bitstream: Mode 0100 (4 bits) + Length (8 bits) + Bytes + Terminator
  const bits = [];
  const pushBits = (val, len) => {
    for (let i = len - 1; i >= 0; i--) bits.push((val >> i) & 1);
  };
  pushBits(0b0100, 4);
  pushBits(payload.length, 8);
  for (const b of payload) pushBits(b, 8);
  const maxBits = cfg.totalData * 8;
  for (let i = 0; i < 4 && bits.length < maxBits; i++) bits.push(0);
  while (bits.length % 8 !== 0) bits.push(0);

  const dataWords = new Uint8Array(cfg.totalData);
  for (let i = 0; i < bits.length / 8; i++) {
    let byte = 0;
    for (let b = 0; b < 8; b++) byte = (byte << 1) | bits[i * 8 + b];
    dataWords[i] = byte;
  }
  const pads = [0xec, 0x11];
  for (let i = bits.length / 8, p = 0; i < cfg.totalData; i++, p ^= 1) {
    dataWords[i] = pads[p];
  }

  // Bloques y Reed-Solomon
  const finalWords = [];
  if (cfg.blocks === 1) {
    const ec = rsEncode(dataWords, cfg.ecPerBlock);
    finalWords.push(...dataWords, ...ec);
  } else {
    const bLen = cfg.totalData / 2;
    const b1 = dataWords.slice(0, bLen);
    const b2 = dataWords.slice(bLen);
    const ec1 = rsEncode(b1, cfg.ecPerBlock);
    const ec2 = rsEncode(b2, cfg.ecPerBlock);
    for (let i = 0; i < bLen; i++) finalWords.push(b1[i], b2[i]);
    for (let i = 0; i < cfg.ecPerBlock; i++) finalWords.push(ec1[i], ec2[i]);
  }

  const N = cfg.size;
  const grid = Array.from({ length: N }, () => new Int8Array(N).fill(-1));
  const reserved = Array.from({ length: N }, () => new Uint8Array(N));

  const setFinder = (r0, c0) => {
    for (let r = -1; r <= 7; r++) {
      for (let c = -1; c <= 7; c++) {
        const rr = r0 + r, cc = c0 + c;
        if (rr < 0 || rr >= N || cc < 0 || cc >= N) continue;
        const inOuter = r >= 0 && r <= 6 && (c === 0 || c === 6 || r === 0 || r === 6);
        const inInner = r >= 2 && r <= 4 && c >= 2 && c <= 4;
        grid[rr][cc] = inOuter || inInner ? 1 : 0;
        reserved[rr][cc] = 1;
      }
    }
  };
  setFinder(0, 0);
  setFinder(0, N - 7);
  setFinder(N - 7, 0);

  if (cfg.align.length > 0) {
    const [a0, a1] = cfg.align;
    const coords = [
      [a0, a0],
      [a0, a1],
      [a1, a0],
      [a1, a1]
    ];
    for (const [ar, ac] of coords) {
      if (reserved[ar][ac]) continue;
      for (let r = -2; r <= 2; r++) {
        for (let c = -2; c <= 2; c++) {
          const val = Math.max(Math.abs(r), Math.abs(c)) !== 1 ? 1 : 0;
          grid[ar + r][ac + c] = val;
          reserved[ar + r][ac + c] = 1;
        }
      }
    }
  }

  for (let i = 8; i < N - 8; i++) {
    if (!reserved[6][i]) {
      grid[6][i] = i % 2 === 0 ? 1 : 0;
      reserved[6][i] = 1;
    }
    if (!reserved[i][6]) {
      grid[i][6] = i % 2 === 0 ? 1 : 0;
      reserved[i][6] = 1;
    }
  }

  // Reservar áreas de formato y módulo oscuro
  for (let i = 0; i < 9; i++) {
    if (i < N) {
      reserved[8][i] = 1;
      reserved[i][8] = 1;
    }
  }
  for (let i = 0; i < 8; i++) {
    reserved[8][N - 1 - i] = 1;
    reserved[N - 1 - i][8] = 1;
  }
  grid[N - 8][8] = 1;

  // Colocar bits de datos con máscara 0 ((r + c) % 2 === 0)
  const allBits = [];
  for (const w of finalWords) {
    for (let b = 7; b >= 0; b--) allBits.push((w >> b) & 1);
  }
  let bitIdx = 0;
  let up = true;
  for (let col = N - 1; col > 0; col -= 2) {
    if (col === 6) col--;
    for (let step = 0; step < N; step++) {
      const r = up ? N - 1 - step : step;
      for (let dc = 0; dc < 2; dc++) {
        const c = col - dc;
        if (!reserved[r][c]) {
          const bit = bitIdx < allBits.length ? allBits[bitIdx++] : 0;
          const mask = (r + c) % 2 === 0 ? 1 : 0;
          grid[r][c] = bit ^ mask;
        }
      }
    }
    up = !up;
  }

  // Bits de formato para Nivel L (01) + Máscara 0 (000) -> 0x77c4
  const fmt = 0x77c4;
  const fmtBits = [];
  for (let i = 0; i < 15; i++) fmtBits.push((fmt >> i) & 1);
  const fCoords1 = [
    [8, 0], [8, 1], [8, 2], [8, 3], [8, 4], [8, 5], [8, 7], [8, 8],
    [7, 8], [5, 8], [4, 8], [3, 8], [2, 8], [1, 8], [0, 8]
  ];
  for (let i = 0; i < 15; i++) {
    const [r, c] = fCoords1[i];
    grid[r][c] = fmtBits[14 - i];
  }
  for (let i = 0; i < 7; i++) grid[N - 1 - i][8] = fmtBits[14 - i];
  for (let i = 7; i < 15; i++) grid[8][N - 15 + i] = fmtBits[14 - i];

  const margin = 2;
  const total = N + margin * 2;
  let path = "";
  for (let r = 0; r < N; r++) {
    for (let c = 0; c < N; c++) {
      if (grid[r][c] === 1) {
        path += `M${c + margin},${r + margin}h1v1h-1z`;
      }
    }
  }

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${total} ${total}" width="${sizePx}" height="${sizePx}" shape-rendering="crispEdges" role="img" aria-label="Código QR de Verificación Institucional USB"><rect width="${total}" height="${total}" fill="#ffffff"/><path d="${path}" fill="${color}"/></svg>`;
}
