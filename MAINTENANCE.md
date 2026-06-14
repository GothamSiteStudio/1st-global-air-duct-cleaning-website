# Maintenance & Build Reference

Operational guide for keeping 1stglobalairductcleaning.com healthy after launch.

This is a developer-facing companion to [README.md](README.md). It covers architecture, the idempotent build scripts, how to add common content, and a recurring maintenance checklist.

---

## Architecture

- **Static HTML on GitHub Pages.** No backend, no CMS, no build step.
- **Auto-deploy:** every push to `main` deploys within roughly 30 to 90 seconds.
- **Domain:** `1stglobalairductcleaning.com` (via [CNAME](CNAME)).
- **CSS:** single stylesheet at [css/style.css](css/style.css). All visual customization lives there.
- **JS:** [js/main.js](js/main.js) (mobile menu, FAQ accordion, form validation), [js/cookie-consent.js](js/cookie-consent.js) (GDPR banner).
- **Analytics:** Matomo (idsite=17 on `matomo.alphalockandsafe.com`) + Microsoft Clarity (project `wm30bhzv51`). Both are inlined in every HTML head.
- **Conversion tracking:** delegated `click` and `submit` listeners at the bottom of every page, pushing custom events into `_paq` for Matomo.

### URL structure

| Type | Path | Example |
|------|------|---------|
| Service | `/services/{slug}/` | `/services/air-duct-cleaning/` |
| Service area | `/service-areas/{slug}/` | `/service-areas/wentzville-mo/` |
| Blog post | `/blog/{slug}.html` | `/blog/dryer-vent-fire-safety.html` |
| Legacy redirects | `/{slug}.html` (root) | `/wentzville-mo.html` redirects to canonical |

The flat root files (`arnold-mo.html`, `air-duct-cleaning.html`, etc.) are 0.html/meta-refresh redirect stubs preserved for any backlinks pointing to old URLs.

---

## Idempotent build scripts

All scripts live in the repo root and are safe to re-run, they detect prior state and skip work that is already applied.

| Script | Purpose |
|--------|---------|
| [phase4-seo.js](phase4-seo.js) | Twitter cards, BreadcrumbList JSON-LD, Matomo conversion events, lazy-load below-fold images |
| [phase5-fixes.js](phase5-fixes.js) | Real GBP `AggregateRating`, non-blocking font loading, contrast fixes |
| [inject-clarity.js](inject-clarity.js) | Microsoft Clarity tag |
| [inject-image-dims.js](inject-image-dims.js) | Reads PNG/JPEG/WebP/GIF/SVG headers and injects intrinsic `width`/`height` to prevent CLS |
| [inject-cookie-consent.js](inject-cookie-consent.js) | Cookie banner script tag |
| [fix-perf-a11y.js](fix-perf-a11y.js) | Hero LCP fix, footer heading order, page-header preloads |
| [fix-city-hero-paths.js](fix-city-hero-paths.js) | Corrects relative path of hero bg image on city pages |
| [generate-cities.js](generate-cities.js) | Stale, do not run. Original flat-file generator. Service-area pages now live under `service-areas/{slug}/index.html` |
| [generate-blog.js](generate-blog.js) | Blog post template generator |

To re-apply across the whole site after a structural change:

```powershell
node phase4-seo.js
node phase5-fixes.js
node inject-image-dims.js
```

Re-running is cheap, scripts only write when they detect a missing piece.

---

## Common content tasks

### Add a new service area (city page)

1. Copy [service-areas/st-charles-mo/index.html](service-areas/st-charles-mo/index.html) to `service-areas/{new-slug}/index.html`.
2. Replace the canonical URL, page title, breadcrumb, H1, schema `areaServed`, and all `St. Charles` references with the new city.
3. Rewrite the three lead paragraphs with at least 600 unique words about the city (Climate, neighborhoods, drive time, common housing stock). Duplicate content hurts SEO.
4. Update the "Nearby Cities" links (5 closest cities).
5. Add a `<url>` entry to [sitemap.xml](sitemap.xml).
6. Add a city tile to [service-areas.html](service-areas.html) inside the appropriate state grid.
7. Update the "Missouri X Cities" or "Illinois X Cities" count in [service-areas.html](service-areas.html).
8. Add a `{slug}.html` redirect stub in the root (copy from `arnold-mo.html`, change the slug).
9. Add the city to the `areaServed` schema in [index.html](index.html) and [service-areas.html](service-areas.html).
10. Update the city in any neighbor city's "Nearby Cities" list where relevant.

