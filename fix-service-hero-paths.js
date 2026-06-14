// Idempotent fix: service pages had broken relative path to hero bg image.
// Each service page references images/{file} but lives at services/{slug}/
// so the path needs to be ../../images/{file}.
// Run with: node fix-service-hero-paths.js

const fs = require('fs');
const path = require('path');

const SERVICES_DIR = path.join(__dirname, 'services');

const imageFiles = [
  'service-1.webp',
  'service-2.webp',
  'service-3.webp',
  'service-4.webp',
  'service-5.webp',
  'hero-tech-working.jpg',
  'experienced-cleaners.webp',
];

let touched = 0;
let skipped = 0;

for (const dir of fs.readdirSync(SERVICES_DIR, { withFileTypes: true })) {
  if (!dir.isDirectory()) continue;
  const file = path.join(SERVICES_DIR, dir.name, 'index.html');
  if (!fs.existsSync(file)) continue;

  const before = fs.readFileSync(file, 'utf8');
  let after = before;

  for (const img of imageFiles) {
    const findHref = `href="images/${img}"`;
    const replaceHref = `href="../../images/${img}"`;
    if (after.includes(findHref)) after = after.split(findHref).join(replaceHref);

    const findBg = `background-image: url('images/${img}')`;
    const replaceBg = `background-image: url('../../images/${img}')`;
    if (after.includes(findBg)) after = after.split(findBg).join(replaceBg);
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
