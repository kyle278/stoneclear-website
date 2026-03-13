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

- Add confirmed production domain later if Stone Clear moves off the default Vercel domain
- Replace reused current-site assets with final brand-approved photography and logo files when available
- Fill portal IDs and Vercel metadata below once provisioning is complete

## Connected services

- GitHub repo: `TBD`
- Vercel project id: `TBD`
- Vercel project URL: `TBD`
- Active production alias: `TBD`
