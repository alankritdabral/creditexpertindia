# Stripe India — Font & Typography Guide

## Primary Font

The Stripe website primarily uses **Söhne Variable** for its marketing-site typography.

### Font Stack

```css
font-family: "Söhne", "SF Pro Display", -apple-system,
  BlinkMacSystemFont, "Segoe UI", sans-serif;

Note: Söhne is a commercially licensed typeface. Do not copy Stripe's font files without the appropriate license.

Recommended Font for Credit Expert India

For creditexpertindia.com, use Inter as a free alternative to Söhne.

font-family: "Inter", -apple-system, BlinkMacSystemFont,
  "Segoe UI", sans-serif;

Inter provides a similar clean, modern, financial/technology aesthetic.

Typography System
Hero Heading

Use a relatively light weight with tight tracking.

.hero-heading {
  font-family: "Inter", sans-serif;
  font-size: clamp(48px, 6vw, 76px);
  font-weight: 400;
  line-height: 1.02;
  letter-spacing: -0.045em;
}
Example

A smarter way to reduce your debt.

Section Headings
.section-heading {
  font-family: "Inter", sans-serif;
  font-size: clamp(36px, 4vw, 52px);
  font-weight: 400;
  line-height: 1.08;
  letter-spacing: -0.035em;
}
Subheadings
.subheading {
  font-family: "Inter", sans-serif;
  font-size: 20px;
  font-weight: 400;
  line-height: 1.45;
  letter-spacing: -0.015em;
}
Body Text
.body-text {
  font-family: "Inter", sans-serif;
  font-size: 17px;
  font-weight: 400;
  line-height: 1.55;
  letter-spacing: -0.01em;
}
Navigation
.nav-text {
  font-family: "Inter", sans-serif;
  font-size: 14px;
  font-weight: 500;
  line-height: 1.4;
  letter-spacing: -0.01em;
}
Buttons
.button {
  font-family: "Inter", sans-serif;
  font-size: 15px;
  font-weight: 500;
  letter-spacing: -0.01em;
}
Complete CSS Typography Setup
:root {
  --font-sans:
    "Inter",
    -apple-system,
    BlinkMacSystemFont,
    "Segoe UI",
    sans-serif;
}

body {
  font-family: var(--font-sans);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* Hero */
.hero-heading {
  font-size: clamp(48px, 6vw, 76px);
  font-weight: 400;
  line-height: 1.02;
  letter-spacing: -0.045em;
}

/* Section headings */
.section-heading {
  font-size: clamp(36px, 4vw, 52px);
  font-weight: 400;
  line-height: 1.08;
  letter-spacing: -0.035em;
}

/* Subheading */
.subheading {
  font-size: 20px;
  font-weight: 400;
  line-height: 1.45;
  letter-spacing: -0.015em;
}

/* Body */
.body-text {
  font-size: 17px;
  font-weight: 400;
  line-height: 1.55;
  letter-spacing: -0.01em;
}

/* Navigation */
.nav-text {
  font-size: 14px;
  font-weight: 500;
  line-height: 1.4;
}

/* Buttons */
.button {
  font-size: 15px;
  font-weight: 500;
  letter-spacing: -0.01em;
}
Tailwind CSS Version

If Credit Expert India uses Tailwind CSS:

// tailwind.config.js

module.exports = {
  theme: {
    extend: {
      fontFamily: {
        sans: [
          "Inter",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "sans-serif",
        ],
      },
    },
  },
};

Example:

<h1
  class="font-sans text-[clamp(48px,6vw,76px)]
         font-normal leading-[1.02]
         tracking-[-0.045em]"
>
  A smarter way to reduce your debt.
</h1>
Typography Principles

To achieve the Stripe-like visual style:

Use Inter throughout the website.
Avoid excessive bold text.
Prefer font-weight: 400 for major headings.
Use tight letter spacing on large headings.
Use generous whitespace around typography.
Keep body text around 16–18px.
Keep line heights relatively tight for large headings.
Use 500 rather than 600–700 for buttons and navigation.
Avoid using many different font weights.
Maintain strong contrast between heading and supporting text.
Recommended Weight System
Element	Weight
Hero heading	400
Section heading	400
Subheading	400
Body	400
Navigation	500
Buttons	500
Small labels	500–600
Numbers / statistics	400–500
Credit Expert India Direction

The goal should not be to copy Stripe exactly.

Instead, use the same typography principles:

Large + clean + light + tight + spacious

For example:

A smarter way
to reduce your debt.

Bring multiple eligible loans together
and work toward a lower monthly EMI.

This typography system should pair well with the minimal Stripe-inspired visual direction of Credit Expert India.