// Performance + a11y fixes from Lighthouse baseline:
//   1. Home hero <img class="hero-bg-image">: remove lazy-loading, add fetchpriority=high
//   2. Inject <link rel=preload> for hero image on home page
//   3. Footer <h4> → <h3> (heading-order fix; no preceding h3 in footer)
//   4. page-header-bg div: extract bg image URL → preload on each page
// Idempotent.

const fs = require('fs');
const path = require('path');
const ROOT = __dirname;

function isRedirectStub(html) {
  return /window\.location\.replace\('\//.test(html) && html.length < 1500;
}

function fixHomeHero(html) {
  // Match the hero-bg-image img tag and rewrite its loading + fetchpriority
  let changed = false;
  html = html.replace(/<img\b([^>]*?\bclass="hero-bg-image"[^>]*?)>/gi, function(full, attrs) {
    let a = attrs;
    if (/\bloading\s*=\s*["']lazy["']/.test(a)) {
      a = a.replace(/\s*loading\s*=\s*["']lazy["']/i, '');
      changed = true;
    }
    if (!/\bfetchpriority\s*=/.test(a)) {
      a = a.replace(/\s+$/, '') + ' fetchpriority="high"';
      changed = true;
    }
    return '<img' + a + '>';
  });
  return { html, changed };
}

function injectHomePreload(html) {
  // Look for hero-bg-image src
  const m = html.match(/<img\b[^>]*\bclass="hero-bg-image"[^>]*\bsrc=["']([^"']+)["']/);
  if (!m) return { html, changed: false };
  const src = m[1];
  if (html.includes(`rel="preload"`) && html.includes(src)) return { html, changed: false };
  const block = `\n  <link rel="preload" as="image" href="${src}" fetchpriority="high">`;
  // Insert before </head>, after the last <link rel="stylesheet">
  const newHtml = html.replace(/(<link\b[^>]*rel="stylesheet"[^>]*>)(\s*)(?=<!--|<script|<\/head>)/i, '$1' + block + '$2');
  return { html: newHtml, changed: newHtml !== html };
}

function injectPageHeaderPreload(html) {
  // Match: <div class="page-header-bg" style="background-image: url('...')">
  const m = html.match(/<div\b[^>]*\bclass="page-header-bg"[^>]*\bbackground-image:\s*url\(['"]?([^'")]+)['"]?\)/);
  if (!m) return { html, changed: false };
  const src = m[1];
  if (new RegExp(`rel="preload"[^>]*href="${src.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}"`).test(html)) {
    return { html, changed: false };
  }
  const block = `\n  <link rel="preload" as="image" href="${src}" fetchpriority="high">`;
  const newHtml = html.replace(/(<link\b[^>]*rel="stylesheet"[^>]*>)(\s*)(?=<!--|<script|<\/head>)/i, '$1' + block + '$2');
  return { html: newHtml, changed: newHtml !== html };
}

function fixFooterHeadings(html) {
  // Footer block is between <footer ...> and </footer>.
  // Within that, replace <h4> ... </h4> with <h3> ... </h3>.
  let changed = false;
  const newHtml = html.replace(/(<footer\b[\s\S]*?<\/footer>)/i, function(footer) {
    const updated = footer
      .replace(/<h4(\s|>)/g, '<h3$1')
      .replace(/<\/h4>/g, '</h3>');
    if (updated !== footer) changed = true;
    return updated;
  });
  return { html: newHtml, changed };
}

function processFile(filePath) {
  const isHome = path.relative(ROOT, filePath).replace(/\\/g, '/') === 'index.html';
  let html = fs.readFileSync(filePath, 'utf8');
  if (isRedirectStub(html)) return { changed: false, log: [] };
  const original = html;
  const log = [];

  if (isHome) {
    const r1 = fixHomeHero(html);   html = r1.html; if (r1.changed) log.push('hero-eager+priority');
    const r2 = injectHomePreload(html); html = r2.html; if (r2.changed) log.push('hero-preload');
  } else {
    const r3 = injectPageHeaderPreload(html); html = r3.html; if (r3.changed) log.push('page-header-preload');
  }

  const r4 = fixFooterHeadings(html); html = r4.html; if (r4.changed) log.push('footer-h4-to-h3');

  if (html !== original) {
    fs.writeFileSync(filePath, html, 'utf8');
    return { changed: true, log };
  }
  return { changed: false, log };
}

function fixCSS() {
  const cssPath = path.join(ROOT, 'css', 'style.css');
  let css = fs.readFileSync(cssPath, 'utf8');
  const original = css;

  // 1. .footer-brand img: ensure width: auto + max-width to prevent stretching
  if (/\.footer-brand img\s*\{[\s\S]*?\bheight:\s*60px;[\s\S]*?\}/.test(css) && !/\.footer-brand img\s*\{[\s\S]*?\bwidth:\s*auto[\s\S]*?\}/.test(css)) {
    css = css.replace(/(\.footer-brand img\s*\{)([\s\S]*?)(\})/, function(_, a, b, c) {
      // Insert width: auto + max-width before closing brace
      const inject = '\n  width: auto;\n  max-width: 200px;';
      return a + b.trimEnd() + inject + '\n' + c;
    });
  }

  if (css !== original) {
    fs.writeFileSync(cssPath, css, 'utf8');
    console.log('updated: css/style.css');
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
    const res = processFile(f);
    if (res.changed) {
      changed++;
      console.log('updated:', path.relative(ROOT, f).replace(/\\/g, '/'), '|', res.log.join(', '));
    }
  }
  if (fixCSS()) changed++;
  console.log(`\nDone. ${changed} files updated.`);
}

main();
