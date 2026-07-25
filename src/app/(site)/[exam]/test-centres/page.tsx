import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllExamSlugs, getAppByExamSlug } from "@/lib/apps";
import { getTestCenters } from "@/lib/testCenters";
import TestCenterList from "@/components/TestCenterList";
import { testCentresPath } from "@/lib/urls";

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllExamSlugs()
    .filter((exam) => getAppByExamSlug(exam)?.hasTestCenters)
    .map((exam) => ({ exam }));
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
    title: "Test Centres",
    description: `Find official ${app.examName} test locations across ${app.country}.`,
    alternates: { canonical: testCentresPath(app) },
  };
}

export default async function ExamTestCentresPage({
  params,
}: {
  params: Promise<{ exam: string }>;
}) {
  const { exam } = await params;
  const app = getAppByExamSlug(exam);
  if (!app || !app.hasTestCenters) notFound();

  const centers = getTestCenters(app.slug);

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <h1 className="text-4xl font-extrabold">{app.name} test centres</h1>
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
