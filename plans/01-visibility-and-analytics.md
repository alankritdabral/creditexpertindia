# Plan 01: Search visibility and customer-journey analytics

| | |
|---|---|
| Written | 2026-11-08, from commit `f1b6f22` on `main` plus one uncommitted change (`lib/config.ts`: site URL now `www`) |
| Stack | Next.js 16.3.4 App Router, React 19, Tailwind 4, Firebase, hosted on Vercel (`bom1`); DNS at GoDaddy |
| How to run it | One phase per session, in order. Each phase lists everything it needs. Line numbers are as of `f1b6f22`. If they have moved, find the code by the handler or function name given. |
| Bundled Next docs | `node_modules/next/dist/docs/`. Read the relevant file before writing Next.js code (see `AGENTS.md`). |

## Primary goal

1. More salaried borrowers find creditexpertindia.com through Google and Bing when they search for loan and debt help.
2. For every visit and every lead, the team can see:
   - where the person came from,
   - what they did on each page and calculator,
   - where they dropped out of a form,
   - which visits became leads.
3. No visitor's name, phone number, PAN, date of birth or other personal data is ever sent to Google or Microsoft.
4. Consent is captured the way India's DPDP Act requires.

"Done" means all four of these work:

- **Leads:** a manager can open any lead and see its traffic source, landing page, Google Analytics visitor ID and Clarity recordings.
- **Funnels:** Google Analytics shows how many visitors reached each step of each form.
- **Search:** Search Console shows every public page indexed under `https://www.` with no canonical conflicts.
- **Speed:** Core Web Vitals pass at the 75th percentile (p75) on mobile.

---

## Where things stand today

| Area | Today | Evidence |
|---|---|---|
| Domain | Vercel redirects the bare domain to `www` with a 308. The code pointed every canonical, `og:url`, sitemap `<loc>` and the robots `Sitemap:` line at the redirecting bare domain. **Fixed locally, not deployed yet.** | `curl` on 2026-11-08; `lib/config.ts:45-52` |
| Search Console | No verification found in code or DNS checks. Baseline unknown. | |
| Crawlable links | 16 of 39 pages have no link in the server-rendered HTML: `/high-interest-loan`, `/how-it-works`, `/loan-balance-transfer` and all 13 city pages. The mega menu only exists after a hover or click, and the footer doesn't list these pages. | `Navbar.tsx:301,468`; `Footer.tsx:9-42` |
| Titles and descriptions | 29 of 39 titles are over 60 characters. The homepage description is 230 characters. The legal pages have descriptions under 50 characters. | `app/**/page.tsx`; `app/layout.tsx:27-32` |
| Sitemap | Every URL gets `lastModified: new Date()`, plus `changeFrequency` and `priority`. Google ignores the last two, and the first is not "verifiably accurate". | `app/sitemap.ts:45-50` |
| Structured data | The root layout has a bare `FinancialService` with no address, logo or `sameAs`. The FAQPage markup on `/debt-consolidation` and the calculator page doesn't match the visible FAQs. FAQ rich results were switched off for all sites on 7 May 2026. | `app/layout.tsx:82-89`; Google Search changelog, 8 May 2026 |
| City pages | 13 pages that differ only by city name. This matches Google's "doorway abuse" examples. | `components/CityLoanPage.tsx` |
| Trust content | Problems: <br>• Placeholder testimonials (`lib/pageContent.ts:33`).<br>• "10,000+ Users" and "4.9 Rating" badges.<br>• An "Interest Saved By Customers" counter that is computed, not measured.<br>• Fake "approved" notifications in the hero.<br>• A logo strip showing lenders that aren't in the lender data.<br>• "9.95%" in copy while the lowest rate in `lib/lenderEngine.ts` is 9.99.<br>• Thin legal pages: no grievance officer, DPDP section, company registration or lender names. | SEO audit, 2026-11-08 |
| Analytics | GA4 `G-VNY6TW0ZW0` loads with `lazyOnload`. There are no custom events, no consent banner and no Consent Mode. Leads carry no source or visitor ID, so GA can't say which visits became leads. | `app/layout.tsx:94-106` |
| Speed | Homepage initial JavaScript is about 1.8 MB raw (about 564 KB gzipped). In the initial bundle: d3-geo and gsap (homepage), firebase (a 661 KB chunk on 34 routes) and framer-motion (every page). The OG image is a 662 KB PNG. | Measured from a stale build, so treat as indicative |

---

## Decisions for the owner (defaults in **bold**)

| # | Decision | Default in this plan | Blocks |
|---|---|---|---|
| D1 | Main domain | **`www`**: Vercel recommends it and it's already live. Already applied in `lib/config.ts`. | Phase 1 |
| D2 | Tag setup | **gtag.js in code** (versioned, typed, testable). Google Tag Manager stays a later option. | Phase 2 |
| D3 | When the eligibility flow counts as a lead | **When the OTP is verified** (a verified, consenting, contactable person). The credit report view is tracked as a second key event. | Phase 4 |
| D4 | Analytics before the visitor chooses | **Off (`denied`) until they click Accept.** This is the cautious reading of DPDP. If counsel says a notice is enough for analytics, it is one constant to change. | Phase 2 |
| D5 | The 13 templated city pages | **Rewrite with real local content, starting with pages that already get Search Console impressions. Set the rest to `noindex,follow` until rewritten. Build real office pages for Dehradun, Delhi and Rudrapur.** | Phase 9 |
| D6 | INR value per lead (`generate_lead.value`) | **Leave unset** until the business supplies a number. | Phase 7 |
| D7 | Regulatory status (LSP, DSA or plain referral) | **Meet LSP-level website obligations until counsel decides.** | Phase 9 |
| D8 | Which numbers on the site are real | **Remove anything the owner can't back up with data.** | Phase 9 |

---

## Legal and policy context (summary, not legal advice; confirm with counsel)

**DPDP Act 2023 and DPDP Rules 2025**
- The Rules were notified on 13 Nov 2025 (G.S.R. 846(E)). The core notice and consent duties start about **13 May 2027**.
- MeitY proposed in January 2026 to bring that forward to about **13 Nov 2026**. **Check the e-Gazette now.**
- Consent must be "free, specific, informed, unconditional and unambiguous with a clear affirmative action" (s.6).
- The notice must be itemised and plain, and must say how to withdraw consent and how to complain (s.5, Rule 3).
- Withdrawing must be as easy as giving consent (s.6(4)).
- The business must be able to prove consent was given (s.6(10)), so keep consent records.
- No tracking of children (s.9).
- A cookie-banner tool is **not** a DPDP "Consent Manager".
- Until DPDP fully commences, IT Act s.43A and the 2011 SPDI Rules apply. They treat financial information as sensitive.

**RBI (Digital Lending) Directions 2025**, if the business counts as an LSP:
- A grievance officer listed on the website, with escalation to the RBI ombudsman after 30 days (para 11).
- Explicit consent before sharing personal data with any third party (para 12(iv)).
- No fees charged to borrowers (para 9(iv)).
- The lender's website lists its LSPs, and the LSP links back to it (para 8(iv)).
- For multi-lender offer screens: an unbiased display showing each lender's APR (para 6).

**TRAI TCCCPR Third Amendment (notified 18 Sep 2026)**
- Calling back within 7 days of an enquiry counts as a "Relationship".
- Promotional messages beyond that need explicit consent recorded in the DLT Consent Register.

**Google**
- GA policy forbids sending personal data (PII) to GA. GA's data redaction only catches email addresses and query parameters you list, not phone numbers or names.
- Debt products are a sensitive ads category, so remarketing and Customer Match are not allowed for them.

---

## Phase 0: Documentation discovery (done 2026-11-08)

> **How this serves the primary goal:** every later phase uses only APIs and rules confirmed in current docs. That stops the tracking from silently breaking, double-counting or leaking personal data.

### Allowed APIs

**Next.js 16.3.4.** All paths are under `node_modules/next/dist/docs/01-app/`.

**Metadata**
- `generateMetadata` and `metadata`: Server Components only; `verification`, `alternates`, `openGraph` and `robots` fields. See `03-api-reference/04-functions/generate-metadata.md` L14-40, L391-464 (`metadataBase`), L756-777 (`verification`), L823-857 (`alternates`).
- Metadata merges shallowly: a child's `openGraph` replaces the parent's whole object (L1344-1378).
- Generated sitemap: `03-api-reference/03-file-conventions/01-metadata/sitemap.md` L46-71. The example uses `new Date()`; don't copy that part.
- Generated robots: `.../01-metadata/robots.md` L24-37, L66-85.
- OG image: `.../01-metadata/opengraph-image.md` L97-150 (`ImageResponse`, 1200x630).
- Icons: `.../01-metadata/app-icons.md` L15-68 and L83-121 (`icon` and `apple-icon`; `apple-icon` must be PNG or JPG).

