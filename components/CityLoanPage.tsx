import Link from "next/link";
import { ProductHero } from "@/components/ProductHero";
import { Eligibility } from "@/components/Eligibility";
import { LoanCalculator } from "@/components/LoanCalculator";
import { LeadForm } from "@/components/LeadForm";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { PageIntro, PageProof } from "@/components/page-sections/PageSections";
import { cities, type City } from "@/lib/cities";
import { contact } from "@/lib/config";
import { MapPin } from "lucide-react";

export function CityLoanPage({ city }: { city: City }) {
  const others = cities.filter((c) => c.slug !== city.slug && !c.noindex);
  // Only Delhi currently matches a real office (lib/config.ts's
  // contact.addresses) — the other 12 city pages share one generic
  // template with no local office to show, which is exactly why they're
  // noindexed (lib/cities.ts) until they have real local content.
  const office = contact.addresses.find((a) => a.city === city.name);
  return (
    <div className="min-h-screen bg-white">
      <Breadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: "Personal Loans by City", path: "/personal-loan" },
          { name: city.name },
        ]}
      />
      <ProductHero
        title={`Salaried in ${city.name}? Let's find you a better loan.`}
        body={`Whether you want a fresh personal loan or to bring several EMIs into one, we'll check your options with partner banks. Rates start from 9.99% p.a.* for eligible salaried applicants.`}
        cta="Check my eligibility"
        image="/img/marraige.webp"
        imageAlt={`A salaried professional in ${city.name} reviewing loan options`}
        points={["Free to check, from anywhere in " + city.name, "Made for salaried professionals", "You decide whether to go ahead"]}
      />

      <PageIntro page="city" />

      <section className="bg-white text-[#0A2540]">
        <div className="max-w-[1220px] mx-auto px-4 md:px-6 lg:px-8 py-16 md:py-24 grid gap-12 lg:grid-cols-[5fr_7fr] lg:gap-20">
          <h2 className="text-[40px] sm:text-[56px] leading-[1.02] tracking-[-0.04em] font-bold">
            What we can help you with in {city.name}.
          </h2>
          <div>
            {[
              { t: "A fresh personal loan", d: "Explore options based on your income, employer category and credit profile." },
              { t: "One EMI instead of many", d: "Combine personal loans, card dues and app loans if it genuinely lowers your cost." },
              { t: "A cheaper rate on a loan you already have", d: "See whether moving your balance to a partner bank would save you money." },
            ].map((i, n) => (
              <div key={i.t} className={`px-5 md:px-7 py-7 ${n % 2 === 0 ? "bg-[#EAF3FF]" : ""}`}>
                <h3 className="text-2xl md:text-[32px] leading-tight tracking-[-0.02em] font-bold">{i.t}</h3>
                <p className="mt-2 text-lg text-[#3C4F69] leading-relaxed max-w-lg">{i.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {office && (
        <section className="bg-white text-[#0A2540] border-t border-[#E2E8F0]">
          <div className="max-w-[1220px] mx-auto px-4 md:px-6 lg:px-8 py-14 md:py-20">
            <h2 className="text-[32px] md:text-[40px] leading-[1.05] tracking-[-0.03em] font-bold">
              Visit us in {city.name}.
            </h2>
            <div className="mt-6 flex items-start gap-3 max-w-2xl">
              <MapPin className="h-6 w-6 shrink-0 text-[#0052CC] mt-0.5" />
              <p className="text-lg text-[#3C4F69] leading-relaxed">{office.fullAddress}</p>
            </div>
          </div>
        </section>
      )}

      <Eligibility />
      <LoanCalculator />
      <PageProof page="city" />
      <LeadForm />

      {others.length > 0 && (
        <section className="bg-[#EAF3FF] text-[#0A2540]">
          <div className="max-w-[1220px] mx-auto px-4 md:px-6 lg:px-8 py-14 md:py-20">
            <h2 className="text-[32px] md:text-[40px] leading-[1.05] tracking-[-0.03em] font-bold">
              Personal loans in other cities
            </h2>
            <ul className="mt-6 flex flex-wrap gap-3">
              {others.map((c) => (
                <li key={c.slug}>
                  <Link
                    href={`/personal-loan-in-${c.slug}`}
                    className="inline-block rounded bg-white hover:bg-[#0052CC] hover:text-white transition-colors px-5 py-3 text-base font-semibold"
                  >
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
            <p className="mt-8 text-sm text-[#3C4F69] max-w-3xl">
              *Rates depend on credit profile, income, employer, existing obligations, loan amount, tenure and
              lender policy. For eligible salaried applicants only. Approval is decided by the lender.
            </p>
          </div>
        </section>
      )}
    </div>
  );
}
