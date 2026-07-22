import Link from "next/link";
import { apps } from "@/lib/apps";
import { SITE_NAME } from "@/lib/site";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-black/10 bg-black/[0.02] dark:border-white/10 dark:bg-white/[0.02]">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-4">
        <div>
          <p className="text-lg font-bold">{SITE_NAME}</p>
          <p className="mt-2 max-w-xs text-sm opacity-70">
            Focused, trustworthy prep apps for the exams that change your life — citizenship,
            settlement, and beyond.
          </p>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-wide opacity-60">Apps</p>
          <ul className="mt-3 space-y-2 text-sm">
            {apps.map((app) => (
              <li key={app.slug}>
                <Link href={`/${app.slug}/`} className="hover:underline">
                  {app.flagEmoji} {app.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-wide opacity-60">Explore</p>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <Link href="/tools/" className="hover:underline">
                Tools directory
              </Link>
            </li>
            <li>
              <Link href="/blog/" className="hover:underline">
                Blog
              </Link>
            </li>
            <li>
              <Link href="/about/" className="hover:underline">
                About JoyfulPass
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-wide opacity-60">Per-app</p>
          <ul className="mt-3 space-y-2 text-sm">
            {apps.map((app) => (
              <li key={app.slug}>
                <Link href={`/${app.slug}/blog/`} className="hover:underline">
                  {app.name} blog
                </Link>
                {app.hasTestCenters && (
                  <>
                    {" · "}
                    <Link href={`/${app.slug}/test-centers/`} className="hover:underline">
                      Test centers
                    </Link>
                  </>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-black/10 px-4 py-6 text-xs opacity-60 dark:border-white/10 sm:px-6">
        <div className="mx-auto max-w-6xl">
          © {year} {SITE_NAME}. Not affiliated with any government body. All exam-prep content
          references official public sources, linked from each app.
        </div>
      </div>
    </footer>
  );
}
