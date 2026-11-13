# Vincent Lancin: portfolio

Personal portfolio for Vincent, a technical SEO specialist, web developer and automation engineer.
A multi-page static site built with Astro, designed with the Taste Skill (`design-taste-frontend`) kit,
and prepared for Cloudflare Pages.

## Stack

- **Astro 7** with TypeScript, static output, no client framework
- **Content Collections** for case studies and articles (Markdown in `src/content/`)
- **Taste Skill kit** (plain CSS and JS in `public/assets/`, copied from `.claude/skills/design-taste-frontend/assets/` and never edited)
- **Cloudflare Pages**, with one Pages Function for the contact form (`functions/api/contact.ts`, sends through Resend)
- `@astrojs/sitemap` for the XML sitemap

## Run it

```bash
npm install
```

```bash
npm run dev
```

```bash
npm run build
```

```bash
npm run verify
```

`npm run verify` runs the type check, the production build, the internal link check and the SEO check.
The contact form's server side only runs on Cloudflare (or locally with `npx wrangler pages dev dist`).

## Environment variables

Copy `.env.example` to `.env` for local builds. Never commit real values.

| Variable | When | Purpose |
| --- | --- | --- |
| `SITE_URL` | build | The public origin. Canonicals, sitemap, Open Graph and JSON-LD read it. |
| `ALLOW_INDEXING` | build | Only `true` (with `SITE_URL` set) makes pages indexable and opens `robots.txt`. |
| `PUBLIC_CF_BEACON_TOKEN` | build | Optional Cloudflare Web Analytics token. |
| `PUBLIC_PLAUSIBLE_DOMAIN` | build | Optional Plausible domain. |
| `PUBLIC_TURNSTILE_SITE_KEY` | build | Optional Turnstile site key for the form. |
| `RESEND_API_KEY`, `CONTACT_TO`, `CONTACT_FROM` | runtime secret | Required for the form to send email. |
| `TURNSTILE_SECRET_KEY` | runtime secret | Optional, pairs with the site key. |

## Where to edit things

| What | Where |
| --- | --- |
| Name, email, LinkedIn, booking link | `src/data/profile.ts` |
| Navigation | `src/data/navigation.ts` |
| Service pages (all copy, FAQs, deliverables) | `src/data/services.ts` |
| Case studies | `src/content/work/*.md` |
| Articles | `src/content/insights/*.md` |
| Homepage | `src/pages/index.astro` |
| About, contact, privacy, 404 | `src/pages/*.astro` |
| Titles, descriptions, canonical, Open Graph | `src/components/Seo.astro` (values come from each page) |
| JSON-LD | `src/data/schema.ts` |
| Page CSS (code windows, plates, document pages) | `public/css/site.css` |
| Colours and fonts | the `:root` block in `src/layouts/BaseLayout.astro` (dealt by the Taste Skill; change them with its `start.mjs`) |
| Security headers, caching, redirects | `public/_headers`, `public/_redirects` |

### Add a case study

Create `src/content/work/<slug>.md` with the same frontmatter as an existing one
(`title`, `seoTitle`, `client`, `industry`, `status`, `description`, `summary`, `order`, `tags`,
`contribution`, `tools`, `services`, `flow`, optional `url`). It appears on `/work/`, in the footer and in the sitemap.
The four with `order` 1 to 4 show on the homepage.

### Publish an article

Create `src/content/insights/<slug>.md` with `title`, `description`, `excerpt`, `category`,
`publishDate`, optional `updatedDate`, `related` and `relatedServices`. Set `draft: true` to keep it out of the build.
Reading time is calculated. The RSS feed is at `/insights/rss.xml`.

## Routes

`/`, `/services/`, `/services/technical-seo/`, `/services/website-development/`, `/services/automation/`,
`/services/gohighlevel/`, `/work/`, `/work/<slug>/` (five case studies), `/about/`, `/insights/`,
`/insights/<slug>/` (three articles), `/contact/`, `/privacy/`, `/404.html`, plus `/robots.txt`,
`/sitemap-index.xml`, `/insights/rss.xml` and `/llms.txt` (optional, experimental).

## Other documents

- `SEO-STRATEGY.md`: audience, keyword map, structured data, validation steps
- `docs/CONTENT-VERIFICATION.md`: everything to confirm before launch
- `docs/DEPLOYMENT.md`: Cloudflare Pages setup and launch checklist
- `legacy/`: the previous static portfolio, kept for reference and not built
