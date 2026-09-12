import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Security headers applied to every response. These mirror the fallback
// headers configured in next.config.ts (headers()) so that protection is
// enforced both at the edge (here) and at the framework level.
const SECURITY_HEADERS: Record<string, string> = {
  "Strict-Transport-Security": "max-age=31536000; includeSubDomains; preload",
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options": "SAMEORIGIN",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "Permissions-Policy": "geolocation=(), microphone=(), camera=(), payment=()",
  "Content-Security-Policy":
    "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' https:; font-src 'self' https:; connect-src 'self' https:; frame-ancestors 'self';",
};

export function middleware(request: NextRequest) {
  // Enforce HTTPS in production. Behind Railway's proxy, TLS is terminated
  // upstream, so the original scheme is only available via X-Forwarded-Proto.
  if (process.env.NODE_ENV === "production") {
    const forwardedProto = request.headers.get("x-forwarded-proto");

    if (forwardedProto && forwardedProto !== "https") {
      const httpsUrl = new URL(request.url);
      httpsUrl.protocol = "https:";

      return NextResponse.redirect(httpsUrl, 301);
    }
  }

  const response = NextResponse.next();

  for (const [header, value] of Object.entries(SECURITY_HEADERS)) {
    response.headers.set(header, value);
  }

  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
