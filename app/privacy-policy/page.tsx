import { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Privacy Policy",
  description:
    "What personal information Credit Expert India collects from visitors and how it is used, including for loan enquiries.",
  path: "/privacy-policy",
});

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-slate-50 pt-32 pb-24">
      <div className="container-narrow bg-white p-8 sm:p-12 rounded-2xl border border-icy-blue shadow-sm">
        <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl text-brand-black mb-8">
          Privacy Policy
        </h1>
        <div className="prose prose-slate max-w-none">
          <p>
            At Credit Expert India, accessible from creditexpertindia.com, one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by Credit Expert India and how we use it.
          </p>
          <p>
            If you have additional questions or require more information about our Privacy Policy, do not hesitate to contact us.
          </p>
          <h2>Information we collect</h2>
          <p>
            The personal information that you are asked to provide, and the reasons why you are asked to provide it, will be made clear to you at the point we ask you to provide your personal information.
          </p>
          <p>
            If you contact us directly, we may receive additional information about you such as your name, email address, phone number, the contents of the message and/or attachments you may send us, and any other information you may choose to provide.
          </p>
          <h2>How we use your information</h2>
          <p>We use the information we collect in various ways, including to:</p>
          <ul>
            <li>Provide, operate, and maintain our website</li>
            <li>Improve, personalize, and expand our website</li>
            <li>Understand and analyze how you use our website</li>
            <li>Develop new products, services, features, and functionality</li>
            <li>Communicate with you, either directly or through one of our partners, including for customer service, to provide you with updates and other information relating to the website, and for marketing and promotional purposes</li>
            <li>Send you emails</li>
            <li>Find and prevent fraud</li>
          </ul>
          {/* NOTE: drafted in plain language to match what the site actually
              does (lib/consent.ts, components/consent/ConsentBanner.tsx).
              Not yet reviewed by legal counsel — see
              plans/01-visibility-and-analytics.md Phase 2, decision D4. */}
          <h2>Cookies and analytics</h2>
          <p>
            We only turn on usage analytics (Google Analytics) and session recordings (Microsoft Clarity) after you accept
            them, using the banner shown on your first visit. Analytics tells us which pages are visited and how people
            move through the site; it does not send us your name, phone number or any other personal details. Session
            recordings show anonymised mouse movement and scrolling, with every form field blanked out, so we can see
            where visitors get stuck.
          </p>
          <p>
            You can change or withdraw this choice at any time using &quot;Cookie settings&quot; in the footer of every
            page.
          </p>
        </div>
      </div>
    </div>
  );
}
