import { Metadata } from "next";
import { CityLoanPage } from "@/components/CityLoanPage";
import { cities } from "@/lib/cities";

export const metadata: Metadata = {
  title: "Personal Loan for Salaried Employees in Chennai",
  description: "Check personal loan and EMI consolidation options for salaried professionals in Chennai. Rates from 9.95% p.a.* for eligible applicants. Free assessment.",
  alternates: { canonical: "/personal-loan-in-chennai" },
};

export default function Page() {
  return <CityLoanPage city={cities.find((c) => c.slug === "chennai")!} />;
}
