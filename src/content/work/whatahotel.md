---
title: "Making Luxury Hotel Content Easier to Discover and Understand"
seoTitle: "WhatAHotel case study: structured hotel content for search"
client: "WhatAHotel"
industry: "Luxury hospitality and travel"
status: "Live site"
url: "https://www.whatahotel.com"
description: "How I worked on structured hotel content, FAQ schema and content operations for WhatAHotel, a luxury hotel discovery website."
summary: "Structured hotel content, FAQ schema and content operations for a luxury hotel discovery website."
order: 1
tags: ["Technical SEO", "Hospitality", "Structured Data", "Content Operations", "AI Search"]
contribution:
  - "Hotel-specific structured content"
  - "JSON-LD and FAQ enhancements"
  - "Presentation of amenities, offers and benefits"
  - "Hotel imagery data and content imports"
  - "Concepts for conversational hotel assistance"
tools: ["JSON-LD", "Schema.org", "FAQ structured data", "HTML", "Content import workflows", "Hotel imagery data"]
services: ["technical-seo", "website-development"]
flow: ["Hotel page", "Structured data", "Search engines", "AI answers"]
---

## The challenge

WhatAHotel helps travelers find luxury hotels and the benefits that come with booking them. A site like this carries a large number of hotel pages, and every one of them holds the same kinds of facts: where the property is, what amenities it has, which offers apply, and what a guest receives on arrival.

People can read those facts on the page. Search engines and automated answer systems have a harder time when the same facts sit in free-form paragraphs that differ from hotel to hotel. The opportunity was to describe each property in a consistent, structured way, so that both readers and machines can tell what a hotel offers without guessing.

## My contribution

I work on the content and search layer of the site. That covers hotel-specific structured content, JSON-LD and FAQ enhancements, the way amenities, offers and benefits are presented, and the hotel imagery data and import processes that feed the pages. I also developed concepts and integrations for conversational hotel assistance.

I did not build the WhatAHotel platform, and I do not own its ColdFusion backend. Some backend operations depend on other team members, so part of my work is preparing changes in a form they can put in place.

## The solution

The approach starts with the hotel page itself. I improved how each property's information is organized: amenities as a clear list, offers and benefits stated in plain terms, and questions a traveler would ask answered directly on the page.

On top of that visible content sits structured data. JSON-LD describes the hotel as an entity with its name, location and amenities. FAQ markup pairs each question with the answer shown on the page. The markup only repeats what a visitor can already see, which keeps it accurate and keeps it within the search engines' guidelines.

This is the core of my [technical SEO, AEO and GEO work](/services/technical-seo/): make the facts clear on the page first, then make the same facts machine-readable.

## Technical implementation

- **Hotel structured data.** JSON-LD for individual hotel pages, built from the property's own content, some of it implemented and some prepared for the backend team to implement.
- **FAQ content and schema.** Hotel FAQ content written to answer real booking questions, with matching FAQ structured data.
- **Content presentation.** Changes to how amenities, offers and benefits appear, so the page reads in a predictable order from one hotel to the next.
- **Imagery and imports.** Work with hotel imagery data and the content-import processes that bring it into the site, so images and their descriptions stay tied to the right property.
- **Conversational assistance.** Concepts and integrations for an AI hotel concierge that answers questions from the same hotel content.

## Outcome

What now exists is a more consistent body of hotel content: structured descriptions of properties, FAQ content with matching schema, and clearer presentation of what each hotel offers. The imagery and import work supports the content operations behind those pages.

I have not published performance figures for this project. Structured data helps search engines and answer systems understand a page; it does not guarantee a rich result, a ranking or a citation, and I do not claim one here.

## Considerations

Working inside an existing platform sets the pace. Where a change touches the backend, I prepare the markup and the logic and hand it to the people who maintain that code. That takes longer than editing a static site, and it keeps the platform stable.

The other decision was restraint. It is easy to add every schema type a hotel could qualify for. I kept to markup that reflects visible, accurate content, because structured data that drifts away from the page causes more problems than it solves. The same content also gives a conversational assistant something reliable to answer from.
