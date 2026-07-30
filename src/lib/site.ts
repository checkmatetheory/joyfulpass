export const SITE_NAME = "Joyful";
export const SITE_URL = "https://joyfulpass.com";
export const SITE_TAGLINE = "The best apps to pass life-changing exams";
export const SITE_DESCRIPTION =
  "Feel the joy of passing your citizenship test, or acing your naturalisation exam, with Joyful. The best apps for life-changing exams.";
export const SITE_TWITTER = "@joyfulpass";
// Brand favicon / app icon. Hosted remotely (same host as the OG image), so
// it's referenced via metadata rather than a file in app/.
export const FAVICON_URL =
  "https://657cm7lxu0.ufs.sh/f/0rylvrjOEnN1I0GxBiKyX7vNUGCPfV0h2MZxWdSmk9yipujR";
// Joyful horizontal wordmark logo. LOGO_URL is the light/white version used on
// the marketing header's dark purple bar. LOGO_PURPLE_URL is the purple version
// used in the exam sidebar, where it must read on both the cream (light) and
// dark sidebar backgrounds.
export const LOGO_URL =
  "https://657cm7lxu0.ufs.sh/f/0rylvrjOEnN1k0q8x3P0iROj6VeEqT1Kpnm728XoNfrSPHyQ";
export const LOGO_PURPLE_URL =
  "https://657cm7lxu0.ufs.sh/f/0rylvrjOEnN1eurOUBCHp1AK08lhVEFW94bncCPZ3LRdaJux";
export const ORG_FOUNDING_YEAR = "2023";

// Default social-share (Open Graph / Twitter) image for the whole site. Used
// wherever a page doesn't provide a more specific one. Standard 1200×630.
export const OG_IMAGE = {
  url: "https://657cm7lxu0.ufs.sh/f/0rylvrjOEnN1J4S4Q6Oy8xiwbVSNmlouj4F7f6PHQOg12aA5",
  width: 1200,
  height: 630,
  alt: `${SITE_NAME} — focused prep apps for life-changing exams`,
} as const;
