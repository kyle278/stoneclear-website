# Stone Clear — project record

- Registered dedicated Codex project: StoneClear-website, bc63063a-3aca-4a4b-aa64-fcece5299d75.
- Source folder: C:\Users\kyler\Documents\ChatGPT\StoneClear-website.
- Business: Stone Clear, Carlow, Ireland. Source: https://www.stoneclear.ie/.
- Existing GitHub repository reused: https://github.com/kyle278/stoneclear-website — public; default/deployment branch master. Original application history retained. No private sales notes or secrets committed.
- Existing Vercel project reused: stoneclear-website, prj_1oxWvizXqF4sNnB5hvvsXc0IHOIA; team kyle278s-projects, team_xHgWGLSfFPo5eYw8qlOj9INI.
- Dashboard: https://vercel.com/kyle278s-projects/stoneclear-website.
- Git connection: connected explicitly using vercel git connect; repository kyle278/stoneclear-website, repo ID 1181032590, production branch master; framework Next.js; root repository root; npm ci; npm run build; output auto; Node 24.x. Git deployments enabled. Git-triggered production deployment verified: dpl_edyynu1VVFad23u3p9RsXdGgbqFd, READY, source git, commit 92b0dbc12acc0107bdbb4b9b2020d21158e80ffb. Production branch master. Subsequent client-history and form updates are recorded below and in notes/VERIFICATION.md.
- Verified sharing URL: https://stoneclear-website.vercel.app/ — anonymous HTTP 200, all eight routes accessible without login; real-browser deployed desktop and mobile checks passed.
- Working branch: Kyle/website-sample. Production branch: master.
- Design: DESIGN.md. Motion Expressive, selected by Kyle, 4 November 2026.
- Source/asset record: notes/SOURCES.md. Client-owned photographs only, resized/compressed; no generated or stock work.
- Browser hero checkpoint: screenshots qa/hero-desktop.png (1440px) and qa/hero-mobile.png (390px), first planned visual round. Pass: actual distinctive marble inlay dominates the image; compact callout visually links to the larger restoration work, blue controls and plain wording make the offer/action clear. Phone composition retains full headline/action and real stone detail. Initial image quality is limited by the original photograph, factual details retained.
- Portal form integration was explicitly authorised by Kyle on 4 November 2026. Stone Clear organisation/site/form created without user invites; guided enquiry now posts through the Portal-managed compatibility endpoint, with Turnstile omitted as requested. Tenant identities, lifecycle, consent evidence and verification are recorded in notes/FORMS.md. No website database secrets or analytics were activated.
- Noindex controls included. Ratings/testimonials omitted because Google review evidence inaccessible. Production build, TypeScript and ESLint pass. Production npm audit has 0 vulnerabilities. Sixteen moderate development-tool findings remain in ESLint/minimatch; no forced incompatible downgrade applied. Deployed verification complete: home, primary CTA to Contact, guided enquiry, mobile menu, gallery material switching and keyboard Before control; no console warnings/errors. All routes and robots.txt return HTTP 200 without authentication, noindex response headers confirmed.

Public Vercel production domain sharing configured with Standard Protection (prod_deployment_urls_and_all_previews); previews and immutable deployment URLs retain authentication. Only this project changed. No Vercel environment variables configured, verified 4 November 2026.

## Handoff

Completed and published 4 November 2026. Recovered current-site Home, Services, Stone, Gallery, About and Contact navigation/content despite origin downtime. Eight pages implemented: /, /services, /services/stone-restoration, /gallery, /about, /clients, /contact and /privacy. Existing client history, public repository and hosting project retained. No production-domain changes.

Design: light architectural composition, recognisable blue SVG fan/wordmark, Archivo primary/Lato secondary, real floor photographs, animated draggable before/after comparison and Expressive motion. Image optimisation uses WebP, no generated enhancement or stock. Reduced-motion system preference and manual session control both supported.

Checks: production build/TypeScript/ESLint pass; 1440px and 390px rendered review across eight pages; images loaded after scrolling; no overflow; all internal routes/assets/anchors checked; keyboard menu/radios/FAQ/gallery and reduced motion verified; exact fonts and palette contrast confirmed. notes/VERIFICATION.md has evidence and limits. Deployed screenshot qa/deployed-desktop.png is local and ignored.

