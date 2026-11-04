import { createHash } from "node:crypto";
import { NextRequest, NextResponse } from "next/server";
import { PORTAL_FORM_ID, PORTAL_ORIGIN, PORTAL_SITE_ID, PRIVACY_VERSION, SITE_ORIGIN, validateEnquiry } from "@/lib/enquiry";

export const runtime = "nodejs";
type Receipt = { status: number; body: Record<string, unknown> };
const receipts = new Map<string, { hash: string; created: number; pending: Promise<Receipt> }>();
const attempts = new Map<string, { count: number; reset: number }>();
const uuid = /^[a-f\d]{8}-[a-f\d]{4}-4[a-f\d]{3}-[89ab][a-f\d]{3}-[a-f\d]{12}$/i;
function reply(result: Receipt) {
  return NextResponse.json(result.body, { status: result.status, headers: { "Cache-Control": "no-store" } });
}
export async function POST(req: NextRequest) {
  const origin = req.headers.get("origin");
  const local = process.env.NODE_ENV === "development" && origin === new URL(req.url).origin;
  if (origin !== SITE_ORIGIN && !local) return reply({ status: 403, body: { error: "Please send your enquiry from the Stone Clear website." } });
  if (!req.headers.get("content-type")?.startsWith("application/json")) return reply({ status: 415, body: { error: "Please use the website enquiry form." } });
  if (Number(req.headers.get("content-length")) > 24000) return reply({ status: 413, body: { error: "Please shorten your enquiry and try again." } });
  let body;
  try {
    const raw = await req.text();
    if (Buffer.byteLength(raw) > 24000) return reply({ status: 413, body: { error: "Please shorten your enquiry and try again." } });
    body = JSON.parse(raw);
  } catch { return reply({ status: 400, body: { error: "We couldn’t read your enquiry. Please try again." } }); }
  if (!body || typeof body !== "object" || !body.fields || typeof body.fields !== "object" || Array.isArray(body.fields)) return reply({ status: 400, body: { error: "Please complete the enquiry form." } });
  if (body.honeypot) return reply({ status: 400, body: { error: "Your enquiry could not be accepted. Please call 087 753 3997." } });
  if (typeof body.submission_id !== "string" || !uuid.test(body.submission_id)) return reply({ status: 400, body: { error: "Please refresh the form and try again." } });
  const { fields, errors } = validateEnquiry(body.fields);
  if (Object.keys(errors).length) return reply({ status: 400, body: { error: "Please check your enquiry details.", errors } });
  const now = Date.now();
  for (const [key, receipt] of receipts) if (now - receipt.created > 3600000) receipts.delete(key);
  for (const [key, attempt] of attempts) if (now > attempt.reset) attempts.delete(key);
  const source = `${SITE_ORIGIN}/contact`;
  const tracking = Object.fromEntries(["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"].flatMap(key => typeof body.tracking?.[key] === "string" ? [[key, body.tracking[key].slice(0, 200)]] : []));
  const hash = createHash("sha256").update(JSON.stringify({ fields, tracking })).digest("hex");
  const previous = receipts.get(body.submission_id);
  if (previous) {
    if (previous.hash !== hash) return reply({ status: 409, body: { error: "These details have changed. Please refresh the form before sending another enquiry." } });
    return reply(await previous.pending);
  }
  const ipKey = createHash("sha256").update(req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown").digest("hex");
  const attempt = attempts.get(ipKey) || { count: 0, reset: now + 600000 };
  if (attempt.count >= 8 || receipts.size >= 5000) return reply({ status: 429, body: { error: "Please wait a few minutes before trying again, or call 087 753 3997." } });
  attempts.set(ipKey, { ...attempt, count: attempt.count + 1 });
  const pending = (async (): Promise<Receipt> => {
    try {
      const upstream = await fetch(`${PORTAL_ORIGIN}/api/websites/forms/submit`, {
        method: "POST", headers: { "Content-Type": "application/json", Origin: SITE_ORIGIN },
        body: JSON.stringify({
          site_id: PORTAL_SITE_ID, form_slug: "contact", form_id: PORTAL_FORM_ID,
          fields: { ...fields, name: `${fields.first_name} ${fields.last_name}`, privacy_notice_version: PRIVACY_VERSION },
          source_url: source, submission_url: source, tracking,
          metadata: { website_request_id: body.submission_id, privacy_notice_version: PRIVACY_VERSION, form_version: "guided-2026-11-04" },
        }), signal: AbortSignal.timeout(25000), cache: "no-store",
      });
      const result = await upstream.json();
      if (!upstream.ok || result.ok !== true || result.accepted === false || !uuid.test(result.submission_id || "") || result.site_id !== PORTAL_SITE_ID || result.form_id !== PORTAL_FORM_ID) {
        return { status: 502, body: { error: "We couldn’t confirm your enquiry. Your answers are still here. Please try again or call 087 753 3997." } };
      }
      return { status: 201, body: { ok: true, submission_id: result.submission_id } };
    } catch { return { status: 503, body: { error: "The enquiry service is temporarily unavailable. Your answers are still here. Please try again or call 087 753 3997." } }; }
  })();
  receipts.set(body.submission_id, { hash, created: now, pending });
  const result = await pending;
  if (result.status !== 201) receipts.delete(body.submission_id);
  return reply(result);
}
