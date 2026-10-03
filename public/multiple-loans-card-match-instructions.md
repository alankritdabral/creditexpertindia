# Make Image 2 Match Image 1 — Multiple Loans Card

## Goal

Transform the **second card** so it visually matches the **first reference card** as closely as possible while keeping the existing content and functionality.

Use the first image as the **visual source of truth**.

The final card should feel like the same component, not a redesigned variation.

---

# 1. Overall Card Shape

### Current Image 2
- Large white rounded rectangle.
- Very clean/plain background.
- Large empty space in the middle.
- Content is positioned too low.
- Bottom corners are heavily rounded.

### Target Image 1
Change the card to:

- Approximate aspect ratio: **364 × 512 px**
- Outer corner radius: **18–20 px**
- Very light cool/lavender background rather than pure white.
- Add a subtle inner/outer border.
- Add a very soft blue/lavender ambient glow.
- Keep the overall card compact and vertically balanced.

### Background

Use a very subtle gradient:

```css
background:
  radial-gradient(
    circle at 100% 100%,
    rgba(112, 84, 255, 0.18),
    transparent 38%
  ),
  radial-gradient(
    circle at 100% 45%,
    rgba(95, 190, 255, 0.10),
    transparent 35%
  ),
  linear-gradient(
    145deg,
    #f8f9ff 0%,
    #ffffff 48%,
    #f4f6ff 100%
  );
```

Do **not** make the background strongly purple.

The effect should be subtle and premium.

---

# 2. Card Padding

Target approximately:

```text
Top:    27–30 px
Left:   28–30 px
Right:  24–28 px
Bottom: 25–30 px
```

The first image has noticeably tighter horizontal spacing than Image 2.

Do not leave a huge empty area between the quote and the loan rows.

---

# 3. Header

The header should closely match the first image.

### Layout

```text
[icon]  Multiple Loans                              [↗]
```

Use:

```css
display: flex;
align-items: center;
justify-content: space-between;
```

### Left Icon

Replace the current tiny generic icon with a **blue outlined stacked-card / multiple-loans icon**.

Target:

- Size: **25–28 px**
- Stroke: **2 px**
- Primary color: `#4C3CFF`
- Very subtle light-blue glow/background if needed.
- No filled dark icon.

The icon should visually resemble:

```text
┌──────┐
│ ┌──────┐
│ └──────┘
└──────┘
```

### "Multiple Loans"

Target:

```css
font-size: 16px;
font-weight: 600;
line-height: 1.2;
color: #111936;
```

The text should be slightly larger and bolder than Image 2.

---

# 4. Top-Right Arrow Button

Image 2 currently has a circular button.

Change it to match Image 1:

### Target

- Approx. **40 × 40 px**
- Very light lavender background.
- Rounded rectangle, approximately **7–9 px radius**
- Blue/purple arrow.
- Arrow points diagonally up-right.

Example:

```css
width: 40px;
height: 40px;
border-radius: 8px;
background: rgba(243, 244, 255, 0.95);
color: #5140ff;
```

Do NOT use a circular button.

---

# 5. Main Headline

This is one of the most important changes.

### Current

Image 2:

> Replace multiple payments  
> with one simpler repayment.

The text is too small and too horizontal.

### Target

Use approximately the same line breaks as Image 1:

```text
Replace multiple
payments with one
simpler repayment.
```

### Typography

```css
font-size: 27–29px;
font-weight: 600–650;
line-height: 1.15–1.2;
letter-spacing: -0.7px;
color: #101936;
```

On a 364px-wide card, the headline should occupy approximately:

```text
2–3 lines
```

Do not force the headline into only 2 lines.

The third line is important to reproduce the visual rhythm of Image 1.

### Spacing

Place the headline approximately:

```text
24–28 px below the header
```

---

# 6. Quote Section

Move the quote upward so it sits directly below the headline.

### Target layout

```text
│  "I had four different payments
│   to keep track of every month..."
```

### Left Accent Line

Image 1 has a stronger purple vertical line.

Use:

```css
width: 2px;
background: #5A45FF;
border-radius: 999px;
```

Height:

```text
45–50 px
```

### Quote Typography

