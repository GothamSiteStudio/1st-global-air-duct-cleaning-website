// Inject Microsoft Clarity tag site-wide (idempotent).
// Project ID: wm30bhzv51

const fs = require('fs');
const path = require('path');
const ROOT = __dirname;
const CLARITY_ID = 'wm30bhzv51';

const CLARITY_BLOCK = `  <!-- Microsoft Clarity -->
  <script type="text/javascript" data-clarity="installed">
    (function(c,l,a,r,i,t,y){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
    })(window, document, "clarity", "script", "${CLARITY_ID}");
  </script>
`;

function isRedirectStub(html) {
  return /window\.location\.replace\('\//.test(html) && html.length < 1500;
}

function inject(html) {
  if (/data-clarity="installed"/.test(html)) return html;
  if (/clarity\.ms\/tag\//.test(html)) return html;
  return html.replace(/<\/head>/i, '\n' + CLARITY_BLOCK + '</head>');
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
  let changed = 0, skipped = 0, alreadyHad = 0;
  for (const f of walk(ROOT)) {
    const original = fs.readFileSync(f, 'utf8');
    if (isRedirectStub(original)) { skipped++; continue; }
    if (/data-clarity="installed"/.test(original) || /clarity\.ms\/tag\//.test(original)) {
      alreadyHad++; continue;
    }
    const updated = inject(original);
    if (updated !== original) {
      fs.writeFileSync(f, updated, 'utf8');
      changed++;
      console.log('updated:', path.relative(ROOT, f).replace(/\\/g, '/'));
    }
  }
  console.log(`\nClarity injected. ${changed} files updated, ${alreadyHad} already had it, ${skipped} redirect stubs skipped.`);
}

main();
