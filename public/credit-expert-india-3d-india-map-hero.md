# Credit Expert India — 3D India Map Hero Animation

## Objective

Replace the existing smartphone EMI animation in the hero section with a premium, interactive **3D map of India**.

The new visual should communicate:

> Loans are being disbursed across India.

The design should feel like a premium fintech product visualization: clean, trustworthy, minimal, polished, and production-quality.

It must **not** look like a generic AI-generated map, cyberpunk dashboard, crypto interface, or gaming HUD.

---

## 1. Existing Hero Structure

Keep the existing hero layout and left-side content.

Desktop structure:

```text
┌──────────────────────────────────────────────────────────────┐
│                                                              │
│  LEFT CONTENT                    RIGHT 3D INDIA MAP          │
│                                                              │
│  A smarter way                  ┌──────────────────────┐     │
│  to reduce your debt.           │                      │     │
│                                  │     3D INDIA        │     │
│  Combine multiple EMIs...       │       MAP           │     │
│                                  │                      │     │
│  [Check Eligibility]            │  ● Delhi             │     │
│  [See Savings]                  │      ↘               │     │
│                                  │   ● Mumbai            │     │
│                                  │                      │     │
│                                  └──────────────────────┘     │
│                                                              │
├──────────────────────────────────────────────────────────────┤
│                 PARTNER / BANK LOGOS                         │
└──────────────────────────────────────────────────────────────┘
```

Do not unnecessarily redesign the left-side typography, CTAs, or partner-logo strip.

Only replace the existing phone/EMI visualization.

---

# 2. Technology

Use:

- Next.js
- React
- TypeScript
- Three.js
- React Three Fiber
- `@react-three/drei`
- Framer Motion

Dependencies:

```bash
npm install three @react-three/fiber @react-three/drei framer-motion
```

Use:

### Three.js / React Three Fiber

For:

- India map
- 3D extrusion
- city nodes
- connection arcs
- particles
- camera/parallax
- lighting

### Framer Motion

For:

- loan notification entrance/exit
- floating cards
- opacity
- scale
- position
- sequencing

---

# 3. Component Architecture

Create isolated reusable components:

```text
components/
└── hero/
    ├── HeroSection.tsx
    ├── IndiaMapScene.tsx
    ├── IndiaMap.tsx
    ├── CityNodes.tsx
    ├── LoanConnections.tsx
    ├── LoanParticles.tsx
    ├── LoanNotification.tsx
    └── LoanNotificationManager.tsx
```

Recommended composition:

```tsx
<IndiaMapScene>
  <IndiaMap />
  <CityNodes />
  <LoanConnections />
  <LoanParticles />
</IndiaMapScene>
```

Keep the Three.js scene isolated from the normal DOM hero content.

---

# 4. India Map

Use an accurate India geographic outline.

Prefer a real GeoJSON or SVG source rather than manually drawing the country.

Pipeline:

```text
India GeoJSON
      ↓
Convert coordinates to Three.js geometry
      ↓
Extrude geometry
      ↓
Render as 3D map
```

The map should have:

- subtle 3D extrusion
- dark navy/blue-purple base
- blue gradient/highlights
- thin illuminated border
- restrained outer glow
- subtle surface detail
- slight perspective
- soft floating effect

Desktop target:

```text
width: 500–650px
height: 500–600px
```

Do not allow the map to overpower the headline.

---

# 5. Visual Style

Use a premium fintech palette.

Background:

```text
#F5F8FF
#EEF4FF
#E9F1FF
```

Map:

```text
#172A5A
#243F91
#3157C7
```

Highlights:

```text
#5B5CFF
#7C6CFF
#35D6C7
```

Success/disbursement:

```text
#16B364
```

Avoid excessive neon.

The map should feel like:

> premium financial infrastructure visualization

Not:

> cyberpunk hologram

Not:

> crypto dashboard

Not:

> sci-fi gaming interface

---

# 6. City Nodes

Add at least:

- Delhi
- Mumbai
- Bengaluru
- Chennai
- Hyderabad
- Kolkata
- Pune
- Ahmedabad

Each city gets a small animated node:

