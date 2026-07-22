import type { MetadataRoute } from "next";
import { apps, getApp } from "@/lib/apps";
import { getAllPosts } from "@/lib/blog";
import { SITE_URL } from "@/lib/site";

// One sitemap file per silo (hub + each app), auto-assembled by Next.js into
// a single sitemap index at /sitemap.xml. Adding a new app to src/lib/apps.ts
// automatically gets its own sitemap file here — no config elsewhere.
const silos = ["hub", ...apps.map((app) => app.slug)];

export function generateSitemaps() {
  return silos.map((_, id) => ({ id }));
}

export default async function sitemap({
  id,
}: {
  id: number | Promise<number | string>;
}): Promise<MetadataRoute.Sitemap> {
  const resolvedId = await id;
  const silo = silos[Number(resolvedId)];

  if (silo === "hub") {
    const hubPosts = getAllPosts("hub");
    return [
      { url: `${SITE_URL}/`, changeFrequency: "weekly", priority: 1 },
      { url: `${SITE_URL}/about/`, changeFrequency: "monthly", priority: 0.5 },
      { url: `${SITE_URL}/tools/`, changeFrequency: "weekly", priority: 0.6 },
      { url: `${SITE_URL}/blog/`, changeFrequency: "weekly", priority: 0.6 },
      ...hubPosts.map((post) => ({
        url: `${SITE_URL}/blog/${post.slug}/`,
        lastModified: post.date,
        changeFrequency: "monthly" as const,
        priority: 0.5,
      })),
    ];
  }

  const app = getApp(silo);
  if (!app) return [];

  const posts = getAllPosts(app.blogCategory);

  return [
    { url: `${SITE_URL}/${app.slug}/`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE_URL}/${app.slug}/blog/`, changeFrequency: "weekly", priority: 0.7 },
    ...posts.map((post) => ({
      url: `${SITE_URL}/${app.slug}/blog/${post.slug}/`,
      lastModified: post.date,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    ...(app.hasTestCenters
      ? [
          {
            url: `${SITE_URL}/${app.slug}/test-centers/`,
            changeFrequency: "monthly" as const,
            priority: 0.6,
          },
        ]
      : []),
    ...app.tools.map((tool) => ({
      url: `${SITE_URL}/${app.slug}/${tool.slug}/`,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
