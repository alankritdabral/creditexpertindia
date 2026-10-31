import { IntentPage } from "@/components/sections/IntentPage";
import { getIntentPage } from "@/content/pages";
import { pageMetadata } from "@/lib/seo";

const page = getIntentPage("high-interest-loan");

export const metadata = pageMetadata({ title: page.metaTitle, description: page.metaDescription, path: page.path });

export default function Page() {
  return <IntentPage page={page} />;
}
