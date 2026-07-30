/**
 * pages.mjs — the words.
 *
 * Every fact quoted here comes from DATA in kit.mjs or from Ben directly.
 * Things we have not confirmed yet are marked CONFIRM in a comment and written
 * so the page still reads honestly without them. Do not add a price, a
 * response-time promise, a certification or a review to this file unless Ben
 * has said it out loud.
 */
import {
  DATA as D, page, header, creds, reviewsSection, closeBand, icon, inner, faqSchema,
} from './kit.mjs';

const UTIL = `Family-run on Old Peachtree Road · <a href="tel:${D.tel}">${D.phone}</a>`;
const HEAD = header(UTIL);

/* Service-area towns. The note under each is written to be true without a map
   or a stopwatch — no drive times, no coverage promises we can't keep.
   CONFIRM — the workbooks and the directory listings disagree on this list. */
const TOWNS = [
  { n: 'Dacula', s: 'dacula', c: 'Gwinnett County',
    note: 'Home. The shop is on Old Peachtree Road, so Dacula calls are the short ones.' },
  { n: 'Lawrenceville', s: 'lawrenceville', c: 'Gwinnett County',
    note: 'The county seat, and the densest stretch of restaurants and small commercial kitchens we work in.' },
  { n: 'Buford', s: 'buford', c: 'Gwinnett & Hall Counties',
    note: 'The Mall of Georgia corridor — retail coolers, quick-service kitchens and a lot of newer homes.' },
  { n: 'Suwanee', s: 'suwanee', c: 'Gwinnett County',
    note: 'Town Center restaurants on one side of the day, subdivisions on the other.' },
  { n: 'Sugar Hill', s: 'sugar-hill', c: 'Gwinnett County',
    note: 'A straight run up Highway 20 from the shop.' },
  { n: 'Hoschton', s: 'hoschton', c: 'Jackson & Barrow Counties',
    note: 'Right on the edge of our regular territory, and still a normal service call for us.' },
  { n: 'Braselton', s: 'braselton', c: 'Four counties meet here',
    note: 'Braselton sits across four county lines, which makes finding one contractor for a building harder than it should be.' },
  { n: 'Gainesville', s: 'gainesville', c: 'Hall County',
    note: 'The furthest regular stop north. Worth a call — commercial refrigeration work usually is.' },
];

const CRUMB_HOME = { l: 'Home', h: '/' };

/* ============================================================== HOME PAGE */
const homeFaqs = [
  { q: 'Does Ally Air work on commercial refrigeration and home HVAC?',
    a: 'Yes. Ally Air & Refrigeration handles commercial refrigeration — walk-in coolers, freezers, ice machines and reach-ins — as well as residential heating and air conditioning across Dacula and Gwinnett County. Most companies in the area do one or the other.' },
  { q: 'What areas does Ally Air serve?',
    a: `Ally Air is based on Old Peachtree Road in Dacula, Georgia, and serves ${D.towns.slice(0, -1).join(', ')} and ${D.towns.at(-1)}.` },
  { q: 'Can I reach someone after hours?',
    a: 'Yes. The number rings a person 24 hours a day, including nights and weekends. If a walk-in or a freezer is warming up, call rather than email — that is the situation the after-hours line exists for.' },
  { q: 'Who will show up at my building?',
    a: 'Ally Air is family-run and small on purpose. Ben Zeglevski, the owner, is on service calls himself, so the person who diagnoses the problem is usually the person who repairs it.' },
];

