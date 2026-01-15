import { MetadataRoute } from "next";

const BASE_URL = "https://sourceful.energy";

// Static pages (both locales)
const staticPages = [
  "",
  "/platform",
  "/zap",
  "/v2x",
  "/pricing",
  "/about",
  "/careers",
  "/contact",
  "/community",
  "/company",
  "/developers",
  "/app",
  "/blog",
  "/integrations",
  "/tools",
  "/tools/savings-calculator",
  "/tools/battery-sizing",
  "/tools/solar-roi",
  "/tools/ev-charging",
  "/tools/v2x-savings",
  "/tools/negative-prices",
  "/use-cases/homeowners",
  "/use-cases/utilities",
  "/use-cases/installers",
  "/use-cases/oems",
  "/get-started",
  "/get-started/zap",
  "/privacy",
  "/terms",
];

// Locales
const locales = ["en", "sv"];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  // Add static pages for each locale
  for (const page of staticPages) {
    for (const locale of locales) {
      const url = locale === "en" ? `${BASE_URL}${page}` : `${BASE_URL}/${locale}${page}`;
      entries.push({
        url,
        lastModified: new Date(),
        changeFrequency: page === "" ? "daily" : "weekly",
        priority: page === "" ? 1 : page.includes("pricing") || page.includes("zap") ? 0.9 : 0.8,
      });
    }
  }

  return entries;
}
