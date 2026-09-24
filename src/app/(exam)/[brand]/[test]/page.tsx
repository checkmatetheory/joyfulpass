import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { notFound } from "next/navigation";
import { examPathParams, getAppByExamSlug } from "@/lib/apps";
import { getCurriculum } from "@/lib/curriculum";
import { faqJsonLd } from "@/lib/faqs";
import TemplateAHub from "@/components/templates/TemplateAHub";
import JsonLd from "@/components/JsonLd";
import { examHub } from "@/lib/urls";
import { breadcrumbJsonLd, mobileAppJsonLd } from "@/lib/schema";
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
  return buildMetadata({
    // This page shares its segment with the layout, so the layout's "%s | {App}"
    // template doesn't reach it — set the full title explicitly.
    title: `${app.examName} — Free Practice & Study Guide | ${app.name}`,
    absoluteTitle: true,
    description: app.metaDescription,
    path: examHub(app),
    brand: app.name,
  });
}

export default async function ExamHubPage({
  params,
}: {
  params: Promise<{ brand: string; test: string }>;
}) {
  const { test } = await params;
  const app = getAppByExamSlug(test);
  if (!app) notFound();
  const curriculum = getCurriculum(app.slug);
  if (!curriculum) notFound();


  const courseJsonLd = {
    "@context": "https://schema.org",
    "@type": "Course",
    name: `${app.examName} preparation`,
    description: app.metaDescription,
    provider: { "@type": "Organization", name: "Joyful", sameAs: SITE_URL },
  };

  const breadcrumb = breadcrumbJsonLd([
    { name: "Joyful", path: "/" },
    { name: curriculum.testName, path: examHub(app) },
  ]);

  return (
    <>
      <JsonLd data={faqJsonLd(app.faqs)} />
      <JsonLd data={courseJsonLd} />
      <JsonLd data={mobileAppJsonLd(app)} />
      <JsonLd data={breadcrumb} />
      <TemplateAHub app={app} curriculum={curriculum} />
    </>
  );
}
