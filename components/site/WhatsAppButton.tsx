"use client";

import { MessageCircle } from "lucide-react";
import { buttonClasses, type ButtonSize, type ButtonVariant } from "@/components/ui/Button";
import { contact } from "@/lib/config";
import { track } from "@/lib/analytics";

export const WHATSAPP_MESSAGE = "Hi, I would like help with my loans/EMIs and want to understand my options.";

export function whatsappHref(message: string = WHATSAPP_MESSAGE) {
  return `https://wa.me/${contact.whatsapp.replace(/\D/g, "")}?text=${encodeURIComponent(message)}`;
}

/** The one WhatsApp entry point. `location` tags the analytics event (header, hero, bar, footer...). */
export function WhatsAppButton({
  location,
  label = "Talk to an Expert",
  variant = "whatsapp",
  size = "md",
  className,
  message,
}: {
  location: string;
  label?: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  message?: string;
}) {
  return (
    <a
      href={whatsappHref(message)}
      target="_blank"
      rel="noopener noreferrer"
      className={buttonClasses(variant, size, className)}
      onClick={() => track("whatsapp_click", { location })}
    >
      <MessageCircle className="h-5 w-5" aria-hidden="true" />
      {label}
      <span className="sr-only"> (opens WhatsApp in a new tab)</span>
    </a>
  );
}