const home = page({
  title: 'Refrigeration & HVAC in Dacula, GA | Ally Air',
  desc: 'Family-run commercial refrigeration and home heating and air in Dacula, GA. Walk-in coolers, ice machines, AC and furnace repair. Someone answers 24/7.',
  path: '/',
  crumbs: [CRUMB_HOME],
  schema: [faqSchema(homeFaqs)],
  body: `${HEAD}

<div class="hero">
  <div class="photo"></div><div class="scrim"></div><div class="grain"></div>
  <div class="shotnote">Hero photograph — Ben and the crew in front of the vans,<br>daylight, outside a Gwinnett job. Warm, not staged.</div>
  <div class="wrap"><div class="inner">
    <div class="hcard">
      <div class="pad">
        <div class="kick">${icon.pin}<span class="lbl">Dacula, Georgia · Serving Gwinnett since ${D.since}</span></div>
        <h1>The <em>refrigeration</em> and HVAC company your neighbors already use.</h1>
        <p class="deck">Walk-in coolers, freezers and ice machines for Gwinnett kitchens — and heating and air for the homes around them. Family-run, and someone answers the phone at three in the morning.</p>
        <div class="cta">
          <a class="btn btn-cool" href="tel:${D.tel}">${icon.phone}${D.phone}</a>
          <a class="btn btn-out" href="/contact/">Book a service call</a>
        </div>
      </div>
      <div class="proofstrip">
        <div class="pf-score">
          <div class="n">${D.rating}</div><div class="st">★★★★★</div><div class="src">On Google</div>
        </div>
        <div class="pf-quote">
          <p>“Called during an ice storm. They came same day and repaired our furnace — they didn't try and sell me a new unit, and the price was really fair.”</p>
          <div class="who">Christopher Johnson · Google review · January 2026</div>
        </div>
      </div>
    </div>
    <div class="ownerchip">
      <div class="av"><span>Ben — portrait</span></div>
      <div><b>${D.owner}, owner</b><small>The person who diagnoses it is the one who fixes it</small></div>
    </div>
  </div></div>
</div>
${creds}

<section><div class="wrap">
  <div class="shead ctr">
    <span class="lbl">Two trades, one number</span>
    <h2>Which one are you here for?</h2>
    <p>Most companies near Dacula do one of these. We do both — so a restaurant has one contractor for the whole building, and a homeowner gets someone who works commercial equipment all week.</p>
  </div>
  <div class="doors">
    <a class="door c" href="/commercial/">
      <div class="img"><div class="flag">For businesses</div>
        <div class="cap">Photo — technician inside a restaurant walk-in, door open, cold light</div></div>
      <div class="bd">
        <h3>Commercial Refrigeration</h3>
        <p>When there's product at risk you go to the front of the line — and Georgia wants that box at 41°F or below.</p>
        <ul>
          <li>Walk-in coolers &amp; freezers</li>
          <li>Ice machines</li>
          <li>Reach-ins, prep tables, display cases</li>
          <li>Rooftop &amp; packaged HVAC</li>
          <li>Maintenance agreements</li>
        </ul>
        <span class="go">See commercial services ${icon.arrow}</span>
      </div>
    </a>
    <a class="door w" href="/residential/">
      <div class="img"><div class="flag">For homeowners</div>
        <div class="cap">Photo — technician talking a homeowner through a reading, both faces visible</div></div>
      <div class="bd">
        <h3>Heating &amp; Air Conditioning</h3>
        <p>Diagnosed on site, priced before we start, and repaired rather than replaced whenever that's the honest answer.</p>
        <ul>
          <li>AC repair &amp; installation</li>
          <li>Furnaces &amp; heat pumps</li>
          <li>Ductless mini-splits</li>
          <li>Air quality &amp; humidity</li>
          <li>Maintenance plans</li>
        </ul>
        <span class="go">See home services ${icon.arrow}</span>
      </div>
    </a>
  </div>
</div></section>

${reviewsSection()}

<section class="local"><div class="wrap">
  <div class="shead">
    <span class="lbl">Where we work</span>
    <h2>Close enough to matter on a Friday night</h2>
    <p>Based on Old Peachtree Road in Dacula. When a walk-in is warming up, the difference between two hours and tomorrow morning is the difference between a service call and written-off inventory.</p>
  </div>
  <div class="g">
    <div>
      <ul class="townlist">
        ${TOWNS.map(t => `<li><a href="/service-area/${t.s}/">${t.n}</a></li>`).join('\n        ')}
      </ul>
      <p style="color:#BEB6AC;margin-top:22px;font-size:15px">Just outside these towns? Call anyway — we can usually work something out.</p>
    </div>
    <div class="mapplate"><div class="cap">Map — service radius from Old Peachtree Road, generated from the shop address</div></div>
  </div>
</div></section>

<section><div class="wrap">
  <div class="shead"><span class="lbl">Common questions</span><h2>Before you call</h2></div>
  <div class="faq">${faqBlock(homeFaqs)}</div>
</div></section>

${closeBand("Tell us what it's doing.", "We'll tell you honestly what it sounds like, and how fast we can be there — before anyone books anything.")}`,
});

