// Inject <script src="/js/cookie-consent.js" defer></script> on every page.
// Idempotent. Skips redirect stubs.

const fs = require('fs');
const path = require('path');
const ROOT = __dirname;

const TAG = '<script src="/js/cookie-consent.js" defer></script>';

function isRedirectStub(html) {
  return /window\.location\.replace\('\//.test(html) && html.length < 1500;
}

function inject(html) {
  if (html.includes('cookie-consent.js')) return html;
  // Insert immediately before </body>
  return html.replace(/<\/body>/i, '  ' + TAG + '\n</body>');
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
  let changed = 0, skipped = 0;
  for (const f of walk(ROOT)) {
    const html = fs.readFileSync(f, 'utf8');
    if (isRedirectStub(html)) { skipped++; continue; }
    const updated = inject(html);
    if (updated !== html) {
      fs.writeFileSync(f, updated, 'utf8');
      changed++;
    }
  }
  console.log(`Cookie consent injected. ${changed} files updated, ${skipped} redirect stubs skipped.`);
}

main();
