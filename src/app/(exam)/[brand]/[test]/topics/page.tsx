import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { examPathParams, getAppByExamSlug } from "@/lib/apps";
import { getCurriculum } from "@/lib/curriculum";
import ChapterCard from "@/components/templates/ChapterCard";
import JsonLd from "@/components/JsonLd";
import { examHub, topicsPath } from "@/lib/urls";
import { breadcrumbJsonLd } from "@/lib/schema";

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
    title: `${app.examName} Topics — Practise by Chapter`,
    description: `Practise the ${app.examName} one topic at a time. Every official chapter with its own free quiz.`,
    alternates: { canonical: topicsPath(app) },
  };
}

export default async function TopicsPage({
  params,
}: {
  params: Promise<{ brand: string; test: string }>;
}) {
  const { test } = await params;
  const app = getAppByExamSlug(test);
  if (!app) notFound();
  const curriculum = getCurriculum(app.slug);
  if (!curriculum) notFound();

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Joyful", path: "/" },
          { name: curriculum.testName, path: examHub(app) },
          { name: "Topics", path: topicsPath(app) },
        ])}
      />

      <nav aria-label="Breadcrumb" className="text-sm opacity-60">
        <ol className="flex flex-wrap items-center gap-1.5">
          <li>
            <Link href={examHub(app)} className="hover:underline">
              {curriculum.testName}
            </Link>
          </li>
          <li aria-hidden>/</li>
          <li className="font-semibold opacity-90">Topics</li>
        </ol>
      </nav>

      <h1 className="mt-6 text-3xl font-extrabold tracking-tight sm:text-4xl">
        {curriculum.testName} Topics
      </h1>
      <p className="mt-4 max-w-2xl text-lg opacity-75">
        Practise one topic at a time. The {curriculum.testName} handbook is organised into these
        chapters — each has its own free quiz, so you can focus on the sections you find hardest.
      </p>

      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {curriculum.chapters.map((chapter, i) => (
          <ChapterCard key={chapter.slug} chapter={chapter} app={app} number={i + 1} />
        ))}
      </div>
    </div>
  );
}
