"use client";

import { createBrowserClient } from "@supabase/ssr";
import { SUPABASE_PUBLISHABLE_KEY, SUPABASE_URL, accountsEnabled } from "@/lib/env";

/** Browser Supabase client (sign-in form). Null when accounts aren't set up. */
export function createSupabaseBrowserClient() {
  if (!accountsEnabled) return null;
  return createBrowserClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);
}
