import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

// Map of page paths to their translation keys for content extraction
const PAGE_CONTENT_MAP: Record<string, { titleKey: string; descKey?: string; section?: string }> = {
  "/": { titleKey: "hero.title", descKey: "hero.subtitle", section: "home" },
  "/platform": { titleKey: "hero.title", descKey: "hero.subtitle", section: "platform" },
  "/zap": { titleKey: "hero.title", descKey: "hero.subtitle", section: "zap" },
  "/v2x": { titleKey: "hero.title", descKey: "hero.subtitle", section: "v2x" },
  "/developers": { titleKey: "hero.title", descKey: "hero.subtitle", section: "developers" },
  "/use-cases/homeowners": { titleKey: "hero.title", descKey: "hero.subtitle", section: "useCases.homeowners" },
  "/use-cases/utilities": { titleKey: "hero.title", descKey: "hero.subtitle", section: "useCases.utilities" },
  "/use-cases/installers": { titleKey: "hero.title", descKey: "hero.subtitle", section: "useCases.installers" },
  "/use-cases/oems": { titleKey: "hero.title", descKey: "hero.subtitle", section: "useCases.oems" },
  "/about": { titleKey: "hero.title", descKey: "hero.subtitle", section: "about" },
  "/contact": { titleKey: "hero.title", descKey: "hero.subtitle", section: "contact" },
  "/community": { titleKey: "hero.title", descKey: "hero.subtitle", section: "community" },
  "/blog": { titleKey: "title", descKey: "description", section: "blog" },
  "/integrations": { titleKey: "hero.title", descKey: "hero.subtitle", section: "integrations" },
  "/get-started": { titleKey: "hero.title", descKey: "hero.subtitle", section: "getStarted" },
  "/tools": { titleKey: "hero.title", descKey: "hero.subtitle", section: "tools" },
  "/privacy": { titleKey: "title", section: "privacy" },
  "/terms": { titleKey: "title", section: "terms" },
};

function getNestedValue(obj: Record<string, unknown>, path: string): string | null {
  const keys = path.split(".");
  let current: unknown = obj;

  for (const key of keys) {
    if (current && typeof current === "object" && key in current) {
      current = (current as Record<string, unknown>)[key];
    } else {
      return null;
    }
  }

  return typeof current === "string" ? current : null;
}

function generateKeywords(title: string, description: string): string[] {
  const text = `${title} ${description}`.toLowerCase();

  // Common energy-related keywords to look for
  const energyKeywords = [
    "energy", "solar", "battery", "EV", "charging", "grid", "power",
    "electricity", "renewable", "smart home", "V2X", "V2G", "inverter",
    "DER", "VPP", "utility", "installer", "homeowner", "savings",
    "optimization", "monitoring", "API", "developer", "integration"
  ];

  const found = energyKeywords.filter(kw => text.includes(kw.toLowerCase()));

  // Add some based on the title
  const words = title.split(/\s+/).filter(w => w.length > 4);

  return [...new Set([...found, ...words.slice(0, 3)])].slice(0, 6);
}

function truncateDescription(text: string, maxLength: number = 155): string {
  if (text.length <= maxLength) return text;

  // Find the last complete sentence or word
  const truncated = text.slice(0, maxLength);
  const lastSpace = truncated.lastIndexOf(" ");

  return truncated.slice(0, lastSpace) + "...";
}

export async function POST(request: NextRequest) {
  try {
    const { pagePath } = await request.json();

    if (!pagePath) {
      return NextResponse.json({ error: "Page path required" }, { status: 400 });
    }

    // Load English messages
    const messagesPath = path.join(process.cwd(), "messages/en.json");
    const messagesContent = await fs.readFile(messagesPath, "utf-8");
    const messages = JSON.parse(messagesContent);

    const pageConfig = PAGE_CONTENT_MAP[pagePath];

    let title = "";
    let description = "";

    if (pageConfig && pageConfig.section) {
      const section = getNestedValue(messages, pageConfig.section);

      if (section && typeof section === "object") {
        const sectionObj = section as Record<string, unknown>;
        title = getNestedValue(sectionObj as Record<string, unknown>, pageConfig.titleKey) || "";
        if (pageConfig.descKey) {
          description = getNestedValue(sectionObj as Record<string, unknown>, pageConfig.descKey) || "";
        }
      }
    }

    // Fallback: generate from path
    if (!title) {
      const pathParts = pagePath.split("/").filter(Boolean);
      title = pathParts
        .map((part: string) => part.charAt(0).toUpperCase() + part.slice(1).replace(/-/g, " "))
        .join(" - ") || "Home";
    }

    if (!description) {
      description = `Learn more about ${title.toLowerCase()} on Sourceful Energy. Local energy coordination infrastructure for the distributed energy future.`;
    }

    // Clean up the generated content
    title = title.replace(/<[^>]*>/g, "").trim(); // Remove any HTML tags
    description = truncateDescription(description.replace(/<[^>]*>/g, "").trim());

    const keywords = generateKeywords(title, description);

    return NextResponse.json({
      title,
      description,
      keywords,
    });
  } catch (error) {
    console.error("Generate SEO error:", error);
    return NextResponse.json(
      { error: "Failed to generate SEO metadata" },
      { status: 500 }
    );
  }
}
