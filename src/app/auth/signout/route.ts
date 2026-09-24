import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";

/** POST (form) → sign out and return to the given page. */
export async function POST(request: Request) {
  const supabase = await createSupabaseServerClient();
  await supabase?.auth.signOut();
  const form = await request.formData().catch(() => null);
  const next = String(form?.get("next") ?? "/");
  const target = next.startsWith("/") && !next.startsWith("//") ? next : "/";
  return NextResponse.redirect(new URL(target, request.url), { status: 303 });
}
