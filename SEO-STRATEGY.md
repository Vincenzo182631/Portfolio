# SEO strategy

This site sells technical SEO, so it has to pass its own audit. This document records the decisions.

## Audience and intent

| Visitor | What they search or ask | What they need to see |
| --- | --- | --- |
| US business owner with a site that underperforms | "technical SEO specialist", "why is my site not indexed" | Proof the work gets implemented, a clear first step |
| Marketing lead with an audit nobody actioned | "SEO website developer", "implement SEO audit" | That one person does strategy and code |
| Agency needing a technical partner | "freelance technical SEO", "GoHighLevel automation specialist" | Scope, tools, how handover works |
| Owner comparing new terms | "SEO vs AEO vs GEO" | A plain explanation without promises |
| GoHighLevel user | "GoHighLevel specialist", "connect website form to GoHighLevel" | Real workflow mechanics |

Vincent is in the Philippines and serves US clients remotely. The site says so on the first screen and in the
Person data. There are no city pages and no implied US office.

## Keyword to page map

One primary topic per URL. These are themes to write around, not phrases to repeat.

| Page | Primary theme | Supporting themes |
| --- | --- | --- |
| `/` | technical SEO specialist and web developer | SEO website developer, website development and SEO, automation |
| `/services/` | technical SEO, website and automation services | how the four services connect |
| `/services/technical-seo/` | technical SEO services | AEO specialist, GEO optimization services, structured data, on-page SEO |
| `/services/website-development/` | SEO-ready website development | website redesign without losing rankings, Cloudflare Pages |
| `/services/automation/` | business process and workflow automation | webhooks, n8n, lead routing, website automation specialist |
| `/services/gohighlevel/` | GoHighLevel specialist | GoHighLevel automation specialist, CRM workflow automation |
| `/work/` and case studies | project evidence by industry | hotel structured data, festival travel landing pages, webinar automation |
| `/insights/technical-seo-before-you-publish/` | technical SEO checklist before launch | canonical, sitemap, Core Web Vitals |
| `/insights/seo-vs-aeo-vs-geo/` | SEO vs AEO vs GEO | answer engine optimization, generative engine optimization |
| `/insights/gohighlevel-website-leads-follow-up/` | GoHighLevel website lead follow-up | webhook, workflow, pipeline |
| `/about/` | who Vincent is (entity page) | location, industries, work model |

## Metadata conventions

- Set in each page and rendered by `src/components/Seo.astro`.
- Title: page topic, then ` | Vincent Lancin` when the total stays within 65 characters; longer titles stand alone.
- Description: one or two sentences, 70 to 160 characters, unique per page.
- Canonical: absolute, built from `SITE_URL`, always with a trailing slash.
- Robots: `index, follow` only when `ALLOW_INDEXING=true` and `SITE_URL` is set; otherwise `noindex, nofollow`. The 404 page is always `noindex`.
- Open Graph and X card on every page, sharing `public/og/default.png` (regenerate with `node scripts/make-og.mjs`).
- `scripts/check-seo.mjs` fails the build check on a missing, duplicate or over-long title or description.

## Structured data

Written in `src/data/schema.ts`, output as JSON-LD, and limited to facts visible on the site.

| Type | Where | Notes |
| --- | --- | --- |
| `WebSite` | every page | name, URL, language, publisher |
| `Person` | every page | name, job title, country, `knowsAbout`, LinkedIn as `sameAs` |
| `ProfilePage` | `/about/` | main entity is the Person |
| `BreadcrumbList` | every page below the homepage | matches the visible breadcrumb |
| `Service` | each service page | provider is the Person, area served United States |
| `BlogPosting` | each article | headline, dates, author, image |

Left out on purpose: `FAQPage` (the FAQs are for visitors; Google shows FAQ rich results for few sites, and the
markup would promise nothing), reviews, ratings, awards, `LocalBusiness` and any street address.

## Internal linking

- Global navigation reaches Services, Work, About, Insights and Contact; the Services menu and the footer reach every service, case study and article category.
- Every service page links to its related case studies and two related services.
- Every case study links to its services and the next case study.
- Every article links to services and case studies in its body, to two related articles and to the author page.
- Breadcrumbs on every page below the homepage.
- `scripts/check-links.mjs` fails on a broken internal link, a missing anchor or a page with no inbound link.

## AEO and GEO implementation

- Service pages open with an answer-first lead, define AEO and GEO in plain language and carry FAQs in visible HTML.
- Headings describe their section; lists and tables are real lists and tables.
- One consistent identity (name, role, location, market) in the header, footer, About page and Person data.
- Case studies state what was and was not done, with status labels ("Live site", "In development", "Prototype").
- All content is in the HTML at build time; nothing essential needs JavaScript.
- `/llms.txt` is generated as an optional, experimental file. It is not treated as a ranking factor.
- No claim anywhere that markup or files guarantee rankings, rich results or AI citations.

## Search Console setup

1. Set `SITE_URL` and `ALLOW_INDEXING=true` for the production environment and deploy.
2. Add the domain as a Domain property in Google Search Console and verify it by DNS in Cloudflare.
3. Submit `https://<domain>/sitemap-index.xml`.
4. Inspect `/`, `/services/technical-seo/` and one article with URL Inspection and request indexing.
5. After two weeks, review Pages (indexing) and Core Web Vitals reports. Repeat in Bing Webmaster Tools.

## Technical validation

Run before each release:

```bash
npm run verify
```

Then, on the deployed preview URL:

- Rich Results Test and Schema Markup Validator on the homepage, a service page and an article
- Lighthouse (mobile) on the homepage, a service page and an article
- `curl -I` on a made-up URL returns 404; `/about.html` returns a 301 to `/about/`
- `robots.txt` and the robots meta match the environment (closed on preview, open on production)

## Content opportunities

- A technical SEO audit walkthrough with a redacted real example
- Structured data for hotels: what to mark up and what to leave out (from the WhatAHotel work)
- Redesign without losing rankings: the redirect map process (from the Lorraine Travel work, once launched)
- Webinar funnel architecture in GoHighLevel (from the Sunny Braids work)
- Measuring AI referral traffic in analytics

## Future improvements

- Self-host the two font families to remove the Google Fonts request
- Per-page Open Graph images
- Authorized client screenshots in the case studies
- A portrait on the About page, with `image` added to the Person data
- `FAQPage` markup only if a page becomes a true FAQ resource
