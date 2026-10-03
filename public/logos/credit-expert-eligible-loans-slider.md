# Credit Expert India — “Bring Your Eligible Loans Together” Slider

## Goal

Redesign the **“Bring Your Eligible Loans Together”** section on `https://www.creditexpertindia.com/` as a premium, interactive fintech **horizontal slider/carousel**, inspired by the interaction pattern shown in the provided reference.

The section should NOT look like a generic card grid. It should feel like a polished product section where one loan category is expanded in the center while the neighboring categories remain partially visible. Clicking a card or using the arrows changes the active/expanded category.

---

## Core interaction

Create a horizontally arranged carousel containing these 5 loan categories:

1. Personal Loan
2. Credit Card Loans
3. App Loans
4. Multiple Loans
5. Overdraft / OD

### Desktop behavior

- Display the active card prominently in the center.
- Show the neighboring cards on both sides.
- The active card should be wider than the inactive cards.
- Inactive cards should be vertically aligned and visually compressed.
- Clicking an inactive card makes it the active card.
- Add left/right navigation buttons.
- Add pagination dots below the carousel.
- The active pagination dot should clearly indicate the current slide.
- The carousel should animate smoothly when changing slides.
- The animation should feel similar to a premium Framer Motion/Webflow fintech site.
- Do not use an autoplay carousel. User interaction should control the slider.

### Important

The carousel should behave like a **slider**, not an accordion.

The selected card expands horizontally and reveals additional information. Other cards remain visible around it.

---

# Section structure

Use the following structure:

### Eyebrow

`BRING YOUR ELIGIBLE LOANS TOGETHER`

### Main heading

`Different Loans. One Lower EMI.`

### Supporting text

`Consolidate your eligible loans into a single, lower-cost EMI and take control of your finances.`

Then the interactive slider.

---

# Visual layout

The overall composition should resemble:

```text
                         BRING YOUR ELIGIBLE LOANS TOGETHER

                         Different Loans. One Lower EMI.

          Consolidate your eligible loans into a single, lower-cost EMI
                         and take control of your finances.


     ←     ┌──────────┐   ┌────────────────────────────────┐   ┌──────────┐   ┌──────────┐   →
           │ Personal │   │                                │   │   App    │   │ Multiple │
           │   Loan   │   │       ACTIVE LOAN CARD         │   │  Loans   │   │  Loans   │
           │          │   │                                │   │          │   │          │
           └──────────┘   └────────────────────────────────┘   └──────────┘   └──────────┘

                              ● ○ ○ ○ ○
```

The active card should be the visual focus.

---

# Active card design

The active card should have:

- Large rounded corners: approximately `28–32px`
- Clean white/very light background
- Subtle border
- Very soft shadow
- Slightly elevated appearance
- Large image section at the top
- Content section below the image
- Financial comparison area at the bottom

Do NOT use excessive gradients, glassmorphism, neon colors, or “AI-generated” looking visuals.

The visual language should feel like a real Indian fintech product.

---

# Images

Use realistic Indian lifestyle photography.

Avoid obviously artificial-looking AI portraits.

Each category should have a different realistic Indian customer/context.

Suggested imagery:

### Personal Loan
Indian working professional at home or office.

### Credit Card Loans
Indian professional checking credit-card bills/payment information on a smartphone.

### App Loans
Young Indian professional using a smartphone.

### Multiple Loans
Indian salaried professional reviewing multiple financial documents/EMIs.

### Overdraft / OD
Indian business owner/professional reviewing business finances.

Images should:

- Look photographic
- Have natural lighting
- Feel trustworthy
- Have a premium fintech aesthetic
- Be cropped using `object-fit: cover`
- Have rounded top corners
- Avoid excessive visual clutter

If the project already has an image asset system, reuse it instead of adding unnecessary dependencies.

---

# Loan cards

## 1. Personal Loan

Inactive title:

`Personal Loan`

Description:

`High-interest personal loans can be refinanced at lower rates.`

Icon:

Use a simple rupee/loan icon.

When active, show a realistic example:

```text
Existing Loan

Outstanding
₹4,80,000

Interest Rate
16.5%

EMI
₹15,200

↓

Potential New Rate

9.99% p.a.

Potential New EMI
₹12,400
```

Do not imply that these numbers are guaranteed. Add a subtle disclaimer such as:

`Illustrative example. Actual eligibility and rates vary.`

