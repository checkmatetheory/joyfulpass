// The single place that knows how joyfulpass.com URLs are shaped.
//
// Public pages live in a brand + test silo — /britpass/life-in-the-uk-test/… —
// so the brand namespaces its app (pricing, account, mock tests) and the test
// name (the real search term) carries the keyword. The whole app family follows
// the identical shape: /canadapass/canadian-citizenship-test/…, etc.
//
// Every internal link, canonical, and sitemap entry goes through these helpers,
// so the URL structure changes in one file instead of ~60 call sites.

import type { AppRecord } from "@/lib/apps";

/** The silo root for an app: /britpass/life-in-the-uk-test/ */
function root(app: AppRecord): string {
  return `/${app.slug}/${app.examSlug}`;
}

/** Exam Overview (the silo landing): /britpass/life-in-the-uk-test/ */
export function examHub(app: AppRecord): string {
  return `${root(app)}/`;
}

/** Indexable practice & mock tests hub: /britpass/life-in-the-uk-test/practice/ */
export function practicePath(app: AppRecord): string {
  return `${root(app)}/practice/`;
}

/** A single indexable mock test: /britpass/life-in-the-uk-test/practice/1/ */
export function practiceTestPath(app: AppRecord, n: number | string): string {
  return `${root(app)}/practice/${n}/`;
}

/** Topics index — the chapter directory: …/topics/ */
export function topicsPath(app: AppRecord): string {
  return `${root(app)}/topics/`;
}

/** Chapter practice page (Template B): …/history/ */
export function chapterPath(app: AppRecord, chapterSlug: string): string {
  return `${root(app)}/${chapterSlug}/`;
}

/** A silo tool: …/ilr-calculator/ */
export function toolPath(app: AppRecord, toolSlug: string): string {
  return `${root(app)}/${toolSlug}/`;
}

/** Blog index for the silo: …/blog/ */
export function blogIndex(app: AppRecord): string {
  return `${root(app)}/blog/`;
}

/** A blog post: …/blog/how-many-questions/ */
export function blogPost(app: AppRecord, slug: string): string {
  return `${root(app)}/blog/${slug}/`;
}

/** Test-centre directory: …/test-centres/ */
export function testCentresPath(app: AppRecord): string {
  return `${root(app)}/test-centres/`;
}

/** Public study guide: …/study-guide/ */
export function studyGuidePath(app: AppRecord): string {
  return `${root(app)}/study-guide/`;
}

/** Public revision notes: …/revision-notes/ */
export function revisionNotesPath(app: AppRecord): string {
  return `${root(app)}/revision-notes/`;
}

/** Public cheat sheet: …/cheat-sheet/ */
export function cheatSheetPath(app: AppRecord): string {
  return `${root(app)}/cheat-sheet/`;
}

// App-flow pages — same silo, but noindex.
/** Mistakes review: …/mistakes/ */
export function mistakesPath(app: AppRecord): string {
  return `${root(app)}/mistakes/`;
}
/** Web Pro pricing: …/pricing/ */
export function pricingPath(app: AppRecord): string {
  return `${root(app)}/pricing/`;
}
/** Account: …/account/ */
export function accountPath(app: AppRecord): string {
  return `${root(app)}/account/`;
}