```text
        glow
         ↓
        ✦
       ●
      / \
```

Node characteristics:

- small bright center
- subtle pulsing ring
- soft radial glow
- restrained animation

Example:

```tsx
<motion.div
  animate={{
    scale: [1, 1.15, 1],
    opacity: [0.7, 1, 0.7],
  }}
  transition={{
    duration: 2,
    repeat: Infinity,
  }}
/>
```

Do not make the nodes flash aggressively.

---

# 7. City Coordinates

Use a normalized coordinate system rather than hardcoding DOM positions everywhere.

Example data:

```ts
const cities = [
  { name: "Delhi", lat: 28.6139, lng: 77.2090 },
  { name: "Mumbai", lat: 19.0760, lng: 72.8777 },
  { name: "Bengaluru", lat: 12.9716, lng: 77.5946 },
  { name: "Chennai", lat: 13.0827, lng: 80.2707 },
  { name: "Hyderabad", lat: 17.3850, lng: 78.4867 },
  { name: "Kolkata", lat: 22.5726, lng: 88.3639 },
  { name: "Pune", lat: 18.5204, lng: 73.8567 },
  { name: "Ahmedabad", lat: 23.0225, lng: 72.5714 },
];
```

Convert latitude/longitude to positions on the map geometry.

Do not manually guess positions for each responsive breakpoint.

---

# 8. Loan Connections

Create curved animated connections between selected cities.

Example:

```text
Delhi
   ╲
    ╲
     Mumbai
       ╲
        Bengaluru
```

Use:

```ts
THREE.CatmullRomCurve3
```

or:

```ts
THREE.QuadraticBezierCurve3
```

Connections should have:

- thin lines
- soft glow
- subtle animated particles

Do not connect every city to every other city.

Show approximately 4–6 active connections at any given time.

Example:

```ts
const connections = [
  ["Delhi", "Mumbai"],
  ["Delhi", "Kolkata"],
  ["Mumbai", "Bengaluru"],
  ["Bengaluru", "Chennai"],
  ["Mumbai", "Hyderabad"],
];
```

---

# 9. Animated Money-Flow Particles

Place small particles along connection curves.

Example:

```text
Delhi ───────────────→ Mumbai
          •
               •
                    •
```

Particles represent the visual flow of financing.

Use:

- tiny white particles
- subtle blue particles
- occasional green particle

Movement should be smooth and slow.

Conceptually:

```ts
progress = (progress + delta * speed) % 1;
```

Use only 1–3 particles per active connection.

Do not overload the scene.

---

# 10. Loan Notification Cards

This is the primary visual interaction.

Create floating notification cards around the map.

Example:

```text
┌──────────────────────────────┐
│ ● Mumbai              2m ago │
│                              │
│ ₹5,20,000                    │
│                              │
│ ✓ Loan Disbursed             │
└──────────────────────────────┘
```

Other examples:

```text
Delhi       ₹8,50,000
Bengaluru   ₹6,40,000
Hyderabad   ₹4,80,000
Chennai     ₹4,10,000
Kolkata     ₹3,75,000
```

These should be clearly presented as visual/demo activity unless connected to actual backend transaction data.

Do not imply that the website is displaying real-time customer transactions when it is not.

---

# 11. Notification Data

Use a data structure like:

```ts
const transactions = [
  {
    city: "Delhi",
    amount: "₹8,50,000",
    time: "2m ago",
  },
  {
    city: "Mumbai",
    amount: "₹5,20,000",
    time: "4m ago",
  },
  {
    city: "Bengaluru",
    amount: "₹6,40,000",
    time: "5m ago",
  },
  {
    city: "Hyderabad",
    amount: "₹4,80,000",
    time: "7m ago",
  },
  {
    city: "Chennai",
    amount: "₹4,10,000",
    time: "9m ago",
  },
  {
    city: "Kolkata",
    amount: "₹3,75,000",
    time: "12m ago",
  },
];
```

Keep all values as illustrative demo content unless a real data source is implemented.

---

# 12. Notification Design

Cards should look like premium SaaS/fintech UI.

CSS direction:

