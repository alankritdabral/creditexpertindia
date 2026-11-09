import { Metadata } from "next";
import Link from "next/link";
import { DebtConsolidationCalculator } from "@/components/DebtConsolidationCalculator";
import { AnimatedMeshBackground } from "@/components/AnimatedMeshBackground";
import { siteConfig } from "@/lib/config";
import { CheckCircle2, ShieldCheck, ArrowRight, HelpCircle, Layers3, Calculator, Percent, Clock } from "lucide-react";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { jsonLd } from "@/lib/structuredData";

export const metadata: Metadata = {
  title: "Debt Consolidation Calculator India",
  description: "Free debt consolidation calculator for Indian borrowers. Combine personal loans, credit card dues and app loans into one lower EMI.",
  alternates: { canonical: "/calculators/debt-consolidation-calculator" },
  openGraph: {
    title: "Debt Consolidation Calculator India | Credit Expert India",
    description: "Combine multiple loan and credit card EMIs into one single lower monthly payment. Check your potential monthly savings instantly.",
    url: `${siteConfig.url}/calculators/debt-consolidation-calculator`,
    siteName: siteConfig.name,
    type: "website",
    locale: "en_IN",
    // Explicit, not inherited: a page with its own (even partial)
    // `openGraph` object does NOT inherit a parent segment's file-
    // convention image (see lib/seo.ts's buildMetadata for how this was
    // found) — only a page with no page-level `openGraph` at all does.
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: siteConfig.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Debt Consolidation Calculator India | Credit Expert India",
    description: "Combine multiple loan and credit card EMIs into one single lower monthly payment.",
    images: ["/opengraph-image"],
  },
};

const calculatorSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      "name": "Debt Consolidation Calculator India",
      "url": `${siteConfig.url}/calculators/debt-consolidation-calculator`,
      "applicationCategory": "FinanceApplication",
      "operatingSystem": "All",
      "description": "Calculate monthly EMI reduction, weighted average interest savings, and total repayment when consolidating multiple credit cards and personal loans into a single structured loan.",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "INR"
      }
    },
    {
      // The 4 questions below are copied verbatim from Section 5 further
      // down this page ("Frequently Asked Questions About the Calculator")
      // — kept in sync by hand since, unlike the sitewide FAQ (content/
      // faq.ts) and the per-product PageFAQ (lib/pageContent.ts), this
      // page's FAQ text is bespoke prose rather than a shared data array.
      // A prior version of this schema had a 5th question not on the page
      // at all, and reworded the other 4; if you edit Section 5's wording,
      // mirror the change here too.
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "How does the debt consolidation calculator work?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The calculator adds up all your existing debts (credit cards, personal loans, app loans) and computes your current combined monthly payment and weighted average interest rate. It then calculates the EMI of a single new consolidated loan based on your selected tenure and interest rate, showing you your exact monthly cash-flow difference and total interest impact."
          }
        },
        {
          "@type": "Question",
          "name": "Does a lower consolidated EMI mean I pay less overall interest?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Not always. If you lower your monthly EMI by stretching the tenure significantly (e.g. from 24 months to 60 months), your total interest over the life of the loan could be higher even though the interest rate is lower. The calculator flags this clearly with an alert banner whenever tenure extension causes higher overall interest."
          }
        },
        {
          "@type": "Question",
          "name": "What interest rate can I expect for debt consolidation in India?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "For salaried professionals with a CIBIL score of 720+ and stable employment, personal loan consolidation rates typically start from 9.99% to 14.5% p.a. from top partner banks like HDFC, ICICI, Axis, and Kotak. This represents a massive interest reduction compared to credit card finance charges (36% to 42% p.a.)."
          }
        },
        {
          "@type": "Question",
          "name": "Will using this calculator impact my CIBIL score?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "No. This tool is purely illustrative and mathematical. It runs entirely in your browser without requiring a credit bureau pull or login. Your credit score remains 100% untouched."
          }
        }
      ]
    }
  ]
};

