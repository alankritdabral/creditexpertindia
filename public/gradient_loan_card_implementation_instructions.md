# Gradient Loan Consolidation Card --- Implementation Instructions

## 1. Objective

Replace the current loan-consolidation UI with a **single premium
gradient card** inside the existing phone mockup.

The design should feel:

-   Premium fintech
-   Modern and minimal
-   Glassmorphic
-   Visually rich without becoming cluttered
-   Consistent with the existing Credit Expert India visual language
-   Optimized for desktop, tablet, and mobile

Do **not** make the card excessively large. The phone/mockup should
remain the primary visual element.

------------------------------------------------------------------------

## 2. Component Structure

Create or update the loan visualizer component with this hierarchy:

``` text
Phone Mockup
└── Screen
    ├── Ambient Gradient Background
    ├── Loan Header
    │   ├── Mobile/Loan Icon
    │   ├── Personal Loan
    │   ├── HDFC Bank
    │   └── Close Button
    │
    ├── Current EMI Glass Card
    │   ├── Current EMI
    │   ├── ₹25,000
    │   ├── per month
    │   ├── 16.5%
    │   └── Interest rate
    │
    ├── Transition Arrow
    │
    ├── Consolidated EMI Glass Card
    │   ├── With Consolidation
    │   ├── ₹18,499
    │   ├── per month
    │   ├── 10.99%
    │   └── Potential rate*
    │
    └── Savings Card
        ├── Savings Icon
        ├── You could save
        └── ₹6,501 every month
```

------------------------------------------------------------------------

# 3. Overall Visual Direction

Use a **deep blue → indigo → violet → cyan/teal** gradient.

Recommended background:

``` css
background:
  radial-gradient(circle at 20% 10%, rgba(80, 120, 255, 0.55), transparent 35%),
  radial-gradient(circle at 90% 35%, rgba(170, 90, 255, 0.45), transparent 35%),
  radial-gradient(circle at 70% 90%, rgba(0, 220, 190, 0.45), transparent 40%),
  linear-gradient(145deg, #315FEA 0%, #273BBA 42%, #6A3DDB 70%, #12CFC0 115%);
```

The gradient should remain subtle behind the cards.

Avoid:

-   Heavy texture
-   Excessive particles
-   Strong noise
-   Large illustrations
-   Excessive shadows
-   Too many decorative elements

------------------------------------------------------------------------

# 4. Phone Screen

The phone screen should have:

``` css
border-radius: 42px;
overflow: hidden;
position: relative;
```

Add a subtle inner glow:

``` css
box-shadow:
  inset 0 0 0 1px rgba(255,255,255,0.28),
  inset 0 0 50px rgba(255,255,255,0.08);
```

The background should feel luminous rather than flat.

Add very subtle diagonal light streaks using pseudo-elements.

Example:

``` css
.phone-screen::before {
  content: "";
  position: absolute;
  inset: -20%;
  background: linear-gradient(
    135deg,
    transparent 35%,
    rgba(255,255,255,0.08) 48%,
    transparent 60%
  );
  transform: rotate(-8deg);
  pointer-events: none;
}
```

------------------------------------------------------------------------

# 5. Header

### Layout

Use a horizontal flex layout:

``` text
[ Loan Icon ] Personal Loan                 [ × ]
              HDFC Bank
```

### Styling

Loan icon:

-   42--48px container
-   White translucent background
-   Blue/violet icon
-   Rounded corners: 14--16px

Title:

``` text
Personal Loan
```

-   18--20px
-   Font weight: 600--700
-   White

Bank:

``` text
HDFC Bank
```

-   12--14px
-   White with \~70% opacity

Close button:

-   40--44px
-   Circular
-   White translucent background
-   Thin white border
-   `×` icon

------------------------------------------------------------------------

# 6. Current EMI Card

Use a translucent glass card.

### Background

``` css
background: rgba(255,255,255,0.12);
backdrop-filter: blur(18px);
-webkit-backdrop-filter: blur(18px);
border: 1px solid rgba(255,255,255,0.24);
```

