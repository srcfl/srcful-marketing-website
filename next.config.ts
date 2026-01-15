import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  transpilePackages: ["@sourceful-energy/ui"],
  compress: true,
  async redirects() {
    return [
      // Old site routes → New routes
      { source: "/connect-your-home", destination: "/use-cases/homeowners", permanent: true },
      { source: "/connect-your-home/", destination: "/use-cases/homeowners", permanent: true },
      { source: "/connect-your-solar-pv", destination: "/zap", permanent: true },
      { source: "/connect-your-solar-pv/", destination: "/zap", permanent: true },
      { source: "/connect-your-vehicle", destination: "/v2x", permanent: true },
      { source: "/connect-your-vehicle/", destination: "/v2x", permanent: true },
      { source: "/b2b", destination: "/use-cases/utilities", permanent: true },
      { source: "/b2b/", destination: "/use-cases/utilities", permanent: true },
      { source: "/app-downloads", destination: "/app", permanent: true },
      { source: "/app-downloads/", destination: "/app", permanent: true },

      // Old blog post URLs (with dots) → New slugs (with hyphens)
      {
        source: "/blog/i-built-a-full-ai-ready-design-system-in-1.4-days.-with-ai",
        destination: "/blog/i-built-a-full-ai-ready-design-system-in-1-4-days-with-ai",
        permanent: true,
      },
      {
        source: "/blog/how-stockholm-homeowners-are-saving-2-925-kr-per-year-on-peak-demand-fees",
        destination: "/blog/how-stockholm-homeowners-are-saving-2-925-kr-per-year-on-peak-demand-fees",
        permanent: true,
      },
      {
        source: "/blog/stop-overpaying-for-electricity-how-to-save-money-using-real-time-energy-prices",
        destination: "/blog/stop-overpaying-for-electricity-how-to-save-money-using-real-time-energy-prices",
        permanent: true,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.shopify.com",
      },
    ],
    formats: ["image/avif", "image/webp"],
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "X-DNS-Prefetch-Control",
            value: "on",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=31536000; includeSubDomains",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },
};

export default withNextIntl(nextConfig);
