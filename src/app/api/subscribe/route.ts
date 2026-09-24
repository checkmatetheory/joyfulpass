import { NextResponse } from "next/server";
import { getApp } from "@/lib/apps";
import { getCurriculum } from "@/lib/curriculum";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { SITE_NAME, SITE_URL } from "@/lib/site";
import { cheatSheetPath, practicePath, studyGuidePath } from "@/lib/urls";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const SOURCES = new Set(["quiz_results", "cheat_sheet", "article_end"]);

/**
 * POST { email, app, source, marketingConsent, company } → emails the free
 * cheat sheet (the thing they asked for) and records the lead. Study-tip
 * emails only go to people who ticked the separate consent box.
 * `company` is a honeypot field — bots fill it, people never see it.
 */
export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.EMAIL_FROM;
  if (!apiKey || !from) {
    return NextResponse.json({ error: "Email sign-up isn't available yet." }, { status: 503 });
  }

  const body = (await request.json().catch(() => null)) as {
    email?: string;
    app?: string;
    source?: string;
    marketingConsent?: boolean;
    company?: string;
  } | null;
  if (body?.company) return NextResponse.json({ ok: true }); // honeypot

  const email = body?.email?.trim().toLowerCase() ?? "";
  if (!EMAIL_RE.test(email) || email.length > 254) {
    return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
  }
  const app = body?.app ? getApp(body.app) : undefined;
  const curriculum = app ? getCurriculum(app.slug) : undefined;
  if (!app || !curriculum) {
    return NextResponse.json({ error: "Unknown exam." }, { status: 400 });
  }
  const source = SOURCES.has(body?.source ?? "") ? (body?.source as string) : "unknown";
  const marketingConsent = body?.marketingConsent === true;

  // 1. Record the lead (our own list is the source of truth).
  const admin = createSupabaseAdminClient();
  if (admin) {
    const { error } = await admin
      .from("leads")
      .upsert(
        { email, app_slug: app.slug, source, marketing_consent: marketingConsent },
        { onConflict: "email,app_slug" },
      );
    if (error) console.error("[subscribe] Failed to store lead", error);
  }

  const headers = { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" };

  // 2. Opted in to study tips → add to the Resend audience (best-effort).
  const audienceId = process.env.RESEND_AUDIENCE_ID;
  if (marketingConsent && audienceId) {
    await fetch(`https://api.resend.com/audiences/${audienceId}/contacts`, {
      method: "POST",
      headers,
      body: JSON.stringify({ email, unsubscribed: false }),
    }).catch((error) => console.error("[subscribe] Audience add failed", error));
  }

  // 3. Send what they asked for.
  const url = (path: string) => `${SITE_URL}${path}`;
  const html = `
    <div style="font-family:system-ui,-apple-system,Segoe UI,Roboto,sans-serif;max-width:560px;margin:auto;color:#111">
      <h1 style="font-size:22px">Your free ${curriculum.testName} cheat sheet</h1>
      <p>Here's every high-yield fact on one page — perfect for a last look before test day:</p>
      <p><a href="${url(cheatSheetPath(app))}" style="display:inline-block;background:${app.theme.accent};color:#fff;padding:12px 20px;border-radius:999px;text-decoration:none;font-weight:bold">Open the cheat sheet</a></p>
      <p><strong>The real test:</strong> ${curriculum.facts.questions}, ${curriculum.facts.toPass}, ${curriculum.facts.timeLimit}.</p>
      <p>Two more free resources:</p>
      <ul>
        <li><a href="${url(studyGuidePath(app))}">The full ${curriculum.testName} study guide</a></li>
        <li><a href="${url(practicePath(app))}">Free practice tests</a>, scored against the real pass mark</li>
      </ul>
      <p>Good luck — you've got this.<br/>The ${app.name} team</p>
      <p style="font-size:12px;color:#666">You're receiving this because you asked ${SITE_NAME} to email you this cheat sheet. ${app.name} is an independent study app, not affiliated with any government body.</p>
    </div>`;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers,
    body: JSON.stringify({
      from,
      to: [email],
      subject: `Your free ${curriculum.testName} cheat sheet`,
      html,
    }),
  }).catch(() => null);

  if (!res?.ok) {
    console.error("[subscribe] Resend send failed", res?.status, await res?.text().catch(() => ""));
    return NextResponse.json({ error: "We couldn't send the email. Please try again." }, { status: 502 });
  }
  return NextResponse.json({ ok: true });
}
