# Stone Clear website

Multipage Stone Clear website sample, continuing the existing standalone client repository and Vercel project.

## Run locally

```sh
npm ci
npm run dev
```

Production checks: `npm run build`, `npm run lint` and `npm run test:forms`. Production server: `npm run start`.

## Pages

Home, services, stone restoration, gallery, about, clients, contact and privacy. Client-owned photography is served in WebP. The logo is a monochrome, outlined SVG; primary Archivo and secondary Lato are locally served by next/font. Animated draggable before/after comparison, five-stage guided enquiry form, mobile navigation and reduced-motion controls are implemented.

The enquiry form submits to Stone Clear’s registered Portal form through a same-origin validation proxy. Email is required; phone and marketing opt-in are optional. Required privacy acknowledgement and a separate optional email-consent card appear at the final step. Success requires an accepted Portal receipt. Public site/form IDs are configured in `lib/enquiry.ts`; no Portal database credentials or Vercel secrets are needed. Turnstile is omitted at Kyle’s request, using the existing Portal-managed compatibility endpoint. No analytics/tracking is mounted. See `notes/FORMS.md` for the exact tenant, consent evidence and retry limitations.

`PROJECT.md` records verified project connections and handoff status. `DESIGN.md` describes the design. `notes/SOURCES.md` records public facts and assets. Local `qa/` and `research/` are ignored and are not website content.

## Publishing

Existing public GitHub repository: https://github.com/kyle278/stoneclear-website

Existing Vercel dashboard: https://vercel.com/kyle278s-projects/stoneclear-website

Production branch: `master`. Vercel uses the repository root, Next.js, `npm ci`, and `npm run build`. Git deployment is enabled. Keep `.vercel/` ignored. Preserve noindex metadata, robots and response-header controls until a separately authorised launch. Noindex does not provide access protection.

No prospect production domains were changed. Use the verified sharing URL recorded in `PROJECT.md`.
