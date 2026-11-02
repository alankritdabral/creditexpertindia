export const cities = [
  { slug: "bangalore", name: "Bangalore" },
  { slug: "mumbai", name: "Mumbai" },
  { slug: "delhi", name: "Delhi" },
  { slug: "noida", name: "Noida" },
  { slug: "gurgaon", name: "Gurgaon" },
  { slug: "chennai", name: "Chennai" },
  { slug: "hyderabad", name: "Hyderabad" },
  { slug: "pune", name: "Pune" },
  { slug: "kolkata", name: "Kolkata" },
  { slug: "ahmedabad", name: "Ahmedabad" },
  { slug: "jaipur", name: "Jaipur" },
  { slug: "surat", name: "Surat" },
  { slug: "lucknow", name: "Lucknow" },
] as const;

export type City = (typeof cities)[number];
