import Link from "next/link";
import { HomeIcon } from "@/components/dashboard/icons";

/** Compact dashboard breadcrumb: home icon → current section. */
export default function DashboardBreadcrumb({
  appSlug,
  current,
}: {
  appSlug: string;
  current: string;
}) {
  return (
    <nav aria-label="Breadcrumb" className="mb-4">
      <ol className="flex items-center gap-2 text-sm opacity-60">
        <li>
          <Link href={`/app/${appSlug}/`} className="hover:opacity-100" aria-label="Dashboard home">
            <HomeIcon className="h-4 w-4" />
          </Link>
        </li>
        <li aria-hidden>›</li>
        <li className="font-semibold opacity-90">{current}</li>
      </ol>
    </nav>
  );
}