---

# 2. Credit Card Loans

This should be the default active slide.

Title:

`Credit Card Loans`

Description:

`Convert high-interest credit card dues into a single, lower-interest EMI.`

The image area can visually show multiple cards/dues merging into one EMI.

Example visual:

```text
HDFC Card       ₹8,200
SBI Card        ₹6,450
Axis Card       ₹7,890
ICICI Card      ₹5,600

       ↓

One EMI
₹12,500
@ 9.99% p.a.
```

Below it, show a before/after comparison.

### Before

```text
36–42% p.a.

Total EMI
₹28,140
```

### After Consolidation

```text
9.99% p.a.

New EMI
₹12,500
```

And a highlighted information block:

```text
Potential EMI difference
₹15,640 / month
```

IMPORTANT:

Do not present the ₹15,640 figure as guaranteed savings.

Use wording such as:

`Illustrative EMI difference`

or

`Example difference`

---

# 3. App Loans

Title:

`App Loans`

Description:

`Combine multiple app loans and reduce your total interest outgo.`

Example active content:

```text
Multiple App EMIs

₹4,200
₹3,800
₹5,100
₹2,900

↓

One Consolidated EMI

₹10,900*
```

Include:

`*Illustrative example. Actual terms depend on eligibility.`

---

# 4. Multiple Loans

Title:

`Multiple Loans`

Description:

`Merge multiple EMIs into one simple, affordable EMI.`

Active content:

```text
Personal Loan
₹8,500 EMI

Credit Card
₹6,200 EMI

App Loan
₹4,100 EMI

↓

One EMI

₹12,900*
```

Use a clean visual connector/merge animation.

---

# 5. Overdraft / OD

Title:

`Overdraft / OD`

Description:

`Refinance eligible OD facilities at potentially lower interest rates.`

Active content:

```text
Existing OD

Utilized Amount
₹7,50,000

Current Rate
15.5%

↓

Potential New Rate

9.99%*
```

Use the same disclaimer pattern.

---

# Slider animation

Use **Framer Motion** if the project already uses it.

If Framer Motion is already installed, do NOT introduce another animation library.

Animation requirements:

### Slide change

- Smooth horizontal movement
- Duration around `0.5–0.7s`
- Use an ease-out/ease-in-out curve
- Active card should smoothly grow/shrink
- Neighbor cards should smoothly reposition

### Active card

Inactive:

```text
scale: 0.96
opacity: 0.85
```

Active:

```text
scale: 1
opacity: 1
```

Do not make the scaling exaggerated.

---

# Desktop sizing

Use responsive dimensions rather than hard-coded viewport widths.

Suggested layout:

```css
.active-card {
  flex: 0 0 min(46vw, 620px);
}

.inactive-card {
  flex: 0 0 min(18vw, 250px);
}
```

Adjust as necessary for the existing Credit Expert India layout.

The active card should be approximately 2–2.5× wider than an inactive card.

---

# Carousel positioning

The active card should always be centered.

When the user selects:

```text
Personal Loan
```

the Personal Loan card becomes the center card.

When the user selects:

```text
Credit Card Loans
```

the Credit Card Loans card becomes the center card.

When the user selects:

```text
App Loans
```

the App Loans card becomes the center card.

And so on.

The neighboring cards should remain partially visible to communicate that more content exists.

---

# Navigation

Add circular navigation buttons:

```text
←                                      →
```

Place them approximately at the vertical center of the carousel.

Button style:

- White background
- Thin neutral border
- 44–48px diameter
- Soft shadow
- Dark icon
- Hover state
- Keyboard accessible

The buttons should not visually overpower the cards.

---

# Pagination

Below the carousel:

```text
● ○ ○ ○ ○
```

Use 5 dots.

The active dot should be visually distinct.

Clicking a dot should navigate to that slide.

---

# Touch / mobile behavior

The mobile version must be a real swipeable slider.

Requirements:

- One active card visible
- Small preview of the next/previous card
- Horizontal swipe support
- Touch-friendly controls
- No page-level horizontal overflow
- Cards should resize naturally
- Text must remain readable
- Navigation arrows can be hidden or reduced on mobile if swipe interaction is sufficient
- Pagination dots remain visible

Suggested mobile structure:

```text
        ┌─────────────────────┐
        │                     │
        │     ACTIVE CARD     │
        │                     │
        │                     │
        └─────────────────────┘

              ● ○ ○ ○ ○
```

