# Website Handoff Document

**Site:** https://1stglobalairductcleaning.com
**Owner:** Mor Galili (1st Global Air Duct Cleaning)
**Built by:** Oren Siyonov / Alpha Marketing
**Handoff date:** 2026-05-14

This document explains everything you have, where it lives, and how to use it.

---

## 1. What you have

A complete, SEO-optimized static website with:

- 30 city pages (22 Missouri + 8 Illinois)
- 5 service pages (Air Duct Cleaning, Dryer Vent, HVAC, Commercial, Sanitization)
- Home, About, Contact, FAQ, Gallery, Reviews, Privacy, 404, Thank You
- 4 blog posts
- Google Reviews widget showing real 5.0 / 376 reviews
- Before/After interactive gallery (54 sliders)
- Click-to-call button (mobile sticky)
- Cookie consent banner
- Contact forms wired to your email

**Performance:** PageSpeed ~97 mobile, accessibility 97, SEO 100.
**Status:** LIVE since 2026-05-06.

---

## 2. Where the site is hosted

- **Hosting:** GitHub Pages (free, auto-deploys from the repo)
- **Domain:** 1stglobalairductcleaning.com
- **Repo:** the project folder you have on your computer
- **Deploys:** every code push goes live within roughly 60 seconds. No manual deploy step.

You don't pay for hosting. The only recurring cost is the domain registration (renewed yearly with whoever holds the domain).

---

## 3. Your accounts and access

| Service | Login | Purpose |
|---------|-------|---------|
| Email (forms go here) | morgalili79@gmail.com | All contact form submissions arrive here |
| Form provider | FormSubmit (no account needed) | Routes form data to your Gmail |
| Phone on the site | 314-718-3632 | Click-to-call destination |
| Domain | 1stglobalairductcleaning.com | Whoever you bought the domain from |
| Google Search Console | Verified by you (Mor) | Tracks how Google sees the site |
| Google Business Profile | Yours | Source of the 5.0 / 376 reviews |
| Matomo Analytics | matomo.alphalockandsafe.com (idsite=17) | Visitor analytics, no Google involved |
| Microsoft Clarity | Project wm30bhzv51 | Heatmaps + session recordings |

If you ever lose access to any of these, contact Oren.

---

## 4. How to view your visitor data

### Matomo (visitor counts, pages visited, sources)
1. Open https://matomo.alphalockandsafe.com/matomo/
2. Log in with credentials Oren provided
3. Select dashboard for site #17

You will see:
- Visitors today / this week / this month
- Where they came from (Google search, direct, social)
- Which pages they viewed
- How many called you (via tel: clicks tracked as conversion events)
- How many submitted a contact form

### Microsoft Clarity (recordings of real sessions)
1. Open https://clarity.microsoft.com
2. Log in
3. Select project wm30bhzv51

You will see:
- Heatmaps (where people click on each page)
- Recordings of actual visitor sessions
- Where people get frustrated or stuck

### Google Search Console (how Google sees you)
1. Open https://search.google.com/search-console
2. Property: 1stglobalairductcleaning.com

You will see:
- Which keywords brought people to your site
- How many impressions and clicks per page
- Any technical errors Google found

---

## 5. How leads come to you

Every contact form on the site sends an email to **morgalili79@gmail.com** within seconds. The first time a new visitor submits a form, FormSubmit will send you a one-time confirmation email (just click the link inside).

Phone clicks also work everywhere on the site, on both desktop and mobile.

**Recommended response time:** call back within 30 minutes during business hours. Visitors who got a call back within the first hour are 7x more likely to convert.

---

## 6. How to make small changes (without a developer)

If you want to update your phone, email, address, or hours, contact Oren. These appear on every page and need a coordinated update.

If you want to add or change a single page, contact Oren.

If you want to add a new blog post, you can:
- Write the content yourself and send it to Oren, OR
- Hire any web developer who knows HTML (the site is plain HTML, no special CMS)

The site is intentionally simple so you are not locked into one developer.

---

## 7. Open items as of today (2026-05-14)

These are items that need your decision or input before the build is fully closed.

### A. BBB Accredited claim (urgent)

The site currently claims **"BBB Accredited"** on 55 pages (every city + service page, plus home and footer).

Please confirm:
- Are you actually BBB Accredited (registered with the Better Business Bureau)?

If YES: nothing needs to change.
If NO: this needs to be removed from all 55 pages immediately. False BBB claims can result in complaints to the BBB.

### B. License & Insurance display (optional)

Decide:
- Do you want to display "Licensed & Insured" badges with proof? If yes, send Oren scans of your license and insurance certificate.
- Or stay with the current generic copy (no proof shown)?

### C. About page personalization (optional)

Decide:
- Do you want photos and short bios of yourself and Matt on the About page?
- Or stay with the generic team copy?

If yes, send Oren one professional photo of each person you want featured.

### D. NADCA references (low priority)

The site cites NADCA (National Air Duct Cleaners Association) in 4 places as the **industry source** for cleaning frequency recommendations ("NADCA recommends every 3-7 years"). This is not a claim that you are a NADCA member, just a citation of their recommendation, the same way an article would cite a study.

If you want this removed regardless, let Oren know. Otherwise it stays.

---

## 8. Recurring maintenance you should do

| Frequency | Task |
|-----------|------|
| Daily | Check Gmail for new form submissions, respond within 30 min |
| Weekly | Glance at Matomo to see traffic trend |
| Monthly | Skim Search Console for any errors or new keyword opportunities |
| Quarterly | Update the review count on the home page if it changed substantially |
| Yearly | Renew domain registration |

---

## 9. Files in the repo (for your developer if you ever change one)

The project folder contains:
- `index.html` and other root pages
- `services/` folder with 5 service subfolders
- `service-areas/` folder with 30 city subfolders
- `blog/` folder with blog posts
- `images/` all photos and graphics
- `css/style.css` all styling
- `js/main.js` and `js/cookie-consent.js` interactivity
- `MAINTENANCE.md` developer-focused maintenance guide
- `WEBSITE_REBUILD_PLAN.md` original build plan

---

## 10. Contact

Anything unclear, anything you want changed: contact Oren at oren.siyonov@gmail.com.

The build phase of this engagement is complete. Ongoing monthly marketing (SEO, content, citations, outreach) is **not** included in this scope.
