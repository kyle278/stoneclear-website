begin;

with params as (
  select
    'TODO_ORGANISATION_ID'::uuid as organisation_id,
    'TODO_SITE_ID'::uuid as site_id,
    nullif('TODO_CRM_ACCOUNT_ID', '')::uuid as crm_account_id,
    nullif('TODO_CAMPAIGN_ID', '')::uuid as crm_campaign_id,
    'stoneclear-website.vercel.app'::text as domain,
    'prj_1oxWvizXqF4sNnB5hvvsXc0IHOIA'::text as vercel_project_id,
    'TODO_VERCEL_DEPLOY_HOOK'::text as vercel_deploy_hook
)
insert into public.website_sites (
  id,
  organisation_id,
  name,
  slug,
  domain,
  description,
  status,
  vercel_project_id,
  vercel_deploy_hook,
  metadata
)
select
  p.site_id,
  p.organisation_id,
  'Stone Clear Website',
  'main-site',
  p.domain,
  'Primary Stone Clear marketing website',
  'active',
  p.vercel_project_id,
  p.vercel_deploy_hook,
  jsonb_build_object(
    'production_url', concat('https://', p.domain),
    'vercel_project_name', 'stoneclear-website',
    'crm_account_id', p.crm_account_id
  )
from params p
on conflict (id) do update
set
  organisation_id = excluded.organisation_id,
  name = excluded.name,
  slug = excluded.slug,
  domain = excluded.domain,
  description = excluded.description,
  status = excluded.status,
  vercel_project_id = excluded.vercel_project_id,
  vercel_deploy_hook = excluded.vercel_deploy_hook,
  metadata = excluded.metadata,
  updated_at = now();

with params as (
  select
    'TODO_ORGANISATION_ID'::uuid as organisation_id,
    'TODO_SITE_ID'::uuid as site_id,
    nullif('TODO_CAMPAIGN_ID', '')::uuid as crm_campaign_id
)
insert into public.website_forms (
  id,
  organisation_id,
  site_id,
  name,
  slug,
  description,
  fields,
  notification_email,
  crm_campaign_id,
  is_active,
  metadata
)
select
  gen_random_uuid(),
  p.organisation_id,
  p.site_id,
  'Contact Form',
  'contact',
  'Primary website quote request form',
  '[
    { "key": "name", "label": "Name", "type": "text", "required": true },
    { "key": "phone", "label": "Phone", "type": "tel", "required": true },
    { "key": "email", "label": "Email", "type": "email", "required": true },
    { "key": "message", "label": "Message", "type": "textarea", "required": false }
  ]'::jsonb,
  'info@stoneclear.ie',
  p.crm_campaign_id,
  true,
  jsonb_build_object(
    'frontend_route', '/contact',
    'submission_endpoint', '/api/portal-form-submit'
  )
from params p
on conflict (site_id, slug) do update
set
  name = excluded.name,
  description = excluded.description,
  fields = excluded.fields,
  notification_email = excluded.notification_email,
  crm_campaign_id = excluded.crm_campaign_id,
  is_active = excluded.is_active,
  metadata = excluded.metadata,
  updated_at = now();

commit;
