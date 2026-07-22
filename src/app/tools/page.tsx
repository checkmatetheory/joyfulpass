import type { Metadata } from "next";
import { apps } from "@/lib/apps";
import ToolCard from "@/components/ToolCard";
import { SITE_NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: "Tools",
  description: `Free calculators and tools from every ${SITE_NAME} app, in one directory.`,
  alternates: { canonical: "/tools/" },
};

export default function ToolsIndexPage() {
  const appsWithTools = apps.filter((app) => app.tools.length > 0);

  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
      <h1 className="text-4xl font-extrabold">Tools</h1>
      <p className="mt-4 max-w-2xl opacity-80">
        Free, focused tools from across the JoyfulPass family. Each tool lives inside its own
        app&rsquo;s directory — this page is just the map.
      </p>

      <div className="mt-10 space-y-10">
        {appsWithTools.map((app) => (
          <section key={app.slug}>
            <h2 className="flex items-center gap-2 text-xl font-bold">
              <span aria-hidden>{app.flagEmoji}</span> {app.name}
            </h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {app.tools.map((tool) => (
                <ToolCard
                  key={tool.slug}
                  tool={tool}
                  href={`/${app.slug}/${tool.slug}/`}
                  accent={app.theme.accent}
                />
              ))}
            </div>
          </section>
        ))}

        {appsWithTools.length === 0 && (
          <p className="opacity-60">No tools published yet — check back soon.</p>
        )}
      </div>
    </div>
  );
}
