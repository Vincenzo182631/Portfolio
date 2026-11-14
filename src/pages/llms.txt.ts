import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { profile } from '../data/profile';
import { services } from '../data/services';

// Optional and experimental: a plain-text map of the site for language models.
// It is not a ranking factor and nothing depends on it. Delete this file to remove /llms.txt.
export const GET: APIRoute = async ({ site }) => {
  const u = (p: string) => new URL(p, site).href;
  const work = (await getCollection('work')).sort((a, b) => a.data.order - b.data.order);
  const posts = (await getCollection('insights', (p) => !p.data.draft)).sort((a, b) => +b.data.publishDate - +a.data.publishDate);
  const body = `# ${profile.name}

> ${profile.role}, based in the ${profile.location}, working remotely with ${profile.market}.

## Services
${services.map((s) => `- [${s.name}](${u(`/services/${s.slug}/`)}): ${s.description}`).join('\n')}

## Work
${work.map((w) => `- [${w.data.client}](${u(`/work/${w.id}/`)}): ${w.data.summary}`).join('\n')}

## Insights
${posts.map((p) => `- [${p.data.title}](${u(`/insights/${p.id}/`)}): ${p.data.description}`).join('\n')}

## About and contact
- [About](${u('/about/')})
- [Contact](${u('/contact/')})
`;
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
