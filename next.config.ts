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
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "657cm7lxu0.ufs.sh" },
      // Placeholder image services used for the testimonial portraits and blog
      // cover photos during design preview — replace with real assets later.
      { protocol: "https", hostname: "randomuser.me" },
      { protocol: "https", hostname: "picsum.photos" },
    ],
  },
};

export default nextConfig;
