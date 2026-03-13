import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_PORTAL_SUPABASE_URL;
const serviceRoleKey = process.env.PORTAL_SUPABASE_SERVICE_ROLE_KEY;

const supabase =
  supabaseUrl && serviceRoleKey
    ? createClient(supabaseUrl, serviceRoleKey, {
        auth: { persistSession: false },
      })
    : null;

type SubmitBody = {
  formSlug?: string;
  formId?: string;
  fields: Record<string, unknown>;
  tracking: {
    utm_source?: string | null;
    utm_medium?: string | null;
    utm_campaign?: string | null;
    utm_term?: string | null;
    utm_content?: string | null;
    cid?: string | null;
    visitor_id?: string | null;
    session_id?: string | null;
    submission_url: string;
    referrer?: string | null;
  };
};

function requireEnv(name: string) {
  const value = process.env[name];
  if (!value?.trim()) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value.trim();
}

function normalizeEmail(value: unknown) {
  if (typeof value !== "string") {
    return null;
  }

  const trimmed = value.trim().toLowerCase();
  return trimmed.length > 3 ? trimmed : null;
}

export async function POST(req: NextRequest) {
  try {
    if (!supabase) {
      throw new Error(
        "Portal form submission is not configured. Expected NEXT_PUBLIC_PORTAL_SUPABASE_URL and PORTAL_SUPABASE_SERVICE_ROLE_KEY.",
      );
    }

    const body = (await req.json()) as SubmitBody;
    const organisationId = requireEnv("PORTAL_ORGANISATION_ID");
    const siteId = requireEnv("PORTAL_SITE_ID");

    const email = normalizeEmail(body.fields.email);
    if (!email) {
      return NextResponse.json({ error: "A valid email address is required." }, { status: 400 });
    }

    let formId = body.formId;
    if (!formId) {
      const slug = body.formSlug ?? process.env.PORTAL_DEFAULT_FORM_SLUG;
      if (!slug) {
        return NextResponse.json({ error: "Missing formId/formSlug" }, { status: 400 });
      }

      const { data: formRow, error: formError } = await supabase
        .from("website_forms")
        .select("id")
        .eq("organisation_id", organisationId)
        .eq("site_id", siteId)
        .eq("slug", slug)
        .eq("is_active", true)
        .maybeSingle();

      if (formError || !formRow) {
        return NextResponse.json({ error: "Form not found" }, { status: 400 });
      }
      formId = formRow.id;
    }

    const ipHeader = req.headers.get("x-forwarded-for");
    const ipAddress = ipHeader?.split(",")[0]?.trim() || null;
    const userAgent = req.headers.get("user-agent");

    const tracking = body.tracking ?? { submission_url: "" };
    const submissionUrl = tracking.submission_url;

    const dataPayload = {
      ...body.fields,
      email,
      utm_source: tracking.utm_source ?? null,
      utm_medium: tracking.utm_medium ?? null,
      utm_campaign: tracking.utm_campaign ?? null,
      utm_term: tracking.utm_term ?? null,
      utm_content: tracking.utm_content ?? null,
      cid: tracking.cid ?? null,
      visitor_id: tracking.visitor_id ?? null,
      session_id: tracking.session_id ?? null,
      submission_url: submissionUrl,
    };

    const metadata = {
      submitted_at: new Date().toISOString(),
      form_slug: body.formSlug ?? process.env.PORTAL_DEFAULT_FORM_SLUG ?? "contact",
      referrer: tracking.referrer ?? null,
      landing_url: submissionUrl,
      utm_source: tracking.utm_source ?? null,
      utm_medium: tracking.utm_medium ?? null,
      utm_campaign: tracking.utm_campaign ?? null,
      utm_term: tracking.utm_term ?? null,
      utm_content: tracking.utm_content ?? null,
      cid: tracking.cid ?? null,
      visitor_id: tracking.visitor_id ?? null,
      session_id: tracking.session_id ?? null,
    };

    const { error } = await supabase.from("website_form_submissions").insert({
      organisation_id: organisationId,
      site_id: siteId,
      form_id: formId,
      data: dataPayload,
      source_url: submissionUrl,
      submission_url: submissionUrl,
      utm_source: tracking.utm_source ?? null,
      utm_medium: tracking.utm_medium ?? null,
      utm_campaign: tracking.utm_campaign ?? null,
      utm_term: tracking.utm_term ?? null,
      utm_content: tracking.utm_content ?? null,
      campaign_cid: tracking.cid ?? null,
      tracking_visitor_id: tracking.visitor_id ?? null,
      tracking_session_id: tracking.session_id ?? null,
      metadata,
      ip_address: ipAddress,
      user_agent: userAgent,
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
