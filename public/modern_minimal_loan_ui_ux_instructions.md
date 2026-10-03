# UI/UX Instructions — Modern Minimal Loan Card

## Goal

Redesign the existing loan comparison UI to closely match **Option 4 — Modern Minimal** from the reference image.

The result should feel like a premium fintech/mobile banking interface: dark, elegant, spacious, minimal, highly readable, and conversion-focused.

**Important:** This document covers **UI/UX only**. Do not change business logic, calculations, API behavior, routing, data structures, or functionality.

---

## 1. Overall Design Direction

Use these principles:

- Premium fintech aesthetic
- Minimal visual hierarchy
- Dark navy / indigo background
- Very subtle purple-blue gradients
- Large numbers
- Short labels
- Strong spacing
- Soft glassmorphism, but NOT excessive transparency
- Rounded cards with smooth borders
- Small, purposeful icons
- No unnecessary decorative elements
- No large illustrations
- No charts inside the main comparison area
- No excessive text

The interface should communicate:

> **You currently pay more → consolidation can reduce your EMI → potential monthly savings**

within a few seconds.

---

# 2. Mobile Layout

Target the component primarily for a smartphone viewport.

Recommended content width:

```text
320px – 390px
```

Use:

```css
padding-inline: 16px;
```

Main vertical spacing:

```text
Header → 24px
Header → Current EMI card: 24–28px
Current card → connector: 16–20px
Connector → New EMI card: 16–20px
New EMI card → Savings card: 16–20px
```

Do not make the UI feel crowded.

---

# 3. Background

Use a very dark navy background.

Suggested base:

```text
#07142E
```

Optional subtle gradient:

```text
linear-gradient(
  180deg,
  #08152F 0%,
  #0A1740 55%,
  #10184A 100%
)
```

Add a very subtle radial glow behind the cards:

```text
radial-gradient(
  circle at 70% 25%,
  rgba(91, 73, 220, 0.20),
  transparent 45%
)
```

Keep the glow subtle.

The background must remain visually quiet so the cards and numbers dominate.

---

# 4. Header

Create a compact header.

### Layout

```text
[ Back ]   [ Bank Logo ] Personal Loan
                         HDFC Bank       [ X ]
```

Use:

- Back button: 36–40px
- Bank logo: approximately 36px
- Title: 17–19px
- Bank name: 13–14px
- Close button: 36–40px

### Typography

Title:

```text
Personal Loan
```

Weight:

```text
600–700
```

Bank:

```text
HDFC Bank
```

Weight:

```text
400–500
```

Color:

```text
rgba(255,255,255,0.65)
```

Do not make the header oversized.

---

# 5. Current EMI Card

This is the first major card.

### Structure

```text
┌─────────────────────────────────────┐
│                                     │
│  [icon]  Current EMI                │
│                                     │
│  ₹25,000                   [16.5%]  │
│  per month                 interest │
│                            rate     │
│                                     │
└─────────────────────────────────────┘
```

### Card

Use:

```text
border-radius: 24px;
```

Background:

```text
rgba(255,255,255,0.055)
```

Border:

```text
1px solid rgba(255,255,255,0.14)
```

Add a very subtle inner highlight.

Avoid strong glass blur.

---

## Current EMI Label

Use:

```text
Current EMI
```

Font size:

```text
15–16px
```

Color:

```text
rgba(255,255,255,0.72)
```

Place a small financial/card icon to the left.

---

## Current EMI Number

Use:

```text
₹25,000
```

Font size:

```text
34–40px
```

Font weight:

```text
600–700
```

Color:

```text
#FFFFFF
```

Do NOT make the rupee symbol dramatically smaller.

Keep the entire value visually unified.

---

## Current EMI Supporting Text

```text
per month
```

Font:

```text
14–15px
```

Color:

```text
rgba(255,255,255,0.55)
```

---

# 6. Interest Rate Badge

Place the rate badge on the right side of the Current EMI card.

Content:

```text
16.5%
interest rate
```

Use a muted red/pink accent.

Suggested:

```text
background: rgba(244, 92, 133, 0.12);
border: 1px solid rgba(244, 92, 133, 0.45);
color: #FF7F9D;
```