/* ================================================================ HELPERS */
function faqBlock(faqs) {
  return faqs.map((f, i) => `<details${i === 0 ? ' open' : ''}><summary>${f.q}</summary><p>${f.a}</p></details>`).join('\n    ');
}

function idxRow(no, h3, sub, body) {
  return `<div class="row"><div class="no">${no}</div>
      <div><h3>${h3}</h3><div class="sub">${sub}</div></div>
      <div>${body.map(p => `<p>${p}</p>`).join('')}</div></div>`;
}

const stepBlock = (steps) => `<div class="steps">${steps.map((s, i) => `
  <div class="step"><div class="n">${String(i + 1).padStart(2, '0')}</div>
    <h3>${s.h}</h3><p>${s.p}</p></div>`).join('')}</div>`;

/* ============================================================= COMMERCIAL */
const comFaqs = [
  { q: 'How cold does a walk-in cooler have to be in Georgia?',
    a: 'Georgia requires cold holding at 41°F or below. Food held above that is a priority violation at inspection, which is why a cooler drifting a few degrees is a repair worth making today rather than next week.' },
  { q: 'Do you service ice machines?',
    a: 'Yes. Ice machines are one of the most common commercial refrigeration calls we take — low production, cloudy or hollow cubes, water in the bin and units that short-cycle. Cleaning and descaling on a schedule prevents most of it.' },
  { q: 'Can one company handle both our refrigeration and our rooftop HVAC?',
    a: 'Yes, and that is the point of calling us. Ally Air works commercial refrigeration and HVAC, so a restaurant or retail building has one contractor and one number for the whole mechanical side instead of two.' },
  { q: 'Do you offer maintenance agreements for restaurants?',
    a: 'Yes. A scheduled maintenance agreement covers coil cleaning, temperature checks, door seals and drain lines on the equipment that fails most expensively. Ask for pricing when you call — it depends on how much equipment is in the building.' },
];