export default function DebtConsolidationCalculatorPage() {
  return (
    <div className="min-h-screen bg-slate-50">

      <div className="h-[84px]" aria-hidden="true" />
      <Breadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: "Calculators", path: "/calculators" },
          { name: "Debt Consolidation Calculator" },
        ]}
      />

      {/* Schema Script */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(calculatorSchema) }}
      />

      {/* Hero Header Section */}
      <section className="relative w-full pt-32 pb-16 lg:pt-36 lg:pb-20 bg-background overflow-hidden border-b border-icy-blue">
        <div className="absolute inset-0 -z-10 h-full w-full">
          <AnimatedMeshBackground />
          <div className="absolute top-0 right-0 w-full h-full max-w-[60%] transform origin-top-right -skew-y-12 bg-gradient-to-bl from-[#E2E8F0]/40 to-transparent pointer-events-none" />
        </div>

        <div className="container-narrow text-center relative z-10 px-4">
          <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 border border-blue-200/80 px-4 py-1.5 text-xs font-bold text-blue-700 mb-4">
            <Calculator className="w-3.5 h-3.5" />
            <span>FREE PUBLIC TOOL • NO LOGIN REQUIRED</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-brand-black leading-tight">
            Debt Consolidation Calculator India <br className="hidden sm:inline" />
            <span className="text-blue-600">Estimate Your Single EMI & Monthly Savings</span>
          </h1>

          <p className="mt-4 max-w-3xl mx-auto text-sm sm:text-base text-brand-black/80 font-medium leading-relaxed">
            Struggling with multiple high-interest EMIs, revolving credit card bills, or fintech app loans? Enter your active debts below to instantly calculate how combining them into a single low-interest loan reduces your monthly outflow.
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-6 text-xs font-semibold text-slate-600">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Multi-debt input support
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Weighted average interest rate
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Zero CIBIL score impact
            </span>
          </div>
        </div>
      </section>

      {/* Main Interactive Tool Section */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <DebtConsolidationCalculator />
      </section>

      {/* Educational & SEO Content Guide */}
      <section className="py-16 bg-white border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-12">
          
          {/* Section 1: How It Works */}
          <div className="space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
              EDUCATIONAL GUIDE
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              How Does Debt Consolidation Work in India?
            </h2>
            <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
              Debt consolidation is a financial strategy where a borrower combines several active loans—such as high-interest credit card outstandings (often charging 36% to 42% p.a.), personal loans, and short-term instant app loans—into a <strong>single new loan</strong> from a scheduled bank or RBI-regulated NBFC at a lower interest rate.
            </p>
            <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
              Instead of juggling 3 to 6 scattered payment dates and paying interest on interest, the borrower makes <strong>one predictable payment each month</strong> on a single set date. For salaried professionals earning over ₹45,000/month with stable employment, partner banks often approve consolidation loans starting around 9.99% to 12.5% p.a.
            </p>
          </div>

          {/* Section 2: Mathematical Formulas */}
          <div className="p-6 sm:p-8 rounded-3xl bg-slate-50 border border-slate-200 space-y-4">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
              The Math Behind the Calculator: Formulas & Definitions
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Our calculator uses the standard loan amortization formula lenders use to evaluate your current versus proposed positions:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-white border border-slate-200 card-elevated">
                <span className="text-xs font-bold uppercase text-slate-500 block mb-1">
                  1. Standard Amortizing EMI Formula
                </span>
                <code className="text-xs font-mono font-bold text-blue-700 block bg-blue-50/70 p-2 rounded-lg">
                  EMI = [P × r × (1 + r)^n] / [(1 + r)^n - 1]
                </code>
                <p className="text-[11px] text-slate-500 mt-2 leading-relaxed">
                  Where <strong>P</strong> is total principal, <strong>r</strong> is the monthly interest rate (annual rate ÷ 12 ÷ 100), and <strong>n</strong> is the loan tenure in months.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-slate-200 card-elevated">
                <span className="text-xs font-bold uppercase text-slate-500 block mb-1">
                  2. Weighted Average Interest Rate
                </span>
                <code className="text-xs font-mono font-bold text-blue-700 block bg-blue-50/70 p-2 rounded-lg">
                  Weighted Rate = Σ(Balance_i × Rate_i) / Total Balance
                </code>
                <p className="text-[11px] text-slate-500 mt-2 leading-relaxed">
                  Reflects the true interest cost of your debt portfolio across cards and loans rather than a simple mathematical average.
                </p>
              </div>
            </div>
          </div>

          {/* Section 3: Before vs After Case Study */}
          <div className="space-y-4">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Real-World Illustration: Today vs. After Consolidation
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              Consider a salaried software engineer in Bangalore with 4 active obligations totaling ₹6,00,000:
            </p>

            <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                  <tr>
                    <th className="py-3 px-4">Debt / Obligation</th>
                    <th className="py-3 px-4">Balance</th>
                    <th className="py-3 px-4">Interest Rate</th>
                    <th className="py-3 px-4">Monthly Payment</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  <tr>
                    <td className="py-3 px-4 font-semibold">HDFC Credit Card Dues</td>
                    <td className="py-3 px-4">₹1,50,000</td>
                    <td className="py-3 px-4 text-rose-600 font-bold">42.0% p.a.</td>
                    <td className="py-3 px-4">₹14,500 (Min/Part)</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-semibold">Personal Loan #1</td>
                    <td className="py-3 px-4">₹2,50,000</td>
                    <td className="py-3 px-4">16.5% p.a.</td>
                    <td className="py-3 px-4">₹8,900</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-semibold">SBI Credit Card Dues</td>
                    <td className="py-3 px-4">₹1,00,000</td>
                    <td className="py-3 px-4 text-rose-600 font-bold">40.0% p.a.</td>
                    <td className="py-3 px-4">₹9,000</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-semibold">Fintech App Loan</td>
                    <td className="py-3 px-4">₹1,00,000</td>
                    <td className="py-3 px-4 text-rose-600 font-bold">36.0% p.a.</td>
                    <td className="py-3 px-4">₹10,200</td>
                  </tr>
                  <tr className="bg-rose-50/70 font-bold text-rose-900">
                    <td className="py-3 px-4">BEFORE CONSOLIDATION TOTAL</td>
                    <td className="py-3 px-4">₹6,00,000</td>
                    <td className="py-3 px-4">Weighted: 30.1%</td>
                    <td className="py-3 px-4 text-rose-700">₹42,600 / month</td>
                  </tr>
                  <tr className="bg-emerald-50/80 font-bold text-emerald-950">
                    <td className="py-3 px-4">AFTER 48-MO CONSOLIDATION @ 10.5%</td>
                    <td className="py-3 px-4">₹6,00,000</td>
                    <td className="py-3 px-4 text-emerald-700">10.5% p.a.*</td>
                    <td className="py-3 px-4 text-emerald-700">₹15,360 / month (SAVE ₹27,240/mo)</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-xs text-slate-500 italic">
              *Illustrative scenario. Actual loan approval, processing fees, and interest rates depend on applicant credit score, employer classification, and lender underwriting policy.
            </p>
          </div>

          {/* Section 4: What to Check */}
          <div className="space-y-4">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              4 Things to Evaluate Before Taking a Debt Consolidation Loan
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-5 rounded-2xl border border-slate-200 bg-white space-y-1 card-elevated">
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <Percent className="w-4 h-4 text-blue-600" /> 1. Total Repayment, Not Just Monthly EMI
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  A lower monthly EMI is great for cash flow, but stretching the tenure from 2 years to 6 years can increase total interest paid. Choose the shortest tenure you can comfortably afford.
                </p>
              </div>

              <div className="p-5 rounded-2xl border border-slate-200 bg-white space-y-1 card-elevated">
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <Layers3 className="w-4 h-4 text-blue-600" /> 2. Foreclosure & Processing Charges
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Check if your existing lenders charge prepayment penalties for closing early. Factor in the new lender's processing fee (typically 1% to 2%) into your net savings calculation.
                </p>
              </div>

              <div className="p-5 rounded-2xl border border-slate-200 bg-white space-y-1 card-elevated">
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-blue-600" /> 3. Strict Card Closure Discipline
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Consolidating credit card debt only works if you stop accumulating fresh balances on those cleared credit cards. Do not run up new charges while paying off the consolidation loan.
                </p>
              </div>

              <div className="p-5 rounded-2xl border border-slate-200 bg-white space-y-1 card-elevated">
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-blue-600" /> 4. Lender Credibility
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Work only with RBI-regulated scheduled commercial banks and trusted NBFCs. Avoid unverified digital apps charging exorbitant upfront processing or insurance deductions.
                </p>
              </div>
            </div>
          </div>

          {/* Section 5: FAQs on Calculator */}
          <div className="space-y-6 pt-4 border-t border-slate-200">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Frequently Asked Questions About the Calculator
            </h2>
            
            <div className="space-y-4">
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
                <h3 className="text-sm font-bold text-slate-900 mb-1">
                  How does the debt consolidation calculator work?
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  The calculator adds up all your existing debts (credit cards, personal loans, app loans) and computes your current combined monthly payment and weighted average interest rate. It then calculates the EMI of a single new consolidated loan based on your selected tenure and interest rate, showing you your exact monthly cash-flow difference and total interest impact.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
                <h3 className="text-sm font-bold text-slate-900 mb-1">
                  Does a lower consolidated EMI mean I pay less overall interest?
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Not always. If you lower your monthly EMI by stretching the tenure significantly (e.g. from 24 months to 60 months), your total interest over the life of the loan could be higher even though the interest rate is lower. The calculator flags this clearly with an alert banner whenever tenure extension causes higher overall interest.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
                <h3 className="text-sm font-bold text-slate-900 mb-1">
                  What interest rate can I expect for debt consolidation in India?
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  For salaried professionals with a CIBIL score of 720+ and stable employment, personal loan consolidation rates typically start from 9.99% to 14.5% p.a. from top partner banks like HDFC, ICICI, Axis, and Kotak. This represents a massive interest reduction compared to credit card finance charges (36% to 42% p.a.).
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
                <h3 className="text-sm font-bold text-slate-900 mb-1">
                  Will using this calculator impact my CIBIL score?
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  No. This tool is purely illustrative and mathematical. It runs entirely in your browser without requiring a credit bureau pull or login. Your credit score remains 100% untouched.
                </p>
              </div>
            </div>
          </div>

          {/* Bottom CTA Banner */}
          <div className="p-8 sm:p-10 rounded-3xl bg-slate-900 text-white text-center space-y-4">
            <h3 className="text-xl sm:text-2xl font-bold">
              Ready to Explore Your Real Options?
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto">
              Get an unpressured, confidential assessment from Credit Expert India's senior debt advisors. We work with 13 RBI-regulated lenders to find the optimal consolidation structure for your profile.
            </p>
            <div className="pt-2 flex flex-col sm:flex-row justify-center gap-3">
              <Link
                href="/eligibility"
                data-analytics-cta="debt_calc_page_check_eligibility"
                data-analytics-location="debt_calc_page"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md transition-colors"
              >
                <span>Check Eligibility Online</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/contact"
                data-analytics-cta="debt_calc_page_speak_advisor"
                data-analytics-location="debt_calc_page"
                className="inline-flex items-center justify-center px-6 py-3.5 rounded-full bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs border border-slate-700 transition-colors"
              >
                Speak with an Advisor
              </Link>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}
