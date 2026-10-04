# New Section — Bring Your Eligible Loans Together

## Objective

Add a new premium fintech bento-grid section to the Credit Expert India website.

This is a **new section only**. Do not redesign, remove, or modify unrelated sections of the website.

The section should replace the current static presentation of eligible loan types with a more visual, premium, product-focused layout.

---

## Section Header

Eyebrow:

**BRING YOUR ELIGIBLE LOANS TOGETHER**

Heading:

**Bring Your Eligible Loans Together**

Subheading:

**Different debts. Different stories. One smarter way forward.**

Center the header and give it generous vertical spacing.

---

# Layout

Use a premium **bento-grid layout**.

Desktop structure:

```text
┌───────────────────────────────┬──────────────────┬──────────────────┐
│                               │                  │                  │
│                               │ Credit Card Debt │    App Loans     │
│                               │                  │                  │
│       Personal Loan           ├──────────────────┼──────────────────┤
│       LARGE FEATURE CARD      │                  │                  │
│                               │ Multiple Loans   │    Overdraft     │
│                               │                  │                  │
└───────────────────────────────┴──────────────────┴──────────────────┘
```

The Personal Loan card is the main feature and should occupy approximately half of the section width and the full card height.

The other four loan categories should occupy a 2 × 2 grid.

Do not make all five cards equal in size.

---

# 1. Personal Loan — Large Feature Card

This is the primary visual card.

### Header

**Personal Loan**

Add a small icon and a top-right arrow button:

`↗`

### Main headline

**Make your monthly repayments more manageable.**

### Customer quote

> “We wanted to focus on her wedding, not another financial burden.”

### Customer story

Show a realistic Indian customer portrait.

Text:

**We helped make their repayments more manageable.**

### Main product visual

Place a premium smartphone mockup inside the card.

The smartphone should show a fictional loan dashboard:

```text
Loan Overview

Personal Loan
HDFC Bank

₹25,000
per month

Outstanding
₹6,20,000

Interest rate
16.5%

Tenure left
32 months


Potential with Consolidation

₹18,499
per month

Lower monthly burden
```

Include a simple EMI comparison:

```text
Current EMI
₹25,000

        ↓

Potential EMI
₹18,499
```

The phone should be slightly tilted and visually prominent.

Use subtle blue, purple, and pink abstract shapes behind the phone.

Do not use a generic stock phone mockup.

### CTA

**Explore your options →**

### Disclaimer

*Illustrative example based on typical customer profiles. Customer results vary.*

---

# 2. Credit Card Debt

Place this in the top-middle card.

### Header

**Credit Card Debt**

Add a credit-card icon and top-right arrow:

`↗`

### Heading

**Reduce the burden of expensive credit-card debt.**

### Customer quote

> “I was paying nearly 45% interest on my credit card debt.”

### Financial visualization

```text
45%
Current interest rate

        →

11%
Potential interest rate
```

Use a soft pink/red treatment for 45% and a soft green treatment for 11%.

Clearly label this as an illustrative example.

Do not imply that 11% is guaranteed.

---

# 3. App Loans

Place this in the top-right card.

### Header

**App Loans**

### Heading

**Bring scattered app loans into a clearer plan.**

### Customer quote

> “One small loan became several. I couldn’t keep up.”

### Visualization

Show multiple small loan cards merging into one EMI:

```text
₹8,000 ─┐
₹5,500 ─┤
₹3,200 ─┼──→ ONE EMI
₹4,800 ─┘     ₹15,999
```

Use small colored indicators and curved connecting lines.

Keep the visualization simple.

---

# 4. Multiple Loans

Place this in the bottom-middle card.

### Header

**Multiple Loans**

### Heading

**Replace multiple monthly payments with one simpler repayment.**

### Customer quote

> “I had four different payments to keep track of every month.”

### Visualization

```text
Personal Loan    ₹12,500
Credit Card       ₹8,300
App Loan          ₹5,200
Personal Loan     ₹9,000

        ↓

     ONE EMI

     ₹24,999
```

Visually connect the four liabilities into one EMI card.

---

# 5. Overdraft

Place this in the bottom-right card.

### Header

**Overdraft**

### Heading

**Explore options for expensive overdraft debt.**

### Customer quote

> “₹70 lakh outstanding at 14% interest was becoming expensive.”

### Visualization

```text
₹70L @ 14%

      →

₹70L @ 10.99%
```

Clearly mark the figures as illustrative.

Do not present 10.99% as guaranteed.

---

# Card Design

Every card should have:

- White/off-white background
- Very subtle border
- 18–24px rounded corners
- Large internal padding
- Minimal shadow
- Clean modern typography
- Premium fintech appearance

