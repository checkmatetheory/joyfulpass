import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkGfm from "remark-gfm";
import remarkHtml from "remark-html";

const CONTENT_ROOT = path.join(process.cwd(), "src", "content", "blog");

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

export function getAllPosts(scope: string): PostMeta[] {
  return getPostSlugs(scope)
    .map((slug) => {
      const { data, content } = readFrontmatter(scope, slug);
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
      };
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export async function getPost(scope: string, slug: string): Promise<Post | null> {
  const dir = scopeDir(scope);
  const filePath = path.join(dir, `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;

  const { data, content } = readFrontmatter(scope, slug);
  const processed = await remark().use(remarkGfm).use(remarkHtml).process(content);

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
    contentHtml: processed.toString(),
  };
}

export function getAllScopes(): string[] {
  if (!fs.existsSync(CONTENT_ROOT)) return [];
  return fs
    .readdirSync(CONTENT_ROOT, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name);
}
