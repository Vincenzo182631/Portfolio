export const mainNav = [
  { label: 'Services', href: '/services/' },
  { label: 'Work', href: '/work/' },
  { label: 'About', href: '/about/' },
  { label: 'Insights', href: '/insights/' },
] as const;

export const serviceNav = [
  { label: 'Technical SEO, AEO and GEO', href: '/services/technical-seo/', line: 'Audits, structured data, fixes in code' },
  { label: 'Website development', href: '/services/website-development/', line: 'Fast, search-ready sites on Cloudflare' },
  { label: 'Workflow automation', href: '/services/automation/', line: 'Webhooks, n8n, APIs, lead routing' },
  { label: 'GoHighLevel', href: '/services/gohighlevel/', line: 'CRM, pipelines, nurture workflows' },
] as const;
