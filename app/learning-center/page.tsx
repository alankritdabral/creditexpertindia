import { Metadata } from "next";
import Link from "next/link";
import { ProductHero } from "@/components/ProductHero";
import { LeadForm } from "@/components/LeadForm";
import { articles } from "@/content/articles";

export const metadata: Metadata = {
  title: "Learning Center: Loans & EMIs Explained Simply",
  description: "Plain-language guides on EMIs, debt consolidation, credit-card interest, balance transfers and salaried loan eligibility.",
  alternates: { canonical: "/learning-center" },
};

export default function Page() {
  return (
    <div className="min-h-screen bg-white">
      <ProductHero
        title="Loans and EMIs, explained without the jargon."
        body="Short, honest guides to help you understand your options before you borrow, consolidate or switch."
        cta="Ask us a question"
        image="/Misty India Skyline with Orbital Arcs.webp"
        points={["Written for salaried borrowers", "General information, not advice", "Free to read"]}
      />
      <section className="bg-white text-[#0A2540]">
        <div className="max-w-[1220px] mx-auto px-4 md:px-6 lg:px-8 py-16 md:py-24">
          {articles.map((a, n) => (
            <Link
              key={a.slug}
              href={`/learning-center/${a.slug}`}
              className={`group grid gap-4 md:grid-cols-[7fr_5fr] md:gap-12 px-5 md:px-7 py-8 items-center ${n % 2 === 0 ? "bg-[#EAF3FF]" : ""}`}
            >
              <h2 className="text-[32px] md:text-[36px] leading-[1.08] tracking-[-0.03em] font-bold group-hover:text-[#0052CC] transition-colors">
                {a.title}
              </h2>
              <p className="text-lg text-[#3C4F69] leading-relaxed">{a.summary}</p>
            </Link>
          ))}
        </div>
      </section>
      <LeadForm />
    </div>
  );
}
