import Link from "next/link";
import Image from "next/image";
import { apps } from "@/lib/apps";
import { SITE_NAME } from "@/lib/site";

const LOGO_URL = "https://657cm7lxu0.ufs.sh/f/0rylvrjOEnN1k0q8x3P0iROj6VeEqT1Kpnm728XoNfrSPHyQ";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#2E1065] text-white">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-24 sm:px-8 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <Image src={LOGO_URL} alt={SITE_NAME} width={320} height={72} className="h-[72px] w-auto" />
          <p className="mt-5 max-w-xs text-base text-white/70">
            Focused, trustworthy prep apps for the exams that change your life — citizenship,
            settlement, and beyond.
          </p>
          {/* Social links go here once real accounts exist — no placeholders for accounts we don't have yet. */}
        </div>

        <div>
          <p className="text-lg font-bold">Our apps</p>
          <ul className="mt-5 space-y-3 text-base">
            {apps.map((app) => (
              <li key={app.slug}>
                <Link href={`/${app.slug}/`} className="text-white/80 hover:text-white">
                  {app.flagEmoji} {app.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-lg font-bold">Company</p>
          <ul className="mt-5 space-y-3 text-base">
            <li>
              <Link href="/about/" className="text-white/80 hover:text-white">
                About Joyful
              </Link>
            </li>
            <li>
              <Link href="/blog/" className="text-white/80 hover:text-white">
                Blog
              </Link>
            </li>
            <li>
              <Link href="/tools/" className="text-white/80 hover:text-white">
                Tools directory
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="text-lg font-bold">Support</p>
          <ul className="mt-5 space-y-3 text-base">
            {apps.map((app) => (
              <li key={app.slug}>
                <Link href={`/${app.slug}/blog/`} className="text-white/80 hover:text-white">
                  Help with {app.name}
                </Link>
              </li>
            ))}
            {apps
              .filter((app) => app.hasTestCenters)
              .map((app) => (
                <li key={`${app.slug}-test-centers`}>
                  <Link
                    href={`/${app.slug}/test-centers/`}
                    className="text-white/80 hover:text-white"
                  >
                    {app.name} test centers
                  </Link>
                </li>
              ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 px-4 py-6 text-xs text-white/60 sm:px-6">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-6 gap-y-2 text-center">
          <Link href="/privacy-policy/" className="hover:text-white">
            Privacy policy
          </Link>
          <Link href="/terms/" className="hover:text-white">
            Terms &amp; conditions
          </Link>
          <Link href="/accessibility-statement/" className="hover:text-white">
            Accessibility statement
          </Link>
          <span>
            © {year} {SITE_NAME}. Not affiliated with any government body.
          </span>
        </div>
      </div>
    </footer>
  );
}
