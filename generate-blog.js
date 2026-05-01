// Blog post generator for 1st Global Air Duct Cleaning
// Run with: node generate-blog.js
// Outputs HTML files inside ./blog/

const fs = require('fs');
const path = require('path');

const posts = [
  {
    slug: 'how-often-clean-air-ducts',
    title: 'How Often Should You Clean Your Air Ducts? [2026 Guide]',
    metaDesc: 'How often should you clean your air ducts? NADCA recommends every 3-7 years, but here\'s what really determines the right schedule for your home.',
    eyebrow: 'NADCA Guide • 6 min read',
    h1: 'How Often Should You Clean Your Air Ducts?',
    intro: 'The short answer most contractors will give you: every 3 to 7 years. That\'s the National Air Duct Cleaners Association (NADCA) recommendation, and it\'s a useful starting point. But the real answer depends on your specific home the people in it, the pets, the age of the system, and the climate. After 11 years of cleaning ducts in St. Louis homes, here\'s what we actually tell our customers.',
    image: '../images/service-1.webp',
    image_alt: 'Air duct cleaning frequency guide',
    sections: [
      {
        h: 'The Official Recommendation',
        body: '<p>NADCA recommends professional air duct cleaning every <strong>3 to 7 years</strong> for most homes. This is the industry standard, based on how long it takes typical residential dust loads to build up to levels that affect indoor air quality and HVAC performance. For a healthy adult living alone in a newer home with no pets, 5-7 years is usually fine. For most family homes, the answer is closer to every 3-5 years.</p>'
      },
      {
        h: 'Factors That Mean You Should Clean Sooner',
        body: '<p>Push toward the 3-year end of the range or sooner if any of these apply to your home:</p><ul><li><strong>Pets that shed.</strong> Dogs and cats add huge amounts of dander and hair to the duct system. Two shedding pets can effectively cut cleaning intervals in half.</li><li><strong>Allergies, asthma, or respiratory conditions.</strong> Anyone in the household with sensitivity to dust, pollen, mold, or pet dander benefits from more frequent cleaning.</li><li><strong>Recent renovations.</strong> Drywall dust, sawdust, and construction debris settle deep into duct systems and stay there until extracted. After any major renovation, schedule a cleaning.</li><li><strong>You moved into a previously occupied home.</strong> You don\'t know when (or if) the previous owners ever cleaned the ducts. Better to start fresh.</li><li><strong>Smokers in the home.</strong> Tobacco residue coats duct interiors and continues to off-gas long after you can\'t smell it.</li><li><strong>Visible mold or musty smells.</strong> If the system smells musty when it kicks on, that\'s biofilm growing inside. Clean and sanitize.</li><li><strong>Water damage history.</strong> Any flood, leak, or water event near the HVAC system creates conditions for mold growth.</li><li><strong>Older home (50+ years).</strong> Older ducts have had more time to accumulate buildup and often have less efficient sealing.</li></ul>'
      },
      {
        h: 'Factors That Mean You Can Wait',
        body: '<p>Push toward the 7-year end of the range if your home checks all these boxes:</p><ul><li>No pets, or very low-shedding pets</li><li>No smokers</li><li>No allergy or asthma sufferers</li><li>Newer home (under 15 years old) with no water damage history</li><li>HVAC system has been regularly maintained with quality filters</li><li>No recent renovations</li><li>No musty odors or visible buildup at the registers</li></ul><p>If you\'re in this category, every 5-7 years is usually plenty.</p>'
      },
      {
        h: 'Why St. Louis Climate Matters',
        body: '<p>St. Louis\'s humid summers and pollen-heavy springs put extra stress on duct systems. Mold and biofilm grow faster in humid air. Spring tree pollen oak, maple, sycamore gets pulled into return registers in massive quantities. Compared to drier climates, most St. Louis homes need cleaning a year or two sooner than the standard recommendation.</p>'
      },
      {
        h: 'Signs You\'re Overdue Right Now',
        body: '<p>Don\'t wait for a calendar reminder. Schedule a cleaning if you notice any of these:</p><ul><li>Visible dust collecting around register vents shortly after dusting the home</li><li>Allergy symptoms that get worse when the HVAC runs</li><li>Musty or stale smell when the system kicks on</li><li>Higher energy bills than the same period last year</li><li>HVAC running longer than it used to to reach setpoint</li><li>Visible debris or webs at the register grilles</li></ul>'
      },
      {
        h: 'What About Dryer Vents?',
        body: '<p>Dryer vents are different. We recommend <strong>annual cleaning</strong> for any household every 6 months for families that do laundry every day or have long vent runs. Dryer vent buildup is a fire hazard, and lint accumulates fast. <a href="dryer-vent-fire-safety.html">Read more about dryer vent safety.</a></p>'
      },
      {
        h: 'Bottom Line',
        body: '<p>For most St. Louis families with kids, pets, or allergies plan on professional duct cleaning every 3-5 years. For lower-impact households, every 5-7 years is fine. If you\'re not sure where your home stands, give us a call. We\'ll ask a few honest questions and tell you whether you\'re due now or could safely wait another year. We\'d rather earn a customer for life than push a job that isn\'t ready.</p>'
      }
    ],
    cta: 'Need a Cleaning?',
    ctaText: 'Get a free phone quote in 5 minutes. Same-day service often available.',
  },
  {
    slug: '10-signs-air-ducts-need-cleaning',
    title: '10 Signs Your Air Ducts Need Cleaning RIGHT NOW',
    metaDesc: 'Visible dust, musty smells, unexplained allergies here are 10 clear signs your air ducts are overdue for professional cleaning.',
    eyebrow: 'Checklist • 5 min read',
    h1: '10 Signs Your Air Ducts Need Cleaning RIGHT NOW',
    intro: 'Most homeowners don\'t think about their air ducts until something goes wrong and by then, the dust, dander, and debris have been recycling through every breath their family takes for years. Here are 10 clear warning signs that mean it\'s time to schedule a professional cleaning.',
    image: '../images/duct-cleaner.webp',
    image_alt: '10 signs ducts need cleaning checklist',
    sections: [
      {
        h: '1. Visible Dust Around the Vents',
        body: '<p>Dust the area around your supply registers. Run the HVAC for a day or two. Look again. If dust is collecting on or near the vents faster than anywhere else in the room your ducts are pushing it. That\'s the most common visual sign of a system that needs cleaning.</p>'
      },
      {
        h: '2. Musty or Stale Smell When the System Runs',
        body: '<p>Turn on the AC after a long off period. Does the air smell musty for the first few minutes? That\'s biofilm or mold growing inside the duct system or on the evaporator coil. Cleaning removes the source of the smell and a sanitization treatment kills what\'s left.</p>'
      },
      {
        h: '3. Allergies That Get Worse Indoors',
        body: '<p>If your allergy symptoms worsen when you\'re home especially when the HVAC is running your ducts may be circulating allergens. Dust mites, pet dander, pollen, and mold spores all collect in ductwork and get pushed out every time the fan turns on.</p>'
      },
      {
        h: '4. Pets That Shed (And Have Been Around for Years)',
        body: '<p>Pet hair and dander accumulate in duct systems faster than any other contaminant. If you\'ve had shedding pets for several years and never had professional cleaning there\'s a substantial layer of pet hair coating your duct interiors. Remove it.</p>'
      },
      {
        h: '5. You Just Moved Into a New (or New-to-You) Home',
        body: '<p>Two scenarios both call for cleaning:<br><strong>New construction:</strong> Drywall dust, sawdust, and construction debris settle into duct systems during the build and never come out on their own.<br><strong>Resale homes:</strong> You don\'t know who lived there before, what they cooked, whether they smoked, or when they last cleaned. Start fresh.</p>'
      },
      {
        h: '6. Recent Home Renovations',
        body: '<p>Any major remodel kitchen, bath, basement, addition sends fine dust through the entire HVAC system. Even if you sealed off the work area, microscopic drywall dust and sawdust always finds its way into the ducts. Schedule a cleaning when the project finishes.</p>'
      },
      {
        h: '7. Visible Mold at the Registers',
        body: '<p>If you see black or dark green spots on the register vents themselves, or if there\'s visible mold on the air handler there\'s a mold problem in the system. Don\'t cover it up; clean it. Sanitization is also recommended in this case to kill any remaining microbial growth.</p>'
      },
      {
        h: '8. Energy Bills Have Crept Up',
        body: '<p>If your energy bills are higher than the same time last year and you can\'t explain why, dirty ducts may be the culprit. A clogged blower wheel and dirty coil make the HVAC work harder to move the same air. The result: higher bills, more wear, less performance.</p>'
      },
      {
        h: '9. The HVAC Is Running Longer to Reach Setpoint',
        body: '<p>Notice the AC is running 30, 40, 50 minutes per cycle when it used to run 20? That\'s a system struggling to push air through dirty ducts and a dirty coil. Cleaning often restores the original performance.</p>'
      },
      {
        h: '10. It\'s Been More Than 5 Years',
        body: '<p>If you can\'t remember the last time you had professional cleaning, or it\'s been more than 5 years it\'s overdue. Even without any of the other signs, 5+ years is enough time for substantial buildup, especially in St. Louis\' humid climate.</p>'
      },
      {
        h: 'What to Do Now',
        body: '<p>If you noticed any of these signs in your home, the next step is simple: call a family-owned, BBB-accredited cleaner for a free quote. <a href="../contact.html">Get a free estimate</a> or call <a href="tel:+13147183632">(314) 718-3632</a> we\'ll ask a few questions and tell you honestly whether your home is overdue.</p>'
      }
    ],
    cta: 'Spotted a Sign?',
    ctaText: 'Call us for a free phone quote. Same-day service often available across Greater St. Louis.',
  },
  {
    slug: 'air-duct-cleaning-cost-st-louis',
    title: 'Air Duct Cleaning Cost in St. Louis Honest Pricing Guide',
    metaDesc: 'How much should air duct cleaning cost in St. Louis? Here\'s an honest breakdown of pricing, what drives cost up or down, and how to spot rip-offs.',
    eyebrow: 'Pricing Guide • 7 min read',
    h1: 'Air Duct Cleaning Cost in St. Louis Honest Pricing Guide',
    intro: 'Air duct cleaning prices vary widely and unfortunately, the industry has some bad actors. You\'ve probably seen the $79 "whole house cleaning" coupons in the mail. They\'re bait. Here\'s an honest look at what professional duct cleaning actually costs in St. Louis, what drives the price up or down, and how to spot the scams.',
    image: '../images/work-photo.jpg',
    image_alt: 'Air duct cleaning cost guide for St. Louis',
    sections: [
      {
        h: 'The Honest Pricing Range',
        body: '<p>For a typical St. Louis home with one HVAC system, professional duct cleaning falls in a fair range that depends on a handful of factors. Smaller homes or simpler systems land at the lower end of that range. Larger homes, multi-zone systems, or homes with heavy buildup land higher. Any reputable cleaner will give you a written quote based on your specific home not a flat "everyone pays the same" coupon price.</p><p>Why we don\'t publish exact dollar figures: every home is different. A 1,200-square-foot ranch with one HVAC unit is a fundamentally different job than a 4,500-square-foot home with three zones. Quoting one price for both is dishonest. Call us and we\'ll give you a real number for your real home.</p>'
      },
      {
        h: 'What Drives the Price Up',
        body: '<ul><li><strong>Home size.</strong> More square footage = more ductwork = more time and labor.</li><li><strong>Number of HVAC systems.</strong> A home with two or three zoned systems takes 2-3x longer than a single-system home.</li><li><strong>Number of registers/vents.</strong> Each one is hand-cleaned individually.</li><li><strong>Condition of the ductwork.</strong> Heavy buildup from years of neglect, pets, smokers, or post-construction debris takes longer to extract.</li><li><strong>Accessibility.</strong> Crawl-space air handlers, attic units, or finished basements with hidden duct chases all add time.</li><li><strong>Add-on services.</strong> Sanitization, coil cleaning, or dryer vent service add to the base price.</li></ul>'
      },
      {
        h: 'What Drives the Price Down',
        body: '<ul><li><strong>Smaller homes.</strong> A 1,000 sq ft condo with a single HVAC is one of our fastest jobs.</li><li><strong>One HVAC system.</strong> Single-zone homes always quote lower than multi-zone.</li><li><strong>Recent prior cleaning.</strong> If you had service 3-4 years ago, the system likely has less buildup and the cleaning goes faster.</li><li><strong>Bundled services.</strong> Booking duct + dryer vent on the same visit usually saves on the dryer vent portion.</li></ul>'
      },
      {
        h: 'How to Spot the Rip-Offs',
        body: '<p>The duct cleaning industry has a few common scams. Watch for these red flags:</p><ul><li><strong>Bait-and-switch coupons.</strong> "$79 whole-house cleaning!" The truck arrives and suddenly the price is $499 because of "extra ducts" or "mold" or "system condition." Always get the price <em>in writing</em> before work starts.</li><li><strong>Made-up mold problems.</strong> Some companies "find" mold in every duct system they enter and pressure homeowners into expensive remediation. Real mold problems exist, but they\'re not in every home.</li><li><strong>Pay-by-the-vent pricing.</strong> "We charge $25 per vent." Then they "find" 30 vents in your home. Reputable cleaners price by the system, not by piece-meal counts.</li><li><strong>No written estimate before starting.</strong> Always demand a written estimate and signed agreement before work begins.</li><li><strong>High-pressure same-day sales.</strong> "If you don\'t do this today the price doubles." Walk away.</li><li><strong>No physical address.</strong> If the company can\'t tell you where their office is, that\'s a problem. We\'re at 2916 Ohio Ave, St. Louis, MO 63118.</li><li><strong>No reviews or BBB profile.</strong> Real local companies have a track record. <a href="../reviews.html">See ours.</a></li></ul>'
      },
      {
        h: 'How to Get a Fair Quote',
        body: '<p>Three simple steps:</p><ol style="padding-left: 20px;"><li><strong>Call 2-3 reputable local cleaners</strong> (we\'re happy to be one of them). Get phone quotes for your specific home square footage, number of HVAC units, age of system, last cleaning.</li><li><strong>Ask about what\'s included.</strong> Some cleaners do supply ducts only; others include returns and air handler. Compare apples to apples.</li><li><strong>Read recent reviews.</strong> Not just on the company\'s own site Google, Yelp, BBB, HomeAdvisor. Look for consistency across platforms.</li></ol>'
      },
      {
        h: 'Why We Don\'t Discount',
        body: '<p>You\'ll notice we don\'t advertise discounts or coupons. Here\'s why: we charge a fair, sustainable price the first time, every time. Companies that advertise huge "discounts" usually inflate their base price first to make the discount look bigger. We\'d rather quote you honestly upfront and earn your trust.</p>'
      },
      {
        h: 'Get a Real Quote for Your Real Home',
        body: '<p>Tell us your home: square footage, number of HVAC units, age of system, last cleaning, pets, anyone with allergies. We\'ll give you a real quote in writing, no obligation. If you\'re ready to schedule, we can usually be at your home within a day or two. Same-day service often available.</p><p><a href="../contact.html" class="btn btn-primary">Get Free Estimate</a> or call <a href="tel:+13147183632"><strong>(314) 718-3632</strong></a></p>'
      }
    ],
    cta: 'Get an Honest Quote',
    ctaText: 'No coupons, no upsells, no surprises. Just a written estimate based on your real home.',
  },
  {
    slug: 'dryer-vent-fire-safety',
    title: 'Dryer Vent Fire Safety: What Every Homeowner Should Know',
    metaDesc: 'Nearly 2,900 dryer fires happen in the US every year. Lint buildup is the #1 cause. Here\'s the complete safety guide for homeowners.',
    eyebrow: 'Fire Safety • 6 min read',
    h1: 'Dryer Vent Fire Safety: What Every Homeowner Should Know',
    intro: 'Every year in the U.S., dryers cause nearly 2,900 home fires resulting in deaths, injuries, and over $35 million in property damage. The leading cause is one easy thing to fix: <strong>lint buildup in the dryer vent.</strong> Here\'s what every homeowner needs to know about preventing it.',
    image: '../images/hero-tech-working.jpg',
    image_alt: 'Dryer vent fire safety guide',
    sections: [
      {
        h: 'How Dryer Fires Actually Start',
        body: '<p>Lint is highly flammable. The lint trap inside your dryer catches only a fraction of what your clothes produce the rest builds up inside the vent line over months and years. As the line gets clogged, hot air can\'t escape efficiently. The dryer overheats. Eventually the heating element ignites the lint and the fire spreads through the vent line into the wall, the laundry room, and the rest of the home.</p><p>The U.S. Fire Administration reports that lint buildup is the leading factor contributing to dryer fires. The fix is simple annual professional cleaning of the entire vent line, not just the lint trap.</p>'
      },
      {
        h: 'Warning Signs Your Vent Is Dangerous',
        body: '<p>If any of these are happening in your home, schedule a cleaning <em>this week</em>:</p><ul><li><strong>Clothes take more than one cycle to dry.</strong> The most common sign of a clogged vent.</li><li><strong>Dryer feels excessively hot to the touch.</strong> Restricted airflow makes the unit overheat.</li><li><strong>Burning smell when the dryer runs.</strong> Lint scorching on the heating element. Stop using the dryer immediately.</li><li><strong>Lint visible around the dryer or outside vent.</strong> Backed-up lint escaping where it shouldn\'t.</li><li><strong>Lint trap fills faster than usual.</strong> Restricted airflow throughout the entire system.</li><li><strong>Laundry room is hotter or more humid than normal during a cycle.</strong> Heat that should vent outside is staying inside.</li><li><strong>It\'s been more than a year since the last cleaning.</strong> Schedule one now.</li></ul>'
      },
      {
        h: 'What the Lint Trap Doesn\'t Catch',
        body: '<p>The lint trap inside your dryer catches roughly 70% of the lint your clothes produce. The other 30% the fine, fluffy stuff that escapes the trap gets blown into the vent line. Over time, that fine lint accumulates inside the vent walls, around bends, and at the outside termination. After a year of regular use, most vent lines have a substantial buildup. After three or four years without cleaning, many are dangerously clogged.</p>'
      },
      {
        h: 'Why Newer Homes Are at Higher Risk',
        body: '<p>Counterintuitively, newer homes often have <em>worse</em> vent problems than older homes. The reason: longer vent runs. Older homes typically had short, direct vent paths from the dryer to the outside wall. Newer construction often runs the vent through walls, ceilings, attics, or up through the roof sometimes 20 to 40 feet or more, with multiple bends. Every bend is a place lint accumulates faster.</p><p>If you live in a home built after 2000, your vent line is probably longer and more complex than you think. That makes annual cleaning even more important.</p>'
      },
      {
        h: 'How Often to Clean',
        body: '<p>The standard recommendation is <strong>once per year</strong>. Households that do laundry every day, families with multiple kids, or homes with long vent runs should consider <strong>every 6 months</strong>. The cost of cleaning is small. The cost of a fire is catastrophic.</p>'
      },
      {
        h: 'What Professional Cleaning Includes',
        body: '<p>A professional dryer vent cleaning is more than running a brush through the line. We:</p><ul><li>Disconnect the dryer and inspect the connection</li><li>Clean the full vent line from the dryer to the outside termination</li><li>Use industrial vacuums to capture lint at the source</li><li>Run a mechanical brush through the entire line to dislodge packed lint</li><li>Inspect the outside vent cap (often blocked by lint, birds, or debris)</li><li>Check all connection joints for proper sealing</li><li>Run an airflow test to verify the line is clear</li><li>Reconnect the dryer and confirm it\'s working properly</li></ul>'
      },
      {
        h: 'Things You Can Do at Home',
        body: '<p>Between professional cleanings, you can reduce risk yourself:</p><ul><li><strong>Empty the lint trap before every load.</strong> Every. Single. Load.</li><li><strong>Wipe the lint trap monthly</strong> with a damp cloth fabric softener residue clogs the screen even when it looks clean.</li><li><strong>Don\'t leave the dryer running unattended</strong> when leaving the house or going to sleep.</li><li><strong>Inspect the outside vent cap monthly</strong> make sure the flap moves freely and isn\'t blocked.</li><li><strong>Pull the dryer out once a year</strong> and vacuum behind it.</li><li><strong>Don\'t overload the dryer</strong> restricted airflow even with a clean vent is dangerous.</li><li><strong>Replace plastic or vinyl flex hose</strong> with rigid metal duct (much safer and easier to clean).</li></ul>'
      },
      {
        h: 'Schedule Cleaning Now',
        body: '<p>Annual dryer vent cleaning is one of the easiest and most affordable home maintenance tasks and one of the most important. If you can\'t remember the last time you had it done, or any of the warning signs above are happening in your home, schedule a cleaning today. Same-day service often available in Greater St. Louis.</p>'
      }
    ],
    cta: 'Schedule Your Dryer Vent Cleaning',
    ctaText: 'Same-day service often available. Free phone quotes. Family-owned since 2014.',
  },
];

