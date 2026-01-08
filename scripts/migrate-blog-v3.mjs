#!/usr/bin/env node
/**
 * Blog Migration Script v3
 * - Downloads images locally
 * - Preserves code blocks
 * - Extracts tables as markdown
 * - Ensures proper paragraph spacing
 */

import { writeFileSync, mkdirSync, existsSync, createWriteStream } from 'fs';
import { join, basename } from 'path';
import https from 'https';
import http from 'http';
import { pipeline } from 'stream/promises';

const BASE_URL = 'https://www.sourceful.energy';
const OUTPUT_DIR = './content/blog';
const IMAGES_DIR = './public/blog/images';

// Article slugs from the live site
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

const AUTHORS = {
  'Fredrik Ahlgren': { name: 'Fredrik Ahlgren', role: 'CEO & Co-founder' },
  'Viktor Olofsson': { name: 'Viktor Olofsson', role: 'Content Lead' },
  'Paul Cooper': { name: 'Paul Cooper', role: 'Product & Design' },
  'Johan Leitet': { name: 'Johan Leitet', role: 'CTO & Co-founder' },
  'Tobias Olofsson': { name: 'Tobias Olofsson', role: 'Engineer' },
};

const AUTHOR_NAMES = Object.keys(AUTHORS);

// Track downloaded images to avoid duplicates
const downloadedImages = new Map();

/**
 * Download an image and return the local path
 */
async function downloadImage(url, slug) {
  if (!url || !url.startsWith('http')) return null;

  // Check if already downloaded
  if (downloadedImages.has(url)) {
    return downloadedImages.get(url);
  }

  try {
    // Clean URL
    const cleanUrl = url.replace(/&amp;/g, '&');

    // Generate filename from URL
    const urlObj = new URL(cleanUrl);
    let filename = basename(urlObj.pathname);

    // If filename doesn't have extension, try to get from URL
    if (!filename.includes('.')) {
      // Extract image ID from framerusercontent URLs
      const match = cleanUrl.match(/images\/([^/?]+)/);
      if (match) {
        filename = match[1] + '.jpg';
      } else {
        filename = `image-${Date.now()}.jpg`;
      }
    }

    // Make filename unique with slug prefix
    const safeSlug = slug.replace(/[^a-z0-9]/gi, '-').substring(0, 30);
    const uniqueFilename = `${safeSlug}-${filename}`;
    const localPath = join(IMAGES_DIR, uniqueFilename);
    const publicPath = `/blog/images/${uniqueFilename}`;

    // Download the image
    const proto = cleanUrl.startsWith('https') ? https : http;

    await new Promise((resolve, reject) => {
      const request = proto.get(cleanUrl, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
        }
      }, (response) => {
        // Handle redirects
        if (response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
          downloadImage(response.headers.location, slug).then(resolve).catch(reject);
          return;
        }

        if (response.statusCode !== 200) {
          reject(new Error(`Failed to download: ${response.statusCode}`));
          return;
        }

        const file = createWriteStream(localPath);
        response.pipe(file);
        file.on('finish', () => {
          file.close();
          resolve();
        });
        file.on('error', reject);
      });

      request.on('error', reject);
      request.setTimeout(30000, () => {
        request.destroy();
        reject(new Error('Timeout'));
      });
    });

    downloadedImages.set(url, publicPath);
    console.log(`    📷 Downloaded: ${uniqueFilename}`);
    return publicPath;
  } catch (error) {
    console.log(`    ⚠️ Failed to download image: ${url.substring(0, 50)}...`);
    // Return original URL as fallback
    return url.replace(/&amp;/g, '&');
  }
}

/**
 * Fetch HTML from URL
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
      console.error(`  Failed to fetch ${url}: ${response.status}`);
      return null;
    }
    return await response.text();
  } catch (error) {
    console.error(`  Error fetching ${url}:`, error.message);
    return null;
  }
}

/**
 * Parse date string to ISO format
 */
