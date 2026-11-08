"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getConsent, setConsent, onConsentChange, toGtagConsent, type ConsentChoice } from "@/lib/consent";
import { consentNotice } from "@/content/consent";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

/**
 * Shown when the visitor hasn't made a choice yet (or has cleared it via
 * "Cookie settings" in the Footer). Renders nothing until mounted, so the
 * server-rendered HTML and the first client render match (no choice has
 * been read yet on the server, and reading localStorage during SSR isn't
 * possible anyway).
 */
export function ConsentBanner() {
  const [visible, setVisible] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [draft, setDraft] = useState<{ analytics: boolean; recordings: boolean }>({
    analytics: false,
    recordings: false,
  });

  useEffect(() => {
    // Deliberately read localStorage and setState here rather than in a
    // lazy useState initializer: getConsent() returns null during SSR (no
    // window), so an initializer would make the server-rendered HTML always
    // show the banner and could then mismatch a client that already has a
    // stored choice. Running the real check post-mount, once, keeps the
    // first client render identical to the server's and avoids a hydration
    // mismatch — this one-time, mount-only setState is the standard "has
    // mounted" pattern for browser-only state.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setVisible(getConsent() === null);
    // The beforeInteractive init script in app/layout.tsx already applies
    // any choice stored from a PREVIOUS visit on first load. This bridges
    // choices made DURING this visit (via the buttons below, or "Cookie
    // settings" in the Footer) straight to gtag's live Consent Mode state,
    // so GA starts collecting immediately rather than on the next page load.
    return onConsentChange((state) => {
      setVisible(state === null);
      if (state && window.gtag) {
        window.gtag("consent", "update", toGtagConsent(state));
      }
    });
  }, []);

  if (!visible) return null;

  const choice = (analytics: ConsentChoice, recordings: ConsentChoice) => {
    setConsent({ analytics, recordings });
    setVisible(false);
    setExpanded(false);
  };

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-label={consentNotice.heading}
      className="fixed inset-x-0 bottom-0 z-[100] border-t border-slate-200 bg-white px-4 py-5 shadow-[0_-8px_30px_rgba(10,37,64,0.12)] sm:px-6"
    >
      <div className="mx-auto flex max-w-[1220px] flex-col gap-4">
        <div>
          <p className="text-sm font-bold text-[#0A2540]">{consentNotice.heading}</p>
          <p className="mt-1 text-sm leading-relaxed text-[#3C4F69]">
            {consentNotice.body}{" "}
            <Link href={consentNotice.privacyPolicyHref} className="font-semibold text-[#0052CC] underline">
              {consentNotice.privacyPolicyLabel}
            </Link>
          </p>
        </div>

        {expanded && (
          <div className="grid gap-3 rounded-xl bg-slate-50 p-4 sm:grid-cols-2">
            {consentNotice.items.map((item) => (
              <label key={item.key} className="flex cursor-pointer items-start gap-3">
                <input
                  type="checkbox"
                  checked={draft[item.key]}
                  onChange={(e) => setDraft((prev) => ({ ...prev, [item.key]: e.target.checked }))}
                  className="mt-1 h-4 w-4 shrink-0 accent-[#0052CC]"
                />
                <span>
                  <span className="block text-sm font-semibold text-[#0A2540]">{item.label}</span>
                  <span className="block text-xs text-[#3C4F69]">{item.description}</span>
                </span>
              </label>
            ))}
          </div>
        )}

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-end">
          {!expanded && (
            <button
              type="button"
              onClick={() => setExpanded(true)}
              className="order-3 text-sm font-semibold text-[#0052CC] underline sm:order-1 sm:mr-auto"
            >
              {consentNotice.chooseLabel}
            </button>
          )}
          {expanded ? (
            <button
              type="button"
              onClick={() => choice(draft.analytics ? "granted" : "denied", draft.recordings ? "granted" : "denied")}
              className="order-1 rounded-lg bg-[#0052CC] px-5 py-2.5 text-sm font-bold text-white hover:bg-[#0052CC]/90 sm:order-3"
            >
              {consentNotice.saveLabel}
            </button>
          ) : (
            <>
              <button
                type="button"
                onClick={() => choice("denied", "denied")}
                className="order-2 rounded-lg border border-slate-300 px-5 py-2.5 text-sm font-bold text-[#0A2540] hover:border-slate-400 sm:order-2"
              >
                {consentNotice.rejectLabel}
              </button>
              <button
                type="button"
                onClick={() => choice("granted", "granted")}
                className="order-1 rounded-lg bg-[#0052CC] px-5 py-2.5 text-sm font-bold text-white hover:bg-[#0052CC]/90 sm:order-3"
              >
                {consentNotice.acceptLabel}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
