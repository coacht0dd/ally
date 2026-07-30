/**
 * kit.mjs — everything the site knows about itself, plus the shared chrome.
 *
 * DATA is the single source of truth. Change a fact here and it updates every
 * page, every schema block and the footer together. Nothing in src/pages.mjs
 * should hard-code a phone number, an address or a review.
 */
export const DATA = {
  name: 'Ally Air & Refrigeration',
  legal: 'Ally Air & Refrigeration LLC',
  owner: 'Ben Zeglevski',            // confirmed — Fix & Scale workbooks
  url: 'https://allyairllc.com',
  phone: '(404) 941-4599',           // verified — Google Business Profile
  tel: '+14049414599',
  street: '2641 Old Peachtree Rd NE',
  city: 'Dacula', region: 'GA', postal: '30019',
  lat: 34.0201079, lng: -83.9313774,
  gbp: 'https://maps.app.goo.gl/L5ikJ8Pzw5DvSW2eA',
  rating: '5.0', reviewCount: 4,
  since: 2020,
  // CONFIRM — the workbooks and the directory listings disagree on this list.
  towns: ['Dacula','Lawrenceville','Buford','Suwanee','Sugar Hill','Hoschton','Gainesville','Braselton'],
  // Real Google reviews. Verbatim. Never edit, never add an invented one.
  reviews: [
    { t: "Called company during ice storm, they came same day and repaired our furnace. They didn't try and sell me a new unit — instead they repaired it in a timely fashion at a really fair price.", w: 'Christopher Johnson', d: 'January 2026' },
    { t: 'My entire HVAC system was replaced in one day. The workers are professional and do outstanding work.', w: 'Willie Perkins', d: 'June 2026' },
    { t: 'Friendly and professional — Ben and his team really helped us out with our HVAC.', w: 'Google review', d: 'March 2026' },
  ],
};
const D = DATA;

/* ================================================================= CHROME */
/* Every inline SVG carries an explicit width/height. Without them a stylesheet
   that hasn't applied yet renders each icon at 300×150 and the page grows to
   tens of thousands of pixels. CSS still overrides these. */
const sized = (svg) => svg.replace('<svg ', '<svg width="24" height="24" aria-hidden="true" focusable="false" ');
const icon = Object.fromEntries(Object.entries({
  phone: '<svg viewBox="0 0 24 24"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2Z"/></svg>',
  pin: '<svg viewBox="0 0 24 24"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>',
  arrow: '<svg viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
  shield: '<svg viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z"/></svg>',
  check: '<svg viewBox="0 0 24 24"><path d="M20 6 9 17l-5-5"/></svg>',
  clock: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>',
  snow: '<svg viewBox="0 0 24 24"><path d="M12 2v20M4.9 6.5l14.2 11M19.1 6.5 4.9 17.5"/></svg>',
  home: '<svg viewBox="0 0 24 24"><path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1Z"/></svg>',
}).map(([k, v]) => [k, sized(v)]));

const NAV = [
  { l: 'Refrigeration', h: '/commercial/' },
  { l: 'Heating & Air', h: '/residential/' },
  { l: 'Service Area', h: '/service-area/' },
  { l: 'About', h: '/about/', opt: true },
  { l: 'Contact', h: '/contact/' },
];

const header = (utility) => `
<div class="util"><div class="wrap">
  <div class="dot"><i></i>Someone answers 24/7 — including tonight</div>
  <div>${utility}</div>
</div></div>
<header class="hdr"><input type="checkbox" id="mnav"><div class="wrap nav">
  <a class="brand" href="/"><div class="mk"><span>AA</span></div><div><b>Ally Air</b><small>Refrigeration &amp; HVAC</small></div></a>
  <nav class="mainnav"><ul>${NAV.map(n => `<li${n.opt ? ' class="opt"' : ''}><a href="${n.h}">${n.l}</a></li>`).join('')}</ul></nav>
  <div class="nav-r">
    <a class="nav-tel" href="tel:${D.tel}"><small>Call or text, 24/7</small><b>${D.phone}</b></a>
    <a class="btn btn-cool hdr-cta" href="/contact/">Book a visit</a>
    <label class="burger" for="mnav" aria-label="Menu"><span></span></label>
  </div>
</div>
<nav class="mobnav"><div class="wrap">
  ${NAV.map(n => `<a href="${n.h}">${n.l}</a>`).join('\n  ')}
  <a href="tel:${D.tel}" style="color:var(--cool)">Call ${D.phone}</a>
</div></nav></header>`;

const creds = `
<div class="creds"><div class="wrap">
  <div class="cred">${icon.shield}Carrier dealer network</div>
  <div class="cred">${icon.check}Licensed &amp; insured</div>
  <div class="cred">${icon.clock}24/7 emergency line</div>
  <div class="cred w">${icon.snow}Refrigeration <em>and</em> HVAC</div>
  <div class="cred">${icon.home}Local, family-run</div>
</div></div>`;

const reviewsSection = () => `
<section class="nb"><div class="wrap">
  <div class="shead">
    <span class="lbl">Your neighbors</span>
    <h2>Every review we have is five stars</h2>
    <p>There aren't many of them yet — we'd rather show you all of them than pick the flattering ones.</p>
  </div>
  <div class="rev-grid">
    ${D.reviews.map(r => `<div class="rcard"><div class="st">★★★★★</div>
      <p>“${r.t}”</p><div class="who"><b>${r.w}</b>${r.d}</div></div>`).join('\n    ')}
  </div>
</div></section>`;

