# From a lead to its journey

Every lead saved by this site (contact form, calculator assessment, or a
verified eligibility enquiry) is written in two places:

1. **`leads`** (contact, calculator-lead) or **`credit_reports`**
   (eligibility) — the real record, with the person's name, phone number
   and (for eligibility) PAN. This is what the team works from.
2. **`lead_analytics`** — a copy with no personal data at all: just the
   lead's source, its first- and last-touch marketing attribution, its GA4
   `ga_client_id`/`ga_session_id`, and its consent flags. This is the one
   safe to export to BigQuery (see Phase 7) or to join against raw GA4
   events.

Both are written from the same request (or, for eligibility, right after
OTP verification), so they share a timestamp but not an ID — there's no
foreign key between them on purpose, since one record intentionally carries
PII and the other intentionally doesn't.

## To find a lead's analytics journey

1. Open the lead in Firestore (`leads` or `credit_reports`).
2. Note its `createdAt` (or `created_at`) timestamp.
3. In the `lead_analytics` collection, filter by `lead_source` (`contact`,
   `calculator_lead` or `eligibility`) and a timestamp close to the lead's —
   there is no shared ID, so match on time and source. (A future pass could
   write the `lead_analytics` doc ID back onto the lead record if this
   manual matching turns out to be too slow in practice.)
4. Copy that record's `ga_client_id`.
5. In GA4 → Explore → User Explorer (or a saved exploration), filter by that
   Client ID to see every event from that visitor: their acquisition
   channel, which pages they viewed, which calculator they used, and
   whether they hit any `lead_form_error` before converting.
6. Once Clarity is wired up (Phase 6), filter Clarity recordings by the
   `ga_client_id` tag to watch the session itself.

## Why `lead_analytics` has no personal data

Google's GA4 policy forbids sending anything Google could recognise as PII
(names, phone numbers, emails — see
support.google.com/analytics/answer/7686480), and a Measurement Protocol
export to BigQuery carries the same restriction in spirit even though
Google doesn't enforce it mechanically for that path. Keeping `leads` and
`credit_reports` out of any analytics pipeline, and only ever exporting
`lead_analytics`, means that restriction is upheld by construction rather
than by remembering to redact fields correctly every time.
