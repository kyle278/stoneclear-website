# Stone Clear enquiry form

Implemented 4 November 2026 using form-experience and websiteconnect-forms.

## Outcome and question map

This is a request to discuss a surface and arrange a demonstration/quote, not a booking or instant estimate. The entry explains that email is collected before sending. Five stages: Service, Space, Project, Your details, Send. No review page. Back and browser Back preserve answers in memory; refresh does not persist a draft.

| Field | Purpose | Required | Control / progression | Destination |
| --- | --- | --- | --- | --- |
| service | Route the enquiry to the relevant work | Yes; uncertainty allowed | SVG icon answer-and-continue buttons | Portal submission |
| property_type | Establish domestic/hospitality/commercial context | Yes | SVG icon answer-and-continue buttons | Portal submission |
| location | Plan a site visit using town/county only | Yes | Text, explicit Continue | Portal submission |
| message | Describe wear, damage or approximate area when known | No | Textarea, explicit Continue | Portal submission |
| first_name / last_name | Address the enquirer and preserve CRM identities | Yes, separately | given-name / family-name autocomplete | Portal + CRM Lead |
| email | Reply about the enquiry | Yes | Email, explicit Continue | Portal + CRM Lead + Consent destination |
| phone | Optional follow-up channel | No; validated when supplied | Telephone input | Portal + CRM Lead when supplied |
| privacy_consent | Acknowledge the linked notice | Yes; unchecked initially | Full-card native checkbox, final Send | Portal submission / evidence |
| email_marketing_consent | Separate surface-care/services email preference | No; unchecked initially | Separate full-card checkbox, final Send | Portal + canonical Consent evidence |

No full street address, budget, exact area, upload or duplicate full-name question is required. A legacy display name is derived by joining the independently entered first and last names. The email reply route justifies required email and optional phone. All services use the same useful context, so there are no stale conditional fields to retain. Icons are Lucide SVGs; no emojis at any size.

## Verified Portal configuration

- Portal: https://portal.ingeniumconsulting.net
- Organisation: Stone Clear, slug stoneclear, ID 2ca73c5c-f25d-48f7-bda4-5ddf1d18bcd1. No pre-existing matching org/site was found. Created with free plan, lifecycle onboarding, without a customer owner invitation, license purchase or activation bypass.
- Site: 0006b20c-d36e-4d2a-95f5-0a36516ab952, domain stoneclear-website.vercel.app, active, existing Vercel project prj_1oxWvizXqF4sNnB5hvvsXc0IHOIA.
- Form: 795474db-b1e4-46c8-ad06-fb9ec8e31578, slug contact, active. Form definitions match the actual controls. notification_email is null: intake is Portal-only; no customer notification email or invitation is sent.
- Invite count after setup and first accepted submission: 0.
- Website stores public identifiers only in lib/enquiry.ts. Portal administration used credentials in the Portal project's own environment; none were copied into this repository or Vercel project.

## Submission contract

Kyle explicitly requested no Turnstile for now. The deployed V2 endpoint enforces Turnstile for non-development origins. This version deliberately uses the existing Portal-managed compatibility endpoint POST /api/websites/forms/submit, as documented in Portal source website-setup/website-forms-portal-integration.md and app/api/websites/forms/submit/route.ts. No public origin was relabelled as development, no Portal security setting was changed and no direct website Supabase insert remains.

The same-origin website proxy /api/portal-form-submit validates the exact service/property enums, town, first/last names, required email, optional phone, privacy acknowledgement and field lengths. It fixes site/form identity server-side, derives the display name and notice version, forwards only allowed UTM fields, and requires a matching accepted Portal receipt before returning success. The source is the canonical /contact path; arbitrary query strings and visitor identifiers are not captured. No analytics SDK or optional tracking was activated.

Baseline abuse controls: exact request-origin check, JSON/body-size checks, honeypot, bounded per-process attempt limiting (8 valid attempts per 10 minutes per IP hash), client in-flight lock and same-request coalescing/cache. No raw IP is retained in the website cache. Request IDs are reused on unchanged client retries. The cache is warm-process only: the legacy Portal route has no durable cross-instance idempotency. A timeout after durable upstream intake can still create a duplicate on retry; do not claim exactly-once delivery. Move to V2 durable idempotency when the requested Turnstile omission is lifted, or implement a supported scoped backend contract before making stronger guarantees.

The old TODO SQL seed was replaced with a superseded notice. No Portal service role is needed on the website. The privacy page now describes the real form and separate email preference; no fixed retention period, response SLA or legal-compliance certification was invented.

## Verification evidence

Five meaningful validator tests pass via npm run test:forms: email-only enquiry with marketing off; separate accented/one-character names; privacy independent from marketing; required email and optional international phone validation; scoped step validation, enum/length checks and exclusion of untrusted tenant fields.

Direct synthetic Portal connection test accepted HTTP 201, submission 6356a0b7-e1ce-436c-a193-3f77ddc37317, matched site/form/org above. Confirmed stored fields and CRM lead 5c932d4d-56cc-435c-8935-4dc3131ee3cd with independently preserved first/last names. Canonical consent capture has channel email, submitted_choice false and preference_key email_marketing_consent. No notification recipient configured.

Browser checks so far: missing town and invalid email stay on their steps with local errors; names and other answers survive in-app Back and browser Back; rapid double activation advances once; both final consent controls start unchecked, marketing text toggles only marketing and keyboard Space reverses it; missing privacy blocks Send; the policy link does not select either checkbox. At 375×667, contact and consent steps fit with navigation visible and no horizontal overflow. Further deployed receipts and final checks are recorded in notes/VERIFICATION.md.

Positive consent fixture: HTTP 201 receipt 91e609b1-c58e-4d36-a3a4-ffa4d80cce27, canonical email consent capture submitted_choice true with preference_key email_marketing_consent. Browser retry fixture 47161f2c-6adc-41f4-ae88-9e9e7ecfe3cd has marketing false and CRM processing true. Organisation invite count remains zero.

Deployed browser receipt 49cff4e2-d53b-4369-9465-3fc70d095f02 was accepted from the public Vercel alias, then verified against the exact org/site/form. Required privacy true, optional marketing false and phone blank; CRM lead/name mapping and declined email consent are confirmed. Invite count remains 0 and notification_email is null. Client banner application deployment e2dc76a is also READY; the form commit preserves all 20 real logos and the full client list.