const commercial = page({
  title: 'Commercial Refrigeration in Gwinnett County | Ally Air',
  desc: 'Walk-in coolers, freezers, ice machines and commercial HVAC for restaurants, markets and retail across Dacula and Gwinnett County. 24/7 emergency line.',
  path: '/commercial/',
  crumbs: [CRUMB_HOME, { l: 'Commercial Refrigeration', h: '/commercial/' }],
  schema: [faqSchema(comFaqs)],
  body: `${HEAD}
${inner({
    crumbs: [CRUMB_HOME, { l: 'Commercial Refrigeration' }],
    kick: 'For restaurants, markets and retail',
    h1: 'When the box is warming up, <em>everything else waits</em>.',
    deck: 'Walk-in coolers, freezers, ice machines and reach-ins across Gwinnett County — plus the rooftop units above them. One contractor for the whole mechanical side of the building.',
    shot: 'Photograph — technician on a ladder at a rooftop condenser,<br>early morning, a Gwinnett strip-mall roof.',
  })}
${creds}

<section><div class="wrap">
  <div class="split">
    <div>
      <h2>Georgia says 41°F. Your inspector says so too.</h2>
      <p>Cold holding at 41°F or below is the rule in Georgia, and food held warmer than that is a priority violation. A cooler that has crept up two degrees isn't a maintenance item — it's a risk to a health score and to everything on the shelves.</p>
      <p>That is why commercial calls go to the front of the line, and why the after-hours number is answered by a person rather than a voicemail box.</p>
      <div class="pull">Product first. Paperwork after.</div>
    </div>
    <div class="plate"><div class="cap">Photo — thermometer reading inside a stocked walk-in, product visible</div></div>
  </div>
</div></section>

<section class="nb"><div class="wrap">
  <div class="shead"><span class="lbl">What we work on</span><h2>Commercial services</h2>
    <p>If it makes cold air in a commercial building, it is probably on this list. If it isn't, call anyway — we would rather tell you honestly that it isn't our equipment than send someone who is guessing.</p></div>
  <div class="idx">
    ${idxRow('01', 'Walk-in coolers &amp; freezers', 'Repair · maintenance · installation', [
      'Temperature drift, icing evaporators, failed defrost cycles, compressor and condenser faults, door seals and closers, drain lines and floor water.',
      'We diagnose on site and tell you what the repair costs before starting it. On older boxes we will also tell you when the honest answer is replacement rather than a third repair on the same part.',
    ])}
    ${idxRow('02', 'Ice machines', 'Repair · cleaning · descaling', [
      'Low or slow production, hollow and cloudy cubes, water in the bin, short cycling, and the scale build-up behind most of it.',
      'Scheduled cleaning is cheaper than the emergency call it prevents, and it is the single most skipped item in most kitchens.',
    ])}
    ${idxRow('03', 'Reach-ins, prep tables &amp; display cases', 'Repair · maintenance', [
      'Under-counter units, sandwich and pizza prep tables, glass-door merchandisers and deli cases — the equipment that fails quietly until product is already warm.',
    ])}
    ${idxRow('04', 'Commercial HVAC', 'Rooftop · packaged · split systems', [
      'Rooftop and packaged units, splits and mini-splits for the dining room, the retail floor and the back office.',
      'Because we are already on the roof for the refrigeration, the HVAC visit does not need to be a second contractor on a second day.',
    ])}
    ${idxRow('05', 'Maintenance agreements', 'Scheduled · documented', [
      'Coil cleaning, temperature verification, door seals, drain lines and refrigerant checks on a schedule, with a record of what was found each visit.',
      'Ask about pricing when you call — it depends on how much equipment is in the building, and we would rather quote it after seeing it than guess on a web page.',
    ])}
  </div>
</div></section>

<section><div class="wrap">
  <div class="shead"><span class="lbl">What happens</span><h2>From your call to cold again</h2></div>
  ${stepBlock([
    { h: 'You call', p: 'A person picks up, day or night, and asks what the equipment is doing — not what package you would like.' },
    { h: 'We triage', p: 'Product at risk goes to the front. If there is something you can do in the meantime to protect inventory, we tell you on the phone.' },
    { h: 'We diagnose on site', p: 'You get the actual fault and the cost of fixing it before any work starts. No surprise line items.' },
    { h: 'We follow up', p: 'If the same fault is likely to come back, you hear that too — with what it would take to stop it.' },
  ])}
</div></section>

${reviewsSection()}

<section class="nb"><div class="wrap">
  <div class="shead"><span class="lbl">Common questions</span><h2>Commercial FAQ</h2></div>
  <div class="faq">${faqBlock(comFaqs)}</div>
</div></section>

${closeBand('Is the box still cold?', "Call and tell us what you're reading on the thermometer. We'll tell you what it sounds like and how fast we can get there.")}`,
});

/* ============================================================ RESIDENTIAL */
const resFaqs = [
  { q: 'Do you repair air conditioners, or only replace them?',
    a: 'We repair first whenever repair is the honest answer. Our most-quoted Google review is from a customer whose furnace we fixed during an ice storm instead of selling a new unit — that is the default, not the exception.' },
  { q: 'What does an AC repair cost?',
    a: 'We diagnose on site and give you the price before any work starts, because the cost depends on the fault. Anyone quoting a repair price over the phone before seeing the system is guessing.' },
  { q: 'Do you install ductless mini-splits?',
    a: 'Yes. Mini-splits are a good fit for a converted garage, a bonus room over the garage, an addition, or any room that the existing ductwork was never sized for.' },
  { q: 'How often should a system be serviced?',
    a: 'Twice a year is the standard: cooling before summer, heating before winter. Most of the emergency calls we take in July and January are for something a spring or fall visit would have caught.' },
];

