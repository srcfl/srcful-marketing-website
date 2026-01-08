import type { Metadata } from "next";
import { Link } from "@/src/i18n/routing";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MarketingNav } from "@/components/marketing-nav";
import { MarketingFooter } from "@/components/marketing-footer";
import { getAllPosts, CATEGORY_LABELS, AUTHORS, type BlogPostMeta } from "@/lib/blog";
import { ArrowRight, BookOpen, Calendar, User } from "lucide-react";

export const metadata: Metadata = {
  title: "Blog",
  description: "Insights, news, and updates from Sourceful Energy. Learn about the energy transition, grid services, V2X, and smart energy management.",
};

interface BlogCardProps {
  post: BlogPostMeta;
  featured?: boolean;
}

function BlogCard({ post, featured = false }: BlogCardProps) {
  const author = AUTHORS[post.author] || AUTHORS["Sourceful Team"];
  const formattedDate = new Date(post.publishDate).toLocaleDateString("en-US", {
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
                {CATEGORY_LABELS[post.category] || post.category}
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
            {CATEGORY_LABELS[post.category] || post.category}
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

export default function BlogPage() {
  const posts = getAllPosts("en");
  const featuredPost = posts[0];
  const remainingPosts = posts.slice(1);

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
                Blog
              </Badge>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
                Insights &{" "}
                <span className="text-primary">Updates</span>
              </h1>
              <p className="text-xl text-muted-foreground">
                News, insights, and deep dives into the energy transition, grid services,
                V2X technology, and smart energy management from the Sourceful team.
              </p>
            </div>
          </div>
        </section>

        {/* Featured Post */}
        {featuredPost && (
          <section className="max-w-7xl mx-auto py-12 px-4 md:px-8">
            <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wide mb-6">
              Featured Article
            </h2>
            <BlogCard post={featuredPost} featured />
          </section>
        )}

        {/* All Posts Grid */}
        <section className="max-w-7xl mx-auto py-12 px-4 md:px-8">
          <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wide mb-6">
            All Articles ({remainingPosts.length})
          </h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {remainingPosts.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="border-t bg-muted/50">
          <div className="max-w-7xl mx-auto py-16 md:py-24 px-4 md:px-8 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Stay up to date
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Get the latest insights on energy management, grid services, and the energy transition
              delivered to your inbox.
            </p>
            <Button size="lg" asChild>
              <Link href="/contact">
                Subscribe to Updates
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
