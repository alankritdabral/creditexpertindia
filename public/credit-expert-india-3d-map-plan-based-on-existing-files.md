# Credit Expert India — 3D India Map Hero Migration Plan

## Goal

Replace the existing **phone + EMI animation** in the Credit Expert India hero with an interactive **3D India map + loan-disbursement notification system**.

This plan is based specifically on the supplied files:

- `states(1).json`
- `index(1).html`
- `d3.min(1).js`
- `d3.geo.min(1).js`

The existing files already contain the core geographic data and a working D3 map/notification prototype. The implementation should **reuse this work rather than recreate the India map from scratch**.

---

# 1. What We Already Have

## `states(1).json`

The supplied state dataset contains:

- 29 geographic features
- `id` containing the state name
- `total` containing the existing numeric value
- GeoJSON geometry
- both `Polygon` and `MultiPolygon` geometries

Examples include:

```text
Andhra Pradesh
Arunachal Pradesh
Assam
Bihar
Chhattisgarh
Delhi
Gujarat
Karnataka
Kerala
Maharashtra
Rajasthan
Tamil Nadu
Uttar Pradesh
Uttaranchal
West Bengal
...
```

The geometry is already suitable for generating the India state shapes. Do not replace this dataset unless there is a specific accuracy requirement.

---

# 2. What the Existing `index(1).html` Already Does

The existing HTML is a working D3 prototype.

It currently:

1. Creates a 650 × 650 SVG.
2. Uses a Mercator projection.
3. Loads the state GeoJSON.
4. Creates one SVG path per state.
5. Applies a quantitative color scale.
6. Adds state hover interactions.
7. Shows state information on click.
8. Adds state labels.
9. Creates notification toasts.
10. Randomly selects a state every 4 seconds.
11. Highlights the selected state.
12. Removes the notification after approximately 3.5 seconds.

The current map configuration is:

```js
var w = 650;
var h = 650;
var proj = d3.geo.mercator();
var path = d3.geo.path().projection(proj);
```

The existing projection is initialized with:

```js
proj.scale(6700);
proj.translate([-1240, 720]);
```

The existing state rendering is based directly on:

```js
d3.json("states.json", ...)
```

and each feature is rendered with:

```js
.attr("d", path)
```

This means the geographic foundation is already present.

---

# 3. Important Existing Dependency Issue

The current HTML also tries to load:

```js
d3.json("india.geojson", ...)
```

However, the supplied files do not include `india.geojson`.

The supplied `states.json` already contains the state geometries needed for the hero visualization.

## Plan

Remove the dependency on:

```text
india.geojson
```

and use:

```text
states.json
```

as the primary geographic source.

This simplifies the implementation and removes an unnecessary external file dependency.

---

# 4. Important D3 Version Constraint

The supplied D3 files are an older D3 API.

The existing code uses APIs such as:

```js
d3.geo.mercator()
d3.geo.path()
d3.scale.quantile()
d3.svg.axis()
d3.behavior.zoom()
```

The existing `d3.min.js` and `d3.geo.min.js` should therefore be treated as the legacy prototype implementation.

## Do NOT

Do not attempt to directly mix the old D3 implementation with modern D3 APIs inside the final React component.

## Instead

Use the supplied `states.json` as the source of truth and migrate the geographic rendering logic into the existing Next.js/React application.

---

# 5. Target Architecture

The final implementation should use:

```text
Next.js
   │
   ├── HeroSection
   │
   └── IndiaLoanMap
          │
          ├── Three.js / React Three Fiber
          │      ├── 3D state geometry
          │      ├── city nodes
          │      ├── connection arcs
          │      └── particles
          │
          └── React / Framer Motion
                 ├── notification cards
                 └── animation sequencing
```

Recommended components:

```text
components/
└── hero/
    ├── HeroSection.tsx
    ├── IndiaLoanMap.tsx
    ├── IndiaMapScene.tsx
    ├── CityNodes.tsx
    ├── LoanConnections.tsx
    ├── LoanParticles.tsx
    ├── LoanNotification.tsx
    └── LoanNotificationManager.tsx
```

---

# 6. Migration Strategy

Do this in stages.

Do NOT immediately rewrite the whole hero.

## Phase 1 — Extract Geographic Data

Move:

```text
states(1).json
```

into the Next.js application's public/static data location.

