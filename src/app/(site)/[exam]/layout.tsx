import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllExamSlugs, getAppByExamSlug } from "@/lib/apps";
import JsonLd from "@/components/JsonLd";
import PromoBanner from "@/components/PromoBanner";
import { examHub } from "@/lib/urls";
import { SITE_URL } from "@/lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllExamSlugs().map((exam) => ({ exam }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ exam: string }>;
}): Promise<Metadata> {
  const { exam } = await params;
  const app = getAppByExamSlug(exam);
  if (!app) return {};
  return {
    title: {
      // Brand + keyword so we also rank for the brand name (BritPass/CanadaPass).
      default: `${app.examName} Practice — ${app.name}`,
      template: `%s | ${app.name}`,
    },
    description: app.metaDescription,
  };
}

export default async function ExamLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ exam: string }>;
}) {
  const { exam } = await params;
  const app = getAppByExamSlug(exam);
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
      style={
        {
          "--accent": app.theme.accent,
          "--accent-dark": app.theme.accentDark,
          "--accent-soft": app.theme.accentSoft,
          "--accent-foreground": app.theme.accentForeground,
          "--accent-secondary": app.theme.accentSecondary,
        } as React.CSSProperties
      }
    >
      <JsonLd data={educationalOrgJsonLd} />
      <PromoBanner
        appSlug={app.slug}
        appName={app.name}
        href={`${examHub(app)}#download`}
        message={`Get ${app.name} — 4.9★ on the App Store`}
        ctaLabel="Get the app"
      />
      {children}
    </div>
  );
}