### Add a new blog post

1. Copy [blog/dryer-vent-fire-safety.html](blog/dryer-vent-fire-safety.html) to `blog/{new-slug}.html`.
2. Replace title, canonical, H1, body copy, schema `Article` fields, publish date.
3. Add to [blog.html](blog.html) and [sitemap.xml](sitemap.xml).

### Update the AggregateRating

The site shows real GBP rating: 5.0 stars, 376 reviews. To refresh:

1. Pull the current count from the GBP profile.
2. Find/replace `"reviewCount": "376"` across all HTML files.
3. Update the `lastmod` dates in [sitemap.xml](sitemap.xml) for major pages.

### Update the phone number, address, or hours

NAP (Name, Address, Phone) consistency is critical for local SEO. If anything changes:

1. Find/replace across all HTML (also check schema JSON-LD blocks).
2. Update the matching info on Google Business Profile, Yelp, BBB, Facebook, and any citation sites.
3. The map iframe in the footer (only on [service-areas.html](service-areas.html)) embeds GBP, that updates automatically.

---

## Recurring maintenance

### Weekly

- **Google Search Console:** check for new errors (Coverage, Mobile Usability, Core Web Vitals). Submit any new pages for indexing.
- **Matomo:** glance at traffic, top pages, top referrers, conversion events. Look for any unexpected drop.
- **Form submissions:** confirm forms are still arriving in the mailbox. A test submission once a week catches silent failures early.

### Monthly

- **Microsoft Clarity:** spend 15 minutes reviewing heatmaps and session recordings. Look for rage clicks, dead clicks, scroll friction.
- **Lighthouse audit:** run on at least the home page and one city page. Compare to prior baseline (Performance 97, Accessibility 97, Best Practices 77, SEO 100). Lighthouse single-run is noisy, run 3 times and take the best.
- **Broken-link scan:** Screaming Frog (free up to 500 URLs) covers the whole site.
- **Schema validation:** spot-check 2 to 3 pages against [Rich Results Test](https://search.google.com/test/rich-results).
- **Backups:** GitHub holds the source of truth, but a monthly clone to a local archive is cheap insurance.

### Quarterly

- **Content velocity:** publish 1 to 2 new blog posts per quarter (per the marketing plan).
- **Citation cleanup:** verify NAP consistency on Yelp, BBB, HomeAdvisor, Thumbtack, Angi.
- **Reviews:** check overall rating, respond to any unanswered reviews on GBP, BBB, Yelp.

---

## Known issues / ceilings

- **Lighthouse Best Practices stuck at 77.** Microsoft Clarity sets third-party cookies (CLID, SM, MUID) and Lighthouse penalizes that regardless of the consent banner. Removing Clarity would lift the score, but Clarity is intentionally kept for UX research.
- **Lighthouse single-run noise.** Same URL on simulated mobile can return LCP between 2.3s and 11s depending on network simulation. Always run 3+ times for a real signal.
- **Bing Webmaster Tools** verification was not completed at launch. Worth doing if Bing organic traffic ever shows up.

---

## Where things live (quick map)

| What | Where |
|------|-------|
| Hero image | [images/clean-ductwork-hero.webp](images/clean-ductwork-hero.webp) (preloaded on home) |
| City hero bg | [images/experienced-cleaners.webp](images/experienced-cleaners.webp) |
| Logo | [images/logo.png](images/logo.png) |
| Stylesheet | [css/style.css](css/style.css) |
| Mobile nav script | [js/main.js](js/main.js) |
| Cookie banner | [js/cookie-consent.js](js/cookie-consent.js) |
| 404 page | [404.html](404.html) |
| Robots | [robots.txt](robots.txt) |
| Sitemap | [sitemap.xml](sitemap.xml) |
| Domain config | [CNAME](CNAME) |

---

## Contact

For questions about this codebase, contact the developer who built it.

For business questions about the site content, contact Mor Galili directly: morgalili79@gmail.com / (314) 718-3632.
