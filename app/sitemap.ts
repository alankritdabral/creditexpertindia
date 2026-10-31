import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/config";

// Public, indexable pages only. Staff areas (/admin, /team), /api and the /whatsapp redirect stay out.
const routes: { path: string; priority: number }[] = [
  { path: "", priority: 1 },
  { path: "/debt-consolidation", priority: 0.9 },
  { path: "/personal-loan", priority: 0.9 },
  { path: "/credit-card-debt", priority: 0.8 },
  { path: "/loan-balance-transfer", priority: 0.8 },
  { path: "/app-loan", priority: 0.8 },
  { path: "/high-interest-loan", priority: 0.8 },
  { path: "/calculators/debt-consolidation-calculator", priority: 0.8 },
  { path: "/eligibility", priority: 0.7 },
  { path: "/how-it-works", priority: 0.7 },
  { path: "/faq", priority: 0.7 },
  { path: "/about", priority: 0.6 },
  { path: "/contact", priority: 0.6 },
  { path: "/partner-disclosures", priority: 0.3 },
  { path: "/privacy-policy", priority: 0.3 },
  { path: "/terms-and-conditions", priority: 0.3 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return routes.map((r) => ({ url: `${siteConfig.url}${r.path}`, lastModified, priority: r.priority }));
}
