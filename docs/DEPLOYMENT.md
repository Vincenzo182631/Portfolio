# Deployment on Cloudflare Pages

Nothing in this repository deploys by itself. No DNS record or live domain was changed while building it.

## Create the Pages project

1. Cloudflare dashboard, **Workers & Pages**, **Create**, **Pages**, **Connect to Git**.
2. Select the repository and the production branch.
3. Build settings:

| Setting | Value |
| --- | --- |
| Framework preset | Astro |
| Build command | `npm run build` |
| Build output directory | `dist` |
| Root directory | `/` |
| Environment variable `NODE_VERSION` | `22` |

The `functions/` folder is picked up automatically: `functions/api/contact.ts` becomes `POST /api/contact`.

## Environment variables

Set under **Settings**, **Variables and Secrets**, separately for Production and Preview.

| Name | Production | Preview | Type |
| --- | --- | --- | --- |
| `SITE_URL` | `https://your-domain.com` | leave unset | Plain text |
| `ALLOW_INDEXING` | `true` | leave unset | Plain text |
| `PUBLIC_CF_BEACON_TOKEN` or `PUBLIC_PLAUSIBLE_DOMAIN` | optional | leave unset | Plain text |
| `PUBLIC_TURNSTILE_SITE_KEY` | optional | optional | Plain text |
| `RESEND_API_KEY` | required for the form | optional | Secret |
| `CONTACT_TO` | your inbox | optional | Secret |
| `CONTACT_FROM` | `Portfolio <hello@your-domain.com>` | optional | Secret |
| `TURNSTILE_SECRET_KEY` | optional | optional | Secret |

With `SITE_URL` or `ALLOW_INDEXING` unset, the build is a staging build: every page carries
`noindex, nofollow` and `robots.txt` disallows everything. Preview deployments therefore stay out of search.

`SITE_URL` is the only place the domain is written. Canonicals, the sitemap, Open Graph URLs and JSON-LD all
follow it. The old address `virtualtechvincent.pages.dev` is not hard-coded anywhere.

## Contact form

1. Create a Resend account, verify your sending domain, create an API key.
2. Add the three secrets above and redeploy.
3. Send a test message from the deployed `/contact/` page.

To test locally:

```bash
npm run build
```

```bash
npx wrangler pages dev dist
```

Put the secrets in a `.dev.vars` file for that command. The file is ignored by git.

The function validates on the server, drops honeypot submissions, limits each IP to five messages per ten
minutes (best effort, per data centre) and verifies Turnstile when its secret is set. For a strict limit, add a
Cloudflare rate limiting rule on `/api/contact`.

## Custom domain

1. In the Pages project, **Custom domains**, **Set up a custom domain**.
2. Add the apex domain and `www`. Cloudflare creates the DNS records when the zone is on Cloudflare.
3. Pick one canonical host. Redirect the other with a Redirect Rule (for example `www` to apex, 301).
4. Set `SITE_URL` to the canonical host and redeploy.

## Redirects, headers, caching

- `public/_redirects` sends the old `.html` URLs to the new routes with 301s. It only matters if this build
  replaces the old site on the same domain.
- `public/_headers` sets the Content Security Policy, HSTS, frame, referrer and permissions headers, and cache
  lifetimes. If you add a third-party script, add its origin to the CSP there.
- Unknown URLs return `404.html` with a 404 status.

## Analytics and measurement

- No tracking script ships unless `PUBLIC_CF_BEACON_TOKEN` (Cloudflare Web Analytics) or `PUBLIC_PLAUSIBLE_DOMAIN` (Plausible) is set. Both are cookieless, so no consent banner is needed for them.
- Buttons and links marked `data-track` (main calls to action, project links, LinkedIn, the email link) and a successful form send are reported as Plausible events (`cta_click`, `contact_form_sent`) and as a `site:track` DOM event for anything else you connect. See `public/js/site.js`.
- GA4 is not wired in. It sets cookies, so adding it means adding consent handling first.
- Google Search Console: see `SEO-STRATEGY.md`.

## Launch checklist

- [ ] `npm run verify` passes
- [ ] `docs/CONTENT-VERIFICATION.md` is cleared
- [ ] Production variables set, `SITE_URL` correct, `ALLOW_INDEXING=true`
- [ ] Preview deployment reviewed on a phone and a desktop
- [ ] Form test message received
- [ ] `https://<domain>/robots.txt` allows crawling and lists the sitemap
- [ ] A made-up URL returns 404
- [ ] Rich Results Test and Lighthouse run on the live URL
- [ ] Sitemap submitted in Search Console
