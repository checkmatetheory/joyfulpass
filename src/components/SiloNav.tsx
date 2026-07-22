import Link from "next/link";
import type { AppRecord } from "@/lib/apps";

export default function SiloNav({ app }: { app: AppRecord }) {
  const links = [
    { href: `/${app.slug}/`, label: "Overview" },
    { href: `/${app.slug}/blog/`, label: "Blog" },
    ...app.tools.map((tool) => ({
      href: `/${app.slug}/${tool.slug}/`,
      label: tool.name,
    })),
    ...(app.hasTestCenters
      ? [{ href: `/${app.slug}/test-centers/`, label: "Test Centers" }]
      : []),
  ];

  return (
    <div className="border-b border-black/10 dark:border-white/10">
      <nav className="mx-auto flex max-w-6xl gap-6 overflow-x-auto px-4 py-3 text-sm font-medium sm:px-6">
        <span className="flex items-center gap-2 whitespace-nowrap font-bold">
          <span aria-hidden>{app.flagEmoji}</span>
          {app.name}
        </span>
        {links.map((link) => (
          <Link key={link.href} href={link.href} className="whitespace-nowrap opacity-75 hover:opacity-100">
            {link.label}
          </Link>
        ))}
      </nav>
    </div>
  );
}
