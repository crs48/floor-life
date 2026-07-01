import { defineCollection, z } from 'astro:content';
import { glob, file } from 'astro/loaders';

// Long-form writing: Markdown/MDX in src/content/journal.
const journal = defineCollection({
  loader: glob({ base: './src/content/journal', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    category: z.enum(['science', 'guide', 'gear', 'story']).default('guide'),
    tags: z.array(z.string()).default([]),
    readingMinutes: z.number().optional(),
    draft: z.boolean().default(false),
    featured: z.boolean().default(false),
  }),
});

// Floor-sitting positions: typed data rendered into a gallery + detail pages.
const positions = defineCollection({
  loader: file('./src/data/positions.json'),
  schema: z.object({
    name: z.string(),
    otherName: z.string().optional(),
    order: z.number(),
    difficulty: z.enum(['gentle', 'moderate', 'advanced']),
    summary: z.string(),
    demands: z.array(z.string()),
    cues: z.array(z.string()),
    cautions: z.array(z.string()),
    goodFor: z.array(z.string()),
    props: z.array(z.string()).default([]),
  }),
});

// Gear: typed product data for cards + comparison tables.
const products = defineCollection({
  loader: file('./src/data/products.json'),
  schema: z.object({
    name: z.string(),
    brand: z.string(),
    category: z.enum([
      'seating',
      'desk-chair',
      'desk',
      'sleeping',
      'flooring',
      'props',
    ]),
    price: z.string(),
    priceNote: z.string().optional(),
    affiliateUrl: z.string(),
    retailer: z.string(),
    tier: z.enum(['budget', 'mid', 'premium']),
    rating: z.number().min(0).max(5).optional(),
    pros: z.array(z.string()),
    cons: z.array(z.string()),
    bestFor: z.string(),
    verdict: z.string(),
    featured: z.boolean().default(false),
  }),
});

export const collections = { journal, positions, products };