**JSON-LD**
- Pattern: `02-guides/json-ld.md` L15-41. Use a native `<script type="application/ld+json">` and escape `<` as `<`.
- Check with the validators listed at L71. Don't use `next/script` for JSON-LD (L87).

**Scripts**
- `next/script` strategies: `03-api-reference/02-components/script.md` L58-65.
- `beforeInteractive`: root layout only, injected into `<head>`, runs once per document load (L67-85, L156-167). Its documented uses include consent managers.
- Analytics belongs under `afterInteractive` (L169-190). `lazyOnload` is for chat and social widgets (L192-213).
- Inline scripts need an `id` (`02-guides/scripts.md` L237-258).

**Client hooks and libraries**
- `instrumentation-client.ts`: `03-api-reference/03-file-conventions/instrumentation-client.md` L6-55. `onRouterTransitionStart(url, navigationType)` is at L57-107. Only synchronous top-level code is guaranteed to run before hydration.
- `@next/third-parties` is not installed. Its `GoogleAnalytics` component has no consent option (`02-guides/third-party-libraries.md` L362-371), so **don't use it**.
- `useReportWebVitals` still calls the deprecated `onFID` (`node_modules/next/dist/client/web-vitals.js` L12-24), so **don't use it**. Use the `web-vitals` package directly.

**Google tag (gtag.js)**
- Commands: `config` (deprecated but supported: "Existing snippets containing gtag('config') will continue to work"), `get`, `set`, `event`, `consent`. Source: <https://developers.google.com/tag-platform/gtagjs/reference>, updated 2026-11-06.
- Ordering: `gtag('consent','default',{ad_storage, ad_user_data, ad_personalization, analytics_storage, wait_for_update})` must run **before** `config` or any `event`. Consent Mode doesn't store choices, so call `update` on every page load once the visitor has chosen. Source: <https://developers.google.com/tag-platform/security/guides/consent> (§gtag.js, §Implementation example).
- Reading IDs: `gtag('get','G-VNY6TW0ZW0','client_id', cb)` and the same with `'session_id'`. `gclid` can't be read this way; read it from the URL.
- Recommended lead events: `generate_lead {currency, value, lead_source}`, `qualify_lead`, `close_convert_lead`. `currency` is required if `value` is set. Source: <https://developers.google.com/analytics/devguides/collection/ga4/reference/events?client_type=gtag>, §Lead generation.
- Enhanced measurement sends `page_view` on browser-history changes, which is how Next.js client navigation gets counted. **Don't** also send a manual `page_view`, and note that `send_page_view:false` does not stop history page views. Sources: support.google.com/analytics/answer/9216061; <https://developers.google.com/analytics/devguides/collection/ga4/views?client_type=gtag>.
- Limits:
  - Event names and parameter names: 40 characters or fewer.
  - Parameter values: 100 characters or fewer (`page_title` 300, `page_location` 1000).
  - 25 parameters per event.
  - User properties: names 24 characters or fewer, values 36 or fewer.
  - 50 event-scoped and 25 user-scoped custom dimensions.
  - 30 key events.

**Clarity**
- Use the npm package `@microsoft/clarity`: `Clarity.init(id)`, `setTag(k, v)`, `event(name)`, `identify(id, sessionId?, pageId?, friendlyName?)`, `upgrade(reason)`, `consentV2({ad_Storage, analytics_Storage})`. Source: the README in the npm tarball.
- Inputs and dropdowns are masked in every masking mode. The default "Balanced" mode masks numbers and emails only. Mark anything else sensitive with `data-clarity-mask="true"`.

**web-vitals (v6)**
- `onLCP`, `onINP`, `onCLS`, each taking `(callback, opts)`. The attribution build adds a debug target.
- Thresholds: LCP 2.5 s / 4 s, INP 200 / 500 ms, CLS 0.1 / 0.25.
- Source: <https://github.com/GoogleChrome/web-vitals>, README §"Send the results to Google Analytics" and §"Send attribution data".

**Search Console and Bing**
- A Domain property can only be verified by DNS TXT record (support.google.com/webmasters/answer/9008080).
- Bing Webmaster Tools can import sites from Search Console.
- IndexNow covers Bing, Yandex, Naver, Seznam and Yep, **not Google**.

### Anti-patterns (don't do these)

**Google Analytics**
- No Universal Analytics APIs: `ga('send')`, `analytics.js`, `event_category`, `event_label`, `non_interaction`. Next's own vitals example still uses `event_label` and `non_interaction` (`02-guides/analytics.md` L224-236), so don't copy it.
- No custom events with reserved names: `click`, `error`, `form_start`, `form_submit`, `scroll`, `page_view`, `file_download`, `session_start` and others.
- Don't register `currency`, `gclid`, `session_id` or `user_id` as custom dimensions.
- `debug_mode:false` does not turn debug mode off. Leave the parameter out entirely.
- No personal data in any event parameter, URL, page title, user property or `user_id`.

**Clarity**
- Calling `Clarity.consentV2()` with no arguments **grants** consent.
- `data-clarity-unmask="false"` does nothing, and inputs can't be unmasked.

