// Updates navigation menu across existing pages to add Reviews, FAQ, Blog links
// Run with: node update-nav.js

const fs = require('fs');
const path = require('path');

const pagesToUpdate = [
  'index.html',
  'services.html',
  'service-areas.html',
  'gallery.html',
  'about.html',
  'contact.html',
  'privacy.html',
];

let updatedCount = 0;

pagesToUpdate.forEach((page) => {
  const filePath = path.join(__dirname, page);
  if (!fs.existsSync(filePath)) {
    console.log(`SKIP (not found): ${page}`);
    return;
  }

  let content = fs.readFileSync(filePath, 'utf8');
  const originalContent = content;

  // Pattern: insert Reviews, FAQ, Blog after Gallery line, before About line
  // Variant 1: gallery line is plain (no active class)
  const galleryPlainPattern = /<li><a href="gallery\.html">Gallery<\/a><\/li>\s*\n(\s*)<li><a href="about\.html"/;
  if (galleryPlainPattern.test(content)) {
    content = content.replace(
      galleryPlainPattern,
      (match, indent) => {
        return `<li><a href="gallery.html">Gallery</a></li>\n${indent}<li><a href="reviews.html">Reviews</a></li>\n${indent}<li><a href="faq.html">FAQ</a></li>\n${indent}<li><a href="blog.html">Blog</a></li>\n${indent}<li><a href="about.html"`;
      }
    );
  }

  // Variant 2: gallery line is active (gallery.html itself)
  const galleryActivePattern = /<li><a href="gallery\.html" class="active">Gallery<\/a><\/li>\s*\n(\s*)<li><a href="about\.html"/;
  if (galleryActivePattern.test(content)) {
    content = content.replace(
      galleryActivePattern,
      (match, indent) => {
        return `<li><a href="gallery.html" class="active">Gallery</a></li>\n${indent}<li><a href="reviews.html">Reviews</a></li>\n${indent}<li><a href="faq.html">FAQ</a></li>\n${indent}<li><a href="blog.html">Blog</a></li>\n${indent}<li><a href="about.html"`;
      }
    );
  }

  // Update footer Quick Links add Reviews, FAQ, Blog if not already present
  // Pattern: between <a href="service-areas.html">Service Areas</a> and <a href="contact.html">Contact</a>
  const footerPattern = /<a href="service-areas\.html">Service Areas<\/a>\s*\n(\s*)<a href="contact\.html">Contact<\/a>/;
  if (footerPattern.test(content)) {
    content = content.replace(
      footerPattern,
      (match, indent) => {
        return `<a href="service-areas.html">Service Areas</a>\n${indent}<a href="reviews.html">Reviews</a>\n${indent}<a href="faq.html">FAQ</a>\n${indent}<a href="blog.html">Blog</a>\n${indent}<a href="contact.html">Contact</a>`;
      }
    );
  }

  // Update footer "Services" section to use new dedicated service page links
  // Replace old anchored links with new dedicated pages
  const footerServicesPattern = /<a href="services\.html#air-duct-cleaning">Air Duct Cleaning<\/a>\s*\n(\s*)<a href="services\.html#dryer-vent-cleaning">Dryer Vent Cleaning<\/a>/;
  if (footerServicesPattern.test(content)) {
    content = content.replace(
      footerServicesPattern,
      (match, indent) => {
        return `<a href="air-duct-cleaning.html">Air Duct Cleaning</a>\n${indent}<a href="dryer-vent-cleaning.html">Dryer Vent Cleaning</a>\n${indent}<a href="hvac-cleaning.html">HVAC Cleaning</a>\n${indent}<a href="commercial-air-duct-cleaning.html">Commercial Cleaning</a>\n${indent}<a href="air-duct-sanitization.html">Sanitization</a>`;
      }
    );
  }

  if (content !== originalContent) {
    fs.writeFileSync(filePath, content);
    console.log(`Updated: ${page}`);
    updatedCount++;
  } else {
    console.log(`No changes needed: ${page}`);
  }
});

console.log(`\nTotal pages updated: ${updatedCount}`);
