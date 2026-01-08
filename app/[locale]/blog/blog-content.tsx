"use client";

import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/src/i18n/routing";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MarketingNav } from "@/components/marketing-nav";
import { MarketingFooter } from "@/components/marketing-footer";
import { ArrowRight, BookOpen, Calendar, User } from "lucide-react";
import type { BlogPostMeta } from "@/lib/blog";

interface BlogCardProps {
  post: BlogPostMeta;
  featured?: boolean;
  authors: Record<string, { name: string; role: string; avatar?: string }>;
  categoryLabels: Record<string, string>;
  locale: string;
}

function BlogCard({ post, featured = false, authors, categoryLabels, locale }: BlogCardProps) {
  const author = authors[post.author] || authors["Sourceful Team"];
  const formattedDate = new Date(post.publishDate).toLocaleDateString(locale === "sv" ? "sv-SE" : "en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  if (featured) {
    return (
      <Card className="overflow-hidden group hover:shadow-lg transition-shadow">
        <Link href={`/blog/${post.slug}`} className="no-underline">
          <div className="grid md:grid-cols-2 gap-0">
            <div className="relative aspect-[16/10] md:aspect-auto md:h-full overflow-hidden bg-muted">
              {post.featuredImage ? (
                <Image
                  src={post.featuredImage.replace(/&amp;/g, "&")}
                  alt={post.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  unoptimized
                />
              ) : (
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/5" />
              )}
            </div>
            <div className="p-6 md:p-8 flex flex-col justify-center">
              <Badge variant="secondary" className="w-fit mb-4">
                {categoryLabels[post.category] || post.category}
              </Badge>
              <h2 className="text-2xl md:text-3xl font-bold mb-3 group-hover:text-primary transition-colors">
                {post.title}
              </h2>
              <p className="text-muted-foreground mb-4 line-clamp-3">
                {post.description}
              </p>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  {author.name}
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  {formattedDate}
                </div>
              </div>
            </div>
          </div>
        </Link>
      </Card>
    );
  }

  return (
    <Card className="overflow-hidden group hover:shadow-lg transition-shadow h-full flex flex-col">
      <Link href={`/blog/${post.slug}`} className="flex flex-col h-full no-underline">
        <div className="relative aspect-[16/9] overflow-hidden bg-muted">
          {post.featuredImage ? (
            <Image
              src={post.featuredImage.replace(/&amp;/g, "&")}
              alt={post.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              unoptimized
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/5" />
          )}
        </div>
        <CardHeader className="pb-2">
          <Badge variant="secondary" className="w-fit mb-2">
            {categoryLabels[post.category] || post.category}
          </Badge>
          <CardTitle className="text-xl group-hover:text-primary transition-colors line-clamp-2">
            {post.title}
          </CardTitle>
        </CardHeader>
        <CardContent className="flex-1 flex flex-col">
          <CardDescription className="line-clamp-2 mb-4 flex-1">
            {post.description}
          </CardDescription>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <User className="h-3 w-3" />
              {author.name}
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              {formattedDate}
            </div>
          </div>
        </CardContent>
      </Link>
    </Card>
  );
}

const CATEGORY_ORDER = ["all", "insights", "guides", "product", "market", "company-news"] as const;

interface BlogContentProps {
  posts: BlogPostMeta[];
  categoryLabels: Record<string, string>;
  authors: Record<string, { name: string; role: string; avatar?: string }>;
}

export function BlogContent({ posts, categoryLabels, authors }: BlogContentProps) {
  const t = useTranslations("blog");
  const locale = useLocale();
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  // Filter posts by category
  const filteredPosts = selectedCategory === "all"
    ? posts
    : posts.filter(post => post.category === selectedCategory);

  const featuredPost = filteredPosts[0];
  const remainingPosts = filteredPosts.slice(1);

  // Get category counts
  const categoryCounts = posts.reduce((acc, post) => {
    acc[post.category] = (acc[post.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="flex min-h-screen flex-col">
      <MarketingNav />

      <main className="flex-1 pt-16">
        {/* Hero */}
        <section className="relative overflow-hidden border-b">
          <div className="absolute inset-0 bg-dot-pattern" />
          <div className="relative max-w-7xl mx-auto py-24 md:py-32 px-4 md:px-8">
            <div className="max-w-3xl">
              <Badge variant="secondary" className="mb-6">
                <BookOpen className="h-3 w-3 mr-1" />
                {t("hero.badge")}
              </Badge>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
                {t("hero.title")}{" "}
                <span className="text-primary">{t("hero.titleHighlight")}</span>
              </h1>
              <p className="text-xl text-muted-foreground">
                {t("hero.description")}
              </p>
            </div>
          </div>
        </section>

        {/* Category Filters */}
        <section className="max-w-7xl mx-auto pt-8 px-4 md:px-8">
          <div className="flex flex-wrap gap-2">
            {CATEGORY_ORDER.map((category) => {
              const count = category === "all" ? posts.length : (categoryCounts[category] || 0);
              const label = category === "all" ? t("filters.all") : categoryLabels[category];

              if (category !== "all" && count === 0) return null;

              return (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className="gap-2"
                >
                  {label}
                  <span className={`text-xs px-1.5 py-0.5 rounded-full ${
                    selectedCategory === category
                      ? "bg-primary-foreground/20 text-primary-foreground"
                      : "bg-muted text-muted-foreground"
                  }`}>
                    {count}
                  </span>
                </Button>
              );
            })}
          </div>
        </section>

        {/* Featured Post */}
        {featuredPost && (
          <section className="max-w-7xl mx-auto py-12 px-4 md:px-8">
            <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wide mb-6">
              {selectedCategory === "all" ? t("featured") : categoryLabels[selectedCategory] || selectedCategory}
            </h2>
            <BlogCard post={featuredPost} featured authors={authors} categoryLabels={categoryLabels} locale={locale} />
          </section>
        )}

        {/* Remaining Posts Grid */}
        {remainingPosts.length > 0 && (
          <section className="max-w-7xl mx-auto py-12 px-4 md:px-8">
            <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wide mb-6">
              {selectedCategory === "all" ? `${t("allArticles")} (${remainingPosts.length})` : `${t("moreArticles")} ${categoryLabels[selectedCategory] || selectedCategory} (${remainingPosts.length})`}
            </h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {remainingPosts.map((post) => (
                <BlogCard key={post.slug} post={post} authors={authors} categoryLabels={categoryLabels} locale={locale} />
              ))}
            </div>
          </section>
        )}

        {/* Empty State */}
        {filteredPosts.length === 0 && (
          <section className="max-w-7xl mx-auto py-24 px-4 md:px-8 text-center">
            <p className="text-muted-foreground">{t("emptyState")}</p>
          </section>
        )}

        {/* CTA Section */}
        <section className="border-t bg-muted/50">
          <div className="max-w-7xl mx-auto py-16 md:py-24 px-4 md:px-8 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              {t("cta.title")}
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              {t("cta.description")}
            </p>
            <Button size="lg" asChild>
              <Link href="/contact">
                {t("cta.button")}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </section>
      </main>

      <MarketingFooter />
    </div>
  );
}
