// Renders public/og/default.png (1200x630), the share image, from HTML with the site's own fonts and colours.
// Run when the name or positioning changes: node scripts/make-og.mjs
// Needs Playwright (npm i -D playwright, or a global install) and network access for the fonts.
import { createRequire } from 'node:module';
const { chromium } = createRequire(import.meta.url)('playwright');
const html = `<!doctype html><html><head><meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=Literata:opsz,wght@7..72,400&family=Figtree:wght@400;500&display=swap" rel="stylesheet">
<style>*{box-sizing:border-box;margin:0}body{width:1200px;height:630px;background:#e8e8e3;color:#181715;font-family:Figtree,sans-serif;padding:72px 80px;display:flex;flex-direction:column;justify-content:space-between}
.top{display:flex;align-items:center;gap:14px;font:400 30px Literata,serif}.m{width:36px;height:36px;border-radius:8px;background:#bfb21a;display:grid;place-items:center;font:500 20px Literata,serif}
h1{font:400 84px/1.02 Literata,serif;letter-spacing:-0.026em;max-width:980px}.b{display:flex;justify-content:space-between;font:500 24px Figtree,sans-serif;color:#5c5b56}</style></head>
<body><div class="top"><span class="m">V</span>Vincent Lancin</div><h1>Technical SEO, fast websites and automation</h1>
<div class="b"><span>SEO / AEO / GEO / Web development / GoHighLevel</span><span>Philippines, working with US businesses</span></div></body></html>`;
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
await page.setContent(html, { waitUntil: 'networkidle' });
await page.evaluate(() => document.fonts.ready);
await page.screenshot({ path: new URL('../public/og/default.png', import.meta.url).pathname });
await browser.close();
console.log('wrote public/og/default.png');
