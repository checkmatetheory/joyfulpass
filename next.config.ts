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
  // Canonical silo is /[brand]/[test]/… (e.g. /britpass/life-in-the-uk-test/).
  // Redirect any earlier test-only or bare-brand URLs onto it.
  async redirects() {
    return [
      // Earlier keyword-only silo → brand + test.
      {
        source: "/life-in-the-uk-test/:path*",
        destination: "/britpass/life-in-the-uk-test/:path*",
        permanent: true,
      },
      {
        source: "/canadian-citizenship-test/:path*",
        destination: "/canadapass/canadian-citizenship-test/:path*",
        permanent: true,
      },
      // Bare brand → its test silo.
      { source: "/britpass", destination: "/britpass/life-in-the-uk-test", permanent: true },
      {
        source: "/canadapass",
        destination: "/canadapass/canadian-citizenship-test",
        permanent: true,
      },
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