```css
background: rgba(255, 255, 255, 0.88);
backdrop-filter: blur(20px);
border: 1px solid rgba(255, 255, 255, 0.7);
box-shadow: 0 20px 50px rgba(40, 60, 120, 0.12);
border-radius: 18px;
```

Desktop width:

```text
220–260px
```

Structure:

```text
Delhi                         2m ago

₹8,50,000

● Loan Disbursed
```

Use a small green status indicator.

Typography should be clean and compact.

---

# 13. Notification Animation

Do not display every notification simultaneously.

Create a notification queue.

Sequence:

```text
Delhi
  ↓
Mumbai
  ↓
Bengaluru
  ↓
Hyderabad
  ↓
Chennai
  ↓
Kolkata
  ↓
repeat
```

Each notification:

- enters
- remains visible
- exits
- next notification appears

Entrance:

```ts
initial={{
  opacity: 0,
  scale: 0.92,
  y: 15,
}}
animate={{
  opacity: 1,
  scale: 1,
  y: 0,
}}
```

Exit:

```ts
exit={{
  opacity: 0,
  scale: 0.96,
  y: -10,
}}
```

Use:

```text
duration: ~0.45s
ease: easeOut
```

---

# 14. Connect Notification to City

When a notification appears:

1. Identify its city node.
2. Highlight the node.
3. Pulse the city.
4. Draw/activate a short visual line toward the notification.
5. Animate the notification in.
6. Send a particle along the corresponding connection.

Concept:

```text
                    ┌──────────────────────┐
                    │ Delhi         2m ago │
                    │ ₹8,50,000            │
                    │ ✓ Loan Disbursed     │
                    └──────────┬───────────┘
                               │
                               │
                              ✦
                             Delhi
```

This should make the notification feel physically connected to the map.

---

# 15. Map Motion

Do not continuously rotate the India map.

Use very subtle movement:

- slow vertical floating
- tiny X/Y rotation
- subtle light movement
- gentle camera parallax

Example:

```ts
y: [-4, 4, -4]
rotateY: [-0.01, 0.01, -0.01]
```

Duration:

```text
8–12 seconds
```

The motion should be barely noticeable.

---

# 16. Mouse Interaction

Desktop only.

When the user moves their cursor over the map:

- map follows the cursor slightly
- camera shifts subtly
- city nodes react slightly
- notification cards remain readable

Maximum movement:

```text
rotateX: ±3°
rotateY: ±4°
```

Do not make the map spin.

Use smooth interpolation rather than directly mapping cursor movement to rotation.

---

# 17. Hero Background

Preserve the existing light fintech background.

Use:

- white
- very light blue
- subtle purple
- subtle cyan

Example:

```css
background:
  radial-gradient(
    circle at 75% 45%,
    rgba(105, 130, 255, 0.18),
    transparent 40%
  ),
  radial-gradient(
    circle at 95% 80%,
    rgba(50, 210, 220, 0.14),
    transparent 35%
  ),
  #f7faff;
```

Add extremely subtle curved SVG lines.

Do not fill the background with decorative objects.

---

# 18. Existing Hero Copy

Keep the existing content.

Eyebrow:

```text
INTEREST SAVED FOR CUSTOMERS: ₹16,85,50,820.17
```

If this value is already dynamic in the application, preserve the existing dynamic source.

Heading:

```text
A smarter way to
reduce your debt.
```

Highlight:

```text
reduce
```

with the existing blue/purple treatment.

Description:

```text
Combine multiple EMIs into one. Explore lower-rate
financing options designed around your profile.
```

Primary CTA:

```text
Check My Eligibility →
```

Secondary CTA:

```text
See Potential Savings
```

Do not unnecessarily change the existing CTA functionality.

---

# 19. Desktop Layout

Target approximately:

```text
Hero content:      50%
3D visualization:  50%
```

The map should sit toward the right side.

Approximate map position:

```text
right: 4–8%
top: 50%
transform: translateY(-50%)
```

Do not allow it to overlap the headline.

The notification cards may extend slightly beyond the map but should remain inside the hero bounds.

---

# 20. Mobile Layout