const closeBand = (h2, p) => `
<section class="close"><div class="wrap">
  <h2>${h2}</h2><p>${p}</p>
  <div class="cta"><a class="btn btn-w" href="tel:${D.tel}">${D.phone}</a>
  <a class="btn btn-out" href="sms:${D.tel}">Send us a photo</a></div>
</div></section>`;

const footer = `
<footer class="ftr"><div class="wrap">
  <div class="fg">
    <div><a class="brand" href="/" style="margin-bottom:18px"><div class="mk"><span>AA</span></div><div><b style="color:#fff">Ally Air</b><small>Refrigeration &amp; HVAC</small></div></a>
      <p style="max-width:34ch">Family-run in Dacula. Commercial refrigeration and home heating and air across Gwinnett County.</p></div>
    <div><h4>Commercial</h4><a href="/commercial/">Walk-in coolers</a><a href="/commercial/">Ice machines</a><a href="/commercial/">Reach-ins</a><a href="/commercial/">Commercial HVAC</a></div>
    <div><h4>Residential</h4><a href="/residential/">AC repair</a><a href="/residential/">Heating</a><a href="/residential/">Mini-splits</a><a href="/residential/">Maintenance</a></div>
    <div><h4>Get in touch</h4><a href="tel:${D.tel}">${D.phone}</a>
      <p style="padding:5px 0">${D.street}<br>${D.city}, ${D.region} ${D.postal}</p>
      <p style="color:#D8D1C7;padding-top:8px">Someone answers 24/7</p></div>
  </div>
  <div class="fbot"><div>© ${new Date().getFullYear()} ${D.legal}</div><div>Licensed · Insured · Serving Gwinnett County</div></div>
</div></footer>
<div class="callbar"><a class="btn btn-cool" href="tel:${D.tel}">Call now</a><a class="btn btn-out" href="sms:${D.tel}">Text us</a></div>`;

/* ================================================================= SCHEMA */
const business = {
  '@type': ['HVACBusiness', 'LocalBusiness'],
  '@id': `${D.url}/#business`,
  name: D.legal, alternateName: D.name, url: D.url + '/', telephone: D.phone,
  description: 'Commercial refrigeration and residential HVAC contractor serving Dacula, Lawrenceville, Buford and Gwinnett County, Georgia.',
  address: { '@type': 'PostalAddress', streetAddress: D.street, addressLocality: D.city, addressRegion: D.region, postalCode: D.postal, addressCountry: 'US' },
  geo: { '@type': 'GeoCoordinates', latitude: D.lat, longitude: D.lng },
  areaServed: D.towns.map(t => ({ '@type': 'City', name: `${t}, GA` })),
  hasMap: D.gbp, sameAs: [D.gbp],
  // aggregateRating deliberately omitted — self-serving review markup is spam.
};
const faqSchema = (faqs) => ({ '@type': 'FAQPage', mainEntity: faqs.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) });
const crumbSchema = (c) => ({ '@type': 'BreadcrumbList', itemListElement: c.map((x, i) => ({ '@type': 'ListItem', position: i + 1, name: x.l, item: D.url + x.h })) });

/* =================================================================== PAGE */
function page({ title, desc, path, body, schema = [], crumbs }) {
  const graph = [business, ...schema];
  if (crumbs && crumbs.length > 1) graph.push(crumbSchema(crumbs));
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${title}</title>
<meta name="description" content="${desc}">
<meta name="robots" content="noindex,nofollow">
<link rel="canonical" href="${D.url}${path}">
<meta name="geo.region" content="US-GA"><meta name="geo.placename" content="Dacula, Georgia">
<meta name="geo.position" content="${D.lat};${D.lng}">
<meta property="og:type" content="website"><meta property="og:title" content="${title}">
<meta property="og:description" content="${desc}"><meta property="og:url" content="${D.url}${path}">
<meta name="theme-color" content="#0E6E9E">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Archivo:wght@400;500;600;700;800&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="/assets/site.css">
<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Crect width='64' height='64' fill='%231B1916'/%3E%3Ctext x='32' y='41' font-family='Arial' font-weight='700' font-size='28' fill='%23fff' text-anchor='middle'%3EAA%3C/text%3E%3Crect y='56' width='32' height='8' fill='%232A9BD4'/%3E%3Crect x='32' y='56' width='32' height='8' fill='%23E87434'/%3E%3C/svg%3E">
<script type="application/ld+json">${JSON.stringify({ '@context': 'https://schema.org', '@graph': graph })}</script>
</head>
<body>
${body}
${footer}
</body>
</html>`;
}

const inner = ({ crumbs, h1, deck, warm, kick, shot }) => `
<div class="hero ihero${warm ? ' warm' : ''}">
  <div class="photo"></div><div class="scrim"></div><div class="grain"></div>
  ${shot ? `<div class="shotnote">${shot}</div>` : ''}
  <div class="wrap"><div class="inner">
    <div class="crumbs">${crumbs.map((c, i) => i === crumbs.length - 1
      ? `<span>${c.l}</span>` : `<a href="${c.h}">${c.l}</a><i>/</i>`).join('')}</div>
    <div class="hcard"><div class="pad">
      ${kick ? `<div class="kick">${icon.pin}<span class="lbl">${kick}</span></div>` : ''}
      <h1>${h1}</h1>
      <p class="deck">${deck}</p>
      <div class="cta">
        <a class="btn btn-cool" href="tel:${D.tel}">${icon.phone}${D.phone}</a>
        <a class="btn btn-out" href="/contact/">Book a service call</a>
      </div>
    </div></div>
  </div></div>
</div>`;

export { page, header, creds, reviewsSection, closeBand, footer, icon, inner, faqSchema };
