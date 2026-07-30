import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { examPathParams, getAppByExamSlug } from "@/lib/apps";
import JsonLd from "@/components/JsonLd";
import ExamSidebar from "@/components/exam/ExamSidebar";
import GoProButton from "@/components/exam/GoProButton";
import { examHub } from "@/lib/urls";
import { SITE_URL } from "@/lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return examPathParams();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ brand: string; test: string }>;
}): Promise<Metadata> {
  const { test } = await params;
  const app = getAppByExamSlug(test);
  if (!app) return {};
  return {
    title: {
      default: `${app.examName} Practice — ${app.name}`,
      template: `%s | ${app.name}`,
    },
    description: app.metaDescription,
  };
}

/**
 * The exam silo is a self-contained dashboard shell — persistent sidebar, no
 * marketing header/footer. This is the one layout the whole app family follows
 * (BritPass, CanadaPass, GermanPass …): SEO content and the app flow (mock
 * tests, pricing, account) all live under one keyword URL with one shell.
 */
export default async function ExamLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ brand: string; test: string }>;
}) {
  const { test } = await params;
  const app = getAppByExamSlug(test);
  if (!app) notFound();

  const educationalOrgJsonLd = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: app.name,
    url: `${SITE_URL}${examHub(app)}`,
    description: app.metaDescription,
  };

  return (
    <div
      className="flex min-h-screen"
      style={
        {
          "--accent": app.theme.accent,
          "--accent-dark": app.theme.accentDark,
          "--accent-soft": app.theme.accentSoft,
          "--accent-foreground": app.theme.accentForeground,
          "--accent-secondary": app.theme.accentSecondary,
          "--accent-highlight": app.theme.accentHighlight ?? app.theme.accent,
        } as React.CSSProperties
      }
    >
      <JsonLd data={educationalOrgJsonLd} />
      <div className="sticky top-0 hidden h-screen self-start md:block">
        <ExamSidebar app={app} />
      </div>
      <div className="relative min-w-0 flex-1">
        {/* Persistent, top-right upgrade CTA on every in-app screen. */}
        <div className="pointer-events-none sticky top-0 z-30 flex h-0 justify-end">
          <div className="pointer-events-auto px-4 pt-4 sm:px-8 sm:pt-6">
            <GoProButton app={app} />
          </div>
        </div>
        <main className="min-w-0">{children}</main>
      </div>
    </div>
  );
}