**Search**
- FAQ markup in the hope of rich results (switched off for all sites since 7 May 2026).
- Marking up content that isn't visible on the page.
- Self-serving `aggregateRating` on your own business.
- `Product` markup on loan pages.
- `priority` and `changefreq` in the sitemap (ignored).
- `lastmod` that isn't a real content date.
- `keywords` meta (ignored since 2009).
- An SVG-only favicon (Google doesn't support it).
- `crawl-delay` in robots.txt.

**Consent**
- Pre-ticked consent boxes.
- One combined checkbox covering callback, lender sharing, marketing and analytics.
- Loading analytics before the consent default has been set.

---

## Phase 1: Domain and indexing foundations

> **How this serves the primary goal:** search engines can't send visitors to pages they can't find or whose canonical is confused. Setting up Search Console now also starts a baseline for measuring every later SEO change.

**Size:** S (about 1 day of code, plus owner DNS access). **Needs:** none.

### What to implement

1. **Ship the domain fix.**
   - `lib/config.ts:45-52` now uses `https://www.creditexpertindia.com`. It was verified locally with `next dev`: robots, sitemap, canonical and `og:url` all use `www`.
   - Commit it together with the `AGENTS.md` and `CLAUDE.md` that `next dev` generates (it recreates them on every run, per `02-guides/ai-agents.md` L63).
2. **Search Console** (owner action).
   - Add a **Domain** property for `creditexpertindia.com` and verify it with the DNS TXT record at GoDaddy. Keep the record permanently.
   - Submit `https://www.creditexpertindia.com/sitemap.xml`.
   - Export a baseline into `docs/seo/baseline-2026-11.md`: Performance (last 3 months: queries, pages, clicks, impressions, CTR, position), the Page indexing counts by reason, and the Core Web Vitals status.
3. **Bing Webmaster Tools** (owner action). Use "Import from Google Search Console" and submit the same sitemap.
4. **Rewrite the sitemap** (`app/sitemap.ts`), following `sitemap.md` L46-71:
   - Build the URL list from a single route registry, plus `lib/cities.ts` and `content/articles.ts`. Don't hand-type slugs.
   - **Remove** `changeFrequency` and `priority`.
   - Set `lastModified` only from real dates: add `publishedAt` and `updatedAt` to each article in `content/articles.ts`, and a `PAGE_UPDATED` map for the other pages. Leave it out where no real date exists.
   - Skip pages set to `noindex` (see D5).
5. **robots.txt** (`app/robots.ts`):
   - Remove the `'/*?*utm_'` disallow (L10). Blocking crawl of tagged URLs stops Google from seeing their canonical, and blocked URLs can still be indexed as bare URLs.
   - Remove `/admin/`, since no such route exists. Keep `/api/`.
6. **Titles and descriptions** (each `app/**/page.tsx` and `content/articles.ts`):
   - Homepage: an explicit `title: { absolute: "…" }` of 60 characters or fewer, and a description of 155 or fewer.
   - Every page: title of 60 characters or fewer including the 22-character `" | Credit Expert India"` template. Use `title.absolute` where the template would push it over.
   - Every page: a description of 70–155 characters that says what the page does.
   - Fix `/how-it-works`: the description says "5-step" but the page shows 4 steps.
   - Write real descriptions for the three legal pages.
   - Delete the `keywords` arrays.
7. **Language.** Set `<html lang="en-IN">` (`app/layout.tsx:92`).
8. *(Optional)* **IndexNow** for Bing and others: put a key file in `public/<key>.txt` and run a post-deploy script that POSTs changed URLs to `https://api.indexnow.org/indexnow`. Google ignores IndexNow.

### Documentation references

- Next: `generate-metadata.md` L203-345 (title template and `absolute`); `sitemap.md` L46-71; `robots.md` L24-37.
- Google: sitemaps (<https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap>: lastmod must be "consistently and verifiably" accurate; priority and changefreq ignored); robots (<https://developers.google.com/search/docs/crawling-indexing/robots/robots_txt>).

### Verification checklist

- [ ] `curl -s https://www.creditexpertindia.com/robots.txt` shows `Sitemap: https://www.creditexpertindia.com/sitemap.xml`, and no `utm_` rule.
- [ ] The sitemap has 39 `<loc>` entries (minus any `noindex` pages), all starting `https://www.`, with no `<priority>` or `<changefreq>`. `<lastmod>` appears only where a real date exists.
- [ ] Every page's `<link rel="canonical">` starts with `https://www.creditexpertindia.com`. Check by script over the sitemap URLs.
- [ ] A title and description length check passes: write a jest test that imports every page's `metadata` and asserts the limits.
- [ ] Search Console: the property is verified, the sitemap shows "Success", and the baseline file is committed.

### Anti-pattern guards

- Don't stamp `new Date()` on every URL.
- Don't verify the Domain property with an HTML tag (impossible for Domain properties).
- Don't keep the bare domain in any absolute URL (`grep -rn "https://creditexpertindia.com" app lib components content` should return nothing).

---

## Phase 2: Consent, and loading the Google tag in the right order

> **How this serves the primary goal:** behaviour data is only usable and lawful if consent is captured first and honoured by every tag. Loading GA earlier (`afterInteractive`) also stops the quick visits that `lazyOnload` currently misses from going uncounted.

**Size:** M. **Needs:** D2, D4, and the counsel-reviewed notice text (a placeholder is fine for dev).

### What to implement

1. **`lib/consent.ts`.**
   - Type: `ConsentState = { analytics: boolean; recordings: boolean; noticeVersion: string; ts: string }`.
   - Stored in `localStorage` under `cei_consent`, with every read and write wrapped in try/catch.
   - Functions: `getConsent()`, `setConsent()` and `onConsentChange(cb)`.
   - It maps to Consent Mode as: `analytics_storage = analytics ? 'granted' : 'denied'`, with `ad_storage`, `ad_user_data` and `ad_personalization` **always `'denied'`** (no ads use is planned).
   - Export `ANALYTICS_DEFAULT` (D4), defaulting to `'denied'`.
2. **Notice text** in `content/consent.ts`, with a `NOTICE_VERSION`. Write in plain language and itemise:
   - Google Analytics: usage measurement, with GA's 14-month retention.
   - Microsoft Clarity: session recordings and heatmaps, kept 30 days. Inputs are masked.
   - Why each is used, and how to withdraw consent.
   - A link to the privacy policy.
3. **`components/consent/ConsentBanner.tsx`** (`'use client'`).
   - Show it when nothing is stored.
   - Buttons "Accept", "Reject" and "Choose" with **equal prominence**. "Choose" offers separate toggles for Analytics and Recordings.
   - Add a "Cookie settings" link in `Footer.tsx` legal links (L185-193) that reopens the banner, so withdrawing is as easy as giving consent.
4. **Rebuild the tag loading in `app/layout.tsx:94-106`.** Copy the order from Google's consent guide §gtag.js.
   - One `<Script id="gtag-init" strategy="beforeInteractive">` in the root layout. It must:
     1. define `dataLayer` and `gtag`;
     2. call `gtag('consent','default',{…'denied'…, analytics_storage: ANALYTICS_DEFAULT, wait_for_update: 500})`;
     3. read `cei_consent` and, if present, call `gtag('consent','update',…)` straight away;
     4. call `gtag('set',{content_group})`, computed from `location.pathname` using rules serialised from `lib/analytics/contentGroup.ts` (built in Phase 3; until then, skip this line);
     5. call `gtag('js', new Date())` and `gtag('config', GA_ID)`.
   - Then `<Script src="https://www.googletagmanager.com/gtag/js?id=…" strategy="afterInteractive">`.
   - The ID comes from `NEXT_PUBLIC_GA_ID`, with `G-VNY6TW0ZW0` as the fallback.
   - Why this order: every command, including events fired before the library loads, waits in `dataLayer` behind the consent default and `config`.
5. **Lead-form consent rework.** The legal text must be reviewed by counsel.
   - **EligibilityForm** (`components/EligibilityForm.tsx:613-621`): separate, unticked, required checkboxes for (a) fetching my credit report from the bureau and (b) Credit Expert India contacting me about this enquiry. Add an **optional** checkbox (c) to share my details with the partner lenders listed at `/partner-disclosures` (RBI DL para 12(iv)), plus an 18+ declaration.
   - **ContactForm** (`components/ContactForm.tsx:259-266`) and the **DebtConsolidationCalculator lead modal** (`components/DebtConsolidationCalculator.tsx:653-658`): the same structure.
   - **Fix the calculator modal's pre-ticked consent:** it defaults to `true` at L55-61 and isn't validated. Default it to `false` and validate it.
   - **Server side:** `app/api/contact/route.ts:21-52` and `app/api/calculator-lead/route.ts:20-68` must reject a submission when a required consent is missing (they currently store `!!consent`). They should store `consent: { items: {...}, noticeVersion, formTextVersion, at: serverTimestamp }`.
6. **Privacy policy** (`app/privacy-policy/page.tsx`): add sections for cookies and analytics, retention, rights and withdrawal, the contact person or grievance officer, and how to complain to the Data Protection Board. Counsel supplies the text; the page structure is built here.

### Documentation references

- Consent: <https://developers.google.com/tag-platform/security/guides/consent>, §gtag.js "Set up consent mode" and §"Implementation example". Ordering: "The order of the code here is vital."
- Next: `script.md` L67-85 and L156-167 (`beforeInteractive`), L169-190 (`afterInteractive`); `scripts.md` L237-258 (inline scripts need an `id`).
- DPDP Act ss.5-6 and Rule 3: MeitY PDFs (Act: meity.gov.in/static/uploads/2024/06/2bf1f0e9f04e6fb4f8fef35e82c42aa5.pdf; Rules: meity.gov.in/static/uploads/2025/11/53450e6e5dc0bfa85ebd78686cadad39.pdf).
- RBI DL Directions 2025, para 12: <https://www.rbi.org.in/scripts/FS_Notification.aspx?Id=12848>.

### Verification checklist

- [ ] On a fresh profile, before any choice: no `_ga` or `_ga_*` cookies, and GA requests carry the denied consent state (check the `gcs` and `gcd` parameters in DevTools → Network → `collect`).
- [ ] After "Accept", the `_ga` cookies appear and the consent state shows analytics granted. After a reload, the stored choice is applied without the banner showing.
- [ ] "Cookie settings" → Reject removes analytics on the next page load. Document whether GA cookies are cleared or simply stop updating.
- [ ] In the built HTML, the `gtag('consent','default'…` text comes before `gtag('config'`. Check with `curl -s <page> | grep -n "consent','default\|gtag('config'"`.
- [ ] Every lead form blocks submit without its required consents. Every API rejects a missing consent with a 400. Stored leads include the `consent` object.
- [ ] Unit tests for `lib/consent.ts`: storage failures fall back to defaults, and the version is written.

### Anti-pattern guards

- No `lazyOnload` for GA.
- No `config` before `consent default`.
- No pre-ticked boxes.
- Don't call the banner a "Consent Manager".
- Don't ship `ad_*: 'granted'` (no ads use, and debt products are a sensitive ads category).

---

## Phase 3: Event layer (typed events, personal-data guard, page groups, attribution capture, web vitals)

> **How this serves the primary goal:** one small, tested module decides exactly what is sent. That makes "see everything" possible without personal data ever leaving the site, and keeps event names consistent so the funnels work.

**Size:** M. **Needs:** Phase 2.

### What to implement (new files under `lib/analytics/` and `components/analytics/`)

1. **`lib/analytics/events.ts`.** A TypeScript union of every allowed event and its parameters (Appendix A is the source of truth).
   - Parameters are enums, band strings or numbers only. There are **no free-text parameters**.
   - Helpers: `bandAmount(inr)`, `bandRate(pct)` and `bandSavings(inr)`. They return fixed buckets such as `'5-10L'`.
2. **`lib/analytics/pii.ts`.** `findPII(value)` with patterns for:
   - Indian mobile numbers: `(?:\+?91[\s-]?)?[6-9]\d{9}`
   - emails
   - PAN: `[A-Z]{5}\d{4}[A-Z]`
   - Aadhaar: `\d{4}\s?\d{4}\s?\d{4}`

   `sanitizeParams()` drops any parameter that matches, and logs a warning in development.
3. **`lib/analytics/track.ts`.** `track(event)`:
   - does nothing on the server;
   - sanitises the parameters and calls `window.gtag('event', name, params)`;
   - mirrors funnel events to Clarity once Phase 6 lands;
   - is never awaited and never throws.
4. **`lib/analytics/contentGroup.ts`.** An ordered list of `[prefix, group]` rules plus `contentGroupFor(pathname)`. Groups: `home`, `product`, `calculator`, `city`, `article`, `learning`, `eligibility`, `company`, `contact`, `legal`. The layout inline script from Phase 2 uses the serialised list.
5. **`instrumentation-client.ts`** at the project root. Export `onRouterTransitionStart(url)`, which calls `gtag('set', {content_group: contentGroupFor(new URL(url, location.href).pathname)})`. The next history-based `page_view` then carries the right group.
6. **`lib/analytics/ids.ts`.** `getGaIds(): Promise<{clientId?: string; sessionId?: string}>` using `gtag('get', GA_ID, 'client_id'|'session_id', cb)`, with a 1-second timeout. It returns an empty object when GA is blocked or consent was denied.
7. **`lib/analytics/attribution.ts`.** Shared by client and server.
   - **Capture on first load per session:**
     - `utm_source`, `utm_medium`, `utm_campaign`, `utm_term`, `utm_content` and `utm_id`;
     - the click IDs `gclid`, `gbraid`, `wbraid`, `fbclid` and `msclkid`;
     - `landing_path` (pathname only);
     - `referrer_host` (hostname only);
     - `first_seen_at`.
   - **Where it's stored:** the current session's values go in `sessionStorage` (`cei_lt`). The first-touch values are kept in `localStorage` (`cei_ft`, expiring after 90 days, as in Google's GCLID capture script), **only when analytics consent is granted**.
   - `sanitizeAttribution(input)`: allowlisted keys only, each value capped at 100 characters. Use it on the server too.
8. **`components/analytics/WebVitals.tsx`** (`'use client'`, mounted in the root layout).
   - Run `npm i web-vitals@6`. Dynamically import `web-vitals/attribution` and call `onLCP`, `onINP` and `onCLS`.
   - Send events as in the README §"Send attribution data": `gtag('event', metric.name, {value: metric.delta, metric_id, metric_value, metric_delta, metric_rating, debug_target})`.
   - Don't use `useReportWebVitals`.
9. **`components/analytics/ClickTracker.tsx`** (`'use client'`, mounted once in the layout). One delegated `click` listener on `document`:
   - **CTA links:** `[data-analytics-cta]` elements send `cta_click {cta_id, cta_location, link_target}`.
   - **Contact links:** `wa.me`, `mailto:` and `tel:` links send `contact_click {contact_method, cta_location}`.

   This keeps server components (`ProductHero`, `PageSections`) as server components; they only gain `data-*` attributes.
10. **`components/analytics/TrackedAccordion.tsx`** (`'use client'`). Wraps Radix `Accordion.Root` with `onValueChange` and sends `faq_open {faq_set, faq_id}` when an item opens.

### Documentation references

- gtag `get`, `set`, `event`: <https://developers.google.com/tag-platform/gtagjs/reference>.
- Event limits and reserved names: support.google.com/analytics/answer/13316687 and answer/9267744.
- Personal data rules: support.google.com/analytics/answer/6366371 and answer/7686480.
- `instrumentation-client`: `instrumentation-client.md` L6-55 and L57-107.
- web-vitals: README in `node_modules/web-vitals/README.md` once installed, §Send the results to Google Analytics and §Send attribution data.
- GCLID capture: support.google.com/google-ads/answer/7012522, §Part 2.

### Verification checklist

- [ ] Jest tests:
  - `findPII` catches `9876543210`, `+91 98765 43210`, `ABCDE1234F`, `a@b.co` and `1234 5678 9012`;
  - `sanitizeParams` drops those values;
  - `contentGroupFor` maps every sitemap route;
  - `sanitizeAttribution` drops unknown keys and over-long values;
  - the band helpers return the right buckets at their edges.
- [ ] TypeScript: `track({name:'cta_click', params:{foo:'x'}})` fails to compile.
- [ ] GA DebugView (Tag Assistant): one `page_view` per client navigation, with the right `content_group`, `page_location` and **`page_title`**.
  - If titles show the previous page, turn off "Page changes based on browser history events" in GA Admin. Then send `page_view` manually from a `usePathname` effect after render, following the "Manual pageviews" section of <https://developers.google.com/analytics/devguides/collection/ga4/views?client_type=gtag>.
- [ ] Clicking a `#lead-form` anchor does **not** create a `page_view`.
- [ ] `LCP`, `INP` and `CLS` events arrive with `metric_rating`.

### Anti-pattern guards

- No calls to `gtag` outside `lib/analytics/`. Check with `grep -rn "gtag(" components app | grep -v analytics`.
- No `page_view` sent manually unless the fallback above was deliberately adopted.
- No `onFID`.
- No free-text parameter values: form field values, error message strings or file names.

---

## Phase 4: Track every interaction

> **How this serves the primary goal:** this is the "what did they do and where did they drop out" layer. It covers CTAs, menus, calculators and every step of each lead form, the OTP flow, the credit report and the report dashboard.

**Size:** L. **Needs:** Phase 3, and D3. Use the events in Appendix A and the code locations in Appendix B.

### What to implement

1. **CTAs.** Add `data-analytics-cta` and `data-analytics-location` attributes to:
   - `HeroGridBlock.tsx:168-175`, `ProductHero.tsx:23-28`, `LoanSolutionsSection.tsx:133-138,169-179`
   - `DebtConsolidation.tsx:122-127`, `WhoWeHelp.tsx:16-21`
   - the calculator CTAs: `SmartCalculator.tsx:72-77`, `LoanCalculator.tsx:86-91`
   - `Footer.tsx:71-86,146-155`, the Navbar CTAs at `Navbar.tsx:434-445,577-601`
   - the calculator page CTAs at `app/calculators/debt-consolidation-calculator/page.tsx:392-404`, and `not-found.tsx:33-54`.

   Use a stable `cta_id` naming scheme, `<page-group>_<purpose>`, for example `hero_check_eligibility`.
2. **Navigation.** Send `nav_menu_open {menu_id}` from `openMenu` (`Navbar.tsx:196-204`) and from the mobile group toggle (`Navbar.tsx:523-531`). `LoanSolutionsSection` row selection (`bringForward`, L114-122) sends `select_content {content_type:'loan_solution', content_id}`.
3. **FAQs.** Swap the Radix Root in `FAQ.tsx:54` and `PageSections.tsx:85` for `TrackedAccordion`.
4. **Calculators.** Applies to `SmartCalculator`, `LoanCalculator` and `DebtConsolidationCalculator`.
   - Send `calculator_start {calculator_id}` on the first input change of each page view.
   - Send `calculator_result {calculator_id, loan_amount_band, rate_band, tenure_months, savings_band, debts_count}` from slider `onValueCommit` (Radix supports it) or 2 seconds after the last change, at most once every 10 seconds.
   - On the debt consolidation calculator, also send `debt_row_add {debt_type}` and `debt_preset_apply {preset_id}`.
5. **Lead forms.** Use `form_id` = `eligibility`, `contact` or `calculator_lead`.
   - `lead_form_view`: when 50% of the form is visible, once per page view (IntersectionObserver).
   - `lead_form_start`: first field interaction.
   - `lead_form_submit`: submit clicked.
   - `lead_form_error {error_code, error_field}`: from fixed code lists, never the message text.
   - `generate_lead {lead_source: form_id, currency:'INR'[, value]}`:
     - contact and calculator lead: after the API returns success;
     - eligibility: when the OTP is verified (D3).
6. **OTP and credit report** (`EligibilityForm.tsx`).
   - **OTP send:** `otp_request {is_resend}` at L131; `otp_sent {otp_channel}` at L148-155; `otp_failed {otp_stage:'send', error_code}` at L157-169.
   - **OTP verify:** `otp_verified` at L247-249; `otp_failed {otp_stage:'verify', error_code}` at L251-255.
   - **Modal closed before verifying:** `otp_abandon` at L713-722 and L796-805.
   - **Bureau fetch:** `credit_report_fetch {bureau, report_outcome, duration_band}` at the cache-hit, live-success, fallback and failure points (L311, L327, L476-489, L456-474, L533-544).
   - **Report shown:** `credit_report_view {bureau}` (key event) at L91.
   - Set the user property `journey_stage` to `lead` and then `report_viewed`.
7. **Credit report dashboard** (`CreditReportDashboard.tsx`).
   - `report_tab_view {report_tab}` at L513.
   - `report_download {download_format}` at L359-372 and L385-393. Never include the file name: it contains the visitor's first name.
   - `lender_match_view {matched_count_band}` when the eligibility tab shows results.
8. **Bugs that block measurement.** Fix these in this phase:
   - "Speak with a Consolidation Expert" (`CreditReportDashboard.tsx:1735-1737`) has no handler. Make it a WhatsApp or `/contact` link with `data-analytics-cta="dashboard_expert"`.
   - `/api/otp/send` doesn't say which channel it used (`route.ts:111-115`). Return `channel`, and use it in the modal text, which is hardcoded to "via SMS" at `EligibilityForm.tsx:734`.
   - The "Download Bureau PDF" link (`CreditReportDashboard.tsx:359-363`) is an outbound `<a>`. GA's outbound-click tracking would send its full URL as `link_url`, which may contain tokens or identifiers. Make it a `<button>` that calls `window.open`, **or** list its query parameter names under GA data redaction (Phase 7). Check what the URL contains first.
   - `/contact` has two elements with `id="contact-form"` (`app/contact/page.tsx:39` and `ContactForm.tsx:147`). Rename the inner one.
9. **Click-to-call.**
   - The site has no `tel:` links at all. Add `tel:` links on `/contact` (number at `app/contact/page.tsx:66-73`), in the Footer, and in the mobile drawer.
   - Turn the plain-text email and WhatsApp details on `/contact` into links.

### Verification checklist

- [ ] Walk through each funnel in Tag Assistant (DebugView) and record the event sequence in `docs/analytics/qa-<date>.md`:
  - **eligibility:** view → start → submit → otp_request → otp_sent → otp_verified → generate_lead → credit_report_fetch → credit_report_view;
  - **contact:** view → start → submit → generate_lead;
  - **calculator lead:** modal → submit → generate_lead.
- [ ] Each wrong-path step sends exactly one `lead_form_error` or `otp_failed` with the right code: wrong OTP, expired OTP, invalid PAN, missing consent, salary below the minimum.
- [ ] No event carries a phone number, PAN, name, email or file name.
  - In DevTools, filter Network by `collect` and search the payloads for the test mobile and PAN used. Expect zero hits.
  - Also run `grep -rn "track(" components | grep -iE "mobile|pan|name|email|phone"` and review the matches.
- [ ] `calculator_result` fires no more than once every 10 seconds while dragging.

### Anti-pattern guards

- No `track` call with `formData.*` values.
- No custom event named `click`, `form_submit` or `error`.
- Don't fire `generate_lead` before the server has confirmed the lead.
- Don't track every keystroke or slider movement.

---

## Phase 5: Every lead carries its own story (attribution, visitor IDs and consent on the lead record)

> **How this serves the primary goal:** this joins "who the customer is" (Firestore, first-party, with consent) to "what they did" (GA and Clarity, pseudonymous). A manager can open a lead and see its source, landing page and full journey.

**Size:** M. **Needs:** Phases 2-4.

### What to implement

1. **Client side.** On submit in `ContactForm` (L45-103) and the calculator lead (L103-152), and when writing the credit report in `EligibilityForm` (the `setDoc` at L511-525), add these fields:
   - `attribution: getAttribution()` (first-touch and last-touch);
   - `ga: await getGaIds()` (`clientId`, `sessionId`);
   - `consent: getConsentRecord()`.
2. **Server side** (`app/api/contact/route.ts` and `app/api/calculator-lead/route.ts`):
   - Run `sanitizeAttribution()` and store the result on the `leads` document.
   - Also write a **copy with no personal data** to `lead_analytics/{autoId}`: `{lead_source, created_at, attribution, ga_client_id, ga_session_id, consent flags, status:'new'}`.
   - Return `leadRef` (that document's ID).
3. **New `app/api/lead-event/route.ts`** (POST). The eligibility flow writes its records from the browser, so it has no server step. After the OTP is verified, it calls this route to write its `lead_analytics` copy through the admin SDK. Validate the body with the same allowlist. Add a per-IP rate limit; there is none to copy, because the OTP routes only have a per-mobile cooldown. Reuse the Upstash Redis REST helper pattern in `lib/otpStore.ts:39-72`.
4. **Clarity tags** (after Phase 6): `ga_client_id` on load, and `lead_ref` after a lead. Recordings can then be found from a lead.
5. **`docs/analytics/lead-lookup.md`.** How to go from a lead to its journey:
   1. In Firestore, find `ga_client_id`.
   2. Open GA → Explore → User explorer and filter by that ID.
   3. In Clarity, filter recordings by the `lead_ref` tag.

### Documentation references

- `client_id` handoff: <https://developers.google.com/tag-platform/gtagjs/reference> §get examples.
- The lead copy holds **no** personal data, so it can go to BigQuery (Phase 7).

### Verification checklist

- [ ] Submit a test lead from a URL with `?utm_source=test&utm_medium=qa&utm_campaign=plan01`.
  - The Firestore lead has `attribution.last_touch.utm_source == 'test'`, a `ga.clientId` that matches the `_ga` cookie, and a `consent` record.
  - `lead_analytics/{leadRef}` exists and holds no name, phone number or PAN.
- [ ] With GA blocked by an ad-blocker, the lead still saves. `ga` is empty, but attribution is present.
- [ ] Unit test: `sanitizeAttribution` is applied on the server, and unknown or oversized fields are dropped.

### Anti-pattern guards

- Never put the phone number, PAN or name in `lead_analytics`, GA or Clarity.
- Never set GA `user_id` to anything derived from personal data. This plan doesn't set `user_id` at all.

---

## Phase 6: Session recordings and heatmaps (Microsoft Clarity)

> **How this serves the primary goal:** recordings and heatmaps show *how* people use the forms, calculators and pages: hesitation, rage clicks, dead clicks and scroll depth. Numbers alone can't explain why someone drops out. With masking and consent, no personal data is captured.

**Size:** S. **Needs:** Phases 2-3 and a Clarity project (free).

### What to implement

1. Run `npm i @microsoft/clarity`. Add a `'use client'` component, `components/analytics/Clarity.tsx`, mounted in the layout. It should:
   - call `Clarity.init(process.env.NEXT_PUBLIC_CLARITY_ID)` only in the browser and only if the ID is set;
   - call `Clarity.consentV2({ analytics_Storage: recordings ? 'granted' : 'denied', ad_Storage: 'denied' })` on load and on every consent change, **always with explicit arguments**;
   - set tags with `Clarity.setTag`: `content_group`, `ga_client_id` (once known) and `journey_stage`.
2. In `track()`, mirror the funnel events to Clarity with `Clarity.event(name)`: `lead_form_submit`, `otp_sent`, `otp_verified`, `generate_lead`, `credit_report_view`, `lead_form_error` and `otp_failed`. On `lead_form_error` and `otp_failed`, also call `Clarity.upgrade('form_error')`.
3. **Masking.** Keep project mode at **Balanced** (inputs are always masked). Add `data-clarity-mask="true"` to:
   - the `CreditReportDashboard` root, which shows names, addresses, account numbers and scores as text;
   - the OTP modal (`EligibilityForm.tsx:699`);
   - the `ContactForm` success view, which echoes details.
4. Clarity settings (owner action): connect the GA4 integration, set up smart events for the funnel events above, and build Clarity funnels that match Appendix A.

### Documentation references

- Clarity npm API: npm package `@microsoft/clarity` README.
- Masking: <https://learn.microsoft.com/en-us/clarity/setup-and-installation/clarity-masking>.
- Consent API: <https://learn.microsoft.com/en-us/clarity/setup-and-installation/clarity-consent-api-v2>.

### Verification checklist

- [ ] With recordings denied, there are no Clarity cookies and only cookieless page-level sessions.
- [ ] With recordings granted, requests go to `clarity.ms/collect`.
- [ ] A recording of a test credit report shows the dashboard fully masked, and the form inputs show as masked blocks.
- [ ] Filtering by the `lead_ref` tag finds the test lead's recording.

### Anti-pattern guards

- No `consentV2()` without arguments.
- No `data-clarity-unmask` on anything that shows customer data.
- No `identify()` with personal data, and no "friendly name".

---

## Phase 7: Reporting setup (GA4, Search Console and BigQuery links, dashboards)

> **How this serves the primary goal:** collected data is only useful if the team can read it. This phase turns the events into funnels, a lead-by-source dashboard and alerts.

**Size:** M (mostly console work). **Needs:** Phases 3-6 deployed, and D6.

### What to implement (owner or analyst actions, plus a docs file)

1. **GA4 Admin settings.**
   - Data retention: **14 months**.
   - Enhanced measurement: **on** for page views (with history), scrolls, outbound clicks and file downloads. **Off** for form interactions (we send our own events) and site search.
   - Data redaction: email **on**. Redact query parameters `mobile`, `phone`, `pan`, `email`, `name` and `dob`, plus the bureau-link parameters if any (Phase 4, item 8).
   - Internal traffic: define the office IP addresses (Dehradun, Delhi, Rudrapur) and set the filter to Active after testing. Exclude developer traffic.
   - Google Signals: **off**.
2. **Custom dimensions.** Register the Appendix A parameters as event-scoped dimensions (about 26, under the limit of 50), and `journey_stage` as user-scoped. New dimensions take 24-48 hours to appear.
3. **Key events:** `generate_lead` (with `value` once D6 is decided) and `credit_report_view`. Limit: 30.
4. **Links.** Connect Search Console to the web stream. Connect BigQuery with the **daily** export to a project with billing; free sandbox tables expire after 60 days.
5. **Firestore → BigQuery.** Install the "Stream Firestore to BigQuery" Firebase extension on the **`lead_analytics` collection only**, never `leads` or `credit_reports`. Joining on `ga_client_id` gives lead-level journeys.
6. **Saved explorations** in GA:
   - Eligibility funnel (open funnel, broken down by device and first-user source);
   - Contact funnel;
   - Calculator to lead;
   - Path exploration from each landing page group;
   - Content-group performance.
7. **Looker Studio report "Growth and Leads"**, one page each:
   - Acquisition: sessions and leads by source and medium, landing page;
   - Funnels;
   - Calculators and CTAs;
   - Search: Search Console queries and pages, CTR, position;
   - Speed: p75 LCP, INP and CLS by page group, from BigQuery;
   - Leads: `lead_analytics` by source, plus status once the admin dashboard updates it.
8. **Alerts.** A GA custom insight that fires when daily `generate_lead` falls more than 50% below the 4-week average.
9. **`docs/analytics/tracking-plan.md`.** The event dictionary (copied from Appendix A), the custom dimensions, key events, consent rules, a weekly review checklist, and the steps for creating a new event.

### Documentation references

- Custom dimensions: support.google.com/analytics/answer/10075209.
- Key events: answer/13128484.
- Retention: answer/7667196.
- Redaction: answer/13544947.
- BigQuery export: answer/9358801 and answer/9823238.
- Search Console link: answer/10737381.

### Verification checklist

- [ ] All Appendix A parameters show in reports 48 hours after registration.
- [ ] `generate_lead` is marked as a key event, and a test lead shows up in Realtime.
- [ ] The BigQuery `events_YYYYMMDD` tables are arriving daily. A join query from `lead_analytics` to the GA events on `ga_client_id` returns the test lead's events.
- [ ] Each week, compare the GA `generate_lead` count with Firestore leads. Log the gap (ad-blockers and consent denials) in the tracking plan.

### Anti-pattern guards

- Don't register reserved or personal-data parameters as dimensions.
- Never export `leads` or `credit_reports` to BigQuery.
- No session-scoped custom dimensions (they don't exist in GA4).

---

## Phase 8: Crawlable links, structured data, link previews and icons

> **How this serves the primary goal:** Google can find every page by following links, understands who the business is and where its offices are, and shared links (WhatsApp especially) show a proper preview. All of these send more searchers to the site.

**Size:** M. **Needs:** Phase 1. Can run alongside Phases 2-7.

### What to implement

1. **Links that Google can follow.**
   - Add Footer columns (`Footer.tsx:9-42`) for **all** loan pages (including `/app-loan`, `/credit-card-debt`, `/high-interest-loan`, `/loan-balance-transfer` and `/how-it-works`), **Cities** (office cities first, then the others per D5), and **Guides** (`/learning-center` plus the articles).
   - Optionally, render the mega-menu link lists in the server HTML, hidden until opened, instead of mounting them on first hover (`Navbar.tsx:162,301`).
2. **Links within the content.**
   - Product pages link to 2-3 relevant articles and the matching calculator.
   - Articles link to the calculator and product page they mention: `content/articles.ts:25` mentions "Our EMI calculator" without a link.
   - `/personal-loan` links to the city and office pages.
3. **New `/calculators` hub page** listing all three calculators. This also fixes the BreadcrumbList on the calculator page, where item 2 repeats item 3's URL (`app/calculators/debt-consolidation-calculator/page.tsx:59-71`).
4. **`lib/structuredData.ts`.** A `jsonLd(obj)` helper that escapes `<` as `<` (copy `02-guides/json-ld.md` L15-41), plus builders for each schema:
   - **Organization** (homepage only), using the Google organization doc's recommended fields:
     - `name`, `legalName` (from the owner), `url` (`www`) and `logo` (a 512×512 PNG, absolute URL);
     - `sameAs`: the Facebook, Instagram and LinkedIn URLs from `Footer.tsx:44-48`;
     - `contactPoint {telephone, email, contactType:'customer support', areaServed:'IN', availableLanguage:['en','hi']}`.
   - **WebSite** (homepage only): `name` and `url`, for the site name in results.
   - **FinancialService, one per office**, on that office's page (Phase 9) or on `/contact`:
     - `@id`;
     - a full `PostalAddress` with `streetAddress`, `addressLocality`, `addressRegion`, `postalCode` and `addressCountry`, splitting the PIN out of `lib/config.ts:17-25`;
     - `telephone` (a local number where one exists), `geo`, `openingHoursSpecification`, and `url` pointing at the office page.
   - **BreadcrumbList** on every inner page, with a matching visible breadcrumb component.
   - **Article** on each article: `headline`, `datePublished`, `dateModified`, `author` (`Person` with `url` to an author page), `publisher` and `image`. Show the "Published" and "Updated" dates on the page.
   - **Delete** the root `FinancialService` block (`app/layout.tsx:82-89,107`). It has no address and appears on every page.
   - **FAQPage.** Generate it only from the same data array that renders the visible FAQ (`components/FAQ.tsx:9-38` on `/faq`). **Delete** the copies that don't match on `app/debt-consolidation/page.tsx:16-53` and on the calculator page (L75-118). It gives no rich result, so it isn't worth maintaining a second copy.
5. **Link-preview images.**
   - Add `app/opengraph-image.tsx` (`ImageResponse`, 1200×630), copied from `opengraph-image.md` L97-150, as a branded default.
   - Add per-article `opengraph-image.tsx` showing the article title.
   - Keep each image well under 300 KB; WhatsApp is commonly reported to drop larger previews, so verify by sharing.
   - Remove the 662 KB `/img/logo_with_name.png` from `lib/seo.ts:4-9`.
6. **Icons.**
   - Add `app/icon.png` (512×512) and `app/apple-icon.png` (180×180), following `app-icons.md` L15-68.
   - Remove the `icons` block in `app/layout.tsx:58-65` (it points `apple` at a `.ico`, which `apple-icon` doesn't accept).
   - Keep `app/favicon.ico`.
   - Add `app/manifest.ts` with name, icons and `start_url` so Android users can install the site to their home screen.
7. **Alt text.**
   - Decorative backgrounds get `alt=""`: the homepage hero (`app/page.tsx:31-38`, currently "Hero Background") and the `EligibleLoansSlider` backgrounds (`index.tsx:118-124`, currently "Background").
   - `ProductHero` gets an `imageAlt` prop with a short real description per page.
   - The Navbar logo alt becomes "Credit Expert India" (`Navbar.tsx:390-397`).

### Documentation references

- Next: `json-ld.md` L15-41 and L71; `opengraph-image.md` L97-150 and L255-318; `app-icons.md` L15-68.
- Google structured data docs (each "Examples" section): organization, local-business, breadcrumb, article, site-names. Favicon formats: <https://developers.google.com/search/docs/appearance/favicon-in-search>.

### Verification checklist

- [ ] Crawling from `/` over the server-rendered HTML reaches every sitemap URL (write a small script: fetch, parse `<a href>`, breadth-first search).
- [ ] The Rich Results Test passes for Organization (homepage), Breadcrumb (an inner page) and Article (an article). The Schema validator shows no errors on the office `FinancialService`.
- [ ] Sharing a page in WhatsApp shows the preview card. `curl -sI <og:image url>` reports a size under 300 KB.
- [ ] Every `next/image` has a deliberate `alt` (`grep -rn 'alt="Background"\|alt="Hero Background"'` returns nothing).

### Anti-pattern guards

- No `aggregateRating` or `review` on your own business.
- No FAQ markup that differs from the visible text.
- No `Product` markup.
- Keep JSON-LD out of `next/script`.

---

## Phase 9: Content, trust and local presence

> **How this serves the primary goal:** for finance pages, Google gives the most weight to trust. Pages built from templates, unsupported claims and missing disclosures hold back rankings and expose the business to regulatory risk. Real local pages and Business Profiles bring nearby searchers in through Maps.

**Size:** L. **Needs:** owner and counsel input (D5, D7, D8). Can start in parallel with other phases.

### What to implement

1. **Claims cleanup** (owner signs off each item, per D8):
   - Remove the computed "Interest Saved By Customers" counter (`HeroGridBlock.tsx:47-73,135`).
   - Remove the fake approval notifications (`components/hero/utils.ts:37-50`).
   - Remove the "10,000+ Users" and "4.9 Rating" badges (`EligibleLoansSlider/index.tsx:157-168`).
   - Replace the placeholder testimonials (`lib/pageContent.ts:33-47`) with real, consented quotes, or remove the section.
   - Make "50+ lenders" the true count, with the lenders named on `/partner-disclosures`.
   - Limit the logo strip to actual partners.
   - Make the 9.95% claim match the lender data, with a single source in `lib/config.ts` `claims`.
   - Reword "Pre-Approved", "endorsed by banking institutions" and "100% TRANSPARENT".
2. **Trust and legal pages.**
   - **About:** named people with credentials, founding year, legal entity, CIN and GSTIN, office photos.
   - **Partner disclosures:**
     - the named partner banks and NBFCs, linking to each one's website (RBI DL para 8(iv));
     - your status (D7);
     - "paid by lenders, never by you" (para 9(iv));
     - the **grievance redressal officer**'s name, email and phone, with the 30-day escalation route to the RBI CMS portal (para 11).
   - **Privacy policy and terms:** finished with counsel's text (structure from Phase 2).
   - **New editorial policy page:** who writes and who reviews the guides.
3. **Loan disclosure block** on loan pages, built from lender data:
   - APR range;
   - minimum and maximum tenure;
   - one worked example of total cost including fees.

   This builds trust, and Google Ads requires it on landing pages if you ever advertise personal loans (adspolicy answer 2464998).
4. **Articles.**
   - Add an author page with credentials, a reviewer, and visible Published and Updated dates that match `datePublished` and `dateModified`.
   - Deepen each article with worked ₹ examples, comparison tables and links to the calculators.
   - Plan new guides from real Search Console queries after 4-8 weeks of data, not from guesses.
5. **Office pages for Dehradun, Delhi and Rudrapur:** address, embedded map, opening hours, local phone, directions, team, and a local FAQ. Each Business Profile's website link points to its own page.
6. **City pages (per D5).**
   - Rank the 13 by Search Console impressions.
   - Rewrite the top ones with genuinely local material: real local lender availability, local examples, branch or partner presence.
   - Set the rest to `robots: { index: false, follow: true }` and drop them from the sitemap until rewritten.
   - Never generate text by swapping in city names.
7. **Google Business Profile, one per office** (owner action):
   - the same business name as on the signage, with no keywords;
   - the same category for all three;
   - the real address and a local phone number;
   - the website set to the office page;
   - real reviews only, with no incentives.

### Documentation references

- Spam policies, doorway and scaled content: <https://developers.google.com/search/docs/essentials/spam-policies>.
- Helpful content and YMYL: <https://developers.google.com/search/docs/fundamentals/creating-helpful-content>.
- Publication dates: <https://developers.google.com/search/docs/appearance/publication-dates>.
- Business Profile guidelines: support.google.com/business/answer/3038177.
- RBI DL Directions 2025: <https://www.rbi.org.in/scripts/FS_Notification.aspx?Id=12848>.

### Verification checklist

- [ ] `grep -rn "10,000+\|4.9 Rating\|Interest Saved\|Placeholder stories" components lib content` returns nothing, or every remaining match has a source noted in a code comment.
- [ ] `/partner-disclosures` lists the named lenders, the grievance officer, and the compensation statement.
- [ ] Every article shows matching visible dates and JSON-LD dates, plus an author link.
- [ ] Every indexable city page has unique body copy. A similarity check over page text (excluding the shared template) is under 50% between any pair.
- [ ] All three Business Profiles are verified, and each links to its office page.

### Anti-pattern guards

- No fake or incentivised reviews.
- No bumping dates without real changes.
- No pages that only swap in a city name.
- No keywords in the Business Profile name.

---

## Phase 10: Speed (Core Web Vitals)

> **How this serves the primary goal:** faster pages rank a little better and, more importantly, keep mobile visitors on low-end phones long enough to reach the forms.

**Size:** M. **Needs:** Phase 3's web-vitals data (at least 2 weeks) to choose priorities. Field data beats lab data.

### What to implement (in order of expected gain; re-rank using the real data)

1. **Firebase only when needed.** The client SDK (a 661 KB chunk on 34 routes) should load inside the handlers that use it: `EligibilityForm` cache check and write, and the `CreditReportContext` save. Use dynamic imports of `lib/firebaseClient` and `firebase/firestore` instead of static imports (`EligibilityForm.tsx:8-9`).
2. **d3-geo out of the initial bundle.** It currently arrives through the import chain `HeroGridBlock.tsx:214` → `hero/HeroVisualBlock.tsx:6` → `LoanNotificationManager` → `hero/utils.ts:1`. Load `LoanNotificationManager` inside the existing `ssr:false` island.
3. **gsap only when visible.** Import `AnimatedPhoneMockup` dynamically from `LoanStage.tsx:6` when the section comes into view.
4. **framer-motion in the Navbar.** Switch it to `LazyMotion` with `domAnimation` and the `m` components, or use CSS transitions (`Navbar.tsx:7`).
5. **Images.**
   - Only the LCP image gets `preload`; `priority` is deprecated in Next 16.
   - Partner logos load lazily; there are currently 22 marked priority at `HeroGridBlock.tsx:194-204`.
   - Resize `logos/ICICI.png` (3840 px wide), and convert `eligibility.png` (410 KB) and `contact.png` (243 KB) to WebP or AVIF at display size.
6. **Clean up.**
   - Remove `lenis` and `components/SmoothScroll.tsx`, which are unused.
   - Remove the unreferenced files in `public/`: `india.geojson`, `logo.png` (a duplicate), and the unused `*.webp` files listed in the SEO audit.
   - Remove the unused `import * as THREE` in `hero/utils.ts:2`.
7. **Budgets.** Write down targets and check them every month: p75 LCP ≤ 2.5 s, INP ≤ 200 ms, CLS ≤ 0.1 on mobile, and homepage initial JS ≤ 250 KB gzipped (measured with `npm run analyze`).

### Documentation references

- Next lazy loading: `02-guides/lazy-loading.md` L60 (no code splitting when a Server Component dynamically imports a Client Component) and L76.
- Image `preload`: `03-api-reference/02-components/image.md` L293.
- Core Web Vitals thresholds: <https://web.dev/articles/vitals>.

### Verification checklist

- [ ] `npm run analyze` shows no `firebase`, `d3-geo` or `gsap` in the homepage's initial chunks.
- [ ] Lighthouse (mobile) on `/`, `/personal-loan` and one article: record the scores before and after.
- [ ] In GA (Phase 3), p75 LCP, INP and CLS by `content_group` improve over 28 days. The Search Console Core Web Vitals report is "Good" or validating.
- [ ] The forms still work end to end: OTP, credit report fetch and lead save.

### Anti-pattern guards

- No `ssr:false` on content that Google needs to see.
- Don't remove `preload` from the real LCP image.
- No dynamic imports that move layout and add CLS.

---

## Phase 11: Final verification

> **How this serves the primary goal:** this proves the whole loop works end to end. A search visit becomes a tracked journey and a lead with its source attached, with no personal data in third-party tools.

1. **Documentation conformance.**
   - Every gtag call matches the Allowed APIs in Phase 0.
   - Every JSON-LD block passes the Rich Results Test or the Schema validator.
   - The consent order is correct in the built HTML.
2. **Anti-pattern greps.** All must come back empty:
   - `grep -rn "lazyOnload" app | grep -i gtag`
   - `grep -rn "onFID\|useReportWebVitals\|event_label\|non_interaction" app components lib`
   - `grep -rn "debug_mode: *false\|consentV2()\|data-clarity-unmask" app components lib`
   - `grep -rn "https://creditexpertindia.com" app lib components content`
   - `grep -rn "changeFrequency\|priority:" app/sitemap.ts`
   - `grep -rn "'page_view'" components lib` (except the documented fallback)
3. **Tests.** Run `npm test` (PII guard, attribution, content groups, consent, metadata lengths), `npm run lint` and `npm run build`. All must pass.
4. **End-to-end QA script** in `docs/analytics/qa-<date>.md`, on a phone and on a desktop:
   1. Arrive from `?utm_source=qa&utm_medium=e2e`.
   2. Accept analytics and recordings.
   3. Use a calculator.
   4. Open an FAQ.
   5. Complete the eligibility flow with a test PAN and mobile.

   Then confirm:
   - **GA DebugView:** the expected event sequence.
   - **Firestore:** the lead has attribution, GA IDs and the consent record, and `lead_analytics` has no personal data.
   - **Clarity:** a masked recording, found by its `lead_ref` tag.
   - **BigQuery:** the next-day join returns the journey.
5. **Search check after 4-8 weeks.** Compare with `docs/seo/baseline-2026-11.md`:
   - indexed pages (expect all canonical `www` URLs indexed);
   - impressions and clicks by page group;
   - Core Web Vitals status.

---

## Appendix A: Tracking plan (source of truth for `lib/analytics/events.ts`)

| Event | When it fires | Parameters (all non-personal) |
|---|---|---|
| `page_view` | Automatic (enhanced measurement, history changes) | `content_group` (via `set`) |
| `cta_click` | Any marked CTA | `cta_id`, `cta_location` (hero, section, navbar, footer, calculator, dashboard, not_found), `link_target` (path or `#anchor`) |
| `contact_click` | `wa.me`, `mailto:` or `tel:` link | `contact_method` (whatsapp, email, phone), `cta_location` |
| `nav_menu_open` | Mega menu or mobile group opened | `menu_id` (loans, calculators, cities, resources) |
| `select_content` (recommended) | Loan solution row selected | `content_type` = `loan_solution`, `content_id` (for example `credit-card-debt`) |
| `faq_open` | Accordion item opened | `faq_set` (home, faq, page:<key>), `faq_id` (`item-3`) |
| `calculator_start` | First input in each page view | `calculator_id` (smart_emi, loan_savings, debt_consolidation) |
| `calculator_result` | Slider committed, or a 2 s pause (max once per 10 s) | `calculator_id`, `loan_amount_band`, `rate_band`, `tenure_months`, `savings_band`, `debts_count` |
| `debt_row_add` / `debt_preset_apply` | Debt consolidation calculator | `debt_type` / `preset_id` |
| `lead_form_view` | Form 50% visible, once per page view | `form_id` (eligibility, contact, calculator_lead), `form_location` (content group) |
| `lead_form_start` | First field interaction | `form_id` |
| `lead_form_submit` | Submit clicked | `form_id` |
| `lead_form_error` | Validation or API error shown | `form_id`, `error_code` (consent_missing, name_missing, dob_missing, pan_invalid, mobile_invalid, salary_below_min, emi_too_high, network, server), `error_field` |
| `otp_request` | OTP send requested | `is_resend` |
| `otp_sent` | Send API succeeded | `otp_channel` (whatsapp, sms) |
| `otp_failed` | Send or verify failed | `otp_stage` (send, verify), `error_code` (rate_limited, dispatch_failed, incorrect, expired, too_many, network) |
| `otp_verified` | Verify succeeded | — |
| `otp_abandon` | Modal closed before verifying | — |
| `generate_lead` (**key event**, recommended) | Contact or calculator lead saved; eligibility OTP verified (D3) | `lead_source` (= `form_id`), `currency` = `INR`, `value` (D6) |
| `credit_report_fetch` | Bureau fetch finished | `bureau`, `report_outcome` (live, fallback, cache, failed), `duration_band` |
| `credit_report_view` (**key event**) | Dashboard shown | `bureau` |
| `report_tab_view` | Dashboard tab changed | `report_tab` |
| `report_download` | Any report download | `download_format` (bureau_pdf, cibil_pdf, png_basic, png_loans, png_eligibility) |
| `lender_match_view` | Eligibility tab results shown | `matched_count_band` |
| `LCP` / `INP` / `CLS` | web-vitals | `value`, `metric_id`, `metric_value`, `metric_delta`, `metric_rating`, `debug_target` |

**User property:** `journey_stage`, which takes the values `lead` and `report_viewed`. Visitors who haven't reached a lead don't get the property.

**Bands:**
- Amount: `<1L`, `1-3L`, `3-5L`, `5-10L`, `10-25L`, `25-50L`, `50L+`
- Rate: `<10`, `10-12`, `12-14`, `14-16`, `16-20`, `20-24`, `24+`
- Monthly savings: `0`, `<1k`, `1-3k`, `3-5k`, `5-10k`, `10k+`
- Duration: `<3s`, `3-10s`, `10-30s`, `30s+`

**Never sent:** form field values, salary, names, phone numbers, PAN, date of birth, email, file names, error message text, bureau URLs.

## Appendix B: Where events attach in the code (as of `f1b6f22`; find by handler name if lines moved)

**EligibilityForm** (`components/EligibilityForm.tsx`)

| What | Handler | Lines |
|---|---|---|
| Submit | `handleFetchReport` | L94-129 |
| OTP send | `handleRequestOtp` | L131-174 (modal opens at L149) |
| OTP verify | `handleVerifyOtp` | L226-259 |
| Bureau pipeline | `proceedToFetchReport` | L261-548 |
| Step change | — | L91 |
| Modal close | — | L713-722, L796-805 |
| Resend | — | L812-820 |
| Form root | `#check-eligibility` | L650 |

**ContactForm** (`components/ContactForm.tsx`): `handleSubmit` L45-103 (success at L89, error at L98-102); form root L147.

**DebtConsolidationCalculator** (`components/DebtConsolidationCalculator.tsx`)
- Lead submit: `handleLeadSubmit` L103-152.
- Modal open: L509.
- Presets: L98-100.
- Debt rows: add, update and remove at L76-96.
- Range inputs: L340 and L370; processing fee at L391.

**Other calculators**
- `SmartCalculator.tsx`: `onValueChange` at L91, L104 and L117; CTA at L72-77.
- `LoanCalculator.tsx`: L58 and L132; CTA at L86-91.
- `components/ui/slider.tsx`: spreads its props over the Root (L85-93), so a consumer's `onValueCommit` passes through.

**Navigation**
- `Navbar.tsx`: `openMenu` L196-204; desktop CTAs L434-445; mobile L449-601; `assessmentHref` L256.
- `Footer.tsx`: CTA and WhatsApp L71-86; social L112-123; mailto and WhatsApp L146-155; legal L185-193.

**Accordions:** `FAQ.tsx` L54; `PageSections.tsx` L85.

**Dashboard** (`CreditReportDashboard.tsx`): tabs L513; downloads L359-372 and L385-393; dead CTA L1735-1737; employer pick L861-869.

**Site URL:** `lib/config.ts` L45-52.

**Layout** (`app/layout.tsx`): GA scripts L94-106; root JSON-LD L82-89 and L107; icons L58-65.

## Appendix C: Side findings outside this plan (fix separately)

1. **Secret in the code.** `app/api/verify-msg91-otp/route.ts` has no caller, returns a mocked success even when MSG91 rejects the token (L26-33), and contains a hard-coded fallback auth key (L11). **Delete the route and rotate that key.**
2. **Personal data in logs.** `app/api/system-logs/route.ts:48` stores `application_id: app_${mobile}` unmasked, although the route itself masks `identifiers.mobile`. Hash or remove it (DPDP data minimisation).
3. **Personal data in document IDs.** Credit report Firestore document IDs are `${PAN}_${mobile}_${bureau}` (`EligibilityForm.tsx:269,494`), and `search_tokens` stores PAN and mobile prefixes. Consider using the existing but unused `generateHmac` (`lib/security.ts:10-19`).
4. **Inconsistent business rules.** The minimum salary is above ₹45,000 on the contact form but at least ₹25,000 on the calculator, and that calculator's client and server disagree at exactly ₹25,000. Separately, `CreditReportContext` never sets `isDirty`, so saving overrides never runs.
5. **Bypass code.** `OTP_DEV_BYPASS` must be unset in production; confirm in the Vercel environment settings.

## Appendix D: Not in this plan

- Google Tag Manager or server-side tagging.
- Google Ads remarketing and audiences (not allowed for debt products).
- Hindi-language pages.
- Sending `qualify_lead` and `close_convert_lead` from the admin dashboard (separate repo) through the Measurement Protocol.
- A/B testing.
- Moving calculator URLs under `/calculators/`.
- Security headers and HSTS preload for pages.
- Meta Pixel.
