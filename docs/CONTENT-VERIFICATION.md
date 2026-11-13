# Content verification

Everything here should be confirmed by Vincent before the site goes live. Nothing on the published pages is
marked as a placeholder; this file is the list of what was assumed, carried over or left out.

## Identity and contact (from the previous portfolio, not from the brief)

| Item | Value used | Where it is set | Confirm |
| --- | --- | --- | --- |
| Surname | Lancin | `src/data/profile.ts` | The brief says "Vincent". The full name is used for the logo, titles and Person data. |
| Email | virtualtechvincent@gmail.com | `src/data/profile.ts` | The old site also showed virtualtechva.automation@gmail.com. Which is current? |
| LinkedIn | linkedin.com/in/vincentlancin | `src/data/profile.ts` | Still the right profile? |
| Booking calendar | not shown | `profile.bookingUrl` is empty | The old site linked a GoHighLevel calendar. Paste the URL to show "Book a call" on `/contact/`. |
| Phone | not shown | none | The old site listed a number. Left out on purpose. |
| Career start | "I started in 2020 as a virtual assistant doing lead generation and administrative work" | `src/pages/about.astro` | Taken from the old About page. Remove or correct if inaccurate. |

Not carried over from the old site because they could not be verified: the "5 years of experience" line,
the job titles "Senior GoHighLevel Specialist" and "Automation Consultant", skill percentages, the "24/7
monitoring" and "99.9% uptime" figures, the six sample projects, and the Zapier and Make services.

## Projects

| Project | Needs confirmation |
| --- | --- |
| WhatAHotel | That each listed contribution is accurate and may be described publicly. Which JSON-LD and FAQ work is live and which was prepared. Permission to name the client. |
| Lorraine Travel | Described as "In development" (staging work on Cloudflare Pages). Update the status when it launches. Permission to name the client. |
| Live How You Want | The EDC Las Vegas and EDC Orlando campaign work and the Bubble and GoHighLevel roles. Permission to name the client. |
| Sunny Braids | No website linked because none was given. Permission to name the client. |
| AI Hotel Concierge | Labelled "Prototype". Confirm which parts were built and which were explored. |
| Automation and product lab (`/work/#lab`) | Four items with statuses "In development", "Prototype" and "Concept". Confirm each status. |

No project page shows a metric, ranking, revenue figure or client quote. Add verified results to the
"Outcome" section of each `src/content/work/*.md` when you have them.

## Visual assets

- **No client screenshots or logos are used.** Each project is shown with an original flow diagram. To use real
  screenshots, get permission and add them to the case study body.
- **No portrait.** The About page and homepage have none. Supply an authorized photo to add one.
- **Tool logos** (Astro, Cloudflare, Bubble, Google Search Console, Lighthouse, n8n, Zoom, Claude, ElevenLabs,
  LiveKit, HTML5) are the real marks from open icon sets, listed in `public/assets/icons/icons-credits.json`.
  GoHighLevel and Tavus have no mark in a permitted set, so they are shown as text tiles.
- The share image `public/og/default.png` is generated from text.

## Copy decisions to review

- **Main headline.** The h1 is "Technical SEO, fast websites and automation" (the keyword-explicit option, shortened to fit the hero). "Built to be found. Designed to convert. Automated to grow." is not used as the h1.
- **Main button.** "Discuss a project" everywhere. The closing button repeats it in place of "Start a Conversation".
- **Budget ranges** on the contact form (Under $1,000 up to Over $7,500, and Ongoing monthly work) are assumed. Edit them in `src/pages/contact.astro`.
- **Technology claims.** TypeScript is not listed as a skill. Astro is listed with the note "This site runs on it". Confirm you want Astro shown.
- **Article dates.** All three are dated 13 November 2026, the day they were written. Change `publishDate` when you publish.
- **Articles and case studies** were drafted from the brief. Read each one for accuracy before publishing.
- **Privacy note** (`/privacy/`) is a plain description, not legal advice.

## Features that need credentials

| Feature | What is needed | Until then |
| --- | --- | --- |
| Contact form email | `RESEND_API_KEY`, `CONTACT_TO`, `CONTACT_FROM` (a sender on a domain verified in Resend) | The form shows "The message could not be sent. Please email me directly instead." and the email link works. |
| Spam challenge | `PUBLIC_TURNSTILE_SITE_KEY` and `TURNSTILE_SECRET_KEY` | Honeypot field and rate limit only. |
| Analytics | `PUBLIC_CF_BEACON_TOKEN` or `PUBLIC_PLAUSIBLE_DOMAIN` | No tracking script is loaded. |
| Indexing | `SITE_URL` and `ALLOW_INDEXING=true` | Every page is `noindex` and `robots.txt` disallows all. |

## Before launch

- [ ] Confirm the items above
- [ ] Decide the production domain and set `SITE_URL`
- [ ] Read all eight long-form pages (three articles, five case studies)
- [ ] Send a real test message through the form on the preview deployment
- [ ] Run the validation steps in `SEO-STRATEGY.md`
