import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { site as siteMeta } from '../lib/site.ts';

export async function GET(context) {
  // context.site is the bare origin (no base path), so build a based home URL
  // and resolve every link against it — otherwise the /floor-life prefix drops.
  const baseRaw = import.meta.env.BASE_URL;
  const home = new URL(baseRaw.endsWith('/') ? baseRaw : `${baseRaw}/`, context.site);

  const posts = (await getCollection('journal', ({ data }) => !data.draft)).sort(
    (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf(),
  );

  return rss({
    title: `${siteMeta.name} — Journal`,
    description: siteMeta.description,
    site: home.href,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.pubDate,
      categories: post.data.tags,
      link: new URL(`journal/${post.id}/`, home).href,
    })),
    customData: `<language>en-us</language>`,
  });
}
