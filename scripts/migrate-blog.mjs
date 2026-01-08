#!/usr/bin/env node
/**
 * Blog Migration Script v2
 * Migrates all blog articles from sourceful.energy to MDX files
 * Improved author/date extraction and content cleanup
 *
 * Usage: node scripts/migrate-blog.mjs
 */

import { writeFileSync, mkdirSync, existsSync } from 'fs';
import { join } from 'path';

const BASE_URL = 'https://sourceful.energy';
const OUTPUT_DIR = './content/blog';

// Known article slugs from sitemap
const ARTICLE_SLUGS = [
  'ai-energy-optimisation-system',
  'april-2025-market-update-frequency-control-reserve-(fcr)-prices-in-sweden',
  'effekttariffer',
  'europe-s-energy-future-starts-on-the-rooftop',
  'evolving-together-refining-the-sourceful-energy-points-system',
  'grid-balance-the-foundation-of-energy-transformation',
  'how-does-v2x-affect-your-ev-battery-the-complete-guide-to-battery-health-with-bidirectional-charging',
  'how-stockholm-homeowners-are-saving-2-925-kr-per-year-on-peak-demand-fees',
  'i-built-a-full-ai-ready-design-system-in-1.4-days.-with-ai',
  'installatör-energibolag-eller-marknads-optimerare',
  'powering-the-future-the-key-to-energy-abundance-lies-in-connectivity',
  'record-low-prices-for-frequency-regulation-services-in-sweden',
  'reflections-from-the-future-of-utilities-energy-transition-summit-2025',
  'reimagining-resilience-why-europe-s-grid-needs-a-decentralized-ai-driven-future',
  'release-notes-version-1-5-0',
  'revolutionizing-energy-with-the-sourceful-energy-app',
  'seamless-authentication-log-into-your-energy-dashboard-without-the-hassle',
  'security-concerns-over-foreign-inverters-highlight-need-for-local-der-control',
  'sourceful-app-1-9-0-real-time-spot-prices-to-help-you-make-smarter-energy-choices',
  'sourceful-ems-one-smart-app-to-sync-your-energy-devices-and-save-money',
  'sourceful-energy-and-kalmar-energi-collaborate-for-smarter-energy-usage',
  'sourceful-energy-building-the-foundation-for-tomorrow-s-energy-data-ecosystem',
  'sourceful-energy-expands-network-access-with-p1-meter-integration',
  'stop-overpaying-for-electricity-how-to-save-money-using-real-time-energy-prices',
  'swedish-grid-services-market-march-2025-seasonal-trends-explained',
  'the-4-billion-secret-how-electric-vehicles-are-becoming-grid-operators-best-investment',
  'the-complete-handbook-to-vehicle-to-everything-for-private-owners',
  'the-day-everything-changes',
  'the-great-energy-transformation-why-timing-is-everything',
  'the-solar-revolution-is-here-and-sourceful-energy-is-enabling-its-decentralized-future',
];

// Categories mapping
const CATEGORIES = {
  'Company News & Updates': 'company-news',
  'Latest Stories': 'latest',
  'Insights & Thought Leadership': 'insights',
  'Product Updates': 'product',
  'Market Analysis': 'market',
  'Guides & Tutorials': 'guides',
};

// Known authors with their info
const AUTHORS = {
  'Fredrik Ahlgren': { name: 'Fredrik Ahlgren', role: 'CEO & Co-founder' },
  'Viktor Olofsson': { name: 'Viktor Olofsson', role: 'Content Lead' },
  'Paul Cooper': { name: 'Paul Cooper', role: 'Product & Design' },
  'Johan Leitet': { name: 'Johan Leitet', role: 'CTO & Co-founder' },
};

const AUTHOR_NAMES = Object.keys(AUTHORS);

/**
 * Fetch HTML content from URL
 */
async function fetchPage(url) {
  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
      },
    });
    if (!response.ok) {
      console.error(`Failed to fetch ${url}: ${response.status}`);
      return null;
    }
    return await response.text();
  } catch (error) {
    console.error(`Error fetching ${url}:`, error.message);
    return null;
  }
}

/**
 * Parse date from various formats
 */
