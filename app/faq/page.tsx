import { Metadata } from "next";
import { FAQ } from "@/components/FAQ";
import { LeadForm } from "@/components/LeadForm";
import { AnimatedMeshBackground } from "@/components/AnimatedMeshBackground";

export const metadata: Metadata = {
  title: "Frequently Asked Questions (FAQ)",
  description: "Find answers to all common questions about debt consolidation, personal loans, interest rates, CIBIL score impact, and lender approval.",
  alternates: { canonical: "/faq" },
};

const faqPageSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What does Credit Expert India do?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "We help customers understand their existing debt or borrowing requirements and explore suitable loan, consolidation or repayment options based on their situation."
      }
    },
    {
      "@type": "Question",
      name: "Can you help with multiple loans?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. We can review multiple loans and EMIs together and help you understand whether consolidation or another option may be suitable."
      }
    },
    {
      "@type": "Question",
      name: "Can you help with credit-card debt?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "We can review your credit-card dues and help you understand potential repayment or consolidation options available based on your situation."
      }
    },
    {
      "@type": "Question",
      name: "Do you guarantee loan approval?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. Final approval, interest rate, loan amount and tenure are decided by the respective lender based on its eligibility criteria."
      }
    },
    {
      "@type": "Question",
      name: "Do you guarantee lower interest rates?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. Rates depend on your profile, lender policies and prevailing terms. We help you explore suitable options."
      }
    },
    {
      "@type": "Question",
      name: "Is the assessment free?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The initial assessment can be offered without obligation. Any applicable charges, if any, should always be communicated clearly before proceeding."
      }
    },
    {
      "@type": "Question",
      name: "Will taking another loan always help?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. A new loan isn't always the right solution. We first look at the existing situation and then discuss relevant options."
      }
    }
  ]
};

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPageSchema) }}
      />
      
      <section className="relative w-full pt-32 pb-24 lg:pt-40 lg:pb-32 bg-background overflow-hidden border-b border-icy-blue">
        <div className="absolute inset-0 -z-10 h-full w-full">
          <AnimatedMeshBackground />
          <div className="absolute top-0 right-0 w-full h-full max-w-[60%] transform origin-top-right -skew-y-12 bg-gradient-to-bl from-[#E2D6CC]/40 to-transparent pointer-events-none" />
        </div>
        <div className="container-narrow text-center relative z-10">
          <span className="text-xs font-extrabold uppercase tracking-widest text-brand-black/80">
            HELP CENTER
          </span>
          <h1 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl text-brand-black">
            Frequently Asked Questions
          </h1>
          <p className="mt-3 max-w-2xl mx-auto text-sm text-brand-black/80 font-medium">
            Clear, honest answers to the most common questions regarding loan options and debt advisory.
          </p>
        </div>
      </section>

      <FAQ />
      <LeadForm />
    </div>
  );
}
