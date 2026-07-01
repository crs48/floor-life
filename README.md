# Floor Life

**The art & science of living closer to the ground.**

A calm, evidence-honest editorial site about *floor living* — organising a
Western home around the floor instead of around chairs. It makes the case
(honestly), shows how to start, helps retrofit real rooms, and compares the
gear. Built with [Astro](https://astro.build) + [Tailwind CSS v4](https://tailwindcss.com),
deployed as a static site to GitHub Pages.

## Stack

- **Astro 5** — content-first, near-zero JS, static output.
- **Tailwind CSS v4** via the `@tailwindcss/vite` plugin (design tokens live in
  CSS with `@theme`; no `tailwind.config.js`).
- **Content Collections** — Markdown/MDX `journal`, plus typed JSON data for
  `positions` and `products` (Zod-validated).
- **@astrojs/sitemap**, **@astrojs/rss**, **@tailwindcss/typography**, **sharp**.
- Fonts: Fraunces (display) + Nunito Sans (body) via Fontsource.

## Develop

```bash
npm install
npm run dev        # http://localhost:4321/floor-life
npm run build      # static output → dist/
npm run preview    # serve the built site locally
npm run check      # astro type-check
```

Requires Node 22+ (see `.nvmrc`).

## Project shape

```
src/
  components/      UI: cards, callouts, the Sitting–Rising Test, chrome
  content/journal/ long-form articles (Markdown)
  data/            positions.json, products.json (typed collections)
  layouts/         BaseLayout.astro
  lib/             url.ts (base-path helper), site.ts (nav/identity)
  pages/           routes: /, /why, /start, /spaces, /gear, /journal, …
  styles/global.css  design system (@theme tokens, prose)
```

## Content

- **Journal:** add a `.md`/`.mdx` file under `src/content/journal/` with the
  frontmatter fields in `src/content.config.ts` (`title`, `description`,
  `pubDate`, `category`, …).
- **Positions:** edit `src/data/positions.json`.
- **Products / gear:** edit `src/data/products.json`. Every buy link renders
  through `AffiliateLink.astro`, which always emits `rel="sponsored nofollow"`;
  keep the FTC disclosure visible above the links (see `/disclosure`).

## Deploy (GitHub Pages)

Pushes to `main` trigger `.github/workflows/deploy.yml` (`withastro/action` →
`actions/deploy-pages`). One-time setup: **Settings → Pages → Source: GitHub
Actions**.

The site is configured for the **project page** at
`https://crs48.github.io/floor-life/`:

```js
// astro.config.mjs
site: 'https://crs48.github.io',
base: '/floor-life',
```

Every internal link goes through `href()` in `src/lib/url.ts` so the base path
is applied consistently — don't hardcode leading-slash paths in markup.

### Moving to a custom domain (e.g. `floor.life`)

1. Set `site: 'https://floor.life'` and **remove** `base` in `astro.config.mjs`.
2. Add `public/CNAME` containing `floor.life`.
3. Point DNS at GitHub Pages and set the custom domain in repo settings.

`href()` then resolves to root-relative paths automatically — no markup changes
needed.

## A note on tone

Floor Life is deliberately honest about the evidence: strong claims carry their
caveats, and the myths that outrun the research (fascia "release", core
strengthening, posture cures) are named as such. Nothing here is medical advice.
