import { LegalPage } from "@/components/sections/LegalPage";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Privacy Policy and Data Security",
  description: "How Credit Expert India collects, uses and protects your personal information.",
  path: "/privacy-policy",
});

// TODO(legal): the wording below is unchanged from the previous site. Have counsel review it and
// then set the date shown with <LegalPage updated="...">.
export default function Page() {
  return (
    <LegalPage title="Privacy Policy">
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
        </LegalPage>
  );
}
