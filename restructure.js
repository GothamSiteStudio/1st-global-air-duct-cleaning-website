// Restructures URLs to:
// /services/[slug]/index.html (was /[slug].html)
// /service-areas/[slug]/index.html (was /[slug].html)
// Creates redirect stubs at old paths.
// Updates all internal links across the entire site.

const fs = require('fs');
const path = require('path');

const ROOT = __dirname;

const serviceSlugs = [
  'air-duct-cleaning',
  'dryer-vent-cleaning',
  'hvac-cleaning',
  'commercial-air-duct-cleaning',
  'air-duct-sanitization',
];

const citySlugs = [
  'st-louis-mo','chesterfield-mo','ladue-mo','kirkwood-mo','webster-groves-mo',
  'ofallon-mo','st-charles-mo','st-peters-mo','florissant-mo','clayton-mo',
  'town-and-country-mo','creve-coeur-mo','wildwood-mo','arnold-mo','ballwin-mo',
  'manchester-mo','ellisville-mo','des-peres-mo','maryland-heights-mo','university-city-mo',
  'hazelwood-mo','edwardsville-il','belleville-il','ofallon-il','collinsville-il',
  'alton-il','fairview-heights-il','glen-carbon-il','waterloo-il',
];

// Mapping: old path -> new path (for link rewriting + redirect stub)
const moves = {};
serviceSlugs.forEach(s => { moves[`${s}.html`] = `services/${s}/`; });
citySlugs.forEach(s => { moves[`${s}.html`] = `service-areas/${s}/`; });

// Make folders
fs.mkdirSync(path.join(ROOT, 'services'), { recursive: true });
fs.mkdirSync(path.join(ROOT, 'service-areas'), { recursive: true });
serviceSlugs.forEach(s => fs.mkdirSync(path.join(ROOT, 'services', s), { recursive: true }));
citySlugs.forEach(s => fs.mkdirSync(path.join(ROOT, 'service-areas', s), { recursive: true }));

// Adjust relative paths inside content moved 2 levels deep
function rewriteForDepth2(content) {
  // Asset references that point to root
  content = content.replace(/href="css\//g, 'href="../../css/');
  content = content.replace(/href="images\//g, 'href="../../images/');
  content = content.replace(/src="images\//g, 'src="../../images/');
  content = content.replace(/src="js\//g, 'src="../../js/');
  // Top-level page links (HTML files at root)
  content = content.replace(/href="(index|about|contact|services|service-areas|gallery|reviews|faq|blog|privacy|404)\.html"/g, 'href="../../$1.html"');
  // Service slug links (formerly /[slug].html → now /services/[slug]/)
  serviceSlugs.forEach(s => {
    const re = new RegExp(`href="${s}\\.html"`, 'g');
    content = content.replace(re, `href="../../services/${s}/"`);
  });
  // City slug links
  citySlugs.forEach(s => {
    const re = new RegExp(`href="${s}\\.html"`, 'g');
    content = content.replace(re, `href="../../service-areas/${s}/"`);
  });
  // Logo image inside header already covered by src="images/"→"../../images/" replacement
  return content;
}

// Adjust links for ROOT-level pages (depth 0)
function rewriteForRoot(content) {
  serviceSlugs.forEach(s => {
    const re = new RegExp(`href="${s}\\.html"`, 'g');
    content = content.replace(re, `href="services/${s}/"`);
  });
  citySlugs.forEach(s => {
    const re = new RegExp(`href="${s}\\.html"`, 'g');
    content = content.replace(re, `href="service-areas/${s}/"`);
  });
  return content;
}

// Adjust links inside /blog/ posts (depth 1)
function rewriteForDepth1Blog(content) {
  // blog posts use ../ prefix already; convert ../[slug].html to ../[new-path]/
  serviceSlugs.forEach(s => {
    const re = new RegExp(`href="\\.\\./${s}\\.html"`, 'g');
    content = content.replace(re, `href="../services/${s}/"`);
  });
  citySlugs.forEach(s => {
    const re = new RegExp(`href="\\.\\./${s}\\.html"`, 'g');
    content = content.replace(re, `href="../service-areas/${s}/"`);
  });
  return content;
}

// 1) Move + rewrite service pages
serviceSlugs.forEach(s => {
  const oldFile = path.join(ROOT, `${s}.html`);
  const newDir = path.join(ROOT, 'services', s);
  if (!fs.existsSync(oldFile)) return;
  let content = fs.readFileSync(oldFile, 'utf8');
  content = rewriteForDepth2(content);
  // Update canonical URL
  content = content.replace(
    new RegExp(`https://1stglobalairductcleaning\\.com/${s}\\.html`, 'g'),
    `https://1stglobalairductcleaning.com/services/${s}/`
  );
  fs.writeFileSync(path.join(newDir, 'index.html'), content);
  console.log(`Moved: ${s}.html → services/${s}/index.html`);
});

// 2) Move + rewrite city pages
citySlugs.forEach(s => {
  const oldFile = path.join(ROOT, `${s}.html`);
  const newDir = path.join(ROOT, 'service-areas', s);
  if (!fs.existsSync(oldFile)) return;
  let content = fs.readFileSync(oldFile, 'utf8');
  content = rewriteForDepth2(content);
  content = content.replace(
    new RegExp(`https://1stglobalairductcleaning\\.com/${s}\\.html`, 'g'),
    `https://1stglobalairductcleaning.com/service-areas/${s}/`
  );
  fs.writeFileSync(path.join(newDir, 'index.html'), content);
  console.log(`Moved: ${s}.html → service-areas/${s}/index.html`);
});

// 3) Create redirect stubs at old paths
const redirectTemplate = (newUrl) => `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Redirecting...</title>
  <link rel="canonical" href="https://1stglobalairductcleaning.com/${newUrl}">
  <meta http-equiv="refresh" content="0; url=/${newUrl}">
  <meta name="robots" content="noindex, follow">
  <script>window.location.replace('/${newUrl}');</script>
</head>
<body>
  <p>This page has moved. <a href="/${newUrl}">Click here if you are not redirected.</a></p>
</body>
</html>
`;

Object.entries(moves).forEach(([oldPath, newPath]) => {
  fs.writeFileSync(path.join(ROOT, oldPath), redirectTemplate(newPath));
  console.log(`Redirect stub: ${oldPath} → ${newPath}`);
});

// 4) Rewrite internal links in root-level HTML pages
const rootPages = [
  'index.html','services.html','service-areas.html','gallery.html',
  'about.html','contact.html','privacy.html','reviews.html','faq.html',
  'blog.html','404.html',
];
rootPages.forEach(p => {
  const fp = path.join(ROOT, p);
  if (!fs.existsSync(fp)) return;
  let content = fs.readFileSync(fp, 'utf8');
  content = rewriteForRoot(content);
  fs.writeFileSync(fp, content);
  console.log(`Updated links: ${p}`);
});

// 5) Rewrite internal links in blog posts
const blogDir = path.join(ROOT, 'blog');
if (fs.existsSync(blogDir)) {
  fs.readdirSync(blogDir).forEach(f => {
    if (!f.endsWith('.html')) return;
    const fp = path.join(blogDir, f);
    let content = fs.readFileSync(fp, 'utf8');
    content = rewriteForDepth1Blog(content);
    fs.writeFileSync(fp, content);
    console.log(`Updated links: blog/${f}`);
  });
}

console.log('\n✓ Restructure complete.');
