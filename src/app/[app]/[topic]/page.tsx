import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllAppSlugs, getApp } from "@/lib/apps";
import { getCurriculum, resolveTopic } from "@/lib/curriculum";
import { toolComponents } from "@/components/tools/registry";
import TemplateAHub from "@/components/templates/TemplateAHub";
import TemplateBChapter from "@/components/templates/TemplateBChapter";
import JsonLd from "@/components/JsonLd";
import { SITE_URL } from "@/lib/site";

export const dynamicParams = false;

/**
 * One dynamic segment under /[app]/ dispatches to three page kinds:
 *   - Template A (test hub)   → the app's testSlug
 *   - Template B (chapter)    → a curriculum chapter slug
 *   - Tool                    → a registered tool slug (e.g. ilr-calculator)
 * Static segments (blog/, test-centers/) take priority over this dynamic one.
 */
export function generateStaticParams() {
  return getAllAppSlugs().flatMap((appSlug) => {
    const app = getApp(appSlug);
    if (!app) return [];
    const curriculum = getCurriculum(appSlug);
    const topics = curriculum
      ? [curriculum.testSlug, ...curriculum.chapters.map((c) => c.slug)]
      : [];
    const tools = app.tools.map((t) => t.slug);
    return [...topics, ...tools].map((topic) => ({ app: appSlug, topic }));
  });
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ app: string; topic: string }>;
}): Promise<Metadata> {
  const { app: appSlug, topic } = await params;
  const app = getApp(appSlug);
  if (!app) return {};

  const resolved = resolveTopic(appSlug, topic);
  if (resolved?.kind === "hub") {
    return {
      title: `${resolved.curriculum.testName} — Free Practice`,
      description: resolved.curriculum.intro,
      alternates: { canonical: `/${appSlug}/${topic}/` },
    };
  }
  if (resolved?.kind === "chapter") {
    return {
      title: `${resolved.chapter.name} — ${resolved.curriculum.testName} Practice`,
      description: resolved.chapter.intro,
      alternates: { canonical: `/${appSlug}/${topic}/` },
    };
  }

  const tool = app.tools.find((t) => t.slug === topic);
  if (tool) {
    return {
      title: tool.name,
      description: tool.shortDescription,
      alternates: { canonical: `/${appSlug}/${topic}/` },
    };
  }
  return {};
}

export default async function AppTopicPage({
  params,
}: {
  params: Promise<{ app: string; topic: string }>;
}) {
  const { app: appSlug, topic } = await params;
  const app = getApp(appSlug);
  if (!app) notFound();

  // Template A / B
  const resolved = resolveTopic(appSlug, topic);
  if (resolved?.kind === "hub") {
    const faqJsonLd = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: app.faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: { "@type": "Answer", text: faq.answer },
      })),
    };
    return (
      <>
        <JsonLd data={faqJsonLd} />
        <TemplateAHub app={app} curriculum={resolved.curriculum} />
      </>
    );
  }
  if (resolved?.kind === "chapter") {
    const quizJsonLd = {
      "@context": "https://schema.org",
      "@type": "Quiz",
      name: `${resolved.chapter.name} — ${resolved.curriculum.testName} practice`,
      about: resolved.chapter.intro,
      educationalLevel: "citizenship test preparation",
    };
    return (
      <>
        <JsonLd data={quizJsonLd} />
        <TemplateBChapter
          app={app}
          curriculum={resolved.curriculum}
          chapter={resolved.chapter}
        />
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
      url: `${SITE_URL}/${app.slug}/${tool.slug}/`,
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
