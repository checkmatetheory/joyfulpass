import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllExamSlugs, getAppByExamSlug } from "@/lib/apps";
import { getCurriculum, getChapter } from "@/lib/curriculum";
import { toolComponents } from "@/components/tools/registry";
import TemplateBChapter from "@/components/templates/TemplateBChapter";
import JsonLd from "@/components/JsonLd";
import { chapterPath, toolPath } from "@/lib/urls";
import { SITE_URL } from "@/lib/site";

export const dynamicParams = false;

/**
 * One dynamic segment under /[exam]/ dispatches to two page kinds:
 *   - Template B (chapter)  → a curriculum chapter slug (/life-in-the-uk-test/history/)
 *   - Tool                  → a registered tool slug (/life-in-the-uk-test/ilr-calculator/)
 * The exam hub (Template A) is the /[exam]/ index, not a topic. Static segments
 * (blog/, test-centres/) take priority over this dynamic one.
 */
export function generateStaticParams() {
  return getAllExamSlugs().flatMap((exam) => {
    const app = getAppByExamSlug(exam);
    if (!app) return [];
    const chapters = getCurriculum(app.slug)?.chapters.map((c) => c.slug) ?? [];
    const tools = app.tools.map((t) => t.slug);
    return [...chapters, ...tools].map((topic) => ({ exam, topic }));
  });
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ exam: string; topic: string }>;
}): Promise<Metadata> {
  const { exam, topic } = await params;
  const app = getAppByExamSlug(exam);
  if (!app) return {};

  const chapter = getChapter(app.slug, topic);
  if (chapter) {
    return {
      title: `${chapter.name} — ${app.examName} Practice`,
      description: chapter.intro,
      alternates: { canonical: chapterPath(app, topic) },
    };
  }

  const tool = app.tools.find((t) => t.slug === topic);
  if (tool) {
    return {
      title: tool.name,
      description: tool.shortDescription,
      alternates: { canonical: toolPath(app, topic) },
    };
  }
  return {};
}

export default async function ExamTopicPage({
  params,
}: {
  params: Promise<{ exam: string; topic: string }>;
}) {
  const { exam, topic } = await params;
  const app = getAppByExamSlug(exam);
  if (!app) notFound();
  const curriculum = getCurriculum(app.slug);

  // Template B — chapter practice
  const chapter = curriculum ? getChapter(app.slug, topic) : undefined;
  if (curriculum && chapter) {
    const quizJsonLd = {
      "@context": "https://schema.org",
      "@type": "Quiz",
      name: `${chapter.name} — ${curriculum.testName} practice`,
      about: chapter.intro,
      educationalLevel: "citizenship test preparation",
    };
    return (
      <>
        <JsonLd data={quizJsonLd} />
        <TemplateBChapter app={app} curriculum={curriculum} chapter={chapter} />
      </>
    );
  }

  // Tool
  const tool = app.tools.find((t) => t.slug === topic);
  const ToolComponent = tool ? toolComponents[tool.slug] : undefined;
  if (tool && ToolComponent) {
    const toolJsonLd = {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      name: tool.name,
      applicationCategory: "EducationApplication",
      description: tool.shortDescription,
      url: `${SITE_URL}${toolPath(app, tool.slug)}`,
      isAccessibleForFree: true,
    };
    return (
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6">
        <JsonLd data={toolJsonLd} />
        <p className="text-sm font-semibold" style={{ color: app.theme.accent }}>
          {app.flagEmoji} {app.name} tool
        </p>
        <h1 className="mt-2 text-4xl font-extrabold">{tool.name}</h1>
        <p className="mt-4 opacity-80">{tool.shortDescription}</p>
        <div className="mt-10">
          <ToolComponent accent={app.theme.accent} />
        </div>
      </div>
    );
  }

  notFound();
}