function parseDate(dateStr) {
  if (!dateStr) return null;

  // Try various date formats
  const formats = [
    // "9 Sept 2025", "6 Jan 2026"
    /(\d{1,2})\s+(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Sept|Oct|Nov|Dec)\w*\s+(\d{4})/i,
    // "September 9, 2025"
    /(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Sept|Oct|Nov|Dec)\w*\s+(\d{1,2}),?\s+(\d{4})/i,
    // "2025-09-09"
    /(\d{4})-(\d{2})-(\d{2})/,
  ];

  const monthMap = {
    'jan': '01', 'feb': '02', 'mar': '03', 'apr': '04',
    'may': '05', 'jun': '06', 'jul': '07', 'aug': '08',
    'sep': '09', 'sept': '09', 'oct': '10', 'nov': '11', 'dec': '12'
  };

  for (const format of formats) {
    const match = dateStr.match(format);
    if (match) {
      if (format === formats[0]) {
        // "9 Sept 2025"
        const day = match[1].padStart(2, '0');
        const month = monthMap[match[2].toLowerCase().substring(0, 3)];
        const year = match[3];
        return `${year}-${month}-${day}`;
      } else if (format === formats[1]) {
        // "September 9, 2025"
        const month = monthMap[match[1].toLowerCase().substring(0, 3)];
        const day = match[2].padStart(2, '0');
        const year = match[3];
        return `${year}-${month}-${day}`;
      } else if (format === formats[2]) {
        // "2025-09-09"
        return match[0];
      }
    }
  }

  return null;
}

/**
 * Extract article data from HTML
 */
function extractArticleData(html, slug, locale) {
  // Extract title - look for h1 or og:title
  const titleMatch = html.match(/<h1[^>]*>([^<]+)<\/h1>/i) ||
                     html.match(/<meta property="og:title" content="([^"]+)"/i);
  const title = titleMatch ? titleMatch[1].trim() : slug.replace(/-/g, ' ');

  // Extract meta description
  const descMatch = html.match(/<meta name="description" content="([^"]+)"/i) ||
                    html.match(/<meta property="og:description" content="([^"]+)"/i);
  const description = descMatch ? descMatch[1].trim() : '';

  // Extract featured image
  const imageMatch = html.match(/<meta property="og:image" content="([^"]+)"/i);
  const featuredImage = imageMatch ? imageMatch[1] : '';

  // Extract author - look for known author names in the content
  let author = 'Sourceful Team';
  const htmlLower = html.toLowerCase();
  for (const authorName of AUTHOR_NAMES) {
    // Look for author name near the beginning of the article or in byline patterns
    const authorRegex = new RegExp(`(?:by|author|written by)?\\s*${authorName.replace(/\s+/g, '\\s+')}`, 'i');
    if (authorRegex.test(html)) {
      author = authorName;
      break;
    }
  }

  // Extract date - look for date patterns in the content
  let publishDate = null;

  // Look for dates in common formats
  const datePatterns = [
    /(\d{1,2}\s+(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Sept|Oct|Nov|Dec)\w*\s+\d{4})/gi,
    /((?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Sept|Oct|Nov|Dec)\w*\s+\d{1,2},?\s+\d{4})/gi,
    /datetime="(\d{4}-\d{2}-\d{2})/gi,
  ];

  for (const pattern of datePatterns) {
    const matches = html.match(pattern);
    if (matches && matches.length > 0) {
      const parsed = parseDate(matches[0]);
      if (parsed) {
        publishDate = parsed;
        break;
      }
    }
  }

  // Default to a reasonable date if not found
  if (!publishDate) {
    publishDate = '2025-01-01';
  }

  // Extract category from URL or content
  const categoryMatch = html.match(/category[:\s]*([^<,]+)/i);
  let category = 'latest';
  if (categoryMatch && CATEGORIES[categoryMatch[1].trim()]) {
    category = CATEGORIES[categoryMatch[1].trim()];
  }

  // Extract main content
  let content = '';
  const articleMatch = html.match(/<article[^>]*>([\s\S]*?)<\/article>/i);
  if (articleMatch) {
    content = articleMatch[1];
  } else {
    const contentMatch = html.match(/<div[^>]*class="[^"]*(?:article|post|content|prose)[^"]*"[^>]*>([\s\S]*?)<\/div>/i);
    if (contentMatch) {
      content = contentMatch[1];
    } else {
      // Try to get body content
      const bodyMatch = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
      if (bodyMatch) {
        content = bodyMatch[1];
      }
    }
  }

  // Clean up HTML content to markdown
  content = cleanHtmlToMarkdown(content, author);

  return {
    slug,
    locale,
    title,
    description,
    featuredImage,
    author,
    publishDate,
    category,
    content,
  };
}

/**
 * Convert HTML to simplified Markdown with cleanup
 */
