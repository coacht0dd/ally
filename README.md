# Ally Air & Refrigeration — website

Commercial refrigeration and residential HVAC · Dacula, Georgia.
Fourteen pages, zero dependencies, one build command.

```bash
npm run build     # → dist/   root-hosted (Cloudflare Workers static assets)
npm run qa        # build, then fail loudly on anything that shouldn't ship
npm run pages     # → docs/   same site rebased to /ally/ for a GitHub Pages preview
```

Node 18+. Nothing to install — there are no dependencies.

## Layout

| Path | What it is |
|---|---|
| `src/kit.mjs` | **Every fact the site states about the business**, plus the shared header, footer, review block and schema. Change a phone number here and it changes everywhere at once. |
| `src/pages.mjs` | The words on each page, and the route table. |
| `src/site.css` | The whole design. One stylesheet, no framework. |
| `build.mjs` | Writes the site. Also emits sitemap, robots, 404. |
| `qa.mjs` | The gate. Run it before every push. |
| `index.html` | The original single-file demo, kept for reference. |
| `docs/` | Committed build output for the GitHub Pages preview. |

## Pages

`/` · `/commercial/` · `/residential/` · `/service-area/` · eight town pages
under `/service-area/` · `/about/` · `/contact/`

The two trades get equal-weight doors on the homepage, and refrigeration is
named first everywhere — that is the whole positioning. Nine competitors in the
Dacula area were checked and none of them mention commercial refrigeration.

## Ground rules

`qa.mjs` enforces these. If you are an AI working in this repo, they are not
suggestions.

- **Real Google reviews only, quoted verbatim.** Never write one, never edit one.
- **No `aggregateRating` schema.** Stars show visually; the rating comes from the
  Google Business Profile. Self-serving rating markup is spam and Google treats
  it that way.
- **One `<h1>` per page.**
- **Never invent** a price, a licence number, a certification, a founding date,
  a response time, a years-in-business figure or a statistic. If Ben has not
  said it, it does not go on the site.
- **Click-to-call on every page.** This is a trade where people call.
- Prices stay off the site until Ben sets them.

## Preview status

This is a **temporary preview**, not the live site. Every page carries
`noindex,nofollow` and `robots.txt` disallows everything, so it cannot compete
with allyairllc.com for the client's own name. `qa.mjs` fails the build if that
slips. On launch day, run the QA gate with `PREVIEW=0` — it then fails the build
if any `noindex` is *still* there.

## Before this goes live

Open items, all still unknown after reading Ben's three Fix & Scale workbooks:

- Business email address
- Regular business hours — Google says 8–5 daily, the workbooks say 24/7
  emergency plus unspecified office hours
- Founding date, licence number, insurance carrier, certifications, team size
- All pricing
- Logo file
- Which phone number is correct: (404) 941-4599 · (404) 595-8216 · (404) 941-1599
- Service-area list — the workbooks and the directory listings disagree
- **The contact form has no endpoint.** It posts nowhere. Wire it to a Worker,
  a form service or an inbox before launch, or take it off and leave the phone.
- Photography. Every image is a described placeholder; the hero needs Ben and
  the crew, in daylight, in front of the vans.

Credentials for this project live in the client credentials doc, never in this
repo. `.gitignore` blocks anything named `secrets*` for that reason.
