// Audit alt attributes on every <img> across the site.
// Flags: missing alt, empty alt (decorative), too-short alt.

const fs = require('fs');
const path = require('path');

const root = __dirname;
const skipDirs = new Set(['.git', 'node_modules', '.claude']);

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

const files = walk(root).filter(f => {
  const html = fs.readFileSync(f, 'utf8');
  return !/<title>\s*Redirecting/i.test(html);
});

const imgRe = /<img\b[^>]*>/gi;
const altRe = /\balt\s*=\s*(["'])([\s\S]*?)\1/i;
const srcRe = /\bsrc\s*=\s*(["'])([\s\S]*?)\1/i;

let total = 0;
let missing = 0;
let empty = 0;
let short = 0;
const issues = [];

for (const file of files) {
  const html = fs.readFileSync(file, 'utf8');
  const rel = path.relative(root, file);
  const matches = html.match(imgRe) || [];
  for (const tag of matches) {
    total++;
    const a = altRe.exec(tag);
    const s = srcRe.exec(tag);
    const src = s ? s[2] : '(no src)';
    if (!a) {
      missing++;
      issues.push({ file: rel, src, problem: 'MISSING alt' });
    } else if (a[2].trim() === '') {
      empty++;
    } else if (a[2].trim().length < 5) {
      short++;
      issues.push({ file: rel, src, problem: `short alt: "${a[2]}"` });
    }
  }
}

console.log(`Total <img> tags: ${total}`);
console.log(`Missing alt: ${missing}`);
console.log(`Empty alt (decorative, OK): ${empty}`);
console.log(`Short alt (<5 chars): ${short}`);

if (issues.length) {
  console.log(`\nIssues:`);
  for (const i of issues.slice(0, 30)) console.log(` - [${i.file}] ${i.src} -> ${i.problem}`);
  if (issues.length > 30) console.log(` ... and ${issues.length - 30} more`);
}
