// JSON-LD builders. Only facts that are visible on the site go in here.
import { profile } from './profile';

const abs = (site: URL, path: string) => new URL(path, site).href;

export const personId = (site: URL) => abs(site, '/about/') + '#person';
export const websiteId = (site: URL) => abs(site, '/') + '#website';

export function personSchema(site: URL) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': personId(site),
    name: profile.name,
    givenName: profile.firstName,
    jobTitle: 'Technical SEO Specialist',
    description: `${profile.role} working remotely with ${profile.market}.`,
    url: abs(site, '/about/'),
    address: { '@type': 'PostalAddress', addressCountry: 'PH' },
    knowsAbout: [...profile.knowsAbout],
    sameAs: [profile.linkedin],
  };
}

export function websiteSchema(site: URL) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': websiteId(site),
    url: abs(site, '/'),
    name: `${profile.name}: ${profile.shortRole}`,
    inLanguage: 'en-US',
    publisher: { '@id': personId(site) },
  };
}

export function breadcrumbSchema(site: URL, trail: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((t, i) => ({ '@type': 'ListItem', position: i + 1, name: t.name, item: abs(site, t.path) })),
  };
}

export function serviceSchema(site: URL, s: { name: string; description: string; slug: string }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: s.name,
    description: s.description,
    serviceType: s.name,
    url: abs(site, `/services/${s.slug}/`),
    provider: { '@id': personId(site) },
    areaServed: { '@type': 'Country', name: 'United States' },
  };
}

export function articleSchema(site: URL, a: { title: string; description: string; slug: string; published: Date; modified?: Date }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: a.title,
    description: a.description,
    datePublished: a.published.toISOString(),
    dateModified: (a.modified ?? a.published).toISOString(),
    mainEntityOfPage: abs(site, `/insights/${a.slug}/`),
    url: abs(site, `/insights/${a.slug}/`),
    inLanguage: 'en-US',
    image: abs(site, '/og/default.png'),
    author: { '@type': 'Person', '@id': personId(site), name: profile.name, url: abs(site, '/about/') },
    publisher: { '@id': personId(site) },
  };
}
