---
title: "Turning a Text Directory of 271 Homes into a Landing Page That Converts"
seoTitle: "WhataHotel Homes case study: landing page and structured data"
client: "WhataHotel Homes"
industry: "Luxury hospitality and travel"
status: "Client work"
url: "https://pro.whatahotel.com/homes"
repo: "https://github.com/Vincenzo182631/whathotel-search"
description: "A conversion-focused landing page for WhataHotel's villas and residences: 271 properties, search and filters, JSON-LD and a GoHighLevel inquiry flow."
summary: "A landing page for Google Ads traffic that makes 271 villas and residences searchable, readable by crawlers and connected to GoHighLevel."
order: 5
image: "/images/work/whatahotel-homes.jpg"
imageAlt: "The WhatAHotel Homes landing page for luxury villas and residences at top resorts."
tags: ["Website Development", "Technical SEO", "Structured Data", "GoHighLevel", "Hospitality"]
contribution:
  - "Landing page design and front-end build"
  - "Search, region, collection and setting filters"
  - "Generated JSON-LD, FAQ and crawler-readable property list"
  - "GoHighLevel embed and inbound webhook inquiry form"
  - "Conversion event tracking"
  - "Build scripts that generate the page data from one source file"
tools: ["HTML", "CSS", "JavaScript", "JSON-LD", "GoHighLevel", "Node.js", "Playwright", "Cloudflare Workers"]
services: ["website-development", "technical-seo", "gohighlevel"]
flow: ["Google Ad", "Homes landing page", "Property page", "Availability"]
facts:
  - { value: "271", label: "properties in the directory" }
  - { value: "42", label: "Exceptional Homes with an inquiry form" }
  - { value: "6", label: "regions derived from real country data" }
  - { value: "16", label: "test cases for the inventory keyword filter" }
---

## The challenge

WhataHotel's Homes collection covers villas, residences and estates at luxury hotels. The existing page was a text list. It was being used as a destination for Google Ads traffic, which meant paid visitors landed on a directory with no search, no pictures and no clear next step.

The redesign had one hard constraint: every existing link to an individual WhataHotel property page had to keep working, and booking had to stay on the platform's own availability system.

## My contribution

I designed and built the landing page as a static site, wrote the scripts that generate its data, added the structured data and the crawler-readable content, and connected the inquiry form to GoHighLevel. The booking engine and the property pages themselves belong to the WhataHotel platform; this page sends visitors to them.

## The solution

The page follows one journey: Google Ad, landing page, search or filter, select a property, the property's existing WhataHotel page, check availability.

- **One source file.** The 271 properties are captured in `scripts/source-homes.json` with each property's real name, collection, city, country, ID and URL slug. A build script generates the page data from it, so nothing is added, removed or reclassified by hand.
- **Search and filters.** Visitors search by destination, city, country, hotel or brand, and filter by region, collection and setting. Regions come from each property's real country. Settings such as beachfront or mountain are tagged from the property's own description and geography, never from its name.
- **Preserved links.** Every card links to the canonical property page, and "Check Availability" opens the platform's live availability with the homes filter applied.
- **Exceptional Homes.** A separate section lists 42 Mandarin Oriental Exceptional Homes across 8 countries. These are not bookable online, so the button sends an inquiry instead.

This is the kind of build I describe under [website development](/services/website-development/): search and conversion decisions made while the page is written.

## Technical implementation

A script, `scripts/build-seo.mjs`, generates three things from the real data: a plain-HTML list of every property grouped by region and country, an answer-first FAQ with matching `FAQPage` markup, and a JSON-LD `ItemList` of the properties. A crawler that does not run JavaScript can still read every property. The list entries carry no prices. From `index.html`:

```json
{
  "@type": "Hotel",
  "name": "Four Seasons Resort Whistler",
  "address": {
    "@type": "PostalAddress",
    "addressCountry": "Canada",
    "addressLocality": "Whistler"
  }
}
```

The Exceptional Homes get no structured data at all. They have indicative rates and no live prices, so `Offer` or `Product` markup would overstate them.

The inquiry form posts JSON straight to a GoHighLevel inbound webhook. The workflow creates or updates the contact and emails the reservations team. The guest sees the success message only after GoHighLevel accepts the request; if it is unreachable the form retries twice, then shows an error with the reservations address. The setup is documented as a [GoHighLevel](/services/gohighlevel/) integration in `docs/exceptional-homes-inquiries.md`.

Interactions push six named events to the data layer, including search, filter, property click and availability check.

## Outcome

What exists and can be checked in the repository:

- A landing page covering all 271 properties, with its canonical URL set to `pro.whatahotel.com/homes`.
- Generated JSON-LD, FAQ markup, and `llms.txt` and `llms-full.txt` files served by a Cloudflare Worker.
- A working inquiry flow into GoHighLevel, with a sample payload for field mapping.
- Unit tests, plus a browser test of the Exceptional Homes flow against a mock webhook.

I have not published advertising or conversion figures for this page.

## Considerations

Deciding what counts as a "home" from a hotel's name would have been easy and wrong. The page takes the 271 exactly as the platform lists them, and leaves unit-level eligibility to the availability system. The keyword logic that system applies is documented in a small module with a 16-case test matrix, including look-alikes such as "Homewood" and "Village".

The webhook URL is visible in the page source because the form posts from the browser. That was an accepted trade-off for a page with no server, and an optional server route is kept in the repository for stronger protection.
