// Updates service-areas.html anchor links (#city) to actual city pages (/service-areas/[slug]/)
const fs = require('fs');
const path = require('path');

const fp = path.join(__dirname, 'service-areas.html');
let content = fs.readFileSync(fp, 'utf8');

const cityAnchors = {
  'st-louis': 'st-louis-mo',
  'chesterfield': 'chesterfield-mo',
  'st-charles': 'st-charles-mo',
  'ofallon-mo': 'ofallon-mo',
  'st-peters': 'st-peters-mo',
  'wentzville': 'wentzville-mo', // not yet built; will fall through
  'arnold': 'arnold-mo',
  'wildwood': 'wildwood-mo',
  'ballwin': 'ballwin-mo',
  'manchester': 'manchester-mo',
  'ellisville': 'ellisville-mo',
  'kirkwood': 'kirkwood-mo',
  'webster-groves': 'webster-groves-mo',
  'ladue': 'ladue-mo',
  'des-peres': 'des-peres-mo',
  'town-and-country': 'town-and-country-mo',
  'clayton': 'clayton-mo',
  'creve-coeur': 'creve-coeur-mo',
  'maryland-heights': 'maryland-heights-mo',
  'university-city': 'university-city-mo',
  'florissant': 'florissant-mo',
  'hazelwood': 'hazelwood-mo',
  'belleville': 'belleville-il',
  'edwardsville': 'edwardsville-il',
  'ofallon-il': 'ofallon-il',
  'collinsville': 'collinsville-il',
  'alton': 'alton-il',
  'fairview-heights': 'fairview-heights-il',
  'glen-carbon': 'glen-carbon-il',
  'waterloo': 'waterloo-il',
};

Object.entries(cityAnchors).forEach(([anchor, slug]) => {
  // Replace links like href="#anchor" with href="service-areas/slug/"
  const re = new RegExp(`href="#${anchor}"`, 'g');
  content = content.replace(re, `href="service-areas/${slug}/"`);
});

fs.writeFileSync(fp, content);
console.log('service-areas.html anchor links updated to dedicated city pages.');
