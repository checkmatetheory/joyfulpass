import type { Metadata } from "next";
import Link from "next/link";
import { apps } from "@/lib/apps";
import { getCurriculum } from "@/lib/curriculum";
import { getAllPosts } from "@/lib/blog";
import { getMockTests } from "@/lib/mockTests";
import {
  blogIndex,
  blogPost,
  chapterPath,
  cheatSheetPath,
  examHub,
  practicePath,
  practiceTestPath,
  revisionNotesPath,
  studyGuidePath,
  testCentresPath,
  toolPath,
  topicsPath,
} from "@/lib/urls";
import { SITE_NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: "Sitemap",
  description: `Every page on ${SITE_NAME} in one place — browse all exam guides, practice tests, study materials and articles.`,
  alternates: { canonical: "/site-map/" },
};

type LinkItem = { label: string; href: string };

function LinkGroup({ title, links }: { title: string; links: LinkItem[] }) {
  return (
    <section className="break-inside-avoid">
      <h2 className="text-lg font-bold">{title}</h2>
      <ul className="mt-3 space-y-2 text-sm">
        {links.map((link) => (
          <li key={link.href}>
            <Link href={link.href} className="opacity-80 transition hover:underline hover:opacity-100">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default function SitemapPage() {
  const hubPosts = getAllPosts("hub");

  const joyfulLinks: LinkItem[] = [
    { label: "Home", href: "/" },
    { label: "About Joyful", href: "/about/" },
    { label: "Tools directory", href: "/tools/" },
    { label: "Blog", href: "/blog/" },
    { label: "Privacy policy", href: "/privacy-policy/" },
    { label: "Terms & conditions", href: "/terms/" },
    { label: "Accessibility statement", href: "/accessibility-statement/" },
    { label: "Sitemap", href: "/site-map/" },
  ];

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
      <header className="border-b border-black/10 pb-8 dark:border-white/10">
        <h1 className="text-4xl font-extrabold sm:text-5xl">Sitemap</h1>
        <p className="mt-4 max-w-2xl opacity-80">
          Every page on {SITE_NAME}, grouped by app. Looking for something specific? This is the
          fastest way to find it — and it helps search engines discover every guide, practice test
          and article we publish.
        </p>
      </header>

      <div className="mt-10 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
        <LinkGroup title={SITE_NAME} links={joyfulLinks} />

        {hubPosts.length > 0 && (
          <LinkGroup
            title="Joyful blog"
            links={hubPosts.map((post) => ({ label: post.title, href: `/blog/${post.slug}/` }))}
          />
        )}

        {apps.map((app) => {
          const curriculum = getCurriculum(app.slug);
          const links: LinkItem[] = [
            { label: `Overview — ${app.examName}`, href: examHub(app) },
            { label: "Practice & mock tests", href: practicePath(app) },
            ...getMockTests(app).map((mock) => ({
              label: `Mock test ${mock.number}`,
              href: practiceTestPath(app, mock.slug),
            })),
            ...(curriculum ? [{ label: "Topics", href: topicsPath(app) }] : []),
            ...(curriculum?.chapters.map((chapter) => ({
              label: chapter.name,
              href: chapterPath(app, chapter.slug),
            })) ?? []),
            ...(curriculum
              ? [
                  { label: "Study guide", href: studyGuidePath(app) },
                  { label: "Revision notes", href: revisionNotesPath(app) },
                  { label: "Cheat sheet", href: cheatSheetPath(app) },
                ]
              : []),
            { label: "Blog", href: blogIndex(app) },
            ...(app.hasTestCenters
              ? [{ label: "Test centres", href: testCentresPath(app) }]
              : []),
            ...app.tools.map((tool) => ({ label: tool.name, href: toolPath(app, tool.slug) })),
          ];
          return <LinkGroup key={app.slug} title={`${app.name} — ${app.examName}`} links={links} />;
        })}

        {apps.map((app) => {
          const posts = getAllPosts(app.blogCategory);
          if (posts.length === 0) return null;
          return (
            <LinkGroup
              key={`${app.slug}-articles`}
              title={`${app.name} articles`}
              links={posts.map((post) => ({ label: post.title, href: blogPost(app, post.slug) }))}
            />
          );
        })}
      </div>
    </div>
  );
}
