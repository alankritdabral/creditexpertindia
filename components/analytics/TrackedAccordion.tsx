"use client";

import * as React from "react";
import { Accordion } from "@/components/ui/accordion";
import { track } from "@/lib/analytics/track";

type SingleAccordionProps = Extract<React.ComponentPropsWithoutRef<typeof Accordion>, { type: "single" }>;

/**
 * Drop-in replacement for `<Accordion type="single" collapsible>` (the
 * pattern every FAQ list on the site uses — this component only supports
 * that variant, not `type="multiple"`) that also fires `faq_open` when an
 * item is opened. `faqSet` identifies which FAQ list this is (e.g. "home",
 * "faq", "page:personal-loan") — see Appendix A in
 * plans/01-visibility-and-analytics.md.
 *
 * Existing usages are uncontrolled (no `value`/`onValueChange` prop), so
 * this only needs to additionally observe the change, not take over state
 * management — it forwards every prop to Radix's own Root unchanged.
 */
export function TrackedAccordion({
  faqSet,
  onValueChange,
  ...props
}: SingleAccordionProps & { faqSet: string }) {
  const handleValueChange = React.useCallback(
    (value: string) => {
      if (value) {
        track({ name: "faq_open", params: { faq_set: faqSet, faq_id: value } });
      }
      onValueChange?.(value);
    },
    [faqSet, onValueChange]
  );

  return <Accordion {...props} onValueChange={handleValueChange} />;
}
