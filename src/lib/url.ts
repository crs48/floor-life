// The one place base-path logic lives. GitHub Pages serves this project
// from `/floor-life`, so every internal link and manual asset src must be
// prefixed. `<Image>` and imported assets handle the base automatically;
// hand-written hrefs do not — always route them through `href()`.

const BASE = import.meta.env.BASE_URL.replace(/\/$/, '');

/** Prefix an internal path with the configured base path. */
export function href(path = '/'): string {
  if (/^(https?:)?\/\//.test(path) || path.startsWith('#') || path.startsWith('mailto:')) {
    return path;
  }
  const p = path.startsWith('/') ? path : `/${path}`;
  return `${BASE}${p}` || '/';
}

/** True when `current` matches `path` (with or without the base prefix). */
export function isActive(current: string, path: string): boolean {
  const norm = (s: string) => {
    const withoutBase = BASE && s.startsWith(BASE) ? s.slice(BASE.length) : s;
    const trimmed = withoutBase.replace(/\/+$/, '');
    return trimmed === '' ? '/' : trimmed;
  };
  const c = norm(current);
  const target = norm(path);
  if (target === '/') return c === '/';
  return c === target || c.startsWith(`${target}/`);
}
