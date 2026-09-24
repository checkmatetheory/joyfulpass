import "server-only";
import { createSupabaseServerClient } from "@/lib/supabase/server";
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
