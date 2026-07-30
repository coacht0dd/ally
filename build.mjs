#!/usr/bin/env node
/**
 * Ally Air & Refrigeration — static build.
 *
 *   node build.mjs      → writes the site to dist/
 *   node qa.mjs         → checks what it wrote
 *
 * No dependencies, no framework, no build step to break. Three files matter:
 *   src/kit.mjs    the facts about the business + the shared chrome
 *   src/pages.mjs  the words on each page
 *   src/site.css   how it looks
 *
 * Ground rules, enforced by qa.mjs:
 *   · one <h1> per page
 *   · real Google reviews only, quoted verbatim — never write one
 *   · no aggregateRating schema (Google treats self-serving ratings as spam)
 *   · click-to-call on every page
 *   · never invent a price, licence number, certification or founding date
 */
import { mkdir, writeFile, rm, cp } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { DATA as D } from './src/kit.mjs';
import { pages } from './src/pages.mjs';

const root = dirname(fileURLToPath(import.meta.url));

/* Cloudflare serves this at the root of a domain, so every internal link is
   written as an absolute path. GitHub Pages serves a project repo one level
   down (/ally/), which breaks all of them. BASE re-points them in one pass
   rather than threading a prefix through every template.
     node build.mjs                       → dist/   (root-hosted, Cloudflare)
     OUT=docs BASE=/ally node build.mjs   → docs/   (GitHub Pages preview)  */
const BASE = (process.env.BASE || '').replace(/\/$/, '');
const dist = join(root, process.env.OUT || 'dist');
const rebase = (html) => BASE
  ? html.replace(/(href|src)="\/(?!\/)/g, `$1="${BASE}/`)
  : html;

await rm(dist, { recursive: true, force: true });
await mkdir(join(dist, 'assets'), { recursive: true });
await cp(join(root, 'src/site.css'), join(dist, 'assets/site.css'));

for (const [route, html] of Object.entries(pages)) {
  const dir = route === '/' ? dist : join(dist, route);
  await mkdir(dir, { recursive: true });
  await writeFile(join(dir, 'index.html'), rebase(html));
}

const today = process.env.BUILD_DATE || new Date().toISOString().slice(0, 10);
await writeFile(join(dist, 'sitemap.xml'),
`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${Object.keys(pages).map(p => `  <url><loc>${D.url}${p}</loc><lastmod>${today}</lastmod></url>`).join('\n')}
</urlset>
`);

// This is a preview build on a temporary host. It must not be indexed, and it
// must not compete with allyairllc.com. Both the meta robots tag and this file
// come off in the same commit that points the real domain at it.
await writeFile(join(dist, 'robots.txt'),
`# ${D.legal} — temporary preview build
User-agent: *
Disallow: /
`);
await writeFile(join(dist, '404.html'), rebase(pages['/']));
// GitHub Pages runs Jekyll over the output unless told not to.
await writeFile(join(dist, '.nojekyll'), '');

console.log(`built ${Object.keys(pages).length} pages → ${dist}${BASE ? ` (base ${BASE})` : ''}`);
Object.keys(pages).forEach(p => console.log('  ' + p));