Border radius:

```text
14px
```

Keep it compact.

Do not make it look like a primary CTA.

---

# 7. Connector / Transition

Between the two EMI cards, create a minimal transition.

Do NOT use a large circular arrow.

Use a thin vertical dotted/dashed line.

Example:

```text
Current EMI
    │
    │
   ↓
    │
    │
New EMI
```

The arrow can sit inside a small glowing circular element.

Recommended:

```text
40–44px
```

Circle background:

```text
rgba(75, 110, 255, 0.22)
```

Border:

```text
1px solid rgba(120,150,255,0.35)
```

Arrow:

```text
↓
```

Keep the connector visually subtle.

---

# 8. New EMI Card

Use the same structural language as the Current EMI card.

Title:

```text
New EMI
```

or, if the existing product terminology requires it:

```text
With Consolidation
```

Prefer:

```text
New EMI
```

because it is shorter and easier to scan.

Main number:

```text
₹18,499
```

Supporting text:

```text
per month
```

Interest badge:

```text
10.99%
interest rate
```

---

# 9. New EMI Card Accent

The second card should visually communicate improvement without becoming flashy.

Use a dark teal/green accent.

Suggested:

```text
background: rgba(25, 210, 175, 0.10);
border: 1px solid rgba(25, 210, 175, 0.40);
color: #45E0C1;
```

Do not use bright neon green.

The green should feel like a premium financial-success accent.

---

# 10. Savings Card

This is the strongest visual element.

Use:

```text
You could save
₹6,501
every month
```

### Recommended hierarchy

```text
You could save

₹6,501

every month
```

Make:

```text
₹6,501
```

the largest element in this card.

Recommended:

```text
32–38px
```

Weight:

```text
650–700
```

---

# 11. Savings Card Design

Use a slightly brighter gradient than the EMI cards.

Suggested:

```text
linear-gradient(
  135deg,
  rgba(25, 215, 190, 0.22),
  rgba(67, 95, 255, 0.25)
)
```

Border:

```text
1px solid rgba(70, 220, 210, 0.45)
```

Border radius:

```text
24px
```

The card should feel like the natural conclusion of the comparison.

---

# 12. Savings Icon

Use a simple circular check icon.

Example:

```text
✓
```

Inside:

```text
44–50px
```

circle.

Use:

```text
background: rgba(65, 220, 190, 0.18)
```

Border:

```text
1px solid rgba(100,230,210,0.40)
```

The icon should communicate:

```text
benefit achieved
```

without looking like a success alert.

---

# 13. Savings Card Layout

Recommended:

```text
┌─────────────────────────────────────┐
│                                     │
│  [✓]     You could save             │
│          ₹6,501                     │
│          every month                │
│                                     │
└─────────────────────────────────────┘
```

Do not center everything.

Use left alignment.

This gives the component a more premium editorial feel.

---

# 14. Typography

Use a modern sans-serif.

Preferred:

```text
Inter
```

or:

```text
Geist
```

or:

```text
SF Pro Display
```

Hierarchy:

### Header

```text
19px / 600
13px / 400
```

### Card label

```text
15–16px / 500
```

### EMI

```text
36–40px / 650–700
```

### Supporting text

```text
14–15px / 400
```

### Rate badge

```text
15–16px / 600
11–12px / 500
```

### Savings

```text
34–38px / 700
```

Avoid too many font sizes.

---

# 15. Color System

### Background

```text
#07142E
```

### Primary text

```text
#FFFFFF
```

### Secondary text

```text
rgba(255,255,255,0.62)
```

### Muted text

```text
rgba(255,255,255,0.42)
```

### Purple accent

```text
#6757E8
```

### Blue accent

```text
#5278FF
```

### Positive teal

```text
#45E0C1
```

### Current-rate pink

```text
#FF7F9D
```

---

# 16. Border Radius

Use a consistent radius system.

```text
Small buttons: 12–14px
Badges: 12–14px
Main cards: 22–26px
Circular controls: 50%
```

Do not use different random radii.

---

# 17. Shadows

Use very soft shadows.

Example:

```css
box-shadow:
  0 20px 50px rgba(0,0,0,0.22);
```

