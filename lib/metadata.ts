import { Metadata } from "next";
import seoConfig from "@/content/seo/metadata.json";

export interface PageSeoConfig {
  title: string;
  description: string;
  keywords?: string[];
  image?: string;
  noIndex?: boolean;
}

export interface SeoDefaults {
  siteName: string;
  siteUrl: string;
  defaultImage: string;
  twitterHandle: string;
  locale: string;
}

/**
 * Generate metadata for a page based on the SEO config
 *
 * @param path - The page path (e.g., "/platform", "/use-cases/homeowners")
 * @param locale - The locale (e.g., "en", "sv")
 * @param overrides - Optional overrides for the page metadata
 * @returns Metadata object for Next.js
 */
export function generatePageMetadata(
  path: string,
  locale: string = "en",
  overrides?: Partial<PageSeoConfig>
): Metadata {
  const defaults = seoConfig.defaults as SeoDefaults;
  const pages = seoConfig.pages as Record<string, PageSeoConfig>;

  // Normalize path (remove locale prefix if present)
  const normalizedPath = path.replace(/^\/(en|sv)/, "") || "/";

  // Get page-specific config or use defaults
  const pageConfig = pages[normalizedPath] || {
    title: "Sourceful Energy",
    description: defaults.siteName,
    keywords: [],
  };

  // Merge with overrides
  const config = { ...pageConfig, ...overrides };

  // Construct the full URL
  const fullUrl = locale === "en"
    ? `${defaults.siteUrl}${normalizedPath === "/" ? "" : normalizedPath}`
    : `${defaults.siteUrl}/${locale}${normalizedPath === "/" ? "" : normalizedPath}`;

  // Get the OG image URL
  const imageUrl = config.image
    ? `${defaults.siteUrl}${config.image}`
    : `${defaults.siteUrl}${defaults.defaultImage}`;

  // Determine the locale for OG tags
  const ogLocale = locale === "sv" ? "sv_SE" : "en_US";

  return {
    title: config.title,
    description: config.description,
    keywords: config.keywords,
    alternates: {
      canonical: fullUrl,
      languages: {
        "en": `${defaults.siteUrl}${normalizedPath === "/" ? "" : normalizedPath}`,
        "sv": `${defaults.siteUrl}/sv${normalizedPath === "/" ? "" : normalizedPath}`,
      },
    },
    openGraph: {
      type: "website",
      locale: ogLocale,
      url: fullUrl,
      siteName: defaults.siteName,
      title: config.title,
      description: config.description,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: config.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: config.title,
      description: config.description,
      images: [imageUrl],
      creator: defaults.twitterHandle,
    },
    robots: config.noIndex ? { index: false, follow: false } : { index: true, follow: true },
  };
}

/**
 * Get all pages from the SEO config
 */
export function getAllSeoPages(): { path: string; config: PageSeoConfig }[] {
  const pages = seoConfig.pages as Record<string, PageSeoConfig>;
  return Object.entries(pages).map(([path, config]) => ({
    path,
    config,
  }));
}

/**
 * Get page config by path
 */
export function getPageSeoConfig(path: string): PageSeoConfig | null {
  const pages = seoConfig.pages as Record<string, PageSeoConfig>;
  const normalizedPath = path.replace(/^\/(en|sv)/, "") || "/";
  return pages[normalizedPath] || null;
}

/**
 * Get the defaults from SEO config
 */
export function getSeoDefaults(): SeoDefaults {
  return seoConfig.defaults as SeoDefaults;
}
