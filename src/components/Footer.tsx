import Link from "next/link";
import Image from "next/image";
import type { ComponentProps } from "react";
import { apps } from "@/lib/apps";
import { blogIndex, examHub, testCentresPath } from "@/lib/urls";
import { EXTERNAL_LINK_PROPS, LOGO_WHITE_URL, SITE_NAME, SOCIAL_LINKS, type SocialPlatform } from "@/lib/site";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#340d81] text-white">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-20 sm:px-6 lg:grid-cols-[1.3fr_1fr_1fr_1fr]">
        <div className="pt-2 text-center sm:pt-0 sm:text-left">
          <Image
            src={LOGO_WHITE_URL}
            alt={SITE_NAME}
            width={280}
            height={64}
            className="mx-auto h-12 w-auto sm:mx-0 sm:h-14"
            style={{ width: "auto" }}
          />
          <p className="mx-auto mt-5 max-w-sm text-base leading-relaxed text-white/75 sm:mx-0">
            Focused, trustworthy prep apps for the exams that change your life — citizenship,
            settlement, and beyond.
          </p>
          <ul className="mt-7 flex items-center justify-center gap-6 sm:justify-start">
            {SOCIAL_LINKS.map((social) => (
              <li key={social.platform}>
                <a
                  href={social.href}
                  {...EXTERNAL_LINK_PROPS}
                  aria-label={`${SITE_NAME} on ${social.label}`}
                  className="block text-white/90 transition hover:text-white"
                >
                  <SocialIcon platform={social.platform} className="h-7 w-7" aria-hidden />
                </a>
              </li>
            ))}
          </ul>
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

// Monochrome brand glyphs (fill = currentColor) for the footer social row.
function SocialIcon({ platform, ...props }: { platform: SocialPlatform } & ComponentProps<"svg">) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d={SOCIAL_ICON_PATHS[platform]} />
    </svg>
  );
}

const SOCIAL_ICON_PATHS: Record<SocialPlatform, string> = {
  facebook:
    "M24 12.07C24 5.4 18.63 0 12 0S0 5.4 0 12.07c0 6.03 4.39 11.03 10.13 11.93v-8.44H7.08v-3.49h3.05V9.41c0-3.02 1.79-4.69 4.53-4.69 1.31 0 2.68.24 2.68.24v2.97h-1.51c-1.49 0-1.95.93-1.95 1.88v2.26h3.32l-.53 3.49h-2.79V24C19.61 23.1 24 18.1 24 12.07z",
  instagram:
    "M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41-.56-.22-.96-.48-1.38-.9-.42-.42-.68-.82-.9-1.38-.16-.42-.36-1.06-.41-2.23-.06-1.27-.07-1.65-.07-4.85s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41 1.27-.06 1.65-.07 4.85-.07M12 0C8.74 0 8.33.01 7.05.07 5.78.13 4.9.33 4.14.63c-.79.31-1.46.72-2.13 1.38C1.35 2.68.94 3.35.63 4.14.33 4.9.13 5.78.07 7.05.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.06 1.27.26 2.15.56 2.91.31.79.72 1.46 1.38 2.13.67.66 1.34 1.07 2.13 1.38.76.3 1.64.5 2.91.56C8.33 23.99 8.74 24 12 24s3.67-.01 4.95-.07c1.27-.06 2.15-.26 2.91-.56.79-.31 1.46-.72 2.13-1.38.66-.67 1.07-1.34 1.38-2.13.3-.76.5-1.64.56-2.91.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.06-1.27-.26-2.15-.56-2.91-.31-.79-.72-1.46-1.38-2.13C21.32 1.35 20.65.94 19.86.63 19.1.33 18.22.13 16.95.07 15.67.01 15.26 0 12 0zm0 5.84A6.16 6.16 0 1 0 18.16 12 6.16 6.16 0 0 0 12 5.84zM12 16a4 4 0 1 1 4-4 4 4 0 0 1-4 4zm6.41-10.85a1.44 1.44 0 1 0 1.44 1.44 1.44 1.44 0 0 0-1.44-1.44z",
  x: "M18.9 1.15h3.68l-8.04 9.19L24 22.85h-7.41l-5.8-7.58-6.64 7.58H.46l8.6-9.83L0 1.15h7.59l5.24 6.93 6.07-6.93zm-1.29 19.5h2.04L6.49 3.24H4.3l13.31 17.41z",
  youtube:
    "M23.5 6.19a3.02 3.02 0 0 0-2.12-2.14C19.5 3.55 12 3.55 12 3.55s-7.5 0-9.38.5A3.02 3.02 0 0 0 .5 6.19C0 8.08 0 12 0 12s0 3.92.5 5.81a3.02 3.02 0 0 0 2.12 2.14c1.88.5 9.38.5 9.38.5s7.5 0 9.38-.5a3.02 3.02 0 0 0 2.12-2.14C24 15.92 24 12 24 12s0-3.92-.5-5.81zM9.55 15.57V8.43L15.82 12l-6.27 3.57z",
  linkedin:
    "M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14zm1.78 13.02H3.55V9h3.57v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.55C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.72C24 .77 23.2 0 22.22 0z",
};
