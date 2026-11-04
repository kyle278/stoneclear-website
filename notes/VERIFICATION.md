# Verification — 4 November 2026

Two planned visual rounds: hero checkpoint at 1440px and 390px, then completed-site review at both sizes. Focused repairs and confirmation completed.

- Production Next.js 16.4.5 build and TypeScript pass; ESLint passes. Framework updated from vulnerable original 16.1.6. npm audit --omit=dev: 0 vulnerabilities. Development-only tooling reports 16 moderate ESLint/minimatch dependency findings; no incompatible forced downgrade used.
- Eight pages inspected in a real browser: Home, Services, Stone Restoration, Gallery, About, Contact, Homes & Businesses, Privacy. At 1440px and 390px, no horizontal overflow. Every photo loaded after scrolling through each mobile page; original client photographs used at readable crops.
- Build/QA server served HTTP 200 for all eight pages and all 30 discovered internal asset/link endpoints. Same-page anchor IDs exist. Header links, service jumps, gallery links, footer and contact destinations checked. No external email/phone action submitted.
- Main palette measured: ink/chalk 13.60:1, white/blue 7.10:1, slate/chalk 5.41:1, slate/ice 4.95:1, ice/ink 12.45:1.
- Initial final review found fallback system font due CSS variable scope and hero callout overlap with image caption. Fixed in one batch. Computed font now Manrope and callout bottom is above caption top. Full hero remains readable on mobile.
- Gallery material selector and Before/After pressed states change image/alt/caption correctly; tested Light Emperador before, after and Wooden Floor. Original pairs may differ in viewpoint, disclosed in caption; no artificial aligned slider.
- Mobile menu opens, Escape closes and restores toggle focus; navigation closes menu on arrival. Contact native radios support arrow-key selection and show visible keyboard outline. Changing choice updates guidance and prepared mailto subject/body. No contact details collected, no localStorage, no fake success state.
- Reduced-motion button sets document motion state, computed hero animation becomes none and scroll behavior auto; system media-query fallback remains. Controls continue to function without animation. No physical-device or manual screen-reader testing claimed.
- Browser console: no warnings/errors on confirmed production-build pages.
- Noindex robots metadata, X-Robots-Tag and robots.txt confirmed locally. Noindex is not access protection.

Evidence in local ignored qa/: hero-desktop.png, hero-mobile.png (checkpoint); hero-final-share.png, home-desktop-confirmed.png, confirmed-mobile-*.png, *checks.json. Initial full-page captures included offscreen lazy placeholders; later confirmed-mobile screenshots were captured after scrolling to load all images.

Deployment and anonymous production checks are recorded separately in PROJECT.md after publication.
