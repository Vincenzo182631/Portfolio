import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// One place sets the public URL: canonicals, the sitemap, Open Graph and JSON-LD all read it.
// Set SITE_URL in Cloudflare Pages (and in .env for local builds). See docs/DEPLOYMENT.md.
const site = (process.env.SITE_URL || 'https://example.com').replace(/\/+$/, '');
if (!process.env.SITE_URL) {
  console.warn('[site] SITE_URL is not set: building with the placeholder https://example.com and noindex.');
}

export default defineConfig({
  site,
  trailingSlash: 'always',
  build: { format: 'directory', inlineStylesheets: 'auto' },
  integrations: [sitemap({ filter: (page) => !page.includes('/404') })],
});