```css
font-size: 16px;
font-style: italic;
line-height: 1.35;
color: #68729a;
```

The quote should be slightly darker and more prominent than Image 2.

### Spacing

```text
Headline → quote: 10–14 px
Quote → loan visualization: 20–25 px
```

---

# 7. Loan List Position

This is a major structural difference.

### Current Image 2

The loan rows start much too low.

There is a large empty area between the quote and the loan visualization.

### Target Image 1

The loan rows begin approximately around the lower-middle of the card.

Move the entire visualization **up by approximately 50–70 px** relative to Image 2.

The loan list should sit around:

```text
55–65% of the card height
```

instead of near the very bottom.

---

# 8. Loan Rows

The four rows should visually resemble Image 1.

### Target dimensions

Approximately:

```text
Width: 158–165 px
Height: 48–50 px
Gap: 5–7 px
```

Image 2's rows are too narrow and too visually plain.

### Card Style

Use:

```css
background: rgba(255,255,255,0.94);
border-radius: 10–12px;
box-shadow:
  0 4px 14px rgba(42, 54, 100, 0.08),
  0 1px 3px rgba(42, 54, 100, 0.05);
```

Add a very subtle border:

```css
border: 1px solid rgba(225, 229, 244, 0.75);
```

The rows should appear like soft floating cards.

---

# 9. Loan Row Internal Layout

Each row should have:

```text
[icon]     ₹12,500
           Personal Loan
```

### Icon Container

Target:

```text
32–34 px
```

Use a soft white/light-lavender circular or rounded icon container.

The icon itself should use a **consistent blue/purple visual language**.

Avoid the current four different green/orange/purple icon colors.

### Important

All loan icons should share the same primary visual color:

```css
#5140FF
```

or a closely related blue-purple.

This is important because Image 1 has a unified visual system.

---

# 10. Loan Text

### Amount

Example:

```text
₹12,500
```

Use:

```css
font-size: 13–14px;
font-weight: 700;
color: #18203d;
```

### Loan Type

Example:

```text
Personal Loan
```

Use:

```css
font-size: 11–12px;
font-weight: 400–500;
color: #7a83a3;
```

The amount and label should be vertically stacked.

Do not make the label bold.

---

# 11. Loan Data

Keep the existing values exactly:

```text
₹12,500   Personal Loan
₹8,300    Credit Card
₹4,200    Consumer Loan
₹3,800    Other Loan
```

Do not change the numbers.

---

# 12. Connector Lines

This is another major difference.

Image 2 has connector lines, but they are too visually dominant and too centered.

Recreate the first image's visual:

```text
Loan 1  ──╮
Loan 2  ──┤
Loan 3  ──┤──────> ONE EMI
Loan 4  ──╯
```

### Style

Use dotted/dashed curved paths.

```css
stroke: #9EB4FF;
stroke-width: 1.5–2px;
stroke-dasharray: 3 5;
fill: none;
```

Use SVG paths or Framer Motion SVG paths.

### Important

The paths should curve naturally toward the EMI box.

Do NOT use straight horizontal lines.

The first image has a soft flowing convergence effect.

---

# 13. Connector Position

The connector lines should begin from approximately the **right edge of each loan card**.

They should converge toward the **left side of the ONE EMI card**.

The four paths should remain individually visible.

Avoid making all paths overlap too early.

---

# 14. ONE EMI Card

The current Image 2 EMI card is too low and slightly too dominant.

Move it upward and slightly closer to the loan rows.

### Target size

Approximately:

```text
Width: 113–120 px
Height: 105–115 px
```

### Position

It should sit approximately:

```text
Vertically aligned with the middle two loan cards
```

rather than near the bottom edge.

### Background

Use a rich blue-purple gradient:

```css
background: linear-gradient(
  145deg,
  #5B3FFF 0%,
  #4330F5 55%,
  #643DFF 100%
);
```

### Border Radius

```css
border-radius: 12–14px;
```

### Shadow

```css
box-shadow:
  0 12px 28px rgba(78, 58, 245, 0.22);
```

---

# 15. ONE EMI Typography

Use this hierarchy:

```text
ONE EMI

₹24,999

per month
```

### ONE EMI

