#!/usr/bin/env node
/**
 * Build-time QA. Runs against dist/ and fails loudly.
 * Checks the things that actually went wrong on the old site:
 * one H1, real schema, no dead internal links, no placeholder text shipped.
 */
import { readdir, readFile, stat } from 'node:fs/promises';
import { join } from 'node:path';

const DIST = new URL('./dist/', import.meta.url).pathname;
const problems = [];
const warnings = [];

async function walk(dir, out = []) {
  for (const e of await readdir(dir)) {
    const p = join(dir, e);
    if ((await stat(p)).isDirectory()) await walk(p, out);
    else if (e.endsWith('.html')) out.push(p);
  }
  return out;
}

const files = await walk(DIST);
const routes = new Set(
  files.map((f) => {
    const r = f.replace(DIST, '/').replace(/index\.html$/, '');
    return r === '/404.html' ? r : r;
  })
);

for (const f of files) {
  const html = await readFile(f, 'utf8');
  const route = f.replace(DIST, '/').replace(/index\.html$/, '');
  const tag = (n) => [...html.matchAll(new RegExp(`<${n}[\\s>]`, 'gi'))].length;

  // --- one H1, always
  const h1s = [...html.matchAll(/<h1[\s>]/gi)].length;
  if (h1s !== 1) problems.push(`${route} has ${h1s} <h1> tags (must be exactly 1)`);

  // --- title & meta description present and sane
  const title = html.match(/<title>(.*?)<\/title>/s)?.[1] ?? '';
  const desc = html.match(/<meta name="description" content="(.*?)">/s)?.[1] ?? '';
  if (!title) problems.push(`${route} has no <title>`);
  if (title.length > 65) warnings.push(`${route} title is ${title.length} chars (>65 may truncate): ${title}`);
  if (!desc) problems.push(`${route} has no meta description`);
  else if (desc.length > 160) warnings.push(`${route} meta description is ${desc.length} chars (>160)`);

  // --- canonical + OG
  if (!html.includes('<link rel="canonical"')) problems.push(`${route} missing canonical`);
  if (!html.includes('property="og:title"')) problems.push(`${route} missing Open Graph`);

  // --- structured data parses, and says what it should
  const ld = html.match(/<script type="application\/ld\+json">(.*?)<\/script>/s)?.[1];
  if (!ld) problems.push(`${route} has no JSON-LD`);
  else {
    try {
      const data = JSON.parse(ld);
      const types = data['@graph'].flatMap((n) => (Array.isArray(n['@type']) ? n['@type'] : [n['@type']]));
      if (!types.includes('LocalBusiness')) problems.push(`${route} JSON-LD missing LocalBusiness`);
      if (JSON.stringify(data).includes('aggregateRating'))
        problems.push(`${route} contains self-serving aggregateRating schema — forbidden`);
    } catch (e) {
      problems.push(`${route} JSON-LD does not parse: ${e.message}`);
    }
  }

  // --- phone must be reachable in one tap
  if (!html.includes('href="tel:+14049414599"')) problems.push(`${route} has no click-to-call link`);
  if (!html.includes('(404) 941-4599')) problems.push(`${route} does not show the phone number`);

  // --- nothing half-written should ever ship
  for (const bad of ['Lorem ipsum', 'TODO', 'FIXME', 'undefined', 'NaN', '[object Object]']) {
    if (html.includes(bad)) problems.push(`${route} contains "${bad}"`);
  }

  // --- internal links must resolve
  for (const m of html.matchAll(/href="(\/[^"#?]*)"/g)) {
    const href = m[1];
    if (href.startsWith('/assets/') || href.startsWith('/images/')) continue;
    if (/\.(xml|txt|png|jpg|svg|ico|css|js)$/.test(href)) continue;
    if (href === '/api/lead') continue; // wired at Phase 5
    if (!routes.has(href)) problems.push(`${route} links to ${href} which does not exist`);
  }

  // --- headings should not skip levels wildly
  if (tag('h3') > 0 && tag('h2') === 0) warnings.push(`${route} has h3 but no h2`);
}

// --- sitemap and robots
const sitemap = await readFile(join(DIST, 'sitemap.xml'), 'utf8');
const inSitemap = [...sitemap.matchAll(/<loc>https:\/\/allyairllc\.com(.*?)<\/loc>/g)].map((m) => m[1]);
for (const r of routes) {
  if (r === '/404.html') continue;
  if (!inSitemap.includes(r)) problems.push(`${r} is missing from sitemap.xml`);
}
const robots = await readFile(join(DIST, 'robots.txt'), 'utf8');
// This repo is a temporary preview on a temporary host. Until it becomes the
// live site it MUST stay closed to crawlers, or it competes with allyairllc.com
// for the client's own name. PREVIEW=0 flips the check back on launch day.
const PREVIEW = process.env.PREVIEW !== '0';
if (PREVIEW) {
  if (!/Disallow: \/\s*$/m.test(robots)) problems.push('preview build: robots.txt must block the whole site');
  for (const f of files) {
    const html = await readFile(f, 'utf8');
    if (!/name="robots" content="noindex/.test(html))
      problems.push(`preview build: ${f.replace(DIST, '/')} is missing its noindex tag`);
  }
} else {
  if (!robots.includes('Sitemap:')) problems.push('robots.txt does not reference the sitemap');
  if (/Disallow: \/\s*$/m.test(robots)) problems.push('robots.txt blocks the whole site');
  for (const f of files) {
    const html = await readFile(f, 'utf8');
    if (/name="robots" content="noindex/.test(html))
      problems.push(`launch build: ${f.replace(DIST, '/')} still carries noindex`);
  }
}

/* ------------------------------------------------------------------ report */
console.log(`QA — ${files.length} pages checked\n`);
if (warnings.length) {
  console.log(`${warnings.length} warning(s):`);
  warnings.forEach((w) => console.log('  ! ' + w));
  console.log('');
}
if (problems.length) {
  console.log(`${problems.length} PROBLEM(S):`);
  problems.forEach((p) => console.log('  ✕ ' + p));
  process.exit(1);
}
console.log('All checks passed.');
