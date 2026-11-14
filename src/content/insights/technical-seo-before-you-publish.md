---
title: "Technical SEO: What Actually Matters Before You Publish a Website"
description: "A practical pre-launch technical SEO checklist: crawlability, indexing, canonicals, structured data, redirects, and Core Web Vitals, in priority order."
excerpt: "Most launch problems come from a short list of technical mistakes. Here is what I check before a site goes live, in the order that matters."
category: "Technical SEO"
publishDate: 2026-11-13
related: ["seo-vs-aeo-vs-geo", "gohighlevel-website-leads-follow-up"]
relatedServices: ["technical-seo", "website-development"]
---

Before a website goes live, a search engine needs to be able to reach every important page, understand what each page is about, and decide which URL is the real one. Most launch problems I see come from a short list of technical mistakes in those three areas, and nearly all of them are cheaper to fix before publishing than after.

This is the order I work through on my own builds and on sites I audit.

## Start with crawling and indexing

Nothing else matters if a page cannot be crawled or is told not to be indexed. These are also the mistakes that travel most easily from staging to production.

### Check robots.txt and the robots meta tag

A staging site is usually blocked on purpose. The block often survives the launch. Open `/robots.txt` on the production domain and read it. A healthy file for a small site is short:

```txt
User-agent: *
Allow: /

Sitemap: https://www.example.com/sitemap-index.xml
```

Then view the source of a few key pages and search for `noindex`. Remember the two controls do different jobs. `robots.txt` controls crawling. A `noindex` meta tag controls indexing, and a crawler has to be allowed to fetch the page to see it. Blocking a page in `robots.txt` and adding `noindex` to it means the `noindex` is never read.

### Publish an XML sitemap that tells the truth

A sitemap should list only the URLs you want indexed: canonical, returning a 200 status, not redirected, not blocked. A sitemap full of redirects and removed pages teaches a crawler to trust it less. Generate it from the build so it cannot drift from the site, and reference it in `robots.txt`.

### Make sure the content is in the HTML

If the main content only appears after JavaScript runs, you are depending on rendering, which is slower and less reliable than reading HTML. For a marketing site there is rarely a reason to take that risk. I build these sites as static or server-rendered pages, so the headings, copy, links, and structured data are present in the first response. A quick test is to disable JavaScript in the browser and reload. If the page is blank, fix that first.

## Give every page one address

Duplicate URLs split signals and waste crawl attention. Decide the rules once and enforce them with redirects.

- One protocol and one host: `https://www.example.com` or `https://example.com`, never both.
- One trailing-slash convention, applied to every internal link.
- Lowercase paths, with words separated by hyphens.
- A self-referencing canonical tag on every indexable page, as an absolute URL.

The canonical tag is a hint, and it works best when everything else agrees with it. If the canonical says one URL, the sitemap lists another, and internal links point to a third, you have given three different answers to the same question.

## Plan redirects before the old site disappears

A redesign or migration is where established pages get lost. Before launch, export every URL the old site has that receives traffic or links, and map each one to its closest equivalent on the new site with a permanent redirect.

A few rules keep this clean:

- Redirect to the most relevant page, not to the homepage by default.
- Avoid chains. Old URL to final URL in one step.
- Update internal links to point at the final URL so the site does not rely on its own redirects.
- Keep a real 404 page that returns a 404 status for addresses that no longer exist.

On the Lorraine Travel rebuild, preserving existing content and links was a requirement from the first day, which is why the URL inventory came before any design work. I cover that approach on the [website development](/services/website-development/) page.

## Write metadata for the page, not for a formula

Every indexable page needs a unique title and a unique meta description. The title says what the page is, in plain words, with the most specific part first. The description is a sentence or two a person would want to read in a result. Search engines rewrite both when they disagree with them, so accuracy matters more than cleverness.

Each page also needs one `h1` that matches its purpose, and headings underneath that step down in order. Headings are structure, and a page whose outline reads sensibly on its own is easier for people, screen readers, and crawlers to follow.

Add Open Graph and Twitter card tags while you are there. They do not affect ranking, but they decide how the page looks when someone shares it.

## Add structured data that matches what is visible

Structured data describes the page in a format machines can read without guessing. Use the types that fit: `Organization` or `Person` for who is behind the site, `WebSite`, `BreadcrumbList`, `Article` for posts, and types specific to the business where they apply.

```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Services", "item": "https://www.example.com/services/" },
    { "@type": "ListItem", "position": 2, "name": "Technical SEO", "item": "https://www.example.com/services/technical-seo/" }
  ]
}
```

Two rules keep you out of trouble. Mark up only what a visitor can see on the page, and never add ratings, reviews, or awards that do not exist. Valid markup makes a page eligible for certain search features. It does not guarantee them, and FAQ markup in particular is shown far less often than it once was. I still structure question-and-answer content carefully, because it is useful to readers either way. The hotel content work described in the [WhatAHotel case study](/work/whatahotel/) is an example of that.

Validate with the Schema Markup Validator and Google's Rich Results Test before launch.

## Measure performance where users feel it

Core Web Vitals are three measurements of real user experience:

- **Largest Contentful Paint (LCP):** how quickly the main content appears.
- **Interaction to Next Paint (INP):** how quickly the page responds to input.
- **Cumulative Layout Shift (CLS):** how much the layout moves while loading.

The fixes are usually unglamorous. Serve images at the size they are displayed, in a modern format, with `width` and `height` set so the layout does not jump. Load the hero image early and lazy-load what sits below the fold. Limit font files and use `font-display: swap`. Ship less JavaScript, and defer what does not need to run immediately. Remove third-party scripts nobody can name a reason for.

Test on a mid-range phone profile, not only on a desktop with a fast connection.

## Check the internal links

Every important page should be reachable through navigation or a contextual link from another page. A page with no internal links pointing to it is easy for a crawler to miss and tells search engines it is not important. Run a crawler over the built site before launch and fix broken links, redirected links, and orphan pages.

Anchor text should describe the destination. "Technical SEO services" tells a reader and a crawler more than "learn more".

## Set up measurement on day one

Verify the domain in Google Search Console and submit the sitemap as soon as the site is live. Search Console is where indexing problems, crawl errors, and structured data warnings show up first. Without it you are guessing.

The same foundations support how AI-powered answer systems find and read a site. I explain how those pieces relate in [SEO vs. AEO vs. GEO](/insights/seo-vs-aeo-vs-geo/).

## Where to start

- Read `robots.txt` on the production domain and search key pages for `noindex`.
- Confirm one host, one protocol, one trailing-slash rule, with redirects enforcing each.
- Check that every indexable page has a unique title, description, canonical, and a single `h1`.
- Map old URLs to new ones before a redesign goes live.
- Validate structured data and confirm it matches visible content.
- Test LCP, INP, and CLS on a mobile profile.
- Crawl the built site for broken links and orphan pages.
- Verify Search Console and submit the sitemap.

If you would like a second pair of eyes on a site before or after launch, my [technical SEO service](/services/technical-seo/) covers the audit and the implementation. You can [send me the details](/contact/) and I will tell you what I would look at first.
