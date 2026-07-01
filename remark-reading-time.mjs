import getReadingTime from 'reading-time';
import { toString } from 'mdast-util-to-string';

// Injects `minutesRead` (e.g. "5 min read") into each article's frontmatter
// at build time — zero runtime JS. Read it via `render()`'s
// `remarkPluginFrontmatter`.
export function remarkReadingTime() {
  return function (tree, { data }) {
    const textOnPage = toString(tree);
    const readingTime = getReadingTime(textOnPage);
    data.astro.frontmatter.minutesRead = readingTime.text;
  };
}
