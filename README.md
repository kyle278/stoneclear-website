# Stone Clear Website

Replacement marketing website for Stone Clear, focused on restoration-led quote enquiries.

## Launch pages

- `/`
- `/services`
- `/gallery`
- `/clients`
- `/about`
- `/contact`

## Forms in scope

- `contact`

## Portal integration

- Organisation id: `TBD`
- Site id: `TBD`
- Default form slug: `contact`
- Portal route contract: `app/api/portal-form-submit/route.ts`
- Provisioning command to run from `ingeniumportal`: `npm run provision:client -- --mode onboard --name "Stone Clear" --slug stone-clear --owner-email info@stoneclear.ie`

## Deployment

```bash
npm run dev
npm run lint
npm run build
```

## Environment variables

See `.env.example`.

## Brand assets

Current launch assets were pulled from the existing Stone Clear website and stored in `public/stoneclear/`.

## Manual follow-up items

- Add the missing portal env/secrets locally or in Vercel before testing live form submissions
- Run the organisation provisioning command and update `.env.local` / Vercel env vars with the returned IDs
- Apply `portal/stoneclear-portal-seed.sql` after the organisation exists
- Add confirmed production domain later if Stone Clear moves off the default Vercel domain
- Replace reused current-site assets with final brand-approved photography and logo files when available
- Fill portal IDs and Vercel metadata below once provisioning is complete

## Connected services

- GitHub repo: `https://github.com/kyle278/stoneclear-website`
- Vercel project id: `prj_1oxWvizXqF4sNnB5hvvsXc0IHOIA`
- Vercel project URL: `https://vercel.com/kyle278s-projects/stoneclear-website`
- Active production alias: `https://stoneclear-website.vercel.app`
