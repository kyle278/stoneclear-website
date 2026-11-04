# Stone Clear website

Multipage Stone Clear website sample, continuing the existing standalone client repository and Vercel project.

## Run locally

```sh
npm ci
npm run dev
```

Production checks: `npm run build` and `npm run lint`. Production server: `npm run start`.

## Pages

Home, services, stone restoration, gallery, about, homes/businesses, contact and privacy. Client-owned photography is served in WebP. The logo is a monochrome, outlined SVG; primary Archivo and secondary Lato are locally served by next/font. Animated draggable before/after comparison, native keyboard-accessible service selector, mobile navigation and reduced-motion controls are implemented.

Contact links open a telephone/email app. There is no live enquiry submission or data persistence. The retained Portal scaffold is not mounted by the public site and has no configured environment variables. Do not activate it without a separately authorised integration and approved privacy wording. No analytics/tracking is mounted.

`PROJECT.md` records verified project connections and handoff status. `DESIGN.md` describes the design. `notes/SOURCES.md` records public facts and assets. Local `qa/` and `research/` are ignored and are not website content.

## Publishing

Existing public GitHub repository: https://github.com/kyle278/stoneclear-website

Existing Vercel dashboard: https://vercel.com/kyle278s-projects/stoneclear-website

Production branch: `master`. Vercel uses the repository root, Next.js, `npm ci`, and `npm run build`. Git deployment is enabled. Keep `.vercel/` ignored. Preserve noindex metadata, robots and response-header controls until a separately authorised launch. Noindex does not provide access protection.

No prospect production domains were changed. Use the verified sharing URL recorded in `PROJECT.md`.
