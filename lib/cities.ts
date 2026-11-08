// lastModified: each page's last real git commit date as of 2026-11-08.
// See lib/routes.ts for why this isn't `new Date()`. Bump a city's date only
// when that city's page is rewritten with real local content (plan Phase 9).
//
// noindex (plan decision D5): all 13 city pages share one template with only
// the city name swapped — the exact pattern Google's spam policies name as
// an example of doorway/scaled-content abuse. Ideally the ones with real
// Search Console impressions would be rewritten first and the rest noindexed
// meanwhile, but this site has no Search Console history yet (Phase 1 just
// set it up). Delhi is the only one of these 13 that matches a real office
// (lib/config.ts's contact.addresses also lists Dehradun and Rudrapur, but
// neither has a city page at all) and stays indexed; the other 12 are
// noindexed until they have real local content, not just a city-name swap.
export const cities = [
  { slug: "bangalore", name: "Bangalore", lastModified: "2026-11-02T17:16:19+05:30", noindex: true },
  { slug: "mumbai", name: "Mumbai", lastModified: "2026-11-02T17:16:19+05:30", noindex: true },
  { slug: "delhi", name: "Delhi", lastModified: "2026-11-02T17:16:19+05:30", noindex: false },
  { slug: "noida", name: "Noida", lastModified: "2026-11-02T17:16:19+05:30", noindex: true },
  { slug: "gurgaon", name: "Gurgaon", lastModified: "2026-11-02T17:16:19+05:30", noindex: true },
  { slug: "chennai", name: "Chennai", lastModified: "2026-11-02T17:16:19+05:30", noindex: true },
  { slug: "hyderabad", name: "Hyderabad", lastModified: "2026-11-02T17:16:19+05:30", noindex: true },
  { slug: "pune", name: "Pune", lastModified: "2026-11-02T17:16:19+05:30", noindex: true },
  { slug: "kolkata", name: "Kolkata", lastModified: "2026-11-02T17:16:19+05:30", noindex: true },
  { slug: "ahmedabad", name: "Ahmedabad", lastModified: "2026-11-02T17:16:19+05:30", noindex: true },
  { slug: "jaipur", name: "Jaipur", lastModified: "2026-11-02T17:16:19+05:30", noindex: true },
  { slug: "surat", name: "Surat", lastModified: "2026-11-02T17:16:19+05:30", noindex: true },
  { slug: "lucknow", name: "Lucknow", lastModified: "2026-11-02T17:16:19+05:30", noindex: true },
] as const;

export type City = (typeof cities)[number];