function cleanHtmlToMarkdown(html, author) {
  if (!html) return '';

  let text = html
    // Remove script and style tags
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<style[\s\S]*?<\/style>/gi, '')
    .replace(/<noscript[\s\S]*?<\/noscript>/gi, '')
    // Remove SVG tags
    .replace(/<svg[\s\S]*?<\/svg>/gi, '')
    // Convert headers
    .replace(/<h1[^>]*>([\s\S]*?)<\/h1>/gi, '\n# $1\n')
    .replace(/<h2[^>]*>([\s\S]*?)<\/h2>/gi, '\n## $1\n')
    .replace(/<h3[^>]*>([\s\S]*?)<\/h3>/gi, '\n### $1\n')
    .replace(/<h4[^>]*>([\s\S]*?)<\/h4>/gi, '\n#### $1\n')
    // Convert paragraphs
    .replace(/<p[^>]*>([\s\S]*?)<\/p>/gi, '\n$1\n')
    // Convert links
    .replace(/<a[^>]*href="([^"]*)"[^>]*>([\s\S]*?)<\/a>/gi, '[$2]($1)')
    // Convert bold/strong
    .replace(/<(?:strong|b)[^>]*>([\s\S]*?)<\/(?:strong|b)>/gi, '**$1**')
    // Convert italic/em
    .replace(/<(?:em|i)[^>]*>([\s\S]*?)<\/(?:em|i)>/gi, '*$1*')
    // Convert lists
    .replace(/<li[^>]*>([\s\S]*?)<\/li>/gi, '- $1\n')
    .replace(/<\/?(?:ul|ol)[^>]*>/gi, '\n')
    // Convert blockquotes
    .replace(/<blockquote[^>]*>([\s\S]*?)<\/blockquote>/gi, '\n> $1\n')
    // Convert images
    .replace(/<img[^>]*src="([^"]*)"[^>]*alt="([^"]*)"[^>]*\/?>/gi, '![$2]($1)')
    .replace(/<img[^>]*src="([^"]*)"[^>]*\/?>/gi, '![]($1)')
    // Convert line breaks
    .replace(/<br\s*\/?>/gi, '\n')
    // Remove remaining HTML tags
    .replace(/<[^>]+>/g, '')
    // Decode HTML entities
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&mdash;/g, '—')
    .replace(/&ndash;/g, '–')
    .replace(/&euro;/g, '€')
    .replace(/&copy;/g, '©')
    // Clean up whitespace
    .replace(/\n{3,}/g, '\n\n')
    .trim();

  // Remove newsletter/footer sections
  const footerPatterns = [
    /Stay Informed[\s\S]*$/i,
    /Sign-up to receive[\s\S]*$/i,
    /Subscribe to[\s\S]*newsletter[\s\S]*$/i,
    /Join our newsletter[\s\S]*$/i,
    /Get the latest[\s\S]*inbox[\s\S]*$/i,
    /\n">[\s\S]*$/,  // Malformed HTML remnants
    /\n\s*Homeowners\s*Solar Owners[\s\S]*$/i, // Footer navigation
  ];

  for (const pattern of footerPatterns) {
    text = text.replace(pattern, '').trim();
  }

  // Remove duplicate title at the start (often appears twice)
  const lines = text.split('\n');
  if (lines.length > 2 && lines[0].startsWith('#') && lines[2].startsWith('#')) {
    if (lines[0].replace(/^#+\s*/, '').trim() === lines[2].replace(/^#+\s*/, '').trim()) {
      lines.splice(0, 1);
    }
  }
  text = lines.join('\n');

  // Remove author name if it appears standalone at the start
  if (author && author !== 'Sourceful Team') {
    const authorLineRegex = new RegExp(`^\\n*${author}\\s*\\n`, 'i');
    text = text.replace(authorLineRegex, '\n');
  }

  // Clean up any remaining artifacts
  text = text
    .replace(/\n\s*\n\s*\n/g, '\n\n')
    .replace(/^\s+|\s+$/g, '')
    .trim();

  return text;
}

/**
 * Generate MDX frontmatter and content
 */
function generateMdx(article) {
  // Escape quotes in strings for YAML
  const escapeYaml = (str) => {
    if (!str) return '""';
    if (str.includes('"') || str.includes(':') || str.includes('\n') || str.includes('#')) {
      return `"${str.replace(/"/g, '\\"')}"`;
    }
    return str;
  };

  const frontmatter = `---
title: ${escapeYaml(article.title)}
description: ${escapeYaml(article.description)}
author: ${article.author}
publishDate: ${article.publishDate}
category: ${article.category}
featuredImage: ${escapeYaml(article.featuredImage)}
slug: ${article.slug}
locale: ${article.locale}
---`;

  return `${frontmatter}

${article.content}
`;
}

/**
 * Discover all article slugs from the blog page
 */
