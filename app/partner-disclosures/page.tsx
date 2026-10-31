import { LegalPage } from "@/components/sections/LegalPage";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Partner Disclosures",
  description: "How Credit Expert India works with lenders, how it is paid, and what it does not guarantee.",
  path: "/partner-disclosures",
});

// TODO(legal): the wording below is unchanged from the previous site. Have counsel review it and
// then set the date shown with <LegalPage updated="...">.
export default function Page() {
  return (
    <LegalPage title="Partner Disclosures">
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
        </LegalPage>
  );
}
