import "server-only";
import { connection } from "next/server";
import { createSupabaseServerClient, getCurrentUser } from "@/lib/supabase/server";
import { accountsEnabled } from "@/lib/env";
import { ACTIVE_STATUSES } from "@/lib/billing";

export type ProSubscription = {
  app_slug: string;
  status: string;
  current_period_end: string | null;
  cancel_at_period_end: boolean;
};

/** The signed-in user's subscriptions (RLS limits rows to their own). */
export async function getSubscriptions(): Promise<ProSubscription[]> {
  const supabase = await createSupabaseServerClient();
  if (!supabase) return [];
  const { data } = await supabase
    .from("subscriptions")
    .select("app_slug, status, current_period_end, cancel_at_period_end");
  return (data as ProSubscription[] | null) ?? [];
}

/** Does the signed-in user currently have Pro for this app? */
export async function hasPro(appSlug: string): Promise<boolean> {
  const subs = await getSubscriptions();
  const now = Date.now();
  return subs.some(
    (s) =>
      s.app_slug === appSlug &&
      (ACTIVE_STATUSES as readonly string[]).includes(s.status) &&
      (!s.current_period_end || new Date(s.current_period_end).getTime() > now),
  );
}

export type ProAccess =
  | { state: "unavailable" } // accounts not configured yet
  | { state: "signed-out" }
  | { state: "no-pro"; email: string }
  | { state: "pro"; email: string; userId: string };

/** Everything a Pro page needs to decide what to render. */
export async function getProAccess(appSlug: string): Promise<ProAccess> {
  // Always render gated pages per request — never prerender an access state.
  await connection();
  if (!accountsEnabled) return { state: "unavailable" };
  const user = await getCurrentUser();
  if (!user) return { state: "signed-out" };
  const email = user.email ?? "";
  return (await hasPro(appSlug)) ? { state: "pro", email, userId: user.id } : { state: "no-pro", email };
}