Integration limits: the form receives enquiries in Portal and creates CRM/consent records. There is no booking, payment or analytics integration. Notification email is not configured; staff use Portal for intake. Warm-process retry coalescing is not durable across website instances; see notes/FORMS.md. Google review text could not be independently verified, so ratings/testimonials omitted. Older photographs retain original lighting/viewpoint and source labels; the original logo font remains unverified and the requested SVG uses close-match Archivo lettering. No prospect-owned production domain has been changed. No manual screen-reader or physical-device testing claimed.

Suggested sharing message (not sent): “I’ve put together a Stone Clear website concept using your own restoration photographs, with dedicated service pages and an interactive before-and-after gallery. Have a look on your phone too: https://stoneclear-website.vercel.app/ — I’d love to hear what you think.”


## Logo, typography and comparison update — 4 November 2026

Kyle requested (1) an animated, draggable before/after reveal, (2) a blue SVG fan/wordmark without the red tagline, and (3) primary typography matching the logo with a secondary pairing.

Implemented in the existing project: native range comparison on Home, Stone Restoration and Gallery; smooth 15–85% back-and-forth reveal; Play/Pause, pointer/keyboard takeover, offscreen/hidden-tab pauses and reduced-motion support. Unaltered original photographs retain the viewpoint disclaimer. Archivo primary and Lato secondary replace Manrope; exact original logo font remains unverified, with Arial Black the closest visual style in comparison. The clean outlined SVG uses Archivo 900 and the redrawn original fan motif, entirely #1258a4. No font installation is needed to render the logo. Files: public/assets/stone-clear-logo.svg and stone-clear-symbol.svg.

Local verification: build, TypeScript and ESLint pass. At 1440px and 390px all eight pages reflow without overflow; computed primary Archivo and body Lato confirmed. Both images load; automatic position samples 45,73,85,74,48,23,15,31,59,81 demonstrate travel and reversal. Dragging changed reveal to 80%; Home/End reach 0/100%; keyboard interaction pauses playback and Play resumes it. Reduced mode held at 50% while a manual arrow advanced to 51%; offscreen held at 51%. No browser console warnings/errors. Logo inspected large in-browser and cleaned to remove traced pixel steps. No manual screen-reader, physical-touch-device or frame-rate measurement claimed. Deployment verified: dpl_GMYJWpMJ9U9G4pd5KumM59SNwyfe, source git, commit 1710f11bf698a9fcc664f457f87dddcfd7afde33, READY. Anonymous Home/Gallery/Stone Restoration and both SVG URLs return 200; deployed SVG fills exactly #1258a4. Live browser confirms Archivo/Lato, SVG header and manual keyboard slider takeover; no console warnings/errors.

## Client history and responsive update - 4 November 2026

Recovered Stone Clear’s published client list and an additional Hilton Garden Inn project caption. Homepage now has a 20-logo monochrome client rail; /clients has 25 historical names, using plain text for five unsourced logos. Hotel renames and branch captions are explicit. Removed unsupported Marker and Sheraton entries from legacy sample data. Actual logo provenance and identity limits are recorded in notes/CLIENTS.md. No present-day contracts or endorsements inferred.

All eight routes were checked in a real browser at 390px and 820px: no emoji characters and no horizontal page overflow. Controls use Lucide SVGs at every size. Banner supports native scrolling, keyboard access, previous/next buttons and reduced motion. Client wall is two columns on phone, three on tablet, four on desktop. The tablet hero note was moved away from the enquiry button after an overlap was found. Build/TypeScript and ESLint pass; all 20 logos loaded in the rail; 25 client entries confirmed in the grid. No console warnings/errors. Further evidence in notes/VERIFICATION.md.

## Guided Portal enquiry - 4 November 2026

Five stages collect service, property type, town/county, optional project details, separate first/last names, required email and optional phone, followed by independent required privacy and optional marketing cards. No review screen. Answers stay in memory on Back and failure; explicit Send is required and success follows a matched Portal receipt. The privacy notice describes the actual form. All controls use text and SVGs, with no emojis. The form experience and focused website forms skills were applied. Current IDs, question map, server guards, tests and the absence of invitations are in notes/FORMS.md.

Live enquiry accepted and read back in the exact Portal tenant: receipt 49cff4e2-d53b-4369-9465-3fc70d095f02, CRM lead and declined email preference confirmed, optional phone blank. Organisation invite count zero, notification email unset. Public server credentials are not required. Deployed form screenshot qa/deployed-enquiry-desktop.png. Final short-phone prompt adjustment leaves this verified submission contract unchanged.
