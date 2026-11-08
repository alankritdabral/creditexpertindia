import { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { CityLoanPage } from "@/components/CityLoanPage";
import { cities } from "@/lib/cities";

export const metadata: Metadata = buildMetadata({
  title: "Personal Loan in Bangalore",
  description:
    "Personal loan and EMI consolidation options for salaried staff in Bangalore. Rates from 9.95% p.a.* for eligible applicants. Free assessment.",
  path: "/personal-loan-in-bangalore",
});

export default function Page() {
  return <CityLoanPage city={cities.find((c) => c.slug === "bangalore")!} />;
}