Recommended:

```text
public/data/states.json
```

Rename it to:

```text
states.json
```

Keep the existing structure unchanged.

The application should load:

```text
/data/states.json
```

---

# 7. Phase 2 — Create a Geographic Data Utility

Create:

```text
lib/india-map.ts
```

Responsibilities:

- load/transform state data
- normalize state names
- convert geographic coordinates to local map coordinates
- calculate state centroids
- expose state geometry
- provide lookup helpers

Example interface:

```ts
export interface IndiaState {
  id: string;
  total: string;
  geometry: {
    type: "Polygon" | "MultiPolygon";
    coordinates: number[][][] | number[][][][];
  };
}
```

Do not alter the source values.

---

# 8. Phase 3 — Replace D3 SVG Rendering

The existing prototype uses:

```text
GeoJSON
    ↓
D3 projection
    ↓
SVG path
```

The new implementation should use:

```text
GeoJSON
    ↓
geographic projection
    ↓
Three.js geometry
    ↓
ExtrudeGeometry
    ↓
3D state mesh
```

The visual result should preserve the actual state outlines from the supplied data.

---

# 9. Recommended 3D Geometry Approach

Use D3's geographic projection logic to convert:

```text
longitude / latitude
```

into:

```text
x / y
```

coordinates.

Then convert the projected polygon rings into Three.js shapes.

For each state:

```text
GeoJSON Polygon
       ↓
Projected coordinates
       ↓
THREE.Shape
       ↓
THREE.ExtrudeGeometry
       ↓
Mesh
```

For:

```text
MultiPolygon
```

create multiple shapes/geometries while preserving the same state identity.

Use a small extrusion depth.

Example target:

```text
depth: 5–12 units
```

The map should look raised rather than like a vertical wall.

---

# 10. Map Appearance

Replace the old choropleth colors:

```text
#ffffd9
#edf8b1
#c7e9b4
#7fcdbb
#41b6c4
#1d91c0
#225ea8
#253494
#081d58
```

with the Credit Expert India hero palette.

Suggested:

```text
Base:
#172A5A

Secondary:
#243F91

Highlight:
#3157C7

Glow:
#6C63FF

Accent:
#35D6C7

Success:
#16B364
```

Do not make every state a different bright color.

Use a mostly unified blue/navy map.

---

# 11. State Borders

Each state should retain a subtle boundary.

Target:

```text
thin translucent white/blue border
```

Example:

```text
opacity: 0.35–0.6
```

The state boundaries should be visible enough to communicate:

> India is made up of multiple regions.

They should not dominate the visual.

---

# 12. State Interaction

The current prototype already supports:

```text
mouseenter
mouseleave
click
```

Keep the concept, but change the behavior.

On hover:

```text
state slightly brightens
+
border becomes brighter
+
small glow
```

On click:

```text
state becomes active
+
optional information card
```

Do not use the existing black tooltip design.

Use a modern fintech tooltip/card.

Example:

```text
┌────────────────────────┐
│ Maharashtra            │
│                         │
│ Financing activity     │
│ ₹6,48,500              │
└────────────────────────┘
```

Only implement this if it adds value to the hero.

---

# 13. City Nodes

The state dataset gives geographic boundaries but does not provide city coordinates.

Therefore, create a separate small static city configuration.

Example:

```ts
const cities = [
  {
    name: "Delhi",
    lat: 28.6139,
    lng: 77.2090,
  },
  {
    name: "Mumbai",
    lat: 19.0760,
    lng: 72.8777,
  },
  {
    name: "Bengaluru",
    lat: 12.9716,
    lng: 77.5946,
  },
  {
    name: "Chennai",
    lat: 13.0827,
    lng: 80.2707,
  },
  {
    name: "Hyderabad",
    lat: 17.3850,
    lng: 78.4867,
  },
  {
    name: "Kolkata",
    lat: 22.5726,
    lng: 88.3639,
  },
  {
    name: "Pune",
    lat: 18.5204,
    lng: 73.8567,
  },
  {
    name: "Ahmedabad",
    lat: 23.0225,
    lng: 72.5714,
  },
];
```

Use the same projection used for the state map.

This ensures the city nodes stay geographically aligned.

---

# 14. City Node Visual

Each active city gets:

```text
       ✦
      ◉
     glow
```