```css
font-size: 12px;
font-weight: 400–500;
color: rgba(255,255,255,0.72);
```

### Amount

```css
font-size: 20–22px;
font-weight: 700;
color: #ffffff;
```

### per month

```css
font-size: 12px;
color: rgba(255,255,255,0.75);
```

The amount should be the strongest element.

---

# 16. Bottom-Right Decorative Gradient

Image 1 has a subtle blue/purple decorative atmosphere in the lower-right corner.

Add:

```css
position: absolute;
right: -30px;
bottom: -30px;
width: 180px;
height: 180px;
background:
  radial-gradient(
    circle,
    rgba(117, 94, 255, 0.24),
    rgba(117, 94, 255, 0) 70%
  );
filter: blur(10px);
pointer-events: none;
```

Then optionally add a very subtle dotted/noise texture.

Keep it extremely subtle.

---

# 17. Right-Side Blue Shape

Image 1 contains a soft diagonal/light-blue decorative shape behind the visualization.

Add a subtle abstract SVG or CSS shape:

```text
             /
            /
           /
          /
```

It should enter from the right side around the middle/lower half.

Use:

```css
background: rgba(116, 195, 255, 0.08);
```

Blur it slightly.

It should **not** interfere with readability.

---

# 18. Overall Spacing Blueprint

Use this approximate vertical structure:

```text
┌──────────────────────────────────┐
│                                  │
│  [icon] Multiple Loans      [↗] │  ← 28px
│                                  │
│  Replace multiple                │
│  payments with one               │
│  simpler repayment.              │
│                                  │
│  │ "I had four different         │
│  │   payments to keep track..."  │
│                                  │
│                                  │
│  ┌──────────────┐                │
│  │ ₹12,500      │      ╭──────┐  │
│  │ Personal...  │──────│      │  │
│  └──────────────┘      │ ONE  │  │
│  ┌──────────────┐──────│ EMI  │  │
│  │ ₹8,300       │      │₹24,999│ │
│  │ Credit Card  │──────│      │  │
│  └──────────────┘      ╰──────┘  │
│  ┌──────────────┐                │
│  │ ₹4,200       │─────────────── │
│  │ Consumer...  │                │
│  └──────────────┘                │
│  ┌──────────────┐                │
│  │ ₹3,800       │─────────────── │
│  │ Other Loan   │                │
│  └──────────────┘                │
│                                  │
└──────────────────────────────────┘
```

The exact positions can be tuned, but the **visual hierarchy and proportions must follow Image 1**.

---

# 19. Typography System

Use a modern geometric/sans-serif font similar to the reference.

Recommended:

```css
font-family:
  Inter,
  ui-sans-serif,
  system-ui,
  -apple-system,
  BlinkMacSystemFont,
  "Segoe UI",
  sans-serif;
```

### Hierarchy

| Element | Size | Weight |
|---|---:|---:|
| Headline | 27–29px | 600–650 |
| Header | 16px | 600 |
| Quote | 16px | 400 italic |
| Loan amount | 13–14px | 700 |
| Loan type | 11–12px | 400–500 |
| ONE EMI | 12px | 500 |
| EMI amount | 20–22px | 700 |
| Per month | 12px | 400 |

---

# 20. Color Palette

Use a unified palette:

```text
Primary Purple:       #5140FF
Deep Purple:         #4330F5
Dark Navy Text:      #111936
Secondary Text:      #6F7898
Light Border:        #E5E8F3
Card White:          #FFFFFF
Soft Blue:           #9EB4FF
Soft Lavender:       #F3F4FF
Background:          #F7F8FF
```

Avoid the green, orange, and cyan icon colors currently visible in Image 2.

The first image uses a much more unified blue/purple aesthetic.

---

# 21. Shadow System

Avoid heavy shadows.

### Loan cards

```css
box-shadow:
  0 4px 14px rgba(35, 48, 90, 0.07),
  0 1px 3px rgba(35, 48, 90, 0.04);
```

### EMI card

```css
box-shadow:
  0 12px 30px rgba(74, 55, 245, 0.22);
```

### Main card

```css
box-shadow:
  0 8px 30px rgba(40, 50, 100, 0.06);
```

Keep the design soft and premium.

