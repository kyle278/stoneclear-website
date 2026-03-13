# Stone Clear Portal Provisioning Notes

## Organisation provisioning

Run this from `c:\Users\kyler\Desktop\Projects\ingeniumportal` after loading the required production env vars:

```bash
npm run provision:client -- --mode onboard --name "Stone Clear" --slug stone-clear --owner-email info@stoneclear.ie --json
```

Capture the returned organisation id, then choose or generate a site id and replace the TODO values inside `portal/stoneclear-portal-seed.sql`.

## Required website env vars

Set these for local development and in Vercel:

```bash
NEXT_PUBLIC_PORTAL_SUPABASE_URL=
PORTAL_SUPABASE_SERVICE_ROLE_KEY=
PORTAL_ORGANISATION_ID=
PORTAL_SITE_ID=
PORTAL_DEFAULT_FORM_SLUG=contact
NEXT_PUBLIC_PORTAL_APP_URL=
NEXT_PUBLIC_PORTAL_TRACKING_ENDPOINT=
NEXT_PUBLIC_PORTAL_SITE_ID=
```

## Tracking contract

- Tracker script: `https://<portal-app-domain>/ingenium-tracker.js`
- Tracking endpoint: `https://<portal-app-domain>/api/websites/tracking/events`
- Required events covered in the frontend: `page_view`, `form_view`, `form_submit`, `cta_click`, `nav_click`, `scroll_depth`, `time_on_page`
- Strongly recommended follow-up once env is present: add click handlers for every phone, email, and external social link in the UI and verify rows land in `website_interaction_events`

## Vercel metadata

- Project name: `stoneclear-website`
- Project id: `prj_1oxWvizXqF4sNnB5hvvsXc0IHOIA`
- Production alias: `https://stoneclear-website.vercel.app`
- Deploy hook: `TODO_CREATE_IN_VERCEL`
