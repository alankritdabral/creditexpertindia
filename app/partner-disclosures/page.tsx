import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Partner Disclosures | Credit Expert India",
  description: "Partner Disclosures for Credit Expert India",
};

export default function PartnerDisclosuresPage() {
  return (
    <div className="min-h-screen bg-slate-50 pt-32 pb-24">
      <div className="container-narrow bg-white p-8 sm:p-12 rounded-2xl border border-icy-blue shadow-sm">
        <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl text-brand-black mb-8">
          Partner Disclosures
        </h1>
        <div className="prose prose-slate max-w-none">
          <p>
            Credit Expert India operates as an independent loan facilitator. We are not a lender, bank, or NBFC (Non-Banking Financial Company).
          </p>
          <p>
            Our services aim to connect individuals with potential lending partners based on their financial profile and needs. We work with various RBI-registered banks and NBFCs to provide a range of debt consolidation and personal loan options.
          </p>
          <h2>How We Are Compensated</h2>
          <p>
            Credit Expert India may receive compensation from our lending partners when a user is successfully matched, applies for, or is approved for a loan product through our platform. This compensation does not impact the interest rates or fees that are offered to you by the lender.
          </p>
          <h2>No Guarantee of Approval</h2>
          <p>
            While we strive to find the best financial solutions for our users, we do not guarantee that your application will be approved by any specific lender. All final decisions regarding loan approval, loan amounts, interest rates, and other terms are made solely by the respective lending partner based on their proprietary underwriting criteria, which may include a review of your credit history, income, and debt-to-income ratio.
          </p>
          <h2>Independent Verification</h2>
          <p>
            We encourage all users to carefully review the terms and conditions of any loan offer provided by a lending partner before accepting it. Ensure you understand all fees, interest rates, repayment schedules, and potential penalties.
          </p>
        </div>
      </div>
    </div>
  );
}