Use:

- small center sphere
- transparent ring
- soft glow
- subtle pulse

Animation:

```text
scale:
1 → 1.15 → 1

opacity:
0.65 → 1 → 0.65
```

Duration:

```text
2–3 seconds
```

---

# 15. Loan Network Connections

Create a limited network between cities.

Do not connect every city.

Recommended initial connections:

```text
Delhi → Mumbai
Delhi → Kolkata
Mumbai → Bengaluru
Mumbai → Hyderabad
Bengaluru → Chennai
Delhi → Hyderabad
```

Use curved Three.js lines.

Suggested visual:

```text
Delhi
  ╲
   ╲
    ╲
     Mumbai
       ╲
        ╲
      Bengaluru
```

The lines should be:

- thin
- translucent
- blue/purple
- softly glowing

---

# 16. Money-Flow Particles

Place particles along connection curves.

Example:

```text
Delhi ───────────────→ Mumbai
           •
                 •
                       •
```

The particle represents financing flow.

Keep particle count low:

```text
1–3 particles per active connection
```

Do not create a dense particle network.

---

# 17. Notification System

The existing HTML already contains the basic notification idea.

Current behavior:

```text
random state
   ↓
highlight state
   ↓
create notification
   ↓
remove after ~3.5 seconds
   ↓
repeat every 4 seconds
```

This is useful and should be retained conceptually.

However, replace the current D3 DOM toast:

```text
🔔 New alert from State (value)
```

with a premium Framer Motion card.

---

# 18. New Notification Content

Use:

```ts
const notifications = [
  {
    city: "Delhi",
    amount: "₹8,50,000",
    time: "2m ago",
    status: "Loan Disbursed",
  },
  {
    city: "Mumbai",
    amount: "₹5,20,000",
    time: "4m ago",
    status: "Loan Disbursed",
  },
  {
    city: "Bengaluru",
    amount: "₹6,40,000",
    time: "5m ago",
    status: "Loan Disbursed",
  },
  {
    city: "Hyderabad",
    amount: "₹4,80,000",
    time: "7m ago",
    status: "Loan Disbursed",
  },
  {
    city: "Chennai",
    amount: "₹4,10,000",
    time: "9m ago",
    status: "Loan Disbursed",
  },
  {
    city: "Kolkata",
    amount: "₹3,75,000",
    time: "12m ago",
    status: "Loan Disbursed",
  },
];
```

These must be treated as visual/demo content unless connected to actual backend data.

Do not describe them as real-time customer transactions without a real data source.

---

# 19. Notification Card Design

Replace the current dark toast:

```css
background: rgba(30, 30, 30, 0.9);
```

with a light glass card.

Target:

```css
background: rgba(255, 255, 255, 0.88);
backdrop-filter: blur(20px);
border: 1px solid rgba(255, 255, 255, 0.75);
box-shadow: 0 20px 50px rgba(40, 60, 120, 0.14);
border-radius: 18px;
```

Card:

```text
┌──────────────────────────────┐
│ ● Delhi                2m ago│
│                              │
│ ₹8,50,000                    │
│                              │
│ ✓ Loan Disbursed             │
└──────────────────────────────┘
```

Use green only for the successful status.

---

# 20. Notification Animation

Use Framer Motion.

Enter:

```ts
initial={{
  opacity: 0,
  scale: 0.92,
  y: 15,
}}
```

Animate:

```ts
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

Duration:

```text
0.4–0.5 seconds
```

Keep one main notification visible at a time.

---

# 21. Notification → City Relationship

When the Delhi notification appears:

```text
Notification
     │
     │
     ▼
   Delhi ●
```

The Delhi node should:

1. pulse
2. brighten
3. optionally emit a small ring
4. activate one connection
5. send a particle

This creates the feeling that the notification originates from the map.

---

# 22. Notification Positioning

Do not attach the cards to the canvas internally if doing so makes text rendering difficult.

Recommended architecture:

```text
Hero container
│
├── Three.js canvas
│      └── India map
│
└── HTML overlay
       └── notification cards
```

The city's projected position can be converted into screen coordinates.

This gives:

- crisp HTML text
- easier responsive behavior
- Framer Motion support
- better accessibility
- easier styling

The notification card can visually point back to the city using a small line/pseudo-element.

---

# 23. Hero Background

Keep the existing hero background.

Use:

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

Add only subtle decorative curves.

The map should remain the primary visual element.

---

# 24. Replace Phone — Do Not Redesign Entire Hero

The current hero has:

```text
left:
headline
description
buttons

