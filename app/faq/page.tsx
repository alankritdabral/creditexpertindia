import { PageHero } from "@/components/sections/PageHero";
import { FaqSection } from "@/components/sections/FaqSection";
import { LeadSection } from "@/components/sections/LeadSection";
import { JsonLd } from "@/components/seo/JsonLd";
import { generalFaqs } from "@/content/pages";
import { breadcrumbJsonLd, faqJsonLd, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Frequently Asked Questions",
  description: "Answers about debt consolidation, personal loans, interest rates, credit checks, documents and fees. We never guarantee approval or a rate.",
  path: "/faq",
});

export default function FaqPage() {
  return (
    <>
      <JsonLd data={faqJsonLd(generalFaqs)} />
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "FAQs", path: "/faq" }])} />
      <PageHero title="Frequently asked questions" lead="Straight answers about how this works, what it costs and what we cannot promise." />
      <FaqSection items={generalFaqs} bg="page" title="Your questions" />
      <LeadSection source="faq" title="Still have a question?" lead="Tell us what you need and a credit specialist will get back to you." />
    </>
  );
}