Do not simply scale the desktop scene down.

Create a simplified mobile visualization.

Example:

```text
        India Map
           ✦
      ✦         ✦

  ┌───────────────────┐
  │ Mumbai            │
  │ ₹5,20,000         │
  │ ✓ Loan Disbursed  │
  └───────────────────┘
```

Mobile:

- smaller map
- fewer cities
- 1 notification at a time
- no mouse parallax
- fewer particles
- reduced glow
- prioritize headline and CTA

Suggested map size:

```text
280–340px
```

---

# 21. Responsive Breakpoints

Use the existing project's breakpoints where possible.

Suggested behavior:

```text
≥ 1280px
Full 3D map + connections + particles + notifications

1024–1279px
Smaller map + fewer particles + fewer connections

768–1023px
Simplified map + fewer city nodes

< 768px
Mobile simplified visualization
```

Do not let the canvas cause horizontal scrolling.

---

# 22. Performance

This is a production landing page.

Requirements:

- use `useMemo` for static geometry
- reuse Three.js materials
- avoid creating objects inside animation loops
- limit particle count
- avoid unnecessary post-processing
- lazy-load the 3D scene where appropriate
- use `Suspense`
- avoid large textures
- clean up Three.js resources
- avoid unnecessary React re-renders

Target:

```text
Desktop: smooth ~60 FPS
Mobile: lightweight fallback
```

---

# 23. Accessibility

The 3D scene is decorative.

If it does not contain actionable information:

```html
aria-hidden="true"
```

The important content must remain available in normal HTML.

Support:

```css
@media (prefers-reduced-motion: reduce)
```

Reduced-motion behavior:

- static map
- static city nodes
- no particle movement
- no map floating
- no notification transitions
- one visible notification

---

# 24. Important Design Direction

The final result should feel like:

**Stripe + modern Indian fintech + subtle 3D data visualization**

It should NOT feel like:

- gaming
- crypto
- cyberpunk
- sci-fi dashboard
- excessive neon
- generic AI landing page

Think:

> Financial network visualization

rather than:

> Futuristic India hologram

The visual should communicate trust, scale, technology, and financial activity without becoming visually noisy.

---

# 25. Animation Sequence

On page load:

```text
Hero loads
   ↓
India map softly fades in
   ↓
City nodes appear
   ↓
Connections draw
   ↓
First notification appears
   ↓
Particle travels along connection
   ↓
Notification disappears
   ↓
Next notification appears
   ↓
Repeat
```

Recommended loop:

```text
15–20 seconds
```

Avoid a mechanical or repetitive feel.

Use small timing variations where appropriate.

---

# 26. Final Concept

Replace:

```text
PHONE
   ↓
Personal Loan
Credit Card
App Loan
Overdraft
   ↓
4 EMIs → 1 EMI
```

with:

```text
INDIA MAP
   ↓
Indian cities
   ↓
Loan network
   ↓
Animated city nodes
   ↓
Loan notifications
   ↓
Money-flow particles
```

The visual message should be:

> Credit Expert India helps customers across India access financing and consolidate eligible debt.

Keep the implementation visually impressive but restrained.

---

# 27. Implementation Quality Checklist

Before considering the implementation complete:

- [ ] Existing phone animation removed
- [ ] Accurate India map implemented
- [ ] Map has subtle 3D extrusion
- [ ] City nodes align correctly with geographic locations
- [ ] 4–6 connection arcs visible
- [ ] Particles move along selected arcs
- [ ] Notification queue works
- [ ] Notification is visually connected to its city
- [ ] Notifications animate using Framer Motion
- [ ] Map has subtle parallax
- [ ] No aggressive rotation
- [ ] Background matches existing hero
- [ ] Left-side hero copy preserved
- [ ] Existing CTA behavior preserved
- [ ] Partner logo strip preserved
- [ ] Mobile layout implemented separately
- [ ] Reduced-motion mode implemented
- [ ] No horizontal overflow
- [ ] Three.js resources are cleaned up
- [ ] No unnecessary re-renders
- [ ] Demo transaction data is not presented as real-time data
- [ ] Final visual feels premium and trustworthy
