import { Metadata } from "next";
import { CityLoanPage } from "@/components/CityLoanPage";
import { cities } from "@/lib/cities";

export const metadata: Metadata = {
  title: "Personal Loan for Salaried Employees in Ahmedabad",
  description: "Check personal loan and EMI consolidation options for salaried professionals in Ahmedabad. Rates from 9.95% p.a.* for eligible applicants. Free assessment.",
  alternates: { canonical: "/personal-loan-in-ahmedabad" },
};

export default function Page() {
  return <CityLoanPage city={cities.find((c) => c.slug === "ahmedabad")!} />;
}
