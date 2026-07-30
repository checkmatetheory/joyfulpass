import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import Analytics from "@/components/Analytics";
import JsonLd from "@/components/JsonLd";
import StyledComponentsRegistry from "@/components/StyledComponentsRegistry";
import ThemeProvider from "@/components/ThemeProvider";
import { OG_IMAGE, SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/site";

// Applies the saved (or OS-preferred) theme before first paint so there's no
// flash of the wrong theme. Kept tiny and inlined; runs before hydration.
const noFlashThemeScript = `(function(){try{var t=localStorage.getItem('theme');var d=t?t==='dark':window.matchMedia('(prefers-color-scheme: dark)').matches;if(d)document.documentElement.classList.add('dark');}catch(e){}})();`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — Focused prep apps for life-changing exams`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    url: SITE_URL,
    title: `${SITE_NAME} — Focused prep apps for life-changing exams`,
    description: SITE_DESCRIPTION,
    images: [OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} — Focused prep apps for life-changing exams`,
    description: SITE_DESCRIPTION,
    images: [OG_IMAGE.url],
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE_NAME,
  url: SITE_URL,
  description: SITE_DESCRIPTION,
  sameAs: [],
};

// WebSite schema helps search engines and AI assistants understand the site as
// a single entity (and enables a brand knowledge panel over time).
const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE_NAME,
  url: SITE_URL,
  description: SITE_DESCRIPTION,
  publisher: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased" suppressHydrationWarning>
      <body className="min-h-full flex flex-col">
        <Script id="theme-initialization" strategy="beforeInteractive">
          {noFlashThemeScript}
        </Script>
        <ThemeProvider>
          <StyledComponentsRegistry>
            <JsonLd data={organizationJsonLd} />
            <JsonLd data={websiteJsonLd} />
            <Analytics />
            {/* Marketing chrome lives in (site); the dashboard in (app) brings its
                own shell — both share this single root (html/body/providers). */}
            {children}
          </StyledComponentsRegistry>
        </ThemeProvider>
      </body>
    </html>
  );
}
