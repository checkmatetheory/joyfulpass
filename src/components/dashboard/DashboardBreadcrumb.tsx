import Link from "next/link";
import type { AppRecord } from "@/lib/apps";
import { HomeIcon } from "@/components/dashboard/icons";
import { examHub } from "@/lib/urls";

/** Compact breadcrumb for the in-silo app-flow pages: overview home → section. */
export default function DashboardBreadcrumb({
  app,
  current,
}: {
  app: AppRecord;
  current: string;
}) {
  return (
    <nav aria-label="Breadcrumb" className="mb-4">
      <ol className="flex items-center gap-2 text-sm opacity-60">
        <li>
          <Link href={examHub(app)} className="hover:opacity-100" aria-label="Overview">
            <HomeIcon className="h-4 w-4" />
          </Link>
        </li>
        <li aria-hidden>›</li>
        <li className="font-semibold opacity-90">{current}</li>
      </ol>
    </nav>
  );
}
