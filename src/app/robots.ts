import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // App-flow pages (mock-tests, mistakes, pricing, account) live in-silo but
      // set their own `noindex` meta, so they stay crawlable and Google honours it.
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
