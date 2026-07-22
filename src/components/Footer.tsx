import Link from "next/link";
import Image from "next/image";
import { apps } from "@/lib/apps";
import { SITE_NAME } from "@/lib/site";

const LOGO_URL = "https://657cm7lxu0.ufs.sh/f/0rylvrjOEnN1k0q8x3P0iROj6VeEqT1Kpnm728XoNfrSPHyQ";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#2E1065] text-white">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-4">
        <div>
          <Image src={LOGO_URL} alt={SITE_NAME} width={140} height={32} className="h-8 w-auto" />
          <p className="mt-3 max-w-xs text-sm text-white/70">
            Focused, trustworthy prep apps for the exams that change your life — citizenship,
            settlement, and beyond.
          </p>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-white/60">Apps</p>
          <ul className="mt-3 space-y-2 text-sm">
            {apps.map((app) => (
              <li key={app.slug}>
                <Link href={`/${app.slug}/`} className="text-white/90 hover:underline">
                  {app.flagEmoji} {app.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-white/60">Explore</p>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <Link href="/tools/" className="text-white/90 hover:underline">
                Tools directory
              </Link>
            </li>
            <li>
              <Link href="/blog/" className="text-white/90 hover:underline">
                Blog
              </Link>
            </li>
            <li>
              <Link href="/about/" className="text-white/90 hover:underline">
                About Joyful
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-white/60">Per-app</p>
          <ul className="mt-3 space-y-2 text-sm">
            {apps.map((app) => (
              <li key={app.slug}>
                <Link href={`/${app.slug}/blog/`} className="text-white/90 hover:underline">
                  {app.name} blog
                </Link>
                {app.hasTestCenters && (
                  <>
                    {" · "}
                    <Link
                      href={`/${app.slug}/test-centers/`}
                      className="text-white/90 hover:underline"
                    >
                      Test centers
                    </Link>
                  </>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 px-4 py-6 text-xs text-white/60 sm:px-6">
        <div className="mx-auto max-w-6xl">
          © {year} {SITE_NAME}. Not affiliated with any government body. All exam-prep content
          references official public sources, linked from each app.
        </div>
      </div>
    </footer>
  );
}
