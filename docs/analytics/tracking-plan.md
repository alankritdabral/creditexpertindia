# Tracking plan

The event dictionary, GA4 console settings, and the weekly review checklist
for creditexpertindia.com's analytics. Everything in this file that isn't
code was done (or needs doing) directly in the GA4 / Search Console /
BigQuery consoles — I can't click through those myself, so each section
below says exactly what to set and why.

Source code: `lib/analytics/events.ts` (the typed event dictionary),
`lib/analytics/track.ts`, `components/analytics/*`. See
`plans/01-visibility-and-analytics.md` for the full project plan.

## 1. Event dictionary

| Event | Fires when | Parameters |
|---|---|---|
| `page_view` | Automatic (GA4 enhanced measurement, incl. client-side history navigations) | `content_group` (set via `gtag('set', …)` in `instrumentation-client.ts`) |
| `cta_click` | Any element with `data-analytics-cta` | `cta_id`, `cta_location`, `link_target` |
| `contact_click` | A `wa.me`/`mailto:`/`tel:` link | `contact_method`, `cta_location` |
| `nav_menu_open` | Navbar mega-menu or mobile drawer group opened | `menu_id` |
| `select_content` | A loan-solution row selected on the homepage | `content_type`, `content_id` |
| `faq_open` | An FAQ accordion item opened | `faq_set`, `faq_id` |
| `calculator_start` | First slider move on any of the 3 calculators | `calculator_id` |
| `calculator_result` | 1.5s after the last slider move | `calculator_id`, `loan_amount_band`, `rate_band`, `tenure_months`, `savings_band`, `debts_count` |
| `debt_row_add` / `debt_preset_apply` | Debt consolidation calculator | `debt_type` / `preset_id` |
| `lead_form_view` | Form mounted (see note below) | `form_id`, `form_location` |
| `lead_form_start` | First field interaction | `form_id` |
| `lead_form_submit` | Submit clicked | `form_id` |
| `lead_form_error` | Validation or API error | `form_id`, `error_code`, `error_field?` |
| `otp_request` / `otp_sent` / `otp_failed` / `otp_verified` / `otp_abandon` | The eligibility form's OTP step | see `lib/analytics/events.ts` |
| `generate_lead` **(key event)** | Contact/calculator lead saved; eligibility OTP verified | `lead_source`, `currency`, `value?` |
| `credit_report_fetch` | Bureau fetch resolves (cache/live/fallback/failed) | `bureau`, `report_outcome`, `duration_band` |
| `credit_report_view` **(key event)** | Credit report dashboard shown | `bureau` |
| `report_tab_view` / `report_download` | Dashboard tab change / any download | `report_tab` / `download_format` |
| `LCP` / `INP` / `CLS` | Core Web Vitals (`components/analytics/WebVitals.tsx`) | `value`, `metric_id`, `metric_value`, `metric_delta`, `metric_rating`, `debug_target?` |

**`lead_form_view` note:** the plan calls for firing this when 50% of the
form is visible. All three lead forms currently fire it on mount instead
(documented in each component) — a per-form `IntersectionObserver` was
judged not worth the complexity for this pass. If a form sits far below the
fold and GA shows a lot more `lead_form_view` than real pageviews near that
form, that's why; revisit then.

**User property:** `journey_stage` (`lead` or `report_viewed`), set via
`setJourneyStage()` — a GA4 user property, not an event parameter.

**Never sent:** form field values, salary, names, phone numbers, PAN, date
of birth, email, file names, raw error message text, bureau URLs. Enforced
by `lib/analytics/pii.ts`'s runtime guard on every event (see its tests in
`__tests__/analytics.test.ts`).

## 2. GA4 admin settings (console, one-time)

Admin → Data Streams → your web stream, unless noted:

- **Data retention** (Admin → Data Settings → Data Retention): set to
  **14 months**. Longer only matters for explorations/funnels, not standard
  reports.
- **Enhanced measurement**: keep **on** for page views (incl. browser
  history — this is what makes `instrumentation-client.ts`'s client-side
  navigation tracking work without duplicate page views), scrolls, outbound
  clicks, file downloads. Turn **off** form interactions and site search —
  this site sends its own, better-targeted form events instead.
- **Data redaction** (stream settings → Configure tag settings → Show more
  → Manage data streams → Redact data): turn on **email redaction**. Add
  these query-parameter names to the redaction list, in case any ever leak
  into a URL: `mobile`, `phone`, `pan`, `email`, `name`, `dob`.
- **Internal traffic**: define the office IP addresses (Dehradun, Delhi,
  Rudrapur — see `lib/config.ts`'s `contact.addresses`) as an internal
  traffic rule, then add an "Internal Traffic" filter and leave it in
  **Testing** until you've confirmed it only matches staff traffic, then
  switch it to **Active**.
- **Google Signals**: leave **off**. This site runs no ads, and enabling it
  adds re-identification risk for no benefit here.

## 3. Custom dimensions and key events

Admin → Custom definitions → Create custom dimension, for each **event**
parameter in the table above except the reserved/already-standard ones
(`value`, `currency`). That's roughly 26 dimensions — comfortably under
GA4's 50-dimension limit on a standard property. Register `journey_stage`
separately as a **user-scoped** dimension.

New dimensions take 24-48 hours to start populating in reports (they apply
only going forward, not retroactively).

**Key events** (Admin → Events → mark as key event, or Admin → Key events →
New key event): `generate_lead` and `credit_report_view`. Limit is 30 on a
standard property — nowhere close.

Once a real number exists for the value of a lead, come back and add
`currency`/`value` to the `generate_lead` call in `lib/analytics/events.ts`
and the three places it's fired (`ContactForm.tsx`,
`DebtConsolidationCalculator.tsx`, `EligibilityForm.tsx`) — decision D6 in
the plan deliberately left this unset rather than guess a number.