### Border radius

``` css
border-radius: 26px;
```

### Content

Top:

``` text
Current EMI
```

Then:

``` text
₹25,000
```

Large amount:

-   36--44px on desktop phone mockup
-   Bold
-   White

Below:

``` text
per month
```

Use 13--14px with approximately 70% white opacity.

------------------------------------------------------------------------

# 7. Interest Rate Badge

Place the interest rate on the right side of the EMI amount.

``` text
16.5%
Interest rate
```

Badge:

``` css
background: rgba(255, 120, 145, 0.28);
border: 1px solid rgba(255, 170, 185, 0.35);
color: #FF6B82;
```

Recommended badge radius:

``` css
border-radius: 12px;
```

The percentage should be visually prominent.

------------------------------------------------------------------------

# 8. Transition Arrow

Between the two cards place a circular arrow.

Structure:

``` text
       ↓
```

Use a floating circular glass button.

``` css
width: 56px;
height: 56px;
border-radius: 999px;

background: rgba(255,255,255,0.85);
box-shadow:
  0 8px 30px rgba(30,40,180,0.25),
  0 0 30px rgba(120,150,255,0.25);
```

Arrow:

-   Indigo/blue
-   22--24px
-   Medium stroke

Position the circle so it slightly overlaps both cards.

------------------------------------------------------------------------

# 9. Consolidation Card

This is the most important card.

Label:

``` text
With Consolidation
```

Use bright blue/white depending on the background.

Main amount:

``` text
₹18,499
```

Make it slightly more visually prominent than the current EMI.

Below:

``` text
per month
```

Rate badge:

``` text
10.99%
Potential rate*
```

Use a green/teal treatment.

Recommended colors:

``` css
background: rgba(100, 240, 190, 0.22);
color: #B7FFE2;
```

For the percentage text:

``` css
color: #087D5A;
```

If the card background is dark, use a brighter green:

``` css
color: #66F0BD;
```

------------------------------------------------------------------------

# 10. Savings Card

This should be the visual payoff.

Content:

``` text
[ chart icon ]

You could save
₹6,501 every month
```

Use a stronger glass effect than the other cards.

Recommended background:

``` css
background:
  linear-gradient(
    135deg,
    rgba(0, 255, 200, 0.30),
    rgba(50, 120, 255, 0.24)
  );
```

Border:

``` css
border: 1px solid rgba(120,255,220,0.45);
```

Shadow:

``` css
box-shadow:
  0 15px 45px rgba(0, 220, 190, 0.18),
  inset 0 1px 0 rgba(255,255,255,0.20);
```

### Savings amount

``` text
₹6,501 every month
```

This should be the strongest typographic element inside the savings
card.

Recommended:

-   22--28px
-   Font weight 700
-   White

------------------------------------------------------------------------

# 11. Typography

Use the existing project font if already configured.

Preferred fallback:

``` css
font-family:
  Inter,
  -apple-system,
  BlinkMacSystemFont,
  "Segoe UI",
  sans-serif;
```

Hierarchy:

  Element                    Size     Weight
  -------------------- ---------- ----------
  Personal Loan          18--20px   600--700
  HDFC Bank              12--14px   400--500
  Current EMI            14--16px        500
  ₹25,000                36--44px        700
  16.5%                  16--18px        700
  With Consolidation     14--16px        600
  ₹18,499                36--44px        700
  10.99%                 16--18px        700
  You could save         13--15px        500
  ₹6,501 every month     22--28px        700

------------------------------------------------------------------------

# 12. Recommended Color System

``` css
--navy: #101A45;
--blue: #315FEA;
--indigo: #4D46D9;
--violet: #7444E8;
--cyan: #20D9D0;
--teal: #13CBAF;

--white: #FFFFFF;
--white-muted: rgba(255,255,255,0.72);

--danger: #FF627C;
--danger-bg: rgba(255,100,130,0.25);

--success: #65E8B5;
--success-dark: #087D5A;
--success-bg: rgba(100,240,190,0.22);
```

