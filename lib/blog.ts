import { readFileSync, readdirSync, existsSync } from 'fs';
import { join } from 'path';

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  author: string;
  publishDate: string;
  category: string;
  featuredImage: string;
  locale: string;
  content: string;
}

export interface BlogPostMeta {
  slug: string;
  title: string;
  description: string;
  author: string;
  publishDate: string;
  category: string;
  featuredImage: string;
}

const BLOG_DIR = join(process.cwd(), 'content/blog');

/**
 * Parse MDX frontmatter
 */
function parseFrontmatter(content: string): { frontmatter: Record<string, string>; body: string } {
  const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/;
  const match = content.match(frontmatterRegex);

  if (!match) {
    return { frontmatter: {}, body: content };
  }

  const frontmatterStr = match[1];
  const body = match[2];

  const frontmatter: Record<string, string> = {};
  const lines = frontmatterStr.split('\n');

  for (const line of lines) {
    const colonIndex = line.indexOf(':');
    if (colonIndex > 0) {
      const key = line.slice(0, colonIndex).trim();
      let value = line.slice(colonIndex + 1).trim();
      // Remove quotes if present
      if ((value.startsWith('"') && value.endsWith('"')) ||
          (value.startsWith("'") && value.endsWith("'"))) {
        value = value.slice(1, -1);
      }
      frontmatter[key] = value;
    }
  }

  return { frontmatter, body };
}

/**
 * Get all blog posts for a locale
 */
export function getAllPosts(locale: string = 'en'): BlogPostMeta[] {
  const dir = join(BLOG_DIR, locale);

  if (!existsSync(dir)) {
    return [];
  }

  const files = readdirSync(dir).filter(f => f.endsWith('.mdx'));

  const posts: BlogPostMeta[] = files.map(filename => {
    const filePath = join(dir, filename);
    const content = readFileSync(filePath, 'utf-8');
    const { frontmatter } = parseFrontmatter(content);

    return {
      slug: frontmatter.slug || filename.replace('.mdx', ''),
      title: frontmatter.title || '',
      description: frontmatter.description || '',
      author: frontmatter.author || 'Sourceful Team',
      publishDate: frontmatter.publishDate || '',
      category: frontmatter.category || 'latest',
      featuredImage: frontmatter.featuredImage || '',
    };
  });

  // Sort by date, newest first
  return posts.sort((a, b) =>
    new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime()
  );
}

/**
 * Get a single blog post by slug
 */
export function getPostBySlug(slug: string, locale: string = 'en'): BlogPost | null {
  const dir = join(BLOG_DIR, locale);

  if (!existsSync(dir)) {
    return null;
  }

  // Try to find the file with matching slug
  const files = readdirSync(dir).filter(f => f.endsWith('.mdx'));

  for (const filename of files) {
    const filePath = join(dir, filename);
    const content = readFileSync(filePath, 'utf-8');
    const { frontmatter, body } = parseFrontmatter(content);

    const fileSlug = frontmatter.slug || filename.replace('.mdx', '');

    // Match by slug or filename (normalized)
    if (fileSlug === slug || filename.replace('.mdx', '') === slug) {
      return {
        slug: fileSlug,
        title: frontmatter.title || '',
        description: frontmatter.description || '',
        author: frontmatter.author || 'Sourceful Team',
        publishDate: frontmatter.publishDate || '',
        category: frontmatter.category || 'latest',
        featuredImage: frontmatter.featuredImage || '',
        locale: frontmatter.locale || locale,
        content: body,
      };
    }
  }

  return null;
}

/**
 * Get all unique categories
 */
export function getAllCategories(locale: string = 'en'): string[] {
  const posts = getAllPosts(locale);
  const categories = new Set(posts.map(p => p.category));
  return Array.from(categories);
}

/**
 * Get posts by category
 */
export function getPostsByCategory(category: string, locale: string = 'en'): BlogPostMeta[] {
  return getAllPosts(locale).filter(p => p.category === category);
}

/**
 * Get all post slugs for static generation
 */
export function getAllPostSlugs(locale: string = 'en'): string[] {
  const dir = join(BLOG_DIR, locale);

  if (!existsSync(dir)) {
    return [];
  }

  return readdirSync(dir)
    .filter(f => f.endsWith('.mdx'))
    .map(f => f.replace('.mdx', ''));
}

/**
 * Category display names
 */
export const CATEGORY_LABELS: Record<string, string> = {
  'latest': 'Latest Stories',
  'company-news': 'Company News',
  'insights': 'Insights & Thought Leadership',
  'product': 'Product Updates',
  'market': 'Market Analysis',
  'guides': 'Guides & Tutorials',
};

/**
 * Author data
 */
export const AUTHORS: Record<string, { name: string; role: string; avatar: string }> = {
  'Fredrik Ahlgren': {
    name: 'Fredrik Ahlgren',
    role: 'CEO & Co-founder',
    avatar: '/images/team/fredrik.jpg'
  },
  'Viktor Olofsson': {
    name: 'Viktor Olofsson',
    role: 'Content Lead',
    avatar: '/images/team/viktor.jpg'
  },
  'Paul Cooper': {
    name: 'Paul Cooper',
    role: 'Product & Design',
    avatar: '/images/team/paul.jpg'
  },
  'Johan Leitet': {
    name: 'Johan Leitet',
    role: 'CTO & Co-founder',
    avatar: '/images/team/johan.jpg'
  },
  'Sourceful Team': {
    name: 'Sourceful Team',
    role: 'Sourceful Energy',
    avatar: '/images/sourceful-icon.svg'
  },
};