## 4. Links: Search Console, Google Ads, BigQuery

- **Search Console** (Admin → Product links → Search Console): link the
  verified Domain property from Phase 1. One web stream ↔ one Search
  Console property.
- **Google Ads**: not linked. This site runs no ads today, and even if it
  did, debt/credit products are a Google Ads "sensitive category" that
  can't use remarketing or Customer Match audiences anyway — see the
  plan's Phase 0 research.
- **BigQuery** (Admin → Product links → BigQuery Links): link to a GCP
  project with billing enabled, export frequency **Daily** (streaming
  costs money per GB with no real benefit at this traffic volume). This is
  separate from the `lead_analytics` Firestore→BigQuery export in the next
  section — one is raw GA4 events, the other is the PII-free lead copy.

## 5. `lead_analytics` → BigQuery (Firebase extension)

Install the official **"Stream Firestore to BigQuery"** Firebase Extension,
scoped to the **`lead_analytics` collection only**. Do **not** point it at
`leads` or `credit_reports` — those carry personal data and must never
leave Firestore for an analytics warehouse (see
`docs/analytics/lead-lookup.md` from Phase 5 for why the split exists).

Once both this and the GA4 BigQuery export exist, a join on `ga_client_id`
reconstructs a lead's full journey in SQL, for anyone who needs something
the GA4 UI can't do directly (cohort analysis, custom funnels across
sessions, etc.).

## 6. Saved explorations (GA4 → Explore)

Build these once the custom dimensions above have populated (allow 48h):

1. **Eligibility funnel** — open funnel: `lead_form_view` → `lead_form_start`
   → `lead_form_submit` → `otp_sent` → `otp_verified` → `generate_lead` →
   `credit_report_view`, broken down by device category and first-user
   source/medium. This is the one most worth watching for drop-off, since
   it's the longest funnel on the site.
2. **Contact funnel** — `lead_form_view` → `lead_form_start` →
   `lead_form_submit` → `generate_lead`.
3. **Calculator → lead** — `calculator_start` → `calculator_result` →
   `generate_lead` (filtered to `lead_source = calculator_lead`).
4. **Path exploration** from each `content_group`, to see where people go
   after landing on a city page, a calculator, or an article.
5. **Content-group performance** — a table of `content_group` ×
   sessions/engagement rate/`generate_lead` count.

## 7. Dashboard (Looker Studio)

A "Growth and Leads" report, one page each:

1. **Acquisition** — sessions and `generate_lead` by source/medium and
   landing page (join GA4 data to the UTM parameters captured in
   `lib/analytics/attribution.ts`).
2. **Funnels** — the saved explorations above, visualised.
3. **Calculators and CTAs** — `calculator_start`/`calculator_result` counts
   by `calculator_id`; `cta_click` counts by `cta_id`.
4. **Search** — Search Console queries, pages, CTR and position (from the
   linked property).
5. **Speed** — p75 LCP/INP/CLS by `content_group`, from the BigQuery export
   (the GA4 UI doesn't do percentile math well; BigQuery does).
6. **Leads** — `lead_analytics` rows by `lead_source`, joined to GA4 events
   on `ga_client_id` for full journey context.

## 8. Alerts

GA4 → Insights → Create a custom insight: alert when daily `generate_lead`
count drops more than 50% below the trailing 4-week average. This is the
single highest-value alert for a lead-gen site — it catches a broken form,
a bad deploy, or an OTP provider outage within a day instead of a week.

## 9. Weekly review checklist

- Compare the week's GA `generate_lead` count against the week's actual
  Firestore lead count (`leads` + `credit_reports` created). A gap is
  normal — ad blockers, Consent Mode denials, and third-party cookie
  blocking all suppress GA counts below the real number — but log the gap
  here so a sudden *change* in the gap size is visible:

  | Week of | GA generate_lead | Real leads | Gap | Notes |
  |---|---|---|---|---|
  | | | | | |

- Check the Core Web Vitals report in Search Console: still "Good", or did
  a recent change regress it?
- Check the eligibility funnel exploration for any error_code spiking above
  its usual rate.
- Check the custom insight from §8 hasn't fired (or if it has, that it's
  understood why).

## 10. Adding a new event later

1. Add it to the `AnalyticsEvent` union in `lib/analytics/events.ts`, with
   enum/banded/numeric parameters only — never a free-text field.
2. Call `track({ name: ..., params: ... })` from the component.
3. Add a test in `__tests__/analytics.test.ts` for any new banding or
   parameter logic.
4. If it's a parameter GA4 hasn't seen before, register it as a custom
   dimension (§3) and wait 24-48h before expecting it in reports.
5. Add it to the table in §1 of this file.
