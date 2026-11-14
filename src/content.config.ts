import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const serviceSlug = z.enum(['technical-seo', 'website-development', 'automation', 'gohighlevel']);

const insights = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/insights' }),
  schema: z.object({
    title: z.string(),
    description: z.string().max(170),
    excerpt: z.string(),
    category: z.enum(['Technical SEO', 'AEO & GEO', 'Automation']),
    publishDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    draft: z.boolean().default(false),
    related: z.array(z.string()).default([]),
    relatedServices: z.array(serviceSlug).default([]),
  }),
});

const work = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/work' }),
  schema: z.object({
    title: z.string(),
    seoTitle: z.string().max(65),
    client: z.string(),
    industry: z.string(),
    status: z.enum(['Live site', 'In development', 'Client work', 'Prototype']),
    url: z.string().url().optional(),
    description: z.string().max(170),
    summary: z.string(),
    order: z.number(),
    tags: z.array(z.string()),
    contribution: z.array(z.string()),
    tools: z.array(z.string()),
    services: z.array(serviceSlug),
    flow: z.array(z.string()).min(3).max(4),
  }),
});

export const collections = { insights, work };
