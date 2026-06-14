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

const htmlFiles = walk(root);
const broken = [];
const linkRe = /(?:href|src)\s*=\s*["']([^"'#?]+?)["']/gi;

for (const file of htmlFiles) {
  const html = fs.readFileSync(file, 'utf8');
  const dir = path.dirname(file);
  let m;
  while ((m = linkRe.exec(html)) !== null) {
    const url = m[1].trim();
    if (!url) continue;
    if (/^(https?:|mailto:|tel:|javascript:|data:|#)/i.test(url)) continue;
    if (url.startsWith('//')) continue;

    let target;
    if (url.startsWith('/')) {
      target = path.join(root, url.replace(/^\//, ''));
    } else {
      target = path.resolve(dir, url);
    }

    let exists = fs.existsSync(target);
    if (!exists && fs.existsSync(target + '.html')) exists = true;
    if (!exists && fs.existsSync(path.join(target, 'index.html'))) exists = true;

    if (!exists) {
      broken.push({
        page: path.relative(root, file),
        link: url,
      });
    }
  }
}

if (broken.length === 0) {
  console.log('OK: no broken internal links');
} else {
  console.log(`BROKEN: ${broken.length}`);
  for (const b of broken) console.log(` - [${b.page}] -> ${b.link}`);
}