right:
phone EMI visualization
```

Change only:

```text
phone EMI visualization
```

to:

```text
3D India loan network
```

Preserve:

- headline
- description
- CTA buttons
- eyebrow
- hero spacing
- partner logos
- overall section height

unless the existing implementation requires small adjustments.

---

# 25. Partner Logo Strip

Do not change the existing partner/logo section as part of this task.

The map should end naturally above the logo strip.

Maintain the current visual separation.

---

# 26. Responsive Plan

## Desktop ≥ 1280px

Show:

- full 3D India map
- 8 city nodes
- 4–6 connections
- particles
- 1 floating notification
- mouse parallax

## Tablet 768–1279px

Show:

- smaller map
- 5–6 cities
- 3–4 connections
- fewer particles
- 1 notification

## Mobile < 768px

Do not simply scale the desktop canvas.

Use:

- 280–340px map
- 3–4 city nodes
- 1 connection at a time
- 1 notification
- no mouse parallax
- reduced glow
- reduced particle count

Headline and CTA remain dominant.

---

# 27. Animation Performance

The current D3 prototype uses:

```js
setInterval(triggerNotification, 4000);
```

Do not carry this directly into the React implementation.

Use:

```text
useEffect
+
setTimeout
```

or an animation state machine.

Always clean up timers on unmount.

Example concept:

```ts
useEffect(() => {
  const timer = setTimeout(...);

  return () => clearTimeout(timer);
}, [activeNotification]);
```

Avoid multiple timers accumulating after route changes or component re-renders.

---

# 28. Three.js Performance

Use:

```text
useMemo()
```

for:

- geometry
- materials
- city lookup
- connection curves

Avoid constructing Three.js objects inside every frame.

Keep the particle count low.

Do not add heavy bloom/post-processing initially.

First achieve the visual with:

- emissive materials
- transparent meshes
- soft sprites
- subtle lights

Only add post-processing if the final result genuinely needs it.

---

# 29. Reduced Motion

Support:

```css
@media (prefers-reduced-motion: reduce)
```

When enabled:

- no map floating
- no particle movement
- no notification transitions
- static city nodes
- static map
- one notification

---

# 30. Implementation Order

Follow this exact order.

## Step 1 — Preserve Existing Files

Do not delete:

```text
states.json
d3.min.js
d3.geo.min.js
```

until the new implementation is confirmed.

The old HTML can remain as a reference/prototype.

---

## Step 2 — Move `states.json`

Add:

```text
public/data/states.json
```

Use the supplied state file unchanged.

---

## Step 3 — Build `india-map.ts`

Implement:

```text
loadStateData()
projectCoordinates()
getStateCentroid()
getCityPosition()
```

---

## Step 4 — Build Static 2D React Version

Before going 3D, reproduce the existing state map in React.

Goal:

```text
states.json
    ↓
React
    ↓
correct India map
```

This verifies that the data migration works.

Do not add animations yet.

---

## Step 5 — Convert States to 3D

Replace:

```text
SVG paths
```

with:

```text
Three.js extruded state geometry
```

Verify:

- India shape
- state boundaries
- projection
- scaling
- centering

before adding any notifications.

---

## Step 6 — Add City Nodes

Add:

```text
Delhi
Mumbai
Bengaluru
Chennai
Hyderabad
Kolkata
Pune
Ahmedabad
```

Verify every node is geographically aligned.

---

## Step 7 — Add Connections

Add 4–6 curved connections.

Verify that connections originate and terminate at the correct cities.

---

## Step 8 — Add Particles

Add one particle per active connection initially.

Only increase the count if the scene remains clean.

---

## Step 9 — Add Framer Motion Notifications

Create:

```text
LoanNotification.tsx
```

and:

```text
LoanNotificationManager.tsx
```

Use the demo transaction data.

---

## Step 10 — Connect Notifications to Nodes

When a notification becomes active:

```text
notification
      ↓
city node pulse
      ↓
connection activates
      ↓