---

# 22. What Must Change From Image 2

Implement these changes specifically:

- [ ] Make the card narrower/taller like Image 1.
- [ ] Reduce the excessive empty vertical space.
- [ ] Add subtle lavender/blue background gradients.
- [ ] Replace circular top-right button with rounded-square button.
- [ ] Make the header icon larger and blue/purple.
- [ ] Increase headline size.
- [ ] Force headline into approximately 3 lines.
- [ ] Move quote closer to headline.
- [ ] Make quote slightly larger.
- [ ] Strengthen the purple quote accent line.
- [ ] Move loan visualization upward.
- [ ] Make loan cards slightly wider.
- [ ] Make loan cards more polished/floating.
- [ ] Unify all loan icons into blue/purple.
- [ ] Improve loan typography hierarchy.
- [ ] Use softer dotted curved connector paths.
- [ ] Move ONE EMI box upward.
- [ ] Make ONE EMI box slightly smaller and more like the reference.
- [ ] Use blue-purple gradient on ONE EMI box.
- [ ] Add subtle bottom-right glow.
- [ ] Add subtle right-side blue decorative shape.
- [ ] Preserve all existing text and values.
- [ ] Preserve responsiveness.
- [ ] Do not introduce unnecessary UI elements.

---

# 23. Responsive Behavior

Do not simply scale the desktop card down.

### Desktop

Use the reference proportions directly.

### Tablet

Reduce:

```text
headline: 24–26px
card padding: 22–25px
loan card width: ~145–155px
EMI card width: ~105–115px
```

### Mobile

Maintain the same visual hierarchy:

```text
Header
↓
Headline
↓
Quote
↓
Loan visualization
```

Do not allow the loan cards and EMI card to overlap.

The visualization can scale proportionally, but the relationship between the four loans and ONE EMI must remain intact.

---

# 24. Animation

If the existing component already uses Framer Motion, preserve it.

Use subtle animations only.

### Loan cards

Staggered entrance:

```text
0ms
80ms
160ms
240ms
```

### Connector paths

Animate SVG path drawing:

```text
pathLength: 0 → 1
```

### ONE EMI card

Use a subtle:

```text
opacity: 0 → 1
scale: 0.96 → 1
```

Do NOT use large bouncing animations.

The reference is premium and minimal.

---

# 25. Implementation Priority

If you are modifying an existing component, do the work in this order:

## Step 1 — Card geometry

Fix:

- Width
- Height
- Border radius
- Padding
- Background

## Step 2 — Typography

Fix:

- Header
- Headline
- Quote
- Loan text
- EMI text

## Step 3 — Layout

Fix:

- Header position
- Headline position
- Quote position
- Loan list position
- EMI position

## Step 4 — Visual styling

Fix:

- Icons
- Shadows
- Borders
- Gradients
- Quote accent

## Step 5 — Connector system

Fix:

- SVG paths
- Curve geometry
- Dashes
- Convergence

## Step 6 — Decorative background

Add:

- Bottom-right glow
- Right-side blue shape
- Optional subtle dots

## Step 7 — Responsive

Verify:

- Desktop
- Tablet
- Mobile

---

# 26. Final Acceptance Criteria

The implementation is complete only when:

1. The second card immediately looks like the first card.
2. The card proportions match the reference.
3. The headline has approximately the same line wrapping.
4. The quote sits directly below the headline.
5. The loan visualization is significantly higher than the current version.
6. The four loan cards have soft floating-card styling.
7. The connector lines are curved, dotted, and subtle.
8. The ONE EMI card is vertically aligned with the loan group.
9. The entire card uses a consistent blue/purple palette.
10. There is no excessive empty whitespace.
11. The bottom-right glow is visible but subtle.
12. The design remains responsive.
13. Existing functionality is not broken.
14. Do not change the copy or loan amounts unless explicitly requested.
15. Do not add unrelated elements.

## Most Important Instruction

**Do not redesign the component from scratch.**

Use the **first image as the exact visual reference** and modify Image 2's existing structure until its:

- proportions
- spacing
- typography
- colors
- icon treatment
- loan card styling
- connector geometry
- EMI card
- background effects

all visually converge toward Image 1.
