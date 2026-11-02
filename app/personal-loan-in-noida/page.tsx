import { Metadata } from "next";
import { CityLoanPage } from "@/components/CityLoanPage";
import { cities } from "@/lib/cities";

export const metadata: Metadata = {
  title: "Personal Loan for Salaried Employees in Noida",
  description: "Check personal loan and EMI consolidation options for salaried professionals in Noida. Rates from 9.95% p.a.* for eligible applicants. Free assessment.",
  alternates: { canonical: "/personal-loan-in-noida" },
};

export default function Page() {
  return <CityLoanPage city={cities.find((c) => c.slug === "noida")!} />;
}