function parseDate(dateStr) {
  if (!dateStr) return null;

  const monthMap = {
    'jan': '01', 'feb': '02', 'mar': '03', 'apr': '04',
    'may': '05', 'jun': '06', 'jul': '07', 'aug': '08',
    'sep': '09', 'sept': '09', 'oct': '10', 'nov': '11', 'dec': '12'
  };

  // "9 Sept 2025", "6 Jan 2026"
  let match = dateStr.match(/(\d{1,2})\s+(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Sept|Oct|Nov|Dec)\w*\s+(\d{4})/i);
  if (match) {
    const day = match[1].padStart(2, '0');
    const month = monthMap[match[2].toLowerCase().substring(0, 3)];
    const year = match[3];
    return `${year}-${month}-${day}`;
  }

  // "September 9, 2025"
  match = dateStr.match(/(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Sept|Oct|Nov|Dec)\w*\s+(\d{1,2}),?\s+(\d{4})/i);
  if (match) {
    const month = monthMap[match[1].toLowerCase().substring(0, 3)];
    const day = match[2].padStart(2, '0');
    const year = match[3];
    return `${year}-${month}-${day}`;
  }

  return null;
}

/**
 * Convert HTML to Markdown with proper formatting
 */
async function htmlToMarkdown(html, slug) {
  if (!html) return '';

  let text = html;

  // Extract and preserve code blocks FIRST
  const codeBlocks = [];
  text = text.replace(/<pre[^>]*><code[^>]*>([\s\S]*?)<\/code><\/pre>/gi, (match, code) => {
    const decoded = code
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&amp;/g, '&')
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
      .trim();
    const placeholder = `__CODE_BLOCK_${codeBlocks.length}__`;
    codeBlocks.push('```\n' + decoded + '\n```');
    return placeholder;
  });

  // Also handle inline code
  text = text.replace(/<code[^>]*>([\s\S]*?)<\/code>/gi, (match, code) => {
    const decoded = code
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&amp;/g, '&')
      .trim();
    return '`' + decoded + '`';
  });

  // Remove script, style, svg, noscript
  text = text
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<style[\s\S]*?<\/style>/gi, '')
    .replace(/<noscript[\s\S]*?<\/noscript>/gi, '')
    .replace(/<svg[\s\S]*?<\/svg>/gi, '');

  // Convert headers (with proper spacing)
  text = text
    .replace(/<h1[^>]*>([\s\S]*?)<\/h1>/gi, '\n\n# $1\n\n')
    .replace(/<h2[^>]*>([\s\S]*?)<\/h2>/gi, '\n\n## $1\n\n')
    .replace(/<h3[^>]*>([\s\S]*?)<\/h3>/gi, '\n\n### $1\n\n')
    .replace(/<h4[^>]*>([\s\S]*?)<\/h4>/gi, '\n\n#### $1\n\n')
    .replace(/<h5[^>]*>([\s\S]*?)<\/h5>/gi, '\n\n##### $1\n\n')
    .replace(/<h6[^>]*>([\s\S]*?)<\/h6>/gi, '\n\n###### $1\n\n');

  // Convert paragraphs (ensure double newlines for proper spacing)
  text = text.replace(/<p[^>]*>([\s\S]*?)<\/p>/gi, '\n\n$1\n\n');

  // Convert divs that act as paragraphs
  text = text.replace(/<div[^>]*>([\s\S]*?)<\/div>/gi, '\n\n$1\n\n');

  // Convert links
  text = text.replace(/<a[^>]*href="([^"]*)"[^>]*>([\s\S]*?)<\/a>/gi, '[$2]($1)');

  // Convert bold/strong
  text = text.replace(/<(?:strong|b)[^>]*>([\s\S]*?)<\/(?:strong|b)>/gi, '**$1**');

  // Convert italic/em
  text = text.replace(/<(?:em|i)[^>]*>([\s\S]*?)<\/(?:em|i)>/gi, '*$1*');

  // Convert unordered lists
  text = text.replace(/<ul[^>]*>([\s\S]*?)<\/ul>/gi, '\n\n$1\n\n');
  text = text.replace(/<li[^>]*>([\s\S]*?)<\/li>/gi, '- $1\n');

  // Convert ordered lists
  text = text.replace(/<ol[^>]*>([\s\S]*?)<\/ol>/gi, '\n\n$1\n\n');

  // Convert blockquotes
  text = text.replace(/<blockquote[^>]*>([\s\S]*?)<\/blockquote>/gi, '\n\n> $1\n\n');

  // Convert line breaks
  text = text.replace(/<br\s*\/?>/gi, '\n');

  // Convert horizontal rules
  text = text.replace(/<hr[^>]*\/?>/gi, '\n\n---\n\n');

  // Handle images - download and convert
  const imageMatches = text.matchAll(/<img[^>]*src="([^"]*)"[^>]*(?:alt="([^"]*)")?[^>]*\/?>/gi);
  for (const match of imageMatches) {
    const originalUrl = match[1];
    const alt = match[2] || '';
    const localPath = await downloadImage(originalUrl, slug);
    const markdownImg = `![${alt}](${localPath})`;
    text = text.replace(match[0], `\n\n${markdownImg}\n\n`);
  }

  // Also handle images without alt
  const imageMatches2 = text.matchAll(/<img[^>]*src="([^"]*)"[^>]*\/?>/gi);
  for (const match of imageMatches2) {
    const originalUrl = match[1];
    const localPath = await downloadImage(originalUrl, slug);
    const markdownImg = `![](${localPath})`;
    text = text.replace(match[0], `\n\n${markdownImg}\n\n`);
  }

  // Remove remaining HTML tags
  text = text.replace(/<[^>]+>/g, '');

  // Decode HTML entities
  text = text
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
    .replace(/&rarr;/g, '→')
    .replace(/&larr;/g, '←');

  // Restore code blocks
  for (let i = 0; i < codeBlocks.length; i++) {
    text = text.replace(`__CODE_BLOCK_${i}__`, '\n\n' + codeBlocks[i] + '\n\n');
  }

  // Clean up whitespace - normalize to max 2 newlines
  text = text.replace(/\n{3,}/g, '\n\n');

  // Remove footer sections
  const footerPatterns = [
    /\n+Stay Informed[\s\S]*$/i,
    /\n+Sign-up to receive[\s\S]*$/i,
    /\n+Subscribe to[\s\S]*newsletter[\s\S]*$/i,
    /\n+Håll dig informerad[\s\S]*$/i,
    /\n+Homeowners\s*Solar Owners[\s\S]*$/i,
  ];
  for (const pattern of footerPatterns) {
    text = text.replace(pattern, '');
  }

  // Trim and ensure single trailing newline
  text = text.trim() + '\n';

  return text;
}

