"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Alert } from "@/components/ui/Alert";
import { Checkbox, Field, Input, Select } from "@/components/ui/Field";
import { Disclaimer } from "@/components/ui/Disclaimer";
import { WhatsAppButton } from "@/components/site/WhatsAppButton";
import { LEAD_NEEDS, type LeadErrors } from "@/lib/leadValidation";
import { track } from "@/lib/analytics";
import { ctas } from "@/content/site";

type Status = "idle" | "sending" | "success" | "error";

/** Step 1 of the journey: need, income and mobile. PAN and date of birth are never asked here. */
export function ShortLeadForm({ source, defaultNeed = "" }: { source: string; defaultNeed?: string }) {
  const [values, setValues] = useState({ need: defaultNeed, monthlyIncome: "", mobile: "", name: "", consent: false, website: "" });
  const [errors, setErrors] = useState<LeadErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState<string | null>(null);

  const set = <K extends keyof typeof values>(key: K, value: (typeof values)[K]) => {
    setValues((v) => ({ ...v, [key]: value }));
    setErrors((e) => ({ ...e, [key]: undefined }));
  };

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (status === "sending") return;
    setStatus("sending");
    setMessage(null);
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, source }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.success) {
        track("generate_lead", { source, need: values.need });
        setStatus("success");
        return;
      }
      // Keep everything the visitor typed; show what to fix.
      if (data.errors) setErrors(data.errors);
      setMessage(data.error || (data.errors ? "Please check the highlighted fields." : "Something went wrong. Please try again."));
      setStatus("error");
    } catch {
      setMessage("We could not reach the server. Your details are still here, so please try again.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="space-y-4" aria-live="polite">
        <Alert tone="success" title="Thank you. We have your request.">
          <p>A credit specialist will contact you on the number you gave, usually on the same working day. You do not need to do anything else.</p>
        </Alert>
        <div className="flex flex-col gap-3 sm:flex-row">
          <WhatsAppButton location="lead-success" label="Talk to an Expert now" />
          <Link href="/eligibility" className="inline-flex h-11 items-center justify-center rounded-lg border border-primary px-5 text-[15px] font-semibold text-primary hover:bg-primary-soft">
            Get your free credit report
          </Link>
        </div>
        <Disclaimer>The credit report is optional and asks for your PAN and date of birth, with your consent.</Disclaimer>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-5">
      <Field label="What do you need help with?" required error={errors.need}>
        {(a11y) => (
          <Select {...a11y} invalid={!!errors.need} value={values.need} onChange={(e) => set("need", e.target.value)}>
            <option value="">Choose one</option>
            {LEAD_NEEDS.map((n) => <option key={n} value={n}>{n}</option>)}
          </Select>
        )}
      </Field>

      <Field label="Monthly take-home income (₹)" required error={errors.monthlyIncome} hint="Salary credited to your account each month.">
        {(a11y) => (
          <Input {...a11y} invalid={!!errors.monthlyIncome} inputMode="numeric" autoComplete="off" placeholder="e.g. 60000" value={values.monthlyIncome} onChange={(e) => set("monthlyIncome", e.target.value.replace(/[^\d,]/g, ""))} />
        )}
      </Field>

      <Field label="Mobile number" required error={errors.mobile}>
        {(a11y) => (
          <div className="flex">
            <span className="inline-flex h-11 items-center rounded-l-lg border border-r-0 border-field bg-page px-3 text-base text-ink-muted" aria-hidden="true">+91</span>
            <Input {...a11y} invalid={!!errors.mobile} className="rounded-l-none" type="tel" inputMode="numeric" autoComplete="tel-national" maxLength={10} placeholder="10-digit number" value={values.mobile} onChange={(e) => set("mobile", e.target.value.replace(/\D/g, "").slice(0, 10))} />
          </div>
        )}
      </Field>

      <Field label="Name (optional)" error={errors.name}>
        {(a11y) => <Input {...a11y} invalid={!!errors.name} autoComplete="name" value={values.name} onChange={(e) => set("name", e.target.value)} />}
      </Field>

      {/* Honeypot: hidden from people and assistive tech; bots fill it in. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>Website<input tabIndex={-1} autoComplete="off" value={values.website} onChange={(e) => set("website", e.target.value)} /></label>
      </div>

      <div>
        {/* TODO(legal): consent wording must be confirmed with counsel. Keep it in sync with CONSENT_TEXT in app/api/lead/route.ts. */}
        <Checkbox
          checked={values.consent}
          onChange={(e) => set("consent", e.target.checked)}
          aria-invalid={errors.consent ? true : undefined}
          label={<>I agree that Credit Expert India may contact me by phone, SMS and WhatsApp about my request, as described in the <Link href="/privacy-policy" className="font-semibold text-primary underline">Privacy Policy</Link>.</>}
        />
        {errors.consent ? <p role="alert" className="mt-1.5 text-sm font-medium text-danger">{errors.consent}</p> : null}
      </div>

      {status === "error" && message ? <Alert tone="error">{message}</Alert> : null}

      <Button type="submit" size="lg" className="w-full" disabled={status === "sending"}>
        {status === "sending" ? "Sending…" : ctas.primary}
      </Button>
      <Disclaimer>Free to ask, with no obligation to apply. We never ask for your PAN or date of birth in this step.</Disclaimer>
    </form>
  );
}
