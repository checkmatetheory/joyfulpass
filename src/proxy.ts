import type { NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/session";

/**
 * Keeps the Supabase auth session fresh — only on routes that read it, so the
 * static, indexable pages stay fast and cacheable.
 */
export async function proxy(request: NextRequest) {
  return updateSession(request);
}

export const config = {
  matcher: [
    "/auth/:path*",
    "/:brand/:test/account/:path*",
    "/:brand/:test/pricing/:path*",
    "/:brand/:test/pro/:path*",
    "/:brand/:test/mistakes/:path*",
  ],
};
