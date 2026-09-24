// One place that builds a page's full metadata. Next replaces (not merges) a
// parent's `openGraph`/`twitter` objects when a page sets them, so every page
// must ship complete ones — otherwise it silently inherits the homepage's
// og:title/og:url and every share and SERP snippet shows the wrong page.
import type { Metadata } from "next";
import { OG_IMAGE, SITE_NAME, SITE_TWITTER } from "@/lib/site";

type OgImage = { url: string; width?: number; height?: number; alt?: string };

export function buildMetadata(opts: {
  /** Page title. The layout's title template appends " | Brand". */
  title: string;
  description: string;
  /** Root-relative canonical path, e.g. "/britpass/life-in-the-uk-test/". */
  path: string;
  /** Brand shown after the title in social cards (defaults to Joyful). */
  brand?: string;
  /** Use the title verbatim (no template) — e.g. the homepage. */
  absoluteTitle?: boolean;
  image?: OgImage | string;
  noindex?: boolean;
  article?: { publishedTime: string; modifiedTime?: string; authors?: string[] };
}): Metadata {
  const image: OgImage =
    typeof opts.image === "string" ? { url: opts.image } : (opts.image ?? OG_IMAGE);
  const socialTitle = opts.absoluteTitle
    ? opts.title
    : `${opts.title} | ${opts.brand ?? SITE_NAME}`;

  if (opts.noindex) {
    // No canonical on noindex pages — a canonical pointing elsewhere (the old
    // inherited "/") sends Google contradictory signals.
    return {
      title: opts.absoluteTitle ? { absolute: opts.title } : opts.title,
      description: opts.description,
      robots: { index: false, follow: false },
    };
  }

  return {
    title: opts.absoluteTitle ? { absolute: opts.title } : opts.title,
    description: opts.description,
    alternates: { canonical: opts.path },
    openGraph: {
      type: opts.article ? "article" : "website",
      siteName: SITE_NAME,
      url: opts.path,
      title: socialTitle,
      description: opts.description,
      images: [image],
      ...(opts.article && {
        publishedTime: opts.article.publishedTime,
        modifiedTime: opts.article.modifiedTime ?? opts.article.publishedTime,
        authors: opts.article.authors,
      }),
    },
    twitter: {
      card: "summary_large_image",
      site: SITE_TWITTER,
      title: socialTitle,
      description: opts.description,
      images: [image.url],
    },
  };
}
