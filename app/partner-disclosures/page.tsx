import { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { LENDERS } from "@/lib/lenderEngine";
import { contact } from "@/lib/config";

export const metadata: Metadata = buildMetadata({
  title: "Partner Disclosures",
  description:
    "How Credit Expert India works with lending partners, how we are compensated, and what we never guarantee about loan approval.",
  path: "/partner-disclosures",
});

export default function PartnerDisclosuresPage() {
  return (
    <div className="min-h-screen bg-slate-50 pt-32 pb-24">
      <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "Partner Disclosures" }]} />
      <div className="container-narrow bg-white p-8 sm:p-12 rounded-2xl border border-icy-blue shadow-sm mt-6">
        <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl text-brand-black mb-8">
          Partner Disclosures
        </h1>
        <div className="prose prose-slate max-w-none">
          <p>
            Credit Expert India operates as an independent loan facilitator. We are not a lender, bank, or NBFC (Non-Banking Financial Company).
          </p>
          <p>
            Our services aim to connect individuals with potential lending partners based on their financial profile and needs. We currently work with the RBI-registered banks and NBFCs listed below to provide a range of debt consolidation and personal loan options. This list changes from time to time as our lending network grows.
          </p>
          <h2>Our Current Lending Partners</h2>
          <ul>
            {LENDERS.map((l) => (
              <li key={l.name}>{l.name}</li>
            ))}
          </ul>
          <h2>How We Are Compensated</h2>
          <p>
            Credit Expert India may receive compensation from our lending partners when a user is successfully matched, applies for, or is approved for a loan product through our platform. This compensation is paid by the lender, never by you, and does not impact the interest rates or fees that are offered to you.
          </p>
          <h2>No Guarantee of Approval</h2>
          <p>
            While we strive to find the best financial solutions for our users, we do not guarantee that your application will be approved by any specific lender. All final decisions regarding loan approval, loan amounts, interest rates, and other terms are made solely by the respective lending partner based on their proprietary underwriting criteria, which may include a review of your credit history, income, and debt-to-income ratio.
          </p>
          <h2>Independent Verification</h2>
          <p>
            We encourage all users to carefully review the terms and conditions of any loan offer provided by a lending partner before accepting it. Ensure you understand all fees, interest rates, repayment schedules, and potential penalties.
          </p>
          {/* NOTE TO OWNER: RBI's Digital Lending Directions, 2025 require a
              named nodal grievance redressal officer, published on the
              website, with contact details. The section below uses the
              company's existing general contact channels as a placeholder
              escalation path — please replace with a named officer and
              direct contact details, and confirm the 30-day escalation
              process below against your actual complaint-handling SOP.
              See plans/01-visibility-and-analytics.md Phase 9, decision D7. */}
          <h2>Grievance Redressal</h2>
          <p>
            If you have a complaint about your experience with Credit Expert India or about how a lending partner has handled your application, please write to us
            {" "}<a href={`mailto:${contact.email}`}>{contact.email}</a> or call{" "}
            <a href={`tel:+${contact.whatsapp.replace(/[^0-9]/g, "")}`}>{contact.whatsapp}</a>. We aim to resolve every complaint within 30 days.
            If you remain unsatisfied after 30 days, and your complaint concerns a regulated lending partner, you may escalate it to the RBI's Complaint Management System
            {" "}at <a href="https://cms.rbi.org.in" target="_blank" rel="noopener noreferrer">cms.rbi.org.in</a>.
          </p>
        </div>
      </div>
    </div>
  );
}
