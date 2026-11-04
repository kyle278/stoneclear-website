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


4 November 2026 requested update: blue true-path SVG logo, Archivo/Lato font pairing and animated comparison range. Local build/TypeScript/ESLint pass. All eight pages checked at 1440/390px; no overflow and exact computed Archivo/Lato fonts confirmed. In-browser enlarged vector review caught pixel steps from tracing; replaced with clean fan Beziers before final review. SVG has only #1258a4 artwork fills and no image/text font dependency. Autoplay sampled across 15/85 endpoints and reversal, pointer drag, keyboard arrows, Home/End, pause/resume, project selection, reduced mode and offscreen stop checked. Reduced-motion position remained static, manual control still worked. Browser console clean. Original viewpoint disclaimer retained. Evidence: qa/font-comparison.jpg, qa/brand-mobile.png, qa/slider-mobile.png, qa/font-mobile-checks.json. Deployed check complete for this update: dpl_GMYJWpMJ9U9G4pd5KumM59SNwyfe READY, source git, commit 1710f11bf698a9fcc664f457f87dddcfd7afde33. Home, Gallery, Stone Restoration, full SVG and symbol SVG anonymous 200. Both SVGs serve image/svg+xml and only #1258a4 fills. Live browser confirms correct Archivo/Lato fonts, SVG header, slider ArrowRight → 51% and automatic pause; no console warnings/errors.

## Client history and emoji requirement - 4 November 2026

- Production build/TypeScript and ESLint pass. Source scan of app/, components/ and lib/ found no emoji ranges, emoji variation selectors or keycap selectors.
- Real browser: every public route at 390px and 820px had zero emoji characters in rendered text and no horizontal page overflow (16 route/viewport checks). These checks complement the source scan; emoji content is not merely hidden with a media query.
- Desktop 1440px banner: all 20 logos load as the rail is explored. Previous starts disabled, Next disables at the end, and keyboard ArrowRight scrolls the focusable rail with a visible outline. Meet our clients opens the real client page. Full grid contains 25 names; five have no reconstructed mark.
- Phone 390px: two-column client grid, responsive banner, labelled 44px SVG buttons, Clients menu link opens the page and closes the menu. Tablet 820px: three-column grid, caption no longer intersects the main enquiry button. Desktop: four-column grid.
- Reduced motion: manual footer preference changed root data-motion to reduced; the banner button advanced immediately and Previous became enabled. No autoplay added. Existing animated restoration comparison retained.
- Logos inspected visually, including all end-of-rail marks. Right Price Tiles retains white knockout text with a tonal monochrome filter; a blanket dark filter would have obscured its lettering and was corrected.
- Browser console: no warnings or errors. Local screenshots: qa/clients-mobile-banner.png, qa/clients-mobile-page.png, qa/clients-tablet-page.png. DOM report: qa/clients-responsive-checks.json. No physical-device or screen-reader test claimed.