const residential = page({
  title: 'Heating & Air Conditioning in Dacula, GA | Ally Air',
  desc: 'AC repair, furnaces, heat pumps and ductless mini-splits for homes in Dacula, Lawrenceville, Buford and Gwinnett County. Family-run. Someone answers 24/7.',
  path: '/residential/',
  crumbs: [CRUMB_HOME, { l: 'Heating & Air', h: '/residential/' }],
  schema: [faqSchema(resFaqs)],
  body: `${HEAD}
${inner({
    warm: true,
    crumbs: [CRUMB_HOME, { l: 'Heating & Air' }],
    kick: 'For homes across Gwinnett County',
    h1: 'The company that <em>repaired the furnace</em> instead of selling a new one.',
    deck: "Air conditioning, heating, heat pumps and mini-splits for homes around Dacula. Diagnosed on site, priced before we start, and replaced only when replacing is genuinely the cheaper answer.",
    shot: 'Photograph — technician at a front door in daylight,<br>homeowner visible, shoe covers on.',
  })}
${creds}

<div class="warmtone">
<section><div class="wrap">
  <div class="split rev">
    <div class="plate warm"><div class="cap">Photo — technician showing a homeowner the reading on the gauge</div></div>
    <div>
      <h2>You should know the price before we pick up a tool.</h2>
      <p>Every home visit starts the same way: we find the actual fault, explain what it will take to fix, and tell you what that costs. Then you decide. Nothing gets replaced because it is easier to replace than to diagnose.</p>
      <p>It is also why we work commercial refrigeration all week. The person looking at your furnace spends his days on equipment that cannot be allowed to fail.</p>
      <div class="pull">Repair when repair is honest. Replace when it isn't.</div>
    </div>
  </div>
</div></section>

<section class="nb"><div class="wrap">
  <div class="shead"><span class="lbl">What we work on</span><h2>Home services</h2>
    <p>Whatever is keeping the house from being comfortable — the unit outside, the furnace in the basement, or the one room that has never been the right temperature.</p></div>
  <div class="idx">
    ${idxRow('01', 'Air conditioning repair', 'Diagnosis · repair · same-day where we can', [
      'Not cooling, short cycling, frozen coils, water where it should not be, breakers tripping, and the noise that started last week and got worse.',
      'You get the fault and the price before the work starts.',
    ])}
    ${idxRow('02', 'Heating &amp; furnaces', 'Gas furnaces · heat pumps · emergency heat', [
      'No heat, intermittent heat, ignition and flame-sensor faults, blowers, thermostats and heat pumps that will not switch over.',
      'Georgia winters are short, which is exactly why a furnace fails on the first cold night — it has been sitting idle since March.',
    ])}
    ${idxRow('03', 'System installation &amp; replacement', 'Sized for the house, not the truck', [
      'When a system genuinely is at the end, we size the replacement for your house and your ductwork rather than for whatever is on the shelf.',
      'One of our Google reviews is from a homeowner whose entire system was replaced in a single day.',
    ])}
    ${idxRow('04', 'Ductless mini-splits', 'Additions · bonus rooms · garages', [
      'For the room the ductwork was never designed to reach: a converted garage, a bonus room over it, a sunroom or an addition.',
    ])}
    ${idxRow('05', 'Maintenance', 'Spring cooling · fall heating', [
      'Twice-yearly service catches the failures that otherwise happen at the worst possible moment — in July, or on the first freezing night of the year.',
      'Ask about plan pricing when you call.',
    ])}
  </div>
</div></section>

<section><div class="wrap">
  <div class="shead"><span class="lbl">What happens</span><h2>What a service call looks like</h2></div>
  ${stepBlock([
    { h: 'You call or text', p: 'Tell us what it is doing, or send a photo of the unit and the model plate. It genuinely helps.' },
    { h: 'We diagnose', p: 'On site, on the actual equipment. Not over the phone, and not from the driveway.' },
    { h: 'You hear the price', p: 'The fault, the fix, and the cost — before anything is taken apart or ordered.' },
    { h: 'We fix it', p: 'And if the honest answer is that it should be replaced instead, you hear that with the reasons.' },
  ])}
</div></section>
</div>

${reviewsSection()}

<section class="nb"><div class="wrap">
  <div class="shead"><span class="lbl">Common questions</span><h2>Homeowner FAQ</h2></div>
  <div class="faq">${faqBlock(resFaqs)}</div>
</div></section>

${closeBand('Something not working right?', "Call and describe it. We'll tell you what it sounds like and what it usually means before anyone books anything.")}`,
});

