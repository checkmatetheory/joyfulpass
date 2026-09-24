import Link from "next/link";

/** Visible breadcrumb trail (mirrors the BreadcrumbList JSON-LD). */
export default function Breadcrumbs({ crumbs }: { crumbs: { name: string; href?: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6 text-sm opacity-60">
      <ol className="flex flex-wrap items-center gap-1.5">
        {crumbs.map((crumb, i) => (
          <li key={`${crumb.name}-${i}`} className="flex items-center gap-1.5">
            {i > 0 && <span aria-hidden>/</span>}
            {crumb.href ? (
              <Link href={crumb.href} className="hover:underline">
                {crumb.name}
              </Link>
            ) : (
              <span className="line-clamp-1 font-semibold opacity-90">{crumb.name}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
