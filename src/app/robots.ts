import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // The authenticated practice dashboard is a private, post-sign-in surface —
      // never part of the SEO strategy. Keep it out of the index.
      disallow: "/app/",
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
