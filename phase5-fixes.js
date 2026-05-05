// Phase 5 batch fixes:
//   1. AggregateRating: ratingValue 5 -> 5.0, reviewCount 100 -> 376 (real GBP data)
//   2. Google Fonts: render-blocking <link rel=stylesheet> -> preload + onload swap + noscript fallback
//   3. .btn-primary contrast: change green -> brand blue (CSS edit)
//   4. .review-widget-avatar contrast: white text -> dark text (HTML/JS inline fix)

const fs = require('fs');
const path = require('path');
const ROOT = __dirname;

const FONTS_URL = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Poppins:wght@500;600;700&display=swap';
const FONTS_OLD_LINK_RE = /<link\s+href="https:\/\/fonts\.googleapis\.com\/css2\?family=Inter:wght@400;500;600;700&family=Poppins:wght@500;600;700&display=swap"\s+rel="stylesheet">/;
const FONTS_NEW_BLOCK = `<link rel="preload" href="${FONTS_URL}" as="style" onload="this.onload=null;this.rel='stylesheet'">
  <noscript><link rel="stylesheet" href="${FONTS_URL}"></noscript>`;

function isRedirectStub(html) {
  return /window\.location\.replace\('\//.test(html) && html.length < 1500;
}

const stats = { rating: 0, fonts: 0, avatar: 0, total: 0 };

function fixAggregateRating(html) {
  // Match the AggregateRating block and replace ratingValue + reviewCount.
  // Match all variants used in the codebase.
  const re = /("@type":\s*"AggregateRating",\s*"ratingValue":\s*")5(",\s*"reviewCount":\s*")100(")/g;
  return html.replace(re, '$15.0$2376$3');
}

function fixFonts(html) {
  if (!FONTS_OLD_LINK_RE.test(html)) return html;
  return html.replace(FONTS_OLD_LINK_RE, FONTS_NEW_BLOCK);
}

function fixAvatarContrast(html) {
  // Inline style: background:#FBBC04 with white text from CSS
  // Add inline color to override (yellow + dark text = Google brand-correct + AA-compliant)
  return html.replace(
    /(<div\s+class="review-widget-avatar"\s+style="background:#FBBC04;)(")/g,
    '$1color:#1F2937;$2'
  );
}

function processFile(filePath) {
  let html = fs.readFileSync(filePath, 'utf8');
  if (isRedirectStub(html)) return false;
  const original = html;
  const before = { rating: html, fonts: html, avatar: html };

  let h2 = fixAggregateRating(html);
  if (h2 !== html) stats.rating++;
  html = h2;

  h2 = fixFonts(html);
  if (h2 !== before.fonts) stats.fonts++;
  html = h2;

  h2 = fixAvatarContrast(html);
  if (h2 !== before.avatar) stats.avatar++;
  html = h2;

  if (html !== original) {
    fs.writeFileSync(filePath, html, 'utf8');
    stats.total++;
    return true;
  }
  return false;
}

function fixCSSContrast() {
  const cssPath = path.join(ROOT, 'css', 'style.css');
  let css = fs.readFileSync(cssPath, 'utf8');
  const original = css;

  // .btn-primary: change background-color: var(--color-accent) -> var(--color-primary)
  // Same for hover (use --color-primary-dark)
  css = css.replace(
    /(\.btn-primary\s*\{[^}]*?)background-color:\s*var\(--color-accent\)/,
    '$1background-color: var(--color-primary)'
  );
  css = css.replace(
    /(\.btn-primary:hover\s*\{[^}]*?)background-color:\s*var\(--color-accent-dark\)/,
    '$1background-color: var(--color-primary-dark)'
  );

  if (css !== original) {
    fs.writeFileSync(cssPath, css, 'utf8');
    console.log('updated: css/style.css (.btn-primary contrast)');
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
  for (const f of walk(ROOT)) {
    if (processFile(f)) {
      console.log('updated:', path.relative(ROOT, f).replace(/\\/g, '/'));
    }
  }
  fixCSSContrast();
  console.log(`\n--- Summary ---`);
  console.log(`AggregateRating updates: ${stats.rating}`);
  console.log(`Fonts non-blocking:      ${stats.fonts}`);
  console.log(`Avatar contrast:         ${stats.avatar}`);
  console.log(`Total HTML files:        ${stats.total}`);
}

main();
