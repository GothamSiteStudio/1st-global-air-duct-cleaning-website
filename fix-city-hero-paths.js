// Idempotent fix: city pages had broken relative path to hero bg image.
// images/experienced-cleaners.webp -> ../../images/experienced-cleaners.webp
// Run with: node fix-city-hero-paths.js

const fs = require('fs');
const path = require('path');

const SERVICE_AREAS_DIR = path.join(__dirname, 'service-areas');

const fixes = [
  {
    find: 'href="images/experienced-cleaners.webp"',
    replace: 'href="../../images/experienced-cleaners.webp"',
  },
  {
    find: "background-image: url('images/experienced-cleaners.webp')",
    replace: "background-image: url('../../images/experienced-cleaners.webp')",
  },
];

let touched = 0;
let skipped = 0;

for (const dir of fs.readdirSync(SERVICE_AREAS_DIR, { withFileTypes: true })) {
  if (!dir.isDirectory()) continue;
  const file = path.join(SERVICE_AREAS_DIR, dir.name, 'index.html');
  if (!fs.existsSync(file)) continue;

  const before = fs.readFileSync(file, 'utf8');
  let after = before;
  for (const { find, replace } of fixes) {
    if (after.includes(find)) after = after.split(find).join(replace);
  }

  if (after !== before) {
    fs.writeFileSync(file, after);
    touched++;
    console.log(`Fixed: ${dir.name}`);
  } else {
    skipped++;
  }
}

console.log(`\nDone. Touched: ${touched}, Skipped (already correct): ${skipped}`);
