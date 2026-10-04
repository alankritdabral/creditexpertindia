1. Base background

Use a slightly cool off-white instead of pure white:

background: #f7f9fc;

Then add large blurred color blobs:

background:
  radial-gradient(
    circle at 12% 25%,
    rgba(110, 140, 255, 0.16),
    transparent 32%
  ),
  radial-gradient(
    circle at 85% 20%,
    rgba(255, 180, 220, 0.14),
    transparent 30%
  ),
  radial-gradient(
    circle at 50% 90%,
    rgba(150, 110, 255, 0.12),
    transparent 35%
  ),
  #f7f9fc;

This gives you the soft blue/purple/pink atmosphere visible in the generated design.

2. The large curved shapes

This is the part that makes the reference look interesting.

Don't use an image.

Create absolutely positioned divs:

<div class="background-shape shape-1"></div>
<div class="background-shape shape-2"></div>

Then:

.background-shape {
  position: absolute;
  pointer-events: none;
  filter: blur(1px);
}

.shape-1 {
  width: 700px;
  height: 260px;

  background: linear-gradient(
    110deg,
    rgba(100, 140, 255, 0),
    rgba(100, 140, 255, 0.35),
    rgba(180, 100, 255, 0.28),
    rgba(255, 180, 220, 0)
  );

  border-radius: 50%;
  transform: rotate(-15deg);
}

But for your website, I'd make the shape much more subtle.

Think:

             blue
          ╭────────╮
       ╭──╯        ╰──╮
      ╱                ╲
     ╱                  ╲
              purple

rather than obvious blobs.

3. The dotted texture

This is one of the most important details from the reference.

You can make it entirely with CSS.

.dot-pattern {
  background-image: radial-gradient(
    rgba(92, 70, 255, 0.25) 1px,
    transparent 1px
  );

  background-size: 8px 8px;

  mask-image: radial-gradient(
    ellipse,
    black 20%,
    transparent 70%
  );

  opacity: 0.35;
}

Then position it behind your cards:

.dot-pattern {
  position: absolute;
  width: 350px;
  height: 350px;
  right: -50px;
  bottom: -80px;
}

This produces the tiny halftone/dot cloud you see in the example.

4. Add a gradient wave

For your section, I'd actually create a large SVG rather than trying to do everything with CSS.

Something like:

This gives you the organic flowing Stripe-like background shape.

5. Then put your cards above it

Your cards should NOT have strong shadows.

Use:

.loan-card {
  background: rgba(255, 255, 255, 0.82);

  border: 1px solid rgba(20, 40, 80, 0.07);

  border-radius: 24px;

  box-shadow:
    0 20px 60px rgba(40, 50, 100, 0.07);

  backdrop-filter: blur(20px);

  overflow: hidden;
}

The backdrop-filter is important.

It allows the gradient underneath to subtly show through.

6. Your large Personal Loan card

I'd make it something like:

.personal-card {
  position: relative;
  overflow: hidden;

  background: rgba(255,255,255,.86);

  border-radius: 28px;
}

Then:

<div class="personal-card">

  <div class="gradient-wave"></div>
  <div class="dot-pattern"></div>

  <div class="content">
      ...
  </div>

  <div class="phone">
      ...
  </div>

</div>

The important thing is that the background decoration stays behind everything.

7. Create the glow behind the phone

This is another trick.

Put a huge blurred gradient behind the phone:

.phone-glow {
  position: absolute;

  width: 400px;
  height: 400px;

  background:
    radial-gradient(
      circle,
      rgba(100, 80, 255, 0.38),
      rgba(180, 100, 255, 0.18),
      transparent 70%
    );

  filter: blur(25px);
}

Then:

.phone {
  position: relative;
  z-index: 2;
}

This creates the purple light coming from behind the phone.

8. The phone itself

You don't need an actual image.

Build it with HTML/CSS.

.phone {
  width: 280px;
  height: 540px;

  border: 6px solid #0b2945;

  border-radius: 42px;

  background: #f9fafc;

  box-shadow:
    0 30px 70px rgba(20, 30, 60, 0.25);

  transform: rotate(4deg);
}

