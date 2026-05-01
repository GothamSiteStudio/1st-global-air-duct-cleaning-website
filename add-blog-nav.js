// Adds the missing "Blog" link to nav menus across moved pages
const fs = require('fs');
const path = require('path');

const ROOT = __dirname;

// Walk a directory recursively, return all .html file paths
function walk(dir) {
  const result = [];
  fs.readdirSync(dir).forEach((entry) => {
    const fp = path.join(dir, entry);
    const stat = fs.statSync(fp);
    if (stat.isDirectory()) {
      result.push(...walk(fp));
    } else if (entry.endsWith('.html')) {
      result.push(fp);
    }
  });
  return result;
}

let updated = 0;
const files = [
  ...walk(path.join(ROOT, 'services')),
  ...walk(path.join(ROOT, 'service-areas')),
];

files.forEach((fp) => {
  let content = fs.readFileSync(fp, 'utf8');
  const original = content;

  // Pattern 1: nav with FAQ but no Blog after it (depth 2 uses ../../)
  // Insert Blog link after FAQ, before About
  const pattern2 = /<li><a href="\.\.\/\.\.\/faq\.html">FAQ<\/a><\/li>\s*\n(\s*)<li><a href="\.\.\/\.\.\/about\.html"/;
  if (pattern2.test(content)) {
    content = content.replace(
      pattern2,
      (match, indent) => {
        return `<li><a href="../../faq.html">FAQ</a></li>\n${indent}<li><a href="../../blog.html">Blog</a></li>\n${indent}<li><a href="../../about.html"`;
      }
    );
  }

  // Pattern: in nav with FAQ but no Blog (already-Blog case is skipped because Blog already there)
  // Only act if Blog link isn't already in this file's nav block
  if (content !== original) {
    fs.writeFileSync(fp, content);
    console.log(`Added Blog nav: ${path.relative(ROOT, fp)}`);
    updated++;
  }
});

console.log(`\nTotal: ${updated} files updated.`);
