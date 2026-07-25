// The single place that knows how joyfulpass.com URLs are shaped.
//
// Public pages live in a keyword-first silo rooted at the exam name people
// actually search — /life-in-the-uk-test/... — never the brand. The brand
// ("BritPass") is shown on-page, not in the URL. The one exception is the
// authenticated dashboard, which is noindex and brand-keyed (/app/britpass/).
//
// Every internal link, canonical, and sitemap entry goes through these helpers,
// so the URL structure can change in one file instead of ~60 call sites.

import type { AppRecord } from "@/lib/apps";

/** Public exam hub (Template A): /life-in-the-uk-test/ */
export function examHub(app: AppRecord): string {
  return `/${app.examSlug}/`;
}

/** Chapter practice page (Template B): /life-in-the-uk-test/history/ */
export function chapterPath(app: AppRecord, chapterSlug: string): string {
  return `/${app.examSlug}/${chapterSlug}/`;
}

/** A silo tool: /life-in-the-uk-test/ilr-calculator/ */
export function toolPath(app: AppRecord, toolSlug: string): string {
  return `/${app.examSlug}/${toolSlug}/`;
}

/** Blog index for the silo: /life-in-the-uk-test/blog/ */
export function blogIndex(app: AppRecord): string {
  return `/${app.examSlug}/blog/`;
}

/** A blog post: /life-in-the-uk-test/blog/how-many-questions/ */
export function blogPost(app: AppRecord, slug: string): string {
  return `/${app.examSlug}/blog/${slug}/`;
}

/** Test-centre directory: /life-in-the-uk-test/test-centres/ */
export function testCentresPath(app: AppRecord): string {
  return `/${app.examSlug}/test-centres/`;
}

/** Public study guide: /life-in-the-uk-test/study-guide/ */
export function studyGuidePath(app: AppRecord): string {
  return `/${app.examSlug}/study-guide/`;
}

/** Public revision notes: /life-in-the-uk-test/revision-notes/ */
export function revisionNotesPath(app: AppRecord): string {
  return `/${app.examSlug}/revision-notes/`;
}

/** Public cheat sheet: /life-in-the-uk-test/cheat-sheet/ */
export function cheatSheetPath(app: AppRecord): string {
  return `/${app.examSlug}/cheat-sheet/`;
}

/** Authenticated dashboard (noindex, brand-keyed): /app/britpass/ */
export function dashboard(app: AppRecord): string {
  return `/app/${app.slug}/`;
}
