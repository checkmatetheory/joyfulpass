import { notFound } from "next/navigation";
import { getApp } from "@/lib/apps";
import { getCurriculum } from "@/lib/curriculum";
import DashboardBreadcrumb from "@/components/dashboard/DashboardBreadcrumb";
import DashboardCard from "@/components/dashboard/DashboardCard";
import {
  MistakesIcon,
  MockTestIcon,
  PricingIcon,
  RevisionIcon,
  StudyGuideIcon,
  TopicsIcon,
} from "@/components/dashboard/icons";

export default async function DashboardOverview({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const app = getApp(slug);
  if (!app) notFound();
  const curriculum = getCurriculum(slug);
  const base = `/app/${slug}`;
  const testName = curriculum?.testName ?? app.examName;

  return (
    <div className="mx-auto max-w-6xl">
      <DashboardBreadcrumb appSlug={slug} current="Practice" />
      <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">Practice</h1>

      {/* Route picker: how do you want to practise? */}
      <div className="mt-8 grid gap-6 md:grid-cols-3">
        <DashboardCard
          icon={<MockTestIcon />}
          title="Mock Test"
          description="Mock test results are a good indicator of what to expect on the real test."
          ctaLabel="View Mock Tests"
          href={`${base}/mock-tests/`}
        />
        <DashboardCard
          icon={<TopicsIcon />}
          title="Topics"
          description="Learn one topic at a time. The test will contain questions only from the selected topic."
          ctaLabel="View Topics"
          href={`${base}/topics/`}
        />
        <DashboardCard
          icon={<MistakesIcon />}
          title="Mistakes Test"
          description="Have another go at questions that you got wrong before."
          ctaLabel="View Mistakes"
          href={`${base}/mistakes/`}
        />
      </div>

      {/* Study materials */}
      <div className="mt-14">
        <h2 className="text-2xl font-bold">Study Materials</h2>
        <p className="mt-2 opacity-60">
          The essential reading materials for the {testName.toLowerCase()}.
        </p>
        <div className="mt-6 grid gap-6 md:grid-cols-3">
          <DashboardCard
            icon={<StudyGuideIcon />}
            title="Full Study Guide"
            description={`Your test is based on the official ${testName} study material. Read the up-to-date version online on ${app.name}.`}
            ctaLabel="Start reading"
            href={`${base}/study-guide/`}
          />
          <DashboardCard
            icon={<RevisionIcon />}
            title="Revision Notes"
            description={`A condensed version of the core reading material — everything you need to know for the ${testName.toLowerCase()}.`}
            ctaLabel="Start reading"
            href={`${base}/revision-notes/`}
          />
          <DashboardCard
            icon={<PricingIcon />}
            title="Go Pro"
            description="Unlock the full question bank, saved progress across devices, mistake history, and an offline study guide."
            ctaLabel="See plans"
            href={`${base}/pricing/`}
          />
        </div>
      </div>
    </div>
  );
}
