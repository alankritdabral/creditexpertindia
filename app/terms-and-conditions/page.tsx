import { LegalPage } from "@/components/sections/LegalPage";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Terms and Conditions",
  description: "Terms for using the Credit Expert India website and its loan facilitation services.",
  path: "/terms-and-conditions",
});

// TODO(legal): the wording below is unchanged from the previous site. Have counsel review it and
// then set the date shown with <LegalPage updated="...">.
export default function Page() {
  return (
    <LegalPage title="Terms & Conditions">
          <p>Welcome to Credit Expert India!</p>
          <p>
            These terms and conditions outline the rules and regulations for the use of Credit Expert India's Website, located at creditexpertindia.com.
          </p>
          <p>
            By accessing this website we assume you accept these terms and conditions. Do not continue to use Credit Expert India if you do not agree to take all of the terms and conditions stated on this page.
          </p>
          <h2>Cookies</h2>
          <p>
            We employ the use of cookies. By accessing Credit Expert India, you agreed to use cookies in agreement with the Credit Expert India's Privacy Policy.
          </p>
          <h2>License</h2>
          <p>
            Unless otherwise stated, Credit Expert India and/or its licensors own the intellectual property rights for all material on Credit Expert India. All intellectual property rights are reserved. You may access this from Credit Expert India for your own personal use subjected to restrictions set in these terms and conditions.
          </p>
          <h2>Disclaimer</h2>
          <p>
            Credit Expert India is a loan facilitator and not a bank or NBFC. Final loan approval, interest rate and loan terms are determined by the respective lender based on its policies and eligibility criteria. We do not guarantee loan approval or specific rates.
          </p>
        </LegalPage>
  );
}