Allow a small amount of the next card to peek from the side.

---

# Accessibility

Implement:

- Keyboard navigation
- Focus-visible states
- Proper button elements
- `aria-label` on navigation buttons
- `aria-current` for the active pagination indicator
- Meaningful image `alt` text
- Reduced-motion support

Users should be able to operate the carousel without a mouse.

---

# Performance

The section must remain lightweight.

Requirements:

- Do not load huge images unnecessarily.
- Use responsive image sizing.
- Use lazy loading for inactive images where appropriate.
- Avoid unnecessary rerenders.
- Do not create a new animation instance for every render.
- Keep carousel state local to the component.

---

# Design language for Credit Expert India

The section should match the existing Credit Expert India website.

Use:

- White / off-white background
- Deep navy/black typography
- Soft blue/green financial accents
- Subtle pastel surfaces
- Rounded corners
- Premium spacing
- Minimal borders
- Very subtle shadows

Avoid:

- Purple AI gradients
- Neon colors
- Excessive glassmorphism
- Excessive floating elements
- Generic SaaS dashboard styling
- Excessive icons
- Fake statistics
- Overly futuristic visuals

The goal is:

**Trustworthy Indian fintech + premium modern website.**

---

# Important financial-content rule

All numbers shown in the cards are examples for visualization.

Do NOT make claims such as:

- “You will save ₹15,640”
- “Everyone gets 9.99%”
- “Guaranteed lower EMI”
- “Guaranteed approval”

Instead use:

- `Illustrative example`
- `Potential new EMI`
- `Indicative rate`
- `Subject to eligibility`
- `Actual rate and EMI may vary`

---

# Suggested React component structure

If the website uses Next.js/React:

```text
components/
  EligibleLoansSlider/
    EligibleLoansSlider.tsx
    LoanSlide.tsx
    LoanNavigation.tsx
    loanData.ts
```

Or keep everything in a single component if that matches the existing architecture.

Suggested data structure:

```ts
type LoanCategory = {
  id: string;
  title: string;
  description: string;
  image: string;
  icon: React.ReactNode;
  stats?: {
    label: string;
    value: string;
  }[];
};
```

Example:

```ts
const loanCategories = [
  {
    id: "personal-loan",
    title: "Personal Loan",
    description:
      "High-interest personal loans can be refinanced at lower rates.",
    image: "/images/loans/personal-loan.jpg",
  },
  {
    id: "credit-card",
    title: "Credit Card Loans",
    description:
      "Convert high-interest credit card dues into a single, lower-interest EMI.",
    image: "/images/loans/credit-card.jpg",
  },
  {
    id: "app-loans",
    title: "App Loans",
    description:
      "Combine multiple app loans and reduce your total interest outgo.",
    image: "/images/loans/app-loans.jpg",
  },
  {
    id: "multiple-loans",
    title: "Multiple Loans",
    description:
      "Merge multiple EMIs into one simple, affordable EMI.",
    image: "/images/loans/multiple-loans.jpg",
  },
  {
    id: "overdraft",
    title: "Overdraft / OD",
    description:
      "Refinance eligible OD facilities at potentially lower interest rates.",
    image: "/images/loans/overdraft.jpg",
  },
];
```

---

# Implementation priority

Build in this order:

1. Create the section layout.
2. Create the 5 loan cards.
3. Make the active card expand.
4. Center the active card.
5. Add left/right navigation.
6. Add pagination.
7. Add smooth Framer Motion transitions.
8. Add touch/swipe support.
9. Add responsive mobile layout.
10. Add accessibility.
11. Match the existing Credit Expert India typography and spacing.
12. Test at desktop, tablet, and mobile widths.

---

# Final visual target

The finished section should communicate immediately:

**“I have different loans → I can select my loan type → I can see how consolidation could simplify my EMI.”**

The visual hierarchy should be:

```text
Section label
        ↓
Main headline
        ↓
Short explanation
        ↓
Large interactive loan slider
        ↓
Active loan → visual explanation → illustrative EMI comparison
        ↓
Pagination
```

The slider should be the hero element of this section, not a collection of ordinary cards.

Use the supplied reference image/video as the interaction and visual inspiration, but adapt the content, imagery, typography, colors, and financial messaging specifically for Credit Expert India.
