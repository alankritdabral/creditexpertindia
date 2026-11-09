"use client";

import dynamic from "next/dynamic";

/**
 * app/page.tsx is a Server Component (it exports `metadata`, which requires
 * one), but Next's docs are explicit that `next/dynamic` only produces a
 * separate client bundle when the call itself lives in a Client Component —
 * "When a Server Component dynamically imports a Client Component,
 * automatic code splitting is currently not supported" (node_modules/next/
 * dist/docs/01-app/02-guides/lazy-loading.md). The previous inline
 * `dynamic()` calls in app/page.tsx looked right but weren't actually
 * code-splitting SmartCalculator, EligibilityForm, HowItWorks,
 * ScamProtection, FAQ, NetworkStats, EligibleLoansSlider or ContactForm out
 * of the homepage's initial bundle — moving the calls into this "use
 * client" module is the fix the same doc page describes.
 */
export const HeroVisualBlock = dynamic(() => import("@/components/hero/HeroVisualBlock").then((m) => m.HeroVisualBlock), { ssr: false });
export const SmartCalculator = dynamic(() => import("@/components/SmartCalculator").then((m) => m.SmartCalculator));
export const EligibilityForm = dynamic(() => import("@/components/EligibilityForm").then((m) => m.EligibilityForm));
export const HowItWorks = dynamic(() => import("@/components/HowItWorks").then((m) => m.HowItWorks));
export const ScamProtection = dynamic(() => import("@/components/ScamProtection").then((m) => m.ScamProtection));
export const FAQ = dynamic(() => import("@/components/FAQ").then((m) => m.FAQ));
export const NetworkStats = dynamic(() => import("@/components/NetworkStats").then((m) => m.NetworkStats));
export const EligibleLoansSlider = dynamic(() => import("@/components/EligibleLoansSlider").then((m) => m.EligibleLoansSlider));
export const ContactForm = dynamic(() => import("@/components/ContactForm").then((m) => m.ContactForm));
