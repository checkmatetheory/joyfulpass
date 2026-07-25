import type { MetadataRoute } from "next";
import { apps, getApp } from "@/lib/apps";
import { getCurriculum } from "@/lib/curriculum";
import { getAllPosts } from "@/lib/blog";
import {
  blogIndex,
  blogPost,
  chapterPath,
  cheatSheetPath,
  examHub,
  revisionNotesPath,
  studyGuidePath,
  testCentresPath,
  toolPath,
} from "@/lib/urls";
import { SITE_URL } from "@/lib/site";

// One sitemap file per silo (hub + each app), auto-assembled by Next.js into
// a single sitemap index at /sitemap.xml. Public URLs use the keyword-first
// exam silo (examHub/chapterPath/...). The authenticated dashboard (/app/...)
// is deliberately excluded — it's noindex and not a ranking surface.
const silos = ["hub", ...apps.map((app) => app.slug)];

// A stable, real content date for the evergreen exam pages. Unlike the Britizen
// sitemap (every URL identical daily/lastmod — the "batch-generated" fingerprint),
// we set an honest date and vary changeFrequency by page type.
const CONTENT_LAST_MODIFIED = "2026-07-25";

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
      { url: `${SITE_URL}/privacy-policy/`, changeFrequency: "yearly", priority: 0.3 },
      { url: `${SITE_URL}/terms/`, changeFrequency: "yearly", priority: 0.3 },
      { url: `${SITE_URL}/accessibility-statement/`, changeFrequency: "yearly", priority: 0.3 },
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
  const curriculum = getCurriculum(app.slug);

  return [
    // Exam hub (Template A) — the highest-value page, the real test-name slug.
    {
      url: `${SITE_URL}${examHub(app)}`,
      lastModified: CONTENT_LAST_MODIFIED,
      changeFrequency: "weekly",
      priority: 1,
    },
    // Chapter practice pages (Template B).
    ...(curriculum?.chapters.map((chapter) => ({
      url: `${SITE_URL}${chapterPath(app, chapter.slug)}`,
      lastModified: CONTENT_LAST_MODIFIED,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })) ?? []),
    // Public study surfaces — the second keyword surface (study guide / revision
    // notes / cheat sheet), each an indexable page targeting distinct searches.
    ...(curriculum
      ? [
          {
            url: `${SITE_URL}${studyGuidePath(app)}`,
            lastModified: CONTENT_LAST_MODIFIED,
            changeFrequency: "monthly" as const,
            priority: 0.8,
          },
          {
            url: `${SITE_URL}${revisionNotesPath(app)}`,
            lastModified: CONTENT_LAST_MODIFIED,
            changeFrequency: "monthly" as const,
            priority: 0.7,
          },
          {
            url: `${SITE_URL}${cheatSheetPath(app)}`,
            lastModified: CONTENT_LAST_MODIFIED,
            changeFrequency: "monthly" as const,
            priority: 0.7,
          },
        ]
      : []),
    { url: `${SITE_URL}${blogIndex(app)}`, changeFrequency: "weekly", priority: 0.7 },
    ...posts.map((post) => ({
      url: `${SITE_URL}${blogPost(app, post.slug)}`,
      lastModified: post.date,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    ...(app.hasTestCenters
      ? [
          {
            url: `${SITE_URL}${testCentresPath(app)}`,
            lastModified: CONTENT_LAST_MODIFIED,
            changeFrequency: "monthly" as const,
            priority: 0.6,
          },
        ]
      : []),
    ...app.tools.map((tool) => ({
      url: `${SITE_URL}${toolPath(app, tool.slug)}`,
      lastModified: CONTENT_LAST_MODIFIED,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
