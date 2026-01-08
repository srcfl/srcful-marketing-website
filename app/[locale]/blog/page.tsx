import type { Metadata } from "next";
import { getAllPosts, CATEGORY_LABELS, AUTHORS, type BlogPostMeta } from "@/lib/blog";
import { BlogContent } from "./blog-content";

export const metadata: Metadata = {
  title: "Blog",
  description: "Insights, news, and updates from Sourceful Energy. Learn about the energy transition, grid services, V2X, and smart energy management.",
};

interface BlogPageProps {
  params: Promise<{ locale: string }>;
}

export default async function BlogPage({ params }: BlogPageProps) {
  const { locale } = await params;
  const posts = getAllPosts(locale);

  return <BlogContent posts={posts} categoryLabels={CATEGORY_LABELS} authors={AUTHORS} />;
}
