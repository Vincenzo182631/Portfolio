// Checks every internal link and asset reference in dist/ and reports pages nothing links to.
// Run after `npm run build`: node scripts/check-links.mjs
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join, relative } from 'node:path';

const root = new URL('../dist/', import.meta.url).pathname;
const walk = (d) => readdirSync(d).flatMap((f) => { const p = join(d, f); return statSync(p).isDirectory() ? walk(p) : [p]; });
const pages = walk(root).filter((f) => f.endsWith('.html'));
const routeOf = (f) => '/' + relative(root, f).replace(/index\.html$/, '').replace(/\\/g, '/');
const exists = (path) => {
  const clean = decodeURI(path.split('#')[0].split('?')[0]);
  const p = join(root, clean);
  return existsSync(p) && (statSync(p).isFile() || existsSync(join(p, 'index.html')));
};

let broken = 0; const inbound = new Map(pages.map((f) => [routeOf(f), 0]));
for (const file of pages) {
  const html = readFileSync(file, 'utf8');
  const from = routeOf(file);
  const ids = new Set([...html.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]));
  for (const m of html.matchAll(/\s(?:href|src)="([^"]+)"/g)) {
    const url = m[1];
    if (/^(https?:|mailto:|tel:|data:)/.test(url)) continue;
    if (url.startsWith('#')) { if (url.length > 1 && !ids.has(url.slice(1))) { console.log(`MISSING ANCHOR  ${from} -> ${url}`); broken++; } continue; }
    if (!url.startsWith('/')) { console.log(`RELATIVE URL    ${from} -> ${url}`); broken++; continue; }
    if (!exists(url)) { console.log(`BROKEN          ${from} -> ${url}`); broken++; continue; }
    const target = url.split('#')[0].split('?')[0];
    if (inbound.has(target) && target !== from) inbound.set(target, inbound.get(target) + 1);
  }
}
const orphans = [...inbound].filter(([route, n]) => n === 0 && route !== '/' && route !== '/404.html');
for (const [route] of orphans) console.log(`ORPHAN          ${route} has no internal link pointing to it`);
console.log(`${pages.length} pages checked, ${broken} broken references, ${orphans.length} orphan pages`);
process.exit(broken || orphans.length ? 1 : 0);
