// -----------------------------------------------------------------------------
// ✅ Simplified Next.js config for Firebase App Hosting
// Purpose: Removes AI/OpenAPI deps and Prisma plugin issues for Supastarter.
// -----------------------------------------------------------------------------

// Commented out problematic plugin
// import { withContentCollections } from "@content-collections/next";

// Temporarily disable Prisma plugin and extra packages not used in compliance app
import type { NextConfig } from "next";
import nextIntlPlugin from "next-intl/plugin";

const withNextIntl = nextIntlPlugin("./modules/i18n/request.ts");

// --- Main config ---
const nextConfig: NextConfig = {
  reactStrictMode: true,

  // Only transpile packages you actually use
  transpilePackages: [
    "@repo/ui",
    "@repo/config",
    "@repo/tailwind-config"
  ],

  images: {
    remotePatterns: [
      { protocol: "https", hostname: "lh3.googleusercontent.com" },
      { protocol: "https", hostname: "avatars.githubusercontent.com" }
    ],
  },

  eslint: {
    ignoreDuringBuilds: true,
  },

  async redirects() {
    return [
      {
        source: "/app/settings",
        destination: "/app/settings/general",
        permanent: true,
      },
      {
        source: "/app/:organizationSlug/settings",
        destination: "/app/:organizationSlug/settings/general",
        permanent: true,
      },
      {
        source: "/app/admin",
        destination: "/app/admin/users",
        permanent: true,
      },
    ];
  },

  webpack: (config, { webpack }) => {
    // Ignore optional deps that crash serverless builds
    config.plugins.push(
      new webpack.IgnorePlugin({
        resourceRegExp: /^pg-native$|^cloudflare:sockets$/,
      }),
    );

    return config;
  },
};

// Temporarily disable content collections
const withContentCollections = (config: NextConfig) => config;

export default withContentCollections(withNextIntl(nextConfig));
