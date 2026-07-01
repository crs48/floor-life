// Site-wide constants: identity, navigation, social. Single source of truth
// so the header, footer, SEO tags, sitemap and feeds stay in agreement.

export const site = {
  name: 'Floor Life',
  tagline: 'The art & science of living closer to the ground.',
  description:
    'Floor Life is a calm, honest guide to floor living — the mobility and ' +
    'longevity case for spending more of your day at floor level, how to ' +
    'build the habit, how to make a Western home floor-friendly, and the ' +
    'gear worth owning.',
  author: 'Floor Life',
  email: 'hello@floor.life',
  locale: 'en',
} as const;

export type NavItem = { label: string; href: string; blurb?: string };

export const nav: NavItem[] = [
  { label: 'Why', href: '/why', blurb: 'The evidence, told honestly' },
  { label: 'Start', href: '/start', blurb: 'Positions & building the habit' },
  { label: 'Spaces', href: '/spaces', blurb: 'Architect & retrofit your rooms' },
  { label: 'Gear', href: '/gear', blurb: 'Compared, curated, disclosed' },
  { label: 'Journal', href: '/journal', blurb: 'Long-form reading' },
];

export const footerNav: NavItem[] = [
  ...nav,
  { label: 'About', href: '/about' },
  { label: 'Disclosure', href: '/disclosure' },
];
