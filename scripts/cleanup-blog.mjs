#!/usr/bin/env node
/**
 * Blog Content Cleanup Script
 * Cleans up remaining artifacts in migrated MDX files
 */

import { readFileSync, writeFileSync, readdirSync } from 'fs';
import { join } from 'path';

const BLOG_DIR = './content/blog';

// Known heading patterns that should be ### headings
const headingPatterns = [
  'What We Actually Built',
  "What's New",
  'Coming Soon',
  'What are Sites',
  'The Point',
  'The Inverted Opportunity',
  'Our ambition',
  'Vår ambition',
  'Varför detta nu',
  'Vad innebär det för dig',
  'Från energi till effekt',
];

// Known definition-list patterns that should be **bold**
const definitionPatterns = [
  'Primary Response',
  'Secondary Response',
  'Tertiary Response',
  'Variability',
  'Inverter Mediation',
  'Geographical Distribution',
  'Bi-directional Flows',
  'Ramping Requirements',
  'Inertia Reduction',
  'Market Design Misalignment',
  'Control System Complexity',
  'Redesigned Navigation',
  'Improved Data Views',
  'Delegated Wallet Login',
  'Tweaks & Fixes',
  'Open-Source Security',
  'Real-Time Data Processing',
  'Scalable Distribution Model',
  'Immediate Impact',
  'Future Vision',
  'Hydropower Management Decisions',
  'Growth in Battery Storage',
  'Savings Vary by Customer and Provider',
];

function cleanupContent(content, frontmatter) {
  let text = content;

  // Remove date at the start (e.g., "9 Sept 2025")
  text = text.replace(/^\s*\d{1,2}\s+(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Sept|Oct|Nov|Dec)\w*\s+\d{4}\s*\n/i, '');

  // Remove author name if it appears at the start after the title
  if (frontmatter.author && frontmatter.author !== 'Sourceful Team') {
    const authorRegex = new RegExp(`^(#[^\n]+\n+)${frontmatter.author}\\s*\n`, 'i');
    text = text.replace(authorRegex, '$1');
    // Also try without title
    const authorOnlyRegex = new RegExp(`^\\s*${frontmatter.author}\\s*\n`, 'i');
    text = text.replace(authorOnlyRegex, '');
  }

  // Fix list formatting (- \n**text** -> - **text**)
  text = text.replace(/- \s*\n\*\*/g, '- **');
  text = text.replace(/- \s*\n([A-Z])/g, '- $1');

  // Remove duplicate images that match the featured image
  if (frontmatter.featuredImage) {
    const imageUrl = frontmatter.featuredImage.replace(/&amp;/g, '&').replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    // Remove the featured image if it appears right after the title
    const dupImageRegex = new RegExp(`(#[^\n]+\n+)!\\[\\]\\(${imageUrl.replace(/\\\\/g, '\\')}[^)]*\\)\n*`, 'i');
    text = text.replace(dupImageRegex, '$1');
  }

  // Convert known heading patterns to ### headings
  for (const pattern of headingPatterns) {
    const escapedPattern = pattern.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`^(${escapedPattern})$`, 'gm');
    text = text.replace(regex, '### $1');
  }

  // Convert known definition patterns to **bold**
  for (const pattern of definitionPatterns) {
    const escapedPattern = pattern.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`^(${escapedPattern})$`, 'gm');
    text = text.replace(regex, '**$1**');
  }

  // Fix unclosed bold markers: **Text at start of line without closing **
  // Pattern: line starts with **, contains text without *, and ends without ** before newline
  text = text.replace(/^(\*\*)([^*\n]+)$/gm, '$1$2**');

  // Add line break after paragraphs that end without one before next paragraph
  // Match: text ending with period/colon/etc, no blank line, then new paragraph starting with capital
  text = text.replace(/([.!?:"])\n([A-Z])/g, '$1\n\n$2');

  // Add line break after bold definitions before their explanation
  text = text.replace(/(\*\*[^*]+\*\*)\n([A-Z])/g, '$1\n\n$2');

  // Remove orphaned asterisks on their own line
  text = text.replace(/^\*$/gm, '');

  // Remove "Håll dig informerad" footer sections (Swedish newsletter signup)
  text = text.replace(/\n*Håll dig informerad\n+Anmäl dig för att ta emot insikter.*$/s, '');

  // Clean up multiple consecutive newlines
  text = text.replace(/\n{4,}/g, '\n\n\n');

  // Remove trailing whitespace from lines
  text = text.split('\n').map(line => line.trimEnd()).join('\n');

  // Ensure content ends with single newline
  text = text.trim() + '\n';

  return text;
}

function parseFrontmatter(fileContent) {
  const match = fileContent.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) return { frontmatter: {}, content: fileContent };

  const frontmatterStr = match[1];
  const content = match[2];

  const frontmatter = {};
  for (const line of frontmatterStr.split('\n')) {
    const colonIndex = line.indexOf(':');
    if (colonIndex > 0) {
      const key = line.slice(0, colonIndex).trim();
      let value = line.slice(colonIndex + 1).trim();
      if ((value.startsWith('"') && value.endsWith('"')) ||
          (value.startsWith("'") && value.endsWith("'"))) {
        value = value.slice(1, -1);
      }
      frontmatter[key] = value;
    }
  }

  return { frontmatter, content, frontmatterStr };
}

async function cleanup() {
  console.log('Cleaning up blog content...\n');

  let cleaned = 0;

  for (const locale of ['en', 'sv']) {
    const dir = join(BLOG_DIR, locale);
    const files = readdirSync(dir).filter(f => f.endsWith('.mdx'));

    for (const file of files) {
      const filePath = join(dir, file);
      const fileContent = readFileSync(filePath, 'utf-8');
      const { frontmatter, content, frontmatterStr } = parseFrontmatter(fileContent);

      const cleanedContent = cleanupContent(content, frontmatter);

      if (cleanedContent !== content) {
        const newFileContent = `---\n${frontmatterStr}\n---\n\n${cleanedContent}`;
        writeFileSync(filePath, newFileContent, 'utf-8');
        console.log(`✓ Cleaned ${locale}/${file}`);
        cleaned++;
      }
    }
  }

  console.log(`\nDone! Cleaned ${cleaned} files.`);
}

cleanup().catch(console.error);