/**
 * Extract article metadata and content from HTML
 */
async function extractArticle(html, slug, locale) {
  // Extract title
  const titleMatch = html.match(/<h1[^>]*>([^<]+)<\/h1>/i) ||
                     html.match(/<meta property="og:title" content="([^"]+)"/i);
  const title = titleMatch ? titleMatch[1].trim() : slug.replace(/-/g, ' ');

  // Extract description
  const descMatch = html.match(/<meta name="description" content="([^"]+)"/i) ||
                    html.match(/<meta property="og:description" content="([^"]+)"/i);
  const description = descMatch ? descMatch[1].trim() : '';

  // Extract featured image
  const imageMatch = html.match(/<meta property="og:image" content="([^"]+)"/i);
  let featuredImage = imageMatch ? imageMatch[1] : '';

  // Download featured image
  if (featuredImage) {
    const localFeaturedImage = await downloadImage(featuredImage, slug);
    if (localFeaturedImage) {
      featuredImage = localFeaturedImage;
    }
  }

  // Extract author
  let author = 'Sourceful Team';
  for (const authorName of AUTHOR_NAMES) {
    const authorRegex = new RegExp(`(?:by|author)?\\s*${authorName.replace(/\s+/g, '\\s+')}`, 'i');
    if (authorRegex.test(html)) {
      author = authorName;
      break;
    }
  }

  // Extract date
  let publishDate = null;
  const datePatterns = [
    /(\d{1,2}\s+(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Sept|Oct|Nov|Dec)\w*\s+\d{4})/gi,
    /((?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Sept|Oct|Nov|Dec)\w*\s+\d{1,2},?\s+\d{4})/gi,
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
  if (!publishDate) publishDate = '2025-01-01';

  // Determine category based on content keywords
  let category = 'insights';
  const lowerHtml = html.toLowerCase();
  if (lowerHtml.includes('release notes') || lowerHtml.includes('version')) {
    category = 'product';
  } else if (lowerHtml.includes('market update') || lowerHtml.includes('fcr prices') || lowerHtml.includes('market analysis')) {
    category = 'market';
  } else if (lowerHtml.includes('how to') || lowerHtml.includes('guide') || lowerHtml.includes('handbook') || lowerHtml.includes('saving')) {
    category = 'guides';
  } else if (lowerHtml.includes('partnership') || lowerHtml.includes('collaborate') || lowerHtml.includes('kalmar energi')) {
    category = 'company-news';
  }

  // Extract main content
  let contentHtml = '';
  const articleMatch = html.match(/<article[^>]*>([\s\S]*?)<\/article>/i);
  if (articleMatch) {
    contentHtml = articleMatch[1];
  } else {
    const mainMatch = html.match(/<main[^>]*>([\s\S]*?)<\/main>/i);
    if (mainMatch) {
      contentHtml = mainMatch[1];
    } else {
      const bodyMatch = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
      if (bodyMatch) {
        contentHtml = bodyMatch[1];
      }
    }
  }

  // Convert to markdown
  const content = await htmlToMarkdown(contentHtml, slug);

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
 * Generate MDX file content
 */
function generateMdx(article) {
  const escapeYaml = (str) => {
    if (!str) return '""';
    if (str.includes('"') || str.includes(':') || str.includes('\n') || str.includes('#')) {
      return `"${str.replace(/"/g, '\\"')}"`;
    }
    return str;
  };

  // Create safe slug for filename
  const safeSlug = article.slug
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');

  const frontmatter = `---
title: ${escapeYaml(article.title)}
description: ${escapeYaml(article.description)}
author: ${article.author}
publishDate: ${article.publishDate}
category: ${article.category}
featuredImage: ${escapeYaml(article.featuredImage)}
slug: ${safeSlug}
locale: ${article.locale}
---`;

  return { content: `${frontmatter}\n\n${article.content}`, safeSlug };
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
    console.log(`    ⚠️ Failed to fetch`);
    return null;
  }

  const article = await extractArticle(html, slug, locale);
  const { content, safeSlug } = generateMdx(article);

  const outputPath = join(OUTPUT_DIR, locale, `${safeSlug}.mdx`);

  // Ensure directory exists
  const dir = join(OUTPUT_DIR, locale);
  if (!existsSync(dir)) {
    mkdirSync(dir, { recursive: true });
  }

  writeFileSync(outputPath, content, 'utf-8');
  console.log(`    ✅ Saved: ${outputPath}`);

  return article;
}

