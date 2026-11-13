import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { profile } from '../../data/profile';

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

export const GET: APIRoute = async ({ site }) => {
  const posts = (await getCollection('insights', (p) => !p.data.draft)).sort((a, b) => +b.data.publishDate - +a.data.publishDate);
  const items = posts.map((p) => `    <item>
      <title>${esc(p.data.title)}</title>
      <link>${new URL(`/insights/${p.id}/`, site).href}</link>
      <guid isPermaLink="true">${new URL(`/insights/${p.id}/`, site).href}</guid>
      <description>${esc(p.data.description)}</description>
      <pubDate>${p.data.publishDate.toUTCString()}</pubDate>
    </item>`).join('\n');
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>${esc(`Insights by ${profile.name}`)}</title>
    <link>${new URL('/insights/', site).href}</link>
    <description>Practical articles on technical SEO, AEO, GEO and automation.</description>
    <language>en-us</language>
${items}
  </channel>
</rss>
`;
  return new Response(xml, { headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' } });
};
