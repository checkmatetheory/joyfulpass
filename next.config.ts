import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Every internal link, canonical tag, and sitemap entry in this project
  // uses a trailing slash (matching the sitemap in the design brief), so
  // trailing-slash URLs must be the canonical, directly-served ones.
  trailingSlash: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "657cm7lxu0.ufs.sh",
      },
    ],
  },
};

export default nextConfig;
