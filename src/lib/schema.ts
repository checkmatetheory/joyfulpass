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
  author: string;
  image?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: opts.title,
    description: opts.description,
    datePublished: opts.datePublished,
    dateModified: opts.datePublished,
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
