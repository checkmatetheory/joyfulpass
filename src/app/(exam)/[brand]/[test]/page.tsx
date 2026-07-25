import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { examPathParams, getAppByExamSlug } from "@/lib/apps";
import { getCurriculum } from "@/lib/curriculum";
import TemplateAHub from "@/components/templates/TemplateAHub";
import JsonLd from "@/components/JsonLd";
import { examHub } from "@/lib/urls";
import { breadcrumbJsonLd } from "@/lib/schema";
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
    // Keyword-first, brand second — ranks for the test name and the brand.
    title: `${app.examName} Practice — Free Questions & Mock Tests`,
    description: app.metaDescription,
    alternates: { canonical: examHub(app) },
  };
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

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: app.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };

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
      <JsonLd data={faqJsonLd} />
      <JsonLd data={courseJsonLd} />
      <JsonLd data={breadcrumb} />
      <TemplateAHub app={app} curriculum={curriculum} />
    </>
  );
}
