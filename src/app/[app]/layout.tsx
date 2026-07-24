import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllAppSlugs, getApp } from "@/lib/apps";
import JsonLd from "@/components/JsonLd";
import PromoBanner from "@/components/PromoBanner";
import { getCurriculum } from "@/lib/curriculum";
import { SITE_URL } from "@/lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllAppSlugs().map((app) => ({ app }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ app: string }>;
}): Promise<Metadata> {
  const { app: appSlug } = await params;
  const app = getApp(appSlug);
  if (!app) return {};
  return {
    title: {
      default: `${app.name} — ${app.tagline}`,
      template: `%s | ${app.name}`,
    },
    description: app.metaDescription,
  };
}

export default async function AppLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ app: string }>;
}) {
  const { app: appSlug } = await params;
  const app = getApp(appSlug);
  if (!app) notFound();

  const curriculum = getCurriculum(app.slug);
  const promoHref = curriculum
    ? `/${app.slug}/${curriculum.testSlug}/#download`
    : `/${app.slug}/`;

  const educationalOrgJsonLd = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: app.name,
    url: `${SITE_URL}/${app.slug}/`,
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
        } as React.CSSProperties
      }
    >
      <JsonLd data={educationalOrgJsonLd} />
      <PromoBanner
        appSlug={app.slug}
        appName={app.name}
        href={promoHref}
        message={`Get ${app.name} — 4.9★ on the App Store`}
        ctaLabel="Get the app"
      />
      {children}
    </div>
  );
}
