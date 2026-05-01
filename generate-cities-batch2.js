// Second batch of city pages - the remaining 14 cities
const fs = require('fs');
const path = require('path');

const cities = [
  {
    slug: 'arnold-mo',
    name: 'Arnold',
    state: 'MO',
    population: '21,000',
    intro: 'Jefferson County\'s largest city. Established neighborhoods with mature housing stock benefit greatly from professional duct cleaning every few years.',
    paragraphs: [
      'Arnold is the biggest city in Jefferson County and our primary market south of the St. Louis core. Most of Arnold\'s residential neighborhoods were built between the 1960s and 1990s, with split-level and ranch-style homes making up the bulk of the housing stock. After 30 to 60 years of HVAC use, these homes typically have a substantial dust load in their ductwork.',
      'Jefferson County\'s mix of established neighborhoods and rural-edge construction means we see a wide variety of duct systems in Arnold. Older homes near downtown have aging galvanized ductwork. Newer subdivisions on the city\'s southern edges have flex-duct branch lines that are often improperly installed and need careful attention.',
      'We make trips to Arnold and Jefferson County multiple days a week. Same-week scheduling is standard, with same-day often available for dryer vent jobs.',
    ],
    neighborhoods: ['Downtown Arnold', 'Highway 141 corridor', 'Telegraph Road area'],
    nearbyCities: [
      { slug: 'st-louis-mo', name: 'St. Louis, MO' },
      { slug: 'kirkwood-mo', name: 'Kirkwood, MO' },
      { slug: 'webster-groves-mo', name: 'Webster Groves, MO' },
    ],
    drivetime: '20-25 minutes from our St. Louis base.',
  },
  {
    slug: 'ballwin-mo',
    name: 'Ballwin',
    state: 'MO',
    population: '30,000',
    intro: 'Established West County suburb where we have many repeat customers. Ballwin\'s family neighborhoods particularly value our same-day service availability.',
    paragraphs: [
      'Ballwin is one of West County\'s most established suburbs, with a deep mix of homes from the 1970s through today. Many of the neighborhoods built in the 70s and 80s have HVAC systems that have been replaced once or twice but the ductwork itself is still original. Cleaning that ductwork is one of the highest-impact maintenance items these homes can have.',
      'Ballwin homes often have full basements with the air handler in a finished or partially-finished basement room. That accessibility makes our work easier and faster we can usually clean a Ballwin home in 2-3 hours.',
      'We have many repeat customers in Ballwin who book us every 4-5 years on a maintenance schedule. The pattern works: visible dust drops, allergies improve, and the system runs better between cleanings.',
    ],
    neighborhoods: ['Manchester Road corridor', 'Clayton Road area', 'New Ballwin Road area'],
    nearbyCities: [
      { slug: 'manchester-mo', name: 'Manchester, MO' },
      { slug: 'ellisville-mo', name: 'Ellisville, MO' },
      { slug: 'wildwood-mo', name: 'Wildwood, MO' },
      { slug: 'chesterfield-mo', name: 'Chesterfield, MO' },
      { slug: 'kirkwood-mo', name: 'Kirkwood, MO' },
    ],
    drivetime: '20-25 minutes from our St. Louis base.',
  },
  {
    slug: 'manchester-mo',
    name: 'Manchester',
    state: 'MO',
    population: '18,000',
    intro: 'Right next to Ballwin in West County, with a similar mix of established homes and newer developments along Manchester Road.',
    paragraphs: [
      'Manchester is a sister city to Ballwin in many ways similar housing stock, similar demographics, similar HVAC systems. Most Manchester homes are 30-50 years old, with central HVAC that\'s seen decades of dust, pollen, and pet hair.',
      'The city\'s position along Manchester Road (the busy commercial corridor) means a lot of homes are close to a high-traffic area, which contributes to outdoor dust loads making their way into return registers. Add summer humidity and the typical St. Louis pollen calendar, and Manchester homes benefit significantly from cleaning every few years.',
      'We schedule throughout Manchester regularly. Same-day service often available, same-week is the standard.',
    ],
    neighborhoods: ['Manchester Road corridor', 'Old Trails area', 'Winding Trails area'],
    nearbyCities: [
      { slug: 'ballwin-mo', name: 'Ballwin, MO' },
      { slug: 'kirkwood-mo', name: 'Kirkwood, MO' },
      { slug: 'des-peres-mo', name: 'Des Peres, MO' },
      { slug: 'ellisville-mo', name: 'Ellisville, MO' },
    ],
    drivetime: '20 minutes from our St. Louis base.',
  },
  {
    slug: 'ellisville-mo',
    name: 'Ellisville',
    state: 'MO',
    population: '10,000',
    intro: 'Smaller West County city with primarily residential customers. We\'re a regular presence in Ellisville neighborhoods.',
    paragraphs: [
      'Ellisville is a smaller West County city with a tight-knit community feel. Most of the housing stock is single-family residential, ranging from mid-century homes to newer subdivisions on the city\'s edges. We\'ve cleaned ducts in homes throughout Ellisville and have built a reputation through word of mouth among neighbors.',
      'A common pattern in Ellisville: one homeowner books us, the neighbors notice the difference (better airflow, less dust around vents), and we end up scheduling 2-3 more cleanings on the same street within a few weeks. We love that.',
      'Same-week service is standard. Free phone quotes we\'ll ask about your home and give you an honest answer.',
    ],
    neighborhoods: ['Clarkson Road corridor', 'Manchester Road area', 'Strecker Road area'],
    nearbyCities: [
      { slug: 'ballwin-mo', name: 'Ballwin, MO' },
      { slug: 'wildwood-mo', name: 'Wildwood, MO' },
      { slug: 'manchester-mo', name: 'Manchester, MO' },
      { slug: 'chesterfield-mo', name: 'Chesterfield, MO' },
    ],
    drivetime: '25-30 minutes from our St. Louis base.',
  },
  {
    slug: 'des-peres-mo',
    name: 'Des Peres',
    state: 'MO',
    population: '8,500',
    intro: 'Compact, affluent community in West County. We serve homeowners throughout Des Peres.',
    paragraphs: [
      'Des Peres is a small but affluent West County community with a high concentration of well-maintained homes. The housing here ranges from mid-century ranches to larger contemporary builds, with several established neighborhoods near the West County Center area.',
      'Des Peres homeowners tend to take house maintenance seriously, and duct cleaning is part of that mindset. We have a number of repeat customers here who schedule us every 3-4 years on a regular maintenance interval. The before-and-after photos we provide help homeowners see exactly what they\'re paying for.',
      'We can usually be at a Des Peres home within a day or two of the call. Same-day service often available.',
    ],
    neighborhoods: ['Manchester Road corridor', 'Dougherty Ferry Road area', 'Old Bonhomme Road area'],
    nearbyCities: [
      { slug: 'kirkwood-mo', name: 'Kirkwood, MO' },
      { slug: 'ballwin-mo', name: 'Ballwin, MO' },
      { slug: 'ladue-mo', name: 'Ladue, MO' },
      { slug: 'town-and-country-mo', name: 'Town and Country, MO' },
    ],
    drivetime: '20 minutes from our St. Louis base.',
  },
  {
    slug: 'maryland-heights-mo',
    name: 'Maryland Heights',
    state: 'MO',
    population: '28,000',
    intro: 'Diverse community with family neighborhoods throughout. We serve homeowners across Maryland Heights.',
    paragraphs: [
      'Maryland Heights is one of the most diverse markets we serve, with everything from older mid-century neighborhoods to newer condo developments to large entertainment-district properties. The housing variety means we\'ve seen just about every duct configuration in this city.',
      'Maryland Heights also has higher humidity in some neighborhoods due to proximity to the Missouri River and Creve Coeur Lake which means slightly elevated mold risk in HVAC systems. Annual sanitization paired with cleaning every few years is a common combination for homes here.',
      'We work in Maryland Heights several days a week, with same-week scheduling standard.',
    ],
    neighborhoods: ['Schuetz Road corridor', 'Dorsett Road area', 'Page Avenue area'],
    nearbyCities: [
      { slug: 'creve-coeur-mo', name: 'Creve Coeur, MO' },
      { slug: 'florissant-mo', name: 'Florissant, MO' },
      { slug: 'university-city-mo', name: 'University City, MO' },
      { slug: 'st-peters-mo', name: 'St. Peters, MO' },
    ],
    drivetime: '20-25 minutes from our St. Louis base.',
  },
  {
    slug: 'university-city-mo',
    name: 'University City',
    state: 'MO',
    population: '35,000',
    intro: 'Historic homes near Washington University. Many older homes with original (or aging) HVAC systems a great market for our professional duct cleaning.',
    paragraphs: [
      'University City is one of our favorite markets for old-house duct cleaning. The Loop area, the streets around Washington University, and the historic neighborhoods toward Forest Park all feature homes that are 80 to 120 years old. Their HVAC systems were retrofitted over the years, and the ductwork has accumulated decades of dust.',
      'Many U City homes have central HVAC that was added during 1960s through 90s renovations. The original ductwork was often run through plaster wall chases or attic spaces with limited access. We have the experience and equipment to handle these challenging older systems carefully.',
      'We work U City regularly. Whether you\'re in the Loop, near Wash U, or in one of the established residential neighborhoods, we cover the entire city. Free phone quotes anytime.',
    ],
    neighborhoods: ['The Loop', 'Wash U area', 'Big Bend area', 'Olive Boulevard corridor'],
    nearbyCities: [
      { slug: 'clayton-mo', name: 'Clayton, MO' },
      { slug: 'st-louis-mo', name: 'St. Louis, MO' },
      { slug: 'ladue-mo', name: 'Ladue, MO' },
      { slug: 'webster-groves-mo', name: 'Webster Groves, MO' },
    ],
    drivetime: '15 minutes from our St. Louis base.',
  },
  {
    slug: 'hazelwood-mo',
    name: 'Hazelwood',
    state: 'MO',
    population: '25,000',
    intro: 'Established residential community in North County. We serve homeowners throughout the Hazelwood area.',
    paragraphs: [
      'Hazelwood is one of North County\'s established residential communities, with most homes built between the 1960s and 1990s. These homes have HVAC systems that have been working for decades, and the duct buildup typically reflects that history.',
      'A pattern we see frequently in Hazelwood: families that have lived in the same home for 20+ years and never had professional cleaning. The first cleaning is dramatic it\'s common to see 5-10 pounds of dust, hair, and debris extracted from a home\'s duct system. The improvement in air quality is immediately noticeable.',
      'We work Hazelwood and the broader North County area regularly. Same-day service often available; same-week is the standard.',
    ],
    neighborhoods: ['Lindbergh corridor', 'Howdershell Road area', 'McDonnell Boulevard area'],
    nearbyCities: [
      { slug: 'florissant-mo', name: 'Florissant, MO' },
      { slug: 'maryland-heights-mo', name: 'Maryland Heights, MO' },
      { slug: 'st-louis-mo', name: 'St. Louis, MO' },
    ],
    drivetime: '20-25 minutes from our St. Louis base.',
  },
  {
    slug: 'ofallon-il',
    name: 'O\'Fallon',
    state: 'IL',
    population: '32,000',
    intro: 'Near Scott Air Force Base, with a mix of military families and longtime residents. We serve homes throughout O\'Fallon Illinois weekly.',
    paragraphs: [
      'O\'Fallon, IL has a unique mix of military families (Scott Air Force Base is nearby) and longtime Illinois residents. The constant turnover from military reassignments means a lot of homes change hands frequently, and incoming families often book duct cleaning as part of their move-in process. We\'ve cleaned a lot of homes in O\'Fallon for new arrivals who don\'t know the home\'s prior history.',
      'O\'Fallon\'s newer subdivisions tend to need cleaning sooner than expected construction dust settles into duct systems during builds and never leaves on its own. If you\'re in a 2010s+ home that has never had professional cleaning, we strongly recommend it.',
      'We make weekly trips across the river to the Metro East. Same-week scheduling is the norm; call early in the week for the best appointment options.',
    ],
    neighborhoods: ['Scott AFB area', 'Highway 50 corridor', 'Green Mount Road area'],
    nearbyCities: [
      { slug: 'belleville-il', name: 'Belleville, IL' },
      { slug: 'fairview-heights-il', name: 'Fairview Heights, IL' },
      { slug: 'collinsville-il', name: 'Collinsville, IL' },
      { slug: 'edwardsville-il', name: 'Edwardsville, IL' },
    ],
    drivetime: '25-30 minutes from our St. Louis base.',
  },
  {
    slug: 'collinsville-il',
    name: 'Collinsville',
    state: 'IL',
    population: '24,000',
    intro: 'Historic Madison County city with strong residential demand for air duct cleaning. We\'re regularly in Collinsville neighborhoods.',
    paragraphs: [
      'Collinsville is a historic Madison County city with a deep mix of older brick homes near downtown and newer construction on the city\'s edges. The city\'s position right off I-55 and I-70 makes it accessible and the housing stock variety means we see all kinds of duct systems.',
      'Many Collinsville homes near the historic center have HVAC retrofitted into older homes that originally had radiator heat. These systems often have small-bore ductwork running through tight spaces, which can collect buildup faster than modern installations. Our equipment handles both old and new systems.',
      'We schedule Collinsville regularly. Free phone quotes for any home in the area.',
    ],
    neighborhoods: ['Downtown Collinsville', 'Highway 159 corridor', 'Caseyville Road area'],
    nearbyCities: [
      { slug: 'edwardsville-il', name: 'Edwardsville, IL' },
      { slug: 'belleville-il', name: 'Belleville, IL' },
      { slug: 'fairview-heights-il', name: 'Fairview Heights, IL' },
    ],
    drivetime: '20-25 minutes from our St. Louis base.',
  },
  {
    slug: 'alton-il',
    name: 'Alton',
    state: 'IL',
    population: '26,000',
    intro: 'Historic Mississippi River city with beautiful older homes many in need of professional duct attention. Limestone bluffs and humid summers make indoor air quality especially important here.',
    paragraphs: [
      'Alton is one of the most historic cities in the Metro East, with a riverfront downtown that dates back nearly 200 years and a housing stock full of beautiful older homes. Many Alton homes are 80-150 years old, with HVAC systems retrofitted into spaces that weren\'t designed for them.',
      'The combination of Mississippi River humidity, limestone bluffs, and dense old-growth trees means Alton\'s outdoor air carries a lot of moisture and pollen. That moisture and pollen ends up in HVAC systems making annual or every-few-year duct cleaning especially valuable here.',
      'We make trips to Alton every couple weeks. Same-week scheduling for the area; call us with your address and we\'ll let you know our next available slot.',
    ],
    neighborhoods: ['Historic Downtown', 'Brown Street area', 'Alby Street area'],
    nearbyCities: [
      { slug: 'edwardsville-il', name: 'Edwardsville, IL' },
      { slug: 'belleville-il', name: 'Belleville, IL' },
      { slug: 'collinsville-il', name: 'Collinsville, IL' },
    ],
    drivetime: '40-45 minutes from our St. Louis base.',
  },
  {
    slug: 'fairview-heights-il',
    name: 'Fairview Heights',
    state: 'IL',
    population: '17,000',
    intro: 'Major Metro East residential hub. We serve homeowners throughout Fairview Heights neighborhoods.',
    paragraphs: [
      'Fairview Heights is one of the busier residential markets in the Metro East. The city\'s position along I-64 makes it a hub for shopping and services, but the residential neighborhoods set back from the highway are quiet, family-oriented, and full of homes that benefit from regular HVAC maintenance.',
      'Most Fairview Heights homes are 30-50 years old, with HVAC systems that have been working through several decades of Illinois weather. Cleaning the duct system every few years restores airflow, removes accumulated dust and pet dander, and helps the HVAC last longer.',
      'We work Fairview Heights regularly. Same-week scheduling; same-day often available for dryer vent jobs.',
    ],
    neighborhoods: ['Lincoln Trail area', 'Highway 50 corridor', 'Old Collinsville Road area'],
    nearbyCities: [
      { slug: 'belleville-il', name: 'Belleville, IL' },
      { slug: 'ofallon-il', name: 'O\'Fallon, IL' },
      { slug: 'collinsville-il', name: 'Collinsville, IL' },
    ],
    drivetime: '25 minutes from our St. Louis base.',
  },
  {
    slug: 'glen-carbon-il',
    name: 'Glen Carbon',
    state: 'IL',
    population: '13,000',
    intro: 'Affluent IL community next to Edwardsville. Newer developments and family homes many of which we\'ve cleaned multiple times over the years.',
    paragraphs: [
      'Glen Carbon is one of the most affluent communities in the Metro East, with a housing stock dominated by newer single-family homes built in the 1990s, 2000s, and 2010s. Many of these homes have multi-zone HVAC systems with extensive ductwork and the cleaning needs scale with the size of the system.',
      'A common pattern in Glen Carbon: homeowners book us 5-7 years after move-in once they realize the original construction dust never really cleared out of the duct system. The first cleaning often pulls a substantial amount of fine drywall and sawdust that\'s been quietly circulating since the home was built.',
      'We schedule Glen Carbon weekly. Same-week service is standard.',
    ],
    neighborhoods: ['Cottonwood Road area', 'Meridian Road area', 'I-270 corridor'],
    nearbyCities: [
      { slug: 'edwardsville-il', name: 'Edwardsville, IL' },
      { slug: 'collinsville-il', name: 'Collinsville, IL' },
      { slug: 'belleville-il', name: 'Belleville, IL' },
    ],
    drivetime: '25-30 minutes from our St. Louis base.',
  },
  {
    slug: 'waterloo-il',
    name: 'Waterloo',
    state: 'IL',
    population: '10,000',
    intro: 'Monroe County\'s largest city, just south of the Metro East. We make regular trips to Waterloo to serve residential customers.',
    paragraphs: [
      'Waterloo is the largest city in Monroe County, IL, and one of the southernmost markets we serve. The city has a small-town feel with strong residential demand for home services. Most of the housing is single-family, with a mix of older homes near downtown and newer subdivisions on the edges.',
      'Monroe County\'s rural-edge geography means a lot of homes here are surrounded by trees, fields, and gravel roads all sources of fine dust that ends up in HVAC return registers. After a few years, that buildup adds up, and a professional cleaning is a high-impact maintenance item.',
      'We make Waterloo trips approximately every two weeks. Call us early in the week to coordinate scheduling for the area.',
    ],
    neighborhoods: ['Downtown Waterloo', 'Highway 3 corridor', 'Lakeview Drive area'],
    nearbyCities: [
      { slug: 'belleville-il', name: 'Belleville, IL' },
      { slug: 'fairview-heights-il', name: 'Fairview Heights, IL' },
    ],
    drivetime: '40-45 minutes from our St. Louis base.',
  },
];