Avoid:

```text
hard black shadows
strong neon glow
heavy drop shadows
```

The interface should feel expensive, not flashy.

---

# 18. Glassmorphism Rules

Use glassmorphism only as a supporting visual language.

Use:

```text
background: rgba(255,255,255,0.05)
border: 1px solid rgba(255,255,255,0.12)
backdrop-filter: blur(16px)
```

Do NOT make every element transparent.

The cards should still have enough opacity to remain readable.

---

# 19. Remove From Current Design

Remove or reduce:

- Large arrow circle
- Oversized phone-like UI framing
- Excessive purple gradients
- Excessive blur
- Large decorative icons
- Large empty header icon containers
- Too many borders
- Too many nested cards
- Excessive text
- Redundant “Potential rate” wording
- Decorative charts
- Decorative illustrations
- Large shadows

The new version should be approximately **20–30% visually simpler**.

---

# 20. Content Improvements

### Current

```text
Current EMI
₹25,000
per month

16.5%
Interest rate
```

Keep this.

### New

Instead of:

```text
With Consolidation
₹18,499
per month
```

Use:

```text
New EMI
₹18,499
per month
```

Rate:

```text
10.99%
interest rate
```

### Savings

Use:

```text
You could save
₹6,501
every month
```

Avoid:

```text
Potential Savings
Estimated Monthly Benefit
Potential Savings Amount
```

unless legally/business-required.

---

# 21. Visual Hierarchy

The eye should move in this order:

```text
Personal Loan
      ↓
₹25,000
      ↓
16.5%
      ↓
transition
      ↓
₹18,499
      ↓
10.99%
      ↓
₹6,501 saved
```

The savings figure is the final visual anchor.

---

# 22. Animation

Keep animations extremely subtle.

### Card entrance

```text
opacity: 0 → 1
translateY: 12px → 0
```

Duration:

```text
400–500ms
```

### Transition arrow

Small fade/slide animation.

### Savings number

Optional count-up:

```text
₹0 → ₹6,501
```

Duration:

```text
700–900ms
```

Use easing:

```text
easeOut
```

Do not use bouncing animations.

---

# 23. Responsive Behavior

### Mobile

Single-column layout:

```text
Header
↓
Current EMI
↓
Connector
↓
New EMI
↓
Savings
```

### Tablet

Increase horizontal margins.

Cards can remain single-column.

### Desktop

If displayed inside a larger desktop section, keep the phone/card component visually compact rather than stretching it across the entire viewport.

Recommended maximum component width:

```text
420px
```

Do not stretch the mobile UI to 100% desktop width.

---

# 24. Accessibility

Maintain:

- High text contrast
- Minimum 44px interactive controls
- Visible focus states
- Semantic buttons
- Accessible labels for icons
- Do not communicate meaning through color alone

For example:

```text
16.5% interest rate
```

should remain text, not only a red color.

---

# 25. Final Visual Target

The final UI should look like:

```text
┌─────────────────────────────┐
│ ←  [Bank] Personal Loan  ×  │
│       HDFC Bank              │
│                             │
│ ┌─────────────────────────┐ │
│ │ ▣  Current EMI          │ │
│ │                         │ │
│ │ ₹25,000        16.5%   │ │
│ │ per month       rate    │ │
│ └─────────────────────────┘ │
│              │              │
│              ↓              │
│              │              │
│ ┌─────────────────────────┐ │
│ │ ▣  New EMI              │ │
│ │                         │ │
│ │ ₹18,499        10.99%  │ │
│ │ per month       rate    │ │
│ └─────────────────────────┘ │
│                             │
│ ┌─────────────────────────┐ │
│ │ ✓  You could save       │ │
│ │                         │ │
│ │    ₹6,501               │ │
│ │    every month          │ │
│ └─────────────────────────┘ │
└─────────────────────────────┘
```

## Final Rule

**Do not copy the reference literally.**

Match its:

- visual hierarchy
- spacing
- minimalism
- dark premium fintech aesthetic
- card proportions
- typography hierarchy
- subtle gradients
- compact rate badges
- strong savings CTA

while keeping the existing application's functionality and data unchanged.