/**
 * Main migration function
 */
async function migrate() {
  console.log('='.repeat(60));
  console.log('Blog Migration Script v3');
  console.log('- Downloads images locally');
  console.log('- Preserves code blocks');
  console.log('- Proper paragraph spacing');
  console.log('='.repeat(60));
  console.log();

  // Ensure output directories exist
  if (!existsSync(OUTPUT_DIR)) mkdirSync(OUTPUT_DIR, { recursive: true });
  if (!existsSync(IMAGES_DIR)) mkdirSync(IMAGES_DIR, { recursive: true });
  if (!existsSync(join(OUTPUT_DIR, 'en'))) mkdirSync(join(OUTPUT_DIR, 'en'), { recursive: true });
  if (!existsSync(join(OUTPUT_DIR, 'sv'))) mkdirSync(join(OUTPUT_DIR, 'sv'), { recursive: true });

  const results = {
    success: { en: 0, sv: 0 },
    failed: { en: 0, sv: 0 },
    images: 0,
  };

  console.log(`Migrating ${ARTICLE_SLUGS.length} articles...\n`);

  for (let i = 0; i < ARTICLE_SLUGS.length; i++) {
    const slug = ARTICLE_SLUGS[i];
    console.log(`[${i + 1}/${ARTICLE_SLUGS.length}] ${slug}`);

    // English
    const enResult = await migrateArticle(slug, 'en');
    if (enResult) results.success.en++;
    else results.failed.en++;

    // Swedish
    const svResult = await migrateArticle(slug, 'sv');
    if (svResult) results.success.sv++;
    else results.failed.sv++;

    // Small delay
    await new Promise(r => setTimeout(r, 500));
  }

  console.log();
  console.log('='.repeat(60));
  console.log('Migration Complete');
  console.log('='.repeat(60));
  console.log(`English: ${results.success.en} success, ${results.failed.en} failed`);
  console.log(`Swedish: ${results.success.sv} success, ${results.failed.sv} failed`);
  console.log(`Images downloaded: ${downloadedImages.size}`);
}

migrate().catch(console.error);