Avoid:

- Heavy shadows
- Excessive gradients
- Glassmorphism
- Neon colors
- Generic AI illustrations
- Overly decorative graphics

---

# Visual Style

The design should feel:

- Premium
- Modern
- Trustworthy
- Minimal
- Human
- Financial
- Product-focused

Use the existing Credit Expert India brand.

Preferred visual language:

- Dark navy typography
- Existing blue brand accent
- Purple accents
- Very soft pastel gradients
- White backgrounds
- Light gray borders

The composition can be inspired by modern Stripe-style fintech product sections, but do not copy Stripe branding, text, illustrations, or exact UI.

---

# Background

Use subtle flowing abstract shapes behind the cards.

Recommended colors:

- Soft blue
- Light purple
- Very subtle pink
- White

The background should remain subtle and should never overpower the card content.

---

# Interaction

All five cards should be interactive.

## Hover

On hover:

- Slightly elevate the card
- Animate the arrow icon
- Slightly reveal the background visual
- Add subtle movement to product visuals
- Do not dramatically scale the card

## Click

Cards should support a clickable interaction.

The preferred behavior is to expand the selected card into a larger detailed state or navigate to the appropriate eligibility/application flow.

Use Framer Motion if it already exists in the project.

Animation duration:

**300–500ms**

Use smooth spring/ease transitions.

Support:

```css
prefers-reduced-motion
```

---

# Responsive Behavior

## Desktop

Use the large Personal Loan card plus the four supporting cards.

## Tablet

Use a responsive two-column layout.

## Mobile

Convert the section into a vertical layout:

```text
┌─────────────────────────┐
│ Personal Loan           │
│                         │
│ Large feature card      │
│                         │
└─────────────────────────┘

┌─────────────────────────┐
│ Credit Card Debt        │
└─────────────────────────┘

┌─────────────────────────┐
│ App Loans               │
└─────────────────────────┘

┌─────────────────────────┐
│ Multiple Loans          │
└─────────────────────────┘

┌─────────────────────────┐
│ Overdraft               │
└─────────────────────────┘
```

The smartphone should move below the main copy on small screens.

Do not allow horizontal scrolling.

Test at:

- 320px
- 375px
- 390px
- 430px
- 768px
- 1024px
- 1280px
- 1440px+

---

# Financial Content Rules

Never present example outcomes as guaranteed.

Use language such as:

- Illustrative
- Potential
- Example
- Subject to eligibility
- Customer results vary
- Subject to lender approval

Use this disclaimer where appropriate:

> *Illustrative examples based on typical customer profiles. Customer results vary. Outcomes depend on individual circumstances, lender policies, and final approval.*

Do not guarantee:

- 11% interest
- 10.99% interest
- Specific EMI reductions
- Specific savings
- Loan approval

---

# Technical Requirements

Continue using the existing website stack.

If the project already uses:

- Next.js
- React
- Tailwind CSS
- Framer Motion

continue using those technologies.

Do not introduce an unnecessary framework.

Create reusable components:

```text
LoanSolutionsSection
├── PersonalLoanCard
├── CreditCardDebtCard
├── AppLoansCard
├── MultipleLoansCard
└── OverdraftCard
```

Keep the implementation production-ready.

Do not duplicate unnecessary CSS.

Do not modify unrelated website sections.

Do not break existing navigation, forms, CTAs, or responsive layouts.

---

# Component Content Summary

| Card | Primary Message | Main Visual |
|---|---|---|
| Personal Loan | Make monthly repayments more manageable | Smartphone loan dashboard + EMI comparison |
| Credit Card Debt | Reduce the burden of expensive credit-card debt | 45% → 11% illustrative rate comparison |
| App Loans | Bring scattered app loans into a clearer plan | Multiple loans → One EMI |
| Multiple Loans | Replace multiple payments with one simpler repayment | Four liabilities → One EMI |
| Overdraft | Explore options for expensive overdraft debt | ₹70L @ 14% → ₹70L @ 10.99% illustrative comparison |

---

# Final Goal

The finished section should feel like a **premium modern fintech product section** rather than a traditional loan website.

The visual hierarchy should be:

1. Personal Loan — primary feature
2. Credit Card Debt
3. App Loans
4. Multiple Loans
5. Overdraft

The section should immediately communicate that Credit Expert India helps customers explore ways to bring eligible liabilities together into a simpler repayment structure.

Use the supplied reference image as the visual reference for:

- Bento-grid composition
- Card proportions
- Spacing
- Typography hierarchy
- Product visualizations
- Soft gradients
- Card density
- Premium fintech aesthetic

Keep all branding and messaging specific to **Credit Expert India**.