Inside:

┌──────────────────┐
│ Personal Loan    │
│                  │
│ Current EMI      │
│ ₹25,000          │
│                  │
│       ↓          │
│                  │
│ With            │
│ Consolidation   │
│ ₹18,499         │
│                  │
│ ┌──────────────┐ │
│ │ Save ₹6,501  │ │
│ └──────────────┘ │
└──────────────────┘

That will actually look better than putting a generic finance illustration there.

9. Your supporting cards

This is where I'd copy the visual philosophy of the screenshot you uploaded.

Each card gets a different background treatment.

Credit Card
.credit-card {
  background:
    radial-gradient(
      circle at 80% 90%,
      rgba(220, 120, 255, .25),
      transparent 50%
    ),
    white;
}

Add a giant tilted credit card behind the rate comparison.

App Loans

Use the orange/pink/purple gradient:

.app-loans {
  background:
    linear-gradient(
      135deg,
      rgba(255,190,130,.12),
      rgba(210,130,255,.15)
    ),
    white;
}

Then visually connect:

₹8,000 ─┐
₹5,500 ─┼──────→  ONE EMI
₹3,200 ─┘          ₹15,999

Use dotted curved SVG lines, not ordinary arrows.

Multiple Loans

Use a cooler blue/purple treatment:

.multiple-loans {
  background:
    radial-gradient(
      circle at 100% 100%,
      rgba(120,180,255,.25),
      transparent 55%
    ),
    white;
}
Overdraft

This could have a subtle bank/building line illustration in the bottom-right.

Very low opacity.

Don't make it an obvious illustration.

10. The secret to making it look like the reference

Don't make every card look identical.

Use this:

Card	Background treatment
Personal Loan	Blue + purple wave
Credit Card	Pink/purple glow
App Loans	Orange + pink wave
Multiple Loans	Blue glow
Overdraft	Purple architectural glow

But keep the same card structure.

That gives you consistency without making the section boring.

11. Color palette I'd use for Credit Expert India
:root {
  --bg: #F7F9FC;

  --navy: #092B49;
  --text: #102F4C;
  --muted: #61758D;

  --purple: #5540FF;
  --blue: #6B9CFF;

  --pink: #E58BFF;
  --orange: #FFB477;

  --green: #22B573;

  --card: rgba(255,255,255,.86);
}

The key is not using saturated purple everywhere.

Use purple only for:

CTA
important numbers
arrows
small accents

The gradients should be low opacity.

12. The overall composition

I'd structure your section like this:

                     BRING YOUR
                ELIGIBLE LOANS TOGETHER

          One simpler way to manage multiple debts.


┌──────────────────────────┬───────────────┬───────────────┐
│                          │               │               │
│      PERSONAL LOAN       │ CREDIT CARD   │  APP LOANS    │
│                          │               │               │
│  Make your monthly       │   45% → 11%   │ ₹8k ──┐       │
│  repayments more         │               │ ₹5.5k ─┼→ EMI │
│  manageable.             │      💳       │ ₹3.2k ─┘      │
│                          │               │               │
│            📱            │               │               │
│                          │               │               │
│     ₹25k → ₹18.5k       │               │               │
│                          │               │               │
└──────────────────────────┴───────────────┴───────────────┘
┌──────────────────────────┬───────────────┐
│                          │               │
│    MULTIPLE LOANS        │   OVERDRAFT   │
│                          │               │
│ ₹12.5k ─┐                │   14% →       │
│ ₹8.3k  ─┼→ ONE EMI       │   10.99%      │
│ ₹4.2k  ─┘                │               │
│                          │       🏦      │
└──────────────────────────┴───────────────┘
The important difference from your current design

Your current section is essentially:

Cards containing information.

The new version should be:

A visual system showing debt being transformed.

That's what will make it feel closer to the reference you uploaded.

If you're implementing this in Next.js + Tailwind, I would use Tailwind for the cards/layout + one reusable SVG background component + CSS radial gradients/dot patterns rather than generating the backgrounds as PNGs. That keeps the whole thing sharp, responsive, and easy to animate.