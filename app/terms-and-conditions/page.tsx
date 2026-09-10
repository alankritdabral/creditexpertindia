import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms & Conditions | Credit Expert India",
  description: "Terms and Conditions for Credit Expert India",
};

export default function TermsAndConditionsPage() {
  return (
    <main className="min-h-screen bg-slate-50 pt-32 pb-24">
      <div className="container-narrow bg-white p-8 sm:p-12 rounded-2xl border border-slate-200 shadow-sm">
        <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl text-slate-900 mb-8">
          Terms & Conditions
        </h1>
        <div className="prose prose-slate max-w-none">
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
        </div>
      </div>
    </main>
  );
}