/* =========================================================== SERVICE AREA */
const serviceArea = page({
  title: 'Service Area — Gwinnett County & Nearby | Ally Air',
  desc: 'Ally Air serves Dacula, Lawrenceville, Buford, Suwanee, Sugar Hill, Hoschton, Braselton and Gainesville — commercial refrigeration and home HVAC.',
  path: '/service-area/',
  crumbs: [CRUMB_HOME, { l: 'Service Area', h: '/service-area/' }],
  body: `${HEAD}
${inner({
    crumbs: [CRUMB_HOME, { l: 'Service Area' }],
    kick: `Based on ${D.street}, ${D.city}`,
    h1: 'Where we work, and <em>why that matters</em>.',
    deck: 'A refrigeration call is a race against the thermometer. Being twenty minutes away instead of an hour is not a marketing point — it is the difference between a repair and a written-off shelf.',
    shot: 'Photograph — the vans parked at the shop on Old Peachtree Road.',
  })}
${creds}

<section><div class="wrap">
  <div class="shead"><span class="lbl">Towns we cover</span><h2>Gwinnett County and the edges around it</h2>
    <p>These are the places we are in most weeks. If you are just outside them, call anyway — for commercial refrigeration especially, we can usually work something out.</p></div>
  <div class="towns">
    ${TOWNS.map(t => `<a class="town" href="/service-area/${t.s}/">
      <h3>${t.n}</h3><p>${t.note}</p><span class="go">Refrigeration &amp; HVAC in ${t.n} ${icon.arrow}</span></a>`).join('\n    ')}
  </div>
</div></section>

<section class="local"><div class="wrap">
  <div class="split">
    <div>
      <div class="shead"><span class="lbl">The shop</span><h2>${D.street}</h2>
        <p>${D.city}, ${D.region} ${D.postal} — the middle of the territory rather than the edge of it.</p></div>
      <a class="btn btn-cool" href="tel:${D.tel}">${icon.phone}${D.phone}</a>
    </div>
    <div class="mapplate"><div class="cap">Map — service radius from Old Peachtree Road, generated from the shop address</div></div>
  </div>
</div></section>

${reviewsSection()}
${closeBand('Are we near you?', 'Call and tell us where the building is. If we are not the right people, we will say so.')}`,
});

/* Town pages. Same promise, same equipment, different pin on the map — the
   copy differs where the town differs and nowhere else. */
