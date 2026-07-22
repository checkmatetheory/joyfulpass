import Link from "next/link";
import type { AppTool } from "@/lib/apps";

export default function ToolCard({
  tool,
  href,
  accent,
}: {
  tool: AppTool;
  href: string;
  accent: string;
}) {
  return (
    <Link
      href={href}
      className="flex items-start gap-4 rounded-xl border border-black/10 p-5 transition hover:border-black/25 dark:border-white/10 dark:hover:border-white/30"
    >
      <span className="text-2xl" aria-hidden>
        {tool.icon}
      </span>
      <div>
        <p className="font-bold">{tool.name}</p>
        <p className="mt-1 text-sm opacity-75">{tool.shortDescription}</p>
        <span className="mt-2 inline-block text-sm font-semibold" style={{ color: accent }}>
          Open tool →
        </span>
      </div>
    </Link>
  );
}