particle travels
```

---

## Step 11 — Add Mouse Parallax

Only after the base scene is stable.

Maximum:

```text
X rotation: ±3°
Y rotation: ±4°
```

---

## Step 12 — Integrate Into Existing Hero

Remove the old phone animation.

Insert:

```tsx
<IndiaLoanMap />
```

in its place.

Do not modify unrelated sections.

---

## Step 13 — Mobile Optimization

Create a simplified mobile mode.

---

## Step 14 — Performance Pass

Check:

- FPS
- memory
- resize behavior
- route changes
- timer cleanup
- WebGL context
- mobile performance

---

# 31. Files to Create

Final target:

```text
public/
└── data/
    └── states.json

components/
└── hero/
    ├── IndiaLoanMap.tsx
    ├── IndiaMapScene.tsx
    ├── CityNodes.tsx
    ├── LoanConnections.tsx
    ├── LoanParticles.tsx
    ├── LoanNotification.tsx
    └── LoanNotificationManager.tsx

lib/
└── india-map.ts
```

Potentially:

```text
types/
└── india-map.ts
```

if the existing project uses a centralized type system.

---

# 32. Files That Should NOT Be Rewritten

Do not modify the supplied vendor libraries:

```text
d3.min.js
d3.geo.min.js
```

They are reference/prototype dependencies.

The final React implementation should not require them if modern projection utilities are used, but keep the originals during migration.

Do not modify the original `states.json` data.

---

# 33. Existing Prototype Logic to Reuse Conceptually

From the existing HTML, preserve these concepts:

```text
state data
    ↓
projection
    ↓
state geometry
    ↓
state interaction
    ↓
state highlighting
    ↓
notification
```

The final version changes the rendering layer:

```text
OLD

states.json
    ↓
D3
    ↓
SVG
    ↓
dark toast


NEW

states.json
    ↓
geographic projection
    ↓
Three.js
    ↓
3D India map
    ↓
city network
    ↓
Framer Motion notification
```

---

# 34. Critical Data Decision

The existing `total` values in `states.json` should initially be treated as the existing map dataset.

Do not automatically reinterpret them as:

- loan amounts
- disbursement totals
- customer counts
- live transactions

unless the product owner explicitly defines what `total` means.

The new notification amounts should remain separate demo data.

This prevents accidental misrepresentation of the existing dataset.

---

# 35. Final Visual Target

The final hero should communicate:

```text
A smarter way to reduce your debt.

       ┌─────────────────────────┐
       │      3D INDIA MAP       │
       │                         │
       │       ✦ Delhi           │
       │        ╲                │
       │         ╲               │
       │   Mumbai ✦──────✦       │
       │              Bengaluru  │
       │                         │
       │   Chennai ✦             │
       │                         │
       └─────────────────────────┘

          ┌───────────────────────┐
          │ Mumbai         4m ago │
          │                       │
          │ ₹5,20,000             │
          │ ✓ Loan Disbursed      │
          └───────────────────────┘
```

The overall aesthetic should be:

**Stripe-like fintech + Indian financial network + restrained 3D visualization.**

Avoid:

- excessive neon
- cyberpunk styling
- giant holographic effects
- too many particles
- overly bright states
- dense city labels
- fake live-data claims

---

# 36. Definition of Done

The task is complete when:

- [ ] Existing phone EMI animation is removed.
- [ ] Supplied `states.json` is reused.
- [ ] No dependency on missing `india.geojson`.
- [ ] India renders correctly.
- [ ] State boundaries are preserved.
- [ ] States are rendered with subtle 3D extrusion.
- [ ] Map uses the Credit Expert India blue/purple theme.
- [ ] City nodes align geographically.
- [ ] City nodes pulse subtly.
- [ ] 4–6 curved connections are visible.
- [ ] Particles travel along connections.
- [ ] One loan notification appears at a time.
- [ ] Notification is connected visually to its city.
- [ ] Notifications use Framer Motion.
- [ ] Mouse parallax is subtle.
- [ ] Desktop layout matches the existing hero.
- [ ] Mobile has a simplified scene.
- [ ] Reduced-motion mode works.
- [ ] Timers are cleaned up.
- [ ] Three.js geometry is memoized/reused.
- [ ] No unnecessary vendor-library modifications.
- [ ] No horizontal scrolling.
- [ ] No fake real-time transaction claim is made.
- [ ] Existing CTA and partner-logo functionality remains intact.
