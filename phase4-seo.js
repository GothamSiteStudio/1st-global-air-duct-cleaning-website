// Phase 4 SEO + tracking enhancements
// Idempotent: safe to re-run.
// 1. Twitter Card meta (mirror OG)
// 2. BreadcrumbList JSON-LD
// 3. Matomo conversion-event tracking (tel/mailto/form/directions)
// 4. loading="lazy" decoding="async" on below-the-fold <img>

const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
const ORIGIN = 'https://1stglobalairductcleaning.com';

const SKIP_BREADCRUMB = new Set(['index.html', '404.html', 'thank-you.html']);

const ROOT_PAGE_LABELS = {
  'services.html':       'Services',
  'service-areas.html':  'Service Areas',
  'blog.html':           'Blog',
  'about.html':          'About',
  'contact.html':        'Contact',
  'faq.html':            'FAQ',
  'reviews.html':        'Reviews',
  'gallery.html':        'Gallery',
  'privacy.html':        'Privacy Policy',
};

const LOCATION_OVERRIDES = {
  'st-louis-mo':   'St. Louis, MO',
  'st-charles-mo': 'St. Charles, MO',
  'st-peters-mo':  'St. Peters, MO',
  'ofallon-mo':    "O'Fallon, MO",
  'ofallon-il':    "O'Fallon, IL",
};

function titleCase(s) {
  return s.split('-').map(w => w[0].toUpperCase() + w.slice(1)).join(' ');
}

function locationLabel(slug) {
  if (LOCATION_OVERRIDES[slug]) return LOCATION_OVERRIDES[slug];
  const m = slug.match(/^(.+)-(mo|il)$/);
  if (!m) return titleCase(slug);
  return `${titleCase(m[1])}, ${m[2].toUpperCase()}`;
}

function serviceLabel(slug) {
  return titleCase(slug);
}

function relPath(filePath) {
  return path.relative(ROOT, filePath).replace(/\\/g, '/');
}

function readMeta(html, prop) {
  const re = new RegExp(`<meta\\s+(?:name|property)="${prop}"\\s+content="([^"]*)"`, 'i');
  const m = html.match(re);
  return m ? m[1] : '';
}

function readTitle(html) {
  const m = html.match(/<title>([^<]+)<\/title>/);
  return m ? m[1].trim() : '';
}

function getBreadcrumbs(filePath, html) {
  const rel = relPath(filePath);
  if (SKIP_BREADCRUMB.has(rel)) return null;

  const home = { name: 'Home', url: ORIGIN + '/' };

  if (ROOT_PAGE_LABELS[rel]) return [home, { name: ROOT_PAGE_LABELS[rel] }];

  let m;
  m = rel.match(/^services\/([^/]+)\/index\.html$/);
  if (m) return [home, { name: 'Services', url: ORIGIN + '/services.html' }, { name: serviceLabel(m[1]) }];

  m = rel.match(/^service-areas\/([^/]+)\/index\.html$/);
  if (m) return [home, { name: 'Service Areas', url: ORIGIN + '/service-areas.html' }, { name: locationLabel(m[1]) }];

  m = rel.match(/^blog\/([^/]+)\.html$/);
  if (m) {
    const t = readTitle(html);
    const name = (t.split('|')[0] || titleCase(m[1])).trim();
    return [home, { name: 'Blog', url: ORIGIN + '/blog.html' }, { name }];
  }

  return null;
}

function makeBreadcrumbSchema(crumbs) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": crumbs.map((c, i) => {
      const item = { "@type": "ListItem", "position": i + 1, "name": c.name };
      if (c.url) item.item = c.url;
      return item;
    })
  };
}