async function discoverArticles() {
  console.log('Discovering articles from blog page...');

  const slugs = new Set(ARTICLE_SLUGS);

  // Fetch the main blog page
  const html = await fetchPage(`${BASE_URL}/blog`);
  if (html) {
    const matches = html.matchAll(/href="\/blog\/([^"\/]+)"/g);
    for (const match of matches) {
      const slug = decodeURIComponent(match[1]);
      if (slug && !slug.startsWith('?') && !slug.startsWith('#')) {
        slugs.add(slug);
      }
    }
  }

  // Also check Swedish blog page
  const htmlSv = await fetchPage(`${BASE_URL}/sv/blog`);
  if (htmlSv) {
    const matches = htmlSv.matchAll(/href="\/sv\/blog\/([^"\/]+)"/g);
    for (const match of matches) {
      const slug = decodeURIComponent(match[1]);
      if (slug && !slug.startsWith('?') && !slug.startsWith('#')) {
        slugs.add(slug);
      }
    }
  }

  console.log(`Found ${slugs.size} unique article slugs`);
  return Array.from(slugs);
}

/**
 * Migrate a single article
 */
async function migrateArticle(slug, locale) {
  const url = locale === 'sv'
    ? `${BASE_URL}/sv/blog/${encodeURIComponent(slug)}`
    : `${BASE_URL}/blog/${encodeURIComponent(slug)}`;

  console.log(`  Fetching ${locale}: ${slug}`);

  const html = await fetchPage(url);
  if (!html) {
    console.log(`    ⚠ Failed to fetch ${locale} version`);
    return null;
  }

  const article = extractArticleData(html, slug, locale);
  const mdx = generateMdx(article);

  // Create safe filename
  const safeSlug = slug
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');

  const outputPath = join(OUTPUT_DIR, locale, `${safeSlug}.mdx`);

  // Ensure directory exists
  const dir = join(OUTPUT_DIR, locale);
  if (!existsSync(dir)) {
    mkdirSync(dir, { recursive: true });
  }

  writeFileSync(outputPath, mdx, 'utf-8');
  console.log(`    ✓ Saved ${outputPath} (${article.author}, ${article.publishDate})`);

  return article;
}

/**
 * Main migration function
 */
async function migrate() {
  console.log('='.repeat(60));
  console.log('Blog Migration Script v2');
  console.log('='.repeat(60));
  console.log();

  // Discover all articles
  const slugs = await discoverArticles();

  console.log();
  console.log(`Migrating ${slugs.length} articles (EN + SV versions)...`);
  console.log();

  const results = {
    success: { en: 0, sv: 0 },
    failed: { en: 0, sv: 0 },
    articles: [],
  };

  for (let i = 0; i < slugs.length; i++) {
    const slug = slugs[i];
    console.log(`[${i + 1}/${slugs.length}] ${slug}`);

    // Migrate English version
    const enArticle = await migrateArticle(slug, 'en');
    if (enArticle) {
      results.success.en++;
      results.articles.push(enArticle);
    } else {
      results.failed.en++;
    }

    // Migrate Swedish version
    const svArticle = await migrateArticle(slug, 'sv');
    if (svArticle) {
      results.success.sv++;
    } else {
      results.failed.sv++;
    }

    // Small delay to be polite to the server
    await new Promise(resolve => setTimeout(resolve, 300));
  }

  console.log();
  console.log('='.repeat(60));
  console.log('Migration Complete');
  console.log('='.repeat(60));
  console.log(`English: ${results.success.en} success, ${results.failed.en} failed`);
  console.log(`Swedish: ${results.success.sv} success, ${results.failed.sv} failed`);
  console.log();

  // Generate index file with all articles metadata
  const indexData = results.articles.map(a => ({
    slug: a.slug,
    title: a.title,
    description: a.description,
    author: a.author,
    publishDate: a.publishDate,
    category: a.category,
    featuredImage: a.featuredImage,
  }));

  // Sort by date descending
  indexData.sort((a, b) => new Date(b.publishDate) - new Date(a.publishDate));

  writeFileSync(
    join(OUTPUT_DIR, 'index.json'),
    JSON.stringify(indexData, null, 2),
    'utf-8'
  );
  console.log(`Generated ${OUTPUT_DIR}/index.json with ${indexData.length} articles`);

  // Print author summary
  const authorCounts = {};
  for (const article of results.articles) {
    authorCounts[article.author] = (authorCounts[article.author] || 0) + 1;
  }
  console.log();
  console.log('Author breakdown:');
  for (const [author, count] of Object.entries(authorCounts)) {
    console.log(`  ${author}: ${count} articles`);
  }
}

// Run migration
migrate().catch(console.error);
