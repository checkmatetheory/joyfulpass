import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllAppSlugs, getApp } from "@/lib/apps";
import { getTestCenters } from "@/lib/testCenters";
import TestCenterList from "@/components/TestCenterList";

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllAppSlugs()
    .filter((slug) => getApp(slug)?.hasTestCenters)
    .map((app) => ({ app }));
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
    title: "Test Centers",
    description: `Find official ${app.examName} test locations across ${app.country}.`,
    alternates: { canonical: `/${app.slug}/test-centers/` },
  };
}

export default async function AppTestCentersPage({
  params,
}: {
  params: Promise<{ app: string }>;
}) {
  const { app: appSlug } = await params;
  const app = getApp(appSlug);
  if (!app || !app.hasTestCenters) notFound();

  const centers = getTestCenters(app.slug);

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <h1 className="text-4xl font-extrabold">{app.name} test centers</h1>
      <p className="mt-4 opacity-80">
        A directory of {app.examName} locations across {app.country}. Always confirm current
        availability and book directly through{" "}
        <a href={app.officialSource.url} className="font-semibold hover:underline">
          {app.officialSource.name}
        </a>
        .
      </p>

      <div className="mt-10">
        <TestCenterList centers={centers} />
      </div>
    </div>
  );
}
