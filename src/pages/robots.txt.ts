import type { APIRoute } from 'astro';

// Served at <base>/robots.txt. Note: for a GitHub Pages *project* site the
// canonical robots location is the domain root, which a project repo doesn't
// control — this still documents intent and points crawlers at the sitemap.
export const GET: APIRoute = ({ site }) => {
  const baseRaw = import.meta.env.BASE_URL;
  const home = new URL(baseRaw.endsWith('/') ? baseRaw : `${baseRaw}/`, site);
  const sitemapUrl = new URL('sitemap-index.xml', home).href;
  const body = `User-agent: *\nAllow: /\n\nSitemap: ${sitemapUrl}\n`;
  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