const buildPage = (city) => `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Air Duct Cleaning ${city.name}, ${city.state} | 1st Global Air Duct Cleaning</title>
  <meta name="description" content="Professional air duct &amp; dryer vent cleaning in ${city.name}, ${city.state}. Family-owned since 2014. BBB Accredited. Free estimates. Call (314) 718-3632.">
  <meta name="robots" content="index, follow">
  <link rel="canonical" href="https://1stglobalairductcleaning.com/${city.slug}.html">

  <meta property="og:type" content="website">
  <meta property="og:url" content="https://1stglobalairductcleaning.com/${city.slug}.html">
  <meta property="og:title" content="Air Duct Cleaning ${city.name}, ${city.state} | 1st Global Air Duct Cleaning">
  <meta property="og:description" content="Professional air duct cleaning in ${city.name}, ${city.state}. Family-owned since 2014.">
  <meta property="og:image" content="https://1stglobalairductcleaning.com/images/logo.png">

  <link rel="icon" type="image/png" href="images/logo.png">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Poppins:wght@500;600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="css/style.css">

  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "1st Global Air Duct Cleaning - ${city.name} ${city.state}",
    "image": "https://1stglobalairductcleaning.com/images/logo.png",
    "telephone": "+1-314-718-3632",
    "url": "https://1stglobalairductcleaning.com/${city.slug}.html",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "2916 Ohio Ave",
      "addressLocality": "St. Louis",
      "addressRegion": "MO",
      "postalCode": "63118",
      "addressCountry": "US"
    },
    "areaServed": {
      "@type": "City",
      "name": "${city.name}",
      "addressRegion": "${city.state}"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "5",
      "reviewCount": "100"
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
        <a href="index.html" class="logo">
          <img src="images/logo.png" alt="1st Global Air Duct Cleaning Logo">
          <div class="logo-text">1st Global Air Duct Cleaning<span>St. Louis, MO • Since 2014</span></div>
        </a>
        <nav>
          <ul class="nav-list" id="navList">
            <li><a href="index.html">Home</a></li>
            <li><a href="services.html">Services</a></li>
            <li><a href="service-areas.html" class="active">Service Areas</a></li>
            <li><a href="gallery.html">Gallery</a></li>
            <li><a href="reviews.html">Reviews</a></li>
            <li><a href="faq.html">FAQ</a></li>
            <li><a href="blog.html">Blog</a></li>
            <li><a href="about.html">About</a></li>
            <li><a href="contact.html">Contact</a></li>
          </ul>
        </nav>
        <div class="nav-cta">
          <a href="contact.html" class="btn btn-primary">Free Estimate</a>
          <button class="mobile-menu-toggle" id="mobileMenuToggle" aria-label="Toggle navigation">
            <span></span><span></span><span></span>
          </button>
        </div>
      </div>
    </div>
  </header>

  <div class="page-header with-image">
    <div class="page-header-bg" style="background-image: url('images/experienced-cleaners.webp');"></div>
    <div class="container">
      <div class="breadcrumbs">
        <a href="index.html">Home</a><span>/</span><a href="service-areas.html">Service Areas</a><span>/</span><span>${city.name}, ${city.state}</span>
      </div>
      <h1>Air Duct Cleaning in ${city.name}, ${city.state}</h1>
      <p>Family-owned, locally trusted, and serving ${city.name} homes since 2014. Same-day service often available call (314) 718-3632.</p>
    </div>
  </div>

  <section>
    <div class="container">
      <div class="article-content">
        <span class="section-eyebrow">${city.name}, ${city.state}</span>
        <h2>Trusted Air Duct Cleaning in ${city.name}</h2>
        <p class="lead">${city.intro}</p>

        <div class="location-stats">
          <div class="location-stat">
            <strong>Since 2014</strong>
            <span>Serving ${city.name}</span>
          </div>
          <div class="location-stat">
            <strong>${city.population}</strong>
            <span>Residents in ${city.name}</span>
          </div>
          <div class="location-stat">
            <strong>5★</strong>
            <span>On every review platform</span>
          </div>
          <div class="location-stat">
            <strong>BBB Accredited</strong>
            <span>Best of BusinessRate 2025</span>
          </div>
        </div>

${city.paragraphs.map(p => ` <p>${p}</p>`).join('\n\n')}

        <h3>Neighborhoods We Serve in ${city.name}</h3>
        <p>We work throughout ${city.name}, including ${city.neighborhoods.join(', ')} and everywhere in between. If you're not sure whether we cover your specific neighborhood, just give us a call.</p>

        <h3>Drive Time</h3>
        <p>${city.drivetime} For most calls, we can be at your ${city.name} home within a day or two.</p>

        <p style="margin-top: 32px;"><a href="contact.html" class="btn btn-primary btn-large">Get Free Estimate</a> &nbsp; <a href="tel:+13147183632" class="btn btn-secondary">📞 (314) 718-3632</a></p>
      </div>
    </div>
  </section>

  <section class="bg-alt">
    <div class="container">
      <div class="section-header">
        <span class="section-eyebrow">Services Available in ${city.name}</span>
        <h2>What We Do for ${city.name} Homes</h2>
      </div>

      <div class="services-grid">
        <article class="service-card">
          <div class="service-icon">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="9" y1="3" x2="9" y2="21"/><line x1="15" y1="3" x2="15" y2="21"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="3" y1="15" x2="21" y2="15"/></svg>
          </div>
          <h3>Air Duct Cleaning</h3>
          <p>Deep cleaning of your entire HVAC duct system to remove dust, dander, allergens, and debris.</p>
          <a href="air-duct-cleaning.html" class="service-link">Learn More →</a>
        </article>

        <article class="service-card">
          <div class="service-icon">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
          </div>
          <h3>Dryer Vent Cleaning</h3>
          <p>Annual fire-prevention service. Removes lint buildup that causes home fires.</p>
          <a href="dryer-vent-cleaning.html" class="service-link">Learn More →</a>
        </article>

        <article class="service-card">
          <div class="service-icon">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8"/><polyline points="21 3 21 8 16 8"/></svg>
          </div>
          <h3>HVAC System Cleaning</h3>
          <p>Beyond ducts coil, blower, and air handler cleaning for full system efficiency.</p>
          <a href="hvac-cleaning.html" class="service-link">Learn More →</a>
        </article>
      </div>
    </div>
  </section>

  <section>
    <div class="container">
      <div class="section-header">
        <span class="section-eyebrow">Nearby Cities</span>
        <h2>We Also Serve These Communities</h2>
      </div>

      <div class="nearby-cities" style="justify-content: center;">
${city.nearbyCities.map(nc => ` <a href="${nc.slug}.html">${nc.name}</a>`).join('\n')}
        <a href="service-areas.html">View All Service Areas →</a>
      </div>
    </div>
  </section>

  <section class="cta-section">
    <div class="container">
      <h2>Ready to Schedule Your ${city.name} Cleaning?</h2>
      <p>Get a free estimate today. Call us or send a message we respond within 30 minutes during business hours.</p>
      <div class="cta-buttons">
        <a href="contact.html" class="btn btn-primary btn-large">Get Free Estimate</a>
        <a href="tel:+13147183632" class="btn btn-light btn-large">📞 Call (314) 718-3632</a>
      </div>
    </div>
  </section>

  <footer class="footer">
    <div class="container">
      <div class="footer-grid">
        <div class="footer-brand">
          <img src="images/logo.png" alt="1st Global Air Duct Cleaning">
          <p>Family-owned and operated since 2014. Serving Greater St. Louis with professional air duct and dryer vent cleaning. BBB Accredited &amp; Best of BusinessRate 2025.</p>
        </div>
        <div>
          <h4>Services</h4>
          <div class="footer-links">
            <a href="air-duct-cleaning.html">Air Duct Cleaning</a>
            <a href="dryer-vent-cleaning.html">Dryer Vent Cleaning</a>
            <a href="hvac-cleaning.html">HVAC Cleaning</a>
            <a href="commercial-air-duct-cleaning.html">Commercial Cleaning</a>
            <a href="air-duct-sanitization.html">Sanitization</a>
          </div>
        </div>
        <div>
          <h4>Quick Links</h4>
          <div class="footer-links">
            <a href="index.html">Home</a>
            <a href="about.html">About Us</a>
            <a href="services.html">All Services</a>
            <a href="service-areas.html">Service Areas</a>
            <a href="reviews.html">Reviews</a>
            <a href="faq.html">FAQ</a>
            <a href="blog.html">Blog</a>
            <a href="contact.html">Contact</a>
            <a href="privacy.html">Privacy Policy</a>
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
          <a href="privacy.html">Privacy Policy</a>
          <a href="contact.html">Contact</a>
        </div>
      </div>
    </div>
  </footer>

  <a href="tel:+13147183632" class="sticky-call">
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
    Call Now
  </a>
  <script src="js/main.js"></script>
</body>
</html>
`;

cities.forEach((city) => {
  const filename = path.join(__dirname, `${city.slug}.html`);
  fs.writeFileSync(filename, buildPage(city));
  console.log(`Generated: ${city.slug}.html`);
});

console.log(`\nTotal: ${cities.length} city pages generated.`);
