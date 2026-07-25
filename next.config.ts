import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enables styled-components SSR support in the Next.js compiler, paired
  // with the StyledComponentsRegistry in the root layout.
  compiler: {
    styledComponents: true,
  },
  // Every internal link, canonical tag, and sitemap entry in this project
  // uses a trailing slash (matching the sitemap in the design brief), so
  // trailing-slash URLs must be the canonical, directly-served ones.
  trailingSlash: true,
  // Legacy brand-prefixed URLs → keyword-first exam silos. Specific hub/rename
  // rules come before the catch-all wildcard (first match wins).
  async redirects() {
    return [
      { source: "/britpass/life-in-the-uk-test", destination: "/life-in-the-uk-test", permanent: true },
      { source: "/britpass/test-centers", destination: "/life-in-the-uk-test/test-centres", permanent: true },
      { source: "/britpass/:path*", destination: "/life-in-the-uk-test/:path*", permanent: true },
      {
        source: "/canadapass/canadian-citizenship-test",
        destination: "/canadian-citizenship-test",
        permanent: true,
      },
      {
        source: "/canadapass/test-centers",
        destination: "/canadian-citizenship-test/test-centres",
        permanent: true,
      },
      { source: "/canadapass/:path*", destination: "/canadian-citizenship-test/:path*", permanent: true },
    ];
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "657cm7lxu0.ufs.sh" },
      // Placeholder image services used for the testimonial portraits and blog
      // cover photos during design preview — replace with real assets later.
      { protocol: "https", hostname: "randomuser.me" },
      { protocol: "https", hostname: "picsum.photos" },
      { protocol: "https", hostname: "hatscripts.github.io" },
    ],
  },
};

export default nextConfig;
