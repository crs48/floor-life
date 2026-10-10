// Site-wide constants: identity, navigation, social. Single source of truth
// so the header, footer, SEO tags, sitemap and feeds stay in agreement.

export const site = {
  name: 'Floor Life',
  tagline: 'The art & science of living closer to the ground.',
  description: 'A warm, playful field guide to floor living: comfortable positions, supported get-ups, welcoming rooms, and the research with its limits left in.',
  author: 'Floor Life',
  email: 'hello@floor.life',
  locale: 'en',
} as const;

export type NavItem = { label: string; href: string; blurb?: string };

export const nav: NavItem[] = [
  { label: 'Why', href: '/why', blurb: 'The evidence, told honestly' },
  { label: 'Start', href: '/start', blurb: 'Positions & building the habit' },
  { label: 'Spaces', href: '/spaces', blurb: 'Make one inviting corner' },
  { label: 'Gear', href: '/gear', blurb: 'Useful objects, optional purchases' },
  { label: 'Journal', href: '/journal', blurb: 'Long-form reading' },
  { label: 'Resources', href: '/resources', blurb: 'A map of the floor-living web' },
];

export const footerNav: NavItem[] = [
  ...nav,
  { label: 'About', href: '/about' },
  { label: 'Disclosure', href: '/disclosure' },
];
