import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllAppSlugs, getApp } from "@/lib/apps";
import { toolComponents } from "@/components/tools/registry";
import JsonLd from "@/components/JsonLd";
import { SITE_URL } from "@/lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllAppSlugs().flatMap((appSlug) => {
    const app = getApp(appSlug);
    if (!app) return [];
    return app.tools.map((tool) => ({ app: appSlug, tool: tool.slug }));
  });
}

function resolveTool(appSlug: string, toolSlug: string) {
  const app = getApp(appSlug);
  if (!app) return null;
  const tool = app.tools.find((t) => t.slug === toolSlug);
  if (!tool) return null;
  return { app, tool };
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ app: string; tool: string }>;
}): Promise<Metadata> {
  const { app: appSlug, tool: toolSlug } = await params;
  const resolved = resolveTool(appSlug, toolSlug);
  if (!resolved) return {};
  return {
    title: resolved.tool.name,
    description: resolved.tool.shortDescription,
    alternates: { canonical: `/${appSlug}/${toolSlug}/` },
  };
}

export default async function AppToolPage({
  params,
}: {
  params: Promise<{ app: string; tool: string }>;
}) {
  const { app: appSlug, tool: toolSlug } = await params;
  const resolved = resolveTool(appSlug, toolSlug);
  if (!resolved) notFound();
  const { app, tool } = resolved;

  const ToolComponent = toolComponents[tool.slug];
  if (!ToolComponent) notFound();

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
