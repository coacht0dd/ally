# Working in this repo

Ally Air & Refrigeration LLC — commercial refrigeration and residential HVAC,
Dacula, Georgia. Owner: Ben Zeglevski.

Read `README.md` first. It describes the layout and the build.

## Hard rules

These are not style preferences. Breaking one of them damages a real small
business, so `qa.mjs` fails the build on each of them.

1. **Facts come from `src/kit.mjs`.** Never hard-code a phone number, an
   address, a review or a town into a page template.
2. **Never invent anything about this business.** No prices, licence numbers,
   certifications, founding dates, response-time promises, years-in-business
   figures, employee counts or statistics. If Ben has not said it, it does not
   go on the site. When something is unknown, write the page so it reads
   honestly without it and leave a `CONFIRM` comment.
3. **Reviews are verbatim Google reviews.** Three real ones exist. Never write
   a fourth, never tidy the wording, never attribute one to a made-up name.
4. **No `aggregateRating` in JSON-LD.** Ever.
5. **One `<h1>` per page.**
6. **Click-to-call on every page.**
7. **This is a preview.** `noindex` stays on and `robots.txt` stays closed
   until launch. Do not remove either without being asked.

## Before you push

```bash
npm run qa
```

It must print "All checks passed." Then check the rendered pages at 320px and
1920px for horizontal overflow — that is the failure mode this design has hit
most often. Inline SVGs must carry explicit `width`/`height` attributes; without
them an unstyled render blows the page height into the tens of thousands of
pixels.

## Tone

Plain, specific, local. Short sentences. American spelling — this is Georgia.
The site is meant to read as the company the neighbors already use, not as a
marketing page. If a line sounds like it was written by a marketing department,
it is wrong.
