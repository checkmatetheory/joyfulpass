import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllAppSlugs, getApp } from "@/lib/apps";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";

export const dynamicParams = false;

// The dashboard is a private, post-sign-in surface — keep it out of the index.
export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export function generateStaticParams() {
  return getAllAppSlugs().map((slug) => ({ slug }));
}

export default async function DashboardLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const app = getApp(slug);
  if (!app) notFound();

  return (
    <div
      className="flex min-h-screen"
      style={
        {
          "--accent": app.theme.accent,
          "--accent-dark": app.theme.accentDark,
          "--accent-soft": app.theme.accentSoft,
          "--accent-foreground": app.theme.accentForeground,
        } as React.CSSProperties
      }
    >
      <div className="sticky top-0 hidden h-screen md:block">
        <DashboardSidebar appSlug={app.slug} appName={app.name} flagEmoji={app.flagEmoji} />
      </div>
      <main className="min-w-0 flex-1 px-6 py-8 sm:px-10">{children}</main>
    </div>
  );
}