------------------------------------------------------------------------

# 13. Framer Motion Animation

Use Framer Motion for a subtle entrance.

### Initial state

``` tsx
{
  opacity: 0,
  y: 20,
  scale: 0.97
}
```

### Animate

``` tsx
{
  opacity: 1,
  y: 0,
  scale: 1
}
```

Duration:

``` tsx
0.6
```

Easing:

``` tsx
[0.22, 1, 0.36, 1]
```

Animate the elements sequentially:

1.  Header
2.  Current EMI
3.  Arrow
4.  Consolidation card
5.  Savings card

Use approximately:

``` text
Header       0.00s
Current EMI  0.10s
Arrow        0.25s
Consolidation 0.35s
Savings      0.50s
```

------------------------------------------------------------------------

# 14. Savings Number Animation

Animate:

``` text
₹0
→
₹6,501
```

Use a number counter.

The animation should finish in approximately:

``` text
800–1000ms
```

Do not continuously animate the number.

------------------------------------------------------------------------

# 15. Gradient Animation

The background gradient can very slowly move.

Example:

``` css
@keyframes gradientMove {
  0% {
    background-position: 0% 50%;
  }

  50% {
    background-position: 100% 50%;
  }

  100% {
    background-position: 0% 50%;
  }
}
```

Use:

``` css
animation: gradientMove 12s ease-in-out infinite;
```

Keep the movement extremely subtle.

------------------------------------------------------------------------

# 16. Responsive Behaviour

## Desktop

The phone should remain visually dominant.

Do not stretch the internal cards excessively.

Recommended:

``` text
Phone width: 320–420px
Card horizontal padding: 20–28px
```

## Tablet

Reduce:

``` text
Typography by ~5–10%
Card padding by ~10%
```

## Mobile

The entire phone/mockup can scale down proportionally.

Do not redesign the card into a completely different layout.

Maintain:

``` text
Current EMI
      ↓
Consolidation
      ↓
Savings
```

------------------------------------------------------------------------

# 17. Important Design Rules

### Do

-   Use large numbers
-   Keep copy short
-   Use strong visual hierarchy
-   Use glassmorphism
-   Use subtle glow
-   Use rounded corners
-   Keep plenty of breathing room
-   Make ₹18,499 and ₹6,501 visually important
-   Keep the current EMI visually secondary

### Do not

-   Add unnecessary paragraphs
-   Add CTA buttons inside the card
-   Add multiple charts
-   Add excessive icons
-   Add a large HDFC logo
-   Add shadows that look like floating cards outside the phone
-   Use more than 3--4 major colors
-   Make the notification/card larger than the phone itself

------------------------------------------------------------------------

# 18. Accessibility

Maintain sufficient contrast for:

-   `₹25,000`
-   `₹18,499`
-   `₹6,501`
-   `16.5%`
-   `10.99%`

Do not rely only on red/green to communicate the difference.

Use labels:

``` text
Current EMI
With Consolidation
Interest rate
Potential rate*
```

------------------------------------------------------------------------

# 19. Component Recommendation

Keep the implementation modular:

``` text
components/
└── LoanVisualizer/
    ├── LoanVisualizer.tsx
    ├── LoanHeader.tsx
    ├── CurrentLoanCard.tsx
    ├── ConsolidatedLoanCard.tsx
    ├── SavingsCard.tsx
    └── loanVisualizer.css
```

If the project already has a single component for this UI, avoid
unnecessary restructuring. Modify the existing component instead.

------------------------------------------------------------------------

# 20. Final Target

The final result should visually communicate this transformation within
a few seconds:

``` text
₹25,000 / month
16.5%
       ↓
₹18,499 / month
10.99%
       ↓
Save ₹6,501 every month
```

The overall impression should be:

**Premium + trustworthy + modern Indian fintech + minimal + high visual
impact.**

The gradient should support the information, not overpower it.