const buildPost = (post) => `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${post.title} | 1st Global Air Duct Cleaning</title>
  <meta name="description" content="${post.metaDesc}">
  <meta name="robots" content="index, follow">
  <link rel="canonical" href="https://1stglobalairductcleaning.com/blog/${post.slug}.html">

  <meta property="og:type" content="article">
  <meta property="og:url" content="https://1stglobalairductcleaning.com/blog/${post.slug}.html">
  <meta property="og:title" content="${post.title}">
  <meta property="og:description" content="${post.metaDesc}">
  <meta property="og:image" content="https://1stglobalairductcleaning.com${post.image.replace('..', '')}">

  <link rel="icon" type="image/png" href="../images/logo.png">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Poppins:wght@500;600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="../css/style.css">

  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "${post.title}",
    "description": "${post.metaDesc}",
    "image": "https://1stglobalairductcleaning.com${post.image.replace('..', '')}",
    "author": {
      "@type": "Organization",
      "name": "1st Global Air Duct Cleaning",
      "url": "https://1stglobalairductcleaning.com/"
    },
    "publisher": {
      "@type": "Organization",
      "name": "1st Global Air Duct Cleaning",
      "logo": {
        "@type": "ImageObject",
        "url": "https://1stglobalairductcleaning.com/images/logo.png"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": "https://1stglobalairductcleaning.com/blog/${post.slug}.html"
    }
  }
  </script>
  <script>
    var _paq = window._paq = window._paq || [];
    _paq.push(["setDocumentTitle", document.domain + "/" + document.title]);
    _paq.push(["setCookieDomain", "*.1stglobalairductcleaning.com"]);
    _paq.push(["setDomains", ["*.1stglobalairductcleaning.com"]]);
    _paq.push(['trackPageView']);
    _paq.push(['enableLinkTracking']);
    (function() {
      var u = "https://matomo.alphalockandsafe.com/matomo/";
      _paq.push(['setTrackerUrl', u + 'matomo.php']);
      _paq.push(['setSiteId', '17']);
      var d = document, g = d.createElement('script'), s = d.getElementsByTagName('script')[0];
      g.async = true;
      g.src = u + 'matomo.js';
      s.parentNode.insertBefore(g, s);
    })();
  </script>
</head>
<body>
  <noscript><p><img referrerpolicy="no-referrer-when-downgrade" src="https://matomo.alphalockandsafe.com/matomo/matomo.php?idsite=17&amp;rec=1" style="border:0;" alt="" /></p></noscript>

  <div class="top-bar">
    <div class="container">
      <div class="top-bar-content">
        <div class="top-bar-info">
          <span>📍 2916 Ohio Ave, St. Louis, MO 63118</span>
          <span>🕐 Open Daily 8:00 AM – 9:00 PM</span>
        </div>
        <a href="tel:+13147183632" class="top-bar-cta">📞 Call (314) 718-3632</a>
      </div>
    </div>
  </div>

  <header class="header">
    <div class="container">
      <div class="header-inner">
        <a href="../index.html" class="logo">
          <img src="../images/logo.png" alt="1st Global Air Duct Cleaning Logo">
          <div class="logo-text">1st Global Air Duct Cleaning<span>St. Louis, MO • Since 2014</span></div>
        </a>
        <nav>
          <ul class="nav-list" id="navList">
            <li><a href="../index.html">Home</a></li>
            <li><a href="../services.html">Services</a></li>
            <li><a href="../service-areas.html">Service Areas</a></li>
            <li><a href="../gallery.html">Gallery</a></li>
            <li><a href="../reviews.html">Reviews</a></li>
            <li><a href="../faq.html">FAQ</a></li>
            <li><a href="../blog.html" class="active">Blog</a></li>
            <li><a href="../about.html">About</a></li>
            <li><a href="../contact.html">Contact</a></li>
          </ul>
        </nav>
        <div class="nav-cta">
          <a href="../contact.html" class="btn btn-primary">Free Estimate</a>
          <button class="mobile-menu-toggle" id="mobileMenuToggle" aria-label="Toggle navigation">
            <span></span><span></span><span></span>
          </button>
        </div>
      </div>
    </div>
  </header>

  <div class="page-header">
    <div class="container">
      <div class="breadcrumbs">
        <a href="../index.html">Home</a><span>/</span><a href="../blog.html">Blog</a><span>/</span><span>${post.title}</span>
      </div>
      <h1>${post.h1}</h1>
      <p>${post.eyebrow}</p>
    </div>
  </div>

  <section>
    <div class="container">
      <div class="article-content">
        <p class="lead">${post.intro}</p>

        <img src="${post.image}" alt="${post.image_alt}" style="width: 100%; max-width: 900px; aspect-ratio: 16/9; object-fit: cover; border-radius: 12px; margin: 32px auto; display: block; box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1);" loading="lazy">

${post.sections.map(s => ` <h2>${s.h}</h2>\n ${s.body}`).join('\n\n')}
      </div>
    </div>
  </section>

  <section class="cta-section">
    <div class="container">
      <h2>${post.cta}</h2>
      <p>${post.ctaText}</p>
      <div class="cta-buttons">
        <a href="../contact.html" class="btn btn-primary btn-large">Get Free Estimate</a>
        <a href="tel:+13147183632" class="btn btn-light btn-large">📞 Call (314) 718-3632</a>
      </div>
    </div>
  </section>

  <section class="bg-alt">
    <div class="container">
      <div class="section-header">
        <span class="section-eyebrow">More Articles</span>
        <h2>Keep Reading</h2>
      </div>
      <div class="blog-grid">
        <article class="blog-card">
          <div class="blog-card-body">
            <span class="blog-card-meta">Guide</span>
            <h3><a href="how-often-clean-air-ducts.html">How Often Should You Clean Your Air Ducts?</a></h3>
            <p>NADCA says every 3-7 years. Here's what really matters for your specific home.</p>
            <a href="how-often-clean-air-ducts.html" class="blog-card-link">Read More →</a>
          </div>
        </article>
        <article class="blog-card">
          <div class="blog-card-body">
            <span class="blog-card-meta">Checklist</span>
            <h3><a href="10-signs-air-ducts-need-cleaning.html">10 Signs Your Air Ducts Need Cleaning RIGHT NOW</a></h3>
            <p>Visible dust, musty smell, allergies 10 red flags that mean it's time.</p>
            <a href="10-signs-air-ducts-need-cleaning.html" class="blog-card-link">Read More →</a>
          </div>
        </article>
        <article class="blog-card">
          <div class="blog-card-body">
            <span class="blog-card-meta">Pricing</span>
            <h3><a href="air-duct-cleaning-cost-st-louis.html">Air Duct Cleaning Cost in St. Louis</a></h3>
            <p>An honest pricing guide and how to spot the rip-off coupons.</p>
            <a href="air-duct-cleaning-cost-st-louis.html" class="blog-card-link">Read More →</a>
          </div>
        </article>
        <article class="blog-card">
          <div class="blog-card-body">
            <span class="blog-card-meta">Safety</span>
            <h3><a href="dryer-vent-fire-safety.html">Dryer Vent Fire Safety</a></h3>
            <p>Nearly 2,900 dryer fires per year. The complete homeowner safety guide.</p>
            <a href="dryer-vent-fire-safety.html" class="blog-card-link">Read More →</a>
          </div>
        </article>
      </div>
    </div>
  </section>

  <footer class="footer">
    <div class="container">
      <div class="footer-grid">
        <div class="footer-brand">
          <img src="../images/logo.png" alt="1st Global Air Duct Cleaning">
          <p>Family-owned and operated since 2014. Serving Greater St. Louis with professional air duct and dryer vent cleaning. BBB Accredited &amp; Best of BusinessRate 2025.</p>
        </div>
        <div>
          <h4>Services</h4>
          <div class="footer-links">
            <a href="../air-duct-cleaning.html">Air Duct Cleaning</a>
            <a href="../dryer-vent-cleaning.html">Dryer Vent Cleaning</a>
            <a href="../hvac-cleaning.html">HVAC Cleaning</a>
            <a href="../commercial-air-duct-cleaning.html">Commercial Cleaning</a>
            <a href="../air-duct-sanitization.html">Sanitization</a>
          </div>
        </div>
        <div>
          <h4>Quick Links</h4>
          <div class="footer-links">
            <a href="../index.html">Home</a>
            <a href="../about.html">About Us</a>
            <a href="../services.html">All Services</a>
            <a href="../service-areas.html">Service Areas</a>
            <a href="../reviews.html">Reviews</a>
            <a href="../faq.html">FAQ</a>
            <a href="../blog.html">Blog</a>
            <a href="../contact.html">Contact</a>
            <a href="../privacy.html">Privacy Policy</a>
          </div>
        </div>
        <div>
          <h4>Contact</h4>
          <div class="footer-contact">
            <div class="footer-contact-item">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              <a href="tel:+13147183632">(314) 718-3632</a>
            </div>
            <div class="footer-contact-item">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
              <a href="mailto:info@1stglobalairductcleaning.com">info@1stglobalairductcleaning.com</a>
            </div>
            <div class="footer-contact-item">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
              <span>2916 Ohio Ave<br>St. Louis, MO 63118</span>
            </div>
            <div class="footer-contact-item">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              <span>Open Daily<br>8:00 AM – 9:00 PM</span>
            </div>
          </div>
        </div>
      </div>
      <div class="footer-bottom">
        <div>© 2026 1st Global Air Duct Cleaning. All rights reserved.</div>
        <div class="footer-bottom-links">
          <a href="../privacy.html">Privacy Policy</a>
          <a href="../contact.html">Contact</a>
        </div>
      </div>
    </div>
  </footer>

  <a href="tel:+13147183632" class="sticky-call">
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
    Call Now
  </a>
  <script src="../js/main.js"></script>
</body>
</html>
`;

posts.forEach((post) => {
  const filename = path.join(__dirname, 'blog', `${post.slug}.html`);
  fs.writeFileSync(filename, buildPost(post));
  console.log(`Generated: blog/${post.slug}.html`);
});

console.log(`\nTotal: ${posts.length} blog posts generated.`);
