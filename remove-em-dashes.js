// Removes em-dashes (—) from all text/code files in the project.
// Replaces " — " with " " (single space), and standalone "—" with " "
// Run with: node remove-em-dashes.js

const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
const EM_DASH = '—'; // —
const SKIP_DIRS = new Set(['.git', 'node_modules']);
const TEXT_EXTS = new Set(['.html', '.css', '.js', '.xml', '.txt', '.md', '.json']);

function walk(dir, files = []) {
  for (const entry of fs.readdirSync(dir)) {
    if (SKIP_DIRS.has(entry)) continue;
    const fp = path.join(dir, entry);
    const stat = fs.statSync(fp);
    if (stat.isDirectory()) {
      walk(fp, files);
    } else if (TEXT_EXTS.has(path.extname(entry))) {
      files.push(fp);
    }
  }
  return files;
}

let modified = 0;
let totalReplacements = 0;

for (const fp of walk(ROOT)) {
  // skip the script itself to avoid self-modification corrupting the regex
  if (path.basename(fp) === 'remove-em-dashes.js') continue;

  const original = fs.readFileSync(fp, 'utf8');
  if (!original.includes(EM_DASH)) continue;

  let updated = original;

  // Pattern 1: " — " (space + em-dash + space) -> " " (single space)
  let count = (updated.match(new RegExp(' ' + EM_DASH + ' ', 'g')) || []).length;
  updated = updated.replace(new RegExp(' ' + EM_DASH + ' ', 'g'), ' ');

  // Pattern 2: "— " (em-dash + space) -> " "
  count += (updated.match(new RegExp(EM_DASH + ' ', 'g')) || []).length;
  updated = updated.replace(new RegExp(EM_DASH + ' ', 'g'), ' ');

  // Pattern 3: " —" (space + em-dash) -> " "
  count += (updated.match(new RegExp(' ' + EM_DASH, 'g')) || []).length;
  updated = updated.replace(new RegExp(' ' + EM_DASH, 'g'), ' ');

  // Pattern 4: any remaining "—" -> " " (single space)
  count += (updated.match(new RegExp(EM_DASH, 'g')) || []).length;
  updated = updated.replace(new RegExp(EM_DASH, 'g'), ' ');

  // Collapse triple+ spaces that may result back to a single space within text
  // (but only where it's clearly text content, not in HTML attributes/whitespace-sensitive areas)
  // Conservative: collapse runs of 2+ regular spaces to 1, but only on lines with actual content
  updated = updated.replace(/(\S)  +(\S)/g, '$1 $2');

  if (updated !== original) {
    fs.writeFileSync(fp, updated);
    const rel = path.relative(ROOT, fp);
    console.log(`Cleaned (${count} em-dashes): ${rel}`);
    modified++;
    totalReplacements += count;
  }
}

console.log(`\nDone. ${modified} files updated, ${totalReplacements} em-dashes replaced.`);
