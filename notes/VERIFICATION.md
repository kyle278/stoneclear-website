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

Deployed verification: https://stoneclear-website.vercel.app/ serves the new application publicly; all eight pages and robots.txt anonymous HTTP 200, noindex header intact. Deployment dpl_121GEBuT6UDnPC97D5TKtDwdNAVm is READY, source git, commit acfaf82c843ff32a6edd99668a94b87b35f7c69a. Live browser CTA → contact radio and prepared mailto, mobile menu → gallery White Marble → Before via Enter all verified, no console warnings/errors. FAQ Enter expansion and service URL preset also verified locally. No emails, calls or enquiries sent.


4 November 2026 requested update: blue true-path SVG logo, Archivo/Lato font pairing and animated comparison range. Local build/TypeScript/ESLint pass. All eight pages checked at 1440/390px; no overflow and exact computed Archivo/Lato fonts confirmed. In-browser enlarged vector review caught pixel steps from tracing; replaced with clean fan Beziers before final review. SVG has only #1258a4 artwork fills and no image/text font dependency. Autoplay sampled across 15/85 endpoints and reversal, pointer drag, keyboard arrows, Home/End, pause/resume, project selection, reduced mode and offscreen stop checked. Reduced-motion position remained static, manual control still worked. Browser console clean. Original viewpoint disclaimer retained. Evidence: qa/font-comparison.jpg, qa/brand-mobile.png, qa/slider-mobile.png, qa/font-mobile-checks.json. Deployed check pending for this update.