const townPages = Object.fromEntries(TOWNS.map(t => {
  const faqs = [
    { q: `Does Ally Air service ${t.n}, GA?`,
      a: `Yes. ${D.legal} serves ${t.n} in ${t.c} from Old Peachtree Road in Dacula, covering commercial refrigeration — walk-in coolers, freezers, ice machines and reach-ins — as well as residential heating and air conditioning.` },
    { q: `Who repairs walk-in coolers in ${t.n}?`,
      a: `Ally Air repairs walk-in coolers and freezers for ${t.n} businesses, including temperature drift, icing evaporators, failed defrost cycles and door seals. Commercial refrigeration calls are triaged ahead of routine work because product is at risk.` },
    { q: `Is there an after-hours number for ${t.n}?`,
      a: `Yes — ${D.phone} is answered by a person 24 hours a day, including nights and weekends.` },
  ];
  return [`/service-area/${t.s}/`, page({
    title: `Refrigeration & HVAC in ${t.n}, GA | Ally Air`,
    desc: `Commercial refrigeration and home heating and air in ${t.n}, GA. Walk-in coolers, ice machines, AC and furnace repair from a family-run shop in Dacula.`,
    path: `/service-area/${t.s}/`,
    crumbs: [CRUMB_HOME, { l: 'Service Area', h: '/service-area/' }, { l: t.n, h: `/service-area/${t.s}/` }],
    schema: [faqSchema(faqs)],
    body: `${HEAD}
${inner({
      crumbs: [CRUMB_HOME, { l: 'Service Area', h: '/service-area/' }, { l: t.n }],
      kick: `${t.n}, Georgia · ${t.c}`,
      h1: `Refrigeration and HVAC in <em>${t.n}</em>.`,
      deck: `${t.note} Commercial refrigeration for the kitchens and shops, heating and air for the houses — from a family-run shop on Old Peachtree Road in Dacula.`,
    })}
${creds}

<section><div class="wrap">
  <div class="doors">
    <a class="door c" href="/commercial/">
      <div class="img"><div class="flag">For businesses</div>
        <div class="cap">Photo — walk-in door open, technician inside, ${t.n} job</div></div>
      <div class="bd">
        <h3>Commercial refrigeration in ${t.n}</h3>
        <p>Georgia wants cold holding at 41°F or below. When the box drifts, the call goes to the front of the line.</p>
        <ul><li>Walk-in coolers &amp; freezers</li><li>Ice machines</li>
          <li>Reach-ins &amp; prep tables</li><li>Rooftop &amp; packaged HVAC</li><li>Maintenance agreements</li></ul>
        <span class="go">See commercial services ${icon.arrow}</span>
      </div>
    </a>
    <a class="door w" href="/residential/">
      <div class="img"><div class="flag">For homeowners</div>
        <div class="cap">Photo — technician at a ${t.n} front door, daylight</div></div>
      <div class="bd">
        <h3>Heating &amp; air in ${t.n}</h3>
        <p>Diagnosed on site, priced before we start, repaired rather than replaced whenever that is the honest answer.</p>
        <ul><li>AC repair &amp; installation</li><li>Furnaces &amp; heat pumps</li>
          <li>Ductless mini-splits</li><li>Air quality &amp; humidity</li><li>Maintenance plans</li></ul>
        <span class="go">See home services ${icon.arrow}</span>
      </div>
    </a>
  </div>
</div></section>

${reviewsSection()}

<section><div class="wrap">
  <div class="shead"><span class="lbl">Common questions</span><h2>${t.n} FAQ</h2></div>
  <div class="faq">${faqBlock(faqs)}</div>
  <p style="margin-top:34px"><a href="/service-area/" style="color:var(--cool);font-weight:600">← All towns we serve</a></p>
</div></section>

${closeBand(`Working in ${t.n} this week.`, 'Call and tell us what the equipment is doing. We will tell you honestly what it sounds like.')}`,
  })];
}));

/* ================================================================== ABOUT */
const about = page({
  title: 'About Ally Air & Refrigeration — Dacula, GA',
  desc: `A family-run commercial refrigeration and HVAC company on Old Peachtree Road in Dacula, Georgia, owned by ${D.owner}. Two trades, one number, no call center.`,
  path: '/about/',
  crumbs: [CRUMB_HOME, { l: 'About', h: '/about/' }],
  body: `${HEAD}
${inner({
    crumbs: [CRUMB_HOME, { l: 'About' }],
    kick: `Family-run in ${D.city} since ${D.since}`,
    h1: 'Small on purpose. <em>Local on purpose.</em>',
    deck: `${D.owner} owns the company and is on service calls. That is not a story about humble beginnings — it is why the person who diagnoses your equipment is the one who repairs it.`,
    shot: 'Photograph — Ben in front of a van, arms crossed, not smiling for the camera.',
  })}
${creds}

<section><div class="wrap">
  <div class="split">
    <div class="prose">
      <p>Ally Air &amp; Refrigeration works two trades that most companies keep separate: commercial refrigeration for the kitchens, markets and shops around Gwinnett County, and heating and air for the homes in the same neighborhoods.</p>
      <p>That combination is unusual here, and it is deliberate. Refrigeration work sets the standard — a walk-in cannot be allowed to fail, and the diagnosis has to be right the first time because there is product on the shelves. Homeowners get the same technician, working to the same standard, on a much less forgiving schedule than most residential companies keep.</p>
      <p>We are not the biggest company in the county and are not trying to become it. There is no call center, no commission structure pushing a replacement over a repair, and no script.</p>
      <div class="pull">You get the owner's judgement, not a salesperson's target.</div>
    </div>
    <div class="plate"><div class="cap">Photo — the crew, shop or van fleet on Old Peachtree Road</div></div>
  </div>
</div></section>

<section class="nb"><div class="wrap">
  <div class="shead"><span class="lbl">How we work</span><h2>Four things we do the same way every time</h2></div>
  ${stepBlock([
    { h: 'Answer the phone', p: 'Day, night, weekend. A refrigeration emergency does not schedule itself for business hours.' },
    { h: 'Diagnose before quoting', p: 'On site, on the equipment. A price given over the phone before seeing the fault is a guess.' },
    { h: 'Repair when repair is right', p: "Our best-known review is about a furnace we fixed instead of replacing during an ice storm. That's the default." },
    { h: 'Say it plainly', p: 'What is wrong, what it costs, what happens if it waits. No pressure and no jargon for its own sake.' },
  ])}
</div></section>

${reviewsSection()}
${closeBand('Rather just talk to someone?', `${D.owner} or someone on the crew will pick up. Tell us what is happening and we will tell you what we think.`)}`,
});

