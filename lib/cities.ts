// lastModified: each page's last real git commit date as of 2026-11-08.
// See lib/routes.ts for why this isn't `new Date()`. Bump a city's date only
// when that city's page is rewritten with real local content (plan Phase 9).
export const cities = [
  { slug: "bangalore", name: "Bangalore", lastModified: "2026-11-02T17:16:19+05:30" },
  { slug: "mumbai", name: "Mumbai", lastModified: "2026-11-02T17:16:19+05:30" },
  { slug: "delhi", name: "Delhi", lastModified: "2026-11-02T17:16:19+05:30" },
  { slug: "noida", name: "Noida", lastModified: "2026-11-02T17:16:19+05:30" },
  { slug: "gurgaon", name: "Gurgaon", lastModified: "2026-11-02T17:16:19+05:30" },
  { slug: "chennai", name: "Chennai", lastModified: "2026-11-02T17:16:19+05:30" },
  { slug: "hyderabad", name: "Hyderabad", lastModified: "2026-11-02T17:16:19+05:30" },
  { slug: "pune", name: "Pune", lastModified: "2026-11-02T17:16:19+05:30" },
  { slug: "kolkata", name: "Kolkata", lastModified: "2026-11-02T17:16:19+05:30" },
  { slug: "ahmedabad", name: "Ahmedabad", lastModified: "2026-11-02T17:16:19+05:30" },
  { slug: "jaipur", name: "Jaipur", lastModified: "2026-11-02T17:16:19+05:30" },
  { slug: "surat", name: "Surat", lastModified: "2026-11-02T17:16:19+05:30" },
  { slug: "lucknow", name: "Lucknow", lastModified: "2026-11-02T17:16:19+05:30" },
] as const;

export type City = (typeof cities)[number];
