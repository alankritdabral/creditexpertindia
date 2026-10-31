import { redirect } from "next/navigation";
import { contact } from "@/lib/config";

// This route used to render the internal campaign console. The console now lives
// only at /admin/whatsapp (behind admin-authenticated APIs); the public URL sends
// visitors to a prefilled WhatsApp chat instead.
export const metadata = { robots: { index: false, follow: false } };

export default function WhatsAppRedirect() {
  const number = contact.whatsapp.replace(/\D/g, "");
  const text = encodeURIComponent("Hi, I would like help with my loans/EMIs and want to understand my options.");
  redirect(`https://wa.me/${number}?text=${text}`);
}