/* ================================================================ CONTACT */
const contact = page({
  title: 'Contact Ally Air — Dacula, GA',
  desc: `Call or text ${D.phone} — answered 24/7. Ally Air & Refrigeration, ${D.street}, ${D.city}, GA. Commercial refrigeration and home HVAC.`,
  path: '/contact/',
  crumbs: [CRUMB_HOME, { l: 'Contact', h: '/contact/' }],
  body: `${HEAD}
${inner({
    crumbs: [CRUMB_HOME, { l: 'Contact' }],
    kick: 'Answered 24/7, including tonight',
    h1: 'Tell us what it is <em>doing</em>.',
    deck: 'Call, text a photo of the unit, or send the details below. For anything with product at risk, call — that is faster than any form.',
  })}

<section class="tight"><div class="wrap">
  <div class="contact">
    <div>
      <a class="bigcall" href="tel:${D.tel}">
        <small>Call or text, day or night</small>
        <b>${D.phone}</b>
        <p>A person answers — nights, weekends and holidays included. If a cooler or freezer is warming up, call rather than write.</p>
      </a>
      <div style="margin-top:26px">
        <div class="infoline">${icon.pin}<div><b>${D.legal}</b><span>${D.street}<br>${D.city}, ${D.region} ${D.postal}</span></div></div>
        <div class="infoline">${icon.clock}<div><b>Emergency line</b><span>24 hours a day, 7 days a week</span></div></div>
        <div class="infoline">${icon.snow}<div><b>What we cover</b><span>Commercial refrigeration and residential heating and air across ${D.towns.slice(0, 4).join(', ')} and the rest of Gwinnett County.</span></div></div>
        <div class="infoline">${icon.shield}<div><b>Licensed and insured</b><span>Ask for the details on the call and we will give them to you.</span></div></div>
      </div>
    </div>

    <div class="panel">
      <h3>Send us the details</h3>
      <p style="color:var(--ink-2);font-size:15.5px">For anything that is not an emergency. The more you can tell us about the equipment, the more useful the first call back will be.</p>
      <form method="post" action="#">
        <div class="field"><label for="f-name">Your name</label><input id="f-name" name="name" type="text" autocomplete="name" required></div>
        <div class="field"><label for="f-phone">Phone</label><input id="f-phone" name="phone" type="tel" autocomplete="tel" required></div>
        <div class="field"><label for="f-email">Email</label><input id="f-email" name="email" type="email" autocomplete="email"></div>
        <div class="field"><label for="f-type">What do you need?</label>
          <select id="f-type" name="type">
            <option>Commercial refrigeration</option>
            <option>Commercial HVAC</option>
            <option>Home heating or air conditioning</option>
            <option>Maintenance agreement</option>
            <option>Something else</option>
          </select></div>
        <div class="field"><label for="f-msg">What is the equipment doing?</label><textarea id="f-msg" name="message" placeholder="Make and model if you have it, what it is doing, and how long it has been doing it."></textarea></div>
        <div class="field"><button class="btn btn-cool" type="submit" style="width:100%">Send this to Ally Air</button></div>
      </form>
      <p class="form-note">Prefer to talk? Call or text ${D.phone} — someone answers 24/7.</p>
    </div>
  </div>
</div></section>

${reviewsSection()}
${closeBand('Something warming up right now?', 'Do not fill in a form. Call — that is what the 24-hour line is for.')}`,
});

/* ================================================================== ROUTES */
export const pages = {
  '/': home,
  '/commercial/': commercial,
  '/residential/': residential,
  '/service-area/': serviceArea,
  ...townPages,
  '/about/': about,
  '/contact/': contact,
};
