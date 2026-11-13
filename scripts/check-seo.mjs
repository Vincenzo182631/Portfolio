// Checks the head of every built page: title, description, canonical, robots, Open Graph, X card,
// one h1, heading order, image alt text and JSON-LD that parses. Also checks robots.txt and the sitemap.
// Run after `npm run build`: node scripts/check-seo.mjs
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join, relative } from 'node:path';

const root = new URL('../dist/', import.meta.url).pathname;
const walk = (d) => readdirSync(d).flatMap((f) => { const p = join(d, f); return statSync(p).isDirectory() ? walk(p) : [p]; });
const pages = walk(root).filter((f) => f.endsWith('.html'));
const meta = (html, attr, name) => (html.match(new RegExp(`<meta ${attr}="${name}" content="([^"]*)"`)) || [])[1];
let problems = 0; const fail = (route, msg) => { console.log(`FAIL  ${route}  ${msg}`); problems++; };
const titles = new Map(), descriptions = new Map(); const types = {};

for (const file of pages) {
  const html = readFileSync(file, 'utf8');
  const route = '/' + relative(root, file).replace(/index\.html$/, '');
  const title = (html.match(/<title>([^<]*)<\/title>/) || [])[1];
  const desc = meta(html, 'name', 'description');
  const canonical = (html.match(/<link rel="canonical" href="([^"]*)"/) || [])[1];
  if (!title) fail(route, 'no <title>'); else { if (title.length > 65) fail(route, `title is ${title.length} characters (keep to 65)`); if (titles.has(title)) fail(route, `title repeats ${titles.get(title)}`); titles.set(title, route); }
  if (!desc) fail(route, 'no meta description'); else { if (desc.length < 70 || desc.length > 160) fail(route, `description is ${desc.length} characters (70 to 160)`); if (descriptions.has(desc)) fail(route, `description repeats ${descriptions.get(desc)}`); descriptions.set(desc, route); }
  if (!canonical) fail(route, 'no canonical'); else if (route !== '/404.html' && !canonical.endsWith(route)) fail(route, `canonical ${canonical} does not match the route`);
  if (!meta(html, 'name', 'robots')) fail(route, 'no robots meta');
  for (const p of ['og:title', 'og:description', 'og:image', 'og:url', 'og:type']) if (!meta(html, 'property', p)) fail(route, `no ${p}`);
  for (const n of ['twitter:card', 'twitter:title', 'twitter:image']) if (!meta(html, 'name', n)) fail(route, `no ${n}`);
  if (!/<html lang="en"/.test(html)) fail(route, 'no lang="en" on <html>');
  const body = html.replace(/<template[\s\S]*?<\/template>/g, '');
  const h1 = (body.match(/<h1[\s>]/g) || []).length; if (h1 !== 1) fail(route, `${h1} h1 elements`);
  const main = (body.match(/<main[\s\S]*<\/main>/) || [''])[0];
  let last = 0; for (const m of main.matchAll(/<h([1-6])[\s>]/g)) { const l = +m[1]; if (last && l > last + 1) { fail(route, `heading jumps from h${last} to h${l}`); break; } last = l; }
  for (const m of body.matchAll(/<img\b[^>]*>/g)) if (!/\salt="/.test(m[0])) fail(route, `image without alt: ${m[0].slice(0, 80)}`);
  for (const m of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    try { const d = JSON.parse(m[1]); const t = d['@type']; types[t] = (types[t] || 0) + 1; if (d['@context'] !== 'https://schema.org') fail(route, `JSON-LD ${t} has no schema.org context`); }
    catch { fail(route, 'JSON-LD does not parse'); }
  }
}
const robots = existsSync(join(root, 'robots.txt')) ? readFileSync(join(root, 'robots.txt'), 'utf8') : '';
if (!robots) fail('/robots.txt', 'missing');
const sitemap = existsSync(join(root, 'sitemap-0.xml')) ? readFileSync(join(root, 'sitemap-0.xml'), 'utf8') : '';
const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
if (!urls.length) fail('/sitemap-0.xml', 'no URLs');
if (urls.some((u) => u.includes('404'))) fail('/sitemap-0.xml', 'lists the 404 page');
console.log(`${pages.length} pages, ${urls.length} sitemap URLs, JSON-LD: ${Object.entries(types).map(([k, v]) => `${k} x${v}`).join(', ')}`);
console.log(`robots.txt: ${robots.trim().split('\n').join(' | ')}`);
console.log(problems ? `${problems} problems` : 'all SEO checks passed');
process.exit(problems ? 1 : 0);