function escAttr(s) { return (s || '').replace(/"/g, '&quot;'); }

function injectTwitterCards(html) {
  if (/twitter:card/i.test(html)) return html;
  const ogTitle = readMeta(html, 'og:title');
  if (!ogTitle) return html;
  const ogDesc  = readMeta(html, 'og:description');
  const ogImage = readMeta(html, 'og:image');

  const lines = [
    '  <meta name="twitter:card" content="summary_large_image">',
    `  <meta name="twitter:title" content="${escAttr(ogTitle)}">`,
  ];
  if (ogDesc)  lines.push(`  <meta name="twitter:description" content="${escAttr(ogDesc)}">`);
  if (ogImage) lines.push(`  <meta name="twitter:image" content="${ogImage}">`);
  const block = '\n\n  <!-- Twitter Card -->\n' + lines.join('\n');

  const matches = [...html.matchAll(/<meta\s+property="og:[^"]+"\s+content="[^"]*">/gi)];
  if (matches.length > 0) {
    const last = matches[matches.length - 1];
    const insertAt = last.index + last[0].length;
    return html.slice(0, insertAt) + block + html.slice(insertAt);
  }
  return html.replace(/<\/head>/i, block + '\n</head>');
}

function injectBreadcrumbSchema(html, filePath) {
  if (/"BreadcrumbList"/i.test(html)) return html;
  const crumbs = getBreadcrumbs(filePath, html);
  if (!crumbs || crumbs.length < 2) return html;

  const schema = makeBreadcrumbSchema(crumbs);
  const json = JSON.stringify(schema, null, 2).split('\n').map(l => '  ' + l).join('\n');
  const block = '\n  <!-- Schema: BreadcrumbList -->\n  <script type="application/ld+json">\n' + json + '\n  </script>';

  return html.replace(/<\/head>/i, block + '\n</head>');
}

function injectConversionTracking(html) {
  if (/data-conv-tracking="installed"/.test(html)) return html;
  if (!/_paq/.test(html)) return html;

  const block = `
  <!-- Phase 4: conversion event tracking -->
  <script data-conv-tracking="installed">
  (function(){
    var _paq = window._paq = window._paq || [];
    document.addEventListener('click', function(e){
      var a = e.target && e.target.closest && e.target.closest('a');
      if (!a) return;
      var href = a.getAttribute('href') || '';
      if (href.indexOf('tel:') === 0) _paq.push(['trackEvent','Conversion','phone_call_click', href.replace('tel:','')]);
      else if (href.indexOf('mailto:') === 0) _paq.push(['trackEvent','Conversion','email_click', href.replace('mailto:','')]);
      else if (/google\\.[a-z.]+\\/maps|goo\\.gl\\/maps/.test(href)) _paq.push(['trackEvent','Conversion','directions_click', href]);
    });
    document.addEventListener('submit', function(e){
      var f = e.target;
      if (f && f.tagName === 'FORM') _paq.push(['trackEvent','Conversion','form_submission', f.id || f.name || location.pathname]);
    });
  })();
  </script>
`;
  return html.replace(/<\/body>/i, block + '</body>');
}

function injectLazyLoading(html) {
  let imgIndex = 0;
  return html.replace(/<img\b([^>]*?)>/gi, function(full, attrs) {
    imgIndex++;
    if (imgIndex <= 2) return full;
    if (/\bloading\s*=/.test(attrs)) return full;
    let extra = ' loading="lazy"';
    if (!/\bdecoding\s*=/.test(attrs)) extra += ' decoding="async"';
    return '<img' + attrs + extra + '>';
  });
}

function isRedirectStub(html) {
  return /window\.location\.replace\('\//.test(html) && html.length < 1500;
}

function walk(dir) {
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name.startsWith('.') || entry.name === 'node_modules') continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...walk(full));
    else if (entry.name.endsWith('.html')) out.push(full);
  }
  return out;
}

function main() {
  const files = walk(ROOT);
  let changed = 0, skipped = 0;
  for (const f of files) {
    const original = fs.readFileSync(f, 'utf8');
    if (isRedirectStub(original)) { skipped++; continue; }

    let html = original;
    html = injectTwitterCards(html);
    html = injectBreadcrumbSchema(html, f);
    html = injectConversionTracking(html);
    html = injectLazyLoading(html);

    if (html !== original) {
      fs.writeFileSync(f, html, 'utf8');
      changed++;
      console.log('updated:', relPath(f));
    }
  }
  console.log(`\nDone. ${changed} files updated, ${skipped} redirect stubs skipped.`);
}

main();
