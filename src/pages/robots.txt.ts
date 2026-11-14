import type { APIRoute } from 'astro';
import { indexable } from '../data/profile';

// Staging and preview builds (no ALLOW_INDEXING=true) tell crawlers to stay out.
export const GET: APIRoute = ({ site }) => {
  const body = indexable
    ? `User-agent: *\nAllow: /\n\nSitemap: ${new URL('/sitemap-index.xml', site).href}\n`
    : `User-agent: *\nDisallow: /\n`;
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
