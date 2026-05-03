// Static-site city page generator for 1st Global Air Duct Cleaning
// Run with: node generate-cities.js
// Outputs an HTML file per city in the project root.

const fs = require('fs');
const path = require('path');

const cities = [
  {
    slug: 'st-louis-mo',
    name: 'St. Louis',
    state: 'MO',
    stateFull: 'Missouri',
    population: '300,000+',
    intro: 'Our home base. We\'ve served homes and businesses across all of St. Louis City for over a decade from the Central West End to South City to North County. With diverse housing stock ranging from historic brick homes to modern apartments, we\'ve cleaned just about every duct configuration imaginable.',
    paragraphs: [
      'St. Louis is where we started in 2014, and it\'s where we still do most of our work. The city\'s mix of century-old brick homes, mid-century bungalows, modern condos, and converted industrial lofts gives us experience with HVAC systems of every age and configuration. That experience matters every duct system is different, and there is no substitute for having seen them all.',
      'St. Louis weather is also uniquely hard on indoor air. Summer humidity grows mold and biofilm inside the ducts. Winter heating dries out the air and lifts dust. Spring and fall send clouds of pollen straight through return registers. Most homes in St. Louis benefit from cleaning every 3 to 5 years sometimes sooner for older brick homes near downtown where decades of city dust have built up.',
      'We work in every St. Louis neighborhood: Central West End, Lafayette Square, Tower Grove, The Hill, Soulard, Carondelet, Dogtown, Forest Park area, Skinker-DeBaliviere, and all the way out to the city limits. Whether you\'re in a 1900 four-square or a downtown condo, we have the equipment and experience for the job.',
    ],
    neighborhoods: ['Central West End', 'Lafayette Square', 'Tower Grove', 'The Hill', 'Soulard', 'Carondelet', 'Dogtown'],
    nearbyCities: [
      { slug: 'clayton-mo', name: 'Clayton, MO' },
      { slug: 'university-city-mo', name: 'University City, MO' },
      { slug: 'webster-groves-mo', name: 'Webster Groves, MO' },
      { slug: 'kirkwood-mo', name: 'Kirkwood, MO' },
      { slug: 'maryland-heights-mo', name: 'Maryland Heights, MO' },
    ],
    drivetime: '0 minutes this is our home market.',
    zip: '63118',
  },
  {
    slug: 'chesterfield-mo',
    name: 'Chesterfield',
    state: 'MO',
    stateFull: 'Missouri',
    population: '47,000',
    intro: 'One of our top-served suburbs. Chesterfield\'s larger homes (often 3,000+ sq ft) and family-focused neighborhoods make professional duct cleaning especially valuable. We work throughout Chesterfield Valley, the Wildhorse Creek area, and across the city.',
    paragraphs: [
      'Chesterfield is one of our biggest service markets outside St. Louis City. The city\'s family-friendly neighborhoods, larger lot sizes, and wealth of new and renovated homes mean a lot of HVAC systems running long hours through humid summers and dry winters. Most Chesterfield homes we serve are 3,000 to 5,000 square feet with multiple HVAC systems which means more ductwork to clean and bigger benefits when it\'s done right.',
      'A lot of the homes in Chesterfield Valley and the Wildhorse Creek area are 15 to 25 years old now the age where original duct systems start showing real buildup. If your home was built in the late 1990s or 2000s and you\'ve never had professional cleaning, you\'re overdue. We\'ve seen what comes out of those ducts, and most homeowners are shocked.',
      'We schedule throughout Chesterfield several days a week. Same-day service is often available, and same-week is almost always doable. Call us in the morning and we\'ll let you know if we can fit you in before dinner.',
    ],
    neighborhoods: ['Chesterfield Valley', 'Wildhorse Creek', 'Olive Boulevard corridor', 'Schoettler', 'Kehrs Mill'],
    nearbyCities: [
      { slug: 'wildwood-mo', name: 'Wildwood, MO' },
      { slug: 'ballwin-mo', name: 'Ballwin, MO' },
      { slug: 'town-and-country-mo', name: 'Town and Country, MO' },
      { slug: 'creve-coeur-mo', name: 'Creve Coeur, MO' },
      { slug: 'ellisville-mo', name: 'Ellisville, MO' },
    ],
    drivetime: '20-25 minutes from our St. Louis base.',
    zip: '63017',
  },
  {
    slug: 'ladue-mo',
    name: 'Ladue',
    state: 'MO',
    stateFull: 'Missouri',
    population: '8,500',
    intro: 'One of the most affluent communities in the region. Ladue homeowners expect premium service and we deliver it with the same family-owned care we give every customer.',
    paragraphs: [
      'Ladue is one of the most desirable addresses in the St. Louis region, with large estate homes set on mature wooded lots. These homes often have multi-zone HVAC systems, complex duct layouts, and decades of dust history exactly the type of work we specialize in. Many Ladue homes also have 100+ year-old ductwork that\'s been added to over time, with both original galvanized and modern flex sections that need different cleaning approaches.',
      'Ladue homeowners expect a high standard of service: clean uniforms, booties on hardwood floors, careful protection of antiques and art, and a final walkthrough before we leave. That standard is exactly how we run every job but it\'s especially important in the homes we clean here.',
      'We\'ve cleaned ducts in homes throughout Ladue for over a decade. From the older estates near Forest Park to the newer construction along Ladue Road, we know the housing stock and the systems inside.',
    ],
    neighborhoods: ['South Ladue', 'North Ladue', 'Old Warson Road area', 'Litzsinger area'],
    nearbyCities: [
      { slug: 'clayton-mo', name: 'Clayton, MO' },
      { slug: 'creve-coeur-mo', name: 'Creve Coeur, MO' },
      { slug: 'town-and-country-mo', name: 'Town and Country, MO' },
      { slug: 'des-peres-mo', name: 'Des Peres, MO' },
      { slug: 'university-city-mo', name: 'University City, MO' },
    ],
    drivetime: '15-20 minutes from our St. Louis base.',
    zip: '63124',
  },
  {
    slug: 'kirkwood-mo',
    name: 'Kirkwood',
    state: 'MO',
    stateFull: 'Missouri',
    population: '28,000',
    intro: 'One of the most charming suburbs in St. Louis with a lot of historic homes. Older homes mean older HVAC systems and a real need for professional duct attention.',
    paragraphs: [
      'Kirkwood\'s historic charm comes with a duct cleaning challenge: a lot of these homes are 80 to 120 years old, and many have HVAC systems that were retrofitted into spaces that weren\'t originally designed for them. Old plaster walls, narrow basements, and creative duct routing mean Kirkwood homes often have buildup in places that haven\'t been touched since the system was installed.',
      'We love working in Kirkwood because every home tells a story. The Victorian houses near downtown, the mid-century ranches, the renovated farmhouses on the edges of town each one has different ductwork and different needs. Most Kirkwood homes we clean haven\'t had professional service in 5+ years, and the difference after a thorough cleaning is dramatic.',
      'If your Kirkwood home has any combination of old ductwork, pets, mature trees that drop pollen and seed, or family members with allergies duct cleaning is one of the highest-impact home maintenance items you can do. Call for a free phone quote today.',
    ],
    neighborhoods: ['Downtown Kirkwood', 'Greentree area', 'Manchester Road corridor', 'Big Bend area'],
    nearbyCities: [
      { slug: 'webster-groves-mo', name: 'Webster Groves, MO' },
      { slug: 'des-peres-mo', name: 'Des Peres, MO' },
      { slug: 'ballwin-mo', name: 'Ballwin, MO' },
      { slug: 'st-louis-mo', name: 'St. Louis, MO' },
      { slug: 'manchester-mo', name: 'Manchester, MO' },
    ],
    drivetime: '15-20 minutes from our St. Louis base.',
    zip: '63122',
  },
  {
    slug: 'webster-groves-mo',
    name: 'Webster Groves',
    state: 'MO',
    stateFull: 'Missouri',
    population: '24,000',
    intro: 'Historic neighborhoods with mature housing stock dating back decades. We help Webster Groves homeowners maintain healthy indoor air in older homes.',
    paragraphs: [
      'Webster Groves is one of the most established suburbs in the St. Louis region, with a deep stock of homes built between 1910 and 1960. These homes are full of character original hardwoods, plaster walls, transom windows and ductwork that\'s been in place for decades. Without professional cleaning every few years, that ductwork becomes a museum of every dust event in the home\'s history.',
      'Many of our Webster Groves customers come to us after a renovation, after moving in, or after years of putting it off. The before-and-after is usually striking. Original galvanized supply trunks that have never been cleaned can hold 10+ pounds of dust, pet hair, and construction debris from past projects.',
      'We work all over Webster Groves Old Webster, the area around Webster University, the streets near Old Orchard, and out toward Big Bend. Whether your home is a 1920s bungalow or a renovated mid-century, we\'ll handle the ductwork with the care old homes deserve.',
    ],
    neighborhoods: ['Old Webster', 'Webster Park', 'Old Orchard', 'Big Bend area'],
    nearbyCities: [
      { slug: 'kirkwood-mo', name: 'Kirkwood, MO' },
      { slug: 'st-louis-mo', name: 'St. Louis, MO' },
      { slug: 'university-city-mo', name: 'University City, MO' },
      { slug: 'maryland-heights-mo', name: 'Maryland Heights, MO' },
      { slug: 'clayton-mo', name: 'Clayton, MO' },
    ],
    drivetime: '15 minutes from our St. Louis base.',
    zip: '63119',
  },
  {
    slug: 'ofallon-mo',
    name: 'O\'Fallon',
    state: 'MO',
    stateFull: 'Missouri',
    population: '90,000',
    intro: 'The largest suburb in St. Charles County and one of our biggest service markets. O\'Fallon\'s mix of established and new neighborhoods means a wide range of HVAC systems and duct cleaning needs.',
    paragraphs: [
      'O\'Fallon, MO is the biggest underserved suburb in our service area and one of the cities where we see the most duct cleaning demand. The mix of newer subdivisions built in the 2000s and 2010s combined with older homes near the downtown core means almost every duct cleaning scenario is represented here.',
      'New construction homes in O\'Fallon often need cleaning sooner than you\'d expect. Construction dust, drywall powder, and sawdust settle into the duct system during the build and never leave until someone professionally extracts it. We get a lot of calls from O\'Fallon homeowners 2 to 5 years into a new home, when they realize the dust around the registers isn\'t getting better on its own.',
      'We make trips to O\'Fallon several days a week. Whether you\'re in WingHaven, T.R. Hughes Park area, or one of the older neighborhoods east of Highway K, we can usually be there within a day or two. Same-day service is often available call us early in the morning for the best chance.',
    ],
    neighborhoods: ['WingHaven', 'T.R. Hughes Park area', 'Highway K corridor', 'Downtown O\'Fallon'],
    nearbyCities: [
      { slug: 'st-peters-mo', name: 'St. Peters, MO' },
      { slug: 'st-charles-mo', name: 'St. Charles, MO' },
      { slug: 'wentzville-mo', name: 'Wentzville, MO' },
      { slug: 'maryland-heights-mo', name: 'Maryland Heights, MO' },
      { slug: 'florissant-mo', name: 'Florissant, MO' },
    ],
    drivetime: '30-35 minutes from our St. Louis base.',
    zip: '63366',
  },
  {
    slug: 'st-charles-mo',
    name: 'St. Charles',
    state: 'MO',
    stateFull: 'Missouri',
    population: '70,000',
    intro: 'Historic downtown St. Charles to the newer Mid Rivers area we serve the entire city. With St. Charles County\'s continued growth, we see everything from older brick homes near the river to modern subdivisions.',
    paragraphs: [
      'St. Charles is a city of contrasts: 200-year-old brick homes near Main Street and the riverfront, and brand-new subdivisions out toward the Mid Rivers area. We work in both and the cleaning approach differs. Historic homes near downtown often have decades of accumulated dust in their ductwork (or no ductwork at all in original sections, with HVAC retrofitted into mostly inaccessible chases). Newer homes have construction dust and the standard residential layouts.',
      'St. Charles County\'s humidity and seasonal temperature swings make duct cleaning especially valuable. Our summers run hot and humid, and the AC runs nearly nonstop from May through September. Anything in those ducts gets cycled through every room of the home, every day, for months. A clean system means a cleaner home and a more comfortable summer.',
      'We work in St. Charles regularly. From the historic downtown to Mid Rivers Mall area to the newer Highway 94 corridor, we know the city well. Most jobs scheduled within 1-2 days of the call.',
    ],
    neighborhoods: ['Historic Downtown', 'Mid Rivers Mall area', 'Highway 94 corridor', 'New Town'],
    nearbyCities: [
      { slug: 'st-peters-mo', name: 'St. Peters, MO' },
      { slug: 'ofallon-mo', name: 'O\'Fallon, MO' },
      { slug: 'wentzville-mo', name: 'Wentzville, MO' },
      { slug: 'florissant-mo', name: 'Florissant, MO' },
      { slug: 'maryland-heights-mo', name: 'Maryland Heights, MO' },
    ],
    drivetime: '25-30 minutes from our St. Louis base.',
    zip: '63301',
  },
  {
    slug: 'st-peters-mo',
    name: 'St. Peters',
    state: 'MO',
    stateFull: 'Missouri',
    population: '60,000',
    intro: 'Family-oriented community with strong demand for indoor air quality services. We\'re throughout St. Peters several days a week serving residential customers.',
    paragraphs: [
      'St. Peters is a family-heavy market for duct cleaning. The city\'s neighborhoods are full of homes built in the 1990s through 2010s the years where central HVAC became standard, but where most homeowners haven\'t yet had a first professional cleaning. That makes St. Peters one of the highest-impact markets for us, because the buildup tends to be substantial and the result of a single cleaning is dramatic.',
      'Pets, kids, and busy households mean lots of dust circulating through the system. Combined with summer humidity and pollen from the rolling tree-lined neighborhoods around Mid Rivers and Spencer Road, a typical St. Peters home benefits from cleaning every 3-5 years. We\'ve cleaned hundreds of homes here, and we\'re happy to come out and walk through your specific situation.',
      'We schedule throughout St. Peters multiple days a week. Same-day appointments often available when you call before 2 PM.',
    ],
    neighborhoods: ['Mid Rivers area', 'Spencer Road corridor', 'Cave Springs area', 'Salt River Road area'],
    nearbyCities: [
      { slug: 'ofallon-mo', name: 'O\'Fallon, MO' },
      { slug: 'st-charles-mo', name: 'St. Charles, MO' },
      { slug: 'wentzville-mo', name: 'Wentzville, MO' },
      { slug: 'maryland-heights-mo', name: 'Maryland Heights, MO' },
      { slug: 'florissant-mo', name: 'Florissant, MO' },
    ],
    drivetime: '25-30 minutes from our St. Louis base.',
    zip: '63376',
  },
  {
    slug: 'florissant-mo',
    name: 'Florissant',
    state: 'MO',
    stateFull: 'Missouri',
    population: '52,000',
    intro: 'Largest city in North St. Louis County. We serve a wide range of homes throughout Florissant, from established neighborhoods to newer developments.',
    paragraphs: [
      'Florissant is one of North County\'s largest cities, with a deep mix of mid-century homes, brick ranches from the 1960s and 70s, and newer construction along the city\'s northern edges. Many of these homes have HVAC systems that have been working hard for 30 to 40 years and most have never had a professional duct cleaning.',
      'Brick ranches built in the 60s and 70s in particular tend to have galvanized duct trunks with smaller branch lines that get clogged easily over decades. We see a lot of homes in Florissant where the airflow has slowly degraded over years, and the homeowner doesn\'t realize how much the system has been struggling until after we clean it. The before-and-after is often dramatic.',
      'We work all over Florissant. From the older neighborhoods near the city center to the newer developments along North Lindbergh, we cover the whole city. Most appointments within 1-2 days, same-day service often available.',
    ],
    neighborhoods: ['Old Town Florissant', 'North Lindbergh corridor', 'Paddock Hills area'],
    nearbyCities: [
      { slug: 'hazelwood-mo', name: 'Hazelwood, MO' },
      { slug: 'maryland-heights-mo', name: 'Maryland Heights, MO' },
      { slug: 'st-peters-mo', name: 'St. Peters, MO' },
      { slug: 'st-louis-mo', name: 'St. Louis, MO' },
      { slug: 'ofallon-mo', name: 'O\'Fallon, MO' },
    ],
    drivetime: '20-25 minutes from our St. Louis base.',
    zip: '63031',
  },
  {
    slug: 'clayton-mo',
    name: 'Clayton',
    state: 'MO',
    stateFull: 'Missouri',
    population: '16,000',
    intro: 'Upscale residential neighborhoods in the heart of St. Louis County. We serve homes throughout Clayton with the same family-owned attention every customer gets.',
    paragraphs: [
      'Clayton is the business heart of St. Louis County and home to some of the most beautiful residential streets in the region. The city\'s housing stock from historic brick estates to modern condos represents the full range of duct cleaning challenges, and we have the experience to handle all of them.',
      'Many Clayton homes are 80 to 100 years old, with original ductwork or systems retrofitted into older homes during 1980s and 90s renovations. Both scenarios mean buildup that hasn\'t been addressed in decades. Add in mature trees, urban dust, and busy households and most Clayton homes we serve see a meaningful improvement after a thorough cleaning.',
      'We also serve Clayton offices and small commercial buildings. After-hours service is standard, with no extra charge for evenings or weekends. Call for a free walk-through and written estimate.',
    ],
    neighborhoods: ['Wydown', 'Oak Knoll', 'Hi-Pointe area', 'Forest Park area'],
    nearbyCities: [
      { slug: 'ladue-mo', name: 'Ladue, MO' },
      { slug: 'university-city-mo', name: 'University City, MO' },
      { slug: 'st-louis-mo', name: 'St. Louis, MO' },
      { slug: 'maryland-heights-mo', name: 'Maryland Heights, MO' },
      { slug: 'creve-coeur-mo', name: 'Creve Coeur, MO' },
    ],
    drivetime: '10-15 minutes from our St. Louis base.',
    zip: '63105',
  },
  {
    slug: 'town-and-country-mo',
    name: 'Town and Country',
    state: 'MO',
    stateFull: 'Missouri',
    population: '11,000',
    intro: 'Among the most affluent communities in Missouri, with large estate homes that often require complex multi-zone HVAC cleaning.',
    paragraphs: [
      'Town and Country is one of Missouri\'s wealthiest communities, with estate-sized lots and homes that frequently top 5,000 to 10,000+ square feet. These homes typically have two or three zoned HVAC systems, complex duct layouts, and elaborate finish work that makes professional cleaning especially valuable and especially in need of careful technicians.',
      'Multi-zone systems mean more ductwork, more registers, and more places for dust to collect. A typical Town and Country home cleaning is a half-day to a full-day job, and we always send experienced techs with the right equipment for larger systems. We protect floors, work quietly, and respect the homes we\'re in.',
      'We work throughout Town and Country regularly. Same-week scheduling is standard, with same-day often possible. Call us with your home\'s approximate square footage and number of HVAC zones, and we can give you a quote on the spot.',
    ],
    neighborhoods: ['Mason Road corridor', 'South 40 area', 'Conway Road area'],
    nearbyCities: [
      { slug: 'ladue-mo', name: 'Ladue, MO' },
      { slug: 'chesterfield-mo', name: 'Chesterfield, MO' },
      { slug: 'des-peres-mo', name: 'Des Peres, MO' },
      { slug: 'creve-coeur-mo', name: 'Creve Coeur, MO' },
      { slug: 'ballwin-mo', name: 'Ballwin, MO' },
    ],
    drivetime: '20-25 minutes from our St. Louis base.',
    zip: '63131',
  },
  {
    slug: 'edwardsville-il',
    name: 'Edwardsville',
    state: 'IL',
    stateFull: 'Illinois',
    population: '25,000',
    intro: 'Affluent IL suburb home to SIUE. Residential customers and university-related properties make Edwardsville a regular destination for our team.',
    paragraphs: [
      'Edwardsville is one of the wealthier and faster-growing cities in the Illinois Metro East. The presence of Southern Illinois University Edwardsville (SIUE) brings a steady stream of professionals, faculty, and families to the area, with new construction and established neighborhoods in roughly equal measure.',
      'Newer Edwardsville subdivisions tend to need cleaning sooner than homeowners expect construction dust settles into duct systems during builds and never leaves on its own. Older homes near downtown Edwardsville and along Main Street often have decades of accumulated buildup that we extract with our HEPA-vacuum equipment.',
      'We make regular trips to Edwardsville and the broader Metro East. Crossing the river adds a bit of drive time, but we\'ve been doing it weekly for years. Same-day service is sometimes available; same-week is almost always doable.',
    ],
    neighborhoods: ['Downtown Edwardsville', 'SIUE area', 'Goshen Road corridor', 'Fruit Road area'],
    nearbyCities: [
      { slug: 'glen-carbon-il', name: 'Glen Carbon, IL' },
      { slug: 'collinsville-il', name: 'Collinsville, IL' },
      { slug: 'belleville-il', name: 'Belleville, IL' },
      { slug: 'alton-il', name: 'Alton, IL' },
      { slug: 'fairview-heights-il', name: 'Fairview Heights, IL' },
    ],
    drivetime: '25-30 minutes from our St. Louis base.',
    zip: '62025',
  },
  {
    slug: 'belleville-il',
    name: 'Belleville',
    state: 'IL',
    stateFull: 'Illinois',
    population: '42,000',
    intro: 'Largest city in the Illinois Metro East and one of our biggest IL markets. Mix of historic and newer homes all benefit from professional duct cleaning.',
    paragraphs: [
      'Belleville is the largest city in the Illinois Metro East and one of our biggest markets across the river. The city has a deep mix of housing historic homes near downtown that go back to the 1800s, mid-century neighborhoods along Main Street, and newer subdivisions on the city\'s growing edges. We work in all of them.',
      'Belleville\'s older homes often have hot-water radiators rather than forced-air, but most modern Belleville homes do have central HVAC and ductwork and that ductwork tends to be in need of attention. We\'ve cleaned ducts in Belleville homes that hadn\'t been touched in 30 years, and the difference is striking.',
      'We make Belleville trips weekly. Same-week scheduling is the norm. Call for a free phone quote.',
    ],
    neighborhoods: ['West End', 'Downtown Belleville', 'Belt East', 'Frank Scott Parkway area'],
    nearbyCities: [
      { slug: 'fairview-heights-il', name: 'Fairview Heights, IL' },
      { slug: 'ofallon-il', name: 'O\'Fallon, IL' },
      { slug: 'collinsville-il', name: 'Collinsville, IL' },
      { slug: 'edwardsville-il', name: 'Edwardsville, IL' },
      { slug: 'waterloo-il', name: 'Waterloo, IL' },
    ],
    drivetime: '25-30 minutes from our St. Louis base.',
    zip: '62220',
  },
  {
    slug: 'creve-coeur-mo',
    name: 'Creve Coeur',
    state: 'MO',
    stateFull: 'Missouri',
    population: '18,000',
    intro: 'Mature suburb with established residential neighborhoods. A great area for homeowners who want professional air duct cleaning.',
    paragraphs: [
      'Creve Coeur is one of West County\'s most established communities, with homes ranging from mid-century ranches to large modern estates along the wooded streets near the lake. Many Creve Coeur homes are 30 to 50 years old now, with HVAC systems that have been working hard through decades of St. Louis weather.',
      'A common pattern we see in Creve Coeur: homeowners who lived through one or two HVAC replacements but never had the duct system itself professionally cleaned. New equipment moves dirty air through dirty ducts which means much of the benefit of the new system gets lost. A cleaning paired with a system upgrade gets you the full performance you paid for.',
      'We work throughout Creve Coeur regularly. From the area near Olive Boulevard to the wooded neighborhoods near the lake, we cover the whole city. Same-week scheduling is standard.',
    ],
    neighborhoods: ['Olive Boulevard corridor', 'Creve Coeur Lake area', 'Ladue Road area'],
    nearbyCities: [
      { slug: 'ladue-mo', name: 'Ladue, MO' },
      { slug: 'town-and-country-mo', name: 'Town and Country, MO' },
      { slug: 'chesterfield-mo', name: 'Chesterfield, MO' },
      { slug: 'maryland-heights-mo', name: 'Maryland Heights, MO' },
      { slug: 'clayton-mo', name: 'Clayton, MO' },
    ],
    drivetime: '20-25 minutes from our St. Louis base.',
    zip: '63141',
  },
  {
    slug: 'wildwood-mo',
    name: 'Wildwood',
    state: 'MO',
    stateFull: 'Missouri',
    population: '35,000',
    intro: 'Larger lots, larger homes, and West County natural beauty. Wildwood homeowners often have higher pollen and outdoor allergen exposure making clean ducts especially important.',
    paragraphs: [
      'Wildwood\'s defining feature for our work is the abundance of trees and natural landscape beautiful, but also one of the highest-pollen environments in West County. Wildwood\'s ductwork sees a lot of pollen, leaf dust, seed fluff, and outdoor allergens cycling through HVAC return systems all spring and fall.',
      'For homeowners with allergies or asthma, Wildwood is a duct-cleaning priority. The pollen load in this area is among the highest we see, and removing it from the duct system makes a real difference for the people most affected. We\'ve had multiple Wildwood customers tell us their seasonal allergy symptoms dropped noticeably after a cleaning.',
      'Wildwood\'s larger homes also mean larger duct systems and longer cleaning times. Plan on a half-day for most jobs. We schedule weekly throughout the city call for a free phone quote.',
    ],
    neighborhoods: ['Manchester Road corridor', 'Eatherton Road area', 'Wild Horse Creek area'],
    nearbyCities: [
      { slug: 'chesterfield-mo', name: 'Chesterfield, MO' },
      { slug: 'ellisville-mo', name: 'Ellisville, MO' },
      { slug: 'ballwin-mo', name: 'Ballwin, MO' },
      { slug: 'town-and-country-mo', name: 'Town and Country, MO' },
      { slug: 'manchester-mo', name: 'Manchester, MO' },
    ],
    drivetime: '30-35 minutes from our St. Louis base.',
    zip: '63040',
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
        <p>${city.drivetime} For most calls, we can be at your ${city.name} home within a day or two. Same-day service is often available when you call before 2:00 PM.</p>

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
          <p>Annual fire-prevention service. Removes lint buildup that causes home fires and reduces dryer efficiency.</p>
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

  <section class="bg-alt">
    <div class="container">
      <div class="section-header">
        <span class="section-eyebrow">Why ${city.name} Homeowners Choose Us</span>
        <h2>The 1st Global Difference</h2>
      </div>

      <div class="features-grid">
        <div class="feature">
          <div class="feature-icon">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
          </div>
          <h3>Locally Owned Since 2014</h3>
          <p>Family-owned. We treat every ${city.name} home like a neighbor because it is.</p>
        </div>

        <div class="feature">
          <div class="feature-icon">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
          </div>
          <h3>Same-Day Service</h3>
          <p>Open daily 8 AM – 9 PM. Most ${city.name} appointments scheduled within 24 hours.</p>
        </div>

        <div class="feature">
          <div class="feature-icon">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
          </div>
          <h3>Upfront Pricing</h3>
          <p>Written estimate before we start. No hidden fees. What we quote is what you pay.</p>
        </div>

        <div class="feature">
          <div class="feature-icon">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
          </div>
          <h3>100% Guarantee</h3>
          <p>If you're not satisfied, we re-clean for free. Simple as that.</p>
        </div>
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
              <a href="mailto:morgalili79@gmail.com">morgalili79@gmail.com</a>
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
