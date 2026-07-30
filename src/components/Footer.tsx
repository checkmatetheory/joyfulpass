import Link from "next/link";
import Image from "next/image";
import { apps } from "@/lib/apps";
import { blogIndex, examHub, testCentresPath } from "@/lib/urls";
import { LOGO_WHITE_URL, SITE_NAME } from "@/lib/site";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#2E1065] text-white">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-20 sm:px-6 lg:grid-cols-[1.3fr_1fr_1fr_1fr]">
        <div>
          <Image
            src={LOGO_WHITE_URL}
            alt={SITE_NAME}
            width={280}
            height={64}
            className="h-16 w-auto sm:h-20"
            style={{ width: "auto" }}
          />
          <p className="mt-5 max-w-sm text-base leading-relaxed text-white/75">
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
                <Link href={examHub(app)} className="text-white/80 hover:text-white">
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
                <Link href={blogIndex(app)} className="text-white/80 hover:text-white">
                  Help with {app.name}
                </Link>
              </li>
            ))}
            {apps
              .filter((app) => app.hasTestCenters)
              .map((app) => (
                <li key={`${app.slug}-test-centres`}>
                  <Link
                    href={testCentresPath(app)}
                    className="text-white/80 hover:text-white"
                  >
                    {app.name} test centres
                  </Link>
                </li>
              ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 px-4 py-7 text-sm text-white/65 sm:px-6">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-6 gap-y-2 text-center">
          <Link href="/privacy-policy/" className="hover:text-white">
            Privacy policy
          </Link>
          <Link href="/terms/" className="hover:text-white">
            Terms &amp; conditions
          </Link>
          <Link href="/accessibility-statement/" className="hover:text-white">
            Accessibility statement
          </Link>
          <Link href="/site-map/" className="hover:text-white">
            Sitemap
          </Link>
          <span>
            © {year} {SITE_NAME}. Not affiliated with any government body.
          </span>
        </div>
      </div>
    </footer>
  );
}
