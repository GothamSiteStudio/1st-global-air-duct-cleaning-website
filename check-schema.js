// Validate JSON-LD schema blocks in every HTML page.
// Confirms each block parses as JSON, has @context and @type.

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

const files = walk(root);
const ldRe = /<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;

let totalBlocks = 0;
const issues = [];
const typeCount = {};

for (const file of files) {
  const html = fs.readFileSync(file, 'utf8');
  let m;
  let pageBlocks = 0;
  const pageTypes = [];
  while ((m = ldRe.exec(html)) !== null) {
    totalBlocks++;
    pageBlocks++;
    const json = m[1].trim();
    try {
      const parsed = JSON.parse(json);
      const nodes = Array.isArray(parsed) ? parsed : [parsed];
      for (const node of nodes) {
        if (!node['@context']) {
          issues.push({ file: path.relative(root, file), problem: 'missing @context' });
        }
        const t = node['@type'];
        if (!t) {
          issues.push({ file: path.relative(root, file), problem: 'missing @type' });
        } else {
          const tStr = Array.isArray(t) ? t.join(',') : t;
          pageTypes.push(tStr);
          typeCount[tStr] = (typeCount[tStr] || 0) + 1;
        }
      }
    } catch (e) {
      issues.push({ file: path.relative(root, file), problem: `JSON parse error: ${e.message}` });
    }
  }
  if (pageBlocks === 0) {
    issues.push({ file: path.relative(root, file), problem: 'no JSON-LD block found' });
  }
}

console.log(`Pages scanned: ${files.length}`);
console.log(`JSON-LD blocks: ${totalBlocks}`);
console.log(`Schema types found:`);
for (const [t, c] of Object.entries(typeCount).sort((a, b) => b[1] - a[1])) {
  console.log(`  ${t}: ${c}`);
}

if (issues.length === 0) {
  console.log('\nOK: all schema blocks valid');
} else {
  console.log(`\nISSUES: ${issues.length}`);
  for (const i of issues) console.log(` - [${i.file}] ${i.problem}`);
}
