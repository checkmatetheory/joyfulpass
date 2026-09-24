import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkGfm from "remark-gfm";
import remarkHtml from "remark-html";

const CONTENT_ROOT = path.join(process.cwd(), "src", "content", "blog");

export type PostFaq = { question: string; answer: string };

export type PostMeta = {
  slug: string;
  scope: string;
  title: string;
  description: string;
  date: string;
  author: string;
  authorCredential: string;
  readingMinutes: number;
  coverImage: string;
  /** Last substantive update (frontmatter `updated`), used for dateModified. */
  updated?: string;
  /** Optional on-page FAQ (frontmatter `faqs`), rendered + emitted as FAQPage. */
  faqs?: PostFaq[];
};

// Placeholder cover images (Lorem Picsum — free, royalty-free photos meant for
// mockups). Deterministic per-slug seed so each post keeps the same image.
// Replace with real, topical, licensed photography before launch by adding a
// `coverImage:` field to a post's frontmatter.
function coverImageFor(slug: string, frontmatter: Record<string, unknown>): string {
  if (typeof frontmatter.coverImage === "string") return frontmatter.coverImage;
  return `https://picsum.photos/seed/joyful-${slug}/800/500`;
}

export type Post = PostMeta & {
  contentHtml: string;
};

function scopeDir(scope: string): string {
  return path.join(CONTENT_ROOT, scope);
}

export function getPostSlugs(scope: string): string[] {
  const dir = scopeDir(scope);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((file) => file.endsWith(".md"))
    .map((file) => file.replace(/\.md$/, ""));
}

function readFrontmatter(scope: string, slug: string) {
  const filePath = path.join(scopeDir(scope), `${slug}.md`);
  const raw = fs.readFileSync(filePath, "utf8");
  return matter(raw);
}

function estimateReadingMinutes(content: string): number {
  const words = content.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 200));
}

function parseFaqs(value: unknown): PostFaq[] | undefined {
  if (!Array.isArray(value)) return undefined;
  const faqs = value
    .filter(
      (f): f is PostFaq =>
        typeof f === "object" &&
        f !== null &&
        typeof (f as PostFaq).question === "string" &&
        typeof (f as PostFaq).answer === "string",
    )
    .map((f) => ({ question: f.question, answer: f.answer }));
  return faqs.length > 0 ? faqs : undefined;
}

/** Frontmatter → metadata, shared by the index listing and the single post. */
function metaFrom(scope: string, slug: string, data: Record<string, unknown>, content: string): PostMeta {
  return {
    slug,
    scope,
    title: data.title as string,
    description: data.description as string,
    date: data.date as string,
    author: data.author as string,
    authorCredential: data.authorCredential as string,
    readingMinutes: estimateReadingMinutes(content),
    coverImage: coverImageFor(slug, data),
    updated: typeof data.updated === "string" ? data.updated : undefined,
    faqs: parseFaqs(data.faqs),
  };
}

export function getAllPosts(scope: string): PostMeta[] {
  return getPostSlugs(scope)
    .map((slug) => {
      const { data, content } = readFrontmatter(scope, slug);
      return metaFrom(scope, slug, data, content);
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export async function getPost(scope: string, slug: string): Promise<Post | null> {
  const dir = scopeDir(scope);
  const filePath = path.join(dir, `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;

  const { data, content } = readFrontmatter(scope, slug);
  const processed = await remark().use(remarkGfm).use(remarkHtml).process(content);

  // Open external links (absolute http(s) URLs — official gov sources, etc.) in
  // a new tab so readers keep the post open, with the `noopener noreferrer`
  // security pairing. Internal links are root-relative (`/…`) and untouched.
  const contentHtml = processed
    .toString()
    .replace(/<a href="(https?:\/\/[^"]*)"/g, '<a href="$1" target="_blank" rel="noopener noreferrer"');

  return { ...metaFrom(scope, slug, data, content), contentHtml };
}

/** Other posts in the same scope, newest first — for "Related guides". */
export function getRelatedPosts(scope: string, slug: string, limit = 3): PostMeta[] {
  return getAllPosts(scope)
    .filter((post) => post.slug !== slug)
    .slice(0, limit);
}

export function getAllScopes(): string[] {
  if (!fs.existsSync(CONTENT_ROOT)) return [];
  return fs
    .readdirSync(CONTENT_ROOT, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name);
}
