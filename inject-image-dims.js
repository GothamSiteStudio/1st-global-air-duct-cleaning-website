// Inject intrinsic width/height attrs on <img> tags (CLS prevention).
// Reads real dimensions from PNG/JPEG/WebP/GIF file headers.
// Idempotent.

const fs = require('fs');
const path = require('path');
const ROOT = __dirname;

function readPNG(buf) {
  if (buf.length < 24) return null;
  if (buf.slice(0, 8).toString('hex') !== '89504e470d0a1a0a') return null;
  return { w: buf.readUInt32BE(16), h: buf.readUInt32BE(20) };
}

function readJPEG(buf) {
  if (buf.length < 10 || buf[0] !== 0xFF || buf[1] !== 0xD8) return null;
  let off = 2;
  while (off + 9 < buf.length) {
    if (buf[off] !== 0xFF) return null;
    const m = buf[off + 1];
    // SOF0..SOF15 except DHT(C4), JPG(C8), DAC(CC)
    if (m >= 0xC0 && m <= 0xCF && m !== 0xC4 && m !== 0xC8 && m !== 0xCC) {
      return { h: buf.readUInt16BE(off + 5), w: buf.readUInt16BE(off + 7) };
    }
    const segLen = buf.readUInt16BE(off + 2);
    off += 2 + segLen;
  }
  return null;
}

function readWebP(buf) {
  if (buf.length < 30) return null;
  if (buf.slice(0, 4).toString('ascii') !== 'RIFF') return null;
  if (buf.slice(8, 12).toString('ascii') !== 'WEBP') return null;
  const chunk = buf.slice(12, 16).toString('ascii');
  if (chunk === 'VP8 ') {
    return { w: buf.readUInt16LE(26) & 0x3FFF, h: buf.readUInt16LE(28) & 0x3FFF };
  }
  if (chunk === 'VP8L') {
    if (buf[20] !== 0x2F) return null;
    const b1 = buf[21], b2 = buf[22], b3 = buf[23], b4 = buf[24];
    return {
      w: (((b2 & 0x3F) << 8) | b1) + 1,
      h: ((((b4 & 0x0F) << 10) | (b3 << 2) | ((b2 & 0xC0) >> 6))) + 1,
    };
  }
  if (chunk === 'VP8X') {
    return {
      w: (buf[24] | (buf[25] << 8) | (buf[26] << 16)) + 1,
      h: (buf[27] | (buf[28] << 8) | (buf[29] << 16)) + 1,
    };
  }
  return null;
}

function readGIF(buf) {
  if (buf.length < 10 || buf.slice(0, 3).toString('ascii') !== 'GIF') return null;
  return { w: buf.readUInt16LE(6), h: buf.readUInt16LE(8) };
}

function readSVG(buf) {
  const s = buf.toString('utf8', 0, Math.min(2048, buf.length));
  // Try width/height attrs first
  const wm = s.match(/<svg\b[^>]*\bwidth\s*=\s*["']?(\d+(?:\.\d+)?)/i);
  const hm = s.match(/<svg\b[^>]*\bheight\s*=\s*["']?(\d+(?:\.\d+)?)/i);
  if (wm && hm) return { w: Math.round(+wm[1]), h: Math.round(+hm[1]) };
  // Fall back to viewBox
  const vb = s.match(/<svg\b[^>]*\bviewBox\s*=\s*["']\s*[\d.\-]+\s+[\d.\-]+\s+([\d.]+)\s+([\d.]+)/i);
  if (vb) return { w: Math.round(+vb[1]), h: Math.round(+vb[2]) };
  return null;
}

const dimsCache = new Map();
function getDims(filepath) {
  if (dimsCache.has(filepath)) return dimsCache.get(filepath);
  let result = null;
  try {
    const buf = fs.readFileSync(filepath);
    const ext = path.extname(filepath).toLowerCase();
    if (ext === '.png') result = readPNG(buf);
    else if (ext === '.jpg' || ext === '.jpeg') result = readJPEG(buf);
    else if (ext === '.webp') result = readWebP(buf);
    else if (ext === '.gif') result = readGIF(buf);
    else if (ext === '.svg') result = readSVG(buf);
    if (!result) result = readPNG(buf) || readJPEG(buf) || readWebP(buf) || readGIF(buf);
  } catch (e) { /* swallow */ }
  dimsCache.set(filepath, result);
  return result;
}

function isRedirectStub(html) {
  return /window\.location\.replace\('\//.test(html) && html.length < 1500;
}

const stats = { imgsTotal: 0, imgsAlready: 0, imgsAdded: 0, imgsSkipped: 0, missingFiles: new Set(), unparsable: new Set() };

function processFile(filePath) {
  let html = fs.readFileSync(filePath, 'utf8');
  if (isRedirectStub(html)) return false;
  const dir = path.dirname(filePath);
  const original = html;

  html = html.replace(/<img\b([^>]*?)>/gi, function(full, attrs) {
    stats.imgsTotal++;
    const hasW = /\bwidth\s*=/.test(attrs);
    const hasH = /\bheight\s*=/.test(attrs);
    if (hasW && hasH) { stats.imgsAlready++; return full; }
    const srcMatch = attrs.match(/\bsrc\s*=\s*["']([^"']+)["']/i);
    if (!srcMatch) { stats.imgsSkipped++; return full; }
    const rawSrc = srcMatch[1].split('?')[0].split('#')[0];
    if (rawSrc.startsWith('http://') || rawSrc.startsWith('https://') || rawSrc.startsWith('data:')) {
      stats.imgsSkipped++; return full;
    }
    const imgPath = path.resolve(dir, rawSrc);
    if (!fs.existsSync(imgPath)) { stats.missingFiles.add(rawSrc); stats.imgsSkipped++; return full; }
    const dims = getDims(imgPath);
    if (!dims || !dims.w || !dims.h) { stats.unparsable.add(rawSrc); stats.imgsSkipped++; return full; }
    let newAttrs = attrs;
    if (!hasW) newAttrs += ` width="${dims.w}"`;
    if (!hasH) newAttrs += ` height="${dims.h}"`;
    stats.imgsAdded++;
    return '<img' + newAttrs + '>';
  });

  if (html !== original) {
    fs.writeFileSync(filePath, html, 'utf8');
    return true;
  }
  return false;
}

function walk(dir, out=[]) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (e.name.startsWith('.') || e.name === 'node_modules') continue;
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, out);
    else if (e.name.endsWith('.html')) out.push(p);
  }
  return out;
}

function main() {
  let changed = 0;
  for (const f of walk(ROOT)) {
    if (processFile(f)) {
      changed++;
      console.log('updated:', path.relative(ROOT, f).replace(/\\/g, '/'));
    }
  }
  console.log(`\n--- Summary ---`);
  console.log(`files updated:    ${changed}`);
  console.log(`<img> tags total: ${stats.imgsTotal}`);
  console.log(`already had dims: ${stats.imgsAlready}`);
  console.log(`dims added:       ${stats.imgsAdded}`);
  console.log(`skipped:          ${stats.imgsSkipped}`);
  if (stats.missingFiles.size) {
    console.log(`\nmissing files (${stats.missingFiles.size}):`);
    for (const f of stats.missingFiles) console.log('  ', f);
  }
  if (stats.unparsable.size) {
    console.log(`\nunparsable (${stats.unparsable.size}):`);
    for (const f of stats.unparsable) console.log('  ', f);
  }
}

main();
