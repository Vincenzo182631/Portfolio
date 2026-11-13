// Cloudflare Pages Function: POST /api/contact
// Receives the contact form (multipart FormData from the site's form), validates it on the server,
// applies basic spam protection and sends one email through Resend.
//
// Required secrets (Cloudflare Pages > Settings > Variables and Secrets):
//   RESEND_API_KEY   API key from resend.com
//   CONTACT_TO       the inbox that receives inquiries
//   CONTACT_FROM     a sender on a domain verified in Resend, e.g. "Portfolio <hello@your-domain.com>"
// Optional:
//   TURNSTILE_SECRET_KEY   enables Cloudflare Turnstile verification (pair with PUBLIC_TURNSTILE_SITE_KEY at build time)
//
// Without the three required secrets the function answers 503, the form shows its failure line and the
// visitor is pointed to email. It never reports success for a message that was not handed to Resend.

interface Env {
  RESEND_API_KEY?: string;
  CONTACT_TO?: string;
  CONTACT_FROM?: string;
  TURNSTILE_SECRET_KEY?: string;
}
interface PagesContext { request: Request; env: Env }

const SERVICES = ['Technical SEO / AEO / GEO', 'Website development', 'GoHighLevel', 'Workflow automation', 'AI integration', 'Not sure / Other'];
const LIMIT = 5; // submissions per IP per window
const WINDOW_SECONDS = 600;

const json = (status: number, body: Record<string, unknown>) =>
  new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' } });

const clean = (v: FormDataEntryValue | null, max: number) => (typeof v === 'string' ? v.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, '').trim().slice(0, max) : '');
const oneLine = (s: string) => s.replace(/[\r\n]+/g, ' ');
const escapeHtml = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');

// Best-effort rate limit using the edge cache of the data centre that serves the request.
// It needs no KV or database. For a strict limit, add a Cloudflare rate limiting rule on /api/contact.
async function rateLimited(ip: string, origin: string): Promise<boolean> {
  try {
    const cache = (globalThis as unknown as { caches: { default: Cache } }).caches.default;
    const key = new Request(`${origin}/__rate/contact/${encodeURIComponent(ip)}`);
    const hit = await cache.match(key);
    const count = hit ? Number(await hit.text()) || 0 : 0;
    if (count >= LIMIT) return true;
    await cache.put(key, new Response(String(count + 1), { headers: { 'Cache-Control': `max-age=${WINDOW_SECONDS}` } }));
  } catch { /* the limit is best effort: never block a real message because the cache failed */ }
  return false;
}

async function turnstileOk(secret: string, token: string, ip: string): Promise<boolean> {
  const body = new URLSearchParams({ secret, response: token, remoteip: ip });
  const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', { method: 'POST', body });
  if (!res.ok) return false;
  const data = (await res.json()) as { success?: boolean };
  return data.success === true;
}

export async function onRequestPost({ request, env }: PagesContext): Promise<Response> {
  const url = new URL(request.url);
  const origin = request.headers.get('Origin');
  if (origin && origin !== url.origin) return json(403, { ok: false, error: 'Cross-site requests are not accepted.' });

  let form: FormData;
  try { form = await request.formData(); } catch { return json(400, { ok: false, error: 'The form could not be read.' }); }

  // Honeypot: real visitors never see or fill this field. Answer 200 so bots learn nothing.
  if (clean(form.get('website'), 200)) return json(200, { ok: true });

  const name = oneLine(clean(form.get('name'), 120));
  const email = oneLine(clean(form.get('email'), 200));
  const company = oneLine(clean(form.get('company'), 200));
  const service = oneLine(clean(form.get('service'), 80));
  const budget = oneLine(clean(form.get('budget'), 80));
  const message = clean(form.get('message'), 5000);

  const errors: Record<string, string> = {};
  if (name.length < 2) errors.name = 'Write your name.';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) errors.email = 'Write a valid email address.';
  if (!SERVICES.includes(service)) errors.service = 'Choose a service.';
  if (message.length < 20) errors.message = 'Describe the project in at least 20 characters.';
  if (Object.keys(errors).length) return json(422, { ok: false, errors });

  const ip = request.headers.get('CF-Connecting-IP') || 'unknown';
  if (await rateLimited(ip, url.origin)) return json(429, { ok: false, error: 'Too many messages. Please email instead.' });

  if (env.TURNSTILE_SECRET_KEY) {
    const token = clean(form.get('cf-turnstile-response'), 4096);
    if (!token || !(await turnstileOk(env.TURNSTILE_SECRET_KEY, token, ip))) return json(403, { ok: false, error: 'The spam check failed. Please try again.' });
  }

  if (!env.RESEND_API_KEY || !env.CONTACT_TO || !env.CONTACT_FROM) {
    return json(503, { ok: false, error: 'Email delivery is not configured.' });
  }

  const rows: [string, string][] = [['Name', name], ['Email', email], ['Company or website', company || '-'], ['Service', service], ['Budget', budget || '-']];
  const text = `${rows.map(([k, v]) => `${k}: ${v}`).join('\n')}\n\n${message}\n`;
  const html = `<table>${rows.map(([k, v]) => `<tr><td><strong>${escapeHtml(k)}</strong></td><td>${escapeHtml(v)}</td></tr>`).join('')}</table><p style="white-space:pre-wrap">${escapeHtml(message)}</p>`;

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ from: env.CONTACT_FROM, to: [env.CONTACT_TO], reply_to: email, subject: `Portfolio inquiry: ${service} (${name})`, text, html }),
  });
  if (!res.ok) return json(502, { ok: false, error: 'The message could not be delivered.' });
  return json(200, { ok: true });
}

export async function onRequest({ request }: PagesContext): Promise<Response> {
  if (request.method === 'POST') return json(405, { ok: false });
  return new Response('Method not allowed', { status: 405, headers: { Allow: 'POST' } });
}
