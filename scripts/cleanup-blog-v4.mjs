#!/usr/bin/env node
/**
 * Blog Content Cleanup Script v4
 * Comprehensive cleanup for remaining formatting issues
 */

import { readFileSync, writeFileSync, readdirSync } from 'fs';
import { join } from 'path';

const BLOG_DIR = './content/blog';

function parseFrontmatter(fileContent) {
  const match = fileContent.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) return { frontmatter: {}, content: fileContent, frontmatterStr: '' };

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

function cleanupContent(content, frontmatter, filename) {
  let text = content;
  const changes = [];

  // 1. Remove duplicate H1 that matches frontmatter title
  if (frontmatter.title) {
    const titleRegex = new RegExp(`^# ${frontmatter.title.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\s*$`, 'gm');
    if (titleRegex.test(text)) {
      text = text.replace(titleRegex, '');
      changes.push('Removed duplicate H1 title');
    }
  }

  // 2. Remove date lines at start of content (e.g., "5 dec. 2025", "6 Jan 2026")
  const dateLineRegex = /^\s*\d{1,2}\s+(?:jan|feb|mar|apr|maj|jun|jul|aug|sep|sept|okt|nov|dec)\.?\s+\d{4}\s*\n+/gi;
  if (dateLineRegex.test(text)) {
    text = text.replace(dateLineRegex, '');
    changes.push('Removed date line');
  }

  // 3. Convert h6 table headers to proper markdown tables
  // Pattern: ###### Header1 \n ###### Header2 \n data1 \n data2 \n data3 \n data4...
  const tablePattern = /^###### ([^\n]+)\n+###### ([^\n]+)\n+((?:(?!#)[^\n]+\n+)+)/gm;
  text = text.replace(tablePattern, (match, header1, header2, dataBlock) => {
    const lines = dataBlock.trim().split('\n').filter(l => l.trim());

    // Check if lines alternate (col1, col2, col1, col2...)
    // Time patterns like "00:00 - 04:00" vs price patterns like "0.054 - 0.060"
    const rows = [];
    for (let i = 0; i < lines.length; i += 2) {
      if (lines[i + 1]) {
        rows.push(`| ${lines[i].trim()} | ${lines[i + 1].trim()} |`);
      } else {
        // Last row might span both columns (like "Daily average: ...")
        rows.push(`| ${lines[i].trim()} | |`);
      }
    }

    if (rows.length > 0) {
      changes.push('Converted h6 headers to markdown table');
      return `| ${header1.trim()} | ${header2.trim()} |\n|---|---|\n${rows.join('\n')}\n\n`;
    }
    return match;
  });

  // 4. Fix list items with title pattern: "- Title text**Description"
  // Should become: "- **Title text**\n\n  Description"
  const listTitlePattern = /^- ([^*\n]+)\*\*([A-Z][^\n]*)/gm;
  let listMatches = 0;
  text = text.replace(listTitlePattern, (match, title, description) => {
    listMatches++;
    // Check if description ends with ** (meaning the whole thing was meant to be bold)
    const cleanDesc = description.replace(/\*\*$/, '');
    return `- **${title.trim()}**\n\n  ${cleanDesc}`;
  });
  if (listMatches > 0) {
    changes.push(`Fixed ${listMatches} list items with title pattern`);
  }

  // 5. Fix double bold markers (****) - usually a heading running into paragraph
  // Pattern: "Heading Text****Paragraph text" -> "**Heading Text**\n\nParagraph text"
  const doubleBoldPattern = /([^*\n]+)\*\*\*\*([A-Z][^*]+)/g;
  if (doubleBoldPattern.test(text)) {
    text = text.replace(doubleBoldPattern, (match, heading, paragraph) => {
      changes.push('Fixed double bold marker');
      return `**${heading.trim()}**\n\n${paragraph}`;
    });
  }

  // 6. Fix "text.**Next" pattern (sentence ending in bold followed by new sentence)
  // e.g., "lasts.**For example:" -> "lasts.**\n\n**For example:"
  text = text.replace(/(\.\*\*)([A-Z])/g, (match, ending, nextChar) => {
    changes.push('Added line break after bold sentence ending');
    return `${ending}\n\n${nextChar}`;
  });

  // 7. Fix spec lines running together
  // Pattern: "**Label:** value**NextLabel:**" -> "**Label:** value\n\n**NextLabel:**"
  text = text.replace(/(\*\*[^:]+:\*\*[^*\n]+)(\*\*[^:]+:\*\*)/g, (match, first, second) => {
    changes.push('Added line break between spec items');
    return `${first}\n\n${second}`;
  });

  // 8. Remove orphaned ** at end of lines (incomplete bold)
  text = text.replace(/\*\*\s*$/gm, '');

  // 9. Remove orphaned ** at start of lines followed by nothing
  text = text.replace(/^\*\*\s*$/gm, '');

  // 10. Clean up multiple consecutive newlines (max 2)
  text = text.replace(/\n{4,}/g, '\n\n\n');

  // 11. Remove trailing whitespace from lines
  text = text.split('\n').map(line => line.trimEnd()).join('\n');

  // Ensure content ends with single newline
  text = text.trim() + '\n';

  return { text, changes };
}

async function cleanup() {
  console.log('Blog Cleanup Script v4\n');
  console.log('='.repeat(50));

  let totalCleaned = 0;
  const allChanges = [];

  for (const locale of ['en', 'sv']) {
    const dir = join(BLOG_DIR, locale);
    const files = readdirSync(dir).filter(f => f.endsWith('.mdx'));

    for (const file of files) {
      const filePath = join(dir, file);
      const fileContent = readFileSync(filePath, 'utf-8');
      const { frontmatter, content, frontmatterStr } = parseFrontmatter(fileContent);

      const { text: cleanedContent, changes } = cleanupContent(content, frontmatter, file);

      if (changes.length > 0) {
        const newFileContent = `---\n${frontmatterStr}\n---\n\n${cleanedContent}`;
        writeFileSync(filePath, newFileContent, 'utf-8');
        console.log(`\n✓ ${locale}/${file}`);
        changes.forEach(c => console.log(`  - ${c}`));
        totalCleaned++;
        allChanges.push({ file: `${locale}/${file}`, changes });
      }
    }
  }

  console.log('\n' + '='.repeat(50));
  console.log(`Done! Cleaned ${totalCleaned} files.`);
}

cleanup().catch(console.error);
