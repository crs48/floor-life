// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import pagefind from 'astro-pagefind';
import { remarkReadingTime } from './remark-reading-time.mjs';

// GitHub Pages project site: https://crs48.github.io/floor-life/
// To move to a custom domain (e.g. floor.life) later: set `site` to the
// domain, delete `base`, and add `public/CNAME` — see README.
export default defineConfig({
  site: 'https://crs48.github.io',
  base: '/floor-life',
  trailingSlash: 'ignore',
  integrations: [mdx(), sitemap(), pagefind()],
  markdown: {
    remarkPlugins: [remarkReadingTime],
  },
  vite: {
    // Cast to any: Astro bundles its own copy of Vite, whose `Plugin` type
    // differs from the top-level one at the type level only — runtime is fine.
    plugins: /** @type {any} */ ([tailwindcss()]),
  },
});
