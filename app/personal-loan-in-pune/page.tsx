import { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { CityLoanPage } from "@/components/CityLoanPage";
import { cities } from "@/lib/cities";

export const metadata: Metadata = buildMetadata({
  title: "Personal Loan in Pune",
  description:
    "Personal loan and EMI consolidation options for salaried staff in Pune. Rates from 9.99% p.a.* for eligible applicants. Free assessment.",
  path: "/personal-loan-in-pune",
  noindex: true, // not yet rewritten with real local content -- plan decision D5
});

export default function Page() {
  return <CityLoanPage city={cities.find((c) => c.slug === "pune")!} />;
}
