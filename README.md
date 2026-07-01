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
  `positions`, `products`, and `resources` (Zod-validated).
- **@astrojs/sitemap**, **@astrojs/rss**, **@tailwindcss/typography**, **sharp**.
- **Pagefind** on-site search (`astro-pagefind`), **view transitions**
  (`<ClientRouter />`), and build-time **reading time** (`remark-reading-time`).
- Fonts: Fraunces (display) + Nunito Sans (body) via Fontsource.

### Delight features

- **Search** — a themed Pagefind modal in the header (⌘/index built at deploy).
- **Dark mode** — warm `[data-theme=dark]` token overrides with a no-flash
  toggle; the illustrations and prose adapt automatically.
- **View transitions** — smooth client navigation; all inline islands re-init on
  `astro:page-load` and the theme re-applies on `astro:after-swap`.
- **Resources hub** (`/resources`) — a curated map of the floor-living web.
- **Custom line-art** — a cohesive `PositionArt` set + a Sharp-optimised scene.
- **Article aids** — reading time, table of contents, related reading, cited
  sources, and "last reviewed" dates.
- **Printable cheat sheet** (`/cheatsheet`) via a site-wide print stylesheet.

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
- **Resources:** edit `src/data/resources.json` (curated external links, grouped
  by `kind`). `ExternalLink.astro` emits `rel="noopener"`.
- **Positions art:** the line-art figures live in `src/components/PositionArt.astro`,
  keyed by position slug and themed with CSS vars so they adapt to dark mode.

## Imagery

The site leads with **custom SVG line-art** (license-free, on-brand, and
deterministic to build). For **photography**, use the `astro:assets` pipeline:

- Put images in `src/assets/` and `import` them (never `public/` — imported
  assets are optimised by Sharp and get the `/floor-life` base path
  automatically; hardcoded `/public` paths 404 in production).
- Render through `Figure.astro` (caption + credit) — it emits an optimised,
  responsive `<Image>` with width/height set to prevent layout shift.
- **Licensing:** Unsplash / Pexels allow free commercial use with no
  attribution, but **do not clear model releases** — avoid recognisable faces
  tied to a health claim. Safest picks: object/interior shots (tatami, cushions,
  low tables, plants) and **public-domain ukiyo-e** interiors (The Met /
  Rijksmuseum, CC0), which are on-theme and genuinely differentiating.
- Credit convention: pass `credit` / `creditUrl` to `Figure`; a warm, unified
  colour grade across photos keeps the look bespoke rather than stock-y.

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
