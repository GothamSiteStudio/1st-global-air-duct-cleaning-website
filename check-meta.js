// Audit <title> and <meta name="description"> across all canonical pages.
// Flags: missing, too-long, too-short, duplicates.

const fs = require('fs');
const path = require('path');

const root = __dirname;
const skipDirs = new Set(['.git', 'node_modules', '.claude']);

// Skip redirect stubs at root (Title === 'Redirecting...')
function isRedirectStub(html) {
  return /<title>\s*Redirecting/i.test(html) || /http-equiv=["']refresh["']/i.test(html);
}

function walk(dir, list = []) {
  for (const name of fs.readdirSync(dir)) {
    if (skipDirs.has(name)) continue;
    const full = path.join(dir, name);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) walk(full, list);
    else if (name.endsWith('.html')) list.push(full);
  }
  return list;
}

const titleRe = /<title>([\s\S]*?)<\/title>/i;
const metaDescRe = /<meta\s+name=["']description["']\s+content=(["'])([\s\S]*?)\1\s*\/?>/i;

const files = walk(root).filter(f => {
  return !isRedirectStub(fs.readFileSync(f, 'utf8'));
});

const titles = {};
const descs = {};
const flagged = [];

for (const file of files) {
  const html = fs.readFileSync(file, 'utf8');
  const rel = path.relative(root, file);

  const tM = titleRe.exec(html);
  const dM = metaDescRe.exec(html);
  const title = tM ? tM[1].trim() : null;
  const desc = dM ? dM[2].trim() : null;

  if (!title) flagged.push({ file: rel, issue: 'missing <title>' });
  else {
    if (title.length > 65) flagged.push({ file: rel, issue: `title ${title.length} chars (>65): ${title}` });
    if (title.length < 25) flagged.push({ file: rel, issue: `title ${title.length} chars (<25): ${title}` });
    (titles[title] = titles[title] || []).push(rel);
  }

  if (!desc) flagged.push({ file: rel, issue: 'missing meta description' });
  else {
    if (desc.length > 165) flagged.push({ file: rel, issue: `desc ${desc.length} chars (>165)` });
    if (desc.length < 70) flagged.push({ file: rel, issue: `desc ${desc.length} chars (<70)` });
    (descs[desc] = descs[desc] || []).push(rel);
  }
}

console.log(`Canonical pages scanned: ${files.length}`);

const dupTitles = Object.entries(titles).filter(([, list]) => list.length > 1);
const dupDescs = Object.entries(descs).filter(([, list]) => list.length > 1);

console.log(`\nDuplicate titles: ${dupTitles.length}`);
for (const [t, list] of dupTitles) console.log(`  "${t}" -> ${list.join(', ')}`);

console.log(`\nDuplicate meta descriptions: ${dupDescs.length}`);
for (const [d, list] of dupDescs) console.log(`  ${list.join(', ')}\n    "${d.slice(0, 80)}..."`);

console.log(`\nFlagged length/missing: ${flagged.length}`);
for (const f of flagged) console.log(`  [${f.file}] ${f.issue}`);
