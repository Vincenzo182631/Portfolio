---
title: "A technical SEO audit and fix package for a Spanish-language luxury hotel site"
seoTitle: "Solo5Estrellas case study: technical SEO audit and fix specs"
client: "Solo5Estrellas"
industry: "Luxury hotels, Spanish-language market"
status: "Delivered"
url: "https://solo5estrellas.com"
repo: "https://github.com/Vincenzo182631/solo5estrellas.com"
description: "A full technical SEO audit of Solo5Estrellas: 13 fix specs, redirect maps, hotel schema, hreflang and 345 drafted pages, ready for release."
summary: "A technical SEO audit turned into a developer package: 13 fix specs, redirect maps, hotel schema, a 52-check script and 345 drafted Spanish pages."
order: 2
image: "/images/work/solo5estrellas.jpg"
imageAlt: "The current Solo 5 Estrellas homepage in Spanish, as it looks before the fixes in the package are released."
tags: ["Technical SEO", "International SEO", "Structured Data", "Redirects", "Content"]
contribution:
  - "Technical SEO audit from public pages and Search Console"
  - "Fix specifications in release order"
  - "Redirect maps and hreflang map"
  - "Hotel and breadcrumb structured data"
  - "Verification script for every release"
  - "Spanish page drafts, metadata and style guide"
tools: ["Google Search Console", "JSON-LD Hotel schema", "301 redirect maps", "hreflang", "XML sitemap and robots.txt", "Bash verification script", "CSV test sets"]
services: ["technical-seo"]
flow: ["Audit", "Fix specs", "Developer release", "Verification"]
facts:
  - { value: "13", label: "technical fixes specified" }
  - { value: "52", label: "automated checks in the verification script" }
  - { value: "1,404", label: "duplicate URLs mapped for 650 page IDs" }
  - { value: "345", label: "pages with drafted titles and descriptions" }
---

## The challenge

Solo5Estrellas is a Spanish-language site for luxury hotels. Its pages were reaching Google, but under too many addresses and with the wrong signals. Search Console showed 650 page IDs served under more than one URL, which split impressions across duplicates. Templates had a broken meta title tag, missing canonicals, English titles on Spanish pages, and no `Hotel` structured data on hotel pages. Old `browse_*.cfm` URLs were still indexed, and one of them was the site's top organic landing page.

I had no access to the code or the server. Everything had to be worked out from public pages and Search Console exports, then written so the client's developer could apply it without guessing.

## My contribution

I ran the audit, tracked the findings, and turned them into a package a developer can release in stages. I wrote the fix specifications, built the redirect and hreflang maps, specified the structured data, and wrote a script that checks the live site after each release. I also drafted the Spanish page content and metadata that the fixed templates will carry, with a style guide for the editor.

This is [technical SEO](/services/technical-seo/) as I prefer to do it: the audit is the start, and the deliverable is something that can be shipped and verified.

## The solution

The package is ordered by risk. The first release fixes what every page shares and cannot break a URL: head markup, canonicals, Spanish titles and descriptions, and the hotel template. Host and HTTPS redirects, the sitemap and robots file come next. The release that changes URLs ships on its own so it can be watched, and hreflang, encoding and headers follow.

Three rules shape the redirect work:

- **The ID decides the page.** One lowercase, hyphenated slug per ID; any other slug returns a 301 to it.
- **Unknown IDs return a real 404.**
- **Pages that already rank get a single 301 step** and unchanged content until the release is checked.

## Technical implementation

The redirect maps come from Search Console and a crawl. They are meant as test sets for a router rule, not as hundreds of static rules. These rows are from `developer-spec/redirects-duplicate-slugs.csv`:

```csv
from,to_301,canonical_source,clicks,impressions
/cities/10/Amsterdam.html,/cities/10/amsterdam.html,site link,0,2
/cities/100/Peninsula-Papagayo.html,/cities/100/peninsula-papagayo.html,indexed variant,0,10
/cities/1001/Casablanca.html,/cities/1001/casablanca.html,derived,0,1
```

The `canonical_source` column says how sure each target is. A slug the site already links to is safe; a slug I derived is flagged for the developer to check against the code.

For structured data, the spec replaces an invalid offer block with a `Hotel` entity and a `BreadcrumbList`, built with a serializer so accents and quotes cannot break the JSON. It also says what to leave out: no ratings, because the score on the page is not a guest rating, and no prices, because rates change by date.

`verify.sh` sends read-only requests to the public site and prints a pass or fail for each check, so progress after a release is a number, not an opinion.

## Outcome

What was delivered:

- **13 technical fixes**, each with snippets and checks, in release order.
- **Redirect maps:** 949 duplicate-slug rows, 48 legacy URL rows, and a test set of 1,404 URLs covering 650 page IDs.
- **An hreflang map** linking drafted pages to their English equivalents.
- **Hotel and breadcrumb JSON-LD** specified for the hotel template.
- **A verification script with 52 checks.** 8 pass on the live site today.
- **Drafted pages:** 62 brand, 12 region, 131 country, 17 city and 116 hotel pages, plus 4 guides, with titles and descriptions for 345 pages.
- **A tracker of 188 findings.**

Nothing is live yet. The fixes take effect with the developer release, so there are no ranking or traffic results to report, and I am not claiming any.

## Considerations

Working without code access changes what a specification has to do. I could not read the slug rule the site uses, so the derived slugs are marked for checking. Some legacy URLs need IDs only the database holds, and those rows say so.

The drafts were checked before handover: no duplicate titles or descriptions, every JSON-LD file parses, and no prices in the copy. That check also removed claims I could not support, such as a star rating in a hotel description.

The same order of work applies to any launch, as I describe in [what matters before you publish a website](/insights/technical-seo-before-you-publish/).
