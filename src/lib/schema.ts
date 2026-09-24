// Reusable JSON-LD builders. Structured data helps Google render rich results
// (breadcrumbs, FAQs) and helps AI assistants understand and cite the pages.
import { OG_IMAGE, SITE_NAME, SITE_URL } from "@/lib/site";

type Crumb = { name: string; path: string };

/** BreadcrumbList schema from an ordered list of {name, path} crumbs. */
export function breadcrumbJsonLd(crumbs: Crumb[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: `${SITE_URL}${c.path}`,
    })),
  };
}

/** Article schema for a blog post — with image, author and publisher for rich results. */
export function articleJsonLd(opts: {
  title: string;
  description: string;
  path: string;
  datePublished: string;
  dateModified?: string;
  author: string;
  image?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: opts.title,
    description: opts.description,
    datePublished: opts.datePublished,
    dateModified: opts.dateModified ?? opts.datePublished,
    author: { "@type": "Person", name: opts.author },
    image: [opts.image ?? OG_IMAGE.url],
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
    mainEntityOfPage: `${SITE_URL}${opts.path}`,
    url: `${SITE_URL}${opts.path}`,
  };
}

/** LearningResource schema for a study/revision page. */
export function learningResourceJsonLd(opts: {
  name: string;
  description: string;
  path: string;
  learningResourceType: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "LearningResource",
    name: opts.name,
    description: opts.description,
    url: `${SITE_URL}${opts.path}`,
    learningResourceType: opts.learningResourceType,
    isAccessibleForFree: true,
  };
}

/**
 * Quiz schema with each visible question and its accepted answer, so search
 * engines and AI assistants can read the practice content (only pass questions
 * that are actually rendered on the page).
 */
export function quizJsonLd(opts: {
  name: string;
  about: string;
  testName: string;
  path: string;
  questions: { prompt: string; options: string[]; answer: number | number[]; explanation: string }[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Quiz",
    name: opts.name,
    about: opts.about,
    educationalLevel: `${opts.testName} preparation`,
    url: `${SITE_URL}${opts.path}`,
    hasPart: opts.questions.map((q) => {
      const correct = Array.isArray(q.answer) ? q.answer : [q.answer];
      return {
        "@type": "Question",
        eduQuestionType: "Multiple choice",
        text: q.prompt,
        acceptedAnswer: {
          "@type": "Answer",
          text: correct.map((i) => q.options[i]).join("; "),
          answerExplanation: { "@type": "Comment", text: q.explanation },
        },
      };
    }),
  };
}

/** MobileApplication schema for an app's store listings (hub page). */
export function mobileAppJsonLd(app: {
  name: string;
  metaDescription: string;
  iconUrl?: string;
  appStoreUrl: string | null;
  playStoreUrl: string | null;
}) {
  const installUrl = app.appStoreUrl ?? app.playStoreUrl ?? undefined;
  const os = [app.appStoreUrl && "iOS", app.playStoreUrl && "Android"].filter(Boolean).join(", ");
  return {
    "@context": "https://schema.org",
    "@type": "MobileApplication",
    name: app.name,
    description: app.metaDescription,
    applicationCategory: "EducationalApplication",
    operatingSystem: os,
    ...(app.iconUrl && { image: app.iconUrl }),
    ...(installUrl && { installUrl }),
    sameAs: [app.appStoreUrl, app.playStoreUrl].filter(Boolean),
    // The app is free to download; Pro is an optional in-app/web subscription.
    offers: { "@type": "Offer", price: "0", priceCurrency: "GBP" },
    publisher: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
  };
}
