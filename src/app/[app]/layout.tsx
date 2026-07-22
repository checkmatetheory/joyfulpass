import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllAppSlugs, getApp } from "@/lib/apps";
import SiloNav from "@/components/SiloNav";
import JsonLd from "@/components/JsonLd";
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
      <SiloNav app={app} />
      {children}
    </div>
  );
}
